import { Heading, Text } from '@react-email/components';

import type { BookingRequestInput } from '@/lib/forms/types';

import { EmailLayout } from './layout';

const label = {
  color: '#6b7280',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  margin: '12px 0 0',
};

const value = {
  color: '#111827',
  fontSize: '14px',
  margin: '2px 0 0',
};

function Row({ name, val }: { name: string; val: string }) {
  return (
    <>
      <Text style={label}>{name}</Text>
      <Text style={value}>{val || '—'}</Text>
    </>
  );
}

/** Sent to the band when someone submits the booking form. */
export function BookingNotificationEmail({
  input,
  bandName,
}: {
  input: BookingRequestInput;
  bandName: string;
}) {
  return (
    <EmailLayout bandName={bandName}>
      <Heading as="h1" style={{ fontSize: '20px', color: '#111827' }}>
        New booking enquiry from {input.name}
      </Heading>
      <Row name="Email" val={input.email} />
      <Row name="Event type" val={input.eventType} />
      <Row name="Venue" val={input.venue} />
      <Row name="City" val={input.city} />
      <Row name="Date" val={input.date} />
      <Row name="Set length" val={input.setLength} />
      <Row name="Message" val={input.message} />
    </EmailLayout>
  );
}

BookingNotificationEmail.PreviewProps = {
  bandName: 'The Midnight Echo',
  input: {
    name: 'Jamie Rivera',
    email: 'jamie@example.com',
    eventType: 'Wedding',
    venue: 'The Old Hall',
    city: 'Portland',
    date: '2026-08-14',
    setLength: '2 x 45 min',
    message: 'We would love you to play our reception.',
  },
};
