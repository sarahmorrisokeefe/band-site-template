import { cva } from 'class-variance-authority';

/** Layout variants for the MusicGrid block. */
export const musicGridVariants = cva('', {
  variants: {
    variant: {
      grid: 'grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4',
      featured: 'grid grid-cols-1 gap-10 sm:grid-cols-2',
    },
  },
  defaultVariants: { variant: 'grid' },
});
