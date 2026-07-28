import type { EnquiryField } from "@/shared/types/content";

/**
 * What the enquiry action hands back, and what the form renders from.
 *
 * It lives here rather than beside the action because a `"use server"` module
 * may export nothing but async functions, and both the client form and the
 * action need this shape.
 */
export interface EnquiryState {
  status: "idle" | "invalid" | "failed" | "sent";
  /** Keyed by control name, so a field can find its own message. */
  errors: Partial<Record<EnquiryField, string>>;
  /** The action's own failure, which belongs to no single field. */
  message?: string;
  /**
   * Echoed back so the form refills itself after a rejected submission —
   * including with JavaScript off, where the response is a fresh document and
   * nothing else would survive the round trip.
   */
  values: Partial<Record<EnquiryField, string>>;
}

export const IDLE_ENQUIRY: EnquiryState = {
  status: "idle",
  errors: {},
  values: {},
};

/**
 * A field no reader can see, which a bot fills because it fills everything it
 * finds. The cheapest spam gate there is: no third party, no key, and nothing
 * for a person to solve.
 *
 * Named for something a contact form plausibly asks, so it is worth filling in.
 * It lives here rather than beside the action for the same reason the state
 * does — a `"use server"` module may export nothing but async functions.
 */
export const HONEYPOT_FIELD = "company";
