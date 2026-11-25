import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthExperience } from '@/components/AuthExperience';

export const metadata: Metadata = {
  title: 'Sign In — Apex Academy',
  description:
    'Sign in to Apex Academy with Google, GitHub, or email to enroll in capstone courses and track verified milestones.',
};

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#00205B]" />}>
      <AuthExperience mode="signin" />
    </Suspense>
  );
}
