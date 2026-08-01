import {
  Albert_Sans,
  Alegreya,
  Archivo,
  Besley,
  Bitter,
  Bodoni_Moda,
  Cardo,
  Crimson_Pro,
  DM_Sans,
  DM_Serif_Text,
  EB_Garamond,
  Faustina,
  Figtree,
  Fraunces,
  Gelasio,
  Ibarra_Real_Nova,
  Instrument_Sans,
  Instrument_Serif,
  Jost,
  Karla,
  Libre_Baskerville,
  Libre_Caslon_Text,
  Literata,
  Lora,
  Manrope,
  Newsreader,
  Outfit,
  Playfair_Display,
  Public_Sans,
  Sorts_Mill_Goudy,
  Source_Serif_4,
  Spectral,
  STIX_Two_Text,
  Vollkorn,
  Work_Sans,
  Zilla_Slab,
} from "next/font/google";

/*
 * The preview pairings' faces, for the scheme changer's Type tab. All of
 * them preload: false — next/font still emits their @font-face rules, but a
 * browser only downloads a face the moment a rendered element asks for it,
 * so an unpicked combo costs nothing on any page.
 *
 * The `variable` literals are the contract with src/data/font-combos.ts;
 * next/font requires them written out here, so change both files together.
 * The two live faces — Cormorant Garamond and Inter — stay in the root
 * layout, because they are the site's, not the preview's.
 *
 * Display faces carry 300/400 and real italics: the site sets its display
 * face light and leans on italic for accent words, and a synthetic slant
 * would misrepresent the pairing being previewed. Families that start at
 * 400 serve their 400 cut for font-light, which is a fair preview of how
 * the family would actually be used.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  preload: false,
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  preload: false,
});

const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-caslon",
  preload: false,
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  preload: false,
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  preload: false,
});

const spectral = Spectral({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  preload: false,
});

const crimson = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  preload: false,
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  preload: false,
});

const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  preload: false,
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  preload: false,
});

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-baskerville",
  preload: false,
});

const cardo = Cardo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-cardo",
  preload: false,
});

const goudy = Sorts_Mill_Goudy({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-goudy",
  preload: false,
});

const dmSerif = DM_Serif_Text({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  preload: false,
});

const zilla = Zilla_Slab({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-zilla",
  preload: false,
});

const bitter = Bitter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-bitter",
  preload: false,
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-vollkorn",
  preload: false,
});

const alegreya = Alegreya({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-alegreya",
  preload: false,
});

const gelasio = Gelasio({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-gelasio",
  preload: false,
});

const besley = Besley({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-besley",
  preload: false,
});

const faustina = Faustina({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-faustina",
  preload: false,
});

const stix = STIX_Two_Text({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-stix",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  preload: false,
});

const ibarra = Ibarra_Real_Nova({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-ibarra",
  preload: false,
});

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  preload: false,
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  preload: false,
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  preload: false,
});

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-karla",
  preload: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  preload: false,
});

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  preload: false,
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  preload: false,
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  preload: false,
});

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-albert",
  preload: false,
});

/** Every preview face's CSS variable class, ready for the <html> element. */
export const previewFontVariables = [
  fraunces,
  bodoni,
  playfair,
  caslon,
  newsreader,
  ebGaramond,
  spectral,
  crimson,
  lora,
  literata,
  sourceSerif,
  baskerville,
  cardo,
  goudy,
  dmSerif,
  zilla,
  bitter,
  vollkorn,
  alegreya,
  gelasio,
  besley,
  faustina,
  stix,
  instrumentSerif,
  ibarra,
  workSans,
  jost,
  publicSans,
  karla,
  manrope,
  dmSans,
  figtree,
  outfit,
  archivo,
  instrumentSans,
  albertSans,
]
  .map((font) => font.variable)
  .join(" ");
