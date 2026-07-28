"use client";

import { useId, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { Text } from "./text";

export interface DisclosureItem {
  summary: string;
  content: string;
}

interface AccordionProps {
  items: readonly DisclosureItem[];
  className?: string;
}

/**
 * Only one panel is open at a time. Height is animated with grid-template-rows
 * 0fr to 1fr rather than max-height, so it eases to the content's real height
 * without measuring it in JavaScript and without a guessed maximum that clips
 * long answers.
 */
export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <ul className={cn("border-t border-sand", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={item.summary} className="border-b border-sand">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-baseline justify-between gap-8 py-8 text-left lg:py-10"
              >
                <span className="font-display text-h3 font-normal text-balance">
                  {item.summary}
                </span>

                {/* A plus whose upright collapses into a minus. */}
                <span
                  aria-hidden
                  className="relative mt-2 h-3 w-3 shrink-0 self-start"
                >
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-editorial motion-reduce:transition-none",
                      isOpen ? "scale-y-0" : "scale-y-100",
                    )}
                  />
                </span>
              </button>
            </h3>

            {/*
              inert is not optional here. Zero-height clipped content and
              opacity-0 text both remain in the accessibility tree, so without
              it a screen reader announces every answer while aria-expanded
              still reports false.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-editorial motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <Text
                  className={cn(
                    "max-w-[60ch] pb-8 transition-opacity duration-500 ease-editorial motion-reduce:transition-none",
                    isOpen ? "opacity-80" : "opacity-0",
                  )}
                >
                  {item.content}
                </Text>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
