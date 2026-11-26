'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Disable on touch devices and reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .interactive-target');
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isPressed ? 0.88 : isHovered ? 1.15 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {/* Crisp geometric dark-filled pointer arrow with white outline (Dribbble / macOS style) */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]"
          style={{ transform: 'translate(-2px, -2px)' }}
          aria-hidden="true"
        >
          <path
            d="M4.5 3.5L19.5 11.2L12.6 13.4L10.2 20.2L4.5 3.5Z"
            fill="#0B0B0D"
            stroke={isHovered ? '#E8A04C' : '#F5F2EA'}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
