import { NextResponse, type NextRequest } from 'next/server';
import {
  authenticateAdminPassword,
  claimFirstRunAdmin,
  getAdminSetupStatus,
  verifyAdminRequest,
} from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const setup = getAdminSetupStatus();
  const verified = await verifyAdminRequest(request);

  return NextResponse.json(
    {
      authenticated: verified.authorized,
      email: verified.authorized ? verified.email : null,
      method: verified.authorized ? verified.method : null,
      needsSetup: setup.needsSetup,
      configuredViaEnv: setup.configuredViaEnv,
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { error: 'Invalid request payload.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const { action, email, password } = body as {
    action?: unknown;
    email?: unknown;
    password?: unknown;
  };

  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json(
      { error: 'Email and password are required.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  if (action === 'claim') {
    const result = claimFirstRunAdmin(email, password);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    return NextResponse.json(
      { token: result.token, email: result.email },
      { status: 201, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  if (action === 'login') {
    const result = authenticateAdminPassword(email, password);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    return NextResponse.json(
      { token: result.token, email: result.email },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json(
    { error: 'Unsupported admin auth action.' },
    { status: 400, headers: { 'Cache-Control': 'no-store' } }
  );
}
