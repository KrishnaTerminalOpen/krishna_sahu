'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
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


  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

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
          className="group flex items-baseline gap-1.5 focus:outline-none"
        >
          <span className="font-serif text-lg tracking-tight text-foreground group-hover:text-accent transition-colors">
            {PORTFOLIO_CONTENT.personal.name}
          </span>
          <span className="font-mono text-[10px] text-accent">/ ml</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 font-mono text-xs tracking-wider text-muted">
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

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Unique Editorial Theme Dial (Solar / Lunar Eclipse Dial) */}
          <button
            onClick={toggleTheme}
            type="button"
            className="group relative p-2 rounded-full border border-border/70 bg-surface hover:border-accent/50 hover:bg-surface-elevated transition-all duration-300"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Warm Editorial Light' : 'Switch to Dark Mode'}
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              {/* Outer orbit ring */}
              <span className="absolute inset-0 rounded-full border border-accent/40 group-hover:border-accent transition-colors animate-[spin_12s_linear_infinite]" />
              
              {/* Inner celestial core */}
              {theme === 'dark' ? (
                // Dark mode: Amber solar core with gentle pulse
                <span className="relative w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(228,168,83,0.6)] transition-all group-hover:scale-110" />
              ) : (
                // Light mode: Minimalist half-eclipse lunar disc
                <span className="relative w-2.5 h-2.5 rounded-full border border-foreground bg-foreground overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-surface translate-x-1 -translate-y-0.5 rounded-full" />
                </span>
              )}
            </div>
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
        <div className="md:hidden border-b border-border bg-surface px-6 py-4 flex flex-col gap-3 font-mono text-xs tracking-wider text-muted animate-fade-in">
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
