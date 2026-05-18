import { describe, expect, it } from 'vitest';

import { showStatusMeta } from './show-status';

describe('showStatusMeta', () => {
  it('labels an on-sale show', () => {
    expect(showStatusMeta('onSale').label).toBe('On Sale');
  });

  it('marks a sold-out show as soldOut', () => {
    expect(showStatusMeta('soldOut').soldOut).toBe(true);
  });

  it('does not mark a few-left show as soldOut', () => {
    expect(showStatusMeta('fewLeft').soldOut).toBe(false);
  });

  it('returns empty metadata for an unset status', () => {
    expect(showStatusMeta(null)).toEqual({
      label: '',
      badgeClass: '',
      soldOut: false,
    });
  });
});
