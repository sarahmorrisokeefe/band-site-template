import type { CSSProperties } from 'react';

import type { THEME_QUERY_RESULT } from '@/sanity.types';

const RADIUS_SCALE: Record<string, string> = {
  sharp: '0px',
  subtle: '6px',
  rounded: '16px',
};

const DENSITY_SCALE: Record<
  string,
  { section: string; block: string; gap: string }
> = {
  compact: { section: '2.5rem', block: '1.25rem', gap: '0.5rem' },
  normal: { section: '4rem', block: '2rem', gap: '1rem' },
  airy: { section: '6.5rem', block: '3rem', gap: '1.5rem' },
};

/**
 * Convert the `theme` query result into CSS custom properties for `<html>`.
 * Unset values fall back to the same defaults baked into `globals.css`.
 */
export function themeToCssVars(
  theme: THEME_QUERY_RESULT,
): CSSProperties & Record<string, string> {
  const vars: Record<string, string> = {};
  const colors = theme?.colors;

  if (colors?.primary?.hex) vars['--brand-primary'] = colors.primary.hex;
  if (colors?.accent?.hex) vars['--brand-accent'] = colors.accent.hex;
  if (colors?.background?.hex) {
    vars['--brand-background'] = colors.background.hex;
  }
  if (colors?.foreground?.hex) {
    vars['--brand-foreground'] = colors.foreground.hex;
  }

  vars['--brand-radius'] = RADIUS_SCALE[theme?.radius ?? 'subtle'] ?? '6px';

  const density = DENSITY_SCALE[theme?.density ?? 'normal'] ?? DENSITY_SCALE.normal;
  vars['--brand-space-section'] = density.section;
  vars['--brand-space-block'] = density.block;
  vars['--brand-gap'] = density.gap;

  return vars as CSSProperties & Record<string, string>;
}
