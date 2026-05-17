import type { HTMLAttributes, ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-brand font-semibold transition-colors disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-background hover:opacity-90',
        secondary:
          'border border-primary text-primary hover:bg-primary hover:text-background',
        ghost: 'text-foreground hover:text-primary',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> &
  HTMLAttributes<HTMLElement> & {
    /** When set, the button renders as an anchor. */
    href?: string;
    className?: string;
    children: ReactNode;
  };

/** Action / link button. Renders an `<a>` when `href` is set, else a `<button>`. */
export function Button({
  variant,
  size,
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
