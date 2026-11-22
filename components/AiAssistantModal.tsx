'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
import { Sparkles, X, Send, RotateCcw, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiAssistantModal({ isOpen, onClose }: AiAssistantModalProps) {
  const { assistant } = PORTFOLIO_CONTENT;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      sender: 'assistant',
      text: assistant.greeting,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      const replyText = data?.reply || assistant.fallbackMessage;

      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Unable to communicate with the service right now. Please email Krishna directly!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'initial',
        sender: 'assistant',
        text: assistant.greeting,
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI Portfolio Assistant"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-background/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md h-[85vh] sm:h-[620px] rounded-t-2xl sm:rounded-2xl border border-border bg-surface shadow-2xl flex flex-col overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-elevated/70">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-accent/15 text-accent">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif text-base text-foreground font-medium">
                {assistant.name}
              </div>
              <div className="font-mono text-[11px] text-muted">
                {assistant.title} · Active
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              type="button"
              className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              aria-label="Close assistant panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-foreground text-background font-normal rounded-tr-none'
                    : 'bg-surface-elevated border border-border text-foreground/90 font-light rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted font-mono text-xs pl-8">
              <span className="animate-pulse">Thinking & searching portfolio data...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Question Chips */}
        <div className="px-4 py-2 border-t border-border/60 bg-surface-elevated/30 flex gap-2 overflow-x-auto no-scrollbar">
          {assistant.suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSend(q)}
              className="shrink-0 px-2.5 py-1 rounded-full border border-border bg-surface text-[11px] font-mono text-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 border-t border-border bg-surface flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Krishna's models, skills, experience..."
            className="flex-1 bg-surface-elevated px-3.5 py-2.5 rounded-lg border border-border text-xs sm:text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            type="button"
            className="p-2.5 rounded-lg bg-accent text-background hover:bg-accent-hover transition-colors disabled:opacity-40"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

