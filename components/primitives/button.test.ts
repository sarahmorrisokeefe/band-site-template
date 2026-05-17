import { describe, expect, it } from 'vitest';

import { buttonVariants } from './button';

describe('buttonVariants', () => {
  it('applies the primary variant and md size by default', () => {
    const result = buttonVariants();
    expect(result).toContain('bg-primary');
    expect(result).toContain('text-sm');
  });

  it('applies the ghost variant', () => {
    expect(buttonVariants({ variant: 'ghost' })).toContain('text-foreground');
  });

  it('applies the lg size', () => {
    expect(buttonVariants({ size: 'lg' })).toContain('px-6');
  });

  it('always includes the brand radius', () => {
    expect(buttonVariants()).toContain('rounded-brand');
  });
});
