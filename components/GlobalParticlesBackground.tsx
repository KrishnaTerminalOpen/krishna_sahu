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
        particleColors={isLight ? ['#24272e', '#4f5563', '#a36d3c', '#000000'] : ['#ffffff', '#e2a76f', '#cca073', '#949ba8']}
        particleCount={200}
        particleSpread={12}
        speed={0.12}
        particleBaseSize={100}
        sizeRandomness={1}
        glow={0.6}
        twinkle={0.35}
        moveParticlesOnHover={true}
        hoverEffect="parallax"
        particleHoverFactor={1}
        cameraDistance={20}
        alphaParticles={false}
        opacity={isLight ? 0.6 : 0.85}
        lightMode={isLight}
        className="w-full h-full"
      />
    </div>
  );
}

export default GlobalParticlesBackground;

