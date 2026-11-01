import { STORAGE_KEYS, type Invoice } from "./types";

export type Profile = {
  fromName: string;
  fromEmail: string;
  fromPhone: string;
  fromCity: string;
  methods: { id: string; label: string; detail: string }[];
};

export type Usage = {
  month: string; // YYYY-MM
  count: number;
};

function monthKey(): string {
  return new Date().toISOString().slice(0, 7);
}

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.profile);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile): void {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

export function loadInvoices(): Invoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.invoices);
    return raw ? (JSON.parse(raw) as Invoice[]) : [];
  } catch {
    return [];
  }
}

export function saveInvoice(invoice: Invoice): void {
  const all = loadInvoices().filter((i) => i.id !== invoice.id);
  all.unshift(invoice);
  localStorage.setItem(STORAGE_KEYS.invoices, JSON.stringify(all.slice(0, 50)));
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
  const current = loadUsage();
  const next = { month: monthKey(), count: current.count + 1 };
  localStorage.setItem(STORAGE_KEYS.usage, JSON.stringify(next));
  return next;
}

export function isProUnlocked(): boolean {
  return localStorage.getItem(STORAGE_KEYS.pro) === "1";
}

export function unlockPro(): void {
  localStorage.setItem(STORAGE_KEYS.pro, "1");
}

export function lockPro(): void {
  localStorage.removeItem(STORAGE_KEYS.pro);
}
