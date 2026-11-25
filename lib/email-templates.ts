import { isSafeHttpUrl } from './security';

export type EmailEventType = 'welcome' | 'course_completion' | 'weekly_streak';

export interface NotificationPreferences {
  welcome: boolean;
  completion: boolean;
  weeklyStreak: boolean;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  welcome: true,
  completion: true,
  weeklyStreak: true,
};

export interface WelcomeEmailContext {
  learnerName: string;
  appUrl: string;
}

export interface CompletionEmailContext {
  learnerName: string;
  courseTitle: string;
  track: string;
  capstoneTitle: string;
  rubricScore: number;
  verificationCode: string;
  appUrl: string;
}

export interface WeeklyStreakEmailContext {
  learnerName: string;
  currentStreak: number;
  enrolledCoursesCount: number;
  completedLessonsCount: number;
  appUrl: string;
}

export interface RenderedEmailTemplate {
  eventType: EmailEventType;
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveSafeBaseUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim().replace(/\/+$/, '');
  if (isSafeHttpUrl(trimmed)) return trimmed;
  return 'https://apexacademy.dev';
}

function wrapEmailLayout(params: {
  eyebrow: string;
  headline: string;
  bodyHtml: string;
  ctaLabel: string;
  ctaUrl: string;
  footerNote: string;
}): string {
  const safeEyebrow = escapeHtml(params.eyebrow);
  const safeHeadline = escapeHtml(params.headline);
  const safeCtaLabel = escapeHtml(params.ctaLabel);
  const safeCtaUrl = isSafeHttpUrl(params.ctaUrl) ? params.ctaUrl : 'https://apexacademy.dev';
  const safeFooter = escapeHtml(params.footerNote);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeHeadline}</title>
</head>
<body style="margin:0;padding:0;background-color:#00153D;font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;color:#00205B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#00153D;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:20px;overflow:hidden;border:1px solid #1E3A8A;">
          <tr>
            <td style="background-color:#00205B;padding:28px 32px;border-bottom:3px solid #F2A900;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#F2A900;">${safeEyebrow}</p>
              <h1 style="margin:8px 0 0 0;font-size:24px;line-height:1.25;font-weight:800;color:#FFFFFF;">${safeHeadline}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-size:15px;line-height:1.65;color:#00205B;">
              ${params.bodyHtml}
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                <tr>
                  <td style="border-radius:9999px;background-color:#F2A900;">
                    <a href="${escapeHtml(safeCtaUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:13px 26px;font-size:14px;font-weight:800;color:#00205B;text-decoration:none;">
                      ${safeCtaLabel} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#F8FAFC;padding:20px 32px;border-top:1px solid #E2E8F0;font-size:12px;line-height:1.5;color:#475569;">
              <strong style="color:#00205B;">Apex Academy</strong> &middot; Project-Based Capstone Learning<br />
              ${safeFooter}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderWelcomeEmail(ctx: WelcomeEmailContext): RenderedEmailTemplate {
  const baseUrl = resolveSafeBaseUrl(ctx.appUrl);
  const safeName = escapeHtml(ctx.learnerName || 'Learner');
  const subject = `Welcome to Apex Academy, ${ctx.learnerName || 'Learner'}`;

  const bodyHtml = `
    <p style="margin:0 0 16px 0;">Hi <strong>${safeName}</strong>,</p>
    <p style="margin:0 0 16px 0;">Your Apex Academy account is ready. You can now enroll in any capstone track, run interactive code sandboxes, and save progress across every device.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;margin:18px 0;">
      <tr>
        <td style="padding:18px 20px;font-size:14px;color:#00205B;">
          <strong style="display:block;margin-bottom:8px;color:#003087;">Your First 3 Milestones:</strong>
          1. Pick a course track from Python, SQL, AI Systems, Data, Support, or UI/UX.<br />
          2. Pass live sandbox assertions step-by-step across 12 progressive lessons.<br />
          3. Submit your final capstone rubric to mint a verifiable QR credential.
        </td>
      </tr>
    </table>
  `;

  const html = wrapEmailLayout({
    eyebrow: 'Welcome to Apex Academy',
    headline: 'Your engineering workspace is unlocked',
    bodyHtml,
    ctaLabel: 'Browse Courses & Enroll',
    ctaUrl: `${baseUrl}/#catalog`,
    footerNote: 'Manage email notification settings anytime in your Apex Academy Account panel.',
  });

  const text = [
    `Welcome to Apex Academy, ${ctx.learnerName || 'Learner'}!`,
    '',
    'Your account is active. You can now enroll in capstone tracks, run live coding sandboxes, and mint verified certificates.',
    `Explore courses: ${baseUrl}/#catalog`,
  ].join('\n');

  return { eventType: 'welcome', subject, html, text };
}

