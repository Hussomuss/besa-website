"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/shared/constants/nav-items";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const close = () => {
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    /**
     * The panel is fixed over the page, so without this Tab walks straight out
     * of it into the hero behind. The trigger is part of the cycle because it
     * sits above the panel and acts as the Close control.
     */
    const focusable = () => [
      triggerRef.current,
      ...Array.from(panelRef.current?.querySelectorAll("a[href]") ?? []),
    ].filter((node): node is HTMLElement => node !== null);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = focusable();
      if (nodes.length === 0) return;

      const current = nodes.indexOf(document.activeElement as HTMLElement);
      const step = event.shiftKey ? -1 : 1;
      const next = (current + step + nodes.length) % nodes.length;

      event.preventDefault();
      nodes[next].focus();
    };

    panelRef.current?.focus();
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* -mr-3 with px-3 buys a 44px hit area while keeping the glyphs
          optically flush with the container gutter. */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 -mr-3 inline-flex min-h-11 min-w-11 items-center justify-end px-3 font-sans text-label uppercase"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Rendered always, so aria-controls never points at a missing id. */}
      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
        hidden={!isOpen}
        className="fixed inset-0 z-40 bg-bone px-6 pt-28"
      >
        <nav aria-label="Primary">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex min-h-11 items-center font-display text-h3 font-normal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
