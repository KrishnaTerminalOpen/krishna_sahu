'use client';

import React from 'react';
import { PORTFOLIO_CONTENT, ProjectItem } from '@/data/portfolio';
import { X, ExternalLink, Github, Sparkles, AlertCircle, Cpu, CheckCircle2 } from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;
  const { labels } = PORTFOLIO_CONTENT.projects;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden my-8 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar with category & close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-elevated/40">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-border">·</span>
            <span className="font-mono text-xs text-muted">
              {project.year}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-md text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Title & Metric Chip */}
          <div>
            {project.metric?.trim() && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 font-mono text-xs text-accent mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.metric}</span>
              </div>
            )}
            <h3
              id="case-study-title"
              className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight leading-tight"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-muted text-base font-light leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Problem Statement */}
          {project.problem && (
            <div className="rounded-xl border border-border/80 bg-surface-elevated/50 p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>{labels.modalProblem}</span>
              </div>
              <p className="font-sans text-sm sm:text-base text-foreground/90 font-light leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {/* Technical Approach & Architecture */}
          {project.approach && (
            <div className="rounded-xl border border-border/80 bg-surface-elevated/50 p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
                <Cpu className="w-4 h-4" />
                <span>{labels.modalApproach}</span>
              </div>
              <p className="font-sans text-sm sm:text-base text-foreground/90 font-light leading-relaxed">
                {project.approach}
              </p>
            </div>
          )}

          {/* Results & Quantifiable Impact */}
          {project.results && (
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{labels.modalResults}</span>
              </div>
              <p className="font-sans text-sm sm:text-base text-foreground font-light leading-relaxed">
                {project.results}
              </p>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-subtle mb-3">
              {labels.modalTech}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md border border-border bg-surface text-xs font-mono text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-border bg-surface-elevated/50">
          <div className="flex items-center gap-3">
            {project.githubUrl?.trim() && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-foreground font-mono text-xs hover:border-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>{labels.modalSource}</span>
              </a>
            )}
            {project.liveUrl?.trim() && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-mono text-xs hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{labels.modalLive}</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            className="text-xs font-mono text-muted hover:text-foreground"
          >
            {labels.modalClose}
          </button>
        </div>
      </div>
    </div>
  );
}
