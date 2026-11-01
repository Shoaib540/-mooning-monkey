import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { computeOffer } from "../lib/calc";
import { bumpUsage, loadOffers, loadUsage, saveOffers } from "../lib/storage";
import {
  FREE_OFFER_LIMIT,
  PRESETS,
  type MarketPreset,
  type OfferInputs,
} from "../lib/types";
import ResultsPanel from "./ResultsPanel";

type Props = {
  isPro: boolean;
  onNeedPro: () => void;
};

function blankOffer(preset: MarketPreset = "pk_cod"): OfferInputs {
  const p = PRESETS[preset];
  return {
    id: crypto.randomUUID(),
    name: "Offer A",
    currency: p.currency,
    sellPrice: preset === "prepaid" ? 49 : preset === "in_cod" ? 999 : 2499,
    cogs: preset === "prepaid" ? 14 : preset === "in_cod" ? 350 : 900,
    packaging: p.packaging,
    courierOut: p.courierOut,
    courierReturn: p.courierReturn,
    codFeePercent: p.codFeePercent,
    rtoPercent: p.rtoPercent,
    adCpa: preset === "prepaid" ? 18 : preset === "in_cod" ? 220 : 900,
  };
}

export default function Calculator({ isPro, onNeedPro }: Props) {
  const [preset, setPreset] = useState<MarketPreset>("pk_cod");
  const [offer, setOffer] = useState<OfferInputs>(() => blankOffer("pk_cod"));
  const [saved, setSaved] = useState<OfferInputs[]>(() =>
    typeof window !== "undefined" ? loadOffers() : [],
  );
  const [usage, setUsage] = useState(() =>
    typeof window !== "undefined" ? loadUsage() : { month: "", count: 0 },
  );

  const result = useMemo(() => computeOffer(offer), [offer]);
  const remaining = Math.max(0, FREE_OFFER_LIMIT - usage.count);
  const blocked = !isPro && usage.count >= FREE_OFFER_LIMIT;

  const setField = <K extends keyof OfferInputs>(key: K, value: OfferInputs[K]) => {
    setOffer((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (key: MarketPreset) => {
    setPreset(key);
    setOffer((prev) => {
      const next = blankOffer(key);
      return { ...next, id: prev.id, name: prev.name, adCpa: next.adCpa };
    });
  };

  const handleSave = () => {
    if (blocked) {
      onNeedPro();
      return;
    }
    const next = [offer, ...saved.filter((o) => o.id !== offer.id)].slice(0, 40);
    saveOffers(next);
    setSaved(next);
    setUsage(bumpUsage());
  };

  const handleNew = () => {
    if (!isPro) {
      onNeedPro();
      return;
    }
    setOffer(blankOffer(preset));
  };

  return (
    <section id="calc" className="border-t border-white/5 bg-void-950 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Unit economics gate
            </p>
            <p className="mt-2 max-w-xl text-mute">
              Built for sellers who run ads — not freelancers. Pakistan COD preset included;
              same math works for India COD and prepaid stores.
            </p>
          </div>
          <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-mute">
            {isPro ? (
              <span className="text-go">Pro · unlimited saved offers</span>
            ) : (
              <>
                Free saves left:{" "}
                <span className={remaining === 0 ? "text-signal" : "text-mist"}>
                  {remaining}/{FREE_OFFER_LIMIT}
                </span>
              </>
            )}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {(Object.keys(PRESETS) as MarketPreset[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => applyPreset(key)}
              className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wide transition ${
                preset === key
                  ? "border-go/50 bg-go/10 text-go"
                  : "border-white/10 text-mute hover:text-mist"
              }`}
            >
              {PRESETS[key].label}
            </button>
          ))}
        </div>
        <p className="mb-8 text-sm text-mute">{PRESETS[preset].blurb}</p>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label" htmlFor="name">Offer name</label>
                <input id="name" className="field" value={offer.name} onChange={(e) => setField("name", e.target.value)} />
              </div>
              <Num id="sell" label="Sell price" value={offer.sellPrice} onChange={(v) => setField("sellPrice", v)} />
              <Num id="cogs" label="Product cost (COGS)" value={offer.cogs} onChange={(v) => setField("cogs", v)} />
              <Num id="pack" label="Packaging" value={offer.packaging} onChange={(v) => setField("packaging", v)} />
              <Num id="out" label="Courier outbound" value={offer.courierOut} onChange={(v) => setField("courierOut", v)} />
              <Num id="ret" label="Courier return (RTO)" value={offer.courierReturn} onChange={(v) => setField("courierReturn", v)} />
              <Num id="cod" label="COD fee %" value={offer.codFeePercent} onChange={(v) => setField("codFeePercent", v)} step={0.1} />
              <Num id="rto" label="Expected RTO %" value={offer.rtoPercent} onChange={(v) => setField("rtoPercent", v)} step={0.5} />
              <Num id="cpa" label="Your current ad CPA" value={offer.adCpa} onChange={(v) => setField("adCpa", v)} />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button type="button" className="btn-primary" onClick={handleSave}>
                Save offer
              </button>
              <button type="button" className="btn-ghost" onClick={handleNew}>
                <Plus size={16} /> New offer
              </button>
            </div>

            {saved.length > 0 && (
              <div className="border border-white/10 bg-void-900/50 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-mute">Saved</p>
                <ul className="mt-3 space-y-2">
                  {saved.map((o) => (
                    <li key={o.id} className="flex items-center justify-between gap-3 text-sm">
                      <button
                        type="button"
                        className="text-left font-semibold text-mist hover:text-go"
                        onClick={() => setOffer(o)}
                      >
                        {o.name}
                      </button>
                      <button
                        type="button"
                        className="btn-ghost !px-2 !py-1"
                        aria-label="Delete offer"
                        onClick={() => {
                          const next = saved.filter((x) => x.id !== o.id);
                          saveOffers(next);
                          setSaved(next);
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ResultsPanel input={offer} result={result} />
        </div>
      </div>
    </section>
  );
}

function Num({
  id,
  label,
  value,
  onChange,
  step = 1,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <input
        id={id}
        className="field font-mono"
        type="number"
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
