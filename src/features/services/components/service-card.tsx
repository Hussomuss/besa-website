import Link from "next/link";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Text } from "@/shared/ui/text";
import type { ServiceContent } from "@/shared/types/content";

interface ServiceCardProps {
  service: ServiceContent;
}

/**
 * The whole card is one link, so nothing inside may be a link of its own. The
 * "Learn more" line is a span styled as one and driven by the card's hover.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const { title, description, href, image } = service;

  return (
    <Link href={href} className="group block">
      <ImageFrame
        src={image.src}
        alt={image.alt}
        ratio="landscape"
        sizes="(min-width: 1024px) 30vw, 100vw"
        className="transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
      />

      <Heading as="h3" size="h3" className="mt-7 max-w-xs">
        {title}
      </Heading>

      <Text className="mt-4 max-w-xs opacity-80">{description}</Text>

      <span className="link-underline-group mt-7 inline-block font-sans text-label uppercase">
        Learn more
      </span>
    </Link>
  );
}
