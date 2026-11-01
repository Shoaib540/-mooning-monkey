import { useState } from "react";
import Builder from "./components/Builder";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Pricing from "./components/Pricing";
import ProModal from "./components/ProModal";
import { isProUnlocked } from "./lib/storage";

function shouldOpenProFromUrl(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("unlock") === "1" || params.get("pro") === "1";
}

export default function App() {
  const [isPro, setIsPro] = useState(() =>
    typeof window !== "undefined" ? isProUnlocked() : false,
  );
  const [proOpen, setProOpen] = useState(() => shouldOpenProFromUrl());

  return (
    <div className="min-h-screen bg-navy-950 text-ink">
      <Nav isPro={isPro} onUnlock={() => setProOpen(true)} />
      <main>
        <Hero />
        <Builder isPro={isPro} onNeedPro={() => setProOpen(true)} />
        <Pricing isPro={isPro} onEnterCode={() => setProOpen(true)} />
      </main>
      <Footer />
      <ProModal
        open={proOpen}
        onClose={() => setProOpen(false)}
        onUnlocked={() => setIsPro(true)}
      />
    </div>
  );
}
