/** Subject lines for the Resend email-delivery path. Pure and unit-tested. */

export function bookingNotificationSubject(name: string): string {
  return `Booking enquiry from ${name}`;
}

export function bookingConfirmationSubject(bandName: string): string {
  return `Thanks for contacting ${bandName}`;
}

export function subscriberNotificationSubject(): string {
  return 'New mailing-list signup';
}

export function subscriberWelcomeSubject(bandName: string): string {
  return `Welcome to the ${bandName} mailing list`;
}
