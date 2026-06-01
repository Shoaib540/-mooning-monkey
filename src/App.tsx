import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Lore from "./components/Lore";
import Evolution from "./components/Evolution";
import Token from "./components/Token";
import CrashGame from "./components/CrashGame";
import Collection from "./components/Collection";
import Roadmap from "./components/Roadmap";
import Comic from "./components/Comic";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-ink overflow-x-hidden">
      <SmoothScroll />
      <Starfield />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Lore />
        <Evolution />
        <Token />
        <CrashGame />
        <Collection />
        <Roadmap />
        <Comic />
      </main>
      <Footer />
    </div>
  );
}
