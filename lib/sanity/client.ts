import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from './env';

/**
 * Public, read-only Sanity client.
 *
 * Serves only `published` content and carries no API token, so it is safe to
 * use from Server Components that render public pages. Draft/preview reads
 * will need a separate, server-only client built with `env.token` — add that
 * when preview mode is implemented.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});
