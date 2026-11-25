import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  dispatchTransactionalEmail,
  getEmailProviderConfigStatus,
  type EmailProviderChoice,
} from '@/lib/email-provider';
import {
  renderCompletionEmail,
  renderWelcomeEmail,
  renderWeeklyStreakEmail,
  type EmailEventType,
} from '@/lib/email-templates';
import {
  listAuditEntriesFromMemory,
  maskEmailAddress,
  recordAuditEntryInMemory,
  type EmailAuditEntry,
} from '@/lib/notification-log';

function buildSamplePreviews(appUrl: string) {
  return {
    welcome: renderWelcomeEmail({
      learnerName: 'Jordan Rivera',
      appUrl,
    }),
    course_completion: renderCompletionEmail({
      learnerName: 'Jordan Rivera',
      courseTitle: 'Python Programming Mastery',
      track: 'Software Engineering',
      capstoneTitle: 'Production CLI Telemetry & Expense Pipeline',
      rubricScore: 96,
      verificationCode: 'APEX-2026-PY48K2',
      appUrl,
    }),
    weekly_streak: renderWeeklyStreakEmail({
      learnerName: 'Jordan Rivera',
      currentStreak: 7,
      enrolledCoursesCount: 2,
      completedLessonsCount: 15,
      appUrl,
    }),
  };
}

async function fetchCombinedLogs(): Promise<EmailAuditEntry[]> {
  const memoryLogs = listAuditEntriesFromMemory();
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return memoryLogs;
    const { data } = await supabase
      .from('email_notifications_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);

    if (!data || data.length === 0) return memoryLogs;

    const dbMapped: EmailAuditEntry[] = data.map((row) => ({
      id: String(row.id),
      userId: row.user_id ? String(row.user_id) : null,
      eventType: row.event_type as EmailEventType,
      courseId: row.course_id ? String(row.course_id) : null,
      recipientMasked: String(row.recipient_masked),
      provider: row.provider as EmailAuditEntry['provider'],
      status: row.status as EmailAuditEntry['status'],
      subject: String(row.subject),
      externalMessageId: row.external_message_id ? String(row.external_message_id) : null,
      errorDetail: row.error_detail ? String(row.error_detail) : null,
      idempotencyKey: row.idempotency_key ? String(row.idempotency_key) : null,
      createdAt: String(row.created_at),
    }));

    const seenKeys = new Set(dbMapped.map((d) => d.idempotencyKey).filter(Boolean));
    return [
      ...dbMapped,
      ...memoryLogs.filter((m) => !m.idempotencyKey || !seenKeys.has(m.idempotencyKey)),
    ].slice(0, 40);
  } catch {
    return memoryLogs;
  }
}

export async function GET(request: NextRequest) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { error: 'Admin authentication required.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const appUrl = process.env.APP_URL?.trim() || request.nextUrl.origin;
  const providerStatus = getEmailProviderConfigStatus();
  const previews = buildSamplePreviews(appUrl);
  const logs = await fetchCombinedLogs();

  return NextResponse.json(
    {
      providerStatus,
      previews,
      logs,
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: NextRequest) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { error: 'Admin authentication required.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const action = payload.action;
  const providerChoice: EmailProviderChoice =
    payload.provider === 'resend' || payload.provider === 'postmark' ? payload.provider : 'auto';
  const appUrl = process.env.APP_URL?.trim() || request.nextUrl.origin;
  const previews = buildSamplePreviews(appUrl);

  if (action === 'send_test' || action === 'trigger_weekly_streak') {
    const templateKey: EmailEventType =
      action === 'trigger_weekly_streak'
        ? 'weekly_streak'
        : payload.template === 'course_completion' || payload.template === 'weekly_streak'
          ? payload.template
          : 'welcome';

    const recipientRaw =
      typeof payload.recipientEmail === 'string' && payload.recipientEmail.trim().length > 0
        ? payload.recipientEmail.trim().toLowerCase()
        : auth.email;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientRaw) || recipientRaw.length > 160) {
      return NextResponse.json({ error: 'Enter a valid recipient email address.' }, { status: 400 });
    }

    const template = previews[templateKey];
    const outcome = await dispatchTransactionalEmail(
      {
        to: recipientRaw,
        subject: `[Test] ${template.subject}`,
        html: template.html,
        text: template.text,
        tag: `admin_test_${templateKey}`,
      },
      providerChoice
    );

    const entry = recordAuditEntryInMemory({
      userId: null,
      eventType: templateKey,
      courseId: templateKey === 'course_completion' ? 'python-programming-mastery' : null,
      recipientMasked: maskEmailAddress(recipientRaw),
      provider: outcome.provider,
      status: outcome.status,
      subject: `[Test] ${template.subject}`,
      externalMessageId: outcome.externalMessageId,
      errorDetail: outcome.errorDetail,
      idempotencyKey: null,
    });

    return NextResponse.json(
      {
        entry,
        outcome,
        logs: await fetchCombinedLogs(),
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json({ error: 'Unsupported admin email action.' }, { status: 400 });
}
