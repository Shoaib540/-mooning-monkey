import { STORAGE_KEYS, type OfferInputs } from "./types";

export type Usage = { month: string; count: number };

function monthKey(): string {
  return new Date().toISOString().slice(0, 7);
}

export function loadOffers(): OfferInputs[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.offers);
    return raw ? (JSON.parse(raw) as OfferInputs[]) : [];
  } catch {
    return [];
  }
}

export function saveOffers(offers: OfferInputs[]): void {
  localStorage.setItem(STORAGE_KEYS.offers, JSON.stringify(offers.slice(0, 40)));
}

export function loadUsage(): Usage {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.usage);
    const parsed = raw ? (JSON.parse(raw) as Usage) : null;
    if (parsed && parsed.month === monthKey()) return parsed;
  } catch {
    /* ignore */
  }
  return { month: monthKey(), count: 0 };
}

export function bumpUsage(): Usage {
  const next = { month: monthKey(), count: loadUsage().count + 1 };
  localStorage.setItem(STORAGE_KEYS.usage, JSON.stringify(next));
  return next;
}

export function isProUnlocked(): boolean {
  return localStorage.getItem(STORAGE_KEYS.pro) === "1";
}

export function unlockPro(): void {
  localStorage.setItem(STORAGE_KEYS.pro, "1");
}
