import NextImage from 'next/image';

import { type SanityImageSource } from '@sanity/image-url';

import { cn } from '@/lib/cn';
import { urlFor } from '@/lib/sanity/image';

type SanityImageProps = {
  image: SanityImageSource;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Bridge between a Sanity image and `next/image`. Builds an optimized,
 * correctly-sized URL via `urlFor()` so blocks never repeat that wiring.
 */
export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
}: SanityImageProps) {
  const src = urlFor(image)
    .width(width)
    .height(height)
    .fit('max')
    .auto('format')
    .url();

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={cn(className)}
    />
  );
}
