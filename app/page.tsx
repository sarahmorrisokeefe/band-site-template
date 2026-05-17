import Link from 'next/link';

import { getBand } from '@/lib/sanity/queries';

/**
 * Homepage — a Server Component smoke test.
 *
 * It proves the full data path: env -> client -> query layer -> Server
 * Component -> rendered output. It fetches via `lib/sanity/queries` and never
 * touches the Sanity client directly. The future component library will
 * follow the same rule, receiving data as props.
 */

type Band = NonNullable<Awaited<ReturnType<typeof getBand>>>;

/**
 * Flatten Portable Text blocks to plain text.
 *
 * A smoke-test shortcut only. Proper rich-text rendering (headings, marks,
 * links) belongs in the component library and is out of scope here.
 */
function bioToText(bio: Band['bio']): string {
  if (!bio) return '';
  return bio
    .map((block) => (block.children ?? []).map((c) => c.text ?? '').join(''))
    .filter(Boolean)
    .join('\n\n');
}

export default async function HomePage() {
  const band = await getBand();

  if (!band?.name) {
    return (
      <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-24">
        <h1 className="text-2xl font-semibold">No band content yet</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Add the band in the Studio, then reload this page.
        </p>
        <Link
          href="/studio"
          className="font-medium underline underline-offset-4"
        >
          Open the Studio →
        </Link>
      </main>
    );
  }

  const bio = bioToText(band.bio);

  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-24">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">{band.name}</h1>
        {(band.genre || band.foundedYear) && (
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            {[band.genre, band.foundedYear].filter(Boolean).join(' · ')}
          </p>
        )}
      </header>

      {bio && (
        <div className="flex flex-col gap-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          {bio.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}

      <p className="text-sm text-zinc-500">
        Editing content?{' '}
        <Link href="/studio" className="underline underline-offset-4">
          Open the Studio
        </Link>
        .
      </p>
    </main>
  );
}
