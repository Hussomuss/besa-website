import { THE_PRACTICE } from "@/data/about";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Text } from "@/shared/ui/text";

/**
 * Ground per position rather than per item, so the copy carries no colour and
 * the band lightens left to right however the sentences are edited. The light
 * panel is last because a band that lightens toward its outer edge reads as
 * continuing past the frame; centred, it closes.
 *
 * The light panel's own ground only shows at lg. Below it the photograph fills
 * the panel and the copy sits on the picture, so the type reverses to bone.
 */
const PANEL_CLASS = [
  "bg-moss-deep text-bone",
  "bg-moss text-bone",
  "bg-sand text-bone lg:text-ink",
] as const;

/** Sand on the dark panels, moss on the light one. Held below full strength
    so the numerals are the largest thing in the band without being the
    loudest, which is the whole difference between big and shouting. */
const NUMERAL_CLASS = [
  "text-sand/90",
  "text-sand/90",
  "text-sand/90 lg:text-moss/75",
] as const;

/**
 * Three panels butted together, widths asymmetric, numerals right-aligned at
 * the top so they land on one line across the band and are read as a sequence
 * before any sentence is. Copy sits on the panel's last line rather than its
 * first, which is the same relationship the hero's moss panel uses.
 *
 * No rules anywhere: the edge between two grounds does what a divider would.
 * That is also why this survives the phone unchanged, where a gap- or
 * stagger-separated version would collapse into an undifferentiated column.
 *
 * The panel only pushes its numeral and its copy apart at lg, where the column
 * is a viewport tall and the space between them is the composition. Below lg
 * that same rule strands a numeral at the top of a screen with its sentence at
 * the bottom, so the phone stacks them close instead and lets each panel be as
 * tall as its contents.
 *
 * An ordered list because the order is the argument: a claim, what that claim
 * is really about, and what it costs us. The numerals are aria-hidden, since
 * the list already says all of that to a screen reader.
 */
export function ThePractice() {
  return (
    <section
      id="why"
      className="scroll-mt-24 bg-bone"
      aria-label="Why the practice exists"
    >
      {/* min-h rather than h, so the band is a viewport tall without clipping
          if a sentence is ever edited longer than the panel it sits in. svh
          rather than vh, which is measured against the phone's chrome-less
          height and leaves the last line under the address bar. */}
      <ol className="grid lg:min-h-svh lg:grid-cols-[1.32fr_1fr_0.92fr]">
        {THE_PRACTICE.map((item, index) => (
          <li
            key={item.body}
            className={`relative isolate flex flex-col gap-7 px-6 py-14 md:px-10 lg:justify-between lg:gap-8 lg:p-10 ${item.image ? "min-h-[32rem] lg:min-h-0" : ""} ${PANEL_CLASS[index]}`}
          >
            {item.image ? (
              <>
                {/* Fills the panel below lg and returns to the flow at lg,
                    where it is a block between the numeral and the copy. */}
                <div className="absolute inset-0 -z-10 lg:relative lg:inset-auto lg:min-h-0 lg:flex-1 lg:overflow-hidden">
                  <ImageFrame
                    src={item.image.src}
                    alt={item.image.alt}
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    className="absolute inset-0 aspect-auto h-full w-full"
                  />
                </div>
                {/* Only below lg, where there is type on the photograph. */}
                <div
                  aria-hidden
                  className="scrim-hero absolute inset-0 -z-10 lg:hidden"
                />
              </>
            ) : null}

            <p
              aria-hidden
              className={`text-right font-display text-numeral font-light ${NUMERAL_CLASS[index]}`}
            >
              {String(index + 1).padStart(2, "0")}
            </p>

            <div
              className={item.image ? "max-lg:text-shadow-scrim" : undefined}
            >
              <Heading as="h2" size="h3" className="text-balance">
                {item.heading.map((segment) =>
                  segment.isAccent ? (
                    <em key={segment.text} className="font-normal italic">
                      {segment.text}
                    </em>
                  ) : (
                    segment.text
                  ),
                )}
              </Heading>
              <Text className="mt-4 max-w-[38ch] opacity-80">{item.body}</Text>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
