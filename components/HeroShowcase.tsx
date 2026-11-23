'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Code2, ShieldCheck, Star } from 'lucide-react';
import { HERO_ASSETS } from '@/lib/course-assets';

interface HeroShowcaseProps {
  onExploreCatalog: () => void;
  onLaunchDemoCourse: () => void;
}

export function HeroShowcase({
  onExploreCatalog,
  onLaunchDemoCourse,
}: HeroShowcaseProps) {
  return (
    <section className="relative overflow-hidden bg-[#00205B] bg-architectural-grid pt-14 pb-0 md:pt-20 border-b border-white/10">
      {/* Subtle radial ocean glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(48,127,226,0.22),transparent_68%)]"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 text-center">
        {/* Clean editorial announcement strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/15 bg-[#003087]/60 text-xs text-white/90 mb-7"
        >
          <span className="px-2 py-0.5 rounded-full bg-white text-[#00205B] font-bold tracking-tight">
            Capstone Track
          </span>
          <span className="whitespace-nowrap">
            Learn by building verified milestones, not passive playlists
          </span>
        </motion.div>

        {/* Main Display Headline matching reference typography contrast */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-4xl sm:text-5xl md:text-[64px] font-extrabold tracking-tight leading-[1.05] text-white text-balance"
        >
          Ship real systems
          <br />
          before the{' '}
          <span className="font-serif italic font-semibold text-[#FFE264]">
            certificate lands.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed"
        >
          Every Apex Academy course is engineered around Project-Based Incremental
          Scaffolding—unlocking live code sandboxes, architecture checklists, and
          rubric-graded capstones you can prove to any hiring panel.
        </motion.p>

        {/* Primary 10% Sun CTA + Adjacent Proof Rating */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            type="button"
            onClick={onExploreCatalog}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] font-bold text-base transition-colors shadow-[0_12px_32px_rgba(242,169,0,0.28)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 text-sm text-white/85">
            <div className="flex items-center gap-0.5 text-[#F2A900]" aria-label="4.9 out of 5 stars">
              <Star className="w-4 h-4 fill-[#F2A900]" />
              <Star className="w-4 h-4 fill-[#F2A900]" />
              <Star className="w-4 h-4 fill-[#F2A900]" />
              <Star className="w-4 h-4 fill-[#F2A900]" />
              <Star className="w-4 h-4 fill-[#F2A900]" />
            </div>
            <span className="font-bold tabular-nums text-white">4.9</span>
            <span className="text-white/70">from 17,300+ capstone reviews</span>
          </div>
        </motion.div>

        {/* Overlapping 3-Card Editorial Visual Stage (matching Reference Pic 2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-14 md:mt-16 max-w-[1040px] mx-auto h-[340px] sm:h-[400px] md:h-[420px] flex items-end justify-center"
        >
          {/* Left Angled Editorial Card */}
          <div className="hidden md:block relative w-[290px] h-[330px] -mr-10 mb-0 rounded-t-3xl overflow-hidden border border-white/15 bg-[#00153D] -rotate-6 origin-bottom-right shadow-2xl">
            <Image
              src={HERO_ASSETS.studentLeft}
              alt="Software engineers reviewing distributed system architecture"
              fill
              sizes="290px"
              referrerPolicy="no-referrer"
              className="object-cover grayscale contrast-110 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00153D]/80 via-transparent to-transparent" />
          </div>

          {/* Floating Left Milestone Notification Card */}
          <div className="hidden sm:flex items-center gap-3 absolute left-2 md:left-14 top-12 md:top-10 z-20 bg-white text-[#00205B] px-4 py-3 rounded-2xl shadow-2xl border border-[#00205B]/10 max-w-[255px] text-left">
            <span className="w-9 h-9 rounded-xl bg-[#003087] text-white flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">Milestone 04 passed</p>
              <p className="text-[11px] text-[#00205B]/70 truncate">
                Python &amp; SQL tests · 3/3 verified
              </p>
            </div>
          </div>

          {/* Center Interactive Capstone Workspace Frame */}
          <div className="relative z-10 w-full max-w-[390px] h-[340px] sm:h-[385px] rounded-t-[36px] bg-white text-[#00205B] shadow-[0_-12px_60px_rgba(0,0,0,0.45)] border-t-4 border-x-4 border-[#00153D] p-5 sm:p-6 text-left flex flex-col justify-between">
            <div>
              {/* Notch & Header */}
              <div className="w-20 h-4 bg-[#00153D] rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between text-xs text-[#00205B]/65 font-medium">
                <span>Cohort · Fall 2026</span>
                <span className="tabular-nums font-semibold text-[#003087]">
                  67% Complete
                </span>
              </div>
              <h2 className="mt-1 text-lg font-extrabold tracking-tight text-[#00205B]">
                Expense &amp; Telemetry CLI
              </h2>

              {/* Primary Midnight Blue Progress Card */}
              <div className="mt-3.5 rounded-2xl bg-[#00205B] text-white p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-white/70">Capstone Readiness</p>
                  <p className="text-2xl font-extrabold tabular-nums mt-0.5">
                    8 / 12 <span className="text-sm font-medium text-[#FFE264]">Lessons</span>
                  </p>
                </div>
                <div className="w-11 h-11 rounded-full border-4 border-[#F2A900] flex items-center justify-center text-xs font-bold tabular-nums">
                  67%
                </div>
              </div>

              {/* Milestone Rows */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                  <span className="font-semibold text-[#00205B] truncate pr-2">
                    07. Strings &amp; Log Parsing
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00205B] text-white font-semibold shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-[#F2A900]" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                  <span className="font-semibold text-[#00205B] truncate pr-2">
                    08. Dictionaries &amp; Totals
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00205B] text-white font-semibold shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-[#F2A900]" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="font-semibold text-[#00205B] truncate pr-2">
                    09. Error-Rate Functions
                  </span>
                  <button
                    type="button"
                    onClick={onLaunchDemoCourse}
                    className="px-2.5 py-1 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] font-bold transition-colors shrink-0 cursor-pointer"
                  >
                    Open Lab
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Angled Editorial Card */}
          <div className="hidden md:block relative w-[290px] h-[330px] -ml-10 mb-0 rounded-t-3xl overflow-hidden border border-white/15 bg-[#00153D] rotate-6 origin-bottom-left shadow-2xl">
            <Image
              src={HERO_ASSETS.studentRight}
              alt="Product designer building tokenized UI grid specifications"
              fill
              sizes="290px"
              referrerPolicy="no-referrer"
              className="object-cover grayscale contrast-110 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00153D]/80 via-transparent to-transparent" />
          </div>

          {/* Floating Sun Highlight Seal */}
          <div className="hidden sm:flex flex-col items-center justify-center absolute right-4 md:right-44 top-8 md:top-6 z-20 w-24 h-24 rounded-full bg-[#F2A900] text-[#00205B] shadow-[0_12px_35px_rgba(242,169,0,0.45)] rotate-12 font-extrabold leading-tight">
            <span className="text-sm">Capstone</span>
            <span className="text-sm">Verified!</span>
          </div>

          {/* Floating Right Certificate Card */}
          <div className="hidden sm:flex items-center gap-3 absolute right-2 md:right-10 bottom-20 z-20 bg-white text-[#00205B] px-4 py-3 rounded-2xl shadow-2xl border border-[#00205B]/10 max-w-[260px] text-left">
            <span className="w-9 h-9 rounded-xl bg-[#00205B] text-[#F2A900] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">Portfolio published</p>
              <p className="text-[11px] text-[#00205B]/70 truncate">
                Rubric score 96/100 · Credentialed
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
