import { type VariantProps } from 'class-variance-authority';

import { Button } from '@/components/primitives/button';
import { Heading } from '@/components/primitives/heading';
import { Section } from '@/components/primitives/section';
import { cn } from '@/lib/cn';
import { formatShowDate } from '@/lib/format-date';
import type { SHOWS_QUERY_RESULT } from '@/sanity.types';

import { showListVariants } from './show-list-variants';
import { showStatusMeta } from './show-status';

/** A single show, as returned by `getShows()`. */
export type Show = SHOWS_QUERY_RESULT[number];

type ShowListProps = VariantProps<typeof showListVariants> & {
  shows: SHOWS_QUERY_RESULT;
  heading?: string;
  id?: string;
  className?: string;
};

/** A short status badge for a show. Renders nothing when status is unset. */
function StatusBadge({ status }: { status: Show['status'] }) {
  const meta = showStatusMeta(status);
  if (!meta.label) return null;
  return (
    <span
      className={cn(
        'inline-block rounded-brand px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
        meta.badgeClass,
      )}
    >
      {meta.label}
    </span>
  );
}

/** Comma-joined location string from a show's area and city. */
function showLocation(show: Show): string {
  return [show.venueArea, show.venueCity].filter(Boolean).join(', ');
}

/** One show row. `compact` drops the support act and the ticket CTA. */
function ShowEntry({ show, compact }: { show: Show; compact: boolean }) {
  const meta = showStatusMeta(show.status);
  const location = showLocation(show);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
      <div className="w-28 shrink-0 font-display text-sm font-bold uppercase tracking-wide text-foreground">
        {formatShowDate(show.date)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-foreground">
          {show.venueName ?? 'Venue TBA'}
        </p>
        {location ? <p className="text-sm text-muted">{location}</p> : null}
        {!compact && show.supportAct ? (
          <p className="text-sm text-muted">with {show.supportAct}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={show.status} />
        {!compact && !meta.soldOut && show.ticketUrl ? (
          <Button href={show.ticketUrl} size="sm">
            Tickets
          </Button>
        ) : null}
      </div>
    </div>
  );
}

/**
 * ShowList block. `list` shows full rows; `compact` drops the support act and
 * ticket CTA for a denser agenda; `cards` boxes each show in a bordered card.
 * Renders nothing with no shows.
 */
export function ShowList({
  variant,
  shows,
  heading = 'Shows',
  id,
  className,
}: ShowListProps) {
  if (shows.length === 0) return null;
  const resolved = variant ?? 'list';
  const compact = resolved === 'compact';
  const cards = resolved === 'cards';

  return (
    <Section id={id} width="wide" className={className}>
      <Heading as="h2" size="lg" className="mb-8">
        {heading}
      </Heading>
      <div className={showListVariants({ variant })}>
        {shows.map((show) =>
          cards ? (
            <div
              key={show._id}
              className="rounded-brand border border-foreground/10 px-5"
            >
              <ShowEntry show={show} compact={compact} />
            </div>
          ) : (
            <ShowEntry key={show._id} show={show} compact={compact} />
          ),
        )}
      </div>
    </Section>
  );
}
