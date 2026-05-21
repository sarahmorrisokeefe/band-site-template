import { render } from '@react-email/render';
import { describe, expect, it } from 'vitest';

import { SubscriberWelcomeEmail } from './subscriber-welcome';

describe('SubscriberWelcomeEmail', () => {
  it('welcomes the subscriber and names the band', async () => {
    const html = await render(<SubscriberWelcomeEmail bandName="The Echo" />);
    expect(html).toContain('The Echo');
    expect(html.toLowerCase()).toContain('list');
  });
});
