import { describe, expect, it } from 'vitest';

import { themeToCssVars } from './css-vars';

describe('themeToCssVars', () => {
  it('returns fallback radius and density vars when theme is null', () => {
    const vars = themeToCssVars(null);
    expect(vars['--brand-radius']).toBe('6px');
    expect(vars['--brand-space-section']).toBe('4rem');
  });

  it('maps a hex color onto the matching brand variable', () => {
    const vars = themeToCssVars({
      logo: null,
      colors: { primary: { hex: '#e1473d' } },
      radius: 'sharp',
      density: 'compact',
    } as never);
    expect(vars['--brand-primary']).toBe('#e1473d');
  });

  it('maps the radius enum to a pixel value', () => {
    const vars = themeToCssVars({ radius: 'rounded' } as never);
    expect(vars['--brand-radius']).toBe('16px');
  });

  it('maps the density enum to a spacing scale', () => {
    const vars = themeToCssVars({ density: 'airy' } as never);
    expect(vars['--brand-space-section']).toBe('6.5rem');
    expect(vars['--brand-gap']).toBe('1.5rem');
  });

  it('omits a color variable when its hex is missing', () => {
    const vars = themeToCssVars({ colors: {} } as never);
    expect(vars['--brand-primary']).toBeUndefined();
  });
});
