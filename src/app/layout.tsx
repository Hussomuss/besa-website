import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ViewTransition } from "react";
import { SiteFooter } from "@/shared/layout/site-footer";
import { SiteHeader } from "@/shared/layout/site-header";
import "./globals.css";

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
      </body>
    </html>
  );
}
