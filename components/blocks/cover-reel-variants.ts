import { cva } from 'class-variance-authority';

/** Layout variants for the CoverReel block. */
export const coverReelVariants = cva('', {
  variants: {
    variant: {
      carousel: 'flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4',
      grid: 'grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4',
    },
  },
  defaultVariants: { variant: 'carousel' },
});
