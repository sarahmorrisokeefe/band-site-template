import { Heading, Text } from '@react-email/components';

import { EmailLayout } from './layout';

/** Auto-reply welcoming a new mailing-list subscriber. */
export function SubscriberWelcomeEmail({ bandName }: { bandName: string }) {
  return (
    <EmailLayout bandName={bandName}>
      <Heading as="h1" style={{ fontSize: '20px', color: '#111827' }}>
        You’re on the list
      </Heading>
      <Text style={{ fontSize: '14px', color: '#374151' }}>
        Thanks for following {bandName}. We’ll let you know about new shows and
        releases.
      </Text>
    </EmailLayout>
  );
}

SubscriberWelcomeEmail.PreviewProps = {
  bandName: 'The Midnight Echo',
};
