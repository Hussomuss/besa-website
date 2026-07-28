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

/**
 * Which part of the frame survives when the ratio asked for is not the
 * photograph's own. The default centres, which is right for a picture whose
 * subject fills it and wrong for one composed off to a side: the services
 * still life carries its whole subject in the right third and nothing but wall
 * in the left half, so cropping it from the centre eats the vase to save an
 * empty corner.
 *
 * Named for the part being kept rather than for a CSS keyword, because that is
 * the decision the call site is actually making about its photograph.
 */
const FOCUS_CLASS = {
  centre: "",
  left: "object-left",
  right: "object-right",
  top: "object-top",
  bottom: "object-bottom",
  /* Written arbitrarily because Tailwind has renamed the corner utilities
     between v4 minors and the old spellings survive only in a compat shim.
     The pair is what the services hero needs: a frame taller than the file
     crops the sides and keeps the right, a frame wider than it crops top and
     bottom and keeps the shelf, and one value answers both. */
  "right-bottom": "object-[right_bottom]",
} as const;

interface ImageFrameProps {
  src: string;
  alt: string;
  sizes: string;
  shape?: Shape;
  ratio?: keyof typeof RATIO_CLASS;
  /** Only meaningful where the frame's ratio differs from the file's. */
  focus?: keyof typeof FOCUS_CLASS;
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
  focus = "centre",
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
          FOCUS_CLASS[focus],
          hasIntro && "animate-settle motion-reduce:animate-none",
        )}
        loading={isPriority ? "eager" : "lazy"}
        fetchPriority={isPriority ? "high" : "auto"}
      />
    </div>
  );
}
