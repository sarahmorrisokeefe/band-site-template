# band-site-template — Design Spec

**Date:** 2026-05-17
**Status:** Approved

## Goal

Scaffold a Next.js + Sanity band website. Build one band's site now, but
structure it as a **reusable template**: each future band client = fork this
repo → new Sanity project → new Vercel deploy.

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Multi-tenancy | Project-per-band | Isolation at the Sanity project boundary eliminates cross-tenant leak bugs and gives per-client billing. |
| `band` content | Singleton | One band per deployment; editors cannot create duplicates. |
| Sanity layer | `lib/sanity/` only | Components consume typed props; Server Components fetch via the query layer. Components never call Sanity directly. |
| Types | `sanity typegen` | Types derived from schema + `defineQuery` GROQ, committed as `sanity.types.ts`. |

## Stack

Next.js (App Router), TypeScript strict, Tailwind CSS, Sanity v3 (embedded
Studio at `/studio`), `next-sanity`, `@sanity/image-url`, `@sanity/vision`,
`styled-components` (Sanity peer dep). No `src/` dir, `@/*` import alias.

## Directory Layout

```
app/
  layout.tsx, globals.css
  page.tsx                     # homepage — Server Component smoke test
  studio/[[...tool]]/page.tsx  # embedded Sanity Studio
lib/sanity/
  env.ts        # validated env vars (throws if missing)
  client.ts     # public published-perspective client (no token)
  image.ts      # urlFor() image URL builder
  queries.ts    # defineQuery GROQ + typed fetch helpers
sanity/
  schemas/  band.ts member.ts show.ts release.ts page.ts index.ts
  structure.ts  # Studio desk structure — band as singleton
sanity.config.ts
sanity.types.ts  # generated via `sanity typegen`, committed
.env.example, README.md
```

## Schemas

- **band** (singleton): name, bio (block content), logo (image), foundedYear, genre
- **member**: name, role/instrument, photo (image), bio
- **show**: date, venueName, venueCity, ticketUrl, isSoldOut (boolean)
- **release**: title, releaseType (album/EP/single), coverArt (image), releaseDate, streamingLinks (spotify/appleMusic/bandcamp)
- **page**: title, slug, body (block content)

Each schema is a self-contained file using `defineType`/`defineField`.
Adding a schema later = add a file + register it in `sanity/schemas/index.ts`.

## Key Correctness Requirements (from review)

1. GROQ queries wrapped in `defineQuery` so typegen produces real result types.
2. Public client is **token-free** with `perspective: 'published'`. `SANITY_API_TOKEN`
   is server-only, reserved for a future preview/draft client; never browser-reachable.
3. Homepage fetch uses `next: { revalidate: 60 }`. Webhook tag-revalidation is
   documented as follow-up work.
4. `band` singleton uses the full pattern: fixed `_id`, type removed from
   `newDocumentOptions`, `delete`/`duplicate` removed from `document.actions`.

## Out of Scope (intentional)

- `page` schema is scaffolded but **not routed** (no `app/[slug]/page.tsx`).
- The custom React component library that will consume this data.
- Preview/draft mode.

## Smoke Test

`app/page.tsx` is a Server Component that fetches band name + bio via the
`lib/sanity/queries.ts` layer and renders them — proving the full data path.

## Template Sync Tradeoff

Project-per-band means a schema change must propagate to every client repo.
Near-term: keep an upstream git remote to pull template changes. Longer-term:
publish schemas as a private npm package consumed by each client. Documented
in README so the tradeoff is explicit.
