/** Which submission destination a band uses. Chosen per band by env var. */
export type DeliveryMode = 'sanity' | 'email';

/**
 * Resolve the `BOOKING_DELIVERY` env value to a delivery mode. An unset or empty
 * value defaults to "email" (Resend is the template's default). An explicit but
 * unrecognised value throws so a misconfigured deployment fails loudly.
 */
export function resolveDeliveryMode(raw: string | undefined): DeliveryMode {
  if (raw === undefined || raw === '') {
    return 'email';
  }
  if (raw === 'sanity' || raw === 'email') {
    return raw;
  }
  throw new Error(
    `BOOKING_DELIVERY must be "sanity" or "email" (got: ${raw}).`,
  );
}
