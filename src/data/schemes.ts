/*
 * The preview schemes. Each one restates the five colour tokens the whole
 * site is mixed from — every surface, scrim, scrollbar and button follows
 * from these five, so a scheme is a complete retint of the site.
 *
 * This file is the single source of truth for the hexes: the root layout
 * generates the CSS overrides from it, and the drawer renders its swatch
 * dots from it. Nothing else may restate a scheme colour.
 *
 * Photography is baked into the images, so schemes read truest on the
 * solid-ground sections. That is fine for what this is: a client preview
 * tool, deleted once a scheme is chosen.
 */

export interface SchemeColors {
  /** The page ground. */
  bone: string;
  /** The secondary surface: input baselines, panel tints. */
  sand: string;
  /** The dark accent ground: buttons, footer, services band. */
  moss: string;
  /** Type on light grounds. */
  ink: string;
  /** Error type. Never a ground, never a fill. */
  rust: string;
}

export interface Scheme {
  id: string;
  name: string;
  colors: SchemeColors;
}

export const SCHEME_STORAGE_KEY = "besa-scheme";

/** The live palette. No CSS override is emitted for it; clearing the
 *  attribute is what selects it. */
export const DEFAULT_SCHEME_ID = "mosscombe";

export const SCHEMES: readonly Scheme[] = [
  {
    id: "mosscombe",
    name: "Mosscombe",
    colors: {
      bone: "#f7f4ef",
      sand: "#d9d2c7",
      moss: "#495648",
      ink: "#2c2c2a",
      rust: "#9e3629",
    },
  },
  {
    id: "fignook",
    name: "Fignook",
    colors: {
      bone: "#e7e0d6",
      sand: "#aea989",
      moss: "#261732",
      ink: "#2a2130",
      rust: "#8f3147",
    },
  },
  {
    id: "claycroft",
    name: "Claycroft",
    colors: {
      bone: "#f8f1e9",
      sand: "#e4d3c1",
      moss: "#6d4433",
      ink: "#33291f",
      rust: "#8e2b20",
    },
  },
  {
    id: "inkmoor",
    name: "Inkmoor",
    colors: {
      bone: "#f5f1e8",
      sand: "#dad2c0",
      moss: "#2c3a50",
      ink: "#24272e",
      rust: "#a03a2e",
    },
  },
  {
    id: "damsonfold",
    name: "Damsonfold",
    colors: {
      bone: "#f7efec",
      sand: "#e0cfc9",
      moss: "#533241",
      ink: "#2e252b",
      rust: "#99382b",
    },
  },
  {
    id: "flintrow",
    name: "Flintrow",
    colors: {
      bone: "#f5f4f1",
      sand: "#dbd9d4",
      moss: "#34332f",
      ink: "#232220",
      rust: "#9e3629",
    },
  },
];

export const SCHEME_CHANGER = {
  trigger: "Change colour scheme",
  title: "Colour schemes",
} as const;
