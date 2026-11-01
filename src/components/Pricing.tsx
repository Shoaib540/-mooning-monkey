import { Check } from "lucide-react";
import { checkoutUrl, isCheckoutConfigured } from "../lib/pro";
import { PRO_PRICE_USD } from "../lib/types";

type Props = {
  isPro: boolean;
  onEnterCode: () => void;
};

const FEATURES = [
  "Unlimited saved offers & comparisons",
  "Pakistan / India COD + prepaid presets",
  "Export-ready numbers for ad decisions",
  "Lifetime access — one payment",
];

export default function Pricing({ isPro, onEnterCode }: Props) {
  return (
    <section id="pricing" className="border-t border-white/5 bg-void-900 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            For sellers who already spend on ads
          </p>
          <p className="mt-3 text-mute">
            Free calculator is unlimited to use. Pro unlocks saving many offers — for media buyers
            and COD operators juggling SKUs. Not built for broke freelancers.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="border border-white/10 bg-void-950/50 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-mute">Free</p>
            <p className="mt-3 font-display text-4xl font-extrabold text-mist">$0</p>
            <ul className="mt-6 space-y-3 text-sm text-mute">
              <li className="flex gap-2"><Check size={16} className="mt-0.5 text-go" /> Full break-even math</li>
              <li className="flex gap-2"><Check size={16} className="mt-0.5 text-go" /> PK / IN / prepaid presets</li>
              <li className="flex gap-2"><Check size={16} className="mt-0.5 text-go" /> 1 saved offer</li>
            </ul>
            <a href="#calc" className="btn-ghost mt-8 w-full">Open calculator</a>
          </div>

          <div className="border border-go/35 bg-gradient-to-br from-go/10 via-void-950 to-void-950 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-go">Pro lifetime</p>
            <p className="mt-3 font-display text-5xl font-extrabold text-mist">
              ${PRO_PRICE_USD}
              <span className="ml-2 text-base font-semibold text-mute">one-time</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-mist/90">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-go" />
                  {f}
                </li>
              ))}
            </ul>
            {isPro ? (
              <p className="mt-8 rounded-md border border-go/40 bg-go/10 px-4 py-3 text-sm font-semibold text-go">
                Pro active on this browser.
              </p>
            ) : (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={checkoutUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
                  Buy Pro — ${PRO_PRICE_USD}
                </a>
                <button type="button" className="btn-ghost flex-1" onClick={onEnterCode}>
                  Enter unlock code
                </button>
              </div>
            )}
            {!isCheckoutConfigured() && !isPro && (
              <p className="mt-4 text-xs text-mute">
                Set <code className="text-go">VITE_CHECKOUT_URL</code> after creating Gumroad / Lemon product.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
