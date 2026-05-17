import {
  PortableText,
  type PortableTextComponents,
} from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

import { Heading } from '@/components/primitives/heading';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <Heading as="h2" size="lg" className="mt-8 mb-3">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" size="md" className="mt-6 mb-2">
        {children}
      </Heading>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-7 text-foreground">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 border-primary pl-4 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

/**
 * Themed Portable Text renderer. Composes the `Heading` primitive so
 * rich-text headings match standalone ones. Used by About and page bodies.
 */
export function RichText({
  value,
}: {
  value: PortableTextBlock[] | null | undefined;
}) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
