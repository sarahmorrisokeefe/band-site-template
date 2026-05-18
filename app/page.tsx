import { About, type AboutBio } from '@/components/blocks/about';
import { BookingForm } from '@/components/blocks/booking-form';
import { CoverReel } from '@/components/blocks/cover-reel';
import { Hero, type HeroBand } from '@/components/blocks/hero';
import type { LinkItem } from '@/components/blocks/link-item';
import { MemberGrid } from '@/components/blocks/member-grid';
import { MusicGrid } from '@/components/blocks/music-grid';
import { Setlist } from '@/components/blocks/setlist';
import { ShowList } from '@/components/blocks/show-list';
import { SiteFooter } from '@/components/blocks/site-footer';
import { SiteHeader } from '@/components/blocks/site-header';
import { StatsGrid, type Stat } from '@/components/blocks/stats-grid';
import { Section } from '@/components/primitives/section';
import { getBand, getTheme } from '@/lib/sanity/queries';
import type {
  COVERS_QUERY_RESULT,
  MEMBERS_QUERY_RESULT,
  RELEASES_QUERY_RESULT,
  SHOWS_QUERY_RESULT,
} from '@/sanity.types';

/**
 * Phase 4 proof page: every block, every variant, rendered for visual review.
 *
 * SiteHeader and Hero run on live Sanity data (they degrade gracefully when
 * the dataset is empty). The eight Phase 4 blocks `return null` on empty
 * collections, so they are driven here by inline typed fixtures. Phase 6
 * replaces this page with the real composed homepage.
 */

const NAV: LinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Shows', href: '#shows' },
  { label: 'Music', href: '#music' },
];

const CTAS: LinkItem[] = [
  { label: 'Listen', href: '#music' },
  { label: 'Shows', href: '#shows' },
];

const SAMPLE_SOCIALS = {
  instagram: 'https://instagram.com/sampleband',
  spotify: 'https://open.spotify.com/artist/sample',
  bandcamp: 'https://sampleband.bandcamp.com',
};

const SAMPLE_BIO: AboutBio = [
  {
    _type: 'block',
    _key: 'bio1',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: 'bio1s1',
        text: 'Sample biography paragraph — verifies the About block renders Portable Text through the themed RichText renderer.',
        marks: [],
      },
    ],
  },
];

const SAMPLE_STATS: Stat[] = [
  { _type: 'stat', _key: 'st1', label: 'Shows played', value: '120+' },
  { _type: 'stat', _key: 'st2', label: 'Cities', value: '14' },
  { _type: 'stat', _key: 'st3', label: 'Years touring', value: '6' },
];

const SAMPLE_MEMBERS: MEMBERS_QUERY_RESULT = [
  {
    _id: 'm1',
    name: 'Alex Rivera',
    role: 'Lead Vocals',
    photo: null,
    bio: SAMPLE_BIO,
    socialHandle: '@alexrivera',
  },
  {
    _id: 'm2',
    name: 'Jordan Lee',
    role: 'Guitar',
    photo: null,
    bio: SAMPLE_BIO,
    socialHandle: '@jordanlee',
  },
  {
    _id: 'm3',
    name: 'Sam Okafor',
    role: 'Drums',
    photo: null,
    bio: SAMPLE_BIO,
    socialHandle: null,
  },
];

const SAMPLE_SHOWS: SHOWS_QUERY_RESULT = [
  {
    _id: 's1',
    date: '2026-06-12T20:00:00Z',
    venueName: 'The Underground',
    venueCity: 'Charlotte',
    venueArea: 'NoDa',
    supportAct: 'Sweater Weather',
    ticketUrl: 'https://example.com/tickets/s1',
    status: 'onSale',
  },
  {
    _id: 's2',
    date: '2026-07-04T19:30:00Z',
    venueName: 'Riverside Amphitheater',
    venueCity: 'Asheville',
    venueArea: null,
    supportAct: null,
    ticketUrl: 'https://example.com/tickets/s2',
    status: 'fewLeft',
  },
  {
    _id: 's3',
    date: '2026-08-22T21:00:00Z',
    venueName: 'The Fillmore',
    venueCity: 'Charlotte',
    venueArea: null,
    supportAct: 'Night Shift',
    ticketUrl: 'https://example.com/tickets/s3',
    status: 'soldOut',
  },
];

