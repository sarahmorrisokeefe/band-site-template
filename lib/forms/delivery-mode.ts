/** Which submission destination a band uses. Chosen per band by env var. */
export type DeliveryMode = 'sanity' | 'email';

/**
 * Resolve the `BOOKING_DELIVERY` env value to a delivery mode. Throws on a
 * missing or unrecognised value so a misconfigured deployment fails loudly
 * rather than silently dropping submissions.
 */
export function resolveDeliveryMode(raw: string | undefined): DeliveryMode {
  if (raw === 'sanity' || raw === 'email') {
    return raw;
  }
  throw new Error(
    `BOOKING_DELIVERY must be "sanity" or "email" (got: ${raw ?? 'undefined'}).`,
  );
}
