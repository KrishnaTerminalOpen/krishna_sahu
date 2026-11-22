'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
import { useTheme } from './ThemeProvider';
import { 
  Search, 
  ArrowRight, 
  FileText, 
  Mail, 
  Sparkles, 
  Sun, 
  Moon, 
  X,
  Code,
  FolderGit2,
  Briefcase,
  Award
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiAssistant: () => void;
  onCopyEmail: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenAiAssistant,
  onCopyEmail,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally or passed
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const actions = [
    {
      id: 'ai-assistant',
      icon: Sparkles,
      title: 'Open AI Assistant',
      description: 'Ask questions about Krishna’s projects, skills & availability',
      category: 'Actions',
      run: () => {
        onClose();
        onOpenAiAssistant();
      },
    },
    {
      id: 'copy-email',
      icon: Mail,
      title: 'Copy Email Address',
      description: PORTFOLIO_CONTENT.personal.email,
      category: 'Actions',
      run: () => {
        onClose();
        onCopyEmail();
      },
    },
    {
      id: 'toggle-theme',
      icon: theme === 'dark' ? Sun : Moon,
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      description: 'Toggle visual theme palette',
      category: 'Actions',
      run: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'open-resume',
      icon: FileText,
      title: 'View Resume PDF',
      description: 'Open full academic & professional resume',
      category: 'Navigation',
      run: () => {
        window.open(PORTFOLIO_CONTENT.personal.resumePath, '_blank');
        onClose();
      },
    },
    {
      id: 'nav-about',
      icon: ArrowRight,
      title: '01 / About',
      description: 'Background, research philosophy, and core pillars',
      category: 'Navigation',
      run: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-skills',
      icon: Code,
      title: '02 / Skills Matrix',
      description: 'Programming, ML/AI, Analytics & Web capabilities',
      category: 'Navigation',
      run: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-projects',
      icon: FolderGit2,
      title: '03 / Selected Projects',
      description: 'Production ML models, sentiment NLP & analytics platforms',
      category: 'Navigation',
      run: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-experience',
      icon: Briefcase,
      title: '04 / Experience Timeline',
      description: 'Research lab internships and data science fellowship',
      category: 'Navigation',
      run: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-certifications',
      icon: Award,
      title: '05 / Certifications',
      description: 'DeepLearning.AI, GCP ML Engineer, and AWS credentials',
      category: 'Navigation',
      run: () => {
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-contact',
      icon: Mail,
      title: '07 / Contact',
      description: 'Send a message or connect directly',
      category: 'Navigation',
      run: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
  ];

  const filtered = actions.filter((act) => {
    const q = query.toLowerCase();
    return (
      act.title.toLowerCase().includes(q) ||
      act.description.toLowerCase().includes(q) ||
      act.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].run();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-background/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-border bg-surface shadow-2xl overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border">
          <Search className="w-4 h-4 text-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            type="button"
            className="text-muted hover:text-foreground text-xs font-mono ml-2 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border/40">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-muted">
              No matching commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={action.run}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                    isSelected
                      ? 'bg-accent/15 text-foreground'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-md ${
                        isSelected
                          ? 'bg-accent/20 text-accent'
                          : 'bg-surface-elevated text-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-[13px]">
                        {action.title}
                      </div>
                      <div className="text-[11px] text-muted font-sans font-light">
                        {action.description}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-subtle uppercase tracking-wider">
                    {action.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer hints */}
        <div className="px-4 py-2 border-t border-border bg-surface-elevated/40 flex items-center justify-between font-mono text-[11px] text-muted">
          <span>Navigate with ↑ / ↓</span>
          <span>Select with ↵</span>
          <span>Close with Esc</span>
        </div>
      </div>
    </div>
  );
}

