import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Href } from "@/shared/types/ui";

const VARIANT_CLASS = {
  /** Hairline default. Reads more discreet than a filled slab. */
  line: "wipe-ink border border-ink/30 text-ink hover:border-ink hover:text-bone",
  solid: "bg-ink text-bone hover:bg-moss",
  moss: "bg-moss text-bone hover:bg-ink",
} as const;

const BASE_CLASS =
  "inline-flex items-center justify-center px-10 py-4.5 font-sans text-label uppercase transition-colors duration-500 ease-editorial";

interface BaseButtonProps {
  variant?: keyof typeof VARIANT_CLASS;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends BaseButtonProps {
  href: Href;
  type?: never;
}

interface ActionButtonProps extends BaseButtonProps {
  href?: never;
  type?: "button" | "submit";
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "line", className, children } = props;
  const classes = cn(BASE_CLASS, VARIANT_CLASS[variant], className);

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
