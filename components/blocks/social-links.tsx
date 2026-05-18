import { cn } from '@/lib/cn';

/** Social / streaming profile URLs keyed by platform; falsy entries are skipped. */
export type SocialLinks =
  | Record<string, string | null | undefined>
  | null
  | undefined;

/**
 * Human-readable labels for known platform keys. Unknown keys fall back to the
 * raw key. No icon library is in the stack yet, so platforms render as text.
 */
const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  bandcamp: 'Bandcamp',
};

/**
 * Reduce a social-links object to an ordered list of `[platform, url]` pairs,
 * dropping any platform whose URL is missing or empty. Pure — unit tested.
 */
export function compactSocialLinks(
  links: SocialLinks,
): Array<[string, string]> {
  if (!links) return [];
  return Object.entries(links).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );
}

type SocialLinkListProps = {
  links: SocialLinks;
  className?: string;
};

/**
 * Render social / streaming links as text labels. Renders nothing when there
 * are no usable links. Shared by SiteHeader, SiteFooter, and the music blocks'
 * per-release streaming links.
 */
export function SocialLinkList({ links, className }: SocialLinkListProps) {
  const entries = compactSocialLinks(links);
  if (entries.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {entries.map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-wide text-muted hover:text-primary"
        >
          {PLATFORM_LABELS[platform] ?? platform}
        </a>
      ))}
    </div>
  );
}
