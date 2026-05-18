import { defineField, defineType } from 'sanity';

/**
 * A booking enquiry submitted through the site's booking form. Created by the
 * form server action — editors view these, they do not author them.
 */
export const bookingRequest = defineType({
  name: 'bookingRequest',
  title: 'Booking Request',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'eventType', title: 'Event Type', type: 'string' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'date', title: 'Event Date', type: 'string' }),
    defineField({ name: 'setLength', title: 'Set Length', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 4 }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  orderings: [
    {
      title: 'Submitted, newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { name: 'name', city: 'city', submittedAt: 'submittedAt' },
    prepare({ name, city, submittedAt }) {
      const when = submittedAt
        ? new Date(submittedAt).toLocaleDateString()
        : '';
      return {
        title: name || 'Booking request',
        subtitle: [city, when].filter(Boolean).join(' · '),
      };
    },
  },
});
