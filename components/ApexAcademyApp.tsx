'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { COURSES, getCourseById, type Course } from '@/lib/curriculum';
import type { QaEntry } from '@/lib/module-study-data';
import {
  DEFAULT_STATE,
  computeNextStudyStreak,
  loadLocalState,
  persistCertificateToSupabase,
  persistEnrollmentToSupabase,
  persistMilestoneToSupabase,
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

export function ApexAcademyApp() {
  const [state, setState] = useState<AcademyState>(DEFAULT_STATE);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [initialVerifyCode, setInitialVerifyCode] = useState<string | null>(null);
  const [detailCourse, setDetailCourse] = useState<Course | null>(null);
  const [playerCourseId, setPlayerCourseId] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const handleSync = useCallback(async () => {
    const local = loadLocalState();
    const synced = await syncStateFromSupabase(local);
    setState(synced);
  }, []);

  useEffect(() => {
    let active = true;
    const params =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : null;
    const verifyParam = params?.get('verify');

    Promise.resolve()
      .then(() => syncStateFromSupabase(loadLocalState()))
      .then((synced) => {
        if (!active) return;
        setState(synced);
        if (verifyParam) {
          setInitialVerifyCode(verifyParam);
          setActiveView('certificates');
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const updateState = useCallback((updater: (prev: AcademyState) => AcademyState) => {
    setState((prev) => {
      const next = updater(prev);
      saveLocalState(next);
      return next;
    });
  }, []);

  const handleNavigate = (view: ActiveView, sectionId?: string) => {
    setPlayerCourseId(null);
    setActiveView(view);
    if (view === 'home' && sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEnrollAndOpen = (course: Course) => {
    setDetailCourse(null);
    if (!state.enrollments[course.id]) {
      updateState((prev) => ({
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
      }));
      void persistEnrollmentToSupabase(course.id, 0);
    }
    setPlayerCourseId(course.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    updateState((prev) => ({
      ...prev,
      certificates: {
        ...prev.certificates,
        [cert.courseId]: cert,
      },
    }));
    void persistCertificateToSupabase(cert);
  };

  const handleUpdateProfile = (profile: LearnerProfile) => {
    updateState((prev) => ({
      ...prev,
      profile,
    }));
  };

  // Active full-screen Course Player mode
  const activePlayerCourse = playerCourseId ? getCourseById(playerCourseId) : undefined;
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

  return (
    <div className="min-h-screen flex flex-col bg-[#00205B] text-white">
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenAccount={() => setAccountOpen(true)}
        enrolledCount={Object.keys(state.enrollments).length}
        learnerName={state.profile.name}
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

      {detailCourse && (
        <CourseDetailModal
          course={detailCourse}
          enrollment={state.enrollments[detailCourse.id]}
          onClose={() => setDetailCourse(null)}
          onEnrollAndOpen={handleEnrollAndOpen}
        />
      )}

      {accountOpen && (
        <AccountModal
          profile={state.profile}
          onUpdateProfile={handleUpdateProfile}
          onClose={() => setAccountOpen(false)}
          onSyncComplete={handleSync}
        />
      )}
    </div>
  );
}
