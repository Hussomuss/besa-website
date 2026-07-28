"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { NAV_ITEMS } from "@/shared/constants/nav-items";
import { cn } from "@/shared/lib/cn";
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

      {/* Always mounted, so aria-controls never dangles and the close fade has
          something to run on. visibility rides the transition: it flips only
          after the fade, and while hidden the panel is out of the tab order
          and the accessibility tree, exactly as the hidden attribute was.
          Closed-state children reset on delay-200 duration-0 — silently, one
          fade after the panel has gone — so every open staggers afresh. */}
      <div
        ref={panelRef}
        id="nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
        className={cn(
          "fixed inset-0 z-40 isolate overflow-hidden bg-bone pt-[var(--header-height)] text-ink transition-[opacity,visibility]",
          isOpen
            ? "visible opacity-100 duration-300"
            : "invisible opacity-0 duration-200",
        )}
      >
        {/* Pressed into the corner: translate crops the stems off the page
            edge, and its percentages resolve against the sprig's own box, so
            the crop survives a resize. Fine line work, so the last links can
            pass over it on a phone and stay legible. It arrives last and from
            slightly lower, like the rows. */}
        <div
          aria-hidden
          style={SPRIG}
          className={cn(
            "mask-shape pointer-events-none absolute right-0 bottom-0 -z-10 aspect-[154/264] h-[38vh] translate-x-[8%] bg-moss transition-[translate,opacity] lg:h-[55vh]",
            isOpen
              ? "translate-y-[10%] opacity-100 delay-[260ms] duration-700 ease-editorial"
              : "translate-y-[14%] opacity-0 delay-200 duration-0 motion-reduce:translate-y-[10%]",
          )}
        />
        {/* Container rather than a bare gutter, so the links land on the same
            vertical as the wordmark above them at every width. h-full works
            because the panel is fixed inset-0: the rows divide the space below
            the header, so a taller viewport is an airier menu. */}
        <Container className="h-full">
          <nav aria-label="Primary" className="h-full">
            <ul className="flex h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.label} className="flex flex-1 items-center">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    /* The one inline style: the stagger is arithmetic on the
                       row index, which no static class can express. */
                    style={{
                      transitionDelay: isOpen ? `${60 + index * 40}ms` : "200ms",
                    }}
                    className={cn(
                      "inline-flex min-h-11 items-center font-display text-h3 font-normal transition-[translate,opacity] lg:text-h2",
                      isOpen
                        ? "translate-y-0 opacity-100 duration-500 ease-editorial"
                        : "translate-y-4 opacity-0 duration-0 motion-reduce:translate-y-0",
                    )}
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
