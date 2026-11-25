'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { COURSES, getCourseById, type Course } from '@/lib/curriculum';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { sanitizeCourseId } from '@/lib/security';
import type { QaEntry } from '@/lib/module-study-data';
import {
  DEFAULT_STATE,
  clearUserLocalCache,
  computeNextStudyStreak,
  persistCertificateToSupabase,
  persistEnrollmentToSupabase,
  persistMilestoneToSupabase,
  persistProfileToSupabase,
  saveLocalState,
  syncStateFromSupabase,
  type AcademyState,
  type CertificateRecord,
  type LearnerProfile,
  type ModuleProgressRecord,
} from '@/lib/storage';
import { Header, type ActiveView } from './Header';
import { HeroShowcase } from './HeroShowcase';
import { ScaffoldingSection } from './ScaffoldingSection';
import { CourseCatalog } from './CourseCatalog';
import { CourseDetailModal } from './CourseDetailModal';
import { CoursePlayer } from './CoursePlayer';
import { PortfolioAndCertificates } from './PortfolioAndCertificates';
import { AccountModal } from './AccountModal';
import { Footer } from './Footer';
import { SPRING_CRITICALLY_DAMPED } from './FluidPrimitives';

export function ApexAcademyApp() {
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const [state, setState] = useState<AcademyState>(DEFAULT_STATE);
  const [authReady, setAuthReady] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [initialVerifyCode, setInitialVerifyCode] = useState<string | null>(null);
  const [detailCourse, setDetailCourse] = useState<Course | null>(null);
  const [playerCourseId, setPlayerCourseId] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const lastUserIdRef = useRef<string | null>(null);

  const isAuthenticated = Boolean(state.profile.userId);

  const updateState = useCallback((updater: (prev: AcademyState) => AcademyState) => {
    setState((prev) => {
      const next = updater(prev);
      saveLocalState(next);
      return next;
    });
  }, []);

  const enrollCourseImmediately = useCallback(
    (course: Course) => {
      setDetailCourse(null);
      updateState((prev) => {
        if (!prev.profile.userId) return prev;
        if (prev.enrollments[course.id]) {
          return prev;
        }
        return {
          ...prev,
          studyStreak: computeNextStudyStreak(prev.studyStreak),
          enrollments: {
            ...prev.enrollments,
            [course.id]: {
              courseId: course.id,
              enrolledAt: new Date().toISOString(),
              currentModuleIndex: 0,
              modules: {},
            },
          },
        };
      });
      void persistEnrollmentToSupabase(course.id, 0);
      setPlayerCourseId(course.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [updateState]
  );

  // Hydrate Supabase session, handle ?verify= and post-login ?enroll= intent, and subscribe to auth state changes
  useEffect(() => {
    let active = true;
    const params =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : null;
    const verifyParam = params?.get('verify');
    const pendingEnrollId = sanitizeCourseId(params?.get('enroll'));

    syncStateFromSupabase().then((synced) => {
      if (!active) return;
      lastUserIdRef.current = synced.profile.userId;
      setState(synced);
      setAuthReady(true);

      if (synced.profile.userId && typeof window !== 'undefined') {
        const welcomeFlagKey = `apex_welcome_dispatched_${synced.profile.userId}`;
        if (!window.localStorage.getItem(welcomeFlagKey)) {
          window.localStorage.setItem(welcomeFlagKey, '1');
          void fetch('/api/notifications/dispatch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventType: 'welcome' }),
          }).catch(() => undefined);
        }
      }

      if (verifyParam) {
        setInitialVerifyCode(verifyParam);
        setActiveView('certificates');
      }

      if (pendingEnrollId) {
        if (synced.profile.userId) {
          const targetCourse = getCourseById(pendingEnrollId);
          if (targetCourse) {
            if (!synced.enrollments[targetCourse.id]) {
              const nextState: AcademyState = {
                ...synced,
                studyStreak: computeNextStudyStreak(synced.studyStreak),
                enrollments: {
                  ...synced.enrollments,
                  [targetCourse.id]: {
                    courseId: targetCourse.id,
                    enrolledAt: new Date().toISOString(),
                    currentModuleIndex: 0,
                    modules: {},
                  },
                },
              };
              setState(nextState);
              saveLocalState(nextState);
              void persistEnrollmentToSupabase(targetCourse.id, 0);
            }
            setPlayerCourseId(targetCourse.id);
            router.replace('/');
          }
        } else {
          router.replace(`/signin?enroll=${encodeURIComponent(pendingEnrollId)}`);
        }
      }
    });

    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured) {
      return () => {
        active = false;
      };
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (!active) return;
      if (event === 'SIGNED_OUT') {
        clearUserLocalCache(lastUserIdRef.current);
        lastUserIdRef.current = null;
        setPlayerCourseId(null);
        setDetailCourse(null);
        setState(DEFAULT_STATE);
      } else if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
        syncStateFromSupabase().then((synced) => {
          if (!active) return;
          lastUserIdRef.current = synced.profile.userId;
          setState(synced);
        });
      }
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleNavigate = (view: ActiveView, sectionId?: string) => {
    setPlayerCourseId(null);
    setActiveView(view);
    if (view === 'home' && sectionId) {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  /**
   * Account-gated enrollment: visitors can browse the catalog & syllabi freely,
   * but must have an authenticated account to enroll or launch CoursePlayer.
   */
  const handleEnrollAndOpen = (course: Course) => {
    if (!state.profile.userId) {
      setDetailCourse(null);
      router.push(`/signin?enroll=${encodeURIComponent(course.id)}`);
      return;
    }
    enrollCourseImmediately(course);
  };

  const handleRecordStudyActivity = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      studyStreak: computeNextStudyStreak(prev.studyStreak),
    }));
  }, [updateState]);

  const handleAddQaPost = useCallback(
    (moduleId: string, questionText: string) => {
      updateState((prev) => {
        if (!prev.profile.userId) return prev;
        const existing = prev.qaPosts[moduleId] ?? [];
        const newEntry = {
          id: `qa-${Date.now()}`,
          author: prev.profile.name,
          role: 'Learner' as const,
          question: questionText,
          upvotes: 1,
          createdAt: new Date().toISOString(),
        };
        return {
          ...prev,
          qaPosts: {
            ...prev.qaPosts,
            [moduleId]: [newEntry, ...existing],
          },
        };
      });
    },
    [updateState]
  );

  const handleUpvoteQaPost = useCallback(
    (moduleId: string, post: QaEntry) => {
      updateState((prev) => {
        if (!prev.profile.userId) return prev;
        const existing = prev.qaPosts[moduleId] ?? [];
        const found = existing.find((p) => p.id === post.id);
        const nextList = found
          ? existing.map((p) =>
              p.id === post.id ? { ...p, upvotes: p.upvotes + 1 } : p
            )
          : [...existing, { ...post, upvotes: post.upvotes + 1 }];
        return {
          ...prev,
          qaPosts: {
            ...prev.qaPosts,
            [moduleId]: nextList,
          },
        };
      });
    },
    [updateState]
  );

  const handleUpdateModuleProgress = (
    courseId: string,
    moduleId: string,
    nextRecord: ModuleProgressRecord,
    nextModuleIndex?: number
  ) => {
    if (!state.profile.userId) return;

    updateState((prev) => {
      const existing = prev.enrollments[courseId] ?? {
        courseId,
        enrolledAt: new Date().toISOString(),
        currentModuleIndex: 0,
        modules: {},
      };
      const updatedIndex =
        nextModuleIndex !== undefined ? nextModuleIndex : existing.currentModuleIndex;

      return {
        ...prev,
        enrollments: {
          ...prev.enrollments,
          [courseId]: {
            ...existing,
            currentModuleIndex: updatedIndex,
            modules: {
              ...existing.modules,
              [moduleId]: nextRecord,
            },
          },
        },
      };
    });

    void persistMilestoneToSupabase(courseId, moduleId, nextRecord);
    if (nextModuleIndex !== undefined) {
      void persistEnrollmentToSupabase(courseId, nextModuleIndex);
    }
  };

  const handleIssueCertificate = (cert: CertificateRecord) => {
    if (!state.profile.userId) return;
    updateState((prev) => ({
      ...prev,
      certificates: {
        ...prev.certificates,
        [cert.courseId]: cert,
      },
    }));
    void persistCertificateToSupabase(cert);
    void fetch('/api/notifications/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'course_completion',
        courseId: cert.courseId,
        courseTitle: cert.courseTitle,
        track: cert.track,
        capstoneTitle: cert.capstoneTitle,
        rubricScore: cert.rubricScore,
        verificationCode: cert.verificationCode,
      }),
    }).catch(() => undefined);
  };

  const handleUpdateProfile = (profile: LearnerProfile) => {
    updateState((prev) => ({
      ...prev,
      profile,
    }));
    void persistProfileToSupabase(profile);
  };

  const handleSignedOut = () => {
    clearUserLocalCache(lastUserIdRef.current);
    lastUserIdRef.current = null;
    setPlayerCourseId(null);
    setDetailCourse(null);
    setState(DEFAULT_STATE);
  };

  // Active full-screen Course Player mode (strictly gated behind authenticated account)
  const activePlayerCourse =
    authReady && isAuthenticated && playerCourseId
      ? getCourseById(playerCourseId)
      : undefined;

  if (activePlayerCourse) {
    const enrollment = state.enrollments[activePlayerCourse.id] ?? {
      courseId: activePlayerCourse.id,
      enrolledAt: new Date().toISOString(),
      currentModuleIndex: 0,
      modules: {},
    };

    return (
      <CoursePlayer
        course={activePlayerCourse}
        enrollment={enrollment}
        certificate={state.certificates[activePlayerCourse.id]}
        learnerName={state.profile.name}
        studyStreak={state.studyStreak}
        qaPosts={state.qaPosts}
        onExit={() => setPlayerCourseId(null)}
        onUpdateModuleProgress={handleUpdateModuleProgress}
        onRecordStudyActivity={handleRecordStudyActivity}
        onAddQaPost={handleAddQaPost}
        onUpvoteQaPost={handleUpvoteQaPost}
        onIssueCertificate={handleIssueCertificate}
        onViewCertificate={() => {
          setPlayerCourseId(null);
          setActiveView('certificates');
        }}
      />
    );
  }

  const hasOpenSheet = Boolean(detailCourse) || accountOpen;

  return (
    <div className="min-h-screen flex flex-col bg-[#00153D] text-white overflow-x-clip">
      <motion.div
        animate={
          hasOpenSheet && !prefersReducedMotion
            ? { scale: 0.985, borderRadius: '20px' }
            : { scale: 1, borderRadius: '0px' }
        }
        transition={SPRING_CRITICALLY_DAMPED}
        className="min-h-screen flex flex-col bg-[#00205B] origin-top overflow-x-clip"
      >
        <Header
          activeView={activeView}
          onNavigate={handleNavigate}
          onOpenAccount={() => setAccountOpen(true)}
          enrolledCount={Object.keys(state.enrollments).length}
          learnerName={state.profile.name}
          isAuthenticated={isAuthenticated}
        />

        <main className="flex-1">
          {activeView === 'home' && (
            <>
              <HeroShowcase
                onExploreCatalog={() => handleNavigate('home', 'catalog')}
                onLaunchDemoCourse={() => handleEnrollAndOpen(COURSES[0])}
              />
              <ScaffoldingSection />
              <CourseCatalog
                enrollments={state.enrollments}
                certificates={state.certificates}
                onSelectCourse={(course) => setDetailCourse(course)}
                onResumeCourse={(course) => handleEnrollAndOpen(course)}
              />
            </>
          )}

          {(activeView === 'portfolio' || activeView === 'certificates') && (
            <PortfolioAndCertificates
              mode={activeView}
              isAuthenticated={isAuthenticated}
              learnerName={state.profile.name}
              learnerHeadline={state.profile.headline}
              enrollments={state.enrollments}
              certificates={state.certificates}
              initialVerifyCode={initialVerifyCode}
              onOpenCourse={(course) => handleEnrollAndOpen(course)}
              onBrowseCatalog={() => handleNavigate('home', 'catalog')}
            />
          )}
        </main>

        <Footer onNavigate={handleNavigate} />
      </motion.div>

      <AnimatePresence>
        {detailCourse && (
          <CourseDetailModal
            key={`detail-${detailCourse.id}`}
            course={detailCourse}
            enrollment={state.enrollments[detailCourse.id]}
            isAuthenticated={isAuthenticated}
            onClose={() => setDetailCourse(null)}
            onEnrollAndOpen={handleEnrollAndOpen}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {accountOpen && (
          <AccountModal
            key="account-sheet"
            profile={state.profile}
            onUpdateProfile={handleUpdateProfile}
            onClose={() => setAccountOpen(false)}
            onSignedOut={handleSignedOut}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
