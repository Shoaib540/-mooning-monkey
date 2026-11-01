import { whatsAppLink } from "../lib/contact";

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight md:text-2xl">
          Foran
        </a>
        <nav className="flex items-center gap-2 md:gap-3">
          <a href="#packages" className="hidden text-sm font-medium text-fog hover:text-sand sm:inline">
            Packages
          </a>
          <a href="#today" className="hidden text-sm font-medium text-fog hover:text-sand sm:inline">
            Start today
          </a>
          <a
            className="btn-primary !px-3 !py-2 text-xs md:text-sm"
            href={whatsAppLink("Assalam o Alaikum — I want a Foran package.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
