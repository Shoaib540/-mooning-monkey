import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, TrendingUp, Trophy, Zap } from "lucide-react";

/**
 * Live, animated crash-game simulation. Pure visual demo (no real money).
 * - Multiplier ticks up exponentially
 * - Random "crash point" between 1.05× and 50×
 * - Auto-restart cycle
 * - Live SVG curve traced on canvas
 */
export default function CrashGame() {
  const [multi, setMulti] = useState(1.0);
  const [crashed, setCrashed] = useState(false);
  const [crashAt, setCrashAt] = useState(2.5);
  const [history, setHistory] = useState<number[]>([4.21, 1.18, 12.4, 2.7, 1.05, 7.8, 3.3, 2.1]);
  const [cashedOut, setCashedOut] = useState<number | null>(null);
  const [bet] = useState(0.25);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ t: number; m: number }[]>([]);

  // simulation loop
  useEffect(() => {
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      const m = Math.exp(elapsed * 0.32); // smooth growth
      pointsRef.current.push({ t: elapsed, m });
      if (m >= crashAt) {
        setMulti(crashAt);
        setCrashed(true);
        cancelAnimationFrame(rafRef.current);
        // wait then restart
        setTimeout(() => {
          setHistory((h) => [Number(crashAt.toFixed(2)), ...h].slice(0, 12));
          setCrashAt(1.05 + Math.pow(Math.random(), 1.6) * 18);
          setCashedOut(null);
          setCrashed(false);
          setMulti(1.0);
          startRef.current = 0;
          pointsRef.current = [];
          rafRef.current = requestAnimationFrame(tick);
        }, 1800);
        return;
      }
      setMulti(m);
      drawCurve();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crashAt]);

  const drawCurve = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const w = (c.width = c.clientWidth * devicePixelRatio);
    const h = (c.height = c.clientHeight * devicePixelRatio);
    ctx.clearRect(0, 0, w, h);
    const pts = pointsRef.current;
    if (pts.length < 2) return;
    const maxT = Math.max(8, pts[pts.length - 1].t * 1.05);
    const maxM = Math.max(2, pts[pts.length - 1].m * 1.1);
    const x = (t: number) => (t / maxT) * w;
    const y = (m: number) => h - ((m - 1) / (maxM - 1)) * h * 0.85 - h * 0.05;

    // glow line
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "#9b5cff");
    grad.addColorStop(0.5, "#ff4dd2");
    grad.addColorStop(1, "#3df0ff");
    ctx.lineWidth = 4 * devicePixelRatio;
    ctx.strokeStyle = grad;
    ctx.shadowBlur = 20 * devicePixelRatio;
    ctx.shadowColor = crashed ? "#ff3d6e" : "#9b5cff";
    ctx.beginPath();
    ctx.moveTo(x(pts[0].t), y(pts[0].m));
    for (const p of pts) ctx.lineTo(x(p.t), y(p.m));
    ctx.stroke();

    // fill area
    ctx.shadowBlur = 0;
    ctx.lineTo(x(pts[pts.length - 1].t), h);
    ctx.lineTo(x(pts[0].t), h);
    ctx.closePath();
    const fill = ctx.createLinearGradient(0, 0, 0, h);
    fill.addColorStop(0, "rgba(155,92,255,0.35)");
    fill.addColorStop(1, "rgba(155,92,255,0)");
    ctx.fillStyle = fill;
    ctx.fill();

    // rocket head
    const last = pts[pts.length - 1];
    ctx.fillStyle = crashed ? "#ff3d6e" : "#fff";
    ctx.beginPath();
    ctx.arc(x(last.t), y(last.m), 6 * devicePixelRatio, 0, Math.PI * 2);
    ctx.fill();
  };

  const cashout = () => {
    if (crashed || cashedOut) return;
    setCashedOut(multi);
  };

  const profit = cashedOut ? bet * cashedOut - bet : 0;

  return (
    <section id="game" className="relative section-pad overflow-hidden">
      <div className="aurora opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4">
          <span className="chip mx-auto"><Rocket size={14} /> Crash Arena · Live Demo</span>
          <h2 className="font-display text-4xl md:text-6xl">Bet on the rocket. <span className="text-gradient">Cash out before it crashes.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">A skill-meets-luck loop where every player owns a slice of the house through $TAK.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Live game panel */}
          <div className="lg:col-span-2 glass-strong rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -inset-px rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(155,92,255,0.25), transparent 40%)" }} />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
                <span className="text-xs tracking-[0.3em] uppercase text-white/55">Round Live</span>
              </div>
              <div className="font-mono text-xs text-white/55">house edge · 2%</div>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl bg-gradient-to-br from-bg2 to-black ring-1 ring-white/10 overflow-hidden">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <motion.div
                key={crashed ? "crash" : "live"}
                animate={{ scale: crashed ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              >
                <div className={`font-display text-7xl md:text-9xl ${crashed ? "text-[#ff3d6e]" : "text-gradient"}`}>
                  {multi.toFixed(2)}×
                </div>
                {crashed && <div className="mt-2 text-[#ff3d6e] tracking-[0.4em] text-sm">CRASHED</div>}
                {cashedOut && !crashed && (
                  <div className="mt-2 text-neon-lime tracking-[0.3em] text-sm">CASHED @ {cashedOut.toFixed(2)}×</div>
                )}
              </motion.div>
            </div>

            {/* History strip */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {history.map((h, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-mono border ${
                    h >= 2 ? "border-neon-lime/40 text-neon-lime bg-neon-lime/10" : "border-[#ff3d6e]/40 text-[#ff7a96] bg-[#ff3d6e]/10"
                  }`}
                >
                  {h.toFixed(2)}×
                </span>
              ))}
            </div>
          </div>

          {/* Bet panel */}
          <div className="glass rounded-3xl p-6 space-y-5">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-white/55 mb-2">Your Bet</div>
              <div className="flex items-center justify-between glass-strong rounded-xl px-4 py-3">
                <span className="font-display text-2xl">◎ {bet.toFixed(2)}</span>
                <span className="text-xs text-white/55 font-mono">SOL</span>
              </div>
            </div>
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-white/55 mb-2">Potential Win</div>
              <div className="font-display text-3xl text-gradient">
                ◎ {(bet * multi).toFixed(3)}
              </div>
            </div>

            <button
              onClick={cashout}
              disabled={crashed || !!cashedOut}
              className={`w-full py-4 rounded-2xl font-display text-lg transition ${
                crashed || cashedOut
                  ? "bg-white/5 text-white/40"
                  : "bg-gradient-to-r from-neon-lime to-neon-cyan text-black shadow-glow hover:scale-[1.02]"
              }`}
            >
              {cashedOut ? `+ ${profit.toFixed(3)} SOL secured` : crashed ? "Round ended" : `Cash out @ ${multi.toFixed(2)}×`}
            </button>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { k: "Players", v: "1,284", icon: Trophy },
                { k: "Pot", v: "◎ 318", icon: TrendingUp },
                { k: "$TAK Burnt", v: "12.4k", icon: Zap },
              ].map((s) => (
                <div key={s.k} className="rounded-xl bg-white/[0.04] border border-white/10 px-2 py-3">
                  <s.icon size={14} className="mx-auto text-neon-pink mb-1" />
                  <div className="font-display text-sm text-white">{s.v}</div>
                  <div className="text-[10px] tracking-widest uppercase text-white/45">{s.k}</div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-white/40 leading-relaxed">
              Demo simulation only. Actual gameplay launches with provably-fair on-chain RNG and $TAK / SOL betting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
