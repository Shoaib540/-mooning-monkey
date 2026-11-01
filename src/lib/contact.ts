/** Set in Netlify: VITE_WHATSAPP=923001234567 (digits only, country code, no +) */
export function whatsAppNumber(): string {
  const raw = (import.meta.env.VITE_WHATSAPP as string | undefined)?.replace(/\D/g, "");
  return raw && raw.length >= 10 ? raw : "";
}

export function whatsAppLink(text: string): string {
  const n = whatsAppNumber();
  const q = encodeURIComponent(text);
  if (!n) return `https://wa.me/?text=${q}`;
  return `https://wa.me/${n}?text=${q}`;
}

export function hasWhatsAppConfigured(): boolean {
  return Boolean(whatsAppNumber());
}
