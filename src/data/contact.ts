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

  /*
   * 254 on email is the address length RFC 5321 permits. The rest are chosen
   * rather than derived: they are generous enough that no real enquiry meets
   * them and tight enough that a script cannot post a novel.
   *
   * Any number changed here has to be changed in the sentence below it too.
   * They are three lines apart for exactly that reason.
   */
  limits: {
    name: 80,
    email: 254,
    phone: 32,
    note: 2000,
  },

  submit: "Send enquiry",
  pending: "Sending",

  /*
   * Written as sentences rather than as form warnings. "Email is required" is
   * a validator talking; a practice that answers its own telephone says why it
   * is asking.
   */
  errors: {
    name: {
      missing: "We need a name to write back to.",
      long: "That is longer than 80 characters.",
    },
    email: {
      missing: "We need an address to reply to.",
      invalid: "That address does not look complete.",
      long: "That is longer than an address can be.",
    },
    phone: {
      invalid: "That does not look like a number we could call.",
      long: "That is longer than 32 characters.",
    },
    note: {
      missing: "Tell us something, however short.",
      long: "That is longer than 2,000 characters. Send the shape of it and we will ask for the rest.",
    },
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
