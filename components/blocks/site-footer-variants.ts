import { cva } from 'class-variance-authority';

/** Layout variants for the SiteFooter block. */
export const siteFooterVariants = cva(
  'w-full border-t border-foreground/10 px-6',
  {
    variants: {
      variant: {
        columns: 'flex flex-col gap-10 md:flex-row md:justify-between',
        stacked: 'flex flex-col items-center gap-6 text-center',
      },
    },
    defaultVariants: { variant: 'columns' },
  },
);
