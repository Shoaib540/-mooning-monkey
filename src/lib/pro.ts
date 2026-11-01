const DEFAULT_DEMO_CODES = ["SCALE-DEMO-2026"];

export function checkoutUrl(): string {
  return (
    import.meta.env.VITE_CHECKOUT_URL?.trim() ||
    "https://gumroad.com/l/scalegate-pro"
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
