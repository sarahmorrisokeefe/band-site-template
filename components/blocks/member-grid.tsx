import type { SanityImageSource } from '@sanity/image-url';
import { type VariantProps } from 'class-variance-authority';

import { Heading } from '@/components/primitives/heading';
import { SanityImage } from '@/components/primitives/sanity-image';
import { Section } from '@/components/primitives/section';
import { RichText } from '@/components/rich-text/rich-text';
import { cn } from '@/lib/cn';
import type { MEMBERS_QUERY_RESULT } from '@/sanity.types';

import { memberGridVariants } from './member-grid-variants';

/** A single band member, as returned by `getMembers()`. */
export type Member = MEMBERS_QUERY_RESULT[number];

type MemberGridProps = VariantProps<typeof memberGridVariants> & {
  members: MEMBERS_QUERY_RESULT;
  heading?: string;
  id?: string;
  className?: string;
};

/**
 * One member: square photo (or a neutral placeholder), name, role, optional
 * social handle, and — only on the featured variant — the member's bio.
 */
function MemberCard({
  member,
  featured,
  rowWidth,
}: {
  member: Member;
  featured: boolean;
  rowWidth: boolean;
}) {
  return (
    <article className={cn('flex flex-col gap-3', rowWidth && 'w-44')}>
      <div className="relative aspect-square w-full overflow-hidden rounded-brand bg-foreground/5">
        {member.photo ? (
          <SanityImage
            image={member.photo as SanityImageSource}
            alt={member.name ?? 'Band member'}
            width={600}
            height={600}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <Heading as="h3" size="sm">
          {member.name ?? 'Unnamed'}
        </Heading>
        {member.role ? (
          <p className="text-sm uppercase tracking-wide text-muted">
            {member.role}
          </p>
        ) : null}
        {member.socialHandle ? (
          <p className="text-xs text-muted">{member.socialHandle}</p>
        ) : null}
      </div>
      {featured && member.bio && member.bio.length > 0 ? (
        <div className="text-sm">
          <RichText value={member.bio} />
        </div>
      ) : null}
    </article>
  );
}

/**
 * MemberGrid block. `grid` and `row` show compact member cards; `featured`
 * additionally renders each member's bio. Renders nothing with no members.
 */
export function MemberGrid({
  variant,
  members,
  heading = 'Members',
  id,
  className,
}: MemberGridProps) {
  if (members.length === 0) return null;
  const resolved = variant ?? 'grid';

  return (
    <Section id={id} width="wide" className={className}>
      <Heading as="h2" size="lg" className="mb-8">
        {heading}
      </Heading>
      <div className={memberGridVariants({ variant })}>
        {members.map((member) => (
          <MemberCard
            key={member._id}
            member={member}
            featured={resolved === 'featured'}
            rowWidth={resolved === 'row'}
          />
        ))}
      </div>
    </Section>
  );
}
