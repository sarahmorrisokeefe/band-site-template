import { Heading, Text } from '@react-email/components';

import { EmailLayout } from './layout';

/** Sent to the band when someone joins the mailing list. */
export function SubscriberNotificationEmail({
  email,
  bandName,
}: {
  email: string;
  bandName: string;
}) {
  return (
    <EmailLayout bandName={bandName}>
      <Heading as="h1" style={{ fontSize: '20px', color: '#111827' }}>
        New mailing-list signup
      </Heading>
      <Text style={{ fontSize: '14px', color: '#374151' }}>{email}</Text>
    </EmailLayout>
  );
}

SubscriberNotificationEmail.PreviewProps = {
  email: 'fan@example.com',
  bandName: 'The Midnight Echo',
};
