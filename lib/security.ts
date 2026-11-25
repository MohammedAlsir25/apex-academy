import { getCourseById } from './curriculum';

/**
 * Prevents Open Redirect vulnerabilities by ensuring redirect targets
 * are strictly internal relative paths (starting with a single '/').
 */
export function sanitizeRedirectPath(rawPath: string | null | undefined, fallback = '/'): string {
  if (!rawPath || typeof rawPath !== 'string') return fallback;
  const trimmed = rawPath.trim();
  if (!trimmed.startsWith('/')) return fallback;
  // Disallow protocol-relative URLs (//evil.com), backslashes, or control characters
  if (trimmed.startsWith('//') || trimmed.startsWith('/\\') || /[\r\n\t\0]/.test(trimmed)) {
    return fallback;
  }
  return trimmed;
}

/**
 * Validates that a course identifier from URL params matches a real catalog course.
 */
export function sanitizeCourseId(rawCourseId: string | null | undefined): string | null {
  if (!rawCourseId || typeof rawCourseId !== 'string') return null;
  const trimmed = rawCourseId.trim();
  if (!/^[a-z0-9-]{2,80}$/i.test(trimmed)) return null;
  return getCourseById(trimmed) ? trimmed : null;
}

/**
 * Validates URLs before rendering them in anchor tags to block javascript:/data: schemes.
 */
export function isSafeHttpUrl(rawUrl: string | null | undefined): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') return false;
  try {
    const parsed = new URL(rawUrl.trim());
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function isValidVerificationCode(rawCode: string): boolean {
  return /^[A-Z0-9-]{6,64}$/i.test(rawCode.trim());
}

export interface PasswordStrengthResult {
  score: 0 | 1 | 2 | 3 | 4;
  label: 'Too short' | 'Weak' | 'Fair' | 'Strong' | 'Very strong';
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumberOrSymbol: boolean;
  };
  isAcceptable: boolean;
}

export function validatePasswordStrength(password: string): PasswordStrengthResult {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumberOrSymbol: /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };

  const passedCount = Object.values(checks).filter(Boolean).length as 0 | 1 | 2 | 3 | 4;
  const isAcceptable = checks.minLength && checks.hasLowercase && (checks.hasUppercase || checks.hasNumberOrSymbol);

  let label: PasswordStrengthResult['label'] = 'Too short';
  if (!checks.minLength) {
    label = 'Too short';
  } else if (passedCount <= 2) {
    label = 'Weak';
  } else if (passedCount === 3) {
    label = 'Fair';
  } else if (password.length >= 12) {
    label = 'Very strong';
  } else {
    label = 'Strong';
  }

  return {
    score: checks.minLength ? passedCount : Math.min(1, passedCount) as 0 | 1,
    label,
    checks,
    isAcceptable,
  };
}

/**
 * Maps provider & Supabase backend error codes/messages into clear, user-safe guidance
 * without leaking internal server details.
 */
export function mapAuthError(err: unknown): {
  message: string;
  needsEmailConfirmation?: boolean;
  rateLimited?: boolean;
} {
  const raw =
    err && typeof err === 'object' && 'message' in err
      ? String((err as { message: unknown }).message)
      : typeof err === 'string'
        ? err
        : '';
  const code =
    err && typeof err === 'object' && 'code' in err
      ? String((err as { code: unknown }).code)
      : '';
  const lower = `${code} ${raw}`.toLowerCase();

  if (lower.includes('email_not_confirmed') || lower.includes('email not confirmed')) {
    return {
      message: 'Please confirm your email address before signing in. You can resend the confirmation link below.',
      needsEmailConfirmation: true,
    };
  }
  if (lower.includes('invalid_credentials') || lower.includes('invalid login credentials')) {
    return {
      message: 'Incorrect email or password. Double-check your credentials or reset your password.',
    };
  }
  if (lower.includes('user_already_exists') || lower.includes('already registered')) {
    return {
      message: 'An account with this email already exists. Try signing in or using Google / GitHub.',
    };
  }
  if (lower.includes('weak_password') || lower.includes('password should be')) {
    return {
      message: 'Please choose a stronger password (at least 8 characters with mixed letters and numbers).',
    };
  }
  if (lower.includes('over_email_send_rate_limit') || lower.includes('rate limit') || lower.includes('429')) {
    return {
      message: 'Too many authentication attempts in a short time. Please wait a minute before trying again.',
      rateLimited: true,
    };
  }
  if (lower.includes('access_denied') || lower.includes('cancelled')) {
    return {
      message: 'Social sign-in was cancelled. You can try again or sign in with email and password.',
    };
  }
  if (lower.includes('provider is not enabled') || lower.includes('unsupported provider')) {
    return {
      message: 'This sign-in provider is not yet enabled in the Supabase Authentication dashboard.',
    };
  }
  if (raw && raw.length < 180) {
    return { message: raw };
  }
  return {
    message: 'Authentication could not be completed right now. Please try again.',
  };
}
