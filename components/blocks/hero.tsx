import type { SanityImageSource } from '@sanity/image-url';

import { BandLogo } from '@/components/primitives/band-logo';
import { Button } from '@/components/primitives/button';
import { Heading } from '@/components/primitives/heading';
import { SanityImage } from '@/components/primitives/sanity-image';
import { cn } from '@/lib/cn';
import type { BAND_QUERY_RESULT, THEME_QUERY_RESULT } from '@/sanity.types';

import type { LinkItem } from './link-item';

type HeroVariant = 'full-bleed' | 'split' | 'typographic';
type ThemeLogo = NonNullable<THEME_QUERY_RESULT>['logo'];

/** The band fields the hero renders. */
export type HeroBand = Pick<
  NonNullable<BAND_QUERY_RESULT>,
  'name' | 'tagline' | 'heroImage'
>;

type HeroProps = {
  variant?: HeroVariant;
  band: HeroBand;
  logo: ThemeLogo;
  ctas?: LinkItem[];
  className?: string;
};

/** Band logo, falling back to the band name as a heading when no logo is set. */
function HeroBrand({
  logo,
  name,
  size,
}: {
  logo: ThemeLogo;
  name: string | null;
  size: 'md' | 'lg';
}) {
  if (logo?.primary) {
    return <BandLogo logo={logo} alt={name ?? 'Band logo'} size={size} />;
  }
  return (
    <Heading as="h1" size={size === 'lg' ? 'xl' : 'lg'}>
      {name ?? 'Band'}
    </Heading>
  );
}

/** Call-to-action buttons; the first is primary, the rest secondary. */
function HeroCtas({ ctas }: { ctas: LinkItem[] }) {
  if (ctas.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {ctas.map((cta, index) => (
        <Button
          key={cta.href}
          href={cta.href}
          variant={index === 0 ? 'primary' : 'secondary'}
        >
          {cta.label}
        </Button>
      ))}
    </div>
  );
}

/**
 * Hero block. Three layout archetypes:
 * - `typographic` — no image; logo/name + tagline centred on the theme bg.
 * - `split` — image on one side, content panel on the other.
 * - `full-bleed` — image fills the section, content overlaid at the bottom.
 *
 * Note: in `full-bleed` the logo renders over a darkened image; a band whose
 * logo is dark may need a light logo variant. Deferred to a later polish pass.
 */
export function Hero({
  variant = 'full-bleed',
  band,
  logo,
  ctas = [],
  className,
}: HeroProps) {
  if (variant === 'typographic') {
    return (
      <section
        className={cn(
          'flex flex-col items-center justify-center gap-5 bg-background px-6 py-24 text-center',
          className,
        )}
      >
        <HeroBrand logo={logo} name={band.name} size="lg" />
        {band.tagline ? (
          <p className="max-w-2xl text-lg uppercase tracking-wide text-muted">
            {band.tagline}
          </p>
        ) : null}
        <HeroCtas ctas={ctas} />
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className={cn('grid md:grid-cols-2', className)}>
        <div className="relative min-h-72 bg-foreground/5">
          {band.heroImage ? (
            <SanityImage
              image={band.heroImage as SanityImageSource}
              alt={band.name ?? 'Band'}
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
              priority
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-center gap-5 px-8 py-16">
          <HeroBrand logo={logo} name={band.name} size="md" />
          {band.tagline ? (
            <p className="text-lg text-muted">{band.tagline}</p>
          ) : null}
          <HeroCtas ctas={ctas} />
        </div>
      </section>
    );
  }

  // full-bleed
  return (
    <section
      className={cn(
        'relative flex min-h-[28rem] flex-col justify-end overflow-hidden px-8 py-12',
        className,
      )}
    >
      {band.heroImage ? (
        <SanityImage
          image={band.heroImage as SanityImageSource}
          alt={band.name ?? 'Band'}
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
      ) : null}
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative flex flex-col gap-5 text-background">
        <HeroBrand logo={logo} name={band.name} size="lg" />
        {band.tagline ? (
          <p className="max-w-xl text-lg uppercase tracking-wide">
            {band.tagline}
          </p>
        ) : null}
        <HeroCtas ctas={ctas} />
      </div>
    </section>
  );
}
