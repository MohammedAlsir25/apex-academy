'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import type { SandboxTestResult } from '@/lib/sandbox-engines';

export function renderInlineFormattedText(
  text: string,
  variant: 'light' | 'dark' = 'dark'
): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const code = part.slice(1, -1);
      return (
        <code
          key={`code-${idx}`}
          className={
            variant === 'dark'
              ? 'mx-0.5 inline-block rounded-md bg-[#000B24] border border-[#F2A900]/45 px-1.5 py-0.5 font-mono text-[12px] font-semibold text-[#FFE264]'
              : 'mx-0.5 inline-block rounded-md bg-[#00205B]/[0.07] border border-[#00205B]/15 px-1.5 py-0.5 font-mono text-[12px] font-semibold text-[#003087]'
          }
        >
          {code}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong
          key={`bold-${idx}`}
          className={variant === 'dark' ? 'font-bold text-white' : 'font-bold text-[#00205B]'}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={`txt-${idx}`}>{part}</React.Fragment>;
  });
}

interface TheoryCardProps {
  badgeLabel: string;
  heading: string;
  explanation: string;
  analogy?: string;
  codeSnippet?: string;
}

export function TheoryCard({
  badgeLabel,
  heading,
  explanation,
  analogy,
  codeSnippet,
}: TheoryCardProps) {
  return (
    <article className="rounded-2xl border border-[#307FE2]/25 bg-slate-50/75 p-5 sm:p-6 space-y-4">
      <div className="flex items-start gap-3.5">
        <span className="w-9 h-9 rounded-xl bg-[#003087]/10 border border-[#307FE2]/25 text-[#003087] flex items-center justify-center shrink-0 mt-0.5">
          <BookOpen className="w-4 h-4" />
        </span>

        <div className="min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#307FE2]">
            {badgeLabel}
          </p>
          <h3 className="mt-0.5 text-base sm:text-[17px] font-extrabold text-[#00205B] leading-snug">
            {heading}
          </h3>
        </div>
      </div>

      <p className="text-sm sm:text-[15px] text-[#00205B]/85 leading-relaxed">
        {renderInlineFormattedText(explanation, 'light')}
      </p>

      {analogy && (
        <div className="rounded-xl bg-white border border-slate-200 p-3.5 flex items-start gap-3 text-xs text-[#003087]">
          <Lightbulb className="w-4 h-4 text-[#F2A900] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#00205B]">Analogy:</strong>{' '}
            {renderInlineFormattedText(analogy, 'light')}
          </p>
        </div>
      )}

      {codeSnippet && (
        <pre className="rounded-xl bg-[#00153D] text-[#FFE264] p-4 font-mono text-xs overflow-x-auto leading-relaxed">
          {codeSnippet}
        </pre>
      )}
    </article>
  );
}

interface ActivePracticeCardProps {
  taskLabel: string;
  instructions: string;
  iconVariant?: 'code' | 'lab' | 'capstone' | 'tryit';
  acceptanceCriteria?: string[];
  sandboxResults?: SandboxTestResult[] | null;
  totalChecks?: number;
  allPassed?: boolean;
  shortcutHint?: string;
  onFocusEditor?: () => void;
  focusEditorLabel?: string;
}

export function ActivePracticeCard({
  taskLabel,
  instructions,
  iconVariant = 'code',
  acceptanceCriteria = [],
  sandboxResults,
  totalChecks,
  allPassed = false,
  shortcutHint,
  onFocusEditor,
  focusEditorLabel,
}: ActivePracticeCardProps) {
  const Icon =
    iconVariant === 'capstone'
      ? Trophy
      : iconVariant === 'tryit'
        ? Zap
        : Target;

  return (
    <motion.div
      animate={
        allPassed
          ? {
              borderColor: 'rgba(242, 169, 0, 1)',
              boxShadow: '0 12px 34px rgba(242, 169, 0, 0.22)',
            }
          : {
              borderColor: 'rgba(242, 169, 0, 0.75)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.32)',
            }
      }
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-[#00205B] border-2 border-[#F2A900]/75 overflow-hidden"
    >
      {/* Top Action Header */}
      <div className="bg-gradient-to-r from-[#003087] to-[#00205B] px-5 py-3 border-b border-[#F2A900]/25 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[#F2A900] text-[#00205B] flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4" />
          </span>
          <div className="leading-tight">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFE264]">
              Active Practice
            </p>
            <p className="text-xs font-bold text-white mt-0.5">{taskLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {allPassed && (
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 20 }}
              className="inline-flex items-center gap-1 rounded-md bg-[#F2A900] text-[#00205B] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
            >
              <Sparkles className="w-3 h-3" />
              <span>Passed</span>
            </motion.span>
          )}

          {totalChecks !== undefined && totalChecks > 0 && (
            <span className="text-[11px] font-bold text-white/90 tabular-nums">
              {sandboxResults
                ? `${sandboxResults.filter((r) => r.passed).length}/${totalChecks} Checks Passing`
                : `${totalChecks} Automated Checks`}
            </span>
          )}

          {shortcutHint && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-[#00153D] border border-white/15 px-2 py-1 font-mono text-[10px] font-semibold text-[#FFE264]">
              {shortcutHint}
            </span>
          )}
        </div>
      </div>

      {/* Highlighted Instructions & Acceptance Checklist */}
      <div className="p-5 space-y-4">
        <p className="text-sm sm:text-[15px] text-white font-medium leading-relaxed">
          {renderInlineFormattedText(instructions, 'dark')}
        </p>

        {acceptanceCriteria.length > 0 && (
          <div className="rounded-xl bg-[#00153D]/90 border border-white/10 p-3.5 space-y-2.5">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFE264]">
              {iconVariant === 'capstone' ? 'Capstone Requirements' : 'Requirements to Pass'}
            </p>
            <ul className="space-y-2">
              {acceptanceCriteria.map((criterion, idx) => {
                const matchedResult = sandboxResults?.[idx];
                const isPassed = Boolean(matchedResult?.passed);
                return (
                  <motion.li
                    key={criterion}
                    animate={isPassed ? { x: [0, 3, 0] } : { x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-2.5 text-xs leading-snug ${
                      isPassed ? 'text-[#FFE264] font-semibold' : 'text-white/90'
                    }`}
                  >
                    {isPassed ? (
                      <motion.span
                        initial={{ scale: 0.4, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 480, damping: 18 }}
                        className="shrink-0 mt-0.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#F2A900]" />
                      </motion.span>
                    ) : (
                      <span className="w-4 h-4 rounded-md bg-[#003087] border border-[#307FE2]/60 text-[#FFE264] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {idx + 1}
                      </span>
                    )}
                    <span>{renderInlineFormattedText(criterion, 'dark')}</span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        )}

        {onFocusEditor && focusEditorLabel && (
          <div className="pt-1 flex justify-end">
            <button
              type="button"
              onClick={onFocusEditor}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{focusEditorLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
