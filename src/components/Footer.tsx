import { hasWhatsAppConfigured } from "../lib/contact";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-fog md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-display text-lg font-bold text-sand">Foran</p>
        <p>
          {hasWhatsAppConfigured()
            ? "Orders route to your WhatsApp number."
            : "Set VITE_WHATSAPP=92XXXXXXXXXX on Netlify so Order buttons hit your number."}
        </p>
      </div>
    </footer>
  );
}
