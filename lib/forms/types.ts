/** Cleaned booking-enquiry fields, as parsed from the submitted form. */
export type BookingRequestInput = {
  name: string;
  email: string;
  eventType: string;
  venue: string;
  city: string;
  date: string;
  setLength: string;
  message: string;
};

/** Cleaned mailing-list signup fields. */
export type SubscriberInput = {
  email: string;
};

/** Result of a form submission, returned by the server action to the form UI. */
export type FormState = {
  status: 'idle' | 'success' | 'error';
  /** A human-readable banner message. Empty in the idle state. */
  message: string;
  /** Per-field validation messages, keyed by field name. Empty when valid. */
  fieldErrors: Record<string, string>;
};

/** The initial, pre-submission form state passed to `useActionState`. */
export const IDLE_FORM_STATE: FormState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
};

/**
 * A pluggable submission destination — one per band, chosen by env var.
 * Adapter methods throw on failure; the server action catches and reports.
 */
export type DeliveryAdapter = {
  deliverBooking(input: BookingRequestInput): Promise<void>;
  deliverSubscriber(input: SubscriberInput): Promise<void>;
};
