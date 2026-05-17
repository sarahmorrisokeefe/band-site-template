import { describe, expect, it } from 'vitest';

import { pickLogoVariant } from './pick-logo-variant';

describe('pickLogoVariant', () => {
  it('uses the mark at small size when a mark exists', () => {
    expect(pickLogoVariant('sm', true)).toBe('mark');
  });

  it('falls back to the wordmark at small size when no mark exists', () => {
    expect(pickLogoVariant('sm', false)).toBe('primary');
  });

  it('uses the wordmark at md and lg sizes even when a mark exists', () => {
    expect(pickLogoVariant('md', true)).toBe('primary');
    expect(pickLogoVariant('lg', true)).toBe('primary');
  });
});
