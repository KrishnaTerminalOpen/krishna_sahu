'use client';

import React, { useEffect, useState } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';

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
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#2A2A30] bg-[#121215]/90 font-mono text-[11px] sm:text-[12.5px] text-[#C9C6BD] whitespace-nowrap max-w-full overflow-x-auto no-scrollbar">
      <span
        className="w-2 h-2 rounded-full bg-[#34D399] shrink-0"
        style={{ boxShadow: '0 0 0 4px rgba(52,211,153,0.18)' }}
        aria-hidden="true"
      />
      <span className="truncate">
        <span className="sm:hidden">{PORTFOLIO_CONTENT.personal.mobileStatusText}</span>
        <span className="hidden sm:inline">{PORTFOLIO_CONTENT.personal.statusText}</span>
      </span>

      <span className="text-[#3A3A40]" aria-hidden="true">|</span>

      <span className="text-[#A1A1AA] shrink-0">
        {PORTFOLIO_CONTENT.personal.location}
      </span>

      <span className="text-[#3A3A40]" aria-hidden="true">/</span>

      <span suppressHydrationWarning className="tabular-nums text-[#E4E1D8] shrink-0">
        {timeString || PORTFOLIO_CONTENT.personal.defaultTimeFallback} {PORTFOLIO_CONTENT.personal.timezoneLabel}
      </span>
    </div>
  );
}
