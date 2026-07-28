import { SERVICES_CLOSING } from "@/data/services";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

/**
 * Moss, and the footer under it is moss, so the page ends in one dark field
 * rather than in a band and then another band. /about closes on bone because
 * the section above it is a viewport of moss and the page has to come up for
 * air first. Here everything above is pale, so this is the page's only dark
 * note and it may as well run to the bottom of the document.
 *
 * No texture, for the same reason the join matters: Section's scatter fades at
 * its own edges, and a textured plane butted against the plain moss footer
 * would draw the seam this arrangement exists to remove.
 */
export function ServicesClosing() {
  const { heading, cta } = SERVICES_CLOSING;

  return (
    <Section tone="moss">
      <Container>
        <Reveal>
          <Heading as="h2" size="h2" className="max-w-[22ch] text-balance">
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

          {cta ? (
            <Button
              href={cta.href}
              on="moss"
              width="full"
              className="mt-10 lg:w-auto"
            >
              {cta.label}
            </Button>
          ) : null}
        </Reveal>
      </Container>
    </Section>
  );
}
