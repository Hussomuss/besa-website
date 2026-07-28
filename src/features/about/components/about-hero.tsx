import { ABOUT_HERO } from "@/data/about";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Text } from "@/shared/ui/text";

/**
 * A hairline drawn across the photograph. It is the one element in the
 * composition that ignores the panel grid, which is what stops the hero
 * reading as a diagram of rectangles: everything else is orthogonal, so a
 * single curve is enough to put the picture behind the panels rather than
 * beside them.
 *
 * preserveAspectRatio="none" because the line should follow the frame's
 * proportion rather than keep its own — it is a gesture over the image, not a
 * shape with a correct form.
 */
function Hairline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        d="M -5 34 C 22 8, 46 46, 68 22 S 96 4, 108 12"
        fill="none"
        stroke="var(--color-bone)"
        strokeOpacity="0.85"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Three panels on a bone canvas, with the photograph breaking past the canvas
 * to the top and bottom edges. The break is the depth: the two type panels
 * stay inset, so they read as being in front of the picture rather than beside
 * it, and one plane becomes two.
 *
 * The canvas is inset by --header-height at the top rather than by --canvas,
 * so both of the floating header's marks stand on bone. Insetting it evenly
 * would put the wordmark on the moss panel and the trigger on the bone one,
 * which is a header straddling two grounds for no compositional gain.
 *
 * Below lg the whole thing turns through a right angle: the photograph becomes
 * the full ground and the two panels anchor to opposite corners, moss to the
 * top-left and bone to the bottom-right, offset so they step past each other.
 * They are the same three grid columns at both sizes, spanned differently.
 */
export function AboutHero() {
  const { heading, lead, cta, image } = ABOUT_HERO;

  return (
    <section className="relative isolate grid min-h-svh grid-cols-[14%_60%_26%] grid-rows-[auto_1fr_auto] overflow-hidden bg-bone [--canvas:2.5rem] lg:grid-cols-[0.95fr_1.35fr_1fr] lg:grid-rows-1 lg:px-[var(--canvas)] lg:pt-[var(--header-height)] lg:pb-[var(--canvas)]">
      {/* Full ground below lg; the centre column at lg, where the negative
          margins carry it back out to the edges the panels stop short of. */}
      <div className="relative -z-10 col-span-full row-span-full lg:col-span-1 lg:col-start-2 lg:row-span-1 lg:mt-[calc(var(--header-height)*-1)] lg:mb-[calc(var(--canvas)*-1)]">
        <ImageFrame
          src={image.src}
          alt={image.alt}
          isPriority
          hasIntro
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="absolute inset-0 aspect-auto h-full w-full"
        />
        <Hairline />
      </div>

      {/* Top-left below lg, first column at lg. The heading sits on the panel's
          last line rather than its first at both sizes. */}
      <div className="col-span-2 col-start-1 row-start-1 flex flex-col justify-end bg-moss px-6 pt-[calc(var(--header-height)+2rem)] pb-10 text-bone lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:px-10 lg:pt-10 lg:pb-10">
        <Heading as="h1" size="display" className="text-balance">
          {heading.map((segment) =>
            segment.isAccent ? (
              <em key={segment.text} className="font-normal italic">
                {segment.text}
              </em>
            ) : (
              segment.text
            ),
          )}
        </Heading>
      </div>

      {/* Bottom-right below lg, third column at lg. Offset from the moss panel
          by one grid column at both sizes, which is the step. */}
      <div className="col-span-2 col-start-2 row-start-3 flex flex-col justify-end gap-8 bg-bone px-6 py-10 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:justify-between lg:p-10">
        <Text className="max-w-[34ch]">{lead}</Text>
        <Button href={cta.href} on="bone" width="full">
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
