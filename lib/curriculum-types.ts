import type {
  PromptFixture,
  SandboxTestCase,
  SqlTableRow,
} from './sandbox-engines';

export type DisciplineTrack =
  | 'Engineering, AI & Automation'
  | 'Data, SQL & IT Operations'
  | 'Design, Growth & Social';

export type SkillLevel = 'Foundational' | 'Intermediate' | 'Capstone';

export type ScaffoldingMode = 'sandbox' | 'deliverable' | 'rubric';

export type SandboxRuntime = 'js' | 'python' | 'sql' | 'prompt';

export type DiagramPreset =
  | 'flow'
  | 'memory-box'
  | 'branch-decision'
  | 'loop-cycle'
  | 'dict-map'
  | 'table-join'
  | 'prompt-layers'
  | 'funnel-stages'
  | 'osi-layers'
  | 'contrast-ratio'
  | 'sigmoid-curve'
  | 'capstone-assembly';

export interface LessonDiagramSpec {
  type: DiagramPreset;
  title: string;
  caption: string;
  nodes: string[];
}

export interface HandbookSection {
  heading: string;
  explanation: string;
  analogy?: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

export interface LiveExampleSpec {
  title: string;
  description: string;
  code: string;
  expectedOutput: string;
}

export interface CommonMistakeSpec {
  title: string;
  wrongWay: string;
  rightWay: string;
  whyItHappens: string;
}

export interface LessonHandbook {
  puzzlePiece: string;
  diagram: LessonDiagramSpec;
  sections: HandbookSection[];
  liveExample: LiveExampleSpec;
  commonMistake: CommonMistakeSpec;
  tryItMission: string;
}

export interface KnowledgeCheckSpec {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WorkspaceFile {
  filename: string;
  language: 'python' | 'sql' | 'markdown' | 'javascript' | 'json';
  readOnly: boolean;
  content: string;
}

export interface DeliverableField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'number' | 'select';
  options?: string[];
  helperText: string;
  validationRule: {
    minLength?: number;
    minNumber?: number;
    maxNumber?: number;
    mustContain?: string[];
    exactOption?: string;
    errorMessage: string;
  };
}

export interface RubricCriterion {
  id: string;
  criterion: string;
  weight: number;
  targetDescription: string;
  requiredKeywordHints?: string[];
  minWordCount?: number;
}

export interface CourseModule {
  id: string;
  number: string;
  title: string;
  durationMinutes: number;
  scaffoldingStage: string;
  mode: ScaffoldingMode;
  runtime?: SandboxRuntime;
  lessonSummary: string;
  keyConcepts: string[];
  architectureNote: string;
  deliverableTitle: string;
  deliverablePrompt: string;
  acceptanceCriteria: string[];
  // Illustrated Handbook & Co-located Study Content
  handbook?: LessonHandbook;
  knowledgeCheck?: KnowledgeCheckSpec;
  hints?: string[];
  referenceSolution?: string;
  // Replit multi-file inspector tabs
  workspaceFiles?: WorkspaceFile[];
  // Mode: sandbox (js | python | sql | prompt)
  starterCode?: string;
  sandboxTests?: SandboxTestCase[];
  sqlTables?: Record<string, SqlTableRow[]>;
  promptFixtures?: PromptFixture[];
  // Mode: deliverable
  deliverableFields?: DeliverableField[];
  // Mode: rubric
  rubricCriteria?: RubricCriterion[];
}

export interface Course {
  id: string;
  slug: string;
  track: DisciplineTrack;
  level: SkillLevel;
  title: string;
  subtitle: string;
  durationHours: number;
  rating: number;
  reviewCount: number;
  instructor: {
    name: string;
    role: string;
    organization: string;
  };
  thumbnailKey: 'software-ai' | 'data-cloud' | 'ux-product';
  primaryMode: ScaffoldingMode;
  primaryRuntime?: SandboxRuntime;
  capstoneTitle: string;
  capstoneSummary: string;
  capstoneDeliverables: string[];
  outcomes: string[];
  modules: CourseModule[];
}
