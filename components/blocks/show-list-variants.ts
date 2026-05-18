import { cva } from 'class-variance-authority';

/** Layout variants for the ShowList block. */
export const showListVariants = cva('', {
  variants: {
    variant: {
      list: 'flex flex-col divide-y divide-foreground/10',
      compact: 'flex flex-col divide-y divide-foreground/10',
      cards: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
    },
  },
  defaultVariants: { variant: 'list' },
});
