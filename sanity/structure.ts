import type { StructureResolver } from 'sanity/structure';

/** Document types that are singletons: exactly one instance, with a fixed id. */
export const SINGLETON_TYPES = new Set<string>(['band', 'theme']);

/**
 * Studio structure.
 *
 * `theme` and `band` are pinned as single editable documents. Every other type
 * is an ordinary collection.
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
    ]);
