// Supabase Edge Function: send-notifications
// Triggers transactional emails via Resend or Postmark for:
// 1) Database Webhook INSERT on public.profiles -> Welcome Email
// 2) Database Webhook INSERT on public.capstone_certificates -> Course Completion Email
// 3) Scheduled pg_cron / HTTP POST { "type": "WEEKLY_STREAK_BATCH" } -> Weekly Streak Reminders

import { createClient } from 'npm:@supabase/supabase-js@2';

interface NotificationPreferences {
  welcome?: boolean;
  completion?: boolean;
  weeklyStreak?: boolean;
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function maskEmail(email: string): string {
  const at = email.indexOf('@');
  if (at <= 0) return '***';
  return `${email.slice(0, Math.min(2, at))}***@${email.slice(at + 1)}`;
}

async function constantTimeEquals(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const hashA = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(a)));
  const hashB = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(b)));
  let diff = 0;
  for (let i = 0; i < hashA.length; i++) {
    diff |= hashA[i] ^ hashB[i];
  }
  return diff === 0;
}

function resolveAppUrl(): string {
  const raw = Deno.env.get('APP_URL')?.trim() || 'https://apexacademy.dev';
  return raw.startsWith('http://') || raw.startsWith('https://')
    ? raw.replace(/\/+$/, '')
    : 'https://apexacademy.dev';
}

