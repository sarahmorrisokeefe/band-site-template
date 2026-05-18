import type { BookingRequestInput, SubscriberInput } from './types';

/**
 * Loose email check — catches obvious typos, not a deliverability guarantee.
 * Requires text, an `@`, and a dotted domain, with no whitespace.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * A honeypot field is invisible to humans; any non-empty value means a bot
 * filled it in.
 */
export function isHoneypotFilled(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate a booking enquiry. Name, email, and message are required; the rest
 * are optional. Returns a map of field name to error message — empty when valid.
 */
export function validateBooking(
  input: BookingRequestInput,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  if (!input.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.message.trim()) {
    errors.message = 'Please enter a message.';
  }
  return errors;
}

/**
 * Validate a mailing-list signup. Email is required and must be well-formed.
 * Returns a map of field name to error message — empty when valid.
 */
export function validateSubscriber(
  input: SubscriberInput,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  return errors;
}
