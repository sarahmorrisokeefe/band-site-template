import { describe, expect, it } from 'vitest';

import { siteFooterVariants } from './site-footer-variants';

describe('siteFooterVariants', () => {
  it('applies a top border on every variant', () => {
    expect(siteFooterVariants()).toContain('border-t');
  });

  it('lays the columns variant out as a row on desktop', () => {
    expect(siteFooterVariants({ variant: 'columns' })).toContain('md:flex-row');
  });

  it('centres the stacked variant', () => {
    expect(siteFooterVariants({ variant: 'stacked' })).toContain('text-center');
  });
});
