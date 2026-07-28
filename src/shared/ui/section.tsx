import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Tone } from "@/shared/types/ui";

const TONE_CLASS: Record<Tone, string> = {
  bone: "bg-bone text-ink",
  sand: "bg-sand text-ink",
  moss: "bg-moss text-bone",
};

/**
 * The stone surface for each ground that has one, as geometry plus palette.
 *
 * Sand takes the placed mesh and moss takes the scatter, which is a judgement
 * rather than a rule: three large blooms hold up on sand because the spread
 * they have to cover is small, and moss needs the blur to stop nine stops
 * from being countable against a dark ground.
 *
 * Bone has no entry. It is the page ground and carries the most type, and the
 * spread available between bone and sand is too narrow to read as a surface
 * without becoming a gradient. The types below make asking for it fail to
 * compile rather than silently doing nothing.
 */
const TEXTURE_CLASS = {
  sand: "surface-grain surface-mesh surface-sand",
  moss: "surface-grain surface-scatter surface-moss",
} as const;

type TexturedTone = keyof typeof TEXTURE_CLASS;

const SPACING_CLASS = {
  none: "",
  tight: "py-14 md:py-20",
  default: "py-20 md:py-28 lg:py-36",
} as const;

interface BaseProps {
  spacing?: keyof typeof SPACING_CLASS;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * texture is opt-in per call site rather than implied by tone, because the
 * scatter clips its host — a section wearing it cannot also carry a
 * decoration that overhangs its box, which BranchBackdrop does — and because
 * it rasterises a surface several times the section's area. Both are worth
 * paying for deliberately and not by default.
 */
type SectionProps = BaseProps &
  (
    | { tone?: "bone"; texture?: never }
    | { tone: TexturedTone; texture?: boolean }
  );

export function Section({
  tone = "bone",
  texture = false,
  spacing = "default",
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24",
        TONE_CLASS[tone],
        texture && TEXTURE_CLASS[tone as TexturedTone],
        SPACING_CLASS[spacing],
        className,
      )}
    >
      {children}
    </section>
  );
}
