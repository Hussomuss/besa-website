import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Wordmark } from "@/shared/ui/wordmark";
import { NavMenu } from "./nav-menu";

/**
 * A wordmark and a menu, at every breakpoint. There is no nav list: five pages
 * and a practice whose premise is that clients arrive by introduction do not
 * need a persistent rail arguing otherwise.
 *
 * Both marks take one colour and one shadow, from --mark, because they always
 * stand on the same thing: the menu moves to the half with no picture under it
 * rather than being tinted to survive one. `Main` states the ground and the
 * side, globals.css does the wiring; see the header-ground spec.
 *
 * Not sticky. That is what makes the overlap safe: the header passes over the
 * top of the document and nothing else, which is the one region whose contents
 * the page author knows.
 */
/*
 * --menu-right is the trigger's distance from the page's right edge, and the
 * default reproduces where Container's own right gutter falls: the gutter
 * itself until the page is wider than --container-page, and half the overflow
 * plus the gutter after that. Writing it out is what lets a fraction like 50%
 * replace it without the trigger jumping off the grid at other widths.
 *
 * It is measured against the header rather than the viewport on purpose. 100vw
 * includes the scrollbar and the hero's own halves do not, so a vw-based
 * offset would miss the picture's edge by the scrollbar's width.
 */
const MENU_RIGHT =
  "[--menu-gutter:max(var(--header-gutter),calc((100%-var(--container-page))/2+var(--header-gutter)))] [--menu-right:var(--menu-gutter)]";

/** Matches Container's px-6 / md:px-10 / lg:px-16. */
const GUTTER =
  "[--header-gutter:1.5rem] md:[--header-gutter:2.5rem] lg:[--header-gutter:4rem]";

export function SiteHeader() {
  return (
    <header
      className={`relative z-50 bg-bone text-[var(--mark)] [--mark-shadow:none] [--mark:var(--color-ink)] [text-shadow:var(--mark-shadow)] ${GUTTER} ${MENU_RIGHT}`}
    >
      <Container className="flex h-[var(--header-height)] items-center">
        {/* The wordmark itself is 41px tall, just under the tap minimum. */}
        <Link
          href="/"
          aria-label="BESA Private Office, home"
          className="inline-flex min-h-11 items-center"
        >
          <Wordmark tone="inherit" />
        </Link>
      </Container>
      {/* Outside Container, and absolute against the header, so its offset is
          measured against the page rather than the padded column. */}
      <NavMenu />
    </header>
  );
}
