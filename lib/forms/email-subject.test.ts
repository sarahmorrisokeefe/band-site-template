import { describe, expect, it } from 'vitest';

import {
  bookingConfirmationSubject,
  bookingNotificationSubject,
  subscriberNotificationSubject,
  subscriberWelcomeSubject,
} from './email-subject';

describe('email subjects', () => {
  it('builds a booking notification subject from the enquirer name', () => {
    expect(bookingNotificationSubject('Jamie')).toBe('Booking enquiry from Jamie');
  });

  it('builds a booking confirmation subject from the band name', () => {
    expect(bookingConfirmationSubject('The Echo')).toBe('Thanks for contacting The Echo');
  });

  it('uses a fixed subscriber notification subject', () => {
    expect(subscriberNotificationSubject()).toBe('New mailing-list signup');
  });

  it('builds a subscriber welcome subject from the band name', () => {
    expect(subscriberWelcomeSubject('The Echo')).toBe(
      'Welcome to the The Echo mailing list',
    );
  });
});
