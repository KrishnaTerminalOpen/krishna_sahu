'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { CertificationsSection } from '@/components/CertificationsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { AiAssistantModal } from '@/components/AiAssistantModal';
import { AiAssistantTrigger } from '@/components/AiAssistantTrigger';
import type { AuraVoiceState } from '@/hooks/useAuraVoice';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
import { Check } from 'lucide-react';

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isAuraVoiceMode, setIsAuraVoiceMode] = useState(false);
  const [auraVoiceState, setAuraVoiceState] = useState<AuraVoiceState>('IDLE');
  const [auraInterruptSignal, setAuraInterruptSignal] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONTENT.personal.email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Full-bleed Hero Section */}
      <HeroSection
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* Main Container - Centered Single Editorial Column (Max 1100px) */}
      <main className="max-w-editorial mx-auto px-6 sm:px-8 lg:px-12">
        {/* 01 / About Section */}
        <AboutSection />

        {/* 02 / Skills Matrix */}
        <SkillsMatrix />

        {/* 03 / Selected Projects */}
        <ProjectsSection />

        {/* 04 / Experience Timeline */}
        <ExperienceTimeline />

        {/* 05 / Certifications */}
        <CertificationsSection />

        {/* 06 / Contact */}
        <ContactSection onCopyEmail={handleCopyEmail} />

        {/* Editorial Footer */}
        <Footer />
      </main>

      {/* Floating AI Assistant Trigger & Drawer */}
      <AiAssistantTrigger
        onOpen={() => {
          if (auraVoiceState === 'SPEAKING') {
            setAuraInterruptSignal((n) => n + 1);
          }
          setIsAiAssistantOpen(true);
        }}
        isVoiceMode={isAuraVoiceMode}
        voiceState={auraVoiceState}
      />
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onOpen={() => setIsAiAssistantOpen(true)}
        onClose={() => setIsAiAssistantOpen(false)}
        onVoiceStateChange={(active, state) => {
          setIsAuraVoiceMode(active);
          setAuraVoiceState(state);
        }}
        interruptSignal={auraInterruptSignal}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onCopyEmail={handleCopyEmail}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg border border-accent/40 bg-surface shadow-xl text-xs font-mono text-foreground animate-fade-in">
          <div className="p-1 rounded-full bg-accent/20 text-accent">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{PORTFOLIO_CONTENT.contact.copiedToast}</span>
        </div>
      )}
    </div>
  );
}

