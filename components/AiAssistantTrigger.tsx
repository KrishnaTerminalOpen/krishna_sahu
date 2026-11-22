'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiAssistantTriggerProps {
  onOpen: () => void;
}

export function AiAssistantTrigger({ onOpen }: AiAssistantTriggerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button
        onClick={onOpen}
        type="button"
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-accent/40 bg-surface/90 backdrop-blur-md shadow-lg hover:border-accent hover:shadow-xl hover:bg-surface transition-all duration-300"
        aria-label="Open AI Assistant"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>

        <span className="p-1 rounded-full bg-accent/15 text-accent group-hover:scale-110 transition-transform">
          <Sparkles className="w-3.5 h-3.5" />
        </span>

        <span className="font-mono text-xs font-medium text-foreground tracking-tight">
          Ask Aura
        </span>
      </button>
    </div>
  );
}

