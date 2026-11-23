import type { Course } from '../curriculum-types';

export const UI_UX_DESIGNER_COURSE: Course = {
  id: 'ui-ux-product-designer',
  slug: 'ui-ux-product-designer',
  track: 'Design, Growth & Social',
  level: 'Foundational',
  title: 'UI/UX Designer',
  subtitle:
    'Start from what separates UX from UI and empathy-first user flows, then master visual hierarchy, WCAG contrast math, typography measures, 8pt nested spacing, interactive states, 60-30-10 tokens, and Nielsen heuristics into an Accessible SaaS Checkout.',
  durationHours: 22,
  rating: 4.9,
  reviewCount: 4480,
  instructor: {
    name: 'Camille Laurent',
    role: 'VP of Product Design',
    organization: 'NordicGrid Studio',
  },
  thumbnailKey: 'ux-product',
  primaryMode: 'sandbox',
  primaryRuntime: 'js',
  capstoneTitle: 'Accessible SaaS Checkout & Semantic Token System',
  capstoneSummary:
    'Design and verify every piece of a friction-free SaaS checkout experience—from user flow and WCAG AA/AAA contrast validators to 8pt concentric card math, dual-coded states, and usability scripts.',
  capstoneDeliverables: [
    'Empathy-first Jobs-to-be-Done problem frame and multi-step user flow map',
    'Interactive WCAG AA/AAA relative luminance & 8pt nested radius calculators',
    'Dual-coded state specs, 60-30-10 semantic tokens, and Nielsen heuristic fixes',
    '5-Task Usability Test Script & Accessible Checkout Capstone Case Study',
  ],
  outcomes: [
    'Separate user experience strategy (UX) from surface visual craft (UI)',
    'Compute WCAG 2.1 AA/AAA luminance contrast and 8pt concentric geometry accurately',
    'Design forgiving form states, readable measures, and semantic 60-30-10 tokens',
    'Run unbiased usability tests and audit flows using Nielsen heuristics',
  ],
  modules: [
    {
      id: 'ux-m1',
      number: '01',
      title: 'What Is UX vs UI & Empathy-First Thinking',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'Great product design starts long before picking fonts or colors. Learn the difference between **UX** (how effortless a journey feels from start to finish) and **UI** (how crisp each screen looks), anchored by Jobs-to-be-Done empathy.',
      keyConcepts: [
        'UX (structure, flow, solving user friction) vs UI (visual craft, spacing, color)',
        'Writing a user-centered Problem Statement instead of jumping to features',
        'Identifying user pain points before opening a design tool',
      ],
      architectureNote:
        'Polished UI over a confusing 9-step checkout still fails users. Fix the user goal and journey friction in UX first, then elevate clarity with UI.',
      deliverableTitle: 'Frame a SaaS Checkout Problem Statement',
      deliverablePrompt:
        'A team wants to redesign their checkout modal because "it looks dated", while analytics show 42% of buyers quit when surprised by hidden annual taxes at Step 3. Distinguish UX vs UI and write an empathy-first problem statement.',
      acceptanceCriteria: [
        'Clearly distinguishes UX journey structure from UI visual polish',
        'Centers the problem statement on hidden-tax surprise pain point',
        'Avoids prescribing colors before fixing transparency',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 01 of 12 · Empathy & Problem Frame',
        diagram: {
          type: 'flow',
          title: 'UX Strategy Precedes UI Polish',
          caption: 'Understand who the user is and what blocks them (UX) before crafting visual components (UI).',
          nodes: ['User Goal & Pain', 'UX Flow Architecture', 'UI Visual Tokens'],
        },
        sections: [
          {
            heading: 'UX vs UI in One Plain Analogy',
            explanation:
              'Think of building a house: **UX** is the floor plan (putting the kitchen right next to the dining table so you don’t carry hot soup upstairs), while **UI** is the paint color, lighting, and cabinet handles.',
          },
          {
            heading: 'Starting With User Pain, Not Button Colors',
            explanation:
              'Always write a 1-sentence **Problem Statement**: *"[User] needs a way to [goal] because [real friction]."* That stops teams from re-painting broken flows.',
          },
        ],
        liveExample: {
          title: 'Live Example: Empathy-First Problem Statement',
          description: 'Focus directly on the surprise-tax checkout drop-off.',
          code: 'UX Issue: Buyers abandon at Step 3 because taxes and annual billing totals are hidden until the final screen.\nProblem Statement: Busy team leads need upfront total pricing early in checkout so they can approve purchases with confidence.',
          expectedOutput: 'Targets the 42% drop-off root cause.',
        },
        commonMistake: {
          title: 'Treating UI Redesigns as a Cure for Broken UX',
          wrongWay: '"Make the Buy button brighter yellow so people ignore hidden fees."',
          rightWay: '"Show clear pricing and tax breakdown upfront (UX), paired with crisp hierarchy (UI)."',
          whyItHappens:
            'Visual polish never fixes mistrust caused by surprise pricing.',
        },
        tryItMission:
          'Select the UX vs UI distinction, write your problem statement, and identify the primary buyer pain point.',
      },
      knowledgeCheck: {
        question: 'If buyers quit checkout because total taxes are hidden until the very last click, is that primarily a UX or UI failure?',
        options: [
          'A UX architecture & transparency failure',
          'A rounded border-radius UI issue',
          'A font-weight rendering bug',
        ],
        correctIndex: 0,
        explanation: 'Information timing and user trust across steps belong squarely to UX architecture.',
      },
      hints: [
        'Pick the option separating UX journey architecture from UI visual styling.',
        'Mention `hidden` or `tax` / `pricing` in your problem statement.',
        'Focus on transparency in the pain-point summary.',
      ],
      referenceSolution: `1. UX vs UI Distinction: UX designs the end-to-end flow, timing, and ease of accomplishing a goal; UI crafts visual hierarchy, spacing, typography, and color.
2. Problem Statement: Team buyers need upfront tax and total billing clarity on Step 1 of checkout so they never abandon in surprise at Step 3.
3. Root Friction: Hidden pricing and tax surprises erode trust late in the checkout journey.`,
      deliverableFields: [
        {
          id: 'ux_vs_ui',
          label: 'UX vs UI Core Difference',
          placeholder: 'Select distinction',
          type: 'select',
          options: [
            'UX designs the end-to-end flow and friction removal; UI crafts visual spacing, color, and typography',
            'UX only picks fonts while UI writes database SQL',
            'UX and UI mean the exact same thing',
          ],
          helperText: 'Choose the accurate distinction.',
          validationRule: {
            exactOption: 'UX designs the end-to-end flow and friction removal; UI crafts visual spacing, color, and typography',
            errorMessage: 'Separate end-to-end UX flow from surface UI styling.',
          },
        },
        {
          id: 'problem_stmt',
          label: 'Empathy-First Problem Statement',
          placeholder: 'e.g., Buyers need upfront tax and total clarity early in checkout so they approve confidently',
          type: 'textarea',
          helperText: 'Address upfront pricing/tax clarity (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['tax'], errorMessage: 'Center the problem statement on tax/pricing clarity.' },
        },
      ],
    },

    {
      id: 'ux-m2',
      number: '02',
      title: 'User Flows & Eliminating Decision Friction',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'Before sketching pixels, map the user’s journey step by step: **Entry -> Select Plan -> Account/Pay -> Confirmation**. Spot unnecessary screens, forced signups, and dead ends.',
      keyConcepts: [
        'Mapping linear happy paths plus error/recovery loops',
        'Removing premature friction (e.g., forcing email verification mid-checkout)',
        'Progressive disclosure: asking only for information needed right now',
      ],
      architectureNote:
        'Every extra step in a signup or checkout flow drops completion by 10–20%. Cut steps before beautifying them.',
      deliverableTitle: 'Streamline a 6-Step Checkout Flow',
      deliverablePrompt:
        'Audit a bloated checkout flow (`Landing -> Mandatory Survey -> Create Password -> Verify Email Code -> Billing Address -> Payment`) and eliminate low-value steps.',
      acceptanceCriteria: [
        'Identifies premature mandatory survey / forced verification friction',
        'Uses progressive disclosure to keep high-intent steps lean',
        'Preserves essential payment & confirmation clarity',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 02 of 12 · Friction-Free User Flow',
        diagram: {
          type: 'flow',
          title: 'Trimming Unnecessary Checkout Steps',
          caption: 'Defer optional onboarding surveys until AFTER payment succeeds so checkout completes effortlessly.',
          nodes: ['Select Plan', 'Single Billing Screen', 'Confirmed -> Survey'],
        },
        sections: [
          {
            heading: 'What Is Progressive Disclosure?',
            explanation:
              'Show only what helps the user complete the current decision. Asking for company size or referral surveys BEFORE someone finishes paying introduces needless friction.',
          },
        ],
        liveExample: {
          title: 'Live Example: Lean 3-Step Flow',
          description: 'Compare 6 clunky screens against 3 focused steps.',
          code: 'Before: Plan -> Survey -> Password -> Email OTP -> Address -> Card (6 screens)\nAfter: Plan -> Account + Payment -> Confirmation + Optional Onboarding (2 active screens)',
          expectedOutput: 'Cuts checkout friction dramatically.',
        },
        commonMistake: {
          title: 'Putting Onboarding Surveys in Front of Checkout',
          wrongWay: '"Ask 5 marketing questions before letting them enter a card!"',
          rightWay: '"Complete payment first, then gather optional onboarding details on the welcome screen."',
          whyItHappens:
            'High-intent buyers want to finish purchasing cleanly before answering profiling questions.',
        },
        tryItMission:
          'Select the low-friction flow change and explain what steps to defer post-purchase.',
      },
      knowledgeCheck: {
        question: 'When should optional customer-profiling questions ("How did you hear about us?") appear?',
        options: [
          'After purchase confirmation (or skipped cleanly), never blocking checkout payment',
          'As a mandatory step before showing product pricing',
          'Twice during card entry',
        ],
        correctIndex: 0,
        explanation: 'Deferring optional questions preserves checkout conversion momentum.',
      },
      hints: [
        'Pick the option that removes mandatory pre-purchase surveys/interruptions.',
        'Mention deferring the `survey` until after confirmation in your rationale.',
      ],
      referenceSolution: `1. Flow Optimization: Defer mandatory onboarding surveys and email verification gates until after payment confirmation
2. Friction Analysis: Removing the mid-checkout survey and email verification interruption cuts drop-off while letting buyers finish payment cleanly.`,
      deliverableFields: [
        {
          id: 'flow_fix',
          label: 'Highest-Impact Flow Improvement',
          placeholder: 'Select flow fix',
          type: 'select',
          options: [
            'Defer mandatory onboarding surveys and email verification gates until after payment confirmation',
            'Add a second CAPTCHA before viewing the cart',
            'Split First Name and Last Name onto two separate pages',
          ],
          helperText: 'Choose the change that removes decision friction.',
          validationRule: {
            exactOption: 'Defer mandatory onboarding surveys and email verification gates until after payment confirmation',
            errorMessage: 'Defer low-value gates until after payment succeeds.',
          },
        },
        {
          id: 'flow_notes',
          label: 'Lean Flow Rationale',
          placeholder: 'Explain why deferring survey steps lifts completion...',
          type: 'textarea',
          helperText: 'Mention deferring survey/friction (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['survey'], errorMessage: 'Explain why moving the survey post-purchase helps.' },
        },
      ],
    },

    {
      id: 'ux-m3',
      number: '03',
      title: 'Visual Hierarchy, Scannability & Whitespace',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'People do not read websites word-by-word—they **scan** them in under 2 seconds. Master visual weight (size, contrast, placement) and **whitespace** so every screen answers *"What is this?"* and *"What do I click next?"* instantly.',
      keyConcepts: [
        'Using 1 dominant focal action per card rather than 4 competing bright buttons',
        'Grouping related controls together (Gestalt proximity) with generous whitespace',
        'Creating clear primary vs secondary vs tertiary visual weights',
      ],
      architectureNote:
        'If everything on a screen shouts in bold all-caps, nothing stands out. Quiet space makes important actions unmistakable.',
      deliverableTitle: 'Fix a Cluttered Pricing Card Hierarchy',
      deliverablePrompt:
        'A pricing card currently displays 4 equal bright yellow buttons and zero padding between price and bullet features. Specify exact visual hierarchy fixes.',
      acceptanceCriteria: [
        'Reserves primary solid button style strictly for the 1 main CTA',
        'Separates groups via intentional whitespace / proximity',
        'Creates clear scale jump between price/headline and supporting copy',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 03 of 12 · Clear Visual Hierarchy',
        diagram: {
          type: 'flow',
          title: 'Guiding the Eye in 2 Seconds',
          caption: 'Strong scale contrast and clean whitespace pull attention cleanly from Title -> Price -> 1 Primary CTA.',
          nodes: ['1. Plan Headline', '2. Price & Key Bullets', '3. One Primary CTA'],
        },
        sections: [
          {
            heading: 'Whitespace Is Active Design, Not Empty Space',
            explanation:
              'Increasing margin between unrelated sections while keeping related labels close together lets users understand groupings instantaneously without needing heavy border boxes everywhere.',
          },
        ],
        liveExample: {
          title: 'Live Example: 1 Primary Action Rule',
          description: 'One strong Sun Gold CTA beats four competing loud buttons.',
          code: 'Primary Action: "Start Free Trial" (Solid Sun/Midnight CTA)\nSecondary Actions: "Compare Plans" (Ghost text link)\nSpacing: 24px gap between feature group and CTA.',
          expectedOutput: 'Instant 2-second scannability.',
        },
        commonMistake: {
          title: 'Making Every Link Look Like a Primary CTA',
          wrongWay: 'Using 4 bright primary buttons inside one pricing card.',
          rightWay: 'One primary solid CTA + quiet secondary links.',
          whyItHappens:
            'Competing bright buttons trigger decision paralysis.',
        },
        tryItMission:
          'Select the hierarchy fix and describe how whitespace + 1 primary CTA solve clutter.',
      },
      knowledgeCheck: {
        question: 'What happens when a single card features four identical bright primary-colored buttons?',
        options: [
          'Visual hierarchy collapses and users hesitate over which action matters most',
          'Users click four times faster',
          'Contrast automatically becomes WCAG AAA',
        ],
        correctIndex: 0,
        explanation: 'Reserve the high-contrast primary action style for one clear next step per group.',
      },
      hints: [
        'Pick the option reserving 1 clear primary CTA plus clean whitespace.',
        'Mention `whitespace` or `primary` CTA in your card fix.',
      ],
      referenceSolution: `1. Hierarchy Strategy: Assign one clear Primary CTA and demote secondary actions while separating groups with generous whitespace
2. Visual Rationale: Keeping one bold CTA prevents visual competition, while clear spacing groups features cleanly under the price.`,
      deliverableFields: [
        {
          id: 'hierarchy_fix',
          label: 'Best Visual Hierarchy Upgrade',
          placeholder: 'Select hierarchy fix',
          type: 'select',
          options: [
            'Assign one clear Primary CTA and demote secondary actions while separating groups with generous whitespace',
            'Put all text in bold italic 14px uppercase',
            'Remove all padding so elements touch edge-to-edge',
          ],
          helperText: 'Pick the scannable hierarchy rule.',
          validationRule: {
            exactOption: 'Assign one clear Primary CTA and demote secondary actions while separating groups with generous whitespace',
            errorMessage: 'Reserve Primary styling for one main CTA with intentional whitespace.',
          },
        },
        {
          id: 'spacing_note',
          label: 'Why Whitespace & 1 Primary CTA Help Scanners',
          placeholder: 'Explain visual grouping and focal point clarity...',
          type: 'textarea',
          helperText: 'Mention primary CTA or whitespace (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['whitespace'], errorMessage: 'Explain how whitespace organizes visual groups.' },
        },
      ],
    },

    {
      id: 'ux-m4',
      number: '04',
      title: 'WCAG AA/AAA Color Contrast Math',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Soft gray text on white cards looks trendy—and fails millions of users in sunlight or with low vision! Code `evaluateContrast(lumA, lumB)` using the WCAG formula `(lighter + 0.05) / (darker + 0.05)` to verify **4.5:1 (AA)** and **7.0:1 (AAA)**.',
      keyConcepts: [
        'WCAG formula: `(lighter + 0.05) / (darker + 0.05)`',
        'Minimum `4.5:1` contrast for body copy (AA) and `7.0:1` for enhanced readability (AAA)',
        'Symmetric comparison regardless of foreground/background order',
      ],
      architectureNote:
        'Automating contrast math in design tokens guarantees dark-mode or subtle hover states never dip below readable WCAG thresholds.',
      deliverableTitle: 'Build evaluateContrast(lumA, lumB) in index.js',
      deliverablePrompt:
        'Compute `lighter = Math.max(lumA, lumB)`, `darker = Math.min(lumA, lumB)`, `ratio = Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2))`, returning `{ ratio, passesAA: ratio >= 4.5, passesAAA: ratio >= 7.0 }`.',
      acceptanceCriteria: [
        'Handles lumA and lumB in either order symmetrically',
        'Rounds contrast ratio cleanly to 2 decimals',
        'Evaluates passesAA (>= 4.5) and passesAAA (>= 7.0) accurately',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 04 of 12 · WCAG Contrast Verifier',
        diagram: {
          type: 'contrast-ratio',
          title: 'Accessible Text Contrast Math',
          caption: 'WCAG divides lighter luminance + 0.05 by darker luminance + 0.05—requiring >= 4.5:1 for AA body text.',
          nodes: ['Aa · 15.0:1 AAA', 'Midnight on White', '2.13:1 FAIL', 'Low-Contrast Gray'],
        },
        sections: [
          {
            heading: 'The WCAG Contrast Ratio Equation',
            explanation:
              'Relative luminance runs from `0.0` (pure black) to `1.0` (pure white). Always sort lighter vs darker first with `Math.max` and `Math.min`, then calculate `(lighter + 0.05) / (darker + 0.05)`.',
            codeLanguage: 'javascript',
            codeSnippet: 'const lighter = Math.max(lumA, lumB);\nconst darker = Math.min(lumA, lumB);\nconst ratio = Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));',
          },
        ],
        liveExample: {
          title: 'Live Example: White vs Midnight Blue',
          description: 'Test high-contrast brand ink (`1.0` vs `0.02`) against pale gray (`0.8` vs `0.35`).',
          code: 'console.log("White/Midnight:", Number(((1.0 + 0.05) / (0.02 + 0.05)).toFixed(2)));\nconsole.log("Light Gray:", Number(((0.8 + 0.05) / (0.35 + 0.05)).toFixed(2)));',
          expectedOutput: 'White/Midnight: 15\nLight Gray: 2.13 (Fails AA)',
        },
        commonMistake: {
          title: 'Assuming Background Is Always Lighter',
          wrongWay: 'const ratio = (lumA + 0.05) / (lumB + 0.05);  // Fails < 1 when dark theme!',
          rightWay: 'const lighter = Math.max(lumA, lumB); const darker = Math.min(lumA, lumB);',
          whyItHappens:
            'Dark-mode Midnight cards invert foreground and background brightness.',
        },
        tryItMission:
          'Complete `evaluateContrast(lumA, lumB)` in index.js.',
      },
      knowledgeCheck: {
        question: 'What is the minimum WCAG 2.1 AA contrast ratio for normal body text?',
        options: ['4.5 : 1', '1.5 : 1', '2.0 : 1'],
        correctIndex: 0,
        explanation: 'WCAG AA mandates at least 4.5:1 contrast for standard body copy.',
      },
      hints: [
        'Use `Math.max` and `Math.min` for `lighter` and `darker`.',
        'Compute `(lighter + 0.05) / (darker + 0.05)` and round to 2 decimals.',
        'Return `{ ratio, passesAA: ratio >= 4.5, passesAAA: ratio >= 7.0 }`.',
      ],
      referenceSolution: `function evaluateContrast(lumA, lumB) {
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  const ratio = Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
  return { ratio, passesAA: ratio >= 4.5, passesAAA: ratio >= 7.0 };
}

console.log("White vs Midnight:", evaluateContrast(1.0, 0.02));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function evaluateContrast(lumA, lumB) {
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  // TODO: Compute rounded ratio and passesAA / passesAAA booleans
  const ratio = 1;
  return { ratio, passesAA: false, passesAAA: false };
}

console.log("White vs Midnight:", evaluateContrast(1.0, 0.02));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Scores White (1.0) on Midnight (0.02) as AAA (15:1)',
          expression: 'evaluateContrast(1.0, 0.02).ratio === 15 && evaluateContrast(1.0, 0.02).passesAAA === true',
          expectedDescription: 'Ratio 15, passesAA true, passesAAA true',
        },
        {
          id: 't2',
          label: 'Computes symmetrically regardless of argument order',
          expression: 'evaluateContrast(0.02, 1.0).ratio === evaluateContrast(1.0, 0.02).ratio',
          expectedDescription: 'Dark-on-light equals light-on-dark',
        },
        {
          id: 't3',
          label: 'Rejects low-contrast pair (2.13:1)',
          expression: 'evaluateContrast(0.8, 0.35).passesAA === false && evaluateContrast(0.8, 0.35).ratio === 2.13',
          expectedDescription: 'Flags 2.13 as failing AA',
        },
      ],
    },

    {
      id: 'ux-m5',
      number: '05',
      title: 'Typography Scale & Comfortable Reading Measures',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'deliverable',
      lessonSummary:
        'Even high-contrast text tires readers out if lines stretch 160 characters across a wide monitor or sit packed at `12px` with tight `1.0` line height. Learn ideal body sizes (`16px`), line heights (`1.5–1.65`), and reading measure (`60–75` characters).',
      keyConcepts: [
        'Body text floor of `16px` (`1rem`) with `1.5–1.65` line height',
        'Optimal reading width (`max-width: 65ch` / `55–75` characters per line)',
        'Consistent typographic scale jumps (H1 -> H2 -> Body -> Caption)',
      ],
      architectureNote:
        'Setting `max-w-prose` (~65 characters wide) stops eyes from losing their place when scanning back to the start of the next line.',
      deliverableTitle: 'Specify Readable Typography & Measure Tokens',
      deliverablePrompt:
        'Fix a wide desktop documentation page set in `12px` text spanning `1,300px` full-width: specify ideal line width (`ch`), body size (`px`), and why wide blocks fail readers.',
      acceptanceCriteria: [
        'Sets comfortable body size >= 16px',
        'Selects 55–75 character reading measure',
        'Explains eye-tracking fatigue across ultra-wide lines',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 05 of 12 · Readable Type & Measure',
        diagram: {
          type: 'flow',
          title: 'Anatomy of Comfortable Reading',
          caption: '16px body size + 1.6 line-height + 65ch column width makes long lessons effortless to read.',
          nodes: ['16px+ Body Type', '1.6 Line-Height', '60-75ch Measure'],
        },
        sections: [
          {
            heading: 'Why Wide Paragraphs Exhaust Eyes',
            explanation:
              'When text runs `120+` characters edge-to-edge on a monitor, readers lose track of which line comes next when their eyes snap back left. Constraining text containers to `60–75ch` keeps reading fluid.',
          },
        ],
        liveExample: {
          title: 'Live Example: Balanced Editorial Measure',
          description: 'Standard readable tokens used across top digital handbooks.',
          code: 'body-size: 16px\nline-height: 1.65\nmax-measure: 65ch (approx 620-680px)',
          expectedOutput: 'Zero squinting or lost lines.',
        },
        commonMistake: {
          title: 'Stretching Paragraphs Across 100% Monitor Width',
          wrongWay: '<p class="w-full text-xs leading-tight">...</p>',
          rightWay: '<p class="max-w-prose text-base leading-relaxed">...</p>',
          whyItHappens:
            'Tiny `12px` copy at `1,300px` width maximizes eye fatigue and bounce rates.',
        },
        tryItMission:
          'Set a readable body font size (>= 16px), select the ideal character measure, and explain wide-line eye fatigue.',
      },
      knowledgeCheck: {
        question: 'What is the ideal character measure (line length) for comfortable multi-paragraph body copy?',
        options: ['55–75 characters per line (around 65ch)', '150–200 characters full-screen', '15–20 characters'],
        correctIndex: 0,
        explanation: 'Roughly 65 characters per line minimizes eye-return tracking errors.',
      },
      hints: [
        'Enter `16` (or `16–18`) px for body font size.',
        'Select the `55–75 characters (max-w-prose)` option.',
        'Explain how ultra-wide lines make eyes lose the start of the next line.',
      ],
      referenceSolution: `1. Measure Choice: 55–75 characters per line (approx 65ch) with 1.5–1.65 line-height
2. Body Font Size: 16 px
3. Rationale: Full-width 1300px lines strain eye tracking when returning left, whereas a 65ch measure and 16px size keep reading fast and comfortable.`,
      deliverableFields: [
        {
          id: 'measure_choice',
          label: 'Optimal Reading Column Width',
          placeholder: 'Select measure',
          type: 'select',
          options: [
            '55–75 characters per line (approx 65ch) with 1.5–1.65 line-height',
            '180 characters edge-to-edge across 4K monitors',
            '10 characters per line',
          ],
          helperText: 'Pick the ideal editorial reading measure.',
          validationRule: {
            exactOption: '55–75 characters per line (approx 65ch) with 1.5–1.65 line-height',
            errorMessage: 'Select 55–75 characters per line (~65ch).',
          },
        },
        {
          id: 'body_px',
          label: 'Minimum Body Font Size (px)',
          placeholder: 'e.g., 16',
          type: 'number',
          helperText: 'Enter comfortable minimum body font size (16–20px).',
          validationRule: { minNumber: 16, maxNumber: 22, errorMessage: 'Body copy should be at least 16px.' },
        },
        {
          id: 'type_note',
          label: 'Why Ultra-Wide Lines Fail Readers',
          placeholder: 'Explain eye tracking fatigue when scanning across long lines...',
          type: 'textarea',
          helperText: 'Mention line length or eye tracking (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['line'], errorMessage: 'Explain why overly long lines hurt reading.' },
        },
      ],
    },

    {
      id: 'ux-m6',
      number: '06',
      title: 'The 8pt Spatial Grid & Nested Radius Math',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Why do cleanly engineered interfaces feel crisp without looking flashy? Because every gap uses **8pt grid increments** (`8, 16, 24, 32`) and nested buttons calculate **concentric corner curves** (`inner = outer - padding`).',
      keyConcepts: [
        'Nested radius geometry: `innerRadius = Math.max(4, outerRadius - padding)`',
        'Enforcing `8px` spacing multiples (`padding >= 8 && padding % 8 === 0`)',
        'Clamping tiny inner radii cleanly at a `4px` minimum',
      ],
      architectureNote:
        'A `24px`-radius card with `16px` padding needs an `8px` button radius (`24 - 16 = 8`) so curves track concentrically instead of pinching awkwardly.',
      deliverableTitle: 'Build computeCardGeometry(outerRadius, padding)',
      deliverablePrompt:
        'Return `{ innerRadius: Math.max(4, outerRadius - padding), aligned8pt: padding >= 8 && padding % 8 === 0 }` in index.js.',
      acceptanceCriteria: [
        'Computes exact concentric innerRadius (24 - 16 = 8)',
        'Clamps tiny or negative results safely at floor 4px',
        'Detects valid 8pt padding multiples accurately',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 06 of 12 · Spatial & Concentric Math',
        diagram: {
          type: 'flow',
          title: 'Concentric Border Radius Formula',
          caption: 'Subtract container padding from outer card radius so nested corners stay optically parallel.',
          nodes: ['outerRadius (24px)', '- padding (16px)', '= innerRadius (8px)'],
        },
        sections: [
          {
            heading: 'Why Matching Radii Pinches Corners',
            explanation:
              'If an outer card and inner button both have `rounded-2xl` (`16px`), diagonal corner padding visibly narrows. Subtracting `padding` (`outerRadius - padding`, floored at `4`) keeps corners concentric.',
            codeLanguage: 'javascript',
            codeSnippet: 'const innerRadius = Math.max(4, outerRadius - padding);\nconst aligned8pt = padding >= 8 && padding % 8 === 0;',
          },
        ],
        liveExample: {
          title: 'Live Example: Concentric Card Checks',
          description: 'Test aligned `24px / 16px` vs off-grid `16px / 14px`.',
          code: 'console.log("Aligned:", Math.max(4, 24 - 16), 16 % 8 === 0);\nconsole.log("Off-grid:", Math.max(4, 16 - 14), 14 % 8 === 0);',
          expectedOutput: 'Aligned: 8 true\nOff-grid: 4 false',
        },
        commonMistake: {
          title: 'Allowing Negative Inner Radii',
          wrongWay: 'const innerRadius = outerRadius - padding;  // Gives -8 when padding > outerRadius!',
          rightWay: 'const innerRadius = Math.max(4, outerRadius - padding);',
          whyItHappens:
            'Generous `32px` padding inside a `16px`-radius modal would turn negative without a `Math.max(4, ...)` floor.',
        },
        tryItMission:
          'Complete `computeCardGeometry(outerRadius, padding)` in index.js.',
      },
      knowledgeCheck: {
        question: 'If a modal card has `outerRadius = 24px` and `padding = 16px`, what is the concentric inner button radius?',
        options: ['8px', '24px', '40px'],
        correctIndex: 0,
        explanation: '`24 - 16 = 8px` keeps the outer and inner corner arcs concentrically aligned.',
      },
      hints: [
        'Compute `const innerRadius = Math.max(4, outerRadius - padding);`.',
        'Check `const aligned8pt = padding >= 8 && padding % 8 === 0;`.',
      ],
      referenceSolution: `function computeCardGeometry(outerRadius, padding) {
  const innerRadius = Math.max(4, outerRadius - padding);
  const aligned8pt = padding >= 8 && padding % 8 === 0;
  return { innerRadius, aligned8pt };
}

console.log(computeCardGeometry(24, 16), computeCardGeometry(16, 20));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function computeCardGeometry(outerRadius, padding) {
  // TODO: Return { innerRadius, aligned8pt }
  return { innerRadius: 0, aligned8pt: false };
}

console.log(computeCardGeometry(24, 16), computeCardGeometry(16, 20));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes concentric inner radius and 8pt alignment',
          expression: 'computeCardGeometry(24, 16).innerRadius === 8 && computeCardGeometry(24, 16).aligned8pt === true',
          expectedDescription: 'outer 24, padding 16 -> innerRadius 8, aligned8pt true',
        },
        {
          id: 't2',
          label: 'Clamps inner radius at 4px minimum',
          expression: 'computeCardGeometry(12, 16).innerRadius === 4',
          expectedDescription: 'Floors negative differences cleanly at 4px',
        },
        {
          id: 't3',
          label: 'Detects off-grid padding like 14px or 0px',
          expression: 'computeCardGeometry(24, 14).aligned8pt === false && computeCardGeometry(24, 0).aligned8pt === false',
          expectedDescription: 'Rejects non-8pt increments',
        },
      ],
    },

    {
      id: 'ux-m7',
      number: '07',
      title: 'Designing Interactive States (Error, Focus, Empty)',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'deliverable',
      lessonSummary:
        'A static mockup only shows the happy path! Real products need **Focus rings** (for keyboard navigation), **Dual-coded Errors** (icon + text, never red border alone for colorblind users), and helpful **Empty States**.',
      keyConcepts: [
        'Dual-coding errors with border + icon + plain-language recovery tip',
        'High-contrast keyboard `:focus-visible` outlines',
        'Actionable empty states instead of blank white voids',
      ],
      architectureNote:
        'Around 1 in 12 men have color-vision deficiency—a red border with no error text or icon is invisible to them!',
      deliverableTitle: 'Specify Dual-Coded Form Error & Focus States',
      deliverablePrompt:
        'Upgrade an invalid checkout card input that currently only changes the border to red: define accessible dual-coding, helpful error copy, and keyboard focus policy.',
      acceptanceCriteria: [
        'Pairs error color with explicit icon + inline recovery message',
        'Maintains visible keyboard focus rings',
        'Tells the user specifically how to fix the input',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 07 of 12 · Dual-Coded State Spec',
        diagram: {
          type: 'flow',
          title: 'Accessible Error State Anatomy',
          caption: 'Combine border color, warning icon, and plain-English fix instructions so everyone understands errors.',
          nodes: ['Border Contrast', '+ Warning Icon', '+ Clear Fix Copy'],
        },
        sections: [
          {
            heading: 'Never Use Color Alone to Communicate Meaning',
            explanation:
              'Never write *"Invalid input"* in tiny red italics alone. Pair a crisp warning icon + explicit text explaining *why* and *how to fix it* (e.g., *"Card number needs 16 digits — 2 digits missing."*).',
          },
        ],
        liveExample: {
          title: 'Live Example: Forgiving Error Spec',
          description: 'Dual-coded feedback + specific correction hint.',
          code: 'Visual: High-contrast border + AlertTriangle icon\nCopy: "Enter a valid 5-digit ZIP code (e.g. 94107)"\nFocus: 2px Ocean/Midnight focus-visible outline preserved.',
          expectedOutput: 'WCAG 1.4.1 Use of Color compliant.',
        },
        commonMistake: {
          title: 'Hiding Focus Outlines (`outline: none`) or Color-Only Errors',
          wrongWay: 'border: 1px solid red; outline: none;  /* No text, no keyboard ring! */',
          rightWay: 'focus-visible ring + warning icon + "Enter a 16-digit card number."',
          whyItHappens:
            'Keyboard users lose all awareness of where they are without focus rings.',
        },
        tryItMission:
          'Select the accessible error approach and draft clear dual-coded error copy.',
      },
      knowledgeCheck: {
        question: 'Why must a form validation error include text or an icon in addition to a red border?',
        options: [
          'Colorblind and screen-reader users cannot rely on hue alone (WCAG Use of Color)',
          'Red borders do not render in Chrome',
          'Icons shrink database tables',
        ],
        correctIndex: 0,
        explanation: 'Dual-coding ensures every user perceives and understands validation errors.',
      },
      hints: [
        'Select the option pairing icon + inline guidance + keyboard focus outline.',
        'Write helpful recovery guidance mentioning `digits` or `check` rather than blaming the user.',
      ],
      referenceSolution: `1. Accessible Error Pattern: Pair warning icon, inline recovery text, and visible keyboard focus-visible outline rather than color alone
2. Error Copy: "Card number looks incomplete — please enter all 16 digits without spaces."`,
      deliverableFields: [
        {
          id: 'state_policy',
          label: 'Compliant Validation & Focus Standard',
          placeholder: 'Select state standard',
          type: 'select',
          options: [
            'Pair warning icon, inline recovery text, and visible keyboard focus-visible outline rather than color alone',
            'Change border color only and disable outline: none for cleanliness',
            'Clear the entire form silently on error',
          ],
          helperText: 'Choose the WCAG-accessible pattern.',
          validationRule: {
            exactOption: 'Pair warning icon, inline recovery text, and visible keyboard focus-visible outline rather than color alone',
            errorMessage: 'Select icon + inline recovery text + visible focus outline.',
          },
        },
        {
          id: 'error_copy',
          label: 'Helpful Inline Error Message',
          placeholder: 'e.g., Card number needs all 16 digits — please check missing numbers',
          type: 'text',
          helperText: 'Give specific recovery instructions (20+ chars).',
          validationRule: { minLength: 20, mustContain: ['digit'], errorMessage: 'Tell the user specifically how to fix (e.g., 16 digits).' },
        },
      ],
    },

    {
      id: 'ux-m8',
      number: '08',
      title: 'The 60-30-10 Color System & Semantic Tokens',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'deliverable',
      lessonSummary:
        'Great UI systems stay calm and disciplined using **60% clean canvas** (`#FFFFFF` / neutral), **30% structural framing** (Midnight Blue / deep slate), and **10% focal action color** (Sun Gold / primary brand CTA), mapped through semantic token names.',
      keyConcepts: [
        'Why **semantic tokens** (`--surface-card`, `--action-primary`) beat raw hex literals (`--blue-700`)',
        'Enforcing the 60-30-10 visual budget so 10% accent color commands attention',
        'Separating brand structure from temporary status indicators',
      ],
      architectureNote:
        'When 40% of a page turns bright yellow, nothing feels special anymore. Holding accent color strictly around 10% makes primary CTAs pop immediately.',
      deliverableTitle: 'Define a 60-30-10 Semantic Token Palette',
      deliverablePrompt:
        'Organize a SaaS design system palette adhering to 60-30-10 proportions and semantic naming (`--bg-canvas`, `--surface-nav`, `--cta-primary`) for dark-on-light and light-on-dark readability.',
      acceptanceCriteria: [
        'Allocates ~60% neutral canvas, ~30% structural brand/surface, ~10% action accent',
        'Uses semantic role names rather than hardcoded color names',
        'Preserves >= 4.5:1 contrast across token pairs',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 08 of 12 · 60-30-10 Token Architecture',
        diagram: {
          type: 'contrast-ratio',
          title: '60 / 30 / 10 Visual Balance',
          caption: '60% calm canvas + 30% structural Midnight/Ocean + 10% Sun Gold action creates crisp focus.',
          nodes: ['60% Crisp White', 'High Contrast Ink', '30% Struct + 10% CTA', 'Semantic Tokens'],
        },
        sections: [
          {
            heading: 'Raw Color Names vs Semantic Tokens',
            explanation:
              'Never name a button background `--yellow-500` everywhere—name it `--action-primary-bg`. If your company refreshes its brand or adds high-contrast mode, updating semantic tokens works automatically everywhere.',
          },
        ],
        liveExample: {
          title: 'Live Example: 60-30-10 Semantic Map',
          description: 'Clean role-based mapping used in Apex Academy.',
          code: '60% Canvas: --surface-canvas (#FFFFFF)\n30% Structure: --surface-frame (#00205B) / --surface-accent (#003087)\n10% Action: --cta-primary (#F2A900)',
          expectedOutput: 'Instant visual restraint and clear CTA focus.',
        },
        commonMistake: {
          title: 'Overusing Accent Color on Borders, Badges & Backgrounds',
          wrongWay: 'Covering 45% of cards in bright yellow banners.',
          rightWay: 'Keeping bright accent strictly at ~10% for primary CTAs and active markers.',
          whyItHappens:
            'Overusing accent colors desensitizes attention and hurts contrast.',
        },
        tryItMission:
          'Select the semantic naming principle and enter accurate 60 / 30 / 10 allocation percentages.',
      },
      knowledgeCheck: {
        question: 'Why should engineering design tokens use semantic names like `--cta-primary` instead of `--sun-gold`?',
        options: [
          'Semantic names communicate component intent and allow theme updates without renaming variables across files',
          'CSS forbids color words in variables',
          'Semantic names automatically double font size',
        ],
        correctIndex: 0,
        explanation: 'Semantic tokens bind design purpose rather than brittle hex values.',
      },
      hints: [
        'Select the semantic token role option.',
        'Enter `10`% as the maximum accent CTA budget.',
        'Describe how keeping accents at 10% preserves primary CTA visibility.',
      ],
      referenceSolution: `1. Token Naming: Semantic role-based tokens (--surface-canvas, --surface-frame, --cta-primary) aligned to 60/30/10 hierarchy
2. Accent Budget (%): 10
3. Visual Justification: Limiting accent hue to 10% ensures the user’s eye locks immediately onto primary CTAs over the calm 60% white canvas and 30% structural frames.`,
      deliverableFields: [
        {
          id: 'token_style',
          label: 'Design Token Architecture Standard',
          placeholder: 'Select token standard',
          type: 'select',
          options: [
            'Semantic role-based tokens (--surface-canvas, --surface-frame, --cta-primary) aligned to 60/30/10 hierarchy',
            'Hardcoded inline hex styles on every div',
            'Random color names like --pretty-blue-2',
          ],
          helperText: 'Choose maintainable semantic tokenization.',
          validationRule: {
            exactOption: 'Semantic role-based tokens (--surface-canvas, --surface-frame, --cta-primary) aligned to 60/30/10 hierarchy',
            errorMessage: 'Select semantic role-based 60/30/10 tokens.',
          },
        },
        {
          id: 'accent_pct',
          label: 'Target Action Accent Share (%)',
          placeholder: 'e.g., 10',
          type: 'number',
          helperText: 'Target share of screen reserved for primary action accent (5–15%).',
          validationRule: { minNumber: 5, maxNumber: 15, errorMessage: 'Reserve roughly 10% (5–15%) for accent color.' },
        },
        {
          id: 'token_note',
          label: 'Why 10% Accent Restraint Works',
          placeholder: 'Explain visual focus and canvas breathing room...',
          type: 'textarea',
          helperText: 'Mention CTA focus or contrast (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['cta'], errorMessage: 'Explain how restraint keeps CTAs obvious.' },
        },
      ],
    },

    {
      id: 'ux-m9',
      number: '09',
      title: 'Jakob Nielsen’s Usability Heuristics in Practice',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'deliverable',
      lessonSummary:
        'Audit real products quickly using Jakob Nielsen’s timeless heuristics: **Visibility of System Status** (spinners/confirmations), **Error Prevention** (disabling double-charges), and **Consistency & Standards**.',
      keyConcepts: [
        'Visibility of System Status during payment processing',
        'Error Prevention (guarding accidental double-clicks and clearing card formatting)',
        'User Control & Freedom (clear back/cancel options without losing entered info)',
      ],
      architectureNote:
        'Preventing errors BEFORE they happen (e.g., disabling a "Pay Now" button while submitting) is always better than showing an angry apology modal afterward.',
      deliverableTitle: 'Run a Nielsen Heuristic Audit on SaaS Checkout',
      deliverablePrompt:
        'Identify violations when a checkout button stays active during a 3-second charge (allowing double billing) and wipes the form if a ZIP code fails: map exact Nielsen heuristics and design fixes.',
      acceptanceCriteria: [
        'Maps Status Visibility + Error Prevention to loading button lock',
        'Preserves typed user inputs on validation error',
        'Prevents accidental double-billing cleanly',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 09 of 12 · Nielsen Heuristic Audit',
        diagram: {
          type: 'branch-decision',
          title: 'Heuristic Error Prevention',
          caption: 'Show clear Processing status and lock duplicate clicks instead of punishing users with double charges.',
          nodes: ['Click Pay', 'Lock & Show Spinner', 'Prevent Double Charge', 'Keep Fields on Error'],
        },
        sections: [
          {
            heading: 'Top 3 Heuristics Every Checkout Needs',
            explanation:
              '1. **Visibility of System Status**: Show `"Processing payment..."` immediately on click.\n2. **Error Prevention**: Disable duplicate submits while charging.\n3. **Help Users Recover**: Never wipe 8 form fields just because 1 ZIP code digit was wrong.',
          },
        ],
        liveExample: {
          title: 'Live Example: Heuristic Audit Entry',
          description: 'Map exact broken behavior to heuristic + fix.',
          code: 'Issue: Button freezes silently -> users double-click -> double charged.\nHeuristic: Visibility of System Status + Error Prevention.\nFix: Show immediate loading spinner and disable duplicate submit.',
          expectedOutput: 'Zero accidental double charges.',
        },
        commonMistake: {
          title: 'Wiping Form Inputs on Validation Failure',
          wrongWay: 'Clearing email, name, and address when only the coupon code was invalid.',
          rightWay: 'Preserve all valid typed fields and highlight only the field needing attention.',
          whyItHappens:
            'Re-typing an entire form is the fastest way to drive checkout abandonment.',
        },
        tryItMission:
          'Select the violated heuristic pair and specify both double-click prevention and input preservation.',
      },
      knowledgeCheck: {
        question: 'Disabling a "Submit Payment" button and showing "Processing..." on click satisfies which two heuristics?',
        options: [
          'Visibility of System Status and Error Prevention',
          'Aesthetic Minimalism only',
          'Hidden Dark Patterns',
        ],
        correctIndex: 0,
        explanation: 'Users immediately see system progress while preventing accidental double submissions.',
      },
      hints: [
        'Select the Visibility of System Status + Error Prevention option.',
        'Include `spinner` (or `processing`) and `preserve` / `keep` fields in your audit fix.',
      ],
      referenceSolution: `1. Violated Heuristics: Visibility of System Status and Error Prevention
2. Checkout Fix: Show an immediate "Processing..." spinner while locking duplicate clicks to prevent double charges, and preserve all valid form inputs if one field fails validation.`,
      deliverableFields: [
        {
          id: 'heuristic_choice',
          label: 'Primary Violated Heuristics',
          placeholder: 'Select heuristics',
          type: 'select',
          options: [
            'Visibility of System Status and Error Prevention',
            'Help and Documentation only',
            'Keyboard shortcut customization',
          ],
          helperText: 'Pick the two heuristics guarding silent loading and double billing.',
          validationRule: {
            exactOption: 'Visibility of System Status and Error Prevention',
            errorMessage: 'Select Visibility of System Status and Error Prevention.',
          },
        },
        {
          id: 'heuristic_fix',
          label: 'Concrete Checkout Fix',
          placeholder: 'Describe loading spinner lock and preserving typed fields on validation error...',
          type: 'textarea',
          helperText: 'Mention spinner/lock and preserving typed fields (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['spinner'], errorMessage: 'Include loading spinner lock + preserving fields.' },
        },
      ],
    },

    {
      id: 'ux-m10',
      number: '10',
      title: 'Writing Unbiased 5-Task Usability Test Scripts',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'deliverable',
      lessonSummary:
        'Never ask users *"Do you like this green checkout button?"*—they will say yes just to be polite! Write **scenario-based tasks** (*"Try subscribing to the Pro Annual plan using a promo code"*) and silently watch where they hesitate.',
      keyConcepts: [
        'Neutral scenario tasks vs biased leading questions',
        'Asking users to think aloud without coaching them',
        'Measuring task completion rate and hesitation points',
      ],
      architectureNote:
        'Five real users uncover ~85% of critical usability flaws—if and only if you let them struggle realistically without hinting where to click.',
      deliverableTitle: 'Write an Unbiased Checkout Usability Task Prompt',
      deliverablePrompt:
        'Rewrite a biased prompt (*"Click the yellow Upgrade button in the top right to buy Pro"*) into a neutral, realistic scenario task that measures true discoverability.',
      acceptanceCriteria: [
        'Removes UI location clues ("yellow", "top right")',
        'Frames a realistic user goal rather than opinion polling',
        'Selects neutral think-aloud moderation discipline',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 10 of 12 · Unbiased Usability Script',
        diagram: {
          type: 'flow',
          title: 'Conducting Clean Usability Tests',
          caption: 'Give a realistic goal without UI hints, observe hesitations silently, and record objective success/failure.',
          nodes: ['Neutral Goal Scenario', 'Think-Aloud Silence', 'Log Friction Points'],
        },
        sections: [
          {
            heading: 'Why UI Clues Ruin Usability Tests',
            explanation:
              'If your test script tells participants *"Click the blue Billing tab"*, you haven’t tested whether real users can actually find Billing! Give them the **goal** (*"You want to switch to annual billing to save 20%"*) and stay quiet.',
          },
        ],
        liveExample: {
          title: 'Live Example: Neutral vs Leading Prompts',
          description: 'Notice how the neutral prompt reveals whether the UI works on its own.',
          code: 'Leading (BAD): "Click the yellow Upgrade button at top right."\nNeutral (GOOD): "Imagine your team needs 5 Pro seats billed annually. Show me how you would upgrade this workspace."',
          expectedOutput: 'Uncovers true navigation & discoverability gaps.',
        },
        commonMistake: {
          title: 'Guiding Users When They Pause for 3 Seconds',
          wrongWay: '"Look near the top corner—do you see the upgrade link?"',
          rightWay: '"Take your time—tell me what you expect to see or look for next."',
          whyItHappens:
            'Stepping in rescues your ego while hiding the exact flaw that hurts customers in production.',
        },
        tryItMission:
          'Select the unbiased moderation rule and write a neutral annual-upgrade scenario prompt.',
      },
      knowledgeCheck: {
        question: 'Why must a usability test prompt avoid words like "click the yellow button in the top corner"?',
        options: [
          'Giving UI placement or color hints invalidates testing whether users can actually find it',
          'Participants cannot read color words',
          'It makes the session take 3 hours',
        ],
        correctIndex: 0,
        explanation: 'Scenario tasks must test natural discoverability without coaching.',
      },
      hints: [
        'Select the neutral think-aloud moderation rule.',
        'Frame a realistic upgrade `goal` or `scenario` without mentioning button colors or corners.',
      ],
      referenceSolution: `1. Moderation Standard: Give neutral goal-based scenarios with zero UI hints and let users think aloud while observing hesitation
2. Neutral Task Prompt: "Imagine your team wants to switch to an annual Pro plan to save on upcoming renewals. Please walk me through how you would complete that change from here."`,
      deliverableFields: [
        {
          id: 'moderation_rule',
          label: 'Usability Moderation Standard',
          placeholder: 'Select standard',
          type: 'select',
          options: [
            'Give neutral goal-based scenarios with zero UI hints and let users think aloud while observing hesitation',
            'Ask "Don’t you agree this layout is super intuitive?"',
            'Point with your mouse whenever the user pauses',
          ],
          helperText: 'Pick unbiased usability testing practice.',
          validationRule: {
            exactOption: 'Give neutral goal-based scenarios with zero UI hints and let users think aloud while observing hesitation',
            errorMessage: 'Select neutral goal-based scenarios with zero UI hints.',
          },
        },
        {
          id: 'neutral_task',
          label: 'Neutral Scenario Prompt (No Color/Corner Clues)',
          placeholder: 'e.g., Imagine your team needs to switch to an annual Pro plan...',
          type: 'textarea',
          helperText: 'Frame a realistic annual upgrade scenario (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['annual'], errorMessage: 'Write a realistic annual plan task without UI hints.' },
        },
      ],
    },

    {
      id: 'ux-m11',
      number: '11',
      title: 'Responsive Breakpoints & 44px Touch Targets',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Desktop hover menus fail on phones, and tiny `28px` icon buttons cause constant mis-taps! Code `auditMobileButton(widthPx, heightPx, hasOverflow)` enforcing the WCAG/Apple/Google **44x44px touch target floor** and zero horizontal overflow.',
      keyConcepts: [
        'Minimum `44px x 44px` interactive tap targets on mobile',
        'Eliminating horizontal scrollbar clipping (`!hasOverflow`)',
        'Responsive grid collapse (`12 cols -> 4 cols` / single stack)',
      ],
      architectureNote:
        'Padding an `18px` icon up to a `44x44px` invisible hit area keeps visuals sleek while eliminating frustrating fat-finger mis-taps.',
      deliverableTitle: 'Build auditMobileButton(widthPx, heightPx, hasOverflow)',
      deliverablePrompt:
        'Return `{ accessibleTarget: widthPx >= 44 && heightPx >= 44, layoutClean: !hasOverflow, passesMobile: widthPx >= 44 && heightPx >= 44 && !hasOverflow }` in index.js.',
      acceptanceCriteria: [
        'Enforces widthPx >= 44 and heightPx >= 44',
        'Flags horizontal overflow clipping cleanly',
        'Passes 44x44 zero-overflow buttons accurately',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 11 of 12 · Mobile Tap & Overflow Validator',
        diagram: {
          type: 'branch-decision',
          title: 'Mobile Ergonomics Check',
          caption: 'Every button must offer at least 44x44px touch area and zero horizontal page overflow.',
          nodes: ['Button Spec', '>= 44x44px & No Overflow?', 'Mobile Ready', 'Fix Target/Grid'],
        },
        sections: [
          {
            heading: 'The 44px Touch Target Rule',
            explanation:
              'Average adult fingertips cover roughly `44–48px` on mobile screens. Shrinking close or checkout buttons below `44px` causes accidental back-navigation and rage taps.',
            codeLanguage: 'javascript',
            codeSnippet: 'const accessibleTarget = widthPx >= 44 && heightPx >= 44;\nconst layoutClean = !hasOverflow;\nconst passesMobile = accessibleTarget && layoutClean;',
          },
        ],
        liveExample: {
          title: 'Live Example: Auditing Small vs 44px Buttons',
          description: 'Watch a `32x32` icon button fail mobile target validation.',
          code: 'console.log("32x32:", 32 >= 44 && 32 >= 44, "48x44:", 48 >= 44 && 44 >= 44);',
          expectedOutput: '32x32: false 48x44: true',
        },
        commonMistake: {
          title: 'Checking Only Width While Leaving Height Tiny (`120x28px`)',
          wrongWay: 'widthPx >= 44  // Allows cramped 28px-tall pill buttons!',
          rightWay: 'widthPx >= 44 && heightPx >= 44',
          whyItHappens:
            'Vertical mis-taps happen easily when stacked buttons are shorter than 44px tall.',
        },
        tryItMission:
          'Complete `auditMobileButton(widthPx, heightPx, hasOverflow)` in index.js.',
      },
      knowledgeCheck: {
        question: 'What minimum dimensions ensure comfortable mobile finger touch targets without mis-taps?',
        options: ['44px × 44px', '16px × 16px', '100px × 12px'],
        correctIndex: 0,
        explanation: 'Both width and height should be at least 44px to prevent tap errors.',
      },
      hints: [
        'Check `const accessibleTarget = widthPx >= 44 && heightPx >= 44;`.',
        'Set `const layoutClean = !hasOverflow;` and `passesMobile: accessibleTarget && layoutClean`.',
      ],
      referenceSolution: `function auditMobileButton(widthPx, heightPx, hasOverflow) {
  const accessibleTarget = widthPx >= 44 && heightPx >= 44;
  const layoutClean = !hasOverflow;
  return {
    accessibleTarget,
    layoutClean,
    passesMobile: accessibleTarget && layoutClean,
  };
}

console.log(auditMobileButton(48, 44, false), auditMobileButton(120, 32, false));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function auditMobileButton(widthPx, heightPx, hasOverflow) {
  // TODO: Verify >= 44x44 tap target and !hasOverflow
  return { accessibleTarget: false, layoutClean: false, passesMobile: false };
}

console.log(auditMobileButton(48, 44, false), auditMobileButton(120, 32, false));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Approves >= 44x44px zero-overflow targets',
          expression: 'auditMobileButton(48, 44, false).passesMobile === true',
          expectedDescription: '48x44 with no overflow passes cleanly',
        },
        {
          id: 't2',
          label: 'Rejects cramped vertical height (< 44px) or clipping',
          expression:
            'auditMobileButton(120, 32, false).passesMobile === false && auditMobileButton(48, 48, true).passesMobile === false',
          expectedDescription: 'Fails 32px height and horizontal overflow',
        },
      ],
    },

    {
      id: 'ux-m12',
      number: '12',
      title: 'Capstone: Accessible SaaS Checkout Case Study',
      durationMinutes: 50,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'rubric',
      lessonSummary:
        'Combine every UI/UX craft lesson from Lessons 01–11—empathy problem framing, lean user flows, WCAG AA contrast (`>= 4.5:1`), `8pt` concentric geometry, dual-coded states, `60-30-10` semantic tokens, Nielsen heuristics, and `44px` mobile ergonomics—into a developer-ready Case Study.',
      keyConcepts: [
        'Synthesizing UX journey simplification with measurable UI token engineering',
        'Verifying accessibility quantitatively (WCAG 4.5:1, dual-coding, 44px tap targets)',
        'Communicating developer handoff specs and usability testing outcomes',
      ],
      architectureNote:
        'Senior product designers back aesthetic taste with mathematical contrast, concentric spacing rules, and observed usability metrics.',
      deliverableTitle: 'Submit Accessible Checkout Case Study',
      deliverablePrompt:
        'Present your complete SaaS Checkout Capstone Case Study covering: (1) UX flow streamlining & Nielsen heuristic fixes, (2) WCAG AA/AAA contrast (`4.5:1`), `8pt` concentric radius math (`outer - padding`), and `60-30-10` semantic tokens, and (3) Dual-coded states, `44px` mobile targets, and neutral usability testing.',
      acceptanceCriteria: [
        'Explains flow friction removal and Nielsen heuristic fixes',
        'Documents WCAG 4.5:1 contrast, 8pt concentric geometry, and 60-30-10 tokens',
        'Covers dual-coded errors, 44px mobile touch targets, and neutral usability prompts',
        'Scores >= 80 / 100 on the Mentor Rubric to earn your UI/UX Designer Certificate',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 12 of 12 · Complete UI/UX Portfolio Capstone',
        diagram: {
          type: 'capstone-assembly',
          title: 'Complete Product Design System',
          caption: 'UX empathy & flow + WCAG/8pt/60-30-10 tokens + dual-coded mobile ergonomics ship an inclusive checkout.',
          nodes: ['Flow & Heuristics', 'WCAG + 8pt + 60-30-10', 'Dual-Code + 44px Test'],
        },
        sections: [
          {
            heading: 'Look Back Across All 11 Design Pieces',
            explanation:
              'You moved from empathy-first problem framing and flow trimming up through mathematical WCAG contrast checks, 8pt nested radius equations, 60-30-10 semantic tokens, Nielsen audits, neutral usability scripts, and 44px mobile rules.',
          },
        ],
        liveExample: {
          title: 'Live Example: Portfolio Case Study Outline',
          description: 'Hit UX heuristics, mathematical UI tokens, and accessibility/testing cleanly.',
          code: '1. UX Flow & Heuristics: Deferred post-purchase surveys, added upfront tax clarity, and enforced Nielsen status visibility + click locking.\n2. Mathematical UI Tokens: Verified >= 4.5:1 WCAG AA contrast, concentric 8pt inner = outer - padding geometry, and 60-30-10 semantic tokens.\n3. States, Mobile & Testing: Enforced dual-coded icon+text errors, 44px touch targets, and neutral goal-based usability tests.',
          expectedOutput: 'Verified >= 80/100 Capstone Rubric Score',
        },
        commonMistake: {
          title: 'Submitting Only Subjective Aesthetic Adjectives',
          wrongWay: '"We made the checkout modern, sleek, and clean."',
          rightWay: '"We cut pre-checkout survey friction, verified >= 4.5:1 contrast, applied 8pt outer-padding radius math, and validated 44px touch targets with neutral usability scenarios."',
          whyItHappens:
            'Hiring managers and engineering leads look for concrete accessibility specs, heuristics, and user validation.',
        },
        tryItMission:
          'Author your >= 65-word Accessible Checkout Case Study and click Verify & Mint Certificate.',
      },
      knowledgeCheck: {
        question: 'Which handoff package bridges design and engineering with zero ambiguity?',
        options: [
          'Semantic 60-30-10 tokens verified >= 4.5:1 WCAG contrast, 8pt concentric math, dual-coded states, and 44px mobile specs',
          'Unlabeled screenshots without error states or mobile sizing',
          'Color-only error indicators',
        ],
        correctIndex: 0,
        explanation: 'Verified semantic tokens, explicit states, and responsive constraints ship cleanly to production.',
      },
      hints: [
        'Mention `flow` / `survey` and `heuristic` in Criterion 1.',
        'Mention `contrast` / `4.5`, `8pt` / `radius`, and `token` in Criterion 2.',
        'Mention `44px`, `dual-code` / `icon`, and `usability` in Criterion 3.',
      ],
      referenceSolution: `1. UX Flow & Nielsen Heuristics: We removed upfront tax surprises and deferred mandatory onboarding surveys post-purchase, then eliminated double-billing through Nielsen system status spinners and loading submit locks while preserving typed fields.
2. Verified UI Token System: Every card enforces >= 4.5:1 WCAG contrast, 8pt spacing with concentric inner = outer - padding corner radii, and semantic 60-30-10 tokens so the 10% action color maintains unmistakable focal hierarchy.
3. Inclusive States, Mobile & Usability: Errors dual-code borders with icons and recovery text, buttons enforce >= 44px touch targets without horizontal overflow, and discoverability is verified with neutral scenario usability scripts.`,
      rubricCriteria: [
        {
          id: 'r1',
          criterion: 'UX Flow Simplification & Nielsen Heuristics',
          weight: 35,
          targetDescription:
            'Covers removing flow friction, upfront pricing clarity, status spinners, and error prevention.',
          requiredKeywordHints: ['flow', 'heuristic', 'survey'],
          minWordCount: 15,
        },
        {
          id: 'r2',
          criterion: 'WCAG Contrast, 8pt Geometry & 60-30-10 Tokens',
          weight: 35,
          targetDescription:
            'Documents 4.5:1 contrast validation, 8pt concentric radius math, and semantic tokens.',
          requiredKeywordHints: ['contrast', '8pt', 'token'],
          minWordCount: 15,
        },
        {
          id: 'r3',
          criterion: 'Dual-Coded States, 44px Touch & Usability',
          weight: 30,
          targetDescription:
            'Details icon+text error states, >= 44px touch targets, and neutral usability testing.',
          requiredKeywordHints: ['44px', 'usability', 'icon'],
          minWordCount: 15,
        },
      ],
    },
  ],
};
