import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { dispatchTransactionalEmail } from '@/lib/email-provider';
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  renderCompletionEmail,
  renderWelcomeEmail,
  type NotificationPreferences,
} from '@/lib/email-templates';
import {
  hasDispatchedInMemory,
  maskEmailAddress,
  recordAuditEntryInMemory,
} from '@/lib/notification-log';
import { sanitizeCourseId } from '@/lib/security';

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { dispatched: false, reason: 'supabase_unconfigured' },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const { data: userData, error: userErr } = await supabase.auth.getUser();
  const user = userData?.user;
  if (userErr || !user || !user.email) {
    return NextResponse.json(
      { error: 'Authentication required to trigger learner notifications.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const eventType = payload.eventType;
  if (eventType !== 'welcome' && eventType !== 'course_completion') {
    return NextResponse.json({ error: 'Unsupported notification event.' }, { status: 400 });
  }

  const requestOrigin = request.nextUrl.origin;
  const appUrl = process.env.APP_URL?.trim() || requestOrigin;

  const { data: profileRow } = await supabase
    .from('profiles')
    .select('full_name, notification_preferences')
    .eq('id', user.id)
    .maybeSingle();

  const prefs: NotificationPreferences = {
    ...DEFAULT_NOTIFICATION_PREFERENCES,
    ...((profileRow?.notification_preferences as Partial<NotificationPreferences> | null) ?? {}),
  };

  const learnerName =
    profileRow?.full_name ||
    (typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : '') ||
    user.email.split('@')[0];

  const courseId = eventType === 'course_completion' ? sanitizeCourseId(String(payload.courseId ?? '')) : null;
  if (eventType === 'course_completion' && !courseId) {
    return NextResponse.json({ error: 'Valid courseId is required.' }, { status: 400 });
  }

  const idempotencyKey =
    eventType === 'welcome'
      ? `welcome:${user.id}`
      : `course_completion:${user.id}:${courseId}`;

  // Check in-memory and DB idempotency so refreshes never duplicate emails
  if (hasDispatchedInMemory(idempotencyKey)) {
    return NextResponse.json(
      { dispatched: false, reason: 'already_sent' },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const { data: existingLog } = await supabase
    .from('email_notifications_log')
    .select('id')
    .eq('idempotency_key', idempotencyKey)
    .maybeSingle();

  if (existingLog) {
    return NextResponse.json(
      { dispatched: false, reason: 'already_sent' },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const optedIn = eventType === 'welcome' ? prefs.welcome : prefs.completion;
  const rendered =
    eventType === 'welcome'
      ? renderWelcomeEmail({ learnerName, appUrl })
      : renderCompletionEmail({
          learnerName,
          courseTitle: String(payload.courseTitle ?? 'Capstone Course').slice(0, 180),
          track: String(payload.track ?? 'Apex Academy').slice(0, 120),
          capstoneTitle: String(payload.capstoneTitle ?? 'Capstone Project').slice(0, 200),
          rubricScore: Number(payload.rubricScore ?? 90),
          verificationCode: String(payload.verificationCode ?? 'APEX-2026').slice(0, 64),
          appUrl,
        });

  if (!optedIn) {
    const entry = recordAuditEntryInMemory({
      userId: user.id,
      eventType,
      courseId,
      recipientMasked: maskEmailAddress(user.email),
      provider: 'preview',
      status: 'skipped',
      subject: rendered.subject,
      externalMessageId: null,
      errorDetail: 'Learner opted out of this email category.',
      idempotencyKey,
    });
    return NextResponse.json(
      { dispatched: false, status: 'skipped', entry },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const outcome = await dispatchTransactionalEmail(
    {
      to: user.email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      tag: eventType,
    },
    'auto'
  );

  const entry = recordAuditEntryInMemory({
    userId: user.id,
    eventType,
    courseId,
    recipientMasked: maskEmailAddress(user.email),
    provider: outcome.provider,
    status: outcome.status,
    subject: rendered.subject,
    externalMessageId: outcome.externalMessageId,
    errorDetail: outcome.errorDetail,
    idempotencyKey,
  });

  // Persist masked delivery audit row under user's own RLS permission
  await supabase
    .from('email_notifications_log')
    .insert({
      user_id: user.id,
      event_type: eventType,
      course_id: courseId,
      recipient_masked: entry.recipientMasked,
      provider: entry.provider,
      status: entry.status,
      subject: entry.subject,
      external_message_id: entry.externalMessageId,
      error_detail: entry.errorDetail,
      idempotency_key: idempotencyKey,
    })
    .select('id')
    .maybeSingle();

  return NextResponse.json(
    { dispatched: outcome.status === 'sent', status: outcome.status, provider: outcome.provider },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}