function wrapLayout(opts: {
  eyebrow: string;
  headline: string;
  bodyHtml: string;
  ctaLabel: string;
  ctaUrl: string;
  footerNote: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#00153D;font-family:Arial,Helvetica,sans-serif;color:#00205B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#00153D;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="background-color:#00205B;padding:28px 32px;border-bottom:3px solid #F2A900;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#F2A900;">${escapeHtml(opts.eyebrow)}</p>
            <h1 style="margin:8px 0 0 0;font-size:24px;line-height:1.25;font-weight:800;color:#FFFFFF;">${escapeHtml(opts.headline)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;font-size:15px;line-height:1.65;color:#00205B;">
            ${opts.bodyHtml}
            <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:26px;">
              <tr><td style="border-radius:9999px;background-color:#F2A900;">
                <a href="${escapeHtml(opts.ctaUrl)}" style="display:inline-block;padding:13px 26px;font-size:14px;font-weight:800;color:#00205B;text-decoration:none;">
                  ${escapeHtml(opts.ctaLabel)} &rarr;
                </a>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#F8FAFC;padding:20px 32px;border-top:1px solid #E2E8F0;font-size:12px;color:#475569;">
            <strong style="color:#00205B;">Apex Academy</strong> &middot; ${escapeHtml(opts.footerNote)}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendEmailViaAdapter(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
  tag: string;
}): Promise<{ provider: 'resend' | 'postmark'; externalMessageId: string | null }> {
  const fromAddress = Deno.env.get('EMAIL_FROM_ADDRESS')?.trim() || 'Apex Academy <onboarding@resend.dev>';
  const preferred = (Deno.env.get('EMAIL_PROVIDER')?.trim().toLowerCase() || '');
  const resendKey = Deno.env.get('RESEND_API_KEY')?.trim() || '';
  const postmarkToken = Deno.env.get('POSTMARK_SERVER_TOKEN')?.trim() || '';

  const usePostmark =
    (preferred === 'postmark' && postmarkToken.length > 5) ||
    (!resendKey && postmarkToken.length > 5);

  if (usePostmark) {
    const res = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Postmark-Server-Token': postmarkToken,
      },
      body: JSON.stringify({
        From: fromAddress,
        To: params.to,
        Subject: params.subject,
        HtmlBody: params.html,
        TextBody: params.text,
        Tag: params.tag,
        MessageStream: 'outbound',
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Postmark error: ${JSON.stringify(data)}`);
    }
    return { provider: 'postmark', externalMessageId: data?.MessageID ?? null };
  }

  if (resendKey.length > 5) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [params.to],
        subject: params.subject,
        html: params.html,
        text: params.text,
        tags: [{ name: 'event', value: params.tag }],
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Resend error: ${JSON.stringify(data)}`);
    }
    return { provider: 'resend', externalMessageId: data?.id ?? null };
  }

  throw new Error('Neither RESEND_API_KEY nor POSTMARK_SERVER_TOKEN is configured in Edge secrets.');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200 });
  }

  const configuredSecret = Deno.env.get('NOTIFICATION_WEBHOOK_SECRET')?.trim() || '';
  if (configuredSecret.length >= 8) {
    const headerSecret =
      req.headers.get('x-webhook-secret')?.trim() ||
      req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim() ||
      '';
    const valid = headerSecret.length > 0 && (await constantTimeEquals(headerSecret, configuredSecret));
    if (!valid) {
      return new Response(JSON.stringify({ error: 'Unauthorized webhook request' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
  const appUrl = resolveAppUrl();

  try {
    const body = await req.json();
    const { type, table, record } = body as {
      type?: string;
      table?: string;
      record?: Record<string, unknown>;
    };

    // 1. Welcome email when a new profile row is inserted
    if (type === 'INSERT' && table === 'profiles' && record) {
      const userId = String(record.id || '');
      const learnerName = String(record.full_name || 'Learner');
      const prefs = (record.notification_preferences ?? {}) as NotificationPreferences;
      const idempotencyKey = `welcome:${userId}`;

      if (prefs.welcome === false) {
        return new Response(JSON.stringify({ status: 'skipped_preference' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const { data: userRes } = await supabaseAdmin.auth.admin.getUserById(userId);
      const email = userRes?.user?.email;
      if (!email) {
        return new Response(JSON.stringify({ status: 'no_user_email' }), { status: 200 });
      }

      const subject = `Welcome to Apex Academy, ${learnerName}`;
      const html = wrapLayout({
        eyebrow: 'Welcome to Apex Academy',
        headline: 'Your engineering workspace is unlocked',
        bodyHtml: `<p>Hi <strong>${escapeHtml(learnerName)}</strong>,</p><p>Your account is active. Pick a capstone track, pass interactive coding assertions, and earn verifiable proof.</p>`,
        ctaLabel: 'Explore Courses',
        ctaUrl: `${appUrl}/#catalog`,
        footerNote: 'Manage email settings inside your Account panel.',
      });
      const text = `Welcome to Apex Academy, ${learnerName}! Explore courses at ${appUrl}/#catalog`;

      const outcome = await sendEmailViaAdapter({ to: email, subject, html, text, tag: 'welcome' });

      await supabaseAdmin.from('email_notifications_log').upsert(
        {
          user_id: userId,
          event_type: 'welcome',
          recipient_masked: maskEmail(email),
          provider: outcome.provider,
          status: 'sent',
          subject,
          external_message_id: outcome.externalMessageId,
          idempotency_key: idempotencyKey,
        },
        { onConflict: 'idempotency_key' }
      );

      return new Response(JSON.stringify({ status: 'sent', provider: outcome.provider }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Course completion & certificate email when a certificate is issued
    if (type === 'INSERT' && table === 'capstone_certificates' && record) {
      const userId = String(record.user_id || '');
      const courseId = String(record.course_id || '');
      const courseTitle = String(record.course_title || record.capstone_title || 'Capstone Course');
      const capstoneTitle = String(record.capstone_title || courseTitle);
      const learnerName = String(record.learner_name || 'Learner');
      const verificationCode = String(record.verification_code || '');
      const score = Number(record.rubric_score ?? 0);
      const idempotencyKey = `course_completion:${userId}:${courseId}`;

      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('notification_preferences')
        .eq('id', userId)
        .maybeSingle();
      const prefs = (profile?.notification_preferences ?? {}) as NotificationPreferences;

      if (prefs.completion === false) {
        return new Response(JSON.stringify({ status: 'skipped_preference' }), { status: 200 });
      }

      const { data: userRes } = await supabaseAdmin.auth.admin.getUserById(userId);
      const email = userRes?.user?.email;
      if (!email) {
        return new Response(JSON.stringify({ status: 'no_user_email' }), { status: 200 });
      }

      const verifyUrl = `${appUrl}/?verify=${encodeURIComponent(verificationCode)}`;
      const subject = `Certificate Issued: ${courseTitle} (${score}/100)`;
      const html = wrapLayout({
        eyebrow: 'Capstone Verified',
        headline: 'Your certificate is ready to share',
        bodyHtml: `<p>Congratulations, <strong>${escapeHtml(learnerName)}</strong>!</p><p>You passed the Mentor Rubric for <strong>${escapeHtml(courseTitle)}</strong> (${score}/100) for your capstone <em>${escapeHtml(capstoneTitle)}</em>. Credential ID: <code>${escapeHtml(verificationCode)}</code></p>`,
        ctaLabel: 'Verify & Export Certificate',
        ctaUrl: verifyUrl,
        footerNote: 'Disable completion notifications anytime inside Account Settings.',
      });
      const text = `Congratulations ${learnerName}! Verified credential ${verificationCode} for ${courseTitle} (${score}/100): ${verifyUrl}`;

      const outcome = await sendEmailViaAdapter({
        to: email,
        subject,
        html,
        text,
        tag: 'course_completion',
      });

      await supabaseAdmin.from('email_notifications_log').upsert(
        {
          user_id: userId,
          event_type: 'course_completion',
          course_id: courseId,
          recipient_masked: maskEmail(email),
          provider: outcome.provider,
          status: 'sent',
          subject,
          external_message_id: outcome.externalMessageId,
          idempotency_key: idempotencyKey,
        },
        { onConflict: 'idempotency_key' }
      );

      return new Response(JSON.stringify({ status: 'sent', provider: outcome.provider }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Weekly study streak reminder batch (invoked via pg_cron or scheduled trigger)
    if (type === 'WEEKLY_STREAK_BATCH') {
      const weekKey = new Date().toISOString().slice(0, 10);
      const { data: profiles } = await supabaseAdmin
        .from('profiles')
        .select('id, full_name, study_streak, notification_preferences')
        .limit(200);

      let sentCount = 0;
      for (const p of profiles ?? []) {
        const prefs = (p.notification_preferences ?? {}) as NotificationPreferences;
        if (prefs.weeklyStreak === false) continue;

        const { data: userRes } = await supabaseAdmin.auth.admin.getUserById(p.id);
        const email = userRes?.user?.email;
        if (!email) continue;

        const streak = Number(p.study_streak ?? 1);
        const subject = `${streak}-day study streak — weekly Apex Academy digest`;
        const html = wrapLayout({
          eyebrow: 'Weekly Study Momentum',
          headline: `${streak}-day streak in progress`,
          bodyHtml: `<p>Keep going, <strong>${escapeHtml(p.full_name || 'Learner')}</strong>! Jump back into your next milestone for 15 minutes today to grow your verified portfolio.</p>`,
          ctaLabel: 'Resume Next Lesson',
          ctaUrl: appUrl,
          footerNote: 'Unsubscribe from weekly reminders anytime in Account Settings.',
        });
        const text = `Hi ${p.full_name || 'Learner'}, you have a ${streak}-day study streak. Continue at ${appUrl}`;

        const outcome = await sendEmailViaAdapter({
          to: email,
          subject,
          html,
          text,
          tag: 'weekly_streak',
        });

        await supabaseAdmin.from('email_notifications_log').upsert(
          {
            user_id: p.id,
            event_type: 'weekly_streak',
            recipient_masked: maskEmail(email),
            provider: outcome.provider,
            status: 'sent',
            subject,
            external_message_id: outcome.externalMessageId,
            idempotency_key: `weekly_streak:${p.id}:${weekKey}`,
          },
          { onConflict: 'idempotency_key' }
        );
        sentCount += 1;
      }

      return new Response(JSON.stringify({ status: 'batch_complete', sentCount }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ status: 'ignored_event' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Edge notification error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
