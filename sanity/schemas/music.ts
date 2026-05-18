import { defineField, defineType } from 'sanity';

/**
 * A piece of music: an original release (album / EP / single) or a cover the
 * band performs. `kind` discriminates the two; `originalArtist` is only
 * relevant — and only shown in the Studio — for covers.
 */
export const music = defineType({
  name: 'music',
  title: 'Music',
  type: 'document',
  fields: [
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Album', value: 'album' },
          { title: 'EP', value: 'ep' },
          { title: 'Single', value: 'single' },
          { title: 'Cover', value: 'cover' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'originalArtist',
      title: 'Original Artist',
      type: 'string',
      description: 'Who originally recorded this. Covers only.',
      hidden: ({ document }) => document?.kind !== 'cover',
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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'A YouTube or other video link — used by the cover reel.',
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'links',
      title: 'Streaming Links',
      type: 'object',
      fields: [
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
        defineField({ name: 'bandcamp', title: 'Bandcamp', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
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
    select: {
      title: 'title',
      kind: 'kind',
      artist: 'originalArtist',
      media: 'coverArt',
    },
    prepare({ title, kind, artist }) {
      const subtitle =
        kind === 'cover' && artist ? `Cover · ${artist}` : (kind ?? '');
      return { title, subtitle };
    },
  },
});
