/**
 * Pure date-formatting helpers. They format in UTC so output is deterministic
 * across machines and unit-testable — band sites are content templates, not
 * timezone-critical applications.
 */

const SHOW_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Format a show's ISO datetime as e.g. `Jun 1, 2026`. Falls back to `Date TBA`. */
export function formatShowDate(iso: string | null | undefined): string {
  if (!iso) return 'Date TBA';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Date TBA';
  return SHOW_DATE_FORMAT.format(date);
}

/**
 * Extract the four-digit year from an ISO date string. Returns an empty string
 * when the input is absent or unparseable.
 */
export function formatYear(iso: string | null | undefined): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return String(date.getUTCFullYear());
}
