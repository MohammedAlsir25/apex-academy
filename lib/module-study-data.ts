import type { CourseModule, KnowledgeCheckSpec } from './curriculum-types';

export interface WalkthroughChapter {
  timestamp: string;
  title: string;
  summary: string;
  blueprint: string;
}

export type KnowledgeCheck = KnowledgeCheckSpec;

export interface QaEntry {
  id: string;
  author: string;
  role: 'Learner' | 'Instructor';
  question: string;
  reply?: string;
  upvotes: number;
  createdAt: string;
}

export interface ModuleStudyPack {
  walkthroughChapters: WalkthroughChapter[];
  knowledgeCheck: KnowledgeCheck;
  hints: string[];
  commonPitfalls: string[];
  referenceSolution: string;
  cheatSheetMarkdown: string;
  initialQa: QaEntry[];
}

export const COURSE_SKILLS_VERIFIED: Record<string, string[]> = {
  'python-programming-mastery': [
    'Variables & Formatted Output',
    'Conditionals, Loops & Functions',
    'Dictionaries & Error Handling',
    'CLI Budget & Telemetry Engine',
  ],
  'prompt-engineering-systems': [
    'System Role & Guardrails',
    'Zero-Shot & Few-Shot Calibration',
    'Strict JSON Schema Extraction',
    'Prompt Injection Defense',
  ],
  'machine-learning-engineering': [
    'Features, Mean & Z-Score Scaling',
    'Linear Prediction & MSE Loss',
    'Gradient Descent & Sigmoid Math',
    'Classification Metrics & Cosine Search',
  ],
  'sql-relational-mastery': [
    'SELECT, WHERE & Sorting',
    'INNER & LEFT JOIN Modeling',
    'GROUP BY & HAVING Rollups',
    'CTEs & Window Functions',
  ],
  'data-analyst-bi-track': [
    'KPI Metrics & SQL Funnels',
    'CASE Cohort Segmentation',
    'Median Imputation & Outlier Clamping',
    'A/B Lift & Guardrail Governance',
  ],
  'computer-support-specialist': [
    'OSI Diagnostics & Hardware POST',
    'IPv4, CIDR & DNS Isolation',
    'P1–P3 Incident SLA Triage',
    'Zero-Trust IAM & Root-Cause Playbooks',
  ],
  'ui-ux-product-designer': [
    'WCAG AA/AAA Contrast Audits',
    '8pt Grids & Radius Math',
    'Nielsen Heuristics & Affordances',
    'Accessible Semantic Design Systems',
  ],
  'digital-marketing-specialist': [
    'ROAS, CAC & Payback Economics',
    'UTM Attribution Governance',
    'AIDA Copy & Landing CRO',
    'Bid Caps & Lifecycle Retention',
  ],
  'social-media-specialist': [
    'Weighted Engagement Scoring',
    '4-Pillar Content Mix Balance',
    '3-Second Retention Hooks',
    'Crisis SLA & Creator Attribution',
  ],
};

