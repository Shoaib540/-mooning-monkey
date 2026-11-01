import { invoiceTotal, money } from "./format";
import type { Invoice } from "./types";

export function buildWhatsAppMessage(invoice: Invoice): string {
  const total = money(invoiceTotal(invoice), invoice.currency);
  const methods = invoice.methods
    .filter((m) => m.detail.trim())
    .map((m) => `• ${m.label}: ${m.detail}`)
    .join("\n");

  const lines = invoice.items
    .filter((i) => i.description.trim())
    .map(
      (i) =>
        `• ${i.description} × ${i.qty} — ${money(i.qty * i.rate, invoice.currency)}`,
    )
    .join("\n");

  return [
    `Assalam o Alaikum ${invoice.clientName || "there"},`,
    ``,
    `Invoice *${invoice.number}* from *${invoice.fromName || "me"}*.`,
    `Amount due: *${total}*`,
    `Due date: ${invoice.dueDate}`,
    ``,
    lines ? `Items:\n${lines}` : null,
    methods ? `\nPayment options:\n${methods}` : null,
    invoice.notes ? `\nNote: ${invoice.notes}` : null,
    ``,
    `Please confirm once paid. Shukriya!`,
    `— ${invoice.fromName || "NayaBill"}`,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

export function whatsAppShareUrl(invoice: Invoice): string {
  const text = encodeURIComponent(buildWhatsAppMessage(invoice));
  const phone = invoice.clientPhone.replace(/[^\d]/g, "");
  if (phone) return `https://wa.me/${phone}?text=${text}`;
  return `https://wa.me/?text=${text}`;
}
