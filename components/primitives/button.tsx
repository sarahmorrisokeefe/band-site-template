import type { HTMLAttributes, ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-brand font-semibold transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
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
    /** Anchor target (only applied when `href` is set). */
    target?: string;
    /** Anchor rel (only applied when `href` is set). */
    rel?: string;
    /** Native button type. Defaults to `button` to avoid accidental form submits. */
    type?: 'button' | 'submit' | 'reset';
    /** Disabled state (only applied to the `<button>` form). */
    disabled?: boolean;
    className?: string;
    children: ReactNode;
  };

/** Action / link button. Renders an `<a>` when `href` is set, else a `<button>`. */
export function Button({
  variant,
  size,
  href,
  target,
  rel,
  type,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type ?? 'button'}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
