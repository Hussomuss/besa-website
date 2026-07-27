import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/*
 * Weight is responsive on purpose. Cormorant's hairlines fall below one
 * physical pixel under ~48px, worst on mobile where the hero type is reversed
 * out of a photograph; 400 holds there. Above lg, 300 restores the delicacy
 * that is the reason to specify Cormorant at all.
 */
const SIZE_CLASS = {
  display: "text-display font-normal lg:font-light lg:leading-[1.06]",
  h2: "text-h2 font-normal md:font-light",
  h3: "text-h3 font-normal",
} as const;

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  children: ReactNode;
}

export function Heading({
  as: Tag = "h2",
  size = "h2",
  className,
  children,
}: HeadingProps) {
  return (
    <Tag className={cn("font-display", SIZE_CLASS[size], className)}>
      {children}
    </Tag>
  );
}
