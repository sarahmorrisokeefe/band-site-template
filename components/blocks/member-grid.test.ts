import { describe, expect, it } from 'vitest';

import { memberGridVariants } from './member-grid-variants';

describe('memberGridVariants', () => {
  it('uses a grid layout by default', () => {
    expect(memberGridVariants()).toContain('grid-cols-2');
  });

  it('lays the row variant out as a flex row', () => {
    expect(memberGridVariants({ variant: 'row' })).toContain('flex-wrap');
  });

  it('gives the featured variant its own grid', () => {
    expect(memberGridVariants({ variant: 'featured' })).toContain(
      'lg:grid-cols-3',
    );
  });
});
