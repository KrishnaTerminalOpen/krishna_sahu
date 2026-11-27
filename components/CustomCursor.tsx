'use client';

import React, { useEffect, useRef, useState } from 'react';

const SATELLITE_COUNT = 5;

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Disable on touch devices and reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setIsEnabled(true);

    const mouse = { x: -100, y: -100, visible: false, hovered: false, pressed: false };
    const mainPos = { x: -100, y: -100, radius: 14 };
    const satellites = Array.from({ length: SATELLITE_COUNT }, () => ({
      x: -100,
      y: -100,
    }));

    let angle = 0;
    let currentOrbit = 20;
    let lastTime = performance.now();
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const firstShow = !mouse.visible;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.visible = true;

      if (firstShow) {
        mainPos.x = e.clientX;
        mainPos.y = e.clientY;
        satellites.forEach((s) => {
          s.x = e.clientX;
          s.y = e.clientY;
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      mouse.hovered = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], .interactive-target')
      );
    };

    const handleMouseDown = () => {
      mouse.pressed = true;
    };

    const handleMouseUp = () => {
      mouse.pressed = false;
    };

    const handleMouseLeave = () => {
      mouse.visible = false;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Continuous rotation around the main circle
      angle += dt * 1.6;

      // Main circle tracks pointer accurately with slight smoothness
      const mainLerp = 1 - Math.exp(-28 * dt);
      mainPos.x += (mouse.x - mainPos.x) * mainLerp;
      mainPos.y += (mouse.y - mainPos.y) * mainLerp;

      const targetMainRadius = mouse.pressed ? 11 : mouse.hovered ? 20 : 14;
      mainPos.radius += (targetMainRadius - mainPos.radius) * (1 - Math.exp(-16 * dt));

      const targetOrbit = mouse.pressed ? 15 : mouse.hovered ? 27 : 20;
      currentOrbit += (targetOrbit - currentOrbit) * (1 - Math.exp(-10 * dt));

      const mainEl = mainRef.current;
      if (mainEl) {
        mainEl.style.opacity = mouse.visible ? '1' : '0';
        mainEl.style.width = `${mainPos.radius}px`;
        mainEl.style.height = `${mainPos.radius}px`;
        mainEl.style.transform = `translate3d(${mainPos.x - mainPos.radius / 2}px, ${mainPos.y - mainPos.radius / 2}px, 0)`;
        mainEl.style.borderColor = mouse.hovered ? 'var(--accent)' : 'var(--foreground)';
      }

      // Five small circles slowly follow like magnets toward their rotating orbit slots around the main circle
      for (let i = 0; i < SATELLITE_COUNT; i++) {
        const sat = satellites[i];
        const slotAngle = angle + (i * Math.PI * 2) / SATELLITE_COUNT;
        const targetX = mainPos.x + Math.cos(slotAngle) * currentOrbit;
        const targetY = mainPos.y + Math.sin(slotAngle) * currentOrbit;

        // Slow, staggered magnetic pull so they trail behind movement and gather smoothly when cursor stops
        const magnetSpeed = 3.2 + i * 0.45;
        const satLerp = 1 - Math.exp(-magnetSpeed * dt);
        sat.x += (targetX - sat.x) * satLerp;
        sat.y += (targetY - sat.y) * satLerp;

        const dotEl = dotRefs.current[i];
        if (dotEl) {
          dotEl.style.opacity = mouse.visible ? (mouse.hovered ? '0.95' : '0.8') : '0';
          dotEl.style.transform = `translate3d(${sat.x - 2}px, ${sat.y - 2}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Main minimal circle */}
      <div
        ref={mainRef}
        className="fixed top-0 left-0 rounded-full border-[1.5px] transition-colors duration-200 will-change-transform"
        style={{
          opacity: 0,
          width: 14,
          height: 14,
          borderColor: 'var(--foreground)',
        }}
      />

      {/* Five rotating magnetic satellite circles */}
      {Array.from({ length: SATELLITE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-accent will-change-transform"
          style={{
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
