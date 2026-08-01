/*
 * The preview font pairings. Each one remaps the two faces the whole site is
 * set in — the display serif and the working sans — so a combo is a complete
 * re-setting of the site's type.
 *
 * Each var must match a `variable` literal in
 * src/shared/layout/preview-fonts.ts (or, for the two live faces, in
 * src/app/layout.tsx) exactly: next/font requires those to be written as
 * literals, so the names are stated twice and this comment is the contract
 * between the files.
 *
 * Every display face here ships real italics, because the site leans on
 * display italic for its accent words — a synthetic slant would misrepresent
 * the pairing being previewed.
 */

export interface FontCombo {
  id: string;
  /** The display face, shown set in itself. */
  name: string;
  /** The sans partner, shown set in itself. */
  sub: string;
  displayVar: string;
  sansVar: string;
}

export const FONT_STORAGE_KEY = "besa-fonts";

/** The live pairing. No CSS override is emitted for it; clearing the
 *  attribute is what selects it. */
export const DEFAULT_FONT_COMBO_ID = "cormorant";

export const FONT_COMBOS: readonly FontCombo[] = [
  {
    id: "cormorant",
    name: "Cormorant Garamond",
    sub: "with Inter",
    displayVar: "--font-cormorant",
    sansVar: "--font-inter",
  },
  {
    id: "fraunces",
    name: "Fraunces",
    sub: "with Work Sans",
    displayVar: "--font-fraunces",
    sansVar: "--font-work-sans",
  },
  {
    id: "bodoni",
    name: "Bodoni Moda",
    sub: "with Jost",
    displayVar: "--font-bodoni",
    sansVar: "--font-jost",
  },
  {
    id: "playfair",
    name: "Playfair Display",
    sub: "with Public Sans",
    displayVar: "--font-playfair",
    sansVar: "--font-public-sans",
  },
  {
    id: "caslon",
    name: "Libre Caslon",
    sub: "with Karla",
    displayVar: "--font-caslon",
    sansVar: "--font-karla",
  },
  {
    id: "newsreader",
    name: "Newsreader",
    sub: "with Manrope",
    displayVar: "--font-newsreader",
    sansVar: "--font-manrope",
  },
  {
    id: "eb-garamond",
    name: "EB Garamond",
    sub: "with Archivo",
    displayVar: "--font-eb-garamond",
    sansVar: "--font-archivo",
  },
  {
    id: "spectral",
    name: "Spectral",
    sub: "with Karla",
    displayVar: "--font-spectral",
    sansVar: "--font-karla",
  },
  {
    id: "crimson",
    name: "Crimson Pro",
    sub: "with Figtree",
    displayVar: "--font-crimson",
    sansVar: "--font-figtree",
  },
  {
    id: "lora",
    name: "Lora",
    sub: "with DM Sans",
    displayVar: "--font-lora",
    sansVar: "--font-dm-sans",
  },
  {
    id: "literata",
    name: "Literata",
    sub: "with Inter",
    displayVar: "--font-literata",
    sansVar: "--font-inter",
  },
  {
    id: "source-serif",
    name: "Source Serif",
    sub: "with Public Sans",
    displayVar: "--font-source-serif",
    sansVar: "--font-public-sans",
  },
  {
    id: "baskerville",
    name: "Libre Baskerville",
    sub: "with Albert Sans",
    displayVar: "--font-baskerville",
    sansVar: "--font-albert",
  },
  {
    id: "cardo",
    name: "Cardo",
    sub: "with Outfit",
    displayVar: "--font-cardo",
    sansVar: "--font-outfit",
  },
  {
    id: "goudy",
    name: "Sorts Mill Goudy",
    sub: "with Manrope",
    displayVar: "--font-goudy",
    sansVar: "--font-manrope",
  },
  {
    id: "dm-serif",
    name: "DM Serif",
    sub: "with DM Sans",
    displayVar: "--font-dm-serif",
    sansVar: "--font-dm-sans",
  },
  {
    id: "zilla",
    name: "Zilla Slab",
    sub: "with Instrument Sans",
    displayVar: "--font-zilla",
    sansVar: "--font-instrument-sans",
  },
  {
    id: "bitter",
    name: "Bitter",
    sub: "with Archivo",
    displayVar: "--font-bitter",
    sansVar: "--font-archivo",
  },
  {
    id: "vollkorn",
    name: "Vollkorn",
    sub: "with Figtree",
    displayVar: "--font-vollkorn",
    sansVar: "--font-figtree",
  },
  {
    id: "alegreya",
    name: "Alegreya",
    sub: "with Work Sans",
    displayVar: "--font-alegreya",
    sansVar: "--font-work-sans",
  },
  {
    id: "gelasio",
    name: "Gelasio",
    sub: "with Inter",
    displayVar: "--font-gelasio",
    sansVar: "--font-inter",
  },
  {
    id: "besley",
    name: "Besley",
    sub: "with Jost",
    displayVar: "--font-besley",
    sansVar: "--font-jost",
  },
  {
    id: "faustina",
    name: "Faustina",
    sub: "with Albert Sans",
    displayVar: "--font-faustina",
    sansVar: "--font-albert",
  },
  {
    id: "stix",
    name: "STIX Two",
    sub: "with Manrope",
    displayVar: "--font-stix",
    sansVar: "--font-manrope",
  },
  {
    id: "instrument",
    name: "Instrument Serif",
    sub: "with Instrument Sans",
    displayVar: "--font-instrument-serif",
    sansVar: "--font-instrument-sans",
  },
  {
    id: "ibarra",
    name: "Ibarra Real Nova",
    sub: "with Outfit",
    displayVar: "--font-ibarra",
    sansVar: "--font-outfit",
  },
];
