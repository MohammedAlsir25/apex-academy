'use client';

import React, { useState } from 'react';
import { CheckCircle2, Database, LogOut, User, X } from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import type { LearnerProfile } from '@/lib/storage';

interface AccountModalProps {
  profile: LearnerProfile;
  onUpdateProfile: (profile: LearnerProfile) => void;
  onClose: () => void;
  onSyncComplete: () => Promise<void>;
}

export function AccountModal({
  profile,
  onUpdateProfile,
  onClose,
  onSyncComplete,
}: AccountModalProps) {
  const [name, setName] = useState(profile.name);
  const [headline, setHeadline] = useState(profile.headline);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name: name.trim() || 'Learner',
      headline: headline.trim() || 'Capstone Builder',
    });
    setStatusMessage('Learner profile updated for certificates and portfolio.');
    setErrorMessage(null);
  };

  const handleSupabaseAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabaseClient();
    if (!supabase) return;
    setBusy(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        setStatusMessage('Account created. Syncing your Supabase progress...');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setStatusMessage('Signed in to Supabase. Progress synchronized.');
      }
      await onSyncComplete();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to authenticate with Supabase.'
      );
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    onUpdateProfile({
      ...profile,
      userId: null,
    });
    setStatusMessage('Signed out of Supabase session.');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
    >
      <div className="w-full max-w-lg bg-white text-[#00205B] rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-[#00205B] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[#F2A900]" />
            <h2 id="account-modal-title" className="text-lg font-extrabold">
              Learner Profile &amp; Progress Sync
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            aria-label="Close account modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Learner Profile Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label htmlFor="profile-name" className="block text-xs font-bold text-[#00205B]">
                Full Name (Printed on Verified Certificates)
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-[#00205B] focus:outline-none focus:border-[#003087]"
              />
            </div>

            <div>
              <label htmlFor="profile-headline" className="block text-xs font-bold text-[#00205B]">
                Portfolio Headline
              </label>
              <input
                id="profile-headline"
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-[#00205B] focus:outline-none focus:border-[#003087]"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold transition-colors cursor-pointer"
            >
              Save Profile
            </button>
          </form>

          {/* Supabase Connection Section */}
          <div className="pt-5 border-t border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003087]">
              <Database className="w-4 h-4" />
              <span>Supabase Cloud Persistence</span>
            </div>

            {isSupabaseConfigured ? (
              profile.userId ? (
                <div className="rounded-xl bg-[#00205B]/5 border border-[#00205B]/15 p-4 flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <p className="font-bold text-[#00205B]">Connected as {profile.email}</p>
                    <p className="text-[#00205B]/70 mt-0.5">
                      Enrollments, milestones, and certificates sync to Supabase.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-[#00205B] cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSupabaseAuth} className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        authMode === 'signin'
                          ? 'bg-[#00205B] text-white'
                          : 'bg-slate-100 text-[#00205B]'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        authMode === 'signup'
                          ? 'bg-[#00205B] text-white'
                          : 'bg-slate-100 text-[#00205B]'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm"
                  />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm"
                  />

                  <button
                    type="submit"
                    disabled={busy}
                    className="px-5 py-2 rounded-full bg-[#00205B] text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                  >
                    {busy
                      ? 'Syncing...'
                      : authMode === 'signin'
                        ? 'Sign In & Sync'
                        : 'Create Supabase Account'}
                  </button>
                </form>
              )
            ) : (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-[#00205B]/80 space-y-2 leading-relaxed">
                <p className="font-bold text-[#00205B]">
                  Browser session continuity active
                </p>
                <p>
                  Your enrollments, code drafts, deliverables, and certificates are
                  saved automatically in this browser. To sync across devices via your
                  Supabase project, add{' '}
                  <code className="font-mono bg-slate-200/70 px-1 rounded">
                    NEXT_PUBLIC_SUPABASE_URL
                  </code>{' '}
                  and{' '}
                  <code className="font-mono bg-slate-200/70 px-1 rounded">
                    NEXT_PUBLIC_SUPABASE_ANON_KEY
                  </code>{' '}
                  in Secrets and run the schema in{' '}
                  <code className="font-mono bg-slate-200/70 px-1 rounded">
                    supabase/schema.sql
                  </code>.
                </p>
              </div>
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
        </div>
      </div>
    </div>
  );
}
