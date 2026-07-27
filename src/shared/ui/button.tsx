import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Href } from "@/shared/types/ui";

/**
 * One button for the whole site: a hairline at rest, filled by a wipe rising
 * from the baseline on hover. The two entries are the same button on opposite
 * grounds, not two different buttons. Do not add a third that behaves
 * differently.
 */
const VARIANT_CLASS = {
  /** Light grounds (bone). Ink hairline, fills ink, type flips to bone. */
  default:
    "border-ink/30 text-ink hover:border-ink hover:text-bone group-hover:border-ink group-hover:text-bone",
  /** Dark grounds (moss). Bone hairline, fills bone, type flips to ink. */
  inverse:
    "[--wipe-fill:var(--color-bone)] border-bone/40 text-bone hover:border-bone hover:text-ink group-hover:border-bone group-hover:text-ink",
} as const;

const BASE_CLASS =
  "wipe inline-flex items-center justify-center border px-10 py-4.5 font-sans text-label uppercase transition-colors duration-500 ease-editorial";

export type ButtonVariant = keyof typeof VARIANT_CLASS;

/**
 * Exported so a non-interactive element can wear the button's styling, which
 * is required where a whole card is already a link and must not contain a
 * nested one.
 */
export function buttonClasses(
  variant: ButtonVariant = "default",
  className?: string,
) {
  return cn(BASE_CLASS, VARIANT_CLASS[variant], className);
}

interface BaseButtonProps {
  variant?: ButtonVariant;
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
  const { variant = "default", className, children } = props;
  const classes = buttonClasses(variant, className);

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
