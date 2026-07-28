import type { Curve } from "@/data/lab";
import { cn } from "@/shared/lib/cn";

/**
 * Plots a cubic-bezier over its unit box, with the control handles drawn.
 *
 * The viewBox is deliberately taller than the box and identical for every
 * curve. A back-out curve puts its first control point well above y = 1, and
 * that overshoot is the whole reason to look at the diagram; a snug per-curve
 * frame would hide it and would also stop the four plots being comparable.
 */
interface BezierCurveProps {
  curve: Curve;
  className?: string;
}

export function BezierCurve({ curve, className }: BezierCurveProps) {
  const [x1, y1, x2, y2] = curve;
  const cx1 = x1 * 100;
  const cy1 = 100 - y1 * 100;
  const cx2 = x2 * 100;
  const cy2 = 100 - y2 * 100;

  return (
    <svg
      viewBox="-8 -88 116 204"
      className={cn("h-auto", className)}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="100" height="100" opacity="0.15" />
      <path d={`M 0 100 L ${cx1} ${cy1}`} opacity="0.3" />
      <path d={`M 100 0 L ${cx2} ${cy2}`} opacity="0.3" />
      <circle cx={cx1} cy={cy1} r="4" fill="currentColor" stroke="none" opacity="0.45" />
      <circle cx={cx2} cy={cy2} r="4" fill="currentColor" stroke="none" opacity="0.45" />
      <path
        d={`M 0 100 C ${cx1} ${cy1}, ${cx2} ${cy2}, 100 0`}
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** The curve as it would be written in CSS. */
export function curveToCss(curve: Curve) {
  return `cubic-bezier(${curve.join(", ")})`;
}
