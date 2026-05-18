import type { StructureResolver } from 'sanity/structure';

/** Document types that are singletons: exactly one instance, with a fixed id. */
export const SINGLETON_TYPES = new Set<string>(['band', 'theme']);

/**
 * Submission types — written by the form server action, not authored by
 * editors. Kept out of the Studio "create" menu (see `sanity.config.ts`).
 */
export const SUBMISSION_TYPES = new Set<string>([
  'bookingRequest',
  'subscriber',
]);

/**
 * Studio structure.
 *
 * `theme` and `band` are pinned as single editable documents. Other content
 * types are ordinary collections. Submission types are listed last so editors
 * can read them.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Theme')
        .id('theme')
        .schemaType('theme')
        .child(S.document().schemaType('theme').documentId('theme')),
      S.listItem()
        .title('Band')
        .id('band')
        .schemaType('band')
        .child(S.document().schemaType('band').documentId('band')),
      S.divider(),
      S.documentTypeListItem('member').title('Members'),
      S.documentTypeListItem('show').title('Shows'),
      S.documentTypeListItem('music').title('Music'),
      S.documentTypeListItem('page').title('Pages'),
      S.divider(),
      S.documentTypeListItem('bookingRequest').title('Booking Requests'),
      S.documentTypeListItem('subscriber').title('Subscribers'),
    ]);
