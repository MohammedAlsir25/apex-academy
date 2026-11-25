import type { EmailEventType } from './email-templates';
import type { ResolvedEmailProvider } from './email-provider';

export interface EmailAuditEntry {
  id: string;
  userId: string | null;
  eventType: EmailEventType;
  courseId: string | null;
  recipientMasked: string;
  provider: ResolvedEmailProvider;
  status: 'sent' | 'simulated' | 'skipped' | 'failed';
  subject: string;
  externalMessageId: string | null;
  errorDetail: string | null;
  idempotencyKey: string | null;
  createdAt: string;
}

declare global {
  var __apexEmailAuditLogs: EmailAuditEntry[] | undefined;
  var __apexEmailIdempotency: Set<string> | undefined;
}

function getMemoryLogs(): EmailAuditEntry[] {
  if (!globalThis.__apexEmailAuditLogs) {
    globalThis.__apexEmailAuditLogs = [];
  }
  return globalThis.__apexEmailAuditLogs;
}

function getIdempotencySet(): Set<string> {
  if (!globalThis.__apexEmailIdempotency) {
    globalThis.__apexEmailIdempotency = new Set<string>();
  }
  return globalThis.__apexEmailIdempotency;
}

export function maskEmailAddress(email: string): string {
  const clean = email.trim();
  const atIndex = clean.indexOf('@');
  if (atIndex <= 0) return '***';
  const local = clean.slice(0, atIndex);
  const domain = clean.slice(atIndex + 1);
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}***@${domain}`;
}

export function hasDispatchedInMemory(idempotencyKey: string): boolean {
  return getIdempotencySet().has(idempotencyKey);
}

export function recordAuditEntryInMemory(entry: Omit<EmailAuditEntry, 'id' | 'createdAt'>): EmailAuditEntry {
  const fullEntry: EmailAuditEntry = {
    ...entry,
    id: `eml_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  if (entry.idempotencyKey) {
    getIdempotencySet().add(entry.idempotencyKey);
  }

  const logs = getMemoryLogs();
  logs.unshift(fullEntry);
  if (logs.length > 100) {
    logs.length = 100;
  }
  return fullEntry;
}

export function listAuditEntriesFromMemory(): EmailAuditEntry[] {
  return [...getMemoryLogs()];
}
