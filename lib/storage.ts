'use client';

import { getSupabaseClient, isSupabaseConfigured } from './supabase';
import type { QaEntry } from './module-study-data';
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  type NotificationPreferences,
} from './email-templates';

export interface LearnerProfile {
  name: string;
  headline: string;
  email: string;
  userId: string | null;
  provider?: string | null;
  notificationPreferences?: NotificationPreferences;
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

const STORAGE_PREFIX = 'apex_academy_state_v2_';
const LEGACY_STORAGE_KEY = 'apex_academy_state_v1';
export const CURRENT_CURRICULUM_VERSION = 2;

export const DEFAULT_STATE: AcademyState = {
  curriculumVersion: CURRENT_CURRICULUM_VERSION,
  profile: {
    name: 'Guest Learner',
    headline: 'Aspiring Capstone Builder',
    email: '',
    userId: null,
    provider: null,
    notificationPreferences: DEFAULT_NOTIFICATION_PREFERENCES,
  },
  studyStreak: {
    currentStreak: 1,
    lastActiveDate: null,
  },
  enrollments: {},
  certificates: {},
  qaPosts: {},
};

function getUserStorageKey(userId: string): string {
  return `${STORAGE_PREFIX}${userId}`;
}

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

/**
 * Loads cached workspace drafts strictly scoped to the authenticated userId.
 * Never loads shared guest data when userId is null.
 */
export function loadLocalState(userId: string | null = null): AcademyState {
  if (typeof window === 'undefined' || !userId) return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(getUserStorageKey(userId));
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<AcademyState>;
    const migratedEnrollments = migrateLegacyEnrollments(
      parsed.enrollments ?? {},
      parsed.curriculumVersion
    );
    const nextState: AcademyState = {
      curriculumVersion: CURRENT_CURRICULUM_VERSION,
      profile: {
        ...DEFAULT_STATE.profile,
        ...(parsed.profile ?? {}),
        userId,
      },
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
  const userId = state.profile.userId;
  if (!userId) return;
  try {
    window.localStorage.setItem(
      getUserStorageKey(userId),
      JSON.stringify({
        ...state,
        curriculumVersion: CURRENT_CURRICULUM_VERSION,
      })
    );
  } catch {
    // Ignore storage quota issues safely
  }
}

export function clearUserLocalCache(userId?: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    if (userId) {
      window.localStorage.removeItem(getUserStorageKey(userId));
    }
  } catch {
    // Ignore storage access errors
  }
}

function resolveUserDisplayName(user: {
  email?: string;
  user_metadata?: Record<string, unknown>;
}): string {
  const meta = user.user_metadata ?? {};
  const candidate =
    meta.full_name ?? meta.name ?? meta.user_name ?? meta.preferred_username;
  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate.trim().slice(0, 120);
  }
  if (user.email) {
    return user.email.split('@')[0].slice(0, 120);
  }
  return 'Learner';
}

export async function syncStateFromSupabase(): Promise<AcademyState> {
  const supabase = getSupabaseClient();
  if (!supabase || !isSupabaseConfigured) return DEFAULT_STATE;

  try {
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    const user = userData?.user;
    if (userErr || !user) {
      return DEFAULT_STATE;
    }

    const userScopedCache = loadLocalState(user.id);

    const [{ data: profileRow }, { data: enrollmentRows }, { data: milestoneRows }, { data: certRows }] =
      await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('enrollments').select('*').eq('user_id', user.id),
        supabase.from('milestone_progress').select('*').eq('user_id', user.id),
        supabase.from('capstone_certificates').select('*').eq('user_id', user.id),
      ]);

    const nextEnrollments: Record<string, EnrollmentRecord> = {
      ...userScopedCache.enrollments,
    };

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

    const nextCerts: Record<string, CertificateRecord> = {
      ...userScopedCache.certificates,
    };
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

    const fallbackName = resolveUserDisplayName(user);
    const provider =
      typeof user.app_metadata?.provider === 'string'
        ? user.app_metadata.provider
        : 'email';

    const merged: AcademyState = {
      curriculumVersion: CURRENT_CURRICULUM_VERSION,
      profile: {
        name: profileRow?.full_name || fallbackName,
        headline: profileRow?.headline || 'Capstone Builder',
        email: user.email || '',
        userId: user.id,
        provider,
        notificationPreferences: {
          ...DEFAULT_NOTIFICATION_PREFERENCES,
          ...((profileRow?.notification_preferences as Partial<NotificationPreferences> | null) ??
            {}),
        },
      },
      studyStreak: {
        currentStreak: profileRow?.study_streak ?? userScopedCache.studyStreak.currentStreak,
        lastActiveDate: profileRow?.last_active_date ?? userScopedCache.studyStreak.lastActiveDate,
      },
      enrollments: nextEnrollments,
      certificates: nextCerts,
      qaPosts: userScopedCache.qaPosts,
    };

    saveLocalState(merged);
    return merged;
  } catch {
    return DEFAULT_STATE;
  }
}

export async function persistProfileToSupabase(profile: LearnerProfile): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase || !profile.userId) return;
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user || data.user.id !== profile.userId) return;
    await supabase.from('profiles').upsert(
      {
        id: data.user.id,
        full_name: profile.name.trim().slice(0, 120) || 'Learner',
        headline: profile.headline.trim().slice(0, 160) || 'Capstone Builder',
        notification_preferences:
          profile.notificationPreferences ?? DEFAULT_NOTIFICATION_PREFERENCES,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );
  } catch {
    // Local user-scoped draft remains intact
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
