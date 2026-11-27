import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  heading?: string;
  description?: string;
  labelClassName?: string;
}

export function SectionHeader({
  number,
  title,
  heading,
  description,
  labelClassName = 'text-xs',
}: SectionHeaderProps) {
  return (
    <div className="mb-8 border-b border-border pb-4">
      <div className={`flex items-center gap-2 font-mono uppercase tracking-widest text-accent ${labelClassName}`}>
        <span>{number}</span>
        <span className="text-border">/</span>
        <span>{title}</span>
      </div>
      {heading && (
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight mt-2 max-w-2xl">
          {heading}
        </h2>
      )}
      {description && (
        <p className="mt-2 text-muted text-xs sm:text-sm max-w-xl font-light leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
