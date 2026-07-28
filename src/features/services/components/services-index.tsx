import { SERVICES, SERVICES_INTRO } from "@/data/services";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

/**
 * A square of moss showing from behind the bottom-left corner of a frame, in
 * the position a drop shadow would take and with none of a shadow's softness.
 * That is the point of it: a flat plane offset behind a photograph reads as
 * two sheets laid on a table, where a blur reads as a photograph floating, and
 * this practice is the former.
 *
 * Square rather than the frame's own proportion, so it cannot be mistaken for
 * a mount or a border. It is a shape behind a picture, not an edge around one.
 *
 * No z-index. The block is absolute and the frame after it is relative, so
 * both are positioned at z-index auto and paint in source order, which puts
 * the frame on top with nothing to keep in sync.
 *
 * Grain is carried on a child rather than on the block itself, because
 * surface-grain sets position: relative and this element has to stay absolute.
 * The two would fight in the cascade for no gain.
 */
function OffsetBlock() {
  return (
    <div
      aria-hidden
      className="absolute -bottom-4 -left-4 aspect-square w-[64%] lg:-bottom-8 lg:-left-8"
    >
      <div className="surface-grain size-full bg-moss [--surface-grain-opacity:0.55]" />
    </div>
  );
}

/**
 * The three services as a numbered index: one frame on the left rail, the
 * numeral and the words on the right, three times without variation. The
 * repetition is the structure. Alternating the sides each row would read as
 * decoration and would cost the vertical the frames currently share, which is
 * the only thing making a list of three look composed.
 *
 * Nothing separates the rows but space, per the standing rule. The reference
 * this is drawn from rules a hairline under every row, and dropping it is what
 * forces the spacing to be large enough to do the job on its own.
 *
 * An ordered list because the numerals are shown, and the numerals are
 * aria-hidden because the list already says what they say.
 *
 * Rows are not links. All three hrefs still point back at this page; there are
 * no per-service routes yet, and a link that navigates nowhere is worse than
 * no link.
 */
export function ServicesIndex() {
  const { heading, lead } = SERVICES_INTRO;

  return (
    <Section id="what-we-take-on" tone="bone">
      <Container>
        <Reveal>
          <Heading as="h2" size="h2" className="max-w-[18ch] text-balance">
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
          {lead ? (
            <Text size="lead" className="mt-6 max-w-[46ch] opacity-80">
              {lead}
            </Text>
          ) : null}
        </Reveal>

        <ol className="mt-20 flex flex-col gap-20 lg:mt-28 lg:gap-28">
          {SERVICES.map((service, index) => (
            <li key={service.title}>
              <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
                <div className="relative lg:col-span-5">
                  <OffsetBlock />
                  <ImageFrame
                    src={service.image.src}
                    alt={service.image.alt}
                    ratio="landscape"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>

                {/* Numeral beside the title rather than above it, so the
                    figure indexes the row instead of labelling the sentence.
                    items-start because a baseline would drop a 30px title to
                    the foot of an 88px digit. */}
                <div className="flex items-start gap-6 lg:col-span-6 lg:col-start-7 lg:gap-10">
                  <p
                    aria-hidden
                    className="shrink-0 font-display text-numeral font-light text-moss/60"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div>
                    <Heading as="h3" size="h3" className="text-balance">
                      {service.title}
                    </Heading>
                    <Text className="mt-4 max-w-[44ch] opacity-80">
                      {service.detail}
                    </Text>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
