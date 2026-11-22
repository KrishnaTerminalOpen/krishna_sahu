'use client';

import React, { useState } from 'react';
import { PORTFOLIO_CONTENT, SkillItem } from '@/data/content';
import { SectionHeader } from './SectionHeader';

export function SkillsMatrix() {
  const { skills } = PORTFOLIO_CONTENT;
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const filteredSkills = activeCategory === 'All'
    ? skills.items
    : skills.items.filter((item) => item.category === activeCategory);

  return (
    <section id="skills" className="py-20 border-b border-border scroll-mt-20">
      <SectionHeader
        number={skills.sectionNumber}
        title={skills.sectionTitle}
        description={skills.description}
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {skills.categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                isActive
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Clean Skill Pills Grid */}
      <div className="flex flex-wrap gap-2.5">
        {filteredSkills.map((skill) => {
          const isHovered = hoveredSkill?.name === skill.name;
          return (
            <div
              key={skill.name}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="relative group inline-block"
            >
              <div className="px-3.5 py-1.5 rounded-md border border-border bg-surface text-xs font-mono text-foreground/90 hover:border-accent hover:text-accent transition-colors cursor-default">
                <span>{skill.name}</span>
              </div>

              {/* Minimal floating tooltip on hover */}
              {isHovered && (
                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-52 p-2.5 rounded-lg border border-border bg-surface-elevated/95 backdrop-blur-md shadow-lg text-[11px] font-sans text-muted z-30 pointer-events-none animate-fade-in leading-relaxed">
                  <span className="font-mono text-[10px] text-accent uppercase block mb-0.5">
                    {skill.category}
                  </span>
                  {skill.context}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
