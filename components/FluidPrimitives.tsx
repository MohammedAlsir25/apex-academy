'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import {
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';

/**
 * Apple Design Skill Spring Presets
 * - Critically damped (`bounce: 0`) for standard UI & state changes
 * - Slight overshoot (`bounce: 0.18`) strictly for momentum throws & milestone celebrations
 */
export const SPRING_CRITICALLY_DAMPED = {
  type: 'spring' as const,
  bounce: 0,
  duration: 0.36,
};

export const SPRING_SNAPPY = {
  type: 'spring' as const,
  bounce: 0,
  duration: 0.26,
};

export const SPRING_MOMENTUM = {
  type: 'spring' as const,
  bounce: 0.18,
  duration: 0.4,
};

/**
 * Exponential momentum projection (Apple WWDC Designing Fluid Interfaces).
 * Projects resting coordinate from release velocity in px/s.
 */
export function projectMomentum(
  initialVelocityPxPerSec: number,
  decelerationRate = 0.996
): number {
  return ((initialVelocityPxPerSec / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive soft edge resistance (rubber-banding) when dragging past a bound.
 */
export function rubberbandClamp(
  overshoot: number,
  dimension = 220,
  constant = 0.55
): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export function FluidMotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface FluidSheetProps {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabelledBy: string;
  maxWidthClass?: string;
}

/**
 * Interruptible, swipe-to-dismiss modal sheet with 1:1 pointer tracking,
 * upward rubber-band resistance, exponential momentum projection on release,
 * backdrop scrim dimming, and Escape-key dismissal.
 */
export function FluidSheet({
  children,
  onClose,
  ariaLabelledBy,
  maxWidthClass = 'max-w-4xl',
}: FluidSheetProps) {
  const prefersReducedMotion = useReducedMotion();
  const y = useMotionValue(0);
  const scrimOpacity = useTransform(y, [0, 320], [1, 0.15]);
  const sheetScale = useTransform(y, [0, 320], [1, 0.96]);

  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const startYRef = useRef(0);
  const startOffsetYRef = useRef(0);
  const historyRef = useRef<Array<{ y: number; t: number }>>([]);
  const closingRef = useRef(false);

  const dismissSmoothly = useCallback(
    (velocity = 0) => {
      if (closingRef.current) return;
      closingRef.current = true;

      if (prefersReducedMotion) {
        onClose();
        return;
      }

      const controls = animate(y, 520, {
        type: 'spring',
        bounce: 0,
        duration: 0.28,
        velocity,
      });
      controls.then(() => {
        onClose();
      });
    },
    [onClose, prefersReducedMotion, y]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismissSmoothly(0);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dismissSmoothly]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Allow interactive buttons inside header (like Close X) to handle clicks directly
    if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) {
      return;
    }
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    draggingRef.current = true;
    pointerIdRef.current = e.pointerId;
    startYRef.current = e.clientY;
    startOffsetYRef.current = y.get();
    historyRef.current = [{ y: e.clientY, t: performance.now() }];
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;

    const rawDelta = e.clientY - startYRef.current + startOffsetYRef.current;
    const nextY = rawDelta < 0 ? rubberbandClamp(rawDelta, 220, 0.5) : rawDelta;
    y.set(nextY);

    const now = performance.now();
    historyRef.current.push({ y: e.clientY, t: now });
    if (historyRef.current.length > 6) {
      historyRef.current.shift();
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;
    draggingRef.current = false;
    pointerIdRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const samples = historyRef.current;
    let velocityPxPerSec = 0;
    if (samples.length >= 2) {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = (last.t - first.t) / 1000;
      if (dt > 0.004) {
        velocityPxPerSec = (last.y - first.y) / dt;
      }
    }

    const currentY = y.get();
    const projectedY = currentY + projectMomentum(velocityPxPerSec, 0.994);

    if (projectedY > 120 || currentY > 140) {
      dismissSmoothly(Math.max(velocityPxPerSec, 320));
    } else {
      animate(y, 0, {
        type: 'spring',
        bounce: 0.14,
        duration: 0.34,
        velocity: velocityPxPerSec,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
    >
      {/* Dimming Scrim — Click Outside to Dismiss */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { opacity: scrimOpacity }}
        onClick={() => dismissSmoothly(0)}
        className="fixed inset-0 bg-[#000B24]/70 backdrop-blur-md"
      />

      {/* Fluid Sheet Container */}
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 36, scale: 0.96 }
        }
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        exit={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 28, scale: 0.97 }
        }
        transition={SPRING_CRITICALLY_DAMPED}
        style={prefersReducedMotion ? undefined : { y, scale: sheetScale }}
        className={`relative z-10 w-full ${maxWidthClass} bg-white text-[#00205B] rounded-t-3xl sm:rounded-3xl shadow-[0_32px_90px_rgba(0,11,36,0.65)] ring-1 ring-white/25 overflow-hidden my-auto max-h-[92vh] flex flex-col`}
      >
        {/* Interactive Drag Zone & Grab Handle */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className="bg-[#00205B]/95 backdrop-blur-xl text-white shrink-0 select-none touch-none cursor-grab active:cursor-grabbing border-b border-white/10"
        >
          <div className="flex justify-center pt-2.5 pb-1" aria-hidden="true">
            <span className="w-10 h-1 rounded-full bg-white/30" />
          </div>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
