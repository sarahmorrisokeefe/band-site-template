import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Text,
} from '@react-email/components';
import type { ReactNode } from 'react';

const main = {
  backgroundColor: '#f6f6f6',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '24px',
  maxWidth: '560px',
  borderRadius: '8px',
};

const footer = {
  color: '#8a8a8a',
  fontSize: '12px',
  marginTop: '24px',
};

/** Shared shell for every transactional email: white card + band-name footer. */
export function EmailLayout({
  bandName,
  children,
}: {
  bandName: string;
  children: ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {children}
          <Hr />
          <Text style={footer}>{bandName}</Text>
        </Container>
      </Body>
    </Html>
  );
}
