'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Code2,
  Database,
  Download,
  FileCode2,
  Flame,
  HelpCircle,
  Keyboard,
  Lightbulb,
  Lock,
  MessageSquare,
  Play,
  PlayCircle,
  Puzzle,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  StickyNote,
  Terminal,
  ThumbsUp,
  Trash2,
  Trophy,
  X,
} from 'lucide-react';
import type { Course, CourseModule, DeliverableField } from '@/lib/curriculum';
import { LessonDiagram } from './LessonDiagram';
import {
  ActivePracticeCard,
  renderInlineFormattedText,
  TheoryCard,
} from './LessonChallengeCards';
import { SPRING_CRITICALLY_DAMPED, SPRING_MOMENTUM } from './FluidPrimitives';
import {
  COURSE_SKILLS_VERIFIED,
  getModuleStudyPack,
  type QaEntry,
} from '@/lib/module-study-data';
import {
  runJsSandbox,
  runPromptSandbox,
  runPythonSandbox,
  runSqlSandbox,
  type PromptExecutionOutput,
  type SandboxTestResult,
  type SqlExecutionOutput,
} from '@/lib/sandbox-engines';
import type {
  CertificateRecord,
  EnrollmentRecord,
  ModuleNote,
  ModuleProgressRecord,
  StudyStreak,
} from '@/lib/storage';

interface CoursePlayerProps {
  course: Course;
  enrollment: EnrollmentRecord;
  certificate?: CertificateRecord;
  learnerName: string;
  studyStreak: StudyStreak;
  qaPosts: Record<string, QaEntry[]>;
  onExit: () => void;
  onUpdateModuleProgress: (
    courseId: string,
    moduleId: string,
    nextRecord: ModuleProgressRecord,
    nextModuleIndex?: number
  ) => void;
  onRecordStudyActivity: () => void;
  onAddQaPost: (moduleId: string, questionText: string) => void;
  onUpvoteQaPost: (moduleId: string, post: QaEntry) => void;
  onIssueCertificate: (certificate: CertificateRecord) => void;
  onViewCertificate: () => void;
}

interface AchievementEvent {
  id: number;
  kind: 'lesson' | 'quiz' | 'capstone' | 'code';
  milestoneNumber: string;
  milestoneTitle: string;
  stage: string;
  isCapstone: boolean;
  rubricScore?: number;
  nextIndex?: number;
  subtitle?: string;
}

const BRAND_CONFETTI_COLORS = ['#F2A900', '#FFE264', '#FFFFFF', '#307FE2'];

function isDeliverableFieldValid(field: DeliverableField, rawValue: string): boolean {
  const val = rawValue.trim();
  if (!val) return false;
  const rule = field.validationRule;

  if (field.type === 'number') {
    const num = Number(val);
    if (Number.isNaN(num)) return false;
    if (rule.minNumber !== undefined && num < rule.minNumber) return false;
    if (rule.maxNumber !== undefined && num > rule.maxNumber) return false;
    return true;
  }
  if (field.type === 'select') {
    return rule.exactOption ? val === rule.exactOption : Boolean(val);
  }
  if (rule.minLength && val.length < rule.minLength) return false;
  if (
    rule.mustContain &&
    !rule.mustContain.every((kw) => val.toLowerCase().includes(kw.toLowerCase()))
  ) {
    return false;
  }
  return true;
}

function getRuntimeLabel(mod: CourseModule): string {
  if (mod.mode === 'deliverable') return 'Structured Architecture Lab';
  if (mod.mode === 'rubric') return 'Final Capstone & Mentor Rubric';
  if (mod.runtime === 'python') return 'In-Browser Python 3 IDE';
  if (mod.runtime === 'sql') return 'Relational SQL Workbench';
  if (mod.runtime === 'prompt') return 'Prompt Engineering Studio';
  return 'Interactive Code Sandbox';
}

function getDefaultFilename(mod: CourseModule): string {
  if (mod.workspaceFiles && mod.workspaceFiles.length > 0) {
    return mod.workspaceFiles[0].filename;
  }
  if (mod.runtime === 'python') return 'main.py';
  if (mod.runtime === 'sql') return 'query.sql';
  if (mod.runtime === 'prompt') return 'prompt.md';
  return 'index.js';
}

interface ModuleWorkspaceProps {
  course: Course;
  activeIndex: number;
  activeModule: CourseModule;
  savedModule?: ModuleProgressRecord;
  certificate?: CertificateRecord;
  learnerName: string;
  moduleQaPosts: QaEntry[];
  nextUnlocked: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onUpdateModuleProgress: CoursePlayerProps['onUpdateModuleProgress'];
  onRecordStudyActivity: () => void;
  onAddQaPost: (moduleId: string, questionText: string) => void;
  onUpvoteQaPost: (moduleId: string, post: QaEntry) => void;
  onIssueCertificate: CoursePlayerProps['onIssueCertificate'];
  onViewCertificate: CoursePlayerProps['onViewCertificate'];
  onMilestoneAchieved: (event: Omit<AchievementEvent, 'id'>) => void;
}

