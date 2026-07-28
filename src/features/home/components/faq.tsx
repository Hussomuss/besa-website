import { FAQ } from "@/data/faq";
import { Accordion } from "@/shared/ui/accordion";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { ClosingEnquiry } from "./closing-enquiry";

/**
 * Bleeds the image to the viewport's left edge from inside a centred, capped
 * container: the gutter, plus half of whatever the viewport overshoots the
 * container's max width by. Hard-coding a vw percentage would drift as the
 * window changes; this stays exact at every width.
 */
const BLEED_LEFT =
  "lg:-ml-[calc(4rem+max(0px,(100vw-var(--container-page))/2))]";

export function Faq() {
  const { heading, items, image } = FAQ;

  return (
    <Section id="questions" spacing="none">
      {/*
        No bottom padding on the container: the image column runs to the
        section's edge so it meets the footer's top border. The text column
        carries the section's closing padding instead.
      */}
      <Container className="grid gap-10 pt-20 md:pt-28 lg:grid-cols-12 lg:gap-x-8 lg:pt-36">
        <div className="flex flex-col lg:col-span-5">
          <Reveal>
            <Heading as="h2" size="h2" className="text-balance">
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
          </Reveal>

          {/* min-h-0 lets flex-1 shrink inside the stretched grid row rather
              than being floored at the image's intrinsic height. */}
          <div className={`mt-14 hidden min-h-0 flex-1 lg:block ${BLEED_LEFT}`}>
            <ImageFrame
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1536px) 830px, (min-width: 1024px) 45vw, 100vw"
              className="aspect-auto h-full"
            />
          </div>
        </div>

        <div className="pb-20 md:pb-28 lg:col-span-6 lg:col-start-7 lg:pb-36">
          <Reveal>
            <Accordion
              items={items.map((item) => ({
                summary: item.question,
                content: item.answer,
              }))}
            />
          </Reveal>

          <Reveal>
            <ClosingEnquiry />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
