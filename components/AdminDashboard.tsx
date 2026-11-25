'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Layers,
  LogOut,
  Mail,
  Search,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { validatePasswordStrength } from '@/lib/security';
import type { EmailEventType, RenderedEmailTemplate } from '@/lib/email-templates';
import type { EmailAuditEntry } from '@/lib/notification-log';
import type { CertificateRecord } from '@/lib/storage';
import { ApexLogo } from './ApexLogo';

interface AdminStatusPayload {
  authenticated: boolean;
  email: string | null;
  method: 'bearer' | 'supabase' | null;
  needsSetup: boolean;
  configuredViaEnv: boolean;
}

interface AdminOverviewPayload {
  adminEmail: string;
  authMethod: 'bearer' | 'supabase';
  supabaseConfigured: boolean;
  catalogSummary: {
    totalCourses: number;
    totalLessons: number;
    totalTracks: number;
    courses: Array<{
      id: string;
      title: string;
      track: string;
      level: string;
      lessons: number;
      durationHours: number;
      capstoneTitle: string;
      instructor: string;
    }>;
  };
}

interface AdminNotificationsPayload {
  providerStatus: {
    resendConfigured: boolean;
    postmarkConfigured: boolean;
    activeProvider: 'resend' | 'postmark' | 'preview';
    fromAddress: string;
    webhookSecretConfigured: boolean;
  };
  previews: Record<EmailEventType, RenderedEmailTemplate>;
  logs: EmailAuditEntry[];
}

const TEMPLATE_LABELS: Record<EmailEventType, string> = {
  welcome: 'Welcome Email',
  course_completion: 'Course Completion',
  weekly_streak: 'Weekly Study Streak',
};

