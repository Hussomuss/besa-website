import Link from "next/link";
import { NAV_ITEMS } from "@/shared/constants/nav-items";

export function PrimaryNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-10">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="font-sans text-label uppercase transition-opacity duration-300 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
