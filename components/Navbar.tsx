'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navItems = PORTFOLIO_CONTENT.nav.items;


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-editorial mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center focus:outline-none"
        >
          <span
            className="text-xl tracking-tight text-foreground group-hover:text-accent transition-colors"
            style={{ fontFamily: 'var(--font-display), var(--font-serif)' }}
          >
            {PORTFOLIO_CONTENT.personal.name}
          </span>
        </a>


        {/* Right side: Navigation Items directly to the left of the Theme Toggle */}
        <div className="flex items-center gap-7">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-sm tracking-wider uppercase text-muted">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-foreground hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            className="p-1.5 rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-accent/40 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-neutral-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-1.5 rounded border border-border bg-surface text-muted"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-6 py-4 flex flex-col gap-3 font-mono text-sm tracking-wider text-muted animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
