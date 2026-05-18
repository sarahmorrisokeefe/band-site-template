import { cva } from 'class-variance-authority';

/** Layout variants for the MemberGrid block. */
export const memberGridVariants = cva('', {
  variants: {
    variant: {
      grid: 'grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4',
      row: 'flex flex-wrap justify-center gap-8',
      featured: 'grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3',
    },
  },
  defaultVariants: { variant: 'grid' },
});
