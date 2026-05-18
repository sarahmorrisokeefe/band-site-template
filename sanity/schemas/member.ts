import { defineField, defineType } from 'sanity';

/** A band member. */
export const member = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Instrument',
      type: 'string',
      description: 'e.g. "Lead Vocals", "Drums", "Bass / Backing Vocals".',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'socialHandle',
      title: 'Social Handle',
      type: 'string',
      description: 'e.g. "@giannacaminiti".',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
});
