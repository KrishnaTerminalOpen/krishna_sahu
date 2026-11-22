'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_CONTENT, ProjectItem } from '@/data/content';
import { SectionHeader } from './SectionHeader';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowUpRight, Github, ExternalLink, Sparkles, ArrowRight, Eye } from 'lucide-react';


export function ProjectsSection() {
  const { projects } = PORTFOLIO_CONTENT;
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects.sampleProjects
    : projects.sampleProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 border-b border-border scroll-mt-20">
      <SectionHeader
        number={projects.sectionNumber}
        title={projects.sectionTitle}
        description={projects.description}
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 font-mono text-xs">
        {projects.categories.map((cat) => {
          const isActive = activeCategory === cat;
          const count = cat === 'All'
            ? projects.sampleProjects.length
            : projects.sampleProjects.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-foreground text-background font-medium shadow-sm'
                  : 'text-muted hover:text-foreground bg-surface border border-border/70 hover:border-border'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] ${isActive ? 'text-background/70' : 'text-subtle'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Structured Editorial Engineering Dossiers */}
      <div className="space-y-8">
        {filteredProjects.map((project, idx) => (
          <article
            key={project.id}
            className="group rounded-2xl border border-border/70 bg-surface/80 hover:bg-surface p-7 sm:p-9 hover:border-accent/30 transition-all duration-300 shadow-sm"
          >
            {/* Top Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-muted">
                <span className="text-accent font-semibold tracking-wider">FIG. 0{idx + 1}</span>
                <span className="text-border">/</span>
                <span className="text-foreground/80 uppercase tracking-wider text-[11px] font-medium">
                  {project.category}
                </span>
                <span className="text-border">·</span>
                <span className="text-subtle">{project.year}</span>
              </div>

              {/* Engineered Metric Chip */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 font-mono text-xs text-accent">
                <Sparkles className="w-3 h-3 text-accent" />
                <span className="font-medium tracking-tight">{project.metric}</span>
              </div>
            </div>

            {/* Main Content Layout (Architectural Split Dossier) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (7 cols): Information, Architecture, Stack, and Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <h3
                    onClick={() => setSelectedCaseStudy(project)}
                    className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground font-normal tracking-tight group-hover:text-accent transition-colors cursor-pointer leading-tight flex items-baseline gap-2"
                  >
                    <span>{project.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent shrink-0" />
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-muted font-light leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Clean Architecture Pipeline Tag */}
                  {project.architecture && (
                    <div className="pt-1">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                        <span className="text-accent text-[11px] font-medium tracking-wider uppercase">
                          Architecture:
                        </span>
                        <span className="text-foreground/90 font-light">
                          {project.architecture}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tech Pills */}
                <div className="pt-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-subtle mb-2">
                    Production Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-surface-elevated/70 border border-border/60 font-mono text-[11px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(project)}
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-accent font-medium transition-colors group/link"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md border border-border/70 bg-surface hover:bg-surface-elevated text-muted hover:text-foreground hover:border-accent/40 transition-colors"
                        title="View Source Code"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md border border-border/70 bg-surface hover:bg-surface-elevated text-muted hover:text-foreground hover:border-accent/40 transition-colors"
                        title="Live Platform"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Embedded Architectural Viewport */}
              <div className="lg:col-span-5 w-full">
                <div
                  onClick={() => setSelectedCaseStudy(project)}
                  className="relative group/viewport cursor-pointer rounded-xl overflow-hidden border border-border/80 bg-[#0d0e12] shadow-sm hover:border-accent/50 transition-all duration-300"
                >
                  {/* Viewport Header Bar */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#14161c] border-b border-border/60 font-mono text-[10px] text-subtle">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-border" />
                      <span className="w-2 h-2 rounded-full bg-border" />
                      <span className="w-2 h-2 rounded-full bg-border" />
                    </div>
                    <span className="tracking-widest uppercase text-muted font-medium">SYSTEM VIEW</span>
                  </div>

                  {/* Image Container with Subtle Ambient Vignette */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0d0f]">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover/viewport:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-subtle font-mono text-xs">
                        [ SYSTEM PREVIEW ]
                      </div>
                    )}

                    {/* Gradient Overlay for Editorial Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Hover Inspect Pill */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/viewport:opacity-100 transition-opacity duration-200 bg-background/30 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-foreground font-mono text-xs border border-border/80 shadow-md">
                        <Eye className="w-3.5 h-3.5 text-accent" />
                        <span>Inspect Architecture</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-xs font-mono text-muted">
          No projects found in this category.
        </div>
      )}

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
}
