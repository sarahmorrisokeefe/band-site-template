import { type VariantProps } from 'class-variance-authority';

import { Heading } from '@/components/primitives/heading';
import { Section } from '@/components/primitives/section';
import { cn } from '@/lib/cn';
import type { COVERS_QUERY_RESULT } from '@/sanity.types';

import { setlistVariants } from './setlist-variants';

type SetlistProps = VariantProps<typeof setlistVariants> & {
  covers: COVERS_QUERY_RESULT;
  heading?: string;
  id?: string;
  className?: string;
};

/** One cover line: position (numbered variant only), title, and original artist. */
function SetlistItem({
  title,
  artist,
  position,
  numbered,
}: {
  title: string;
  artist: string | null;
  position: number;
  numbered: boolean;
}) {
  return (
    <li
      className={cn(
        'flex items-baseline gap-3',
        !numbered && 'mb-2 break-inside-avoid',
      )}
    >
      {numbered ? (
        <span className="w-6 shrink-0 text-right font-display text-sm font-bold text-muted">
          {position}
        </span>
      ) : null}
      <span className="font-semibold text-foreground">{title}</span>
      {artist ? <span className="text-sm text-muted">— {artist}</span> : null}
    </li>
  );
}

/**
 * Setlist block — every cover the band performs, as a browsable song list.
 * `numbered` renders an ordered list; `columns` flows the songs into CSS
 * columns. Renders nothing with no covers.
 */
export function Setlist({
  variant,
  covers,
  heading = 'Setlist',
  id,
  className,
}: SetlistProps) {
  if (covers.length === 0) return null;
  const numbered = (variant ?? 'numbered') === 'numbered';
  const ListTag = numbered ? 'ol' : 'ul';

  return (
    <Section id={id} width="default" className={className}>
      <Heading as="h2" size="lg" className="mb-6">
        {heading}
      </Heading>
      <ListTag className={setlistVariants({ variant })}>
        {covers.map((cover, index) => (
          <SetlistItem
            key={cover._id}
            title={cover.title ?? 'Untitled'}
            artist={cover.originalArtist}
            position={index + 1}
            numbered={numbered}
          />
        ))}
      </ListTag>
    </Section>
  );
}
