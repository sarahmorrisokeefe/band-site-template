import { describe, expect, it } from 'vitest';

import { headingVariants } from './heading';

describe('headingVariants', () => {
  it('uses the display font and a default size', () => {
    const result = headingVariants();
    expect(result).toContain('font-display');
    expect(result).toContain('text-2xl');
  });

  it('applies the xl size', () => {
    expect(headingVariants({ size: 'xl' })).toContain('text-6xl');
  });

  it('applies the primary tone', () => {
    expect(headingVariants({ tone: 'primary' })).toContain('text-primary');
  });
});
