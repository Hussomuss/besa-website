import type { CSSProperties } from "react";
import {
  BUTTON_SECTION,
  RISE_COUPLINGS,
  RISE_CURVE,
  RISE_DURATIONS,
  RISE_MS,
} from "@/data/lab";
import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";
import { BezierCurve, curveToCss } from "./bezier-curve";
import { LabButton } from "./lab-button";

const RISE_EASE = curveToCss(RISE_CURVE);

/**
 * The rise colour is the fill's tonal partner, not its opposite, so the label
 * holds one colour for the whole gesture: bone stays bone as ink gives way to
 * moss, ink stays ink as bone gives way to sand.
 */
const GROUNDS = [
  {
    id: "bone",
    panel: "border border-ink/15",
    button: "bg-ink text-bone [--lab-fill:var(--color-moss)]",
  },
  {
    id: "moss",
    panel: "bg-moss",
    button: "bg-bone text-ink [--lab-fill:var(--color-sand)]",
  },
] as const;

/** The settled figures, for every button outside the two study rows. */
const SETTLED = {
  "--lab-rise-ease": RISE_EASE,
  "--lab-rise-ms": RISE_MS,
  "--lab-lift": "-2px",
  "--lab-lift-delay": "70ms",
} as CSSProperties;

const STUDY_BUTTON = "w-full bg-ink text-bone [--lab-fill:var(--color-moss)]";

/** The top rule is the separator between component sections; copy it. */
export function ButtonLab() {
  return (
    <Section spacing="tight" className="border-t border-ink/15">
      <Container>
        <Heading as="h2" size="h2">
          {BUTTON_SECTION.heading}
        </Heading>
        <Text className="mt-5 max-w-[52ch] text-ink/70">
          {BUTTON_SECTION.lead}
        </Text>

        <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
          {GROUNDS.map((ground) => (
            <div
              key={ground.id}
              className={cn(
                "flex items-center justify-center px-8 py-14",
                ground.panel,
              )}
            >
              <LabButton
                treatment="lab-rise"
                className={cn("max-sm:w-full", ground.button)}
                style={SETTLED}
              >
                Enquire
              </LabButton>
            </div>
          ))}
        </div>

        <div className="mt-10 flex max-w-2xl items-start gap-6">
          <BezierCurve curve={RISE_CURVE} className="w-10 shrink-0 text-ink/60" />
          <div>
            <p className="font-sans text-label normal-case text-ink/50">
              {RISE_EASE}
            </p>
            <Text className="mt-3 text-ink/70">{BUTTON_SECTION.curveNote}</Text>
          </div>
        </div>

        <Text className="mt-8 max-w-[52ch] border-l border-ink/25 pl-5 text-ink/60">
          {BUTTON_SECTION.partner}
        </Text>

        <div className="mt-20 border-t border-ink/15 pt-14">
          <Heading as="h3" size="h3">
            {BUTTON_SECTION.duration}
          </Heading>
          <Text className="mt-4 max-w-[52ch] text-ink/70">
            {BUTTON_SECTION.durationLead}
          </Text>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {RISE_DURATIONS.map((duration) => (
              <div key={duration.id}>
                <p className="border-b border-ink/15 pb-3 font-sans text-label text-ink/60">
                  {duration.ms}
                </p>
                <Text className="mt-3 text-ink/70">{duration.note}</Text>
                <LabButton
                  treatment="lab-rise"
                  className={cn("mt-6", STUDY_BUTTON)}
                  style={
                    {
                      "--lab-rise-ease": RISE_EASE,
                      "--lab-rise-ms": duration.ms,
                    } as CSSProperties
                  }
                >
                  Enquire
                </LabButton>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-ink/15 pt-14">
          <Heading as="h3" size="h3">
            {BUTTON_SECTION.coupling}
          </Heading>
          <Text className="mt-4 max-w-[52ch] text-ink/70">
            {BUTTON_SECTION.couplingLead}
          </Text>

          <div className="mt-10 grid gap-10 sm:grid-cols-3 lg:gap-8">
            {RISE_COUPLINGS.map((coupling) => (
              <div key={coupling.id}>
                <p className="border-b border-ink/15 pb-3 font-sans text-label text-ink/60">
                  {coupling.name}
                </p>
                <Text className="mt-3 text-ink/70">{coupling.note}</Text>
                <LabButton
                  treatment="lab-rise"
                  className={cn("mt-6", STUDY_BUTTON)}
                  style={
                    {
                      "--lab-rise-ease": RISE_EASE,
                      "--lab-rise-ms": RISE_MS,
                      "--lab-lift": coupling.lift,
                      "--lab-lift-delay": coupling.liftDelay,
                    } as CSSProperties
                  }
                >
                  Enquire
                </LabButton>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
