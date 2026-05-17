import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

export const sectionVariants = cva('w-full', {
  variants: {
    width: {
      narrow: 'mx-auto max-w-2xl px-6',
      default: 'mx-auto max-w-5xl px-6',
      wide: 'mx-auto max-w-7xl px-6',
      full: 'px-0',
    },
    tone: {
      default: 'bg-background text-foreground',
      muted: 'bg-foreground/[0.04] text-foreground',
      inverted: 'bg-foreground text-background',
    },
  },
  defaultVariants: { width: 'default', tone: 'default' },
});

type SectionProps = VariantProps<typeof sectionVariants> &
  HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
  };

/**
 * Page section wrapper. Vertical padding is density-aware — it reads the
 * `--brand-space-section` variable set by the theme.
 */
export function Section({
  width,
  tone,
  className,
  style,
  children,
  ...rest
}: SectionProps) {
  const padded: CSSProperties = {
    paddingBlock: 'var(--brand-space-section)',
    ...style,
  };
  return (
    <section
      className={cn(sectionVariants({ width, tone }), className)}
      style={padded}
      {...rest}
    >
      {children}
    </section>
  );
}
