import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The project's custom @theme font sizes are not in tailwind-merge's default
 * config, so it reads `text-label` as a text colour and lets `text-bone`
 * delete it. Registering them as font sizes keeps size and colour independent.
 * Any new `--text-*` token in globals.css must be added here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h2", "h3", "lead", "body", "label"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
