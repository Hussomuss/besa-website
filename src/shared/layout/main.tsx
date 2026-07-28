import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * The page's root element, and the one place a page states what it puts under
 * the header. `globals.css` reads these attributes back through `:has()` and
 * paints the header accordingly — which is how a page reaches a header that
 * renders above it in the root layout.
 *
 * The value describes what is underneath, not what the header should do about
 * it. The header decides that: `bone` takes ink marks and leaves the header a
 * band in flow, `moss` takes bone marks with no scrim because a shadow on a
 * flat colour is a smudge, and `photo` takes bone marks with one.
 *
 * `pale` is a photograph light enough to keep ink marks, and it takes no
 * shadow at all. It is a separate value rather than a judgement call at the
 * call site, because getting it wrong greys the wordmark out on a picture,
 * which is the failure `photo` exists to prevent.
 *
 * Choose it on the wall the marks stand on, not on the average of the frame,
 * and expect to need `menuSpan` with it. A pale photograph's failure mode is
 * fine dark detail crossing the glyphs, which no average will show you and no
 * mark colour will fix — the trigger has to be somewhere else.
 *
 * Anything other than `bone` also floats the header, and that is decided by
 * the *base* value alone, so it is all-or-nothing per page: a header that
 * changed from static to absolute at a breakpoint would reflow the document
 * under the reader.
 */
type Ground = "bone" | "moss" | "photo" | "pale";

/**
 * How much of the page width the header's marks span. `full` puts the trigger
 * at the page's right gutter; a fraction lands its right edge on that vertical
 * instead, so it can sit exactly on the edge of a hero's photograph rather
 * than on the photograph.
 *
 * Position rather than a second colour: a control that has to be tinted and
 * scrimmed to survive a photograph is still the hardest thing on the page to
 * find. Moving it off the picture solves it outright, and it is why there is
 * one mark colour rather than one per end — with the trigger always on the
 * safe side, the two marks cannot stand on different things.
 *
 * The set is enumerated rather than free because the value has to survive a
 * trip through a data attribute and back out via `:has()`. These are the
 * splits the twelve-column grid actually makes; add to MENU_SPANS and the
 * matching rule in globals.css when a hero wants another.
 */
type MenuSpan = "full" | "1/3" | "5/12" | "1/2" | "7/12" | "2/3";

/**
 * The same shape Button's `on` uses, for the same reason: the home hero's
 * ground genuinely changes at lg, where the photograph moves to the right half
 * and the copy lands on bone.
 */
interface Responsive<T> {
  base: T;
  lg: T;
}

type Value<T> = T | Responsive<T>;

interface MainProps {
  /**
   * Ground under the header. Required rather than defaulted, for the same
   * reason Button's `on` is: defaulting to bone means forgetting it on a
   * photographic page yields ink marks on a photograph, illegibly and
   * silently.
   */
  ground: Value<Ground>;
  /** Defaults to `full`, which is the arrangement every page without a
      photograph under the header wants. */
  menuSpan?: Value<MenuSpan>;
  className?: string;
  children?: ReactNode;
}

const isResponsive = <T,>(value: Value<T>): value is Responsive<T> =>
  typeof value === "object";

const base = <T,>(value: Value<T>) =>
  isResponsive(value) ? value.base : value;

/** Undefined when the value does not change, so no attribute is emitted and
    the base rule simply carries through at lg. */
const large = <T,>(value: Value<T>) =>
  isResponsive(value) ? value.lg : undefined;

export function Main({
  ground,
  menuSpan = "full",
  className,
  children,
}: MainProps) {
  return (
    <main
      data-ground={base(ground)}
      data-ground-lg={large(ground)}
      data-menu-span={base(menuSpan)}
      data-menu-span-lg={large(menuSpan)}
      className={cn("flex-1", className)}
    >
      {children}
    </main>
  );
}
