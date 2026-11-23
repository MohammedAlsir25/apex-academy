import React from 'react';

interface ApexLogoProps {
  variant?: 'dark' | 'light' | 'ocean';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ApexLogo({
  variant = 'dark',
  size = 'md',
  className = '',
}: ApexLogoProps) {
  const markColor =
    variant === 'ocean' ? '#00205B' : '#F2A900';
  const foldShadowColor =
    variant === 'ocean' ? '#00153D' : '#D99400';
  const apexTextColor =
    variant === 'dark' ? '#FFFFFF' : '#00205B';
  const academyTextColor =
    variant === 'dark' ? 'rgba(255, 255, 255, 0.88)' : '#00205B';

  const dimensions =
    size === 'sm'
      ? { icon: 30, apex: 'text-[17px]', academy: 'text-[8px] tracking-[0.28em]' }
      : size === 'lg'
        ? { icon: 52, apex: 'text-[28px]', academy: 'text-[12px] tracking-[0.34em]' }
        : { icon: 36, apex: 'text-[20px]', academy: 'text-[9px] tracking-[0.3em]' };

  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Top folded architectural flap */}
        <path
          d="M6 17L17.5 6H54V26.5L41 39V17H6Z"
          fill={markColor}
        />
        {/* Subtle inner fold facet matching reference mark */}
        <path
          d="M6 17L17.5 6L21 17H6Z"
          fill={foldShadowColor}
          opacity="0.45"
        />
        {/* Left & bottom scaffolded L-frame with diagonal shear */}
        <path
          d="M6 19.5H19V39H41L28 54H6V19.5Z"
          fill={markColor}
        />
        {/* Bottom-right architectural capstone node */}
        <rect
          x="41"
          y="39"
          width="13"
          height="15"
          fill={markColor}
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`${dimensions.apex} font-extrabold italic tracking-tight uppercase`}
          style={{ color: apexTextColor }}
        >
          APEX
        </span>
        <span
          className={`${dimensions.academy} font-semibold uppercase mt-0.5`}
          style={{ color: academyTextColor }}
        >
          ACADEMY
        </span>
      </span>
    </span>
  );
}
