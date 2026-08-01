"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  DEFAULT_FONT_COMBO_ID,
  FONT_COMBOS,
  FONT_STORAGE_KEY,
} from "@/data/font-combos";
import {
  DEFAULT_SCHEME_ID,
  SCHEME_CHANGER,
  SCHEME_STORAGE_KEY,
  SCHEMES,
} from "@/data/schemes";
import { cn } from "@/shared/lib/cn";

/*
 * The applied scheme lives on <html>, not in React — the layout's pre-paint
 * script writes it before hydration, and the CSS reads it directly. So the
 * component treats the attribute as an external store: null on the server
 * (unknown until the client can look), the attribute's value after.
 */
const listeners = new Set<() => void>();

function subscribeScheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readScheme(): string {
  return document.documentElement.dataset.scheme ?? DEFAULT_SCHEME_ID;
}

function readFonts(): string {
  return document.documentElement.dataset.fonts ?? DEFAULT_FONT_COMBO_ID;
}

function readServerScheme(): string | null {
  return null;
}

function applyAttribute(
  attribute: "scheme" | "fonts",
  storageKey: string,
  defaultId: string,
  id: string,
): void {
  if (id === defaultId) {
    delete document.documentElement.dataset[attribute];
  } else {
    document.documentElement.dataset[attribute] = id;
  }
  try {
    if (id === defaultId) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, id);
    }
  } catch {
    /* Private browsing: the choice still applies, it just won't survive
       a reload. */
  }
  for (const listener of listeners) listener();
}

function applyScheme(id: string): void {
  applyAttribute("scheme", SCHEME_STORAGE_KEY, DEFAULT_SCHEME_ID, id);
}

function applyFonts(id: string): void {
  applyAttribute("fonts", FONT_STORAGE_KEY, DEFAULT_FONT_COMBO_ID, id);
}

/*
 * The client-preview scheme changer: a small floating trigger that opens a
 * bottom sheet of palette swatches. Chrome, like the menu trigger — not a
 * page call to action — so it does not wear the button component.
 *
 * Selecting a scheme sets `data-scheme` on <html>; the overrides the root
 * layout generates from src/data/schemes.ts do the rest. The choice is kept
 * in localStorage and restored before paint by the layout's inline script,
 * which is why `active` starts unknown and is read back after mount rather
 * than assumed — assuming the default would mishydrate a restored scheme.
 *
 * z-30 keeps the whole apparatus under the nav panel (z-40): a preview tool
 * never sits over the site's own chrome.
 */
