import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';
import type { BAND_QUERY_RESULT } from '@/sanity.types';

import { statsGridVariants } from './stats-grid-variants';

/** A single labelled stat, as stored on the band singleton. */
export type Stat = NonNullable<NonNullable<BAND_QUERY_RESULT>['stats']>[number];

type StatsGridProps = VariantProps<typeof statsGridVariants> & {
  stats: Stat[] | null | undefined;
  className?: string;
};

/**
 * Render the band's labelled stats as a description list. A sub-block: it
 * renders only the `<dl>` — `About` composes it inside its own Section, and the
 * proof page wraps it when it stands alone. Renders nothing with no stats.
 */
export function StatsGrid({ variant, stats, className }: StatsGridProps) {
  const items = (stats ?? []).filter(
    (stat): stat is Stat & { label: string; value: string } =>
      Boolean(stat.label) && Boolean(stat.value),
  );
  if (items.length === 0) return null;

  return (
    <dl className={cn(statsGridVariants({ variant }), className)}>
      {items.map((stat) => (
        <div key={stat._key} className="flex flex-col-reverse gap-1">
          <dt className="text-sm uppercase tracking-wide text-muted">
            {stat.label}
          </dt>
          <dd className="font-display text-4xl font-extrabold text-primary">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
