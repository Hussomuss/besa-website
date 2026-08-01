import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ViewTransition } from "react";
import { DEFAULT_SCHEME_ID, SCHEME_STORAGE_KEY, SCHEMES } from "@/data/schemes";
import { SchemeChanger } from "@/shared/layout/scheme-changer";
import { SiteFooter } from "@/shared/layout/site-footer";
import { SiteHeader } from "@/shared/layout/site-header";
import "./globals.css";

/*
 * The preview schemes, as token overrides generated from the one source of
 * truth in src/data/schemes.ts. Unlayered, so they outrank the @theme layer
 * the tokens are declared in. The default scheme emits nothing: clearing the
 * attribute is what selects it.
 */
const schemeCss = SCHEMES.filter((scheme) => scheme.id !== DEFAULT_SCHEME_ID)
  .map(
    ({ id, colors }) =>
      `html[data-scheme="${id}"]{--color-bone:${colors.bone};--color-sand:${colors.sand};--color-moss:${colors.moss};--color-ink:${colors.ink};--color-rust:${colors.rust};}`,
  )
  .join("\n");

/* Restores a saved scheme before first paint, so a reload does not flash the
   default palette. Inline and first in the body: the parser runs it before
   anything after it is painted. */
const schemeScript = `try{var s=localStorage.getItem(${JSON.stringify(SCHEME_STORAGE_KEY)});if(s&&s!==${JSON.stringify(DEFAULT_SCHEME_ID)})document.documentElement.dataset.scheme=s}catch(e){}`;

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BESA Private Office",
  description:
    "Private lifestyle management for people whose time is already spoken for.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bone text-ink">
        <style dangerouslySetInnerHTML={{ __html: schemeCss }} />
        <script dangerouslySetInnerHTML={{ __html: schemeScript }} />
        <SiteHeader />
        {/*
          The boundary that makes a navigation a view transition. `default`
          sets the view-transition-class, and it has to name something real:
          React only calls `document.startViewTransition` if a class was
          actually applied to a host instance, so a boundary carrying `none`
          is not a boundary that stays in the root snapshot — it is no
          boundary at all, and the navigation is an ordinary cut.

          The class is what the CSS hangs on, as `.page`. The dissolve itself,
          and the reason the page group is pinned rather than allowed to
          interpolate, are in globals.css.
        */}
        <ViewTransition default="page">{children}</ViewTransition>
        <SiteFooter />
        <SchemeChanger />
      </body>
    </html>
  );
}
