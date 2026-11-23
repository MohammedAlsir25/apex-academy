'use client';

import React from 'react';
import { ApexLogo } from './ApexLogo';
import type { ActiveView } from './Header';

interface FooterProps {
  onNavigate: (view: ActiveView, sectionId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#00153D] border-t border-white/10 py-12 no-print">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <ApexLogo variant="dark" size="sm" />
          <p className="mt-3 text-xs text-white/65 max-w-sm leading-relaxed">
            Replit-standard interactive labs and 6-milestone capstones across Python,
            SQL, AI &amp; ML, Data Analytics, IT Support, UI/UX, and Digital Growth.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-white/75">
          <button
            type="button"
            onClick={() => onNavigate('home', 'catalog')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Course Catalog
          </button>
          <button
            type="button"
            onClick={() => onNavigate('home', 'scaffolding')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Scaffolding Methodology
          </button>
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Student Portfolio
          </button>
          <button
            type="button"
            onClick={() => onNavigate('certificates')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Verified Certificates
          </button>
        </div>

        <p className="text-xs text-white/50">
          &copy; {new Date().getFullYear()} Apex Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
