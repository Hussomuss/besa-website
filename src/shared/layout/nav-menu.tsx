"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { NAV_ITEMS } from "@/shared/constants/nav-items";
import { Container } from "@/shared/ui/container";

/* Painted via mask + bg-moss, exactly as BranchBackdrop documents: inline SVG
   would put ~30KB of traced path data in every page, <img> could not take the
   token. The sprig is moss because the theme says moss, not the file. */
const SPRIG: CSSProperties = {
  "--shape-mask": "url(/shapes/moss-sprig.svg)",
} as CSSProperties;

export function NavMenu() {
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
    <div className="absolute top-0 right-[var(--menu-right)] flex h-[var(--header-height)] items-center">
      {/* -mr-3 with px-3 buys a 44px hit area while keeping the glyphs
          optically flush with the container gutter. */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="nav-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 -mr-3 inline-flex min-h-11 min-w-11 items-center justify-end px-3 font-sans text-nav font-semibold uppercase"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Rendered always, so aria-controls never points at a missing id. */}
      <div
        ref={panelRef}
        id="nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
        hidden={!isOpen}
        className="fixed inset-0 z-40 isolate overflow-hidden bg-bone pt-[var(--header-height)] text-ink"
      >
        {/* Pressed into the corner: translate crops the stems off the page
            edge, and its percentages resolve against the sprig's own box, so
            the crop survives a resize. Fine line work, so the last links can
            pass over it on a phone and stay legible. */}
        <div
          aria-hidden
          style={SPRIG}
          className="mask-shape pointer-events-none absolute right-0 bottom-0 -z-10 aspect-[154/264] h-[38vh] translate-x-[8%] translate-y-[10%] bg-moss lg:h-[55vh]"
        />
        {/* Container rather than a bare gutter, so the links land on the same
            vertical as the wordmark above them at every width. h-full works
            because the panel is fixed inset-0: the rows divide the space below
            the header, so a taller viewport is an airier menu. */}
        <Container className="h-full">
          <nav aria-label="Primary" className="h-full">
            <ul className="flex h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="flex flex-1 items-center">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-h-11 items-center font-display text-h3 font-normal lg:text-h2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </div>
  );
}
