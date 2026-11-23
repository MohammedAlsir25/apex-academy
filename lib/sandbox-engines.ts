export interface SandboxTestCase {
  id: string;
  label: string;
  expression: string;
  expectedDescription: string;
}

export interface SandboxTestResult {
  id: string;
  label: string;
  expectedDescription: string;
  passed: boolean;
  error?: string;
}

export interface SqlTableRow {
  [column: string]: string | number | boolean | null;
}

export interface SqlExecutionOutput {
  columns: string[];
  rows: SqlTableRow[];
  logs: string[];
  results: SandboxTestResult[];
  error?: string;
}

export interface PythonExecutionOutput {
  logs: string[];
  results: SandboxTestResult[];
  runtimeMode: 'pyodide' | 'local-python';
  error?: string;
}

export interface PromptFixture {
  id: string;
  label: string;
  variables: Record<string, string>;
}

export interface PromptExecutionOutput {
  renderedPrompts: Array<{ label: string; system: string; user: string; simulatedOutput: string }>;
  estimatedTokens: number;
  logs: string[];
  results: SandboxTestResult[];
  error?: string;
}

// ============================================================================
// 1. JAVASCRIPT SANDBOX RUNNER
// ============================================================================

export function runJsSandbox(
  codeDraft: string,
  tests: SandboxTestCase[]
): { logs: string[]; results: SandboxTestResult[] } {
  let capturedLogs: string[] = [];

  const results: SandboxTestResult[] = tests.map((t, idx) => {
    const localLogs: string[] = [];
    const customConsole = {
      log: (...args: unknown[]) => {
        localLogs.push(
          args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
        );
      },
      info: (...args: unknown[]) => {
        localLogs.push(
          args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
        );
      },
      warn: (...args: unknown[]) => {
        localLogs.push(
          `[warn] ${args
            .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
            .join(' ')}`
        );
      },
    };
    try {
      const runner = new Function(
        'console',
        '__localLogs',
        `"use strict";\nconst logs = __localLogs;\n${codeDraft}\nreturn Boolean(${t.expression});`
      );
      const passed = Boolean(runner(customConsole, localLogs));
      if (idx === 0) capturedLogs = localLogs;
      return {
        id: t.id,
        label: t.label,
        expectedDescription: t.expectedDescription,
        passed,
      };
    } catch (err) {
      if (idx === 0) capturedLogs = localLogs;
      return {
        id: t.id,
        label: t.label,
        expectedDescription: t.expectedDescription,
        passed: false,
        error: err instanceof Error ? err.message : 'Execution error',
      };
    }
  });

  if (tests.length === 0) {
    const customConsole = {
      log: (...args: unknown[]) =>
        capturedLogs.push(
          args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
        ),
      info: (...args: unknown[]) =>
        capturedLogs.push(
          args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
        ),
      warn: (...args: unknown[]) =>
        capturedLogs.push(
          `[warn] ${args
            .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
            .join(' ')}`
        ),
    };
    try {
      const fn = new Function('console', `"use strict";\n${codeDraft}`);
      fn(customConsole);
    } catch {
      // ignore empty run errors
    }
  }

  return { logs: capturedLogs.slice(0, 15), results };
}

// ============================================================================
// 2. PYTHON RUNTIME (Pyodide WASM on-demand + Offline-Safe Python Interpreter)
// ============================================================================

interface PyodideInstance {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (msg: string) => void }) => void;
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInstance>;
  }
}

let cachedPyodidePromise: Promise<PyodideInstance> | null = null;

async function getPyodideInstance(): Promise<PyodideInstance | null> {
  if (typeof window === 'undefined') return null;
  if (cachedPyodidePromise) {
    try {
      return await cachedPyodidePromise;
    } catch {
      cachedPyodidePromise = null;
      return null;
    }
  }

  cachedPyodidePromise = new Promise<PyodideInstance>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error('Pyodide initialization timed out'));
    }, 6500);

    const boot = async () => {
      try {
        if (!window.loadPyodide) {
          await new Promise<void>((res, rej) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js';
            script.async = true;
            script.onload = () => res();
            script.onerror = () => rej(new Error('CDN unavailable'));
            document.head.appendChild(script);
          });
        }
        if (!window.loadPyodide) {
          throw new Error('Pyodide loader missing');
        }
        const py = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/',
        });
        window.clearTimeout(timeoutId);
        resolve(py);
      } catch (err) {
        window.clearTimeout(timeoutId);
        reject(err);
      }
    };
    void boot();
  });

  try {
    return await cachedPyodidePromise;
  } catch {
    cachedPyodidePromise = null;
    return null;
  }
}

