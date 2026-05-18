'use server';

import { getDeliveryAdapter } from './delivery';
import { parseBookingForm, parseSubscriberForm, readHoneypot } from './parse';
import type { FormState } from './types';
import { isHoneypotFilled, validateBooking, validateSubscriber } from './validation';

/**
 * Server action: handle a booking-form submission. Signature matches
 * `useActionState` — `(prevState, formData) => nextState`.
 */
export async function submitBookingRequest(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // A filled honeypot means a bot — accept silently so it does not retry.
  if (isHoneypotFilled(readHoneypot(formData))) {
    return { status: 'success', message: 'Thanks — we’ll be in touch.', fieldErrors: {} };
  }

  const input = parseBookingForm(formData);
  const fieldErrors = validateBooking(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors,
    };
  }

  try {
    await getDeliveryAdapter().deliverBooking(input);
  } catch (error) {
    console.error('Booking delivery failed:', error);
    return {
      status: 'error',
      message: 'Something went wrong sending your enquiry. Please try again.',
      fieldErrors: {},
    };
  }

  return { status: 'success', message: 'Thanks — we’ll be in touch.', fieldErrors: {} };
}

/**
 * Server action: handle a mailing-list signup. Signature matches
 * `useActionState` — `(prevState, formData) => nextState`.
 */
export async function subscribeToMailingList(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isHoneypotFilled(readHoneypot(formData))) {
    return { status: 'success', message: 'You’re on the list.', fieldErrors: {} };
  }

  const input = parseSubscriberForm(formData);
  const fieldErrors = validateSubscriber(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors,
    };
  }

  try {
    await getDeliveryAdapter().deliverSubscriber(input);
  } catch (error) {
    console.error('Subscriber delivery failed:', error);
    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
      fieldErrors: {},
    };
  }

  return { status: 'success', message: 'You’re on the list.', fieldErrors: {} };
}
