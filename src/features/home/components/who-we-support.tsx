import { WHO_WE_SUPPORT } from "@/data/home";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

/** Tiles are placed explicitly, so DOM order is free to suit mobile. */
const TILE_CLASS = {
  copy: "col-span-3 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1",
  large: "lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-1",
  smallTop: "lg:col-span-3 lg:col-start-5 lg:row-start-1",
  smallBottom: "lg:col-span-3 lg:col-start-5 lg:row-start-2",
} as const;

const SMALL_TILE_CLASS = [TILE_CLASS.smallTop, TILE_CLASS.smallBottom];

export function WhoWeSupport() {
  const { heading, lead, cta, images } = WHO_WE_SUPPORT;
  const [feature, ...rest] = images;

  return (
    <Section id="who-we-support" className="overflow-hidden">
      <Container>
        <Reveal>
          {/*
            A mosaic rather than images beside a column: the copy is a tile in
            the same grid at the same tight gap, which is what makes it read as
            one composition. Imagery sits left against the hero's right so two
            consecutive sections do not share a silhouette.

            Below lg the grid breaks out of the container gutters so the image
            strip runs to both screen edges, and the copy tile puts the gutter
            back with a matching positive margin so the sand panel stays inset.
            Bleeding photography against contained colour is the contrast; the
            margin has to go on that one tile because negative margins on the
            image cells would break the three-column track.
          */}
          <div className="-mx-6 grid grid-cols-3 gap-1.5 md:-mx-10 lg:mx-0 lg:h-[40rem] lg:grid-cols-12 lg:grid-rows-2">
            <div
              className={`${TILE_CLASS.copy} mx-6 flex flex-col justify-center bg-sand px-7 py-11 md:mx-10 md:px-9 lg:mx-0 lg:px-10 xl:px-12`}
            >
              <Heading as="h2" size="h2" className="text-balance">
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

              <Text className="mt-6 max-w-md">{lead}</Text>

              <Button href={cta.href} className="mt-9 self-start">
                {cta.label}
              </Button>
            </div>

            <div className={TILE_CLASS.large}>
              <ImageFrame
                src={feature.src}
                alt={feature.alt}
                sizes="(min-width: 1024px) 33vw, 33vw"
                className="aspect-[3/4] lg:aspect-auto lg:h-full"
              />
            </div>

            {rest.map((image, index) => (
              <div key={image.src} className={SMALL_TILE_CLASS[index]}>
                <ImageFrame
                  src={image.src}
                  alt={image.alt}
                  sizes="(min-width: 1024px) 25vw, 33vw"
                  className="aspect-[3/4] lg:aspect-auto lg:h-full"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
