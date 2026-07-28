import { ABOUT_STATEMENT } from "@/data/about";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

/**
 * The page's breath. The hero is the densest thing on the site and the band
 * below is a viewport of solid colour, so without bone between them the two
 * heavy sections touch and neither reads as deliberate.
 *
 * Tight spacing rather than default: it is a pause, not a section with its own
 * weight. One heading and nothing else, for the same reason — a lead here
 * would be a third block of prose before the reader reaches the argument.
 */
export function AboutStatement() {
  return (
    <Section tone="bone" spacing="tight">
      <Container>
        <Reveal>
          <Heading
            as="h2"
            size="display"
            className="max-w-[20ch] text-balance lg:max-w-[26ch]"
          >
            {ABOUT_STATEMENT.heading.map((segment) =>
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
      </Container>
    </Section>
  );
}
