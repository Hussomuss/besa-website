import { FAQ } from "@/data/faq";
import { Accordion } from "@/shared/ui/accordion";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { ClosingEnquiry } from "./closing-enquiry";

export function Faq() {
  const { heading, items } = FAQ;

  return (
    <Section id="questions">
      <Container>
        <Reveal>
          {/*
            Columns 1-5 and 7-12, the same relationship Our Approach uses
            directly above, so the ending reads as one movement. The Accordion
            is domain-free, so question and answer are mapped to summary and
            content here rather than inside the primitive.
          */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
            <Heading
              as="h2"
              size="h2"
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

            <Accordion
              className="lg:col-span-6 lg:col-start-7"
              items={items.map((item) => ({
                summary: item.question,
                content: item.answer,
              }))}
            />
          </div>

          <ClosingEnquiry />
        </Reveal>
      </Container>
    </Section>
  );
}
