import { describe, expect, it } from 'vitest';

import { resolveDeliveryMode } from './delivery-mode';

describe('resolveDeliveryMode', () => {
  it('accepts "sanity"', () => {
    expect(resolveDeliveryMode('sanity')).toBe('sanity');
  });

  it('accepts "email"', () => {
    expect(resolveDeliveryMode('email')).toBe('email');
  });

  it('throws on an unrecognised value', () => {
    expect(() => resolveDeliveryMode('postcard')).toThrow();
  });

  it('throws when the value is undefined', () => {
    expect(() => resolveDeliveryMode(undefined)).toThrow();
  });
});
