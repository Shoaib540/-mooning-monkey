/**
 * Pro unlock without a backend:
 * 1) Buyer pays via Lemon Squeezy / Gumroad checkout URL
 * 2) Delivery email / thank-you page shows the unlock code
 * 3) Code is checked against VITE_PRO_CODES (comma-separated)
 *
 * Set these in Netlify env (or .env.local for local):
 *   VITE_CHECKOUT_URL=https://...lemon.../buy/...
 *   VITE_PRO_CODES=NAYA-XXXX,NAYA-YYYY
 */

const DEFAULT_DEMO_CODES = ["NAYA-DEMO-2026"];

export function checkoutUrl(): string {
  return (
    import.meta.env.VITE_CHECKOUT_URL?.trim() ||
    "https://gumroad.com/l/nayabill-pro"
  );
}

export function validProCodes(): string[] {
  const fromEnv = (import.meta.env.VITE_PRO_CODES as string | undefined)
    ?.split(",")
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);
  return fromEnv?.length ? fromEnv : DEFAULT_DEMO_CODES;
}

export function verifyProCode(code: string): boolean {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return false;
  return validProCodes().includes(normalized);
}

export function isCheckoutConfigured(): boolean {
  return Boolean(import.meta.env.VITE_CHECKOUT_URL?.trim());
}
