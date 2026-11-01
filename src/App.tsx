import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Packages from "./components/Packages";
import StartToday from "./components/StartToday";

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950 text-sand">
      <Nav />
      <main>
        <Hero />
        <Packages />
        <StartToday />
      </main>
      <Footer />
    </div>
  );
}
