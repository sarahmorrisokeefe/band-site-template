import { render } from '@react-email/render';
import { describe, expect, it } from 'vitest';

import type { BookingRequestInput } from '@/lib/forms/types';

import { BookingNotificationEmail } from './booking-notification';

const input: BookingRequestInput = {
  name: 'Jamie',
  email: 'jamie@example.com',
  eventType: 'Wedding',
  venue: 'The Hall',
  city: 'Portland',
  date: '2026-08-14',
  setLength: '2 x 45 min',
  message: 'Please play our reception.',
};

describe('BookingNotificationEmail', () => {
  it('includes the enquirer details, message, and band name', async () => {
    const html = await render(
      <BookingNotificationEmail input={input} bandName="The Echo" />,
    );
    expect(html).toContain('Jamie');
    expect(html).toContain('jamie@example.com');
    expect(html).toContain('Wedding');
    expect(html).toContain('Please play our reception.');
    expect(html).toContain('The Echo');
  });
});
