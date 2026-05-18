import { describe, expect, it } from 'vitest';

import { brandTextVariants } from './brand-variants';

describe('brandTextVariants', () => {
  it('uses the medium size by default', () => {
    expect(brandTextVariants()).toContain('text-4xl');
  });

  it('renders a small wordmark for the sm size', () => {
    expect(brandTextVariants({ size: 'sm' })).toContain('text-xl');
  });

  it('renders a large wordmark for the lg size', () => {
    expect(brandTextVariants({ size: 'lg' })).toContain('text-6xl');
  });
});
