"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsInView(true);
        observer.disconnect();
      },
      // The page scrolls vertically, so arrival is a vertical question, but an
      // intersection ratio is an area: horizontal fraction times vertical one.
      // Widening the root far past both sides takes the horizontal axis out of
      // that product, leaving the threshold to mean what it reads as — 12% of
      // the element's own height is on screen.
      //
      // Without it, anything inside a horizontal scroller is scored on how far
      // off to the side it sits. In the services snap row the second card is
      // worth only its peek, which lands either side of 12% depending on the
      // handset (11.1% at 360px, 12.4% at 390px), and the third card scores
      // exactly zero and never reveals until it is swiped to.
      { threshold: 0.12, rootMargin: "0px 9999px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}
