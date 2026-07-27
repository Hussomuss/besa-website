import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Wordmark } from "@/shared/ui/wordmark";
import { SITE } from "@/data/site";
import { LEGAL_NAV_ITEMS, NAV_ITEMS } from "@/shared/constants/nav-items";

export function SiteFooter() {
  return (
    <footer className="bg-moss text-bone">
      <Container className="grid gap-12 py-20 md:grid-cols-3">
        <Wordmark tone="bone" className="items-start" />

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-sans text-label uppercase hover:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="flex flex-col gap-3 font-sans text-label uppercase not-italic">
          <span>{SITE.city}</span>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="hover:opacity-70"
          >
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="lowercase hover:opacity-70"
          >
            {SITE.email}
          </a>
        </address>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-bone/20 py-8 font-sans text-label uppercase md:flex-row md:justify-between">
        <span>
          &copy; {SITE.name} {SITE.tagline}. All rights reserved.
        </span>
        <ul className="flex gap-8">
          {LEGAL_NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="hover:opacity-70">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
