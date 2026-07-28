import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * A throwaway stand-in for shared/ui/button, used only to compare treatments
 * at /lab. It carries the real button's geometry and type but takes its ground
 * and its animation from the caller, which the shipped button must never do.
 */
const BASE_CLASS =
  "lab-btn inline-flex items-center justify-center px-10 py-4.5 font-sans text-label uppercase";

interface LabButtonProps {
  /** Prototype classes from app/lab/lab.css. */
  treatment: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function LabButton({
  treatment,
  className,
  style,
  children,
}: LabButtonProps) {
  return (
    <button
      type="button"
      style={style}
      className={cn(BASE_CLASS, treatment, className)}
    >
      {/* Always wrapped: the rise treatment animates the label independently
          of the plane, and it needs an element to do it to. */}
      <span className="relative">{children}</span>
    </button>
  );
}
