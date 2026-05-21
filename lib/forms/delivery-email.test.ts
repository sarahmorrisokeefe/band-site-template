import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { BookingRequestInput } from './types';

const sendMock = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } };
  }),
}));

vi.mock('@/lib/sanity/queries', () => ({
  getBand: vi.fn().mockResolvedValue({ name: 'The Echo' }),
}));

// Imported after the mocks are registered.
import { emailDeliveryAdapter } from './delivery-email';

const booking: BookingRequestInput = {
  name: 'Jamie',
  email: 'jamie@example.com',
  eventType: '',
  venue: '',
  city: '',
  date: '',
  setLength: '',
  message: 'hello',
};

beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: '1' }, error: null });
  vi.stubEnv('RESEND_API_KEY', 'test-key');
  vi.stubEnv('RESEND_FROM', 'Band <onboarding@resend.dev>');
  vi.stubEnv('BOOKING_EMAIL_TO', 'band@example.com');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('emailDeliveryAdapter.deliverBooking', () => {
  it('sends a band notification with replyTo and an idempotency key', async () => {
    await emailDeliveryAdapter.deliverBooking(booking);
    expect(sendMock).toHaveBeenCalledTimes(2);
    const [payload, options] = sendMock.mock.calls[0];
    expect(payload.to).toBe('band@example.com');
    expect(payload.from).toBe('Band <onboarding@resend.dev>');
    expect(payload.replyTo).toBe('jamie@example.com');
    expect(payload.subject).toBe('Booking enquiry from Jamie');
    expect(options.idempotencyKey).toMatch(/^booking:/);
  });

  it('sends a best-effort confirmation to the enquirer', async () => {
    await emailDeliveryAdapter.deliverBooking(booking);
    const [payload] = sendMock.mock.calls[1];
    expect(payload.to).toBe('jamie@example.com');
    expect(payload.subject).toBe('Thanks for contacting The Echo');
  });

  it('throws when the band notification fails', async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: 'boom' } });
    await expect(emailDeliveryAdapter.deliverBooking(booking)).rejects.toThrow(
      'Resend failed',
    );
  });

  it('does not throw when only the confirmation fails', async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: '1' }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: 'reply boom' } });
    await expect(
      emailDeliveryAdapter.deliverBooking(booking),
    ).resolves.toBeUndefined();
  });
});

describe('emailDeliveryAdapter.deliverSubscriber', () => {
  const subscriber = { email: 'fan@example.com' };

  it('sends a band notification with an idempotency key', async () => {
    await emailDeliveryAdapter.deliverSubscriber(subscriber);
    expect(sendMock).toHaveBeenCalledTimes(2);
    const [payload, options] = sendMock.mock.calls[0];
    expect(payload.to).toBe('band@example.com');
    expect(payload.subject).toBe('New mailing-list signup');
    expect(options.idempotencyKey).toMatch(/^subscriber:/);
  });

  it('sends a best-effort welcome to the new subscriber', async () => {
    await emailDeliveryAdapter.deliverSubscriber(subscriber);
    const [payload] = sendMock.mock.calls[1];
    expect(payload.to).toBe('fan@example.com');
    expect(payload.subject).toBe("Welcome to The Echo's mailing list");
  });

  it('throws when the band notification fails', async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: 'boom' } });
    await expect(
      emailDeliveryAdapter.deliverSubscriber(subscriber),
    ).rejects.toThrow('Resend failed');
  });

  it('does not throw when only the welcome fails', async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: '1' }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: 'welcome boom' } });
    await expect(
      emailDeliveryAdapter.deliverSubscriber(subscriber),
    ).resolves.toBeUndefined();
  });
});
