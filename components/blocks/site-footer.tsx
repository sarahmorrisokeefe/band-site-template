import { type VariantProps } from 'class-variance-authority';

import { BandLogo } from '@/components/primitives/band-logo';
import { cn } from '@/lib/cn';
import type { THEME_QUERY_RESULT } from '@/sanity.types';

import type { LinkItem } from './link-item';
import { siteFooterVariants } from './site-footer-variants';
import { SocialLinkList, type SocialLinks } from './social-links';

type ThemeLogo = NonNullable<THEME_QUERY_RESULT>['logo'];

type SiteFooterProps = VariantProps<typeof siteFooterVariants> & {
  logo: ThemeLogo;
  bandName: string;
  nav: LinkItem[];
  socialLinks?: SocialLinks;
  className?: string;
};

/**
 * SiteFooter block: band logo, copyright, section navigation, and social
 * links. Nav items are supplied by the page, mirroring SiteHeader. The
 * mailing-list signup is a form and is added to this block in Phase 5.
 */
export function SiteFooter({
  variant,
  logo,
  bandName,
  nav,
  socialLinks,
  className,
}: SiteFooterProps) {
  const year = new Date().getUTCFullYear();

  return (
    <footer
      className={cn(siteFooterVariants({ variant }), className)}
      style={{ paddingBlock: 'var(--brand-space-section)' }}
    >
      <div className="flex flex-col gap-4">
        <BandLogo logo={logo} alt={bandName} size="sm" />
        <p className="text-xs text-muted">
          © {year} {bandName}
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm uppercase tracking-wide text-foreground hover:text-primary"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <SocialLinkList links={socialLinks} />
    </footer>
  );
}