function transpilePythonSubsetToJs(pythonSource: string, includePrelude = true): string {
  // Deterministic indentation-based Python-to-JS transpiler for offline/hermetic fallback.
  // Supports def, if/elif/else, for..in, while, return, print, math/len/sum/round/sorted/min/max/zip/enumerate,
  // list comprehensions, ternaries, dict/list literals, f-strings, booleans, None, and common Python methods.
  const lines = pythonSource.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = includePrelude
    ? [
        `const __py = {`,
        `  len: (x) => Array.isArray(x) || typeof x === 'string' ? x.length : (x && typeof x === 'object' ? Object.keys(x).length : 0),`,
        `  sum: (arr, init = 0) => arr.reduce((a, b) => a + b, init),`,
        `  min: (...args) => args.length === 1 && Array.isArray(args[0]) ? Math.min(...args[0]) : Math.min(...args),`,
        `  max: (...args) => args.length === 1 && Array.isArray(args[0]) ? Math.max(...args[0]) : Math.max(...args),`,
        `  abs: Math.abs,`,
        `  round: (n, d = 0) => { const f = Math.pow(10, d); return Math.round(n * f) / f; },`,
        `  int: (v) => parseInt(v, 10),`,
        `  float: (v) => parseFloat(v),`,
        `  str: (v) => String(v),`,
        `  bool: Boolean,`,
        `  range: (a, b, step = 1) => { const start = b === undefined ? 0 : a; const end = b === undefined ? a : b; const r = []; for (let i = start; step > 0 ? i < end : i > end; i += step) r.push(i); return r; },`,
        `  enumerate: (arr) => arr.map((v, i) => [i, v]),`,
        `  zip: (a, b) => a.map((v, i) => [v, b[i]]),`,
        `  sorted: (arr, reverse = false) => { const c = [...arr].sort((x, y) => (x < y ? -1 : x > y ? 1 : 0)); return reverse ? c.reverse() : c; },`,
        `  list: (x) => Array.from(x),`,
        `  set: (x) => new Set(x),`,
        `  dict: (x) => Object.fromEntries(x),`,
        `  objItems: (x) => Object.entries(x),`,
        `  objKeys: (x) => Object.keys(x),`,
        `  objValues: (x) => Object.values(x),`,
        `  sqrt: Math.sqrt,`,
        `  exp: Math.exp,`,
        `  log: Math.log,`,
        `};`,
        `const len = __py.len, sum = __py.sum, min = __py.min, max = __py.max, abs = __py.abs, round = __py.round, int = __py.int, float = __py.float, str = __py.str, bool = __py.bool, range = __py.range, enumerate = __py.enumerate, zip = __py.zip, sorted = __py.sorted, list = __py.list;`,
        `const math = { sqrt: Math.sqrt, exp: Math.exp, log: Math.log, ceil: Math.ceil, floor: Math.floor, pow: Math.pow };`,
        `const logs = __logs;`,
        `const input = () => "Apex";`,
        `const print = (...args) => __logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));`,
      ]
    : [];

  const indentStack: number[] = [-1];
  const declaredVars = new Set<string>([
    'len',
    'sum',
    'min',
    'max',
    'abs',
    'round',
    'int',
    'float',
    'str',
    'bool',
    'range',
    'enumerate',
    'zip',
    'sorted',
    'list',
    'math',
    'print',
  ]);

  const replaceMethodCall = (src: string, method: string, build: (lhs: string, args: string[]) => string): string => {
    let text = src;
    const token = `.${method}(`;
    let guard = 0;
    let searchFrom = 0;
    while (guard < 20) {
      const idx = text.indexOf(token, searchFrom);
      if (idx === -1) break;
      guard++;
      let lStart = idx - 1;
      let pDepth = 0;
      let bDepth = 0;
      let lhsQuote: string | null = null;
      while (lStart >= 0) {
        const ch = text[lStart];
        if (lhsQuote) {
          if (ch === lhsQuote && text[lStart - 1] !== '\\') {
            lhsQuote = null;
            break;
          }
          lStart--;
          continue;
        }
        if (pDepth === 0 && bDepth === 0 && (ch === '"' || ch === "'") && lStart === idx - 1) {
          lhsQuote = ch;
          lStart--;
          continue;
        }
        if (ch === ')') pDepth++;
        else if (ch === '(') {
          if (pDepth === 0) break;
          pDepth--;
        } else if (ch === ']') bDepth++;
        else if (ch === '[') {
          if (bDepth === 0) break;
          bDepth--;
        } else if (pDepth === 0 && bDepth === 0 && !/[A-Za-z0-9_.]/.test(ch)) {
          break;
        }
        lStart--;
      }
      const lhsStart = lStart === idx - 1 ? idx : (text[lStart] === '"' || text[lStart] === "'" ? lStart : lStart + 1);
      const lhs = text.slice(lhsStart, idx);

      let rEnd = idx + token.length;
      let argDepth = 1;
      let inStr: string | null = null;
      while (rEnd < text.length && argDepth > 0) {
        const ch = text[rEnd];
        if ((ch === '"' || ch === "'") && text[rEnd - 1] !== '\\') {
          inStr = inStr === ch ? null : inStr ?? ch;
        } else if (!inStr) {
          if (ch === '(') argDepth++;
          else if (ch === ')') argDepth--;
        }
        rEnd++;
      }
      const argStr = text.slice(idx + token.length, rEnd - 1);
      const args: string[] = [];
      let cur = '';
      let subDepth = 0;
      inStr = null;
      for (let i = 0; i < argStr.length; i++) {
        const ch = argStr[i];
        if ((ch === '"' || ch === "'") && argStr[i - 1] !== '\\') {
          inStr = inStr === ch ? null : inStr ?? ch;
        } else if (!inStr) {
          if (ch === '(' || ch === '[' || ch === '{') subDepth++;
          else if (ch === ')' || ch === ']' || ch === '}') subDepth--;
          else if (ch === ',' && subDepth === 0) {
            if (cur.trim()) args.push(cur.trim());
            cur = '';
            continue;
          }
        }
        cur += ch;
      }
      if (cur.trim()) args.push(cur.trim());

      const replacement = build(lhs, args);
      text = text.slice(0, lhsStart) + replacement + text.slice(rEnd);
      searchFrom = lhsStart + replacement.length;
    }
    return text;
  };

  const convertExpr = (expr: string): string => {
    let e = expr.trim();
    e = e.replace(/f(["'])(.*?)\1/g, (_, _q, body: string) => {
      const tpl = body.replace(/\{([^}]+)\}/g, '${$1}');
      return '`' + tpl + '`';
    });
    e = e
      .replace(/\bis\s+not\s+None\b/g, '!== null')
      .replace(/\bis\s+None\b/g, '=== null')
      .replace(/\bis\s+not\s+True\b/g, '!== true')
      .replace(/\bis\s+True\b/g, '=== true')
      .replace(/\bis\s+not\s+False\b/g, '!== false')
      .replace(/\bis\s+False\b/g, '=== false');
    e = e.replace(
      /\[([^[\]]+?)\s+for\s+([A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)?)\s+in\s+((?:\[[^[\]]*\]|[^[\]])+?)(?:\s+if\s+([^[\]]+?))?\]/g,
      (_, mapExpr: string, varPart: string, iterExpr: string, filterExpr?: string) => {
        const cleanIter = iterExpr.trim();
        const param = varPart.includes(',') ? `[${varPart}]` : varPart;
        let cleanMap = mapExpr.trim().replace(
          /([A-Za-z0-9_.]+)\s+if\s+([^,)]+?)\s+else\s+([A-Za-z0-9_.]+)/g,
          '($2 ? ($1) : ($3))'
        );
        cleanMap = cleanMap.replace(/^(.+?)\s+if\s+(.+?)\s+else\s+(.+)$/, '($2 ? ($1) : ($3))');
        if (filterExpr) {
          return `${cleanIter}.filter((${param}) => ${filterExpr}).map((${param}) => ${cleanMap})`;
        }
        return `${cleanIter}.map((${param}) => ${cleanMap})`;
      }
    );
    e = e.replace(
      /\bsum\(\s*(?!\[)([^()]+?(?:\([^()]*\)[^()]*?)*)\s+for\s+([A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)?)\s+in\s+(.+?)\s*\)/g,
      (_, mapExpr: string, varPart: string, iterExpr: string) => {
        const param = varPart.includes(',') ? `[${varPart}]` : varPart;
        return `sum((${iterExpr.trim()}).map((${param}) => (${mapExpr.trim()})))`;
      }
    );
    // Python inline ternary: convert inner argument ternaries first, then full-expression ternaries
    e = e.replace(
      /([A-Za-z0-9_.]+)\s+if\s+([^,)]+?)\s+else\s+([A-Za-z0-9_.]+)/g,
      '($2 ? ($1) : ($3))'
    );
    e = e.replace(
      /^(.+?)\s+if\s+(.+?)\s+else\s+(.+)$/,
      '($2 ? ($1) : ($3))'
    );
    e = e
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null')
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\s+(?!in\b)/g, '!')
      .replace(/\.append\(/g, '.push(')
      .replace(/\.strip\(\)/g, '.trim()')
      .replace(/\.lower\(\)/g, '.toLowerCase()')
      .replace(/\.upper\(\)/g, '.toUpperCase()');

    e = replaceMethodCall(e, 'join', (lhs, args) => `((${args[0]}).join(${lhs}))`);
    e = replaceMethodCall(e, 'items', (lhs) => `__py.objItems(${lhs})`);
    e = replaceMethodCall(e, 'keys', (lhs) => `__py.objKeys(${lhs})`);
    e = replaceMethodCall(e, 'values', (lhs) => `__py.objValues(${lhs})`);
    e = replaceMethodCall(e, 'get', (lhs, args) =>
      args.length >= 2
        ? `((${lhs})[${args[0]}] ?? ${args[1]})`
        : `((${lhs})[${args[0]}] ?? null)`
    );

    // Balanced scanner for `<lhs> [not] in <rhs>` outside quotes
    const replaceMembership = (src: string): string => {
      let text = src;
      let guard = 0;
      while (guard < 16) {
        guard++;
        // Find `\s+(not\s+)?in\s+` outside string literals
        let matchIdx = -1;
        let matchLen = 0;
        let isNeg = false;
        let quote: string | null = null;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if ((ch === '"' || ch === "'") && text[i - 1] !== '\\') {
            quote = quote === ch ? null : quote ?? ch;
            continue;
          }
          if (quote) continue;
          const rest = text.slice(i);
          const m = rest.match(/^(\s+(not\s+)?in\s+)/);
          if (m) {
            matchIdx = i;
            matchLen = m[1].length;
            isNeg = Boolean(m[2]);
            break;
          }
        }
        if (matchIdx === -1) break;

        // Walk backward for balanced LHS atom
        let lStart = matchIdx - 1;
        let lDepth = 0;
        let lQuote: string | null = null;
        while (lStart >= 0) {
          const ch = text[lStart];
          if (lQuote) {
            if (ch === lQuote && text[lStart - 1] !== '\\') lQuote = null;
            lStart--;
            continue;
          }
          if (lDepth === 0 && (ch === '"' || ch === "'")) {
            lQuote = ch;
            lStart--;
            continue;
          }
          if (ch === ')' || ch === ']') lDepth++;
          else if (ch === '(' || ch === '[') {
            if (lDepth === 0) break;
            lDepth--;
          } else if (lDepth === 0 && !/[A-Za-z0-9_.[\]"']/.test(ch)) {
            break;
          }
          lStart--;
        }
        const lhsFrom = lStart + 1;
        const lhs = text.slice(lhsFrom, matchIdx).trim();

        // Walk forward for balanced RHS expression
        let rEnd = matchIdx + matchLen;
        let rDepth = 0;
        let rQuote: string | null = null;
        while (rEnd < text.length) {
          const ch = text[rEnd];
          if (rQuote) {
            if (ch === rQuote && text[rEnd - 1] !== '\\') rQuote = null;
            rEnd++;
            continue;
          }
          if (ch === '"' || ch === "'") {
            rQuote = ch;
            rEnd++;
            continue;
          }
          if (ch === '(' || ch === '[' || ch === '{') rDepth++;
          else if (ch === ')' || ch === ']' || ch === '}') {
            if (rDepth === 0) break;
            rDepth--;
          } else if (rDepth === 0 && /[\s,;?:]/.test(ch)) {
            break;
          }
          rEnd++;
        }
        const rhs = text.slice(matchIdx + matchLen, rEnd).trim();
        const check = `((${rhs}) && (Array.isArray(${rhs}) || typeof (${rhs}) === "string" ? (${rhs}).includes(${lhs}) : Object.prototype.hasOwnProperty.call((${rhs}), ${lhs})))`;
        const rep = isNeg ? `!${check}` : check;
        text = text.slice(0, lhsFrom) + rep + text.slice(rEnd);
      }
      return text;
    };

    e = replaceMembership(e);
    e = e.replace(/([A-Za-z0-9_.()]+)\s*\/\/\s*([A-Za-z0-9_.()]+)/g, 'Math.floor(($1) / ($2))');
    return e;
  };

  // Join multiline bracketed expressions (lists, dicts, multiline calls) before indentation parsing
  const logicalLines: string[] = [];
  let bracketBuffer = '';
  let netBrackets = 0;
  for (const rawLine of lines) {
    const commentStripped = rawLine.replace(/#.*$/, '');
    if (!commentStripped.trim() && netBrackets === 0) continue;
    if (/^\s*(import|from)\s+/.test(commentStripped) && netBrackets === 0) continue;

    let inStr: string | null = null;
    for (let i = 0; i < commentStripped.length; i++) {
      const ch = commentStripped[i];
      if ((ch === '"' || ch === "'") && commentStripped[i - 1] !== '\\') {
        inStr = inStr === ch ? null : inStr ?? ch;
      } else if (!inStr) {
        if (ch === '(' || ch === '[' || ch === '{') netBrackets++;
        else if (ch === ')' || ch === ']' || ch === '}') netBrackets = Math.max(0, netBrackets - 1);
      }
    }

    if (bracketBuffer) {
      bracketBuffer += ' ' + commentStripped.trim();
    } else {
      bracketBuffer = commentStripped;
    }

    if (netBrackets === 0) {
      logicalLines.push(bracketBuffer);
      bracketBuffer = '';
    }
  }
  if (bracketBuffer.trim()) logicalLines.push(bracketBuffer);

  for (const commentStripped of logicalLines) {

    const indent = commentStripped.match(/^(\s*)/)?.[1].length ?? 0;
    const trimmed = commentStripped.trim();

    while (indent <= indentStack[indentStack.length - 1]) {
      indentStack.pop();
      out.push('}');
    }

    if (trimmed.startsWith('def ')) {
      const m = trimmed.match(/^def\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*:/);
      if (m) {
        const fnName = m[1];
        const params = m[2]
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean)
          .map((p) => {
            const cleaned = p.replace(/:\s*[^=]+/, '');
            return convertExpr(cleaned);
          })
          .join(', ');
        declaredVars.add(fnName);
        out.push(`function ${fnName}(${params}) {`);
        indentStack.push(indent);
        continue;
      }
    }

    if (trimmed.startsWith('if ') && trimmed.endsWith(':')) {
      out.push(`if (${convertExpr(trimmed.slice(3, -1))}) {`);
      indentStack.push(indent);
      continue;
    }

    if (trimmed.startsWith('elif ') && trimmed.endsWith(':')) {
      out.push(`else if (${convertExpr(trimmed.slice(5, -1))}) {`);
      indentStack.push(indent);
      continue;
    }

    if (trimmed === 'else:') {
      out.push('else {');
      indentStack.push(indent);
      continue;
    }

    if (trimmed.startsWith('for ') && trimmed.endsWith(':')) {
      const m = trimmed.match(/^for\s+(.+?)\s+in\s+(.+):$/);
      if (m) {
        const lhs = m[1].includes(',') ? `[${m[1]}]` : m[1].trim();
        out.push(`for (const ${lhs} of ${convertExpr(m[2])}) {`);
        indentStack.push(indent);
        continue;
      }
    }

    if (trimmed.startsWith('while ') && trimmed.endsWith(':')) {
      out.push(`while (${convertExpr(trimmed.slice(6, -1))}) {`);
      indentStack.push(indent);
      continue;
    }

    if (trimmed.startsWith('return ')) {
      out.push(`return ${convertExpr(trimmed.slice(7))};`);
      continue;
    }
    if (trimmed === 'return') {
      out.push('return null;');
      continue;
    }

    const augMatch = trimmed.match(/^([A-Za-z_]\w*)\s*(\+=|-=|\*=|\/=)\s*(.+)$/);
    if (augMatch) {
      out.push(`${augMatch[1]} ${augMatch[2]} ${convertExpr(augMatch[3])};`);
      continue;
    }

    // Tuple unpacking: `a, b = expr1, expr2` or `a, b = pair`
    const tupleAssign = trimmed.match(/^([A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)+)\s*=\s*(.+)$/);
    if (tupleAssign && !trimmed.includes('==')) {
      const vars = tupleAssign[1].split(',').map((v) => v.trim());
      const rhsRaw = tupleAssign[2].trim();
      const rhsParts: string[] = [];
      let cur = '';
      let depth = 0;
      let inQ: string | null = null;
      for (let i = 0; i < rhsRaw.length; i++) {
        const ch = rhsRaw[i];
        if ((ch === '"' || ch === "'") && rhsRaw[i - 1] !== '\\') {
          inQ = inQ === ch ? null : inQ ?? ch;
        } else if (!inQ) {
          if (ch === '(' || ch === '[' || ch === '{') depth++;
          else if (ch === ')' || ch === ']' || ch === '}') depth = Math.max(0, depth - 1);
          else if (ch === ',' && depth === 0) {
            rhsParts.push(cur.trim());
            cur = '';
            continue;
          }
        }
        cur += ch;
      }
      if (cur.trim()) rhsParts.push(cur.trim());
      const rhsJs =
        rhsParts.length > 1
          ? `[${rhsParts.map((p) => convertExpr(p)).join(', ')}]`
          : convertExpr(rhsRaw);
      const undeclared = vars.filter((v) => !declaredVars.has(v));
      vars.forEach((v) => declaredVars.add(v));
      if (undeclared.length > 0 && undeclared.length < vars.length) {
        out.push(`var ${undeclared.join(', ')};`);
        out.push(`[${vars.join(', ')}] = ${rhsJs};`);
      } else {
        out.push(`${undeclared.length > 0 ? 'var ' : ''}[${vars.join(', ')}] = ${rhsJs};`);
      }
      continue;
    }

    const assignMatch = trimmed.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch && !trimmed.includes('==')) {
      const varName = assignMatch[1];
      const rhs = convertExpr(assignMatch[2]);
      if (!declaredVars.has(varName)) {
        declaredVars.add(varName);
        out.push(`var ${varName} = ${rhs};`);
      } else {
        out.push(`${varName} = ${rhs};`);
      }
      continue;
    }

    out.push(`${convertExpr(trimmed)};`);
  }

  while (indentStack.length > 1) {
    indentStack.pop();
    out.push('}');
  }

  return out.join('\n');
}

