'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  ClipboardCheck,
  ShieldAlert,
  Star,
  X,
} from 'lucide-react';
import type { Course, ScaffoldingMode } from '@/lib/curriculum';
import { getCourseThumbnail } from '@/lib/course-assets';
import type { EnrollmentRecord } from '@/lib/storage';
import { FluidSheet, SPRING_SNAPPY } from './FluidPrimitives';

interface CourseDetailModalProps {
  course: Course;
  enrollment?: EnrollmentRecord;
  isAuthenticated: boolean;
  onClose: () => void;
  onEnrollAndOpen: (course: Course) => void;
}

const MODE_META: Record<ScaffoldingMode, { label: string; icon: React.ReactNode }> = {
  sandbox: { label: 'Interactive Code Sandbox', icon: <Code2 className="w-4 h-4" /> },
  deliverable: { label: 'Architecture Deliverable Lab', icon: <ShieldAlert className="w-4 h-4" /> },
  rubric: { label: 'Mentor Rubric & Portfolio', icon: <ClipboardCheck className="w-4 h-4" /> },
};

export function CourseDetailModal({
  course,
  enrollment,
  isAuthenticated,
  onClose,
  onEnrollAndOpen,
}: CourseDetailModalProps) {
  const [expandedModuleId, setExpandedModuleId] = useState<string>(course.modules[0]?.id ?? '');
  const thumb = getCourseThumbnail(course);

  const completedCount = enrollment
    ? Object.values(enrollment.modules).filter((m) => m.completed).length
    : 0;

  return (
    <FluidSheet
      onClose={onClose}
      ariaLabelledBy="course-detail-title"
      maxWidthClass="max-w-4xl"
    >
      {/* Top Swipeable Midnight Header Band */}
      <div className="px-6 pb-6 pt-3 sm:px-8 sm:pb-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#FFE264]">
              <span>{course.track}</span>
              <span aria-hidden="true">·</span>
              <span>{course.level}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{course.durationHours} Hours</span>
              <span aria-hidden="true">·</span>
              <span>{course.modules.length} Progressive Lessons</span>
            </div>

            <h2
              id="course-detail-title"
              className="mt-2.5 text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-tight text-white"
            >
              {course.title}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              {course.subtitle}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-white/80">
              <div className="flex items-center gap-1.5 tabular-nums">
                <Star className="w-4 h-4 fill-[#F2A900] text-[#F2A900]" />
                <span className="font-bold text-white">{course.rating.toFixed(1)}</span>
                <span>({course.reviewCount.toLocaleString()} reviews)</span>
              </div>
              <span>
                Instructor: <strong className="text-white">{course.instructor.name}</strong> ({course.instructor.role}, {course.instructor.organization})
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="tactile-press p-2 rounded-full bg-white/10 hover:bg-white/20 text-white shrink-0 cursor-pointer"
            aria-label="Close course syllabus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="bg-white text-[#00205B] p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
        {/* Capstone Preview Banner */}
        <div className="grid md:grid-cols-12 gap-6 items-stretch bg-[#00205B]/[0.04] rounded-2xl p-5 border border-[#00205B]/10">
          <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-[#00153D]">
            <Image
              src={thumb}
              alt={course.capstoneTitle}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>

          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.04em] text-[#003087]">
                <Award className="w-4 h-4 text-[#F2A900]" />
                <span>What You Will Build (Capstone Preview)</span>
              </div>
              <h3 className="mt-1.5 text-xl font-extrabold tracking-[-0.015em] text-[#00205B]">
                {course.capstoneTitle}
              </h3>
              <p className="mt-2 text-sm text-[#00205B]/80 leading-relaxed">
                {course.capstoneSummary}
              </p>
            </div>

            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-xs text-[#00205B]/85">
              {course.capstoneDeliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#003087] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div>
          <h3 className="text-base font-extrabold text-[#00205B]">
            Core Skills Verified
          </h3>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {course.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-2.5 text-sm text-[#00205B]/85"
              >
                <CheckCircle2 className="w-4 h-4 text-[#F2A900] mt-0.5 shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 12-Lesson Piece-by-Piece Syllabus Accordion */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-extrabold text-[#00205B]">
              12-Lesson Piece-by-Piece Syllabus
            </h3>
            <span className="text-xs font-medium text-[#00205B]/65">
              Unlocks step-by-step from beginner to final capstone
            </span>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
            {course.modules.map((mod, idx) => {
              const isOpen = expandedModuleId === mod.id;
              const isDone = Boolean(enrollment?.modules[mod.id]?.completed);
              const modeMeta = MODE_META[mod.mode];
              const prevStage = idx > 0 ? course.modules[idx - 1].scaffoldingStage : null;
              const showStageHeader = mod.scaffoldingStage !== prevStage;

              return (
                <React.Fragment key={mod.id}>
                  {showStageHeader && (
                    <div className="bg-[#00205B]/[0.05] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#003087]">
                      {mod.scaffoldingStage}
                    </div>
                  )}
                  <div className="bg-white">
                    <button
                      type="button"
                      onClick={() => setExpandedModuleId(isOpen ? '' : mod.id)}
                      className="tactile-press w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span
                          className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 tabular-nums ${
                            isDone
                              ? 'bg-[#00205B] text-[#F2A900]'
                              : 'bg-[#00205B]/10 text-[#00205B]'
                          }`}
                        >
                          {mod.number}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#00205B] truncate">
                            {mod.title}
                          </p>
                          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#00205B]/65">
                            <span>{mod.handbook?.puzzlePiece ?? mod.scaffoldingStage}</span>
                            <span aria-hidden="true">·</span>
                            <span>{modeMeta.label}</span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 tabular-nums">
                              <Clock className="w-3 h-3" />
                              {mod.durationMinutes}m
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {isDone && (
                          <span className="text-xs font-bold text-[#003087]">
                            Verified
                          </span>
                        )}
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={SPRING_SNAPPY}
                          className="text-[#00205B]/60"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={SPRING_SNAPPY}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-2 bg-slate-50/70 border-t border-slate-100 text-sm text-[#00205B]/80 space-y-3">
                            <p className="leading-relaxed">{mod.lessonSummary}</p>
                            <div className="pt-2">
                              <p className="text-xs font-bold uppercase tracking-[0.04em] text-[#003087]">
                                Lesson Goal: {mod.deliverableTitle}
                              </p>
                              <ul className="mt-2 space-y-1 text-xs">
                                {mod.acceptanceCriteria.map((ac) => (
                                  <li key={ac} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#003087] mt-0.5 shrink-0" />
                                    <span>{ac}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Modal Action Footer */}
      <div className="px-6 sm:px-8 py-4 bg-slate-50/95 backdrop-blur-md border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="text-xs text-[#00205B]/75">
          {enrollment ? (
            <span>
              Enrolled · <strong className="text-[#00205B]">{completedCount} of {course.modules.length}</strong> lessons verified
            </span>
          ) : !isAuthenticated ? (
            <span>
              Free Apex Academy account required to enroll &amp; sync your capstone progress
            </span>
          ) : (
            <span>
              Includes illustrated handbook, live sandbox IDE &amp; verified capstone certificate
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onEnrollAndOpen(course)}
          className="tactile-press w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] font-bold text-sm whitespace-nowrap shrink-0 cursor-pointer shadow-[0_8px_22px_rgba(242,169,0,0.25)]"
        >
          <span>
            {enrollment
              ? 'Open Course Workspace'
              : isAuthenticated
                ? 'Enroll & Launch Workspace'
                : 'Sign In to Enroll'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </FluidSheet>
  );
}
