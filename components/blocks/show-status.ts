import type { SHOWS_QUERY_RESULT } from '@/sanity.types';

/** The `status` value on a show, as returned by `getShows()`. */
export type ShowStatus = SHOWS_QUERY_RESULT[number]['status'];

/** Display metadata derived from a show's status. */
export type ShowStatusMeta = {
  /** Human-readable label, e.g. `Sold Out`. Empty when status is unset. */
  label: string;
  /** Tailwind classes for the status badge. Empty when status is unset. */
  badgeClass: string;
  /** Whether the show is unavailable — suppresses the ticket CTA. */
  soldOut: boolean;
};

const STATUS_META: Record<NonNullable<ShowStatus>, ShowStatusMeta> = {
  onSale: {
    label: 'On Sale',
    badgeClass: 'bg-primary text-background',
    soldOut: false,
  },
  soldOut: {
    label: 'Sold Out',
    badgeClass: 'bg-foreground/10 text-muted',
    soldOut: true,
  },
  waitlist: {
    label: 'Waitlist',
    badgeClass: 'bg-foreground/10 text-foreground',
    soldOut: false,
  },
  free: {
    label: 'Free',
    badgeClass: 'bg-primary text-background',
    soldOut: false,
  },
  fewLeft: {
    label: 'Few Left',
    badgeClass: 'bg-accent text-background',
    soldOut: false,
  },
};

const EMPTY_META: ShowStatusMeta = {
  label: '',
  badgeClass: '',
  soldOut: false,
};

/** Map a show status to its display metadata. An unset status yields empty metadata. */
export function showStatusMeta(status: ShowStatus): ShowStatusMeta {
  if (!status) return EMPTY_META;
  return STATUS_META[status];
}
