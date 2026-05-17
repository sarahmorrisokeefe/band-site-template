import { defineField, defineType } from 'sanity';

/**
 * The band itself. This is a singleton — exactly one `band` document exists
 * per deployment (enforced in `sanity/structure.ts` and `sanity.config.ts`).
 */
export const band = defineType({
  name: 'band',
  title: 'Band',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Band Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'number',
      validation: (rule) =>
        rule.integer().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
});
