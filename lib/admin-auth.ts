import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { validatePasswordStrength } from '@/lib/security';

interface ClaimedAdminRecord {
  email: string;
  salt: string;
  hash: string;
  claimedAt: string;
}

declare global {
  var __apexAdminSessionSecret: string | undefined;
  var __apexAdminClaimed: ClaimedAdminRecord | null | undefined;
}

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getSigningSecret(): string {
  if (process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 16) {
    return process.env.ADMIN_SESSION_SECRET;
  }
  if (!globalThis.__apexAdminSessionSecret) {
    globalThis.__apexAdminSessionSecret = randomBytes(32).toString('hex');
  }
  return globalThis.__apexAdminSessionSecret;
}

function getEnvAdminConfig(): { configured: boolean; email: string; password: string } {
  const rawPassword = process.env.ADMIN_PASSWORD?.trim() ?? '';
  const rawEmail = (process.env.ADMIN_EMAIL?.trim() || 'admin@apex.com').toLowerCase();
  return {
    configured: rawPassword.length >= 8,
    email: rawEmail,
    password: rawPassword,
  };
}

export function getAdminSetupStatus(): {
  needsSetup: boolean;
  configuredViaEnv: boolean;
  claimedEmailHint: string | null;
} {
  const envCfg = getEnvAdminConfig();
  if (envCfg.configured) {
    return {
      needsSetup: false,
      configuredViaEnv: true,
      claimedEmailHint: envCfg.email,
    };
  }
  const claimed = globalThis.__apexAdminClaimed ?? null;
  if (claimed) {
    return {
      needsSetup: false,
      configuredViaEnv: false,
      claimedEmailHint: claimed.email,
    };
  }
  return {
    needsSetup: true,
    configuredViaEnv: false,
    claimedEmailHint: null,
  };
}

function sha256TimingSafeEqual(a: string, b: string): boolean {
  const digestA = createHash('sha256').update(a).digest();
  const digestB = createHash('sha256').update(b).digest();
  return timingSafeEqual(digestA, digestB);
}

function signAdminToken(email: string): string {
  const payload = {
    sub: email,
    role: 'admin' as const,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = createHmac('sha256', getSigningSecret())
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${sig}`;
}

export function verifySignedAdminToken(token: string): { valid: boolean; email?: string } {
  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };
  const [encodedPayload, providedSig] = parts;
  if (!encodedPayload || !providedSig) return { valid: false };

  const expectedSig = createHmac('sha256', getSigningSecret())
    .update(encodedPayload)
    .digest('base64url');

  const bufProvided = Buffer.from(providedSig, 'utf8');
  const bufExpected = Buffer.from(expectedSig, 'utf8');
  if (bufProvided.length !== bufExpected.length || !timingSafeEqual(bufProvided, bufExpected)) {
    return { valid: false };
  }

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as {
      sub?: unknown;
      role?: unknown;
      exp?: unknown;
    };
    if (
      parsed.role !== 'admin' ||
      typeof parsed.sub !== 'string' ||
      typeof parsed.exp !== 'number' ||
      parsed.exp < Date.now()
    ) {
      return { valid: false };
    }
    return { valid: true, email: parsed.sub };
  } catch {
    return { valid: false };
  }
}

export function claimFirstRunAdmin(
  emailInput: string,
  passwordInput: string
): { ok: true; token: string; email: string } | { ok: false; error: string; status: number } {
  const status = getAdminSetupStatus();
  if (!status.needsSetup) {
    return {
      ok: false,
      error: 'An admin credential is already configured. Sign in with your admin email and password.',
      status: 409,
    };
  }

  const normalizedEmail = emailInput.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 160) {
    return { ok: false, error: 'Enter a valid admin email address.', status: 400 };
  }

  const strength = validatePasswordStrength(passwordInput);
  if (!strength.isAcceptable) {
    return {
      ok: false,
      error:
        'Choose a stronger admin password (at least 8 characters with uppercase/lowercase and numbers or symbols).',
      status: 400,
    };
  }

  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(passwordInput, salt, 64).toString('hex');

  globalThis.__apexAdminClaimed = {
    email: normalizedEmail,
    salt,
    hash,
    claimedAt: new Date().toISOString(),
  };

  return {
    ok: true,
    token: signAdminToken(normalizedEmail),
    email: normalizedEmail,
  };
}

export function authenticateAdminPassword(
  emailInput: string,
  passwordInput: string
): { ok: true; token: string; email: string } | { ok: false; error: string; status: number } {
  const normalizedEmail = emailInput.trim().toLowerCase();
  const envCfg = getEnvAdminConfig();

  // Configured environment secret always takes precedence over any claimed fallback hash
  if (envCfg.configured) {
    const emailMatches = sha256TimingSafeEqual(normalizedEmail, envCfg.email);
    const passMatches = sha256TimingSafeEqual(passwordInput, envCfg.password);
    if (!emailMatches || !passMatches) {
      return { ok: false, error: 'Incorrect admin email or password.', status: 401 };
    }
    return {
      ok: true,
      token: signAdminToken(envCfg.email),
      email: envCfg.email,
    };
  }

  const claimed = globalThis.__apexAdminClaimed ?? null;
  if (!claimed) {
    return {
      ok: false,
      error: 'No admin account has been claimed yet. Complete first-run setup first.',
      status: 403,
    };
  }

  const emailMatches = sha256TimingSafeEqual(normalizedEmail, claimed.email);
  const derivedHex = scryptSync(passwordInput, claimed.salt, 64).toString('hex');
  const passMatches = timingSafeEqual(
    Buffer.from(derivedHex, 'hex'),
    Buffer.from(claimed.hash, 'hex')
  );

  if (!emailMatches || !passMatches) {
    return { ok: false, error: 'Incorrect admin email or password.', status: 401 };
  }

  return {
    ok: true,
    token: signAdminToken(claimed.email),
    email: claimed.email,
  };
}

export async function verifyAdminRequest(
  request: NextRequest
): Promise<{ authorized: true; email: string; method: 'bearer' | 'supabase' } | { authorized: false }> {
  const authHeader = request.headers.get('authorization') ?? '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    const verified = verifySignedAdminToken(token);
    if (verified.valid && verified.email) {
      return { authorized: true, email: verified.email, method: 'bearer' };
    }
  }

  // Also check Supabase SSR cookie session with verified profiles.role === 'admin'
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (user) {
        const { data: profileRow } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();
        if (profileRow?.role === 'admin') {
          return {
            authorized: true,
            email: user.email || 'admin@apex.com',
            method: 'supabase',
          };
        }
      }
    }
  } catch {
    // Ignore SSR cookie errors
  }

  return { authorized: false };
}
