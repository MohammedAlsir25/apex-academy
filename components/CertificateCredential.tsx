'use client';

import React, { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { ApexLogo } from './ApexLogo';
import { isSafeHttpUrl } from '@/lib/security';
import type { CertificateRecord } from '@/lib/storage';

interface QrBadgeProps {
  code: string;
  size?: number;
}

export function QrVerificationBadge({ code, size = 76 }: QrBadgeProps) {
  const grid = useMemo(() => {
    const dim = 15;
    const matrix: boolean[][] = Array.from({ length: dim }, () =>
      Array(dim).fill(false)
    );

    const drawFinder = (r0: number, c0: number) => {
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          const border = r === 0 || r === 4 || c === 0 || c === 4;
          const center = r === 2 && c === 2;
          matrix[r0 + r][c0 + c] = border || center;
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(0, dim - 5);
    drawFinder(dim - 5, 0);

    let seed = 0;
    for (let i = 0; i < code.length; i++) {
      seed = (seed * 31 + code.charCodeAt(i)) % 999983;
    }

    for (let r = 0; r < dim; r++) {
      for (let c = 0; c < dim; c++) {
        const inTopLeft = r < 6 && c < 6;
        const inTopRight = r < 6 && c >= dim - 6;
        const inBottomLeft = r >= dim - 6 && c < 6;
        if (inTopLeft || inTopRight || inBottomLeft) continue;
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        matrix[r][c] = seed % 2 === 0;
      }
    }
    return matrix;
  }, [code]);

  const cell = 4;
  const viewSize = 15 * cell;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      role="img"
      aria-label={`Verification QR badge for ${code}`}
      className="bg-white p-1.5 rounded-xl border border-[#00205B]/15 shrink-0"
    >
      {grid.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * cell}
              y={r * cell}
              width={cell}
              height={cell}
              fill="#00205B"
              rx={0.5}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export function downloadCertificatePng(
  cert: CertificateRecord,
  isDiploma = false
): void {
  if (typeof document === 'undefined') return;
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1120;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // White card canvas + Midnight & Sun architectural frame
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#00205B';
  ctx.lineWidth = 24;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  ctx.strokeStyle = '#F2A900';
  ctx.lineWidth = 6;
  ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);

  // Top Midnight Header Strip
  ctx.fillStyle = '#00205B';
  ctx.fillRect(60, 60, canvas.width - 120, 140);

  // Geometric Apex Mark inside PNG
  ctx.fillStyle = '#F2A900';
  ctx.fillRect(105, 95, 56, 18);
  ctx.fillRect(105, 95, 18, 66);
  ctx.fillRect(105, 143, 36, 18);
  ctx.fillRect(145, 143, 16, 18);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 34px sans-serif';
  ctx.fillText('APEX ACADEMY', 182, 134);
  ctx.fillStyle = '#FFE264';
  ctx.font = '600 18px sans-serif';
  ctx.fillText(
    isDiploma ? 'TRACK SPECIALIZATION DIPLOMA' : 'VERIFIED CAPSTONE CREDENTIAL',
    182,
    164
  );

  ctx.fillStyle = '#FFE264';
  ctx.font = '600 20px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`ID: ${cert.verificationCode}`, canvas.width - 105, 140);
  ctx.textAlign = 'left';

  // Main Body
  ctx.fillStyle = '#003087';
  ctx.font = '700 22px sans-serif';
  ctx.fillText('THIS CERTIFIES THAT', 110, 290);

  ctx.fillStyle = '#00205B';
  ctx.font = 'italic 700 68px Georgia, serif';
  ctx.fillText(cert.learnerName, 110, 370);

  ctx.fillStyle = '#1E293B';
  ctx.font = '400 26px sans-serif';
  ctx.fillText(
    isDiploma
      ? `has completed all required capstone courses in the ${cert.track} specialization:`
      : `has completed all incremental scaffolding milestones for ${cert.courseTitle}:`,
    110,
    435
  );

  // Capstone Midnight Block
  ctx.fillStyle = '#00205B';
  ctx.fillRect(110, 480, canvas.width - 220, 220);

  ctx.fillStyle = '#FFE264';
  ctx.font = '700 18px sans-serif';
  ctx.fillText('VERIFIED CAPSTONE PROJECT', 150, 530);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 34px sans-serif';
  ctx.fillText(cert.capstoneTitle.slice(0, 62), 150, 580);

  ctx.fillStyle = '#F2A900';
  ctx.font = '800 40px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`${cert.rubricScore} / 100`, canvas.width - 150, 580);
  ctx.textAlign = 'left';

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '400 21px sans-serif';
  const summaryLines = cert.capstoneSummary.slice(0, 175);
  ctx.fillText(summaryLines, 150, 638, canvas.width - 300);

  // Verified Skills Row
  const skills = (cert.skillsVerified ?? []).slice(0, 4);
  if (skills.length > 0) {
    ctx.fillStyle = '#003087';
    ctx.font = '700 18px sans-serif';
    ctx.fillText(`VERIFIED SKILLS: ${skills.join('  ·  ')}`, 110, 765);
  }

  // Footer Signature & Issue Date
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(110, 860);
  ctx.lineTo(canvas.width - 110, 860);
  ctx.stroke();

  ctx.fillStyle = '#00205B';
  ctx.font = 'italic 700 34px Georgia, serif';
  ctx.fillText(cert.instructorName || 'Apex Academic Board', 110, 930);
  ctx.fillStyle = '#475569';
  ctx.font = '600 19px sans-serif';
  ctx.fillText(
    `${cert.instructorRole || 'Principal Instructor'} · ${cert.instructorOrg || 'Apex Academy'}`,
    110,
    965
  );

  ctx.textAlign = 'right';
  ctx.fillStyle = '#00205B';
  ctx.font = '700 20px sans-serif';
  ctx.fillText(
    `Issued ${new Date(cert.issuedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`,
    canvas.width - 110,
    935
  );
  ctx.fillStyle = '#475569';
  ctx.font = '500 18px sans-serif';
  ctx.fillText(cert.track, canvas.width - 110, 965);
  ctx.textAlign = 'left';

  const link = document.createElement('a');
  link.download = `${cert.verificationCode}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

interface CertificateCardProps {
  cert: CertificateRecord;
  fallbackLearnerName: string;
  isDiploma?: boolean;
}

export function CertificateCard({
  cert,
  fallbackLearnerName,
  isDiploma = false,
}: CertificateCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyVerifyLink = async () => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}/?verify=${encodeURIComponent(
      cert.verificationCode
    )}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored safely
    }
  };

  const skills = cert.skillsVerified ?? [];

  return (
    <div className="space-y-4">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="text-xs text-white/75">
          Credential ID:{' '}
          <span className="font-mono font-bold text-[#FFE264]">
            {cert.verificationCode}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyVerifyLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00153D] border border-white/20 hover:border-[#F2A900] text-xs font-bold text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#F2A900]" />
                <span>Verification Link Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Verification Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => downloadCertificatePng(cert, isDiploma)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#003087] hover:bg-[#307FE2] text-xs font-bold text-white transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2A900] hover:bg-[#FFE264] text-[#00205B] text-xs font-bold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Formal Printable Certificate Frame */}
      <div className="print-certificate bg-white text-[#00205B] rounded-3xl p-8 sm:p-11 shadow-2xl border-4 border-[#F2A900] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-7 border-b border-slate-200">
          <ApexLogo variant="light" size="md" />
          <div className="flex items-center gap-4">
            <div className="text-left sm:text-right text-xs text-[#00205B]/75 font-mono">
              <p className="font-bold text-[#00205B]">
                {isDiploma
                  ? 'TRACK SPECIALIZATION DIPLOMA'
                  : 'VERIFIED CAPSTONE CREDENTIAL'}
              </p>
              <p className="mt-0.5 tabular-nums">ID: {cert.verificationCode}</p>
              <p className="mt-0.5 text-[11px] text-[#003087] font-sans font-semibold">
                Scan or verify online
              </p>
            </div>
            <QrVerificationBadge code={cert.verificationCode} size={68} />
          </div>
        </div>

        <div className="py-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#003087]">
            This certifies that
          </p>
          <h2 className="mt-2.5 text-3xl sm:text-5xl font-serif italic font-bold text-[#00205B]">
            {cert.learnerName || fallbackLearnerName}
          </h2>
          <p className="mt-4 text-base text-[#00205B]/80 max-w-2xl leading-relaxed">
            {isDiploma ? (
              <>
                has mastered every capstone course within the{' '}
                <strong className="text-[#00205B]">{cert.track}</strong> specialization track,
                demonstrating full-spectrum mastery across:
              </>
            ) : (
              <>
                has completed all incremental scaffolding milestones and passed the
                capstone evaluation for{' '}
                <strong className="text-[#00205B]">{cert.courseTitle}</strong>, shipping
                the verified capstone project:
              </>
            )}
          </p>

          <div className="mt-6 rounded-2xl bg-[#00205B] text-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#FFE264] font-semibold">
                  {isDiploma ? 'Specialization Summary' : 'Capstone Deliverable'}
                </p>
                <p className="mt-1 text-xl font-extrabold">{cert.capstoneTitle}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-white/70">Mentor Rubric Score</p>
                <p className="text-2xl font-extrabold text-[#F2A900] tabular-nums">
                  {cert.rubricScore} / 100
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              {cert.capstoneSummary}
            </p>
          </div>

          {/* Verified Skill Matrix */}
          {skills.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#003087]">
                Verified Skill Matrix
              </p>
              <div className="mt-2.5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-xs font-semibold text-[#00205B]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F2A900] shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Instructor Signature Crest & Issue Metadata */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="font-serif italic text-2xl font-bold text-[#00205B]">
              {cert.instructorName || 'Apex Academic Board'}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-[#00205B]/75">
              {cert.instructorRole || 'Principal Instructor'} ·{' '}
              {cert.instructorOrg || 'Apex Academy'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#00205B]/75">
            {cert.artifactUrl && isSafeHttpUrl(cert.artifactUrl) && (
              <a
                href={cert.artifactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#003087] hover:underline no-print"
              >
                <span>Inspect Capstone Artifact</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <div className="flex items-center gap-2 font-semibold text-[#00205B]">
              <ShieldCheck className="w-4 h-4 text-[#003087]" />
              <span>
                Issued{' '}
                {new Date(cert.issuedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
