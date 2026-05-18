import { cva } from 'class-variance-authority';

/** Layout variants for the SiteHeader block. */
export const siteHeaderVariants = cva('w-full px-6 py-4', {
  variants: {
    variant: {
      standard: 'flex items-center justify-between gap-6',
      minimal:
        'flex items-center justify-between gap-6 border-b border-foreground/10',
      centered: 'flex flex-col items-center gap-3 text-center',
    },
  },
  defaultVariants: { variant: 'standard' },
});