export async function runPythonSandbox(
  codeDraft: string,
  tests: SandboxTestCase[]
): Promise<PythonExecutionOutput> {
  const pyodide = await getPyodideInstance();

  if (pyodide) {
    const logs: string[] = [];
    pyodide.setStdout({
      batched: (msg: string) => {
        if (msg.trim()) {
          for (const line of msg.split('\n')) {
            if (line.trim()) logs.push(line);
          }
        }
      },
    });

    try {
      await pyodide.runPythonAsync(
        `import sys, io\n_apex_buf = io.StringIO()\n_apex_old_out = sys.stdout\nsys.stdout = _apex_buf\nlogs = []\ntry:\n    exec(${JSON.stringify(codeDraft)}, globals())\nfinally:\n    sys.stdout = _apex_old_out\nlogs = [ln for ln in _apex_buf.getvalue().splitlines() if ln.strip()]\n`
      );
      const capturedText = String(await pyodide.runPythonAsync(`"\\n".join(logs)`));
      for (const ln of capturedText.split('\n')) {
        if (ln.trim()) logs.push(ln);
      }

      const results: SandboxTestResult[] = [];
      for (const t of tests) {
        try {
          const ok = await pyodide.runPythonAsync(`bool(${t.expression})`);
          results.push({
            id: t.id,
            label: t.label,
            expectedDescription: t.expectedDescription,
            passed: Boolean(ok),
          });
        } catch (err) {
          results.push({
            id: t.id,
            label: t.label,
            expectedDescription: t.expectedDescription,
            passed: false,
            error: err instanceof Error ? err.message : 'Python test assertion failed',
          });
        }
      }
      return { logs: logs.slice(0, 15), results, runtimeMode: 'pyodide' };
    } catch (err) {
      return {
        logs: logs.slice(0, 15),
        results: tests.map((t) => ({
          id: t.id,
          label: t.label,
          expectedDescription: t.expectedDescription,
          passed: false,
          error: 'Fix syntax/runtime error above',
        })),
        runtimeMode: 'pyodide',
        error: err instanceof Error ? err.message : 'Python syntax/runtime error',
      };
    }
  }

  // Fallback: Offline-safe in-browser Python evaluator
  let capturedFirstLogs: string[] = [];
  try {
    const jsBody = transpilePythonSubsetToJs(codeDraft);
    if (tests.length === 0) {
      const runLogs: string[] = [];
      const fn = new Function('__logs', jsBody);
      fn(runLogs);
      return { logs: runLogs.slice(0, 15), results: [], runtimeMode: 'local-python' };
    }
    const results: SandboxTestResult[] = tests.map((t, idx) => {
      const runLogs: string[] = [];
      try {
        const testExprJs = transpilePythonSubsetToJs(`return bool(${t.expression})`, false);
        const fn = new Function('__logs', `${jsBody}\n${testExprJs}`);
        const passed = Boolean(fn(runLogs));
        if (idx === 0) capturedFirstLogs = runLogs;
        return {
          id: t.id,
          label: t.label,
          expectedDescription: t.expectedDescription,
          passed,
        };
      } catch (err) {
        if (idx === 0) capturedFirstLogs = runLogs;
        return {
          id: t.id,
          label: t.label,
          expectedDescription: t.expectedDescription,
          passed: false,
          error: err instanceof Error ? err.message : 'Python evaluation error',
        };
      }
    });
    return { logs: capturedFirstLogs.slice(0, 15), results, runtimeMode: 'local-python' };
  } catch (err) {
    return {
      logs: capturedFirstLogs.slice(0, 15),
      results: tests.map((t) => ({
        id: t.id,
        label: t.label,
        expectedDescription: t.expectedDescription,
        passed: false,
        error: err instanceof Error ? err.message : 'Python syntax error',
      })),
      runtimeMode: 'local-python',
      error: err instanceof Error ? err.message : 'Python syntax error',
    };
  }
}

