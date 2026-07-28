import { SERVICES_HERO } from "@/data/services";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Text } from "@/shared/ui/text";

/**
 * One photograph and the type standing on it, which is only possible because
 * of how this particular frame is composed: the whole still life sits in the
 * right third and the left half is bare wall. The heading is not placed beside
 * the picture, it is placed *in* it, on the part the photographer left empty.
 *
 * Below `wide` that arrangement stops being available rather than merely
 * becoming tight, and it is worth being exact about why. Covering a 16:9 file
 * into a portrait viewport scales it to the height and crops the sides: at
 * 390x844 only the right 26% of the file survives, which cuts the card in
 * half. Anchoring the crop cannot rescue it, because the thing being cropped
 * away *is* the empty wall the heading needs. So the picture stops trying to
 * fill the viewport and takes a band of it instead, and the type moves below
 * onto bg-linen.
 *
 * That band is stated in svh rather than as an aspect ratio, which is the
 * whole reason it survives a tablet. A fixed ratio makes the frame taller as
 * the screen widens and squeezes the type off the bottom; a fixed fraction of
 * the viewport holds the split and simply lets the crop widen, so a wider
 * portrait screen sees more wall rather than less room to read.
 *
 * It also starts below the header rather than under it, which is the one
 * place this layout gives something up, and it is bought rather than
 * conceded. The dried stems own the right edge of this photograph at every
 * crop, so a trigger in the right gutter is on them whatever the frame does:
 * measured across phone widths its fifth percentile sits between 1.6:1 and
 * 2.5:1. Moving it left is what `menuSpan` is for, but on a 360px screen
 * every span far enough left to clear the stems is also far enough left to
 * touch the wordmark. There is no position that works, so the picture yields
 * the header band instead and both marks stand on flat linen at 11.9:1.
 *
 * Above `wide` there is room for the span to do its job, and it does:
 * menuSpan 2/3 on the page puts the trigger on bare wall at 9.4:1 worst
 * measured, so the photograph keeps the whole viewport there.
 *
 * bg-linen is the wall's own colour, sampled off the photograph. It is not
 * there to hide the frame's edges, which are travertine below and stems
 * above; a photograph is allowed to end. It is there so the type and the
 * header stand on the same warm ground the picture is lit against, which bone
 * is not — bone reads cooler and brighter than everything in the frame, and
 * the hero comes apart into a photo pasted on a card. It also means the first
 * paint is already the right colour.
 */
export function ServicesHero() {
  const { heading, lead, cta, image } = SERVICES_HERO;

  return (
    /* pt is what keeps the header off the picture below `wide`. It has to come
       off again at `wide`, because inset-0 on the frame resolves against the
       padding box and would otherwise start the photograph below the header
       instead of behind it. */
    <section className="relative isolate flex min-h-svh flex-col bg-linen pt-[var(--header-height)] wide:pt-0">
      {/* A band under the header below `wide`; the section's whole ground
          above it. -z-10 rather than a lower sibling order, so at `wide` the
          type is centred against the full height instead of being laid out
          around the picture. isolate on the section keeps it above bg-linen.
          h-auto at `wide` hands the height back to inset-0, which an explicit
          height would otherwise override. */}
      <div className="relative h-[40svh] w-full wide:absolute wide:inset-0 wide:-z-10 wide:h-auto">
        <ImageFrame
          src={image.src}
          alt={image.alt}
          isPriority
          hasIntro
          focus="right-bottom"
          sizes="100vw"
          className="absolute inset-0 aspect-auto h-full w-full"
        />
      </div>

      {/* At `wide` the padding reserves the floating header, which the
          section no longer does. Below it the section has already reserved
          it, so this only has to keep the type off the frame's lower edge. */}
      <Container className="flex flex-1 flex-col justify-center py-10 wide:py-0 wide:pt-[var(--header-height)]">
        <Heading
          as="h1"
          size="display"
          className="max-w-[13ch] text-balance lg:font-normal"
        >
          {heading.map((segment) =>
            segment.isAccent ? (
              <em key={segment.text} className="font-normal italic">
                {segment.text}
              </em>
            ) : (
              segment.text
            ),
          )}
        </Heading>

        <Text size="lead" className="mt-6 max-w-[38ch] opacity-80 lg:mt-8">
          {lead}
        </Text>

        <Button
          href={cta.href}
          on="sand"
          width="full"
          className="mt-8 sm:w-auto sm:self-start lg:mt-10"
        >
          {cta.label}
        </Button>
      </Container>
    </section>
  );
}
