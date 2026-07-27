import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const SIZE_CLASS = {
  lead: "text-lead",
  body: "text-body",
} as const;

interface TextProps {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  children: ReactNode;
}

export function Text({ size = "body", className, children }: TextProps) {
  return (
    <p className={cn("font-sans text-pretty", SIZE_CLASS[size], className)}>
      {children}
    </p>
  );
}
