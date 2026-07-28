import { CONTACT } from "@/data/contact";
import { Heading } from "@/shared/ui/heading";
import { EnquiryForm } from "./enquiry-form";

/**
 * Two planes on a moss ground: a bone panel holding the form, and a tall
 * moss-deep one hooked over its right border.
 *
 * The panel's height is a floor, not a measurement. A fixed share of the
 * viewport is a cap, and a cap on a box that also clips its overflow silently
 * eats whatever does not fit — which on a short laptop was the send button and
 * most of the direct line. `min-h` lets the composition hold its proportion
 * wherever there is room and grow where there is not.
 *
 * That is also why the plate hugs the panel rather than filling the viewport:
 * with the panel's height no longer known in advance, the plane has to measure
 * itself against the panel it hangs on rather than against the space around it.
 * At lg it is 95% of the panel's height, on the panel's own axis, which is the
 * proportion the fixed arrangement produced before the height was freed.
 *
 * Fifteen percent of the plane's width sits on the bone, so its left edge is at
 * 70 − 7 × 0.15 = 68.95% on the wide screen and 86 − 11 × 0.15 = 84.35% on the
 * phone. Change a width and recompute its partner.
 *
 * The plane is a SIBLING of the panel, not a child. The panel clips its own
 * overflow so the success rise stops at its edges, and a child would be clipped
 * with it — it could never protrude past the border it is meant to hang on.
 * `isolate` on the panel is what keeps that rise from painting over the plane:
 * without it the rise's z-10 would outrank the plane's auto and the thing in
 * front would end up behind.
 *
 * A plain section with no ground of its own, rather than `Section tone="moss"
 * texture`. The moss is not this section's — it is the document's, painted once
 * behind everything by the rule `data-ground="moss"` triggers in globals.css,
 * so that it runs through the footer without a join. A section that painted its
 * own would put that join back.
 */
export function EnquiryPanel() {
  return (
    <section className="text-bone">
      <div className="flex min-h-svh flex-col px-6 pt-28 pb-16 lg:justify-center lg:px-10 lg:pt-[calc(var(--header-height)_+_1.25rem)] lg:pb-10">
        <div className="relative w-full">
          <div className="relative isolate flex w-[86%] overflow-hidden bg-bone text-ink lg:min-h-[78svh] lg:w-[70%]">
            <EnquiryForm>
              <Heading as="h1" size="display" className="max-w-[14ch] text-balance">
                {CONTACT.heading.map((segment) =>
                  segment.isAccent ? (
                    <em key={segment.text} className="font-normal italic">
                      {segment.text}
                    </em>
                  ) : (
                    segment.text
                  ),
                )}
              </Heading>
            </EnquiryForm>
          </div>

          {/*
           * The grain rides an inner span rather than this box, because
           * `surface-grain` sets position: relative and would collapse an
           * absolutely positioned host onto the panel. The span also has to
           * carry the ground: the grain blends against its own backdrop, and
           * inside the isolated stacking context that utility creates, an
           * element with no background has nothing to blend with.
           */}
          <div
            aria-hidden
            className="absolute top-[15%] left-[84.35%] h-[70%] w-[11%] lg:top-[2.5%] lg:left-[68.95%] lg:h-[95%] lg:w-[7%]"
          >
            <span className="surface-grain block size-full bg-moss-deep [--surface-grain-blend:overlay] [--surface-grain-opacity:0.28]" />
          </div>
        </div>
      </div>
    </section>
  );
}