// ============================================================================
// 3. IN-BROWSER RELATIONAL SQL ENGINE
// ============================================================================

function splitSqlCommaTopLevel(input: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let inSingleQuote = false;
  let buf = '';
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "'" && input[i - 1] !== '\\') {
      inSingleQuote = !inSingleQuote;
      buf += ch;
      continue;
    }
    if (!inSingleQuote) {
      if (ch === '(') depth++;
      else if (ch === ')') depth = Math.max(0, depth - 1);
      else if (ch === ',' && depth === 0) {
        parts.push(buf.trim());
        buf = '';
        continue;
      }
    }
    buf += ch;
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

function resolveColValue(row: SqlTableRow, token: string): string | number | boolean | null {
  const t = token.trim();
  if ((t.startsWith("'") && t.endsWith("'")) || (t.startsWith('"') && t.endsWith('"'))) {
    return t.slice(1, -1);
  }
  if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
  if (/^true$/i.test(t)) return true;
  if (/^false$/i.test(t)) return false;
  if (/^null$/i.test(t)) return null;
  if (t in row) return row[t];
  const dotIdx = t.indexOf('.');
  if (dotIdx !== -1) {
    const bare = t.slice(dotIdx + 1);
    if (bare in row) return row[bare];
  }
  return null;
}