export function renderCompletionEmail(ctx: CompletionEmailContext): RenderedEmailTemplate {
  const baseUrl = resolveSafeBaseUrl(ctx.appUrl);
  const safeName = escapeHtml(ctx.learnerName || 'Learner');
  const safeCourse = escapeHtml(ctx.courseTitle);
  const safeTrack = escapeHtml(ctx.track);
  const safeCapstone = escapeHtml(ctx.capstoneTitle);
  const safeCode = escapeHtml(ctx.verificationCode);
  const score = Math.max(0, Math.min(100, Math.round(ctx.rubricScore)));
  const verifyUrl = `${baseUrl}/?verify=${encodeURIComponent(ctx.verificationCode)}`;

  const subject = `Certificate Issued: ${ctx.courseTitle} (${score}/100)`;

  const bodyHtml = `
    <p style="margin:0 0 16px 0;">Congratulations, <strong>${safeName}</strong>!</p>
    <p style="margin:0 0 16px 0;">You passed the final Mentor Rubric for <strong>${safeCourse}</strong> and unlocked your verified Apex Academy credential.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#00205B;border-radius:14px;color:#FFFFFF;margin:18px 0;">
      <tr>
        <td style="padding:20px 22px;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#FFE264;">${safeTrack}</p>
          <p style="margin:6px 0 10px 0;font-size:18px;font-weight:800;color:#FFFFFF;">${safeCapstone}</p>
          <p style="margin:0;font-size:13px;color:#E2ECFA;">
            Rubric Score: <strong style="color:#F2A900;">${score}/100</strong> &nbsp;&middot;&nbsp;
            Credential ID: <code style="font-family:monospace;color:#FFE264;">${safeCode}</code>
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:0;">Share your credential link with hiring panels or verify it anytime in the public registry.</p>
  `;

  const html = wrapEmailLayout({
    eyebrow: 'Capstone Verified',
    headline: 'Your certificate is ready to share',
    bodyHtml,
    ctaLabel: 'Verify & Export Certificate',
    ctaUrl: verifyUrl,
    footerNote: 'You can disable completion emails anytime inside Account Settings.',
  });

  const text = [
    `Congratulations, ${ctx.learnerName || 'Learner'}!`,
    '',
    `You completed ${ctx.courseTitle} (${ctx.track}) with a Mentor Rubric score of ${score}/100.`,
    `Capstone: ${ctx.capstoneTitle}`,
    `Verification ID: ${ctx.verificationCode}`,
    `Verify credential: ${verifyUrl}`,
  ].join('\n');

  return { eventType: 'course_completion', subject, html, text };
}

export function renderWeeklyStreakEmail(ctx: WeeklyStreakEmailContext): RenderedEmailTemplate {
  const baseUrl = resolveSafeBaseUrl(ctx.appUrl);
  const safeName = escapeHtml(ctx.learnerName || 'Learner');
  const streak = Math.max(0, Math.round(ctx.currentStreak));
  const enrolled = Math.max(0, Math.round(ctx.enrolledCoursesCount));
  const lessons = Math.max(0, Math.round(ctx.completedLessonsCount));

  const subject = `${streak}-day study streak — your weekly Apex Academy digest`;

  const bodyHtml = `
    <p style="margin:0 0 16px 0;">Keep your momentum going, <strong>${safeName}</strong>.</p>
    <p style="margin:0 0 16px 0;">Here is a quick snapshot of your weekly scaffolding progress on Apex Academy:</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;margin:18px 0;">
      <tr>
        <td style="padding:18px 20px;font-size:14px;color:#00205B;">
          <strong>Active Streak:</strong> ${streak} ${streak === 1 ? 'day' : 'days'}<br />
          <strong>Enrolled Courses:</strong> ${enrolled}<br />
          <strong>Verified Lessons Completed:</strong> ${lessons}
        </td>
      </tr>
    </table>
    <p style="margin:0;">Spend 15 minutes today on your next milestone to extend your streak and move closer to your capstone rubric.</p>
  `;

  const html = wrapEmailLayout({
    eyebrow: 'Weekly Study Momentum',
    headline: `${streak}-day streak in progress`,
    bodyHtml,
    ctaLabel: 'Resume Next Lesson',
    ctaUrl: baseUrl,
    footerNote: 'Unsubscribe from weekly streak reminders anytime inside Account Settings.',
  });

  const text = [
    `Hi ${ctx.learnerName || 'Learner'},`,
    '',
    `Weekly Apex Academy Summary:`,
    `- Active Streak: ${streak} day(s)`,
    `- Enrolled Courses: ${enrolled}`,
    `- Verified Lessons Completed: ${lessons}`,
    '',
    `Continue learning: ${baseUrl}`,
  ].join('\n');

  return { eventType: 'weekly_streak', subject, html, text };
}
