'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type AuraVoiceState = 'IDLE' | 'ACTIVATED' | 'THINKING' | 'SPEAKING';

export const WAKE_WORD_VARIANTS = [
  'hey aura',
  'hey ora',
  'hey aurora',
  'hi aura',
  'okay aura',
  'a aura',
];

const ACTIVATED_TIMEOUT_MS = 6000;

interface SpeechRecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionResultListLike {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognitionLike, ev: Event) => unknown) | null;
  onresult: ((this: SpeechRecognitionLike, ev: SpeechRecognitionEventLike) => unknown) | null;
  onerror: ((this: SpeechRecognitionLike, ev: SpeechRecognitionErrorEventLike) => unknown) | null;
  onend: ((this: SpeechRecognitionLike, ev: Event) => unknown) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export interface UseAuraVoiceOptions {
  onQuestion: (question: string, options?: { isVoice?: boolean }) => Promise<string | null> | void;
  onOpenPanel?: () => void;
  onVoiceStateChange?: (isVoiceMode: boolean, voiceState: AuraVoiceState) => void;
  wakeVariants?: string[];
}

export interface UseAuraVoiceReturn {
  isSupported: boolean;
  isVoiceMode: boolean;
  voiceState: AuraVoiceState;
  permissionError: string | null;
  toggleVoiceMode: () => void;
  stopSpeaking: () => void;
}

/**
 * Strips markdown, links, code blocks, list markers, and emojis.
 * Caps spoken output to at most 2 sentences.
 */
export function cleanTextForSpeech(raw: string): string {
  if (!raw) return '';

  let cleaned = raw
    // Remove fenced code blocks
    .replace(/```[\s\S]*?```/g, ' ')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Replace markdown links [label](url) with label
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    // Remove bare URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove numbered list markers like "1. " or bullet markers "• "
    .replace(/(?:^|\n)\s*(?:\d+\.|[-*•])\s+/g, ' ')
    // Remove markdown headings, bold, italic, blockquotes
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>-]{1,3}/g, ' ')
    // Remove emojis and pictographs (ES5-safe surrogate pairs & dingbats)
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF\uFE00-\uFE0F]/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Speak at most the first 2 sentences
  const sentences = cleaned.match(/[^.!?]+[.!?]+(?:\s|$)/g);
  if (sentences && sentences.length > 2) {
    cleaned = sentences.slice(0, 2).join(' ').trim();
  }

  return cleaned;
}

/**
 * Plays a short chime via Web Audio API.
 * 'wake' = bright ascending two-tone; 'dismiss' = soft descending tone.
 */
function playChime(kind: 'wake' | 'dismiss') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const playTone = (freq: number, startOffset: number, duration: number, peak = 0.08) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + startOffset);

      gain.gain.setValueAtTime(0.001, now + startOffset);
      gain.gain.exponentialRampToValueAtTime(peak, now + startOffset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + startOffset);
      osc.stop(now + startOffset + duration);
    };

    if (kind === 'wake') {
      playTone(587.33, 0, 0.13); // D5
      playTone(880.0, 0.08, 0.16); // A5
    } else {
      playTone(523.25, 0, 0.12, 0.05); // C5
      playTone(392.0, 0.09, 0.16, 0.04); // G4
    }

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 450);
  } catch {
    // Ignore audio context errors on restricted devices
  }
}

function selectPreferredVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;

  const preferredExact = [
    'Google UK English Female',
    'Microsoft Aria Online (Natural)',
    'Microsoft Aria',
    'Microsoft Neerja',
    'Samantha',
    'Karen',
  ];

  for (const name of preferredExact) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) return match;
  }

  const isLikelyFemale = (v: SpeechSynthesisVoice) =>
    /female|aria|samantha|karen|neerja|veena|raveena|zira|victoria|kate|serena|hazel/i.test(v.name);

  return (
    voices.find((v) => v.lang === 'en-IN' && isLikelyFemale(v)) ||
    voices.find((v) => v.lang === 'en-US' && isLikelyFemale(v)) ||
    voices.find((v) => v.lang.startsWith('en') && isLikelyFemale(v)) ||
    voices.find((v) => v.lang === 'en-IN') ||
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang.startsWith('en')) ||
    voices[0]
  );
}

