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
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="aspect-auto h-[46vh] sm:h-[54vh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[52%]"
      />

      <Container className="pt-10 pb-16 lg:grid lg:min-h-[calc(100svh-var(--header-height))] lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-5">
          <Heading as="h1" size="display" className="text-balance">
            {heading}
          </Heading>
          <Text size="lead" className="mt-6 max-w-md lg:mt-8">
            {lead}
          </Text>
          <Button href={cta.href} className="mt-8 max-sm:w-full lg:mt-12">
            {cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
