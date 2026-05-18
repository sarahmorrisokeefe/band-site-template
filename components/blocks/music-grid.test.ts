import { describe, expect, it } from 'vitest';

import { musicGridVariants } from './music-grid-variants';

describe('musicGridVariants', () => {
  it('uses a compact grid by default', () => {
    expect(musicGridVariants()).toContain('lg:grid-cols-4');
  });

  it('lays the grid variant out in columns', () => {
    expect(musicGridVariants({ variant: 'grid' })).toContain('grid-cols-2');
  });

  it('gives the featured variant a two-column grid', () => {
    expect(musicGridVariants({ variant: 'featured' })).toContain(
      'sm:grid-cols-2',
    );
  });
});
