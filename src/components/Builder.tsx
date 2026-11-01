import { useEffect, useMemo, useState } from "react";
import {
  Copy,
  MessageCircle,
  Plus,
  Printer,
  Save,
  Trash2,
} from "lucide-react";
import InvoiceSheet from "./InvoiceSheet";
import {
  nextInvoiceNumber,
  plusDaysISO,
  todayISO,
} from "../lib/format";
import {
  bumpUsage,
  loadProfile,
  loadUsage,
  saveInvoice,
  saveProfile,
} from "../lib/storage";
import { buildWhatsAppMessage, whatsAppShareUrl } from "../lib/whatsapp";
import {
  FREE_INVOICE_LIMIT,
  type Currency,
  type Invoice,
  type LineItem,
  type PayMethod,
} from "../lib/types";

type Props = {
  isPro: boolean;
  onNeedPro: () => void;
};

const DEFAULT_METHODS: PayMethod[] = [
  { id: "jazz", label: "JazzCash", detail: "" },
  { id: "easy", label: "Easypaisa", detail: "" },
  { id: "bank", label: "Bank transfer", detail: "" },
  { id: "payoneer", label: "Payoneer", detail: "" },
];

function newItem(): LineItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    qty: 1,
    rate: 0,
  };
}

function blankInvoice(seed?: ReturnType<typeof loadProfile>): Invoice {
  return {
    id: crypto.randomUUID(),
    number: nextInvoiceNumber(),
    createdAt: todayISO(),
    dueDate: plusDaysISO(7),
    currency: "PKR",
    fromName: seed?.fromName ?? "",
    fromEmail: seed?.fromEmail ?? "",
    fromPhone: seed?.fromPhone ?? "",
    fromCity: seed?.fromCity ?? "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "Please share payment screenshot after transfer.",
    items: [newItem()],
    methods: seed?.methods?.length
      ? seed.methods.map((m) => ({ ...m }))
      : DEFAULT_METHODS.map((m) => ({ ...m })),
  };
}

