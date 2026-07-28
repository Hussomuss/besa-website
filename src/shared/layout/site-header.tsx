import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Wordmark } from "@/shared/ui/wordmark";
import { PrimaryNav } from "./primary-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="relative z-50 bg-bone">
      <Container className="flex h-[var(--header-height)] items-center justify-between">
        {/* The wordmark itself is 41px tall, just under the tap minimum. */}
        <Link
          href="/"
          aria-label="BESA Private Office, home"
          className="inline-flex min-h-11 items-center"
        >
          <Wordmark />
        </Link>
        <PrimaryNav />
        <MobileNav />
      </Container>
    </header>
  );
}
