import { cva } from 'class-variance-authority';

/** Layout variants for the StatsGrid block. */
export const statsGridVariants = cva('', {
  variants: {
    variant: {
      tiles: 'grid grid-cols-2 gap-6 sm:grid-cols-3',
      inline: 'flex flex-wrap items-baseline gap-x-10 gap-y-4',
    },
  },
  defaultVariants: { variant: 'tiles' },
});
