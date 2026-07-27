import { cn } from "@/shared/lib/cn";
import { SITE } from "@/data/site";

const TONE_CLASS = {
  ink: "text-ink",
  bone: "text-bone",
} as const;

interface WordmarkProps {
  tone?: keyof typeof TONE_CLASS;
  className?: string;
}

export function Wordmark({ tone = "ink", className }: WordmarkProps) {
  return (
    <span
      className={cn("flex flex-col items-center", TONE_CLASS[tone], className)}
    >
      <span className="font-display text-2xl leading-none font-normal tracking-wordmark">
        {SITE.name}
      </span>
      <span className="mt-1.5 font-sans text-[0.5rem] leading-none tracking-wordmark uppercase">
        {SITE.tagline}
      </span>
    </span>
  );
}
