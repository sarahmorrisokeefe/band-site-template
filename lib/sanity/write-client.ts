import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, token } from './env';

/**
 * Server-only Sanity client with write access.
 *
 * Carries the `SANITY_API_TOKEN` and MUST never be imported into a Client
 * Component. Used by the form delivery layer to create submission documents.
 * The token must be Editor-scoped — the default Viewer token cannot write.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});
