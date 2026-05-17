import type { StructureResolver } from 'sanity/structure';

/** Document types that are singletons: exactly one instance, with a fixed id. */
export const SINGLETON_TYPES = new Set<string>(['band']);

/**
 * Studio structure.
 *
 * `band` is pinned as a single editable document so editors open it directly
 * and cannot create duplicates. Every other type is an ordinary collection.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Band')
        .id('band')
        .schemaType('band')
        .child(S.document().schemaType('band').documentId('band')),
      S.divider(),
      S.documentTypeListItem('member').title('Members'),
      S.documentTypeListItem('show').title('Shows'),
      S.documentTypeListItem('release').title('Releases'),
      S.documentTypeListItem('page').title('Pages'),
    ]);
