import { render } from '@react-email/render';
import { describe, expect, it } from 'vitest';

import { SubscriberNotificationEmail } from './subscriber-notification';

describe('SubscriberNotificationEmail', () => {
  it('includes the subscriber email and band name', async () => {
    const html = await render(
      <SubscriberNotificationEmail email="fan@example.com" bandName="The Echo" />,
    );
    expect(html).toContain('fan@example.com');
    expect(html).toContain('The Echo');
  });
});
