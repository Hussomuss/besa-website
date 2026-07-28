import Link from "next/link";
import { buttonClasses } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Text } from "@/shared/ui/text";
import type { ServiceContent } from "@/shared/types/content";

interface ServiceCardProps {
  service: ServiceContent;
}

/**
 * The whole card is one link, so nothing inside may be interactive. The action
 * is a span wearing the button's styling via buttonClasses.
 *
 * h-full plus mt-auto is what aligns the action across all three cards
 * regardless of how many lines the title and description run to. It only works
 * because the li and the Reveal wrapper also carry h-full.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const { title, description, href, image } = service;

  return (
    <Link href={href} className="group flex h-full flex-col">
      <ImageFrame
        src={image.src}
        alt=""
        ratio="square"
        sizes="(min-width: 1536px) 456px, (min-width: 1024px) 30vw, (min-width: 640px) 58vw, 78vw"
        className="transition-transform duration-700 ease-editorial group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      <Heading as="h3" size="h3" className="mt-8 max-w-xs">
        {title}
      </Heading>

      <Text className="mt-4 max-w-xs opacity-80">{description}</Text>

      {/* The wrapper carries mt-auto so the button keeps a minimum gap above
          it; mt-auto on the button itself would override any margin. */}
      <div className="mt-auto pt-8">
        <span className={buttonClasses("inverse")}>Learn more</span>
      </div>
    </Link>
  );
}
