import { Check } from "lucide-react";
import { whatsAppLink } from "../lib/contact";
import { PACKAGES } from "../lib/types";

export default function Packages() {
  return (
    <section id="packages" className="border-t border-white/5 bg-ink-950 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Three packages. One sale can hit the daily target.
        </p>
        <p className="mt-3 max-w-2xl text-fog">
          Listing Pack ≈ half day. Reply System ≈ full day+. AI Inbox ≈ 3–4 days of target in one
          invoice.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <article
              key={pkg.id}
              className={`flex flex-col border p-6 ${
                i === 1 ? "border-blaze/50 bg-blaze/5" : "border-white/10 bg-ink-900/40"
              }`}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fog">
                {pkg.eta}
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold">{pkg.name}</h2>
              <p className="mt-3 text-sm text-fog">{pkg.pitch}</p>
              <p className="mt-5 font-display text-3xl font-extrabold text-sand">
                Rs {pkg.pricePkr.toLocaleString()}
                <span className="ml-2 text-sm font-semibold text-fog">${pkg.priceUsd}</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-sand/90">
                {pkg.includes.map((line) => (
                  <li key={line} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-leaf" />
                    {line}
                  </li>
                ))}
              </ul>
              <a
                className="btn-primary mt-6 w-full"
                href={whatsAppLink(
                  `Assalam o Alaikum — I want Foran “${pkg.name}” (Rs ${pkg.pricePkr.toLocaleString()}).`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order {pkg.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
