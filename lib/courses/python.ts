import type { Course } from '../curriculum-types';

export const PYTHON_COURSE: Course = {
  id: 'python-programming-mastery',
  slug: 'python-programming-mastery',
  track: 'Engineering, AI & Automation',
  level: 'Foundational',
  title: 'Python',
  subtitle:
    'Start from your very first print("Hello, World!") and build piece by piece—variables, math, logic, lists, loops, dictionaries, and functions—into a complete Expense & CLI Operations Assistant.',
  durationHours: 24,
  rating: 4.9,
  reviewCount: 6420,
  instructor: {
    name: 'David Morgan',
    role: 'Staff Curriculum Engineer',
    organization: 'Apex Coding Labs',
  },
  thumbnailKey: 'software-ai',
  primaryMode: 'sandbox',
  primaryRuntime: 'python',
  capstoneTitle: 'Smart Personal Expense & CLI Operations Assistant',
  capstoneSummary:
    'Assemble every Python building block from Lessons 01–11 into a resilient, modular expense & telemetry CLI pipeline with input validation, caching, retries, and full documentation.',
  capstoneDeliverables: [
    'Interactive CLI welcome banner, profile store, and currency rounding math',
    'Validated category normalizer, list ledger, and dictionary totals aggregator',
    'Reusable functions with TTL cache safety and bounded exponential retry backoff',
    'Verified Capstone Architecture Brief graded against the Mentor Rubric',
  ],
  outcomes: [
    'Understand how Python executes instructions top-to-bottom from scratch',
    'Store, transform, and validate strings, numbers, lists, and dictionaries',
    'Write clean loops and modular functions (`def`) with edge-case defenses',
    'Ship stateful caching, deduplication, and retry logic tested in-browser',
  ],
  modules: [
    {
      id: 'py-m1',
      number: '01',
      title: 'What is Python & Your First Hello, World!',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Meet Python—one of the world’s clearest programming languages. Learn how Python reads instructions from top to bottom and display your first message using print().',
      keyConcepts: [
        'What Python is and why instructions run line by line',
        'Wrapping human text (strings) inside matching quotation marks',
        'Using print("...") to display output on screen',
      ],
      architectureNote:
        'Every software tool begins with clear visible feedback. In a command-line app, print() is how your program talks to the user.',
      deliverableTitle: 'Print "Hello, World!" and your assistant welcome banner',
      deliverablePrompt:
        'Update main.py to print two lines: first print("Hello, World!") and second print("Expense CLI Ready"). Click Run & Verify Tests to see your live console output.',
      acceptanceCriteria: [
        'First printed line contains "Hello, World!"',
        'Second printed line contains "Expense CLI Ready"',
        'Uses valid matching quotes with no syntax errors',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 01 of 12 · CLI Welcome Banner',
        diagram: {
          type: 'flow',
          title: 'How Python Runs Your First Program',
          caption: 'Python reads your file from line 1 downward and turns each print() command into visible console text.',
          nodes: ['Write print("...")', 'Python Reads Line', 'Console Shows Text'],
        },
        sections: [
          {
            heading: 'What is Python?',
            explanation:
              'Python is a human-friendly programming language used for web apps, data analysis, automation, and AI. Think of a Python file like a clear recipe: the computer reads line 1, finishes it, then moves straight to line 2.',
            analogy: 'Like reading a cooking recipe step-by-step from the top of the page to the bottom.',
          },
          {
            heading: 'Talking to the Screen with print()',
            explanation:
              'When you want Python to show text on the screen, use the built-in print() command. Any plain text (called a string) must sit inside matching quotes like "Hello" or \'Hello\'.',
            codeLanguage: 'python',
            codeSnippet: 'print("Hello, World!")\nprint("Welcome to Apex Academy")',
          },
        ],
        liveExample: {
          title: 'Live Example: Two-Line Greeting',
          description: 'Load this working snippet to watch Python print two lines cleanly into the console.',
          code: 'print("Starting Python...")\nprint("Hello from Apex!")',
          expectedOutput: 'Starting Python...\nHello from Apex!',
        },
        commonMistake: {
          title: 'Forgetting Quotes Around Text',
          wrongWay: 'print(Hello, World!)',
          rightWay: 'print("Hello, World!")',
          whyItHappens:
            'Without quotes, Python thinks Hello is the name of a stored command or variable instead of plain English text.',
        },
        tryItMission:
          'Edit main.py so line 1 prints "Hello, World!" and line 2 prints "Expense CLI Ready".',
      },
      knowledgeCheck: {
        question: 'Why do we wrap Hello, World! inside quotation marks in print("Hello, World!")?',
        options: [
          'Quotes tell Python the text is a string literal, not a variable name',
          'Quotes make Python run the line twice as fast',
          'Quotes are optional in Python 3 for single words',
        ],
        correctIndex: 0,
        explanation:
          'Quotation marks mark plain text as a string literal so Python prints those exact characters instead of looking up a variable.',
      },
      hints: [
        'Type print("Hello, World!") on line 1 using matching double quotes.',
        'Add a second print("Expense CLI Ready") call on the line right below it.',
        'Watch your spelling and punctuation carefully—tests check both phrases.',
      ],
      referenceSolution: `print("Hello, World!")
print("Expense CLI Ready")`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
        {
          filename: 'README.md',
          language: 'markdown',
          readOnly: true,
          content: '# Lesson 01: CLI Welcome Banner\nStep 1 of our 12-part Expense & CLI Operations Assistant.',
        },
      ],
      starterCode: `# Replace the placeholder message with Hello, World!
print("Replace me")
# TODO: Print "Expense CLI Ready" on the next line`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Prints Hello, World! cleanly',
          expression: 'len(logs) >= 1 and "hello, world!" in " ".join(logs).lower()',
          expectedDescription: 'Console output includes "Hello, World!"',
        },
        {
          id: 't2',
          label: 'Prints the Expense CLI Ready banner',
          expression: 'len(logs) >= 2 and "expense cli ready" in " ".join(logs).lower()',
          expectedDescription: 'Prints at least 2 lines including "Expense CLI Ready"',
        },
      ],
    },

    {
      id: 'py-m2',
      number: '02',
      title: 'Variables & Labeled Memory Boxes',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Programs need to remember things like a user’s name or monthly budget. Learn how variables store data in named boxes and how f-strings insert variables into sentences.',
      keyConcepts: [
        'Assigning values with `=` (`owner = "Maya"`)',
        'Variable naming rules using lowercase snake_case',
        'Combining text and variables cleanly with f-strings (`f"..."`)',
      ],
      architectureNote:
        'Using descriptive variable names like monthly_budget instead of x makes code effortless for teammates (and your future self) to read.',
      deliverableTitle: 'Store user profile variables and format a status line',
      deliverablePrompt:
        'Create two variables: `owner = "Alex"` and `currency = "USD"`, then set `banner = f"{owner} Wallet ({currency})"` and print `banner`.',
      acceptanceCriteria: [
        'Defines variable `owner` as `"Alex"`',
        'Defines variable `currency` as `"USD"`',
        'Builds `banner` as `"Alex Wallet (USD)"` and prints it',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 02 of 12 · User Profile Store',
        diagram: {
          type: 'memory-box',
          title: 'Variables as Labeled Memory Boxes',
          caption: 'The equals sign (=) stores the value on the right inside the labeled box on the left.',
          nodes: ['owner', 'Variable Label', '"Alex"'],
        },
        sections: [
          {
            heading: 'What Is a Variable?',
            explanation:
              'A variable is simply a named sticky note attached to a value in computer memory. You create one with a name, an equals sign (=), and a value. Later, whenever you type the name, Python pulls out whatever is stored inside.',
            analogy: 'Think of a kitchen jar labeled "sugar" — you write the label once so you always know what is inside.',
            codeLanguage: 'python',
            codeSnippet: 'app_name = "Apex Wallet"\nowner = "Maya"\nprint(app_name)',
          },
          {
            heading: 'Mixing Variables into Text with f-strings',
            explanation:
              'Put the letter f right before the opening quote (`f"..."`) and drop any variable inside curly braces `{}`. Python swaps `{owner}` with its stored value automatically.',
            codeLanguage: 'python',
            codeSnippet: 'owner = "Maya"\ngreeting = f"Welcome back, {owner}!"\nprint(greeting)',
          },
        ],
        liveExample: {
          title: 'Live Example: Building a Dynamic Greeting',
          description: 'See how changing `owner` once updates every sentence using it.',
          code: 'owner = "Jordan"\nplan = "Pro"\nbanner = f"{owner} on {plan}"\nprint(banner)',
          expectedOutput: 'Jordan on Pro',
        },
        commonMistake: {
          title: 'Forgetting the `f` Before the String',
          wrongWay: 'banner = "{owner} Wallet"\n# Prints literal {owner}',
          rightWay: 'banner = f"{owner} Wallet"\n# Prints Alex Wallet',
          whyItHappens:
            'Without the leading `f`, Python treats curly braces as ordinary characters instead of looking up your variables.',
        },
        tryItMission:
          'Set `owner = "Alex"`, `currency = "USD"`, create `banner = f"{owner} Wallet ({currency})"`, and print `banner`.',
      },
      knowledgeCheck: {
        question: 'What does putting `f` in front of `f"Hello {name}"` do in Python?',
        options: [
          'Evaluates `{name}` and inserts the variable value inside the string',
          'Forces all characters in the string to become uppercase',
          'Saves the text to a file on your hard drive automatically',
        ],
        correctIndex: 0,
        explanation: 'An f-string (formatted string literal) evaluates expressions inside `{}` and inserts them into the text.',
      },
      hints: [
        'Check exact capitalization: `owner = "Alex"` and `currency = "USD"`.',
        'Use `banner = f"{owner} Wallet ({currency})"` with an f before the first quote.',
        'Call `print(banner)` on the last line so it appears in the console.',
      ],
      referenceSolution: `owner = "Alex"
currency = "USD"
banner = f"{owner} Wallet ({currency})"
print(banner)`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `owner = "ChangeMe"
currency = "EUR"
# TODO: Build banner as "Alex Wallet (USD)" using an f-string
banner = ""
print(banner)`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Stores owner and currency variables',
          expression: 'owner == "Alex" and currency == "USD"',
          expectedDescription: 'owner == "Alex" and currency == "USD"',
        },
        {
          id: 't2',
          label: 'Formats banner with f-string',
          expression: 'banner == "Alex Wallet (USD)"',
          expectedDescription: 'banner equals "Alex Wallet (USD)"',
        },
        {
          id: 't3',
          label: 'Prints formatted banner to console',
          expression: 'len(logs) >= 1 and "alex wallet (usd)" in " ".join(logs).lower()',
          expectedDescription: 'Console shows "Alex Wallet (USD)"',
        },
      ],
    },

    {
      id: 'py-m3',
      number: '03',
      title: 'Numbers, Math & Currency Rounding',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Real expense trackers add prices, apply tax rates, and avoid messy decimals like `42.599999999`. Master integers, floats, arithmetic operators, and `round(val, 2)`.',
      keyConcepts: [
        'Integers (`10`) vs decimal floats (`19.95`) — no quotes on numbers',
        'Arithmetic operators (`+`, `-`, `*`, `/`)',
        'Using `round(amount, 2)` for crisp 2-decimal currency totals',
      ],
      architectureNote:
        'Computers store decimals in binary, so `19.99 * 1.08` can produce tiny trailing digits. Rounding to 2 decimals keeps financial reports clean.',
      deliverableTitle: 'Compute subtotal, tax, and rounded total',
      deliverablePrompt:
        'Given `price = 24.50`, `qty = 3`, and `tax_rate = 0.08`, calculate `subtotal = price * qty` and `total = round(subtotal * (1 + tax_rate), 2)`. Print `total`.',
      acceptanceCriteria: [
        'Computes `subtotal` equal to `73.5`',
        'Computes `total` rounded to `79.38`',
        'Prints total to the console',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 03 of 12 · Expense Subtotal Math',
        diagram: {
          type: 'flow',
          title: 'From Raw Prices to Clean Currency',
          caption: 'Multiply unit price by quantity, apply tax multiplier, then round cleanly to 2 decimal places.',
          nodes: ['price * qty', '* (1 + tax_rate)', 'round(..., 2)'],
        },
        sections: [
          {
            heading: 'Numbers Do Not Use Quotes',
            explanation:
              'If you write `"25"`, Python thinks it is plain text and cannot do math with it. Write `25` (an integer) or `25.50` (a float) without quotes so you can add, subtract, multiply (`*`), and divide (`/`).',
            codeLanguage: 'python',
            codeSnippet: 'coffee = 4.50\nsandwich = 9.25\nmeal = coffee + sandwich\nprint(meal)  # 13.75',
          },
          {
            heading: 'Keeping Cents Tidy with round()',
            explanation:
              'Multiplying percentages often leaves extra digits like `79.38000000000001`. Wrapping your result in `round(value, 2)` trims it cleanly to two decimal places.',
            codeLanguage: 'python',
            codeSnippet: 'raw = 19.99 * 1.0825\nclean = round(raw, 2)\nprint(clean)  # 21.64',
          },
        ],
        liveExample: {
          title: 'Live Example: Tip Calculator',
          description: 'See how Python multiplies floats and rounds a bill cleanly.',
          code: 'bill = 42.00\ntip_pct = 0.15\ntotal = round(bill * (1 + tip_pct), 2)\nprint("Total with tip:", total)',
          expectedOutput: 'Total with tip: 48.3',
        },
        commonMistake: {
          title: 'Putting Quotes Around Numbers',
          wrongWay: 'price = "24.50"\ntotal = price * 3  # Repeats text "24.5024.5024.50"!',
          rightWay: 'price = 24.50\ntotal = price * 3  # Gives 73.5',
          whyItHappens:
            'In Python, multiplying a string by 3 glues the text together three times instead of doing arithmetic.',
        },
        tryItMission:
          'Complete `subtotal = price * qty` and `total = round(subtotal * (1 + tax_rate), 2)` in main.py.',
      },
      knowledgeCheck: {
        question: 'What does `"10" + "5"` produce in Python if you accidentally wrap numbers in quotes?',
        options: ['"105" (text glued together)', '15 (numeric sum)', '50 (multiplication)'],
        correctIndex: 0,
        explanation: 'Because `"10"` and `"5"` are strings, `+` joins them side-by-side into `"105"` instead of adding numbers.',
      },
      hints: [
        'Calculate `subtotal = price * qty` first.',
        'Multiply `subtotal` by `(1 + tax_rate)` inside `round(..., 2)`.',
        'Verify `total` equals `79.38`.',
      ],
      referenceSolution: `price = 24.50
qty = 3
tax_rate = 0.08
subtotal = price * qty
total = round(subtotal * (1 + tax_rate), 2)
print("Total:", total)`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `price = 24.50
qty = 3
tax_rate = 0.08
# TODO: Calculate subtotal and rounded total
subtotal = 0
total = 0
print("Total:", total)`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Calculates exact subtotal (73.5)',
          expression: 'subtotal == 73.5',
          expectedDescription: 'subtotal equals 73.5',
        },
        {
          id: 't2',
          label: 'Rounds final taxed total to 79.38',
          expression: 'total == 79.38',
          expectedDescription: 'total equals 79.38',
        },
        {
          id: 't3',
          label: 'Prints total to console',
          expression: 'len(logs) >= 1 and "79.38" in " ".join(logs)',
          expectedDescription: 'Console includes 79.38',
        },
      ],
    },

    {
      id: 'py-m4',
      number: '04',
      title: 'Booleans & if / elif / else Decisions',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Smart programs react to different situations—like rejecting a negative expense amount or flagging when a purchase exceeds a budget limit.',
      keyConcepts: [
        'True / False booleans and comparisons (`>`, `<=`, `==`)',
        'Branching with `if`, `elif`, and `else` plus 2–4 space indentation',
        'Rejecting negative inputs cleanly before saving data',
      ],
      architectureNote:
        'Indentation is how Python knows which lines belong inside an `if` branch. Guard invalid inputs first so bad numbers never reach your totals.',
      deliverableTitle: 'Write a branch check for expense amounts',
      deliverablePrompt:
        'Given `amount = -15` (and re-tested with `amount = 45` and `amount = 500`), write `if / elif / else` logic setting `status` to `"INVALID"` if `amount <= 0`, `"APPROVAL_NEEDED"` if `amount >= 200`, or `"APPROVED"` otherwise.',
      acceptanceCriteria: [
        'Sets `status = "INVALID"` when `amount <= 0`',
        'Sets `status = "APPROVAL_NEEDED"` when `amount >= 200`',
        'Sets `status = "APPROVED"` for valid amounts under 200',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 04 of 12 · Input Validator',
        diagram: {
          type: 'branch-decision',
          title: 'How Python Chooses a Branch',
          caption: 'Python tests the top condition first. As soon as one condition is True, it runs that indented block and skips the rest.',
          nodes: ['amount', 'if amount <= 0:', '"INVALID"', 'Check >= 200'],
        },
        sections: [
          {
            heading: 'True or False Questions',
            explanation:
              'Comparisons like `amount > 0` or `plan == "Pro"` always evaluate to either `True` or `False` (called a Boolean). Notice that comparing equality uses two equals signs (`==`), while storing a variable uses one (`=`).',
            codeLanguage: 'python',
            codeSnippet: 'spend = 120\nover_budget = spend > 100\nprint(over_budget)  # True',
          },
          {
            heading: 'Making Decisions with if / elif / else',
            explanation:
              'Every `if`, `elif` (else-if), and `else` line ends with a colon `:`. Everything indented underneath runs only when that branch wins.',
            codeLanguage: 'python',
            codeSnippet:
              'if score >= 90:\n  grade = "A"\nelif score >= 80:\n  grade = "B"\nelse:\n  grade = "C"',
          },
        ],
        liveExample: {
          title: 'Live Example: Budget Gatekeeper',
          description: 'See how indentation controls which status message gets printed.',
          code: 'limit = 100\ncharge = 140\nif charge > limit:\n  alert = "Over limit"\nelse:\n  alert = "Within budget"\nprint(alert)',
          expectedOutput: 'Over limit',
        },
        commonMistake: {
          title: 'Using `=` Instead of `==` or Forgetting Indentation',
          wrongWay: 'if status = "paid":\nprint("OK")',
          rightWay: 'if status == "paid":\n  print("OK")',
          whyItHappens:
            'Single `=` assigns a value rather than comparing, and forgetting spaces under `if:` raises an IndentationError.',
        },
        tryItMission:
          'Write a helper function `classify_charge(amount)` using `if`, `elif`, and `else` returning `"INVALID"`, `"APPROVAL_NEEDED"`, or `"APPROVED"`.',
      },
      knowledgeCheck: {
        question: 'In `if / elif / else`, what happens if both the `if` and `elif` conditions are mathematically true?',
        options: [
          'Only the first matching `if` block runs; Python skips `elif` and `else`',
          'Both blocks run one after another',
          'Python throws a syntax error',
        ],
        correctIndex: 0,
        explanation: 'An if/elif/else chain is mutually exclusive—the very first True branch executes and exits the chain.',
      },
      hints: [
        'Put `if amount <= 0: return "INVALID"` first so negative numbers are caught right away.',
        'Add `elif amount >= 200: return "APPROVAL_NEEDED"` as the second branch.',
        'End with `else: return "APPROVED"`.',
      ],
      referenceSolution: `def classify_charge(amount):
  if amount <= 0:
    return "INVALID"
  elif amount >= 200:
    return "APPROVAL_NEEDED"
  else:
    return "APPROVED"

print(classify_charge(-15), classify_charge(45), classify_charge(500))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def classify_charge(amount):
  # TODO: Return "INVALID" (<=0), "APPROVAL_NEEDED" (>=200), or "APPROVED"
  return "APPROVED"

print(classify_charge(-15), classify_charge(45), classify_charge(500))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Rejects zero and negative charges',
          expression: 'classify_charge(-15) == "INVALID" and classify_charge(0) == "INVALID"',
          expectedDescription: 'Returns "INVALID" when amount <= 0',
        },
        {
          id: 't2',
          label: 'Flags high-value charges >= 200',
          expression: 'classify_charge(200) == "APPROVAL_NEEDED" and classify_charge(500) == "APPROVAL_NEEDED"',
          expectedDescription: 'Returns "APPROVAL_NEEDED" when amount >= 200',
        },
        {
          id: 't3',
          label: 'Approves normal charges between 1 and 199',
          expression: 'classify_charge(45) == "APPROVED"',
          expectedDescription: 'Returns "APPROVED" for 45',
        },
      ],
    },

    {
      id: 'py-m5',
      number: '05',
      title: 'Lists & Ordered Collections',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'A real expense tracker handles dozens of purchases, not just one variable. Learn how Python lists store ordered items inside `[...]` and how `.append()` and `len()` manage them.',
      keyConcepts: [
        'Creating lists with square brackets `[12.5, 8.0, 19.0]`',
        'Zero-based indexing: `items[0]` is always the first item',
        'Adding items with `.append()` and counting items with `len()`',
      ],
      architectureNote:
        'Remember that computer indexing starts at 0, not 1. The first item is index `0`, the second is index `1`, and the last item is at index `len(items) - 1`.',
      deliverableTitle: 'Build and update a transaction queue list',
      deliverablePrompt:
        'Start with `amounts = [12.5, 25.0]`, append `18.5` to `amounts`, store the first item in `first_item`, and store the list length in `count`.',
      acceptanceCriteria: [
        'Appends 18.5 so `amounts` is `[12.5, 25.0, 18.5]`',
        'Reads `first_item` via `amounts[0]` (`12.5`)',
        'Measures `count` via `len(amounts)` (`3`)',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 05 of 12 · Transaction Queue',
        diagram: {
          type: 'flow',
          title: 'Zero-Based List Indexing',
          caption: 'A list holds items side-by-side in order. Position 0 holds the first element.',
          nodes: ['[0] -> 12.5', '[1] -> 25.0', '[2] -> 18.5'],
        },
        sections: [
          {
            heading: 'Storing Multiple Values in One List',
            explanation:
              'Instead of creating `item1`, `item2`, `item3`, wrap them inside square brackets separated by commas: `expenses = [12.5, 25.0]`. Lists keep items in the exact order you added them.',
            analogy: 'Think of a numbered train: Car 0 is the locomotive, followed by Car 1, Car 2, and so on.',
          },
          {
            heading: 'Growing & Measuring Lists',
            explanation:
              'Use `.append(value)` to attach a new item to the end of the list, and `len(my_list)` to check how many items are currently inside.',
            codeLanguage: 'python',
            codeSnippet: 'tags = ["cloud", "travel"]\ntags.append("meals")\nprint(len(tags))  # 3\nprint(tags[0])    # "cloud"',
          },
        ],
        liveExample: {
          title: 'Live Example: Appending to a Queue',
          description: 'See `.append()`, `[0]`, and `len()` work together in real time.',
          code: 'queue = ["Cloud", "Travel"]\nqueue.append("Meals")\nprint("First:", queue[0], "| Total items:", len(queue))',
          expectedOutput: 'First: Cloud | Total items: 3',
        },
        commonMistake: {
          title: 'Starting Indexes at 1 Instead of 0',
          wrongWay: 'first = amounts[1]  # Actually grabs the 2nd item!',
          rightWay: 'first = amounts[0]  # Grabs the 1st item',
          whyItHappens:
            'In Python, index `0` represents "zero steps away from the start of the list".',
        },
        tryItMission:
          'Append `18.5` to `amounts`, assign `first_item = amounts[0]`, and set `count = len(amounts)`.',
      },
      knowledgeCheck: {
        question: 'If `prices = [10, 20, 30]`, what is the value of `prices[1]`?',
        options: ['20', '10', '30'],
        correctIndex: 0,
        explanation: 'Index 0 is 10, index 1 is 20, and index 2 is 30.',
      },
      hints: [
        'Call `amounts.append(18.5)` on its own line (do not write `amounts = amounts.append(...)`).',
        'Grab the first item using `first_item = amounts[0]`.',
        'Set `count = len(amounts)`.',
      ],
      referenceSolution: `amounts = [12.5, 25.0]
amounts.append(18.5)
first_item = amounts[0]
count = len(amounts)
print(amounts, "First:", first_item, "Count:", count)`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `amounts = [12.5, 25.0]
# TODO: Append 18.5, grab first_item, and compute count
first_item = 0
count = 0
print(amounts, "First:", first_item, "Count:", count)`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Appends 18.5 to amounts list',
          expression: 'len(amounts) == 3 and amounts[2] == 18.5',
          expectedDescription: 'amounts is [12.5, 25.0, 18.5]',
        },
        {
          id: 't2',
          label: 'Reads first_item via index [0]',
          expression: 'first_item == 12.5',
          expectedDescription: 'first_item equals 12.5',
        },
        {
          id: 't3',
          label: 'Computes list count with len()',
          expression: 'count == 3',
          expectedDescription: 'count equals 3',
        },
      ],
    },

    {
      id: 'py-m6',
      number: '06',
      title: 'for Loops & Running Accumulators',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Whether a list holds 3 expenses or 30,000, a `for` loop processes every item automatically. Learn the accumulator pattern to sum valid charges while skipping negatives.',
      keyConcepts: [
        'Iterating cleanly over every item with `for x in items:`',
        'Starting an accumulator variable (`total = 0.0`) before the loop',
        'Combining `for` loops with `if` filters inside the loop body',
      ],
      architectureNote:
        'Initialize your accumulator (`total = 0.0`) BEFORE the loop begins; putting `total = 0` inside the loop resets it on every turn!',
      deliverableTitle: 'Write sum_valid_charges(charges) using a for loop',
      deliverablePrompt:
        'Complete `sum_valid_charges(charges)` to loop over a list of numbers, skip any value `<= 0`, add positive values into `total`, and return `round(total, 2)`.',
      acceptanceCriteria: [
        'Sums all positive numbers accurately',
        'Ignores zero and negative refund entries',
        'Returns 0.0 cleanly for an empty list `[]`',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 06 of 12 · Batch Ledger Aggregator',
        diagram: {
          type: 'loop-cycle',
          title: 'How a for Loop Accumulates Values',
          caption: 'Python visits each item in the list one by one, checks the filter, and adds valid amounts to the running total.',
          nodes: ['charges list', 'for x in charges:', 'total = 142.5'],
        },
        sections: [
          {
            heading: 'Repeating Actions with for Loops',
            explanation:
              'A `for` loop picks up the first element, runs the indented code block, then automatically loops back to pick up the second element until the list finishes.',
            codeLanguage: 'python',
            codeSnippet: 'prices = [10, 20, 30]\ntotal = 0\nfor p in prices:\n  total += p\nprint(total)  # 60',
          },
          {
            heading: 'Combining Loops and Decisions',
            explanation:
              'Indent an `if` check right inside your `for` loop to filter items on the fly—skipping bad rows while accumulating good ones.',
            codeLanguage: 'python',
            codeSnippet: 'for p in prices:\n  if p > 0:\n    total += p',
          },
        ],
        liveExample: {
          title: 'Live Example: Counting High Purchases',
          description: 'See a loop visit each transaction and count how many are >= 50.',
          code: 'tx = [12, 75, 40, 120]\nhigh_count = 0\nfor amt in tx:\n  if amt >= 50:\n    high_count += 1\nprint("High purchases:", high_count)',
          expectedOutput: 'High purchases: 2',
        },
        commonMistake: {
          title: 'Resetting the Accumulator Inside the Loop',
          wrongWay: 'for x in charges:\n  total = 0  # Resets every turn!\n  total += x',
          rightWay: 'total = 0.0\nfor x in charges:\n  total += x',
          whyItHappens:
            'Setting `total = 0` inside the loop erases your running sum on every single item.',
        },
        tryItMission:
          'Complete `sum_valid_charges(charges)` to skip `x <= 0`, sum positive charges, and return `round(total, 2)`.',
      },
      knowledgeCheck: {
        question: 'Where must `total = 0.0` be placed when summing a list with a `for` loop?',
        options: [
          'Right before the `for` loop starts',
          'Inside the `for` loop before `total += x`',
          'After the `return` statement',
        ],
        correctIndex: 0,
        explanation: 'Setting `total = 0.0` before the loop initializes it once so each iteration builds onto the same sum.',
      },
      hints: [
        'Start with `total = 0.0` outside the loop.',
        'Inside `for x in charges:`, write `if x > 0: total += x`.',
        'Return `round(total, 2)` after the loop ends.',
      ],
      referenceSolution: `def sum_valid_charges(charges):
  total = 0.0
  for x in charges:
    if x > 0:
      total += x
  return round(total, 2)

print(sum_valid_charges([10.5, -4, 22.35, 0]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def sum_valid_charges(charges):
  total = 0.0
  # TODO: Loop over charges and add only values > 0
  return round(total, 2)

print(sum_valid_charges([10.5, -4, 22.35, 0]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Sums positive charges and skips negatives',
          expression: 'sum_valid_charges([10.5, -4, 22.35, 0]) == 32.85',
          expectedDescription: 'Returns 32.85 skipping -4 and 0',
        },
        {
          id: 't2',
          label: 'Handles floating-point totals cleanly',
          expression: 'sum_valid_charges([1.115, 2.224]) == 3.34',
          expectedDescription: 'Rounds result to 3.34',
        },
        {
          id: 't3',
          label: 'Returns 0.0 for empty input',
          expression: 'sum_valid_charges([]) == 0.0',
          expectedDescription: 'Returns 0.0 safely when empty',
        },
      ],
    },

    {
      id: 'py-m7',
      number: '07',
      title: 'Strings in Action: .strip(), .lower() & .split()',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Real users type `"  Cloud  "` and `"CLOUD"` with extra spaces and capital letters. Master string methods `.strip()`, `.lower()`, and `.split(" ")` to sanitize messy text.',
      keyConcepts: [
        'Removing accidental leading/trailing spaces with `.strip()`',
        'Standardizing casing with `.lower()` before comparing or grouping',
        'Splitting log lines into pieces with `.split(" ")`',
      ],
      architectureNote:
        'String methods return a NEW cleaned string rather than mutating the original—always assign the result back (`clean = raw.strip().lower()`).',
      deliverableTitle: 'Write clean_label(text) and parse_log_status(line)',
      deliverablePrompt:
        'Write `clean_label(text)` returning `text.strip().lower()`, and `parse_log_status(line)` that splits `"GET /api 502"` by `" "` and returns `int(parts[2])`.',
      acceptanceCriteria: [
        'clean_label("  Cloud  ") returns "cloud"',
        'parse_log_status("POST /pay 201") returns integer 201',
        'Works cleanly even when outer whitespace exists on line',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 07 of 12 · Category & Log Normalizer',
        diagram: {
          type: 'flow',
          title: 'Cleaning Messy User Input',
          caption: 'Chaining .strip().lower() removes spaces and normalizes capitalization in one clean pass.',
          nodes: ['"  Cloud  "', '.strip() -> "Cloud"', '.lower() -> "cloud"'],
        },
        sections: [
          {
            heading: 'Trimming & Lowercasing Text',
            explanation:
              'When two team members type `"Travel"` and `" travel "`, Python considers them totally different strings unless you strip off outer spaces and convert to lowercase first.',
            codeLanguage: 'python',
            codeSnippet: 'raw = "  MeAls  "\nclean = raw.strip().lower()\nprint(clean)  # "meals"',
          },
          {
            heading: 'Chopping Text Into Lists with .split()',
            explanation:
              'Server logs often arrive as single lines like `"GET /checkout 502"`. Calling `.split(" ")` chops that string at every space into a list `["GET", "/checkout", "502"]` so you can inspect piece `[2]`.',
            codeLanguage: 'python',
            codeSnippet: 'line = "GET /checkout 502"\nparts = line.strip().split(" ")\nstatus = int(parts[2])  # 502',
          },
        ],
        liveExample: {
          title: 'Live Example: Parsing a Log Line',
          description: 'See `.strip()`, `.lower()`, and `.split(" ")` transform raw strings.',
          code: 'raw_cat = "  Infrastructure "\nprint("Clean:", raw_cat.strip().lower())\nparts = "POST /login 200".split(" ")\nprint("Route:", parts[1], "Code:", int(parts[2]))',
          expectedOutput: 'Clean: infrastructure\nRoute: /login Code: 200',
        },
        commonMistake: {
          title: 'Forgetting that Strings Are Immutable',
          wrongWay: 'name.strip().lower()\nreturn name  # Still uncleaned!',
          rightWay: 'return name.strip().lower()',
          whyItHappens:
            'Calling `.strip()` creates a new string and throws it away unless you return it or assign it to a variable.',
        },
        tryItMission:
          'Implement both `clean_label(text)` and `parse_log_status(line)` in main.py.',
      },
      knowledgeCheck: {
        question: 'What is `parts[1]` after running `parts = "GET /billing 200".split(" ")`?',
        options: ['"/billing"', '"GET"', '"200"'],
        correctIndex: 0,
        explanation: 'Index 0 is "GET", index 1 is "/billing", and index 2 is "200".',
      },
      hints: [
        'In `clean_label(text)`, return `text.strip().lower()`.',
        'In `parse_log_status(line)`, call `parts = line.strip().split(" ")`.',
        'Convert the status code at `parts[2]` to a number using `int(parts[2])`.',
      ],
      referenceSolution: `def clean_label(text):
  return text.strip().lower()

def parse_log_status(line):
  parts = line.strip().split(" ")
  return int(parts[2])

print(clean_label("  Cloud "), parse_log_status("GET /api 502"))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def clean_label(text):
  # TODO: Return trimmed lowercase text
  return text

def parse_log_status(line):
  # TODO: Split line by " " and return integer status code at index 2
  return 0

print(clean_label("  Cloud "), parse_log_status("GET /api 502"))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Normalizes whitespace and uppercase text',
          expression: 'clean_label("  Cloud  ") == "cloud" and clean_label("MEALS") == "meals"',
          expectedDescription: 'Trims whitespace and lowercases text cleanly',
        },
        {
          id: 't2',
          label: 'Extracts integer HTTP status from log line',
          expression: 'parse_log_status("GET /api 502") == 502 and parse_log_status(" POST /pay 201 ") == 201',
          expectedDescription: 'Returns 502 and 201 as integers',
        },
      ],
    },

    {
      id: 'py-m8',
      number: '08',
      title: 'Dictionaries (key: value) & Safe .get() Lookups',
      durationMinutes: 40,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Lists store items by position (`0, 1, 2`), while Dictionaries store pairs by name (`{"cloud": 60.0}`). Build your core Expense Category Summarizer using `.get(cat, 0)`.',
      keyConcepts: [
        'Key-value lookup pairs inside curly braces `{}`',
        'Reading keys safely with `.get(key, 0)` without `KeyError`',
        'Combining string cleaning, list looping, and dictionary totals',
      ],
      architectureNote:
        'Your Puzzle Pieces from Lessons 01–07 snap together here: loop over records, clean category strings, guard negative amounts, and accumulate into a dictionary.',
      deliverableTitle: 'Complete summarize_expenses(entries) in main.py',
      deliverablePrompt:
        'Each item in `entries` looks like `{"category": " Cloud ", "amount": 42.5}`. Normalize the category with `.strip().lower()`, ignore entries with `amt <= 0`, and accumulate rounded sums in `totals`.',
      acceptanceCriteria: [
        'Merges " Cloud " and "cloud" into one `"cloud"` key',
        'Excludes entries with `amount <= 0`',
        'Rounds category totals cleanly to 2 decimal places',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 08 of 12 · Category Totals Map',
        diagram: {
          type: 'dict-map',
          title: 'Mapping Category Names to Running Totals',
          caption: 'A dictionary points each cleaned category string directly to its accumulated dollar total.',
          nodes: ['"cloud"', '60.00', '"meals"', '18.25'],
        },
        sections: [
          {
            heading: 'Why Dictionaries Beat Parallel Lists',
            explanation:
              'When you want to look up total spend for `"cloud"` immediately without searching a whole list, use a dictionary `{key: value}`. Keys are unique strings; values can be numbers, lists, or even other dictionaries.',
            analogy: 'Like a phone contact list: you look up the person’s name (key) to jump straight to their number (value).',
          },
          {
            heading: 'Accumulating Safely with .get(key, 0)',
            explanation:
              'The very first time `"cloud"` appears, it is not in `totals` yet. Asking for `totals["cloud"]` directly would crash! Using `totals.get(cat, 0)` safely returns `0` if missing so `totals[cat] = round(totals.get(cat, 0) + amt, 2)` works every time.',
            codeLanguage: 'python',
            codeSnippet: 'totals = {}\ntotals["cloud"] = totals.get("cloud", 0) + 42.5\ntotals["cloud"] = totals.get("cloud", 0) + 17.5\nprint(totals)  # {"cloud": 60.0}',
          },
        ],
        liveExample: {
          title: 'Live Example: Counting Category Visits',
          description: 'See `.get(cat, 0)` safely build a tally dictionary.',
          code: 'events = ["home", "pricing", "home"]\ncounts = {}\nfor page in events:\n  counts[page] = counts.get(page, 0) + 1\nprint(counts)',
          expectedOutput: '{"home": 2, "pricing": 1}',
        },
        commonMistake: {
          title: 'Reading a Missing Key with Square Brackets',
          wrongWay: 'totals[cat] = totals[cat] + amt  # KeyError on 1st item!',
          rightWay: 'totals[cat] = round(totals.get(cat, 0) + amt, 2)',
          whyItHappens:
            'Square brackets crash if the key does not exist yet; `.get(cat, 0)` provides a safe starting default.',
        },
        tryItMission:
          'Complete `summarize_expenses(entries)` using `.strip().lower()`, `if amt > 0:`, and `totals.get(cat, 0)`.',
      },
      knowledgeCheck: {
        question: 'Why do we write `totals.get(cat, 0)` instead of `totals[cat]` when adding an expense category?',
        options: [
          'It safely returns 0 the first time a category appears instead of crashing',
          'It deletes old categories automatically',
          'It converts decimals into integers',
        ],
        correctIndex: 0,
        explanation: '`.get(cat, 0)` prevents KeyError crashes when a category is encountered for the very first time.',
      },
      hints: [
        'Convert `amt = float(item["amount"])` inside the loop.',
        'Wrap the update inside `if amt > 0:`.',
        'Update with `totals[cat] = round(totals.get(cat, 0) + amt, 2)`.',
      ],
      referenceSolution: `def summarize_expenses(entries):
  totals = {}
  for item in entries:
    cat = item["category"].strip().lower()
    amt = float(item["amount"])
    if amt > 0:
      totals[cat] = round(totals.get(cat, 0) + amt, 2)
  return totals

sample = [
  {"category": " Cloud ", "amount": 42.5},
  {"category": "cloud", "amount": 17.5},
  {"category": "Meals", "amount": -5}
]
print("Summary:", summarize_expenses(sample))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
        {
          filename: 'sample_expenses.json',
          language: 'json',
          readOnly: true,
          content: `[
  {"category": " Cloud ", "amount": 42.50},
  {"category": "cloud", "amount": 17.50},
  {"category": "Travel", "amount": -15.00}
]`,
        },
      ],
      starterCode: `def summarize_expenses(entries):
  totals = {}
  for item in entries:
    cat = item["category"].strip().lower()
    amt = float(item["amount"])
    # TODO: Skip amt <= 0 and accumulate into totals[cat]
  return totals

sample = [
  {"category": " Cloud ", "amount": 42.5},
  {"category": "cloud", "amount": 17.5},
  {"category": "Meals", "amount": -5}
]
print("Summary:", summarize_expenses(sample))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Merges whitespace and mixed-case categories',
          expression:
            'summarize_expenses([{"category": " Cloud ", "amount": 42.5}, {"category": "cloud", "amount": 17.5}]).get("cloud") == 60.0',
          expectedDescription: 'Combines " Cloud " and "cloud" into 60.0',
        },
        {
          id: 't2',
          label: 'Excludes refunds and negative amounts',
          expression:
            '"refund" not in summarize_expenses([{"category": "refund", "amount": -20}, {"category": "meals", "amount": 12.34}])',
          expectedDescription: 'Ignores entries where amount <= 0',
        },
        {
          id: 't3',
          label: 'Rounds sums to 2 decimal places',
          expression:
            'summarize_expenses([{"category": "api", "amount": 1.115}, {"category": "api", "amount": 2.224}]).get("api") == 3.34',
          expectedDescription: 'Returns 3.34 cleanly',
        },
      ],
    },

    {
      id: 'py-m9',
      number: '09',
      title: 'Functions, Parameters & Log Error Analysis',
      durationMinutes: 40,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Combine your string splitting, loops, and safe division into a reusable function `analyze_logs(lines)` that guards against empty lists (`ZeroDivisionError`) and returns a structured summary dictionary.',
      keyConcepts: [
        'Returning structured dictionaries from reusable `def` functions',
        'Guarding `total == 0` BEFORE dividing (`ZeroDivisionError` safety)',
        'Counting HTTP `>= 500` server errors across telemetry lines',
      ],
      architectureNote:
        'A function that guards empty input (`if total == 0: return ...`) keeps your entire pipeline from crashing on quiet days.',
      deliverableTitle: 'Build analyze_logs(lines) with zero-division protection',
      deliverablePrompt:
        'Implement `analyze_logs(lines)` counting lines with status code `>= 500`, returning `{"total": total, "errors": errors, "error_rate": rate}` where `error_rate` is `round((errors / total) * 100, 1)`.',
      acceptanceCriteria: [
        'Handles empty list `[]` safely without ZeroDivisionError',
        'Counts statuses `>= 500` accurately while ignoring `200`/`404`',
        'Rounds `error_rate` percentage to 1 decimal place',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 09 of 12 · Server Log Analyzer Function',
        diagram: {
          type: 'branch-decision',
          title: 'Defensive Division Guardrail',
          caption: 'Check if the list is empty BEFORE dividing by total, so your function always returns clean JSON-ready numbers.',
          nodes: ['lines', 'if total == 0:', 'Return 0.0%', 'Divide & Round'],
        },
        sections: [
          {
            heading: 'Why Functions Return Values Instead of Just Printing',
            explanation:
              'When `analyze_logs` uses `return {...}`, another part of your program can inspect `report["error_rate"]`, save it to a database, or trigger an alert. `print()` only shows text to humans; `return` hands data back to your code.',
          },
          {
            heading: 'Preventing ZeroDivisionError',
            explanation:
              'If `lines` is `[]`, `len(lines)` is `0`. Dividing `errors / 0` immediately crashes Python. Always check `if total == 0:` right at the top of the function and return zero defaults early.',
            codeLanguage: 'python',
            codeSnippet: 'if total == 0:\n  return {"total": 0, "errors": 0, "error_rate": 0.0}',
          },
        ],
        liveExample: {
          title: 'Live Example: Early Return on Empty Data',
          description: 'See how an early `if len(items) == 0:` guard protects percentage math.',
          code: 'def pass_rate(scores):\n  if len(scores) == 0:\n    return 0.0\n  passed = 0\n  for s in scores:\n    if s >= 70:\n      passed += 1\n  return round((passed / len(scores)) * 100, 1)\nprint(pass_rate([]), pass_rate([80, 50, 90]))',
          expectedOutput: '0.0 66.7',
        },
        commonMistake: {
          title: 'Dividing Before Checking `len(lines) == 0`',
          wrongWay: 'rate = (errors / len(lines)) * 100  # Crashes on []!',
          rightWay: 'if total == 0:\n  return {"total": 0, "errors": 0, "error_rate": 0.0}',
          whyItHappens:
            'Test suites and live servers routinely receive empty log batches during idle minutes.',
        },
        tryItMission:
          'Complete `analyze_logs(lines)` counting statuses `>= 500` and returning `{"total", "errors", "error_rate"}`.',
      },
      knowledgeCheck: {
        question: 'Why should `if total == 0:` be checked BEFORE computing `(errors / total) * 100`?',
        options: [
          'Dividing by zero raises ZeroDivisionError and crashes the script',
          'Python cannot multiply `0` by `100`',
          'Lists with 0 items cannot be returned from functions',
        ],
        correctIndex: 0,
        explanation: 'An early zero-length check avoids dividing by zero when an input list is empty.',
      },
      hints: [
        'Handle `if total == 0: return {"total": 0, "errors": 0, "error_rate": 0.0}` first.',
        'Inside the loop: `parts = line.strip().split(" ")`, `status = int(parts[2])`.',
        'Increment `errors += 1` when `status >= 500`, then compute `round((errors / total) * 100, 1)`.',
      ],
      referenceSolution: `def analyze_logs(lines):
  total = len(lines)
  if total == 0:
    return {"total": 0, "errors": 0, "error_rate": 0.0}
  errors = 0
  for line in lines:
    parts = line.strip().split(" ")
    status = int(parts[2])
    if status >= 500:
      errors += 1
  rate = round((errors / total) * 100, 1)
  return {"total": total, "errors": errors, "error_rate": rate}

print(analyze_logs(["GET /home 200", "POST /pay 502", "GET /api 500"]))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def analyze_logs(lines):
  total = len(lines)
  if total == 0:
    return {"total": 0, "errors": 0, "error_rate": 0.0}
  errors = 0
  # TODO: Split each line, parse integer status at parts[2], count status >= 500
  rate = 0.0
  return {"total": total, "errors": errors, "error_rate": rate}

print(analyze_logs(["GET /home 200", "POST /pay 502", "GET /api 500"]))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Counts >= 500 server errors accurately',
          expression:
            'analyze_logs(["GET /a 200", "POST /b 502", "GET /c 500"]).get("errors") == 2',
          expectedDescription: 'Identifies 2 errors out of 3 lines',
        },
        {
          id: 't2',
          label: 'Computes rounded error_rate percentage',
          expression:
            'analyze_logs(["GET /a 200", "POST /b 502", "GET /c 500"]).get("error_rate") == 66.7',
          expectedDescription: 'Returns 66.7% error rate',
        },
        {
          id: 't3',
          label: 'Handles empty log batch without crashing',
          expression:
            'analyze_logs([]).get("total") == 0 and analyze_logs([]).get("error_rate") == 0.0',
          expectedDescription: 'Returns 0 totals safely for []',
        },
      ],
    },

    {
      id: 'py-m10',
      number: '10',
      title: 'TTL Caching & Expiry Boundaries',
      durationMinutes: 40,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Why fetch exchange rates or reports repeatedly when nothing changed? Build `read_cache(cache, key, now_ts)` using nested dictionaries and strict timestamp expiry (`now_ts < expires_at`).',
      keyConcepts: [
        'Checking membership safely with `if key in cache:`',
        'Nested dictionary structure (`entry["value"]`, `entry["expires_at"]`)',
        'Strict expiry boundary: `now_ts == expires_at` counts as expired!',
      ],
      architectureNote:
        'Using `<` rather than `<=` (`now_ts < entry["expires_at"]`) ensures stale data is never served right at the exact expiration timestamp.',
      deliverableTitle: 'Implement read_cache(cache, key, now_ts)',
      deliverablePrompt:
        'Given `cache` mapping keys to `{"value": ..., "expires_at": int}`, return `{"hit": True, "value": entry["value"]}` only if `key in cache` AND `now_ts < entry["expires_at"]`. Otherwise return `{"hit": False, "value": None}`.',
      acceptanceCriteria: [
        'Returns cache hit when `now_ts < expires_at`',
        'Treats `now_ts == expires_at` as a cache miss',
        'Returns `{"hit": False, "value": None}` cleanly for unknown keys',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 10 of 12 · TTL Cache Layer',
        diagram: {
          type: 'branch-decision',
          title: 'Cache Lookup & Expiry Check',
          caption: 'First verify the key exists, then verify current time is strictly before expires_at.',
          nodes: ['key in cache?', 'now_ts < expires_at', 'hit: True', 'hit: False'],
        },
        sections: [
          {
            heading: 'Nested Dictionaries in Memory',
            explanation:
              'A cache stores more than just a raw value—it also records WHEN that value expires. Each key in `cache` points to a small dictionary: `{"value": 1.08, "expires_at": 150}`.',
          },
          {
            heading: 'Checking Both Key & Freshness',
            explanation:
              'Check `if key in cache:` first. Only if that is True do you inspect `entry = cache[key]` and confirm `now_ts < entry["expires_at"]`.',
            codeLanguage: 'python',
            codeSnippet: 'if key in cache:\n  entry = cache[key]\n  if now_ts < entry["expires_at"]:\n    return {"hit": True, "value": entry["value"]}',
          },
        ],
        liveExample: {
          title: 'Live Example: Checking an Active Ticket',
          description: 'Observe how strict `<` treats the exact expiry timestamp as expired.',
          code: 'cache = {"usd_eur": {"value": 0.92, "expires_at": 100}}\nprint("At t=99:", 99 < cache["usd_eur"]["expires_at"])\nprint("At t=100:", 100 < cache["usd_eur"]["expires_at"])',
          expectedOutput: 'At t=99: True\nAt t=100: False',
        },
        commonMistake: {
          title: 'Using `<=` on Expiry Boundaries',
          wrongWay: 'if now_ts <= entry["expires_at"]:  # Serves stale data at t=100!',
          rightWay: 'if now_ts < entry["expires_at"]:',
          whyItHappens:
            'If a record expires at timestamp 100, then at timestamp 100 it is already expired.',
        },
        tryItMission:
          'Implement `read_cache(cache, key, now_ts)` checking both membership and `now_ts < entry["expires_at"]`.',
      },
      knowledgeCheck: {
        question: 'If an entry has `expires_at: 200` and `now_ts` is `200`, should `read_cache` return a hit or miss?',
        options: [
          'A miss (`{"hit": False, "value": None}`) because its TTL has expired',
          'A hit because 200 equals 200',
          'Raise a KeyError',
        ],
        correctIndex: 0,
        explanation: 'At the exact expiration timestamp, the TTL window has ended, so strict `<` returns a clean miss.',
      },
      hints: [
        'Start with `if key in cache:`.',
        'Grab `entry = cache[key]` and test `if now_ts < entry["expires_at"]:`.',
        'Fallback to `return {"hit": False, "value": None}` at the bottom.',
      ],
      referenceSolution: `def read_cache(cache, key, now_ts):
  if key in cache:
    entry = cache[key]
    if now_ts < entry["expires_at"]:
      return {"hit": True, "value": entry["value"]}
  return {"hit": False, "value": None}

sample_cache = {"usd_eur": {"value": 0.92, "expires_at": 100}}
print(read_cache(sample_cache, "usd_eur", 50), read_cache(sample_cache, "usd_eur", 100))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def read_cache(cache, key, now_ts):
  # TODO: Return {"hit": True, "value": ...} only if key exists and now_ts < expires_at
  return {"hit": False, "value": None}

sample_cache = {"usd_eur": {"value": 0.92, "expires_at": 100}}
print(read_cache(sample_cache, "usd_eur", 50), read_cache(sample_cache, "usd_eur", 100))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Returns hit when strictly before expires_at',
          expression:
            'read_cache({"k": {"value": 42, "expires_at": 100}}, "k", 99).get("hit") == True',
          expectedDescription: 'Hit is True at timestamp 99',
        },
        {
          id: 't2',
          label: 'Returns miss at exact expiry timestamp',
          expression:
            'read_cache({"k": {"value": 42, "expires_at": 100}}, "k", 100).get("hit") == False',
          expectedDescription: 'Hit is False at timestamp 100',
        },
        {
          id: 't3',
          label: 'Returns miss with None value for missing keys',
          expression:
            'read_cache({}, "missing", 10).get("value") is None',
          expectedDescription: 'Missing key returns value None cleanly',
        },
      ],
    },

    {
      id: 'py-m11',
      number: '11',
      title: 'Deduplicating Batches & Bounded Retry Backoff',
      durationMinutes: 45,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'python',
      lessonSummary:
        'Real pipelines face flaky networks and duplicate webhook deliveries. Combine sequence deduplication (`seq`) with bounded exponential backoff (`min(base * (2 ** attempt), max_ms)`).',
      keyConcepts: [
        'Keeping only the highest `seq` version per event ID in a dictionary',
        'Doubling wait times with `2 ** attempt` and capping via `min(..., max_ms)`',
        'Stopping retries cleanly once `attempt >= max_attempts`',
      ],
      architectureNote:
        'Combining idempotent deduplication with capped backoff protects downstream payment and ledger systems from double-charging or retry storms.',
      deliverableTitle: 'Build deduplicate_batch(events) and next_retry_delay(...)',
      deliverablePrompt:
        'Complete both functions: `deduplicate_batch(events)` keeps only the highest `seq` event per `id` and sums rounded amounts; `next_retry_delay(attempt, base_ms, max_ms, max_attempts)` caps wait times at `max_ms` and stops when `attempt >= max_attempts`.',
      acceptanceCriteria: [
        'Deduplicates matching event IDs keeping the highest seq',
        'Caps exponential backoff cleanly at max_ms',
        'Halts retries when attempt >= max_attempts',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 11 of 12 · Resilient Pipeline Engine',
        diagram: {
          type: 'capstone-assembly',
          title: 'Idempotent Batch & Retry Pipeline',
          caption: 'Deduplicate incoming events by highest sequence number, and cap retry waits cleanly.',
          nodes: ['Incoming Events', 'Keep Latest seq', 'Sum & Bounded Retry'],
        },
        sections: [
          {
            heading: 'Deduplicating by Highest Sequence (`seq`)',
            explanation:
              'If event `"e1"` arrives twice—first with `seq: 1` and later with `seq: 2`—store seen events in a `latest = {}` dictionary. Replace an entry only when `eid not in latest or ev["seq"] > latest[eid]["seq"]`.',
          },
          {
            heading: 'Capping Exponential Backoff',
            explanation:
              'When an API call fails, waiting `base_ms * (2 ** attempt)` doubles delay each retry (`100ms, 200ms, 400ms...`). Wrap it in `min(..., max_ms)` so delays never grow out of control, and return `{"retry": False, "delay_ms": 0}` once `attempt >= max_attempts`.',
            codeLanguage: 'python',
            codeSnippet: 'delay = min(base_ms * (2 ** attempt), max_ms)',
          },
        ],
        liveExample: {
          title: 'Live Example: Exponential Delay Growth',
          description: 'Watch `min(100 * (2 ** attempt), 500)` double and then hit the ceiling.',
          code: 'for attempt in [0, 1, 2, 3]:\n  print("Attempt", attempt, "->", min(100 * (2 ** attempt), 500), "ms")',
          expectedOutput: 'Attempt 0 -> 100 ms\nAttempt 1 -> 200 ms\nAttempt 2 -> 400 ms\nAttempt 3 -> 500 ms',
        },
        commonMistake: {
          title: 'Overwriting Newer Events with Older Duplicates',
          wrongWay: 'latest[eid] = ev  # Overwrites seq 2 if seq 1 arrives late!',
          rightWay: 'if eid not in latest or ev["seq"] > latest[eid]["seq"]:\n  latest[eid] = ev',
          whyItHappens:
            'Network packets sometimes arrive out of order; comparing `seq` ensures older updates never overwrite newer state.',
        },
        tryItMission:
          'Complete both `deduplicate_batch(events)` and `next_retry_delay(...)` in main.py.',
      },
      knowledgeCheck: {
        question: 'Why does `next_retry_delay` wrap `base_ms * (2 ** attempt)` inside `min(..., max_ms)`?',
        options: [
          'To keep retry delays from growing infinitely large after several failures',
          'To skip waiting on attempt 0',
          'To force negative delays',
        ],
        correctIndex: 0,
        explanation: 'A `max_ms` ceiling ensures backoff slows down traffic without freezing workers for hours.',
      },
      hints: [
        'In `deduplicate_batch`, compare `eid not in latest or ev["seq"] > latest[eid]["seq"]`.',
        'Sum `float(item["amount"])` across `latest.values()` and round to 2 decimals.',
        'In `next_retry_delay`, check `if attempt >= max_attempts:` first, otherwise use `min(base_ms * (2 ** attempt), max_ms)`.',
      ],
      referenceSolution: `def deduplicate_batch(events):
  latest = {}
  for ev in events:
    eid = ev["id"]
    if eid not in latest or ev["seq"] > latest[eid]["seq"]:
      latest[eid] = ev
  total = 0.0
  for item in latest.values():
    total += float(item["amount"])
  return {"unique_count": len(latest), "total_amount": round(total, 2)}

def next_retry_delay(attempt, base_ms, max_ms, max_attempts):
  if attempt >= max_attempts:
    return {"retry": False, "delay_ms": 0}
  delay = min(base_ms * (2 ** attempt), max_ms)
  return {"retry": True, "delay_ms": delay}

print(deduplicate_batch([{"id": "e1", "seq": 1, "amount": 10}, {"id": "e1", "seq": 2, "amount": 25}]))
print(next_retry_delay(2, 100, 300, 4))`,
      workspaceFiles: [
        { filename: 'main.py', language: 'python', readOnly: false, content: 'Editable Python file' },
      ],
      starterCode: `def deduplicate_batch(events):
  latest = {}
  # TODO: Keep highest seq per id, return unique_count and rounded total_amount
  return {"unique_count": 0, "total_amount": 0.0}

def next_retry_delay(attempt, base_ms, max_ms, max_attempts):
  # TODO: Stop when attempt >= max_attempts, otherwise return capped backoff delay
  return {"retry": False, "delay_ms": 0}

print(deduplicate_batch([{"id": "e1", "seq": 1, "amount": 10}, {"id": "e1", "seq": 2, "amount": 25}]))
print(next_retry_delay(2, 100, 300, 4))`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Keeps highest sequence event when duplicates arrive',
          expression:
            'deduplicate_batch([{"id": "e1", "seq": 2, "amount": 25}, {"id": "e1", "seq": 1, "amount": 10}]).get("total_amount") == 25.0',
          expectedDescription: 'Retains seq 2 ($25) even when seq 1 arrives later',
        },
        {
          id: 't2',
          label: 'Counts unique IDs cleanly',
          expression:
            'deduplicate_batch([{"id": "e1", "seq": 1, "amount": 10}, {"id": "e2", "seq": 1, "amount": 15}]).get("unique_count") == 2',
          expectedDescription: 'Returns unique_count == 2',
        },
        {
          id: 't3',
          label: 'Caps backoff at max_ms and stops at max_attempts',
          expression:
            'next_retry_delay(2, 100, 300, 4).get("delay_ms") == 300 and next_retry_delay(4, 100, 300, 4).get("retry") == False',
          expectedDescription: 'Caps delay at 300ms and halts at attempt 4',
        },
      ],
    },

    {
      id: 'py-m12',
      number: '12',
      title: 'Capstone: Expense & CLI Operations System',
      durationMinutes: 50,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'rubric',
      lessonSummary:
        'You built every puzzle piece from `print("Hello, World!")` to dictionaries, log analyzers, TTL caching, and retry safety. Synthesize your complete Expense & CLI Operations Assistant in an architectural capstone brief.',
      keyConcepts: [
        'Connecting Lessons 01–11 into a unified end-to-end Python pipeline',
        'Documenting sanitization, zero-division safety, TTL boundaries, and deduplication',
        'Evaluating architectural trade-offs and edge-case defenses',
      ],
      architectureNote:
        'A production engineer both writes clean Python AND explains clearly how every layer protects data accuracy under edge cases.',
      deliverableTitle: 'Submit Python Capstone Architecture Brief',
      deliverablePrompt:
        'Write your comprehensive Capstone Architecture Brief connecting all puzzle pieces: input normalization (`strip().lower()`), currency `round()`, `summarize_expenses`, `analyze_logs` zero-division guard, strict TTL caching (`<`), and `seq` deduplication + bounded retry backoff.',
      acceptanceCriteria: [
        'Explains text normalization, negative amount guards, and rounding precision',
        'Documents log error-rate math, zero-length checks, and strict TTL expiry',
        'Details sequence deduplication and capped exponential backoff',
        'Achieves >= 80 / 100 on the Mentor Rubric to unlock your Python Certificate',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 12 of 12 · Complete Capstone Integration',
        diagram: {
          type: 'capstone-assembly',
          title: 'Your Complete Python System Architecture',
          caption: 'Every lesson from print() and variables to caching and deduplication now forms one production pipeline.',
          nodes: ['Sanitize & Validate', 'Summarize & Log Metrics', 'Cache, Dedupe & Retry'],
        },
        sections: [
          {
            heading: 'Look Back at All 11 Puzzle Pieces',
            explanation:
              'In Lesson 01 you printed your first `"Hello, World!"`. Step by step, you layered variables, currency rounding, `if/elif/else` validation, lists, `for` loops, `.strip().lower().split()`, dictionary `.get()`, modular functions, TTL caching, and deduplication with backoff.',
          },
          {
            heading: 'What Great Engineering Documentation Covers',
            explanation:
              'Address all three rubric pillars directly in your response: (1) how strings, rounding, and `amount <= 0` validation sanitize expense batches; (2) how `analyze_logs` and `read_cache` protect against empty inputs and exact-expiry boundaries; and (3) how `seq` deduplication + capped retries protect batch reliability.',
          },
        ],
        liveExample: {
          title: 'Live Example: Structuring Your Capstone Brief',
          description: 'Use clear section headings covering sanitization, resilience, and edge cases.',
          code: '1. Ingestion & Normalization: Using strip(), lower(), round(..., 2), and ignoring amount <= 0 prevents duplicate category keys and float drift.\n2. Observability & Caching: Checking total == 0 guards ZeroDivisionError, while now_ts < expires_at blocks stale cache hits.\n3. Pipeline Reliability: Keeping highest seq per ID prevents stale overwrites, and min(base * 2**attempt, max_ms) bounds retry delays.',
          expectedOutput: 'Verified >= 80/100 Capstone Rubric Score',
        },
        commonMistake: {
          title: 'Writing Vague One-Line Summaries',
          wrongWay: '"My Python code works well and processes expenses."',
          rightWay: '"Using strip().lower() merges messy keys, amount <= 0 drops refunds, now_ts < expires_at prevents stale reads, and seq deduplication keeps only latest updates."',
          whyItHappens:
            'The Mentor Rubric checks for concrete technical mechanisms and edge-case keywords built across Lessons 01–11.',
        },
        tryItMission:
          'Author a detailed >= 65-word Capstone Architecture Brief addressing all three rubric criteria, then click Verify & Mint Certificate.',
      },
      knowledgeCheck: {
        question: 'Which three safeguards protect your Expense & CLI Operations System in production?',
        options: [
          'Input normalization + negative filtering, zero-division & strict `<` TTL checks, and `seq` deduplication with capped backoff',
          'Using `SELECT *` everywhere without rounding',
          'Disabling all input validation for speed',
        ],
        correctIndex: 0,
        explanation: 'Combining input sanitization, safe boundaries, and idempotent retries protects every stage of the pipeline.',
      },
      hints: [
        'Mention `strip()`, `lower()`, `round()`, and rejecting `amount <= 0` for Pillar 1.',
        'Mention `total == 0` / `ZeroDivisionError` protection and `now_ts < expires_at` for Pillar 2.',
        'Mention `seq` deduplication, `max_ms` cap, and `exponential` backoff for Pillar 3.',
      ],
      referenceSolution: `1. Ingestion & Expense Normalization: Every incoming record normalizes category keys with .strip().lower() so whitespace and mixed casing never split totals, filters out amount <= 0 refunds, and uses round(..., 2) with dictionary .get(cat, 0) to eliminate float drift and KeyErrors.
2. Observability & Cache Boundaries: analyze_logs guards len(lines) == 0 before dividing to prevent ZeroDivisionError on idle windows, while read_cache enforces strict now_ts < expires_at comparison so expired data at the exact TTL boundary is never served.
3. Pipeline Reliability: deduplicate_batch keeps only the highest seq event per ID so out-of-order replays never overwrite newer state, while next_retry_delay caps exponential backoff at max_ms and halts cleanly at max_attempts.`,
      rubricCriteria: [
        {
          id: 'r1',
          criterion: 'Input Sanitization & Dictionary Aggregation',
          weight: 35,
          targetDescription:
            'Explains normalizing strings with strip/lower, ignoring negative amounts, dictionary .get(), and rounding totals.',
          requiredKeywordHints: ['strip', 'lower', 'negative', 'round'],
          minWordCount: 15,
        },
        {
          id: 'r2',
          criterion: 'Zero-Division Guards & Strict TTL Boundaries',
          weight: 35,
          targetDescription:
            'Covers guarding empty log lists against division by zero and enforcing strict < expiry checks in cache lookups.',
          requiredKeywordHints: ['zero', 'cache', 'expires'],
          minWordCount: 15,
        },
        {
          id: 'r3',
          criterion: 'Sequence Deduplication & Bounded Retry Backoff',
          weight: 30,
          targetDescription:
            'Details keeping highest seq per ID and capping exponential retry delays using max_ms and max_attempts.',
          requiredKeywordHints: ['seq', 'backoff', 'max'],
          minWordCount: 15,
        },
      ],
    },
  ],
};
