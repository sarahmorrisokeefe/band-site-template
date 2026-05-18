import { defineField, defineType } from 'sanity';

/**
 * A mailing-list subscriber captured by the site's signup form. Created by the
 * form server action — editors view these, they do not author them.
 */
export const subscriber = defineType({
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({ name: 'subscribedAt', title: 'Subscribed At', type: 'datetime' }),
  ],
  orderings: [
    {
      title: 'Subscribed, newest first',
      name: 'subscribedAtDesc',
      by: [{ field: 'subscribedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { email: 'email', subscribedAt: 'subscribedAt' },
    prepare({ email, subscribedAt }) {
      const when = subscribedAt
        ? new Date(subscribedAt).toLocaleDateString()
        : '';
      return { title: email || 'Subscriber', subtitle: when };
    },
  },
});