export function AdminDashboard() {
  // Held strictly in React JS memory (never written to localStorage/sessionStorage)
  const [bearerToken, setBearerToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AdminStatusPayload | null>(null);
  const [overview, setOverview] = useState<AdminOverviewPayload | null>(null);
  const [emailStudio, setEmailStudio] = useState<AdminNotificationsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  // Login / Claim form state
  const [email, setEmail] = useState('admin@apex.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  // Email Studio & Test Dispatch state
  const [activeTemplate, setActiveTemplate] = useState<EmailEventType>('welcome');
  const [previewMode, setPreviewMode] = useState<'html' | 'text'>('html');
  const [providerChoice, setProviderChoice] = useState<'auto' | 'resend' | 'postmark'>('auto');
  const [testRecipient, setTestRecipient] = useState('admin@apex.com');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailNotice, setEmailNotice] = useState<string | null>(null);

  // Certificate audit tool
  const [certQuery, setCertQuery] = useState('');
  const [certLookupStatus, setCertLookupStatus] = useState<{
    loading: boolean;
    found?: boolean;
    configured?: boolean;
    certificate?: CertificateRecord;
    error?: string;
  } | null>(null);

  const strength = validatePasswordStrength(password);

  useEffect(() => {
    let active = true;
    const headers: HeadersInit = bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {};

    (async () => {
      try {
        const res = await fetch('/api/admin/auth', { headers, cache: 'no-store' });
        const data = (await res.json()) as AdminStatusPayload;
        if (!active) return;
        setStatus(data);

        if (data.authenticated) {
          if (data.email) {
            setTestRecipient(data.email);
          }
          const [overviewRes, notifRes] = await Promise.all([
            fetch('/api/admin/overview', { headers, cache: 'no-store' }),
            fetch('/api/admin/notifications', { headers, cache: 'no-store' }),
          ]);
          if (overviewRes.ok && active) {
            const overviewData = (await overviewRes.json()) as AdminOverviewPayload;
            setOverview(overviewData);
          }
          if (notifRes.ok && active) {
            const notifData = (await notifRes.json()) as AdminNotificationsPayload;
            setEmailStudio(notifData);
          }
        } else {
          setOverview(null);
          setEmailStudio(null);
        }
      } catch {
        if (active) setErrorMsg('Unable to check admin status right now.');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [bearerToken]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    const isClaim = Boolean(status?.needsSetup);
    if (isClaim) {
      if (!strength.isAcceptable) {
        setErrorMsg(
          'Use a strong password (8+ characters with mixed uppercase/lowercase and numbers or symbols).'
        );
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isClaim ? 'claim' : 'login',
          email: email.trim().toLowerCase(),
          password,
        }),
      });
      const payload = (await res.json()) as { token?: string; email?: string; error?: string };
      if (!res.ok || !payload.token) {
        setErrorMsg(payload.error || 'Authentication failed.');
        return;
      }

      setPassword('');
      setConfirmPassword('');
      setBearerToken(payload.token);
      setInfoMsg(
        isClaim
          ? `Admin account claimed for ${payload.email}. Remember to also set ADMIN_EMAIL and ADMIN_PASSWORD in Vercel Secrets before deploying.`
          : null
      );
    } catch {
      setErrorMsg('Could not reach admin authentication service.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = () => {
    setBearerToken(null);
    setOverview(null);
    setEmailStudio(null);
    setInfoMsg('Signed out of the Admin Console.');
  };

  const handleSendTestEmail = async (action: 'send_test' | 'trigger_weekly_streak') => {
    setSendingEmail(true);
    setEmailNotice(null);
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
      };
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          action,
          template: activeTemplate,
          provider: providerChoice,
          recipientEmail: testRecipient.trim(),
        }),
      });
      const data = (await res.json()) as {
        outcome?: { provider: string; status: string; errorDetail: string | null };
        logs?: EmailAuditEntry[];
        error?: string;
      };
      if (!res.ok) {
        setEmailNotice(data.error || 'Could not dispatch test email.');
        return;
      }
      if (data.logs && emailStudio) {
        setEmailStudio({ ...emailStudio, logs: data.logs });
      }
      if (data.outcome?.status === 'sent') {
        setEmailNotice(`Live test email delivered via ${data.outcome.provider}.`);
      } else if (data.outcome?.status === 'simulated') {
        setEmailNotice(
          'Simulated preview logged (set RESEND_API_KEY or POSTMARK_SERVER_TOKEN in Secrets for live inbox delivery).'
        );
      } else {
        setEmailNotice(data.outcome?.errorDetail || 'Provider returned an error.');
      }
    } catch {
      setEmailNotice('Test email request failed.');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleVerifyCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = certQuery.trim();
    if (!code) return;
    setCertLookupStatus({ loading: true });
    try {
      const res = await fetch(`/api/certificates/verify?code=${encodeURIComponent(code)}`);
      const payload = (await res.json()) as {
        found?: boolean;
        configured?: boolean;
        certificate?: CertificateRecord;
        error?: string;
      };
      if (!res.ok) {
        setCertLookupStatus({ loading: false, error: payload.error || 'Invalid code format.' });
        return;
      }
      setCertLookupStatus({
        loading: false,
        found: payload.found,
        configured: payload.configured,
        certificate: payload.certificate,
      });
    } catch {
      setCertLookupStatus({ loading: false, error: 'Verification request failed.' });
    }
  };

  const activePreview = emailStudio?.previews[activeTemplate];

  return (
    <div className="min-h-screen bg-[#00205B] bg-architectural-grid text-white flex flex-col">
      <header className="sticky top-0 z-30 w-full border-b border-white/10 glass-midnight">
        <div className="max-w-[1200px] mx-auto px-6 h-18 flex items-center justify-between gap-6">
          <Link href="/" className="tactile-press shrink-0">
            <ApexLogo variant="dark" size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="tactile-press inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-[#FFE264]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Academy</span>
            </Link>
            {status?.authenticated && status.method === 'bearer' && (
              <button
                type="button"
                onClick={handleSignOut}
                className="tactile-press inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-10">
        {loading && !status ? (
          <div className="rounded-3xl bg-[#00153D] border border-white/10 p-12 text-center text-sm text-white/75">
            Verifying admin session...
          </div>
        ) : !status?.authenticated ? (
          <div className="max-w-lg mx-auto bg-white text-[#00205B] rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/15">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003087]">
              <ShieldCheck className="w-4 h-4 text-[#F2A900]" />
              <span>
                {status?.needsSetup ? 'First-Run Admin Setup' : 'Restricted Admin Access'}
              </span>
            </div>

            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00205B]">
              {status?.needsSetup ? 'Claim Admin Account' : 'Admin Console Sign In'}
            </h1>

            <p className="mt-2 text-sm text-[#00205B]/75 leading-relaxed">
              {status?.needsSetup
                ? 'Choose a strong password for your admin account below. Once claimed, this setup locks automatically. For Vercel production, also set ADMIN_EMAIL and ADMIN_PASSWORD in Environment Variables.'
                : 'Sign in with your server-configured admin credentials or an admin-role Supabase account.'}
            </p>

            {errorMsg && (
              <div
                role="alert"
                className="mt-5 rounded-xl bg-red-50 border border-red-200 p-3.5 flex items-start gap-2.5 text-xs text-red-800 font-semibold"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {infoMsg && (
              <div
                role="status"
                className="mt-5 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-start gap-2.5 text-xs text-emerald-900 font-semibold"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{infoMsg}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="admin-email" className="block text-xs font-bold text-[#00205B] mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@apex.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 text-sm text-[#00205B] focus:outline-none focus:border-[#003087]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-bold text-[#00205B] mb-1.5"
                >
                  {status?.needsSetup ? 'Create Strong Admin Password' : 'Admin Password'}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={status?.needsSetup ? 'Minimum 8 mixed characters' : 'Enter password'}
                    className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-300 text-sm text-[#00205B] focus:outline-none focus:border-[#003087]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-[#00205B] cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {status?.needsSetup && password.length > 0 && (
                  <div className="mt-2 flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <span
                        key={step}
                        className={`h-1.5 flex-1 rounded-full ${
                          strength.score >= step
                            ? strength.score >= 3
                              ? 'bg-emerald-600'
                              : 'bg-amber-500'
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-[11px] font-bold text-[#00205B]/70">
                      {strength.label}
                    </span>
                  </div>
                )}
              </div>

              {status?.needsSetup && (
                <div>
                  <label
                    htmlFor="admin-confirm-password"
                    className="block text-xs font-bold text-[#00205B] mb-1.5"
                  >
                    Confirm Admin Password
                  </label>
                  <input
                    id="admin-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 text-sm text-[#00205B] focus:outline-none focus:border-[#003087]"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-sm font-extrabold transition-colors disabled:opacity-50 cursor-pointer"
              >
                {submitting
                  ? 'Verifying...'
                  : status?.needsSetup
                    ? 'Claim Admin Access'
                    : 'Sign In to Admin Console'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-[#00205B]/75 flex items-center justify-between">
              <span>Have a Supabase admin-role account?</span>
              <Link href="/signin?next=/admin" className="font-bold text-[#003087] hover:underline">
                Sign in via Supabase
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F2A900]">
                  Verified Admin Console · {status.email}
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
                  Academy Operations, Email Studio &amp; Security
                </h1>
              </div>
              <span className="text-xs font-mono text-[#FFE264]">
                Auth: {status.method === 'supabase' ? 'Supabase RBAC' : 'Server Bearer Session'}
              </span>
            </div>

            {infoMsg && (
              <div className="rounded-2xl bg-[#003087] border border-[#F2A900]/40 p-4 text-xs text-white flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F2A900] shrink-0" />
                <span>{infoMsg}</span>
              </div>
            )}

            {/* KPI Strip */}
            {overview && (
              <div className="grid sm:grid-cols-3 gap-5">
                <div className="rounded-2xl bg-[#00153D] border border-white/15 p-6">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <BookOpen className="w-4 h-4 text-[#F2A900]" />
                    <span>Published Courses</span>
                  </div>
                  <p className="mt-2 text-3xl font-extrabold tabular-nums text-white">
                    {overview.catalogSummary.totalCourses}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#00153D] border border-white/15 p-6">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Layers className="w-4 h-4 text-[#F2A900]" />
                    <span>Total Progressive Lessons</span>
                  </div>
                  <p className="mt-2 text-3xl font-extrabold tabular-nums text-white">
                    {overview.catalogSummary.totalLessons}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#00153D] border border-white/15 p-6">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Mail className="w-4 h-4 text-[#F2A900]" />
                    <span>Email Adapter Mode</span>
                  </div>
                  <p className="mt-2 text-xl font-extrabold text-white capitalize">
                    {emailStudio?.providerStatus.activeProvider === 'preview'
                      ? 'Preview Simulation'
                      : emailStudio?.providerStatus.activeProvider || 'Checking...'}
                  </p>
                </div>
              </div>
            )}

            {/* Email Notifications Studio & Audit Logs */}
            {emailStudio && (
              <section className="rounded-3xl bg-white text-[#00205B] overflow-hidden shadow-2xl">
                <div className="bg-[#00153D] text-white px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F2A900]">
                      <Mail className="w-4 h-4" />
                      <span>Transactional Email Studio</span>
                    </div>
                    <h2 className="mt-1 text-xl font-extrabold">
                      Resend &amp; Postmark Templates, Test Dispatch &amp; Delivery Logs
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/80">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          emailStudio.providerStatus.resendConfigured
                            ? 'text-[#F2A900]'
                            : 'text-white/40'
                        }`}
                      />
                      <span>
                        Resend: {emailStudio.providerStatus.resendConfigured ? 'Configured' : 'Standby'}
                      </span>
                    </span>
                    <span aria-hidden="true">/</span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          emailStudio.providerStatus.postmarkConfigured
                            ? 'text-[#F2A900]'
                            : 'text-white/40'
                        }`}
                      />
                      <span>
                        Postmark:{' '}
                        {emailStudio.providerStatus.postmarkConfigured ? 'Configured' : 'Standby'}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Template Switcher + Test Dispatch Controls */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                    <div className="inline-flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl self-start">
                      {(['welcome', 'course_completion', 'weekly_streak'] as EmailEventType[]).map(
                        (key) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setActiveTemplate(key)}
                            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                              activeTemplate === key
                                ? 'bg-[#00205B] text-white shadow-sm'
                                : 'text-[#00205B]/75 hover:text-[#00205B]'
                            }`}
                          >
                            {TEMPLATE_LABELS[key]}
                          </button>
                        )
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <select
                        value={providerChoice}
                        onChange={(e) =>
                          setProviderChoice(e.target.value as 'auto' | 'resend' | 'postmark')
                        }
                        aria-label="Select email provider adapter"
                        className="h-10 px-3 rounded-xl border border-slate-300 text-xs font-bold text-[#00205B] bg-white cursor-pointer"
                      >
                        <option value="auto">Auto Adapter</option>
                        <option value="resend">Resend Adapter</option>
                        <option value="postmark">Postmark Adapter</option>
                      </select>

                      <input
                        type="email"
                        value={testRecipient}
                        onChange={(e) => setTestRecipient(e.target.value)}
                        placeholder="Recipient email..."
                        aria-label="Test email recipient"
                        className="h-10 px-3.5 rounded-xl border border-slate-300 text-xs text-[#00205B] w-52"
                      />

                      <button
                        type="button"
                        disabled={sendingEmail}
                        onClick={() => void handleSendTestEmail('send_test')}
                        className="h-10 px-4 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-extrabold inline-flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{sendingEmail ? 'Sending...' : 'Send Test Email'}</span>
                      </button>

                      <button
                        type="button"
                        disabled={sendingEmail}
                        onClick={() => void handleSendTestEmail('trigger_weekly_streak')}
                        className="h-10 px-4 rounded-full border border-[#00205B] text-[#00205B] hover:bg-slate-50 text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                      >
                        Test Weekly Digest
                      </button>
                    </div>
                  </div>

                  {emailNotice && (
                    <div className="rounded-xl bg-[#00205B]/[0.05] border border-[#003087]/20 px-4 py-3 text-xs font-semibold text-[#003087] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F2A900] shrink-0" />
                      <span>{emailNotice}</span>
                    </div>
                  )}

                  {/* Subject & Isolated Template Preview Frame */}
                  {activePreview && (
                    <div className="rounded-2xl border border-slate-200 overflow-hidden">
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <span className="font-bold text-[#00205B]/60 mr-2">Subject:</span>
                          <span className="font-bold text-[#00205B]">{activePreview.subject}</span>
                        </div>
                        <div className="inline-flex p-0.5 bg-slate-200/80 rounded-lg">
                          <button
                            type="button"
                            onClick={() => setPreviewMode('html')}
                            className={`px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                              previewMode === 'html'
                                ? 'bg-white text-[#00205B] shadow-sm'
                                : 'text-[#00205B]/70'
                            }`}
                          >
                            HTML Preview
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewMode('text')}
                            className={`px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                              previewMode === 'text'
                                ? 'bg-white text-[#00205B] shadow-sm'
                                : 'text-[#00205B]/70'
                            }`}
                          >
                            Plain Text
                          </button>
                        </div>
                      </div>

                      {previewMode === 'html' ? (
                        <iframe
                          title={`${TEMPLATE_LABELS[activeTemplate]} Preview`}
                          sandbox=""
                          srcDoc={activePreview.html}
                          className="w-full h-[420px] bg-[#00153D] border-0"
                        />
                      ) : (
                        <pre className="p-5 bg-slate-50 text-xs font-mono text-[#00205B] whitespace-pre-wrap leading-relaxed">
                          {activePreview.text}
                        </pre>
                      )}
                    </div>
                  )}

                  {/* Delivery Audit Log Table */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-[#00205B]">
                        Recent Email Delivery Logs
                      </h3>
                      <span className="text-xs text-[#00205B]/65">
                        Recipient addresses masked for privacy
                      </span>
                    </div>

                    {emailStudio.logs.length === 0 ? (
                      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-center text-xs text-[#00205B]/70">
                        No email dispatches recorded yet. Send a test email above to verify your
                        adapter and inspect the delivery log.
                      </div>
                    ) : (
                      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 text-[#00205B]/70 uppercase tracking-wider">
                            <tr>
                              <th className="px-4 py-3 font-bold">Event</th>
                              <th className="px-4 py-3 font-bold">Recipient</th>
                              <th className="px-4 py-3 font-bold">Adapter</th>
                              <th className="px-4 py-3 font-bold">Status</th>
                              <th className="px-4 py-3 font-bold">Message ID</th>
                              <th className="px-4 py-3 font-bold">Timestamp</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {emailStudio.logs.map((entry) => (
                              <tr key={entry.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-bold text-[#00205B]">
                                  {TEMPLATE_LABELS[entry.eventType] ?? entry.eventType}
                                </td>
                                <td className="px-4 py-3 font-mono">{entry.recipientMasked}</td>
                                <td className="px-4 py-3 capitalize">{entry.provider}</td>
                                <td className="px-4 py-3 font-bold capitalize">
                                  {entry.status === 'sent'
                                    ? 'Sent'
                                    : entry.status === 'simulated'
                                      ? 'Preview Simulated'
                                      : entry.status === 'skipped'
                                        ? 'Skipped (Opt-Out)'
                                        : 'Failed'}
                                </td>
                                <td className="px-4 py-3 font-mono text-[11px] text-[#00205B]/70">
                                  {entry.externalMessageId || '—'}
                                </td>
                                <td className="px-4 py-3 tabular-nums text-[#00205B]/70">
                                  {new Date(entry.createdAt).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Curriculum Catalog Table */}
            {overview && (
              <div className="rounded-3xl bg-white text-[#00205B] overflow-hidden shadow-xl">
                <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-lg font-extrabold">Curriculum Registry</h2>
                  <span className="text-xs font-semibold text-[#003087]">
                    {overview.catalogSummary.totalTracks} Discipline Tracks
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[#00205B]/70 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3 font-bold">Course</th>
                        <th className="px-6 py-3 font-bold">Track</th>
                        <th className="px-6 py-3 font-bold">Level</th>
                        <th className="px-6 py-3 font-bold">Lessons</th>
                        <th className="px-6 py-3 font-bold">Capstone</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {overview.catalogSummary.courses.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/80">
                          <td className="px-6 py-3.5 font-bold text-[#00205B]">{c.title}</td>
                          <td className="px-6 py-3.5 text-[#00205B]/75">{c.track}</td>
                          <td className="px-6 py-3.5 text-[#00205B]/75">{c.level}</td>
                          <td className="px-6 py-3.5 font-mono tabular-nums">{c.lessons}</td>
                          <td className="px-6 py-3.5 text-[#003087] font-semibold">
                            {c.capstoneTitle}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Credential Verification Audit + Supabase Edge Function Guide */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-[#00153D] border border-white/15 p-6 space-y-4">
                <h2 className="text-base font-extrabold text-white">
                  Verify Issued Certificate ID
                </h2>
                <form onSubmit={handleVerifyCertificate} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-white/45 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={certQuery}
                      onChange={(e) => setCertQuery(e.target.value)}
                      placeholder="APEX-2026-..."
                      className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#00205B] border border-white/20 text-xs text-white focus:outline-none focus:border-[#F2A900]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 h-10 rounded-xl bg-[#F2A900] text-[#00205B] text-xs font-bold cursor-pointer"
                  >
                    Verify
                  </button>
                </form>

                {certLookupStatus && !certLookupStatus.loading && (
                  <div className="text-xs text-white/80">
                    {certLookupStatus.error ? (
                      <p className="text-red-300">{certLookupStatus.error}</p>
                    ) : certLookupStatus.found && certLookupStatus.certificate ? (
                      <p className="text-[#FFE264] font-semibold">
                        Verified: {certLookupStatus.certificate.learnerName} —{' '}
                        {certLookupStatus.certificate.capstoneTitle} (
                        {certLookupStatus.certificate.rubricScore}/100)
                      </p>
                    ) : (
                      <p>
                        {certLookupStatus.configured === false
                          ? 'Connect Supabase env vars to query remote database certificates.'
                          : 'No certificate matched that verification ID.'}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-3xl bg-[#00153D] border border-white/15 p-6 space-y-3 text-xs text-white/80">
                <h2 className="text-base font-extrabold text-white">
                  Deploy Supabase Edge Function &amp; Webhooks
                </h2>
                <p className="leading-relaxed">
                  Deploy <code className="font-mono text-[#FFE264]">send-notifications</code>, set{' '}
                  <code className="font-mono text-[#FFE264]">RESEND_API_KEY</code> or{' '}
                  <code className="font-mono text-[#FFE264]">POSTMARK_SERVER_TOKEN</code> plus{' '}
                  <code className="font-mono text-[#FFE264]">NOTIFICATION_WEBHOOK_SECRET</code>, and
                  point Supabase Database Webhooks (<code className="font-mono">INSERT</code> on{' '}
                  <code className="font-mono">profiles</code> and{' '}
                  <code className="font-mono">capstone_certificates</code>) to the function.
                </p>
                <pre className="p-3 rounded-xl bg-[#00205B] border border-white/10 font-mono text-[11px] text-[#FFE264] overflow-x-auto">
                  {`supabase functions deploy send-notifications --no-verify-jwt`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
