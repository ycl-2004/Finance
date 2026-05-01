"use client";

import { useEffect } from "react";
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
  let timeout = 0;
  const frame = window.requestAnimationFrame(() => {
    scrollToRouteTarget();
    timeout = window.setTimeout(scrollToRouteTarget, 80);
  });

  return () => {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(timeout);
  };
}

export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => scheduleScrollReset(), [pathname]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToRouteTarget);
    return () => window.removeEventListener("hashchange", scrollToRouteTarget);
  }, []);

  return null;
}
