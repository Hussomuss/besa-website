import { HOME_HERO } from "@/data/home";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

export function Hero() {
  const { heading, lead, cta, image } = HOME_HERO;

  return (
    <Section spacing="none" className="relative overflow-hidden">
      <ImageFrame
        src={image.src}
        alt={image.alt}
        isPriority
        hasIntro
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="absolute inset-0 aspect-auto h-full w-full lg:left-auto lg:w-[52%]"
      />

      {/* Scrim carries the copy on mobile only, where text sits on the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-ink/92 from-0% via-ink/45 via-32% to-transparent to-64% lg:hidden"
      />

      <Container className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col justify-end pt-16 pb-16 text-bone lg:grid lg:grid-cols-12 lg:items-center lg:py-24 lg:text-ink">
        <div className="lg:col-span-5">
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
          <Text size="lead" className="mt-6 max-w-[26rem] text-balance lg:mt-8">
            {lead}
          </Text>
          <Button
            href={cta.href}
            className="mt-8 max-lg:border-bone/40 max-lg:text-bone max-sm:w-full lg:mt-12"
          >
            {cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
