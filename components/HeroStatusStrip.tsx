'use client';

import React, { useEffect, useState } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
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
    <div className="inline-flex items-center gap-1.5 sm:gap-2.5 font-mono text-[9px] sm:text-xs text-muted mb-6 whitespace-nowrap overflow-x-auto max-w-full no-scrollbar">
      <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
      </span>
      <span className="text-foreground/90 font-medium tracking-tight truncate">
        {/* Shorten slightly on ultra-small mobile screens to ensure strict 1-line fit */}
        <span className="xs:hidden sm:hidden">{PORTFOLIO_CONTENT.personal.mobileStatusText}</span>
        <span className="hidden xs:inline sm:inline">{PORTFOLIO_CONTENT.personal.statusText}</span>
      </span>

      {/* Location and Live IST Time */}
      <div className="flex items-center gap-1 sm:gap-2 pl-1.5 sm:pl-2 border-l border-border/70 text-[9px] sm:text-[11px] text-muted shrink-0">
        <div className="flex items-center gap-1">
          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent shrink-0" />
          <span>{PORTFOLIO_CONTENT.personal.location}</span>
        </div>
        <span className="text-border">/</span>
        <div className="flex items-center gap-1">
          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent shrink-0" />
          <span suppressHydrationWarning className="tabular-nums text-foreground/90">
            {timeString || PORTFOLIO_CONTENT.personal.defaultTimeFallback} {PORTFOLIO_CONTENT.personal.timezoneLabel}
          </span>
        </div>
      </div>
    </div>
  );

}


