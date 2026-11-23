export type {
  CommonMistakeSpec,
  Course,
  CourseModule,
  DeliverableField,
  DiagramPreset,
  DisciplineTrack,
  HandbookSection,
  KnowledgeCheckSpec,
  LessonDiagramSpec,
  LessonHandbook,
  LiveExampleSpec,
  RubricCriterion,
  SandboxRuntime,
  ScaffoldingMode,
  SkillLevel,
  WorkspaceFile,
} from './curriculum-types';
export type { PromptFixture, SandboxTestCase, SqlTableRow } from './sandbox-engines';

import type { Course, DisciplineTrack } from './curriculum-types';
import { PYTHON_COURSE } from './courses/python';
import { PROMPT_ENGINEERING_COURSE } from './courses/prompt-engineering';
import { MACHINE_LEARNING_COURSE } from './courses/machine-learning';
import { SQL_COURSE } from './courses/sql';
import { DATA_ANALYST_COURSE } from './courses/data-analyst';
import { COMPUTER_SUPPORT_COURSE } from './courses/computer-support';
import { UI_UX_DESIGNER_COURSE } from './courses/ui-ux-designer';
import { DIGITAL_MARKETING_COURSE } from './courses/digital-marketing';
import { SOCIAL_MEDIA_COURSE } from './courses/social-media';

export const TRACK_FILTERS: Array<'All Tracks' | DisciplineTrack> = [
  'All Tracks',
  'Engineering, AI & Automation',
  'Data, SQL & IT Operations',
  'Design, Growth & Social',
];

export const COURSES: Course[] = [
  PYTHON_COURSE,
  PROMPT_ENGINEERING_COURSE,
  MACHINE_LEARNING_COURSE,
  SQL_COURSE,
  DATA_ANALYST_COURSE,
  COMPUTER_SUPPORT_COURSE,
  UI_UX_DESIGNER_COURSE,
  DIGITAL_MARKETING_COURSE,
  SOCIAL_MEDIA_COURSE,
];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}
