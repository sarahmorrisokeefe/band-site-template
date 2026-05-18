import { Hero, type HeroBand } from '@/components/blocks/hero';
import type { LinkItem } from '@/components/blocks/link-item';
import { SiteHeader } from '@/components/blocks/site-header';
import { getBand, getTheme } from '@/lib/sanity/queries';

/**
 * Phase 3 proof page: every SiteHeader and Hero variant on live data.
 * Phase 6 replaces this with the real composed homepage.
 */

const NAV: LinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Shows', href: '#shows' },
  { label: 'Music', href: '#music' },
];

const CTAS: LinkItem[] = [
  { label: 'Listen', href: '#music' },
  { label: 'Shows', href: '#shows' },
];

export default async function HomePage() {
  const [band, theme] = await Promise.all([getBand(), getTheme()]);

  const heroBand: HeroBand = {
    name: band?.name ?? null,
    tagline: band?.tagline ?? null,
    heroImage: band?.heroImage ?? null,
  };
  const logo = theme?.logo ?? null;

  return (
    <div className="flex flex-col">
      {(['standard', 'minimal', 'centered'] as const).map((variant) => (
        <section key={variant}>
          <p className="bg-foreground/5 px-6 py-1 text-xs uppercase tracking-widest text-muted">
            SiteHeader — {variant}
          </p>
          <SiteHeader
            variant={variant}
            logo={logo}
            bandName={band?.name ?? 'Band'}
            nav={NAV}
            socialLinks={band?.socialLinks}
          />
        </section>
      ))}

      {(['full-bleed', 'split', 'typographic'] as const).map((variant) => (
        <section key={variant}>
          <p className="bg-foreground/5 px-6 py-1 text-xs uppercase tracking-widest text-muted">
            Hero — {variant}
          </p>
          <Hero variant={variant} band={heroBand} logo={logo} ctas={CTAS} />
        </section>
      ))}
    </div>
  );
}