export function getModuleStudyPack(courseTitle: string, mod: CourseModule): ModuleStudyPack {
  const handbook = mod.handbook;

  const walkthroughChapters: WalkthroughChapter[] = handbook
    ? handbook.sections.map((sec, idx) => ({
        timestamp: `0${idx * 2}:00`,
        title: sec.heading,
        summary: sec.explanation,
        blueprint: sec.codeSnippet ?? sec.analogy ?? mod.architectureNote,
      }))
    : [
        {
          timestamp: '00:00',
          title: `Framing ${mod.scaffoldingStage}`,
          summary: mod.lessonSummary,
          blueprint: `${courseTitle} -> Lesson ${mod.number}: ${mod.scaffoldingStage}`,
        },
        {
          timestamp: '02:00',
          title: 'Core Practice & Pattern',
          summary: mod.keyConcepts.join(' · '),
          blueprint: mod.architectureNote,
        },
        {
          timestamp: '04:00',
          title: `Building ${mod.deliverableTitle}`,
          summary: mod.deliverablePrompt,
          blueprint: mod.acceptanceCriteria[0] ?? 'Pass all verification checks',
        },
      ];

  const rawKnowledgeCheck: KnowledgeCheck = mod.knowledgeCheck ?? {
    question: `Which practice is essential for "${mod.title}"?`,
    options: [
      mod.keyConcepts[0] ?? 'Verify edge cases deterministically before advancing',
      'Skip boundary validation to simplify the first draft',
      'Ignore edge-case failures if the happy path passes once',
    ],
    correctIndex: 0,
    explanation: `Correct — ${mod.architectureNote}`,
  };

  // Deterministically rotate option positions by lesson number so answers distribute evenly across A / B / C
  const optCount = rawKnowledgeCheck.options.length;
  const shift = optCount > 1 ? (Number.parseInt(mod.number, 10) || 1) % optCount : 0;
  const rotatedOptions =
    shift === 0
      ? rawKnowledgeCheck.options
      : rawKnowledgeCheck.options.map(
          (_, idx) => rawKnowledgeCheck.options[(idx - shift + optCount) % optCount]
        );
  const rotatedCorrectIndex =
    optCount > 1 ? (rawKnowledgeCheck.correctIndex + shift) % optCount : rawKnowledgeCheck.correctIndex;

  const knowledgeCheck: KnowledgeCheck = {
    ...rawKnowledgeCheck,
    options: rotatedOptions,
    correctIndex: rotatedCorrectIndex,
  };

  const hints: string[] =
    mod.hints && mod.hints.length > 0
      ? mod.hints
      : mod.mode === 'sandbox'
        ? [
            `Focus on the target deliverable: ${mod.deliverableTitle}.`,
            `Expected check: ${mod.sandboxTests?.[0]?.expectedDescription ?? mod.acceptanceCriteria[0]}.`,
            `Verify every acceptance edge case: ${mod.acceptanceCriteria.join(' · ')}.`,
          ]
        : mod.mode === 'deliverable'
          ? [
              'Check the helper guideline beneath each input field before verifying.',
              `Ensure numeric bounds satisfy policy limits (${mod.acceptanceCriteria[0] ?? 'see criteria'}).`,
              'Select the option that prevents silent failures or regressions.',
            ]
          : [
              'Reference concrete patterns built across Lessons 01–11.',
              'Write 20+ clear words explaining trade-offs, metrics, and edge-case defenses.',
              'Address every Mentor Rubric criterion directly by name in your brief.',
            ];

  const commonPitfalls: string[] = handbook?.commonMistake
    ? [
        `${handbook.commonMistake.title}: ${handbook.commonMistake.whyItHappens}`,
        mod.architectureNote,
      ]
    : [
        `Missing boundary or null/zero protection (${mod.acceptanceCriteria[0] ?? 'edge cases'}).`,
        mod.architectureNote,
      ];

  const referenceSolution =
    mod.referenceSolution ??
    (mod.mode === 'sandbox'
      ? mod.starterCode ?? '// Verified reference implementation.'
      : mod.mode === 'deliverable'
        ? (mod.deliverableFields ?? [])
            .map((f) => {
              const target =
                f.validationRule.exactOption ??
                (f.validationRule.minNumber !== undefined
                  ? `${f.validationRule.minNumber} (within [${f.validationRule.minNumber}, ${f.validationRule.maxNumber}])`
                  : f.placeholder.replace(/^e\.g\.,\s*/i, ''));
              return `${f.label}:\n  -> ${target}`;
            })
            .join('\n\n')
        : `Staff Capstone Exemplar (${mod.title}):\n\n` +
          (mod.rubricCriteria ?? [])
            .map((c) => `• ${c.criterion} (${c.weight} pts): ${c.targetDescription}`)
            .join('\n'));

  const handbookSectionText = handbook
    ? handbook.sections
        .map(
          (s) =>
            `### ${s.heading}\n${s.explanation}${s.analogy ? `\n\n> Analogy: ${s.analogy}` : ''}${s.codeSnippet ? `\n\n\`\`\`${s.codeLanguage ?? ''}\n${s.codeSnippet}\n\`\`\`` : ''}`
        )
        .join('\n\n')
    : `### Lesson Brief\n${mod.lessonSummary}`;

  const cheatSheetMarkdown = `# ${courseTitle}
## Lesson ${mod.number}: ${mod.title}
Stage: ${mod.scaffoldingStage} · Estimated Time: ${mod.durationMinutes} min
${handbook ? `Puzzle Piece: ${handbook.puzzlePiece}` : ''}

${handbookSectionText}

${
  handbook?.commonMistake
    ? `### Beginner Mistake to Avoid: ${handbook.commonMistake.title}
- Wrong Way: \`${handbook.commonMistake.wrongWay}\`
- Right Way: \`${handbook.commonMistake.rightWay}\`
- Why: ${handbook.commonMistake.whyItHappens}`
    : ''
}

### Core Takeaways
${mod.keyConcepts.map((k) => `- ${k}`).join('\n')}

### Practitioner Note
${mod.architectureNote}

### Acceptance Criteria
${mod.acceptanceCriteria.map((a) => `- [ ] ${a}`).join('\n')}
`;

  const initialQa: QaEntry[] = [
    {
      id: `${mod.id}-qa-1`,
      author: 'Cohort Mentor',
      role: 'Instructor',
      question: `How does Lesson ${mod.number} connect to the final project?`,
      reply: `${handbook?.puzzlePiece ? `${handbook.puzzlePiece} — ` : ''}Every piece verified in ${mod.scaffoldingStage} snaps directly into your Lesson 12 Capstone: ${mod.architectureNote}`,
      upvotes: 14,
      createdAt: '2026-10-12T10:00:00Z',
    },
    {
      id: `${mod.id}-qa-2`,
      author: 'Amina K.',
      role: 'Learner',
      question: `What causes Lesson ${mod.number} checks to trip beginners on attempt #1?`,
      reply: commonPitfalls[0],
      upvotes: 9,
      createdAt: '2026-11-02T14:30:00Z',
    },
  ];

  return {
    walkthroughChapters,
    knowledgeCheck,
    hints,
    commonPitfalls,
    referenceSolution,
    cheatSheetMarkdown,
    initialQa,
  };
}
