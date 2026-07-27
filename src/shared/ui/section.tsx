import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Tone } from "@/shared/types/ui";

const TONE_CLASS: Record<Tone, string> = {
  bone: "bg-bone text-ink",
  sand: "bg-sand text-ink",
  moss: "bg-moss text-bone",
};

const SPACING_CLASS = {
  none: "",
  tight: "py-14 md:py-20",
  default: "py-20 md:py-28 lg:py-36",
} as const;

interface SectionProps {
  tone?: Tone;
  spacing?: keyof typeof SPACING_CLASS;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({
  tone = "bone",
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
        SPACING_CLASS[spacing],
        className,
      )}
    >
      {children}
    </section>
  );
}
