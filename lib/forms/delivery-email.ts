import { createHash } from 'node:crypto';

import { Resend } from 'resend';

import { BookingConfirmationEmail } from '@/emails/booking-confirmation';
import { BookingNotificationEmail } from '@/emails/booking-notification';
import { SubscriberNotificationEmail } from '@/emails/subscriber-notification';
import { SubscriberWelcomeEmail } from '@/emails/subscriber-welcome';
import { getBand } from '@/lib/sanity/queries';

import {
  bookingConfirmationSubject,
  bookingNotificationSubject,
  subscriberNotificationSubject,
  subscriberWelcomeSubject,
} from './email-subject';
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

/** A stable idempotency key so identical re-submits are de-duplicated by Resend. */
function idempotencyKey(prefix: string, ...parts: string[]): string {
  const hash = createHash('sha256').update(parts.join('|')).digest('hex');
  return `${prefix}:${hash.slice(0, 32)}`;
}

/** The band's display name for email copy; falls back when unset. */
async function resolveBandName(): Promise<string> {
  try {
    const band = await getBand();
    return band?.name ?? 'the band';
  } catch {
    return 'the band';
  }
}

/**
 * Delivery adapter that emails submissions via Resend using React Email
 * templates. Requires `RESEND_API_KEY`, a verified `RESEND_FROM` address, and a
 * `BOOKING_EMAIL_TO` destination. The band-facing notification is fatal; the
 * sender-facing auto-reply is best-effort (logged, never fails the submission).
 */
export const emailDeliveryAdapter: DeliveryAdapter = {
  async deliverBooking(input: BookingRequestInput): Promise<void> {
    const from = requireEnv('RESEND_FROM');
    const to = requireEnv('BOOKING_EMAIL_TO');
    const resend = new Resend(requireEnv('RESEND_API_KEY'));
    const bandName = await resolveBandName();

    // Fatal: the band must receive the enquiry.
    const { error } = await resend.emails.send(
      {
        from,
        to,
        replyTo: input.email,
        subject: bookingNotificationSubject(input.name),
        react: BookingNotificationEmail({ input, bandName }),
      },
      { idempotencyKey: idempotencyKey('booking', input.email, input.message) },
    );
    if (error) {
      throw new Error(`Resend failed: ${error.message}`);
    }

    // Best-effort: confirmation to the enquirer.
    try {
      const { error: replyError } = await resend.emails.send(
        {
          from,
          to: input.email,
          subject: bookingConfirmationSubject(bandName),
          react: BookingConfirmationEmail({ name: input.name, bandName }),
        },
        {
          idempotencyKey: idempotencyKey('booking-reply', input.email, input.message),
        },
      );
      if (replyError) {
        console.error('Booking confirmation email failed:', replyError);
      }
    } catch (replyError) {
      console.error('Booking confirmation email failed:', replyError);
    }
  },

  async deliverSubscriber(input: SubscriberInput): Promise<void> {
    const from = requireEnv('RESEND_FROM');
    const to = requireEnv('BOOKING_EMAIL_TO');
    const resend = new Resend(requireEnv('RESEND_API_KEY'));
    const bandName = await resolveBandName();

    // Fatal: the band must capture the new subscriber.
    const { error } = await resend.emails.send(
      {
        from,
        to,
        subject: subscriberNotificationSubject(),
        react: SubscriberNotificationEmail({ email: input.email, bandName }),
      },
      { idempotencyKey: idempotencyKey('subscriber', input.email) },
    );
    if (error) {
      throw new Error(`Resend failed: ${error.message}`);
    }

    // Best-effort: welcome the new subscriber.
    try {
      const { error: welcomeError } = await resend.emails.send(
        {
          from,
          to: input.email,
          subject: subscriberWelcomeSubject(bandName),
          react: SubscriberWelcomeEmail({ bandName }),
        },
        { idempotencyKey: idempotencyKey('subscriber-welcome', input.email) },
      );
      if (welcomeError) {
        console.error('Subscriber welcome email failed:', welcomeError);
      }
    } catch (welcomeError) {
      console.error('Subscriber welcome email failed:', welcomeError);
    }
  },
};
