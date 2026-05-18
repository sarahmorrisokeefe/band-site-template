'use client';

import { useActionState } from 'react';

import { Button } from '@/components/primitives/button';
import { Heading } from '@/components/primitives/heading';
import { Section } from '@/components/primitives/section';
import { submitBookingRequest } from '@/lib/forms/actions';
import { HONEYPOT_FIELD } from '@/lib/forms/parse';
import { IDLE_FORM_STATE } from '@/lib/forms/types';

type BookingFormProps = {
  heading?: string;
  id?: string;
  className?: string;
};

/** Shared input/textarea styling. */
const CONTROL_CLASS =
  'w-full rounded-brand border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

/** A labelled text input with an optional validation error. */
function Field({
  label,
  name,
  type = 'text',
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        className={CONTROL_CLASS}
      />
      {error ? <span className="text-xs text-primary">{error}</span> : null}
    </label>
  );
}

/**
 * BookingForm block — a booking enquiry form. Submits through the
 * `submitBookingRequest` server action; the delivery destination (Sanity doc
 * or email) is chosen per band by the `BOOKING_DELIVERY` env var. Includes a
 * hidden honeypot field for spam protection.
 */
export function BookingForm({
  heading = 'Book the band',
  id,
  className,
}: BookingFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitBookingRequest,
    IDLE_FORM_STATE,
  );
  const errors = state.fieldErrors;

  return (
    <Section id={id} width="narrow" className={className}>
      <Heading as="h2" size="lg" className="mb-6">
        {heading}
      </Heading>

      {state.status === 'success' ? (
        <p className="rounded-brand bg-primary/10 px-4 py-3 text-sm text-foreground">
          {state.message}
        </p>
      ) : (
        <form action={formAction} className="flex flex-col gap-4">
          {state.status === 'error' && state.message ? (
            <p className="rounded-brand bg-foreground/5 px-4 py-3 text-sm text-primary">
              {state.message}
            </p>
          ) : null}

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

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required error={errors.name} />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              error={errors.email}
            />
            <Field label="Event type" name="eventType" />
            <Field label="City" name="city" />
            <Field label="Venue" name="venue" />
            <Field label="Date" name="date" />
            <Field label="Set length" name="setLength" />
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">Message *</span>
            <textarea
              name="message"
              required
              rows={5}
              aria-invalid={errors.message ? true : undefined}
              className={CONTROL_CLASS}
            />
            {errors.message ? (
              <span className="text-xs text-primary">{errors.message}</span>
            ) : null}
          </label>

          <Button type="submit" disabled={isPending} className="self-start">
            {isPending ? 'Sending…' : 'Send enquiry'}
          </Button>
        </form>
      )}
    </Section>
  );
}
