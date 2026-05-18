import { describe, expect, it } from 'vitest';

import { showListVariants } from './show-list-variants';

describe('showListVariants', () => {
  it('uses a divided list layout by default', () => {
    expect(showListVariants()).toContain('divide-y');
  });

  it('keeps the compact variant a divided list', () => {
    expect(showListVariants({ variant: 'compact' })).toContain('divide-y');
  });

  it('lays the cards variant out as a grid', () => {
    expect(showListVariants({ variant: 'cards' })).toContain('grid');
  });
});
