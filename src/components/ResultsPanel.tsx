import { money } from "../lib/calc";
import type { OfferInputs, OfferResult } from "../lib/types";

type Props = {
  input: OfferInputs;
  result: OfferResult;
};

const tone = {
  scale: "text-go border-go/40 bg-go/10",
  caution: "text-warn border-warn/40 bg-warn/10",
  kill: "text-signal border-signal/40 bg-signal/10",
} as const;

export default function ResultsPanel({ input, result }: Props) {
  return (
    <div className="border border-white/10 bg-void-900/80 p-5 md:p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-mute">Result</p>
      <div className={`mt-4 inline-flex rounded-md border px-3 py-1.5 text-sm font-extrabold uppercase tracking-wide ${tone[result.verdict]}`}>
        {result.verdict}
      </div>
      <p className="mt-3 text-sm text-mist/85">{result.verdictText}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Metric label="Max affordable CPA" value={money(result.maxCpa, input.currency)} accent />
        <Metric
          label="Profit / order @ your CPA"
          value={money(result.expectedProfitAtCpa, input.currency)}
        />
        <Metric
          label="Margin if delivered"
          value={money(result.contributionDelivered, input.currency)}
        />
        <Metric
          label="Loss if RTO"
          value={money(result.expectedCostRto, input.currency)}
        />
        <Metric
          label="Break-even ROAS (placed)"
          value={result.breakEvenRoasPlaced ? `${result.breakEvenRoasPlaced.toFixed(2)}x` : "—"}
        />
        <Metric
          label="Break-even ROAS (delivered)"
          value={
            result.breakEvenRoasDelivered
              ? `${result.breakEvenRoasDelivered.toFixed(2)}x`
              : "—"
          }
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border border-white/10 bg-void-950/50 p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mute">{label}</p>
      <p className={`mt-1 font-mono text-lg font-semibold ${accent ? "text-go" : "text-mist"}`}>
        {value}
      </p>
    </div>
  );
}
