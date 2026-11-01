import type { OfferInputs, OfferResult } from "./types";

/**
 * Expected economics per *placed* order (one ad conversion):
 * - Delivered (1-r): get sell price, pay cogs, pack, outbound courier, COD fee
 * - RTO (r): no revenue, pay pack + outbound + return courier (cogs assumed recovered)
 * - Ads: CPA paid either way
 */
export function computeOffer(input: OfferInputs): OfferResult {
  const r = clamp(input.rtoPercent, 0, 99.9) / 100;
  const delivered = 1 - r;
  const codFee = (input.sellPrice * Math.max(0, input.codFeePercent)) / 100;

  const contributionDelivered =
    input.sellPrice -
    input.cogs -
    input.packaging -
    input.courierOut -
    codFee;

  const expectedCostRto =
    input.packaging + input.courierOut + input.courierReturn;

  // Max CPA that keeps expected profit >= 0
  const maxCpa = delivered * contributionDelivered - r * expectedCostRto;

  const expectedProfitAtCpa =
    delivered * contributionDelivered - r * expectedCostRto - (input.adCpa || 0);

  const breakEvenRoasPlaced =
    maxCpa > 0 ? input.sellPrice / maxCpa : null;
  const breakEvenRoasDelivered =
    maxCpa > 0 ? (input.sellPrice * delivered) / maxCpa : null;

  let verdict: OfferResult["verdict"] = "caution";
  let verdictText = "Thin margin — fix RTO or CPA before scaling.";

  if (maxCpa <= 0) {
    verdict = "kill";
    verdictText =
      "Expected contribution is negative even at $0 ads. Kill or reprice — do not scale.";
  } else if (input.adCpa > 0 && input.adCpa > maxCpa * 1.05) {
    verdict = "kill";
    verdictText = `Current CPA is above max affordable CPA. You lose money on every order.`;
  } else if (input.adCpa > 0 && input.adCpa > maxCpa * 0.85) {
    verdict = "caution";
    verdictText = "CPA is close to the ceiling. Scale only after RTO drops.";
  } else if (input.adCpa > 0 && input.adCpa <= maxCpa * 0.85) {
    verdict = "scale";
    verdictText = "CPA is under the ceiling with buffer. Safe to test scale.";
  } else if (maxCpa > 0) {
    verdict = "scale";
    verdictText = "Positive unit economics before ads. Enter CPA to check your live campaigns.";
  }

  return {
    maxCpa,
    expectedProfitAtCpa,
    contributionDelivered,
    expectedCostRto,
    breakEvenRoasPlaced,
    breakEvenRoasDelivered,
    verdict,
    verdictText,
  };
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function money(amount: number, currency: OfferInputs["currency"]): string {
  try {
    return new Intl.NumberFormat(
      currency === "PKR" ? "en-PK" : currency === "INR" ? "en-IN" : "en-US",
      {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "PKR" || currency === "INR" ? 0 : 2,
      },
    ).format(amount || 0);
  } catch {
    return `${currency} ${(amount || 0).toFixed(2)}`;
  }
}
