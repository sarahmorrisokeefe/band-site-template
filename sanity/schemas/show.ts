import { defineField, defineType } from 'sanity';

/** A live show / tour date. */
export const show = defineType({
  name: 'show',
  title: 'Show',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venueName',
      title: 'Venue Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venueCity',
      title: 'Venue City',
      type: 'string',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url',
    }),
    defineField({
      name: 'isSoldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'venueName', city: 'venueCity', date: 'date' },
    prepare({ title, city, date }) {
      const when = date ? new Date(date).toLocaleDateString() : 'No date';
      return {
        title,
        subtitle: [city, when].filter(Boolean).join(' · '),
      };
    },
  },
});
