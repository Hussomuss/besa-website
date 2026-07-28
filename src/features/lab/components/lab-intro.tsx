import { LAB_PAGE } from "@/data/lab";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

export function LabIntro() {
  return (
    <Section spacing="tight">
      <Container>
        <Heading as="h1" size="display" className="max-w-[16ch] text-balance">
          {LAB_PAGE.heading}
        </Heading>
        <Text size="lead" className="mt-6 max-w-[46ch] text-ink/75">
          {LAB_PAGE.lead}
        </Text>
        <Text className="mt-8 max-w-[46ch] border-l border-ink/25 pl-5 text-ink/55">
          {LAB_PAGE.hint}
        </Text>
      </Container>
    </Section>
  );
}
