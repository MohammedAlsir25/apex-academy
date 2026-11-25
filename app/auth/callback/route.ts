import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { sanitizeCourseId, sanitizeRedirectPath } from '@/lib/security';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = sanitizeRedirectPath(requestUrl.searchParams.get('next'), '/');
  const enroll = sanitizeCourseId(requestUrl.searchParams.get('enroll'));

  // Resolve origin safely for Vercel reverse proxies or local dev
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  const origin =
    process.env.NODE_ENV !== 'development' && forwardedHost
      ? `${forwardedProto}://${forwardedHost}`
      : requestUrl.origin;

  if (!code) {
    const errUrl = new URL('/signin', origin);
    errUrl.searchParams.set('error', 'missing_code');
    if (enroll) errUrl.searchParams.set('enroll', enroll);
    return NextResponse.redirect(errUrl);
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    const errUrl = new URL('/signin', origin);
    errUrl.searchParams.set('error', 'auth_unconfigured');
    return NextResponse.redirect(errUrl);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    const errUrl = new URL('/signin', origin);
    errUrl.searchParams.set('error', 'oauth_exchange_failed');
    if (enroll) errUrl.searchParams.set('enroll', enroll);
    return NextResponse.redirect(errUrl);
  }

  const destination = new URL(next, origin);
  if (enroll) {
    destination.searchParams.set('enroll', enroll);
  }
  return NextResponse.redirect(destination);
}
