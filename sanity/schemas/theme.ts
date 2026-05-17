import { defineField, defineType } from 'sanity';

import { contrastRatio } from '../lib/contrast';

/**
 * Brand theme. Singleton — exactly one per deployment (enforced in
 * `sanity/structure.ts` and `sanity.config.ts`). Brand-only by design;
 * site-wide config does not belong here.
 */
export const theme = defineType({
  name: 'theme',
  title: 'Theme',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        defineField({
          name: 'primary',
          title: 'Primary logo (wordmark)',
          type: 'image',
          options: { hotspot: true },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'mark',
          title: 'Compact mark (icon)',
          type: 'image',
          options: { hotspot: true },
          description:
            'Optional. Used at small sizes where the wordmark would not be legible.',
        }),
      ],
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'object',
      fields: [
        defineField({ name: 'primary', title: 'Primary', type: 'color' }),
        defineField({ name: 'accent', title: 'Accent', type: 'color' }),
        defineField({ name: 'background', title: 'Background', type: 'color' }),
        defineField({
          name: 'foreground',
          title: 'Foreground (text)',
          type: 'color',
        }),
      ],
      validation: (rule) =>
        rule
          .custom((colors) => {
            const value = colors as
              | { background?: { hex?: string }; foreground?: { hex?: string } }
              | undefined;
            const bg = value?.background?.hex;
            const fg = value?.foreground?.hex;
            if (!bg || !fg) return true;
            const ratio = contrastRatio(bg, fg);
            if (ratio >= 4.5) return true;
            return `Background/foreground contrast is ${ratio.toFixed(
              1,
            )}:1 — below the WCAG AA minimum of 4.5:1. Text may be hard to read.`;
          })
          .warning(),
    }),
    defineField({
      name: 'radius',
      title: 'Corner radius',
      type: 'string',
      options: {
        list: [
          { title: 'Sharp', value: 'sharp' },
          { title: 'Subtle', value: 'subtle' },
          { title: 'Rounded', value: 'rounded' },
        ],
        layout: 'radio',
      },
      initialValue: 'subtle',
    }),
    defineField({
      name: 'density',
      title: 'Spacing density',
      type: 'string',
      options: {
        list: [
          { title: 'Compact', value: 'compact' },
          { title: 'Normal', value: 'normal' },
          { title: 'Airy', value: 'airy' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
  ],
  preview: { prepare: () => ({ title: 'Theme' }) },
});
