import type { Course } from '../curriculum-types';

export const SQL_COURSE: Course = {
  id: 'sql-relational-mastery',
  slug: 'sql-relational-mastery',
  track: 'Data, SQL & IT Operations',
  level: 'Foundational',
  title: 'SQL',
  subtitle:
    'Start from your very first SELECT query on a single table and assemble piece by piece—WHERE, NULL safety, sorting, math aliases, INNER/LEFT JOINs, GROUP BY, HAVING, CTEs, and window functions—into a SaaS Revenue Warehouse.',
  durationHours: 22,
  rating: 4.9,
  reviewCount: 5340,
  instructor: {
    name: 'Nadia Benali',
    role: 'Staff Data Engineer',
    organization: 'MetricFlow Cloud',
  },
  thumbnailKey: 'data-cloud',
  primaryMode: 'sandbox',
  primaryRuntime: 'sql',
  capstoneTitle: 'SaaS Revenue, Retention & Executive Warehouse',
  capstoneSummary:
    'Query and join relational SaaS customers, orders, invoices, and regional deals tables inside the browser SQL engine—moving from basic SELECT statements to partitioned window leaderboards.',
  capstoneDeliverables: [
    'Explicit column queries with WHERE, IN, IS NULL, and deterministic sorting',
    'Calculated column aliases, INNER JOINs, and LEFT JOIN gap audits',
    'GROUP BY + HAVING revenue concentration tables',
    'CTE customer LTV rollups, ROW_NUMBER() partitions, and Warehouse Capstone Brief',
  ],
  outcomes: [
    'Understand relational tables, rows, columns, and primary/foreign keys from zero',
    'Filter, clean, sort, and transform table data accurately with SQL clauses',
    'Combine multi-table schemas safely using INNER JOIN and LEFT JOIN',
    'Aggregate cohort metrics and rank top accounts using GROUP BY, CTEs, and Windows',
  ],
  modules: [
    {
      id: 'sql-m1',
      number: '01',
      title: 'What Is a Relational Table & Your First SELECT',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Meet relational databases: data organized into clean spreadsheets called tables, where every row is a record and every column is a field. Run your first `SELECT` statement selecting specific columns from `customers`.',
      keyConcepts: [
        'Tables (records in rows, attributes in columns)',
        'Basic `SELECT col1, col2 FROM table;` syntax',
        'Choosing explicit column names instead of `SELECT *`',
      ],
      architectureNote:
        'Selecting explicit columns (`name, plan`) instead of `SELECT *` keeps dashboards fast and prevents silent breakage if new columns are added later.',
      deliverableTitle: 'Select name and plan from customers in query.sql',
      deliverablePrompt:
        'Update `query.sql` to select only `name` and `plan` columns from the `customers` table.',
      acceptanceCriteria: [
        'Returns all 4 customer rows',
        'Returns strictly the 2 columns: name and plan',
        'Uses clean SELECT ... FROM customers; syntax',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 01 of 12 · First Table Query',
        diagram: {
          type: 'flow',
          title: 'How SQL Reads a Table',
          caption: 'FROM picks the table first, then SELECT chooses which columns appear in your result grid.',
          nodes: ['FROM customers', 'Pick Columns', 'Result Grid'],
        },
        sections: [
          {
            heading: 'What Is a Relational Database?',
            explanation:
              'Think of a database table like a disciplined spreadsheet tab: each vertical column holds one kind of information (`name`, `plan`, `region`), and each horizontal row holds one real customer. SQL is the language used to ask that table questions.',
          },
          {
            heading: 'Your First SELECT Statement',
            explanation:
              'Every read query starts with `SELECT` (which columns you want) and `FROM` (which table holds them), ending neatly with a semicolon `;`.',
            codeLanguage: 'sql',
            codeSnippet: 'SELECT name, plan\nFROM customers;',
          },
        ],
        liveExample: {
          title: 'Live Example: Listing Customer Names & Regions',
          description: 'Load this query to pull just `name` and `region` from `customers`.',
          code: 'SELECT name, region\nFROM customers;',
          expectedOutput: '4 rows showing only name and region columns.',
        },
        commonMistake: {
          title: 'Using `SELECT *` Everywhere',
          wrongWay: 'SELECT * FROM customers;  -- Pulls unneeded columns like internal IDs',
          rightWay: 'SELECT name, plan FROM customers;',
          whyItHappens:
            'Explicitly naming columns communicates intent and avoids accidentally leaking sensitive fields.',
        },
        tryItMission:
          'Edit `query.sql` so it selects only `name` and `plan` from `customers`.',
      },
      knowledgeCheck: {
        question: 'In `SELECT name, plan FROM customers;`, which keyword chooses the source table?',
        options: ['FROM', 'SELECT', 'TABLE'],
        correctIndex: 0,
        explanation: '`FROM customers` tells the SQL engine which table to read rows from.',
      },
      hints: [
        'Write `SELECT name, plan` on the first line.',
        'Add `FROM customers;` on the second line.',
        'Do not include `id` or `region` in the SELECT list.',
      ],
      referenceSolution: `SELECT name, plan
FROM customers;`,
      sqlTables: {
        customers: [
          { id: 1, name: 'Acme Robotics', plan: 'Enterprise', region: 'NA' },
          { id: 2, name: 'Beacon Health', plan: 'Pro', region: 'EU' },
          { id: 3, name: 'Cedar Labs', plan: 'Starter', region: 'NA' },
          { id: 4, name: 'Delta Logistics', plan: 'Enterprise', region: 'APAC' },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
        {
          filename: 'schema.sql',
          language: 'sql',
          readOnly: true,
          content: 'TABLE customers (id INT, name TEXT, plan TEXT, region TEXT);',
        },
      ],
      starterCode: `-- Replace * with explicit columns name and plan
SELECT *
FROM customers;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Returns strictly name and plan columns',
          expression: 'columns.length === 2 && columns.includes("name") && columns.includes("plan")',
          expectedDescription: 'Columns equal ["name", "plan"]',
        },
        {
          id: 't2',
          label: 'Returns all 4 customer records',
          expression: 'rows.length === 4 && rows[0]?.name === "Acme Robotics"',
          expectedDescription: 'Returns 4 customer rows cleanly',
        },
      ],
    },

    {
      id: 'sql-m2',
      number: '02',
      title: 'Filtering Rows with WHERE & Comparison Operators',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Databases often store millions of rows, yet you only want paid orders or high-value purchases. Add a `WHERE` clause to filter rows before returning results.',
      keyConcepts: [
        'Filtering exact text matches with single quotes (`WHERE status = \'paid\'`)',
        'Numeric comparisons (`>=`, `>`, `<`, `!=`)',
        'Combining `SELECT` columns with `WHERE` row filters',
      ],
      architectureNote:
        'SQL evaluates `WHERE` row-by-row before displaying results—keeping text values inside single quotes like `\'paid\'` and numbers unquoted.',
      deliverableTitle: 'Filter paid orders cleanly in query.sql',
      deliverablePrompt:
        'Select `id`, `customer_id`, `status`, and `amount` from `orders` keeping only rows where `status = \'paid\'`.',
      acceptanceCriteria: [
        'Selects id, customer_id, status, and amount',
        'Excludes refunded orders cleanly',
        'Returns exactly the 4 paid order rows',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 02 of 12 · Paid Transaction Filter',
        diagram: {
          type: 'branch-decision',
          title: 'How WHERE Filters Table Rows',
          caption: 'Every row in orders is tested against the WHERE rule; only rows returning True move forward.',
          nodes: ['orders row', "status = 'paid'?", 'Keep Row', 'Drop Refunded'],
        },
        sections: [
          {
            heading: 'Filtering Exact Values with WHERE',
            explanation:
              'Place `WHERE` right after `FROM`. Notice SQL uses a single equals sign `=` for comparison (unlike Python’s `==`), and wraps text values in single quotes `\'paid\'`.',
            codeLanguage: 'sql',
            codeSnippet: "SELECT id, amount\nFROM orders\nWHERE status = 'paid';",
          },
        ],
        liveExample: {
          title: 'Live Example: Filtering Orders >= $250',
          description: 'Run a numeric threshold filter on `orders`.',
          code: 'SELECT id, plan, amount\nFROM orders\nWHERE amount >= 250;',
          expectedOutput: 'Shows only orders with amount >= 250.',
        },
        commonMistake: {
          title: 'Using `==` or Leaving Quotes Off Strings',
          wrongWay: 'WHERE status == paid',
          rightWay: "WHERE status = 'paid'",
          whyItHappens:
            'SQL equality is a single `=`, and string values require single quotes.',
        },
        tryItMission:
          "Filter `orders` to select `id, customer_id, status, amount` where `status = 'paid'`.",
      },
      knowledgeCheck: {
        question: 'Which SQL filter correctly matches rows with paid status?',
        options: ["WHERE status = 'paid'", 'WHERE status == paid', 'SELECT status = "paid"'],
        correctIndex: 0,
        explanation: 'SQL tests equality with a single `=` and wraps text literals in single quotes.',
      },
      hints: [
        'Keep `SELECT id, customer_id, status, amount`.',
        'Add `WHERE status = \'paid\'` right below `FROM orders`.',
      ],
      referenceSolution: `SELECT id, customer_id, status, amount
FROM orders
WHERE status = 'paid';`,
      sqlTables: {
        orders: [
          { id: 101, customer_id: 'C1', plan: 'Enterprise', status: 'paid', amount: 450 },
          { id: 102, customer_id: 'C2', plan: 'Starter', status: 'paid', amount: 49 },
          { id: 103, customer_id: 'C3', plan: 'Enterprise', status: 'refunded', amount: 500 },
          { id: 104, customer_id: 'C4', plan: 'Pro', status: 'paid', amount: 240 },
          { id: 105, customer_id: 'C5', plan: 'Enterprise', status: 'paid', amount: 890 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT id, customer_id, status, amount
FROM orders;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Keeps only paid orders',
          expression: 'rows.length === 4 && rows.every((r) => r.status === "paid")',
          expectedDescription: 'Returns 4 paid orders and excludes refunded id 103',
        },
        {
          id: 't2',
          label: 'Includes expected columns',
          expression: 'columns.includes("id") && columns.includes("amount")',
          expectedDescription: 'Selects id, customer_id, status, amount',
        },
      ],
    },

    {
      id: 'sql-m3',
      number: '03',
      title: 'Compound Logic (AND / IN) & NULL Safety',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Real queries combine multiple rules (`AND`, `IN (...)`) and handle blank database cells properly. Learn why `column = NULL` fails and why `IS NULL` / `IS NOT NULL` is essential.',
      keyConcepts: [
        'Combining filters cleanly with `AND` and list matching with `IN (...)`',
        'Understanding SQL `NULL` (unknown/missing, never equal to anything)',
        'Checking missing values reliably via `IS NOT NULL` or `IS NULL`',
      ],
      architectureNote:
        'In SQL, `NULL` means "value unknown". Even `NULL = NULL` evaluates to False—always test missing values with `IS NULL` or `IS NOT NULL`.',
      deliverableTitle: 'Filter paid high-intent orders with verified regions',
      deliverablePrompt:
        'Select `id`, `plan`, `region`, `amount` from `orders` where `status = \'paid\'`, `plan IN (\'Enterprise\', \'Pro\')`, AND `region IS NOT NULL`.',
      acceptanceCriteria: [
        'Uses IN (\'Enterprise\', \'Pro\') cleanly',
        'Filters out NULL region rows using IS NOT NULL',
        'Excludes Starter and refunded rows',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 03 of 12 · Multi-Rule & NULL Guard',
        diagram: {
          type: 'branch-decision',
          title: 'Testing Missing Cells with IS NOT NULL',
          caption: 'Combining AND, IN, and IS NOT NULL guarantees zero corrupted blanks leak into revenue counts.',
          nodes: ['orders row', 'Paid + Pro/Ent?', 'region IS NOT NULL', 'Clean Subset'],
        },
        sections: [
          {
            heading: 'Matching Multiple Values with IN (...)',
            explanation:
              'Instead of writing long `OR` chains, pass a clean list inside `IN`: `plan IN (\'Enterprise\', \'Pro\')`.',
          },
          {
            heading: 'Why `= NULL` Never Works',
            explanation:
              'In relational databases, `NULL` represents an empty, unknown cell. You cannot compare unknown with `=` or `!=`. Always use `region IS NULL` or `region IS NOT NULL`.',
            codeLanguage: 'sql',
            codeSnippet: "WHERE status = 'paid'\n  AND plan IN ('Enterprise', 'Pro')\n  AND region IS NOT NULL;",
          },
        ],
        liveExample: {
          title: 'Live Example: Catching Missing Regions',
          description: 'See which row disappears once `IS NOT NULL` guards blank region data.',
          code: 'SELECT id, plan, region\nFROM orders\nWHERE region IS NOT NULL;',
          expectedOutput: 'Excludes id 106 where region is NULL.',
        },
        commonMistake: {
          title: 'Writing `region != NULL`',
          wrongWay: 'WHERE region != NULL  -- Always evaluates empty!',
          rightWay: 'WHERE region IS NOT NULL',
          whyItHappens:
            'Comparing anything against `NULL` with `=` or `!=` returns UNKNOWN instead of True.',
        },
        tryItMission:
          "Filter `orders` for `status = 'paid'`, `plan IN ('Enterprise', 'Pro')`, and `region IS NOT NULL`.",
      },
      knowledgeCheck: {
        question: 'How do you correctly check for non-empty cells in SQL?',
        options: ['WHERE region IS NOT NULL', 'WHERE region != NULL', 'WHERE region <> "NULL"'],
        correctIndex: 0,
        explanation: 'SQL requires `IS NULL` and `IS NOT NULL` to test missing values.',
      },
      hints: [
        'Filter `status = \'paid\'` first.',
        'Add `AND plan IN (\'Enterprise\', \'Pro\')`.',
        'Add `AND region IS NOT NULL`.',
      ],
      referenceSolution: `SELECT id, plan, region, amount
FROM orders
WHERE status = 'paid'
  AND plan IN ('Enterprise', 'Pro')
  AND region IS NOT NULL;`,
      sqlTables: {
        orders: [
          { id: 101, plan: 'Enterprise', region: 'NA', status: 'paid', amount: 450 },
          { id: 102, plan: 'Starter', region: 'EU', status: 'paid', amount: 49 },
          { id: 103, plan: 'Enterprise', region: 'NA', status: 'refunded', amount: 500 },
          { id: 104, plan: 'Pro', region: 'EU', status: 'paid', amount: 240 },
          { id: 105, plan: 'Enterprise', region: 'APAC', status: 'paid', amount: 890 },
          { id: 106, plan: 'Pro', region: null, status: 'paid', amount: 210 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT id, plan, region, amount
FROM orders
WHERE status = 'paid';`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Matches only paid Enterprise and Pro rows with non-null region',
          expression: 'rows.length === 3 && rows.every((r) => r.region !== null && (r.plan === "Enterprise" || r.plan === "Pro"))',
          expectedDescription: 'Returns ids 101, 104, 105 cleanly',
        },
        {
          id: 't2',
          label: 'Excludes NULL region row (id 106) and Starter (id 102)',
          expression: '!rows.some((r) => r.id === 106 || r.id === 102 || r.id === 103)',
          expectedDescription: 'Drops NULL region, Starter, and refunded rows',
        },
      ],
    },

    {
      id: 'sql-m4',
      number: '04',
      title: 'Sorting, Deduplicating & Top-N Slicing (ORDER BY, DISTINCT, LIMIT)',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Executives rarely want 10,000 unsorted rows—they want the **top 2 highest paid orders** in clean descending order. Master `ORDER BY`, `DESC`, `LIMIT`, and `DISTINCT`.',
      keyConcepts: [
        'Sorting cleanly with `ORDER BY col DESC` (largest first) or `ASC`',
        'Taking top results with `LIMIT N`',
        'Removing duplicate rows with `SELECT DISTINCT`',
      ],
      architectureNote:
        'Never use `LIMIT` without `ORDER BY`—without sorting, "top 2" just grabs whichever rows happen to sit first on disk.',
      deliverableTitle: 'Return top 2 paid orders >= $200 sorted descending',
      deliverablePrompt:
        'Select `id`, `customer_id`, `plan`, `amount` from `orders` where `status = \'paid\'` AND `amount >= 200`, ordered by `amount DESC`, keeping only the top `LIMIT 2` rows.',
      acceptanceCriteria: [
        'Filters strictly for paid orders >= $200',
        'Orders descending with $890 first',
        'Slices cleanly to 2 rows using LIMIT 2',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 04 of 12 · Top-N Leaderboard Query',
        diagram: {
          type: 'flow',
          title: 'Order of Execution: Filter -> Sort -> Slice',
          caption: 'SQL filters rows via WHERE, sorts via ORDER BY amount DESC, then slices the top 2 via LIMIT.',
          nodes: ['WHERE Paid >= 200', 'ORDER BY amount DESC', 'LIMIT 2'],
        },
        sections: [
          {
            heading: 'Sorting Results with ORDER BY',
            explanation:
              'By default, `ORDER BY amount ASC` sorts smallest-to-largest (`A -> Z`). Add `DESC` (`ORDER BY amount DESC`) to put the largest deals right at the top.',
            codeLanguage: 'sql',
            codeSnippet: "SELECT id, amount\nFROM orders\nWHERE status = 'paid'\nORDER BY amount DESC\nLIMIT 2;",
          },
        ],
        liveExample: {
          title: 'Live Example: Unique Active Plans',
          description: 'Use `SELECT DISTINCT` to list each unique plan only once.',
          code: 'SELECT DISTINCT plan\nFROM orders\nORDER BY plan ASC;',
          expectedOutput: 'Lists Enterprise, Pro, Starter cleanly once each.',
        },
        commonMistake: {
          title: 'Putting `LIMIT` Before `ORDER BY`',
          wrongWay: 'SELECT id, amount FROM orders LIMIT 2 ORDER BY amount DESC;',
          rightWay: 'SELECT id, amount FROM orders ORDER BY amount DESC LIMIT 2;',
          whyItHappens:
            'In SQL syntax, `LIMIT` always belongs at the very end after sorting is complete.',
        },
        tryItMission:
          "Filter `orders` for `status = 'paid' AND amount >= 200`, sort `ORDER BY amount DESC`, and add `LIMIT 2`.",
      },
      knowledgeCheck: {
        question: 'Why should `LIMIT 2` always follow `ORDER BY` when finding top orders?',
        options: [
          'Without ORDER BY, LIMIT picks arbitrary rows instead of guaranteed highest amounts',
          'ORDER BY cannot run after WHERE',
          'LIMIT turns strings into numbers',
        ],
        correctIndex: 0,
        explanation: 'Deterministic sorting guarantees the top rows returned are truly the highest values.',
      },
      hints: [
        'Use `WHERE status = \'paid\' AND amount >= 200`.',
        'Sort with `ORDER BY amount DESC`.',
        'Add `LIMIT 2` on the final line.',
      ],
      referenceSolution: `SELECT id, customer_id, plan, amount
FROM orders
WHERE status = 'paid' AND amount >= 200
ORDER BY amount DESC
LIMIT 2;`,
      sqlTables: {
        orders: [
          { id: 101, customer_id: 'C1', plan: 'Enterprise', status: 'paid', amount: 450 },
          { id: 102, customer_id: 'C2', plan: 'Starter', status: 'paid', amount: 49 },
          { id: 103, customer_id: 'C3', plan: 'Enterprise', status: 'refunded', amount: 500 },
          { id: 104, customer_id: 'C4', plan: 'Pro', status: 'paid', amount: 240 },
          { id: 105, customer_id: 'C5', plan: 'Enterprise', status: 'paid', amount: 890 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT id, customer_id, plan, amount
FROM orders
WHERE status = 'paid'
ORDER BY id ASC;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Returns strictly top 2 highest paid orders >= $200',
          expression: 'rows.length === 2 && rows[0]?.amount === 890 && rows[1]?.amount === 450',
          expectedDescription: 'Orders [890, 450] and limits to 2 rows',
        },
        {
          id: 't2',
          label: 'Excludes refunded row (id 103)',
          expression: '!rows.some((r) => r.id === 103)',
          expectedDescription: 'Excludes refunded $500 row',
        },
      ],
    },

    {
      id: 'sql-m5',
      number: '05',
      title: 'Calculated Columns & Readable Aliases (AS, ROUND)',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'SQL can compute new values right inside `SELECT`—like subtracting discounts (`amount - discount`), guarding missing discounts with `COALESCE(discount, 0)`, and renaming columns cleanly with `AS net_revenue`.',
      keyConcepts: [
        'Inline column arithmetic (`amount - discount`)',
        'Naming calculated columns cleanly with `AS alias_name`',
        'Replacing NULL numbers safely using `COALESCE(discount, 0)`',
      ],
      architectureNote:
        'Giving calculated expressions clean snake_case aliases (`AS net_amount`) keeps reports self-explanatory and easy to chart.',
      deliverableTitle: 'Compute net_amount and tax_estimate per invoice',
      deliverablePrompt:
        'Select `invoice_id`, `customer`, `amount - discount AS net_amount` from `invoices` where `paid = 1`, sorted by `net_amount DESC`.',
      acceptanceCriteria: [
        'Computes net_amount cleanly as amount - discount',
        'Filters strictly for paid = 1 invoices',
        'Sorts descending by net_amount',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 05 of 12 · Net Revenue Calculator',
        diagram: {
          type: 'flow',
          title: 'Transforming Columns Inside SELECT',
          caption: 'Compute net revenue directly in SQL and give the expression a clean name using AS.',
          nodes: ['amount - discount', 'AS net_amount', 'ORDER BY DESC'],
        },
        sections: [
          {
            heading: 'Column Math & Aliases (`AS`)',
            explanation:
              'Write expressions like `amount - discount` directly inside `SELECT`, and follow them with `AS net_amount` so your output table has a clean column header instead of an ugly formula.',
            codeLanguage: 'sql',
            codeSnippet: 'SELECT invoice_id, amount - discount AS net_amount\nFROM invoices\nWHERE paid = 1;',
          },
        ],
        liveExample: {
          title: 'Live Example: Rounding Tax Calculations',
          description: 'See how `ROUND(..., 2) AS estimated_tax` keeps numbers tidy.',
          code: 'SELECT invoice_id, ROUND(amount * 0.08, 2) AS estimated_tax\nFROM invoices\nWHERE paid = 1;',
          expectedOutput: 'Shows clean 2-decimal tax column named estimated_tax.',
        },
        commonMistake: {
          title: 'Omitting `AS` Alias on Calculated Columns',
          wrongWay: 'SELECT amount - discount FROM invoices;',
          rightWay: 'SELECT amount - discount AS net_amount FROM invoices;',
          whyItHappens:
            'Charts and BI dashboards need clean predictable column names to bind fields properly.',
        },
        tryItMission:
          'Select `invoice_id`, `customer`, and `amount - discount AS net_amount` from `invoices` where `paid = 1`, ordered by `net_amount DESC`.',
      },
      knowledgeCheck: {
        question: 'What does `AS net_amount` do in `SELECT amount - discount AS net_amount`?',
        options: [
          'Names the calculated output column net_amount',
          'Saves a permanent column back into the table schema',
          'Rounds the number to the nearest integer',
        ],
        correctIndex: 0,
        explanation: '`AS` creates a clean output column alias for the query result.',
      },
      hints: [
        'Write `amount - discount AS net_amount` in your SELECT list.',
        'Filter with `WHERE paid = 1`.',
        'Sort with `ORDER BY net_amount DESC`.',
      ],
      referenceSolution: `SELECT invoice_id, customer, amount - discount AS net_amount
FROM invoices
WHERE paid = 1
ORDER BY net_amount DESC;`,
      sqlTables: {
        invoices: [
          { invoice_id: 'INV-1', customer: 'Acme', amount: 500, discount: 50, paid: 1 },
          { invoice_id: 'INV-2', customer: 'Beacon', amount: 300, discount: 0, paid: 1 },
          { invoice_id: 'INV-3', customer: 'Cedar', amount: 800, discount: 100, paid: 0 },
          { invoice_id: 'INV-4', customer: 'Delta', amount: 700, discount: 120, paid: 1 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT invoice_id, customer, amount
FROM invoices;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes net_amount cleanly with alias',
          expression: 'columns.includes("net_amount") && rows.length === 3',
          expectedDescription: 'Includes net_amount column across 3 paid invoices',
        },
        {
          id: 't2',
          label: 'Sorts highest net_amount ($580 Delta) first',
          expression: 'rows[0]?.net_amount === 580 && rows[2]?.net_amount === 300',
          expectedDescription: 'Orders [580, 450, 300] descending',
        },
      ],
    },

    {
      id: 'sql-m6',
      number: '06',
      title: 'Connecting Tables with INNER JOIN',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Real databases split customer profiles (`customers`) and transactions (`orders`) into separate tables so customer names are never duplicated on every order. Snap them together using `INNER JOIN ... ON`.',
      keyConcepts: [
        'Primary keys (`customers.id`) vs foreign keys (`orders.customer_id`)',
        'Qualifying shared columns with table aliases (`c.name`, `o.amount`)',
        'Matching only rows that exist in BOTH tables via `INNER JOIN`',
      ],
      architectureNote:
        'Using short readable aliases (`customers AS c`, `orders AS o`) keeps joined queries concise and avoids ambiguous column name errors.',
      deliverableTitle: 'Join customers and orders via INNER JOIN',
      deliverablePrompt:
        'Select `c.name`, `c.region`, and `o.amount` joining `customers AS c` with `orders AS o` ON `c.id = o.customer_id`, ordered by `o.amount DESC`.',
      acceptanceCriteria: [
        'Uses INNER JOIN connecting c.id = o.customer_id',
        'Returns c.name, c.region, and o.amount cleanly',
        'Orders descending by o.amount',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 06 of 12 · Relational Table Connector',
        diagram: {
          type: 'table-join',
          title: 'Linking Customers to Orders via Keys',
          caption: 'INNER JOIN keeps rows where c.id matches o.customer_id across both tables.',
          nodes: ['customers (c)', 'id = C1', 'orders (o)', 'Acme + $600'],
        },
        sections: [
          {
            heading: 'Why Databases Split Tables',
            explanation:
              'If Acme Robotics places 500 orders and changes its company name, storing the name in one `customers` table means updating just ONE row instead of 500 order rows. `orders` simply keeps a reference ID (`customer_id`).',
            codeLanguage: 'sql',
            codeSnippet: 'SELECT c.name, o.amount\nFROM customers AS c\nINNER JOIN orders AS o ON c.id = o.customer_id;',
          },
        ],
        liveExample: {
          title: 'Live Example: Joining Customer Regions & Amounts',
          description: 'See how `INNER JOIN` pairs `C1 -> Acme Robotics` and `C2 -> Beacon Health`.',
          code: 'SELECT c.name, c.region, o.amount\nFROM customers AS c\nINNER JOIN orders AS o ON c.id = o.customer_id\nORDER BY o.amount DESC;',
          expectedOutput: 'Returns 2 matched rows (Cedar Labs has no order so INNER JOIN skips it).',
        },
        commonMistake: {
          title: 'Forgetting the `ON` Join Condition',
          wrongWay: 'INNER JOIN orders  -- Unmatched Cartesian explosion!',
          rightWay: 'INNER JOIN orders AS o ON c.id = o.customer_id',
          whyItHappens:
            'Without `ON`, SQL does not know which customer belongs to which order.',
        },
        tryItMission:
          'Write an `INNER JOIN` combining `customers AS c` and `orders AS o` on `c.id = o.customer_id`, sorted by `o.amount DESC`.',
      },
      knowledgeCheck: {
        question: 'In `customers (id)` joined to `orders (customer_id)`, what happens in an `INNER JOIN` if a customer has 0 orders?',
        options: [
          'That customer is excluded from the result set',
          'That customer appears with NULL order amount',
          'The query throws an error',
        ],
        correctIndex: 0,
        explanation: 'INNER JOIN keeps only rows where a matching key exists on BOTH sides.',
      },
      hints: [
        'Alias `customers AS c` and `orders AS o`.',
        'Join `ON c.id = o.customer_id`.',
        'Sort `ORDER BY o.amount DESC`.',
      ],
      referenceSolution: `SELECT c.name, c.region, o.amount
FROM customers AS c
INNER JOIN orders AS o ON c.id = o.customer_id
ORDER BY o.amount DESC;`,
      sqlTables: {
        customers: [
          { id: 'C1', name: 'Acme Robotics', region: 'NA' },
          { id: 'C2', name: 'Beacon Health', region: 'EU' },
          { id: 'C3', name: 'Cedar Labs', region: 'NA' },
        ],
        orders: [
          { order_id: 1, customer_id: 'C1', amount: 600 },
          { order_id: 2, customer_id: 'C2', amount: 320 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT name, region
FROM customers;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Matches both customers who placed orders',
          expression: 'rows.length === 2 && rows[0]?.name === "Acme Robotics" && rows[0]?.amount === 600',
          expectedDescription: 'Returns Acme ($600) then Beacon ($320)',
        },
        {
          id: 't2',
          label: 'Excludes unmatched Cedar Labs cleanly',
          expression: '!rows.some((r) => r.name === "Cedar Labs")',
          expectedDescription: 'INNER JOIN drops zero-order accounts',
        },
      ],
    },

    {
      id: 'sql-m7',
      number: '07',
      title: 'Preserving Unmatched Records with LEFT JOIN',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'In Lesson 06, `Cedar Labs` vanished because they had 0 orders. When auditing customer retention or churn risk, disappearing accounts are the exact ones you need to see! Switch to `LEFT JOIN`.',
      keyConcepts: [
        'Keeping every row from the left table (`customers`) via `LEFT JOIN`',
        'Why unmatched right-table columns appear cleanly as `NULL`',
        'Spotting silent conversion back to `INNER JOIN` via `WHERE` mistakes',
      ],
      architectureNote:
        'Never add `WHERE o.amount > 0` after a `LEFT JOIN` unless you intend to drop unmatched `NULL` rows back out!',
      deliverableTitle: 'Preserve zero-order customers via LEFT JOIN',
      deliverablePrompt:
        'Select `c.name`, `c.region`, and `o.amount` starting from `customers AS c` and using `LEFT JOIN orders AS o ON c.id = o.customer_id`, ordered by `c.name ASC`.',
      acceptanceCriteria: [
        'Returns all 3 customers including Cedar Labs',
        'Shows NULL amount for Cedar Labs cleanly',
        'Sorts alphabetically by c.name ASC',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 07 of 12 · Zero-Order Churn Audit',
        diagram: {
          type: 'table-join',
          title: 'LEFT JOIN Keeps All Left Rows',
          caption: 'Even when orders has no matching row for C3 (Cedar Labs), LEFT JOIN keeps the customer with amount = NULL.',
          nodes: ['All customers (c)', 'id = C3', 'orders (o)', 'Cedar + NULL'],
        },
        sections: [
          {
            heading: 'INNER JOIN vs LEFT JOIN',
            explanation:
              'Think of `LEFT JOIN` as saying: "Keep EVERY customer on the left, attach matching orders if they exist, and leave order cells `NULL` if none exist."',
            codeLanguage: 'sql',
            codeSnippet: 'SELECT c.name, c.region, o.amount\nFROM customers AS c\nLEFT JOIN orders AS o ON c.id = o.customer_id\nORDER BY c.name ASC;',
          },
        ],
        liveExample: {
          title: 'Live Example: Finding Unpaid Accounts',
          description: 'See Cedar Labs appear in row 3 with an empty `NULL` amount cell.',
          code: 'SELECT c.name, o.amount\nFROM customers AS c\nLEFT JOIN orders AS o ON c.id = o.customer_id\nORDER BY c.name ASC;',
          expectedOutput: '3 rows: Acme (600), Beacon (320), Cedar (NULL).',
        },
        commonMistake: {
          title: 'Accidentally Canceling a LEFT JOIN with WHERE',
          wrongWay: 'LEFT JOIN orders AS o ON c.id = o.customer_id\nWHERE o.amount > 0  -- Drops NULLs!',
          rightWay: 'LEFT JOIN orders AS o ON c.id = o.customer_id',
          whyItHappens:
            'Filtering `o.amount > 0` fails on `NULL` rows, silently turning your `LEFT JOIN` back into an `INNER JOIN`.',
        },
        tryItMission:
          'Switch to `LEFT JOIN` on `customers AS c` and `orders AS o` ordered by `c.name ASC`.',
      },
      knowledgeCheck: {
        question: 'What value appears in `o.amount` for a customer with no orders in a `LEFT JOIN`?',
        options: ['NULL', '0', 'The customer row is deleted'],
        correctIndex: 0,
        explanation: 'Unmatched columns from the right-hand table default cleanly to `NULL`.',
      },
      hints: [
        'Replace `INNER JOIN` with `LEFT JOIN`.',
        'Select `c.name, c.region, o.amount`.',
        'Order by `c.name ASC`.',
      ],
      referenceSolution: `SELECT c.name, c.region, o.amount
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id
ORDER BY c.name ASC;`,
      sqlTables: {
        customers: [
          { id: 'C1', name: 'Acme Robotics', region: 'NA' },
          { id: 'C2', name: 'Beacon Health', region: 'EU' },
          { id: 'C3', name: 'Cedar Labs', region: 'NA' },
        ],
        orders: [
          { order_id: 1, customer_id: 'C1', amount: 600 },
          { order_id: 2, customer_id: 'C2', amount: 320 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT c.name, c.region, o.amount
FROM customers AS c
INNER JOIN orders AS o ON c.id = o.customer_id
ORDER BY c.name ASC;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Preserves zero-order account Cedar Labs',
          expression: 'rows.length === 3 && rows.some((r) => r.name === "Cedar Labs" && r.amount === null)',
          expectedDescription: 'Includes Cedar Labs with NULL amount',
        },
        {
          id: 't2',
          label: 'Sorts alphabetically by customer name',
          expression: 'rows[0]?.name === "Acme Robotics" && rows[2]?.name === "Cedar Labs"',
          expectedDescription: 'Orders Acme -> Beacon -> Cedar',
        },
      ],
    },

    {
      id: 'sql-m8',
      number: '08',
      title: 'Summarizing Whole Tables (COUNT, SUM, AVG)',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Aggregate functions collapse many individual transaction rows into a single executive summary row—counting orders (`COUNT(*)`), totaling revenue (`SUM(amount)`), and computing averages (`AVG(amount)`).',
      keyConcepts: [
        '`COUNT(*)` vs `SUM(col)` vs `AVG(col)`',
        'Combining `WHERE status = \'paid\'` BEFORE aggregating',
        'Aliasing executive summary columns clearly',
      ],
      architectureNote:
        'Always filter out refunds in `WHERE` before computing `SUM()` or `AVG()`, otherwise failed payments inflate your revenue report.',
      deliverableTitle: 'Compute paid order count, total revenue, and average order value',
      deliverablePrompt:
        'Query `orders` where `status = \'paid\'` to output one summary row with `COUNT(*) AS paid_orders`, `SUM(amount) AS total_revenue`, and `AVG(amount) AS avg_order`.',
      acceptanceCriteria: [
        'Excludes refunded orders before aggregating',
        'Returns 1 summary row with paid_orders, total_revenue, and avg_order',
        'Matches paid_orders = 4 and total_revenue = 1450',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 08 of 12 · Executive Totals Summary',
        diagram: {
          type: 'flow',
          title: 'Collapsing Rows into Summary Metrics',
          caption: 'WHERE drops refunded transactions first; COUNT, SUM, and AVG condense the remaining rows into KPIs.',
          nodes: ['WHERE paid', 'COUNT / SUM / AVG', '1 KPI Row'],
        },
        sections: [
          {
            heading: 'Aggregate Functions',
            explanation:
              'Unlike row-level columns (`id`, `amount`), aggregate functions look across all filtered rows at once and return a single number.',
            codeLanguage: 'sql',
            codeSnippet: "SELECT COUNT(*) AS paid_orders, SUM(amount) AS total_revenue\nFROM orders\nWHERE status = 'paid';",
          },
        ],
        liveExample: {
          title: 'Live Example: Counting Total Orders',
          description: 'Collapse the whole table into a single count and sum.',
          code: "SELECT COUNT(*) AS paid_orders, SUM(amount) AS total_revenue\nFROM orders\nWHERE status = 'paid';",
          expectedOutput: '1 row: paid_orders=4, total_revenue=1450.',
        },
        commonMistake: {
          title: 'Forgetting to Filter Refunded Rows Before SUM()',
          wrongWay: 'SELECT SUM(amount) FROM orders;  -- Includes refunded $900!',
          rightWay: "SELECT SUM(amount) FROM orders WHERE status = 'paid';",
          whyItHappens:
            'Aggregates sum every row unless `WHERE` removes canceled or refunded records first.',
        },
        tryItMission:
          'Select `COUNT(*) AS paid_orders`, `SUM(amount) AS total_revenue`, and `AVG(amount) AS avg_order` for paid orders.',
      },
      knowledgeCheck: {
        question: 'When calculating `SUM(amount)` for company revenue, when are refunded rows removed?',
        options: [
          'In the `WHERE` clause before `SUM()` runs',
          'After `SUM()` finishes',
          'Never—refunds must always stay inside SUM()',
        ],
        correctIndex: 0,
        explanation: '`WHERE` filters raw rows before aggregation functions calculate sums and averages.',
      },
      hints: [
        'Select `COUNT(*) AS paid_orders, SUM(amount) AS total_revenue, AVG(amount) AS avg_order`.',
        'Add `WHERE status = \'paid\'`.',
      ],
      referenceSolution: `SELECT COUNT(*) AS paid_orders,
  SUM(amount) AS total_revenue,
  AVG(amount) AS avg_order
FROM orders
WHERE status = 'paid';`,
      sqlTables: {
        orders: [
          { id: 1, region: 'NA', status: 'paid', amount: 400 },
          { id: 2, region: 'NA', status: 'paid', amount: 350 },
          { id: 3, region: 'EU', status: 'paid', amount: 520 },
          { id: 4, region: 'APAC', status: 'paid', amount: 180 },
          { id: 5, region: 'APAC', status: 'refunded', amount: 900 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT COUNT(*) AS paid_orders
FROM orders;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Excludes refunded $900 row from total_revenue',
          expression: 'rows.length === 1 && rows[0]?.paid_orders === 4 && rows[0]?.total_revenue === 1450',
          expectedDescription: 'paid_orders = 4 and total_revenue = 1450',
        },
        {
          id: 't2',
          label: 'Computes accurate average order value',
          expression: 'rows[0]?.avg_order === 362.5',
          expectedDescription: 'avg_order equals 362.5',
        },
      ],
    },

    {
      id: 'sql-m9',
      number: '09',
      title: 'Bucketing Aggregates with GROUP BY',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Now split that overall company sum by region (`NA`, `EU`, `APAC`) using `GROUP BY region`—turning flat logs into a regional revenue breakdown.',
      keyConcepts: [
        'Grouping rows into buckets before aggregating (`GROUP BY region`)',
        'Matching non-aggregated SELECT columns to `GROUP BY`',
        'Ordering grouped results by aggregated alias (`ORDER BY total_revenue DESC`)',
      ],
      architectureNote:
        'Every non-aggregate column in your `SELECT` list belongs in `GROUP BY` so the grouping key is 100% unambiguous.',
      deliverableTitle: 'Compute paid order_count and total_revenue per region',
      deliverablePrompt:
        'Query `orders` where `status = \'paid\'`, grouping by `region`, selecting `region`, `COUNT(*) AS order_count`, and `SUM(amount) AS total_revenue`, ordered by `total_revenue DESC`.',
      acceptanceCriteria: [
        'Groups paid orders cleanly across NA, EU, and APAC',
        'Excludes refunded APAC transaction',
        'Orders NA ($750) -> EU ($520) -> APAC ($180)',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 09 of 12 · Regional Revenue Buckets',
        diagram: {
          type: 'dict-map',
          title: 'How GROUP BY Splits Aggregates by Bucket',
          caption: 'Rows sharing the same region are grouped together before COUNT and SUM summarize each bucket.',
          nodes: ["region = 'NA'", '2 paid | $750', "region = 'EU'", '1 paid | $520'],
        },
        sections: [
          {
            heading: 'Grouping Rows into Buckets',
            explanation:
              '`GROUP BY region` creates one mini-bucket per region (`NA`, `EU`, `APAC`) and runs `COUNT(*)` and `SUM(amount)` separately inside each bucket.',
            codeLanguage: 'sql',
            codeSnippet: "SELECT region, SUM(amount) AS total_revenue\nFROM orders\nWHERE status = 'paid'\nGROUP BY region;",
          },
        ],
        liveExample: {
          title: 'Live Example: Orders per Region',
          description: 'Inspect order count per region cleanly.',
          code: "SELECT region, COUNT(*) AS order_count\nFROM orders\nWHERE status = 'paid'\nGROUP BY region;",
          expectedOutput: 'NA (2), EU (1), APAC (1).',
        },
        commonMistake: {
          title: 'Forgetting `GROUP BY` When Mixing Columns & Aggregates',
          wrongWay: "SELECT region, SUM(amount) FROM orders;  -- Missing GROUP BY region!",
          rightWay: "SELECT region, SUM(amount) FROM orders GROUP BY region;",
          whyItHappens:
            'SQL needs `GROUP BY` to know how to split `SUM(amount)` across distinct regions.',
        },
        tryItMission:
          "Aggregate `region`, `COUNT(*) AS order_count`, and `SUM(amount) AS total_revenue` for paid orders grouped by `region`.",
      },
      knowledgeCheck: {
        question: 'If `SELECT` includes `region` alongside `SUM(amount)`, what clause is required?',
        options: ['GROUP BY region', 'LIMIT region', 'LEFT JOIN region'],
        correctIndex: 0,
        explanation: 'Every non-aggregated column selected alongside aggregates must appear in `GROUP BY`.',
      },
      hints: [
        'Filter `WHERE status = \'paid\'` before grouping.',
        'Add `GROUP BY region`.',
        'Sort `ORDER BY total_revenue DESC`.',
      ],
      referenceSolution: `SELECT region, COUNT(*) AS order_count, SUM(amount) AS total_revenue
FROM orders
WHERE status = 'paid'
GROUP BY region
ORDER BY total_revenue DESC;`,
      sqlTables: {
        orders: [
          { id: 1, region: 'NA', status: 'paid', amount: 400 },
          { id: 2, region: 'NA', status: 'paid', amount: 350 },
          { id: 3, region: 'EU', status: 'paid', amount: 520 },
          { id: 4, region: 'APAC', status: 'paid', amount: 180 },
          { id: 5, region: 'APAC', status: 'refunded', amount: 900 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT region, COUNT(*) AS order_count
FROM orders
WHERE status = 'paid'
GROUP BY region;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Returns 3 regional buckets sorted by revenue',
          expression: 'rows.length === 3 && rows[0]?.region === "NA" && rows[0]?.total_revenue === 750',
          expectedDescription: 'Returns NA ($750), EU ($520), APAC ($180)',
        },
        {
          id: 't2',
          label: 'Counts paid orders per region accurately',
          expression: 'rows[0]?.order_count === 2 && rows[2]?.total_revenue === 180',
          expectedDescription: 'NA has 2 orders; APAC excludes refunded $900',
        },
      ],
    },

    {
      id: 'sql-m10',
      number: '10',
      title: 'Filtering Summarized Groups with HAVING',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        '`WHERE` filters individual rows *before* grouping; `HAVING` filters whole buckets *after* grouping! Keep only high-performing regions whose total paid revenue reaches at least `$500`.',
      keyConcepts: [
        'Pre-aggregation row filter (`WHERE`) vs post-aggregation bucket filter (`HAVING`)',
        'Filtering on aggregate conditions (`HAVING SUM(amount) >= 500`)',
        'Combining `WHERE`, `GROUP BY`, `HAVING`, and `ORDER BY` in exact order',
      ],
      architectureNote:
        'Memory shortcut: `WHERE` runs before `GROUP BY` (on raw rows); `HAVING` runs after `GROUP BY` (on grouped totals).',
      deliverableTitle: 'Add HAVING SUM(amount) >= 500 to regional revenue report',
      deliverablePrompt:
        'Select `region`, `COUNT(*) AS order_count`, and `SUM(amount) AS total_revenue` from paid `orders`, grouped by `region`, keeping only regions `HAVING SUM(amount) >= 500`, ordered by `total_revenue DESC`.',
      acceptanceCriteria: [
        'Excludes refunded orders via WHERE before grouping',
        'Drops APAC ($180) via HAVING SUM(amount) >= 500',
        'Returns NA ($750) then EU ($520)',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 10 of 12 · High-Value Region Filter',
        diagram: {
          type: 'flow',
          title: 'WHERE vs HAVING Pipeline Order',
          caption: 'WHERE filters rows first; GROUP BY sums buckets; HAVING drops small buckets afterward.',
          nodes: ['WHERE paid', 'GROUP BY region', 'HAVING SUM >= 500'],
        },
        sections: [
          {
            heading: 'Why SQL Needs Both WHERE and HAVING',
            explanation:
              'You cannot write `WHERE SUM(amount) >= 500` because sums do not exist yet when `WHERE` runs on single rows! `HAVING` runs right after `GROUP BY` specifically to filter aggregated totals.',
            codeLanguage: 'sql',
            codeSnippet: "WHERE status = 'paid'\nGROUP BY region\nHAVING SUM(amount) >= 500",
          },
        ],
        liveExample: {
          title: 'Live Example: Filtering Groups by Count',
          description: 'See how `HAVING COUNT(*) >= 2` keeps only multi-order regions.',
          code: "SELECT region, COUNT(*) AS order_count\nFROM orders\nWHERE status = 'paid'\nGROUP BY region\nHAVING COUNT(*) >= 2;",
          expectedOutput: 'Returns only NA (order_count = 2).',
        },
        commonMistake: {
          title: 'Putting `SUM(amount)` Inside `WHERE`',
          wrongWay: 'WHERE SUM(amount) >= 500  -- Aggregate not valid in WHERE!',
          rightWay: 'GROUP BY region HAVING SUM(amount) >= 500',
          whyItHappens:
            'Aggregates only exist after `GROUP BY` creates the grouped buckets.',
        },
        tryItMission:
          'Filter paid `orders`, group by `region`, apply `HAVING SUM(amount) >= 500`, and sort descending.',
      },
      knowledgeCheck: {
        question: 'Which clause filters grouped buckets AFTER `SUM(amount)` has been computed?',
        options: ['HAVING', 'WHERE', 'LIMIT'],
        correctIndex: 0,
        explanation: '`HAVING` filters group aggregates after `GROUP BY` executes.',
      },
      hints: [
        'Keep `WHERE status = \'paid\'` before `GROUP BY region`.',
        'Add `HAVING SUM(amount) >= 500` right after `GROUP BY region`.',
        'Sort `ORDER BY total_revenue DESC`.',
      ],
      referenceSolution: `SELECT region, COUNT(*) AS order_count, SUM(amount) AS total_revenue
FROM orders
WHERE status = 'paid'
GROUP BY region
HAVING SUM(amount) >= 500
ORDER BY total_revenue DESC;`,
      sqlTables: {
        orders: [
          { id: 1, region: 'NA', status: 'paid', amount: 400 },
          { id: 2, region: 'NA', status: 'paid', amount: 350 },
          { id: 3, region: 'EU', status: 'paid', amount: 520 },
          { id: 4, region: 'APAC', status: 'paid', amount: 180 },
          { id: 5, region: 'APAC', status: 'refunded', amount: 900 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `SELECT region, COUNT(*) AS order_count, SUM(amount) AS total_revenue
FROM orders
WHERE status = 'paid'
GROUP BY region
ORDER BY total_revenue DESC;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Drops APAC ($180) via HAVING threshold',
          expression: 'rows.length === 2 && !rows.some((r) => r.region === "APAC")',
          expectedDescription: 'Returns only NA and EU >= $500',
        },
        {
          id: 't2',
          label: 'Computes NA ($750) and EU ($520) totals accurately',
          expression: 'rows[0]?.region === "NA" && rows[0]?.total_revenue === 750 && rows[1]?.total_revenue === 520',
          expectedDescription: 'NA ($750) first, EU ($520) second',
        },
      ],
    },

    {
      id: 'sql-m11',
      number: '11',
      title: 'CTEs (WITH) & Partitioned Window Rankings',
      durationMinutes: 45,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'sandbox',
      runtime: 'sql',
      lessonSummary:
        'Real warehouse pipelines read like clean chapters using CTEs (`WITH paid_totals AS (...)`) and rank leaders *within each region* without collapsing rows using `ROW_NUMBER() OVER (PARTITION BY ...)`!',
      keyConcepts: [
        'Breaking multi-step logic into readable Common Table Expressions (`WITH`)',
        'Why Window Functions (`ROW_NUMBER() OVER`) keep individual rows intact unlike `GROUP BY`',
        'Resetting rankings per region via `PARTITION BY region ORDER BY ltv DESC`',
      ],
      architectureNote:
        'Joining a pre-aggregated CTE (`paid_totals`) to `accounts` and ranking with `ROW_NUMBER()` lets executives view every customer’s LTV AND regional rank side by side.',
      deliverableTitle: 'Build a CTE + ROW_NUMBER() regional LTV leaderboard',
      deliverablePrompt:
        'Create a CTE `paid_totals` summing `paid = 1` invoice amounts per `customer_id`, join `accounts AS a`, and rank accounts descending by `ltv` via `ROW_NUMBER() OVER (PARTITION BY a.region ORDER BY p.ltv DESC) AS regional_rank`.',
      acceptanceCriteria: [
        'Computes paid-only customer LTV cleanly in CTE',
        'Excludes unpaid invoice ($900) from Harbor Bio LTV',
        'Ranks NA and EU accounts independently starting at 1',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 11 of 12 · CTE + Window Leaderboard',
        diagram: {
          type: 'capstone-assembly',
          title: 'Two-Step CTE & Partitioned Window Pipeline',
          caption: 'First aggregate paid LTV inside WITH paid_totals; then join accounts and rank per region.',
          nodes: ['WITH paid_totals', 'JOIN accounts', 'ROW_NUMBER() OVER'],
        },
        sections: [
          {
            heading: 'Readable Multi-Step Queries with WITH',
            explanation:
              'A Common Table Expression (`WITH paid_totals AS (...)`) lets you build a named temporary result table first, then query and join it cleanly below—eliminating messy nested subqueries.',
            codeLanguage: 'sql',
            codeSnippet: 'WITH paid_totals AS (\n  SELECT customer_id, SUM(amount) AS ltv\n  FROM invoices WHERE paid = 1\n  GROUP BY customer_id\n)\nSELECT a.company, a.region, p.ltv\nFROM accounts AS a\nINNER JOIN paid_totals AS p ON a.id = p.customer_id;',
          },
          {
            heading: 'Ranking Per Region with ROW_NUMBER()',
            explanation:
              'Adding `ROW_NUMBER() OVER (PARTITION BY a.region ORDER BY p.ltv DESC) AS regional_rank` numbers rows `1, 2...` separately inside `NA` and `EU`.',
          },
        ],
        liveExample: {
          title: 'Live Example: Step 1 Paid LTV CTE',
          description: 'Inspect how `paid_totals` drops unpaid invoices before joining.',
          code: 'WITH paid_totals AS (\n  SELECT customer_id, SUM(amount) AS ltv\n  FROM invoices\n  WHERE paid = 1\n  GROUP BY customer_id\n)\nSELECT a.company, a.region, p.ltv\nFROM accounts AS a\nINNER JOIN paid_totals AS p ON a.id = p.customer_id\nORDER BY p.ltv DESC;',
          expectedOutput: 'Northstar ($750), Harbor ($500), Beacon ($420).',
        },
        commonMistake: {
          title: 'Omitting `PARTITION BY` in Regional Leaderboards',
          wrongWay: 'ROW_NUMBER() OVER (ORDER BY p.ltv DESC)  -- Gives 1 global list instead of per-region!',
          rightWay: 'ROW_NUMBER() OVER (PARTITION BY a.region ORDER BY p.ltv DESC)',
          whyItHappens:
            'Without `PARTITION BY a.region`, row numbers never reset to `1` for each region.',
        },
        tryItMission:
          'Complete the CTE + `INNER JOIN` + `ROW_NUMBER() OVER (PARTITION BY a.region ORDER BY p.ltv DESC) AS regional_rank` query.',
      },
      knowledgeCheck: {
        question: 'How does `ROW_NUMBER() OVER (PARTITION BY region ...)` differ from `GROUP BY region`?',
        options: [
          'It keeps every individual row visible while computing a rank inside each region',
          'It deletes duplicate rows permanently',
          'It skips unpaid rows automatically without WHERE',
        ],
        correctIndex: 0,
        explanation: 'Window functions keep row granularity intact instead of collapsing buckets into one row per group.',
      },
      hints: [
        'Write `WITH paid_totals AS (SELECT customer_id, SUM(amount) AS ltv FROM invoices WHERE paid = 1 GROUP BY customer_id)`.',
        'Join `accounts AS a INNER JOIN paid_totals AS p ON a.id = p.customer_id`.',
        'Add `ROW_NUMBER() OVER (PARTITION BY a.region ORDER BY p.ltv DESC) AS regional_rank` and sort `ORDER BY a.region ASC, regional_rank ASC`.',
      ],
      referenceSolution: `WITH paid_totals AS (
  SELECT customer_id, SUM(amount) AS ltv
  FROM invoices
  WHERE paid = 1
  GROUP BY customer_id
)
SELECT a.company, a.region, p.ltv,
  ROW_NUMBER() OVER (PARTITION BY a.region ORDER BY p.ltv DESC) AS regional_rank
FROM accounts AS a
INNER JOIN paid_totals AS p ON a.id = p.customer_id
ORDER BY a.region ASC, regional_rank ASC;`,
      sqlTables: {
        accounts: [
          { id: 'A1', company: 'Northstar Ops', region: 'NA' },
          { id: 'A2', company: 'Harbor Bio', region: 'NA' },
          { id: 'A3', company: 'Beacon EU', region: 'EU' },
        ],
        invoices: [
          { inv_id: 1, customer_id: 'A1', paid: 1, amount: 300 },
          { inv_id: 2, customer_id: 'A1', paid: 1, amount: 450 },
          { inv_id: 3, customer_id: 'A2', paid: 1, amount: 500 },
          { inv_id: 4, customer_id: 'A2', paid: 0, amount: 900 },
          { inv_id: 5, customer_id: 'A3', paid: 1, amount: 420 },
        ],
      },
      workspaceFiles: [
        { filename: 'query.sql', language: 'sql', readOnly: false, content: 'Editable SQL query' },
      ],
      starterCode: `-- TODO: Add WITH paid_totals CTE and ROW_NUMBER() OVER (PARTITION BY a.region ORDER BY p.ltv DESC)
SELECT a.company, a.region
FROM accounts AS a;`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes paid-only LTV inside CTE excluding unpaid $900',
          expression:
            'rows.some((r) => r.company === "Northstar Ops" && r.ltv === 750) && rows.some((r) => r.company === "Harbor Bio" && r.ltv === 500)',
          expectedDescription: 'Northstar LTV = 750 and Harbor LTV = 500',
        },
        {
          id: 't2',
          label: 'Resets regional_rank = 1 per region',
          expression:
            'rows.some((r) => r.region === "EU" && r.regional_rank === 1) && rows.some((r) => r.company === "Northstar Ops" && r.regional_rank === 1) && rows.some((r) => r.company === "Harbor Bio" && r.regional_rank === 2)',
          expectedDescription: 'NA ranks Northstar #1, Harbor #2; EU ranks Beacon #1',
        },
      ],
    },

    {
      id: 'sql-m12',
      number: '12',
      title: 'Capstone: SaaS Revenue & Retention Warehouse',
      durationMinutes: 50,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'rubric',
      lessonSummary:
        'Connect every SQL building block from Lessons 01–11—explicit projections, `NULL` hygiene, `INNER` vs `LEFT JOIN`, `WHERE` vs `HAVING`, and CTE + `ROW_NUMBER()` windows—into your Warehouse Design Brief.',
      keyConcepts: [
        'Schema normalization across customers, orders, and invoices',
        'Choosing LEFT JOIN vs INNER JOIN for churn vs paid analytics',
        'Preventing double-counting and SQL nuance regressions via CTEs',
      ],
      architectureNote:
        'Strong data engineers verify grain and join semantics first so executive numbers never silently under-report churn or double-count invoices.',
      deliverableTitle: 'Submit SQL Revenue Warehouse Architecture Brief',
      deliverablePrompt:
        'Document your complete SaaS Warehouse design covering: (1) Why explicit columns, `IS NOT NULL`, and `LEFT JOIN` protect churn audits, (2) How `WHERE` vs `HAVING` prevents refunded inflation, and (3) How CTEs + `ROW_NUMBER() OVER (PARTITION BY ...)` eliminate fan-out double-counting.',
      acceptanceCriteria: [
        'Explains LEFT JOIN and IS NOT NULL retention hygiene cleanly',
        'Distinguishes pre-aggregation WHERE from post-aggregation HAVING',
        'Details CTE isolation and ROW_NUMBER() window partitioning',
        'Scores >= 80 / 100 on the Mentor Rubric to unlock your SQL Certificate',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 12 of 12 · Complete Warehouse Capstone',
        diagram: {
          type: 'capstone-assembly',
          title: 'SaaS Revenue Warehouse Architecture',
          caption: 'Clean columns, NULL checks, LEFT JOIN audits, HAVING filters, and partitioned windows unite cleanly.',
          nodes: ['IS NOT NULL + LEFT JOIN', 'WHERE vs HAVING', 'CTE + ROW_NUMBER()'],
        },
        sections: [
          {
            heading: 'Look Back Across All 11 Queries',
            explanation:
              'You progressed from your first `SELECT name, plan` query all the way to `LEFT JOIN` churn audits, `HAVING` thresholds, CTE customer LTV pipelines, and `ROW_NUMBER()` regional leaderboards.',
          },
        ],
        liveExample: {
          title: 'Live Example: Warehouse Brief Outline',
          description: 'Address all three architectural rubric sections clearly.',
          code: '1. Relational Hygiene: Explicit columns prevent schema drift; IS NOT NULL protects missing fields; LEFT JOIN preserves zero-order accounts.\n2. Aggregation Order: WHERE removes refunded rows BEFORE GROUP BY sums buckets, while HAVING drops small regional totals afterward.\n3. CTEs & Windows: Pre-aggregating invoice LTV inside a WITH CTE prevents join fan-out, and ROW_NUMBER() OVER (PARTITION BY region) ranks accounts per region.',
          expectedOutput: 'Verified >= 80/100 Capstone Rubric Score',
        },
        commonMistake: {
          title: 'Confusing WHERE and HAVING or Ignoring Join Fan-Out',
          wrongWay: '"We join all tables directly and use WHERE for everything."',
          rightWay: '"We use WHERE before GROUP BY, HAVING after, and pre-aggregate inside a CTE before joining to avoid double-counting."',
          whyItHappens:
            'Joining two one-to-many tables before summing multiplies revenue totals silently unless pre-aggregated in a CTE.',
        },
        tryItMission:
          'Write your >= 65-word SQL Warehouse Capstone Brief and click Verify & Mint Certificate.',
      },
      knowledgeCheck: {
        question: 'Why do analysts pre-aggregate metrics inside a `WITH` CTE before joining to another multi-row table?',
        options: [
          'To prevent one-to-many join fan-out from double-counting sums',
          'Because SQL forbids joining more than 1 table otherwise',
          'To delete NULL records automatically',
        ],
        correctIndex: 0,
        explanation: 'Aggregating to 1 row per customer inside a CTE avoids multiplicative row inflation on joins.',
      },
      hints: [
        'Mention `LEFT JOIN` and `NULL` / `IS NOT NULL` in Criterion 1.',
        'Mention `WHERE` before `GROUP BY` and `HAVING` after in Criterion 2.',
        'Mention `CTE` / `WITH` and `ROW_NUMBER()` / `PARTITION BY` in Criterion 3.',
      ],
      referenceSolution: `1. Schema Hygiene & Churn Visibility: We query explicit columns instead of SELECT *, enforce IS NOT NULL checks on region fields, and rely on LEFT JOIN rather than INNER JOIN whenever auditing unpaid or zero-order customers so silent churn accounts never vanish.
2. Aggregation Discipline: WHERE removes refunded invoices before GROUP BY buckets regional sums, whereas HAVING filters summarized regional totals afterward without distorting raw averages.
3. CTEs & Partitioned Windows: Pre-aggregating paid invoice LTV inside a WITH CTE prevents many-to-many join fan-out double-counting, while ROW_NUMBER() OVER (PARTITION BY region ORDER BY ltv DESC) ranks regional leaders cleanly without collapsing row detail.`,
      rubricCriteria: [
        {
          id: 'r1',
          criterion: 'LEFT JOIN Retention & NULL Safety',
          weight: 35,
          targetDescription:
            'Explains preserving unmatched zero-order accounts via LEFT JOIN and testing missing cells via IS NOT NULL.',
          requiredKeywordHints: ['left join', 'null'],
          minWordCount: 15,
        },
        {
          id: 'r2',
          criterion: 'WHERE vs HAVING Aggregation Order',
          weight: 35,
          targetDescription:
            'Contrasts filtering raw rows via WHERE before GROUP BY vs filtering buckets via HAVING afterward.',
          requiredKeywordHints: ['where', 'group by', 'having'],
          minWordCount: 15,
        },
        {
          id: 'r3',
          criterion: 'CTE Isolation & Window Partitioning',
          weight: 30,
          targetDescription:
            'Covers WITH CTE pre-aggregation and ROW_NUMBER() PARTITION BY ranking.',
          requiredKeywordHints: ['cte', 'row_number', 'partition'],
          minWordCount: 15,
        },
      ],
    },
  ],
};