function evalScalarExpr(row: SqlTableRow, expr: string): string | number | boolean | null {
  const trimmed = expr.trim();

  // CASE WHEN ... THEN ... ELSE ... END
  const caseMatch = trimmed.match(/^CASE\s+([\s\S]+?)\s+END$/i);
  if (caseMatch) {
    const body = caseMatch[1];
    const elseSplit = body.split(/\s+ELSE\s+/i);
    const whenPart = elseSplit[0];
    const elseExpr = elseSplit[1];
    const clauses = whenPart
      .replace(/^\s*WHEN\s+/i, '')
      .split(/\s+WHEN\s+/i)
      .filter(Boolean);
    for (const clause of clauses) {
      const [cond, thenVal] = clause.split(/\s+THEN\s+/i);
      if (cond && thenVal && evalWhereClause(row, cond)) {
        return evalScalarExpr(row, thenVal);
      }
    }
    return elseExpr ? evalScalarExpr(row, elseExpr) : null;
  }

  // ROUND(expr, digits)
  const roundMatch = trimmed.match(/^ROUND\s*\((.+),\s*(\d+)\s*\)$/i);
  if (roundMatch) {
    const val = Number(evalScalarExpr(row, roundMatch[1]) ?? 0);
    const digits = Number(roundMatch[2]);
    const factor = Math.pow(10, digits);
    return Math.round(val * factor) / factor;
  }

  // COALESCE(a, b)
  const coalesceMatch = trimmed.match(/^COALESCE\s*\((.+)\)$/i);
  if (coalesceMatch) {
    for (const arg of splitSqlCommaTopLevel(coalesceMatch[1])) {
      const v = evalScalarExpr(row, arg);
      if (v !== null && v !== undefined) return v;
    }
    return null;
  }

  // UPPER / LOWER
  const upperMatch = trimmed.match(/^UPPER\s*\((.+)\)$/i);
  if (upperMatch) return String(evalScalarExpr(row, upperMatch[1]) ?? '').toUpperCase();
  const lowerMatch = trimmed.match(/^LOWER\s*\((.+)\)$/i);
  if (lowerMatch) return String(evalScalarExpr(row, lowerMatch[1]) ?? '').toLowerCase();

  // Simple binary math (+, -, *, /) outside quotes
  const mathMatch = trimmed.match(/^(.+?)\s*([+\-*/])\s*(.+)$/);
  if (mathMatch && !trimmed.startsWith("'")) {
    const l = resolveColValue(row, mathMatch[1]);
    const r = resolveColValue(row, mathMatch[3]);
    if (typeof l === 'number' && typeof r === 'number') {
      if (mathMatch[2] === '+') return l + r;
      if (mathMatch[2] === '-') return l - r;
      if (mathMatch[2] === '*') return l * r;
      if (mathMatch[2] === '/') return r === 0 ? null : l / r;
    }
  }

  return resolveColValue(row, trimmed);
}

