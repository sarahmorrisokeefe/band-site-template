import { cn } from '@/lib/cn';
import type { THEME_QUERY_RESULT } from '@/sanity.types';

import { BandLogo } from './band-logo';
import { brandTextVariants } from './brand-variants';
import { type LogoSize } from './pick-logo-variant';

type ThemeLogo = NonNullable<THEME_QUERY_RESULT>['logo'];

type BrandProps = {
  logo: ThemeLogo;
  name: string | null | undefined;
  size?: LogoSize;
  /** Semantic element for the text wordmark. Ignored when a logo is set. */
  as?: 'span' | 'h1' | 'h2';
  className?: string;
};

/**
 * Brand mark: renders the band's logo when one is set, otherwise the band
 * name as a styled text wordmark. This lets a band run a text-only identity
 * in the header, footer, or hero without supplying a logo asset. Shared by
 * `SiteHeader`, `SiteFooter`, and `Hero` so all three behave the same.
 */
export function Brand({
  logo,
  name,
  size = 'md',
  as: Tag = 'span',
  className,
}: BrandProps) {
  const label = name ?? 'Band';

  if (logo?.primary) {
    return (
      <BandLogo logo={logo} alt={label} size={size} className={className} />
    );
  }

  return (
    <Tag className={cn(brandTextVariants({ size }), className)}>{label}</Tag>
  );
}
