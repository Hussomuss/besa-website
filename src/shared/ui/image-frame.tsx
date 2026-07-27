import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import type { Shape } from "@/shared/types/ui";

const RATIO_CLASS = {
  portrait: "aspect-[3/4]",
  arch: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
} as const;

interface ImageFrameProps {
  src: string;
  alt: string;
  sizes: string;
  shape?: Shape;
  ratio?: keyof typeof RATIO_CLASS;
  isPriority?: boolean;
  /** Slow settle from a slight overscale. Use once, on the hero. */
  hasIntro?: boolean;
  className?: string;
}

export function ImageFrame({
  src,
  alt,
  sizes,
  shape = "rect",
  ratio = "portrait",
  isPriority = false,
  hasIntro = false,
  className,
}: ImageFrameProps) {
  const isMasked = shape !== "rect";
  const maskStyle = {
    "--shape-mask": `url(/shapes/${shape}.svg)`,
  } as CSSProperties;

  return (
    <div
      style={isMasked ? maskStyle : undefined}
      className={cn(
        "relative overflow-hidden",
        RATIO_CLASS[ratio],
        isMasked && "mask-shape",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "image-grade object-cover",
          hasIntro && "animate-settle motion-reduce:animate-none",
        )}
        loading={isPriority ? "eager" : "lazy"}
        fetchPriority={isPriority ? "high" : "auto"}
      />
    </div>
  );
}
