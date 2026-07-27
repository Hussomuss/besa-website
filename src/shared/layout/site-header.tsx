import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Wordmark } from "@/shared/ui/wordmark";
import { PrimaryNav } from "./primary-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="relative z-50 bg-bone">
      <Container className="flex h-[var(--header-height)] items-center justify-between">
        <Link href="/" aria-label="BESA Private Office, home">
          <Wordmark />
        </Link>
        <PrimaryNav />
        <MobileNav />
      </Container>
    </header>
  );
}
