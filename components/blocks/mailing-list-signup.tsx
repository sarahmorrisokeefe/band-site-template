'use client';

import { useActionState } from 'react';

import { Button } from '@/components/primitives/button';
import { cn } from '@/lib/cn';
import { subscribeToMailingList } from '@/lib/forms/actions';
import { HONEYPOT_FIELD } from '@/lib/forms/parse';
import { IDLE_FORM_STATE } from '@/lib/forms/types';

type MailingListSignupProps = {
  heading?: string;
  className?: string;
};

/**
 * Mailing-list signup — a compact email-capture form. Submits through the
 * `subscribeToMailingList` server action; delivery destination is chosen per
 * band by the `BOOKING_DELIVERY` env var. Rendered inside `SiteFooter`.
 */
export function MailingListSignup({
  heading = 'Mailing list',
  className,
}: MailingListSignupProps) {
  const [state, formAction, isPending] = useActionState(
    subscribeToMailingList,
    IDLE_FORM_STATE,
  );
  const emailError = state.fieldErrors.email;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <p className="text-sm uppercase tracking-wide text-foreground">{heading}</p>

      {state.status === 'success' ? (
        <p className="text-sm text-muted">{state.message}</p>
      ) : (
        <form action={formAction} className="flex flex-col gap-2">
          {/* Honeypot — hidden from people, tempting to naive bots. */}
          <div hidden aria-hidden="true">
            <label>
              Company
              <input
                type="text"
                name={HONEYPOT_FIELD}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              aria-label="Email address"
              aria-invalid={emailError ? true : undefined}
              className="w-full rounded-brand border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? '…' : 'Join'}
            </Button>
          </div>

          {emailError ? (
            <span className="text-xs text-primary">{emailError}</span>
          ) : null}
          {state.status === 'error' && !emailError && state.message ? (
            <span className="text-xs text-primary">{state.message}</span>
          ) : null}
        </form>
      )}
    </div>
  );
}
