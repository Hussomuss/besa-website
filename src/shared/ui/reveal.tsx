"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { useInView } from "@/shared/hooks/use-in-view";

interface RevealProps {
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({ delay = 0, className, children }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-editorial",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
