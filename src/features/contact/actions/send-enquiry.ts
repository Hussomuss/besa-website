"use server";

import { CONTACT } from "@/data/contact";
import type { EnquiryField } from "@/shared/types/content";
import type { EnquiryState } from "./enquiry-state";
import { HONEYPOT_FIELD } from "./enquiry-state";

type Enquiry = Record<EnquiryField, string>;

/**
 * Deliberately permissive. A stricter pattern rejects addresses that are valid
 * — quoted local parts, new top-level domains — and the only test that settles
 * whether an address works is sending to it. This catches the typo class:
 * a missing @, a missing dot, a stray space.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Counted in digits rather than matched as a shape, so every way a person might
 * write the same number passes: +44 20 1234 5678, (020) 1234 5678, 02012345678.
 * Fifteen is the most E.164 permits; seven is the shortest national number in
 * use anywhere.
 */
const PHONE_DIGITS = { min: 7, max: 15 };

const read = (formData: FormData, field: string) => {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
};

/**
 * The seam, and the only part of this page that is not real.
 *
 * There is no mail transport in the project: adding one means a dependency, an
 * API key and a verified sending domain, none of which exist yet. Everything
 * around this function — validation, per-field errors, pending, success, and
 * the no-JavaScript path — is finished and does not change when the transport
 * arrives. This body becomes the send:
 *
 *     await resend.emails.send({ to: SITE.email, replyTo: enquiry.email, ... })
 *
 * One thing still belongs here and not before, because it costs money rather
 * than bytes: rate limiting per address. The length caps and the honeypot are
 * already below.
 */
async function deliver(enquiry: Enquiry) {
  console.info("[enquiry] no transport configured, not delivered:", enquiry);
}

export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  /*
   * Answered with success rather than with a refusal. A bot told that it failed
   * tries again with the field left blank; a bot told that it worked goes away.
   * Checked before anything else so a caught submission costs no validation.
   */
  if (read(formData, HONEYPOT_FIELD)) {
    return { status: "sent", errors: {}, values: {} };
  }

  const values: Enquiry = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    phone: read(formData, "phone"),
    note: read(formData, "note"),
  };

  const { limits, errors: copy } = CONTACT;
  const errors: EnquiryState["errors"] = {};

  if (!values.name) errors.name = copy.name.missing;
  else if (values.name.length > limits.name) errors.name = copy.name.long;

  /* Length before shape: a 900-character string that is also not an address
     should be told the thing the reader can act on first. */
  if (!values.email) errors.email = copy.email.missing;
  else if (values.email.length > limits.email) errors.email = copy.email.long;
  else if (!EMAIL.test(values.email)) errors.email = copy.email.invalid;

  /* Optional, so an empty phone is never wrong — only a filled-in one can be. */
  if (values.phone) {
    const digits = values.phone.replace(/\D/g, "");
    if (values.phone.length > limits.phone) errors.phone = copy.phone.long;
    else if (digits.length < PHONE_DIGITS.min || digits.length > PHONE_DIGITS.max)
      errors.phone = copy.phone.invalid;
  }

  if (!values.note) errors.note = copy.note.missing;
  else if (values.note.length > limits.note) errors.note = copy.note.long;

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  try {
    await deliver(values);
  } catch {
    /* The values are kept so a second attempt costs nothing to make. */
    return { status: "failed", errors: {}, message: copy.failed, values };
  }

  return { status: "sent", errors: {}, values: {} };
}
