'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCircle2,
  KeyRound,
  LogOut,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  type NotificationPreferences,
} from '@/lib/email-templates';
import type { LearnerProfile } from '@/lib/storage';
import { FluidSheet } from './FluidPrimitives';

interface AccountModalProps {
  profile: LearnerProfile;
  onUpdateProfile: (profile: LearnerProfile) => void;
  onClose: () => void;
  onSignedOut: () => void;
}

const PROVIDER_LABELS: Record<string, string> = {
  google: 'Google Account',
  github: 'GitHub Account',
  email: 'Email & Password',
};

export function AccountModal({
  profile,
  onUpdateProfile,
  onClose,
  onSignedOut,
}: AccountModalProps) {
  const [name, setName] = useState(profile.name);
  const [headline, setHeadline] = useState(profile.headline);
  const [prefs, setPrefs] = useState<NotificationPreferences>(
    profile.notificationPreferences ?? DEFAULT_NOTIFICATION_PREFERENCES
  );
  const [savingPref, setSavingPref] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const isAuthenticated = Boolean(profile.userId);
  const providerLabel = PROVIDER_LABELS[profile.provider ?? 'email'] ?? 'Verified Account';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanHeadline = headline.trim();
    if (cleanName.length < 2) {
      setErrorMessage('Full name must be at least 2 characters.');
      return;
    }
    onUpdateProfile({
      ...profile,
      name: cleanName.slice(0, 120),
      headline: cleanHeadline.slice(0, 160) || 'Capstone Builder',
      notificationPreferences: prefs,
    });
    setStatusMessage('Learner profile updated and synced to your account.');
    setErrorMessage(null);
  };

  const handleTogglePreference = async (key: keyof NotificationPreferences) => {
    const nextPrefs: NotificationPreferences = {
      ...prefs,
      [key]: !prefs[key],
    };
    setPrefs(nextPrefs);
    setSavingPref(true);
    setErrorMessage(null);

    onUpdateProfile({
      ...profile,
      notificationPreferences: nextPrefs,
    });

    try {
      const res = await fetch('/api/notifications/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextPrefs),
      });
      if (res.ok) {
        setStatusMessage('Email notification preferences saved.');
      } else {
        setStatusMessage('Notification preferences saved for this session.');
      }
    } catch {
      setStatusMessage('Notification preferences saved locally.');
    } finally {
      setSavingPref(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    setErrorMessage(null);
    try {
      const supabase = getSupabaseClient();
      if (supabase && isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
      onSignedOut();
      onClose();
    } catch {
      setErrorMessage('Could not complete sign out cleanly. Please try again.');
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <FluidSheet
      onClose={onClose}
      ariaLabelledBy="account-modal-title"
      maxWidthClass="max-w-lg"
    >
      <div className="px-6 pb-5 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <User className="w-5 h-5 text-[#F2A900]" />
          <h2 id="account-modal-title" className="text-lg font-extrabold tracking-tight text-white">
            Learner Account &amp; Notifications
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="tactile-press p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          aria-label="Close account modal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white text-[#00205B] p-6 space-y-6 max-h-[78vh] overflow-y-auto">
        {!isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-sm text-[#00205B]/80 leading-relaxed">
              Sign in or create a free account with Google, GitHub, or Email to enroll in
              courses, save code drafts, and earn verified credentials.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signin"
                onClick={onClose}
                className="tactile-press px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={onClose}
                className="tactile-press px-5 py-2.5 rounded-full bg-[#00205B] hover:bg-[#003087] text-white text-xs font-bold"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Connected Identity Overview */}
            <div className="rounded-2xl bg-[#00205B]/[0.04] border border-[#00205B]/15 p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#003087] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#F2A900] shrink-0" />
                  <span>{providerLabel}</span>
                </p>
                <p className="mt-1 text-sm font-extrabold text-[#00205B] truncate">
                  {profile.email || profile.name}
                </p>
              </div>
              <button
                type="button"
                disabled={signingOut}
                onClick={handleSignOut}
                className="tactile-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-[#00205B] shrink-0 disabled:opacity-50 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{signingOut ? 'Signing Out...' : 'Sign Out'}</span>
              </button>
            </div>

            {/* Learner Profile Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label htmlFor="profile-name" className="block text-xs font-bold text-[#00205B]">
                  Full Name (Printed on Verified Certificates)
                </label>
                <input
                  id="profile-name"
                  type="text"
                  required
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#00205B] focus:outline-none focus:border-[#003087] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-headline"
                  className="block text-xs font-bold text-[#00205B]"
                >
                  Portfolio Headline
                </label>
                <input
                  id="profile-headline"
                  type="text"
                  maxLength={160}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#00205B] focus:outline-none focus:border-[#003087] transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="submit"
                  className="tactile-press px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold cursor-pointer"
                >
                  Save Profile
                </button>

                {profile.provider === 'email' && (
                  <Link
                    href="/reset-password"
                    onClick={onClose}
                    className="tactile-press inline-flex items-center gap-1.5 text-xs font-bold text-[#003087] hover:underline"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Update Password</span>
                  </Link>
                )}
              </div>
            </form>

            {/* Email Notification Preferences */}
            <div className="pt-5 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.04em] text-[#003087]">
                  <Bell className="w-4 h-4 text-[#F2A900]" />
                  <span>Email Notifications</span>
                </div>
                {savingPref && (
                  <span className="text-[11px] font-medium text-[#00205B]/60">Saving...</span>
                )}
              </div>

              <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
                <label className="tactile-press flex items-center justify-between gap-4 p-3.5 bg-white hover:bg-slate-50 cursor-pointer">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#00205B]">
                      Course Completion &amp; Certificate Alerts
                    </p>
                    <p className="text-[11px] text-[#00205B]/65 mt-0.5">
                      Receive your verification ID and shareable link when a capstone passes.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefs.completion}
                    onChange={() => void handleTogglePreference('completion')}
                    className="w-4 h-4 accent-[#00205B] cursor-pointer shrink-0"
                  />
                </label>

                <label className="tactile-press flex items-center justify-between gap-4 p-3.5 bg-white hover:bg-slate-50 cursor-pointer">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#00205B]">
                      Weekly Study Streak Reminders
                    </p>
                    <p className="text-[11px] text-[#00205B]/65 mt-0.5">
                      Weekly digest of your study streak and next unlocked milestone.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefs.weeklyStreak}
                    onChange={() => void handleTogglePreference('weeklyStreak')}
                    className="w-4 h-4 accent-[#00205B] cursor-pointer shrink-0"
                  />
                </label>

                <label className="tactile-press flex items-center justify-between gap-4 p-3.5 bg-white hover:bg-slate-50 cursor-pointer">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#00205B]">
                      Welcome &amp; Onboarding Guide
                    </p>
                    <p className="text-[11px] text-[#00205B]/65 mt-0.5">
                      Account activation checklist sent once after signing up.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefs.welcome}
                    onChange={() => void handleTogglePreference('welcome')}
                    className="w-4 h-4 accent-[#00205B] cursor-pointer shrink-0"
                  />
                </label>
              </div>
            </div>
          </>
        )}

        {statusMessage && (
          <p className="flex items-center gap-1.5 text-xs font-semibold text-[#003087]">
            <CheckCircle2 className="w-4 h-4 text-[#F2A900] shrink-0" />
            <span>{statusMessage}</span>
          </p>
        )}

        {errorMessage && (
          <p className="text-xs font-semibold text-red-600">{errorMessage}</p>
        )}
      </div>
    </FluidSheet>
  );
}
