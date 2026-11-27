'use client';

import React from 'react';
import type { AuraVoiceState } from '@/hooks/useAuraVoice';

interface AiAssistantTriggerProps {
  onOpen: () => void;
  isVoiceMode?: boolean;
  voiceState?: AuraVoiceState;
}

export function AiAssistantTrigger({
  onOpen,
  isVoiceMode = false,
  voiceState = 'IDLE',
}: AiAssistantTriggerProps) {
  const isActivated = isVoiceMode && voiceState === 'ACTIVATED';

  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button
        onClick={onOpen}
        type="button"
        title="Ask Aura"
        aria-label="Ask Aura — Open AI Assistant"
        className="relative group w-11 h-11 rounded-full flex items-center justify-center border border-accent/50 bg-surface/95 backdrop-blur-md shadow-[0_4px_18px_rgba(217,119,6,0.18)] hover:border-accent hover:scale-105 hover:shadow-[0_6px_24px_rgba(217,119,6,0.3)] active:scale-95 transition-all duration-300"
      >
        {/* Subtle inner aura ring & radial tint */}
        <span
          aria-hidden="true"
          className="absolute inset-1 rounded-full border border-accent/25 bg-accent/10 group-hover:bg-accent/15 group-hover:border-accent/45 transition-colors duration-300"
        />

        {/* Custom Aura sparkle emblem */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="relative w-5 h-5 text-accent group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
        >
          <path
            d="M12 3.25C12.55 8.15 15.85 11.45 20.75 12C15.85 12.55 12.55 15.85 12 20.75C11.45 15.85 8.15 12.55 3.25 12C8.15 11.45 11.45 8.15 12 3.25Z"
            fill="currentColor"
          />
          <circle cx="18.25" cy="5.75" r="1.25" fill="currentColor" opacity="0.8" />
        </svg>

        {/* Live / Voice status dot */}
        <span
          className={`absolute top-0 right-0 flex ${
            isActivated ? 'h-3 w-3' : 'h-2.5 w-2.5'
          }`}
          title={
            isActivated
              ? 'Listening for your question...'
              : isVoiceMode
                ? 'Voice mode active'
                : 'Aura online'
          }
          aria-hidden="true"
        >
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-accent ${
              isActivated ? 'opacity-100' : 'opacity-70'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full bg-accent ${
              isActivated
                ? 'h-3 w-3 ring-2 ring-accent/40'
                : 'h-2.5 w-2.5 ring-2 ring-surface'
            }`}
          />
        </span>
      </button>
    </div>
  );
}

