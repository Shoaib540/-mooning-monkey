export type MarketPreset = "pk_cod" | "in_cod" | "prepaid";

export type OfferInputs = {
  id: string;
  name: string;
  currency: "PKR" | "USD" | "INR" | "GBP";
  sellPrice: number;
  cogs: number;
  packaging: number;
  courierOut: number;
  courierReturn: number;
  codFeePercent: number; // of sell price, on delivered only
  rtoPercent: number; // 0-100
  adCpa: number; // current CPA (optional, for verdict)
};

export type OfferResult = {
  maxCpa: number;
  expectedProfitAtCpa: number;
  contributionDelivered: number;
  expectedCostRto: number;
  breakEvenRoasPlaced: number | null;
  breakEvenRoasDelivered: number | null;
  verdict: "scale" | "caution" | "kill";
  verdictText: string;
};

export const FREE_OFFER_LIMIT = 1;
export const PRO_PRICE_USD = 27;
export const STORAGE_KEYS = {
  offers: "scalegate_offers_v1",
  usage: "scalegate_usage_v1",
  pro: "scalegate_pro_v1",
} as const;

export const PRESETS: Record<
  MarketPreset,
  Pick<
    OfferInputs,
    | "currency"
    | "packaging"
    | "courierOut"
    | "courierReturn"
    | "codFeePercent"
    | "rtoPercent"
  > & { label: string; blurb: string }
> = {
  pk_cod: {
    label: "Pakistan COD",
    blurb: "Jazz / PostEx / Leopards style cash-on-delivery",
    currency: "PKR",
    packaging: 40,
    courierOut: 180,
    courierReturn: 150,
    codFeePercent: 1.5,
    rtoPercent: 25,
  },
  in_cod: {
    label: "India COD",
    blurb: "Typical D2C cash-on-delivery assumptions",
    currency: "INR",
    packaging: 20,
    courierOut: 60,
    courierReturn: 50,
    codFeePercent: 2,
    rtoPercent: 20,
  },
  prepaid: {
    label: "Prepaid / Shopify",
    blurb: "Card or wallet paid — lower reverse logistics",
    currency: "USD",
    packaging: 1.5,
    courierOut: 4,
    courierReturn: 4,
    codFeePercent: 0,
    rtoPercent: 8,
  },
};
