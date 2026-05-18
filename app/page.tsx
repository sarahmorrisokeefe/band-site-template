import { About } from '@/components/blocks/about';
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
import {
  getBand,
  getCovers,
  getMembers,
  getReleases,
  getShows,
  getTheme,
} from '@/lib/sanity/queries';

/**
 * The band homepage — the real composed site, assembled from the block library
 * and fed by the Sanity query layer. This is the page each band's fork
 * inherits: connect a Sanity project, add content in the Studio (or run
 * `npm run seed` for demo content), and the homepage fills in.
 *
 * Composition — which blocks appear, in what order, with which variants — is
 * deliberately hand-written here, not data-driven: per the design spec, each
 * band's composition is code. Every block renders nothing when its data is
 * empty, so this page is safe before any content exists.
 */

/** In-page navigation — the sections this homepage composes. */
const NAV: LinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Shows', href: '#shows' },
  { label: 'Music', href: '#music' },
  { label: 'Book', href: '#book' },
];

/** Hero call-to-action buttons. */
const HERO_CTAS: LinkItem[] = [
  { label: 'Listen', href: '#music' },
  { label: 'Book the band', href: '#book' },
];

export default async function HomePage() {
  const [theme, band, members, shows, releases, covers] = await Promise.all([
    getTheme(),
    getBand(),
    getMembers(),
    getShows(),
    getReleases(),
    getCovers(),
  ]);

  const logo = theme?.logo ?? null;
  const bandName = band?.name ?? 'Band';
  const heroBand: HeroBand = {
    name: band?.name ?? null,
    tagline: band?.tagline ?? null,
    heroImage: band?.heroImage ?? null,
  };

  return (
    <div className="flex flex-col">
      <SiteHeader
        variant="standard"
        logo={logo}
        bandName={bandName}
        nav={NAV}
        socialLinks={band?.socialLinks}
      />

      <Hero variant="full-bleed" band={heroBand} logo={logo} ctas={HERO_CTAS} />

      <About
        variant="text-stats"
        id="about"
        bio={band?.bio ?? null}
        stats={band?.stats ?? null}
      />

      <ShowList variant="list" id="shows" shows={shows} />

      <MusicGrid variant="grid" id="music" releases={releases} />

      <CoverReel variant="carousel" covers={covers} />

      <Setlist variant="numbered" covers={covers} />

      <MemberGrid variant="grid" members={members} />

      <BookingForm id="book" />

      <SiteFooter
        variant="columns"
        logo={logo}
        bandName={bandName}
        nav={NAV}
        socialLinks={band?.socialLinks}
      />
    </div>
  );
}
