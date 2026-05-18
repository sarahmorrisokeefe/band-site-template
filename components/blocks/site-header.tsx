import { type VariantProps } from 'class-variance-authority';

import { BandLogo } from '@/components/primitives/band-logo';
import { cn } from '@/lib/cn';
import type { THEME_QUERY_RESULT } from '@/sanity.types';

import type { LinkItem } from './link-item';
import { siteHeaderVariants } from './site-header-variants';
import { SocialLinkList, type SocialLinks } from './social-links';

type ThemeLogo = NonNullable<THEME_QUERY_RESULT>['logo'];

/** Re-exported for callers that still import the type from this module. */
export type { SocialLinks };

type SiteHeaderProps = VariantProps<typeof siteHeaderVariants> & {
  logo: ThemeLogo;
  bandName: string;
  nav: LinkItem[];
  socialLinks?: SocialLinks;
  className?: string;
};

/**
 * Site header block: band logo, section navigation, and — on non-minimal
 * variants — social links. Nav items are supplied by the page.
 */
export function SiteHeader({
  variant,
  logo,
  bandName,
  nav,
  socialLinks,
  className,
}: SiteHeaderProps) {
  return (
    <header className={cn(siteHeaderVariants({ variant }), className)}>
      <BandLogo logo={logo} alt={bandName} size="sm" />

      <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm font-medium uppercase tracking-wide text-foreground hover:text-primary"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {variant !== 'minimal' ? <SocialLinkList links={socialLinks} /> : null}
    </header>
  );
}
