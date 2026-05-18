import { describe, expect, it } from 'vitest';

import { coverReelVariants } from './cover-reel-variants';

describe('coverReelVariants', () => {
  it('uses a scroll-snap carousel by default', () => {
    expect(coverReelVariants()).toContain('snap-x');
  });

  it('keeps the carousel variant horizontally scrollable', () => {
    expect(coverReelVariants({ variant: 'carousel' })).toContain('overflow-x-auto');
  });

  it('lays the grid variant out as a grid', () => {
    expect(coverReelVariants({ variant: 'grid' })).toContain('grid');
  });
});
