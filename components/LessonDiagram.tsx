'use client';

import React from 'react';
import type { LessonDiagramSpec } from '@/lib/curriculum-types';

interface LessonDiagramProps {
  spec: LessonDiagramSpec;
}

export function LessonDiagram({ spec }: LessonDiagramProps) {
  const nodes = spec.nodes.slice(0, 4);

  return (
    <div className="rounded-2xl bg-[#00205B] text-white p-5 border border-[#00205B]/15 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-[#FFE264]">
          Visual Concept Map
        </p>
        <span className="text-[11px] font-medium text-white/70 truncate">
          {spec.title}
        </span>
      </div>

      {/* Bespoke crisp SVG visual matching 60/30/10 Midnight/White/Ocean/Sun palette */}
      <div className="rounded-xl bg-[#00153D] border border-white/10 p-3 overflow-hidden">
        {spec.type === 'memory-box' && (
          <svg
            viewBox="0 0 460 118"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <rect
              x="16"
              y="26"
              width="126"
              height="66"
              rx="10"
              fill="#003087"
              stroke="#307FE2"
              strokeWidth="1.5"
            />
            <text x="79" y="50" textAnchor="middle" fill="#FFE264" fontSize="11" fontWeight="700" fontFamily="monospace">
              {nodes[0] ?? 'label_name'}
            </text>
            <text x="79" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="11" opacity="0.85">
              {nodes[1] ?? 'Variable Name'}
            </text>

            <line x1="146" y1="59" x2="196" y2="59" stroke="#F2A900" strokeWidth="2" />
            <polygon points="196,54 206,59 196,64" fill="#F2A900" />
            <text x="174" y="47" textAnchor="middle" fill="#FFE264" fontSize="10" fontFamily="monospace">
              =
            </text>

            <rect
              x="212"
              y="20"
              width="230"
              height="78"
              rx="12"
              fill="#00205B"
              stroke="#F2A900"
              strokeWidth="1.75"
            />
            <text x="327" y="45" textAnchor="middle" fill="#FFE264" fontSize="10" fontWeight="700">
              STORED VALUE IN MEMORY
            </text>
            <text x="327" y="71" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700" fontFamily="monospace">
              {nodes[2] ?? '"Hello, World!"'}
            </text>
          </svg>
        )}

        {spec.type === 'branch-decision' && (
          <svg
            viewBox="0 0 460 126"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <rect x="14" y="42" width="112" height="44" rx="8" fill="#003087" stroke="#307FE2" strokeWidth="1.5" />
            <text x="70" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
              {nodes[0] ?? 'Input Check'}
            </text>

            <line x1="126" y1="64" x2="162" y2="64" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.5" />
            <polygon points="162,59 170,64 162,69" fill="#FFFFFF" fillOpacity="0.7" />

            <rect x="172" y="38" width="112" height="52" rx="10" fill="#00205B" stroke="#F2A900" strokeWidth="1.75" />
            <text x="228" y="60" textAnchor="middle" fill="#FFE264" fontSize="10" fontWeight="700">
              CONDITION
            </text>
            <text x="228" y="77" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="monospace">
              {nodes[1] ?? 'if x > 0:'}
            </text>

            <path d="M 284 52 L 330 30" stroke="#F2A900" strokeWidth="1.75" fill="none" />
            <path d="M 284 76 L 330 98" stroke="#307FE2" strokeWidth="1.75" fill="none" />

            <rect x="330" y="12" width="116" height="38" rx="8" fill="#003087" stroke="#F2A900" strokeWidth="1.5" />
            <text x="388" y="35" textAnchor="middle" fill="#FFE264" fontSize="10.5" fontWeight="700">
              True: {nodes[2] ?? 'Run Path A'}
            </text>

            <rect x="330" y="78" width="116" height="38" rx="8" fill="#00205B" stroke="#307FE2" strokeWidth="1.5" />
            <text x="388" y="101" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="600">
              False: {nodes[3] ?? 'Run Else'}
            </text>
          </svg>
        )}

        {spec.type === 'loop-cycle' && (
          <svg
            viewBox="0 0 460 124"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <rect x="16" y="40" width="108" height="44" rx="8" fill="#003087" stroke="#307FE2" strokeWidth="1.5" />
            <text x="70" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
              {nodes[0] ?? 'List [a, b, c]'}
            </text>

            <line x1="124" y1="62" x2="162" y2="62" stroke="#F2A900" strokeWidth="1.75" />
            <polygon points="162,57 170,62 162,67" fill="#F2A900" />

            <rect x="172" y="24" width="144" height="74" rx="12" fill="#00205B" stroke="#F2A900" strokeWidth="1.75" />
            <text x="244" y="48" textAnchor="middle" fill="#FFE264" fontSize="10" fontWeight="700">
              REPEAT PER ITEM
            </text>
            <text x="244" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="monospace">
              {nodes[1] ?? 'for item in items:'}
            </text>
            <path d="M 272 24 C 272 6, 216 6, 216 24" stroke="#FFE264" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />

            <line x1="316" y1="62" x2="348" y2="62" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.75" />
            <polygon points="348,57 356,62 348,67" fill="#FFFFFF" fillOpacity="0.7" />

            <rect x="358" y="40" width="88" height="44" rx="8" fill="#003087" stroke="#F2A900" strokeWidth="1.5" />
            <text x="402" y="66" textAnchor="middle" fill="#FFE264" fontSize="11" fontWeight="700">
              {nodes[2] ?? 'Result'}
            </text>
          </svg>
        )}

        {spec.type === 'dict-map' && (
          <svg
            viewBox="0 0 460 122"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <rect x="20" y="18" width="160" height="36" rx="8" fill="#003087" stroke="#307FE2" strokeWidth="1.5" />
            <text x="100" y="40" textAnchor="middle" fill="#FFE264" fontSize="11" fontFamily="monospace" fontWeight="700">
              {nodes[0] ?? '"food"'}
            </text>
            <line x1="184" y1="36" x2="254" y2="36" stroke="#F2A900" strokeWidth="1.75" />
            <polygon points="254,31 264,36 254,41" fill="#F2A900" />
            <rect x="268" y="18" width="170" height="36" rx="8" fill="#00205B" stroke="#F2A900" strokeWidth="1.5" />
            <text x="353" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="700">
              {nodes[1] ?? '42.50'}
            </text>

            <rect x="20" y="68" width="160" height="36" rx="8" fill="#003087" stroke="#307FE2" strokeWidth="1.5" />
            <text x="100" y="90" textAnchor="middle" fill="#FFE264" fontSize="11" fontFamily="monospace" fontWeight="700">
              {nodes[2] ?? '"cloud"'}
            </text>
            <line x1="184" y1="86" x2="254" y2="86" stroke="#F2A900" strokeWidth="1.75" />
            <polygon points="254,81 264,86 254,91" fill="#F2A900" />
            <rect x="268" y="68" width="170" height="36" rx="8" fill="#00205B" stroke="#F2A900" strokeWidth="1.5" />
            <text x="353" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="700">
              {nodes[3] ?? '120.00'}
            </text>
          </svg>
        )}

        {spec.type === 'table-join' && (
          <svg
            viewBox="0 0 460 124"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <rect x="16" y="18" width="124" height="86" rx="8" fill="#00205B" stroke="#307FE2" strokeWidth="1.5" />
            <rect x="16" y="18" width="124" height="24" rx="8" fill="#003087" />
            <text x="78" y="34" textAnchor="middle" fill="#FFE264" fontSize="10" fontWeight="700">
              {nodes[0] ?? 'Table A'}
            </text>
            <text x="78" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontFamily="monospace">
              {nodes[1] ?? 'id = 101'}
            </text>

            <line x1="142" y1="62" x2="180" y2="62" stroke="#F2A900" strokeWidth="2" />
            <circle cx="161" cy="62" r="9" fill="#F2A900" />
            <text x="161" y="66" textAnchor="middle" fill="#00205B" fontSize="10" fontWeight="900">
              =
            </text>

            <rect x="182" y="18" width="124" height="86" rx="8" fill="#00205B" stroke="#307FE2" strokeWidth="1.5" />
            <rect x="182" y="18" width="124" height="24" rx="8" fill="#003087" />
            <text x="244" y="34" textAnchor="middle" fill="#FFE264" fontSize="10" fontWeight="700">
              {nodes[2] ?? 'Table B'}
            </text>
            <text x="244" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontFamily="monospace">
              customer_id = 101
            </text>

            <line x1="308" y1="62" x2="334" y2="62" stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="1.75" />
            <polygon points="334,57 342,62 334,67" fill="#FFFFFF" fillOpacity="0.7" />

            <rect x="344" y="28" width="102" height="66" rx="8" fill="#003087" stroke="#F2A900" strokeWidth="1.5" />
            <text x="395" y="56" textAnchor="middle" fill="#FFE264" fontSize="10" fontWeight="700">
              JOINED ROW
            </text>
            <text x="395" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="10.5">
              {nodes[3] ?? 'Combined View'}
            </text>
          </svg>
        )}

        {spec.type === 'prompt-layers' && (
          <svg
            viewBox="0 0 460 124"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <rect x="20" y="14" width="270" height="28" rx="6" fill="#003087" stroke="#F2A900" strokeWidth="1.5" />
            <text x="34" y="32" fill="#FFE264" fontSize="10.5" fontWeight="700">
              1. SYSTEM: {nodes[0] ?? 'Role & Strict Rules'}
            </text>

            <rect x="20" y="48" width="270" height="28" rx="6" fill="#00205B" stroke="#307FE2" strokeWidth="1.5" />
            <text x="34" y="66" fill="#FFFFFF" fontSize="10.5" fontWeight="600">
              2. CONTEXT: {nodes[1] ?? 'Examples or Schema'}
            </text>

            <rect x="20" y="82" width="270" height="28" rx="6" fill="#00205B" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.25" />
            <text x="34" y="100" fill="#FFFFFF" fillOpacity="0.85" fontSize="10.5">
              3. DATA: {nodes[2] ?? '{{user_input}}'}
            </text>

            <line x1="296" y1="62" x2="334" y2="62" stroke="#F2A900" strokeWidth="2" />
            <polygon points="334,57 344,62 334,67" fill="#F2A900" />

            <rect x="348" y="32" width="96" height="60" rx="10" fill="#003087" stroke="#F2A900" strokeWidth="1.5" />
            <text x="396" y="57" textAnchor="middle" fill="#FFE264" fontSize="10" fontWeight="700">
              OUTPUT
            </text>
            <text x="396" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="10">
              {nodes[3] ?? 'Safe JSON'}
            </text>
          </svg>
        )}

        {spec.type === 'funnel-stages' && (
          <svg
            viewBox="0 0 460 120"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <polygon points="20,18 440,18 400,46 60,46" fill="#003087" stroke="#307FE2" strokeWidth="1.25" />
            <text x="230" y="36" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
              {nodes[0] ?? 'Awareness / Sessions'}
            </text>
            <polygon points="70,50 390,50 350,78 110,78" fill="#00205B" stroke="#307FE2" strokeWidth="1.25" />
            <text x="230" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
              {nodes[1] ?? 'Activation / Signups'}
            </text>
            <polygon points="120,82 340,82 308,108 152,108" fill="#003087" stroke="#F2A900" strokeWidth="1.5" />
            <text x="230" y="99" textAnchor="middle" fill="#FFE264" fontSize="11" fontWeight="700">
              {nodes[2] ?? 'Converted Customers'}
            </text>
          </svg>
        )}

        {spec.type === 'osi-layers' && (
          <svg
            viewBox="0 0 460 122"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <rect x="22" y="14" width="268" height="28" rx="6" fill="#003087" stroke="#F2A900" strokeWidth="1.5" />
            <text x="156" y="32" textAnchor="middle" fill="#FFE264" fontSize="10.5" fontWeight="700">
              Layer 7 · {nodes[0] ?? 'Application (DNS / HTTPS)'}
            </text>
            <rect x="22" y="48" width="268" height="28" rx="6" fill="#00205B" stroke="#307FE2" strokeWidth="1.5" />
            <text x="156" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="600">
              Layer 3–4 · {nodes[1] ?? 'IP Subnet & TCP Routing'}
            </text>
            <rect x="22" y="82" width="268" height="28" rx="6" fill="#00205B" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.25" />
            <text x="156" y="100" textAnchor="middle" fill="#FFFFFF" fillOpacity="0.85" fontSize="10.5">
              Layer 1–2 · {nodes[2] ?? 'Physical Link & NIC'}
            </text>
            <path d="M 314 96 L 314 24" stroke="#F2A900" strokeWidth="2" />
            <polygon points="309,28 314,18 319,28" fill="#F2A900" />
            <text x="380" y="58" textAnchor="middle" fill="#FFE264" fontSize="10.5" fontWeight="700">
              Bottom-Up
            </text>
            <text x="380" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="10">
              {nodes[3] ?? 'Isolate First'}
            </text>
          </svg>
        )}

        {spec.type === 'contrast-ratio' && (
          <svg
            viewBox="0 0 460 118"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <rect x="18" y="20" width="196" height="78" rx="10" fill="#FFFFFF" />
            <text x="116" y="52" textAnchor="middle" fill="#00205B" fontSize="14" fontWeight="800">
              {nodes[0] ?? 'Aa · 15.6:1 AAA'}
            </text>
            <text x="116" y="76" textAnchor="middle" fill="#003087" fontSize="10.5" fontWeight="700">
              {nodes[1] ?? 'Accessible Contrast'}
            </text>

            <rect x="246" y="20" width="196" height="78" rx="10" fill="#00205B" stroke="#F2A900" strokeWidth="1.5" />
            <text x="344" y="52" textAnchor="middle" fill="#FFE264" fontSize="13" fontWeight="800">
              {nodes[2] ?? '60 / 30 / 10'}
            </text>
            <text x="344" y="76" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="600">
              {nodes[3] ?? 'Structured Tokens'}
            </text>
          </svg>
        )}

        {spec.type === 'sigmoid-curve' && (
          <svg
            viewBox="0 0 460 120"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            <line x1="48" y1="98" x2="420" y2="98" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.25" />
            <line x1="234" y1="16" x2="234" y2="104" stroke="#FFFFFF" strokeOpacity="0.25" strokeDasharray="3 3" strokeWidth="1.25" />
            <path
              d="M 52 94 C 150 94, 195 90, 234 56 C 273 22, 318 18, 416 18"
              fill="none"
              stroke="#F2A900"
              strokeWidth="2.5"
            />
            <circle cx="234" cy="56" r="5" fill="#FFE264" />
            <text x="88" y="84" fill="#FFFFFF" fontSize="10" opacity="0.8">
              {nodes[0] ?? 'Low Risk (0.0)'}
            </text>
            <text x="246" y="60" fill="#FFE264" fontSize="10" fontWeight="700">
              {nodes[1] ?? 'p = 0.5 at z=0'}
            </text>
            <text x="346" y="34" fill="#FFFFFF" fontSize="10" fontWeight="700">
              {nodes[2] ?? 'High Risk (1.0)'}
            </text>
          </svg>
        )}

        {(spec.type === 'flow' || spec.type === 'capstone-assembly') && (
          <svg
            viewBox="0 0 460 116"
            className="w-full h-auto"
            role="img"
            aria-label={spec.title}
          >
            {(nodes.length >= 3 ? nodes.slice(0, 3) : ['Input Step', 'Core Logic', 'Verified Output']).map(
              (label, idx) => {
                const x = 16 + idx * 150;
                const isLast = idx === (nodes.length >= 3 ? 2 : 2);
                return (
                  <g key={label}>
                    <rect
                      x={x}
                      y="28"
                      width="126"
                      height="58"
                      rx="10"
                      fill={isLast ? '#003087' : '#00205B'}
                      stroke={isLast ? '#F2A900' : '#307FE2'}
                      strokeWidth="1.5"
                    />
                    <text
                      x={x + 63}
                      y="50"
                      textAnchor="middle"
                      fill="#FFE264"
                      fontSize="9.5"
                      fontWeight="700"
                    >
                      STEP {idx + 1}
                    </text>
                    <text
                      x={x + 63}
                      y="69"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10.5"
                      fontWeight="700"
                    >
                      {label.length > 18 ? `${label.slice(0, 17)}…` : label}
                    </text>
                    {idx < 2 && (
                      <>
                        <line
                          x1={x + 128}
                          y1="57"
                          x2={x + 144}
                          y2="57"
                          stroke="#F2A900"
                          strokeWidth="1.75"
                        />
                        <polygon
                          points={`${x + 142},52 ${x + 150},57 ${x + 142},62`}
                          fill="#F2A900"
                        />
                      </>
                    )}
                  </g>
                );
              }
            )}
          </svg>
        )}
      </div>

      <p className="text-xs text-white/80 leading-relaxed">{spec.caption}</p>
    </div>
  );
}
