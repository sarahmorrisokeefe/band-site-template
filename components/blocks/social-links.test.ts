import { describe, expect, it } from 'vitest';

import { compactSocialLinks } from './social-links';

describe('compactSocialLinks', () => {
  it('returns an empty array for null or undefined', () => {
    expect(compactSocialLinks(null)).toEqual([]);
    expect(compactSocialLinks(undefined)).toEqual([]);
  });

  it('drops platforms whose URL is missing or empty', () => {
    const result = compactSocialLinks({
      instagram: 'https://instagram.com/band',
      tiktok: '',
      youtube: null,
      spotify: undefined,
    });
    expect(result).toEqual([['instagram', 'https://instagram.com/band']]);
  });

  it('keeps every platform that has a URL, in order', () => {
    const result = compactSocialLinks({
      instagram: 'https://instagram.com/band',
      spotify: 'https://open.spotify.com/artist/x',
    });
    expect(result).toEqual([
      ['instagram', 'https://instagram.com/band'],
      ['spotify', 'https://open.spotify.com/artist/x'],
    ]);
  });
});
