import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const Section = ({ id, className = '', children, ...props }: SectionProps) => {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 md:py-36 border-t border-subtle bg-background ${className}`}
      {...props}
    >
      {/* Blueprint Grid Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[1.2%] bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[32px_32px]" />
      {children}
    </section>
  );
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Container = ({ className = '', children, ...props }: ContainerProps) => {
  return (
    <div
      className={`container mx-auto max-w-7xl px-6 relative z-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
