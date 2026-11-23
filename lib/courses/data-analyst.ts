import type { Course } from '../curriculum-types';

export const DATA_ANALYST_COURSE: Course = {
  id: 'data-analyst-bi-track',
  slug: 'data-analyst-bi-track',
  track: 'Data, SQL & IT Operations',
  level: 'Intermediate',
  title: 'Data Analyst',
  subtitle:
    'Learn how analysts turn raw events into executive decisions—starting from table grain and clear metric definitions, through SQL funnel math, CASE tiers, Python null/outlier cleaning, and A/B lift validation.',
  durationHours: 22,
  rating: 4.8,
  reviewCount: 4110,
  instructor: {
    name: 'Priya Nair',
    role: 'Lead Product Analyst',
    organization: 'SignalBoard BI',
  },
  thumbnailKey: 'data-cloud',
  primaryMode: 'sandbox',
  primaryRuntime: 'sql',
  capstoneTitle: 'Executive Growth Funnel & Experiment Decision System',
  capstoneSummary:
    'Combine trustworthy metric denominators, SQL conversion funnels, CASE customer tiers, Python median/outlier imputation, and statistical A/B lift rules into one Executive Decision System.',
  capstoneDeliverables: [
    'Metric grain & numerator/denominator definitions preventing vanity ratios',
    'SQL channel funnel conversion & CASE cohort segmentation queries',
    'Python median imputation & Winsorized outlier clamping utility',
    'A/B sample-size guardrail evaluator & Executive Decision Brief',
  ],
  outcomes: [
    'Define accurate numerators, denominators, and table grain before querying',
    'Build conversion funnels and cohort breakdowns cleanly in SQL',
    'Impute missing data and clamp bot outliers responsibly in Python',
    'Evaluate A/B experiments with minimum sample rules and guardrail KPIs',
  ],
  modules: [
    {
      id: 'da-m1',
      number: '01',
      title: 'Think Like an Analyst: Questions, Metrics & Grain',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'Before writing a single line of SQL or Python, great analysts define three things: the exact **decision** to inform, the **table grain** (what 1 row represents), and a clear **numerator / denominator**.',
      keyConcepts: [
        'Vanity counts ("10,000 clicks") vs ratio rates ("4.2% signup conversion")',
        'Defining table grain ("1 row = 1 user session") so joins never inflate metrics',
        'Pairing primary metrics with clear denominators',
      ],
      architectureNote:
        'Nine out of ten executive dashboard errors happen before code is even run—from mixing daily event rows with user-level denominators.',
      deliverableTitle: 'Define Metric Grain & Conversion Denominator Spec',
      deliverablePrompt:
        'Specify a trustworthy Activation Conversion Rate definition: select the correct denominator rule, define the table grain clearly, and write the ratio formula.',
      acceptanceCriteria: [
        'Selects unique users/sessions as the accurate denominator rather than raw pageviews',
        'Documents clear 1-row table grain cleanly',
        'Defines both numerator and denominator for conversion rate',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 01 of 12 · Metric & Grain Contract',
        diagram: {
          type: 'funnel-stages',
          title: 'Numerator vs Denominator in a Funnel',
          caption: 'A conversion rate compares verified completions (numerator) against unique eligible entries (denominator).',
          nodes: ['Unique Sessions', 'Completed Signups', 'Conversion %'],
        },
        sections: [
          {
            heading: 'Why Raw Counts Mislead Teams',
            explanation:
              'Saying "We got 1,200 signups this month!" sounds great until you learn traffic doubled from 20,000 to 60,000 visits—meaning conversion actually *dropped* from 6% to 2%. Ratios pair volume with opportunity.',
          },
          {
            heading: 'Checking Table Grain First',
            explanation:
              'Always ask: *"What does ONE row in this table represent?"* Is one row a single button click, one user session, or one monthly account? Never sum session-level totals blindly across multi-event rows.',
          },
        ],
        liveExample: {
          title: 'Live Example: Crisp Metric Definition',
          description: 'A complete analyst spec states grain, numerator, and denominator explicitly.',
          code: 'Grain: 1 row = 1 unique landing session\nMetric: Signup Conversion Rate = (Completed Signups / Unique Sessions) * 100',
          expectedOutput: 'Zero ambiguity across SQL, Python, and executive slides.',
        },
        commonMistake: {
          title: 'Using Total Pageviews as Conversion Denominator',
          wrongWay: 'signups / total_page_reloads  -- Refreshing a page shrinks conversion falsely!',
          rightWay: 'signups / unique_sessions',
          whyItHappens:
            'Counting repeated clicks or refreshes inflates the denominator artificially.',
        },
        tryItMission:
          'Fill out the table grain, numerator/denominator formula, and select the accurate denominator choice.',
      },
      knowledgeCheck: {
        question: 'Why must analysts clarify table grain before writing a SQL query?',
        options: [
          'To know exactly what 1 row represents so sums and denominators stay accurate',
          'Because SQL requires table names in alphabetical order',
          'To increase pageviews',
        ],
        correctIndex: 0,
        explanation: 'Understanding table grain prevents double-counting event rows as unique users.',
      },
      hints: [
        'Write clearly what one row represents (e.g., `1 row = 1 session` or `1 user`).',
        'Include both `signups` and `sessions` in your formula field.',
        'Pick the unique sessions/visitors denominator option.',
      ],
      referenceSolution: `1. Table Grain Definition: One row in funnel_events represents one daily channel aggregate of unique sessions and completed signups.
2. Metric Formula: Conversion Rate = (Total Completed Signups / Total Unique Sessions) * 100.
3. Accurate Denominator: Unique eligible sessions (never repeated page reloads)`,
      deliverableFields: [
        {
          id: 'grain_def',
          label: 'Table Grain Statement',
          placeholder: 'e.g., 1 row equals 1 unique user session per acquisition channel per day',
          type: 'textarea',
          helperText: 'Explain what one single row represents (at least 25 characters).',
          validationRule: { minLength: 25, mustContain: ['row'], errorMessage: 'State what 1 row represents.' },
        },
        {
          id: 'metric_formula',
          label: 'Conversion Rate Numerator & Denominator',
          placeholder: 'e.g., (completed signups / unique sessions) * 100',
          type: 'text',
          helperText: 'Include both signups and sessions.',
          validationRule: { minLength: 15, mustContain: ['signups', 'sessions'], errorMessage: 'Include signups and sessions.' },
        },
        {
          id: 'denom_choice',
          label: 'Trustworthy Funnel Denominator',
          placeholder: 'Choose denominator',
          type: 'select',
          options: [
            'Unique eligible sessions (never repeated page reloads)',
            'Total raw browser refresh hits including bots',
            'Only users who already purchased last year',
          ],
          helperText: 'Choose the denominator that prevents duplicate-hit distortion.',
          validationRule: {
            exactOption: 'Unique eligible sessions (never repeated page reloads)',
            errorMessage: 'Select unique eligible sessions as the trustworthy denominator.',
          },
        },
      ],
    },

    {
      id: 'da-m2',
      number: '02',
      title: 'SQL Funnel Basics: Summing Sessions & Signups',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Start pulling real channel performance from `funnel_events`. Aggregate total `sessions` and total `signups` per acquisition `channel` (`Organic`, `Paid Search`, `Referral`).',
      keyConcepts: [
        'Grouping event rows by acquisition `channel`',
        'Summing volume columns cleanly with `SUM(...)`',
        'Ordering channels from highest signup volume to lowest',
      ],
      architectureNote:
        'Always verify raw numerator (`SUM(signups)`) and denominator (`SUM(sessions)`) volumes before jumping to percentage rates—a tiny 50% channel of 2 visits matters less than a 10% channel of 5,000 visits.',
      deliverableTitle: 'Summarize total_sessions and total_signups by channel',
      deliverablePrompt:
        'Query `funnel_events` selecting `channel`, `SUM(sessions) AS total_sessions`, and `SUM(signups) AS total_signups`, grouped by `channel` and ordered by `total_signups DESC`.',
      acceptanceCriteria: [
        'Groups rows cleanly by channel',
        'Outputs total_sessions and total_signups aliases',
        'Orders highest total_signups channel first',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 02 of 12 · SQL Channel Volume Table',
        diagram: {
          type: 'funnel-stages',
          title: 'Channel Volume Aggregation',
          caption: 'Sum daily rows per acquisition channel to see true top-of-funnel scale.',
          nodes: ['Daily Channel Rows', 'GROUP BY channel', 'SUM sessions & signups'],
        },
        sections: [
          {
            heading: 'Why Volume Precedes Percentages',
            explanation:
              'Before calculating conversion percentages, inspect `SUM(sessions)` and `SUM(signups)` side by side so stakeholders know the real volume behind every rate.',
            codeLanguage: 'sql',
            codeSnippet: 'SELECT channel, SUM(sessions) AS total_sessions, SUM(signups) AS total_signups\nFROM funnel_events\nGROUP BY channel\nORDER BY total_signups DESC;',
          },
        ],
        liveExample: {
          title: 'Live Example: Sessions by Channel',
          description: 'Group and sort raw acquisition traffic.',
          code: 'SELECT channel, SUM(sessions) AS total_sessions\nFROM funnel_events\nGROUP BY channel\nORDER BY total_sessions DESC;',
          expectedOutput: 'Ranks Paid Search (2500), Organic (1600), Referral (400).',
        },
        commonMistake: {
          title: 'Counting Rows Instead of Summing Sessions',
          wrongWay: 'SELECT channel, COUNT(*) FROM funnel_events;  -- Only counts days, not sessions!',
          rightWay: 'SELECT channel, SUM(sessions) AS total_sessions FROM funnel_events GROUP BY channel;',
          whyItHappens:
            'Each row holds a daily total (`sessions: 1200`), so `SUM(sessions)` is needed instead of `COUNT(*)`.',
        },
        tryItMission:
          'Select `channel`, `SUM(sessions) AS total_sessions`, and `SUM(signups) AS total_signups` ordered by `total_signups DESC`.',
      },
      knowledgeCheck: {
        question: 'Why do we use `SUM(sessions)` instead of `COUNT(*)` on `funnel_events`?',
        options: [
          'Each row stores a pre-aggregated daily count of sessions, not 1 single session',
          'COUNT(*) only works on text columns',
          'SUM ignores GROUP BY automatically',
        ],
        correctIndex: 0,
        explanation: 'Understanding table grain shows each row represents daily volume, requiring `SUM(sessions)`.',
      },
      hints: [
        'Select `channel, SUM(sessions) AS total_sessions, SUM(signups) AS total_signups`.',
        'Group by `channel` and order by `total_signups DESC`.',
      ],
      referenceSolution: `SELECT channel,
  SUM(sessions) AS total_sessions,
  SUM(signups) AS total_signups
FROM funnel_events
GROUP BY channel
ORDER BY total_signups DESC;`,
      sqlTables: {
        funnel_events: [
          { day: 'Mon', channel: 'Organic', sessions: 1000, signups: 80 },
          { day: 'Tue', channel: 'Organic', sessions: 600, signups: 48 },
          { day: 'Mon', channel: 'Paid Search', sessions: 1500, signups: 75 },
          { day: 'Tue', channel: 'Paid Search', sessions: 1000, signups: 45 },
          { day: 'Mon', channel: 'Referral', sessions: 400, signups: 64 },
        ],
      },
      workspaceFiles: [
        { filename: 'funnel.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT channel, SUM(sessions) AS total_sessions
FROM funnel_events
GROUP BY channel;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes exact sessions and signups per channel',
          expression:
            'rows.length === 3 && rows.some((r) => r.channel === "Organic" && r.total_sessions === 1600 && r.total_signups === 128)',
          expectedDescription: 'Organic sums 1600 sessions and 128 signups',
        },
        {
          id: 't2',
          label: 'Sorts highest signups first (Organic 128 -> Paid 120 -> Referral 64)',
          expression: 'rows[0]?.channel === "Organic" && rows[2]?.channel === "Referral"',
          expectedDescription: 'Orders Organic, Paid Search, Referral',
        },
      ],
    },

    {
      id: 'da-m3',
      number: '03',
      title: 'SQL Conversion Rates with ROUND()',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Add conversion percentage (`conv_pct`) right onto your SQL funnel table using `ROUND(SUM(signups) * 100 / SUM(sessions), 1)`—multiplying by `100` before dividing so decimals stay crisp.',
      keyConcepts: [
        'Computing aggregate ratios (`SUM(signups) * 100 / SUM(sessions)`)',
        'Rounding conversion percentages cleanly with `ROUND(..., 1)`',
        'Sorting channels by efficiency (`ORDER BY conv_pct DESC`)',
      ],
      architectureNote:
        'Notice Referral has fewer sessions (400) yet converts at `16.0%`—far higher than Paid Search (`4.8%`)! Efficiency reveals where quality traffic lives.',
      deliverableTitle: 'Compute channel conv_pct sorted by conversion efficiency',
      deliverablePrompt:
        'Extend the `funnel_events` query adding `ROUND(SUM(signups) * 100 / SUM(sessions), 1) AS conv_pct`, ordered by `conv_pct DESC`.',
      acceptanceCriteria: [
        'Computes Referral (16.0%), Organic (8.0%), Paid Search (4.8%)',
        'Includes total_sessions, total_signups, and conv_pct',
        'Orders descending by conv_pct',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 03 of 12 · SQL Funnel Conversion Rate',
        diagram: {
          type: 'flow',
          title: 'Compound Aggregate Ratio Math',
          caption: 'Sum first across days, multiply by 100 for percentage scale, divide by total sessions, then ROUND.',
          nodes: ['SUM(signups) * 100', '/ SUM(sessions)', 'ROUND(..., 1) AS conv_pct'],
        },
        sections: [
          {
            heading: 'Why Aggregate Ratios Must Divide Sums, Not Average Rates',
            explanation:
              'Never average daily conversion rates (`AVG(signups / sessions)`)! A slow Sunday with 10 visitors and 5 signups (50%) would skew a busy Monday with 5,000 visitors. Always divide the **summed numerator** by the **summed denominator**.',
            codeLanguage: 'sql',
            codeSnippet: 'ROUND(SUM(signups) * 100 / SUM(sessions), 1) AS conv_pct',
          },
        ],
        liveExample: {
          title: 'Live Example: Weighted Rate Math',
          description: 'Watch `SUM(signups) * 100 / SUM(sessions)` compute exact weighted percentages.',
          code: 'SELECT channel,\n  ROUND(SUM(signups) * 100 / SUM(sessions), 1) AS conv_pct\nFROM funnel_events\nGROUP BY channel\nORDER BY conv_pct DESC;',
          expectedOutput: 'Referral 16.0%, Organic 8.0%, Paid Search 4.8%.',
        },
        commonMistake: {
          title: 'Averaging Daily Percentages (`AVG(signups / sessions)`)',
          wrongWay: 'AVG(signups * 100 / sessions)  -- Unweighted average distorts low-traffic days!',
          rightWay: 'ROUND(SUM(signups) * 100 / SUM(sessions), 1)',
          whyItHappens:
            'Weighted ratios require summing numerator and denominator totals across the entire group first.',
        },
        tryItMission:
          'Output `channel`, `total_sessions`, `total_signups`, and `conv_pct` sorted descending by `conv_pct`.',
      },
      knowledgeCheck: {
        question: 'Why must you compute `SUM(signups) / SUM(sessions)` instead of averaging daily percentages?',
        options: [
          'Dividing totals preserves true traffic weighting across busy vs quiet days',
          'SQL does not support the AVG keyword',
          'Multiplying by 100 fails inside SUM()',
        ],
        correctIndex: 0,
        explanation: 'Ratio of sums guarantees high-traffic and low-traffic days contribute proportionally.',
      },
      hints: [
        'Use exact expression `ROUND(SUM(signups) * 100 / SUM(sessions), 1) AS conv_pct`.',
        'Keep `SUM(sessions) AS total_sessions` and `SUM(signups) AS total_signups`.',
        'Order by `conv_pct DESC`.',
      ],
      referenceSolution: `SELECT channel,
  SUM(sessions) AS total_sessions,
  SUM(signups) AS total_signups,
  ROUND(SUM(signups) * 100 / SUM(sessions), 1) AS conv_pct
FROM funnel_events
GROUP BY channel
ORDER BY conv_pct DESC;`,
      sqlTables: {
        funnel_events: [
          { day: 'Mon', channel: 'Organic', sessions: 1000, signups: 80 },
          { day: 'Tue', channel: 'Organic', sessions: 600, signups: 48 },
          { day: 'Mon', channel: 'Paid Search', sessions: 1500, signups: 75 },
          { day: 'Tue', channel: 'Paid Search', sessions: 1000, signups: 45 },
          { day: 'Mon', channel: 'Referral', sessions: 400, signups: 64 },
        ],
      },
      workspaceFiles: [
        { filename: 'funnel.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT channel,
  SUM(sessions) AS total_sessions,
  SUM(signups) AS total_signups
FROM funnel_events
GROUP BY channel;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Ranks highest-converting channel (Referral 16.0%) first',
          expression: 'rows[0]?.channel === "Referral" && rows[0]?.conv_pct === 16',
          expectedDescription: 'Referral ranks #1 at 16.0%',
        },
        {
          id: 't2',
          label: 'Calculates weighted Organic (8.0%) and Paid Search (4.8%)',
          expression:
            'rows.some((r) => r.channel === "Organic" && r.conv_pct === 8) && rows.some((r) => r.channel === "Paid Search" && r.conv_pct === 4.8)',
          expectedDescription: 'Organic = 8.0%, Paid Search = 4.8%',
        },
      ],
    },

    {
      id: 'da-m4',
      number: '04',
      title: 'Segmenting Customer Cohorts with SQL CASE WHEN',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Averages hide differences between small hobby accounts and huge Enterprise accounts. Use SQL `CASE WHEN ... THEN ... ELSE ... END` inside a CTE to bucket users into `Enterprise`, `Growth`, and `Starter` cohorts and count each.',
      keyConcepts: [
        'Ordered `CASE WHEN` branching from highest threshold downward',
        'Combining `WITH tiered AS (...)` CTE with `GROUP BY tier`',
        'Comparing account counts across customer spend tiers',
      ],
      architectureNote:
        'Always write `CASE WHEN` conditions from highest threshold (`>= 500`) down to lowest (`>= 100`), because SQL stops on the very first True branch!',
      deliverableTitle: 'Bucket users into Enterprise, Growth, and Starter tiers',
      deliverablePrompt:
        'Write a `WITH tiered AS (...)` query classifying `monthly_spend >= 500` as `\'Enterprise\'`, `>= 100` as `\'Growth\'`, else `\'Starter\'`, then select `tier, COUNT(*) AS accounts` grouped by `tier` ordered descending by `accounts`.',
      acceptanceCriteria: [
        'Classifies Enterprise (>=500), Growth (>=100), and Starter (<100)',
        'Counts Starter: 3, Growth: 2, Enterprise: 1',
        'Sorts descending by accounts',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 04 of 12 · SQL Cohort Segmentation',
        diagram: {
          type: 'branch-decision',
          title: 'Ordered CASE WHEN Segmentation',
          caption: 'SQL tests top-down: >= 500 becomes Enterprise, next >= 100 becomes Growth, everything else Starter.',
          nodes: ['monthly_spend', '>= 500 -> Enterprise', '>= 100 -> Growth', 'Else Starter'],
        },
        sections: [
          {
            heading: 'Turning Continuous Spend into Clean Cohorts',
            explanation:
              'Just like Python `if / elif / else`, SQL `CASE WHEN` assigns a category label row-by-row. Wrapping that inside a CTE (`WITH tiered AS (...)`) makes counting each `tier` cleanly readable.',
            codeLanguage: 'sql',
            codeSnippet: "CASE\n  WHEN monthly_spend >= 500 THEN 'Enterprise'\n  WHEN monthly_spend >= 100 THEN 'Growth'\n  ELSE 'Starter'\nEND AS tier",
          },
        ],
        liveExample: {
          title: 'Live Example: Inspecting Row-Level Tiers',
          description: 'See each user labeled before grouping into summary counts.',
          code: "SELECT user_id, monthly_spend,\n  CASE\n    WHEN monthly_spend >= 500 THEN 'Enterprise'\n    WHEN monthly_spend >= 100 THEN 'Growth'\n    ELSE 'Starter'\n  END AS tier\nFROM users;",
          expectedOutput: 'Labels all 6 users cleanly into Enterprise, Growth, or Starter.',
        },
        commonMistake: {
          title: 'Putting `>= 100` Before `>= 500`',
          wrongWay: "WHEN monthly_spend >= 100 THEN 'Growth'\nWHEN monthly_spend >= 500 THEN 'Enterprise'  -- Unreachable!",
          rightWay: "WHEN monthly_spend >= 500 THEN 'Enterprise'\nWHEN monthly_spend >= 100 THEN 'Growth'",
          whyItHappens:
            '$750 satisfies `>= 100` first, so it would stop at `Growth` and never reach `Enterprise`.',
        },
        tryItMission:
          'Use `WITH tiered AS (...)` + `CASE WHEN` + `GROUP BY tier` ordered by `accounts DESC`.',
      },
      knowledgeCheck: {
        question: 'In a multi-branch `CASE WHEN`, why must `monthly_spend >= 500` come BEFORE `monthly_spend >= 100`?',
        options: [
          'Because SQL picks the first matching WHEN branch and stops evaluating',
          'Because SQL only reads numbers above 500',
          'Because ELSE must come first',
        ],
        correctIndex: 0,
        explanation: 'Putting the strictest threshold first ensures high spenders do not get caught by the lower threshold.',
      },
      hints: [
        'Define `WITH tiered AS (SELECT user_id, CASE WHEN monthly_spend >= 500 THEN \'Enterprise\' WHEN monthly_spend >= 100 THEN \'Growth\' ELSE \'Starter\' END AS tier FROM users)`.',
        'Select `tier, COUNT(*) AS accounts FROM tiered GROUP BY tier ORDER BY accounts DESC;`.',
      ],
      referenceSolution: `WITH tiered AS (
  SELECT user_id,
    CASE
      WHEN monthly_spend >= 500 THEN 'Enterprise'
      WHEN monthly_spend >= 100 THEN 'Growth'
      ELSE 'Starter'
    END AS tier
  FROM users
)
SELECT tier, COUNT(*) AS accounts
FROM tiered
GROUP BY tier
ORDER BY accounts DESC;`,
      sqlTables: {
        users: [
          { user_id: 1, monthly_spend: 750 },
          { user_id: 2, monthly_spend: 220 },
          { user_id: 3, monthly_spend: 45 },
          { user_id: 4, monthly_spend: 120 },
          { user_id: 5, monthly_spend: 60 },
          { user_id: 6, monthly_spend: 19 },
        ],
      },
      workspaceFiles: [
        { filename: 'cohorts.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT user_id, monthly_spend
FROM users;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Buckets all 3 cohorts cleanly',
          expression:
            'rows.length === 3 && rows.some((r) => r.tier === "Enterprise" && r.accounts === 1) && rows.some((r) => r.tier === "Growth" && r.accounts === 2)',
          expectedDescription: 'Counts Enterprise: 1, Growth: 2, Starter: 3',
        },
        {
          id: 't2',
          label: 'Sorts largest tier (Starter: 3) first',
          expression: 'rows[0]?.tier === "Starter" && rows[0]?.accounts === 3',
          expectedDescription: 'Orders Starter (3) -> Growth (2) -> Enterprise (1)',
        },
      ],
    },

    {
      id: 'da-m5',
      number: '05',
      title: 'Cleaning Missing Data in Python (None & Medians)',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Real analytics exports contain `None` gaps and skewed numbers (one 10,000-minute idle tab destroys a simple mean!). Learn why analysts compute the **sorted median** and impute missing `None` values cleanly.',
      keyConcepts: [
        'Filtering `None` values out before computing summary statistics',
        'Sorting valid values to extract a spike-resistant median',
        'Filling missing `None` entries with the cohort median',
      ],
      architectureNote:
        'Never replace missing metrics with `0` unless zero was truly measured—replacing `None` with the median preserves cohort size without falsely dragging averages down.',
      deliverableTitle: 'Write impute_median(values) in main.py',
      deliverablePrompt:
        'Complete `impute_median(values)` to extract sorted non-None values, pick the median `valid[len(valid) // 2]`, and return a new list replacing every `None` with that median.',
      acceptanceCriteria: [
        'Filters None values accurately before computing median',
        'Replaces missing None slots with sorted median',
        'Handles lists without None unchanged',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 05 of 12 · Null-Safe Median Imputer',
        diagram: {
          type: 'flow',
          title: 'Imputing Missing Values Without Skew',
          caption: 'Filter out None, sort the clean observations, take the middle item, and fill gaps cleanly.',
          nodes: ['Drop None & Sort', 'Middle = Median', 'Fill None Slots'],
        },
        sections: [
          {
            heading: 'Why Median Beats Mean on User Durations',
            explanation:
              'If four users spend `10, 12, 14, 15` minutes in your app and one person leaves a browser tab open for `9,000` minutes, the mean jumps to `1,810` minutes—while the sorted median stays safely at `14`!',
            codeLanguage: 'python',
            codeSnippet: 'valid = sorted([v for v in values if v is not None])\nmedian = valid[len(valid) // 2]',
          },
        ],
        liveExample: {
          title: 'Live Example: Finding a Spike-Proof Median',
          description: 'See `sorted` ignore `None` and pick the middle value cleanly.',
          code: 'vals = [10, None, 9000, 12, 14]\nvalid = sorted([v for v in vals if v is not None])\nprint("Valid:", valid, "| Median:", valid[len(valid) // 2])',
          expectedOutput: 'Valid: [10, 12, 14, 9000] | Median: 14',
        },
        commonMistake: {
          title: 'Replacing Missing Entries with Zero',
          wrongWay: '0 if v is None else v  # Fake zeros drag session averages way down!',
          rightWay: 'median if v is None else v',
          whyItHappens:
            'Missing telemetry means "unrecorded", not "0 seconds engaged".',
        },
        tryItMission:
          'Complete `impute_median(values)` returning `[median if v is None else v for v in values]`.',
      },
      knowledgeCheck: {
        question: 'Why do product analysts often prefer the median over the mean for session duration?',
        options: [
          'The median resists distortion from a few extreme idle-tab outliers',
          'The median is always smaller than every value in the list',
          'Python cannot divide by list length',
        ],
        correctIndex: 0,
        explanation: 'Sorting and picking the middle observation isolates typical behavior from extreme outliers.',
      },
      hints: [
        'Extract `valid = sorted([v for v in values if v is not None])`.',
        'Return `[]` if `len(valid) == 0`.',
        'Grab `median = valid[len(valid) // 2]` and replace each `None`.',
      ],
      referenceSolution: `def impute_median(values):
  valid = sorted([v for v in values if v is not None])
  if len(valid) == 0:
    return []
  median = valid[len(valid) // 2]
  return [median if v is None else v for v in values]

print("Imputed:", impute_median([12, None, 14, 9000, 10]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def impute_median(values):
  valid = sorted([v for v in values if v is not None])
  if len(valid) == 0:
    return []
  # TODO: Find middle median value and replace None entries cleanly
  return values

print("Imputed:", impute_median([12, None, 14, 9000, 10]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Replaces None with sorted median safely',
          expression: 'impute_median([12, None, 14, 9000, 10])[1] == 14',
          expectedDescription: 'Replaces None with median 14 despite 9000 spike',
        },
        {
          id: 't2',
          label: 'Preserves non-None values untouched',
          expression: 'impute_median([12, None, 14])[0] == 12 and impute_median([12, None, 14])[2] == 14',
          expectedDescription: 'Leaves recorded measurements unchanged',
        },
      ],
    },

    {
      id: 'da-m6',
      number: '06',
      title: 'Clamping Bot Spikes & Winsorizing Outliers',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Snap Lesson 05’s median imputation together with upper-bound **Winsorization** (`min(val, max_cap)`) so scraper spikes never break cohort durations while keeping the sample size intact.',
      keyConcepts: [
        'Combining median imputation with cap-based outlier Winsorizing',
        'Why capping (`min(val, max_cap)`) beats deleting valid users arbitrarily',
        'Preserving cohort row counts cleanly',
      ],
      architectureNote:
        'Winsorizing caps extreme spikes at a domain threshold (e.g. 60 minutes) rather than discarding rows, preserving honest cohort sample size.',
      deliverableTitle: 'Complete clean_durations(values, max_cap) in main.py',
      deliverablePrompt:
        'Impute `None` values using the sorted `median` of non-None entries, then clamp every value at `max_cap` via `min(val, max_cap)` and return the cleaned list.',
      acceptanceCriteria: [
        'Replaces None with sorted median cleanly',
        'Clamps extreme outliers at max_cap',
        'Preserves original list length accurately',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 06 of 12 · Outlier Clamp Cleaner',
        diagram: {
          type: 'flow',
          title: 'Two-Step Hygiene: Impute Then Clamp',
          caption: 'Replace missing gaps with median, then cap bot spikes at max_cap without losing sample length.',
          nodes: ['None -> median', 'min(val, max_cap)', 'Clean Cohort List'],
        },
        sections: [
          {
            heading: 'What Is Winsorization?',
            explanation:
              'Instead of deleting an outlier row completely, Winsorizing pulls extreme values back to a sensible ceiling (`min(9500, 60) -> 60`). Every user stays counted, yet bots cannot skew totals by 100x.',
            codeLanguage: 'python',
            codeSnippet: 'for v in values:\n  val = median if v is None else v\n  cleaned.append(min(val, max_cap))',
          },
        ],
        liveExample: {
          title: 'Live Example: Cleaning Durations with Cap 60',
          description: 'See `[10, None, 18, 9500, 12]` turn into `[10, 18, 18, 60, 12]`.',
          code: 'vals = [10, None, 18, 9500, 12]\nvalid = sorted([v for v in vals if v is not None])\nmed = valid[len(valid) // 2]\nprint([min(med if v is None else v, 60) for v in vals])',
          expectedOutput: '[10, 18, 18, 60, 12]',
        },
        commonMistake: {
          title: 'Computing Median AFTER Including Spikes? No—Before Clamping vs After?',
          wrongWay: 'Deleting every row > 60 shrinks sample size silently.',
          rightWay: 'cleaned.append(min(val, max_cap))  # Keeps cohort size intact!',
          whyItHappens:
            'Deleting rows changes your denominator (`len(values)`), whereas clamping keeps counts honest.',
        },
        tryItMission:
          'Complete `clean_durations(values, max_cap)` in main.py.',
      },
      knowledgeCheck: {
        question: 'Why does Winsorizing cap spikes via `min(val, max_cap)` instead of deleting those records?',
        options: [
          'It eliminates extreme numeric skew while keeping cohort sample counts intact',
          'It turns negative values into positive spikes',
          'It replaces all numbers with zero',
        ],
        correctIndex: 0,
        explanation: 'Clamping caps distortion without dropping users from cohort denominators.',
      },
      hints: [
        'Compute `valid = sorted([v for v in values if v is not None])` and `median = valid[len(valid) // 2]`.',
        'Loop over `values`, setting `val = median if v is None else v`.',
        'Append `min(val, max_cap)` into `cleaned`.',
      ],
      referenceSolution: `def clean_durations(values, max_cap):
  valid = sorted([v for v in values if v is not None])
  median = valid[len(valid) // 2]
  cleaned = []
  for v in values:
    val = median if v is None else v
    cleaned.append(min(val, max_cap))
  return cleaned

print("Cleaned:", clean_durations([10, None, 18, 9500, 12], 60))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def clean_durations(values, max_cap):
  valid = sorted([v for v in values if v is not None])
  median = valid[len(valid) // 2]
  cleaned = []
  # TODO: Impute None with median and clamp at max_cap
  return cleaned

print("Cleaned:", clean_durations([10, None, 18, 9500, 12], 60))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Imputes None using sorted median (18)',
          expression: 'clean_durations([10, None, 18, 9500, 12], 60)[1] == 18',
          expectedDescription: 'Replaces None with median 18',
        },
        {
          id: 't2',
          label: 'Clamps outlier 9500 down to max_cap (60)',
          expression: 'clean_durations([10, None, 18, 9500, 12], 60)[3] == 60',
          expectedDescription: 'Caps outlier cleanly at 60',
        },
        {
          id: 't3',
          label: 'Preserves full cohort length',
          expression: 'len(clean_durations([10, None, 18, 9500, 12], 60)) == 5',
          expectedDescription: 'Maintains original length of 5',
        },
      ],
    },

    {
      id: 'da-m7',
      number: '07',
      title: 'Measuring Relative Lift Across A/B Variants',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Product teams constantly test new onboarding pages against the old version. Compute exact conversion rates for Control vs Variant and measure **relative lift %**: `((variantRate - controlRate) / controlRate) * 100`.',
      keyConcepts: [
        'Absolute percentage point difference vs relative lift %',
        'Rounding rates to 4 decimals before computing lift',
        'Reading Control vs Variant objects cleanly',
      ],
      architectureNote:
        'Moving from `10.0%` to `12.0%` is a `+2.0` percentage-point gain, which represents a **+20.0% relative lift**. Always label which one you report!',
      deliverableTitle: 'Write computeLift(control, variant) in index.js',
      deliverablePrompt:
        'Calculate `controlRate = Number((control.conversions / control.visitors).toFixed(4))`, `variantRate = Number((variant.conversions / variant.visitors).toFixed(4))`, and `liftPct = Number((((variantRate - controlRate) / controlRate) * 100).toFixed(1))`.',
      acceptanceCriteria: [
        'Computes exact controlRate and variantRate to 4 decimals',
        'Computes relative liftPct rounded to 1 decimal',
        'Handles negative lifts cleanly when variant underperforms',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 07 of 12 · A/B Relative Lift Math',
        diagram: {
          type: 'flow',
          title: 'Calculating Relative Experiment Lift',
          caption: 'Divide each group’s conversions by visitors, then measure percentage improvement over Control.',
          nodes: ['Control Rate (0.10)', 'Variant Rate (0.12)', 'Lift = +20.0%'],
        },
        sections: [
          {
            heading: 'Absolute vs Relative Lift',
            explanation:
              'If Variant beats Control (`12%` vs `10%`), `(0.12 - 0.10) / 0.10 * 100 = +20.0%` relative lift. That single formula lets leaders compare experiments across low-conversion checkouts and high-conversion emails fairly.',
            codeLanguage: 'javascript',
            codeSnippet: 'const liftPct = Number((((variantRate - controlRate) / controlRate) * 100).toFixed(1));',
          },
        ],
        liveExample: {
          title: 'Live Example: Positive vs Negative Lift',
          description: 'Run `computeLift` in the console to verify positive gains and negative regressions.',
          code: 'function computeLift(control, variant) {\n  const controlRate = Number((control.conversions / control.visitors).toFixed(4));\n  const variantRate = Number((variant.conversions / variant.visitors).toFixed(4));\n  const liftPct = Number((((variantRate - controlRate) / controlRate) * 100).toFixed(1));\n  return { controlRate, variantRate, liftPct };\n}\nconsole.log(computeLift({ visitors: 1000, conversions: 100 }, { visitors: 1000, conversions: 120 }));',
          expectedOutput: '{ controlRate: 0.1, variantRate: 0.12, liftPct: 20 }',
        },
        commonMistake: {
          title: 'Dividing by Variant Rate Instead of Control Rate',
          wrongWay: '(variantRate - controlRate) / variantRate',
          rightWay: '(variantRate - controlRate) / controlRate',
          whyItHappens:
            'Lift measures improvement *relative to the existing Control baseline*, so `controlRate` is always the denominator.',
        },
        tryItMission:
          'Complete `computeLift(control, variant)` in index.js.',
      },
      knowledgeCheck: {
        question: 'If Control converts at `10%` (`0.10`) and Variant converts at `12%` (`0.12`), what is the relative lift?',
        options: ['+20.0%', '+2.0%', '+12.0%'],
        correctIndex: 0,
        explanation: '`(0.12 - 0.10) / 0.10 * 100 = +20.0%` relative improvement.',
      },
      hints: [
        'Compute `controlRate` and `variantRate` using `.toFixed(4)` wrapped in `Number(...)`.',
        'Compute `((variantRate - controlRate) / controlRate) * 100` wrapped in `.toFixed(1)`.',
      ],
      referenceSolution: `function computeLift(control, variant) {
  const controlRate = Number((control.conversions / control.visitors).toFixed(4));
  const variantRate = Number((variant.conversions / variant.visitors).toFixed(4));
  const liftPct = Number((((variantRate - controlRate) / controlRate) * 100).toFixed(1));
  return { controlRate, variantRate, liftPct };
}

console.log(computeLift({ visitors: 1000, conversions: 100 }, { visitors: 1000, conversions: 120 }));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function computeLift(control, variant) {
  // TODO: Return { controlRate, variantRate, liftPct }
  return { controlRate: 0, variantRate: 0, liftPct: 0 };
}

console.log(computeLift({ visitors: 1000, conversions: 100 }, { visitors: 1000, conversions: 120 }));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes +20.0% relative lift cleanly',
          expression:
            'computeLift({ visitors: 1000, conversions: 100 }, { visitors: 1000, conversions: 120 }).liftPct === 20',
          expectedDescription: '0.10 -> 0.12 computes +20.0% lift',
        },
        {
          id: 't2',
          label: 'Reports negative lift cleanly when variant drops',
          expression:
            'computeLift({ visitors: 1000, conversions: 100 }, { visitors: 1000, conversions: 85 }).liftPct === -15',
          expectedDescription: '0.10 -> 0.085 computes -15.0% lift',
        },
      ],
    },

    {
      id: 'da-m8',
      number: '08',
      title: 'Sample Size Guardrails & Statistical Discipline',
      durationMinutes: 40,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'A +50% lift on 20 visitors is pure luck—not evidence! Add a `minSamples = 500` check onto Lesson 07’s calculator inside `evaluateExperiment(control, variant, minSamples = 500)` to prevent premature shipping decisions.',
      keyConcepts: [
        'Preventing "peeking" calls on underpowered experiments',
        'Verifying BOTH arms meet `minSamples` (`control.visitors >= minSamples && variant.visitors >= minSamples`)',
        'Combining conversion lift math with statistical validity flags',
      ],
      architectureNote:
        'Requiring BOTH Control and Variant to meet minimum sample volume stops teams from calling winners based on early random noise.',
      deliverableTitle: 'Build evaluateExperiment(control, variant, minSamples = 500)',
      deliverablePrompt:
        'Return `{ controlRate, variantRate, liftPct, validSample }` where `validSample` is `true` only when BOTH `control.visitors >= minSamples` AND `variant.visitors >= minSamples`.',
      acceptanceCriteria: [
        'Computes rates and relative liftPct accurately',
        'Sets validSample: false when either group has < minSamples visitors',
        'Sets validSample: true when both groups satisfy minSamples',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 08 of 12 · Experiment Sample Guardrail',
        diagram: {
          type: 'branch-decision',
          title: 'Sample Threshold Gatekeeper',
          caption: 'Even a strong liftPct must wait if either test arm falls below minSamples.',
          nodes: ['Experiment Arms', 'Both >= minSamples?', 'Ship Evaluation', 'Wait for Data'],
        },
        sections: [
          {
            heading: 'Why Both Groups Must Meet Minimum Samples',
            explanation:
              'If Control saw 2,000 visitors and a brand-new Variant only saw 40 visitors, Variant’s conversion rate swings wildly on every single signup. Require `control.visitors >= minSamples && variant.visitors >= minSamples` before declaring any winner.',
            codeLanguage: 'javascript',
            codeSnippet: 'const validSample = control.visitors >= minSamples && variant.visitors >= minSamples;',
          },
        ],
        liveExample: {
          title: 'Live Example: Catching Underpowered Tests',
          description: 'See how a huge +50% lift gets flagged `validSample: false` on small traffic.',
          code: 'console.log("Control 1000 vs Variant 80 (min 500):", 1000 >= 500 && 80 >= 500);',
          expectedOutput: 'Control 1000 vs Variant 80 (min 500): false',
        },
        commonMistake: {
          title: 'Checking Combined Visitors Instead of Per-Arm Minimums',
          wrongWay: '(control.visitors + variant.visitors) >= minSamples',
          rightWay: 'control.visitors >= minSamples && variant.visitors >= minSamples',
          whyItHappens:
            'A 99%/1% traffic split can have 1,000 total visitors while Variant only has 10!',
        },
        tryItMission:
          'Complete `evaluateExperiment(control, variant, minSamples = 500)` returning `{ controlRate, variantRate, liftPct, validSample }`.',
      },
      knowledgeCheck: {
        question: 'If `control.visitors` is 1,200 and `variant.visitors` is 120 (`minSamples = 500`), what should `validSample` be?',
        options: ['false', 'true', 'undefined'],
        correctIndex: 0,
        explanation: 'Both groups must individually reach at least `minSamples` before the result is reliable.',
      },
      hints: [
        'Compute `controlRate`, `variantRate`, and `liftPct` cleanly just like Lesson 07.',
        'Check `const validSample = control.visitors >= minSamples && variant.visitors >= minSamples;`.',
      ],
      referenceSolution: `function evaluateExperiment(control, variant, minSamples = 500) {
  const controlRate = Number((control.conversions / control.visitors).toFixed(4));
  const variantRate = Number((variant.conversions / variant.visitors).toFixed(4));
  const liftPct = Number((((variantRate - controlRate) / controlRate) * 100).toFixed(1));
  const validSample = control.visitors >= minSamples && variant.visitors >= minSamples;
  return { controlRate, variantRate, liftPct, validSample };
}

console.log("Valid test:", evaluateExperiment({ visitors: 1000, conversions: 100 }, { visitors: 1000, conversions: 120 }, 500));
console.log("Underpowered:", evaluateExperiment({ visitors: 1000, conversions: 100 }, { visitors: 80, conversions: 12 }, 500));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function evaluateExperiment(control, variant, minSamples = 500) {
  // TODO: Compute rates, liftPct, and validSample guardrail
  return { controlRate: 0, variantRate: 0, liftPct: 0, validSample: false };
}

console.log(evaluateExperiment({ visitors: 1000, conversions: 100 }, { visitors: 1000, conversions: 120 }, 500));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Approves valid sample sizes and computes +20% lift',
          expression:
            'evaluateExperiment({ visitors: 1000, conversions: 100 }, { visitors: 1000, conversions: 120 }, 500).validSample === true && evaluateExperiment({ visitors: 1000, conversions: 100 }, { visitors: 1000, conversions: 120 }, 500).liftPct === 20',
          expectedDescription: 'validSample: true and liftPct: 20',
        },
        {
          id: 't2',
          label: 'Rejects underpowered variant under minSamples',
          expression:
            'evaluateExperiment({ visitors: 1000, conversions: 100 }, { visitors: 80, conversions: 12 }, 500).validSample === false',
          expectedDescription: 'Flags validSample: false when variant has 80 visitors',
        },
      ],
    },

    {
      id: 'da-m9',
      number: '09',
      title: 'Designing Actionable KPI & Guardrail Pairs',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'deliverable',
      lessonSummary:
        'Chasing a single KPI without a guardrail invites disaster—for instance, dropping email verification boosts signups by +30% while flooding the platform with spam refunds! Learn how analysts pair every primary KPI with a counter-metric.',
      keyConcepts: [
        'Primary target KPI (conversion, activation, retention)',
        'Counter-balancing Guardrail KPI (refund rate, churn, latency, spam)',
        'Detecting local wins that hurt long-term revenue',
      ],
      architectureNote:
        'A shipping rule is incomplete until you state BOTH what you want to lift AND what negative side effect must not worsen.',
      deliverableTitle: 'Specify Primary + Guardrail KPI Pair',
      deliverablePrompt:
        'For a new 1-click annual checkout offer, select the right guardrail counter-metric, define your ship threshold, and document why single-KPI optimization fails.',
      acceptanceCriteria: [
        'Pairs conversion lift with chargeback/refund rate guardrail',
        'Sets a concrete acceptable guardrail boundary',
        'Explains Goodhart’s Law / single-metric gaming risk',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 09 of 12 · Guardrail KPI Governance',
        diagram: {
          type: 'branch-decision',
          title: 'Primary KPI Balanced by Guardrail KPI',
          caption: 'A feature only ships when the Primary KPI improves AND the Guardrail KPI stays safe.',
          nodes: ['Variant Test', 'Lift >= +5%?', 'Refunds Flat?', 'Safe Ship'],
        },
        sections: [
          {
            heading: 'Why Single Metrics Get Gamed',
            explanation:
              'Goodhart’s Law warns: *"When a measure becomes a target, it ceases to be a good measure."* Pair checkout conversion with 14-day refund/chargeback rate so aggressive dark patterns cannot win an experiment.',
          },
        ],
        liveExample: {
          title: 'Live Example: Paired Shipping Rule',
          description: 'State a clear conditional launch rule combining both metrics.',
          code: 'Primary KPI: Checkout Conversion (+5% relative lift)\nGuardrail KPI: 14-Day Refund Rate (must stay <= +0.3 pts above Control)',
          expectedOutput: 'Balanced executive launch gate.',
        },
        commonMistake: {
          title: 'Shipping Purely on Click-Through Rate',
          wrongWay: '"Ship whichever button color gets more clicks!"',
          rightWay: '"Ship only if completed checkout lifts >= +5% AND 14-day refunds stay within guardrail."',
          whyItHappens:
            'Clickbait wording raises clicks while hurting downstream satisfaction and refunds.',
        },
        tryItMission:
          'Document your primary KPI target, select the protective guardrail metric, and explain the risk of single-metric shipping.',
      },
      knowledgeCheck: {
        question: 'Why do analytics teams pair every conversion experiment with a guardrail metric like refund rate?',
        options: [
          'To ensure short-term conversion spikes do not cause hidden churn or refund losses',
          'To slow down every engineering release unnecessarily',
          'Because SQL cannot measure conversion without refunds',
        ],
        correctIndex: 0,
        explanation: 'Guardrails protect long-term customer quality against deceptive or low-intent short-term wins.',
      },
      hints: [
        'Specify a clear numeric lift rule in the threshold box (e.g., `+5%`).',
        'Select the 14-day refund and chargeback guardrail option.',
        'Mention `refund` or `churn` in your explanation.',
      ],
      referenceSolution: `1. Ship Rule: Ship if Checkout Conversion improves by at least +5% relative lift with validSample >= 500 AND 14-day refund rate increases by no more than 0.3 percentage points.
2. Guardrail Choice: 14-day refund rate and payment dispute rate
3. Single-Metric Risk: Optimizing conversion alone rewards misleading copy that drives accidental annual charges, spiking customer refunds and churn two weeks later.`,
      deliverableFields: [
        {
          id: 'ship_rule',
          label: 'Primary KPI + Guardrail Shipping Rule',
          placeholder: 'e.g., Ship when checkout conversion lifts >= 5% and refund rate stays <= 2.0%',
          type: 'text',
          helperText: 'Include conversion and a measurable threshold.',
          validationRule: { minLength: 20, mustContain: ['conversion'], errorMessage: 'Specify your conversion ship rule.' },
        },
        {
          id: 'guardrail_choice',
          label: 'Most Critical Guardrail Metric for Checkout Tests',
          placeholder: 'Select guardrail',
          type: 'select',
          options: [
            '14-day refund rate and payment dispute rate',
            'Total CSS classes used on the footer',
            'Raw social media impressions',
          ],
          helperText: 'Choose the financial/customer trust guardrail.',
          validationRule: {
            exactOption: '14-day refund rate and payment dispute rate',
            errorMessage: 'Select 14-day refund and dispute rate.',
          },
        },
        {
          id: 'risk_note',
          label: 'Why Single-Metric Optimization Fails',
          placeholder: 'Explain what goes wrong when only conversion is tracked...',
          type: 'textarea',
          helperText: 'Explain refund/churn risks in 30+ characters.',
          validationRule: { minLength: 30, mustContain: ['refund'], errorMessage: 'Explain the refund or quality risk.' },
        },
      ],
    },

    {
      id: 'da-m10',
      number: '10',
      title: 'Diagnosing Funnel Drop-Off & Volume Impact',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Where should the product team spend engineering time next month—fixing a leaky step with 10,000 users or optimizing a tiny corner with 100 users? Write `estimate_gain(stage_users, lift_pct)` to rank fixes by **incremental new signups**.',
      keyConcepts: [
        'Multiplying audience size by rate improvement (`stage_users * (lift_pct / 100)`)',
        'Prioritizing high-volume bottlenecks over tiny edge pages',
        'Comparing percentage hype against real user volume',
      ],
      architectureNote:
        'A modest +2% fix at the top of a 20,000-user funnel yields 400 new customers—ten times more than a +20% fix on a 200-user settings screen.',
      deliverableTitle: 'Rank funnel opportunities by incremental volume impact',
      deliverablePrompt:
        'Write `estimate_gain(stage_users, base_rate, lift_pct)` computing `new_rate = base_rate * (1 + lift_pct / 100)` and returning `round(stage_users * (new_rate - base_rate), 1)` incremental conversions.',
      acceptanceCriteria: [
        'Computes exact incremental conversions accurately',
        'Prioritizes large-volume steps properly over tiny-traffic steps',
        'Returns 0.0 cleanly when lift_pct or stage_users is 0',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 10 of 12 · Impact Prioritization Calculator',
        diagram: {
          type: 'funnel-stages',
          title: 'Volume * Rate Gain = True Impact',
          caption: 'Multiplying stage volume by conversion delta tells teams which funnel leak recovers the most customers.',
          nodes: ['Stage Users (10,000)', 'Rate Delta (+0.02)', '+200 Signups Recovered'],
        },
        sections: [
          {
            heading: 'Why Impact Sizing Beats Gut Feeling',
            explanation:
              'Before pitching an A/B test, multiply the number of users entering that funnel step by the expected absolute rate lift (`stage_users * (new_rate - base_rate)`).',
            codeLanguage: 'python',
            codeSnippet: 'new_rate = base_rate * (1 + lift_pct / 100)\nreturn round(stage_users * (new_rate - base_rate), 1)',
          },
        ],
        liveExample: {
          title: 'Live Example: Comparing Two Roadmap Bets',
          description: 'Notice +10% on 10,000 users beats +50% on 500 users.',
          code: 'def gain(users, base, lift):\n  return round(users * ((base * (1 + lift / 100)) - base), 1)\nprint("Big step (+10%):", gain(10000, 0.10, 10))\nprint("Small step (+50%):", gain(500, 0.10, 50))',
          expectedOutput: 'Big step (+10%): 100.0\nSmall step (+50%): 25.0',
        },
        commonMistake: {
          title: 'Ranking Initiatives Only by Percentage Lift',
          wrongWay: '"50% > 10%, so let’s fix the tiny settings tab first!"',
          rightWay: 'Multiply by stage traffic (`stage_users`) to find absolute conversions won.',
          whyItHappens:
            'Relative percentages ignore how many people actually visit that step.',
        },
        tryItMission:
          'Complete `estimate_gain(stage_users, base_rate, lift_pct)` in main.py.',
      },
      knowledgeCheck: {
        question: 'Which roadmap fix delivers more new customers?',
        options: [
          '+10% relative lift on a 10,000-user step at 10% base rate (+100 customers)',
          '+50% relative lift on a 500-user step at 10% base rate (+25 customers)',
          'They yield the exact same volume',
        ],
        correctIndex: 0,
        explanation: 'High-volume funnel stages multiply modest percentage gains into huge absolute impact.',
      },
      hints: [
        'Compute `new_rate = base_rate * (1 + lift_pct / 100)`.',
        'Subtract `base_rate` from `new_rate` and multiply by `stage_users`.',
        'Round cleanly to 1 decimal place.',
      ],
      referenceSolution: `def estimate_gain(stage_users, base_rate, lift_pct):
  new_rate = base_rate * (1 + lift_pct / 100)
  return round(stage_users * (new_rate - base_rate), 1)

print("Gain:", estimate_gain(10000, 0.10, 10))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def estimate_gain(stage_users, base_rate, lift_pct):
  # TODO: Return incremental conversions rounded to 1 decimal
  return 0.0

print("Gain:", estimate_gain(10000, 0.10, 10))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes incremental conversions on high-traffic stage',
          expression: 'estimate_gain(10000, 0.10, 10) == 100.0',
          expectedDescription: '10,000 * 0.01 = 100.0 new signups',
        },
        {
          id: 't2',
          label: 'Handles zero lift safely',
          expression: 'estimate_gain(5000, 0.08, 0) == 0.0',
          expectedDescription: 'Zero lift yields 0.0 gain',
        },
      ],
    },

    {
      id: 'da-m11',
      number: '11',
      title: 'Executive Decision Storytelling Rules',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'deliverable',
      lessonSummary:
        'A brilliant SQL query sits ignored if your slide buries the conclusion on page 9. Structure executive memos bottom-line-up-front (BLUF): **Headline Insight -> Quantified Evidence -> Trade-off -> Recommended Action**.',
      keyConcepts: [
        'Bottom-Line-Up-Front (BLUF) headline structure',
        'Supporting recommendations with exact sample sizes and guardrails',
        'Highlighting risks or trade-offs transparently',
      ],
      architectureNote:
        'Leaders make decisions in 30 seconds—put your recommendation and exact revenue/conversion impact in the very first sentence.',
      deliverableTitle: 'Draft an Executive BLUF Recommendation',
      deliverablePrompt:
        'Turn raw experiment data (`Control: 10.0% on 1,200 visitors, Variant: 11.8% on 1,200 visitors, Refunds: flat at 1.1%`) into a crisp BLUF headline, supporting evidence bullet, and next step.',
      acceptanceCriteria: [
        'Leads with a concrete ship decision in the headline',
        'Cites exact conversion lift and guardrail stability',
        'Selects the BLUF executive communication order',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 11 of 12 · Executive Storytelling Format',
        diagram: {
          type: 'flow',
          title: 'Bottom-Line-Up-Front (BLUF) Memo Flow',
          caption: 'State the clear action headline first, then back it up with numbers, guardrails, and next steps.',
          nodes: ['1. Decision Headline', '2. Lift & Sample Data', '3. Guardrail & Next Step'],
        },
        sections: [
          {
            heading: 'Don’t Write a Mystery Novel for Executives',
            explanation:
              'Never force stakeholders to read 4 paragraphs of SQL methodology before revealing whether to ship! Lead with *"Ship Variant B: +18% conversion lift with zero refund increase"*, then show the numbers underneath.',
          },
        ],
        liveExample: {
          title: 'Live Example: Crisp BLUF Headline',
          description: 'Action + quantified lift + guardrail verdict in one scannable line.',
          code: 'Headline: Ship Variant B to 100% — +18.0% relative lift (10.0% -> 11.8%) across 2,400 visitors with refunds unchanged at 1.1%.',
          expectedOutput: 'Executive reads conclusion in 3 seconds.',
        },
        commonMistake: {
          title: 'Burying the Recommendation at the Bottom',
          wrongWay: '"First we extracted rows from Postgres, then ran Python median cleaning..."',
          rightWay: '"Recommend shipping Variant B (+18% lift, flat refunds). Evidence: n=1,200 per arm..."',
          whyItHappens:
            'Stakeholders care about the decision and evidence first; methodology belongs in an appendix.',
        },
        tryItMission:
          'Write a crisp BLUF recommendation, cite exact numbers, and pick the executive structure.',
      },
      knowledgeCheck: {
        question: 'What belongs at the very top of an executive analytics brief?',
        options: [
          'The clear recommended decision and quantified headline impact (BLUF)',
          'Raw SQL table schemas and index definitions',
          'A list of syntax errors encountered while coding',
        ],
        correctIndex: 0,
        explanation: 'Bottom-Line-Up-Front (BLUF) respects decision-makers’ time by stating the verdict and key proof immediately.',
      },
      hints: [
        'Lead with `Ship` and `+18%` (or `11.8%`) in the headline field.',
        'Reference `1.1%` refund guardrail and `1,200` sample count in evidence.',
        'Pick the BLUF order option.',
      ],
      referenceSolution: `1. Headline: Ship Variant B — +18% conversion lift (10.0% to 11.8%) with flat refunds.
2. Evidence: Across 1,200 visitors per arm (exceeding minSamples=500), checkout conversion climbed 18% while the 1.1% refund guardrail remained unchanged.
3. Structure: Headline recommendation -> Quantitative evidence & guardrails -> Next step`,
      deliverableFields: [
        {
          id: 'bluf_headline',
          label: 'BLUF Headline Verdict',
          placeholder: 'e.g., Ship Variant B: +18% relative conversion lift with flat 1.1% refunds',
          type: 'text',
          helperText: 'State action + quantified lift in one clear sentence.',
          validationRule: { minLength: 20, mustContain: ['ship'], errorMessage: 'Lead clearly with your Ship decision.' },
        },
        {
          id: 'evidence_summary',
          label: 'Quantified Evidence & Guardrail Summary',
          placeholder: 'Cite visitors per arm, rates (10.0% -> 11.8%), and flat 1.1% refund rate...',
          type: 'textarea',
          helperText: 'Include sample size and refund guardrail check (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['refund'], errorMessage: 'Include sample size and refund guardrail.' },
        },
        {
          id: 'order_choice',
          label: 'Preferred Executive Memo Structure',
          placeholder: 'Select memo structure',
          type: 'select',
          options: [
            'Headline recommendation -> Quantitative evidence & guardrails -> Next step',
            'Data cleaning code -> Database passwords -> Conclusion at the end',
            'Unordered screenshot dump without captions',
          ],
          helperText: 'Select the BLUF communication sequence.',
          validationRule: {
            exactOption: 'Headline recommendation -> Quantitative evidence & guardrails -> Next step',
            errorMessage: 'Choose the BLUF sequence starting with headline recommendation.',
          },
        },
      ],
    },

    {
      id: 'da-m12',
      number: '12',
      title: 'Capstone: Executive Growth & Experiment Decision Brief',
      durationMinutes: 50,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'rubric',
      lessonSummary:
        'Connect every piece built from Lesson 01–11—metric grain, SQL funnel conversion & `CASE` cohorts, Python median/Winsorized cleaning, sample-guarded A/B lift, guardrail KPIs, and BLUF storytelling—into your final Capstone Decision System.',
      keyConcepts: [
        'End-to-end analytics flow: Grain -> SQL Funnel -> Python Hygiene -> Experiment Gate',
        'Preventing statistical peeking, skewed outliers, and unguarded single-KPI launches',
        'Delivering executive-ready BLUF recommendations',
      ],
      architectureNote:
        'World-class Data Analysts bridge raw code and executive clarity—protecting numbers from silent skew while translating metrics into high-leverage decisions.',
      deliverableTitle: 'Submit Executive Growth & Experiment Capstone Brief',
      deliverablePrompt:
        'Author your complete Data Analyst Capstone Brief detailing: (1) SQL funnel conversion & `CASE` cohort segmentation with clear table grain, (2) Python median imputation & outlier clamping (`max_cap`), and (3) `minSamples` experiment guardrails + primary/refund KPI pairing in BLUF format.',
      acceptanceCriteria: [
        'Documents SQL funnel conversion rates, CASE cohorts, and table grain',
        'Explains median imputation and Winsorized clamping over raw means',
        'Specifies A/B minSamples guardrails, paired refund KPIs, and BLUF reporting',
        'Scores >= 80 / 100 on the Mentor Rubric to unlock your Data Analyst Certificate',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 12 of 12 · Complete Decision System Capstone',
        diagram: {
          type: 'capstone-assembly',
          title: 'Analytics Decision Pipeline',
          caption: 'Metric grain, SQL funnels, Python cleaning, and guarded A/B stats combine into trustworthy decisions.',
          nodes: ['SQL Funnel + CASE', 'Python Median + Clamp', 'A/B Guardrails + BLUF'],
        },
        sections: [
          {
            heading: 'Your Full Analyst Toolkit',
            explanation:
              'You started with table grain and denominators in Lesson 01, queried SQL funnels & `CASE` tiers, sanitized `None` spikes in Python, built A/B lift & sample guardrails in JS, and mastered BLUF storytelling.',
          },
        ],
        liveExample: {
          title: 'Live Example: Executive Decision System Brief',
          description: 'Hit all three rubric dimensions with crisp specifics.',
          code: '1. SQL & Grain: Funnel queries enforce 1-row-per-session grain using ROUND(SUM(signups)*100/SUM(sessions), 1) and CASE WHEN cohorts.\n2. Python Hygiene: Imputing None via sorted median and clamping bot spikes at max_cap preserves sample size without skew.\n3. Experiment Governance: Calls require both arms >= minSamples, pair conversion lift with refund guardrails, and ship via BLUF memos.',
          expectedOutput: 'Verified >= 80/100 Capstone Rubric Score',
        },
        commonMistake: {
          title: 'Omitting Cleaning or Guardrail Mechanics',
          wrongWay: '"We run SQL and ship whichever test wins on day 1."',
          rightWay: '"We verify grain, clean None/outliers via median clamping, enforce per-arm minSamples, and check refund guardrails before BLUF shipping."',
          whyItHappens:
            'Untreated outliers, peeking, and missing guardrails reverse winning tests after rollout.',
        },
        tryItMission:
          'Submit your >= 65-word Data Analyst Capstone Brief and click Verify & Mint Certificate.',
      },
      knowledgeCheck: {
        question: 'Which workflow guarantees trustworthy product experiment launches?',
        options: [
          'Verify grain & SQL funnels, clean outliers via median clamping, enforce per-arm minSamples, and pair lift with refund guardrails',
          'Average daily rates without checking sample size',
          'Delete outlier rows randomly without tracking',
        ],
        correctIndex: 0,
        explanation: 'End-to-end metric hygiene prevents distorted denominators, skewed means, and premature test calls.',
      },
      hints: [
        'Mention `funnel`, `case`, and `grain` in Criterion 1.',
        'Mention `median`, `none`, and `outlier` / `clamp` in Criterion 2.',
        'Mention `minsamples` / `sample`, `guardrail` / `refund`, and `bluf` in Criterion 3.',
      ],
      referenceSolution: `1. SQL Funnel & Cohort Segmentation: Every funnel report locks clear session grain first, computes weighted conversion using SUM(signups)*100/SUM(sessions), and segments users via ordered CASE WHEN tiers cleanly.
2. Python Median & Outlier Hygiene: Missing None durations are imputed with the sorted cohort median rather than zero, and bot spikes are Winsorized at max_cap so sample size remains intact without skewing means.
3. Experiment Governance & BLUF Reporting: Variant launches require both test arms to meet minSamples thresholds, pair primary conversion lift against 14-day refund guardrails, and communicate conclusions bottom-line-up-front (BLUF).`,
      rubricCriteria: [
        {
          id: 'r1',
          criterion: 'SQL Funnel Conversion & Cohort Grain',
          weight: 35,
          targetDescription:
            'Explains table grain, weighted funnel SQL math, and CASE cohort tiering.',
          requiredKeywordHints: ['funnel', 'grain', 'case'],
          minWordCount: 15,
        },
        {
          id: 'r2',
          criterion: 'Python Null Imputation & Outlier Clamping',
          weight: 35,
          targetDescription:
            'Details replacing None with sorted median and clamping outlier spikes without deleting users.',
          requiredKeywordHints: ['median', 'none', 'outlier'],
          minWordCount: 15,
        },
        {
          id: 'r3',
          criterion: 'A/B Sample Thresholds, Guardrails & BLUF',
          weight: 30,
          targetDescription:
            'Covers per-arm sample guardrails, paired refund KPIs, and BLUF executive recommendations.',
          requiredKeywordHints: ['sample', 'guardrail', 'bluf'],
          minWordCount: 15,
        },
      ],
    },
  ],
};
