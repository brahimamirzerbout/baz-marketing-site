"use client";
import { useEffect, useRef } from "react";

/**
 * ÆTHER Monochrome — scroll-progress bar.
 *
 * The atmospheric background (aether-shell dot-grid + film grain + the pinned
 * aether-bg image) is now provided by the body/layout via app/aether.css, so
 * this component keeps only the scroll-progress indicator.
 */
export function AetherBackground() {
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cProg = progRef.current;
    const onScroll = () => {
      if (!cProg) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      cProg.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };

    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progRef} aria-hidden />
    </>
  );
}