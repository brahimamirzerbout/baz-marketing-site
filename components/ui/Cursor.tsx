"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor — quiet, precise, alive.
 *
 * A small dot that tracks instantly. A ring that follows with
 * spring physics. On interactive elements, the ring expands.
 * On CTAs, it fills subtly. No particles. No text. No noise.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]',
      );
      if (!interactive) {
        ring.classList.remove("hover", "cta");
        return;
      }
      const cta = interactive.closest(
        '[data-cursor="cta"], a[class*="bg-accent"], a[class*="btn-gold"], button[class*="bg-accent"]',
      );
      ring.classList.toggle("cta", !!cta);
      ring.classList.toggle("hover", !cta);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor-host" aria-hidden>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
