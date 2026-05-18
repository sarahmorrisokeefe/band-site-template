import { describe, expect, it } from 'vitest';

import {
  HONEYPOT_FIELD,
  parseBookingForm,
  parseSubscriberForm,
  readHoneypot,
} from './parse';

function formDataOf(entries: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    fd.set(key, value);
  }
  return fd;
}

describe('parseBookingForm', () => {
  it('reads and trims the booking fields', () => {
    const result = parseBookingForm(
      formDataOf({ name: '  Alex  ', email: 'a@b.com', message: 'hello' }),
    );
    expect(result.name).toBe('Alex');
    expect(result.email).toBe('a@b.com');
    expect(result.message).toBe('hello');
  });

  it('defaults missing fields to empty strings', () => {
    expect(parseBookingForm(formDataOf({})).venue).toBe('');
  });
});

describe('parseSubscriberForm', () => {
  it('reads the email field', () => {
    expect(parseSubscriberForm(formDataOf({ email: 'x@y.com' })).email).toBe(
      'x@y.com',
    );
  });
});

describe('readHoneypot', () => {
  it('returns the honeypot field value', () => {
    expect(readHoneypot(formDataOf({ [HONEYPOT_FIELD]: 'bot' }))).toBe('bot');
  });

  it('returns an empty string when the honeypot is absent', () => {
    expect(readHoneypot(formDataOf({}))).toBe('');
  });
});
