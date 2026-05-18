import { describe, expect, it } from 'vitest';

import { siteHeaderVariants } from './site-header';

describe('siteHeaderVariants', () => {
  it('applies the standard variant by default', () => {
    expect(siteHeaderVariants()).toContain('justify-between');
  });

  it('applies a bottom border on the minimal variant', () => {
    expect(siteHeaderVariants({ variant: 'minimal' })).toContain('border-b');
  });

  it('stacks vertically on the centered variant', () => {
    expect(siteHeaderVariants({ variant: 'centered' })).toContain('flex-col');
  });
});
