'use client';

import React, { useEffect, useRef, useState } from 'react';

const SATELLITE_COUNT = 5;

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const clusterRef = useRef<HTMLDivElement | null>(null);
  const orbitRingRef = useRef<HTMLDivElement | null>(null);
  const innerCircleRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Disable on touch devices and reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setIsEnabled(true);

    const mouse = { x: -100, y: -100, visible: false, hovered: false, pressed: false };
    const ringPos = { x: -100, y: -100 };

    let angle = 0;
    let currentOrbit = 19;
    let currentInnerSize = 14;
    let lastTime = performance.now();
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const firstShow = !mouse.visible;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.visible = true;

      if (firstShow) {
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
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

      // Continuous rotation
      angle = (angle + dt * 95) % 360;

      // Whole fixed cluster follows cursor slowly like a magnet, keeping its exact circular shape
      const magnetLerp = 1 - Math.exp(-7.5 * dt);
      ringPos.x += (mouse.x - ringPos.x) * magnetLerp;
      ringPos.y += (mouse.y - ringPos.y) * magnetLerp;

      const targetInnerSize = mouse.pressed ? 11 : mouse.hovered ? 18 : 14;
      currentInnerSize += (targetInnerSize - currentInnerSize) * (1 - Math.exp(-14 * dt));

      const targetOrbit = mouse.pressed ? 14 : mouse.hovered ? 24 : 19;
      currentOrbit += (targetOrbit - currentOrbit) * (1 - Math.exp(-12 * dt));

      const clusterEl = clusterRef.current;
      if (clusterEl) {
        clusterEl.style.opacity = mouse.visible ? '1' : '0';
        clusterEl.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      }

      const innerEl = innerCircleRef.current;
      if (innerEl) {
        innerEl.style.width = `${currentInnerSize}px`;
        innerEl.style.height = `${currentInnerSize}px`;
        innerEl.style.borderColor = mouse.hovered ? 'var(--accent)' : 'var(--foreground)';
      }

      const orbitRingEl = orbitRingRef.current;
      if (orbitRingEl) {
        orbitRingEl.style.transform = `rotate(${angle}deg)`;
      }

      for (let i = 0; i < SATELLITE_COUNT; i++) {
        const dotEl = dotRefs.current[i];
        if (dotEl) {
          const theta = (i * Math.PI * 2) / SATELLITE_COUNT;
          const dx = Math.cos(theta) * currentOrbit;
          const dy = Math.sin(theta) * currentOrbit;
          dotEl.style.transform = `translate3d(${dx - 2}px, ${dy - 2}px, 0)`;
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
      {/* Unified rigid cursor cluster so the ring shape never breaks apart on motion */}
      <div
        ref={clusterRef}
        className="fixed top-0 left-0 will-change-transform"
        style={{ opacity: 0 }}
      >
        {/* Fixed center minimal circle */}
        <div
          ref={innerCircleRef}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] transition-colors duration-200"
          style={{
            width: 14,
            height: 14,
            borderColor: 'var(--foreground)',
          }}
        />

        {/* Rotating ring of 5 fixed small circles */}
        <div ref={orbitRingRef} className="absolute top-0 left-0 will-change-transform">
          {Array.from({ length: SATELLITE_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="absolute top-0 left-0 w-1 h-1 rounded-full bg-accent"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
