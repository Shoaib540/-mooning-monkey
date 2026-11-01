export default function Footer() {
  return (
    <footer className="no-print border-t border-white/5 bg-navy-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-mute md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-display text-lg font-bold text-ink">
          Naya<span className="text-marigold">Bill</span>
        </p>
        <p>Invoices stay on your device. Built for freelancers who get paid on WhatsApp.</p>
      </div>
    </footer>
  );
}
