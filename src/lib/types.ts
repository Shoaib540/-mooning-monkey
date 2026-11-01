export type Currency = "PKR" | "USD" | "EUR" | "GBP";

export type PayMethod = {
  id: string;
  label: string;
  detail: string;
};

export type LineItem = {
  id: string;
  description: string;
  qty: number;
  rate: number;
};

export type Invoice = {
  id: string;
  number: string;
  createdAt: string;
  dueDate: string;
  currency: Currency;
  fromName: string;
  fromEmail: string;
  fromPhone: string;
  fromCity: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
  items: LineItem[];
  methods: PayMethod[];
};

export const FREE_INVOICE_LIMIT = 3;
export const PRO_PRICE_USD = 19;
export const STORAGE_KEYS = {
  profile: "nayabill_profile_v1",
  invoices: "nayabill_invoices_v1",
  usage: "nayabill_usage_v1",
  pro: "nayabill_pro_v1",
} as const;
