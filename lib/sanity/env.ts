/**
 * Validated Sanity environment variables.
 *
 * This is the single source of truth for Sanity config values. It is imported
 * by both the Next.js app and the embedded Studio, so it must not depend on
 * anything Next- or browser-specific.
 */

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage);
  }
  return value;
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-17';

/**
 * Server-only token for reading draft/unpublished content.
 *
 * NEVER import this into a Client Component or pass it to a client that runs
 * in the browser. Public published content does not require it.
 */
export const token = process.env.SANITY_API_TOKEN;
