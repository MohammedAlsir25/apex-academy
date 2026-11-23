'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ApexLogo } from './ApexLogo';

export type ActiveView = 'home' | 'portfolio' | 'certificates';

interface HeaderProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, sectionId?: string) => void;
  onOpenAccount: () => void;
  enrolledCount: number;
  learnerName: string;
}

export function Header({
  activeView,
  onNavigate,
  onOpenAccount,
  enrolledCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLink = (view: ActiveView, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#00205B]/95 backdrop-blur-md border-b border-white/10 no-print">
      <div className="max-w-[1280px] mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Mark */}
        <button
          type="button"
          onClick={() => handleLink('home')}
          className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900] rounded-sm cursor-pointer"
          aria-label="Apex Academy Home"
        >
          <ApexLogo variant="dark" size="sm" />
        </button>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-white/80"
          aria-label="Primary Navigation"
        >
          <button
            type="button"
            onClick={() => handleLink('home', 'catalog')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer hover:text-white ${
              activeView === 'home' ? 'text-white' : ''
            }`}
          >
            Catalog
          </button>
          <button
            type="button"
            onClick={() => handleLink('home', 'scaffolding')}
            className="whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer hover:text-white"
          >
            Scaffolding
          </button>
          <button
            type="button"
            onClick={() => handleLink('portfolio')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer hover:text-white ${
              activeView === 'portfolio'
                ? 'text-[#F2A900] underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            Portfolio
          </button>
          <button
            type="button"
            onClick={() => handleLink('certificates')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer hover:text-white ${
              activeView === 'certificates'
                ? 'text-[#F2A900] underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            Certificates
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAccount}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {enrolledCount > 0 ? `My Learning (${enrolledCount})` : 'Start Learning'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#00153D] px-6 py-4 space-y-3">
          <div className="flex flex-col gap-2 text-sm font-medium text-white/90">
            <button
              type="button"
              onClick={() => handleLink('home', 'catalog')}
              className="text-left py-2 hover:text-[#F2A900] cursor-pointer"
            >
              Catalog
            </button>
            <button
              type="button"
              onClick={() => handleLink('home', 'scaffolding')}
              className="text-left py-2 hover:text-[#F2A900] cursor-pointer"
            >
              Scaffolding
            </button>
            <button
              type="button"
              onClick={() => handleLink('portfolio')}
              className="text-left py-2 hover:text-[#F2A900] cursor-pointer"
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => handleLink('certificates')}
              className="text-left py-2 hover:text-[#F2A900] cursor-pointer"
            >
              Certificates
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAccount();
            }}
            className="w-full py-2.5 rounded-full bg-[#F2A900] text-[#00205B] text-sm font-bold cursor-pointer"
          >
            {enrolledCount > 0 ? `My Learning (${enrolledCount})` : 'Start Learning'}
          </button>
        </div>
      )}
    </header>
  );
}
