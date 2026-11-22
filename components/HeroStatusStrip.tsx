'use client';

import React, { useEffect, useState } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
import { Clock, MapPin } from 'lucide-react';

export function HeroStatusStrip() {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: PORTFOLIO_CONTENT.personal.timezone || undefined,
        }).format(now);
        setTimeString(formatted);
      } catch {
        setTimeString(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 border border-border/80 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-full font-mono text-xs text-muted shadow-xs mb-6">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-foreground/90 font-medium tracking-tight text-[11px] sm:text-xs">
        {PORTFOLIO_CONTENT.personal.statusText}
      </span>

      {/* On mobile, also display location and time inside this badge */}
      <div className="sm:hidden flex items-center gap-2 pl-1 border-l border-border/70 text-[10px]">
        <span>{PORTFOLIO_CONTENT.personal.location}</span>
        <span className="text-border">·</span>
        <span suppressHydrationWarning className="tabular-nums text-foreground/80">
          {timeString || '12:00:00 PM'}
        </span>
      </div>
    </div>
  );

}


