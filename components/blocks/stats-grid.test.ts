import { describe, expect, it } from 'vitest';

import { statsGridVariants } from './stats-grid-variants';

describe('statsGridVariants', () => {
  it('uses the tiles grid layout by default', () => {
    expect(statsGridVariants()).toContain('grid');
  });

  it('lays the tiles variant out in a grid', () => {
    expect(statsGridVariants({ variant: 'tiles' })).toContain('sm:grid-cols-3');
  });

  it('lays the inline variant out as a flex row', () => {
    expect(statsGridVariants({ variant: 'inline' })).toContain('flex-wrap');
  });
});
