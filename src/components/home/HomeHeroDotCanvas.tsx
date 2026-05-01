"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  glow: number;
};

export function HomeHeroDotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const host = canvas.parentElement;
    const context = canvas.getContext("2d");
    if (!host || !context) return;

    const canvasElement: HTMLCanvasElement = canvas;
    const hostElement: HTMLElement = host;
    const drawingContext: CanvasRenderingContext2D = context;

    const mouse = { active: false, x: -1000, y: -1000 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dots: Dot[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;

    function rebuildDots() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hostElement.clientWidth;
      height = hostElement.clientHeight;
      canvasElement.width = Math.max(1, Math.floor(width * dpr));
      canvasElement.height = Math.max(1, Math.floor(height * dpr));
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      drawingContext.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = 26;
      const columns = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      dots = [];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          dots.push({
            x: column * spacing + (row % 2 === 0 ? 0 : spacing / 2),
            y: row * spacing,
            glow: 0
          });
        }
      }
    }

    function draw() {
      drawingContext.clearRect(0, 0, width, height);

      for (const dot of dots) {
        if (mouse.active && !prefersReducedMotion.matches) {
          const distance = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
          const proximity = Math.max(0, 1 - distance / 180);
          const eased = proximity * proximity * (3 - 2 * proximity);
          dot.glow = Math.max(dot.glow, eased);
        }

        dot.glow = Math.max(0, dot.glow - 0.018);
        const alpha = 0.12 + dot.glow * 0.78;
        const radius = 1.15 + dot.glow * 1.8;
        drawingContext.beginPath();
        drawingContext.fillStyle = `rgba(18, 39, 61, ${alpha})`;
        drawingContext.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        drawingContext.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = hostElement.getBoundingClientRect();
      mouse.active = true;
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handlePointerLeave() {
      mouse.active = false;
    }

    const observer = new ResizeObserver(rebuildDots);
    observer.observe(hostElement);
    hostElement.addEventListener("pointermove", handlePointerMove);
    hostElement.addEventListener("pointerleave", handlePointerLeave);
    rebuildDots();
    draw();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      hostElement.removeEventListener("pointermove", handlePointerMove);
      hostElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas className="home-hero-dots" aria-hidden="true" ref={canvasRef} />;
}
