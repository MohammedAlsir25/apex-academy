import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthExperience } from '@/components/AuthExperience';

export const metadata: Metadata = {
  title: 'Reset Password — Apex Academy',
  description: 'Request a secure password reset link for your Apex Academy account.',
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#00205B]" />}>
      <AuthExperience mode="forgot-password" />
    </Suspense>
  );
}
