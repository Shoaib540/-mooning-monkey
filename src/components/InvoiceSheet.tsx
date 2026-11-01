import { invoiceTotal, lineTotal, money } from "../lib/format";
import type { Invoice } from "../lib/types";

type Props = {
  invoice: Invoice;
  isPro: boolean;
};

export default function InvoiceSheet({ invoice, isPro }: Props) {
  const total = invoiceTotal(invoice);
  const methods = invoice.methods.filter((m) => m.detail.trim());

  return (
    <div
      id="invoice-print-root"
      className="overflow-hidden rounded-sm bg-paper text-navy-950 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-start justify-between gap-4 border-b border-navy-950/10 px-5 py-5 md:px-7">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-tight">
            {isPro ? invoice.fromName || "Invoice" : "NayaBill"}
          </p>
          <p className="mt-1 font-mono text-xs text-navy-800/55">
            {invoice.number}
          </p>
        </div>
        <div className="text-right text-xs text-navy-800/60">
          <p>Issued {invoice.createdAt}</p>
          <p className="font-semibold text-navy-950">Due {invoice.dueDate}</p>
        </div>
      </div>

      <div className="grid gap-6 px-5 py-6 md:grid-cols-2 md:px-7">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy-800/45">
            From
          </p>
          <p className="mt-1 font-semibold">{invoice.fromName || "Your name"}</p>
          {invoice.fromCity && <p className="text-sm text-navy-800/65">{invoice.fromCity}</p>}
          {invoice.fromEmail && <p className="text-sm text-navy-800/65">{invoice.fromEmail}</p>}
          {invoice.fromPhone && <p className="text-sm text-navy-800/65">{invoice.fromPhone}</p>}
        </div>
        <div className="md:text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy-800/45">
            Bill to
          </p>
          <p className="mt-1 font-semibold">{invoice.clientName || "Client name"}</p>
          {invoice.clientEmail && (
            <p className="text-sm text-navy-800/65">{invoice.clientEmail}</p>
          )}
          {invoice.clientPhone && (
            <p className="text-sm text-navy-800/65">{invoice.clientPhone}</p>
          )}
        </div>
      </div>

      <div className="px-5 md:px-7">
        <div className="border-t border-navy-950/10">
          <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-navy-950/10 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-navy-800/45">
            <span>Item</span>
            <span className="text-right">Qty</span>
            <span className="min-w-[7rem] text-right">Amount</span>
          </div>
          {invoice.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-dashed border-navy-950/10 py-3 text-sm"
            >
              <span>{item.description || "Service"}</span>
              <span className="text-right font-mono text-navy-800/70">{item.qty}</span>
              <span className="min-w-[7rem] text-right font-mono font-semibold">
                {money(lineTotal(item), invoice.currency)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end py-5">
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy-800/45">
              Total due
            </p>
            <p className="font-display text-3xl font-extrabold">
              {money(total, invoice.currency)}
            </p>
          </div>
        </div>

        {methods.length > 0 && (
          <div className="mb-6 rounded-md bg-navy-950/[0.04] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy-800/45">
              Payment options
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {methods.map((m) => (
                <li key={m.id}>
                  <span className="font-semibold">{m.label}:</span> {m.detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {invoice.notes && (
          <p className="mb-6 text-sm text-navy-800/70">
            <span className="font-semibold text-navy-950">Note:</span> {invoice.notes}
          </p>
        )}

        {!isPro && (
          <p className="no-print mb-5 text-center text-[11px] text-navy-800/40">
            Made with NayaBill — unlock Pro to remove this line
          </p>
        )}
      </div>
    </div>
  );
}
