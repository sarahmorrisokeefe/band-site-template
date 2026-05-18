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
      name: 'venueArea',
      title: 'Venue Area / Neighborhood',
      type: 'string',
      description: 'Optional neighborhood, e.g. "NoDa".',
    }),
    defineField({
      name: 'supportAct',
      title: 'Support Act',
      type: 'string',
      description: 'Opening or supporting act, e.g. "Sweater Weather".',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'On Sale', value: 'onSale' },
          { title: 'Sold Out', value: 'soldOut' },
          { title: 'Waitlist', value: 'waitlist' },
          { title: 'Free', value: 'free' },
          { title: 'Few Left', value: 'fewLeft' },
        ],
        layout: 'radio',
      },
      initialValue: 'onSale',
      validation: (rule) => rule.required(),
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
