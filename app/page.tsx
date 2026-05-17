import { BandLogo } from '@/components/primitives/band-logo';
import { Button } from '@/components/primitives/button';
import { Heading } from '@/components/primitives/heading';
import { Section } from '@/components/primitives/section';
import { RichText } from '@/components/rich-text/rich-text';
import { getBand, getTheme } from '@/lib/sanity/queries';

/**
 * Phase 1 proof page: every primitive rendered with the live brand theme.
 * Phase 6 replaces this with the real composed homepage.
 */
export default async function HomePage() {
  const [band, theme] = await Promise.all([getBand(), getTheme()]);

  return (
    <Section width="narrow" className="flex flex-col gap-8">
      {theme?.logo ? (
        <BandLogo logo={theme.logo} alt={band?.name ?? 'Band logo'} size="lg" />
      ) : null}

      <div className="flex flex-col gap-2">
        <Heading as="h1" size="xl">
          {band?.name ?? 'Band Site'}
        </Heading>
        <p className="text-sm uppercase tracking-wide text-muted">
          Phase 1 foundation — primitives on the live theme
        </p>
      </div>

      {band?.bio ? <RichText value={band.bio} /> : null}

      <div className="flex flex-wrap gap-3">
        <Button href="/studio">Open the Studio</Button>
        <Button variant="secondary" href="/studio">
          Edit content
        </Button>
        <Button variant="ghost" href="/studio">
          More
        </Button>
      </div>
    </Section>
  );
}
