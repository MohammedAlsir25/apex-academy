'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, ClipboardCheck, Code2, Layers, ShieldAlert } from 'lucide-react';
import { SPRING_CRITICALLY_DAMPED, SPRING_SNAPPY } from './FluidPrimitives';

interface ScaffoldingPreview {
  id: 'sandbox' | 'deliverable' | 'rubric';
  label: string;
  discipline: string;
  headline: string;
  description: string;
  stages: Array<{ step: string; title: string; output: string }>;
  sampleCheck: string;
}

const MODES: ScaffoldingPreview[] = [
  {
    id: 'sandbox',
    label: 'Python, SQL & Prompt IDE',
    discipline: 'Python · SQL · Machine Learning · Prompt Engineering',
    headline: 'Real in-browser runtimes tested live at every milestone',
    description:
      'Instead of passive syntax videos, learners write Python functions, relational SQL queries, ML scorers, and injection-hardened prompts inside Replit-style multi-file workspaces with automated pass/fail test suites.',
    stages: [
      {
        step: '01',
        title: 'Day-1 Hello World & Foundations',
        output: 'Learn what the language does, read a visual concept map, and run your first snippet',
      },
      {
        step: '06',
        title: 'Core Logic, Joins & Clean Data',
        output: 'Combine conditions, loops, aggregations, and prompt schemas piece by piece',
      },
      {
        step: '12',
        title: 'Integrated Production Project',
        output: 'Snap all 11 prior puzzle pieces together into one graded capstone artifact',
      },
    ],
    sampleCheck: 'Automated runtime tests passed · Next lesson unlocked',
  },
  {
    id: 'deliverable',
    label: 'UX, IT & Growth Labs',
    discipline: 'UI/UX Design · IT Support · Digital & Social Growth',
    headline: 'Readable illustrated handbooks paired with live practice labs',
    description:
      'Design, IT operations, and growth courses start from first principles—teaching WCAG contrast, IP subnetting, CAC/ROAS economics, and retention hooks with one-click sandbox examples before structured specs.',
    stages: [
      {
        step: '01',
        title: 'Visual Concepts & Live Calculations',
        output: 'Understand the "why" with analogies, diagrams, and runnable JavaScript examples',
      },
      {
        step: '06',
        title: 'Applied Systems & Audits',
        output: 'Practice DNS isolation, 8pt grids, AIDA hooks, and UTM attribution rules',
      },
      {
        step: '12',
        title: 'Capstone Portfolio Spec',
        output: 'Synthesize 11 progressive building blocks into an interview-ready deliverable',
      },
    ],
    sampleCheck: 'Operational & design thresholds verified · Ready for Capstone',
  },
  {
    id: 'rubric',
    label: 'Mentor Rubric & Certification',
    discipline: 'All 9 Career Courses · Multi-Course Track Diplomas',
    headline: '12-lesson progression from zero experience to verified credential',
    description:
      'Every 12-lesson course culminates in a Lesson 12 Capstone Portfolio graded against explicit rubric weights—issuing a QR-verified certificate, high-res PNG/PDF export, and 3-course Track Diplomas.',
    stages: [
      {
        step: '04',
        title: 'Handbook, Pitfalls & Quiz Gate',
        output: 'Illustrated concept cards, wrong-vs-right pitfalls, cheat sheets, and timestamped notes',
      },
      {
        step: '09',
        title: 'Cumulative Assembly',
        output: 'Prior lessons snap directly into one cohesive working system',
      },
      {
        step: '12',
        title: 'Verified Credential',
        output: 'QR code, public verification link, PNG/PDF export, and Track Diploma',
      },
    ],
    sampleCheck: 'Rubric score >= 80% · Verified Capstone Certificate issued',
  },
];

export function ScaffoldingSection() {
  const [selectedMode, setSelectedMode] = useState<'sandbox' | 'deliverable' | 'rubric'>('sandbox');
  const active = MODES.find((m) => m.id === selectedMode) ?? MODES[0];

  return (
    <section id="scaffolding" className="py-20 bg-[#00153D] border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.06em] uppercase text-[#F2A900]">
              How Apex Academy Works
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] leading-[1.12] text-white text-balance">
              Piece-by-Piece Incremental Scaffolding
            </h2>
            <p className="mt-3 text-base text-white/80 leading-relaxed">
              Every course starts at Lesson 01 basics—with visual diagrams, plain-English guides,
              and runnable examples—until all 12 lessons click together into a full project.
            </p>
          </div>

          {/* Segmented Mode Switcher with Gliding Spring Pill */}
          <div
            className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-xl glass-midnight border border-white/15 shrink-0"
            role="tablist"
            aria-label="Scaffolding Modes"
          >
            {MODES.map((mode) => {
              const isSelected = mode.id === selectedMode;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`tactile-press relative px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected ? 'text-[#00205B]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="scaffolding-mode-pill"
                      transition={SPRING_CRITICALLY_DAMPED}
                      className="absolute inset-0 rounded-lg bg-[#F2A900] shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Single-Elevation Workspace Preview Card with Smooth Material Cross-Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={SPRING_SNAPPY}
            className="grid lg:grid-cols-12 gap-8 items-stretch"
          >
            <div className="lg:col-span-5 glass-midnight border border-white/15 rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#FFE264]">
                  {active.id === 'sandbox' && <Code2 className="w-4 h-4 shrink-0" />}
                  {active.id === 'deliverable' && <ShieldAlert className="w-4 h-4 shrink-0" />}
                  {active.id === 'rubric' && <ClipboardCheck className="w-4 h-4 shrink-0" />}
                  <span>{active.discipline}</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.015em] leading-snug text-white">
                  {active.headline}
                </h3>
                <p className="mt-3 text-sm text-white/85 leading-relaxed">
                  {active.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/15 flex items-center gap-2.5 text-xs font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-[#F2A900] shrink-0" />
                <span>{active.sampleCheck}</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white text-[#00205B] rounded-2xl p-7 flex flex-col justify-between shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Layers className="w-4 h-4 text-[#003087]" />
                  <span>12-Lesson Progression Chain</span>
                </div>
                <span className="text-xs font-medium text-[#00205B]/70">
                  Sequential unlock · Zero passive skips
                </span>
              </div>

              <div className="my-6 space-y-5">
                {active.stages.map((stage) => (
                  <div
                    key={stage.step}
                    className="flex items-start gap-4 pb-5 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <span className="w-9 h-9 rounded-lg bg-[#00205B] text-[#F2A900] font-mono text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {stage.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#00205B]">{stage.title}</h4>
                      <p className="mt-1 text-sm text-[#00205B]/75">{stage.output}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-[#00205B]/[0.05] px-4 py-3 text-xs text-[#00205B]/85 flex items-center justify-between">
                <span className="font-semibold">Lesson 12 · Final Capstone</span>
                <span className="font-medium text-[#003087]">
                  Unlocks Verified Certificate &amp; Track Diploma
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
