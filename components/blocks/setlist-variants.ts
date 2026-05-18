import { cva } from 'class-variance-authority';

/** Layout variants for the Setlist block. */
export const setlistVariants = cva('', {
  variants: {
    variant: {
      numbered: 'flex flex-col gap-2',
      columns: 'columns-1 gap-x-12 sm:columns-2 lg:columns-3',
    },
  },
  defaultVariants: { variant: 'numbered' },
});
