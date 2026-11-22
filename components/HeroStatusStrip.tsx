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
    <div className="sm:hidden flex items-center gap-3 font-mono text-xs text-muted mb-4">
      <div className="flex items-center gap-1.5 text-[11px]">
        <MapPin className="w-3 h-3 text-accent" />
        <span>{PORTFOLIO_CONTENT.personal.location}</span>
      </div>

      <span className="text-border">·</span>

      <div className="flex items-center gap-1.5 text-[11px]">
        <Clock className="w-3 h-3 text-muted" />
        <span suppressHydrationWarning className="tabular-nums text-foreground/80">
          {timeString || '12:00:00 PM'}
        </span>
      </div>
    </div>
  );
}


