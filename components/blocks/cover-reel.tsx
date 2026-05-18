import type { SanityImageSource } from '@sanity/image-url';
import { type VariantProps } from 'class-variance-authority';

import { Heading } from '@/components/primitives/heading';
import { SanityImage } from '@/components/primitives/sanity-image';
import { Section } from '@/components/primitives/section';
import { cn } from '@/lib/cn';
import type { COVERS_QUERY_RESULT } from '@/sanity.types';

import { coverReelVariants } from './cover-reel-variants';

/** A single cover, as returned by `getCovers()`. */
export type Cover = COVERS_QUERY_RESULT[number];

type CoverReelProps = VariantProps<typeof coverReelVariants> & {
  covers: COVERS_QUERY_RESULT;
  heading?: string;
  id?: string;
  className?: string;
};

/**
 * A cover's video as a clickable card: 16:9 art (or a placeholder) with a play
 * marker, the cover title, and the original artist. `fixedWidth` gives the card
 * a snap-aligned fixed width inside the carousel variant.
 */
function CoverCard({
  cover,
  fixedWidth,
}: {
  cover: Cover;
  fixedWidth: boolean;
}) {
  return (
    <a
      href={cover.videoUrl ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex flex-col gap-3',
        fixedWidth && 'w-64 shrink-0 snap-start',
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-brand bg-foreground/10">
        {cover.coverArt ? (
          <SanityImage
            image={cover.coverArt as SanityImageSource}
            alt={cover.title ?? 'Cover'}
            width={640}
            height={360}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 80vw"
            className="h-full w-full object-cover"
          />
        ) : null}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 text-lg text-foreground transition-transform group-hover:scale-110">
            ▶
          </span>
        </span>
      </div>
      <div>
        <Heading as="h3" size="sm">
          {cover.title ?? 'Untitled'}
        </Heading>
        {cover.originalArtist ? (
          <p className="text-sm text-muted">{cover.originalArtist}</p>
        ) : null}
      </div>
    </a>
  );
}

/**
 * CoverReel block — covers that have a video. `carousel` is a horizontal,
 * CSS scroll-snap row (no client JavaScript); `grid` wraps the cards. Covers
 * without a `videoUrl` are skipped — `Setlist` lists every cover. Renders
 * nothing when no cover has a video.
 */
export function CoverReel({
  variant,
  covers,
  heading = 'Covers',
  id,
  className,
}: CoverReelProps) {
  const playable = covers.filter((cover) => Boolean(cover.videoUrl));
  if (playable.length === 0) return null;
  const carousel = (variant ?? 'carousel') === 'carousel';

  return (
    <Section id={id} width="wide" className={className}>
      <Heading as="h2" size="lg" className="mb-8">
        {heading}
      </Heading>
      <div className={coverReelVariants({ variant })}>
        {playable.map((cover) => (
          <CoverCard key={cover._id} cover={cover} fixedWidth={carousel} />
        ))}
      </div>
    </Section>
  );
}
