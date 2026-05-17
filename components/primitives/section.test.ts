import { describe, expect, it } from 'vitest';

import { sectionVariants } from './section';

describe('sectionVariants', () => {
  it('applies the default width and tone when no variants are given', () => {
    const result = sectionVariants();
    expect(result).toContain('max-w-5xl');
    expect(result).toContain('bg-background');
  });

  it('applies the narrow width', () => {
    expect(sectionVariants({ width: 'narrow' })).toContain('max-w-2xl');
  });

  it('applies the inverted tone', () => {
    const result = sectionVariants({ tone: 'inverted' });
    expect(result).toContain('bg-foreground');
    expect(result).toContain('text-background');
  });
});
