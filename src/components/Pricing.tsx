import { Check } from "lucide-react";
import { PRO_PRICE_USD } from "../lib/types";
import { checkoutUrl, isCheckoutConfigured } from "../lib/pro";

type Props = {
  isPro: boolean;
  onEnterCode: () => void;
};

const FEATURES = [
  "Unlimited invoices every month",
  "Remove NayaBill watermark",
  "Your name as the invoice brand",
  "Lifetime access — one payment",
  "Works offline after first load",
];

export default function Pricing({ isPro, onEnterCode }: Props) {
  return (
    <section id="pricing" className="relative border-t border-white/5 bg-navy-900 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            One price. Lifetime Pro.
          </p>
          <p className="mt-3 text-mute">
            Free covers 3 invoices/month. Pro is for freelancers who bill every week —
            ${PRO_PRICE_USD} once, no subscription.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-stretch">
          <div className="border border-white/10 bg-navy-950/50 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-mute">Free</p>
            <p className="mt-3 font-display text-4xl font-extrabold">$0</p>
            <ul className="mt-6 space-y-3 text-sm text-mute">
              <li className="flex gap-2"><Check size={16} className="mt-0.5 text-sea" /> 3 invoices / month</li>
              <li className="flex gap-2"><Check size={16} className="mt-0.5 text-sea" /> WhatsApp message + PDF</li>
              <li className="flex gap-2"><Check size={16} className="mt-0.5 text-sea" /> JazzCash / Easypaisa / Payoneer fields</li>
            </ul>
            <a href="#builder" className="btn-ghost mt-8 w-full">
              Start free
            </a>
          </div>

          <div className="relative border border-marigold/40 bg-gradient-to-br from-marigold/15 via-navy-950 to-navy-950 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-marigold">Pro lifetime</p>
            <p className="mt-3 font-display text-5xl font-extrabold text-ink">
              ${PRO_PRICE_USD}
              <span className="ml-2 text-base font-semibold text-mute">one-time</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink/90">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-marigold" />
                  {f}
                </li>
              ))}
            </ul>

            {isPro ? (
              <p className="mt-8 rounded-md border border-sea/40 bg-sea/10 px-4 py-3 text-sm font-semibold text-sea">
                Pro is active on this browser.
              </p>
            ) : (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={checkoutUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1"
                >
                  Buy Pro — ${PRO_PRICE_USD}
                </a>
                <button type="button" className="btn-ghost flex-1" onClick={onEnterCode}>
                  Enter unlock code
                </button>
              </div>
            )}

            {!isCheckoutConfigured() && !isPro && (
              <p className="mt-4 text-xs text-mute">
                Checkout link placeholder — owner must set{" "}
                <code className="text-marigold">VITE_CHECKOUT_URL</code> after creating a Gumroad / Lemon Squeezy product.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
