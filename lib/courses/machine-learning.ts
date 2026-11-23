import type { Course } from '../curriculum-types';

export const MACHINE_LEARNING_COURSE: Course = {
  id: 'machine-learning-engineering',
  slug: 'machine-learning-engineering',
  track: 'Engineering, AI & Automation',
  level: 'Intermediate',
  title: 'Machine Learning Engineer',
  subtitle:
    'Start from what Machine Learning actually is and build every piece in pure Python—averages, variance, Z-score scaling, linear predictions, gradient descent, sigmoid risk, precision/recall/F1, and cosine similarity—into a Fraud Scoring Engine.',
  durationHours: 28,
  rating: 4.9,
  reviewCount: 5180,
  instructor: {
    name: 'Dr. Kenji Takahashi',
    role: 'Staff ML Architect',
    organization: 'CortexBench Labs',
  },
  thumbnailKey: 'software-ai',
  primaryMode: 'sandbox',
  primaryRuntime: 'python',
  capstoneTitle: 'End-to-End Fraud & Risk Scoring Engine',
  capstoneSummary:
    'Implement an end-to-end machine learning pipeline from scratch in Python—combining feature standardization, gradient descent training, sigmoid probability scoring, F1 evaluation, and cosine anomaly retrieval.',
  capstoneDeliverables: [
    'Feature mean, variance, and Z-score scaler with zero-variance guard',
    'Linear prediction model, MSE loss, and gradient descent weight optimizer',
    'Clamped sigmoid fraud classifier & Precision/Recall/F1 metrics calculator',
    'Cosine similarity anomaly matcher & Fraud Engine Capstone Brief',
  ],
  outcomes: [
    'Distinguish rules-based code from data-driven Machine Learning models',
    'Standardize raw numeric features cleanly without zero-division crashes',
    'Train linear weights via gradient descent and score risks via sigmoid',
    'Evaluate imbalanced classifiers using Precision, Recall, F1, and cosine distance',
  ],
  modules: [
    {
      id: 'ml-m1',
      number: '01',
      title: 'What Is Machine Learning? Rules vs Learned Patterns',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Traditional programs follow rigid rules written by humans; Machine Learning learns numeric weights directly from labeled examples (`features` + `labels`). Write your very first risk score formula using simple feature weights.',
      keyConcepts: [
        'Features (numeric inputs like `amount` and `attempts`) vs Labels (`0` safe / `1` fraud)',
        'Why weighted scores beat brittle nested `if` trees',
        'Combining inputs with learned importance weights',
      ],
      architectureNote:
        'Underneath every neural network or classifier lies the exact same building block: multiplying input features by learned weights.',
      deliverableTitle: 'Write compute_risk_score(amount_k, failed_logins)',
      deliverablePrompt:
        'Write `compute_risk_score(amount_k, failed_logins)` returning `round(amount_k * 0.4 + failed_logins * 0.3, 2)` and print the score for `(2.0, 3)`.',
      acceptanceCriteria: [
        'Multiplies amount_k by 0.4 and failed_logins by 0.3',
        'Rounds combined risk score to 2 decimals',
        'Prints the preview result cleanly',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 01 of 12 · Features & Weighted Score',
        diagram: {
          type: 'flow',
          title: 'Traditional Rules vs Weighted ML Scoring',
          caption: 'Machine learning multiplies real numeric features by learned weights to produce a continuous risk score.',
          nodes: ['Features (x1, x2)', 'Multiply by Weights', 'Risk Score'],
        },
        sections: [
          {
            heading: 'What Is Machine Learning?',
            explanation:
              'In traditional coding, you guess thresholds by hand (`if amount > 500:`). In Machine Learning, you give the computer historical examples (features `x` and known outcomes `y`) so it discovers weights showing how strongly each signal predicts risk.',
            analogy: 'Like judging house prices: instead of memorizing every street, you assign weights to square footage, bedrooms, and location.',
          },
          {
            heading: 'Turning Signals into Numbers',
            explanation:
              'Every observation becomes numbers—such as `amount_k` (thousands of dollars) and `failed_logins`. Multiplying each feature by a weight turns clues into a single score.',
            codeLanguage: 'python',
            codeSnippet: 'score = amount_k * 0.4 + failed_logins * 0.3\nprint(round(score, 2))',
          },
        ],
        liveExample: {
          title: 'Live Example: Simple Weighted Check',
          description: 'See how two numeric features combine into a single risk signal.',
          code: 'amount_k = 1.5\nfailed_logins = 2\nscore = round(amount_k * 0.4 + failed_logins * 0.3, 2)\nprint("Score:", score)',
          expectedOutput: 'Score: 1.2',
        },
        commonMistake: {
          title: 'Forgetting Parentheses or Rounding',
          wrongWay: 'return amount_k * 0.4 + failed_logins * 0.3  # Gives 1.7000000000000002',
          rightWay: 'return round(amount_k * 0.4 + failed_logins * 0.3, 2)',
          whyItHappens:
            'Binary floating-point math produces tiny trailing decimals unless rounded cleanly.',
        },
        tryItMission:
          'Complete `compute_risk_score(amount_k, failed_logins)` and print `compute_risk_score(2.0, 3)`.',
      },
      knowledgeCheck: {
        question: 'In Machine Learning, what are "features"?',
        options: [
          'The measurable numeric input attributes used to make a prediction',
          'Marketing bullet points on a website',
          'Random strings with no meaning',
        ],
        correctIndex: 0,
        explanation: 'Features are the numeric inputs (like transaction size or failed login count) fed into a model.',
      },
      hints: [
        'Multiply `amount_k * 0.4` and add `failed_logins * 0.3`.',
        'Wrap the sum inside `round(..., 2)`.',
        'Print `compute_risk_score(2.0, 3)` at the bottom.',
      ],
      referenceSolution: `def compute_risk_score(amount_k, failed_logins):
  return round(amount_k * 0.4 + failed_logins * 0.3, 2)

print("Risk Score:", compute_risk_score(2.0, 3))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def compute_risk_score(amount_k, failed_logins):
  # TODO: Return round(amount_k * 0.4 + failed_logins * 0.3, 2)
  return 0.0

print("Risk Score:", compute_risk_score(2.0, 3))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Scores risky pattern (2.0, 3) cleanly',
          expression: 'compute_risk_score(2.0, 3) == 1.7',
          expectedDescription: 'Returns 1.7 for (2.0, 3)',
        },
        {
          id: 't2',
          label: 'Returns 0.0 when signals are zero',
          expression: 'compute_risk_score(0, 0) == 0.0',
          expectedDescription: 'Returns 0.0 for (0, 0)',
        },
      ],
    },

    {
      id: 'ml-m2',
      number: '02',
      title: 'Feature Vectors & Baseline Averages',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Before a model knows whether a $400 charge is suspicious, it needs to know what "normal" looks like. Compute feature means (`sum(values) / len(values)`) safely in Python.',
      keyConcepts: [
        'Representing a column of observations as a numeric list (vector)',
        'Computing arithmetic mean baseline safely',
        'Guarding empty lists so mean calculation never crashes',
      ],
      architectureNote:
        'Mean baselines anchor feature scaling and anomaly detection across every tabular ML workflow.',
      deliverableTitle: 'Write feature_mean(values) in main.py',
      deliverablePrompt:
        'Complete `feature_mean(values)` returning `round(sum(values) / len(values), 2)`, or `0.0` if `values` is empty.',
      acceptanceCriteria: [
        'Computes exact arithmetic mean rounded to 2 decimals',
        'Returns 0.0 safely if values list is empty',
        'Works for both positive and negative numbers',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 02 of 12 · Feature Baseline Mean',
        diagram: {
          type: 'flow',
          title: 'Finding the Center of a Feature',
          caption: 'Summing all values and dividing by the count gives the average baseline for that column.',
          nodes: ['[10, 20, 30]', 'sum(values) / len', 'Mean = 20.0'],
        },
        sections: [
          {
            heading: 'What Is a Feature Vector?',
            explanation:
              'A list of numbers like `[12, 18, 30]` is called a vector in Machine Learning. Measuring its average (`mean`) gives your model a center point to compare new transactions against.',
            codeLanguage: 'python',
            codeSnippet: 'def feature_mean(values):\n  if len(values) == 0:\n    return 0.0\n  return round(sum(values) / len(values), 2)',
          },
        ],
        liveExample: {
          title: 'Live Example: Average Transaction Amount',
          description: 'Compute the mean of four sample charges safely.',
          code: 'charges = [10, 20, 30, 60]\nmean = round(sum(charges) / len(charges), 2)\nprint("Mean charge:", mean)',
          expectedOutput: 'Mean charge: 30.0',
        },
        commonMistake: {
          title: 'Skipping the Empty-List Check',
          wrongWay: 'return sum(values) / len(values)  # ZeroDivisionError on []!',
          rightWay: 'if len(values) == 0:\n  return 0.0',
          whyItHappens:
            'Always guard `len(values) == 0` before dividing in ML preprocessing utilities.',
        },
        tryItMission:
          'Complete `feature_mean(values)` handling empty lists cleanly.',
      },
      knowledgeCheck: {
        question: 'What happens if `feature_mean([])` tries `sum(values) / len(values)` without checking length?',
        options: [
          'Python raises a ZeroDivisionError',
          'Python automatically returns 0.0',
          'Python converts the list to a string',
        ],
        correctIndex: 0,
        explanation: 'Dividing by `len([])` (which is `0`) causes an immediate runtime crash unless guarded first.',
      },
      hints: [
        'Check `if len(values) == 0: return 0.0` at the top.',
        'Compute `sum(values) / len(values)` and wrap in `round(..., 2)`.',
      ],
      referenceSolution: `def feature_mean(values):
  if len(values) == 0:
    return 0.0
  return round(sum(values) / len(values), 2)

print("Mean:", feature_mean([10, 20, 30, 60]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def feature_mean(values):
  # TODO: Guard empty list and return rounded mean
  return 0.0

print("Mean:", feature_mean([10, 20, 30, 60]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes exact rounded mean',
          expression: 'feature_mean([10, 20, 30, 60]) == 30.0 and feature_mean([1, 2, 4]) == 2.33',
          expectedDescription: 'Returns 30.0 and 2.33 cleanly',
        },
        {
          id: 't2',
          label: 'Guards empty list safely',
          expression: 'feature_mean([]) == 0.0',
          expectedDescription: 'Returns 0.0 on empty list',
        },
      ],
    },

    {
      id: 'ml-m3',
      number: '03',
      title: 'Measuring Spread: Variance & Standard Deviation',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Two datasets can have the same average of 50—one tightly clustered `[49, 50, 51]` and one wild `[0, 50, 100]`. Learn how Variance and Standard Deviation measure how spread out numbers are.',
      keyConcepts: [
        'Distance from the mean: `(x - mean) ** 2`',
        'Averaging squared distances to get Variance',
        'Taking `math.sqrt(variance)` to return to original units (Standard Deviation)',
      ],
      architectureNote:
        'Squaring `(x - mean)` stops positive and negative distances from canceling out; taking the square root brings units back to dollars or counts.',
      deliverableTitle: 'Write feature_std(values) using math.sqrt',
      deliverablePrompt:
        'Compute population standard deviation in `feature_std(values)`: find `mean`, average `[(x - mean) ** 2 for x in values]`, and return `round(math.sqrt(variance), 4)` (or `0.0` if empty).',
      acceptanceCriteria: [
        'Computes mean and squared deviations cleanly',
        'Returns population standard deviation rounded to 4 decimals',
        'Returns 0.0 when values are identical or empty',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 03 of 12 · Feature Spread Calculator',
        diagram: {
          type: 'flow',
          title: 'From Raw Values to Standard Deviation',
          caption: 'Subtract the mean, square each gap, average them into variance, and take the square root.',
          nodes: ['(x - mean)**2', 'Average = Variance', 'sqrt -> Std Dev'],
        },
        sections: [
          {
            heading: 'Why Average Alone Isn’t Enough',
            explanation:
              'If daily spend averages `$50`, seeing a `$120` charge means nothing until you know the normal spread (standard deviation). If `std` is `$5`, `$120` is wild! If `std` is `$80`, `$120` is ordinary.',
            codeLanguage: 'python',
            codeSnippet: 'import math\nmean = sum(vals) / len(vals)\nvariance = sum([(x - mean) ** 2 for x in vals]) / len(vals)\nstd = math.sqrt(variance)',
          },
        ],
        liveExample: {
          title: 'Live Example: Tight vs Wide Spread',
          description: 'See how `[10, 20, 30]` produces `std = 8.165` while `[5, 5, 5]` gives `0.0`.',
          code: 'import math\nvals = [10, 20, 30]\nmean = sum(vals) / len(vals)\nvariance = sum([(x - mean) ** 2 for x in vals]) / len(vals)\nprint("Std:", round(math.sqrt(variance), 4))',
          expectedOutput: 'Std: 8.165',
        },
        commonMistake: {
          title: 'Forgetting to Square `(x - mean)`',
          wrongWay: 'sum([x - mean for x in vals])  # Always equals 0!',
          rightWay: 'sum([(x - mean) ** 2 for x in vals])',
          whyItHappens:
            'Negative differences and positive differences cancel to zero unless squared first.',
        },
        tryItMission:
          'Implement `feature_std(values)` returning `round(math.sqrt(variance), 4)`.',
      },
      knowledgeCheck: {
        question: 'Why do we square `(x - mean)` when calculating variance?',
        options: [
          'So values below and above the mean do not cancel out to zero',
          'Because Python cannot subtract without exponents',
          'To force standard deviation to always equal 1',
        ],
        correctIndex: 0,
        explanation: 'Squaring makes every deviation positive so spread does not cancel out around the mean.',
      },
      hints: [
        'Guard `if len(values) == 0: return 0.0` at the top.',
        'Compute `mean = sum(values) / len(values)`.',
        'Use `variance = sum([(x - mean) ** 2 for x in values]) / len(values)` and `math.sqrt(variance)`.',
      ],
      referenceSolution: `import math

def feature_std(values):
  if len(values) == 0:
    return 0.0
  mean = sum(values) / len(values)
  variance = sum([(x - mean) ** 2 for x in values]) / len(values)
  return round(math.sqrt(variance), 4)

print("Std:", feature_std([10, 20, 30]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `import math

def feature_std(values):
  if len(values) == 0:
    return 0.0
  # TODO: Compute mean, variance, and rounded sqrt(variance)
  return 0.0

print("Std:", feature_std([10, 20, 30]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes population standard deviation cleanly',
          expression: 'feature_std([10, 20, 30]) == 8.165',
          expectedDescription: 'Returns 8.165 for [10, 20, 30]',
        },
        {
          id: 't2',
          label: 'Returns 0.0 for constant or empty lists',
          expression: 'feature_std([5, 5, 5]) == 0.0 and feature_std([]) == 0.0',
          expectedDescription: 'Zero spread and empty input return 0.0',
        },
      ],
    },

    {
      id: 'ml-m4',
      number: '04',
      title: 'Feature Scaling with Z-Score Normalization',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Now snap Lessons 02 and 03 together! Raw amounts (`$10,000`) overpower small counts (`2` logins). Standardize any feature list using Z-score `(x - mean) / std`, guarding `std == 0`.',
      keyConcepts: [
        'Centering data around 0 with unit standard deviation (`z = (x - mean) / std`)',
        'Handling zero-variance constant columns safely (`[0.0 for _ in values]`)',
        'Handling empty feature vectors cleanly',
      ],
      architectureNote:
        'Guard `if std == 0:` before dividing so constant columns (like all `5`s) map smoothly to `0.0` instead of crashing.',
      deliverableTitle: 'Complete z_score_scale(values) in main.py',
      deliverablePrompt:
        'Write `z_score_scale(values)` returning `[round((x - mean) / std, 4) for x in values]`, returning `[]` on empty input and `[0.0 for _ in values]` when `std == 0`.',
      acceptanceCriteria: [
        'Standardizes [10, 20, 30] to [-1.2247, 0.0, 1.2247]',
        'Handles zero-variance constant lists without dividing by zero',
        'Handles empty list [] safely',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 04 of 12 · Feature Z-Score Normalizer',
        diagram: {
          type: 'flow',
          title: 'Putting Features on One Fair Scale',
          caption: 'Subtracting the mean centers values at 0; dividing by std puts dollars and counts on the same unit scale.',
          nodes: ['Raw [10, 20, 30]', '(x - mean) / std', '[-1.2247, 0, 1.2247]'],
        },
        sections: [
          {
            heading: 'Why Unscaled Features Break Models',
            explanation:
              'If feature A is `annual_income` (`85,000`) and feature B is `recent_alerts` (`2`), gradient updates swing wildly toward income solely because the numbers are bigger. Z-score scaling fixes this completely.',
          },
          {
            heading: 'Protecting Constant Columns',
            explanation:
              'If every transaction in a batch equals `$5.00`, `std` is `0`. Check `if std == 0:` and return `[0.0 for _ in values]` so your training job never halts with `ZeroDivisionError`.',
            codeLanguage: 'python',
            codeSnippet: 'if std == 0:\n  return [0.0 for _ in values]',
          },
        ],
        liveExample: {
          title: 'Live Example: Scaling a Batch',
          description: 'Run Z-score scaling over `[10, 20, 30]` and `[5, 5]`.',
          code: 'import math\nvals = [10, 20, 30]\nmean = sum(vals) / len(vals)\nstd = math.sqrt(sum([(x - mean) ** 2 for x in vals]) / len(vals))\nprint([round((x - mean) / std, 4) for x in vals])',
          expectedOutput: '[-1.2247, 0.0, 1.2247]',
        },
        commonMistake: {
          title: 'Dividing Without Guarding `std == 0`',
          wrongWay: 'return [(x - mean) / std for x in values]  # Crashes on [7, 7, 7]!',
          rightWay: 'if std == 0:\n  return [0.0 for _ in values]',
          whyItHappens:
            'Real datasets routinely contain constant or all-zero feature slices.',
        },
        tryItMission:
          'Complete `z_score_scale(values)` with empty-list and zero-variance guards.',
      },
      knowledgeCheck: {
        question: 'What should `z_score_scale([5, 5, 5])` return?',
        options: ['[0.0, 0.0, 0.0]', 'Raise ZeroDivisionError', '[5.0, 5.0, 5.0]'],
        correctIndex: 0,
        explanation: 'Every point sits at the mean (distance 0), and guarding `std == 0` avoids division by zero.',
      },
      hints: [
        'Return `[]` right away if `len(values) == 0`.',
        'Compute `mean`, `variance`, and `std = math.sqrt(variance)`.',
        'If `std == 0`, return `[0.0 for _ in values]`, else `[round((x - mean) / std, 4) for x in values]`.',
      ],
      referenceSolution: `import math

def z_score_scale(values):
  if len(values) == 0:
    return []
  mean = sum(values) / len(values)
  variance = sum([(x - mean) ** 2 for x in values]) / len(values)
  std = math.sqrt(variance)
  if std == 0:
    return [0.0 for _ in values]
  return [round((x - mean) / std, 4) for x in values]

print("Scaled:", z_score_scale([10, 20, 30]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `import math

def z_score_scale(values):
  if len(values) == 0:
    return []
  # TODO: Compute mean, std, guard std == 0, and return z-scores rounded to 4 decimals
  return values

print("Scaled:", z_score_scale([10, 20, 30]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes symmetric Z-scores',
          expression: 'z_score_scale([10, 20, 30])[0] == -1.2247 and z_score_scale([10, 20, 30])[1] == 0.0',
          expectedDescription: 'Maps [10, 20, 30] to [-1.2247, 0.0, 1.2247]',
        },
        {
          id: 't2',
          label: 'Guards zero-variance constant vectors',
          expression: 'z_score_scale([5, 5, 5])[0] == 0.0 and len(z_score_scale([5, 5, 5])) == 3',
          expectedDescription: 'Returns [0.0, 0.0, 0.0] without crashing',
        },
        {
          id: 't3',
          label: 'Handles empty list gracefully',
          expression: 'len(z_score_scale([])) == 0',
          expectedDescription: 'Returns [] for empty input',
        },
      ],
    },

    {
      id: 'ml-m5',
      number: '05',
      title: 'Linear Predictions & Mean Squared Error (MSE)',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'How does a model know whether its weights are good or terrible? By making predictions `pred = w * x + b` and measuring Mean Squared Error (`(pred - y) ** 2`) across training examples.',
      keyConcepts: [
        'Linear prediction equation `y_hat = w * x + b`',
        'Residuals (`pred - y`) and why errors are squared',
        'Computing Mean Squared Error (MSE) as a model scorecard',
      ],
      architectureNote:
        'A lower MSE means closer predictions. Every training loop tries to shrink MSE step by step.',
      deliverableTitle: 'Write mean_squared_error(xs, ys, w, b)',
      deliverablePrompt:
        'Given paired lists `xs` and `ys`, weight `w`, and bias `b`, predict `pred = w * x + b` for each pair using `zip(xs, ys)`, square each error `(pred - y) ** 2`, and return the mean rounded to 4 decimals.',
      acceptanceCriteria: [
        'Returns 0.0 when predictions match ys perfectly',
        'Computes exact MSE across paired (x, y) points',
        'Handles empty lists safely returning 0.0',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 05 of 12 · Loss Scorecard (MSE)',
        diagram: {
          type: 'flow',
          title: 'Measuring Model Error (MSE)',
          caption: 'Compute pred = w*x + b, square how far it missed y, and average across all examples.',
          nodes: ['pred = w*x + b', '(pred - y) ** 2', 'Average = MSE'],
        },
        sections: [
          {
            heading: 'What Is a Loss Function?',
            explanation:
              'Before a model can improve, it needs a single score measuring how wrong it currently is. Mean Squared Error (MSE) averages the squared mistakes across every point so huge misses are punished strongly.',
            codeLanguage: 'python',
            codeSnippet: 'for x, y in zip(xs, ys):\n  pred = w * x + b\n  total_sq += (pred - y) ** 2',
          },
        ],
        liveExample: {
          title: 'Live Example: Checking Prediction Error',
          description: 'When `w = 2, b = 0` matches `y = 2x` perfectly, MSE equals `0.0`.',
          code: 'xs = [1, 2, 3]\nys = [2, 4, 6]\nerr = sum([((2 * x + 0) - y) ** 2 for x, y in zip(xs, ys)]) / len(xs)\nprint("MSE:", err)',
          expectedOutput: 'MSE: 0.0',
        },
        commonMistake: {
          title: 'Averaging Raw `(pred - y)` Without Squaring',
          wrongWay: '((2 - 4) + (6 - 4)) / 2 == 0  # +2 and -2 cancel out!',
          rightWay: '((pred - y) ** 2)',
          whyItHappens:
            'Squaring keeps errors positive so over-predictions and under-predictions never hide each other.',
        },
        tryItMission:
          'Complete `mean_squared_error(xs, ys, w, b)` using `zip(xs, ys)`.',
      },
      knowledgeCheck: {
        question: 'What does an MSE of `0.0` tell you about `w` and `b` on training points?',
        options: [
          'The line `w * x + b` hits every single target `y` with zero error',
          'The model crashed',
          'Half the predictions were wrong',
        ],
        correctIndex: 0,
        explanation: 'MSE = 0.0 means `(pred - y) ** 2` was 0 for every point.',
      },
      hints: [
        'Check `if len(xs) == 0: return 0.0`.',
        'Loop `for x, y in zip(xs, ys):` and add `(w * x + b - y) ** 2`.',
        'Return `round(total / len(xs), 4)`.',
      ],
      referenceSolution: `def mean_squared_error(xs, ys, w, b):
  if len(xs) == 0:
    return 0.0
  total = 0.0
  for x, y in zip(xs, ys):
    pred = w * x + b
    total += (pred - y) ** 2
  return round(total / len(xs), 4)

print("MSE:", mean_squared_error([1, 2, 3], [2, 4, 6], 1.5, 0.0))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def mean_squared_error(xs, ys, w, b):
  if len(xs) == 0:
    return 0.0
  # TODO: Loop with zip(xs, ys) and compute rounded mean squared error
  return 0.0

print("MSE:", mean_squared_error([1, 2, 3], [2, 4, 6], 1.5, 0.0))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Returns 0.0 when predictions are exact',
          expression: 'mean_squared_error([1, 2, 3], [2, 4, 6], 2.0, 0.0) == 0.0',
          expectedDescription: 'Perfect line gives MSE == 0.0',
        },
        {
          id: 't2',
          label: 'Computes MSE accurately for imperfect weights',
          expression: 'mean_squared_error([1, 2, 3], [2, 4, 6], 1.5, 0.0) == 1.1667',
          expectedDescription: 'Returns 1.1667 for w=1.5',
        },
      ],
    },

    {
      id: 'ml-m6',
      number: '06',
      title: 'Gradient Descent Step-by-Step',
      durationMinutes: 40,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Now watch a model learn! Use the MSE error from Lesson 05 to nudge weight `w` and bias `b` downhill using gradients and learning rate `lr`.',
      keyConcepts: [
        'Accumulating error gradients `dw += err * x` and `db += err`',
        'Updating parameters downhill: `new_w = w - lr * (2 / n) * dw`',
        'Role of the learning rate (`lr`) in controlling step size',
      ],
      architectureNote:
        'Every modern optimizer (SGD, Adam) builds directly on this loop: predict, measure error, compute slope, and nudge weights.',
      deliverableTitle: 'Complete gradient_step(xs, ys, w, b, lr)',
      deliverablePrompt:
        'Accumulate `dw += (w * x + b - y) * x` and `db += (w * x + b - y)` over `zip(xs, ys)`, then return `{"w": round(w - lr * ((2 / n) * dw), 4), "b": round(b - lr * ((2 / n) * db), 4)}`.',
      acceptanceCriteria: [
        'Computes exact MSE gradients dw and db',
        'Updates w and b toward true slope cleanly',
        'Rounds updated w and b to 4 decimals',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 06 of 12 · Weight Optimizer Step',
        diagram: {
          type: 'loop-cycle',
          title: 'How Gradient Descent Learns',
          caption: 'Compute error slope, multiply by learning rate lr, and take one step downhill to reduce MSE.',
          nodes: ['w, b', 'err = pred - y', 'w - lr * grad'],
        },
        sections: [
          {
            heading: 'Walking Downhill in the Dark',
            explanation:
              'If you stand on a hillside (MSE loss) in the fog, checking the slope beneath your feet tells you which direction goes down. Multiplying that slope by a small `learning_rate` (`lr = 0.05`) moves `w` and `b` closer to the bottom.',
            codeLanguage: 'python',
            codeSnippet: 'new_w = round(w - lr * ((2 / n) * dw), 4)\nnew_b = round(b - lr * ((2 / n) * db), 4)',
          },
        ],
        liveExample: {
          title: 'Live Example: One Optimization Step',
          description: 'See `w` move automatically from `0.0` toward `2.0`.',
          code: 'xs, ys = [1, 2, 3], [2, 4, 6]\ndw = sum([((0 * x) - y) * x for x, y in zip(xs, ys)])\nprint("New w after 1 step:", round(0 - 0.05 * (2 / len(xs)) * dw, 4))',
          expectedOutput: 'New w after 1 step: 0.9333',
        },
        commonMistake: {
          title: 'Adding Instead of Subtracting the Gradient',
          wrongWay: 'w + lr * grad  # Climbs UPHILL and explodes loss!',
          rightWay: 'w - lr * grad  # Steps DOWNHILL toward lower MSE',
          whyItHappens:
            'The gradient points uphill toward *higher* error, so optimization must subtract it.',
        },
        tryItMission:
          'Complete `gradient_step(xs, ys, w, b, lr)` in main.py.',
      },
      knowledgeCheck: {
        question: 'Why do we subtract `lr * gradient` instead of adding it?',
        options: [
          'Because the gradient points uphill toward higher error; subtracting steps downhill',
          'Because learning rates are negative numbers',
          'To force `w` to stay at 0 forever',
        ],
        correctIndex: 0,
        explanation: 'Gradient descent moves opposite the upward slope so prediction loss decreases each step.',
      },
      hints: [
        'Loop `for x, y in zip(xs, ys):`, compute `err = (w * x + b) - y`.',
        'Accumulate `dw += err * x` and `db += err`.',
        'Return `{"w": round(w - lr * ((2 / n) * dw), 4), "b": round(b - lr * ((2 / n) * db), 4)}`.',
      ],
      referenceSolution: `def gradient_step(xs, ys, w, b, lr):
  n = len(xs)
  dw = 0.0
  db = 0.0
  for x, y in zip(xs, ys):
    pred = w * x + b
    err = pred - y
    dw += err * x
    db += err
  new_w = round(w - lr * ((2 / n) * dw), 4)
  new_b = round(b - lr * ((2 / n) * db), 4)
  return {"w": new_w, "b": new_b}

print("Step:", gradient_step([1, 2, 3], [2, 4, 6], 0.0, 0.0, 0.05))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def gradient_step(xs, ys, w, b, lr):
  n = len(xs)
  dw = 0.0
  db = 0.0
  # TODO: Accumulate gradients dw, db and return updated rounded w and b
  return {"w": w, "b": b}

print("Step:", gradient_step([1, 2, 3], [2, 4, 6], 0.0, 0.0, 0.05))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Steps w and b toward true line y = 2x',
          expression:
            'gradient_step([1, 2, 3], [2, 4, 6], 0.0, 0.0, 0.05).get("w") == 0.9333',
          expectedDescription: 'Updates w from 0.0 -> 0.9333 in one step',
        },
        {
          id: 't2',
          label: 'Leaves optimal weights unchanged (gradient = 0)',
          expression:
            'gradient_step([1, 2, 3], [2, 4, 6], 2.0, 0.0, 0.05).get("w") == 2.0',
          expectedDescription: 'Keeps w at 2.0 when MSE is 0',
        },
      ],
    },

    {
      id: 'ml-m7',
      number: '07',
      title: 'Classification & The Sigmoid Probability Curve',
      durationMinutes: 40,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Fraud detection needs a probability between `0.0` and `1.0`, not an unbounded line score. Learn how the Sigmoid curve squashes any logit `z` into a clean probability with overflow clamping.',
      keyConcepts: [
        'Dot product logit `z = bias + sum(f * w)`',
        'Sigmoid function `1 / (1 + math.exp(-z))`',
        'Clamping `z` to `[-20, 20]` to avoid math overflow on extreme inputs',
      ],
      architectureNote:
        'At `z = 0`, sigmoid outputs exactly `0.5`. Clamping `z = max(-20, min(20, z))` prevents `math.exp(-z)` from overflowing in production.',
      deliverableTitle: 'Build predict_fraud_prob(features, weights, bias)',
      deliverablePrompt:
        'Compute `z = bias + sum(f * w)` over `zip(features, weights)`, clamp `z` into `[-20, 20]`, and return `round(1 / (1 + math.exp(-z)), 4)`.',
      acceptanceCriteria: [
        'Outputs 0.5 cleanly when logit z equals 0',
        'Maps positive risk signals near 1.0',
        'Clamps extreme negative logits safely without overflow',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 07 of 12 · Sigmoid Fraud Probability',
        diagram: {
          type: 'sigmoid-curve',
          title: 'Squashing Logits into [0.0, 1.0] Probabilities',
          caption: 'The S-shaped sigmoid maps z = 0 to 0.5 and smoothly approaches 0 or 1 at extreme inputs.',
          nodes: ['Low Risk (0.0)', 'p = 0.5 at z = 0', 'High Risk (1.0)'],
        },
        sections: [
          {
            heading: 'Why Linear Outputs Don’t Work for Probabilities',
            explanation:
              'A linear line `w * x + b` could output `-45` or `+320`. Probabilities must stay strictly inside `0.0` to `1.0` (`0%` to `100%`). Passing `z` through `1 / (1 + exp(-z))` squeezes every number smoothly into `[0, 1]`.',
            codeLanguage: 'python',
            codeSnippet: 'z = max(-20, min(20, z))\nprob = 1 / (1 + math.exp(-z))',
          },
        ],
        liveExample: {
          title: 'Live Example: Sigmoid at z=0 and z=4',
          description: 'Watch positive and zero logits map smoothly between 0 and 1.',
          code: 'import math\nfor z in [-4, 0, 4]:\n  print("z=", z, "->", round(1 / (1 + math.exp(-z)), 4))',
          expectedOutput: 'z= -4 -> 0.018\nz= 0 -> 0.5\nz= 4 -> 0.982',
        },
        commonMistake: {
          title: 'Skipping Extreme Clamping Before `math.exp(-z)`',
          wrongWay: 'math.exp(5000)  # OverflowError!',
          rightWay: 'z = max(-20, min(20, z))\nprob = 1 / (1 + math.exp(-z))',
          whyItHappens:
            'Outlier bots can send huge feature numbers that cause `exp(-z)` to exceed floating-point limits.',
        },
        tryItMission:
          'Complete `predict_fraud_prob(features, weights, bias)` with `[-20, 20]` clamping.',
      },
      knowledgeCheck: {
        question: 'What probability does `1 / (1 + math.exp(-z))` output when `z = 0`?',
        options: ['0.5 (50%)', '0.0', '1.0'],
        correctIndex: 0,
        explanation: 'Since `exp(0) = 1`, `1 / (1 + 1)` equals exactly `0.5`.',
      },
      hints: [
        'Start `z = bias`, then loop `for f, w in zip(features, weights): z += f * w`.',
        'Clamp with `z = max(-20, min(20, z))`.',
        'Return `round(1 / (1 + math.exp(-z)), 4)`.',
      ],
      referenceSolution: `import math

def predict_fraud_prob(features, weights, bias):
  z = bias
  for f, w in zip(features, weights):
    z += f * w
  z = max(-20, min(20, z))
  prob = 1 / (1 + math.exp(-z))
  return round(prob, 4)

print("Fraud Prob:", predict_fraud_prob([2.0, 1.0], [1.5, 1.0], -1.0))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `import math

def predict_fraud_prob(features, weights, bias):
  z = bias
  # TODO: Compute dot product, clamp z to [-20, 20], return rounded sigmoid
  return 0.5

print("Fraud Prob:", predict_fraud_prob([2.0, 1.0], [1.5, 1.0], -1.0))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Returns 0.5 at zero logit',
          expression: 'predict_fraud_prob([0.0, 0.0], [1.0, 1.0], 0.0) == 0.5',
          expectedDescription: 'Sigmoid(0) equals 0.5',
        },
        {
          id: 't2',
          label: 'Scores risky feature vector accurately',
          expression: 'predict_fraud_prob([2.0, 1.0], [1.5, 1.0], -1.0) == 0.9526',
          expectedDescription: 'Returns 0.9526 for z = 3.0',
        },
        {
          id: 't3',
          label: 'Handles extreme negative logits without overflow',
          expression: 'predict_fraud_prob([-1000.0], [1.0], 0.0) == 0.0',
          expectedDescription: 'Clamps z safely at -20 returning 0.0',
        },
      ],
    },

    {
      id: 'ml-m8',
      number: '08',
      title: 'Confusion Matrix Outcomes (TP, FP, TN, FN)',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'If only `1%` of transactions are fraud, a dumb model that predicts `"0"` every time gets `99%` accuracy while missing **100%** of fraud! Count True Positives, False Positives, True Negatives, and False Negatives instead.',
      keyConcepts: [
        'True Positive (TP): caught real fraud; False Positive (FP): blocked honest buyer',
        'True Negative (TN): cleared safe payment; False Negative (FN): missed real fraud',
        'Why raw accuracy hides failure on imbalanced fraud data',
      ],
      architectureNote:
        'Counting exact TP/FP/TN/FN buckets exposes whether your model annoys good customers (FP) or misses real attackers (FN).',
      deliverableTitle: 'Build confusion_counts(y_true, y_pred)',
      deliverablePrompt:
        'Loop through `zip(y_true, y_pred)` and return `{"tp": tp, "fp": fp, "tn": tn, "fn": fn}`.',
      acceptanceCriteria: [
        'Counts TP (1,1), FP (0,1), TN (0,0), and FN (1,0) accurately',
        'Handles empty lists returning all 0 counts',
        'Matches sum(tp+fp+tn+fn) == len(y_true)',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 08 of 12 · Confusion Matrix Tracker',
        diagram: {
          type: 'dict-map',
          title: 'The Four Classification Outcomes',
          caption: 'Compare each real outcome (y_true) against model prediction (y_pred) across 4 buckets.',
          nodes: ['True=1, Pred=1 -> TP', 'True=0, Pred=1 -> FP', 'True=1, Pred=0 -> FN', 'True=0, Pred=0 -> TN'],
        },
        sections: [
          {
            heading: 'Why 99% Accuracy Can Be Terrible',
            explanation:
              'Suppose 99 out of 100 transactions are honest. Predicting `"safe"` blindly gets 99% accuracy—yet every single fraudster walks away. Splitting predictions into TP, FP, TN, and FN reveals the real cost of mistakes.',
          },
        ],
        liveExample: {
          title: 'Live Example: Tallying Outcomes',
          description: 'Inspect how `if / elif` maps `(yt, yp)` into all 4 buckets.',
          code: 'y_true = [1, 0, 1, 0]\ny_pred = [1, 1, 0, 0]\nprint("Pairs:", list(zip(y_true, y_pred)))',
          expectedOutput: 'Pairs: [[1,1],[0,1],[1,0],[0,0]]',
        },
        commonMistake: {
          title: 'Swapping False Positive and False Negative',
          wrongWay: 'if yt == 1 and yp == 0: fp += 1',
          rightWay: 'if yt == 1 and yp == 0: fn += 1  # Actually positive, predicted negative!',
          whyItHappens:
            'Think of the second word as what the model predicted: False *Positive* means the model falsely predicted 1.',
        },
        tryItMission:
          'Complete `confusion_counts(y_true, y_pred)` counting `tp`, `fp`, `tn`, and `fn`.',
      },
      knowledgeCheck: {
        question: 'If a transaction was actually fraud (`yt == 1`) and your model marked it safe (`yp == 0`), what is that outcome?',
        options: ['False Negative (FN)', 'False Positive (FP)', 'True Positive (TP)'],
        correctIndex: 0,
        explanation: 'The model predicted Negative (0), and that prediction was False—so it is a False Negative.',
      },
      hints: [
        'Initialize `tp, fp, tn, fn` all to `0`.',
        'Check all four `(yt, yp)` pairs cleanly with `if / elif`.',
        'Return `{"tp": tp, "fp": fp, "tn": tn, "fn": fn}`.',
      ],
      referenceSolution: `def confusion_counts(y_true, y_pred):
  tp = 0
  fp = 0
  tn = 0
  fn = 0
  for yt, yp in zip(y_true, y_pred):
    if yt == 1 and yp == 1:
      tp += 1
    elif yt == 0 and yp == 1:
      fp += 1
    elif yt == 0 and yp == 0:
      tn += 1
    elif yt == 1 and yp == 0:
      fn += 1
  return {"tp": tp, "fp": fp, "tn": tn, "fn": fn}

print(confusion_counts([1, 0, 1, 0], [1, 1, 0, 0]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def confusion_counts(y_true, y_pred):
  tp = 0
  fp = 0
  tn = 0
  fn = 0
  # TODO: Count TP, FP, TN, FN across zip(y_true, y_pred)
  return {"tp": tp, "fp": fp, "tn": tn, "fn": fn}

print(confusion_counts([1, 0, 1, 0], [1, 1, 0, 0]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Counts all four confusion matrix outcomes accurately',
          expression:
            'confusion_counts([1, 1, 0, 0], [1, 0, 1, 0]).get("tp") == 1 and confusion_counts([1, 1, 0, 0], [1, 0, 1, 0]).get("fn") == 1',
          expectedDescription: 'Computes TP=1, FP=1, TN=1, FN=1',
        },
        {
          id: 't2',
          label: 'Handles all-negative batches safely',
          expression: 'confusion_counts([0, 0], [0, 0]).get("tn") == 2',
          expectedDescription: 'Counts TN=2 cleanly',
        },
      ],
    },

    {
      id: 'ml-m9',
      number: '09',
      title: 'Precision, Recall & F1-Score Trade-Offs',
      durationMinutes: 40,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Turn raw TP, FP, and FN counts into executive metrics: **Precision** (`TP / (TP + FP)` — how trustworthy alerts are), **Recall** (`TP / (TP + FN)` — how much real fraud you caught), and **F1**.',
      keyConcepts: [
        'Precision = `tp / (tp + fp)` (avoiding false alarms)',
        'Recall = `tp / (tp + fn)` (avoiding missed fraud)',
        'Harmonic mean `F1 = (2 * precision * recall) / (precision + recall)` with zero-division guards',
      ],
      architectureNote:
        'Always guard zero denominators (`if (tp + fp) > 0 else 0.0`) so metrics never crash when a model makes zero positive alerts.',
      deliverableTitle: 'Implement classification_metrics(y_true, y_pred)',
      deliverablePrompt:
        'Compute `precision`, `recall`, and `f1` rounded to 4 decimals safely guarding all denominators against zero.',
      acceptanceCriteria: [
        'Computes Precision, Recall, and F1 accurately',
        'Guards (tp + fp) == 0, (tp + fn) == 0, and (precision + recall) == 0',
        'Returns 0.0 cleanly when zero true positives exist',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 09 of 12 · F1 Evaluation Scorecard',
        diagram: {
          type: 'flow',
          title: 'Balancing Alert Quality & Coverage',
          caption: 'Precision measures alert accuracy; Recall measures fraud caught; F1 balances both cleanly.',
          nodes: ['Precision = TP/(TP+FP)', 'Recall = TP/(TP+FN)', 'F1 Harmonic Mean'],
        },
        sections: [
          {
            heading: 'The Precision vs Recall Tug-of-War',
            explanation:
              'Flagging everything boosts Recall to 100%, but Precision crashes because honest buyers get blocked. Flagging only extreme cases boosts Precision, but Recall drops. F1 stays high only when BOTH are strong.',
            codeLanguage: 'python',
            codeSnippet: 'precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0\nrecall = tp / (tp + fn) if (tp + fn) > 0 else 0.0\nf1 = (2 * precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0',
          },
        ],
        liveExample: {
          title: 'Live Example: Scoring Alerts',
          description: 'See how ternary zero-guards keep F1 safe even on all-zero predictions.',
          code: 'tp, fp, fn = 2, 1, 1\nprec = tp / (tp + fp)\nrec = tp / (tp + fn)\nprint("F1:", round((2 * prec * rec) / (prec + rec), 4))',
          expectedOutput: 'F1: 0.6667',
        },
        commonMistake: {
          title: 'Arithmetic Average Instead of Harmonic Mean for F1',
          wrongWay: 'f1 = (precision + recall) / 2',
          rightWay: 'f1 = (2 * precision * recall) / (precision + recall)',
          whyItHappens:
            'Harmonic mean penalizes extreme imbalance (e.g., Precision=1.0 and Recall=0.01 scores ~0.02, not 0.50).',
        },
        tryItMission:
          'Complete `classification_metrics(y_true, y_pred)` with safe zero-division guards.',
      },
      knowledgeCheck: {
        question: 'When `tp = 0, fp = 0, fn = 2` (model raised zero alerts), what should `precision` return?',
        options: ['0.0 (guarded safely)', '1.0', 'ZeroDivisionError crash'],
        correctIndex: 0,
        explanation: 'Guarding `if (tp + fp) > 0 else 0.0` ensures zero alerts produce `0.0` cleanly.',
      },
      hints: [
        'Tally `tp`, `fp`, `fn` across `zip(y_true, y_pred)`.',
        'Use inline zero guards on `precision`, `recall`, and `f1`.',
        'Round all three returned numbers to 4 decimal places.',
      ],
      referenceSolution: `def classification_metrics(y_true, y_pred):
  tp = 0
  fp = 0
  fn = 0
  for yt, yp in zip(y_true, y_pred):
    if yt == 1 and yp == 1:
      tp += 1
    elif yt == 0 and yp == 1:
      fp += 1
    elif yt == 1 and yp == 0:
      fn += 1
  precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
  recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
  f1 = (2 * precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0
  return {"precision": round(precision, 4), "recall": round(recall, 4), "f1": round(f1, 4)}

print(classification_metrics([1, 1, 0, 1], [1, 0, 1, 1]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def classification_metrics(y_true, y_pred):
  tp = 0
  fp = 0
  fn = 0
  # TODO: Tally tp, fp, fn and compute zero-guarded precision, recall, and f1
  return {"precision": 0.0, "recall": 0.0, "f1": 0.0}

print(classification_metrics([1, 1, 0, 1], [1, 0, 1, 1]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes precision, recall, and F1 accurately',
          expression:
            'classification_metrics([1, 1, 0, 1], [1, 0, 1, 1]).get("f1") == 0.6667',
          expectedDescription: 'Returns precision 0.6667, recall 0.6667, f1 0.6667',
        },
        {
          id: 't2',
          label: 'Guards zero-alert inputs safely without crashing',
          expression:
            'classification_metrics([1, 1], [0, 0]).get("precision") == 0.0 and classification_metrics([0, 0], [0, 0]).get("f1") == 0.0',
          expectedDescription: 'Returns 0.0 safely when denominators equal 0',
        },
      ],
    },

    {
      id: 'ml-m10',
      number: '10',
      title: 'Vector Dot Products & Magnitude',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Fraud rings often repeat identical device or behavior fingerprints. Before comparing two vectors with cosine similarity, learn how dot products and vector norms (`sqrt(sum(x*x))`) measure alignment and length.',
      keyConcepts: [
        'Dot product: summing pairwise products `sum([a * b for a, b in zip(va, vb)])`',
        'Euclidean magnitude (L2 norm): `math.sqrt(sum([a * a for a in v]))`',
        'Preparing unit-scale geometry for embedding search',
      ],
      architectureNote:
        'Dot products measure shared direction AND scale; dividing by vector magnitudes isolates pure directional similarity.',
      deliverableTitle: 'Write dot_product(a, b) and vector_norm(v)',
      deliverablePrompt:
        'Implement `dot_product(a, b)` returning `round(sum([x * y for x, y in zip(a, b)]), 4)` and `vector_norm(v)` returning `round(math.sqrt(sum([x * x for x in v])), 4)`.',
      acceptanceCriteria: [
        'Computes exact dot product across two vectors',
        'Computes L2 norm of [3, 4] equal to 5.0',
        'Handles zero vectors cleanly returning 0.0',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 10 of 12 · Vector Geometry Helpers',
        diagram: {
          type: 'flow',
          title: 'Dot Product & Vector Length',
          caption: 'Pairwise multiplication reveals alignment; squaring and taking sqrt gives exact vector length.',
          nodes: ['[a1*b1 + a2*b2]', 'sqrt(a1^2 + a2^2)', 'Geometry Ready'],
        },
        sections: [
          {
            heading: 'Measuring Vector Length (Norm)',
            explanation:
              'Just like the Pythagorean theorem (`3^2 + 4^2 = 5^2`), the length of any feature vector in `n` dimensions is `math.sqrt(sum([x * x for x in v]))`.',
            codeLanguage: 'python',
            codeSnippet: 'import math\ndef vector_norm(v):\n  return round(math.sqrt(sum([x * x for x in v])), 4)',
          },
        ],
        liveExample: {
          title: 'Live Example: The Classic 3-4-5 Vector',
          description: 'Verify `vector_norm([3, 4])` returns `5.0` and orthogonal dot product `[1, 0]` vs `[0, 1]` returns `0.0`.',
          code: 'import math\nprint("Norm [3,4]:", math.sqrt(sum([x * x for x in [3, 4]])))\nprint("Dot:", sum([a * b for a, b in zip([1, 0], [0, 1])]))',
          expectedOutput: 'Norm [3,4]: 5.0\nDot: 0',
        },
        commonMistake: {
          title: 'Summing Elements Without Squaring for Norm',
          wrongWay: 'math.sqrt(sum(v))',
          rightWay: 'math.sqrt(sum([x * x for x in v]))',
          whyItHappens:
            'Negative entries in a vector would subtract from length unless squared first.',
        },
        tryItMission:
          'Implement both `dot_product(a, b)` and `vector_norm(v)` in main.py.',
      },
      knowledgeCheck: {
        question: 'What does a dot product of `0` between `[1, 0]` and `[0, 1]` indicate?',
        options: [
          'The two vectors are perpendicular (share zero overlapping direction)',
          'The vectors are identical',
          'Both vectors have length zero',
        ],
        correctIndex: 0,
        explanation: 'Orthogonal vectors share zero component overlap, giving a dot product of 0.',
      },
      hints: [
        'Use `[a * b for a, b in zip(vec_a, vec_b)]` inside `sum(...)` for `dot_product`.',
        'Use `[x * x for x in v]` inside `sum(...)` then `math.sqrt(...)` for `vector_norm`.',
        'Round both results to 4 decimals.',
      ],
      referenceSolution: `import math

def dot_product(vec_a, vec_b):
  return round(sum([a * b for a, b in zip(vec_a, vec_b)]), 4)

def vector_norm(v):
  return round(math.sqrt(sum([x * x for x in v])), 4)

print("Dot:", dot_product([1, 2], [3, 4]), "Norm:", vector_norm([3, 4]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `import math

def dot_product(vec_a, vec_b):
  # TODO: Return rounded dot product
  return 0.0

def vector_norm(v):
  # TODO: Return rounded Euclidean norm
  return 0.0

print("Dot:", dot_product([1, 2], [3, 4]), "Norm:", vector_norm([3, 4]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes dot product accurately',
          expression: 'dot_product([1, 2], [3, 4]) == 11.0 and dot_product([1, 0], [0, 1]) == 0.0',
          expectedDescription: 'Returns 11.0 and 0.0',
        },
        {
          id: 't2',
          label: 'Computes L2 vector magnitude cleanly',
          expression: 'vector_norm([3, 4]) == 5.0 and vector_norm([0, 0]) == 0.0',
          expectedDescription: 'Norm [3,4] == 5.0 and [0,0] == 0.0',
        },
      ],
    },

    {
      id: 'ml-m11',
      number: '11',
      title: 'Cosine Similarity & Anomaly Neighbor Retrieval',
      durationMinutes: 40,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Snap Lesson 10’s dot product and vector norms together to compute `cosine_similarity(vec_a, vec_b)`—matching suspicious behavior fingerprints cleanly while guarding all-zero vectors.',
      keyConcepts: [
        'Cosine formula: `dot / (norm_a * norm_b)`',
        'Range `[ -1.0, 1.0 ]` independent of raw vector scale',
        'Zero-vector division defense (`norm_a == 0 or norm_b == 0`)',
      ],
      architectureNote:
        'Cosine similarity powers RAG document retrieval, recommender systems, and behavioral fraud matching.',
      deliverableTitle: 'Complete cosine_similarity(vec_a, vec_b)',
      deliverablePrompt:
        'Calculate `dot`, `norm_a`, and `norm_b`. If either norm equals `0`, return `0.0`; otherwise return `round(dot / (norm_a * norm_b), 4)`.',
      acceptanceCriteria: [
        'Returns 1.0 for parallel same-direction vectors like [1, 2] and [3, 6]',
        'Returns 0.0 for orthogonal vectors like [1, 0] and [0, 1]',
        'Guards zero vectors cleanly without ZeroDivisionError',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 11 of 12 · Cosine Anomaly Matcher',
        diagram: {
          type: 'flow',
          title: 'Cosine Similarity Calculation',
          caption: 'Divide the dot product by the product of both norms to score directional alignment from -1 to +1.',
          nodes: ['dot(a, b)', '/ (norm_a * norm_b)', 'Similarity [-1..1]'],
        },
        sections: [
          {
            heading: 'Why Scale-Free Similarity Matters',
            explanation:
              'If bot A clicks `10` times and bot B clicks `100` times in the exact same pattern (`[1, 2]` vs `[10, 20]`), their cosine similarity is still `1.0`!',
            codeLanguage: 'python',
            codeSnippet: 'if norm_a == 0 or norm_b == 0:\n  return 0.0\nreturn round(dot / (norm_a * norm_b), 4)',
          },
        ],
        liveExample: {
          title: 'Live Example: Matching Identical Ratios',
          description: 'See `[1, 2]` and `[4, 8]` score `1.0` cosine similarity.',
          code: 'import math\na, b = [1, 2], [4, 8]\ndot = sum([x * y for x, y in zip(a, b)])\nna = math.sqrt(sum([x * x for x in a]))\nnb = math.sqrt(sum([y * y for y in b]))\nprint("Cosine:", round(dot / (na * nb), 4))',
          expectedOutput: 'Cosine: 1.0',
        },
        commonMistake: {
          title: 'Crashing on Missing Zero Embeddings',
          wrongWay: 'return round(dot / (norm_a * norm_b), 4)  # Crashes when a=[0,0]!',
          rightWay: 'if norm_a == 0 or norm_b == 0:\n  return 0.0',
          whyItHappens:
            'New accounts with zero activity produce `[0, 0, ...]` vectors.',
        },
        tryItMission:
          'Complete `cosine_similarity(vec_a, vec_b)` with zero-norm protection.',
      },
      knowledgeCheck: {
        question: 'What is the cosine similarity between `[1, 2]` and `[10, 20]`?',
        options: ['1.0', '0.1', '0.5'],
        correctIndex: 0,
        explanation: 'They point in the exact same direction, so cosine similarity is 1.0 regardless of magnitude.',
      },
      hints: [
        'Compute `dot`, `norm_a`, and `norm_b` with `math.sqrt`.',
        'Check `if norm_a == 0 or norm_b == 0: return 0.0`.',
        'Return `round(dot / (norm_a * norm_b), 4)`.',
      ],
      referenceSolution: `import math

def cosine_similarity(vec_a, vec_b):
  dot = sum([a * b for a, b in zip(vec_a, vec_b)])
  norm_a = math.sqrt(sum([a * a for a in vec_a]))
  norm_b = math.sqrt(sum([b * b for b in vec_b]))
  if norm_a == 0 or norm_b == 0:
    return 0.0
  return round(dot / (norm_a * norm_b), 4)

print("Cosine:", cosine_similarity([1, 2], [3, 6]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `import math

def cosine_similarity(vec_a, vec_b):
  # TODO: Guard zero norms and return rounded dot / (norm_a * norm_b)
  return 0.0

print("Cosine:", cosine_similarity([1, 2], [3, 6]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Scores parallel scaled vectors as 1.0',
          expression: 'cosine_similarity([1, 2], [3, 6]) == 1.0',
          expectedDescription: 'Parallel vectors return 1.0',
        },
        {
          id: 't2',
          label: 'Scores perpendicular vectors as 0.0',
          expression: 'cosine_similarity([1, 0], [0, 1]) == 0.0',
          expectedDescription: 'Orthogonal vectors return 0.0',
        },
        {
          id: 't3',
          label: 'Guards zero vectors cleanly',
          expression: 'cosine_similarity([0, 0], [1, 2]) == 0.0',
          expectedDescription: 'Zero vector returns 0.0 without crashing',
        },
      ],
    },

    {
      id: 'ml-m12',
      number: '12',
      title: 'Capstone: Fraud & Risk Scoring Engine',
      durationMinutes: 50,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'rubric',
      lessonSummary:
        'Connect every puzzle piece built across Lessons 01–11—Z-score normalization, gradient descent training, clamped sigmoid scoring, Precision/Recall/F1 evaluation, and cosine anomaly retrieval—into one Fraud Engine System Brief.',
      keyConcepts: [
        'Feature standardization and zero-variance safeguards before training',
        'Sigmoid probability calibration and overflow clamping',
        'Class-imbalance evaluation (Precision, Recall, F1) and cosine retrieval',
      ],
      architectureNote:
        'Production ML systems succeed when preprocessing, optimization, calibration, and imbalanced metrics work cleanly together.',
      deliverableTitle: 'Submit ML Fraud Scoring Architecture Brief',
      deliverablePrompt:
        'Document your complete Fraud Scoring Engine covering: (1) Z-score preprocessing & zero-variance safety, (2) Gradient descent & clamped sigmoid probability calibration, and (3) Precision/Recall/F1 on imbalanced data + cosine anomaly similarity.',
      acceptanceCriteria: [
        'Covers Z-score scaling and constant-column protection',
        'Details gradient descent, MSE loss, and clamped sigmoid probabilities',
        'Justifies F1 over raw accuracy and documents cosine zero-norm safety',
        'Achieves >= 80 / 100 on the Mentor Rubric to earn your ML Engineer Certificate',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 12 of 12 · Complete Fraud Engine Capstone',
        diagram: {
          type: 'capstone-assembly',
          title: 'End-to-End Fraud ML Architecture',
          caption: 'Normalization, gradient learning, calibrated sigmoid scoring, and F1 monitoring form one complete ML stack.',
          nodes: ['Z-Score Scaling', 'Gradient + Sigmoid', 'F1 + Cosine Guard'],
        },
        sections: [
          {
            heading: 'Your Full ML Engineering Stack',
            explanation:
              'From basic weighted features in Lesson 01 to Z-score normalization, gradient steps, clamped sigmoid risk scoring, confusion matrix metrics, and cosine retrieval—every piece you wrote executes in pure Python.',
          },
        ],
        liveExample: {
          title: 'Live Example: Fraud Engine Brief Structure',
          description: 'Address preprocessing, model calibration, and imbalanced evaluation directly.',
          code: '1. Preprocessing: Standardize features via Z-score scaling while returning 0.0 when std == 0.\n2. Training & Calibration: Minimize MSE using gradient descent steps and clamp logits [-20, 20] inside sigmoid for stable probabilities.\n3. Evaluation & Similarity: Track Precision, Recall, and F1 instead of accuracy on rare fraud, and guard zero vectors in cosine similarity.',
          expectedOutput: 'Verified >= 80/100 Capstone Rubric Score',
        },
        commonMistake: {
          title: 'Evaluating Rare Fraud with Raw Accuracy',
          wrongWay: '"My fraud detector achieved 99% accuracy."',
          rightWay: '"Because fraud is imbalanced, we evaluate Precision, Recall, and F1 alongside cosine anomaly similarity."',
          whyItHappens:
            '99% accuracy can still mean 0% fraud Recall when 99% of orders are legitimate.',
        },
        tryItMission:
          'Submit your >= 65-word Fraud Engine Capstone Brief covering all three rubric criteria.',
      },
      knowledgeCheck: {
        question: 'Which metric suite best evaluates a rare-event fraud detector?',
        options: [
          'Precision, Recall, and F1-Score alongside Z-score and sigmoid calibration checks',
          'Raw accuracy alone',
          'Alphabetical sorting of feature names',
        ],
        correctIndex: 0,
        explanation: 'Precision, Recall, and F1 measure false alarms and missed fraud directly on imbalanced datasets.',
      },
      hints: [
        'Include `z-score`, `std`, and zero-variance protection in Criterion 1.',
        'Include `gradient`, `sigmoid`, and `clamp` / `overflow` in Criterion 2.',
        'Include `precision`, `recall`, `f1`, and `cosine` in Criterion 3.',
      ],
      referenceSolution: `1. Preprocessing & Z-Score Standardization: Raw dollar amounts and login counts are normalized with Z-score scaling so large scales do not dominate optimization, while std == 0 returns zeroed vectors cleanly without division-by-zero crashes.
2. Gradient Optimization & Sigmoid Calibration: Linear weights minimize MSE through bounded learning-rate gradient descent steps, and logits are clamped into [-20, 20] before passing through sigmoid so predicted fraud probabilities never overflow.
3. Imbalanced Evaluation & Anomaly Retrieval: Because fraud is rare, raw accuracy misleads; we evaluate Precision, Recall, and harmonic F1 with zero-division checks, and score behavioral embedding neighbors using zero-guarded cosine similarity.`,
      rubricCriteria: [
        {
          id: 'r1',
          criterion: 'Z-Score Scaling & Constant-Column Safeguards',
          weight: 35,
          targetDescription:
            'Explains centering and variance scaling plus handling std == 0 cleanly.',
          requiredKeywordHints: ['z-score', 'std', 'zero'],
          minWordCount: 15,
        },
        {
          id: 'r2',
          criterion: 'Gradient Descent & Clamped Sigmoid Probabilities',
          weight: 35,
          targetDescription:
            'Documents MSE optimization and logit clamping inside sigmoid classification.',
          requiredKeywordHints: ['gradient', 'sigmoid', 'clamp'],
          minWordCount: 15,
        },
        {
          id: 'r3',
          criterion: 'Precision/Recall/F1 & Cosine Similarity',
          weight: 30,
          targetDescription:
            'Justifies F1 over accuracy on imbalanced fraud and covers zero-norm cosine guards.',
          requiredKeywordHints: ['precision', 'recall', 'f1', 'cosine'],
          minWordCount: 15,
        },
      ],
    },
  ],
};
