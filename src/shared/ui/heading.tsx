import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const SIZE_CLASS = {
  display: "text-display font-light",
  h2: "text-h2 font-light",
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
