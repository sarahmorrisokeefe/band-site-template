import { defineField, defineType } from 'sanity';

/**
 * The band itself. This is a singleton — exactly one `band` document exists
 * per deployment (enforced in `sanity/structure.ts` and `sanity.config.ts`).
 * Content-only: brand assets such as the logo live on the `theme` singleton.
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
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description:
        'Short headline shown in the hero, e.g. "Pop songs you know. Louder."',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large feature image for the hero section.',
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
    defineField({
      name: 'hometown',
      title: 'Hometown',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      description: 'Small labelled facts shown in the stats grid.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social & Profile Links',
      description: 'The band’s profile URLs (not per-release links).',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
        defineField({ name: 'bandcamp', title: 'Bandcamp', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});
