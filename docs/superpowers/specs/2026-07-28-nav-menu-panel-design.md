# Nav menu panel

The open menu becomes a page of its own: five links distributed down the full
height of the viewport, a moss-toned botanical sprig pressed into the
bottom-right corner, and a quiet veil-and-rise entrance. The panel's chrome —
focus trap, Escape, scroll lock, the mark flip in the header — is already
correct and is not touched.

## Why

The panel today is a bone sheet with the five links stacked at `gap-2` under
the header: correct, and condensed. A full-screen surface whose content
occupies a fifth of it reads as a dialog that happens to be large, not as a
place. Distributing the links down the height turns the same five labels into
an index of the site, and the growing space between them is what makes the
menu feel considered rather than emitted.

The sprig gives the surface a signature. Every other full-bleed moment on the
site carries something grown — the branch backdrop behind the services band,
the photography — and the menu is currently the only bone field with nothing
alive on it.

## Layout: the distributed index

The panel keeps `fixed inset-0 z-40 bg-bone text-ink` and gains
`overflow-hidden isolate` — `overflow-hidden` because the sprig is cropped by
the viewport edge and must not mint scrollbars, `isolate` for the same reason
`BranchBackdrop` documents: a `-z-10` child only paints above the panel's own
background inside a stacking context.

Inside, the space below the header becomes a column that the list fills:

- The panel reserves the header with `pt-[var(--header-height)]` (replacing
  `pt-28 lg:pt-40`) and becomes `flex flex-col`.
- `Container` grows `flex flex-1` so the gutter logic is untouched while the
  nav inherits the height; `nav` and `ul` carry it down (`flex h-full w-full
  flex-col`).
- Each `li` is `flex flex-1 items-center`: five equal rows, text vertically
  centred in each. Spacing is automatic — a taller viewport is an airier
  menu — which is the point of distributing rather than fixing a gap.
- The list ends with `pb-[max(1.5rem,env(safe-area-inset-bottom))]` so
  Contact clears the phone's home indicator.

Type, hit areas and copy are unchanged: `font-display text-h3 lg:text-h2`,
`min-h-11` links, labels from `NAV_ITEMS`. No dividers between rows — space
does the separating.

## The moss sprig

`public/shapes/moss-sprig.svg` — the hand-drawn sprig, viewBox `0 0 154 264`,
optimised with svgo at precision 2 before committing (the source is 53KB of
traced path data; nothing at this size survives a precision cut visibly).

It is rendered the way the branch backdrop is rendered, for the reasons that
component already documents: a `div` carrying the `mask-shape` utility with
`--shape-mask: url(/shapes/moss-sprig.svg)`, painted `bg-moss`. Inline SVG
would put the path data in every page's payload; `<img>` could not be
recoloured. The mask keeps the file cached and out of the document, and the
colour stays the token — the sprig is moss because the theme says moss, not
because the file does.

Placement, inside the panel and before `Container` in source:

- `aria-hidden`, `pointer-events-none`, `absolute -z-10`.
- Anchored `right-0 bottom-0`, then pushed past the edge with a translate —
  on the order of `translate-x-[8%] translate-y-[10%]`, percentages of the
  sprig's own box — so the stems run off the page edge like a pressed
  specimen tucked into the corner. Translate rather than negative insets
  because its percentages resolve against the sprig, not the viewport, so
  the crop survives a resize. Exact values are tuned visually at
  implementation.
- `aspect-[154/264]` matching the viewBox, height `~55vh` at `lg` and `~38vh`
  below it. On a phone the last link or two pass over the sprig's fine
  strokes; the drawing is thin line work on bone, so the ink labels stay
  legible and the layering reads deliberate.

## Motion

Open, in order:

1. The bone panel fades in, `opacity 0 → 1`, 300ms.
2. Each row rises into place — `translate-y-4 → 0` with a fade — over 500ms
   on `var(--ease-editorial)`, staggered `60ms + 40ms × row`.
3. The sprig eases in last, a fade with a slight rise, beginning ~260ms in.

Close is one 200ms fade of the whole panel. Leaving is always faster than
arriving, and nothing staggers on the way out. After the fade completes the
rows and sprig reset to their pre-open state via a delayed zero-duration
transition, so the stagger replays on every open rather than only the first.

Mechanics: the panel stays mounted and swaps utility classes. `hidden={!isOpen}`
is replaced by a `visible/invisible` + opacity pair with `visibility` included
in the transition, so the panel stays visible while fading and leaves the
accessibility tree and tab order at rest exactly as the `hidden` attribute
did. No state machine, no unmount listener; the focus trap keeps keying off
`isOpen`.

`prefers-reduced-motion` strips the translates (`motion-reduce`); the fades
remain. The header-ground rule `header:has([aria-expanded="true"])` keys off
the trigger, not the panel, so the mark flip is unaffected by the panel
staying mounted.

Hover is the house gesture and nothing else: the links take `link-underline`,
the hairline that draws in from the left — defined for navigation links and,
until now, applied to none. The trigger gains `cursor-pointer`, which
Tailwind v4's preflight no longer puts on buttons.

## What must not change

- Focus trap, Escape handling, focus restore to the trigger, scroll lock.
- `aria-expanded` / `aria-controls` / `role="dialog"` wiring and the
  Menu/Close trigger label.
- The ink-marks-over-open-panel rule from the header-ground spec.
- Nav copy lives in `nav-items.ts`; no user-facing string enters the
  component.
- No new components: the sprig is a single div inside `nav-menu.tsx`.

## Verification

- [ ] `tsc --noEmit` and `eslint` clean.
- [ ] Visual: five rows share the height evenly at phone and desktop widths;
      Contact clears the bottom edge on a phone.
- [ ] Visual: the sprig is moss-toned, cropped by the bottom-right edge, and
      sits under the links; no horizontal or vertical scrollbar appears while
      the menu is open.
- [ ] Visual: opening staggers the rows and the sprig arrives last; closing
      is a single fast fade; reopening staggers again.
- [ ] Keyboard: Tab cycles trigger and links, Escape closes and restores
      focus — unchanged from today.
- [ ] `prefers-reduced-motion`: no translate motion, fades only.
