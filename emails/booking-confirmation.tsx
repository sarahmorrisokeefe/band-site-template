import { Heading, Text } from '@react-email/components';

import { EmailLayout } from './layout';

/** Auto-reply sent to the person who submitted the booking form. */
export function BookingConfirmationEmail({
  name,
  bandName,
}: {
  name: string;
  bandName: string;
}) {
  return (
    <EmailLayout bandName={bandName}>
      <Heading as="h1" style={{ fontSize: '20px', color: '#111827' }}>
        Thanks, {name}!
      </Heading>
      <Text style={{ fontSize: '14px', color: '#374151' }}>
        {bandName} has received your booking enquiry. We’ll be in touch soon.
      </Text>
    </EmailLayout>
  );
}

BookingConfirmationEmail.PreviewProps = {
  name: 'Jamie Rivera',
  bandName: 'The Midnight Echo',
};
