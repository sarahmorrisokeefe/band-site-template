import type { HTMLAttributes, ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

export const headingVariants = cva('font-display tracking-tight', {
  variants: {
    size: {
      sm: 'text-lg font-semibold',
      md: 'text-2xl font-bold',
      lg: 'text-4xl font-extrabold',
      xl: 'text-6xl font-black',
    },
    tone: {
      default: 'text-foreground',
      primary: 'text-primary',
      muted: 'text-muted',
    },
  },
  defaultVariants: { size: 'md', tone: 'default' },
});

type HeadingProps = VariantProps<typeof headingVariants> &
  HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: ReactNode;
  };

/** Heading whose semantic tag (`as`) is decoupled from its visual `size`. */
export function Heading({
  as: Tag = 'h2',
  size,
  tone,
  className,
  children,
  ...rest
}: HeadingProps) {
  return (
    <Tag className={cn(headingVariants({ size, tone }), className)} {...rest}>
      {children}
    </Tag>
  );
}
