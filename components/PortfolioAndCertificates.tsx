'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { COURSES, getCourseById, type Course, type DisciplineTrack } from '@/lib/curriculum';
import { COURSE_SKILLS_VERIFIED } from '@/lib/module-study-data';
import { isSafeHttpUrl, isValidVerificationCode } from '@/lib/security';
import type { CertificateRecord, EnrollmentRecord } from '@/lib/storage';
import { CertificateCard } from './CertificateCredential';

interface PortfolioAndCertificatesProps {
  mode: 'portfolio' | 'certificates';
  isAuthenticated: boolean;
  learnerName: string;
  learnerHeadline: string;
  enrollments: Record<string, EnrollmentRecord>;
  certificates: Record<string, CertificateRecord>;
  initialVerifyCode?: string | null;
  onOpenCourse: (course: Course) => void;
  onBrowseCatalog: () => void;
}

export function PortfolioAndCertificates({
  mode,
  isAuthenticated,
  learnerName,
  learnerHeadline,
  enrollments,
  certificates,
  initialVerifyCode,
  onOpenCourse,
  onBrowseCatalog,
}: PortfolioAndCertificatesProps) {
  const certificateList = Object.values(certificates);
  const [selectedCertId, setSelectedCertId] = useState<string>(
    certificateList[0]?.courseId ?? ''
  );
  const [verifyQuery, setVerifyQuery] = useState<string>(initialVerifyCode ?? '');
  const [activeDiplomaTrack, setActiveDiplomaTrack] = useState<string | null>(null);
  const [remoteCertResult, setRemoteCertResult] = useState<{
    code: string;
    record: CertificateRecord | null;
    loading: boolean;
  } | null>(null);

  // Compute Multi-Course Track Specialization Diplomas
  const trackProgress = useMemo(() => {
    const tracks = Array.from(new Set(COURSES.map((c) => c.track))) as DisciplineTrack[];
    return tracks.map((track) => {
      const trackCourses = COURSES.filter((c) => c.track === track);
      const earnedCerts = trackCourses
        .map((c) => certificates[c.id])
        .filter((c): c is CertificateRecord => Boolean(c));
      const completed = trackCourses.length > 0 && earnedCerts.length === trackCourses.length;
      const avgScore =
        earnedCerts.length > 0
          ? Math.round(
              earnedCerts.reduce((sum, c) => sum + c.rubricScore, 0) / earnedCerts.length
            )
          : 0;

      const diplomaRecord: CertificateRecord | null = completed
        ? {
            courseId: `diploma-${track}`,
            courseTitle: `${track} Specialization`,
            track,
            verificationCode: `APEX-DIPLOMA-${track
              .replace(/[^A-Z]/gi, '')
              .slice(0, 6)
              .toUpperCase()}`,
            learnerName: earnedCerts[0]?.learnerName || learnerName,
            capstoneTitle: `${track} Multi-Course Capstone Specialization`,
            capstoneSummary: `Completed all ${trackCourses.length} capstone courses (${trackCourses
              .map((c) => c.title)
              .join(', ')}) with an average Mentor Rubric score of ${avgScore}/100.`,
            artifactUrl: earnedCerts[0]?.artifactUrl ?? '',
            rubricScore: avgScore,
            rubricBreakdown: [],
            skillsVerified: Array.from(
              new Set(
                trackCourses.flatMap((c) => COURSE_SKILLS_VERIFIED[c.id] ?? [])
              )
            ).slice(0, 8),
            instructorName: 'Apex Academic Board',
            instructorRole: 'Track Curriculum Chair',
            instructorOrg: 'Apex Academy',
            issuedAt: earnedCerts[earnedCerts.length - 1]?.issuedAt ?? new Date().toISOString(),
          }
        : null;

      return {
        track,
        totalCourses: trackCourses.length,
        earnedCount: earnedCerts.length,
        completed,
        diplomaRecord,
      };
    });
  }, [certificates, learnerName]);

  const activeCert =
    certificates[selectedCertId] ?? certificateList[0] ?? null;

  const localVerifiedLookupResult = useMemo(() => {
    const q = verifyQuery.trim().toUpperCase();
    if (!q) return null;
    const matchedCourseCert = certificateList.find(
      (c) => c.verificationCode.toUpperCase() === q
    );
    if (matchedCourseCert) {
      return { record: matchedCourseCert, isDiploma: false };
    }
    const matchedDiploma = trackProgress.find(
      (t) => t.diplomaRecord && t.diplomaRecord.verificationCode.toUpperCase() === q
    );
    if (matchedDiploma?.diplomaRecord) {
      return { record: matchedDiploma.diplomaRecord, isDiploma: true };
    }
    return null;
  }, [verifyQuery, certificateList, trackProgress]);

  useEffect(() => {
    const code = verifyQuery.trim().toUpperCase();
    if (mode !== 'certificates' || !code || localVerifiedLookupResult || !isValidVerificationCode(code)) {
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setRemoteCertResult({ code, record: null, loading: true });
      try {
        const res = await fetch(`/api/certificates/verify?code=${encodeURIComponent(code)}`);
        if (!res.ok) throw new Error('Verification lookup failed');
        const payload = (await res.json()) as {
          found?: boolean;
          certificate?: CertificateRecord;
        };
        if (cancelled) return;
        setRemoteCertResult({
          code,
          record: payload.found && payload.certificate ? payload.certificate : null,
          loading: false,
        });
      } catch {
        if (cancelled) return;
        setRemoteCertResult({ code, record: null, loading: false });
      }
    }, 280);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mode, verifyQuery, localVerifiedLookupResult]);

  const trimmedCodeUpper = verifyQuery.trim().toUpperCase();
  const activeRemoteLookup =
    remoteCertResult && remoteCertResult.code === trimmedCodeUpper ? remoteCertResult : null;

  const verifiedLookupResult = localVerifiedLookupResult
    ? localVerifiedLookupResult
    : activeRemoteLookup?.loading
      ? 'LOADING'
      : activeRemoteLookup?.record
        ? { record: activeRemoteLookup.record, isDiploma: false }
        : trimmedCodeUpper.length > 0
          ? ('NOT_FOUND' as const)
          : null;

  const enrolledList = Object.values(enrollments)
    .map((enr) => {
      const course = getCourseById(enr.courseId);
      if (!course) return null;
      const done = course.modules.filter((m) => enr.modules[m.id]?.completed).length;
      return { course, enrollment: enr, completedCount: done };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (mode === 'certificates') {
    const selectedDiploma = trackProgress.find(
      (t) => t.track === activeDiplomaTrack
    )?.diplomaRecord;

    return (
      <section className="py-16 bg-[#00205B] min-h-[75vh]">
        <div className="max-w-[1120px] mx-auto px-6 space-y-12">
          {/* Header + Public Verification Lookup */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 no-print">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#F2A900]">
                Credential &amp; Verification Registry
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] leading-[1.1] text-white">
                Verified Capstone Certificates
              </h1>
              <p className="mt-2 text-sm text-white/75 max-w-xl">
                Every certificate carries a unique verification ID, QR authenticity
                badge, skill matrix, and high-resolution PNG/PDF export.
              </p>
            </div>

            <div className="w-full lg:w-80">
              <label
                htmlFor="verify-lookup"
                className="block text-[11px] font-bold uppercase tracking-[0.04em] text-[#FFE264] mb-1.5"
              >
                Verify Credential ID
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="verify-lookup"
                  type="search"
                  value={verifyQuery}
                  onChange={(e) => setVerifyQuery(e.target.value)}
                  placeholder="Enter ID (e.g. APEX-2026-...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#00153D] border border-white/20 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-[#F2A900] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Public Verification Lookup Result */}
          {verifyQuery.trim().length > 0 && (
            <div className="rounded-2xl glass-midnight border border-white/15 p-6 no-print">
              {verifiedLookupResult === 'LOADING' ? (
                <p className="text-sm text-white/80">
                  Verifying credential{' '}
                  <span className="font-mono font-bold text-[#FFE264]">
                    {verifyQuery.trim()}
                  </span>{' '}
                  against the public registry...
                </p>
              ) : verifiedLookupResult === 'NOT_FOUND' ? (
                <p className="text-sm text-white/80">
                  No issued credential matching{' '}
                  <span className="font-mono font-bold text-[#FFE264]">
                    {verifyQuery.trim()}
                  </span>{' '}
                  was found in the verified registry. Complete the final capstone milestone
                  of a course to issue a verifiable credential ID.
                </p>
              ) : (
                verifiedLookupResult && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-6 h-6 text-[#F2A900] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#F2A900]">
                          Authentic Credential Confirmed
                        </p>
                        <p className="mt-1 text-base font-extrabold text-white">
                          {verifiedLookupResult.record.learnerName} —{' '}
                          {verifiedLookupResult.record.capstoneTitle}
                        </p>
                        <p className="mt-0.5 text-xs text-white/70">
                          {verifiedLookupResult.record.track} · Rubric{' '}
                          {verifiedLookupResult.record.rubricScore}/100 · Issued{' '}
                          {new Date(
                            verifiedLookupResult.record.issuedAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVerifyQuery('')}
                      className="text-xs font-bold text-[#FFE264] hover:underline self-start sm:self-center cursor-pointer"
                    >
                      Clear Lookup
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {/* Course Certificates Section */}
          {certificateList.length === 0 ? (
            <div className="rounded-3xl glass-midnight border border-white/15 p-12 text-center">
              <Award className="w-10 h-10 text-[#F2A900] mx-auto mb-4" />
              <h2 className="text-xl font-extrabold text-white">
                No Capstone Certificates Issued Yet
              </h2>
              <p className="mt-2 text-sm text-white/75 max-w-md mx-auto">
                Complete all 12 progressive lessons and pass the final Mentor Rubric
                (&ge; 80/100) in any course to mint your verified credential with QR badge
                and PNG/PDF export.
              </p>
              <button
                type="button"
                onClick={onBrowseCatalog}
                className="tactile-press mt-6 px-6 py-3 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-sm font-bold cursor-pointer"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {certificateList.length > 1 && (
                <div className="flex flex-wrap gap-2 no-print">
                  {certificateList.map((cert) => (
                    <button
                      key={cert.courseId}
                      type="button"
                      onClick={() => {
                        setActiveDiplomaTrack(null);
                        setSelectedCertId(cert.courseId);
                      }}
                      className={`tactile-press px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                        !activeDiplomaTrack && activeCert?.courseId === cert.courseId
                          ? 'bg-[#F2A900] text-[#00205B]'
                          : 'bg-[#00153D] text-white/80 border border-white/15 hover:text-white'
                      }`}
                    >
                      {cert.courseTitle}
                    </button>
                  ))}
                </div>
              )}

              {selectedDiploma ? (
                <CertificateCard
                  cert={selectedDiploma}
                  fallbackLearnerName={learnerName}
                  isDiploma
                />
              ) : (
                activeCert && (
                  <CertificateCard
                    cert={activeCert}
                    fallbackLearnerName={learnerName}
                  />
                )
              )}
            </div>
          )}

          {/* Multi-Course Track Specialization Diplomas */}
          <div className="pt-8 border-t border-white/10 no-print">
            <div className="flex items-center gap-2.5 mb-5">
              <GraduationCap className="w-5 h-5 text-[#F2A900]" />
              <h2 className="text-xl font-extrabold text-white">
                Multi-Course Track Specialization Diplomas
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trackProgress.map((item) => (
                <div
                  key={item.track}
                  className={`rounded-2xl p-5 border flex flex-col justify-between gap-4 ${
                    item.completed
                      ? 'bg-[#003087] border-[#F2A900]'
                      : 'bg-[#00153D] border-white/15'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-[#FFE264] tabular-nums">
                      {item.earnedCount} / {item.totalCourses} Courses Certified
                    </p>
                    <h3 className="mt-1.5 text-sm font-extrabold text-white leading-snug">
                      {item.track}
                    </h3>
                  </div>

                  {item.completed && item.diplomaRecord ? (
                    <button
                      type="button"
                      onClick={() => setActiveDiplomaTrack(item.track)}
                      className="tactile-press px-4 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold cursor-pointer self-start"
                    >
                      View Track Diploma
                    </button>
                  ) : (
                    <span className="text-[11px] text-white/65">
                      Complete all courses in this track to unlock diploma
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // PORTFOLIO VIEW
  return (
    <section className="py-16 bg-[#00205B] min-h-[75vh]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#F2A900]">
              Learner Showcase
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] leading-[1.1] text-white">
              {learnerName}
            </h1>
            <p className="mt-1 text-sm text-white/75">
              {learnerHeadline} ·{' '}
              <span className="tabular-nums">
                {certificateList.length} Verified Capstones · {enrolledList.length} Active Courses
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onBrowseCatalog}
            className="tactile-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-sm font-bold cursor-pointer self-start sm:self-auto"
          >
            <span>Explore More Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Active Enrolled Courses */}
        <div>
          <h2 className="text-xl font-extrabold text-white mb-5">
            Active Scaffolding Workspaces
          </h2>
          {!isAuthenticated ? (
            <div className="rounded-2xl glass-midnight border border-white/15 p-8 text-center">
              <p className="text-base font-bold text-white">
                Sign in to build your verified capstone portfolio
              </p>
              <p className="mt-1.5 text-sm text-white/70 max-w-lg mx-auto">
                Create a free Apex Academy account with Google, GitHub, or Email to enroll in
                courses, save sandbox code, and publish verified case studies.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/signin"
                  className="tactile-press px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold"
                >
                  Sign In or Create Account
                </Link>
                <button
                  type="button"
                  onClick={onBrowseCatalog}
                  className="tactile-press px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer"
                >
                  Browse Courses
                </button>
              </div>
            </div>
          ) : enrolledList.length === 0 ? (
            <div className="rounded-2xl glass-midnight border border-white/15 p-8 text-center">
              <p className="text-base font-bold text-white">
                You haven&apos;t enrolled in a course yet
              </p>
              <p className="mt-1.5 text-sm text-white/70">
                Pick any track from our {COURSES.length} flagship capstone courses to start building.
              </p>
              <button
                type="button"
                onClick={onBrowseCatalog}
                className="tactile-press mt-5 px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold cursor-pointer"
              >
                Open Course Catalog
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {enrolledList.map(({ course, completedCount }) => {
                const pct = Math.round((completedCount / course.modules.length) * 100);
                return (
                  <div
                    key={course.id}
                    className="rounded-2xl bg-[#00153D] border border-white/15 p-6 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-white/65">
                        <span>{course.track}</span>
                        <span className="tabular-nums font-bold text-[#FFE264]">
                          {completedCount}/{course.modules.length} Lessons
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-extrabold text-white">
                        {course.title}
                      </h3>
                      <div className="mt-3 w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-[#F2A900]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-white/70">
                        Capstone: {course.capstoneTitle}
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenCourse(course)}
                        className="tactile-press px-4 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold shrink-0 cursor-pointer"
                      >
                        Resume Lab
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Verified Capstone Case Studies */}
        <div>
          <h2 className="text-xl font-extrabold text-white mb-5">
            Published Capstone Case Studies
          </h2>
          {certificateList.length === 0 ? (
            <div className="rounded-2xl bg-[#00153D] border border-white/15 p-8 text-sm text-white/75">
              Completed capstone projects and mentor rubric scores appear here once you
              pass the final capstone milestone of any course.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {certificateList.map((cert) => (
                <div
                  key={cert.verificationCode}
                  className="rounded-2xl bg-white text-[#00205B] p-6 flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#003087]">
                      <span>{cert.track}</span>
                      <span className="tabular-nums">Rubric: {cert.rubricScore}/100</span>
                    </div>
                    <h3 className="mt-2 text-xl font-extrabold text-[#00205B]">
                      {cert.capstoneTitle}
                    </h3>
                    <p className="mt-2 text-sm text-[#00205B]/80 leading-relaxed">
                      {cert.capstoneSummary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-bold text-[#003087]">
                      <CheckCircle2 className="w-4 h-4 text-[#F2A900]" />
                      <span>{cert.verificationCode}</span>
                    </span>

                    {cert.artifactUrl && isSafeHttpUrl(cert.artifactUrl) && (
                      <a
                        href={cert.artifactUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#00205B] hover:text-[#003087]"
                      >
                        <span>View Artifact</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
