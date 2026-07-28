import type { Metadata } from "next";
import { EnquiryPanel } from "@/features/contact/components/enquiry-panel";
import { Main } from "@/shared/layout/main";

export const metadata: Metadata = { title: "Contact" };

/*
 * Moss from edge to edge, so the header floats over it with bone marks and the
 * bone panel reads as a plane laid on the ground rather than as the page.
 *
 * The menu span stays `full`. A fraction exists to keep the trigger off a
 * photograph, and there is none here — the right gutter is moss at every width,
 * which is where a bone mark is most legible anyway.
 */
export default function ContactPage() {
  return (
    <Main ground="moss">
      <EnquiryPanel />
    </Main>
  );
}
