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
    <div className="inline-flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 border border-border bg-surface/80 backdrop-blur-md px-3.5 py-2 rounded-full font-mono text-xs text-muted shadow-sm">
      {/* Live Availability Status */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-foreground/90 font-medium tracking-tight">
          {PORTFOLIO_CONTENT.personal.statusText}
        </span>
      </div>

      <span className="hidden sm:inline text-border">/</span>

      {/* Location */}
      <div className="flex items-center gap-1.5">
        <MapPin className="w-3 h-3 text-accent" />
        <span>{PORTFOLIO_CONTENT.personal.location}</span>
      </div>

      <span className="hidden sm:inline text-border">/</span>

      {/* Live Local Time */}
      <div className="flex items-center gap-1.5">
        <Clock className="w-3 h-3 text-muted" />
        <span suppressHydrationWarning className="tabular-nums font-mono text-foreground/80">
          {timeString || '12:00:00 PM'}
        </span>
      </div>
    </div>
  );
}