function evalSingleCondition(row: SqlTableRow, cond: string): boolean {
  const c = cond.trim().replace(/^\(([\s\S]*)\)$/, '$1').trim();

  const isNullMatch = c.match(/^(.+?)\s+IS\s+NULL$/i);
  if (isNullMatch) return resolveColValue(row, isNullMatch[1]) === null;

  const notNullMatch = c.match(/^(.+?)\s+IS\s+NOT\s+NULL$/i);
  if (notNullMatch) return resolveColValue(row, notNullMatch[1]) !== null;

  const inMatch = c.match(/^(.+?)\s+IN\s*\((.+)\)$/i);
  if (inMatch) {
    const lhs = resolveColValue(row, inMatch[1]);
    const list = splitSqlCommaTopLevel(inMatch[2]).map((x) => resolveColValue(row, x));
    return list.includes(lhs);
  }

  const likeMatch = c.match(/^(.+?)\s+LIKE\s+['"](.+)['"]$/i);
  if (likeMatch) {
    const lhs = String(resolveColValue(row, likeMatch[1]) ?? '').toLowerCase();
    const pattern = likeMatch[2].toLowerCase().replace(/%/g, '.*').replace(/_/g, '.');
    return new RegExp(`^${pattern}$`).test(lhs);
  }

  const compMatch = c.match(/^(.+?)\s*(!=|<>|<=|>=|=|<|>)\s*(.+)$/);
  if (compMatch) {
    const lhs = evalScalarExpr(row, compMatch[1]);
    const rhs = evalScalarExpr(row, compMatch[3]);
    const op = compMatch[2];
    if (lhs === null || rhs === null) return false;
    if (op === '=') return lhs === rhs;
    if (op === '!=' || op === '<>') return lhs !== rhs;
    if (op === '<') return Number(lhs) < Number(rhs);
    if (op === '<=') return Number(lhs) <= Number(rhs);
    if (op === '>') return Number(lhs) > Number(rhs);
    if (op === '>=') return Number(lhs) >= Number(rhs);
  }

  return false;
}

function evalWhereClause(row: SqlTableRow, whereStr: string): boolean {
  const orParts = whereStr.split(/\s+OR\s+/i);
  return orParts.some((orPart) => {
    const andParts = orPart.split(/\s+AND\s+/i);
    return andParts.every((cond) => evalSingleCondition(row, cond));
  });
}

function evalAggregate(groupRows: SqlTableRow[], aggExpr: string): number | string | null {
  const trimmed = aggExpr.trim();
  const fnMatch = trimmed.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\(([\s\S]+?)\)$/i);
  if (!fnMatch) return evalScalarExpr(groupRows[0] ?? {}, trimmed) as number | string | null;

  const fn = fnMatch[1].toUpperCase();
  const arg = fnMatch[2].trim();

  if (fn === 'COUNT') {
    if (arg === '*') return groupRows.length;
    const distinctMatch = arg.match(/^DISTINCT\s+(.+)$/i);
    if (distinctMatch) {
      const vals = groupRows
        .map((r) => evalScalarExpr(r, distinctMatch[1]))
        .filter((v) => v !== null && v !== undefined);
      return new Set(vals).size;
    }
    return groupRows.filter((r) => evalScalarExpr(r, arg) !== null).length;
  }

  const vals = groupRows
    .map((r) => evalScalarExpr(r, arg))
    .filter((v): v is number => typeof v === 'number');
  if (vals.length === 0) return null;

  if (fn === 'SUM') return Math.round(vals.reduce((a, b) => a + b, 0) * 1000) / 1000;
  if (fn === 'AVG') return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100;
  if (fn === 'MIN') return Math.min(...vals);
  if (fn === 'MAX') return Math.max(...vals);
  return null;
}

function evalCompoundAggExpr(groupRows: SqlTableRow[], rawExpr: string): number | string | null {
  const trimmed = rawExpr.trim();
  if (/^(COUNT|SUM|AVG|MIN|MAX)\s*\([^()]+\)$/i.test(trimmed)) {
    return evalAggregate(groupRows, trimmed);
  }
  const substituted = trimmed.replace(
    /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(([^()]+)\)/gi,
    (full) => {
      const val = evalAggregate(groupRows, full);
      return val === null ? '0' : String(val);
    }
  );
  if (/^[0-9+\-*/().\s]+$/.test(substituted)) {
    try {
      const result = Function(`"use strict"; return (${substituted});`)();
      if (typeof result === 'number' && Number.isFinite(result)) {
        return Math.round(result * 10000) / 10000;
      }
    } catch {
      return null;
    }
  }
  return evalAggregate(groupRows, trimmed);
}

function executeSingleSelect(
  tables: Record<string, SqlTableRow[]>,
  rawSql: string
): { columns: string[]; rows: SqlTableRow[] } {
  const sql = rawSql
    .replace(/--.*$/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/;$/, '');

  // Extract WITH CTEs if present
  const localTables: Record<string, SqlTableRow[]> = { ...tables };
  let mainQuery = sql;
  if (/^WITH\s+/i.test(sql)) {
    const cteSplit = sql.match(/^WITH\s+([A-Za-z_]\w*)\s+AS\s*\(([\s\S]+?)\)\s+(SELECT[\s\S]+)$/i);
    if (cteSplit) {
      const cteName = cteSplit[1].toLowerCase();
      const cteRes = executeSingleSelect(localTables, cteSplit[2]);
      localTables[cteName] = cteRes.rows;
      mainQuery = cteSplit[3];
    }
  }

  const selectMatch = mainQuery.match(
    /^SELECT\s+(DISTINCT\s+)?([\s\S]+?)\s+FROM\s+([A-Za-z_]\w*)(?:\s+(?:AS\s+)?([A-Za-z_]\w*))?(?:\s+((?:INNER\s+|LEFT\s+)?JOIN[\s\S]+?))?(?:\s+WHERE\s+([\s\S]+?))?(?:\s+GROUP\s+BY\s+([\s\S]+?))?(?:\s+HAVING\s+([\s\S]+?))?(?:\s+ORDER\s+BY\s+([\s\S]+?))?(?:\s+LIMIT\s+(\d+))?$/i
  );

  if (!selectMatch) {
    throw new Error('Write a valid SQL SELECT statement (check FROM, JOIN, WHERE, GROUP BY, or ORDER BY syntax).');
  }

  const isDistinct = Boolean(selectMatch[1]);
  const selectRaw = selectMatch[2].trim();
  const baseTableName = selectMatch[3].toLowerCase();
  const baseAlias = (selectMatch[4] ?? baseTableName).toLowerCase();
  const joinsRaw = selectMatch[5];
  const whereRaw = selectMatch[6];
  const groupByRaw = selectMatch[7];
  const havingRaw = selectMatch[8];
  const orderByRaw = selectMatch[9];
  const limitNum = selectMatch[10] ? Number(selectMatch[10]) : undefined;

  const lookupTable = (name: string): SqlTableRow[] => {
    const key = Object.keys(localTables).find((k) => k.toLowerCase() === name.toLowerCase());
    if (!key) throw new Error(`Unknown table "${name}"`);
    return localTables[key];
  };

  let workingRows: SqlTableRow[] = lookupTable(baseTableName).map((r) => {
    const prefixed: SqlTableRow = { ...r };
    for (const [k, v] of Object.entries(r)) {
      prefixed[`${baseAlias}.${k}`] = v;
    }
    return prefixed;
  });

  // Process JOINs
  if (joinsRaw) {
    const joinRegex =
      /(INNER\s+JOIN|LEFT\s+JOIN|JOIN)\s+([A-Za-z_]\w*)(?:\s+(?:AS\s+)?([A-Za-z_]\w*))?\s+ON\s+([A-Za-z0-9_.]+)\s*=\s*([A-Za-z0-9_.]+)/gi;
    let jm: RegExpExecArray | null;
    while ((jm = joinRegex.exec(joinsRaw)) !== null) {
      const isLeft = /^LEFT/i.test(jm[1]);
      const jTable = lookupTable(jm[2]);
      const jAlias = (jm[3] ?? jm[2]).toLowerCase();
      const leftKey = jm[4];
      const rightKey = jm[5];

      const nextRows: SqlTableRow[] = [];
      for (const lRow of workingRows) {
        const lVal = resolveColValue(lRow, leftKey) ?? resolveColValue(lRow, rightKey);
        let matched = false;
        for (const rRow of jTable) {
          const rPrefixed: SqlTableRow = {};
          for (const [k, v] of Object.entries(rRow)) {
            rPrefixed[`${jAlias}.${k}`] = v;
          }
          const rVal =
            resolveColValue({ ...rRow, ...rPrefixed }, rightKey) ??
            resolveColValue({ ...rRow, ...rPrefixed }, leftKey);
          if (lVal !== null && lVal === rVal) {
            matched = true;
            nextRows.push({ ...rRow, ...lRow, ...rPrefixed });
          }
        }
        if (isLeft && !matched) {
          nextRows.push({ ...lRow });
        }
      }
      workingRows = nextRows;
    }
  }

  // WHERE filter
  if (whereRaw) {
    workingRows = workingRows.filter((row) => evalWhereClause(row, whereRaw));
  }

  const selectItems =
    selectRaw === '*'
      ? Object.keys(workingRows[0] ?? {}).filter((k) => !k.includes('.'))
      : splitSqlCommaTopLevel(selectRaw);

  const hasAgg = selectItems.some((item) =>
    /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(item)
  );

  // Check for Window functions like ROW_NUMBER() OVER (...)
  const hasWindow = selectItems.some((item) => /\bOVER\s*\(/i.test(item));

  let projectedRows: SqlTableRow[] = [];
  let outputColumns: string[] = [];

  if (groupByRaw || hasAgg) {
    const groupCols = groupByRaw
      ? splitSqlCommaTopLevel(groupByRaw).map((c) => c.trim())
      : [];

    const groups = new Map<string, SqlTableRow[]>();
    if (groupCols.length === 0) {
      groups.set('__all__', workingRows);
    } else {
      for (const row of workingRows) {
        const key = JSON.stringify(groupCols.map((c) => resolveColValue(row, c)));
        const bucket = groups.get(key) ?? [];
        bucket.push(row);
        groups.set(key, bucket);
      }
    }

    for (const [, gRows] of groups) {
      if (gRows.length === 0 && groupCols.length > 0) continue;
      const outRow: SqlTableRow = {};
      const aggCache: Record<string, string | number | null> = {};

      for (const item of selectItems) {
        const aliasMatch = item.match(/^([\s\S]+?)\s+AS\s+([A-Za-z_]\w*)$/i);
        const expr = aliasMatch ? aliasMatch[1].trim() : item.trim();
        const colName = aliasMatch
          ? aliasMatch[2]
          : expr.includes('.')
            ? expr.split('.')[1]
            : expr;

        if (!outputColumns.includes(colName)) outputColumns.push(colName);

        // Evaluate expressions containing aggregates like ROUND(SUM(signups) * 100 / SUM(sessions), 1)
        const nestedRoundAgg = expr.match(/^ROUND\s*\((.+),\s*(\d+)\s*\)$/i);
        if (nestedRoundAgg && /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(nestedRoundAgg[1])) {
          const inner = Number(evalCompoundAggExpr(gRows, nestedRoundAgg[1]) ?? 0);
          const f = Math.pow(10, Number(nestedRoundAgg[2]));
          outRow[colName] = Math.round(inner * f) / f;
        } else if (/\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(expr)) {
          const val = evalCompoundAggExpr(gRows, expr);
          outRow[colName] = val;
          aggCache[expr] = val;
        } else {
          outRow[colName] = gRows[0] ? evalScalarExpr(gRows[0], expr) : null;
        }
      }

      if (havingRaw) {
        const fakeRow: SqlTableRow = { ...outRow };
        // Allow HAVING COUNT(*) > 1
        const havingMatch = havingRaw.match(/^([\s\S]+?)\s*(!=|<>|<=|>=|=|<|>)\s*(.+)$/);
        if (havingMatch) {
          const lhsExpr = havingMatch[1].trim();
          const lhsVal = /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(lhsExpr)
            ? evalAggregate(gRows, lhsExpr)
            : outRow[lhsExpr];
          const rhsVal = Number(havingMatch[3].trim());
          const op = havingMatch[2];
          const ok =
            op === '>'
              ? Number(lhsVal) > rhsVal
              : op === '>='
                ? Number(lhsVal) >= rhsVal
                : op === '<'
                  ? Number(lhsVal) < rhsVal
                  : op === '<='
                    ? Number(lhsVal) <= rhsVal
                    : op === '='
                      ? lhsVal === rhsVal
                      : lhsVal !== rhsVal;
          if (!ok) continue;
        } else if (!evalWhereClause(fakeRow, havingRaw)) {
          continue;
        }
      }

      projectedRows.push(outRow);
    }
  } else {
    // Non-aggregated projection (with optional window function)
    let windowPartitionSorted: Map<SqlTableRow, number> | null = null;
    if (hasWindow) {
      const winItem = selectItems.find((item) => /\bOVER\s*\(/i.test(item)) ?? '';
      const winMatch = winItem.match(
        /^(ROW_NUMBER|RANK)\(\)\s+OVER\s*\((?:PARTITION\s+BY\s+([A-Za-z0-9_.]+)\s*)?(?:ORDER\s+BY\s+([A-Za-z0-9_.]+)(?:\s+(ASC|DESC))?)?\)/i
      );
      if (winMatch) {
        const partCol = winMatch[2];
        const ordCol = winMatch[3];
        const desc = /^DESC$/i.test(winMatch[4] ?? 'ASC');
        const buckets = new Map<string, SqlTableRow[]>();
        for (const r of workingRows) {
          const k = partCol ? String(resolveColValue(r, partCol) ?? '') : '__all__';
          const arr = buckets.get(k) ?? [];
          arr.push(r);
          buckets.set(k, arr);
        }
        windowPartitionSorted = new Map();
        for (const [, arr] of buckets) {
          if (ordCol) {
            arr.sort((a, b) => {
              const av = resolveColValue(a, ordCol) ?? 0;
              const bv = resolveColValue(b, ordCol) ?? 0;
              const cmp = av < bv ? -1 : av > bv ? 1 : 0;
              return desc ? -cmp : cmp;
            });
          }
          arr.forEach((r, idx) => windowPartitionSorted!.set(r, idx + 1));
        }
      }
    }

    for (const row of workingRows) {
      const outRow: SqlTableRow = {};
      for (const item of selectItems) {
        const aliasMatch = item.match(/^([\s\S]+?)\s+AS\s+([A-Za-z_]\w*)$/i);
        const expr = aliasMatch ? aliasMatch[1].trim() : item.trim();
        const colName = aliasMatch
          ? aliasMatch[2]
          : expr.includes('.')
            ? expr.split('.')[1]
            : expr;
        if (!outputColumns.includes(colName)) outputColumns.push(colName);

        if (/\bOVER\s*\(/i.test(expr) && windowPartitionSorted) {
          outRow[colName] = windowPartitionSorted.get(row) ?? 1;
        } else {
          outRow[colName] = evalScalarExpr(row, expr);
        }
      }
      projectedRows.push(outRow);
    }
  }

  if (isDistinct) {
    const seen = new Set<string>();
    projectedRows = projectedRows.filter((r) => {
      const sig = JSON.stringify(r);
      if (seen.has(sig)) return false;
      seen.add(sig);
      return true;
    });
  }

  if (orderByRaw) {
    const ordParts = splitSqlCommaTopLevel(orderByRaw);
    projectedRows.sort((a, b) => {
      for (const part of ordParts) {
        const [colRaw, dir] = part.trim().split(/\s+/);
        const col = colRaw.includes('.') ? colRaw.split('.')[1] : colRaw;
        const av = a[col] ?? 0;
        const bv = b[col] ?? 0;
        if (av === bv) continue;
        const cmp = av < bv ? -1 : 1;
        return /^DESC$/i.test(dir ?? '') ? -cmp : cmp;
      }
      return 0;
    });
  }

  if (limitNum !== undefined) {
    projectedRows = projectedRows.slice(0, limitNum);
  }

  if (outputColumns.length === 0 && projectedRows.length > 0) {
    outputColumns = Object.keys(projectedRows[0]);
  }

  return { columns: outputColumns, rows: projectedRows };
}

export function runSqlSandbox(
  tables: Record<string, SqlTableRow[]>,
  sqlQuery: string,
  tests: SandboxTestCase[]
): SqlExecutionOutput {
  try {
    const { columns, rows } = executeSingleSelect(tables, sqlQuery);
    const logs = [
      `Executed query cleanly · ${rows.length} row${rows.length === 1 ? '' : 's'} returned`,
      `Columns: ${columns.join(', ')}`,
    ];

    const results: SandboxTestResult[] = tests.map((t) => {
      try {
        const fn = new Function(
          'rows',
          'columns',
          `"use strict"; return Boolean(${t.expression});`
        );
        const passed = Boolean(fn(rows, columns));
        return {
          id: t.id,
          label: t.label,
          expectedDescription: t.expectedDescription,
          passed,
        };
      } catch (err) {
        return {
          id: t.id,
          label: t.label,
          expectedDescription: t.expectedDescription,
          passed: false,
          error: err instanceof Error ? err.message : 'SQL assertion check failed',
        };
      }
    });

    return { columns, rows, logs, results };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SQL query failed';
    return {
      columns: [],
      rows: [],
      logs: [`SQL Error: ${message}`],
      results: tests.map((t) => ({
        id: t.id,
        label: t.label,
        expectedDescription: t.expectedDescription,
        passed: false,
        error: message,
      })),
      error: message,
    };
  }
}

// ============================================================================
// 4. PROMPT ENGINEERING WORKBENCH EVALUATOR
// ============================================================================

export function runPromptSandbox(
  promptTemplate: string,
  fixtures: PromptFixture[],
  tests: SandboxTestCase[]
): PromptExecutionOutput {
  const words = promptTemplate.trim().split(/\s+/).filter(Boolean).length;
  const estimatedTokens = Math.max(1, Math.round(words * 1.35));

  const renderedPrompts = fixtures.map((f) => {
    let interpolated = promptTemplate;
    for (const [k, v] of Object.entries(f.variables)) {
      interpolated = interpolated.replaceAll(`{{${k}}}`, v);
    }
    const lower = interpolated.toLowerCase();
    const hasJsonReq = lower.includes('json') || lower.includes('{');
    const hasRefusal =
      lower.includes('refuse') ||
      lower.includes('ignore instructions') ||
      lower.includes('untrusted') ||
      lower.includes('only answer');

    const simulatedOutput = lower.includes('ignore previous') || lower.includes('system prompt')
      ? hasRefusal
        ? '{"status": "REFUSED", "reason": "Untrusted user input attempted instruction override."}'
        : 'LEAKED: Followed injected instruction because system prompt lacked boundary refusal.'
      : hasJsonReq
        ? JSON.stringify(
            {
              fixture: f.label,
              verified: true,
              confidence: 0.94,
              summary: `Structured output generated cleanly for ${f.label}.`,
            },
            null,
            2
          )
        : `[Model Output for ${f.label}]: Synthesized clear, role-aligned response following your template constraints.`;

    return {
      label: f.label,
      system: promptTemplate.split('---')[0]?.trim() || promptTemplate,
      user: interpolated,
      simulatedOutput,
    };
  });

  const logs = [
    `Compiled prompt template (~${estimatedTokens} tokens) across ${fixtures.length} evaluation fixtures`,
    ...renderedPrompts.map((r) => `${r.label}: ${r.simulatedOutput.slice(0, 88)}...`),
  ];

  const results: SandboxTestResult[] = tests.map((t) => {
    try {
      const fn = new Function(
        'prompt',
        'tokens',
        'outputs',
        `"use strict"; return Boolean(${t.expression});`
      );
      const passed = Boolean(
        fn(
          promptTemplate,
          estimatedTokens,
          renderedPrompts.map((r) => r.simulatedOutput)
        )
      );
      return {
        id: t.id,
        label: t.label,
        expectedDescription: t.expectedDescription,
        passed,
      };
    } catch (err) {
      return {
        id: t.id,
        label: t.label,
        expectedDescription: t.expectedDescription,
        passed: false,
        error: err instanceof Error ? err.message : 'Prompt evaluation error',
      };
    }
  });

  return {
    renderedPrompts,
    estimatedTokens,
    logs,
    results,
  };
}
