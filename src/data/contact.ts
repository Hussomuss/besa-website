import type { ContactContent } from "@/shared/types/content";

/**
 * The contact page has one job, so it carries no lead paragraph: a sentence
 * explaining a form the reader can already see is a sentence between them and
 * the first field. The heading does the whole of the introducing.
 */
export const CONTACT: ContactContent = {
  heading: [
    { text: "Tell us what your " },
    { text: "week", isAccent: true },
    { text: " looks like." },
  ],

  labels: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    note: "Note",
  },

  submit: "Send enquiry",
  pending: "Sending",

  /*
   * Written as sentences rather than as form warnings. "Email is required" is
   * a validator talking; a practice that answers its own telephone says why it
   * is asking.
   */
  errors: {
    name: "We need a name to write back to.",
    email: "That address does not look complete.",
    note: "Tell us something, however short.",
    failed: "That did not send. Try again, or use the line below.",
  },

  success: {
    heading: [
      { text: "Thank you. We " },
      { text: "have", isAccent: true },
      { text: " it." },
    ],
    body: "Someone will write to you within one working day. If it cannot wait until then, the line below is answered in person.",
  },
};
