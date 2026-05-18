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
  foundedYear,
  genre,
  hometown,
  stats,
  socialLinks
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

export const THEME_QUERY = defineQuery(`*[_type == "theme"][0]{
  logo,
  colors,
  radius,
  density
}`);

/**
 * Fetch the brand theme singleton.
 *
 * Cached for an hour and tagged `theme` — it changes rarely but sits on every
 * page's critical path, so it must not inherit the 60s content cadence.
 */
export function getTheme() {
  return client.fetch(
    THEME_QUERY,
    {},
    { next: { revalidate: 3600, tags: ['theme'] } },
  );
}

export const MEMBERS_QUERY = defineQuery(`*[_type == "member"]|order(name asc){
  _id,
  name,
  role,
  photo,
  bio,
  socialHandle
}`);

/** Fetch all band members, ordered by name. */
export function getMembers() {
  return client.fetch(
    MEMBERS_QUERY,
    {},
    { next: { revalidate: 60, tags: ['member'] } },
  );
}

export const SHOWS_QUERY = defineQuery(`*[_type == "show"]|order(date asc){
  _id,
  date,
  venueName,
  venueCity,
  venueArea,
  supportAct,
  ticketUrl,
  status
}`);

/** Fetch all shows, soonest date first. */
export function getShows() {
  return client.fetch(
    SHOWS_QUERY,
    {},
    { next: { revalidate: 60, tags: ['show'] } },
  );
}

export const RELEASES_QUERY = defineQuery(`*[_type == "music" && kind != "cover"]|order(coalesce(releaseDate, _createdAt) desc){
  _id,
  kind,
  title,
  coverArt,
  releaseDate,
  note,
  links
}`);

/** Fetch original releases (albums / EPs / singles), newest first. */
export function getReleases() {
  return client.fetch(
    RELEASES_QUERY,
    {},
    { next: { revalidate: 60, tags: ['music'] } },
  );
}

export const COVERS_QUERY = defineQuery(`*[_type == "music" && kind == "cover"]|order(coalesce(releaseDate, _createdAt) desc){
  _id,
  title,
  originalArtist,
  coverArt,
  videoUrl,
  note,
  links
}`);

/** Fetch covers the band performs, newest first. */
export function getCovers() {
  return client.fetch(
    COVERS_QUERY,
    {},
    { next: { revalidate: 60, tags: ['music'] } },
  );
}
