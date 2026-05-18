import { emailDeliveryAdapter } from './delivery-email';
import { resolveDeliveryMode } from './delivery-mode';
import { sanityDeliveryAdapter } from './delivery-sanity';
import type { DeliveryAdapter } from './types';

/**
 * Return the delivery adapter selected by the `BOOKING_DELIVERY` env var.
 * Throws (via `resolveDeliveryMode`) when the var is missing or invalid.
 */
export function getDeliveryAdapter(): DeliveryAdapter {
  const mode = resolveDeliveryMode(process.env.BOOKING_DELIVERY);
  return mode === 'email' ? emailDeliveryAdapter : sanityDeliveryAdapter;
}
