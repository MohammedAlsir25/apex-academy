'use client';

import { getSupabaseClient, isSupabaseConfigured } from './supabase';
import type { QaEntry } from './module-study-data';

export interface LearnerProfile {
  name: string;
  headline: string;
  email: string;
  userId: string | null;
}

export interface ModuleNote {
  id: string;
  timestampLabel: string;
  text: string;
  createdAt: string;
}

export interface ModuleProgressRecord {
  completed: boolean;
  completedAt: string | null;
  codeDraft?: string;
  deliverableValues?: Record<string, string>;
  quizPassed?: boolean;
  revealedHintCount?: number;
  notes?: ModuleNote[];
  rubricSubmission?: {
    capstoneTitle: string;
    capstoneSummary: string;
    artifactUrl: string;
    score: number;
    breakdown: Array<{ criterion: string; earned: number; max: number; passed: boolean }>;
  };
}

export interface EnrollmentRecord {
  courseId: string;
  enrolledAt: string;
  currentModuleIndex: number;
  modules: Record<string, ModuleProgressRecord>;
}

export interface CertificateRecord {
  courseId: string;
  courseTitle: string;
  track: string;
  verificationCode: string;
  learnerName: string;
  capstoneTitle: string;
  capstoneSummary: string;
  artifactUrl: string;
  rubricScore: number;
  rubricBreakdown: Array<{ criterion: string; earned: number; max: number; passed: boolean }>;
  skillsVerified?: string[];
  instructorName?: string;
  instructorRole?: string;
  instructorOrg?: string;
  issuedAt: string;
}

export interface StudyStreak {
  currentStreak: number;
  lastActiveDate: string | null;
}

export interface AcademyState {
  curriculumVersion?: number;
  profile: LearnerProfile;
  studyStreak: StudyStreak;
  enrollments: Record<string, EnrollmentRecord>;
  certificates: Record<string, CertificateRecord>;
  qaPosts: Record<string, QaEntry[]>;
}

const STORAGE_KEY = 'apex_academy_state_v1';
export const CURRENT_CURRICULUM_VERSION = 2;

export const DEFAULT_STATE: AcademyState = {
  curriculumVersion: CURRENT_CURRICULUM_VERSION,
  profile: {
    name: 'Mohammed Alsir',
    headline: 'Capstone Builder',
    email: 'learner@apexacademy.dev',
    userId: null,
  },
  studyStreak: {
    currentStreak: 1,
    lastActiveDate: null,
  },
  enrollments: {},
  certificates: {},
  qaPosts: {},
};

export function computeNextStudyStreak(prev: StudyStreak): StudyStreak {
  const today = new Date().toISOString().slice(0, 10);
  if (prev.lastActiveDate === today) {
    return prev;
  }
  if (!prev.lastActiveDate) {
    return { currentStreak: Math.max(1, prev.currentStreak), lastActiveDate: today };
  }
  const prevDate = new Date(`${prev.lastActiveDate}T00:00:00Z`).getTime();
  const currDate = new Date(`${today}T00:00:00Z`).getTime();
  const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) {
    return { currentStreak: prev.currentStreak + 1, lastActiveDate: today };
  }
  return { currentStreak: 1, lastActiveDate: today };
}

function migrateLegacyEnrollments(
  enrollments: Record<string, EnrollmentRecord>,
  storedVersion?: number
): Record<string, EnrollmentRecord> {
  if (storedVersion === CURRENT_CURRICULUM_VERSION) {
    return enrollments;
  }
  // Pre-v2 module IDs (py-m1..m6, etc.) belonged to the old 6-milestone layout.
  // Preserve enrollment cards & certificates while resetting stale module drafts/locks cleanly.
  const migrated: Record<string, EnrollmentRecord> = {};
  for (const [courseId, enr] of Object.entries(enrollments)) {
    migrated[courseId] = {
      courseId: enr.courseId || courseId,
      enrolledAt: enr.enrolledAt || new Date().toISOString(),
      currentModuleIndex: 0,
      modules: {},
    };
  }
  return migrated;
}

export function loadLocalState(): AcademyState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<AcademyState>;
    const migratedEnrollments = migrateLegacyEnrollments(
      parsed.enrollments ?? {},
      parsed.curriculumVersion
    );
    const nextState: AcademyState = {
      curriculumVersion: CURRENT_CURRICULUM_VERSION,
      profile: { ...DEFAULT_STATE.profile, ...(parsed.profile ?? {}) },
      studyStreak: { ...DEFAULT_STATE.studyStreak, ...(parsed.studyStreak ?? {}) },
      enrollments: migratedEnrollments,
      certificates: parsed.certificates ?? {},
      qaPosts: parsed.qaPosts ?? {},
    };
    if (parsed.curriculumVersion !== CURRENT_CURRICULUM_VERSION) {
      saveLocalState(nextState);
    }
    return nextState;
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveLocalState(state: AcademyState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...state,
        curriculumVersion: CURRENT_CURRICULUM_VERSION,
      })
    );
  } catch {
    // Ignore storage quota issues safely
  }
}

