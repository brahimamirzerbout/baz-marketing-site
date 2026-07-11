"use client";
import { useEffect, useRef } from "react";

/**
 * ÆTHER Monochrome — custom cursor (dot + trailing ring) + scroll-progress.
 * Unified with the Hub's cursor effect. The atmospheric background
 * (aether-shell dot-grid + grain + bg image) is on the body via app/aether.css.
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

    // ── Cursor tracking (dot follows instantly, ring trails with easing) ──
    let mx = 0, my = 0, rx = 0, ry = 0;
    let mouseMoved = false;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cDot.style.left = mx + "px";
      cDot.style.top = my + "px";
      if (!mouseMoved) {
        mouseMoved = true;
        raf();
      }
    };
    const onDown = () => cRing.classList.add("clicking");
    const onUp = () => cRing.classList.remove("clicking");
    const raf = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (Math.abs(rx - mx) < 0.05 && Math.abs(ry - my) < 0.05) {
        mouseMoved = false;
        return;
      }
      cRing.style.left = rx + "px";
      cRing.style.top = ry + "px";
      requestAnimationFrame(raf);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    // ── Scroll progress bar ──
    let scrollTicking = false;
    const onScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          if (!cProg) return;
          const h = document.documentElement.scrollHeight - window.innerHeight;
          cProg.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
          scrollTicking = false;
        });
      }
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    // ── Hover state for interactive elements (unified with the Hub) ──
    const hoverSel =
      'a,button,input,select,textarea,[role="button"],.glass,.card-surface,.chip,.watermark';
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
      {/* Custom Cursor — unified with the Hub */}
      <div className="cursor-ring" ref={ringRef} aria-hidden />
      <div className="cursor-dot" ref={dotRef} aria-hidden />
    </>
  );
}