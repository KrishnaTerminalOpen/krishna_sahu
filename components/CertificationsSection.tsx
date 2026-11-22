'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
import { SectionHeader } from './SectionHeader';
import { ArrowUpRight } from 'lucide-react';

export function CertificationsSection() {
  const { certifications } = PORTFOLIO_CONTENT;

  return (
    <section id="certifications" className="py-20 border-b border-border scroll-mt-20">
      <SectionHeader
        number={certifications.sectionNumber}
        title={certifications.sectionTitle}
      />

      <div className="divide-y divide-border">
        {certifications.items.map((cert, index) => (
          <div
            key={index}
            className="py-4 first:pt-0 last:pb-0 flex items-baseline justify-between gap-4"
          >
            <div className="space-y-0.5">
              <h4 className="font-serif text-lg sm:text-xl text-foreground font-normal">
                {cert.title}
              </h4>
              <div className="font-mono text-xs text-muted">
                {cert.issuer} &middot; {cert.date}
              </div>
            </div>

            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-foreground transition-colors shrink-0"
            >
              <span>Verify</span>
              <ArrowUpRight className="w-3 h-3 text-muted" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
