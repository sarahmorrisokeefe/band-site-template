/**
 * Layout for the embedded Studio route.
 *
 * Holds the route-segment config and metadata that the Studio page itself
 * cannot export (the page is a Client Component — see `[[...tool]]/page.tsx`).
 */
export { metadata, viewport } from 'next-sanity/studio';

export const dynamic = 'force-static';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
