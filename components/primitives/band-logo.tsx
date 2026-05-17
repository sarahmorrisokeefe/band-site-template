import type { SanityImageSource } from '@sanity/image-url';

import { cn } from '@/lib/cn';
import type { THEME_QUERY_RESULT } from '@/sanity.types';

import { type LogoSize, pickLogoVariant } from './pick-logo-variant';
import { SanityImage } from './sanity-image';

type ThemeLogo = NonNullable<THEME_QUERY_RESULT>['logo'];

const SIZE_PX: Record<LogoSize, number> = { sm: 32, md: 64, lg: 120 };

type BandLogoProps = {
  logo: ThemeLogo;
  alt: string;
  size?: LogoSize;
  className?: string;
};

/**
 * Render the band logo. Picks the compact `mark` at small size when one is
 * available, otherwise the `primary` wordmark. Renders nothing if no logo set.
 */
export function BandLogo({ logo, alt, size = 'md', className }: BandLogoProps) {
  if (!logo?.primary) return null;

  const which = pickLogoVariant(size, Boolean(logo.mark));
  const source = which === 'mark' && logo.mark ? logo.mark : logo.primary;
  const px = SIZE_PX[size];

  // The generated Sanity image type has an optional `asset`; cast to the
  // image-url source type, which `urlFor` accepts.
  return (
    <SanityImage
      image={source as SanityImageSource}
      alt={alt}
      width={px}
      height={px}
      className={cn('object-contain', className)}
    />
  );
}