function ModuleWorkspace({
  course,
  activeIndex,
  activeModule,
  savedModule,
  certificate,
  learnerName,
  moduleQaPosts,
  nextUnlocked,
  onPrevious,
  onNext,
  onUpdateModuleProgress,
  onRecordStudyActivity,
  onAddQaPost,
  onUpvoteQaPost,
  onIssueCertificate,
  onViewCertificate,
  onMilestoneAchieved,
}: ModuleWorkspaceProps) {
  const studyPack = useMemo(
    () => getModuleStudyPack(course.title, activeModule),
    [course.title, activeModule]
  );

  // Left Study Tabs
  const [studyTab, setStudyTab] = useState<'handbook' | 'quiz' | 'notes' | 'qa'>(
    'handbook'
  );
  const [loadedExampleBanner, setLoadedExampleBanner] = useState(false);

  // Knowledge Check State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(
    savedModule?.quizPassed ? studyPack.knowledgeCheck.correctIndex : null
  );
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(
    Boolean(savedModule?.quizPassed)
  );

  // Notes State
  const [noteInput, setNoteInput] = useState('');
  const notes = savedModule?.notes ?? [];

  // Q&A State
  const [qaInput, setQaInput] = useState('');
  const combinedQa = useMemo(() => {
    const customMap = new Map((moduleQaPosts ?? []).map((q) => [q.id, q]));
    const starterIds = new Set(studyPack.initialQa.map((q) => q.id));
    const userAdded = (moduleQaPosts ?? []).filter((q) => !starterIds.has(q.id));
    const starterWithUpdates = studyPack.initialQa.map((q) => customMap.get(q.id) ?? q);
    return [...userAdded, ...starterWithUpdates];
  }, [moduleQaPosts, studyPack.initialQa]);

  // Progressive Hints & Reference Solution State
  const [revealedHints, setRevealedHints] = useState<number>(
    savedModule?.revealedHintCount ?? 0
  );
  const [workspaceView, setWorkspaceView] = useState<'work' | 'solution'>('work');

  // Replit Multi-File Explorer Tabs
  const primaryFilename = useMemo(() => getDefaultFilename(activeModule), [activeModule]);
  const inspectableFiles = useMemo(() => {
    const base = activeModule.workspaceFiles ?? [
      {
        filename: primaryFilename,
        language: 'javascript' as const,
        readOnly: false,
        content: '',
      },
    ];
    if (
      activeModule.runtime === 'sql' &&
      activeModule.sqlTables &&
      !base.some((f) => f.filename === 'seed_tables.json')
    ) {
      return [
        ...base,
        {
          filename: 'seed_tables.json',
          language: 'json' as const,
          readOnly: true,
          content: JSON.stringify(activeModule.sqlTables, null, 2),
        },
      ];
    }
    return base;
  }, [activeModule, primaryFilename]);

  const [selectedFileTab, setSelectedFileTab] = useState<string>(primaryFilename);

  // Sandbox State
  const [codeDraft, setCodeDraft] = useState<string>(
    savedModule?.codeDraft ?? activeModule.starterCode ?? ''
  );
  const [isRunningSandbox, setIsRunningSandbox] = useState(false);
  const [sandboxLogs, setSandboxLogs] = useState<string[]>([]);
  const [sandboxResults, setSandboxResults] = useState<SandboxTestResult[] | null>(null);
  const [sandboxError, setSandboxError] = useState<string | null>(null);
  const [sqlPreview, setSqlPreview] = useState<Pick<SqlExecutionOutput, 'columns' | 'rows'> | null>(
    null
  );
  const [promptPreview, setPromptPreview] = useState<
    Pick<PromptExecutionOutput, 'renderedPrompts' | 'estimatedTokens'> | null
  >(null);

  // Deliverable Form State
  const [deliverableValues, setDeliverableValues] = useState<Record<string, string>>(
    savedModule?.deliverableValues ?? {}
  );
  const [deliverableErrors, setDeliverableErrors] = useState<Record<string, string>>({});
  const [deliverableNotice, setDeliverableNotice] = useState<string | null>(null);

  // Rubric Portfolio State
  const [capstoneTitle, setCapstoneTitle] = useState<string>(
    savedModule?.rubricSubmission?.capstoneTitle ?? course.capstoneTitle
  );
  const [capstoneSummary, setCapstoneSummary] = useState<string>(
    savedModule?.rubricSubmission?.capstoneSummary ?? ''
  );
  const [artifactUrl, setArtifactUrl] = useState<string>(
    savedModule?.rubricSubmission?.artifactUrl ?? ''
  );
  const [rubricFeedback, setRubricFeedback] = useState<{
    score: number;
    passed: boolean;
    breakdown: Array<{ criterion: string; earned: number; max: number; passed: boolean }>;
  } | null>(
    savedModule?.rubricSubmission
      ? {
          score: savedModule.rubricSubmission.score,
          passed: savedModule.rubricSubmission.score >= 80,
          breakdown: savedModule.rubricSubmission.breakdown,
        }
      : null
  );

  const activeInspectFile = inspectableFiles.find((f) => f.filename === selectedFileTab);
  const handbook = activeModule.handbook;
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const [lockedNavHint, setLockedNavHint] = useState<string | null>(null);
  const [sandboxSuccessKey, setSandboxSuccessKey] = useState(0);
  const [quizCelebrateKey, setQuizCelebrateKey] = useState(0);

  const editorAllPassed = Boolean(
    sandboxResults && sandboxResults.length > 0 && sandboxResults.every((r) => r.passed)
  );

  const handleFocusEditor = () => {
    setWorkspaceView('work');
    setSelectedFileTab(primaryFilename);
    window.requestAnimationFrame(() => {
      editorRef.current?.focus();
      editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const handleLoadExampleIntoWorkspace = () => {
    if (!handbook) return;
    setCodeDraft(handbook.liveExample.code);
    setSelectedFileTab(primaryFilename);
    setWorkspaceView('work');
    setSandboxResults(null);
    setSandboxLogs([]);
    setSandboxError(null);
    setSqlPreview(null);
    setPromptPreview(null);
    setLoadedExampleBanner(true);
    window.setTimeout(() => setLoadedExampleBanner(false), 2600);
  };

  const handleDownloadCheatSheet = () => {
    if (typeof document === 'undefined') return;
    const blob = new Blob([studyPack.cheatSheetMarkdown], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeModule.id}-architectural-cheatsheet.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRevealHint = () => {
    const nextCount = Math.min(studyPack.hints.length, revealedHints + 1);
    setRevealedHints(nextCount);
    onUpdateModuleProgress(course.id, activeModule.id, {
      completed: Boolean(savedModule?.completed),
      completedAt: savedModule?.completedAt ?? null,
      codeDraft,
      deliverableValues,
      quizPassed: savedModule?.quizPassed,
      revealedHintCount: nextCount,
      notes,
      rubricSubmission: savedModule?.rubricSubmission,
    });
  };

  const handleCheckQuiz = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    const isCorrect = selectedQuizOption === studyPack.knowledgeCheck.correctIndex;
    if (isCorrect) {
      setQuizCelebrateKey((k) => k + 1);
      const workAlreadyVerified = Boolean(savedModule?.completed);
      const isLastModule = activeIndex === course.modules.length - 1;
      const unlocksNext = workAlreadyVerified && !isLastModule;

      onRecordStudyActivity();
      onUpdateModuleProgress(
        course.id,
        activeModule.id,
        {
          completed: workAlreadyVerified,
          completedAt: savedModule?.completedAt ?? null,
          codeDraft,
          deliverableValues,
          quizPassed: true,
          revealedHintCount: revealedHints,
          notes,
          rubricSubmission: savedModule?.rubricSubmission,
        },
        workAlreadyVerified
          ? Math.min(activeIndex + 1, course.modules.length - 1)
          : activeIndex
      );

      onMilestoneAchieved({
        kind: workAlreadyVerified
          ? isLastModule
            ? 'capstone'
            : 'lesson'
          : 'quiz',
        milestoneNumber: activeModule.number,
        milestoneTitle: activeModule.title,
        stage: activeModule.scaffoldingStage,
        isCapstone: workAlreadyVerified && isLastModule,
        nextIndex: unlocksNext ? activeIndex + 1 : undefined,
        subtitle: workAlreadyVerified
          ? isLastModule
            ? 'All course requirements and knowledge checks complete!'
            : 'Both coding challenge and concept check passed!'
          : 'Concept mastered! Finish the workspace task to complete this lesson.',
      });
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = noteInput.trim();
    if (!trimmed) return;
    const newNote: ModuleNote = {
      id: `note-${Date.now()}`,
      timestampLabel: `Lesson ${activeModule.number} · ${activeModule.scaffoldingStage}`,
      text: trimmed,
      createdAt: new Date().toISOString(),
    };
    const nextNotes = [newNote, ...notes];
    setNoteInput('');
    onRecordStudyActivity();
    onUpdateModuleProgress(course.id, activeModule.id, {
      completed: Boolean(savedModule?.completed),
      completedAt: savedModule?.completedAt ?? null,
      codeDraft,
      deliverableValues,
      quizPassed: savedModule?.quizPassed,
      revealedHintCount: revealedHints,
      notes: nextNotes,
      rubricSubmission: savedModule?.rubricSubmission,
    });
  };

  const handleDeleteNote = (noteId: string) => {
    const nextNotes = notes.filter((n) => n.id !== noteId);
    onUpdateModuleProgress(course.id, activeModule.id, {
      completed: Boolean(savedModule?.completed),
      completedAt: savedModule?.completedAt ?? null,
      codeDraft,
      deliverableValues,
      quizPassed: savedModule?.quizPassed,
      revealedHintCount: revealedHints,
      notes: nextNotes,
      rubricSubmission: savedModule?.rubricSubmission,
    });
  };

  const handleSubmitQa = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = qaInput.trim();
    if (!trimmed) return;
    onAddQaPost(activeModule.id, trimmed);
    setQaInput('');
    onRecordStudyActivity();
  };

  // Multi-Runtime Replit-Standard Execution (Python | SQL | Prompt | JS)
  const handleRunSandbox = async () => {
    const tests = activeModule.sandboxTests ?? [];
    if (tests.length === 0) return;

    setIsRunningSandbox(true);
    setSandboxError(null);
    setSqlPreview(null);
    setPromptPreview(null);

    let results: SandboxTestResult[] = [];
    let logs: string[] = [];
    let errMsg: string | null = null;

    if (activeModule.runtime === 'python') {
      const pyOut = await runPythonSandbox(codeDraft, tests);
      results = pyOut.results;
      logs = pyOut.logs;
      errMsg = pyOut.error ?? null;
    } else if (activeModule.runtime === 'sql') {
      const sqlOut = runSqlSandbox(activeModule.sqlTables ?? {}, codeDraft, tests);
      results = sqlOut.results;
      logs = sqlOut.logs;
      errMsg = sqlOut.error ?? null;
      if (!sqlOut.error) {
        setSqlPreview({ columns: sqlOut.columns, rows: sqlOut.rows });
      }
    } else if (activeModule.runtime === 'prompt') {
      const promptOut = runPromptSandbox(
        codeDraft,
        activeModule.promptFixtures ?? [],
        tests
      );
      results = promptOut.results;
      logs = promptOut.logs;
      errMsg = promptOut.error ?? null;
      setPromptPreview({
        renderedPrompts: promptOut.renderedPrompts,
        estimatedTokens: promptOut.estimatedTokens,
      });
    } else {
      const jsOut = runJsSandbox(codeDraft, tests);
      results = jsOut.results;
      logs = jsOut.logs;
    }

    setIsRunningSandbox(false);
    setSandboxLogs(logs);
    setSandboxResults(results);
    setSandboxError(errMsg);

    const allPassed = results.every((r) => r.passed);
    onRecordStudyActivity();

    const quizAlreadyPassed = Boolean(savedModule?.quizPassed);
    const unlocksNext =
      allPassed && (quizAlreadyPassed || activeIndex === course.modules.length - 1);

    onUpdateModuleProgress(
      course.id,
      activeModule.id,
      {
        completed: allPassed || Boolean(savedModule?.completed),
        completedAt: allPassed
          ? new Date().toISOString()
          : savedModule?.completedAt ?? null,
        codeDraft,
        quizPassed: savedModule?.quizPassed,
        revealedHintCount: revealedHints,
        notes,
      },
      unlocksNext ? Math.min(activeIndex + 1, course.modules.length - 1) : activeIndex
    );

    if (allPassed) {
      setSandboxSuccessKey((k) => k + 1);
      const isLastModule = activeIndex === course.modules.length - 1;
      if (unlocksNext) {
        onMilestoneAchieved({
          kind: isLastModule ? 'capstone' : 'lesson',
          milestoneNumber: activeModule.number,
          milestoneTitle: activeModule.title,
          stage: activeModule.scaffoldingStage,
          isCapstone: isLastModule,
          nextIndex: !isLastModule ? activeIndex + 1 : undefined,
          subtitle: isLastModule
            ? 'Final lesson verified! Your mastery work is complete.'
            : 'Code passed all checks and next lesson is unlocked!',
        });
      } else {
        setStudyTab('quiz');
        onMilestoneAchieved({
          kind: 'code',
          milestoneNumber: activeModule.number,
          milestoneTitle: activeModule.title,
          stage: activeModule.scaffoldingStage,
          isCapstone: false,
          subtitle: 'All automated checks passed! Answer the 1-question quiz to unlock the next lesson.',
        });
      }
    }
  };

  // Validate Structured Deliverable Lab
  const handleVerifyDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    const fields = activeModule.deliverableFields ?? [];
    const errors: Record<string, string> = {};

    for (const field of fields) {
      const val = (deliverableValues[field.id] ?? '').trim();
      const rule = field.validationRule;

      if (field.type === 'number') {
        const num = Number(val);
        if (!val || Number.isNaN(num)) {
          errors[field.id] = rule.errorMessage;
        } else if (
          (rule.minNumber !== undefined && num < rule.minNumber) ||
          (rule.maxNumber !== undefined && num > rule.maxNumber)
        ) {
          errors[field.id] = rule.errorMessage;
        }
      } else if (field.type === 'select') {
        if (rule.exactOption && val !== rule.exactOption) {
          errors[field.id] = rule.errorMessage;
        } else if (!val) {
          errors[field.id] = rule.errorMessage;
        }
      } else {
        if (rule.minLength && val.length < rule.minLength) {
          errors[field.id] = rule.errorMessage;
        } else if (
          rule.mustContain &&
          !rule.mustContain.every((kw) => val.toLowerCase().includes(kw.toLowerCase()))
        ) {
          errors[field.id] = rule.errorMessage;
        }
      }
    }

    setDeliverableErrors(errors);
    const passed = Object.keys(errors).length === 0;

    if (passed) {
      const quizAlreadyPassed = Boolean(savedModule?.quizPassed);
      const isLastModule = activeIndex === course.modules.length - 1;
      const unlocksNext = quizAlreadyPassed || isLastModule;
      onRecordStudyActivity();
      setDeliverableNotice(
        unlocksNext
          ? 'All milestone deliverable criteria verified and saved.'
          : 'Deliverable verified! Complete the 1-question Concept Quiz to unlock the next milestone.'
      );
      onUpdateModuleProgress(
        course.id,
        activeModule.id,
        {
          completed: true,
          completedAt: new Date().toISOString(),
          deliverableValues,
          quizPassed: savedModule?.quizPassed,
          revealedHintCount: revealedHints,
          notes,
        },
        unlocksNext ? Math.min(activeIndex + 1, course.modules.length - 1) : activeIndex
      );
      if (unlocksNext) {
        onMilestoneAchieved({
          kind: isLastModule ? 'capstone' : 'lesson',
          milestoneNumber: activeModule.number,
          milestoneTitle: activeModule.title,
          stage: activeModule.scaffoldingStage,
          isCapstone: isLastModule,
          nextIndex: !isLastModule ? activeIndex + 1 : undefined,
          subtitle: 'Structured lab verified and milestone unlocked!',
        });
      } else {
        setStudyTab('quiz');
        onMilestoneAchieved({
          kind: 'code',
          milestoneNumber: activeModule.number,
          milestoneTitle: activeModule.title,
          stage: activeModule.scaffoldingStage,
          isCapstone: false,
          subtitle: 'Lab deliverable passed! Answer the concept check to unlock the next lesson.',
        });
      }
    } else {
      setDeliverableNotice(null);
    }
  };

  // Evaluate Final Capstone Rubric
  const handleEvaluateRubric = (e: React.FormEvent) => {
    e.preventDefault();
    const criteria = activeModule.rubricCriteria ?? [];
    const combinedText = `${capstoneTitle} ${capstoneSummary}`.toLowerCase();
    const wordCount = capstoneSummary.trim().split(/\s+/).filter(Boolean).length;

    const breakdown = criteria.map((crit) => {
      let passed = true;
      if (crit.minWordCount && wordCount < crit.minWordCount) {
        passed = false;
      }
      if (crit.requiredKeywordHints && crit.requiredKeywordHints.length > 0) {
        const hitCount = crit.requiredKeywordHints.filter((kw) =>
          combinedText.includes(kw.toLowerCase())
        ).length;
        if (hitCount < 1) {
          passed = false;
        }
      }
      return {
        criterion: crit.criterion,
        earned: passed ? crit.weight : Math.round(crit.weight * 0.4),
        max: crit.weight,
        passed,
      };
    });

    const totalScore = breakdown.reduce((sum, b) => sum + b.earned, 0);
    const passed = totalScore >= 80 && wordCount >= 15;

    setRubricFeedback({
      score: totalScore,
      passed,
      breakdown,
    });
    onRecordStudyActivity();

    onUpdateModuleProgress(
      course.id,
      activeModule.id,
      {
        completed: passed || Boolean(savedModule?.completed),
        completedAt: passed
          ? new Date().toISOString()
          : savedModule?.completedAt ?? null,
        quizPassed: savedModule?.quizPassed,
        revealedHintCount: revealedHints,
        notes,
        rubricSubmission: {
          capstoneTitle: capstoneTitle.trim() || course.capstoneTitle,
          capstoneSummary: capstoneSummary.trim(),
          artifactUrl: artifactUrl.trim(),
          score: totalScore,
          breakdown,
        },
      },
      activeIndex
    );

    if (passed) {
      const code =
        certificate?.verificationCode ??
        `APEX-2026-${course.id.slice(0, 4).toUpperCase()}-${Math.floor(
          1000 + Math.random() * 9000
        )}`;

      onIssueCertificate({
        courseId: course.id,
        courseTitle: course.title,
        track: course.track,
        verificationCode: code,
        learnerName,
        capstoneTitle: capstoneTitle.trim() || course.capstoneTitle,
        capstoneSummary: capstoneSummary.trim(),
        artifactUrl: artifactUrl.trim(),
        rubricScore: totalScore,
        rubricBreakdown: breakdown,
        skillsVerified: COURSE_SKILLS_VERIFIED[course.id] ?? course.outcomes,
        instructorName: course.instructor.name,
        instructorRole: course.instructor.role,
        instructorOrg: course.instructor.organization,
        issuedAt: new Date().toISOString(),
      });

      onMilestoneAchieved({
        kind: 'capstone',
        milestoneNumber: activeModule.number,
        milestoneTitle: capstoneTitle.trim() || activeModule.title,
        stage: activeModule.scaffoldingStage,
        isCapstone: true,
        rubricScore: totalScore,
        subtitle: 'Graduated! Your verified certificate and skill matrix are ready.',
      });
    }
  };

  // Keep latest handlers in refs for global developer keyboard shortcuts
  const runSandboxRef = useRef(handleRunSandbox);
  const prevNavRef = useRef(onPrevious);
  const nextNavRef = useRef(onNext);

  useEffect(() => {
    runSandboxRef.current = handleRunSandbox;
    prevNavRef.current = onPrevious;
    nextNavRef.current = onNext;
  });

  useEffect(() => {
    if (!lockedNavHint) return;
    const timer = window.setTimeout(() => setLockedNavHint(null), 2600);
    return () => window.clearTimeout(timer);
  }, [lockedNavHint]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;

      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName ?? '';
      const isEditable =
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT' ||
        Boolean(target?.isContentEditable);

      // Ctrl+Enter / Cmd+Enter runs code in sandbox mode from anywhere in workspace
      if (
        e.key === 'Enter' &&
        (e.ctrlKey || e.metaKey) &&
        activeModule.mode === 'sandbox' &&
        workspaceView === 'work' &&
        !isRunningSandbox
      ) {
        e.preventDefault();
        void runSandboxRef.current();
        return;
      }

      // ArrowLeft / ArrowRight navigates lessons when focus is not inside a text input/editor
      if (isEditable || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        if (activeIndex > 0) {
          e.preventDefault();
          prevNavRef.current();
        }
      } else if (e.key === 'ArrowRight') {
        if (activeIndex < course.modules.length - 1) {
          e.preventDefault();
          if (nextUnlocked) {
            nextNavRef.current();
          } else {
            setLockedNavHint(
              'Complete this lesson challenge & concept quiz to unlock the next lesson.'
            );
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [
    activeIndex,
    activeModule.mode,
    course.modules.length,
    isRunningSandbox,
    nextUnlocked,
    workspaceView,
  ]);

  return (
    <main className="lg:col-span-9 grid xl:grid-cols-12">
      {/* Left: Illustrated Lesson Handbook & Study Companion */}
      <section className="xl:col-span-6 bg-white text-[#00205B] p-6 sm:p-7 border-b xl:border-b-0 xl:border-r border-slate-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-[#003087]">
              {activeModule.mode === 'sandbox' && activeModule.runtime === 'sql' ? (
                <Database className="w-4 h-4" />
              ) : activeModule.mode === 'sandbox' ? (
                <Code2 className="w-4 h-4" />
              ) : activeModule.mode === 'deliverable' ? (
                <ShieldAlert className="w-4 h-4" />
              ) : (
                <ClipboardCheck className="w-4 h-4" />
              )}
              <span>
                Lesson {activeModule.number} · {activeModule.scaffoldingStage}
              </span>
            </div>
            <span className="text-xs font-medium text-[#00205B]/60 tabular-nums">
              {activeModule.durationMinutes} min
            </span>
          </div>

          <h2 className="mt-4 text-xl sm:text-2xl font-extrabold tracking-tight text-[#00205B]">
            {activeModule.title}
          </h2>

          {/* Study Companion Navigation Tabs */}
          <div className="mt-4 flex flex-wrap gap-1 p-1 rounded-xl bg-slate-100">
            <button
              type="button"
              onClick={() => setStudyTab('handbook')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                studyTab === 'handbook'
                  ? 'bg-white text-[#00205B] shadow-sm'
                  : 'text-[#00205B]/65 hover:text-[#00205B]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Handbook</span>
            </button>
            <button
              type="button"
              onClick={() => setStudyTab('quiz')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                studyTab === 'quiz'
                  ? 'bg-white text-[#00205B] shadow-sm'
                  : 'text-[#00205B]/65 hover:text-[#00205B]'
              }`}
            >
              {savedModule?.quizPassed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F2A900]" />
              ) : (
                <HelpCircle className="w-3.5 h-3.5" />
              )}
              <span>Quiz</span>
            </button>
            <button
              type="button"
              onClick={() => setStudyTab('notes')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                studyTab === 'notes'
                  ? 'bg-white text-[#00205B] shadow-sm'
                  : 'text-[#00205B]/65 hover:text-[#00205B]'
              }`}
            >
              <StickyNote className="w-3.5 h-3.5" />
              <span>Notes ({notes.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setStudyTab('qa')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                studyTab === 'qa'
                  ? 'bg-white text-[#00205B] shadow-sm'
                  : 'text-[#00205B]/65 hover:text-[#00205B]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Q&amp;A ({combinedQa.length})</span>
            </button>
          </div>

          {/* TAB 1: ILLUSTRATED HANDBOOK + VISUAL CONCEPT MAP + LIVE EXAMPLE + MISTAKE + TRY IT */}
          {studyTab === 'handbook' && (
            <div className="mt-5 space-y-5">
              {handbook ? (
                <>
                  {/* Puzzle Piece Strip */}
                  <div className="rounded-2xl bg-[#00205B]/[0.04] border border-[#00205B]/15 p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#003087]">
                      <Puzzle className="w-4 h-4 text-[#F2A900] shrink-0" />
                      <span>{handbook.puzzlePiece}</span>
                    </div>
                    <p className="text-sm text-[#00205B]/85 leading-relaxed">
                      {renderInlineFormattedText(activeModule.lessonSummary, 'light')}
                    </p>
                  </div>

                  {/* Bespoke Visual Concept Map */}
                  <LessonDiagram spec={handbook.diagram} />

                  {/* Theory Section Group */}
                  <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between gap-2 px-1">
                      <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-[#003087]">
                        <BookOpen className="w-3.5 h-3.5 text-[#307FE2]" />
                        <span>Theory &amp; Core Concepts</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[#00205B]/55 tabular-nums">
                        {handbook.sections.length} Reading Cards
                      </span>
                    </div>

                    {handbook.sections.map((section, idx) => (
                      <TheoryCard
                        key={section.heading}
                        badgeLabel={`Theory · Concept ${idx + 1} of ${handbook.sections.length}`}
                        heading={section.heading}
                        explanation={section.explanation}
                        analogy={section.analogy}
                        codeSnippet={section.codeSnippet}
                      />
                    ))}
                  </div>

                  {/* Live Runnable Example */}
                  <div className="rounded-2xl bg-[#00153D] text-white p-5 space-y-3 border border-[#00205B]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#F2A900]">
                          Walkthrough Example
                        </p>
                        <h3 className="text-sm font-extrabold text-white mt-0.5">
                          {handbook.liveExample.title}
                        </h3>
                      </div>

                      {activeModule.mode === 'sandbox' && (
                        <button
                          type="button"
                          onClick={handleLoadExampleIntoWorkspace}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {loadedExampleBanner ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Loaded into Editor</span>
                            </>
                          ) : (
                            <>
                              <PlayCircle className="w-3.5 h-3.5" />
                              <span>Load into Workspace</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-white/80 leading-relaxed">
                      {renderInlineFormattedText(handbook.liveExample.description, 'dark')}
                    </p>

                    <pre className="rounded-xl bg-[#000B24] border border-white/10 p-3.5 font-mono text-xs text-[#FFE264] overflow-x-auto leading-relaxed">
                      {handbook.liveExample.code}
                    </pre>

                    <div className="rounded-xl bg-[#00205B] border border-white/10 p-3 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                        Expected Output
                      </p>
                      <pre className="font-mono text-xs text-white/90 whitespace-pre-wrap">
                        {handbook.liveExample.expectedOutput}
                      </pre>
                    </div>
                  </div>

                  {/* Wrong vs Right Beginner Mistake Comparison */}
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00205B]">
                      <AlertTriangle className="w-4 h-4 text-[#F2A900] shrink-0" />
                      <span>Common Beginner Mistake: {handbook.commonMistake.title}</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="rounded-xl bg-red-50 border border-red-200 p-3 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">
                          Wrong Way
                        </p>
                        <pre className="font-mono text-xs text-red-950 whitespace-pre-wrap leading-relaxed">
                          {handbook.commonMistake.wrongWay}
                        </pre>
                      </div>

                      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          Right Way
                        </p>
                        <pre className="font-mono text-xs text-emerald-950 whitespace-pre-wrap leading-relaxed">
                          {handbook.commonMistake.rightWay}
                        </pre>
                      </div>
                    </div>

                    <p className="text-xs text-[#00205B]/85 leading-relaxed">
                      {renderInlineFormattedText(handbook.commonMistake.whyItHappens, 'light')}
                    </p>
                  </div>

                  {/* Active Practice Prompt in Handbook */}
                  <ActivePracticeCard
                    iconVariant="tryit"
                    taskLabel="Your Turn — Apply in Workspace"
                    instructions={handbook.tryItMission}
                    onFocusEditor={
                      activeModule.mode === 'sandbox' ? handleFocusEditor : undefined
                    }
                    focusEditorLabel={
                      activeModule.mode === 'sandbox' ? 'Jump to Code Editor' : undefined
                    }
                  />
                </>
              ) : (
                <div className="rounded-2xl bg-[#00205B] text-white p-5 space-y-3">
                  <h3 className="text-base font-extrabold text-white">
                    {activeModule.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {activeModule.lessonSummary}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleDownloadCheatSheet}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#00205B]/20 hover:border-[#00205B] text-xs font-bold text-[#00205B] transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#003087]" />
                <span>Download Lesson Cheat Sheet (.md)</span>
              </button>
            </div>
          )}

          {/* TAB 2: QUICK KNOWLEDGE CHECK */}
          {studyTab === 'quiz' && (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-[#00205B]/[0.04] border border-[#00205B]/10 p-4 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#003087]">
                  Quick Concept Check
                </p>
                {savedModule?.completed &&
                  !savedModule?.quizPassed &&
                  activeIndex < course.modules.length - 1 && (
                    <p className="text-xs font-semibold text-[#003087] bg-[#FFE264]/35 border border-[#F2A900]/40 rounded-lg px-3 py-2">
                      Lesson work verified! Answer this quick check to unlock the next lesson.
                    </p>
                  )}
                <p className="text-sm font-bold text-[#00205B] leading-snug">
                  {studyPack.knowledgeCheck.question}
                </p>

                <div className="space-y-2">
                  {studyPack.knowledgeCheck.options.map((opt, idx) => {
                    const selected = selectedQuizOption === idx;
                    const isCorrect = idx === studyPack.knowledgeCheck.correctIndex;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSelectedQuizOption(idx);
                          setQuizSubmitted(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                          quizSubmitted && isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : quizSubmitted && selected && !isCorrect
                              ? 'bg-red-50 border-red-400 text-red-950'
                              : selected
                                ? 'bg-[#00205B] border-[#00205B] text-white'
                                : 'bg-white border-slate-200 text-[#00205B] hover:border-[#003087]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={selectedQuizOption === null}
                  onClick={handleCheckQuiz}
                  className="px-5 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Check Answer
                </button>

                {quizSubmitted && (
                  selectedQuizOption === studyPack.knowledgeCheck.correctIndex ? (
                    <motion.div
                      key={`quiz-pass-${quizCelebrateKey}`}
                      initial={{ opacity: 0, scale: 0.94, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                      className="mt-2 rounded-xl bg-emerald-50 border border-emerald-400 p-3.5 text-xs text-emerald-950 space-y-1.5"
                    >
                      <div className="flex items-center gap-2 font-extrabold text-emerald-800">
                        <motion.span
                          initial={{ rotate: -20, scale: 0.5 }}
                          animate={{ rotate: [0, 12, -8, 0], scale: [0.7, 1.18, 1] }}
                          transition={{ duration: 0.45 }}
                          className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#F2A900] text-[#00205B]"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </motion.span>
                        <span>Quiz Passed — Great Understanding!</span>
                      </div>
                      <p className="leading-relaxed">
                        {studyPack.knowledgeCheck.explanation}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`quiz-miss-${selectedQuizOption}`}
                      animate={{ x: [-5, 5, -3, 3, 0] }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 rounded-xl bg-red-50 border border-red-300 p-3 text-xs text-red-950 leading-relaxed"
                    >
                      <strong>Review:</strong> {studyPack.knowledgeCheck.explanation}
                    </motion.div>
                  )
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TIMESTAMPED LESSON NOTES */}
          {studyTab === 'notes' && (
            <div className="mt-5 space-y-4">
              <form onSubmit={handleAddNote} className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#003087]">
                  <span>Lesson {activeModule.number} Notes</span>
                  <span>Saved automatically</span>
                </div>
                <textarea
                  rows={3}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Write down a takeaway, command syntax, or reminder..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs text-[#00205B] focus:outline-none focus:border-[#003087]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#00205B] text-white text-xs font-bold cursor-pointer"
                >
                  Save Lesson Note
                </button>
              </form>

              {notes.length === 0 ? (
                <p className="text-xs text-[#00205B]/60 pt-2">
                  No notes yet for Lesson {activeModule.number}.
                </p>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {notes.map((n) => (
                    <div
                      key={n.id}
                      className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono font-bold text-[#003087]">
                          {n.timestampLabel}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(n.id)}
                          className="text-slate-400 hover:text-red-600 cursor-pointer"
                          aria-label="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[#00205B]/85 leading-relaxed">{n.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: LESSON Q&A FORUM */}
          {studyTab === 'qa' && (
            <div className="mt-5 space-y-4">
              <form onSubmit={handleSubmitQa} className="flex gap-2">
                <input
                  type="text"
                  value={qaInput}
                  onChange={(e) => setQaInput(e.target.value)}
                  placeholder="Ask a question about this lesson..."
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs text-[#00205B] focus:outline-none focus:border-[#003087]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00205B] text-white text-xs font-bold shrink-0 cursor-pointer"
                >
                  Post
                </button>
              </form>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {combinedQa.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#00205B]/65">
                      <span className="font-bold text-[#00205B]">
                        {q.author} · {q.role}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpvoteQaPost(activeModule.id, q)}
                        className="inline-flex items-center gap-1 font-bold text-[#003087] hover:text-[#00205B] cursor-pointer tabular-nums"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{q.upvotes}</span>
                      </button>
                    </div>
                    <p className="font-semibold text-[#00205B]">{q.question}</p>
                    {q.reply && (
                      <p className="text-[#00205B]/80 leading-relaxed pt-1 border-t border-slate-200">
                        {q.reply}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Lesson Navigation */}
        <div className="mt-8 pt-4 border-t border-slate-200 space-y-2.5">
          {lockedNavHint && (
            <p className="text-xs font-semibold text-[#003087] bg-[#FFE264]/35 border border-[#F2A900]/40 rounded-lg px-3 py-1.5">
              {lockedNavHint}
            </p>
          )}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={onPrevious}
              title="Previous Lesson (Left Arrow)"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-[#003087] text-xs font-bold text-[#00205B] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
            >
              <kbd className="hidden sm:inline-block rounded bg-slate-100 border border-slate-300 px-1.5 py-0.5 font-mono text-[10px] text-[#00205B]">
                ←
              </kbd>
              <span>Previous</span>
            </button>

            {activeIndex < course.modules.length - 1 &&
              (savedModule?.completed && !savedModule?.quizPassed ? (
                <button
                  type="button"
                  onClick={() => setStudyTab('quiz')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F2A900] text-[#00205B] text-xs font-bold cursor-pointer whitespace-nowrap"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Pass Concept Quiz to Unlock</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!nextUnlocked}
                  onClick={onNext}
                  title="Next Lesson (Right Arrow)"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00205B] text-white text-xs font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                  <kbd className="hidden sm:inline-block rounded bg-white/15 px-1.5 py-0.5 font-mono text-[10px] text-[#FFE264]">
                    →
                  </kbd>
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Right: Replit-Style Multi-Runtime Workspace Column */}
      <section className="xl:col-span-6 bg-[#00153D] p-6 sm:p-7 flex flex-col justify-between space-y-5">
        {/* Top Toolbar: Progressive Hints + Developer Shortcuts + Reference Solution Switch */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={revealedHints >= studyPack.hints.length}
              onClick={handleRevealHint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00205B] border border-white/15 hover:border-[#F2A900] text-xs font-bold text-[#FFE264] disabled:opacity-45 cursor-pointer whitespace-nowrap"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>
                {revealedHints >= studyPack.hints.length
                  ? `All Hints Revealed (${studyPack.hints.length}/${studyPack.hints.length})`
                  : `Reveal Hint (${revealedHints}/${studyPack.hints.length})`}
              </span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-[11px] text-white/70">
              <Keyboard className="w-3.5 h-3.5 text-[#307FE2] shrink-0" />
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded bg-[#00205B] border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-[#FFE264]">
                  Shift/⌘+Enter
                </kbd>
                <span>Run</span>
              </span>
              <span aria-hidden="true" className="text-white/30">
                ·
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded bg-[#00205B] border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-[#FFE264]">
                  ←/→
                </kbd>
                <span>Lesson</span>
              </span>
            </div>
          </div>

          {savedModule?.completed && (
            <div className="inline-flex p-1 rounded-lg bg-[#00205B] border border-white/15">
              <button
                type="button"
                onClick={() => setWorkspaceView('work')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  workspaceView === 'work'
                    ? 'bg-[#F2A900] text-[#00205B]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                Your Work
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceView('solution')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  workspaceView === 'solution'
                    ? 'bg-[#F2A900] text-[#00205B]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                Reference Solution
              </button>
            </div>
          )}
        </div>

        {/* Revealed Progressive Hints Drawer */}
        {revealedHints > 0 && (
          <div className="rounded-xl bg-[#00205B] border border-[#F2A900]/40 p-4 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFE264]">
              Progressive Hints
            </p>
            {studyPack.hints.slice(0, revealedHints).map((hint, idx) => (
              <p key={hint} className="text-xs text-white/90 leading-relaxed">
                <strong className="text-[#F2A900]">Hint {idx + 1}:</strong>{' '}
                {renderInlineFormattedText(hint, 'dark')}
              </p>
            ))}
          </div>
        )}

        {/* Unlocked Staff Reference Solution Walkthrough */}
        {workspaceView === 'solution' && savedModule?.completed ? (
          <div className="flex-1 flex flex-col space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F2A900]">
                Verified Reference Solution
              </p>
              <h3 className="text-base font-bold text-white mt-0.5">
                Staff Exemplar — {activeModule.title}
              </h3>
              <p className="mt-1 text-xs text-white/75 leading-relaxed">
                Compare your verified implementation against the staff reference pattern below.
              </p>
            </div>

            <pre className="flex-1 rounded-xl bg-[#000B24] border border-white/15 p-4 font-mono text-xs sm:text-sm text-[#FFE264] overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {studyPack.referenceSolution}
            </pre>
          </div>
        ) : (
          <>
            {/* MODE 1: MULTI-RUNTIME REPLIT SANDBOX (Python | SQL | Prompt | JS) */}
            {activeModule.mode === 'sandbox' && (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#F2A900]">
                      {getRuntimeLabel(activeModule)}
                    </p>
                    <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                      {activeModule.deliverableTitle}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const starter = activeModule.starterCode ?? '';
                      setCodeDraft(starter);
                      setSandboxResults(null);
                      setSandboxLogs([]);
                      setSandboxError(null);
                      setSqlPreview(null);
                      setPromptPreview(null);
                      if (savedModule) {
                        onUpdateModuleProgress(course.id, activeModule.id, {
                          ...savedModule,
                          codeDraft: starter,
                        });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Starter</span>
                  </button>
                </div>

                {/* Active Practice Brief Card */}
                <ActivePracticeCard
                  iconVariant="code"
                  taskLabel="Your Coding Task"
                  instructions={activeModule.deliverablePrompt}
                  acceptanceCriteria={activeModule.acceptanceCriteria}
                  sandboxResults={sandboxResults}
                  totalChecks={activeModule.sandboxTests?.length}
                  allPassed={editorAllPassed}
                  shortcutHint="Shift+Enter / Ctrl+Enter to Run"
                />

                {/* Replit Multi-File Explorer Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {inspectableFiles.map((file) => {
                    const isSelected = selectedFileTab === file.filename;
                    return (
                      <button
                        key={file.filename}
                        type="button"
                        onClick={() => setSelectedFileTab(file.filename)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#000B24] border border-[#F2A900] text-[#FFE264]'
                            : 'bg-[#00205B] border border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        <FileCode2 className="w-3.5 h-3.5" />
                        <span>{file.filename}</span>
                        {file.readOnly && (
                          <span className="text-[10px] text-white/45">(read-only)</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Editor OR Read-Only Fixture Viewer */}
                <div className="flex-1 flex flex-col space-y-2.5">
                  {activeInspectFile?.readOnly ? (
                    <pre className="w-full flex-1 min-h-[220px] rounded-xl bg-[#000B24] border border-white/15 p-4 font-mono text-xs text-white/85 overflow-auto whitespace-pre-wrap leading-relaxed">
                      {activeInspectFile.content}
                    </pre>
                  ) : (
                    <motion.div
                      key={`editor-frame-${sandboxSuccessKey}`}
                      animate={
                        sandboxSuccessKey > 0 && editorAllPassed
                          ? {
                              boxShadow: [
                                '0 0 0 0 rgba(242, 169, 0, 0.7)',
                                '0 0 0 8px rgba(242, 169, 0, 0)',
                              ],
                            }
                          : { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' }
                      }
                      transition={{ duration: 0.65 }}
                      className="flex-1 flex flex-col rounded-xl"
                    >
                      <label htmlFor="sandbox-editor" className="sr-only">
                        Milestone Code Editor
                      </label>
                      <textarea
                        ref={editorRef}
                        id="sandbox-editor"
                        value={codeDraft}
                        onChange={(e) => setCodeDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || e.shiftKey)) {
                            e.preventDefault();
                            if (!isRunningSandbox) {
                              void handleRunSandbox();
                            }
                            return;
                          }
                          if (e.key === 'Tab') {
                            e.preventDefault();
                            const target = e.currentTarget;
                            const start = target.selectionStart;
                            const end = target.selectionEnd;
                            const nextValue = `${codeDraft.slice(0, start)}  ${codeDraft.slice(end)}`;
                            setCodeDraft(nextValue);
                            window.requestAnimationFrame(() => {
                              target.selectionStart = start + 2;
                              target.selectionEnd = start + 2;
                            });
                          }
                        }}
                        spellCheck={false}
                        rows={11}
                        className={`w-full flex-1 min-h-[220px] rounded-xl bg-[#000B24] border p-4 font-mono text-xs sm:text-sm text-[#FFE264] leading-relaxed focus:outline-none transition-colors ${
                          editorAllPassed
                            ? 'border-[#F2A900] focus:border-[#FFE264]'
                            : 'border-white/15 focus:border-[#F2A900]'
                        }`}
                      />
                    </motion.div>
                  )}

                  {editorAllPassed && (
                    <motion.div
                      key={`editor-success-${sandboxSuccessKey}`}
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      className="rounded-xl bg-[#003087] border border-[#F2A900] px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-white"
                    >
                      <div className="flex items-center gap-2.5 font-bold">
                        <motion.span
                          initial={{ rotate: -20, scale: 0.5 }}
                          animate={{ rotate: [0, 14, -8, 0], scale: [0.7, 1.2, 1] }}
                          transition={{ duration: 0.45 }}
                          className="w-6 h-6 rounded-lg bg-[#F2A900] text-[#00205B] flex items-center justify-center shrink-0"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </motion.span>
                        <span>
                          Spot On! Your solution passed all {sandboxResults?.length ?? 0} checks.
                        </span>
                      </div>
                      {!savedModule?.quizPassed && activeIndex < course.modules.length - 1 && (
                        <button
                          type="button"
                          onClick={() => setStudyTab('quiz')}
                          className="px-3 py-1 rounded-full bg-[#F2A900] text-[#00205B] font-extrabold text-[11px] whitespace-nowrap cursor-pointer"
                        >
                          Take Quiz →
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-white/65">
                    {savedModule?.completed
                      ? 'Milestone verified — Reference Solution unlocked above'
                      : activeModule.runtime === 'sql'
                        ? 'Run query to inspect relational result grid and pass assertions'
                        : activeModule.runtime === 'prompt'
                          ? 'Compile prompt fixtures to verify structure & safety rules'
                          : activeModule.runtime === 'python'
                            ? 'Use print() to inspect values; press Shift+Enter or Ctrl+Enter to run'
                            : 'Use console.log() to inspect values; press Shift+Enter or Ctrl+Enter to run'}
                  </span>

                  <button
                    type="button"
                    disabled={isRunningSandbox}
                    onClick={() => void handleRunSandbox()}
                    title="Run & Verify Milestone (Shift+Enter or Ctrl/Cmd+Enter)"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold transition-colors disabled:opacity-60 cursor-pointer whitespace-nowrap"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {isRunningSandbox ? 'Running Runtime...' : 'Run & Verify Milestone'}
                    </span>
                    <kbd className="hidden sm:inline-block rounded bg-[#00205B]/15 px-1.5 py-0.5 font-mono text-[10px] font-extrabold text-[#00205B]">
                      ⇧↵
                    </kbd>
                  </button>
                </div>

                {/* SQL Live Relational Result Grid */}
                {sqlPreview && (
                  <div className="rounded-xl bg-[#000B24] border border-white/15 p-3.5 space-y-2 overflow-x-auto">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#FFE264]">
                      <span>Query Result Grid</span>
                      <span className="tabular-nums text-white/65">
                        {sqlPreview.rows.length} rows
                      </span>
                    </div>
                    {sqlPreview.rows.length === 0 ? (
                      <p className="text-xs text-white/60 font-mono">
                        (0 rows returned)
                      </p>
                    ) : (
                      <table className="w-full text-left border-collapse font-mono text-xs">
                        <thead>
                          <tr className="border-b border-white/15 text-[#FFE264]">
                            {sqlPreview.columns.map((col) => (
                              <th key={col} className="py-1.5 pr-4 font-bold">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-white/85">
                          {sqlPreview.rows.slice(0, 10).map((row, rIdx) => (
                            <tr key={rIdx}>
                              {sqlPreview.columns.map((col) => (
                                <td key={col} className="py-1.5 pr-4 tabular-nums">
                                  {row[col] === null || row[col] === undefined
                                    ? 'NULL'
                                    : String(row[col])}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Prompt Execution Preview */}
                {promptPreview && (
                  <div className="rounded-xl bg-[#000B24] border border-white/15 p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#FFE264]">
                      <span>Prompt Fixture Evaluation Preview</span>
                      <span className="tabular-nums font-mono text-white/70">
                        ~{promptPreview.estimatedTokens} tokens
                      </span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {promptPreview.renderedPrompts.map((rp) => (
                        <div
                          key={rp.label}
                          className="rounded-lg bg-[#00205B]/70 border border-white/10 p-2.5 text-xs space-y-1"
                        >
                          <p className="font-bold text-[#FFE264]">{rp.label}</p>
                          <pre className="font-mono text-[11px] text-white/85 whitespace-pre-wrap">
                            {rp.simulatedOutput}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live Console / Stdout Output */}
                {sandboxLogs.length > 0 && (
                  <div className="rounded-xl bg-[#000B24] border border-white/15 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#FFE264]">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Live Console Output</span>
                    </div>
                    <div className="font-mono text-xs text-white/85 space-y-1 max-h-28 overflow-y-auto">
                      {sandboxLogs.map((line, i) => (
                        <div key={`${i}-${line}`} className="truncate">
                          &gt; {line}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {sandboxError && (
                  <div className="rounded-xl bg-red-950/60 border border-red-400/40 p-4 text-xs text-red-100">
                    {sandboxError}
                  </div>
                )}

                {sandboxResults && (
                  <motion.div
                    key={`results-${sandboxSuccessKey}-${sandboxResults.filter((r) => r.passed).length}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`rounded-xl bg-[#00205B] border p-4 space-y-2.5 ${
                      editorAllPassed ? 'border-[#F2A900]' : 'border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Automated Unit Test Results</span>
                      <span className="tabular-nums text-[#FFE264]">
                        {sandboxResults.filter((r) => r.passed).length}/
                        {sandboxResults.length} Passed
                      </span>
                    </div>

                    {sandboxResults.map((res, idx) => (
                      <motion.div
                        key={res.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06, duration: 0.2 }}
                        className="flex items-start gap-2.5 text-xs pt-2 border-t border-white/10"
                      >
                        {res.passed ? (
                          <motion.span
                            initial={{ scale: 0.4, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 460, damping: 18, delay: idx * 0.06 }}
                            className="mt-0.5 shrink-0"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#F2A900]" />
                          </motion.span>
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <p className="font-semibold text-white">
                            {res.passed ? 'PASS' : 'FAIL'} — {res.label}
                          </p>
                          <p className="text-white/65 mt-0.5">
                            Expected: {res.expectedDescription}
                            {res.error ? ` (Error: ${res.error})` : ''}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* MODE 2: DELIVERABLE WORKSHEET */}
            {activeModule.mode === 'deliverable' && (
              <form
                onSubmit={handleVerifyDeliverable}
                className="space-y-5 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#F2A900]">
                        Structured Practice Deliverable Lab
                      </p>
                      <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                        {activeModule.deliverableTitle}
                      </h3>
                    </div>

                    <ActivePracticeCard
                      iconVariant="lab"
                      taskLabel="Your Lab Task"
                      instructions={activeModule.deliverablePrompt}
                      acceptanceCriteria={activeModule.acceptanceCriteria}
                    />
                  </div>

                  {(activeModule.deliverableFields ?? []).map((field) => {
                    const value = deliverableValues[field.id] ?? '';
                    const error = deliverableErrors[field.id];
                    const liveValid = isDeliverableFieldValid(field, value);

                    return (
                      <div key={field.id} className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <label
                            htmlFor={`field-${field.id}`}
                            className="block text-xs font-bold text-white"
                          >
                            {field.label}
                          </label>
                          {liveValid && (
                            <motion.span
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 460, damping: 20 }}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FFE264]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#F2A900]" />
                              <span>Looks good</span>
                            </motion.span>
                          )}
                        </div>

                        {field.type === 'textarea' ? (
                          <textarea
                            id={`field-${field.id}`}
                            rows={3}
                            value={value}
                            onChange={(e) =>
                              setDeliverableValues((prev) => ({
                                ...prev,
                                [field.id]: e.target.value,
                              }))
                            }
                            placeholder={field.placeholder}
                            className={`w-full rounded-xl bg-[#00205B] border px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none transition-colors ${
                              liveValid
                                ? 'border-[#F2A900]/75 focus:border-[#FFE264]'
                                : 'border-white/15 focus:border-[#F2A900]'
                            }`}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            id={`field-${field.id}`}
                            value={value}
                            onChange={(e) =>
                              setDeliverableValues((prev) => ({
                                ...prev,
                                [field.id]: e.target.value,
                              }))
                            }
                            className={`w-full rounded-xl bg-[#00205B] border px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors ${
                              liveValid
                                ? 'border-[#F2A900]/75 focus:border-[#FFE264]'
                                : 'border-white/15 focus:border-[#F2A900]'
                            }`}
                          >
                            <option value="">{field.placeholder}</option>
                            {(field.options ?? []).map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={`field-${field.id}`}
                            type={field.type}
                            step="any"
                            value={value}
                            onChange={(e) =>
                              setDeliverableValues((prev) => ({
                                ...prev,
                                [field.id]: e.target.value,
                              }))
                            }
                            placeholder={field.placeholder}
                            className={`w-full rounded-xl bg-[#00205B] border px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none transition-colors ${
                              liveValid
                                ? 'border-[#F2A900]/75 focus:border-[#FFE264]'
                                : 'border-white/15 focus:border-[#F2A900]'
                            }`}
                          />
                        )}

                        <p className="text-[11px] text-white/60">{field.helperText}</p>
                        {error && (
                          <p className="flex items-center gap-1.5 text-xs text-red-300 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{error}</span>
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {deliverableNotice && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                      className="rounded-xl bg-[#003087] border border-[#F2A900] p-4 flex items-center gap-2.5 text-xs font-semibold text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#F2A900] shrink-0" />
                      <span>{deliverableNotice}</span>
                    </motion.div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <span className="text-xs text-white/65">
                    {savedModule?.completed
                      ? 'Deliverable verified — Reference Solution unlocked above'
                      : 'Meets all policy thresholds to unlock next milestone'}
                  </span>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Verify Deliverable
                  </button>
                </div>
              </form>
            )}

            {/* MODE 3: GUIDED CAPSTONE PORTFOLIO & MENTOR RUBRIC */}
            {activeModule.mode === 'rubric' && (
              <form
                onSubmit={handleEvaluateRubric}
                className="space-y-5 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#F2A900]">
                        Final Capstone Portfolio &amp; Mentor Rubric
                      </p>
                      <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                        {activeModule.deliverableTitle}
                      </h3>
                    </div>

                    <ActivePracticeCard
                      iconVariant="capstone"
                      taskLabel="Your Capstone Mission"
                      instructions={activeModule.deliverablePrompt}
                      acceptanceCriteria={activeModule.acceptanceCriteria}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="capstone-title" className="block text-xs font-bold text-white">
                      Capstone Project Title
                    </label>
                    <input
                      id="capstone-title"
                      type="text"
                      required
                      value={capstoneTitle}
                      onChange={(e) => setCapstoneTitle(e.target.value)}
                      className="w-full rounded-xl bg-[#00205B] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F2A900]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor="capstone-summary" className="block text-xs font-bold text-white">
                        Architecture &amp; Implementation Brief (min 20 words covering key concepts)
                      </label>
                      {(() => {
                        const words = capstoneSummary.trim().split(/\s+/).filter(Boolean).length;
                        const meetsWords = words >= 20;
                        return (
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold tabular-nums ${
                              meetsWords ? 'text-[#FFE264]' : 'text-white/55'
                            }`}
                          >
                            {meetsWords && (
                              <motion.span
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#F2A900]" />
                              </motion.span>
                            )}
                            <span>{words}/20+ words</span>
                          </span>
                        );
                      })()}
                    </div>
                    <textarea
                      id="capstone-summary"
                      rows={5}
                      required
                      value={capstoneSummary}
                      onChange={(e) => setCapstoneSummary(e.target.value)}
                      placeholder="Summarize how your prior milestones work together, key edge-case guards, and measurable outcomes..."
                      className={`w-full rounded-xl bg-[#00205B] border px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none transition-colors ${
                        capstoneSummary.trim().split(/\s+/).filter(Boolean).length >= 20
                          ? 'border-[#F2A900]/75 focus:border-[#FFE264]'
                          : 'border-white/15 focus:border-[#F2A900]'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="capstone-url" className="block text-xs font-bold text-white">
                      Repository or Live Case Study URL (Optional)
                    </label>
                    <input
                      id="capstone-url"
                      type="url"
                      value={artifactUrl}
                      onChange={(e) => setArtifactUrl(e.target.value)}
                      placeholder="https://github.com/your-handle/capstone-project"
                      className="w-full rounded-xl bg-[#00205B] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F2A900]"
                    />
                  </div>

                  {/* Live Rubric Criteria Table */}
                  <div className="rounded-xl bg-[#00205B] border border-white/15 p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Mentor Evaluation Rubric</span>
                      <span className="text-[#FFE264] tabular-nums">
                        {rubricFeedback ? `Score: ${rubricFeedback.score}/100` : 'Passing: >= 80/100'}
                      </span>
                    </div>

                    {(activeModule.rubricCriteria ?? []).map((crit, i) => {
                      const row = rubricFeedback?.breakdown[i];
                      return (
                        <div
                          key={crit.id}
                          className="pt-2 border-t border-white/10 flex items-start justify-between gap-3 text-xs"
                        >
                          <div>
                            <p className="font-semibold text-white">{crit.criterion}</p>
                            <p className="text-white/65 mt-0.5">{crit.targetDescription}</p>
                          </div>
                          <span className="font-mono font-bold tabular-nums shrink-0 text-[#F2A900]">
                            {row ? `${row.earned}/${row.max}` : `${crit.weight} pts`}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {rubricFeedback && !rubricFeedback.passed && (
                    <div className="rounded-xl bg-amber-950/50 border border-[#F2A900]/50 p-3.5 text-xs text-[#FFE264]">
                      Your brief scored {rubricFeedback.score}/100. Expand your explanation (20+ words referencing the core criteria above) to pass the 80-point threshold and mint your certificate.
                    </div>
                  )}

                  {rubricFeedback?.passed && (
                    <div className="rounded-xl bg-[#003087] border border-[#F2A900] p-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 text-xs font-bold text-white">
                        <Award className="w-5 h-5 text-[#F2A900] shrink-0" />
                        <span>
                          Capstone Verified ({rubricFeedback.score}/100) — Certificate Issued
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={onViewCertificate}
                        className="px-4 py-1.5 rounded-full bg-[#F2A900] text-[#00205B] text-xs font-bold cursor-pointer"
                      >
                        Open Certificate
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <span className="text-xs text-white/65">
                    Graduates with QR Certificate, Skill Matrix &amp; Portfolio Entry
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Capstone &amp; Grade Rubric
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export function CoursePlayer({
  course,
  enrollment,
  certificate,
  learnerName,
  studyStreak,
  qaPosts,
  onExit,
  onUpdateModuleProgress,
  onRecordStudyActivity,
  onAddQaPost,
  onUpvoteQaPost,
  onIssueCertificate,
  onViewCertificate,
}: CoursePlayerProps) {
  const [activeIndex, setActiveIndex] = useState<number>(
    Math.min(enrollment.currentModuleIndex ?? 0, course.modules.length - 1)
  );
  const [achievement, setAchievement] = useState<AchievementEvent | null>(null);

  useEffect(() => {
    if (!achievement) return;
    const timer = window.setTimeout(() => {
      setAchievement(null);
    }, 6000);
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAchievement(null);
    };
    window.addEventListener('keydown', onEscape);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onEscape);
    };
  }, [achievement]);

  const handleMilestoneAchieved = (event: Omit<AchievementEvent, 'id'>) => {
    setAchievement({ ...event, id: Date.now() });

    if (typeof window === 'undefined') return;
    try {
      if (event.kind === 'capstone' || event.isCapstone) {
        confetti({
          particleCount: 85,
          angle: 60,
          spread: 70,
          origin: { x: 0.12, y: 0.65 },
          colors: BRAND_CONFETTI_COLORS,
          ticks: 240,
          zIndex: 9999,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 85,
          angle: 120,
          spread: 70,
          origin: { x: 0.88, y: 0.65 },
          colors: BRAND_CONFETTI_COLORS,
          ticks: 240,
          zIndex: 9999,
          disableForReducedMotion: true,
        });
      } else if (event.kind === 'lesson') {
        confetti({
          particleCount: 65,
          angle: 65,
          spread: 65,
          origin: { x: 0.25, y: 0.6 },
          colors: BRAND_CONFETTI_COLORS,
          ticks: 200,
          zIndex: 9999,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 65,
          angle: 115,
          spread: 65,
          origin: { x: 0.75, y: 0.6 },
          colors: BRAND_CONFETTI_COLORS,
          ticks: 200,
          zIndex: 9999,
          disableForReducedMotion: true,
        });
      } else if (event.kind === 'quiz') {
        confetti({
          particleCount: 60,
          spread: 70,
          shapes: ['star', 'circle'],
          origin: { x: 0.35, y: 0.55 },
          colors: BRAND_CONFETTI_COLORS,
          ticks: 180,
          zIndex: 9999,
          disableForReducedMotion: true,
        });
      } else {
        confetti({
          particleCount: 48,
          spread: 58,
          origin: { x: 0.72, y: 0.52 },
          colors: BRAND_CONFETTI_COLORS,
          ticks: 160,
          zIndex: 9999,
          disableForReducedMotion: true,
        });
      }
    } catch {
      // Ignore canvas-confetti errors in headless environments without 2D canvas
    }
  };

  const activeModule = course.modules[activeIndex];
  const completedCount = useMemo(
    () => course.modules.filter((m) => enrollment.modules[m.id]?.completed).length,
    [course.modules, enrollment.modules]
  );

  const remainingMinutes = useMemo(
    () =>
      course.modules
        .filter((m) => !enrollment.modules[m.id]?.completed)
        .reduce((sum, m) => sum + m.durationMinutes, 0),
    [course.modules, enrollment.modules]
  );

  const remainingFormatted =
    remainingMinutes === 0
      ? 'Course Complete'
      : remainingMinutes >= 60
        ? `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m left`
        : `${remainingMinutes}m left`;

  const progressPct = Math.round((completedCount / course.modules.length) * 100);

  const isModuleUnlocked = (idx: number): boolean => {
    if (idx === 0) return true;
    const prevMod = course.modules[idx - 1];
    const prevRecord = enrollment.modules[prevMod.id];
    return Boolean(prevRecord?.completed && prevRecord?.quizPassed);
  };

  return (
    <div className="min-h-screen bg-[#00153D] text-white flex flex-col relative overflow-x-hidden">
      {/* Lesson, Quiz & Code Achievement Celebration Banner */}
      <AnimatePresence>
        {achievement && (
          <div
            className="fixed inset-x-0 top-20 z-50 flex flex-col items-center pointer-events-none px-4"
            aria-live="polite"
          >
            <motion.div
              key={`toast-${achievement.id}`}
              initial={{ opacity: 0, y: -24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.95 }}
              transition={SPRING_MOMENTUM}
              className="pointer-events-auto w-full max-w-md rounded-2xl glass-midnight-deep border-2 border-[#F2A900] p-4 sm:p-5 text-white"
              role="status"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <motion.div
                    initial={{ scale: 0.6, rotate: -14 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={SPRING_MOMENTUM}
                    className="w-11 h-11 rounded-xl bg-[#F2A900] text-[#00205B] flex items-center justify-center shrink-0"
                  >
                    {achievement.kind === 'capstone' ? (
                      <Award className="w-6 h-6" />
                    ) : achievement.kind === 'quiz' || achievement.kind === 'code' ? (
                      <Sparkles className="w-6 h-6" />
                    ) : (
                      <Trophy className="w-6 h-6" />
                    )}
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFE264]">
                      {achievement.kind === 'capstone'
                        ? 'Course Complete · Capstone Verified'
                        : achievement.kind === 'quiz'
                          ? 'Quiz Passed!'
                          : achievement.kind === 'code'
                            ? 'Challenge Passed!'
                            : 'Lesson Complete!'}
                    </p>
                    <h2 className="mt-0.5 text-sm sm:text-base font-extrabold text-white leading-snug">
                      {achievement.kind === 'quiz'
                        ? `Lesson ${achievement.milestoneNumber} Quiz Mastered`
                        : achievement.kind === 'code'
                          ? `Lesson ${achievement.milestoneNumber} Checks Verified`
                          : `Lesson ${achievement.milestoneNumber} Completed`}
                    </h2>
                    <p className="mt-1 text-xs text-white/85 leading-relaxed">
                      {achievement.subtitle ?? achievement.milestoneTitle}
                      {achievement.rubricScore !== undefined && (
                        <span className="font-bold text-[#F2A900] tabular-nums">
                          {' '}
                          · Rubric {achievement.rubricScore}/100
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAchievement(null)}
                  className="tactile-press p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 shrink-0 cursor-pointer"
                  aria-label="Dismiss achievement notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {(achievement.isCapstone || achievement.nextIndex !== undefined) && (
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-2.5">
                  {achievement.isCapstone ? (
                    <button
                      type="button"
                      onClick={() => {
                        setAchievement(null);
                        onViewCertificate();
                      }}
                      className="tactile-press inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View Verified Certificate</span>
                    </button>
                  ) : achievement.nextIndex !== undefined ? (
                    <button
                      type="button"
                      onClick={() => {
                        const nextIdx = achievement.nextIndex;
                        setAchievement(null);
                        if (nextIdx !== undefined) setActiveIndex(nextIdx);
                      }}
                      className="tactile-press inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold cursor-pointer"
                    >
                      <span>
                        Continue to Lesson {course.modules[achievement.nextIndex]?.number}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Frosted Classroom Header */}
      <div className="sticky top-0 z-30 glass-midnight border-b border-white/10 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <button
            type="button"
            onClick={onExit}
            className="tactile-press inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </button>

          <div className="min-w-0">
            <p className="text-[11px] font-medium text-[#FFE264] truncate">
              {course.track}
            </p>
            <h1 className="text-sm sm:text-base font-extrabold text-white truncate">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-4 text-xs text-white/80">
            <span className="inline-flex items-center gap-1.5 font-semibold tabular-nums">
              <Flame className="w-4 h-4 text-[#F2A900]" />
              <span>{studyStreak.currentStreak}-Day Streak</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold tabular-nums">
              <Clock className="w-4 h-4 text-[#307FE2]" />
              <span>{remainingFormatted}</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="w-28 h-2 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full bg-[#F2A900] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-bold tabular-nums text-white">
              {completedCount}/{course.modules.length} Lessons
            </span>
          </div>

          {certificate && (
            <button
              type="button"
              onClick={onViewCertificate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>View Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split Workspace */}
      <div className="flex-1 max-w-[1520px] w-full mx-auto grid lg:grid-cols-12 gap-0">
        {/* Left Sidebar: 4-Stage 12-Lesson Navigator (full-height alongside workspace, no inner scroll trap) */}
        <aside className="lg:col-span-3 bg-[#00205B]/70 border-b lg:border-b-0 lg:border-r border-white/10 p-4 sm:p-5 space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
            12-Lesson Roadmap ({course.modules.length})
          </p>

          {course.modules.map((mod, idx) => {
            const unlocked = isModuleUnlocked(idx);
            const completed = Boolean(enrollment.modules[mod.id]?.completed);
            const active = idx === activeIndex;
            const prevStage = idx > 0 ? course.modules[idx - 1].scaffoldingStage : null;
            const showStageHeader = mod.scaffoldingStage !== prevStage;

            return (
              <React.Fragment key={mod.id}>
                {showStageHeader && (
                  <p className="pt-2.5 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FFE264] border-t border-white/10 first:border-t-0 first:pt-0">
                    {mod.scaffoldingStage}
                  </p>
                )}
                <button
                  type="button"
                  disabled={!unlocked}
                  onClick={() => {
                    if (unlocked) setActiveIndex(idx);
                  }}
                  className={`tactile-press w-full text-left p-2.5 rounded-xl border flex items-start gap-2.5 ${
                    active
                      ? 'bg-[#003087] border-[#F2A900] text-white'
                      : unlocked
                        ? 'bg-[#00153D]/70 border-white/10 text-white/85 hover:border-white/25 cursor-pointer'
                        : 'bg-[#00153D]/40 border-white/5 text-white/40 cursor-not-allowed'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {completed ? (
                      <motion.span
                        initial={{ scale: 0.5, rotate: -14 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={SPRING_CRITICALLY_DAMPED}
                        className="inline-block"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#F2A900]" />
                      </motion.span>
                    ) : unlocked ? (
                      <span className="w-4 h-4 rounded-full border-2 border-[#307FE2] inline-block" />
                    ) : (
                      <Lock className="w-4 h-4 text-white/40" />
                    )}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-white/65">
                      <span className="font-mono tabular-nums">Lesson {mod.number}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{mod.durationMinutes}m</span>
                    </div>
                    <p className="mt-0.5 text-xs font-bold leading-snug">
                      {mod.title}
                    </p>
                    {!unlocked && (
                      <p className="mt-0.5 text-[10px] text-white/45">
                        {idx > 0 && enrollment.modules[course.modules[idx - 1].id]?.completed
                          ? `Pass Lesson ${course.modules[idx - 1]?.number} Quiz to unlock`
                          : `Complete Lesson ${course.modules[idx - 1]?.number} to unlock`}
                      </p>
                    )}
                  </div>
                </button>
              </React.Fragment>
            );
          })}
        </aside>

        <ModuleWorkspace
          key={activeModule.id}
          course={course}
          activeIndex={activeIndex}
          activeModule={activeModule}
          savedModule={enrollment.modules[activeModule.id]}
          certificate={certificate}
          learnerName={learnerName}
          moduleQaPosts={qaPosts[activeModule.id] ?? []}
          nextUnlocked={
            activeIndex < course.modules.length - 1 &&
            isModuleUnlocked(activeIndex + 1)
          }
          onPrevious={() => setActiveIndex((i) => Math.max(0, i - 1))}
          onNext={() => setActiveIndex((i) => Math.min(course.modules.length - 1, i + 1))}
          onUpdateModuleProgress={onUpdateModuleProgress}
          onRecordStudyActivity={onRecordStudyActivity}
          onAddQaPost={onAddQaPost}
          onUpvoteQaPost={onUpvoteQaPost}
          onIssueCertificate={onIssueCertificate}
          onViewCertificate={onViewCertificate}
          onMilestoneAchieved={handleMilestoneAchieved}
        />
      </div>
    </div>
  );
}
