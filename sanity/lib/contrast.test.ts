import { describe, expect, it } from 'vitest';

import { contrastRatio } from './contrast';

describe('contrastRatio', () => {
  it('returns 21 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  it('returns 1 for a color against itself', () => {
    expect(contrastRatio('#3366ff', '#3366ff')).toBeCloseTo(1, 5);
  });

  it('is order-independent', () => {
    expect(contrastRatio('#111111', '#eeeeee')).toBeCloseTo(
      contrastRatio('#eeeeee', '#111111'),
      5,
    );
  });

  it('flags a low-contrast pair as below 4.5', () => {
    expect(contrastRatio('#888888', '#999999')).toBeLessThan(4.5);
  });
});
