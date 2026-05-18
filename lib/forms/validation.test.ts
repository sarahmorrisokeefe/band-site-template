import { describe, expect, it } from 'vitest';

import type { BookingRequestInput } from './types';
import {
  isHoneypotFilled,
  isValidEmail,
  validateBooking,
  validateSubscriber,
} from './validation';

const baseBooking: BookingRequestInput = {
  name: 'Alex',
  email: 'alex@example.com',
  eventType: '',
  venue: '',
  city: '',
  date: '',
  setLength: '',
  message: 'Please play our wedding.',
};

describe('isValidEmail', () => {
  it('accepts a well-formed address', () => {
    expect(isValidEmail('band@example.com')).toBe(true);
  });

  it('rejects a malformed address', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
  });
});

describe('isHoneypotFilled', () => {
  it('is false for an empty or whitespace value', () => {
    expect(isHoneypotFilled('')).toBe(false);
    expect(isHoneypotFilled('   ')).toBe(false);
  });

  it('is true when the field has content', () => {
    expect(isHoneypotFilled('http://spam.example')).toBe(true);
  });
});

describe('validateBooking', () => {
  it('returns no errors for a complete booking', () => {
    expect(validateBooking(baseBooking)).toEqual({});
  });

  it('flags a missing name', () => {
    expect(validateBooking({ ...baseBooking, name: '' }).name).toBeDefined();
  });

  it('flags a malformed email', () => {
    expect(validateBooking({ ...baseBooking, email: 'nope' }).email).toBeDefined();
  });

  it('flags a missing message', () => {
    expect(validateBooking({ ...baseBooking, message: '' }).message).toBeDefined();
  });
});

describe('validateSubscriber', () => {
  it('returns no errors for a valid email', () => {
    expect(validateSubscriber({ email: 'fan@example.com' })).toEqual({});
  });

  it('flags a malformed email', () => {
    expect(validateSubscriber({ email: 'bad' }).email).toBeDefined();
  });
});
