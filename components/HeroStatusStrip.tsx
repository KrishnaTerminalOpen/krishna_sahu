'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';


export function HeroStatusStrip() {
  return (
    <div className="inline-flex items-center gap-2 border border-border bg-surface/80 backdrop-blur-md px-3.5 py-1.5 rounded-full font-mono text-xs text-muted shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-foreground/90 font-medium tracking-tight">
        {PORTFOLIO_CONTENT.personal.statusText}
      </span>
    </div>
  );
}


