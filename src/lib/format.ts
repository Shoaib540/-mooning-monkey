import type { Currency, Invoice, LineItem } from "./types";

const localeFor: Record<Currency, string> = {
  PKR: "en-PK",
  USD: "en-US",
  EUR: "en-IE",
  GBP: "en-GB",
};

export function money(amount: number, currency: Currency): string {
  try {
    return new Intl.NumberFormat(localeFor[currency], {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "PKR" ? 0 : 2,
    }).format(amount || 0);
  } catch {
    return `${currency} ${(amount || 0).toFixed(2)}`;
  }
}

export function lineTotal(item: LineItem): number {
  return (Number(item.qty) || 0) * (Number(item.rate) || 0);
}

export function invoiceTotal(invoice: Invoice): number {
  return invoice.items.reduce((sum, item) => sum + lineTotal(item), 0);
}

export function nextInvoiceNumber(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(100 + Math.random() * 900);
  return `NB-${stamp}-${rand}`;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function plusDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
