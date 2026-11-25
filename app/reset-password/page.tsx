import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthExperience } from '@/components/AuthExperience';

export const metadata: Metadata = {
  title: 'Set New Password — Apex Academy',
  description: 'Set a strong new password for your Apex Academy learner account.',
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#00205B]" />}>
      <AuthExperience mode="reset-password" />
    </Suspense>
  );
}
