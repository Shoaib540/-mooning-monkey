import { useEffect, useRef } from "react";

/**
 * Animated nebula starfield with parallax + slow drifting particles.
 * Pure canvas, no deps.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth * devicePixelRatio);
    let h = (canvas.height = window.innerHeight * devicePixelRatio);
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";

    type Star = { x: number; y: number; z: number; r: number; c: string };
    const colors = ["#ffffff", "#c6b3ff", "#ff4dd2", "#3df0ff", "#c6ff3d"];
    const N = Math.min(160, Math.floor((w * h) / 26000));
    const stars: Star[] = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2,
      r: Math.random() * 1.6 + 0.3,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
    };
    window.addEventListener("resize", onResize);

    const mouse = { x: w / 2, y: h / 2 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * devicePixelRatio;
      mouse.y = e.clientY * devicePixelRatio;
    };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    let raf = 0;
    const loop = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      // soft nebula
      const g = ctx.createRadialGradient(
        w * 0.5,
        h * 0.4,
        0,
        w * 0.5,
        h * 0.4,
        Math.max(w, h) * 0.7,
      );
      g.addColorStop(0, "rgba(40,15,80,0.35)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        const px = (mouse.x - w / 2) * 0.02 * s.z;
        const py = (mouse.y - h / 2) * 0.02 * s.z;
        const x = s.x + px;
        const y = s.y + py;
        const tw = 0.5 + Math.sin(t * 6 + s.x * 0.01 + s.y * 0.01) * 0.5;
        ctx.globalAlpha = 0.3 + tw * 0.7 * s.z;
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(x, y, s.r * s.z * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();

        // drift
        s.x += 0.05 * s.z;
        if (s.x > w + 5) s.x = -5;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
    />
  );
}
