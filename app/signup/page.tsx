import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthExperience } from '@/components/AuthExperience';

export const metadata: Metadata = {
  title: 'Create Account — Apex Academy',
  description:
    'Create your free Apex Academy learner account with Google, GitHub, or email to enroll in courses and build your verified portfolio.',
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#00205B]" />}>
      <AuthExperience mode="signup" />
    </Suspense>
  );
}
