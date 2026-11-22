'use client';

import React, { useState } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
import { SectionHeader } from './SectionHeader';
import { Copy, Check, ArrowUpRight, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onCopyEmail: () => void;
}

export function ContactSection({ onCopyEmail }: ContactSectionProps) {
  const { contact, personal } = PORTFOLIO_CONTENT;
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showDirectForm, setShowDirectForm] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    onCopyEmail();

    try {
      confetti({
        particleCount: 24,
        spread: 40,
        origin: { y: 0.85 },
        colors: ['#e4a853', '#ffffff'],
      });
    } catch {}

    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 border-b border-border scroll-mt-20">
      <SectionHeader
        number={contact.sectionNumber}
        title={contact.sectionTitle}
      />

      <div className="max-w-2xl space-y-6">
        <p className="font-serif text-2xl sm:text-3xl text-foreground font-light leading-snug">
          {contact.prompt}
        </p>

        {/* Large Clickable / Copyable Email */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={`mailto:${personal.email}`}
            className="font-serif text-2xl sm:text-3xl text-accent hover:underline underline-offset-8 transition-colors"
          >
            {personal.email}
          </a>

          <button
            onClick={handleCopyEmail}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border bg-surface text-xs font-mono text-muted hover:text-foreground hover:border-accent/40 transition-colors"
            title="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent" />
                <span className="text-accent">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links Row */}
        <div className="flex flex-wrap items-center gap-6 pt-4 font-mono text-xs text-muted">
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>GitHub &middot; @krishnasahu</span>
            <ArrowUpRight className="w-3 h-3 text-muted" />
          </a>

          <span className="text-border">/</span>

          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>LinkedIn &middot; krishna-sahu</span>
            <ArrowUpRight className="w-3 h-3 text-muted" />
          </a>

          <span className="text-border">/</span>

          <button
            onClick={() => setShowDirectForm(!showDirectForm)}
            type="button"
            className="text-subtle hover:text-accent transition-colors"
          >
            {showDirectForm ? "Hide form" : "Leave a note here →"}
          </button>
        </div>

        {/* Collapsible Clean Note Form */}
        {showDirectForm && (
          <div className="pt-6 border-t border-border mt-6">
            {sent ? (
              <div className="p-4 rounded-lg bg-surface border border-accent/30 text-xs font-mono text-accent animate-fade-in">
                Note received. Thank you! I will reply to {personal.email} soon.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-3 py-2 rounded-md border border-border bg-surface text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-md border border-border bg-surface text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message..."
                  className="w-full px-3 py-2 rounded-md border border-border bg-surface text-xs text-foreground focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-foreground text-background font-mono text-xs hover:opacity-90 transition-opacity"
                >
                  <Send className="w-3 h-3" />
                  <span>{isSending ? "Sending..." : "Send note"}</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
