/**
 * Demo content for the homepage seed script (`scripts/seed.ts`).
 *
 * Plain data only — no `_id`, no `_type`, no image fields; the seed script
 * adds those. Field names match the Sanity schemas in `sanity/schemas/`.
 */

/** Build a single normal Portable Text paragraph block. */
function paragraph(key: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
  };
}

/** A minimal `@sanity/color-input` colour value — the layout reads `.hex`. */
function color(hex: string) {
  return { _type: 'color', hex };
}

/** Demo theme: brand colours, corner radius, and layout density. No logo — this
 * deliberately exercises the `Brand` primitive's text-wordmark fallback. */
export const demoTheme = {
  colors: {
    primary: color('#e8552a'),
    accent: color('#22303c'),
    background: color('#fbf7f0'),
    foreground: color('#22303c'),
  },
  radius: 'rounded',
  density: 'normal',
};

/** Demo band singleton content. */
export const demoBand = {
  name: 'Marigold Avenue',
  tagline: 'Indie pop from the Carolina coast.',
  bio: [
    paragraph(
      'bio-1',
      'Marigold Avenue started in a Charlotte garage in 2019 and has spent every summer since on the road. Four friends, a van, and a stubborn belief that a good hook outlasts a trend.',
    ),
    paragraph(
      'bio-2',
      'Their songs pair bright, jangly guitars with the kind of choruses a whole room sings back. Three EPs and a debut album in, they still book their own shows and answer their own email.',
    ),
  ],
  foundedYear: 2019,
  genre: 'Indie pop',
  hometown: 'Charlotte, NC',
  stats: [
    { _type: 'stat', _key: 'stat-1', label: 'Shows played', value: '200+' },
    { _type: 'stat', _key: 'stat-2', label: 'Cities', value: '34' },
    { _type: 'stat', _key: 'stat-3', label: 'Years on the road', value: '6' },
    { _type: 'stat', _key: 'stat-4', label: 'Releases', value: '5' },
  ],
  socialLinks: {
    instagram: 'https://instagram.com/marigoldavenue',
    spotify: 'https://open.spotify.com/artist/marigoldavenue',
    bandcamp: 'https://marigoldavenue.bandcamp.com',
    youtube: 'https://youtube.com/@marigoldavenue',
  },
};

/** Demo band members. The seed script attaches a `photo` to each. */
export const demoMembers = [
  {
    name: 'Nadia Brooks',
    role: 'Lead Vocals',
    bio: [paragraph('m1-bio', 'Nadia writes most of the lyrics and once sang an entire set with laryngitis.')],
    socialHandle: '@nadiabrooks',
  },
  {
    name: 'Theo Park',
    role: 'Guitar',
    bio: [paragraph('m2-bio', 'Theo collects vintage pedals and is the reason load-in takes an extra hour.')],
    socialHandle: '@theopark',
  },
  {
    name: 'Cassidy Vaughn',
    role: 'Bass',
    bio: [paragraph('m3-bio', 'Cassidy holds the low end down and books the band’s tours from the passenger seat.')],
    socialHandle: '@cassvaughn',
  },
  {
    name: 'Iris Demarco',
    role: 'Drums',
    bio: [paragraph('m4-bio', 'Iris joined in 2021 and has not missed a downbeat since.')],
    socialHandle: '@irisdemarco',
  },
];

/** Shape of a demo show document body (the seed script adds `_id` / `_type`). */
type DemoShow = {
  date: string;
  venueName: string;
  venueCity: string;
  venueArea: string | null;
  supportAct: string | null;
  ticketUrl: string | null;
  status: string;
};

/** Demo shows — one of every status, with varied venues and dates. */
export const demoShows: DemoShow[] = [
  {
    date: '2026-06-12T20:00:00Z',
    venueName: 'The Underground',
    venueCity: 'Charlotte',
    venueArea: 'NoDa',
    supportAct: 'Sweater Weather',
    ticketUrl: 'https://example.com/tickets/1',
    status: 'onSale',
  },
  {
    date: '2026-07-04T19:30:00Z',
    venueName: 'Riverbank Stage',
    venueCity: 'Asheville',
    venueArea: null,
    supportAct: null,
    ticketUrl: 'https://example.com/tickets/2',
    status: 'fewLeft',
  },
  {
    date: '2026-08-09T21:00:00Z',
    venueName: 'The Fillmore',
    venueCity: 'Charlotte',
    venueArea: null,
    supportAct: 'Night Shift',
    ticketUrl: 'https://example.com/tickets/3',
    status: 'soldOut',
  },
  {
    date: '2026-09-19T18:00:00Z',
    venueName: 'Harbor Park',
    venueCity: 'Wilmington',
    venueArea: 'Downtown',
    supportAct: null,
    ticketUrl: null,
    status: 'free',
  },
  {
    date: '2026-10-31T20:30:00Z',
    venueName: 'Cat’s Cradle',
    venueCity: 'Carrboro',
    venueArea: null,
    supportAct: 'The Tidewalkers',
    ticketUrl: 'https://example.com/tickets/5',
    status: 'waitlist',
  },
];

/** Per-release streaming links; every platform is optional. */
type DemoMusicLinks = {
  spotify?: string;
  appleMusic?: string;
  bandcamp?: string;
  youtube?: string;
};

/** Shape of a demo music document body (the seed script adds `_id` / `_type`). */
type DemoMusic = {
  kind: string;
  title: string;
  originalArtist: string | null;
  releaseDate: string | null;
  videoUrl: string | null;
  note: string | null;
  links: DemoMusicLinks | null;
};

/**
 * Demo music — three originals then three covers. Every item carries every
 * field (with `null` where it does not apply) so the array is one clean shape.
 * The seed script attaches `coverArt` to each.
 */
export const demoMusic: DemoMusic[] = [
  {
    kind: 'album',
    title: 'Daylight Hours',
    originalArtist: null,
    releaseDate: '2025-03-10',
    videoUrl: null,
    note: 'The debut full-length, recorded live over two weeks.',
    links: {
      spotify: 'https://open.spotify.com/album/marigold-daylight',
      bandcamp: 'https://marigoldavenue.bandcamp.com/album/daylight-hours',
    },
  },
  {
    kind: 'ep',
    title: 'Night Drive',
    originalArtist: null,
    releaseDate: '2024-05-01',
    videoUrl: null,
    note: 'Four songs written on tour.',
    links: { appleMusic: 'https://music.apple.com/album/night-drive' },
  },
  {
    kind: 'single',
    title: 'Holding On',
    originalArtist: null,
    releaseDate: '2023-11-20',
    videoUrl: null,
    note: null,
    links: { spotify: 'https://open.spotify.com/track/marigold-holding-on' },
  },
  {
    kind: 'cover',
    title: 'Mr. Brightside',
    originalArtist: 'The Killers',
    releaseDate: null,
    videoUrl: 'https://www.youtube.com/watch?v=gGdGFtwCNBE',
    note: null,
    links: null,
  },
  {
    kind: 'cover',
    title: 'Dancing in the Dark',
    originalArtist: 'Bruce Springsteen',
    releaseDate: null,
    videoUrl: 'https://www.youtube.com/watch?v=129kuDCQtHs',
    note: null,
    links: null,
  },
  {
    kind: 'cover',
    title: 'Take On Me',
    originalArtist: 'a-ha',
    releaseDate: null,
    videoUrl: 'https://www.youtube.com/watch?v=djV11Xbc914',
    note: null,
    links: null,
  },
];
