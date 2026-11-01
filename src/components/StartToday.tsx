import { PACKAGES } from "../lib/types";

const STEPS = [
  {
    title: "Create Fiverr (30–40 min)",
    body: "New seller account → Payoneer later. Publish all 3 gig titles from the kit verbatim.",
  },
  {
    title: "Send 20 local WhatsApps (45 min)",
    body: "Salons, boutiques, tutors, clinics, Instagram sellers you already know. Scripts in kit/WHATSAPP_OUTREACH.md.",
  },
  {
    title: "Take JazzCash / EasyPaisa advance",
    body: "50% before work on local jobs. Fiverr holds USD for you automatically.",
  },
  {
    title: "Forward the brief to Cursor",
    body: "Paste client FAQ / products here. Delivery SOPs in kit/DELIVERY_SOP.md — I can produce the pack.",
  },
];

export default function StartToday() {
  return (
    <section id="today" className="border-t border-white/5 bg-ink-900 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Start today checklist
        </p>
        <p className="mt-3 max-w-2xl text-fog">
          Yeh “startup” pehle service machine hai. SaaS baad mein — pehle cash.
        </p>

        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {STEPS.map((step, idx) => (
            <li key={step.title} className="border border-white/10 bg-ink-950/60 p-5">
              <p className="font-mono text-xs font-bold text-blaze">
                STEP {String(idx + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-xl font-bold">{step.title}</p>
              <p className="mt-2 text-sm text-fog">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 border border-white/10 bg-ink-950/80 p-5 md:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fog">
            Paste-ready Fiverr titles
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {PACKAGES.map((pkg) => (
              <li key={pkg.id} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <p className="font-semibold text-sand">{pkg.fiverrTitle}</p>
                <p className="mt-1 text-fog">
                  Starting at ${pkg.priceUsd} · {pkg.eta}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-fog">
            Full gig descriptions + FAQs: <code className="text-blaze">kit/FIVERR.md</code>
          </p>
        </div>
      </div>
    </section>
  );
}
