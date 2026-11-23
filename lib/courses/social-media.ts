import type { Course } from '../curriculum-types';

export const SOCIAL_MEDIA_COURSE: Course = {
  id: 'social-media-specialist',
  slug: 'social-media-specialist',
  track: 'Design, Growth & Social',
  level: 'Foundational',
  title: 'Social Media Specialist',
  subtitle:
    'Start from how discovery feeds differ from community channels and define 4 sustainable content pillars—then craft 3-second hooks, short-form retention scripts, content repurposing, weighted engagement calculators, creator ROI attribution, and crisis SLAs.',
  durationHours: 18,
  rating: 4.8,
  reviewCount: 3890,
  instructor: {
    name: 'Maya Lin-Cortez',
    role: 'Director of Social Growth',
    organization: 'PulseCraft Media',
  },
  thumbnailKey: 'ux-product',
  primaryMode: 'sandbox',
  primaryRuntime: 'js',
  capstoneTitle: '30-Day Brand Growth & Creator Attribution System',
  capstoneSummary:
    'Assemble a repeatable social growth engine—combining platform-native pillars, high-retention 3-second hooks, JS weighted engagement & weekly mix validators, creator UTM/promo attribution, and calm crisis SLAs.',
  capstoneDeliverables: [
    'Platform ecosystem map, 4-pillar strategy, and 3-second short-form hook templates',
    'Interactive JS weighted engagement scorer (saves/shares = 3x) and weekly mix validator',
    '1-to-4 content repurposing workflow, creator UTM attribution brief, and crisis SLA matrix',
    'Verified 30-Day Brand Growth Engine Capstone graded on the Mentor Rubric',
  ],
  outcomes: [
    'Tailor formats to algorithmic discovery feeds vs authority/community platforms',
    'Write 3-second hooks and retention arcs eliminating slow "Hey guys" intros',
    'Score post quality by saves/shares and validate weekly pillar cadence in JS',
    'Run creator partnerships with trackable UTM/promo ROI and crisis SLAs',
  ],
  modules: [
    {
      id: 'sm-m1',
      number: '01',
      title: 'Platform Ecosystems & Audience Intent',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'Copying the exact same 16:9 webinar clip onto TikTok, LinkedIn, and Instagram Reels fails on every platform! Learn how **Discovery Feeds** (short video algorithms) work differently from **Network/Authority Feeds** (LinkedIn, newsletters, communities).',
      keyConcepts: [
        'Interest-graph discovery (Reels/TikTok/Shorts) vs Social/Professional graph (LinkedIn)',
        'Why users open each app (fast curiosity/utility vs industry craft/career)',
        'Matching format aspect ratio and pacing to native user intent',
      ],
      architectureNote:
        'Discovery algorithms test every video with strangers in the first 3 seconds—your opening frame must make total sense without knowing who your company is.',
      deliverableTitle: 'Map Content Format to Platform Intent',
      deliverablePrompt:
        'A team plans to blast identical wide landscape webinar recordings across TikTok and LinkedIn. Diagnose why that underperforms and adapt format + tone per platform.',
      acceptanceCriteria: [
        'Explains algorithmic stranger-discovery on short-form vs professional intent on LinkedIn',
        'Adapts vertical mobile pacing separately from scannable carousel/text posts',
        'Selects native format adaptation over identical cross-posting',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 01 of 12 · Platform Ecosystem Map',
        diagram: {
          type: 'branch-decision',
          title: 'Two Distinct Social Algorithms',
          caption: 'Short-form discovery serves strangers based on watch retention; professional feeds reward niche utility and saves.',
          nodes: ['Core Message', 'Platform Type?', '9:16 Hook Video', 'Carousel / Insight Post'],
        },
        sections: [
          {
            heading: 'Why Copy-Pasting Fails Everywhere',
            explanation:
              'On TikTok/Reels, people scroll fast on phones looking for visual demos and quick surprises in vertical `9:16`. On LinkedIn, people pause for sharp frameworks, carousels, and peer lessons.',
          },
        ],
        liveExample: {
          title: 'Live Example: Native Adaptation',
          description: 'One webinar insight adapted natively to two channels.',
          code: 'Short-Form (9:16): 35s vertical teardown showing the exact UI before/after in frame 1.\nLinkedIn: 6-slide PDF carousel + concise 4-line operational takeaway.',
          expectedOutput: 'Strong native engagement on both feeds.',
        },
        commonMistake: {
          title: 'Posting Raw Horizontal 16:9 Zoom Clips to Vertical Feeds',
          wrongWay: 'Uploading tiny letterboxed Zoom screens with 10s of "Can everyone hear me?"',
          rightWay: 'Vertical 9:16 framing starting immediately on the payoff.',
          whyItHappens:
            'Small letterboxed faces with dead silence lose 80% of viewers in 1.5 seconds.',
        },
        tryItMission:
          'Select the native platform rule and outline how you would adapt one webinar tip for Shorts vs LinkedIn.',
      },
      knowledgeCheck: {
        question: 'Why does posting an identical 16:9 landscape Zoom clip across TikTok and LinkedIn underperform?',
        options: [
          'Different platforms have distinct aspect ratios, opening pacing, and audience intent',
          'TikTok deletes landscape videos automatically',
          'LinkedIn users cannot watch videos',
        ],
        correctIndex: 0,
        explanation: 'Adapting framing and pacing natively respects how users actually browse each feed.',
      },
      hints: [
        'Select the native format adaptation option.',
        'Reference `vertical` (or `9:16`) for short-form and `carousel` / `framework` for LinkedIn.',
      ],
      referenceSolution: `1. Platform Rule: Adapt core insights natively per platform format (9:16 tight visual hooks for short-form; scannable carousels/posts for LinkedIn)
2. Native Adaptation: Cut a tight 9:16 vertical clip opening immediately on the visual before/after for short-form, and turn key takeaways into a crisp LinkedIn carousel.`,
      deliverableFields: [
        {
          id: 'platform_rule',
          label: 'Cross-Platform Publishing Strategy',
          placeholder: 'Select strategy',
          type: 'select',
          options: [
            'Adapt core insights natively per platform format (9:16 tight visual hooks for short-form; scannable carousels/posts for LinkedIn)',
            'Upload identical unedited 16:9 Zoom recordings everywhere',
            'Post only external website links with zero native visuals',
          ],
          helperText: 'Pick native ecosystem fit.',
          validationRule: {
            exactOption: 'Adapt core insights natively per platform format (9:16 tight visual hooks for short-form; scannable carousels/posts for LinkedIn)',
            errorMessage: 'Adapt format natively to each platform ecosystem.',
          },
        },
        {
          id: 'native_plan',
          label: 'Short-Form vs LinkedIn Adaptation Plan',
          placeholder: 'Describe vertical 9:16 pacing vs LinkedIn carousel adaptation...',
          type: 'textarea',
          helperText: 'Include vertical or 9:16 and LinkedIn/carousel (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['vertical'], errorMessage: 'Contrast vertical short-form with LinkedIn format.' },
        },
      ],
    },

    {
      id: 'sm-m2',
      number: '02',
      title: 'Defining Your 4 Core Content Pillars',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'Brands burn out—and lose followers—when every post just screams *"Buy our product!"* Anchor your calendar on **4 sustainable pillars**: **Education** (teach), **Proof** (case studies), **Behind-the-Scenes** (human trust), and **Conversion** (max `<= 25%`!).',
      keyConcepts: [
        'The 4 balanced pillars: Education, Proof, Culture/BTS, Conversion',
        'Capping hard promotional posts at `<= 25%` of weekly volume',
        'Preventing creative burnout with repeatable pillar slots',
      ],
      architectureNote:
        'If followers get 3 genuinely helpful or entertaining posts for every 1 offer post, they stay subscribed—making your conversion posts hit way harder.',
      deliverableTitle: 'Design a 4-Pillar Weekly Social Balance',
      deliverablePrompt:
        'A company currently posts 5 promotional discount graphics every week and gets zero shares. Rebalance a 4-post weekly plan across Educational, Proof, Behind-the-Scenes, and Promo pillars.',
      acceptanceCriteria: [
        'Limits promo posts to <= 25% (at most 1 out of 4 posts)',
        'Includes Educational how-to value and customer Proof',
        'Explains why constant promo kills organic reach',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 02 of 12 · 4-Pillar Content Strategy',
        diagram: {
          type: 'dict-map',
          title: 'Balanced 4-Pillar Weekly Mix',
          caption: 'Give 75%+ value, proof, and human story so your <=25% promotional posts earn attention cleanly.',
          nodes: ['Education (40%)', 'Teach & Solve Pain', 'Proof & BTS (35%)', 'Promo (<= 25%)'],
        },
        sections: [
          {
            heading: 'The Give-Give-Give-Ask Rule',
            explanation:
              'Educational tips get **saved**; real customer proof builds **credibility**; behind-the-scenes clips earn **trust**. Keeping hard promotions at `<= 25%` builds an audience that actually looks forward to your posts.',
          },
        ],
        liveExample: {
          title: 'Live Example: Balanced 4-Post Week',
          description: 'Zero repetitive ad fatigue.',
          code: 'Mon: Education ("3 SQL shortcuts saving 2 hours")\nWed: Proof ("How Harbor Bio cut report prep 60%")\nFri: Behind-the-Scenes ("Live bug triage teardown")\nSun: Promo (1 clear workshop/trial offer)',
          expectedOutput: '25% Promo + 75% Value & Proof.',
        },
        commonMistake: {
          title: 'Treating Organic Social Feeds Like Billboard Ad Space',
          wrongWay: '5/5 weekly posts shouting "20% OFF SALE ENDS TONIGHT!"',
          rightWay: 'At least 75% Education/Proof/BTS and <= 25% direct Promo.',
          whyItHappens:
            'Algorithms suppress posts nobody saves, comments on, or watches to the end.',
        },
        tryItMission:
          'Set the maximum promo percentage (`<= 25`), choose the pillar balance, and map 4 weekly slots.',
      },
      knowledgeCheck: {
        question: 'Why should direct promotional posts stay around `<= 25%` of an organic weekly social mix?',
        options: [
          'Audiences unfollow or scroll past feeds that only sell without offering educational utility or proof',
          'Platforms charge fees above 25%',
          'Educational posts cannot include product examples',
        ],
        correctIndex: 0,
        explanation: 'High-utility educational and proof posts earn algorithmic saves and shares that grow reach for when you do share an offer.',
      },
      hints: [
        'Enter `25` (or `20`)% as max promo share.',
        'Select the balanced 4-pillar mix option.',
        'Include both `education` and `proof` in your 4-post plan.',
      ],
      referenceSolution: `1. Max Promo Share (%): 25
2. Pillar Rule: Balance Education, Customer Proof, and Behind-the-Scenes across 75%+ of posts while capping direct promos <= 25%
3. Weekly Plan: Mon Education guide, Wed Customer Proof teardown, Fri Behind-the-Scenes build clip, Sun concise Promo offer (25%).`,
      deliverableFields: [
        {
          id: 'max_promo',
          label: 'Max Direct Promotional Share (%)',
          placeholder: 'e.g., 25',
          type: 'number',
          helperText: 'Keep direct promo posts between 10% and 25%.',
          validationRule: { minNumber: 10, maxNumber: 25, errorMessage: 'Cap direct promo volume at 10–25%.' },
        },
        {
          id: 'pillar_rule',
          label: 'Healthy Weekly Pillar Mix',
          placeholder: 'Select mix',
          type: 'select',
          options: [
            'Balance Education, Customer Proof, and Behind-the-Scenes across 75%+ of posts while capping direct promos <= 25%',
            'Publish 100% discount coupon banners every day',
            'Only post holidays and motivational quotes',
          ],
          helperText: 'Choose sustainable organic growth balance.',
          validationRule: {
            exactOption: 'Balance Education, Customer Proof, and Behind-the-Scenes across 75%+ of posts while capping direct promos <= 25%',
            errorMessage: 'Balance Education/Proof/BTS with <= 25% promo.',
          },
        },
        {
          id: 'weekly_slots',
          label: 'Sample 4-Slot Weekly Plan',
          placeholder: 'List Mon / Wed / Fri / Sun pillar topics...',
          type: 'textarea',
          helperText: 'Include Education and Proof posts (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['education', 'proof'], errorMessage: 'Include Education and Proof pillars in your plan.' },
        },
      ],
    },

    {
      id: 'sm-m3',
      number: '03',
      title: 'Writing Thumb-Stopping 3-Second Hooks',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'If you open a video with *"Hey guys, welcome back to our channel, today I want to talk about..."*, **65% of viewers swipe away before second 3**! Learn 3 proven hook formulas: **Outcome First**, **Common Mistake Callout**, and **Specific Number Curiosity**.',
      keyConcepts: [
        'Eliminating slow throat-clearing intros ("Hey guys...")',
        'Visual + spoken hook alignment in the first 1.5–3 seconds',
        'Opening straight with the stakes, mistake, or tangible payoff',
      ],
      architectureNote:
        'You do not earn a 45-second explanation until your first 3 seconds convince the viewer it solves something they care about right now.',
      deliverableTitle: 'Replace a Slow Intro with a 3-Second Hook',
      deliverablePrompt:
        'Rewrite *"Hey everyone! Today I’m excited to share 5 tips about making dashboards clearer"* into a punchy <=14-word 3-second hook that names the painful mistake or payoff immediately.',
      acceptanceCriteria: [
        'Cuts "Hey guys / welcome back" throat clearing completely',
        'States clear stakes, mistake, or tangible payoff inside 3 seconds',
        'Selects visual+spoken opening alignment',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 03 of 12 · 3-Second Opening Hook',
        diagram: {
          type: 'flow',
          title: 'First 3 Seconds Decide Reach',
          caption: 'Skip greetings completely; hit a painful mistake or concrete outcome in Frame 1.',
          nodes: ['0.0s: Cut Greetings', '0–3s: Stakes / Visual', 'Earned 40s Watch'],
        },
        sections: [
          {
            heading: 'Three Proven Opening Patterns',
            explanation:
              '1. **Mistake Hook**: *"Stop putting 4 bright buttons on one card—here’s why clicks drop 40%."*\n2. **Payoff Hook**: *"This 4-line SQL query cuts dashboard load time in half."*\n3. **Visual Proof Hook**: Show the broken vs fixed screen immediately in frame 1!',
          },
        ],
        liveExample: {
          title: 'Live Example: Cutting the Fluff',
          description: 'Turn 5 seconds of greeting into 2 seconds of pure intrigue.',
          code: 'Slow (BAD): "Hey guys, happy Tuesday! So today we are looking at dashboards..."\nHook (GOOD): "Your executive dashboard is lying if it averages daily percentages—watch this fix."',
          expectedOutput: 'Instant curiosity + zero early swipe-aways.',
        },
        commonMistake: {
          title: 'Starting Videos with Brand Logos or "Hey Guys"',
          wrongWay: '3-second spinning logo animation + "Hey everyone welcome back!"',
          rightWay: 'Frame 1 starts mid-action with bold visual caption and concrete stakes.',
          whyItHappens:
            'Strangers scrolling fast never wait through logo animations.',
        },
        tryItMission:
          'Select the zero-fluff opening rule and craft a punchy 3-second dashboard hook.',
      },
      knowledgeCheck: {
        question: 'Why should short-form videos eliminate intros like "Hey guys, welcome back"?',
        options: [
          'Viewers decide within 1.5–3 seconds whether to keep watching; slow greetings trigger immediate swipe-aways',
          'Algorithms ban the word "welcome"',
          'Captions cannot render during greetings',
        ],
        correctIndex: 0,
        explanation: 'First-3-second retention determines whether discovery feeds distribute a post further.',
      },
      hints: [
        'Select the zero-fluff Frame 1 stakes/payoff rule.',
        'Include `dashboard` in a punchy hook without "Hey guys".',
      ],
      referenceSolution: `1. Hook Discipline: Eliminate greetings and open in Frame 1 with a specific mistake, outcome, or visual contrast
2. Rewritten 3s Hook: "Three chart mistakes making your dashboard look broken—and the 10-second fix."`,
      deliverableFields: [
        {
          id: 'hook_rule',
          label: 'First-3-Second Opening Standard',
          placeholder: 'Select opening rule',
          type: 'select',
          options: [
            'Eliminate greetings and open in Frame 1 with a specific mistake, outcome, or visual contrast',
            'Play a 4-second company logo intro before speaking',
            'Say "Hey everyone happy Monday" for 6 seconds',
          ],
          helperText: 'Pick high-retention video opening structure.',
          validationRule: {
            exactOption: 'Eliminate greetings and open in Frame 1 with a specific mistake, outcome, or visual contrast',
            errorMessage: 'Cut greetings and open immediately on stakes or contrast.',
          },
        },
        {
          id: 'hook_script',
          label: 'Your Rewritten 3-Second Hook',
          placeholder: 'e.g., Three hidden chart mistakes ruining your dashboard—and how to fix them...',
          type: 'textarea',
          helperText: 'Reference dashboard and avoid greetings (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['dashboard'], errorMessage: 'Write a sharp dashboard hook starting immediately on value.' },
        },
      ],
    },

    {
      id: 'sm-m4',
      number: '04',
      title: 'Short-Form Story Arcs & Retention Pacing',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'deliverable',
      lessonSummary:
        'A great hook gets viewers to second 3; pacing keeps them watching to the end! Structure short educational videos into **Hook (0–3s) -> Setup/Problem (3–10s) -> Clear Step-by-Step Proof (10–35s) -> Payoff & Soft CTA**.',
      keyConcepts: [
        'Visual pattern interrupts every 4–6 seconds (cutaways, zooms, on-screen labels)',
        'Delivering the promised payoff before asking for follows or comments',
        'Cutting dead pauses and filler sentences cleanly',
      ],
      architectureNote:
        'Never stall the promised answer until the final second with fake hype—deliver real value in the middle and earn trust for a soft CTA at the end.',
      deliverableTitle: 'Outline a 35-Second Educational Story Arc',
      deliverablePrompt:
        'Structure a 35-second short video teaching **"How to audit color contrast in 10 seconds"** across Hook, Middle Proof, and Soft CTA.',
      acceptanceCriteria: [
        'Follows Hook -> Proof Demo -> Payoff + Soft CTA order',
        'Includes visual cut/demo proof in the middle segment',
        'Keeps CTA tied naturally to the lesson',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 04 of 12 · Retention Story Arc',
        diagram: {
          type: 'flow',
          title: '35-Second Video Retention Arc',
          caption: 'Hook fast, prove with live visual steps, and close with a natural save/comment CTA.',
          nodes: ['0–3s Hook', '4–30s Live Proof', '31–35s Payoff + CTA'],
        },
        sections: [
          {
            heading: 'Earn Retention With Visual Proof',
            explanation:
              'Instead of just talking at a webcam for 35 seconds, switch cleanly to the screen demo or before/after card every few seconds so viewers stay visually engaged.',
          },
        ],
        liveExample: {
          title: 'Live Example: Contrast 35s Script',
          description: 'Tight 3-beat educational structure.',
          code: '0-3s Hook: "Why pale gray text kills mobile signups—and the 4.5:1 rule."\n4-28s Proof: Show 2.1:1 failing gray card vs crisp 15:1 Midnight card side-by-side.\n29-35s CTA: "Save this 4.5:1 checklist for your next UI review."',
          expectedOutput: 'High completion + high save rate.',
        },
        commonMistake: {
          title: 'Putting a 20-Second "Subscribe & Follow" Begging Pitch in the Middle',
          wrongWay: 'Stopping the tutorial mid-way to beg for likes before showing the answer.',
          rightWay: 'Deliver full payoff cleanly, then add a 4-second value-aligned Save CTA at the end.',
          whyItHappens:
            'Interrupting the answer breaks viewer trust and causes retention cliffs.',
        },
        tryItMission:
          'Select the retention arc structure and outline Hook, Proof Demo, and Soft CTA for a contrast clip.',
      },
      knowledgeCheck: {
        question: 'When should your primary "Save / Follow" Call-To-Action appear in a 35-second tutorial video?',
        options: [
          'At the very end after delivering the full promised payoff',
          'Before explaining what the video is even about',
          'Every 5 seconds mid-sentence',
        ],
        correctIndex: 0,
        explanation: 'Delivering value first earns genuine saves and comments at the finish.',
      },
      hints: [
        'Pick Hook -> Live Proof -> Payoff & Soft CTA.',
        'Include `contrast` and `save` / `cta` in your outline.',
      ],
      referenceSolution: `1. Story Arc: Hook (0–3s) -> Visual Before/After Proof (4–28s) -> Clear Payoff & Soft Save CTA (29–35s)
2. 35s Contrast Outline: Hook on why low contrast hurts signups, show 2.1:1 vs 4.5:1 contrast side-by-side, and finish with a soft CTA to save the 4.5:1 checklist.`,
      deliverableFields: [
        {
          id: 'arc_structure',
          label: 'Winning Short-Form Story Arc',
          placeholder: 'Select story arc',
          type: 'select',
          options: [
            'Hook (0–3s) -> Visual Before/After Proof (4–28s) -> Clear Payoff & Soft Save CTA (29–35s)',
            '20s Follow Pitch -> 10s Logo -> 5s Rushed Answer',
            'Unstructured 60s static webcam monologue',
          ],
          helperText: 'Pick high-retention sequence.',
          validationRule: {
            exactOption: 'Hook (0–3s) -> Visual Before/After Proof (4–28s) -> Clear Payoff & Soft Save CTA (29–35s)',
            errorMessage: 'Structure around Hook -> Visual Proof -> Payoff & Soft CTA.',
          },
        },
        {
          id: 'arc_outline',
          label: '35-Second Contrast Video Outline',
          placeholder: 'Write Hook, Visual Proof middle, and Soft Save CTA ending...',
          type: 'textarea',
          helperText: 'Mention contrast and CTA/save (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['contrast'], errorMessage: 'Outline Hook, Contrast proof, and CTA.' },
        },
      ],
    },

    {
      id: 'sm-m5',
      number: '05',
      title: 'Repurposing 1 Core Idea Into 4 Native Formats',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'deliverable',
      lessonSummary:
        'Solo specialists and lean teams cannot invent 20 unrelated ideas every week. Master the **1-to-4 Repurposing Engine**: research **1 strong anchor insight** and ship it as a Short Video, a LinkedIn Carousel, a concise Text Post, and a Newsletter Tip!',
      keyConcepts: [
        'Anchor insight -> 4 native formats without losing quality',
        'Why repurposing reinforces brand message consistency',
        'Cutting weekly production time by 60%+',
      ],
      architectureNote:
        'Most followers never see your Monday post—repackaging the same insight cleanly in a Thursday carousel multiplies reach without extra research.',
      deliverableTitle: 'Build a 1-to-4 Content Repurposing Matrix',
      deliverablePrompt:
        'Take one verified insight (*"Why saves & shares signal stronger content value than passive likes"*) and plan how to ship it natively across 4 distinct channels.',
      acceptanceCriteria: [
        'Maps 1 anchor insight across Short Video, Carousel, Text Post, and Email/Community',
        'Explains efficiency without quality loss',
        'Maintains native format differences',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 05 of 12 · 1-to-4 Repurposing Workflow',
        diagram: {
          type: 'flow',
          title: 'Multiply Output Without Burnout',
          caption: 'Research one deep topic once, then translate it into four distinct native formats.',
          nodes: ['1 Anchor Insight', 'Short Video + Carousel', 'Text Post + Newsletter'],
        },
        sections: [
          {
            heading: 'Work Smarter With Pillar Sprints',
            explanation:
              'Instead of staring at a blank calendar Monday morning, turn one deep teardown into a 35-second video clip, a 5-slide visual carousel, a tight text breakdown, and a weekend newsletter tip.',
          },
        ],
        liveExample: {
          title: 'Live Example: 1 Insight -> 4 Native Assets',
          description: 'Saves & shares topic multiplied cleanly.',
          code: '1. Short Video: 35s teardown of why 10 saves beat 100 passive likes\n2. Carousel: 5 visual formula slides on weighted engagement\n3. Text Post: Quick punchy story on optimizing for saves\n4. Newsletter: Full downloadable scoring spreadsheet',
          expectedOutput: '4 high-signal assets from 1 research block.',
        },
        commonMistake: {
          title: 'Re-Inventing Totally Different Topics Every Day',
          wrongWay: 'Brainstorming 28 unrelated random topics a month (burns out fast!).',
          rightWay: '7 deep anchor topics/month * 4 native formats = 28 cohesive posts.',
          whyItHappens:
            'Trying to reinvent fresh concepts daily leads to shallow, rushed filler.',
        },
        tryItMission:
          'Pick the repurposing strategy and list 4 native formats for the weighted-engagement insight.',
      },
      knowledgeCheck: {
        question: 'How does the "1-to-4 Repurposing Engine" help lean social teams ship consistently?',
        options: [
          'It turns one well-researched insight into 4 platform-native formats instead of scrambling for unrelated daily ideas',
          'It pastes the exact same screenshot everywhere without editing',
          'It deletes old posts automatically',
        ],
        correctIndex: 0,
        explanation: 'Deep research once -> 4 native formats preserves both quality and sustainable velocity.',
      },
      hints: [
        'Pick the 1 anchor insight -> 4 native formats option.',
        'Include `carousel` and `video` (or `newsletter`) across your 4 formats.',
      ],
      referenceSolution: `1. Workflow: Research 1 strong anchor insight and adapt it natively into Video, Carousel, Text Post, and Newsletter formats
2. 4-Format Plan: (1) 35s Short Video teardown on saves vs likes, (2) 5-slide LinkedIn Carousel showing the scoring formula, (3) Concise Text Post summarizing the 3x weight rule, and (4) Newsletter breakdown with template.`,
      deliverableFields: [
        {
          id: 'repurpose_rule',
          label: 'Sustainable Production System',
          placeholder: 'Select workflow',
          type: 'select',
          options: [
            'Research 1 strong anchor insight and adapt it natively into Video, Carousel, Text Post, and Newsletter formats',
            'Invent 30 unrelated hot takes from scratch every month',
            'Post only blank quote images',
          ],
          helperText: 'Choose scalable quality workflow.',
          validationRule: {
            exactOption: 'Research 1 strong anchor insight and adapt it natively into Video, Carousel, Text Post, and Newsletter formats',
            errorMessage: 'Multiply one deep insight across 4 native formats.',
          },
        },
        {
          id: 'four_formats',
          label: 'Your 4-Format Repurposing Breakdown',
          placeholder: 'List how you adapt the saves/shares insight across 4 formats...',
          type: 'textarea',
          helperText: 'Include carousel and video cleanly (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['carousel'], errorMessage: 'Include carousel alongside video/text/newsletter formats.' },
        },
      ],
    },

    {
      id: 'sm-m6',
      number: '06',
      title: 'Meaningful Metrics: Weighted Engagement Scorer',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'A double-tap Like takes 0.2 seconds; **Saving** a guide or **Sharing** it with a teammate proves high utility and triggers algorithmic distribution! Code `scorePostPerformance(reach, likes, comments, shares, saves)` weighting comments (`2x`), shares (`3x`), and saves (`3x`).',
      keyConcepts: [
        'Raw engagement rate `((likes + comments + shares + saves) / reach) * 100`',
        'Weighted score `likes + comments * 2 + shares * 3 + saves * 3`',
        'Flagging `viralCandidate: weightedScore / reach >= 0.1` cleanly',
      ],
      architectureNote:
        'Optimizing purely for likes rewards cheap memes; weighting saves and shares 3x steers teams toward deeply useful content that converts.',
      deliverableTitle: 'Build scorePostPerformance(...) in index.js',
      deliverablePrompt:
        'Guard `reach <= 0` returning zeroes; otherwise compute `engagementRate` rounded to 2 decimals, `weightedScore = likes + comments * 2 + shares * 3 + saves * 3`, and `viralCandidate: weightedScore / reach >= 0.1`.',
      acceptanceCriteria: [
        'Weights comments 2x, shares 3x, and saves 3x accurately',
        'Computes exact engagementRate % rounded to 2 decimals',
        'Guards reach <= 0 safely and flags viralCandidate >= 0.1',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 06 of 12 · Weighted Engagement Scorer',
        diagram: {
          type: 'flow',
          title: 'Scoring True Content Utility',
          caption: 'Weight intentional actions (Comments 2x, Shares/Saves 3x) to spotlight real high-converting winners.',
          nodes: ['Likes(1x) + Comm(2x)', '+ Shares/Saves (3x)', 'Weighted / Reach >= 0.1'],
        },
        sections: [
          {
            heading: 'Why Saves & Shares Outperform Likes',
            explanation:
              'When someone bookmarks your SQL checklist (`save`) or sends it to their boss (`share`), platforms recognize high dwell utility and push the post into broader discovery feeds.',
            codeLanguage: 'javascript',
            codeSnippet: 'const weightedScore = likes + comments * 2 + shares * 3 + saves * 3;\nconst viralCandidate = weightedScore / reach >= 0.1;',
          },
        ],
        liveExample: {
          title: 'Live Example: Memes vs Utility Guides',
          description: 'Compare 100 passive likes against 30 saves & 15 shares on 1,000 reach.',
          code: 'console.log("High saves/shares:", (20 + 5*2 + 15*3 + 30*3) / 1000 >= 0.1);',
          expectedOutput: 'High saves/shares: true',
        },
        commonMistake: {
          title: 'Dividing by Zero Reach on Drafts',
          wrongWay: 'const engagementRate = ((likes + ...) / reach) * 100;  // NaN on reach=0!',
          rightWay: 'if (reach <= 0) return { engagementRate: 0, weightedScore: 0, viralCandidate: false };',
          whyItHappens:
            'Queued or unpublished drafts have `reach: 0` before distribution begins.',
        },
        tryItMission:
          'Complete `scorePostPerformance(reach, likes, comments, shares, saves)` in index.js.',
      },
      knowledgeCheck: {
        question: 'In modern social analytics, why are Saves and Shares weighted 3x higher than passive Likes?',
        options: [
          'They require higher user intent and drive algorithmic discovery and future conversion',
          'Likes do not count toward reach',
          'Platforms delete posts with too many likes',
        ],
        correctIndex: 0,
        explanation: 'High-intent saves and shares signal lasting reference value to recommendation engines.',
      },
      hints: [
        'Return `{ engagementRate: 0, weightedScore: 0, viralCandidate: false }` if `reach <= 0`.',
        'Compute `engagementRate = Number((((likes + comments + shares + saves) / reach) * 100).toFixed(2))`.',
        'Compute `weightedScore = likes + comments * 2 + shares * 3 + saves * 3` and `viralCandidate = weightedScore / reach >= 0.1`.',
      ],
      referenceSolution: `function scorePostPerformance(reach, likes, comments, shares, saves) {
  if (reach <= 0) {
    return { engagementRate: 0, weightedScore: 0, viralCandidate: false };
  }
  const engagementRate = Number((((likes + comments + shares + saves) / reach) * 100).toFixed(2));
  const weightedScore = likes + comments * 2 + shares * 3 + saves * 3;
  return {
    engagementRate,
    weightedScore,
    viralCandidate: weightedScore / reach >= 0.1,
  };
}

console.log(scorePostPerformance(1000, 40, 10, 15, 25));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function scorePostPerformance(reach, likes, comments, shares, saves) {
  // TODO: Guard reach <= 0 and compute engagementRate, weightedScore, viralCandidate
  return { engagementRate: 0, weightedScore: 0, viralCandidate: false };
}

console.log(scorePostPerformance(1000, 40, 10, 15, 25));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes 9% engagement, weightedScore 180, and viralCandidate true',
          expression:
            'scorePostPerformance(1000, 40, 10, 15, 25).engagementRate === 9 && scorePostPerformance(1000, 40, 10, 15, 25).weightedScore === 180 && scorePostPerformance(1000, 40, 10, 15, 25).viralCandidate === true',
          expectedDescription: 'Accurately scores 9% engagement and 180 weighted score',
        },
        {
          id: 't2',
          label: 'Handles zero reach cleanly without NaN',
          expression: 'scorePostPerformance(0, 0, 0, 0, 0).engagementRate === 0 && scorePostPerformance(0, 0, 0, 0, 0).viralCandidate === false',
          expectedDescription: 'Guards reach <= 0 safely',
        },
        {
          id: 't3',
          label: 'Rejects low-velocity post below 0.1 threshold',
          expression: 'scorePostPerformance(1000, 30, 2, 1, 1).viralCandidate === false',
          expectedDescription: '40 / 1000 = 0.04 -> viralCandidate false',
        },
      ],
    },

    {
      id: 'sm-m7',
      number: '07',
      title: 'Weekly Publishing Cadence & Mix Validator',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Remember Lesson 02’s 4-pillar rule (`<= 25%` promo and at least 1 Education post)? Automate it in code! Build `validateWeeklyMix(pillars)` checking weekly post volume (`>= 4`), promo ceiling (`<= 25%`), and Educational presence.',
      keyConcepts: [
        'Filtering pillar arrays cleanly (`pillars.filter(...)`)',
        'Enforcing `total >= 4`, `promoPct <= 25`, and `eduCount >= 1`',
        'Blocking spammy promo-heavy weeks before scheduling',
      ],
      architectureNote:
        'Automating calendar balance checks stops last-minute sales promos from quietly crowding out educational content.',
      deliverableTitle: 'Build validateWeeklyMix(pillars) in index.js',
      deliverablePrompt:
        'Given an array like `["education", "proof", "bts", "promo"]`, compute `total`, `promoPct = Math.round((promoCount / total) * 100)`, and `balanced: total >= 4 && promoPct <= 25 && eduCount >= 1` (guarding `total === 0`).',
      acceptanceCriteria: [
        'Passes balanced 4-post weeks with <= 25% promo and >= 1 education',
        'Rejects promo-heavy weeks (> 25%) or missing education posts',
        'Guards empty arrays safely',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 07 of 12 · Calendar Balance Validator',
        diagram: {
          type: 'branch-decision',
          title: 'Automated Weekly Calendar Check',
          caption: 'A week ships cleanly only when volume >= 4, promo <= 25%, and education >= 1.',
          nodes: ['pillars[]', 'Vol>=4 & Promo<=25%?', 'balanced: true', 'Rebalance Queue'],
        },
        sections: [
          {
            heading: 'Coding Editorial Discipline',
            explanation:
              'Pass your queued week array into `validateWeeklyMix(["education", "proof", "bts", "promo"])`. Counting `"promo"` and `"education"` entries catches imbalanced weeks automatically.',
            codeLanguage: 'javascript',
            codeSnippet: 'const promoCount = pillars.filter((p) => p === "promo").length;\nconst eduCount = pillars.filter((p) => p === "education").length;\nconst promoPct = Math.round((promoCount / total) * 100);',
          },
        ],
        liveExample: {
          title: 'Live Example: Checking Good vs Spammy Weeks',
          description: 'See 1/4 promo (25%) pass while 2/4 promo (50%) fails.',
          code: 'console.log("1/4 promo ->", Math.round((1/4)*100) <= 25);\nconsole.log("2/4 promo ->", Math.round((2/4)*100) <= 25);',
          expectedOutput: '1/4 promo -> true\n2/4 promo -> false',
        },
        commonMistake: {
          title: 'Dividing by Zero When Array Is Empty',
          wrongWay: 'Math.round((0 / [].length) * 100)  // NaN!',
          rightWay: 'if (total === 0) return { total: 0, promoPct: 0, balanced: false };',
          whyItHappens:
            'An unscheduled week has 0 items and must fail safely.',
        },
        tryItMission:
          'Complete `validateWeeklyMix(pillars)` in index.js.',
      },
      knowledgeCheck: {
        question: 'If a weekly calendar schedules `["promo", "promo", "proof", "education"]`, why should `balanced` return `false`?',
        options: [
          'Promo share is 50%, exceeding the 25% promo ceiling',
          'Because proof posts are forbidden',
          'Because 4 posts are too few',
        ],
        correctIndex: 0,
        explanation: 'Two out of four posts are promotional (50%), exceeding the healthy <= 25% threshold.',
      },
      hints: [
        'Guard `if (total === 0) return { total: 0, promoPct: 0, balanced: false };`.',
        'Count `"promo"` and `"education"` via `.filter(...)`.',
        'Check `total >= 4 && promoPct <= 25 && eduCount >= 1`.',
      ],
      referenceSolution: `function validateWeeklyMix(pillars) {
  const total = pillars.length;
  if (total === 0) return { total: 0, promoPct: 0, balanced: false };
  const promoCount = pillars.filter((p) => p === "promo").length;
  const eduCount = pillars.filter((p) => p === "education").length;
  const promoPct = Math.round((promoCount / total) * 100);
  return {
    total,
    promoPct,
    balanced: total >= 4 && promoPct <= 25 && eduCount >= 1,
  };
}

console.log(validateWeeklyMix(["education", "proof", "bts", "promo"]));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function validateWeeklyMix(pillars) {
  const total = pillars.length;
  // TODO: Compute promoPct and balanced boolean
  return { total, promoPct: 0, balanced: false };
}

console.log(validateWeeklyMix(["education", "proof", "bts", "promo"]));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Approves balanced 4-post week (25% promo + education)',
          expression:
            'validateWeeklyMix(["education", "proof", "bts", "promo"]).promoPct === 25 && validateWeeklyMix(["education", "proof", "bts", "promo"]).balanced === true',
          expectedDescription: '25% promo with education passes balanced check',
        },
        {
          id: 't2',
          label: 'Flags spammy 50% promo week or missing education',
          expression:
            'validateWeeklyMix(["promo", "promo", "proof", "education"]).balanced === false && validateWeeklyMix(["proof", "bts", "bts", "proof"]).balanced === false',
          expectedDescription: 'Rejects > 25% promo and zero-education schedules',
        },
        {
          id: 't3',
          label: 'Handles empty queue cleanly',
          expression: 'validateWeeklyMix([]).balanced === false && validateWeeklyMix([]).total === 0',
          expectedDescription: 'Guards empty list cleanly',
        },
      ],
    },

    {
      id: 'sm-m8',
      number: '08',
      title: 'Community Management & Turning Comments Into Content',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'deliverable',
      lessonSummary:
        'The comment section isn’t a chore—it is free market research! Responding warmly within the first hour boosts post velocity, and turning real buyer questions into **video/carousel replies** guarantees topics people genuinely want.',
      keyConcepts: [
        'Turning top FAQ comments into next week’s highest-converting educational posts',
        'Replying cleanly inside the first 60-minute engagement window',
        'Spotting buying objections directly in audience replies',
      ],
      architectureNote:
        'A video replying directly to a skeptical customer comment often outperforms polished studio ads 3-to-1 because it feels real.',
      deliverableTitle: 'Turn a Real Comment Objection Into Content',
      deliverablePrompt:
        'A prospect comments: *"Looks cool, but migrating 6 months of messy spreadsheets sounds exhausting."* Craft a helpful comment reply AND pitch a follow-up video turning that objection into next week’s post.',
      acceptanceCriteria: [
        'Replies empathetically without getting defensive',
        'Turns the migration objection into a reusable tutorial concept',
        'Uses comment feedback loop cleanly',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 08 of 12 · Comment-to-Content Flywheel',
        diagram: {
          type: 'loop-cycle',
          title: 'Audience Questions Fuel Next Week’s Winners',
          caption: 'Listen to objections in replies, answer warmly, and turn recurring questions into targeted videos.',
          nodes: ['Buyer Comment', 'Warm Reply + Video', 'Higher Trust & Sales'],
        },
        sections: [
          {
            heading: 'Listening Beats Broadcasting',
            explanation:
              'When one person asks *"Does migration take forever?"*, fifty silent readers wondered the exact same thing. Answering with a 30-second screen demo clears that objection at scale.',
          },
        ],
        liveExample: {
          title: 'Live Example: Objection -> Video Reply',
          description: 'Warm, transparent, zero hype.',
          code: 'Reply: "Totally fair worry! CSV import actually maps columns in ~90 seconds — posting a quick screen demo tomorrow showing a messy sheet cleanly imported."\nNext Post: 35s "Watch me import a messy 6-month CSV in 90 seconds" clip.',
          expectedOutput: 'Turns skepticism into high-intent proof.',
        },
        commonMistake: {
          title: 'Deleting Critical Questions or Ignoring Replies',
          wrongWay: 'Leaving skeptical buyer questions unanswered for 4 days.',
          rightWay: 'Answer calmly in <60 mins and turn recurring worries into proof demos.',
          whyItHappens:
            'Silence makes silent bystanders assume the objection is true.',
        },
        tryItMission:
          'Select the comment flywheel practice and write a warm reply + video follow-up pitch.',
      },
      knowledgeCheck: {
        question: 'Why are skeptical buyer comments like "Migration looks too hard" valuable for a Social Specialist?',
        options: [
          'They expose exact objections silent buyers share—turning into high-converting demo posts',
          'They mean you should turn off comments permanently',
          'They lower weighted engagement automatically',
        ],
        correctIndex: 0,
        explanation: 'Turning real objections into visual proof demos clears buying friction at scale.',
      },
      hints: [
        'Select the comment-to-content proof demo strategy.',
        'Include `import` or `demo` / `spreadsheet` in your reply & video idea.',
      ],
      referenceSolution: `1. Flywheel Rule: Reply calmly within 60 minutes and turn recurring objections into transparent proof demos
2. Reply & Follow-Up Idea: "Totally fair worry — CSV import auto-maps messy spreadsheets in under 2 minutes! Here is a 30s screen demo showing a real 6-month file uploaded step by step."`,
      deliverableFields: [
        {
          id: 'community_rule',
          label: 'High-Leverage Community Strategy',
          placeholder: 'Select strategy',
          type: 'select',
          options: [
            'Reply calmly within 60 minutes and turn recurring objections into transparent proof demos',
            'Delete any comment asking skeptical questions about setup',
            'Reply with automated "Check link in bio" to every question',
          ],
          helperText: 'Select trust-building community approach.',
          validationRule: {
            exactOption: 'Reply calmly within 60 minutes and turn recurring objections into transparent proof demos',
            errorMessage: 'Answer objections calmly and turn them into proof demos.',
          },
        },
        {
          id: 'reply_pitch',
          label: 'Warm Reply + Video Demo Pitch',
          placeholder: 'Write your calm reply and 30s migration demo idea...',
          type: 'textarea',
          helperText: 'Address spreadsheet migration/demo clearly (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['demo'], errorMessage: 'Turn the objection into a quick visual demo.' },
        },
      ],
    },

    {
      id: 'sm-m9',
      number: '09',
      title: 'Creator Partnerships & True Attribution Math',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'deliverable',
      lessonSummary:
        'Paying `$2,500` to an influencer purely for `"100,000 guaranteed views"` is a fast way to burn budget on fake or off-audience impressions. Measure **true creator ROI** using dedicated **UTM links + promo codes**, vetted by **save/comment depth** rather than raw follower counts.',
      keyConcepts: [
        'Vetting creators by genuine audience comment depth, not vanity follower count',
        'Attributing creator signups cleanly via unique UTM links + promo codes',
        'Giving creators clear product hooks while preserving their authentic voice',
      ],
      architectureNote:
        'A 15k-follower niche creator with thoughtful peer comments routinely outsells a 500k-follower generic account 5-to-1.',
      deliverableTitle: 'Author a Trackable Creator Partnership Brief',
      deliverablePrompt:
        'Write a creator sponsorship brief requiring unique UTM + promo tracking, vetting criteria, and why raw follower guarantees get rejected.',
      acceptanceCriteria: [
        'Uses unique creator UTM links AND dedicated promo codes for attribution',
        'Vets creators by audience relevance and comment/save engagement',
        'Preserves creator authentic voice rather than rigid corporate scripts',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 09 of 12 · Creator ROI Attribution Spec',
        diagram: {
          type: 'flow',
          title: 'Accountable Creator Attribution',
          caption: 'Vet niche engagement first, issue unique UTM + promo tracking, and tie payouts to measurable conversions.',
          nodes: ['Vet Niche Comments', 'Issue Unique UTM + Code', 'Measure Real CPA/ROI'],
        },
        sections: [
          {
            heading: 'Micro-Creators & Measurable Links',
            explanation:
              'Never hand out flat fees based solely on follower count. Issue `utm_campaign=creator_maya` PLUS code `MAYA20` so both click attribution and word-of-mouth redemptions map directly to ROI.',
          },
        ],
        liveExample: {
          title: 'Live Example: Creator Tracking Spec',
          description: 'Dual tracking catches both direct clickers and viewers searching later.',
          code: 'Vetting: >= 4% genuine comment/save depth in target niche\nTracking: ?utm_source=youtube&utm_campaign=creator_alex + Code ALEX20\nCreative Rule: Provide 3 key facts + let creator tell the story naturally.',
          expectedOutput: 'Measurable creator acquisition ROI.',
        },
        commonMistake: {
          title: 'Evaluating Influencers Strictly by Total Followers',
          wrongWay: 'Paying $5,000 because someone has 400k followers without checking audience comments.',
          rightWay: 'Check real peer comments and require unique UTM + promo attribution.',
          whyItHappens:
            'Bought or mismatched audiences deliver zero conversions despite big view counts.',
        },
        tryItMission:
          'Select the creator vetting method and outline dual UTM + promo tracking in your brief.',
      },
      knowledgeCheck: {
        question: 'What is the most reliable way to measure true revenue ROI from a creator sponsorship?',
        options: [
          'Pair a unique creator UTM link with a dedicated creator promo code and track net conversions',
          'Divide sponsorship cost by total follower count on their profile',
          'Estimate ROI from raw video views alone',
        ],
        correctIndex: 0,
        explanation: 'Combining UTM links with dedicated promo codes captures both immediate clicks and delayed signups.',
      },
      hints: [
        'Pick the unique UTM + promo code + authentic niche engagement option.',
        'Include both `utm` and `promo` inside your creator brief.',
      ],
      referenceSolution: `1. Vetting & Attribution Standard: Vet by genuine niche comment/save quality and track conversions with unique creator UTM links + promo codes
2. Creator Brief: Provide 3 verified product differentiators while letting the creator keep their authentic voice; track every signup using ?utm_campaign=creator_name and dedicated promo code.`,
      deliverableFields: [
        {
          id: 'vetting_choice',
          label: 'Creator Vetting & Attribution Standard',
          placeholder: 'Select standard',
          type: 'select',
          options: [
            'Vet by genuine niche comment/save quality and track conversions with unique creator UTM links + promo codes',
            'Pay solely based on total follower count with zero tracking links',
            'Force every creator to read identical corporate legal scripts word-for-word',
          ],
          helperText: 'Pick ROI-accountable creator methodology.',
          validationRule: {
            exactOption: 'Vet by genuine niche comment/save quality and track conversions with unique creator UTM links + promo codes',
            errorMessage: 'Vet niche engagement and attribute via UTM + promo code.',
          },
        },
        {
          id: 'creator_brief',
          label: 'Creator Tracking & Creative Brief',
          placeholder: 'Specify UTM link, promo code, and authentic creative guidance...',
          type: 'textarea',
          helperText: 'Mention both utm and promo code (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['utm', 'promo'], errorMessage: 'Include both UTM tracking and promo code.' },
        },
      ],
    },

    {
      id: 'sm-m10',
      number: '10',
      title: 'Comment Escalation & Calm Crisis SLAs',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'deliverable',
      lessonSummary:
        'When a real service outage or billing bug breaks, social feeds erupt within minutes! Learn the **Crisis Triage Matrix**: distinguish honest frustrated buyers (empathy + public acknowledgement + move specifics to DM/ticket) from spam bots, inside tight **15–30 minute SLAs**.',
      keyConcepts: [
        'Public transparency + moving personal account details cleanly to private support',
        'Never silently deleting valid outage criticism (triggers Streisand backlash)',
        'Tight 15–30 minute initial crisis response SLAs',
      ],
      architectureNote:
        'Acknowledge outages honestly in public within 15 minutes with status link updates—deleting real users’ complaints turns a 20-minute bug into a PR disaster.',
      deliverableTitle: 'Write a Calm Social Crisis Escalation Response',
      deliverablePrompt:
        'Dozens of users reply on your product post reporting checkout errors (`500`). Choose your escalation SLA, public response, and privacy boundary.',
      acceptanceCriteria: [
        'Keeps crisis initial response SLA between 15 and 30 minutes',
        'Acknowledges outage transparently without deleting real user replies',
        'Moves private account/email details off public threads cleanly',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 10 of 12 · Crisis SLA & Triage Playbook',
        diagram: {
          type: 'branch-decision',
          title: 'Crisis Comment Triage Flow',
          caption: 'Acknowledge valid outage bugs publicly within 15–30m, protect PII in DM/tickets, and block only automated spam.',
          nodes: ['Sudden Replies', 'Real User Bug?', 'Acknowledge + DM PII', 'Hide Spam Bot'],
        },
        sections: [
          {
            heading: 'Transparency Builds Resilience',
            explanation:
              'Pin one clear public update (*"Engineering is resolving the checkout 500 error now — status updates here"*) and ask affected customers to DM their ticket/email rather than sharing personal billing details in public replies.',
          },
        ],
        liveExample: {
          title: 'Live Example: Calm Crisis Reply',
          description: 'Honest, fast, protective of customer privacy.',
          code: 'Public Reply (SLA 15m): "Thank you for flagging this — our engineers are fixing the checkout issue right now. Please DM your account email (never post publicly!) so we can follow up directly."',
          expectedOutput: 'De-escalates panic cleanly.',
        },
        commonMistake: {
          title: 'Hiding Real Outage Replies or Asking for Passwords/Emails Publicly',
          wrongWay: 'Deleting angry bug comments or asking customers to reply with billing info publicly.',
          rightWay: 'Acknowledge transparently publicly + direct PII privately into verified support DMs.',
          whyItHappens:
            'Deleting real user complaints sparks immediate backlash screenshots.',
        },
        tryItMission:
          'Set a tight 15–30 min crisis SLA, select transparent de-escalation, and write your public outage reply.',
      },
      knowledgeCheck: {
        question: 'During a real checkout outage, what happens if a brand deletes every customer comment complaining about it?',
        options: [
          'Trust collapses and frustrated users amplify screenshots publicly',
          'The server bug fixes itself',
          'Weighted engagement doubles positively',
        ],
        correctIndex: 0,
        explanation: 'Deleting valid bug feedback destroys trust; honest status acknowledgment calms crowds quickly.',
      },
      hints: [
        'Enter `15` (or `15–30`) minutes for initial crisis SLA.',
        'Select transparent acknowledgment + private DM escalation.',
        'Warn users not to post private `email` / account info publicly in your reply.',
      ],
      referenceSolution: `1. Crisis Response SLA (minutes): 15
2. Escalation Policy: Acknowledge outage transparently in public and move private account troubleshooting to verified DM/ticket without deleting valid feedback
3. Public Outage Reply: "We hear you and our engineering team is actively resolving the checkout issue right now. Please DM us your account email (keep private info off public comments) so we can follow up with you directly."`,
      deliverableFields: [
        {
          id: 'escalation_sla',
          label: 'Initial Crisis Response SLA (minutes)',
          placeholder: 'e.g., 15',
          type: 'number',
          helperText: 'Set crisis acknowledgement window between 10 and 30 minutes.',
          validationRule: { minNumber: 10, maxNumber: 30, errorMessage: 'Respond to active crises within 10–30 minutes.' },
        },
        {
          id: 'crisis_policy',
          label: 'Crisis Moderation Standard',
          placeholder: 'Select policy',
          type: 'select',
          options: [
            'Acknowledge outage transparently in public and move private account troubleshooting to verified DM/ticket without deleting valid feedback',
            'Mass-delete every critical comment until engineers fix the bug',
            'Argue defensively in replies blaming user browsers',
          ],
          helperText: 'Choose trust-preserving crisis conduct.',
          validationRule: {
            exactOption: 'Acknowledge outage transparently in public and move private account troubleshooting to verified DM/ticket without deleting valid feedback',
            errorMessage: 'Acknowledge transparently and move PII privately without silencing real users.',
          },
        },
        {
          id: 'crisis_reply',
          label: 'Draft Calm Public Outage Reply',
          placeholder: 'Write transparent public update moving private email details to DM...',
          type: 'textarea',
          helperText: 'Include DM/private guidance cleanly (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['dm'], errorMessage: 'Invite users into private DM/ticket while acknowledging publicly.' },
        },
      ],
    },

    {
      id: 'sm-m11',
      number: '11',
      title: 'Monthly Analytics Audit & Content Pruning',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'At the end of every 30 days, prune formats that waste team hours while doubling down on high-save winners! Code `auditMonthlyMix(posts)` comparing average weighted score per format (`video`, `carousel`, `text`) to recommend your top doubling-down format.',
      keyConcepts: [
        'Grouping monthly post performance by creative format',
        'Computing average weighted score per format (`totalScore / count`)',
        'Using data—not personal preference—to prune low-signal formats',
      ],
      architectureNote:
        'Auditing average performance per format keeps small teams focused on their top 1–2 highest-return formats each quarter.',
      deliverableTitle: 'Build pickTopFormat(posts) in index.js',
      deliverablePrompt:
        'Given `posts = [{ format: "carousel", score: 140 }, ...]`, average `score` per `format` and return `{ bestFormat, bestAvg }` rounded to 1 decimal (`null` / `0` on empty list).',
      acceptanceCriteria: [
        'Averages scores accurately per format',
        'Selects the highest-average format cleanly',
        'Handles empty post arrays safely',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 11 of 12 · Monthly Format Winner Selector',
        diagram: {
          type: 'dict-map',
          title: 'Auditing Format Performance Averages',
          caption: 'Sum weighted scores per format, divide by post count in that format, and surface the top performer.',
          nodes: ['carousel', 'avg = 165.0', 'video', 'avg = 120.0'],
        },
        sections: [
          {
            heading: 'Averages Beat Single Lucky Outliers',
            explanation:
              'If you posted 10 quote graphics and only 1 went semi-viral while 9 flopped, averaging weighted scores by format exposes which format actually performs reliably week after week.',
            codeLanguage: 'javascript',
            codeSnippet: 'const stats = {};\nfor (const p of posts) {\n  if (!stats[p.format]) stats[p.format] = { sum: 0, count: 0 };\n  stats[p.format].sum += p.score;\n  stats[p.format].count += 1;\n}',
          },
        ],
        liveExample: {
          title: 'Live Example: Spotting Reliable Formats',
          description: 'Compare 2 carousels averaging 160 against 2 text posts averaging 65.',
          code: 'console.log("Carousel avg:", (140 + 180) / 2, "| Text avg:", (50 + 80) / 2);',
          expectedOutput: 'Carousel avg: 160 | Text avg: 65',
        },
        commonMistake: {
          title: 'Comparing Total Sum Instead of Average Per Post',
          wrongWay: 'If you posted 20 weak text posts summing 200 vs 1 carousel scoring 180, sum picks the weak format!',
          rightWay: 'Divide `sum / count` to get true per-post return.',
          whyItHappens:
            'High posting frequency masks low per-post efficiency unless averaged.',
        },
        tryItMission:
          'Complete `pickTopFormat(posts)` in index.js returning `{ bestFormat, bestAvg }`.',
      },
      knowledgeCheck: {
        question: 'Why should monthly format audits rank formats by *average score per post* rather than raw total score?',
        options: [
          'Comparing averages prevents high-volume weak formats from beating higher-performing low-volume formats',
          'Because arrays cannot sum more than 5 numbers',
          'Averages ignore outliers completely',
        ],
        correctIndex: 0,
        explanation: 'Per-post average measures true return on creative effort per asset produced.',
      },
      hints: [
        'Handle `if (!posts || posts.length === 0) return { bestFormat: null, bestAvg: 0 };`.',
        'Accumulate `{ sum, count }` per `p.format`.',
        'Loop `Object.entries(stats)` to find the highest `Number((v.sum / v.count).toFixed(1))`.',
      ],
      referenceSolution: `function pickTopFormat(posts) {
  if (!posts || posts.length === 0) {
    return { bestFormat: null, bestAvg: 0 };
  }
  const stats = {};
  for (const p of posts) {
    if (!stats[p.format]) stats[p.format] = { sum: 0, count: 0 };
    stats[p.format].sum += p.score;
    stats[p.format].count += 1;
  }
  let bestFormat = null;
  let bestAvg = -1;
  for (const [fmt, data] of Object.entries(stats)) {
    const avg = Number((data.sum / data.count).toFixed(1));
    if (avg > bestAvg) {
      bestAvg = avg;
      bestFormat = fmt;
    }
  }
  return { bestFormat, bestAvg };
}

console.log(pickTopFormat([{ format: "carousel", score: 140 }, { format: "carousel", score: 180 }, { format: "text", score: 65 }]));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function pickTopFormat(posts) {
  if (!posts || posts.length === 0) {
    return { bestFormat: null, bestAvg: 0 };
  }
  // TODO: Compute average score per format and return { bestFormat, bestAvg }
  return { bestFormat: null, bestAvg: 0 };
}

console.log(pickTopFormat([{ format: "carousel", score: 140 }, { format: "carousel", score: 180 }, { format: "text", score: 65 }]));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Selects format with highest average score cleanly',
          expression:
            'pickTopFormat([{ format: "carousel", score: 140 }, { format: "carousel", score: 180 }, { format: "text", score: 90 }, { format: "text", score: 70 }, { format: "text", score: 80 }]).bestFormat === "carousel" && pickTopFormat([{ format: "carousel", score: 140 }, { format: "carousel", score: 180 }, { format: "text", score: 90 }]).bestAvg === 160',
          expectedDescription: 'Carousel avg 160 beats higher-volume text avg 80',
        },
        {
          id: 't2',
          label: 'Handles empty post log safely',
          expression: 'pickTopFormat([]).bestFormat === null && pickTopFormat([]).bestAvg === 0',
          expectedDescription: 'Returns null / 0 cleanly for []',
        },
      ],
    },

    {
      id: 'sm-m12',
      number: '12',
      title: 'Capstone: 30-Day Brand Growth & Creator Engine',
      durationMinutes: 50,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'rubric',
      lessonSummary:
        'Combine every piece built from Lesson 01–11—platform-native adaptation, balanced 4-pillar cadences (`<= 25%` promo), 3-second zero-fluff hooks, 1-to-4 repurposing, weighted save/share scoring, creator UTM/promo attribution, and calm crisis SLAs—into your 30-Day Social Growth Playbook.',
      keyConcepts: [
        'Connecting creative pacing (3-second hooks, 1-to-4 repurposing) to weighted save/share metrics',
        'Governing weekly pillar balance (`<= 25%` promo) and creator UTM/promo ROI',
        'Protecting brand trust via transparent 15–30 min crisis SLAs',
      ],
      architectureNote:
        'Sustainable organic social growth treats creativity and analytics as partners—testing hooks systematically while attributing creator ROI and calming crises gracefully.',
      deliverableTitle: 'Submit 30-Day Brand Growth Engine Playbook',
      deliverablePrompt:
        'Present your complete Social Media Capstone Playbook detailing: (1) Native platform adaptation, 4 pillars (`<= 25%` promo), 3-second hooks, and 1-to-4 repurposing, (2) Weighted engagement scoring (3x saves/shares) & monthly format auditing, and (3) Creator UTM + promo ROI attribution + transparent crisis SLAs.',
      acceptanceCriteria: [
        'Covers 4 pillars (<=25% promo), 3-second hooks, and 1-to-4 repurposing',
        'Details weighted save/share analytics and monthly format average pruning',
        'Specifies creator UTM + promo attribution and transparent crisis SLA handling',
        'Scores >= 80 / 100 on the Mentor Rubric to unlock your Social Media Certificate',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 12 of 12 · Complete Social Growth Capstone',
        diagram: {
          type: 'capstone-assembly',
          title: '30-Day Brand Growth Engine',
          caption: 'Balanced pillars + 3-second hooks + 3x save/share scoring + creator UTMs + crisis SLAs run smoothly.',
          nodes: ['Pillars, Hooks & 1-to-4', 'Weighted Save/Share Audit', 'Creator UTM + Crisis SLA'],
        },
        sections: [
          {
            heading: 'Look Back Across All 11 Social Building Blocks',
            explanation:
              'You built from platform intent & 4 pillars (`<= 25%` promo) up through 3-second hooks, retention arcs, 1-to-4 repurposing, weighted JS engagement & calendar validators, comment-to-content flywheels, creator UTMs, and crisis SLAs.',
          },
        ],
        liveExample: {
          title: 'Live Example: 30-Day Playbook Summary',
          description: 'Address Creative System, Weighted Analytics, and Creator/Crisis Governance.',
          code: '1. Creative Engine: Cap promo <=25% across 4 pillars, eliminate greetings with 3-second Frame-1 hooks, and repurpose 1 insight into 4 native formats.\n2. Weighted Analytics: Score saves/shares 3x over passive likes and prune formats using monthly per-post averages.\n3. Creators & Crisis: Attribute creator ROI via unique UTMs + promo codes, and acknowledge outages publicly within 15m moving PII to DM.',
          expectedOutput: 'Verified >= 80/100 Capstone Rubric Score',
        },
        commonMistake: {
          title: 'Chasing Raw Likes & Follower Counts Alone',
          wrongWay: '"We will post daily promos and pick influencers with the most followers."',
          rightWay: '"We cap promos at 25%, score saves/shares 3x, vet creators by niche depth + UTM/promo ROI, and maintain 15m crisis SLAs."',
          whyItHappens:
            'Vanity impressions rarely produce loyal customers or sustainable algorithmic reach.',
        },
        tryItMission:
          'Write your >= 65-word 30-Day Social Growth Capstone Playbook and click Verify & Mint Certificate.',
      },
      knowledgeCheck: {
        question: 'Which three systems turn social channels into a measurable brand growth engine?',
        options: [
          'Balanced <=25% promo pillars + 3s hooks, 3x weighted save/share analytics, and creator UTM/promo + 15m crisis SLAs',
          'Identical daily sales flyers across every app',
          'Deleting customer outage comments and paying solely by follower count',
        ],
        correctIndex: 0,
        explanation: 'High-utility creative hooks paired with save/share analytics, creator attribution, and calm crisis response compound sustainably.',
      },
      hints: [
        'Mention `pillar` / `25%`, `hook`, and `repurpos` in Criterion 1.',
        'Mention `save`, `share`, and `average` / `audit` in Criterion 2.',
        'Mention `utm`, `promo`, and `crisis` / `sla` in Criterion 3.',
      ],
      referenceSolution: `1. Creative Engine & Pillar Balance: Our 30-day calendar balances Education, Proof, Behind-the-Scenes, and <= 25% Promo posts, opening every video with zero-fluff 3-second hooks and repurposing 1 deep insight across 4 platform-native formats.
2. Weighted Analytics & Pruning: Instead of vanity likes, we score saves and shares 3x higher than likes and run monthly per-post average audits to prune weak formats and scale winners.
3. Creator Attribution & Crisis SLA: Creators are vetted on authentic audience comments and tracked with unique UTM links plus promo codes, while real outages receive transparent 15-minute public replies moving PII cleanly to private DMs.`,
      rubricCriteria: [
        {
          id: 'r1',
          criterion: '4-Pillar Balance, 3s Hooks & 1-to-4 Repurposing',
          weight: 35,
          targetDescription:
            'Covers <= 25% promo cap, zero-fluff 3-second hooks, and platform-native 1-to-4 repurposing.',
          requiredKeywordHints: ['pillar', 'hook', '25'],
          minWordCount: 15,
        },
        {
          id: 'r2',
          criterion: 'Weighted Save/Share Metrics & Format Auditing',
          weight: 35,
          targetDescription:
            'Weights saves/shares 3x over passive likes and uses per-post averages for monthly pruning.',
          requiredKeywordHints: ['save', 'share', 'average'],
          minWordCount: 15,
        },
        {
          id: 'r3',
          criterion: 'Creator UTM Attribution & Crisis SLA Governance',
          weight: 30,
          targetDescription:
            'Specifies UTM + promo creator attribution and transparent 15–30m crisis escalation without deleting feedback.',
          requiredKeywordHints: ['utm', 'promo', 'crisis'],
          minWordCount: 15,
        },
      ],
    },
  ],
};
