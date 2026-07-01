"use client";
import { useEffect, useRef } from "react";

/**
 * ÆTHER Monochrome — native React port of the silk background,
 * custom cursor (dot + trailing ring) and scroll-progress bar.
 * Drop into the root layout <body>. Purely decorative + pointer-events:none.
 */
export function AetherBackground() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cDot = dotRef.current;
    const cRing = ringRef.current;
    const cProg = progRef.current;
    if (!cDot || !cRing) return;

    // Theme bootstrap: default dark, honor localStorage 'aether-theme'
    try {
      const t = localStorage.getItem("aether-theme");
      if (t === "light") document.documentElement.classList.remove("dark");
      else document.documentElement.classList.add("dark");
    } catch {
      document.documentElement.classList.add("dark");
    }

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cDot.style.left = mx + "px";
      cDot.style.top = my + "px";
    };
    const onDown = () => cRing.classList.add("clicking");
    const onUp = () => cRing.classList.remove("clicking");
    const onScroll = () => {
      if (!cProg) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      cProg.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    const raf = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      cRing.style.left = rx + "px";
      cRing.style.top = ry + "px";
      requestAnimationFrame(raf);
    };
    raf();
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    // hover state for interactive elements
    const hoverSel =
      'a,button,input,select,textarea,[role="button"],.hover-lift,.hover-glow,.nav-link,.tab-btn,.card-base,.glass';
    const enter = () => {
      cDot.classList.add("hovering");
      cRing.classList.add("hovering");
    };
    const leave = () => {
      cDot.classList.remove("hovering");
      cRing.classList.remove("hovering");
    };
    const attach = () =>
      document.querySelectorAll(hoverSel).forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progRef} aria-hidden />
      {/* Silk Background */}
      <div className="silk-bg" aria-hidden>
        <div className="silk-layer silk-layer-1" />
        <div className="silk-layer silk-layer-2" />
        <div className="silk-layer silk-layer-3" />
        <div className="silk-layer silk-layer-4" />
        <div className="silk-sheen" />
        <svg className="silk-weave" width="100%" height="100%" preserveAspectRatio="none">
          <filter id="silkWeave">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves={2} seed={4}>
              <animate
                attributeName="baseFrequency"
                values="0.006 0.012;0.01 0.008;0.006 0.012"
                dur="30s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#silkWeave)" />
        </svg>
      </div>
      {/* Custom Cursor */}
      <div className="cursor-ring" ref={ringRef} aria-hidden />
      <div className="cursor-dot" ref={dotRef} aria-hidden />
    </>
  );
}