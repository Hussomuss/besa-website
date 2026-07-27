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
      {/*
        The negative right margins are not decoration. letter-spacing applies
        after the final glyph too, so a centred line is displaced left by half
        its tracking; with different tracking per line the two lines end up
        optically miscentred. Cancelling the trailing space fixes it.
      */}
      <span className="font-display text-[1.75rem] leading-none font-normal tracking-wordmark -mr-[0.32em]">
        {SITE.name}
      </span>
      <span className="mt-1 font-sans text-[0.5625rem] leading-none tracking-wordmark-sub -mr-[0.14em] uppercase">
        {SITE.tagline}
      </span>
    </span>
  );
}
