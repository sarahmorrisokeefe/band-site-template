import { defineField, defineType } from 'sanity';

/** A music release: album, EP, or single. */
export const release = defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseType',
      title: 'Release Type',
      type: 'string',
      options: {
        list: [
          { title: 'Album', value: 'album' },
          { title: 'EP', value: 'ep' },
          { title: 'Single', value: 'single' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
    }),
    defineField({
      name: 'streamingLinks',
      title: 'Streaming Links',
      type: 'object',
      fields: [
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
        defineField({ name: 'bandcamp', title: 'Bandcamp', type: 'url' }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Release date, newest first',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'releaseType', media: 'coverArt' },
  },
});
