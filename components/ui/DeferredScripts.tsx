"use client";

import { useEffect, useState } from "react";

/**
 * DeferredScripts — mounts its children only AFTER the page's initial
 * `load` event and then on `requestIdleCallback`, so non-critical client
 * scripts (analytics, perf measurement, smooth-scroll, custom cursor /
 * scroll-progress) execute PAST the LCP / TTI window instead of
 * competing for the main thread during first paint.
 *
 * Why `load` + idle (not a flat timeout): on a fast connection a flat
 * 2.5s delay wastes time; on a slow connection a flat delay can fire
 * BEFORE LCP and re-introduce the contention. Tying to `load` keeps the
 * deferral correct across device speeds — the deferred scripts always
 * run after the browser has finished the initial render pass.
 *
 * Safe ONLY for cosmetic / measurement / enhancement scripts that render
 * null or non-essential UI. Do NOT wrap content the user must see
 * immediately (it will not paint until after load + idle).
 */
export function DeferredScripts({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let done = false;
    const fire = () => {
      if (!done) return;
      done = true;
      setShow(true);
    };
    // mark ready, then defer to idle (the load handler sets done=true first)
    const ric =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? (window.requestIdleCallback as (cb: () => void, opts?: { timeout: number }) => number)
        : null;

    const start = () => {
      done = true;
      if (ric) {
        const id = ric(fire, { timeout: 2500 });
        // safety: if idle never fires within the timeout, force it
        const guard = window.setTimeout(fire, 3000);
        return () => {
          if ("cancelIdleCallback" in window) (window.cancelIdleCallback as (h: number) => void)(id);
          window.clearTimeout(guard);
        };
      }
      const t = window.setTimeout(fire, 2000);
      return () => window.clearTimeout(t);
    };

    let cleanup: (() => void) | undefined;
    if (document.readyState === "complete") {
      cleanup = start();
    } else {
      const onStart = () => {
        cleanup = start();
      };
      window.addEventListener("load", onStart, { once: true });
    }

    return () => {
      window.removeEventListener("load", start);
      cleanup?.();
    };
  }, []);

  if (!show) return null;
  return <>{children}</>;
}