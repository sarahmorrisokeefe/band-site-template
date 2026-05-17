export type LogoSize = 'sm' | 'md' | 'lg';

/**
 * Decide which logo asset to render. The compact mark is only used at small
 * size, and only when the band actually provided one.
 */
export function pickLogoVariant(
  size: LogoSize,
  hasMark: boolean,
): 'primary' | 'mark' {
  return size === 'sm' && hasMark ? 'mark' : 'primary';
}