export async function syncStateFromSupabase(currentState: AcademyState): Promise<AcademyState> {
  const supabase = getSupabaseClient();
  if (!supabase || !isSupabaseConfigured) return currentState;

  try {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return currentState;

    const [{ data: profileRow }, { data: enrollmentRows }, { data: milestoneRows }, { data: certRows }] =
      await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('enrollments').select('*').eq('user_id', user.id),
        supabase.from('milestone_progress').select('*').eq('user_id', user.id),
        supabase.from('capstone_certificates').select('*').eq('user_id', user.id),
      ]);

    const nextEnrollments: Record<string, EnrollmentRecord> = { ...currentState.enrollments };
    for (const row of enrollmentRows ?? []) {
      const existing = nextEnrollments[row.course_id];
      const hasV2Milestones = (milestoneRows ?? []).some(
        (mRow) =>
          mRow.course_id === row.course_id &&
          (mRow.artifact_payload as { curriculumVersion?: number } | null)?.curriculumVersion ===
            CURRENT_CURRICULUM_VERSION
      );
      nextEnrollments[row.course_id] = {
        courseId: row.course_id,
        enrolledAt: row.enrolled_at,
        currentModuleIndex: hasV2Milestones
          ? (row.current_module_index ?? 0)
          : (existing?.currentModuleIndex ?? 0),
        modules: existing?.modules ?? {},
      };
    }

    for (const mRow of milestoneRows ?? []) {
      const payload = (mRow.artifact_payload ?? {}) as Partial<ModuleProgressRecord> & {
        curriculumVersion?: number;
      };
      // Skip legacy v1 (6-milestone) rows so old starter drafts never overwrite the 12-lesson workspaces
      if (payload.curriculumVersion !== CURRENT_CURRICULUM_VERSION) {
        continue;
      }
      if (!nextEnrollments[mRow.course_id]) {
        nextEnrollments[mRow.course_id] = {
          courseId: mRow.course_id,
          enrolledAt: new Date().toISOString(),
          currentModuleIndex: 0,
          modules: {},
        };
      }
      nextEnrollments[mRow.course_id].modules[mRow.module_id] = {
        completed: Boolean(mRow.completed),
        completedAt: mRow.completed_at ?? null,
        codeDraft: payload.codeDraft,
        deliverableValues: payload.deliverableValues,
        quizPassed: payload.quizPassed,
        revealedHintCount: payload.revealedHintCount,
        notes: payload.notes,
        rubricSubmission: payload.rubricSubmission,
      };
    }

    const nextCerts: Record<string, CertificateRecord> = { ...currentState.certificates };
    for (const cRow of certRows ?? []) {
      nextCerts[cRow.course_id] = {
        courseId: cRow.course_id,
        courseTitle: cRow.course_title ?? cRow.capstone_title,
        track: cRow.track ?? 'Apex Academy Track',
        verificationCode: cRow.verification_code,
        learnerName: cRow.learner_name,
        capstoneTitle: cRow.capstone_title,
        capstoneSummary: cRow.capstone_summary,
        artifactUrl: cRow.artifact_url ?? '',
        rubricScore: cRow.rubric_score,
        rubricBreakdown: Array.isArray(cRow.rubric_breakdown) ? cRow.rubric_breakdown : [],
        skillsVerified: Array.isArray(cRow.skills_verified) ? cRow.skills_verified : [],
        instructorName: cRow.instructor_name ?? undefined,
        instructorRole: cRow.instructor_role ?? undefined,
        instructorOrg: cRow.instructor_org ?? undefined,
        issuedAt: cRow.issued_at,
      };
    }

    const merged: AcademyState = {
      curriculumVersion: CURRENT_CURRICULUM_VERSION,
      profile: {
        name: profileRow?.full_name || currentState.profile.name,
        headline: profileRow?.headline || currentState.profile.headline,
        email: user.email || currentState.profile.email,
        userId: user.id,
      },
      studyStreak: currentState.studyStreak,
      enrollments: nextEnrollments,
      certificates: nextCerts,
      qaPosts: currentState.qaPosts,
    };
    saveLocalState(merged);
    return merged;
  } catch {
    return currentState;
  }
}

export async function persistEnrollmentToSupabase(
  courseId: string,
  currentModuleIndex: number
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    await supabase.from('enrollments').upsert(
      {
        user_id: data.user.id,
        course_id: courseId,
        current_module_index: currentModuleIndex,
      },
      { onConflict: 'user_id,course_id' }
    );
  } catch {
    // Local continuity remains preserved
  }
}

export async function persistMilestoneToSupabase(
  courseId: string,
  moduleId: string,
  record: ModuleProgressRecord
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    await supabase.from('milestone_progress').upsert(
      {
        user_id: data.user.id,
        course_id: courseId,
        module_id: moduleId,
        completed: record.completed,
        completed_at: record.completedAt,
        artifact_payload: {
          curriculumVersion: CURRENT_CURRICULUM_VERSION,
          codeDraft: record.codeDraft,
          deliverableValues: record.deliverableValues,
          quizPassed: record.quizPassed,
          revealedHintCount: record.revealedHintCount,
          notes: record.notes,
          rubricSubmission: record.rubricSubmission,
        },
      },
      { onConflict: 'user_id,course_id,module_id' }
    );
  } catch {
    // Local continuity remains preserved
  }
}

export async function persistCertificateToSupabase(cert: CertificateRecord): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    await supabase.from('capstone_certificates').upsert(
      {
        user_id: data.user.id,
        course_id: cert.courseId,
        course_title: cert.courseTitle,
        track: cert.track,
        verification_code: cert.verificationCode,
        learner_name: cert.learnerName,
        capstone_title: cert.capstoneTitle,
        capstone_summary: cert.capstoneSummary,
        artifact_url: cert.artifactUrl,
        rubric_score: cert.rubricScore,
        rubric_breakdown: cert.rubricBreakdown,
        skills_verified: cert.skillsVerified ?? [],
        instructor_name: cert.instructorName ?? null,
        instructor_role: cert.instructorRole ?? null,
        instructor_org: cert.instructorOrg ?? null,
        issued_at: cert.issuedAt,
      },
      { onConflict: 'user_id,course_id' }
    );
  } catch {
    // Local continuity remains preserved
  }
}
