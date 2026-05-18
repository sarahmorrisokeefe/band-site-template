import { cva } from 'class-variance-authority';

/**
 * Text-wordmark sizing for the `Brand` primitive's logo-less fallback.
 * No text colour is set — the wordmark inherits `currentColor` so it reads
 * correctly on both light sections and dark hero scrims.
 */
export const brandTextVariants = cva('font-display tracking-tight', {
  variants: {
    size: {
      sm: 'text-xl font-bold',
      md: 'text-4xl font-extrabold',
      lg: 'text-6xl font-black',
    },
  },
  defaultVariants: { size: 'md' },
});
