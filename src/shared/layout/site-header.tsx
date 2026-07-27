import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Wordmark } from "@/shared/ui/wordmark";
import { PrimaryNav } from "./primary-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container className="flex items-center justify-between py-8">
        <Link href="/" aria-label="BESA Private Office, home">
          <Wordmark />
        </Link>
        <PrimaryNav />
        <MobileNav />
      </Container>
    </header>
  );
}
