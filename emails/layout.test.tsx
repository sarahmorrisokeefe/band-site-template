import { Text } from '@react-email/components';
import { render } from '@react-email/render';
import { describe, expect, it } from 'vitest';

import { EmailLayout } from './layout';

describe('EmailLayout', () => {
  it('renders its children and the band-name footer', async () => {
    const html = await render(
      <EmailLayout bandName="The Echo">
        <Text>Hello body</Text>
      </EmailLayout>,
    );
    expect(html).toContain('Hello body');
    expect(html).toContain('The Echo');
  });
});
