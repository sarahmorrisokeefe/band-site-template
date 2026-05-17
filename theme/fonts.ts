import { Inter, Oswald } from 'next/font/google';

/**
 * Per-band typography. Swapped at onboarding for a new band.
 * `band-sans` is body text; `band-display` is headings.
 */
export const sans = Inter({
  subsets: ['latin'],
  variable: '--font-band-sans',
  display: 'swap',
});

export const display = Oswald({
  subsets: ['latin'],
  variable: '--font-band-display',
  display: 'swap',
});
