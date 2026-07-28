import { ABOUT_CLOSING } from "@/data/about";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

/**
 * A section of its own rather than a block on the end of the one above it,
 * which is how the home page closes. There the closing rides inside the
 * questions column because the section before it is type on bone and the two
 * belong to the same movement. Here the section before it is a viewport of
 * moss, so the page has to return to bone before it can ask for anything.
 */
export function AboutClosing() {
  const { heading, cta } = ABOUT_CLOSING;

  return (
    <Section tone="bone">
      <Container>
        <Reveal>
          <Heading as="h2" size="h2" className="max-w-[24ch] text-balance">
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
              on="bone"
              colour="moss"
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
