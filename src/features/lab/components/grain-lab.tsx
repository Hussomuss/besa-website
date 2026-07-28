import { GRAIN_BASELINES, GRAIN_SECTION } from "@/data/lab";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

/**
 * The two settled surfaces, rendered through the real Section API rather than
 * as swatches wearing the utilities directly. A panel proves the CSS works; a
 * full-width band carrying a heading and a paragraph proves the thing that
 * was actually in doubt, which is whether type survives sitting on it.
 *
 * The grain layer is under the content at z-index -1 for exactly that reason.
 * Real grain would cover the type too, but a few percent of noise laid over
 * Cormorant at display sizes eats the hairlines that are the reason to
 * specify Cormorant at all.
 */
export function GrainLab() {
  return (
    <>
      {/* The top rule is the separator between component sections; copy it. */}
      <Section spacing="tight" className="border-t border-ink/15">
        <Container>
          <Heading as="h2" size="h2">
            {GRAIN_SECTION.heading}
          </Heading>
          <Text className="mt-5 max-w-[52ch] text-ink/70">
            {GRAIN_SECTION.lead}
          </Text>
          <Text className="mt-8 max-w-[52ch] border-l border-ink/25 pl-5 text-ink/55">
            {GRAIN_SECTION.restraint}
          </Text>
        </Container>
      </Section>

      {GRAIN_BASELINES.map((baseline) => (
        <Section key={baseline.tone} tone={baseline.tone} texture>
          <Container>
            <Heading as="h3" size="h3">
              {baseline.name}
            </Heading>
            <Text size="lead" className="mt-5 max-w-[46ch]">
              {baseline.sample}
            </Text>
            <Text
              className={
                baseline.tone === "moss"
                  ? "mt-8 max-w-[52ch] text-bone/60"
                  : "mt-8 max-w-[52ch] text-ink/60"
              }
            >
              {baseline.note}
            </Text>
          </Container>
        </Section>
      ))}
    </>
  );
}
