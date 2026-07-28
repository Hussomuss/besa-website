# Stone surfaces — a tonal mesh and a film grain, in CSS

Adds five utilities to `src/app/globals.css` and one prop to `Section`. No call
site uses it yet, so nothing on the site changes.

## 1. What this is

Two ground treatments, each a tonal mesh with a film grain over it:

| Ground | Geometry | Blend | Grain |
|---|---|---|---|
| Sand | Three large blooms, placed | soft-light | 0.4 |
| Moss | Nine small blooms, blurred 120px | overlay | 0.2 |

Opt-in per call site: `<Section tone="sand" texture>`. Bone has no surface, and
asking for one is a compile error rather than a no-op.

### Why

The brief was a "meshy grainy" background in stone, prompted by a reference
that turned out to be a 2560² PNG of a warm mesh gradient — 13.5MB of base64
wrapped in an SVG, exported from Figma. The whole point of rebuilding it in CSS
is that a few hundred bytes paint on the first frame. A background is the one
thing on a page that must never arrive after the type sitting on it.

The constraint that shaped everything below: **a mesh whose stops can be
counted is a gradient, not a surface, and grain you can identify as grain has
already gone too far.**

## 2. The grain

One `feTurbulence` tile as a data URI, tiled at a fixed 160px.

Four details are load-bearing, and each was a visible defect before it was
fixed:

**`fractalNoise`, not `turbulence`.** `turbulence()` returns the absolute value
of the noise field, so wherever the field crosses zero it leaves a dark vein.
Those veins are what make a naive CSS grain read as smoke.

**A colour matrix copying red into all three channels.** `feTurbulence` emits
independent noise per channel, which is coloured television static rather than
grain. The same matrix pins alpha to 1, so strength is governed by one opacity
we control instead of by a second noise field hiding in the alpha channel.

**`color-interpolation-filters='sRGB'`.** SVG filters run in linearRGB by
default, so a mid-grey turbulence arrives nearer 0.73 once shown — and
soft-light's entire premise is that mid grey is a no-op. Without this attribute
the grain lightens every ground it touches instead of leaning it both ways.
This was wrong in the first implementation and is the single most important
line in the block.

**`stitchTiles='stitch'`.** Without it the tile edges disagree and the repeat
shows as a grid the moment the element is wider than one tile.

`background-size` is in pixels, never a percentage. Grain is a physical
property of a surface; a percentage resizes it with the viewport, making the
same page fine-grained on a phone and coarse on a monitor.

### Weight is per palette, on arithmetic rather than taste

Soft-light displaces a backdrop by roughly `b(1-b)`. Near white that is a few
percent; down in moss's midtones it is over twenty. One shared opacity is
therefore necessarily wrong on one of the two grounds — invisible on sand or
coarse on moss. Hence 0.4 and 0.2.

Moss also switches to `overlay`, because soft-light's effect is proportional to
the backdrop's distance from black and moss is dark enough to arrive washed
out. Overlay keeps the contrast; the lower opacity pays for it.

## 3. The two geometries

**Placed mesh (sand).** Three blooms, each sized larger than the element, so no
stop ever lands inside the frame. A radial gradient is mistakable for a light
source only while both its centre and its edge are off-screen.

**Scatter (moss).** Nine small blooms smeared by a 120px blur. The blur is what
does the work: it destroys the evidence that this is a stack of radial
gradients, which is the one thing that leaves the placed mesh still readable as
a gradient on a wide screen.

The scatter geometry and its nine coordinates came from a generator snippet.
Two things in that snippet were rejected:

**`backdrop-filter` → `filter` on a layer of our own.** A backdrop blur
resamples everything painted behind the element and re-runs on every scroll
frame, which is worst on the phones this site is designed for first. It also
samples with edge clamping, so it bleeds at the borders. Blurring our own layer
costs one offscreen pass and composites like any other paint.

**A `#000000` base with hardcoded hex stops → tokens on a stone base.** The
generator's stops fall back to black wherever the radials do not reach, which
is why nine of them are needed to cover at all. On a token base that coverage
requirement disappears. (Its `#f7f4ef` is already exactly `--color-bone`.)

### The scatter's two costs

Both are real and both are why `texture` is opt-in rather than implied by tone:

1. **It clips its host.** Blur fades a layer's own edges to transparent, so the
   layer is grown past its box by twice the radius and the host clips it with
   `overflow: hidden`. A section wearing the scatter cannot also carry a
   decoration that deliberately overhangs — `BranchBackdrop` is the one in the
   repo today, and it sits on the moss services band.
2. **It rasterises several times the host's area.** Cheaper than a backdrop
   filter by a wide margin, but not free. Worth confirming on a real phone
   before it lands on a full-bleed band.

## 4. Layering

Mesh at `z-index: -2`, grain at `-1`, content above both. `isolation: isolate`
is what keeps a negative z-index above the element's own background rather than
behind it — the same mechanism `BranchBackdrop` depends on.

Content above the grain is a deliberate departure from physical accuracy. Real
grain covers the type too, but a few percent of noise laid over Cormorant at
display sizes eats exactly the hairlines that are the reason to specify
Cormorant at all.

## 5. Why bone has no surface

Bone is the page ground and carries the most type. The available spread between
bone and sand is narrow enough that a mesh either reads as flat or, pushed far
enough to register, stops being a surface and becomes a gradient. Both were
built and looked at; neither was worth keeping.

`SectionProps` is a union rather than a flat interface so that
`<Section tone="bone" texture>` fails to compile — the same principle as the
button's required `on` prop, where an illegible pairing is a type error rather
than a judgement call at review time.

## 6. What was rejected

Six comparison axes were built at `/lab` and cut once decided:

| Axis | Kept | Cut |
|---|---|---|
| Grain weight | per-palette | one shared figure |
| Tile size | 160px | 100px, 260px |
| Blend | soft-light, overlay | `normal` — a grey plate that veils rather than grains |
| Layers | mesh + grain | either alone |
| Ground | sand, moss | bone |
| Temperature | sand cool | sand warm/neutral, moss warm/cool |

The temperature modifier mechanism (`lab-warm` / `lab-cool`) is gone entirely.
Sand's cool values are simply what `surface-sand` *is*, rather than a modifier
a call site has to remember.

## 7. Structure

Palettes set custom properties and nothing else, which keeps them independent
of the geometries — either palette can be worn with either geometry. Sand with
the placed mesh and moss with the scatter is a judgement, not a coupling.

```
surface-grain     the noise layer          ::after, z -1
surface-mesh      three placed blooms      background-image
surface-scatter   nine blurred blooms      ::before, z -2
surface-sand      --surface-1/2/3, base, grain weight
surface-moss      --surface-1/2/3, base, grain weight + blend
```

`Section` composes them: `sand → grain + mesh + sand`,
`moss → grain + scatter + moss`. Nothing else should apply them directly.

## 8. Open

- Neither surface has been looked at on a real phone. The scatter's paint cost
  is the thing to check.
- No call site uses `texture` yet, by choice. It gets added band by band.
- `/lab` renders both through the real `Section` API, at full width and
  carrying type, which is the only honest test of a ground.
