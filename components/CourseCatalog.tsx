'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Search, Star } from 'lucide-react';
import {
  COURSES,
  TRACK_FILTERS,
  type Course,
  type DisciplineTrack,
  type SkillLevel,
} from '@/lib/curriculum';
import { getCourseThumbnail } from '@/lib/course-assets';
import type { CertificateRecord, EnrollmentRecord } from '@/lib/storage';

interface CourseCatalogProps {
  enrollments: Record<string, EnrollmentRecord>;
  certificates: Record<string, CertificateRecord>;
  onSelectCourse: (course: Course) => void;
  onResumeCourse: (course: Course) => void;
}

const MODE_LABELS: Record<Course['primaryMode'], string> = {
  sandbox: 'Code Sandbox',
  deliverable: 'Workspace Lab',
  rubric: 'Portfolio & Rubric',
};

const RUNTIME_LABELS: NonNullable<Course['primaryRuntime']> extends infer R
  ? Record<Extract<R, string>, string>
  : never = {
  python: 'Python IDE',
  sql: 'SQL Lab',
  prompt: 'Prompt Studio',
  js: 'Code Sandbox',
};

export function CourseCatalog({
  enrollments,
  certificates,
  onSelectCourse,
  onResumeCourse,
}: CourseCatalogProps) {
  const [selectedTrack, setSelectedTrack] = useState<'All Tracks' | DisciplineTrack>('All Tracks');
  const [selectedLevel, setSelectedLevel] = useState<'All' | SkillLevel>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return COURSES.filter((course) => {
      if (selectedTrack !== 'All Tracks' && course.track !== selectedTrack) return false;
      if (selectedLevel !== 'All' && course.level !== selectedLevel) return false;
      if (!q) return true;
      return (
        course.title.toLowerCase().includes(q) ||
        course.subtitle.toLowerCase().includes(q) ||
        course.capstoneTitle.toLowerCase().includes(q) ||
        course.track.toLowerCase().includes(q)
      );
    });
  }, [selectedTrack, selectedLevel, searchQuery]);

  return (
    <section id="catalog" className="py-20 bg-[#00205B]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Catalog Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[#F2A900]">
              Multi-Discipline Curriculum
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Capstone-Driven Courses
            </h2>
          </div>

          {/* Search & Level Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses or capstones..."
                aria-label="Search courses"
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-[#00153D] border border-white/15 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-[#F2A900]"
              />
            </div>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as 'All' | SkillLevel)}
              aria-label="Filter by skill level"
              className="px-3.5 py-2.5 rounded-xl bg-[#00153D] border border-white/15 text-sm text-white focus:outline-none focus:border-[#F2A900] cursor-pointer"
            >
              <option value="All">All Levels</option>
              <option value="Foundational">Foundational</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Capstone">Capstone</option>
            </select>
          </div>
        </div>

        {/* Interactive Track Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-white/10">
          {TRACK_FILTERS.map((track) => {
            const active = selectedTrack === track;
            return (
              <button
                key={track}
                type="button"
                onClick={() => setSelectedTrack(track)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#F2A900] text-[#00205B]'
                    : 'bg-[#00153D] text-white/80 hover:text-white border border-white/10'
                }`}
              >
                {track}
              </button>
            );
          })}
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="rounded-2xl bg-[#00153D] border border-white/15 p-12 text-center">
            <p className="text-lg font-bold text-white">No courses match your current filters</p>
            <p className="mt-2 text-sm text-white/70">
              Clear your search query or switch back to All Tracks to view the full academy catalog.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedTrack('All Tracks');
                setSelectedLevel('All');
                setSearchQuery('');
              }}
              className="mt-6 px-5 py-2.5 rounded-full bg-[#F2A900] text-[#00205B] text-sm font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredCourses.map((course) => {
              const enrollment = enrollments[course.id];
              const certificate = certificates[course.id];
              const completedCount = enrollment
                ? Object.values(enrollment.modules).filter((m) => m.completed).length
                : 0;
              const percentComplete = Math.round((completedCount / course.modules.length) * 100);
              const thumb = getCourseThumbnail(course);

              return (
                <article
                  key={course.id}
                  className="group bg-white text-[#00205B] rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 shadow-xl relative"
                >
                  <div>
                    {/* 4:3 Course Photography Thumbnail */}
                    <div className="relative aspect-[4/3] w-full bg-[#00153D] overflow-hidden">
                      <Image
                        src={thumb}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00153D]/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white font-medium">
                        <span>
                          {course.primaryMode === 'sandbox' && course.primaryRuntime
                            ? RUNTIME_LABELS[course.primaryRuntime]
                            : MODE_LABELS[course.primaryMode]}
                        </span>
                        <span className="tabular-nums">
                          {course.durationHours}h · {course.modules.length} Lessons
                        </span>
                      </div>

                      {/* Circular Progress Indicator for Enrolled Courses */}
                      {enrollment && !certificate && (
                        <div className="absolute top-3 right-3 bg-[#00205B]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
                          <svg className="w-4 h-4 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                            <path
                              className="text-white/20"
                              strokeWidth="4"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-[#F2A900]"
                              strokeDasharray={`${percentComplete}, 100`}
                              strokeWidth="4"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <span className="text-[11px] font-extrabold tabular-nums text-white">
                            {percentComplete}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Course Info Body (Zero-Pill Metadata) */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#003087] font-semibold">
                        <span className="truncate">{course.track}</span>
                        <span aria-hidden="true">·</span>
                        <span className="shrink-0">{course.level}</span>
                      </div>

                      <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[#00205B] leading-snug">
                        {course.title}
                      </h3>

                      <p className="mt-2 text-sm text-[#00205B]/75 leading-relaxed line-clamp-2">
                        {course.subtitle}
                      </p>

                      {/* Capstone Preview Callout */}
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#003087]">
                          Final Capstone Deliverable
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#00205B]">
                          {course.capstoneTitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#00205B] truncate">
                        {course.instructor.name}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#00205B]/70 tabular-nums">
                        <Star className="w-3.5 h-3.5 fill-[#F2A900] text-[#F2A900] shrink-0" />
                        <span className="font-bold text-[#00205B]">{course.rating.toFixed(1)}</span>
                        <span>({course.reviewCount.toLocaleString()})</span>
                      </div>
                    </div>

                    {certificate ? (
                      <button
                        type="button"
                        onClick={() => onResumeCourse(course)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00205B] text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer hover:bg-[#003087] transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F2A900]" />
                        <span>Certified</span>
                      </button>
                    ) : enrollment ? (
                      <button
                        type="button"
                        onClick={() => onResumeCourse(course)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                      >
                        <span>
                          Resume ({completedCount}/{course.modules.length})
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectCourse(course)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                      >
                        <span>View Syllabus</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
