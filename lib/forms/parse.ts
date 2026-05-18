import type { BookingRequestInput, SubscriberInput } from './types';

/**
 * Name of the hidden honeypot field present on every form. A plausible field
 * name a naive bot will fill in; real users never see it.
 */
export const HONEYPOT_FIELD = 'company';

/** Read a trimmed string from FormData; missing or non-string entries become `''`. */
function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

/** Extract the honeypot field value from a submitted form. */
export function readHoneypot(formData: FormData): string {
  return field(formData, HONEYPOT_FIELD);
}

/** Parse a booking-form submission into cleaned fields. */
export function parseBookingForm(formData: FormData): BookingRequestInput {
  return {
    name: field(formData, 'name'),
    email: field(formData, 'email'),
    eventType: field(formData, 'eventType'),
    venue: field(formData, 'venue'),
    city: field(formData, 'city'),
    date: field(formData, 'date'),
    setLength: field(formData, 'setLength'),
    message: field(formData, 'message'),
  };
}

/** Parse a mailing-list signup submission into cleaned fields. */
export function parseSubscriberForm(formData: FormData): SubscriberInput {
  return { email: field(formData, 'email') };
}
