'use client';

/**
 * Embedded Sanity Studio, served at `/studio`.
 *
 * This page is a Client Component on purpose. `sanity.config.ts` pulls in
 * Sanity's plugin code, which calls `React.createContext` at module load.
 * That API does not exist in the React Server Components runtime, so the
 * config must be evaluated on the client. Route config (`metadata`,
 * `dynamic`) therefore lives in the sibling `layout.tsx`.
 */
import { NextStudio } from 'next-sanity/studio';

import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
