'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
import { HeroStatusStrip } from './HeroStatusStrip';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

interface HeroSectionProps {
  onOpenAiAssistant?: () => void;
}

export function HeroSection({ onOpenAiAssistant: _onOpenAiAssistant }: HeroSectionProps) {
  const { personal, hero } = PORTFOLIO_CONTENT;

  const socialButtons = [
    {
      label: hero.links.email,
      href: `mailto:${personal.email}`,
      icon: Mail,
    },
    {
      label: hero.links.github,
      href: personal.socials.github,
      icon: Github,
      external: true,
    },
    {
      label: hero.links.linkedin,
      href: personal.socials.linkedin,
      icon: Linkedin,
      external: true,
    },
  ];

  return (
    <section className="relative min-h-screen lg:min-h-[900px] overflow-hidden bg-[#0B0B0D] flex items-end border-b border-[#222227]">
      {/* Layer 1: Dot grid behind all content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#26262c 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.55,
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Amber radial glow */}
      <div
        className="absolute -top-[240px] -right-[180px] w-[720px] h-[720px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(closest-side, rgba(232,160,76,0.12), rgba(232,160,76,0))',
        }}
        aria-hidden="true"
      />

      {/* Content above both background layers */}
      <div className="relative z-[1] w-full max-w-[1200px] mx-auto px-8 pt-28 sm:pt-[72px] pb-24 sm:pb-[140px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.5fr] gap-16 items-end">
          {/* Left Column */}
          <div className="flex flex-col items-start gap-[28px]">
            {/* 1. Status Badge */}
            <HeroStatusStrip />

            {/* 2. Name (h1) */}
            <h1
              className="text-[64px] sm:text-[96px] lg:text-[128px] font-normal leading-[0.92] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              <span className="block text-[#F5F2EA]">Krishna</span>
              <span className="block text-[#E8A04C] italic">Sahu</span>
            </h1>

            {/* 3. Role Line */}
            <p className="font-mono text-[13px] sm:text-[15px] uppercase tracking-[0.06em] text-[#A1A1AA]">
              FULL-STACK DEVELOPER &middot; AI/ML IN PROGRESS &middot; BENGALURU
            </p>

            {/* 4. Paragraph */}
            <p className="max-w-[560px] font-sans text-[17px] sm:text-[19px] leading-[1.65] text-[#A1A1AA]">
              {personal.tagline}
            </p>

            {/* 5. Button Row */}
            <div className="flex flex-wrap items-center gap-[18px] mt-2">
              {/* a) Primary Explore Work */}
              <a
                href="#projects"
                className="group inline-flex items-center gap-4 py-2 pr-2 pl-7 rounded-full bg-[#E8A04C] text-[#14110C] font-sans text-[15px] font-semibold shadow-[0_10px_30px_rgba(232,160,76,0.25)] hover:bg-[#F0B36B] hover:shadow-[0_14px_36px_rgba(232,160,76,0.35)] transition-all duration-250"
              >
                <span>{hero.ctaLabel}</span>
                <span className="w-10 h-10 rounded-full bg-[#14110C] flex items-center justify-center transition-transform duration-250 group-hover:rotate-45">
                  <ArrowRight className="w-[18px] h-[18px] text-[#E8A04C]" />
                </span>
              </a>

              {/* b) Secondary Resume */}
              <a
                href={personal.resumePath}
                download={personal.resumeFileName}
                className="group inline-flex items-center gap-[14px] py-2 pl-2 pr-7 rounded-full border border-[#3A3A40] text-[#F5F2EA] font-sans text-[15px] font-medium hover:border-[#E8A04C] transition-all duration-250"
              >
                <span className="w-10 h-10 rounded-full bg-[#1C1C21] flex items-center justify-center transition-all duration-250 group-hover:bg-[#E8A04C] group-hover:translate-y-[2px]">
                  <Download className="w-[18px] h-[18px] text-[#E8A04C] group-hover:text-[#14110C] transition-colors" />
                </span>
                <span>{hero.links.resume}</span>
              </a>

              {/* c) Social Buttons */}
              <div className="flex flex-wrap items-center gap-[10px] sm:ml-3">
                {socialButtons.map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <a
                      key={btn.label}
                      href={btn.href}
                      target={btn.external ? '_blank' : undefined}
                      rel={btn.external ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center h-[46px] pl-4 pr-5 gap-[10px] rounded-full border border-[#2F2F35] bg-[#121215] text-[#E4E1D8] font-sans text-[14px] font-medium hover:border-[#E8A04C] hover:text-[#F5F2EA] transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[#E8A04C]" />
                      <span>{btn.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (0.5fr spacer matching grid specification) */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
