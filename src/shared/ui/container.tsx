import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const SIZE_CLASS = {
  page: "max-w-page",
  prose: "max-w-2xl",
} as const;

interface ContainerProps {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  children: ReactNode;
}

export function Container({
  size = "page",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-16",
        SIZE_CLASS[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
