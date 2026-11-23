'use client';

import React from 'react';
import Particles from './Particles';
import { useTheme } from './ThemeProvider';

export function GlobalParticlesBackground() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Particles
        particleColors={isLight ? ['#1f242d', '#717682', '#966336'] : ['#e0a369', '#d48c48', '#888e99', '#ffffff']}
        particleCount={110}
        particleSpread={11}
        speed={0.07}
        particleBaseSize={70}
        sizeRandomness={0.85}
        glow={isLight ? 0.2 : 0.45}
        twinkle={0.25}
        moveParticlesOnHover={true}
        hoverEffect="parallax"
        particleHoverFactor={0.65}
        cameraDistance={22}
        alphaParticles={true}
        opacity={isLight ? 0.35 : 0.55}
        lightMode={isLight}
        className="w-full h-full"
      />
    </div>
  );
}

export default GlobalParticlesBackground;

