import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Href } from "@/shared/types/ui";

const VARIANT_CLASS = {
  solid: "bg-ink text-bone hover:bg-moss",
  outline: "border border-ink text-ink hover:bg-ink hover:text-bone",
  moss: "bg-moss text-bone hover:bg-ink",
} as const;

const BASE_CLASS =
  "inline-flex items-center justify-center px-8 py-4 font-sans text-label uppercase transition-colors duration-300 ease-editorial focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

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
  const { variant = "solid", className, children } = props;
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
