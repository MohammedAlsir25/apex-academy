import React from 'react';
import type { Metadata } from 'next';
import { AdminDashboard } from '@/components/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Console — Apex Academy',
  description: 'Protected curriculum management and credential verification console for Apex Academy.',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
