"use server";

import { CONTACT } from "@/data/contact";
import type { EnquiryField } from "@/shared/types/content";
import type { EnquiryState } from "./enquiry-state";

type Enquiry = Record<EnquiryField, string>;

/**
 * Deliberately permissive. A stricter pattern rejects addresses that are valid
 * — quoted local parts, new top-level domains — and the only test that settles
 * whether an address works is sending to it. This catches the typo class:
 * a missing @, a missing dot, a stray space.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const read = (formData: FormData, field: EnquiryField) => {
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
 * Two things belong here at the same time, and not before, because a Server
 * Action is a public POST endpoint the moment it does something: a length cap
 * on the note, and rate limiting per address.
 */
async function deliver(enquiry: Enquiry) {
  console.info("[enquiry] no transport configured, not delivered:", enquiry);
}

export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const values: Enquiry = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    phone: read(formData, "phone"),
    note: read(formData, "note"),
  };

  /* Phone is absent because phone is optional. */
  const errors: EnquiryState["errors"] = {};
  if (!values.name) errors.name = CONTACT.errors.name;
  if (!EMAIL.test(values.email)) errors.email = CONTACT.errors.email;
  if (!values.note) errors.note = CONTACT.errors.note;

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  try {
    await deliver(values);
  } catch {
    /* The values are kept so a second attempt costs nothing to make. */
    return { status: "failed", errors: {}, message: CONTACT.errors.failed, values };
  }

  return { status: "sent", errors: {}, values: {} };
}
