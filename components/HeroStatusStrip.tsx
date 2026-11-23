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
    <div className="inline-flex flex-wrap items-center gap-2.5 border border-border/80 bg-surface/80 backdrop-blur-md px-3.5 py-1.5 rounded-full font-mono text-xs text-muted shadow-xs mb-6">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-foreground/90 font-medium tracking-tight text-[11px] sm:text-xs">
        {PORTFOLIO_CONTENT.personal.statusText}
      </span>

      {/* Location and Live IST Time */}
      <div className="flex items-center gap-2 pl-2 border-l border-border/70 text-[10px] sm:text-[11px] text-muted">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-accent shrink-0" />
          <span>{PORTFOLIO_CONTENT.personal.location}</span>
        </div>
        <span className="text-border">/</span>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-accent shrink-0" />
          <span suppressHydrationWarning className="tabular-nums text-foreground/90">
            {timeString || '12:00:00 PM'} IST
          </span>
        </div>
      </div>
    </div>
  );

}