/**
 * Extracts wake phrase match and any trailing question from a transcript.
 */
function parseWakeTranscript(
  transcript: string,
  variants: string[]
): { matched: boolean; question: string } {
  const normalized = transcript.toLowerCase().replace(/[.,!?]+/g, ' ').replace(/\s+/g, ' ').trim();

  for (const variant of variants) {
    const idx = normalized.indexOf(variant);
    if (idx !== -1) {
      const after = normalized.slice(idx + variant.length).trim();
      return { matched: true, question: after };
    }
  }

  return { matched: false, question: '' };
}

export function useAuraVoice({
  onQuestion,
  onOpenPanel,
  onVoiceStateChange,
  wakeVariants = WAKE_WORD_VARIANTS,
}: UseAuraVoiceOptions): UseAuraVoiceReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceState, setVoiceState] = useState<AuraVoiceState>('IDLE');
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVoiceModeRef = useRef(false);
  const voiceStateRef = useRef<AuraVoiceState>('IDLE');
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const activatedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isStartingRef = useRef(false);

  const onQuestionRef = useRef(onQuestion);
  const onOpenPanelRef = useRef(onOpenPanel);
  const onVoiceStateChangeRef = useRef(onVoiceStateChange);
  const wakeVariantsRef = useRef(wakeVariants);

  onQuestionRef.current = onQuestion;
  onOpenPanelRef.current = onOpenPanel;
  onVoiceStateChangeRef.current = onVoiceStateChange;
  wakeVariantsRef.current = wakeVariants;

  const updateVoiceState = useCallback((nextState: AuraVoiceState) => {
    voiceStateRef.current = nextState;
    setVoiceState(nextState);
    onVoiceStateChangeRef.current?.(isVoiceModeRef.current, nextState);
  }, []);

  // Feature-detect Web Speech API & preload speechSynthesis voices
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const supported = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    setIsSupported(supported);

    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const list = window.speechSynthesis.getVoices();
        if (list.length) {
          voicesRef.current = list;
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        if (window.speechSynthesis.onvoiceschanged === loadVoices) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  const clearActivatedTimeout = useCallback(() => {
    if (activatedTimerRef.current) {
      clearTimeout(activatedTimerRef.current);
      activatedTimerRef.current = null;
    }
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
  }, []);

  const clearRestartTimeout = useCallback(() => {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  }, []);

  const stopRecognitionInstance = useCallback(() => {
    clearRestartTimeout();
    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.onend = null;
        rec.onresult = null;
        rec.onerror = null;
        rec.abort();
      } catch {
        // Ignore abort errors
      }
      recognitionRef.current = null;
    }
  }, [clearRestartTimeout]);

  const startRecognitionRef = useRef<(mode: 'IDLE' | 'ACTIVATED') => void>(() => {});

  const scheduleRecognitionStart = useCallback(
    (mode: 'IDLE' | 'ACTIVATED', delayMs = 150) => {
      if (!isVoiceModeRef.current || document.hidden) return;
      if (voiceStateRef.current !== mode) return;
      clearRestartTimeout();
      restartTimerRef.current = setTimeout(() => {
        if (isVoiceModeRef.current && voiceStateRef.current === mode && !document.hidden) {
          startRecognitionRef.current(mode);
        }
      }, delayMs);
    },
    [clearRestartTimeout]
  );

  const returnToIdle = useCallback(() => {
    clearActivatedTimeout();
    updateVoiceState('IDLE');
    if (isVoiceModeRef.current && !document.hidden) {
      scheduleRecognitionStart('IDLE');
    }
  }, [clearActivatedTimeout, scheduleRecognitionStart, updateVoiceState]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (voiceStateRef.current === 'SPEAKING' || voiceStateRef.current === 'THINKING') {
      returnToIdle();
    }
  }, [returnToIdle]);

  const disableVoiceMode = useCallback(() => {
    isVoiceModeRef.current = false;
    setIsVoiceMode(false);
    clearActivatedTimeout();
    stopRecognitionInstance();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    updateVoiceState('IDLE');
  }, [clearActivatedTimeout, stopRecognitionInstance, updateVoiceState]);

  const speakOnceAndReturnToIdle = useCallback(
    (rawText: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        returnToIdle();
        return;
      }

      const textToSpeak = cleanTextForSpeech(rawText);
      if (!textToSpeak) {
        returnToIdle();
        return;
      }

      // Abort recognition while speaking to prevent echo loops
      stopRecognitionInstance();
      updateVoiceState('SPEAKING');

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utteranceRef.current = utterance;
      const voices = voicesRef.current.length ? voicesRef.current : window.speechSynthesis.getVoices();
      const voice = selectPreferredVoice(voices);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = 'en-IN';
      }
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      let settled = false;
      const handleSpeechEnd = () => {
        if (settled) return;
        settled = true;
        utteranceRef.current = null;
        if (speechTimeoutRef.current) {
          clearTimeout(speechTimeoutRef.current);
          speechTimeoutRef.current = null;
        }
        if (!isVoiceModeRef.current) {
          updateVoiceState('IDLE');
          return;
        }
        // Always return to passive IDLE after speaking once
        returnToIdle();
      };

      utterance.onend = handleSpeechEnd;
      utterance.onerror = handleSpeechEnd;

      // Safety timeout in case browser speechSynthesis fails to emit onend
      speechTimeoutRef.current = setTimeout(
        handleSpeechEnd,
        Math.max(8000, textToSpeak.length * 120)
      );

      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.resume();
    },
    [returnToIdle, stopRecognitionInstance, updateVoiceState]
  );

  const askAndSpeakAnswer = useCallback(
    async (question: string) => {
      if (!question.trim()) {
        returnToIdle();
        return;
      }

      clearActivatedTimeout();
      stopRecognitionInstance();
      updateVoiceState('THINKING');
      onOpenPanelRef.current?.();

      const reply = await onQuestionRef.current(question.trim(), { isVoice: true });

      if (!isVoiceModeRef.current || voiceStateRef.current !== 'THINKING') {
        return;
      }

      if (typeof reply === 'string' && reply.trim()) {
        speakOnceAndReturnToIdle(reply);
      } else {
        returnToIdle();
      }
    },
    [clearActivatedTimeout, returnToIdle, speakOnceAndReturnToIdle, stopRecognitionInstance, updateVoiceState]
  );

  const beginActivatedListening = useCallback(() => {
    if (!isVoiceModeRef.current || document.hidden) return;

    updateVoiceState('ACTIVATED');
    clearActivatedTimeout();

    // 6-second silence timeout: play soft dismiss sound and return to IDLE
    activatedTimerRef.current = setTimeout(() => {
      if (voiceStateRef.current === 'ACTIVATED') {
        stopRecognitionInstance();
        playChime('dismiss');
        returnToIdle();
      }
    }, ACTIVATED_TIMEOUT_MS);

    scheduleRecognitionStart('ACTIVATED', 100);
  }, [clearActivatedTimeout, returnToIdle, scheduleRecognitionStart, stopRecognitionInstance, updateVoiceState]);

  const speakActivationPromptThenListen = useCallback(() => {
    stopRecognitionInstance();
    updateVoiceState('ACTIVATED');

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      beginActivatedListening();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance('Yes?');
    const voices = voicesRef.current.length ? voicesRef.current : window.speechSynthesis.getVoices();
    const voice = selectPreferredVoice(voices);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'en-IN';
    }
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const afterPrompt = () => {
      if (isVoiceModeRef.current && voiceStateRef.current === 'ACTIVATED') {
        beginActivatedListening();
      }
    };

    utterance.onend = afterPrompt;
    utterance.onerror = afterPrompt;

    window.speechSynthesis.speak(utterance);
  }, [beginActivatedListening, stopRecognitionInstance, updateVoiceState]);

  const startRecognition = useCallback(
    (mode: 'IDLE' | 'ACTIVATED') => {
      if (typeof window === 'undefined' || isStartingRef.current) return;
      if (!isVoiceModeRef.current || document.hidden) return;
      if (voiceStateRef.current !== mode) return;

      const RecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!RecognitionCtor) return;

      stopRecognitionInstance();
      isStartingRef.current = true;

      try {
        const recognition = new RecognitionCtor();
        recognition.continuous = mode === 'IDLE';
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onresult = (event: SpeechRecognitionEventLike) => {
          // Ignore any mic input during THINKING or SPEAKING
          if (voiceStateRef.current === 'THINKING' || voiceStateRef.current === 'SPEAKING') {
            return;
          }

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const transcript = result[0]?.transcript?.trim() || '';
            if (!transcript || !result.isFinal) continue;

            if (voiceStateRef.current === 'ACTIVATED') {
              clearActivatedTimeout();
              const parsed = parseWakeTranscript(transcript, wakeVariantsRef.current);
              const question = parsed.matched ? parsed.question : transcript;
              if (question.trim()) {
                void askAndSpeakAnswer(question.trim());
              } else {
                playChime('dismiss');
                returnToIdle();
              }
              return;
            }

            if (voiceStateRef.current === 'IDLE') {
              const { matched, question } = parseWakeTranscript(transcript, wakeVariantsRef.current);
              if (!matched) continue;

              if (question.trim().length > 0) {
                // "Hey Aura, <question>" in one sentence: skip "Yes?" step
                void askAndSpeakAnswer(question.trim());
              } else {
                // Only "Hey Aura": chime, open panel, speak "Yes?", then listen for 1 question
                playChime('wake');
                onOpenPanelRef.current?.();
                speakActivationPromptThenListen();
              }
              return;
            }
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
          const err = event.error;
          if (err === 'not-allowed' || err === 'service-not-allowed') {
            setPermissionError('Microphone access is blocked. Enable it in your browser settings.');
            disableVoiceMode();
            return;
          }

          if (err === 'language-not-supported' && recognition.lang !== 'en-US') {
            recognition.lang = 'en-US';
          }
        };

        recognition.onend = () => {
          recognitionRef.current = null;
          if (!isVoiceModeRef.current || document.hidden) return;

          // Auto-restart while in IDLE (recoverable errors or browser timeout)
          if (voiceStateRef.current === 'IDLE') {
            scheduleRecognitionStart('IDLE');
          } else if (voiceStateRef.current === 'ACTIVATED') {
            // If user didn't speak yet before silence timeout, keep listening until 6s timeout fires
            scheduleRecognitionStart('ACTIVATED', 100);
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch {
        setPermissionError('Microphone access is blocked. Enable it in your browser settings.');
        disableVoiceMode();
      } finally {
        isStartingRef.current = false;
      }
    },
    [
      askAndSpeakAnswer,
      clearActivatedTimeout,
      disableVoiceMode,
      returnToIdle,
      scheduleRecognitionStart,
      speakActivationPromptThenListen,
      stopRecognitionInstance,
    ]
  );

  startRecognitionRef.current = startRecognition;

  const toggleVoiceMode = useCallback(() => {
    if (!isSupported) return;

    // Clicking mic toggle while Aura is speaking cancels speech and returns to IDLE
    if (isVoiceModeRef.current && voiceStateRef.current === 'SPEAKING') {
      stopSpeaking();
      return;
    }

    if (isVoiceModeRef.current) {
      disableVoiceMode();
      return;
    }

    setPermissionError(null);
    isVoiceModeRef.current = true;
    setIsVoiceMode(true);
    updateVoiceState('IDLE');
    startRecognition('IDLE');
  }, [disableVoiceMode, isSupported, startRecognition, stopSpeaking, updateVoiceState]);

  // Press Escape to cancel speech and return to IDLE
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && voiceStateRef.current === 'SPEAKING') {
        stopSpeaking();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stopSpeaking]);

  // Stop recognition and cancel speech when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearActivatedTimeout();
        stopRecognitionInstance();
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        if (isVoiceModeRef.current) {
          updateVoiceState('IDLE');
        }
      } else if (isVoiceModeRef.current && voiceStateRef.current === 'IDLE') {
        scheduleRecognitionStart('IDLE');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [clearActivatedTimeout, scheduleRecognitionStart, stopRecognitionInstance, updateVoiceState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isVoiceModeRef.current = false;
      clearActivatedTimeout();
      clearRestartTimeout();
      stopRecognitionInstance();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [clearActivatedTimeout, clearRestartTimeout, stopRecognitionInstance]);

  return {
    isSupported,
    isVoiceMode,
    voiceState,
    permissionError,
    toggleVoiceMode,
    stopSpeaking,
  };
}