export function SchemeChanger() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"colours" | "type">("colours");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeScheme = useSyncExternalStore(
    subscribeScheme,
    readScheme,
    readServerScheme,
  );
  const activeFonts = useSyncExternalStore(
    subscribeScheme,
    readFonts,
    readServerScheme,
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      /* The sheet is fixed over the page, so Tab must cycle inside it or it
         walks into the content behind the scrim. */
      const nodes = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("button") ?? [],
      );
      if (nodes.length === 0) return;

      const current = nodes.indexOf(document.activeElement as HTMLElement);
      const step = event.shiftKey ? -1 : 1;
      const next = (current + step + nodes.length) % nodes.length;

      event.preventDefault();
      nodes[next].focus();
    };

    panelRef.current?.focus();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={SCHEME_CHANGER.trigger}
        aria-expanded={isOpen}
        aria-controls="scheme-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-12 cursor-pointer items-center justify-center gap-1 rounded-full bg-moss shadow-[0_10px_30px_-10px_rgb(0_0_0/0.45)]"
      >
        <span aria-hidden className="size-1.5 rounded-full bg-bone" />
        <span aria-hidden className="size-1.5 rounded-full bg-sand" />
        <span aria-hidden className="size-1.5 rounded-full bg-bone/40" />
      </button>

      {/* Scrim and sheet render after the trigger, so while open the scrim
          covers it and any outside tap — including one back on the trigger —
          closes. Both stay mounted so the close fade has something to run on
          and aria-controls never dangles. */}
      <div
        aria-hidden
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 z-30 bg-ink/20 transition-[opacity,visibility]",
          isOpen
            ? "visible opacity-100 duration-300"
            : "invisible opacity-0 duration-200",
        )}
      />

      <div
        ref={panelRef}
        id="scheme-panel"
        role="dialog"
        aria-modal="true"
        aria-label={SCHEME_CHANGER.title}
        tabIndex={-1}
        className={cn(
          /*
           * The height caps subtract --header-height: the header is z-50 and
           * the panel deliberately z-30, so any part of the panel that rises
           * into the header band is covered and its clicks are eaten. The tab
           * row lives at the panel's top, which is exactly the part that got
           * covered once the type list pushed the panel to full height.
           */
          "fixed inset-x-0 bottom-0 z-30 max-h-[calc(100dvh-var(--header-height)-1rem)] overflow-y-auto overscroll-contain rounded-t-3xl bg-bone px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-ink shadow-[0_-16px_50px_-12px_rgb(0_0_0/0.35)] transition-[translate,opacity,visibility]",
          "sm:inset-x-auto sm:right-4 sm:bottom-20 sm:max-h-[calc(100dvh-var(--header-height)-6rem)] sm:w-[26rem] sm:rounded-3xl sm:shadow-[0_24px_60px_-20px_rgb(0_0_0/0.4)]",
          isOpen
            ? "visible translate-y-0 opacity-100 duration-500 ease-editorial"
            : "invisible translate-y-full opacity-0 duration-200 sm:translate-y-4 motion-reduce:translate-y-0",
        )}
      >
        {/* Sticky, so the tabs stay reachable while the long type list
            scrolls. It carries the panel's top padding and full-bleed ground
            for the same reason: content must scroll behind it, not above. */}
        <div className="sticky top-0 z-10 -mx-5 flex items-center justify-between gap-4 bg-bone px-8 pt-6 pb-3">
          <h2 className="font-display text-h3">{SCHEME_CHANGER.title}</h2>
          <div className="flex gap-1">
            {(["colours", "type"] as const).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={tab === key}
                onClick={() => setTab(key)}
                className={cn(
                  "min-h-11 cursor-pointer rounded-full px-4 text-body transition-colors duration-200",
                  tab === key ? "bg-sand/50" : "text-ink/60 hover:bg-sand/25",
                )}
              >
                {SCHEME_CHANGER.tabs[key]}
              </button>
            ))}
          </div>
        </div>

        {tab === "colours" ? (
          <ul className="mt-1 flex flex-col gap-1">
            {SCHEMES.map((scheme) => (
              <li key={scheme.id}>
                <button
                  type="button"
                  aria-pressed={activeScheme === scheme.id}
                  onClick={() => applyScheme(scheme.id)}
                  className={cn(
                    "flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors duration-200",
                    activeScheme === scheme.id
                      ? "bg-sand/50"
                      : "hover:bg-sand/25",
                  )}
                >
                  <span className="text-body">{scheme.name}</span>
                  <span aria-hidden className="flex items-center gap-1.5">
                    {Object.values(scheme.colors).map((hex) => (
                      <span
                        key={hex}
                        style={{ backgroundColor: hex }}
                        className="size-3.5 rounded-full ring-1 ring-ink/10 ring-inset"
                      />
                    ))}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-1 flex flex-col gap-1">
            {FONT_COMBOS.map((combo) => (
              <li key={combo.id}>
                <button
                  type="button"
                  aria-pressed={activeFonts === combo.id}
                  onClick={() => applyFonts(combo.id)}
                  className={cn(
                    "flex min-h-11 w-full cursor-pointer flex-col items-start rounded-xl px-3 py-2.5 transition-colors duration-200",
                    activeFonts === combo.id ? "bg-sand/50" : "hover:bg-sand/25",
                  )}
                >
                  {/* Each name set in its own face: the row is the specimen. */}
                  <span
                    style={{ fontFamily: `var(${combo.displayVar})` }}
                    className="text-lead"
                  >
                    {combo.name}
                  </span>
                  <span
                    style={{ fontFamily: `var(${combo.sansVar})` }}
                    className="text-body text-ink/60"
                  >
                    {combo.sub}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
