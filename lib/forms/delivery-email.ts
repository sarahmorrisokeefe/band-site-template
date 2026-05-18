import { Resend } from 'resend';

import type {
  BookingRequestInput,
  DeliveryAdapter,
  SubscriberInput,
} from './types';

/** Read a required env var, throwing a clear error when it is absent. */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for "email" form delivery.`);
  }
  return value;
}

/** Format a booking enquiry as a plain-text email body. */
function bookingBody(input: BookingRequestInput): string {
  return [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Event type: ${input.eventType || '—'}`,
    `Venue: ${input.venue || '—'}`,
    `City: ${input.city || '—'}`,
    `Date: ${input.date || '—'}`,
    `Set length: ${input.setLength || '—'}`,
    '',
    input.message,
  ].join('\n');
}

/**
 * Delivery adapter that emails submissions to the band via Resend. Requires
 * `RESEND_API_KEY`, a verified `RESEND_FROM` address, and a `BOOKING_EMAIL_TO`
 * destination address.
 */
export const emailDeliveryAdapter: DeliveryAdapter = {
  async deliverBooking(input: BookingRequestInput): Promise<void> {
    const resend = new Resend(requireEnv('RESEND_API_KEY'));
    const { error } = await resend.emails.send({
      from: requireEnv('RESEND_FROM'),
      to: requireEnv('BOOKING_EMAIL_TO'),
      replyTo: input.email,
      subject: `Booking enquiry from ${input.name}`,
      text: bookingBody(input),
    });
    if (error) {
      throw new Error(`Resend failed: ${error.message}`);
    }
  },

  async deliverSubscriber(input: SubscriberInput): Promise<void> {
    const resend = new Resend(requireEnv('RESEND_API_KEY'));
    const { error } = await resend.emails.send({
      from: requireEnv('RESEND_FROM'),
      to: requireEnv('BOOKING_EMAIL_TO'),
      subject: 'New mailing-list signup',
      text: `New subscriber: ${input.email}`,
    });
    if (error) {
      throw new Error(`Resend failed: ${error.message}`);
    }
  },
};
