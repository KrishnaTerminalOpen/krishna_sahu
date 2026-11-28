'use client';

import React from 'react';
import { BotMessageSquare } from 'lucide-react';
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
        className="relative group w-11 h-11 rounded-full flex items-center justify-center border border-border bg-surface/95 backdrop-blur-md text-foreground/80 shadow-sm hover:border-accent hover:text-accent active:scale-95 transition-all duration-200"
      >
        <BotMessageSquare className="w-[19px] h-[19px]" strokeWidth={1.75} />

        {isVoiceMode && (
          <span
            className={`absolute top-0 right-0 flex ${
              isActivated ? 'h-3 w-3' : 'h-2.5 w-2.5'
            }`}
            title={isActivated ? 'Listening for your question...' : 'Voice mode active'}
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
        )}
      </button>
    </div>
  );
}

