import { describe, expect, it } from 'vitest';

import { setlistVariants } from './setlist-variants';

describe('setlistVariants', () => {
  it('uses a single-column numbered list by default', () => {
    expect(setlistVariants()).toContain('flex-col');
  });

  it('keeps the numbered variant a flex column', () => {
    expect(setlistVariants({ variant: 'numbered' })).toContain('flex-col');
  });

  it('flows the columns variant into CSS columns', () => {
    expect(setlistVariants({ variant: 'columns' })).toContain('columns-1');
  });
});
