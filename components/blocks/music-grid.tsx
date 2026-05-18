import type { SanityImageSource } from '@sanity/image-url';
import { type VariantProps } from 'class-variance-authority';

import { Heading } from '@/components/primitives/heading';
import { SanityImage } from '@/components/primitives/sanity-image';
import { Section } from '@/components/primitives/section';
import { cn } from '@/lib/cn';
import { formatYear } from '@/lib/format-date';
import type { RELEASES_QUERY_RESULT } from '@/sanity.types';

import { musicGridVariants } from './music-grid-variants';
import { SocialLinkList } from './social-links';

/** A single original release, as returned by `getReleases()`. */
export type Release = RELEASES_QUERY_RESULT[number];

type MusicGridProps = VariantProps<typeof musicGridVariants> & {
  releases: RELEASES_QUERY_RESULT;
  heading?: string;
  id?: string;
  className?: string;
};

/** Human-readable labels for the release `kind` discriminator. */
const KIND_LABEL: Record<string, string> = {
  album: 'Album',
  ep: 'EP',
  single: 'Single',
  cover: 'Cover',
};

/**
 * One release: cover art (or a neutral placeholder), title, kind + year, the
 * streaming links, and — only on the featured variant — the release note.
 */
function ReleaseCard({
  release,
  featured,
}: {
  release: Release;
  featured: boolean;
}) {
  const year = formatYear(release.releaseDate);
  const kind = release.kind ? (KIND_LABEL[release.kind] ?? release.kind) : '';
  const meta = [kind, year].filter(Boolean).join(' · ');
  return (
    <article
      className={cn('flex gap-5', featured ? 'flex-row items-start' : 'flex-col')}
    >
      <div
        className={cn(
          'relative aspect-square overflow-hidden rounded-brand bg-foreground/5',
          featured ? 'w-40 shrink-0' : 'w-full',
        )}
      >
        {release.coverArt ? (
          <SanityImage
            image={release.coverArt as SanityImageSource}
            alt={release.title ?? 'Release'}
            width={700}
            height={700}
            sizes={featured ? '160px' : '(min-width: 1024px) 25vw, 50vw'}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <Heading as="h3" size="sm">
            {release.title ?? 'Untitled'}
          </Heading>
          {meta ? (
            <p className="text-sm uppercase tracking-wide text-muted">{meta}</p>
          ) : null}
        </div>
        {featured && release.note ? (
          <p className="text-sm text-muted">{release.note}</p>
        ) : null}
        <SocialLinkList links={release.links} />
      </div>
    </article>
  );
}

/**
 * MusicGrid block — original releases (albums, EPs, singles). `grid` shows
 * compact covers; `featured` shows larger entries with each release's note.
 * Renders nothing with no releases.
 */
export function MusicGrid({
  variant,
  releases,
  heading = 'Music',
  id,
  className,
}: MusicGridProps) {
  if (releases.length === 0) return null;
  const featured = (variant ?? 'grid') === 'featured';

  return (
    <Section id={id} width="wide" className={className}>
      <Heading as="h2" size="lg" className="mb-8">
        {heading}
      </Heading>
      <div className={musicGridVariants({ variant })}>
        {releases.map((release) => (
          <ReleaseCard key={release._id} release={release} featured={featured} />
        ))}
      </div>
    </Section>
  );
}
