import { defineCliConfig } from 'sanity/cli';

/**
 * Configuration for the Sanity CLI (`sanity ...`), used by `npm run typegen`.
 * App/Studio runtime config lives in `sanity.config.ts`.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
