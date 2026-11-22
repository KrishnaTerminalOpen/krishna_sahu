'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const { footer } = PORTFOLIO_CONTENT;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border mt-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
        {/* Left: Copyright & Name */}
        <div className="flex items-center gap-2">
          <span>&copy; {currentYear} {footer.copyrightName}.</span>
          <span className="text-subtle hidden md:inline">All rights reserved.</span>
        </div>

        {/* Center: Typography credits */}
        <div className="text-subtle text-[11px]">
          {footer.setIn}
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          type="button"
          className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors p-1"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}

