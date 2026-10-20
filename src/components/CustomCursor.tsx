import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const MAGNETIC_RADIUS = 80;
const MAGNETIC_STRENGTH = 0.45;

export const CustomCursor: React.FC = () => {
  const isHovering = useRef(false);
  const isVisible = useRef(false);
  const isPointerDown = useRef(false);
  const magnetTarget = useRef<{ cx: number; cy: number } | null>(null);

  // Directly track raw pointer position without lag for the inner dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring spring: tight & responsive with stiffness 700, damping 35, mass 0.3
  const ringX = useSpring(mouseX, { stiffness: 700, damping: 35, mass: 0.3 });
  const ringY = useSpring(mouseY, { stiffness: 700, damping: 35, mass: 0.3 });

  const dotScale = useSpring(1, { stiffness: 600, damping: 30 });
  const dotOpacity = useSpring(0, { stiffness: 600, damping: 30 });
  const ringScale = useSpring(1, { stiffness: 600, damping: 30 });
  const ringOpacity = useSpring(0, { stiffness: 600, damping: 30 });
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
    return { cx: closest.cx, cy: closest.cy };
  }, []);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

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

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
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
        ringScale.set(isPointerDown.current ? 1.4 : 1.6);
        ringBg.set('rgba(59, 130, 246, 0.18)');
      } else if (!isInteractive && isHovering.current) {
        isHovering.current = false;
        dotScale.set(1);
        ringScale.set(isPointerDown.current ? 0.85 : 1);
        ringBg.set('transparent');
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      isPointerDown.current = true;
      if (!isHovering.current) {
        dotScale.set(0.7);
        ringScale.set(0.85);
      } else {
        ringScale.set(1.35);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      isPointerDown.current = false;
      if (!isHovering.current) {
        dotScale.set(1);
        ringScale.set(1);
      } else {
        ringScale.set(1.6);
      }
    };

    const onPointerLeave = () => {
      isVisible.current = false;
      dotOpacity.set(0);
      ringOpacity.set(0);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [mouseX, mouseY, dotOpacity, ringOpacity, dotScale, ringScale, ringBg, findMagneticTarget]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: dotScale,
          opacity: dotOpacity,
          willChange: 'transform',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-blue-500/50 dark:border-blue-400/60 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScale,
          opacity: ringOpacity,
          backgroundColor: ringBg,
          willChange: 'transform',
        }}
      />
    </>
  );
};
