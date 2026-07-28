import { OUR_APPROACH } from "@/data/home";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

export function OurApproach() {
  const { heading, lead } = OUR_APPROACH;

  return (
    <Section id="our-approach">
      <Container>
        <Reveal>
          {/*
            Columns 1-5 and 7-12. The questions section below repeats exactly
            this relationship, so the closing movement is read as one geometry
            rather than three unrelated ones.

            Deliberately without photography: the statement is about work that
            is never seen, so illustrating it would argue against the sentence.
          */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
            <Heading
              as="h2"
              size="display"
              className="text-balance lg:col-span-5 lg:col-start-1"
            >
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

            {/* self-end sets the paragraph on the statement's last baseline
                rather than its top, which is what keeps the two columns from
                reading as two unrelated blocks. */}
            {lead ? (
              <Text
                size="lead"
                className="max-w-[52ch] lg:col-span-6 lg:col-start-7 lg:self-end"
              >
                {lead}
              </Text>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
