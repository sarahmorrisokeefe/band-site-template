import { render } from '@react-email/render';
import { describe, expect, it } from 'vitest';

import { BookingConfirmationEmail } from './booking-confirmation';

describe('BookingConfirmationEmail', () => {
  it('greets the enquirer by name and names the band', async () => {
    const html = await render(
      <BookingConfirmationEmail name="Jamie" bandName="The Echo" />,
    );
    expect(html).toContain('Jamie');
    expect(html).toContain('The Echo');
  });
});
