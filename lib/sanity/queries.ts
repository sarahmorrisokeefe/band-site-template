import { defineQuery } from 'next-sanity';

import { client } from './client';

/**
 * GROQ queries and their typed fetch helpers.
 *
 * Every query is wrapped in `defineQuery` so that `npm run typegen` can
 * generate a precise result type for it. Components never import this file;
 * only Server Components do, and they pass plain data down as props.
 */

export const BAND_QUERY = defineQuery(`*[_type == "band"][0]{
  name,
  bio,
  logo,
  foundedYear,
  genre
}`);

/**
 * Fetch the band singleton.
 *
 * Cached for 60s and tagged `band` so it can be revalidated on demand later
 * (e.g. from a Sanity webhook calling `revalidateTag('band')`).
 */
export function getBand() {
  return client.fetch(
    BAND_QUERY,
    {},
    { next: { revalidate: 60, tags: ['band'] } },
  );
}
