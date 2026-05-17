import type { SchemaTypeDefinition } from 'sanity';

import { band } from './band';
import { member } from './member';
import { page } from './page';
import { release } from './release';
import { show } from './show';
import { theme } from './theme';

/**
 * Registry of every content type. To add a new content type:
 *   1. Create `sanity/schemas/<name>.ts` exporting a `defineType(...)`.
 *   2. Import it here and add it to this array.
 *   3. Run `npm run typegen` to regenerate `sanity.types.ts`.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  theme,
  band,
  member,
  show,
  release,
  page,
];
