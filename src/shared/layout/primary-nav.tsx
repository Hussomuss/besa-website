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
              className="link-underline font-sans text-label uppercase"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
