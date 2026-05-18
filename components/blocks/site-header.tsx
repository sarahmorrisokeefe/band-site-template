import { type VariantProps, cva } from 'class-variance-authority';

import { BandLogo } from '@/components/primitives/band-logo';
import { cn } from '@/lib/cn';
import type { THEME_QUERY_RESULT } from '@/sanity.types';

import type { LinkItem } from './link-item';

export const siteHeaderVariants = cva('w-full px-6 py-4', {
  variants: {
    variant: {
      standard: 'flex items-center justify-between gap-6',
      minimal:
        'flex items-center justify-between gap-6 border-b border-foreground/10',
      centered: 'flex flex-col items-center gap-3 text-center',
    },
  },
  defaultVariants: { variant: 'standard' },
});

type ThemeLogo = NonNullable<THEME_QUERY_RESULT>['logo'];

/** Social profile URLs keyed by platform; falsy entries are skipped. */
export type SocialLinks =
  | Record<string, string | null | undefined>
  | null
  | undefined;

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
  const socials: Array<[string, string]> = socialLinks
    ? Object.entries(socialLinks).filter(
        (entry): entry is [string, string] => Boolean(entry[1]),
      )
    : [];

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

      {variant !== 'minimal' && socials.length > 0 ? (
        <div className="flex items-center gap-3">
          {socials.map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wide text-muted hover:text-primary"
            >
              {platform}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
