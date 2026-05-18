import { fileURLToPath } from 'node:url';
import { config as dotenvConfig } from 'dotenv';
import { defineConfig } from 'vitest/config';

// Load .env.local so tests that transitively import Sanity clients can
// resolve NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.
dotenvConfig({ path: '.env.local' });

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts', '**/*.test.tsx'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
});
