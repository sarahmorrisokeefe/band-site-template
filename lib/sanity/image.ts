import createImageUrlBuilder, {
  type SanityImageSource,
} from '@sanity/image-url';

import { dataset, projectId } from './env';

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a URL for a Sanity image source.
 *
 * Usage: `urlFor(band.logo).width(480).url()`. See
 * https://www.sanity.io/docs/image-url for the full chainable API.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
