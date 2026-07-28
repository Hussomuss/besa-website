import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Wordmark } from "@/shared/ui/wordmark";
import { SITE } from "@/data/site";
import { LEGAL_NAV_ITEMS, NAV_ITEMS } from "@/shared/constants/nav-items";

/**
 * Every link carries min-h-11. Label type is an 11px/1.2 line box, so without
 * it each tap target is 13px, below the 24px WCAG minimum let alone the 44px
 * guidance. The 44px rows replace the gaps that used to separate the lines.
 *
 * Type stays at full bone rather than an opacity step: bone at 70% over moss
 * measures about 4.4:1, under AA for text this size.
 */
const FOOTER_LINK_CLASS =
  "inline-flex min-h-11 items-center font-sans text-label uppercase hover:opacity-70";

export function SiteFooter() {
  return (
    <footer className="bg-moss text-bone">
      <Container className="grid gap-12 py-20 md:grid-cols-3">
        <Wordmark tone="bone" className="items-start" />

        <nav aria-label="Footer">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={FOOTER_LINK_CLASS}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="flex flex-col not-italic">
          <span className={FOOTER_LINK_CLASS}>{SITE.city}</span>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className={FOOTER_LINK_CLASS}
          >
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className={`${FOOTER_LINK_CLASS} lowercase`}
          >
            {SITE.email}
          </a>
        </address>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-bone/20 py-8 font-sans text-label uppercase md:flex-row md:justify-between md:items-center">
        <span>
          &copy; {SITE.name} {SITE.tagline}. All rights reserved.
        </span>
        <ul className="flex gap-8">
          {LEGAL_NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={FOOTER_LINK_CLASS}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
