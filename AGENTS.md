<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Package manager

pnpm. `package.json` sets `packageManager`, and `pnpm-lock.yaml` is the only
lockfile. Never run `npm install` in this repo; it creates a competing
`package-lock.json` and the two lockfiles diverge silently.

# Design rules

**Mobile first, and mobile designed.** Write the unprefixed styles for the
phone and add `sm:` / `lg:` for larger screens. Tailwind is mechanically
mobile-first already, so this rule is about intent, not syntax: the phone
layout must be composed deliberately rather than inherited by accident. In
particular, viewport-height and negative-margin tricks aimed at desktop must be
scoped behind a breakpoint, or they distort the small screen.

**No eyebrow labels.** Never place small letterspaced uppercase text above a
main heading as a kicker or category label, even when a reference mockup shows
one. A heading that needs a tag explaining its category is not doing its job.
Compose sections as heading, supporting text, action.

**Copy lives in `src/data/`.** No user-facing string appears in a component.

**One component, one gesture, many grounds.** Every call to action uses
`shared/ui/button`. Never introduce a second component or a bespoke class with
its own hover behaviour, and never restyle a button inline so it animates
differently. `emphasis`, `colour`, `on` and `width` are configuration, not new
buttons; if a call site wants behaviour none of them expresses, the answer is
to change the component, not to override it.

The button is filled at rest, because hover does not exist on a touch screen
and a button whose identity is a hover effect never finishes on a phone. The
gesture is a plane of the fill's tonal partner rising from the baseline.

`on` is required and states the ground, which is what makes an illegible
pairing fail to compile. It also chooses the colour: the default is always
maximum contrast against that ground, so `colour` is written only to ask for
something else. Where a whole card is already a link and cannot contain a
nested one, use the exported `buttonClasses()` on a span, wrapping the label in
its own span so the lift has something to animate. `link-underline` is for
navigation links only, not actions.

# Architecture

`src/app` holds routing files only: a `metadata` export and a composition of
components. Primitives with no domain knowledge go in `src/shared/ui`, site
chrome in `src/shared/layout`, page sections in `src/features/<name>/components`.
Filenames are kebab-case including components. `src/shared/ui/index.ts` is the
only barrel. Design tokens live in the single `@theme` block in
`src/app/globals.css`; never hardcode a brand colour or font size.

See `docs/superpowers/specs/` for the full design record.
