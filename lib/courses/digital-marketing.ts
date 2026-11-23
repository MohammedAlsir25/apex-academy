import type { Course } from '../curriculum-types';

export const DIGITAL_MARKETING_COURSE: Course = {
  id: 'digital-marketing-specialist',
  slug: 'digital-marketing-specialist',
  track: 'Design, Growth & Social',
  level: 'Intermediate',
  title: 'Digital Marketing Specialist',
  subtitle:
    'Start from full-funnel customer journeys and value propositions, then master search intent SEO, landing page CRO, CTR/CPC/CPA unit economics, ROAS & CAC payback calculators, clean UTM builders, paid bid ceilings, and lifecycle automation.',
  durationHours: 20,
  rating: 4.8,
  reviewCount: 3420,
  instructor: {
    name: 'Jordan Brooks',
    role: 'Head of Growth Marketing',
    organization: 'ScaleLoop Digital',
  },
  thumbnailKey: 'ux-product',
  primaryMode: 'sandbox',
  primaryRuntime: 'js',
  capstoneTitle: 'Profitable Omnichannel Launch & Attribution Engine',
  capstoneSummary:
    'Architect and test a complete performance marketing system—combining crisp positioning, intent-matched SEO, friction-free CRO, interactive ROAS/payback and UTM code, max-CPC bid ceilings, and lifecycle onboarding.',
  capstoneDeliverables: [
    'Full-funnel positioning, search intent mapping, and CRO friction checklist',
    'Interactive CTR/CPA, Blended ROAS, CAC payback, and UTM governance utilities',
    'Max-CPC bid ceiling calculator, A/B hypothesis rules, and budget stop-loss triggers',
    'Omnichannel Launch & Attribution Capstone Brief graded on the Mentor Rubric',
  ],
  outcomes: [
    'Map customer Awareness, Consideration, Conversion, and Retention journeys cleanly',
    'Calculate CTR, CPC, CPA, blended ROAS, and gross-margin CAC payback in code',
    'Standardize UTM tracking links and paid search/social bid ceilings',
    'Design behavioral email lifecycle flows and disciplined A/B offer tests',
  ],
  modules: [
    {
      id: 'dm-m1',
      number: '01',
      title: 'Customer Journey & Full-Funnel Foundations',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'Throwing ad budget at strangers who don’t even know they have a problem wastes money fast. Map the 4 core funnel stages—**Awareness -> Consideration -> Conversion -> Retention**—so every campaign matches buyer readiness.',
      keyConcepts: [
        'Matching message depth to Awareness vs Conversion intent',
        'Why pouring traffic into a leaky landing page wastes acquisition spend',
        'Retention as the multiplier of customer lifetime value',
      ],
      architectureNote:
        'Fix mid-funnel conversion leaks BEFORE scaling top-of-funnel ad spend—otherwise you pay twice as much to lose buyers at checkout.',
      deliverableTitle: 'Map Channel Tactics Across Funnel Stages',
      deliverablePrompt:
        'A SaaS startup is running hard "Buy Annual Plan Now" cold ads while having a broken onboarding email and zero educational guides. Sequence the funnel cleanly.',
      acceptanceCriteria: [
        'Separates top-of-funnel discovery from bottom-of-funnel purchase intent',
        'Prioritizes fixing conversion/onboarding leaks before scaling cold ads',
        'Connects retention to sustainable acquisition',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 01 of 12 · Full-Funnel Map',
        diagram: {
          type: 'funnel-stages',
          title: 'The 4-Stage Growth Funnel',
          caption: 'Align educational hooks at Awareness, proof at Consideration, frictionless offers at Conversion, and activation at Retention.',
          nodes: ['Awareness (Reach)', 'Consideration (Proof)', 'Conversion & Retention'],
        },
        sections: [
          {
            heading: 'Right Message, Right Moment',
            explanation:
              'Asking a cold scroller to immediately sign a `$1,200` annual contract rarely works. **Awareness** introduces the painful problem; **Consideration** proves your solution works; **Conversion** removes checkout friction; **Retention** keeps users renewing.',
          },
        ],
        liveExample: {
          title: 'Live Example: Stage-Aligned Assets',
          description: 'Match each funnel stage to its proper asset.',
          code: 'Awareness: Short workflow video solving daily headache\nConsideration: Comparison guide & customer ROI proof\nConversion: Clear pricing page + trial CTA\nRetention: Behavior-triggered Day 1 activation email',
          expectedOutput: 'Cohesive stage-by-stage progression.',
        },
        commonMistake: {
          title: 'Pouring Cold Ad Spend Into a Leaky Funnel',
          wrongWay: '"Conversion is 0.4% — let’s triple Facebook ad spend today!"',
          rightWay: '"Pause scaling spend, repair landing page clarity & onboarding activation first."',
          whyItHappens:
            'Scaling spend into a broken funnel multiplies wasted customer acquisition cost.',
        },
        tryItMission:
          'Select the smart funnel order and identify which leak to fix first.',
      },
      knowledgeCheck: {
        question: 'If a landing page converts only 0.4% of visitors and onboarding fails, what should a growth marketer do first?',
        options: [
          'Fix landing page clarity and activation leaks before scaling cold ad spend',
          'Triple cold paid ad budget immediately',
          'Delete UTM tracking tags',
        ],
        correctIndex: 0,
        explanation: 'Repairing conversion leaks improves return on every future dollar of ad spend.',
      },
      hints: [
        'Select the fix-leaks-before-scaling strategy.',
        'Mention `awareness`, `consideration`, or `retention` in your stage plan.',
      ],
      referenceSolution: `1. Funnel Priority: Repair landing page conversion clarity and onboarding retention before scaling cold Awareness spend
2. Stage Plan: Use educational Awareness guides to introduce the pain, ROI case studies for Consideration, transparent pricing for Conversion, and Day-1 activation triggers for Retention.`,
      deliverableFields: [
        {
          id: 'funnel_priority',
          label: 'Immediate Funnel Priority',
          placeholder: 'Select priority',
          type: 'select',
          options: [
            'Repair landing page conversion clarity and onboarding retention before scaling cold Awareness spend',
            'Double cold ad budget and ignore onboarding drop-off',
            'Send annual billing invoices to strangers',
          ],
          helperText: 'Select disciplined growth sequencing.',
          validationRule: {
            exactOption: 'Repair landing page conversion clarity and onboarding retention before scaling cold Awareness spend',
            errorMessage: 'Fix conversion and retention leaks before scaling cold spend.',
          },
        },
        {
          id: 'stage_plan',
          label: '4-Stage Funnel Alignment',
          placeholder: 'Describe assets across Awareness, Consideration, Conversion, and Retention...',
          type: 'textarea',
          helperText: 'Mention Consideration or Retention cleanly (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['retention'], errorMessage: 'Include Retention alongside top/mid-funnel steps.' },
        },
      ],
    },

    {
      id: 'dm-m2',
      number: '02',
      title: 'Positioning, Value Props & Audience Pain Points',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'Clever slogans (*"Reimagine Synergy Forever"*) make visitors squint and hit Back. Write crisp **benefit-led positioning**: **Who it is for + Exact painful problem solved + Quantified outcome**.',
      keyConcepts: [
        'Clarity beats cleverness above the fold',
        'Leading with user outcomes rather than vague internal buzzwords',
        'Anchoring copy to one clear target buyer persona',
      ],
      architectureNote:
        'If a first-time visitor cannot tell what your product does and why it helps them within 5 seconds, paid clicks evaporate instantly.',
      deliverableTitle: 'Rewrite a Buzzword Headline into Clear Value Positioning',
      deliverablePrompt:
        'Replace *"Next-Gen Paradigm AI Synergy Platform"* for an automated expense-tracking tool aimed at freelance designers into a clear 5-second value headline + subhead.',
      acceptanceCriteria: [
        'Names the specific target audience clearly',
        'States tangible outcome (e.g., save hours / track expenses)',
        'Avoids empty corporate buzzwords',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 02 of 12 · Clear Value Proposition',
        diagram: {
          type: 'flow',
          title: 'The 5-Second Headline Formula',
          caption: 'Pair Target Persona + Specific Pain + Measurable Benefit so strangers immediately nod "This is for me".',
          nodes: ['Target Persona', 'Concrete Benefit', 'Instant Relevance'],
        },
        sections: [
          {
            heading: 'Features Tell, Outcomes Sell',
            explanation:
              'Saying *"SQL-backed receipt ingestion"* describes plumbing. Saying *"Track client expenses in 2 minutes a week without spreadsheets"* describes the outcome your customer happily pays for.',
          },
        ],
        liveExample: {
          title: 'Live Example: Concrete SaaS Positioning',
          description: 'Specific audience + time/money outcome.',
          code: 'Headline: Automatic Expense & Tax Tracking Built for Freelance Designers\nSubhead: Snap receipts and export tax-ready totals in 2 minutes a week—zero spreadsheets required.',
          expectedOutput: 'Crystal clear in under 5 seconds.',
        },
        commonMistake: {
          title: 'Writing Vague Slogans That Fit Any Company',
          wrongWay: '"Unlock Tomorrow’s Productivity Synergy Today."',
          rightWay: '"Track Client Expenses in 2 Minutes a Week—Built for Freelance Designers."',
          whyItHappens:
            'Generic slogans force visitors to work hard just to figure out what you sell.',
        },
        tryItMission:
          'Select the benefit-led positioning rule and write a crystal-clear headline for freelance designers.',
      },
      knowledgeCheck: {
        question: 'Which hero headline passes the "5-Second Clarity Test" for an expense app?',
        options: [
          '"Automatic Expense & Tax Tracking Built for Freelance Designers"',
          '"Reimagine Tomorrow’s Holistic Workspace"',
          '"Enterprise Cloud Synergy 4.0"',
        ],
        correctIndex: 0,
        explanation: 'It immediately names both who it serves and what concrete job it performs.',
      },
      hints: [
        'Pick the target audience + concrete outcome rule.',
        'Include `freelance` or `designer` and `expense` / `receipt` in your headline.',
      ],
      referenceSolution: `1. Positioning Principle: Name the exact target persona and concrete outcome rather than generic buzzwords
2. Value Headline: Automated Expense & Tax Tracking Built for Freelance Designers — categorize receipts in 2 minutes a week without spreadsheets.`,
      deliverableFields: [
        {
          id: 'pos_rule',
          label: 'Strongest Positioning Formula',
          placeholder: 'Select positioning rule',
          type: 'select',
          options: [
            'Name the exact target persona and concrete outcome rather than generic buzzwords',
            'Use abstract metaphors so everyone has to click About Us',
            'Hide the product category until Pricing',
          ],
          helperText: 'Pick the high-converting positioning rule.',
          validationRule: {
            exactOption: 'Name the exact target persona and concrete outcome rather than generic buzzwords',
            errorMessage: 'Pair specific target persona with concrete outcome.',
          },
        },
        {
          id: 'hero_copy',
          label: 'Rewritten Hero Headline & Subhead',
          placeholder: 'Write clear positioning for freelance designers tracking expenses...',
          type: 'textarea',
          helperText: 'Include designers/freelance and expense/tax (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['expense'], errorMessage: 'State the clear expense tracking benefit clearly.' },
        },
      ],
    },

    {
      id: 'dm-m3',
      number: '03',
      title: 'Search Intent & On-Page SEO Structure',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'Not all Google searches want the same page! **Informational queries** (*"how to calculate ROAS"*) belong on educational guides, while **Transactional queries** (*"best B2B analytics software pricing"*) belong on high-converting product pages.',
      keyConcepts: [
        'Informational vs Commercial vs Transactional search intent',
        'Structuring 1 clear `<h1>`, descriptive `<title>`, and clean `/slug` URLs',
        'Matching page format to what searchers actually want to accomplish',
      ],
      architectureNote:
        'Sending someone searching *"what is ROAS formula"* straight to a hard-sell credit card checkout page bounces immediately—give them the guide + gentle CTA!',
      deliverableTitle: 'Match Search Queries to Intent & On-Page SEO',
      deliverablePrompt:
        'Classify the query `"best SaaS billing software pricing"` vs `"how to calculate SaaS churn"`, choose the right destination page type for each, and craft an intent-matched `<title>` tag.',
      acceptanceCriteria: [
        'Maps pricing query to Transactional product/pricing page',
        'Maps how-to query to Informational educational guide',
        'Crafts a focused <title> tag under 60 characters',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 03 of 12 · Search Intent & SEO Structure',
        diagram: {
          type: 'branch-decision',
          title: 'Routing Search Intent to Page Format',
          caption: 'Aligning query intent with the right page format keeps bounce rates low and organic conversions high.',
          nodes: ['Search Query', 'Wants Guide or Buy?', 'Info Guide + Soft CTA', 'Product / Pricing Page'],
        },
        sections: [
          {
            heading: 'Respecting Searcher Intent',
            explanation:
              'Google ranks pages that satisfy the searcher’s exact goal. Match `"how to..."` with clear step-by-step guides, and match `"...pricing"` or `"...software"` with clean comparison and product landing pages.',
          },
        ],
        liveExample: {
          title: 'Live Example: Intent-Matched Title Tags',
          description: 'Concise, clear `<title>` tags under 60 characters.',
          code: 'Informational: "How to Calculate SaaS Churn (Formula + Examples)"\nTransactional: "Automated SaaS Billing Software & Plans | ScaleLoop"',
          expectedOutput: 'High organic CTR and satisfied search intent.',
        },
        commonMistake: {
          title: 'Stuffing Keywords Into Unrelated Pages',
          wrongWay: 'Shoving a 3,000-word dictionary essay onto the Checkout Pricing page.',
          rightWay: 'One clean intent per URL with focused H1 and sub-60-char title.',
          whyItHappens:
            'Mixed intent confuses both Google crawlers and impatient visitors.',
        },
        tryItMission:
          'Match the search intent rule and craft a sub-60-character `<title>` for a SaaS billing pricing query.',
      },
      knowledgeCheck: {
        question: 'Which destination page best matches the Google search `"how to calculate SaaS churn"`?',
        options: [
          'An educational Informational guide with the formula, examples, and soft CTA',
          'A credit card payment form with zero explanation',
          'A Terms of Service PDF',
        ],
        correctIndex: 0,
        explanation: 'Users searching "how to" want clear learning answers first before evaluating tools.',
      },
      hints: [
        'Select the Informational-guide vs Transactional-pricing matching option.',
        'Keep your `<title>` tag crisp and include `Pricing` or `Billing`.',
      ],
      referenceSolution: `1. Intent Mapping: Send "how to" queries to Informational educational guides and "pricing" queries to Transactional product pages
2. SEO Title Tag: SaaS Billing Software Pricing & Plans | ApexPay`,
      deliverableFields: [
        {
          id: 'intent_match',
          label: 'Intent-to-Page Routing Strategy',
          placeholder: 'Select routing rule',
          type: 'select',
          options: [
            'Send "how to" queries to Informational educational guides and "pricing" queries to Transactional product pages',
            'Send all Google queries strictly to the login screen',
            'Use identical H1 titles across every page on the site',
          ],
          helperText: 'Match searcher intent accurately.',
          validationRule: {
            exactOption: 'Send "how to" queries to Informational educational guides and "pricing" queries to Transactional product pages',
            errorMessage: 'Match informational queries to guides and transactional queries to pricing/product pages.',
          },
        },
        {
          id: 'seo_title',
          label: 'Transactional <title> Tag (< 60 chars)',
          placeholder: 'e.g., Automated SaaS Billing Software Pricing & Plans',
          type: 'text',
          helperText: 'Include Pricing or Billing cleanly (20–60 chars).',
          validationRule: { minLength: 20, mustContain: ['pricing'], errorMessage: 'Include pricing intent clearly in your title tag.' },
        },
      ],
    },

    {
      id: 'dm-m4',
      number: '04',
      title: 'Landing Page CRO & Friction Audits',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'deliverable',
      lessonSummary:
        'A **2% conversion lift** doubles your marketing ROI without spending one extra cent on ads! Master **Conversion Rate Optimization (CRO)**: **Message Match** (headline mirrors the ad clicked), **Social Proof** near the CTA, and cutting leaky nav distractors.',
      keyConcepts: [
        'Ad-to-Landing-Page Message Match keeping bounce rates low',
        'Removing top navigation exit links on dedicated paid campaign pages',
        'Placing specific customer proof & security cues right beside the CTA',
      ],
      architectureNote:
        'Every unessential link in a paid landing page header ("Blog", "Careers", "Press") leaks expensive clicked traffic away from converting.',
      deliverableTitle: 'Design a High-Converting Paid Landing Page Spec',
      deliverablePrompt:
        'Audit a paid ad landing page promising *"Automated Invoice Sync in 60 Seconds"* that currently drops visitors onto a generic homepage with 12 header links and zero social proof.',
      acceptanceCriteria: [
        'Mirrors the ad promise directly in the hero H1 (Message Match)',
        'Strips leaky top navigation links cleanly on dedicated landing pages',
        'Adds specific customer proof near the primary CTA',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 04 of 12 · Landing Page CRO Spec',
        diagram: {
          type: 'flow',
          title: 'High-Signal Landing Page Anatomy',
          caption: 'Ad Promise -> Identical Hero Headline -> Customer Proof -> Focused 1-CTA Conversion.',
          nodes: ['Ad Promise Match', 'Minimal Header', 'Proof + Primary CTA'],
        },
        sections: [
          {
            heading: 'Why Message Match Eliminates Instant Bounces',
            explanation:
              'When someone clicks an ad reading *"Automated Invoice Sync in 60 Seconds"* and lands on a generic page reading *"Welcome to FutureCorp"*, they assume they clicked the wrong link and hit Back within 2 seconds.',
          },
        ],
        liveExample: {
          title: 'Live Example: Paid CRO Fix',
          description: 'Dedicated landing page matching ad promise + social proof.',
          code: 'H1: Sync Invoices Automatically in 60 Seconds\nHeader: Logo only (remove 12 top navigation links)\nProof: "Used by 1,400+ finance teams · SOC2 Verified" beside Trial CTA',
          expectedOutput: 'Instant relevance + zero leaky nav exits.',
        },
        commonMistake: {
          title: 'Sending Expensive Paid Clicks to the Generic Homepage',
          wrongWay: 'Pointing Google Ads directly at `/` filled with Careers and Blog links.',
          rightWay: 'Dedicated campaign landing page with exact H1 message match and zero distractions.',
          whyItHappens:
            'Homepages serve 5 audiences at once; paid ads perform best on single-goal pages.',
        },
        tryItMission:
          'Draft the CRO fix mirroring the ad promise, choose the navigation policy, and explain message match.',
      },
      knowledgeCheck: {
        question: 'Why do dedicated paid ad landing pages hide top navigation bars like "Careers" and "Blog"?',
        options: [
          'To eliminate distracting exit paths so paid visitors stay focused on one conversion action',
          'Because CSS navbars slow down checkout forms',
          'To hide company contact details completely',
        ],
        correctIndex: 0,
        explanation: 'Reducing attention ratio and exit links keeps paid traffic focused on the target offer.',
      },
      hints: [
        'Describe matching the `invoice` / `60 seconds` promise in your H1 plus social proof near the CTA.',
        'Pick the option removing distracting top navigation links.',
      ],
      referenceSolution: `1. CRO Plan: Mirror "Automated Invoice Sync in 60 Seconds" as the exact hero H1 alongside verified customer proof right next to the primary CTA.
2. Navigation Policy: Dedicated single-goal landing page removing leaky top navigation links`,
      deliverableFields: [
        {
          id: 'cro_plan',
          label: 'Message Match & Proof Plan',
          placeholder: 'Describe hero H1 message match and customer proof placement...',
          type: 'textarea',
          helperText: 'Address message match / H1 and proof near CTA (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['proof'], errorMessage: 'Include H1 message match and social proof near CTA.' },
        },
        {
          id: 'nav_policy',
          label: 'Paid Campaign Header Policy',
          placeholder: 'Select header policy',
          type: 'select',
          options: [
            'Dedicated single-goal landing page removing leaky top navigation links',
            'Send all paid clicks to the general homepage with 15 menu links',
            'Open 3 popups as soon as the page loads',
          ],
          helperText: 'Pick the proven CRO navigation approach.',
          validationRule: {
            exactOption: 'Dedicated single-goal landing page removing leaky top navigation links',
            errorMessage: 'Remove distracting top nav links on dedicated paid landing pages.',
          },
        },
      ],
    },

    {
      id: 'dm-m5',
      number: '05',
      title: 'Unit Economics 101: CTR, CPC, CVR & CPA',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Every marketing channel speaks four universal numbers: **CTR** (`clicks / impressions`), **CPC** (`spend / clicks`), **CVR** (`conversions / clicks`), and **CPA** (`spend / conversions`). Code a unit-economics calculator guarding zero denominators cleanly!',
      keyConcepts: [
        'CTR % = `(clicks / impressions) * 100`',
        'CPC = `spend / clicks` and CVR % = `(conversions / clicks) * 100`',
        'CPA = `spend / conversions` (or `null` when conversions equal 0)',
      ],
      architectureNote:
        'High CTR means nothing if landing page CVR is `0.1%`! Tracking all four metrics together pinpoints whether the ad or the landing page broke.',
      deliverableTitle: 'Build computeFunnelMetrics(impressions, clicks, spend, conversions)',
      deliverablePrompt:
        'Return `{ ctrPct, cpc, cvrPct, cpa }` rounded cleanly to 2 decimals, guarding `impressions === 0`, `clicks === 0`, and `conversions === 0` (`cpa: null`).',
      acceptanceCriteria: [
        'Calculates CTR%, CPC, CVR%, and CPA accurately',
        'Guards zero clicks and zero conversions safely without NaN/Infinity',
        'Rounds metrics cleanly to 2 decimals',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 05 of 12 · Paid Funnel Economics Calculator',
        diagram: {
          type: 'flow',
          title: 'Connecting Ad Clicks to Acquisition Cost',
          caption: 'Impressions -> (CTR) -> Clicks -> (CVR) -> Customers, translating ad spend into real CPA.',
          nodes: ['CTR = Clicks/Impr', 'CPC = Spend/Clicks', 'CPA = Spend/Conv'],
        },
        sections: [
          {
            heading: 'Diagnosing Ad Creative vs Landing Page',
            explanation:
              'Low **CTR** means your ad headline didn’t catch attention. High CTR combined with low **CVR** means the ad worked, yet your landing page failed to convert!',
            codeLanguage: 'javascript',
            codeSnippet: 'const ctrPct = impressions > 0 ? Number(((clicks / impressions) * 100).toFixed(2)) : 0;\nconst cpa = conversions > 0 ? Number((spend / conversions).toFixed(2)) : null;',
          },
        ],
        liveExample: {
          title: 'Live Example: Checking Campaign CPA',
          description: '10,000 impressions, 200 clicks, $400 spend, 10 conversions -> CTR 2%, CPC $2, CVR 5%, CPA $40.',
          code: 'console.log("CPA:", 400 / 10, "CPC:", 400 / 200);',
          expectedOutput: 'CPA: 40 CPC: 2',
        },
        commonMistake: {
          title: 'Dividing by Zero When a New Campaign Has 0 Conversions',
          wrongWay: 'const cpa = spend / conversions;  // Produces Infinity!',
          rightWay: 'const cpa = conversions > 0 ? Number((spend / conversions).toFixed(2)) : null;',
          whyItHappens:
            'Brand-new campaigns often spend money before recording their first signup.',
        },
        tryItMission:
          'Complete `computeFunnelMetrics(impressions, clicks, spend, conversions)` in index.js.',
      },
      knowledgeCheck: {
        question: 'If an ad achieves a strong 4.5% CTR yet landing page CVR is 0.2%, where is the bottleneck?',
        options: [
          'On the landing page (CRO / offer / message match), not ad click appeal',
          'Impressions are too high',
          'CPC must be rounded to 4 decimals',
        ],
        correctIndex: 0,
        explanation: 'High CTR proves people wanted the ad promise; low CVR shows the landing page failed to deliver.',
      },
      hints: [
        'Guard `impressions > 0` for `ctrPct`.',
        'Guard `clicks > 0` for `cpc` and `cvrPct`.',
        'Guard `conversions > 0` returning `null` for `cpa` when 0.',
      ],
      referenceSolution: `function computeFunnelMetrics(impressions, clicks, spend, conversions) {
  const ctrPct = impressions > 0 ? Number(((clicks / impressions) * 100).toFixed(2)) : 0;
  const cpc = clicks > 0 ? Number((spend / clicks).toFixed(2)) : 0;
  const cvrPct = clicks > 0 ? Number(((conversions / clicks) * 100).toFixed(2)) : 0;
  const cpa = conversions > 0 ? Number((spend / conversions).toFixed(2)) : null;
  return { ctrPct, cpc, cvrPct, cpa };
}

console.log(computeFunnelMetrics(10000, 200, 400, 10));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function computeFunnelMetrics(impressions, clicks, spend, conversions) {
  // TODO: Compute ctrPct, cpc, cvrPct, and zero-guarded cpa
  return { ctrPct: 0, cpc: 0, cvrPct: 0, cpa: null };
}

console.log(computeFunnelMetrics(10000, 200, 400, 10));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes CTR, CPC, CVR, and CPA cleanly',
          expression:
            'computeFunnelMetrics(10000, 200, 400, 10).ctrPct === 2 && computeFunnelMetrics(10000, 200, 400, 10).cpc === 2 && computeFunnelMetrics(10000, 200, 400, 10).cvrPct === 5 && computeFunnelMetrics(10000, 200, 400, 10).cpa === 40',
          expectedDescription: 'Computes 2% CTR, $2 CPC, 5% CVR, $40 CPA',
        },
        {
          id: 't2',
          label: 'Guards zero conversions returning null CPA cleanly',
          expression: 'computeFunnelMetrics(1000, 50, 100, 0).cpa === null',
          expectedDescription: 'Returns cpa: null instead of Infinity on 0 conversions',
        },
      ],
    },

    {
      id: 'dm-m6',
      number: '06',
      title: 'Profit Math: Blended ROAS, CAC & Payback Period',
      durationMinutes: 40,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'A 3.0x Return on Ad Spend (`revenue / adSpend`) sounds great—until you realize your **gross margin** leaves you losing cash for 14 months! Code `evaluateCampaignEconomics(adSpend, revenue, newCustomers, monthlyMargin)` checking both **ROAS >= 3** AND **CAC Payback <= 6 months**.',
      keyConcepts: [
        'ROAS (`revenue / adSpend`) vs true CAC (`adSpend / newCustomers`)',
        'Payback Months (`cac / monthlyMargin`) determining cash recovery speed',
        'Requiring BOTH ROAS >= 3 and Payback <= 6 months before scaling',
      ],
      architectureNote:
        'Revenue is vanity; gross-margin payback speed keeps SaaS and e-commerce growth cash-flow positive.',
      deliverableTitle: 'Build evaluateCampaignEconomics(...) in index.js',
      deliverablePrompt:
        'Compute `roas = adSpend > 0 ? Number((revenue / adSpend).toFixed(2)) : 0`, guard `newCustomers === 0` (`cac: null, paybackMonths: null, profitable: false`), else compute `cac`, `paybackMonths`, and `profitable: roas >= 3 && paybackMonths <= 6`.',
      acceptanceCriteria: [
        'Computes exact ROAS, CAC, and paybackMonths to 2 decimals',
        'Approves profitable: true only when roas >= 3 AND paybackMonths <= 6',
        'Handles zero newCustomers safely returning null metrics',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 06 of 12 · ROAS & Payback Profit Engine',
        diagram: {
          type: 'branch-decision',
          title: 'True Marketing Profitability Gate',
          caption: 'Pass profitability only when BOTH top-line ROAS >= 3.0x AND cash payback <= 6 months.',
          nodes: ['Campaign Data', 'ROAS>=3 & Payback<=6?', 'Scale Profitably', 'Pause / Optimize'],
        },
        sections: [
          {
            heading: 'Why High ROAS Can Still Lose Cash',
            explanation:
              'If a customer pays `$100/mo` with `$40/mo` gross margin after server/support costs (`monthlyMargin = 40`), and your CAC is `$400`, it takes `400 / 40 = 10` months just to break even!',
            codeLanguage: 'javascript',
            codeSnippet: 'const cac = Number((adSpend / newCustomers).toFixed(2));\nconst paybackMonths = Number((cac / monthlyMargin).toFixed(2));\nconst profitable = roas >= 3 && paybackMonths <= 6;',
          },
        ],
        liveExample: {
          title: 'Live Example: Fast Payback vs Slow Payback',
          description: 'Notice `roas: 4.0` with 3-month payback passes, while slow margin fails.',
          code: 'console.log("Fast:", 4 >= 3 && (200 / 70) <= 6, "| Slow:", 4 >= 3 && (500 / 40) <= 6);',
          expectedOutput: 'Fast: true | Slow: false',
        },
        commonMistake: {
          title: 'Computing Payback Using Gross Revenue Instead of Gross Margin',
          wrongWay: 'cac / monthlyRevenue  // Ignores cost of goods/support!',
          rightWay: 'cac / monthlyMargin',
          whyItHappens:
            'Only gross profit dollars—not gross revenue—pay back acquisition spend.',
        },
        tryItMission:
          'Complete `evaluateCampaignEconomics(adSpend, revenue, newCustomers, monthlyMargin)` in index.js.',
      },
      knowledgeCheck: {
        question: 'If CAC is `$300` and monthly gross margin per customer is `$50`, how many months is the CAC payback period?',
        options: ['6 months', '3 months', '12 months'],
        correctIndex: 0,
        explanation: '`$300 / $50 = 6.0` months to recover acquisition cost.',
      },
      hints: [
        'Guard `adSpend > 0` for `roas`.',
        'Handle `if (newCustomers === 0)` returning `{ roas, cac: null, paybackMonths: null, profitable: false }`.',
        'Check `profitable = roas >= 3 && paybackMonths <= 6`.',
      ],
      referenceSolution: `function evaluateCampaignEconomics(adSpend, revenue, newCustomers, monthlyMargin) {
  const roas = adSpend > 0 ? Number((revenue / adSpend).toFixed(2)) : 0;
  if (newCustomers === 0) {
    return { roas, cac: null, paybackMonths: null, profitable: false };
  }
  const cac = Number((adSpend / newCustomers).toFixed(2));
  const paybackMonths = Number((cac / monthlyMargin).toFixed(2));
  const profitable = roas >= 3 && paybackMonths <= 6;
  return { roas, cac, paybackMonths, profitable };
}

console.log(evaluateCampaignEconomics(1000, 4000, 5, 50));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function evaluateCampaignEconomics(adSpend, revenue, newCustomers, monthlyMargin) {
  // TODO: Compute roas, cac, paybackMonths, and profitable flag
  return { roas: 0, cac: null, paybackMonths: null, profitable: false };
}

console.log(evaluateCampaignEconomics(1000, 4000, 5, 50));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Approves healthy 4.0x ROAS with 4-month payback',
          expression:
            'evaluateCampaignEconomics(1000, 4000, 5, 50).roas === 4 && evaluateCampaignEconomics(1000, 4000, 5, 50).paybackMonths === 4 && evaluateCampaignEconomics(1000, 4000, 5, 50).profitable === true',
          expectedDescription: 'ROAS 4.0, CAC $200, payback 4 months -> profitable true',
        },
        {
          id: 't2',
          label: 'Flags slow payback (> 6 months) even when ROAS >= 3',
          expression: 'evaluateCampaignEconomics(1000, 3500, 2, 50).profitable === false',
          expectedDescription: '$500 CAC / $50 margin = 10 months -> profitable false',
        },
        {
          id: 't3',
          label: 'Handles zero conversions safely without crashing',
          expression: 'evaluateCampaignEconomics(500, 0, 0, 50).cac === null && evaluateCampaignEconomics(500, 0, 0, 50).profitable === false',
          expectedDescription: 'Returns null CAC and profitable false cleanly',
        },
      ],
    },

    {
      id: 'dm-m7',
      number: '07',
      title: 'Clean UTM Naming & Attribution Governance',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'When one teammate tags `Facebook` and another types `facebook `, your analytics tool splits one campaign into broken pieces! Build `buildCleanUtmUrl(baseUrl, source, medium, campaign)` normalizing lowercase snake_case UTMs cleanly.',
      keyConcepts: [
        'Lowercasing, trimming, and replacing spaces with underscores (`_`)',
        'Required parameters: `utm_source`, `utm_medium`, and `utm_campaign`',
        'Rejecting blank UTM parameters so untagged ads never launch',
      ],
      architectureNote:
        'Strict lowercase snake_case UTMs keep SQL attribution tables clean without ever needing manual regex cleanup later.',
      deliverableTitle: 'Build buildCleanUtmUrl(baseUrl, source, medium, campaign)',
      deliverablePrompt:
        'Trim, lowercase, and replace internal whitespace with `"_"` on `source`, `medium`, and `campaign`. If any is empty, return `{ valid: false, url: "" }`; otherwise return `{ valid: true, url: baseUrl + "?utm_source=" + s + "&utm_medium=" + m + "&utm_campaign=" + c }`.',
      acceptanceCriteria: [
        'Normalizes uppercase and spaces into clean lowercase_underscore slugs',
        'Rejects empty source, medium, or campaign strings cleanly',
        'Constructs properly formatted query string URL',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 07 of 12 · UTM Governance Builder',
        diagram: {
          type: 'flow',
          title: 'Sanitizing Campaign Attribution Links',
          caption: 'Clean whitespace, lowercase everything, swap spaces for underscores, and block empty parameters.',
          nodes: ['" LinkedIn "', 'trim + lower + _', '?utm_source=linkedin...'],
        },
        sections: [
          {
            heading: 'Why Case Sensitivity Breaks Attribution',
            explanation:
              'Analytics dashboards treat `Google` and `google` as two separate traffic sources. Enforcing `.trim().toLowerCase().replace(/\\s+/g, "_")` guarantees every team link matches cleanly.',
            codeLanguage: 'javascript',
            codeSnippet: 'const clean = (s) => String(s || "").trim().toLowerCase().replace(/\\s+/g, "_");',
          },
        ],
        liveExample: {
          title: 'Live Example: Sanitizing Messy Ad Tags',
          description: 'See `" LinkedIn "` + `"Paid Social"` + `"Q4 Launch"` build cleanly.',
          code: 'const clean = (s) => String(s || "").trim().toLowerCase().replace(/\\s+/g, "_");\nconsole.log(clean("  Paid Social  "), clean("Q4  Launch"));',
          expectedOutput: 'paid_social q4_launch',
        },
        commonMistake: {
          title: 'Leaving Blank UTM Fields Behind (`utm_campaign=`)',
          wrongWay: 'Returning a broken URL with empty `utm_campaign=`!',
          rightWay: 'if (!s || !m || !c) return { valid: false, url: "" };',
          whyItHappens:
            'Missing campaign tags lump paid spend into "Unknown / Direct" buckets.',
        },
        tryItMission:
          'Complete `buildCleanUtmUrl(baseUrl, source, medium, campaign)` in index.js.',
      },
      knowledgeCheck: {
        question: 'Why must all team UTM parameters enforce lowercase snake_case normalization?',
        options: [
          'So "LinkedIn" and "linkedin" never fragment into separate rows inside analytics reports',
          'Because web browsers reject uppercase URLs',
          'To hide campaign names from Google Analytics',
        ],
        correctIndex: 0,
        explanation: 'Analytics tools are case-sensitive; normalizing prevents fragmented attribution.',
      },
      hints: [
        'Define `const clean = (s) => String(s || "").trim().toLowerCase().replace(/\\s+/g, "_");`.',
        'Return `{ valid: false, url: "" }` if `!s || !m || !c`.',
        'Concatenate `?utm_source=${s}&utm_medium=${m}&utm_campaign=${c}` cleanly.',
      ],
      referenceSolution: `function buildCleanUtmUrl(baseUrl, source, medium, campaign) {
  const clean = (s) => String(s || "").trim().toLowerCase().replace(/\\s+/g, "_");
  const s = clean(source);
  const m = clean(medium);
  const c = clean(campaign);
  if (!s || !m || !c) {
    return { valid: false, url: "" };
  }
  return {
    valid: true,
    url: baseUrl + "?utm_source=" + s + "&utm_medium=" + m + "&utm_campaign=" + c,
  };
}

console.log(buildCleanUtmUrl("https://apex.io/pro", " LinkedIn ", "Paid Social", "Q4 Launch"));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function buildCleanUtmUrl(baseUrl, source, medium, campaign) {
  // TODO: Sanitize tags, validate non-empty, return { valid, url }
  return { valid: false, url: "" };
}

console.log(buildCleanUtmUrl("https://apex.io/pro", " LinkedIn ", "Paid Social", "Q4 Launch"));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Normalizes whitespace and mixed case cleanly',
          expression:
            'buildCleanUtmUrl("https://apex.io", " LinkedIn ", "Paid Social", "Q4 Launch").url === "https://apex.io?utm_source=linkedin&utm_medium=paid_social&utm_campaign=q4_launch"',
          expectedDescription: 'Builds clean lowercase snake_case UTM string',
        },
        {
          id: 't2',
          label: 'Rejects blank required UTM tags',
          expression: 'buildCleanUtmUrl("https://apex.io", "google", "", "launch").valid === false',
          expectedDescription: 'Blocks URLs missing source, medium, or campaign',
        },
      ],
    },

    {
      id: 'dm-m8',
      number: '08',
      title: 'Paid Bid Ceilings & Target CPA Guardrails',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'How much can you safely bid per click on Google Ads without losing money? Work backward from your `targetCpa` and landing page `convRatePct`: `maxCpc = targetCpa * (convRatePct / 100)`!',
      keyConcepts: [
        'Deriving Max CPC bid caps directly from `targetCpa * conversionRate`',
        'Estimating click volume needed for statistically reliable signal (`Math.ceil(10 / rate)`)',
        'Protecting paid budgets from overbidding on low-converting pages',
      ],
      architectureNote:
        'If your target CPA is `$100` and only `4%` of clicks convert (`0.04`), bidding `$6.00` per click guarantees you lose money (`$150 CPA`). Cap bids at `$4.00`!',
      deliverableTitle: 'Build computeMaxCpc(targetCpa, convRatePct)',
      deliverablePrompt:
        'Compute `rate = convRatePct / 100`, `maxCpc = Number((targetCpa * rate).toFixed(2))`, and `clicksFor10Conversions = Math.ceil(10 / rate)` in index.js.',
      acceptanceCriteria: [
        'Computes exact maxCpc bid cap rounded to 2 decimals',
        'Calculates exact clicks needed for 10 conversions',
        'Demonstrates how doubling CVR doubles allowable CPC bid',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 08 of 12 · Paid Search Bid Guardrail',
        diagram: {
          type: 'flow',
          title: 'Working Backward from Target CPA to Max CPC',
          caption: 'Multiply Target CPA by landing conversion rate so ad bids never exceed profitable unit economics.',
          nodes: ['Target CPA ($100)', '* CVR (4%)', 'Max CPC ($4.00)'],
        },
        sections: [
          {
            heading: 'Why CRO Unlocks Paid Ad Scale',
            explanation:
              'Notice the direct link to Lesson 04: improving landing page conversion from `2%` to `4%` literally **doubles** the maximum CPC you can bid profitably—letting you outbid every competitor!',
            codeLanguage: 'javascript',
            codeSnippet: 'const rate = convRatePct / 100;\nconst maxCpc = Number((targetCpa * rate).toFixed(2));\nconst clicksFor10Conversions = Math.ceil(10 / rate);',
          },
        ],
        liveExample: {
          title: 'Live Example: Bid Ceiling at $120 CPA & 5% CVR',
          description: 'See how `120 * 0.05` sets an exact `$6.00` click ceiling.',
          code: 'const rate = 5 / 100;\nconsole.log("Max CPC:", 120 * rate, "Clicks for 10:", Math.ceil(10 / rate));',
          expectedOutput: 'Max CPC: 6 Clicks for 10: 200',
        },
        commonMistake: {
          title: 'Forgetting to Divide Percentage by 100',
          wrongWay: 'targetCpa * convRatePct  // Bids $500 per click instead of $5!',
          rightWay: 'targetCpa * (convRatePct / 100)',
          whyItHappens:
            'Inputs arrive as percentages (`5` meaning `5%`), which must become `0.05` before multiplying.',
        },
        tryItMission:
          'Complete `computeMaxCpc(targetCpa, convRatePct)` in index.js.',
      },
      knowledgeCheck: {
        question: 'If your Target CPA is `$100` and landing page CVR is `2%`, what is your break-even Max CPC?',
        options: ['$2.00 per click', '$50.00 per click', '$20.00 per click'],
        correctIndex: 0,
        explanation: 'At 2% (`0.02`), it takes 50 clicks to get 1 customer, so `$100 / 50 = $2.00` max CPC.',
      },
      hints: [
        'Convert `const rate = convRatePct / 100;`.',
        'Compute `maxCpc = Number((targetCpa * rate).toFixed(2))` and `clicksFor10Conversions = Math.ceil(10 / rate)`.',
      ],
      referenceSolution: `function computeMaxCpc(targetCpa, convRatePct) {
  const rate = convRatePct / 100;
  const maxCpc = Number((targetCpa * rate).toFixed(2));
  const clicksFor10Conversions = Math.ceil(10 / rate);
  return { maxCpc, clicksFor10Conversions };
}

console.log(computeMaxCpc(120, 5));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function computeMaxCpc(targetCpa, convRatePct) {
  // TODO: Compute maxCpc and clicksFor10Conversions
  return { maxCpc: 0, clicksFor10Conversions: 0 };
}

console.log(computeMaxCpc(120, 5));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Calculates $6.00 maxCpc and 200 clicks at $120 CPA / 5% CVR',
          expression: 'computeMaxCpc(120, 5).maxCpc === 6 && computeMaxCpc(120, 5).clicksFor10Conversions === 200',
          expectedDescription: 'Returns maxCpc: 6 and clicksFor10Conversions: 200',
        },
        {
          id: 't2',
          label: 'Rounds fractional bid caps cleanly to 2 decimals',
          expression: 'computeMaxCpc(75, 3).maxCpc === 2.25 && computeMaxCpc(75, 3).clicksFor10Conversions === 334',
          expectedDescription: 'Returns maxCpc: 2.25 and 334 clicks via Math.ceil',
        },
      ],
    },

    {
      id: 'dm-m9',
      number: '09',
      title: 'Email Onboarding & Behavior-Triggered Retention',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'deliverable',
      lessonSummary:
        'Blasting every new user with the exact same 7 daily promo emails gets you marked as Spam! Design **behavior-triggered onboarding** that sends helpful activation nudges only to unactivated users, capping frequency cleanly.',
      keyConcepts: [
        'Behavior triggers (did user complete Key Activation Action yet?)',
        'Capping non-transactional marketing email cadence (`1–3` / week)',
        'One clear call-to-action per lifecycle email',
      ],
      architectureNote:
        'If a user already synced their first invoice on Day 1, stop sending "How to Sync Your First Invoice" reminders and congratulate them with the next milestone instead!',
      deliverableTitle: 'Design a Behavior-Triggered Onboarding Sequence',
      deliverablePrompt:
        'Outline a 7-day SaaS onboarding sequence splitting Activated vs Unactivated branches and setting a respectful weekly marketing cap.',
      acceptanceCriteria: [
        'Branches based on actual user activation behavior',
        'Keeps weekly marketing frequency <= 3 emails/week',
        'Protects sender deliverability cleanly',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 09 of 12 · Lifecycle Retention Flow',
        diagram: {
          type: 'branch-decision',
          title: 'Behavior-Triggered Onboarding',
          caption: 'Branch Day-2 emails based on whether the user completed setup rather than sending blind blasts.',
          nodes: ['Day 0 Signup', 'Setup Done?', 'Advance to Pro Tips', '1-Step Setup Guide'],
        },
        sections: [
          {
            heading: 'Respecting Inbox Attention',
            explanation:
              'Daily un-targeted email blasts spike unsubscribes and tank domain reputation. Branching on real product usage (`activated === true`) makes every email feel genuinely useful.',
          },
        ],
        liveExample: {
          title: 'Live Example: Day 0–7 Trigger Branch',
          description: 'Clean activation branching with capped cadence.',
          code: 'Day 0: Welcome + 1-click quickstart\nDay 2 Check -> If unactivated: 2-min walkthrough video; If activated: Power template tip\nWeekly Cap: Max 2 non-transactional emails/week',
          expectedOutput: 'Higher Day-7 retention with minimal unsubscribes.',
        },
        commonMistake: {
          title: 'Blasting "Finish Setup" Emails After the User Already Finished',
          wrongWay: 'Time-only drip sending static Day 1, 2, 3, 4 reminders blindly.',
          rightWay: 'Exit or advance users automatically the moment the activation event fires.',
          whyItHappens:
            'Ignoring live product state makes your automation look robotic and annoying.',
        },
        tryItMission:
          'Select the behavior-trigger strategy, enter a respectful weekly cap (1–3), and outline your Day 2 branch.',
      },
      knowledgeCheck: {
        question: 'What is the biggest upgrade from a static time-based email drip to a behavior-triggered sequence?',
        options: [
          'Emails adapt dynamically when users complete activation instead of nagging about steps already finished',
          'Users receive 10 emails per day regardless of activity',
          'Subject lines become twice as long',
        ],
        correctIndex: 0,
        explanation: 'Branching on activation state increases relevance and protects unsubscribe rates.',
      },
      hints: [
        'Pick the behavior-branching strategy.',
        'Set weekly cap between `1` and `3`.',
        'Describe splitting activated vs unactivated users in your sequence.',
      ],
      referenceSolution: `1. Sequence Architecture: Branch onboarding emails based on real product activation events and exit setup nudges immediately upon completion
2. Weekly Non-Transactional Cap: 2 emails
3. Day-2 Branch Plan: Unactivated users receive a 60-second setup guide with one CTA; activated users skip reminders and receive an advanced workflow tip.`,
      deliverableFields: [
        {
          id: 'lifecycle_strategy',
          label: 'Lifecycle Automation Strategy',
          placeholder: 'Select strategy',
          type: 'select',
          options: [
            'Branch onboarding emails based on real product activation events and exit setup nudges immediately upon completion',
            'Send identical daily promotional blasts to every signup regardless of activity',
            'Disable unsubscribe links to preserve list size',
          ],
          helperText: 'Pick the sustainable retention flow.',
          validationRule: {
            exactOption: 'Branch onboarding emails based on real product activation events and exit setup nudges immediately upon completion',
            errorMessage: 'Use behavior-triggered activation branching.',
          },
        },
        {
          id: 'weekly_cap',
          label: 'Max Non-Transactional Emails / Week',
          placeholder: 'e.g., 2',
          type: 'number',
          helperText: 'Keep weekly promo/educational cadence between 1 and 3.',
          validationRule: { minNumber: 1, maxNumber: 3, errorMessage: 'Cap marketing cadence between 1 and 3 emails/week.' },
        },
        {
          id: 'branch_note',
          label: 'Activated vs Unactivated Branch Logic',
          placeholder: 'Explain what activated vs unactivated users receive on Day 2...',
          type: 'textarea',
          helperText: 'Mention activated vs unactivated paths (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['activated'], errorMessage: 'Describe how activated and unactivated branches differ.' },
        },
      ],
    },

    {
      id: 'dm-m10',
      number: '10',
      title: 'High-Signal A/B Creative & Offer Testing',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'deliverable',
      lessonSummary:
        'If you change the ad image, the headline, AND the discount offer all at once, even if conversions double, you won’t know **which change caused the win**! Practice isolating one clear variable per A/B test.',
      keyConcepts: [
        'Isolating 1 independent variable per experiment (Headline OR Offer OR Visual)',
        'Testing high-leverage changes (Offer / Positioning) before tiny micro-tweaks',
        'Writing falsifiable hypotheses (`If we change X, metric Y will lift because Z`)',
      ],
      architectureNote:
        'Testing a 14-day Free Trial vs Free Plan moves needles 10x faster than testing slightly warmer shade of button blue.',
      deliverableTitle: 'Write an Isolated Growth Hypothesis Spec',
      deliverablePrompt:
        'Turn a messy test idea (*"Change headline, add testimonial, and drop price 20% in Variant B"*) into a disciplined 1-variable A/B hypothesis.',
      acceptanceCriteria: [
        'Isolates exactly 1 changed variable cleanly',
        'Uses structured "If -> Will -> Because" hypothesis framing',
        'Selects high-impact offer/headline isolation over multi-change noise',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 10 of 12 · Clean A/B Hypothesis',
        diagram: {
          type: 'flow',
          title: 'Isolating One Variable for Clear Learning',
          caption: 'Changing one lever at a time tells your team exactly what to roll out across future campaigns.',
          nodes: ['1 Isolated Variable', 'Split Traffic Cleanly', 'Clear Causal Learning'],
        },
        sections: [
          {
            heading: 'The Structured Hypothesis Template',
            explanation:
              'Write every test as: **"If we [single change], then [primary metric] will increase because [customer insight]."**',
          },
        ],
        liveExample: {
          title: 'Live Example: Crisp Single-Variable Hypothesis',
          description: 'Isolate headline value clarity while keeping price & layout identical.',
          code: 'Variable: Hero Headline only\nHypothesis: If we swap the vague slogan for "Sync Invoices in 60s", trial starts will lift because paid search visitors immediately see ad-to-page message match.',
          expectedOutput: 'Unambiguous experiment insight.',
        },
        commonMistake: {
          title: 'Bundling 5 Changes Into One A/B Variant',
          wrongWay: 'Changing headline + photo + price + layout all in Variant B.',
          rightWay: 'Test Headline first -> lock winner -> test Offer next.',
          whyItHappens:
            'Bundled changes might include one great idea canceled out by one bad change.',
        },
        tryItMission:
          'Select single-variable testing discipline and write an "If ... then ... because ..." hypothesis.',
      },
      knowledgeCheck: {
        question: 'Why must an A/B test change only ONE primary element (like Headline OR Offer) per run?',
        options: [
          'So the team knows with certainty which specific change drove any lift or drop',
          'Because web browsers cannot render two changes at once',
          'So conversion rates stay constant',
        ],
        correctIndex: 0,
        explanation: 'Single-variable isolation provides clear cause-and-effect learning.',
      },
      hints: [
        'Pick the 1-variable isolation option.',
        'Include both `if` and `because` inside your hypothesis.',
      ],
      referenceSolution: `1. Testing Rule: Isolate one single variable (e.g., Hero Headline OR Offer) while keeping every other element identical
2. Growth Hypothesis: If we change the hero headline to promise 60-second invoice sync, then landing trial conversion will lift because visitors immediately see message match with our search ads.`,
      deliverableFields: [
        {
          id: 'ab_rule',
          label: 'Experiment Isolation Rule',
          placeholder: 'Select rule',
          type: 'select',
          options: [
            'Isolate one single variable (e.g., Hero Headline OR Offer) while keeping every other element identical',
            'Change 6 visual, pricing, and copy elements simultaneously in Variant B',
            'Stop the test as soon as Variant B gets its very first signup',
          ],
          helperText: 'Choose clean scientific test isolation.',
          validationRule: {
            exactOption: 'Isolate one single variable (e.g., Hero Headline OR Offer) while keeping every other element identical',
            errorMessage: 'Isolate one single variable per A/B test.',
          },
        },
        {
          id: 'hypothesis',
          label: 'Structured Hypothesis (If -> Then -> Because)',
          placeholder: 'If we change..., then... will increase because...',
          type: 'textarea',
          helperText: 'Include "because" reasoning (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['because'], errorMessage: 'Use "If ... then ... because ..." framing.' },
        },
      ],
    },

    {
      id: 'dm-m11',
      number: '11',
      title: 'Budget Reallocation & Stop-Loss Guardrails',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Smart performance marketers protect budget by defining objective **stop-loss rules** upfront—automatically pausing campaigns that burn `>= 2x targetCpa` with zero conversions, and shifting spend into proven winners.',
      keyConcepts: [
        'Objective stop-loss threshold (`spend >= targetCpa * 2 && conversions === 0`)',
        'Separating scaling winners (`roas >= 3`) from hold/optimize campaigns',
        'Removing emotional sunk-cost attachment to failing ad sets',
      ],
      architectureNote:
        'Writing stop-loss rules before launching ads stops teams from wasting thousands hoping a dead ad set "magically warms up".',
      deliverableTitle: 'Build decideBudgetAction(spend, conversions, revenue, targetCpa)',
      deliverablePrompt:
        'Return `"PAUSE_STOP_LOSS"` if `spend >= targetCpa * 2 && conversions === 0`; `"SCALE_BUDGET"` if `conversions > 0 && spend / conversions <= targetCpa && revenue / spend >= 3`; otherwise return `"OPTIMIZE_MONITOR"`.',
      acceptanceCriteria: [
        'Flags runaway zero-conversion spend >= 2x targetCpa as PAUSE_STOP_LOSS',
        'Recommends SCALE_BUDGET when CPA <= target and ROAS >= 3',
        'Returns OPTIMIZE_MONITOR for intermediate campaigns',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 11 of 12 · Budget Stop-Loss Router',
        diagram: {
          type: 'branch-decision',
          title: 'Automated Spend Governance',
          caption: 'Pause zero-conversion ad sets past 2x target CPA; scale winners meeting both CPA and 3x ROAS goals.',
          nodes: ['Ad Performance', '2x CPA & 0 Conv?', 'PAUSE_STOP_LOSS', 'Check Scale / Monitor'],
        },
        sections: [
          {
            heading: 'Killing Dead Ads Without Emotion',
            explanation:
              'Setting `if (spend >= targetCpa * 2 && conversions === 0)` gives every ad a fair test budget while automatically rescuing remaining monthly budget for winning channels.',
            codeLanguage: 'javascript',
            codeSnippet: 'if (spend >= targetCpa * 2 && conversions === 0) return "PAUSE_STOP_LOSS";',
          },
        ],
        liveExample: {
          title: 'Live Example: Evaluating Three Ad Sets',
          description: 'Watch budget governance separate Pause, Scale, and Monitor.',
          code: 'console.log("Burned $250, 0 conv (target $100):", 250 >= 200 ? "PAUSE_STOP_LOSS" : "WAIT");',
          expectedOutput: 'Burned $250, 0 conv (target $100): PAUSE_STOP_LOSS',
        },
        commonMistake: {
          title: 'Pausing Too Early After Spending Just $15',
          wrongWay: 'Pausing before spending even 1x–2x Target CPA (not enough data!).',
          rightWay: 'Give the ad `2x targetCpa` runway, then pause decisively if `conversions === 0`.',
          whyItHappens:
            'Pausing prematurely kills potentially great campaigns before statistical conversion cycles complete.',
        },
        tryItMission:
          'Complete `decideBudgetAction(spend, conversions, revenue, targetCpa)` in index.js.',
      },
      knowledgeCheck: {
        question: 'Why wait until `spend >= 2 * targetCpa` (with 0 conversions) before triggering a hard stop-loss pause?',
        options: [
          'It balances giving the ad fair initial data while preventing runaway waste',
          'Because ad platforms charge double after 2 conversions',
          'Because ROAS is always 10x after $5',
        ],
        correctIndex: 0,
        explanation: 'A 2x target CPA cap gives reasonable initial learning runway while protecting total budget.',
      },
      hints: [
        'Check `if (spend >= targetCpa * 2 && conversions === 0) return "PAUSE_STOP_LOSS";` first.',
        'Next check `if (conversions > 0 && (spend / conversions) <= targetCpa && (revenue / spend) >= 3) return "SCALE_BUDGET";`.',
        'Default to `"OPTIMIZE_MONITOR"`.',
      ],
      referenceSolution: `function decideBudgetAction(spend, conversions, revenue, targetCpa) {
  if (spend >= targetCpa * 2 && conversions === 0) {
    return "PAUSE_STOP_LOSS";
  }
  if (conversions > 0 && spend / conversions <= targetCpa && revenue / spend >= 3) {
    return "SCALE_BUDGET";
  }
  return "OPTIMIZE_MONITOR";
}

console.log(decideBudgetAction(220, 0, 0, 100), decideBudgetAction(500, 10, 2000, 80));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function decideBudgetAction(spend, conversions, revenue, targetCpa) {
  // TODO: Return PAUSE_STOP_LOSS, SCALE_BUDGET, or OPTIMIZE_MONITOR
  return "OPTIMIZE_MONITOR";
}

console.log(decideBudgetAction(220, 0, 0, 100), decideBudgetAction(500, 10, 2000, 80));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Pauses runaway spend past 2x targetCPA with 0 conversions',
          expression: 'decideBudgetAction(220, 0, 0, 100) === "PAUSE_STOP_LOSS"',
          expectedDescription: 'Flags $220 spend / 0 conv at $100 target as PAUSE_STOP_LOSS',
        },
        {
          id: 't2',
          label: 'Scales winners hitting CPA <= target and ROAS >= 3',
          expression: 'decideBudgetAction(500, 10, 2000, 80) === "SCALE_BUDGET"',
          expectedDescription: 'CPA $50 <= $80 and ROAS 4.0 -> SCALE_BUDGET',
        },
        {
          id: 't3',
          label: 'Routes middle cases cleanly to OPTIMIZE_MONITOR',
          expression: 'decideBudgetAction(500, 5, 1100, 100) === "OPTIMIZE_MONITOR"',
          expectedDescription: 'CPA $100 OK, ROAS 2.2 < 3 -> OPTIMIZE_MONITOR',
        },
      ],
    },

    {
      id: 'dm-m12',
      number: '12',
      title: 'Capstone: Omnichannel Launch & Attribution Plan',
      durationMinutes: 50,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'rubric',
      lessonSummary:
        'Connect every puzzle piece built across Lessons 01–11—funnel positioning, intent SEO, CRO message match, ROAS & gross-margin CAC payback math, clean lowercase UTM tagging, max-CPC bid caps, behavior-triggered lifecycle emails, and budget stop-losses—into your Omnichannel Capstone Plan.',
      keyConcepts: [
        'Linking creative positioning & landing page CRO directly to paid CPC efficiency',
        'Enforcing lowercase snake_case UTM governance across every channel',
        'Governing scale via gross-margin CAC payback (<= 6 mo), ROAS (>= 3x), and stop-losses',
      ],
      architectureNote:
        'Profitable growth combines crisp human persuasion (positioning, CRO, lifecycle triggers) with strict financial & attribution discipline (UTMs, payback, stop-loss).',
      deliverableTitle: 'Submit Omnichannel Marketing Launch Capstone',
      deliverablePrompt:
        'Write your comprehensive Digital Marketing Capstone Plan covering: (1) Positioning, search intent SEO, and ad-to-page CRO message match, (2) Lowercase `utm_source` / `utm_medium` / `utm_campaign` governance & behavior-triggered email onboarding, and (3) ROAS (`>= 3x`), gross-margin CAC payback (`<= 6 months`), `maxCpc`, and `2x targetCpa` stop-loss governance.',
      acceptanceCriteria: [
        'Documents clear positioning, search intent alignment, and CRO message match',
        'Enforces lowercase snake_case UTM governance and behavior-triggered emails',
        'Specifies ROAS >= 3, gross-margin payback <= 6 months, maxCpc, and stop-loss rules',
        'Scores >= 80 / 100 on the Mentor Rubric to unlock your Digital Marketing Certificate',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 12 of 12 · Complete Growth Launch Capstone',
        diagram: {
          type: 'capstone-assembly',
          title: 'Omnichannel Performance Engine',
          caption: 'Positioning + CRO + clean UTMs + gross-margin payback + lifecycle triggers create profitable scale.',
          nodes: ['Positioning & CRO', 'UTM + Lifecycle', 'ROAS, Payback & Stop-Loss'],
        },
        sections: [
          {
            heading: 'Your Full Growth Marketing Stack',
            explanation:
              'You built from Awareness/Retention strategy and clear 5-second headlines to interactive CTR/CPA/ROAS/Payback calculators, UTM builders, max-CPC caps, and automated budget stop-losses.',
          },
        ],
        liveExample: {
          title: 'Live Example: Omnichannel Launch Brief',
          description: 'Hit CRO/Intent, UTM/Lifecycle, and Financial Unit Economics cleanly.',
          code: '1. Positioning & CRO: Pair benefit-led hero H1 message match + social proof with intent-matched SEO guides and distraction-free landing headers.\n2. Attribution & Lifecycle: Standardize lowercase snake_case UTMs across links and trigger Day-2 activation emails capped <= 3/week.\n3. Unit Economics: Cap bids via targetCpa * cvrRate, pause zero-conversion spend past 2x targetCpa, and scale only when ROAS >= 3 and margin payback <= 6 months.',
          expectedOutput: 'Verified >= 80/100 Capstone Rubric Score',
        },
        commonMistake: {
          title: 'Reporting Vanity Clicks Without Gross-Margin Payback',
          wrongWay: '"We will get lots of cheap clicks and scale whichever ad feels best."',
          rightWay: '"We pair CRO message match and strict lowercase UTMs with >= 3x ROAS, <= 6-month gross-margin CAC payback, and 2x CPA stop-losses."',
          whyItHappens:
            'Cheap clicks without conversion CRO and margin payback burn cash quickly.',
        },
        tryItMission:
          'Write your >= 65-word Omnichannel Launch Capstone Plan and click Verify & Mint Certificate.',
      },
      knowledgeCheck: {
        question: 'Which financial guardrail stops a marketing team from scaling unprofitable customer acquisition?',
        options: [
          'Requiring ROAS >= 3x AND gross-margin CAC payback <= 6 months paired with 2x targetCpa stop-loss rules',
          'Maximizing raw ad impressions only',
          'Removing UTM campaign tracking tags',
        ],
        correctIndex: 0,
        explanation: 'Gross-margin payback and stop-losses ensure growth generates real recoverable profit.',
      },
      hints: [
        'Mention `cro`, `intent`, and `message match` in Criterion 1.',
        'Mention `utm` and `onboarding` / `lifecycle` in Criterion 2.',
        'Mention `roas`, `payback` / `margin`, and `stop-loss` / `cpc` in Criterion 3.',
      ],
      referenceSolution: `1. Positioning, Intent & CRO: Our launch splits informational SEO guides from transactional pricing pages and routes paid ads to dedicated landing pages featuring ad-to-H1 message match, social proof beside the CTA, and zero distracting header links.
2. UTM Attribution & Lifecycle Retention: Every campaign URL enforces lowercase snake_case utm_source, utm_medium, and utm_campaign parameters to prevent reporting fragmentation, while behavior-triggered onboarding emails branch on setup completion under a 2/week cap.
3. Unit Economics & Spend Governance: Paid bids stay capped at maxCpc = targetCpa * cvrRate, zero-conversion ad sets pause automatically past 2x targetCpa stop-loss, and budgets scale strictly when ROAS >= 3x and gross-margin CAC payback <= 6 months.`,
      rubricCriteria: [
        {
          id: 'r1',
          criterion: 'Positioning, Search Intent & CRO Message Match',
          weight: 35,
          targetDescription:
            'Covers benefit-led positioning, search intent separation, and distraction-free CRO landing pages.',
          requiredKeywordHints: ['cro', 'intent', 'message match'],
          minWordCount: 15,
        },
        {
          id: 'r2',
          criterion: 'UTM Governance & Behavior-Triggered Lifecycle',
          weight: 35,
          targetDescription:
            'Enforces clean lowercase UTMs and activation-branched lifecycle cadence caps.',
          requiredKeywordHints: ['utm', 'onboarding'],
          minWordCount: 15,
        },
        {
          id: 'r3',
          criterion: 'ROAS, Gross-Margin Payback & Bid Stop-Loss',
          weight: 30,
          targetDescription:
            'Details >= 3x ROAS, <= 6-month margin payback, maxCpc ceiling, and stop-loss governance.',
          requiredKeywordHints: ['roas', 'payback', 'stop-loss'],
          minWordCount: 15,
        },
      ],
    },
  ],
};
