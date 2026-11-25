'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Chrome,
  Eye,
  EyeOff,
  Github,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  User,
} from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { getCourseById } from '@/lib/curriculum';
import { getCourseThumbnail } from '@/lib/course-assets';
import {
  mapAuthError,
  sanitizeCourseId,
  sanitizeRedirectPath,
  validatePasswordStrength,
} from '@/lib/security';
import { ApexLogo } from './ApexLogo';
import { SPRING_CRITICALLY_DAMPED } from './FluidPrimitives';

export type AuthMode = 'signin' | 'signup' | 'forgot-password' | 'reset-password';

interface AuthExperienceProps {
  mode: AuthMode;
}

export function AuthExperience({ mode }: AuthExperienceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawEnroll = searchParams.get('enroll');
  const rawNext = searchParams.get('next');
  const rawError = searchParams.get('error');

  const enrollCourseId = useMemo(() => sanitizeCourseId(rawEnroll), [rawEnroll]);
  const enrollCourse = useMemo(
    () => (enrollCourseId ? getCourseById(enrollCourseId) : undefined),
    [enrollCourseId]
  );
  const safeNextPath = useMemo(() => sanitizeRedirectPath(rawNext, '/'), [rawNext]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [busyProvider, setBusyProvider] = useState<'email' | 'google' | 'github' | 'resend' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(() => {
    if (rawError === 'oauth_exchange_failed' || rawError === 'missing_code') {
      return 'Your sign-in link expired or could not be verified. Please try signing in again.';
    }
    if (rawError === 'auth_unconfigured') {
      return 'Supabase environment variables are not configured on this server yet.';
    }
    return null;
  });
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [needsConfirmationEmail, setNeedsConfirmationEmail] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [hasRecoverySession, setHasRecoverySession] = useState<boolean>(mode !== 'reset-password');

  const passwordStrength = useMemo(() => validatePasswordStrength(password), [password]);

  // Build destination URL after successful sign in
  const postAuthDestination = useMemo(() => {
    if (enrollCourseId) {
      return `/?enroll=${encodeURIComponent(enrollCourseId)}`;
    }
    return safeNextPath;
  }, [enrollCourseId, safeNextPath]);

  // Countdown for resend / submit cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // If already authenticated on /signin or /signup, route smoothly to destination
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured) return;

    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (mode === 'reset-password') {
        setHasRecoverySession(Boolean(data.session));
      } else if (data.session && (mode === 'signin' || mode === 'signup')) {
        router.replace(postAuthDestination);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === 'PASSWORD_RECOVERY') {
        setHasRecoverySession(true);
      } else if (event === 'SIGNED_IN' && session && (mode === 'signin' || mode === 'signup')) {
        router.replace(postAuthDestination);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [mode, postAuthDestination, router]);

  const buildCallbackUrl = (nextPathOverride?: string) => {
    const origin = window.location.origin;
    const url = new URL('/auth/callback', origin);
    url.searchParams.set('next', nextPathOverride ?? safeNextPath);
    if (enrollCourseId && !nextPathOverride) {
      url.searchParams.set('enroll', enrollCourseId);
    }
    return url.toString();
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setErrorMsg(null);
    setInfoMsg(null);

    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured) {
      setErrorMsg(
        'Connect NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel / Secrets to enable Google and GitHub login.'
      );
      return;
    }

    setBusyProvider(provider);
    try {
      const inIframe = window.self !== window.top;
      const redirectTo = buildCallbackUrl();

      if (inIframe) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo,
            skipBrowserRedirect: true,
          },
        });
        if (error) throw error;
        if (data?.url) {
          const popup = window.open(data.url, '_blank', 'noopener,noreferrer');
          if (!popup) {
            window.location.href = data.url;
          } else {
            setInfoMsg(
              `Complete ${provider === 'google' ? 'Google' : 'GitHub'} sign-in in the newly opened tab, then return here.`
            );
          }
        }
      } else {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo,
          },
        });
        if (error) throw error;
      }
    } catch (err) {
      setErrorMsg(mapAuthError(err).message);
    } finally {
      setBusyProvider(null);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);
    setNeedsConfirmationEmail(null);

    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured) {
      setErrorMsg(
        'Supabase authentication is not configured in this environment yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to activate account creation.'
      );
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (mode === 'forgot-password') {
      if (!cleanEmail) {
        setErrorMsg('Enter your account email address.');
        return;
      }
      setBusyProvider('email');
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: buildCallbackUrl('/reset-password'),
        });
        if (error) throw error;
        // Privacy-preserving message regardless of whether email is registered
        setInfoMsg(
          'If an Apex Academy account exists for that email, a secure password reset link is on its way.'
        );
      } catch (err) {
        setErrorMsg(mapAuthError(err).message);
      } finally {
        setBusyProvider(null);
      }
      return;
    }

    if (mode === 'reset-password') {
      if (!passwordStrength.isAcceptable) {
        setErrorMsg('Choose a stronger password meeting at least 8 characters and mixed character types.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      setBusyProvider('email');
      try {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setInfoMsg('Password updated securely. Redirecting to your learning workspace...');
        setTimeout(() => router.replace('/'), 1000);
      } catch (err) {
        setErrorMsg(mapAuthError(err).message);
      } finally {
        setBusyProvider(null);
      }
      return;
    }

    if (mode === 'signup') {
      const cleanName = fullName.trim();
      if (cleanName.length < 2) {
        setErrorMsg('Enter your full name as you want it printed on verified certificates.');
        return;
      }
      if (!passwordStrength.isAcceptable) {
        setErrorMsg('Choose a stronger password (8+ characters with mixed letters and numbers).');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }

      setBusyProvider('email');
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            emailRedirectTo: buildCallbackUrl(),
            data: {
              full_name: cleanName.slice(0, 120),
            },
          },
        });
        if (error) throw error;

        if (data.session) {
          router.replace(postAuthDestination);
        } else {
          setNeedsConfirmationEmail(cleanEmail);
          setResendCooldown(45);
          setInfoMsg(
            `Account created! Check ${cleanEmail} for a confirmation link to activate enrollment.`
          );
        }
      } catch (err) {
        setErrorMsg(mapAuthError(err).message);
      } finally {
        setBusyProvider(null);
      }
      return;
    }

    // mode === 'signin'
    if (!cleanEmail || !password) {
      setErrorMsg('Enter both your email address and password.');
      return;
    }

    setBusyProvider('email');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (error) throw error;

      if (data.session) {
        router.replace(postAuthDestination);
      }
    } catch (err) {
      const mapped = mapAuthError(err);
      setErrorMsg(mapped.message);
      if (mapped.needsEmailConfirmation) {
        setNeedsConfirmationEmail(cleanEmail);
      }
    } finally {
      setBusyProvider(null);
    }
  };

  const handleResendConfirmation = async () => {
    if (!needsConfirmationEmail || resendCooldown > 0) return;
    const supabase = getSupabaseClient();
    if (!supabase) return;

    setBusyProvider('resend');
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: needsConfirmationEmail,
        options: {
          emailRedirectTo: buildCallbackUrl(),
        },
      });
      if (error) throw error;
      setResendCooldown(60);
      setInfoMsg(`Verification email re-sent to ${needsConfirmationEmail}.`);
    } catch (err) {
      setErrorMsg(mapAuthError(err).message);
    } finally {
      setBusyProvider(null);
    }
  };

  const modeQuerySuffix = enrollCourseId
    ? `?enroll=${encodeURIComponent(enrollCourseId)}`
    : safeNextPath !== '/'
      ? `?next=${encodeURIComponent(safeNextPath)}`
      : '';

  const headline =
    mode === 'signup'
      ? 'Create your learner account'
      : mode === 'forgot-password'
        ? 'Reset your password'
        : mode === 'reset-password'
          ? 'Set a new password'
          : 'Sign in to Apex Academy';

  const subheading =
    mode === 'signup'
      ? 'Create a free account to enroll in capstone courses, save code drafts, and earn verified credentials.'
      : mode === 'forgot-password'
        ? 'Enter your email and we will send a secure Supabase recovery link.'
        : mode === 'reset-password'
          ? 'Choose a strong password for your Apex Academy account.'
          : 'Welcome back. Access your enrolled courses, sandbox code, and verified portfolio.';

  return (
    <div className="min-h-screen bg-[#00205B] bg-architectural-grid text-white flex flex-col">
      {/* Top minimal navigation */}
      <div className="w-full max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900] rounded-sm"
          aria-label="Apex Academy Home"
        >
          <ApexLogo variant="dark" size="sm" />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-[#FFE264] transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Main 2-column balanced auth split */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-6 md:py-10 flex items-center">
        <div className="w-full grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Midnight Brand & Security Context Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_CRITICALLY_DAMPED}
            className="lg:col-span-5 flex flex-col justify-between gap-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#F2A900]">
                Account &amp; Enrollment Access
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-[-0.025em] leading-[1.08] text-white text-balance">
                Build real systems.{' '}
                <span className="font-serif italic font-semibold text-[#FFE264]">
                  Own your proof.
                </span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                Browsing the curriculum is always open. Sign in with Google, GitHub, or
                Email to enroll in courses, persist sandbox progress across devices, and
                mint employer-verifiable certificates.
              </p>

              {/* Contextual Course Enrollment Intent Banner */}
              {enrollCourse && (
                <div className="mt-6 rounded-2xl glass-midnight-deep border border-[#F2A900]/45 p-4 flex items-center gap-4">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-[#00205B]">
                    <Image
                      src={getCourseThumbnail(enrollCourse)}
                      alt={enrollCourse.title}
                      fill
                      sizes="80px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFE264]">
                      Enrolling in Course
                    </p>
                    <p className="mt-0.5 text-sm font-extrabold text-white truncate">
                      {enrollCourse.title}
                    </p>
                    <p className="mt-0.5 text-xs text-white/70 truncate">
                      {enrollCourse.track} · {enrollCourse.modules.length} Lessons
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Security Guarantees List */}
            <div className="rounded-2xl glass-midnight-deep border border-white/15 p-5 space-y-3.5 text-xs text-white/85">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#F2A900] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-white">PKCE OAuth &amp; HTTP-Cookie Sessions</p>
                  <p className="mt-0.5 text-white/70">
                    Authentication codes exchange securely on the server with open-redirect
                    protection and automatic token refresh.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#F2A900] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-white">Row-Level Data Isolation</p>
                  <p className="mt-0.5 text-white/70">
                    Your enrollments, code drafts, and mentor rubrics are protected per-user
                    in Supabase PostgreSQL and isolated on sign-out.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#F2A900] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-white">Zero-PII Public Verification</p>
                  <p className="mt-0.5 text-white/70">
                    Issued certificates can be verified publicly by credential ID without
                    exposing your private email address.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Crisp White Auth Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CRITICALLY_DAMPED, delay: 0.04 }}
            className="lg:col-span-7 bg-white text-[#00205B] rounded-3xl p-7 sm:p-10 shadow-2xl border border-white/15 flex flex-col justify-center"
          >
            {/* Mode Switcher for Sign In / Create Account */}
            {(mode === 'signin' || mode === 'signup') && (
              <div className="inline-flex p-1 rounded-xl bg-slate-100 self-start mb-6">
                <Link
                  href={`/signin${modeQuerySuffix}`}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    mode === 'signin'
                      ? 'bg-[#00205B] text-white shadow-sm'
                      : 'text-[#00205B]/70 hover:text-[#00205B]'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href={`/signup${modeQuerySuffix}`}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    mode === 'signup'
                      ? 'bg-[#00205B] text-white shadow-sm'
                      : 'text-[#00205B]/70 hover:text-[#00205B]'
                  }`}
                >
                  Create Account
                </Link>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00205B] text-balance">
              {headline}
            </h2>
            <p className="mt-2 text-sm text-[#00205B]/75 leading-relaxed">{subheading}</p>

            {!isSupabaseConfigured && (
              <div className="mt-5 rounded-2xl bg-[#00205B]/[0.05] border border-[#003087]/20 p-4 text-xs text-[#00205B]/85 space-y-1.5">
                <p className="font-bold text-[#003087]">
                  Supabase Keys Needed for Live Authentication
                </p>
                <p className="leading-relaxed">
                  Add <code className="font-mono bg-slate-200/70 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code>{' '}
                  and <code className="font-mono bg-slate-200/70 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{' '}
                  in Vercel Environment Variables, enable Google &amp; GitHub in Supabase Auth,
                  and allowlist <code className="font-mono bg-slate-200/70 px-1 rounded">/auth/callback</code>.
                </p>
              </div>
            )}

            {/* Social OAuth Buttons on Sign In & Sign Up */}
            {(mode === 'signin' || mode === 'signup') && (
              <>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={busyProvider !== null}
                    onClick={() => handleOAuthLogin('google')}
                    className="tactile-press h-11 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#00205B] text-sm font-bold inline-flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
                  >
                    <Chrome className="w-4 h-4 text-[#003087]" />
                    <span>
                      {busyProvider === 'google' ? 'Connecting...' : 'Continue with Google'}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={busyProvider !== null}
                    onClick={() => handleOAuthLogin('github')}
                    className="tactile-press h-11 px-4 rounded-xl border border-[#00205B] bg-[#00205B] hover:bg-[#003087] text-white text-sm font-bold inline-flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-[#F2A900]" />
                    <span>
                      {busyProvider === 'github' ? 'Connecting...' : 'Continue with GitHub'}
                    </span>
                  </button>
                </div>

                <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="font-medium text-slate-500">or continue with email</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              </>
            )}

            {/* Status / Error Alerts */}
            {errorMsg && (
              <div
                role="alert"
                className="mb-5 rounded-xl bg-red-50 border border-red-200 p-3.5 flex items-start gap-2.5 text-xs text-red-800"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <p className="font-semibold leading-relaxed">{errorMsg}</p>
                  {needsConfirmationEmail && (
                    <button
                      type="button"
                      disabled={resendCooldown > 0 || busyProvider === 'resend'}
                      onClick={handleResendConfirmation}
                      className="inline-flex items-center gap-1.5 font-bold text-[#003087] hover:underline disabled:opacity-50 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>
                        {resendCooldown > 0
                          ? `Resend confirmation in ${resendCooldown}s`
                          : 'Resend confirmation email'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {infoMsg && (
              <div
                role="status"
                className="mb-5 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-start gap-2.5 text-xs text-emerald-900"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <p className="font-semibold leading-relaxed">{infoMsg}</p>
                  {needsConfirmationEmail && (
                    <button
                      type="button"
                      disabled={resendCooldown > 0 || busyProvider === 'resend'}
                      onClick={handleResendConfirmation}
                      className="inline-flex items-center gap-1.5 font-bold text-[#003087] hover:underline disabled:opacity-50 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>
                        {resendCooldown > 0
                          ? `Resend available in ${resendCooldown}s`
                          : 'Resend confirmation email'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {mode === 'reset-password' && !hasRecoverySession ? (
              <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm text-[#00205B]/80 space-y-3">
                <p className="font-bold text-[#00205B]">Recovery session required</p>
                <p>
                  Open the password reset link sent to your email address, or request a fresh
                  reset link below.
                </p>
                <Link
                  href="/forgot-password"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F2A900] text-[#00205B] text-xs font-bold"
                >
                  <span>Request Reset Link</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4" noValidate>
                {mode === 'signup' && (
                  <div>
                    <label
                      htmlFor="auth-fullname"
                      className="block text-xs font-bold text-[#00205B] mb-1.5"
                    >
                      Full Name (Printed on Certificates)
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="auth-fullname"
                        type="text"
                        required
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Jordan Rivera"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 text-sm text-[#00205B] placeholder:text-slate-400 focus:outline-none focus:border-[#003087]"
                      />
                    </div>
                  </div>
                )}

                {(mode === 'signin' || mode === 'signup' || mode === 'forgot-password') && (
                  <div>
                    <label
                      htmlFor="auth-email"
                      className="block text-xs font-bold text-[#00205B] mb-1.5"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="auth-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 text-sm text-[#00205B] placeholder:text-slate-400 focus:outline-none focus:border-[#003087]"
                      />
                    </div>
                  </div>
                )}

                {(mode === 'signin' || mode === 'signup' || mode === 'reset-password') && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="auth-password"
                        className="block text-xs font-bold text-[#00205B]"
                      >
                        {mode === 'reset-password' ? 'New Password' : 'Password'}
                      </label>
                      {mode === 'signin' && (
                        <Link
                          href="/forgot-password"
                          className="text-xs font-semibold text-[#003087] hover:underline"
                        >
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="auth-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={
                          mode === 'signin' ? 'Enter your password' : 'Minimum 8 characters'
                        }
                        className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-300 text-sm text-[#00205B] placeholder:text-slate-400 focus:outline-none focus:border-[#003087]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-[#00205B] cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Live Password Strength Meter on Sign Up & Password Reset */}
                    {(mode === 'signup' || mode === 'reset-password') && password.length > 0 && (
                      <div className="mt-2.5 space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          {[1, 2, 3, 4].map((step) => {
                            const filled = passwordStrength.score >= step;
                            const barColor =
                              passwordStrength.score <= 1
                                ? 'bg-red-500'
                                : passwordStrength.score === 2
                                  ? 'bg-amber-500'
                                  : passwordStrength.score === 3
                                    ? 'bg-[#307FE2]'
                                    : 'bg-emerald-600';
                            return (
                              <span
                                key={step}
                                className={`h-1.5 flex-1 rounded-full transition-colors ${
                                  filled ? barColor : 'bg-slate-200'
                                }`}
                              />
                            );
                          })}
                          <span className="ml-2 text-[11px] font-bold text-[#00205B]/75">
                            {passwordStrength.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#00205B]/65">
                          Use 8+ characters with uppercase, lowercase, and a number or symbol.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {(mode === 'signup' || mode === 'reset-password') && (
                  <div>
                    <label
                      htmlFor="auth-confirm-password"
                      className="block text-xs font-bold text-[#00205B] mb-1.5"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="auth-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 text-sm text-[#00205B] placeholder:text-slate-400 focus:outline-none focus:border-[#003087]"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busyProvider !== null}
                  className="tactile-press w-full h-12 mt-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-sm font-extrabold inline-flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(242,169,0,0.28)] disabled:opacity-50 cursor-pointer"
                >
                  <span>
                    {busyProvider === 'email'
                      ? 'Please wait...'
                      : mode === 'signup'
                        ? enrollCourse
                          ? 'Create Account & Enroll'
                          : 'Create Free Account'
                        : mode === 'forgot-password'
                          ? 'Send Password Reset Link'
                          : mode === 'reset-password'
                            ? 'Save New Password'
                            : enrollCourse
                              ? 'Sign In & Enroll'
                              : 'Sign In to Workspace'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {(mode === 'forgot-password' || mode === 'reset-password') && (
              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between text-xs">
                <Link
                  href="/signin"
                  className="font-bold text-[#003087] hover:underline inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
                <Link href="/signup" className="font-semibold text-[#00205B]/70 hover:text-[#00205B]">
                  Create a new account
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
