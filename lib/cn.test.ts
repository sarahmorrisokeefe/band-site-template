import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('drops falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('resolves conflicting Tailwind utilities so the last one wins', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('lets an incoming override beat a base class', () => {
    expect(cn('px-2 py-1 text-sm', 'px-6')).toBe('py-1 text-sm px-6');
  });
});