export default function Builder({ isPro, onNeedPro }: Props) {
  const [invoice, setInvoice] = useState<Invoice>(() => blankInvoice(loadProfile()));
  const [usage, setUsage] = useState(() => loadUsage());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const remaining = Math.max(0, FREE_INVOICE_LIMIT - usage.count);
  const blocked = !isPro && usage.count >= FREE_INVOICE_LIMIT;

  const canSend = useMemo(
    () => Boolean(invoice.fromName.trim() && invoice.items.some((i) => i.description.trim())),
    [invoice],
  );

  const update = <K extends keyof Invoice>(key: K, value: Invoice[K]) => {
    setInvoice((prev) => ({ ...prev, [key]: value }));
  };

  const updateItem = (id: string, patch: Partial<LineItem>) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  };

  const updateMethod = (id: string, detail: string) => {
    setInvoice((prev) => ({
      ...prev,
      methods: prev.methods.map((m) => (m.id === id ? { ...m, detail } : m)),
    }));
  };

  const persistProfile = () => {
    saveProfile({
      fromName: invoice.fromName,
      fromEmail: invoice.fromEmail,
      fromPhone: invoice.fromPhone,
      fromCity: invoice.fromCity,
      methods: invoice.methods,
    });
  };

  const gateOrRun = (fn: () => void) => {
    if (blocked) {
      onNeedPro();
      return;
    }
    fn();
  };

  const handleSave = () => {
    gateOrRun(() => {
      persistProfile();
      saveInvoice(invoice);
      setUsage(bumpUsage());
      setToast("Invoice saved on this device");
    });
  };

  const handleCopy = async () => {
    gateOrRun(async () => {
      persistProfile();
      await navigator.clipboard.writeText(buildWhatsAppMessage(invoice));
      setUsage(bumpUsage());
      setToast("WhatsApp message copied");
    });
  };

  const handleWhatsApp = () => {
    gateOrRun(() => {
      persistProfile();
      setUsage(bumpUsage());
      window.open(whatsAppShareUrl(invoice), "_blank", "noopener,noreferrer");
    });
  };

  const handlePrint = () => {
    gateOrRun(() => {
      persistProfile();
      setUsage(bumpUsage());
      window.print();
    });
  };

  return (
    <section id="builder" className="relative border-t border-white/5 bg-navy-950 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Create invoice
            </p>
            <p className="mt-2 max-w-xl text-mute">
              Fill once, send forever. Your details stay on this device — nothing is uploaded.
            </p>
          </div>
          <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-mute">
            {isPro ? (
              <span className="text-sea">Pro · unlimited invoices</span>
            ) : (
              <>
                Free this month:{" "}
                <span className={remaining === 0 ? "text-marigold" : "text-ink"}>
                  {remaining}/{FREE_INVOICE_LIMIT}
                </span>
              </>
            )}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <fieldset className="space-y-3">
              <legend className="font-display text-lg font-bold">You</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="fromName">Name</label>
                  <input id="fromName" className="field" value={invoice.fromName} onChange={(e) => update("fromName", e.target.value)} placeholder="Shoaib Ahmad" />
                </div>
                <div>
                  <label className="label" htmlFor="fromCity">City</label>
                  <input id="fromCity" className="field" value={invoice.fromCity} onChange={(e) => update("fromCity", e.target.value)} placeholder="Karachi" />
                </div>
                <div>
                  <label className="label" htmlFor="fromEmail">Email</label>
                  <input id="fromEmail" type="email" className="field" value={invoice.fromEmail} onChange={(e) => update("fromEmail", e.target.value)} placeholder="you@email.com" />
                </div>
                <div>
                  <label className="label" htmlFor="fromPhone">WhatsApp / phone</label>
                  <input id="fromPhone" className="field" value={invoice.fromPhone} onChange={(e) => update("fromPhone", e.target.value)} placeholder="+92 300 0000000" />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="font-display text-lg font-bold">Client</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="clientName">Name</label>
                  <input id="clientName" className="field" value={invoice.clientName} onChange={(e) => update("clientName", e.target.value)} placeholder="Client / company" />
                </div>
                <div>
                  <label className="label" htmlFor="clientPhone">WhatsApp number</label>
                  <input id="clientPhone" className="field" value={invoice.clientPhone} onChange={(e) => update("clientPhone", e.target.value)} placeholder="923001234567" />
                </div>
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="clientEmail">Email</label>
                  <input id="clientEmail" type="email" className="field" value={invoice.clientEmail} onChange={(e) => update("clientEmail", e.target.value)} placeholder="client@company.com" />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <legend className="font-display text-lg font-bold">Line items</legend>
                <div className="flex items-center gap-2">
                  <label className="label !mb-0" htmlFor="currency">Currency</label>
                  <select
                    id="currency"
                    className="field !w-auto"
                    value={invoice.currency}
                    onChange={(e) => update("currency", e.target.value as Currency)}
                  >
                    <option value="PKR">PKR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {invoice.items.map((item) => (
                  <div key={item.id} className="grid gap-2 sm:grid-cols-[1fr_4.5rem_7rem_auto]">
                    <input
                      className="field"
                      placeholder="What did you deliver?"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    />
                    <input
                      className="field"
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, { qty: Number(e.target.value) })}
                      aria-label="Quantity"
                    />
                    <input
                      className="field"
                      type="number"
                      min={0}
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) })}
                      aria-label="Rate"
                      placeholder="Rate"
                    />
                    <button
                      type="button"
                      className="btn-ghost !px-3"
                      onClick={() =>
                        setInvoice((prev) => ({
                          ...prev,
                          items: prev.items.length === 1 ? prev.items : prev.items.filter((i) => i.id !== item.id),
                        }))
                      }
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setInvoice((prev) => ({ ...prev, items: [...prev.items, newItem()] }))}
              >
                <Plus size={16} /> Add item
              </button>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="font-display text-lg font-bold">Payment methods</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {invoice.methods.map((m) => (
                  <div key={m.id}>
                    <label className="label" htmlFor={`pay-${m.id}`}>{m.label}</label>
                    <input
                      id={`pay-${m.id}`}
                      className="field"
                      value={m.detail}
                      onChange={(e) => updateMethod(m.id, e.target.value)}
                      placeholder={
                        m.id === "bank"
                          ? "HBL · PK00… · Shoaib Ahmad"
                          : m.id === "payoneer"
                            ? "you@email.com"
                            : "03XX-XXXXXXX"
                      }
                    />
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="dueDate">Due date</label>
                <input id="dueDate" type="date" className="field" value={invoice.dueDate} onChange={(e) => update("dueDate", e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="notes">Note</label>
                <input id="notes" className="field" value={invoice.notes} onChange={(e) => update("notes", e.target.value)} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary" disabled={!canSend} onClick={handleWhatsApp}>
                <MessageCircle size={16} /> Send on WhatsApp
              </button>
              <button type="button" className="btn-ghost" disabled={!canSend} onClick={handleCopy}>
                <Copy size={16} /> Copy message
              </button>
              <button type="button" className="btn-ghost" disabled={!canSend} onClick={handlePrint}>
                <Printer size={16} /> PDF / print
              </button>
              <button type="button" className="btn-ghost" disabled={!canSend} onClick={handleSave}>
                <Save size={16} /> Save
              </button>
            </div>

            {blocked && (
              <p className="text-sm text-marigold">
                Free limit reached for this month. Unlock Pro for unlimited invoices.
              </p>
            )}
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <InvoiceSheet invoice={invoice} isPro={isPro} />
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-navy-950 shadow-lg">
          {toast}
        </div>
      )}
    </section>
  );
}
