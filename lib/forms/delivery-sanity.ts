import { token } from '@/lib/sanity/env';
import { writeClient } from '@/lib/sanity/write-client';

import type {
  BookingRequestInput,
  DeliveryAdapter,
  SubscriberInput,
} from './types';

/** Throw a clear error when the write token is absent. */
function assertToken(): void {
  if (!token) {
    throw new Error(
      'SANITY_API_TOKEN (Editor-scoped) is required for "sanity" form delivery.',
    );
  }
}

/**
 * Delivery adapter that records submissions as Sanity documents
 * (`bookingRequest` / `subscriber`). Requires an Editor-scoped
 * `SANITY_API_TOKEN`; editors then read the submissions in the Studio.
 */
export const sanityDeliveryAdapter: DeliveryAdapter = {
  async deliverBooking(input: BookingRequestInput): Promise<void> {
    assertToken();
    await writeClient.create({
      _type: 'bookingRequest',
      name: input.name,
      email: input.email,
      eventType: input.eventType,
      venue: input.venue,
      city: input.city,
      date: input.date,
      setLength: input.setLength,
      message: input.message,
      submittedAt: new Date().toISOString(),
    });
  },

  async deliverSubscriber(input: SubscriberInput): Promise<void> {
    assertToken();
    await writeClient.create({
      _type: 'subscriber',
      email: input.email,
      subscribedAt: new Date().toISOString(),
    });
  },
};
