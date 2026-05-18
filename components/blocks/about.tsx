import { Heading } from '@/components/primitives/heading';
import { Section } from '@/components/primitives/section';
import { RichText } from '@/components/rich-text/rich-text';
import type { BAND_QUERY_RESULT } from '@/sanity.types';

import { StatsGrid, type Stat } from './stats-grid';

/** The band biography, as a Sanity Portable Text array. */
export type AboutBio = NonNullable<BAND_QUERY_RESULT>['bio'];

type AboutVariant = 'text-only' | 'text-stats';

type AboutProps = {
  variant?: AboutVariant;
  heading?: string;
  bio: AboutBio;
  stats?: Stat[] | null;
  id?: string;
  className?: string;
};

/**
 * About block. `text-only` renders the biography in a single column;
 * `text-stats` places the biography beside a StatsGrid, which it composes
 * rather than re-implementing. Renders nothing when there is no content.
 */
export function About({
  variant = 'text-only',
  heading = 'About',
  bio,
  stats,
  id,
  className,
}: AboutProps) {
  const hasBio = Boolean(bio && bio.length > 0);
  const hasStats = Boolean(stats && stats.length > 0);
  if (!hasBio && !hasStats) return null;

  return (
    <Section id={id} width="default" className={className}>
      <Heading as="h2" size="lg" className="mb-6">
        {heading}
      </Heading>
      {variant === 'text-stats' ? (
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          <div>
            <RichText value={bio} />
          </div>
          <StatsGrid variant="tiles" stats={stats} />
        </div>
      ) : (
        <div className="max-w-2xl">
          <RichText value={bio} />
        </div>
      )}
    </Section>
  );
}
