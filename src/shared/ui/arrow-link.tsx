import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Href } from "@/shared/types/ui";

interface ArrowLinkProps {
  href: Href;
  className?: string;
  children: ReactNode;
}

export function ArrowLink({ href, className, children }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 font-sans text-label uppercase",
        className,
      )}
    >
      {children}
      <svg
        aria-hidden
        viewBox="0 0 24 12"
        className="h-2 w-6 transition-transform duration-300 ease-editorial group-hover:translate-x-1 motion-reduce:transition-none"
        fill="none"
        stroke="currentColor"
      >
        <path d="M0 6h22M17 1l5 5-5 5" />
      </svg>
    </Link>
  );
}
