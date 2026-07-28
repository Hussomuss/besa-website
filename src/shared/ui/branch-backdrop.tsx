import type { CSSProperties } from "react";

const FULL: CSSProperties = {
  "--shape-mask": "url(/shapes/branch-full.svg)",
} as CSSProperties;

const NARROW: CSSProperties = {
  "--shape-mask": "url(/shapes/branch-narrow.svg)",
} as CSSProperties;

/**
 * Two bone branches behind a moss band: the fuller one large and further left,
 * the narrow one smaller, dropped and inset in front of it. Back is the
 * stronger of the two, so the front branch reads as a nearer, lighter plant
 * rather than as a shadow of the one behind.
 *
 * Masks rather than inline SVG or <img>. Inline would put ~22KB of path data
 * in the HTML of every page carrying this; <img> could not be recoloured. A
 * mask keeps the payload cached and out of the document, and lets the colour
 * stay a theme token — which is the whole point, since the source files were
 * traced with their own greys baked in.
 *
 * Placement is a percentage of the host section, so the branches keep their
 * proportion to the band as its content grows. aspect-[1/2] matches the source
 * viewBox, without which mask-shape's `mask-size: 100% 100%` would stretch it.
 *
 * The host section must carry `relative isolate`. `isolate` is not cosmetic:
 * -z-10 only paints above the section's own background inside a stacking
 * context, and without one these disappear behind bg-moss entirely.
 */
export function BranchBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
    >
      {/* Matches Container's box — mx-auto, max-w-page, no padding — so the
          branches are positioned against the content's left edge rather than
          the viewport's. Percentages of a full-bleed section keep widening
          past 96rem while the content stops, which drifts the pair apart from
          each other and off into the outer margin on a wide screen. */}
      <div className="relative mx-auto h-full w-full max-w-page">
        {/* The two lefts move together. Their 14% separation is what makes the
            pair read as one plant at two depths; change them by different
            amounts and it becomes two plants. */}
        <div
          style={FULL}
          className="mask-shape absolute -top-[6%] -left-[22%] aspect-[1/2] h-[116%] bg-bone opacity-10"
        />
        <div
          style={NARROW}
          className="mask-shape absolute top-[22%] -left-[8%] aspect-[1/2] h-[74%] bg-bone opacity-[0.06]"
        />
      </div>
    </div>
  );
}
