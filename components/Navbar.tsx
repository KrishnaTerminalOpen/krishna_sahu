'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';

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
    { label: 'Work', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#222227]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-8 py-7 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center focus:outline-none"
        >
          <span
            className="text-[28px] leading-none tracking-[-0.01em] text-[#F5F2EA] group-hover:text-[#E8A04C] transition-colors"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            {PORTFOLIO_CONTENT.personal.name}
          </span>
        </a>

        {/* Right side: Links + Contact pill + Theme toggle */}
        <div className="flex items-center gap-6 md:gap-9">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9 font-sans text-[14px] font-medium text-[#A1A1AA]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-[6px] hover:text-[#F5F2EA] transition-colors group"
              >
                <span>{item.label}</span>
                <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-[#E8A04C] transition-all duration-250 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Contact Pill */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#3A3A40] text-[14px] font-sans font-medium text-[#F5F2EA] hover:bg-[#F5F2EA] hover:text-[#0B0B0D] hover:border-[#F5F2EA] transition-colors"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-[14px] h-[14px]" strokeWidth={2.2} />
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            className="w-10 h-10 rounded-full border border-[#3A3A40] bg-[#121215] text-[#A1A1AA] hover:text-[#F5F2EA] hover:border-[#E8A04C] flex items-center justify-center transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#E8A04C]" />
            ) : (
              <Moon className="w-4 h-4 text-[#F5F2EA]" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden w-10 h-10 rounded-full border border-[#3A3A40] bg-[#121215] text-[#A1A1AA] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#222227] bg-[#0B0B0D]/95 backdrop-blur-md px-8 py-4 flex flex-col gap-3 font-sans text-[14px] font-medium text-[#A1A1AA] animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#F5F2EA] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-2 py-1.5 text-[#E8A04C]"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-[14px] h-[14px]" strokeWidth={2.2} />
          </a>
        </div>
      )}
    </header>
  );
}
