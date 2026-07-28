import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Href } from "@/shared/types/ui";

/**
 * One button for the whole site: filled at rest, with a plane of the partner
 * colour rising from the baseline under the finger. Emphasis and colour are
 * configuration, not new buttons. Do not add a second component, and do not
 * restyle this one inline.
 *
 * Filled at rest because hover does not exist on a touch screen: a button
 * whose identity is a hover effect never finishes on a phone.
 */

/** Grounds the button can sit on. `image` is the scrimmed hero photograph. */
type LightGround = "bone" | "sand";
type DarkGround = "moss" | "image";
export type Ground = LightGround | DarkGround;

/** Colours legible on a light ground, and on a dark one. */
type LightColour = "ink" | "moss";
type DarkColour = "bone" | "sand";
export type Colour = LightColour | DarkColour;

export type Emphasis = "contained" | "outline";

/** Only the hero needs this: its ground genuinely changes at lg. */
interface ResponsiveGround {
  base: Ground;
  lg: Ground;
}

/**
 * Maximum contrast against the ground. Writing `colour` is therefore only
 * necessary to ask for something other than maximum contrast.
 */
const DEFAULT_COLOUR: Record<Ground, Colour> = {
  bone: "ink",
  sand: "ink",
  moss: "bone",
  image: "bone",
};

/**
 * The rise colour is the fill's tonal partner rather than its opposite —
 * ink pairs with moss, bone pairs with sand — so both members of a pair take
 * the same label colour and the label never changes mid-gesture. That is what
 * lets `contained` carry no colour transition at all, and with no colour
 * transition there is nothing for reduced motion to desynchronise.
 */
const CONTAINED_CLASS: Record<Colour, string> = {
  ink: "border-transparent bg-ink text-bone [--rise:var(--color-moss)]",
  moss: "border-transparent bg-moss text-bone [--rise:var(--color-ink)]",
  bone: "border-transparent bg-bone text-ink [--rise:var(--color-sand)]",
  sand: "border-transparent bg-sand text-ink [--rise:var(--color-bone)]",
};

/**
 * Written out rather than built from a template because Tailwind scans for
 * literal class strings; `lg:${colour}` would never reach the stylesheet.
 */
const CONTAINED_LG_CLASS: Record<Colour, string> = {
  ink: "lg:bg-ink lg:text-bone lg:[--rise:var(--color-moss)]",
  moss: "lg:bg-moss lg:text-bone lg:[--rise:var(--color-ink)]",
  bone: "lg:bg-bone lg:text-ink lg:[--rise:var(--color-sand)]",
  sand: "lg:bg-sand lg:text-ink lg:[--rise:var(--color-bone)]",
};

/**
 * Outline fills with its own colour, so the label flips to whatever is legible
 * on that colour — the same pairing contained uses, which means the ground is
 * not needed here either.
 *
 * Both hover and active are declared. Tailwind v4 already gates `hover:`
 * behind (hover: hover), so without the active pair a touch device would raise
 * the plane and leave the label the same colour as it.
 */
const OUTLINE_CLASS: Record<Colour, string> = {
  ink: "border-ink/30 text-ink hover:text-bone active:text-bone group-hover:text-bone group-active:text-bone [--rise:var(--color-ink)]",
  moss: "border-moss/40 text-moss hover:text-bone active:text-bone group-hover:text-bone group-active:text-bone [--rise:var(--color-moss)]",
  bone: "border-bone/40 text-bone hover:text-ink active:text-ink group-hover:text-ink group-active:text-ink [--rise:var(--color-bone)]",
  sand: "border-sand/50 text-sand hover:text-ink active:text-ink group-hover:text-ink group-active:text-ink [--rise:var(--color-sand)]",
};

const OUTLINE_LG_CLASS: Record<Colour, string> = {
  ink: "lg:border-ink/30 lg:text-ink lg:hover:text-bone lg:active:text-bone lg:[--rise:var(--color-ink)]",
  moss: "lg:border-moss/40 lg:text-moss lg:hover:text-bone lg:active:text-bone lg:[--rise:var(--color-moss)]",
  bone: "lg:border-bone/40 lg:text-bone lg:hover:text-ink lg:active:text-ink lg:[--rise:var(--color-bone)]",
  sand: "lg:border-sand/50 lg:text-sand lg:hover:text-ink lg:active:text-ink lg:[--rise:var(--color-sand)]",
};

const BASE_CLASS =
  "rise inline-flex items-center justify-center border px-10 py-4.5 font-sans text-label uppercase";

/**
 * A prop rather than a className so the only two answers stay the only two
 * answers. `full` spans the container it is given, which on the hero is the
 * five-column copy tile rather than the viewport.
 */
export type Width = "auto" | "full";

const WIDTH_CLASS: Record<Width, string> = {
  auto: "",
  full: "w-full",
};

/** Outline is the only emphasis whose label changes colour, so it is the only
    one needing a colour transition and its reduced-motion gate. */
const OUTLINE_TRANSITION =
  "transition-colors duration-[440ms] ease-rise motion-reduce:transition-none";

/**
 * The ground constrains the colour. An illegible pairing does not compile:
 * sand on sand and ink on moss are both below 2:1.
 *
 * A responsive ground admits no explicit colour, because one colour cannot be
 * legible on two different grounds — the point of varying the ground is to let
 * the default vary with it.
 */
type Palette =
  | { on: LightGround; colour?: LightColour }
  | { on: DarkGround; colour?: DarkColour }
  | { on: ResponsiveGround; colour?: never };

function isResponsive(on: Ground | ResponsiveGround): on is ResponsiveGround {
  return typeof on !== "string";
}

/**
 * Exported so a non-interactive element can wear the button's styling, which
 * is required where a whole card is already a link and must not contain a
 * nested one. The element must still wrap its label in a single span, which is
 * what the lift animates.
 */
export function buttonClasses(
  palette: Palette,
  emphasis: Emphasis = "contained",
  width: Width = "auto",
  className?: string,
) {
  const { on, colour } = palette;
  const baseColour = colour ?? DEFAULT_COLOUR[isResponsive(on) ? on.base : on];
  const lgColour = isResponsive(on) ? DEFAULT_COLOUR[on.lg] : undefined;

  const isOutline = emphasis === "outline";
  const rest = isOutline ? OUTLINE_CLASS : CONTAINED_CLASS;
  const large = isOutline ? OUTLINE_LG_CLASS : CONTAINED_LG_CLASS;

  return cn(
    BASE_CLASS,
    WIDTH_CLASS[width],
    isOutline && OUTLINE_TRANSITION,
    rest[baseColour],
    lgColour && large[lgColour],
    className,
  );
}

interface BaseButtonProps {
  emphasis?: Emphasis;
  width?: Width;
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
  onClick?: () => void;
}

type ButtonProps = (LinkButtonProps | ActionButtonProps) & Palette;

export function Button(props: ButtonProps) {
  const { emphasis = "contained", width = "auto", className, children } = props;
  const classes = buttonClasses(props as Palette, emphasis, width, className);

  /* The span is not decorative: the label lift animates it. */
  const label = <span>{children}</span>;

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {label}
    </button>
  );
}
