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
    <Section spacing="none" className="overflow-hidden">
      <Container className="grid min-h-screen items-center gap-14 pt-32 pb-20 lg:grid-cols-12 lg:gap-x-8 lg:py-24">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Heading as="h1" size="display" className="text-balance">
            {heading}
          </Heading>
          <Text size="lead" className="mt-8 max-w-md">
            {lead}
          </Text>
          <Button href={cta.href} className="mt-12">
            {cta.label}
          </Button>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:-mr-16">
          <ImageFrame
            src={image.src}
            alt={image.alt}
            shape="arch"
            ratio="arch"
            isPriority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="lg:ml-auto lg:aspect-auto lg:h-[82vh]"
          />
        </div>
      </Container>
    </Section>
  );
}
