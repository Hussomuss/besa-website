import { HOME_HERO } from "@/data/home";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

export function Hero() {
  const { heading, lead, cta, image } = HOME_HERO;

  // `isolate` keeps the scrim's multiply blend inside the hero.
  return (
    <Section spacing="none" className="relative isolate overflow-hidden">
      <ImageFrame
        src={image.src}
        alt={image.alt}
        isPriority
        hasIntro
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 aspect-auto h-full w-full lg:left-auto lg:w-1/2"
      />

      {/* Scrim carries the copy on mobile only, where text sits on the photo. */}
      <div
        aria-hidden
        className="scrim-hero absolute inset-0 lg:hidden"
      />

      {/*
        A whole viewport, not a viewport less the header: the header floats on
        the hero rather than sitting above it. --header-height is reserved as
        padding at the top instead of subtracted from the height, which is what
        keeps the copy clear of the marks at lg where it is vertically centred.
      */}
      <Container className="relative flex min-h-svh flex-col justify-end pt-[var(--header-height)] pb-16 text-bone lg:grid lg:grid-cols-12 lg:items-center lg:pb-24 lg:text-ink">
        <div className="max-lg:text-shadow-scrim lg:col-span-5">
          <Heading as="h1" size="display" className="text-balance">
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
          <Text size="lead" className="mt-6 max-w-[26rem] lg:mt-8">
            {lead}
          </Text>
          {/* The only responsive ground on the site: below lg the copy sits on
              the scrimmed photograph, at lg the photo moves right and the copy
              is on bone. The colour follows, bone to ink, with nothing said
              about either. */}
          <Button
            href={cta.href}
            on={{ base: "image", lg: "bone" }}
            width="full"
            className="mt-8 lg:mt-12"
          >
            {cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
