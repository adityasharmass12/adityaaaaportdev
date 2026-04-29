import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const MAGNETIC_RADIUS = 80;
const MAGNETIC_STRENGTH = 0.45;

export const CustomCursor: React.FC = () => {
  const isHovering = useRef(false);
  const isVisible = useRef(false);
  const magnetTarget = useRef<{ cx: number; cy: number } | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 80, mass: 0.05 });
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 80, mass: 0.05 });

  const ringX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.15 });
  const ringY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.15 });

  const dotScale = useSpring(1, { stiffness: 500, damping: 30 });
  const dotOpacity = useSpring(0, { stiffness: 500, damping: 30 });
  const ringScale = useSpring(1, { stiffness: 400, damping: 25 });
  const ringOpacity = useSpring(0, { stiffness: 500, damping: 30 });
  const ringBg = useMotionValue('transparent');

  const findMagneticTarget = useCallback((x: number, y: number): { cx: number; cy: number } | null => {
    const elements = document.querySelectorAll('a, button, [data-magnetic]');
    let closest: { cx: number; cy: number; dist: number } | null = null;

    elements.forEach((el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

      if (dist < MAGNETIC_RADIUS && (!closest || dist < closest.dist)) {
        closest = { cx, cy, dist };
      }
    });

    if (!closest) return null;

    const { cx, cy } = closest;
    return { cx, cy };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const rawX = e.clientX;
      const rawY = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        dotOpacity.set(1);
        ringOpacity.set(1);
      }

      const target = findMagneticTarget(rawX, rawY);
      magnetTarget.current = target;

      if (target) {
        const pullX = rawX + (target.cx - rawX) * MAGNETIC_STRENGTH;
        const pullY = rawY + (target.cy - rawY) * MAGNETIC_STRENGTH;
        mouseX.set(pullX);
        mouseY.set(pullY);
      } else {
        mouseX.set(rawX);
        mouseY.set(rawY);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractive && !isHovering.current) {
        isHovering.current = true;
        dotScale.set(0);
        ringScale.set(1.6);
        ringBg.set('rgba(168, 85, 247, 0.15)');
      } else if (!isInteractive && isHovering.current) {
        isHovering.current = false;
        dotScale.set(1);
        ringScale.set(1);
        ringBg.set('transparent');
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      dotOpacity.set(0);
      ringOpacity.set(0);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [mouseX, mouseY, dotOpacity, ringOpacity, dotScale, ringScale, ringBg, findMagneticTarget]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-purple-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(192,132,252,0.8)]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: dotScale,
          opacity: dotOpacity,
        }}
      />
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-purple-400/60 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScale,
          opacity: ringOpacity,
          backgroundColor: ringBg,
        }}
      />
    </>
  );
};