const SAMPLE_RELEASES: RELEASES_QUERY_RESULT = [
  {
    _id: 'r1',
    kind: 'album',
    title: 'Daylight Hours',
    coverArt: null,
    releaseDate: '2025-03-10',
    note: 'The debut full-length, recorded live over two weeks.',
    links: {
      spotify: 'https://open.spotify.com/album/sample',
      bandcamp: 'https://sampleband.bandcamp.com/album/daylight-hours',
    },
  },
  {
    _id: 'r2',
    kind: 'ep',
    title: 'Night Drive',
    coverArt: null,
    releaseDate: '2024-09-01',
    note: null,
    links: { appleMusic: 'https://music.apple.com/album/sample' },
  },
  {
    _id: 'r3',
    kind: 'single',
    title: 'Holding On',
    coverArt: null,
    releaseDate: '2023-11-20',
    note: null,
    links: null,
  },
];

const SAMPLE_COVERS: COVERS_QUERY_RESULT = [
  {
    _id: 'c1',
    title: 'Mr. Brightside',
    originalArtist: 'The Killers',
    coverArt: null,
    videoUrl: 'https://youtube.com/watch?v=sample1',
    note: null,
    links: null,
  },
  {
    _id: 'c2',
    title: 'Dancing in the Dark',
    originalArtist: 'Bruce Springsteen',
    coverArt: null,
    videoUrl: 'https://youtube.com/watch?v=sample2',
    note: null,
    links: null,
  },
  {
    _id: 'c3',
    title: 'Take On Me',
    originalArtist: 'a-ha',
    coverArt: null,
    videoUrl: null,
    note: null,
    links: null,
  },
];

/** Grey caption strip identifying each block/variant under review. */
function Caption({ children }: { children: string }) {
  return (
    <p className="bg-foreground/5 px-6 py-1 text-xs uppercase tracking-widest text-muted">
      {children}
    </p>
  );
}

export default async function HomePage() {
  const [band, theme] = await Promise.all([getBand(), getTheme()]);

  const heroBand: HeroBand = {
    name: band?.name ?? null,
    tagline: band?.tagline ?? null,
    heroImage: band?.heroImage ?? null,
  };
  const logo = theme?.logo ?? null;
  const bandName = band?.name ?? 'Sample Band';

  return (
    <div className="flex flex-col">
      {(['standard', 'minimal', 'centered'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`SiteHeader — ${variant}`}</Caption>
          <SiteHeader
            variant={variant}
            logo={logo}
            bandName={bandName}
            nav={NAV}
            socialLinks={SAMPLE_SOCIALS}
          />
        </section>
      ))}

      {(['full-bleed', 'split', 'typographic'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`Hero — ${variant}`}</Caption>
          <Hero variant={variant} band={heroBand} logo={logo} ctas={CTAS} />
        </section>
      ))}

      {(['text-only', 'text-stats'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`About — ${variant}`}</Caption>
          <About variant={variant} bio={SAMPLE_BIO} stats={SAMPLE_STATS} />
        </section>
      ))}

      {(['tiles', 'inline'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`StatsGrid — ${variant}`}</Caption>
          <Section width="default">
            <StatsGrid variant={variant} stats={SAMPLE_STATS} />
          </Section>
        </section>
      ))}

      {(['grid', 'row', 'featured'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`MemberGrid — ${variant}`}</Caption>
          <MemberGrid variant={variant} members={SAMPLE_MEMBERS} />
        </section>
      ))}

      {(['list', 'compact', 'cards'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`ShowList — ${variant}`}</Caption>
          <ShowList variant={variant} shows={SAMPLE_SHOWS} />
        </section>
      ))}

      {(['grid', 'featured'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`MusicGrid — ${variant}`}</Caption>
          <MusicGrid variant={variant} releases={SAMPLE_RELEASES} />
        </section>
      ))}

      {(['carousel', 'grid'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`CoverReel — ${variant}`}</Caption>
          <CoverReel variant={variant} covers={SAMPLE_COVERS} />
        </section>
      ))}

      {(['numbered', 'columns'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`Setlist — ${variant}`}</Caption>
          <Setlist variant={variant} covers={SAMPLE_COVERS} />
        </section>
      ))}

      <section>
        <Caption>BookingForm</Caption>
        <BookingForm />
      </section>

      {(['columns', 'stacked'] as const).map((variant) => (
        <section key={variant}>
          <Caption>{`SiteFooter — ${variant}`}</Caption>
          <SiteFooter
            variant={variant}
            logo={logo}
            bandName={bandName}
            nav={NAV}
            socialLinks={SAMPLE_SOCIALS}
          />
        </section>
      ))}
    </div>
  );
}
