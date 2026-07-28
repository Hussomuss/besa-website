# Branch backdrop — two tokenised silhouettes behind the services band

Adds `src/shared/ui/branch-backdrop.tsx` and two mask assets. Touches
`ServicesBand` by three classes and one child. Nothing else on the site
changes.

## 1. What this is

Two botanical branches, bone, at 10% and 6% opacity, sitting behind the content
of the moss "What we take on." band. The fuller branch is large and bleeds off
the left edge; the narrow one is smaller, dropped and inset in front of it.
Desktop only — below `lg` the node is `display: none`.

### Why

The band is a flat plane of `--color-moss` carrying three square photographs.
It is the only full-bleed colour field on the home page and the one place a
quiet ground texture buys depth without competing with anything. The branches
give the eye something behind the cards at the left margin, where the heading's
`max-w-xl` otherwise leaves the field empty.

The constraint that shaped every decision below: it must remain decoration. If
you notice it as an image rather than as depth, it has failed.

## 2. The assets

Four candidate source files were traced from raster art. Two families:

| Family | Files | Fills | Nature |
|---|---|---|---|
| Silhouette | `…narrow-point 1.svg`, `…narrow-point (1) 1.svg` | branch colour + greyscale slivers | solid mass, 768×1536 |
| Line | `5.svg`, `6.svg`, `9.svg` | `#231F20` only | fine linework, ~110×264 |

The silhouettes won on a side-by-side over the real moss ground. The reason is
worth recording, because it is the thing that will decide any future addition:

**A solid mass holds at 6–10% opacity; linework does not.** Hairlines at that
strength either vanish or read as dirt on the field, so the line family had to
start at 22%/14% to be visible at all — at which point it stops being a ground
and becomes an illustration. The silhouettes are legible as depth precisely
because they have area rather than edges.

The silhouettes are also, unexpectedly, the light option:

| Source | Output | Transform | Size |
|---|---|---|---|
| `…narrow-point 1.svg` | `public/shapes/branch-full.svg` | keep 25 `#7A7B66` paths, drop 66 slivers, round to 1dp | 30KB → 13KB |
| `…narrow-point (1) 1.svg` | `public/shapes/branch-narrow.svg` | keep 3 `#757869` paths, drop 38 slivers, round to 1dp | 20KB → 9KB |

Two-thirds of each file was greyscale highlight slivers, an artifact of the
trace. They sit *on top of* the main shape rather than being carved out of it,
so removing them leaves the silhouette whole — no cracks. Rounding coordinates
to one decimal is invisible at a 768×1536 viewBox and saves a further 30%.

Both outputs are a single `fill="#000"`, matching `arch.svg`. The colour is
arbitrary: CSS alpha-masks these, so only the alpha channel is read.

### Reproducing the transform

A throwaway script, not committed. For each file: keep every `<path>` whose
`fill` equals the branch colour, discard the rest, replace each coordinate
`n` with `Math.round(n * 10) / 10`, and re-wrap in an `<svg>` carrying the
original `viewBox` and `fill="#000"`.

## 3. Why masks

Three ways to put a recolourable SVG on a page:

| | Verdict |
|---|---|
| Inline SVG component | ~22KB of path data in the HTML of every page carrying the band |
| `<img src>` | cannot be recoloured — the source greys would ship as-is |
| CSS mask | payload cached and out of the document, colour is a Tailwind token |

The mask wins on all three counts, and the mechanism already exists: the
`mask-shape` utility and `--shape-mask` variable in `globals.css`, which
`ImageFrame` drives for its arch and semicircle crops. No new CSS.

`aspect-[1/2]` on each layer matches the source viewBox. Without it,
`mask-shape`'s `mask-size: 100% 100%` would stretch the branch.

## 4. Composition

| Layer | Asset | Position | Height | Opacity |
|---|---|---|---|---|
| Back | `branch-full.svg` | `-top-[6%] -left-[9%]` | `116%` | `10%` |
| Front | `branch-narrow.svg` | `top-[22%] left-[5%]` | `74%` | `6%` |

Back is the *stronger* layer, which inverts the usual atmospheric convention.
It is deliberate: at these opacities a fainter back layer reads as a smudge,
whereas a stronger one reads as a plant and lets the front branch sit in front
of it as a nearer, lighter thing.

The two files were chosen as a pair because they share a profile — they read as
one species at two distances. A dense specimen paired with a thin sprig reads
as two unrelated clippings.

Vertical placement is a percentage of the host section, so the branches keep
their proportion to the band as its content grows.

### 4.1 Horizontal placement is anchored to the container, not the section

The backdrop wraps both layers in a box matching `Container`'s geometry —
`mx-auto w-full max-w-page`, no padding — and positions them against that.

This is not incidental. The section is full-bleed and unbounded; the content
stops at `max-w-page` (96rem). Percentages of the section therefore track the
viewport, so above a 1536px viewport the two branches spread apart from each
other *and* drift out of the content column into the empty outer margin:

| Viewport | Gap, anchored to section | Gap, anchored to container |
|---|---|---|
| 1440 | 202px | 202px |
| 1920 | 269px | 215px |
| 2560 | 358px | 215px |

At 2560 the section-anchored back branch ended 168px before the heading even
began — nothing was behind the content at all. Anchored to the container the
gap converges at 215px and the pair holds its position as the margins grow.

Below 1536 the two are identical, because that is where the section and the
container are the same width.

## 5. Host requirements

`ServicesBand` gains `relative isolate lg:overflow-hidden`.

- **`isolate` is load-bearing.** `-z-10` paints above the section's own
  background only inside a stacking context. Without `isolate` the branches
  fall behind `bg-moss` and vanish completely.
- **`lg:overflow-hidden`** clips the left bleed so it cannot create horizontal
  page scroll. Scoped to `lg` because that is the only width the backdrop
  exists at; clipping the phone's scroll-snap row would be a change for
  nothing.
- **`pointer-events-none`** on the backdrop, because a negative-z element still
  receives clicks and the whole first card is a link.

## 6. Mobile

Hidden below `lg`.

The phone band is a heading plus a horizontal scroll-snap row of 78vw cards. A
1:2 branch bleeding off the left has nowhere to sit there without crowding
either the heading or the cards, and the layout is complete without it. Per
`AGENTS.md`, this is a deliberate composition for the small screen rather than
a desktop trick left to distort it: below `lg` the DOM node is
`display: none` and the two extra section classes do nothing at that width.

## 7. Out of scope

- No animation. The backdrop is static; nothing here needs a reduced-motion
  branch.
- No new copy. Nothing user-facing, so `src/data/` is untouched.
- No component gains a prop. `BranchBackdrop` takes none — the arrangement is
  the design, not configuration. A `side` prop earns its place the first time a
  second section wants one mirrored, not before.
