"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToRouteTarget() {
  const hash = window.location.hash.slice(1);

  if (hash) {
    const target = document.getElementById(decodeURIComponent(hash));
    if (target) {
      target.scrollIntoView({ block: "start", behavior: "auto" });
      return;
    }
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function scheduleScrollReset() {
  const timeouts: number[] = [];
  const frame = window.requestAnimationFrame(() => {
    scrollToRouteTarget();
    [80, 240, 600].forEach((delay) => {
      timeouts.push(window.setTimeout(scrollToRouteTarget, delay));
    });
  });

  return () => {
    window.cancelAnimationFrame(frame);
    timeouts.forEach(window.clearTimeout);
  };
}

export function ScrollRestoration() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    scrollToRouteTarget();
  }, [pathname]);

  useEffect(() => scheduleScrollReset(), [pathname]);

  useEffect(() => {
    window.addEventListener("pageshow", scrollToRouteTarget);
    window.addEventListener("hashchange", scrollToRouteTarget);
    return () => {
      window.removeEventListener("pageshow", scrollToRouteTarget);
      window.removeEventListener("hashchange", scrollToRouteTarget);
    };
  }, []);

  return null;
}
