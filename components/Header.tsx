'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ApexLogo } from './ApexLogo';
import { SPRING_CRITICALLY_DAMPED, SPRING_SNAPPY } from './FluidPrimitives';

export type ActiveView = 'home' | 'portfolio' | 'certificates';

interface HeaderProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, sectionId?: string) => void;
  onOpenAccount: () => void;
  enrolledCount: number;
  learnerName: string;
  isAuthenticated: boolean;
}

export function Header({
  activeView,
  onNavigate,
  onOpenAccount,
  enrolledCount,
  isAuthenticated,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLink = (view: ActiveView, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full glass-midnight no-print">
      <div className="max-w-[1280px] mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Mark */}
        <button
          type="button"
          onClick={() => handleLink('home')}
          className="tactile-press whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900] rounded-sm cursor-pointer"
          aria-label="Apex Academy Home"
        >
          <ApexLogo variant="dark" size="sm" />
        </button>

        {/* Zone 2: 4 Clean Single-Line Nav Links with Spring Underline */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-white/85"
          aria-label="Primary Navigation"
        >
          <button
            type="button"
            onClick={() => handleLink('home', 'catalog')}
            className={`tactile-press relative whitespace-nowrap shrink-0 py-1.5 cursor-pointer hover:text-white ${
              activeView === 'home' ? 'text-white font-semibold' : ''
            }`}
          >
            Catalog
          </button>
          <button
            type="button"
            onClick={() => handleLink('home', 'scaffolding')}
            className="tactile-press relative whitespace-nowrap shrink-0 py-1.5 cursor-pointer hover:text-white"
          >
            Scaffolding
          </button>
          <button
            type="button"
            onClick={() => handleLink('portfolio')}
            className={`tactile-press relative whitespace-nowrap shrink-0 py-1.5 cursor-pointer hover:text-white ${
              activeView === 'portfolio' ? 'text-[#FFE264] font-semibold' : ''
            }`}
          >
            <span>Portfolio</span>
            {activeView === 'portfolio' && (
              <motion.span
                layoutId="header-nav-indicator"
                transition={SPRING_CRITICALLY_DAMPED}
                className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#F2A900]"
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleLink('certificates')}
            className={`tactile-press relative whitespace-nowrap shrink-0 py-1.5 cursor-pointer hover:text-white ${
              activeView === 'certificates' ? 'text-[#FFE264] font-semibold' : ''
            }`}
          >
            <span>Certificates</span>
            {activeView === 'certificates' && (
              <motion.span
                layoutId="header-nav-indicator"
                transition={SPRING_CRITICALLY_DAMPED}
                className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#F2A900]"
              />
            )}
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={onOpenAccount}
              className="tactile-press hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-[0_6px_18px_rgba(242,169,0,0.22)]"
            >
              {enrolledCount > 0 ? `My Learning (${enrolledCount})` : 'Account'}
            </button>
          ) : (
            <Link
              href="/signin"
              className="tactile-press hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-sm font-bold whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-[0_6px_18px_rgba(242,169,0,0.22)]"
            >
              Sign In
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="tactile-press md:hidden p-2 rounded-lg text-white hover:bg-white/10 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Frosted Glass Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={SPRING_SNAPPY}
            className="md:hidden border-t border-white/15 glass-midnight-deep px-6 py-4 space-y-3"
          >
            <div className="flex flex-col gap-1.5 text-sm font-medium text-white/90">
              <button
                type="button"
                onClick={() => handleLink('home', 'catalog')}
                className="tactile-press text-left py-2.5 px-2 rounded-lg hover:bg-white/10 hover:text-[#FFE264] cursor-pointer"
              >
                Catalog
              </button>
              <button
                type="button"
                onClick={() => handleLink('home', 'scaffolding')}
                className="tactile-press text-left py-2.5 px-2 rounded-lg hover:bg-white/10 hover:text-[#FFE264] cursor-pointer"
              >
                Scaffolding
              </button>
              <button
                type="button"
                onClick={() => handleLink('portfolio')}
                className={`tactile-press text-left py-2.5 px-2 rounded-lg hover:bg-white/10 hover:text-[#FFE264] cursor-pointer ${
                  activeView === 'portfolio' ? 'text-[#F2A900] font-bold' : ''
                }`}
              >
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => handleLink('certificates')}
                className={`tactile-press text-left py-2.5 px-2 rounded-lg hover:bg-white/10 hover:text-[#FFE264] cursor-pointer ${
                  activeView === 'certificates' ? 'text-[#F2A900] font-bold' : ''
                }`}
              >
                Certificates
              </button>
            </div>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="tactile-press w-full py-2.5 rounded-full bg-[#F2A900] text-[#00205B] text-sm font-bold cursor-pointer"
              >
                {enrolledCount > 0 ? `My Learning (${enrolledCount})` : 'Account'}
              </button>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="tactile-press block w-full py-2.5 rounded-full bg-[#F2A900] text-[#00205B] text-sm font-bold text-center"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
