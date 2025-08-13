const heroImage = "/lovable-uploads/a0043cdb-5907-4e05-9bfe-ce6521dfed4d.png";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { Play } from "lucide-react";

const NAV_LINKS = [
  { href: "#ascolta", label: "Ascolta" },
  { href: "#concept", label: "Concept" },
  { href: "#chi-sono", label: "Chi sono" },
];

export default function AlbumHero() {
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y });
  }, []);

  const playFirst = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault?.();
    console.log("[AlbumHero] CTA clicked: play-first-track");
    try { (window as any).playFirstAlbumTrack?.(); } catch {}
    try { requestAnimationFrame(() => (window as any).playFirstAlbumTrack?.()); } catch {}
    try { setTimeout(() => (window as any).playFirstAlbumTrack?.(), 150); } catch {}
    try { window.dispatchEvent(new CustomEvent("play-first-track")); } catch {}
    const target = document.getElementById("brani") || document.getElementById("ascolta");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <header className="relative overflow-hidden">
      <nav className="container mx-auto flex items-center justify-between py-6">
        <a href="#top" className="font-semibold tracking-wide">
          JackPot
        </a>
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:underline underline-offset-4">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        onMouseMove={onMove}
        className="relative container mx-auto grid gap-8 md:gap-12 lg:grid-cols-2 items-center pt-12 md:pt-20 pb-7 md:pb-10 lg:pb-12"
      >
        <div className="relative z-10">
          <h1 className="font-bold leading-tight text-[clamp(34px,6vw,56px)] mb-4">
            Donne che non dormono
          </h1>
          <p className="max-w-xl text-base md:text-lg mb-5 text-center lg:text-left">
            <span className="block">Sette donne.</span>
            <span className="block">Sette canzoni.</span>
            <span className="block">Sette ore della notte.</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="hero" size="lg" className="h-12 w-[200px] md:w-[220px]">
              <a href="#brani" onClick={playFirst}>Ascolta l'album</a>
            </Button>
            <Button asChild variant="hero" size="lg" className="h-12 w-[200px] md:w-[220px]">
              <a href="https://on.soundcloud.com/EeW4KykuGF4zC6Y7no" target="_blank" rel="noopener noreferrer">Apri su SoundCloud</a>
            </Button>
          </div>
          </div>

        <div className="relative group cursor-pointer" onClick={playFirst}>
          <img
            src={heroImage}
            alt="Copertina concettuale notturna, tonalità viola e ciano per l'album Donne che non dormono"
            loading="lazy"
            className="w-full h-auto transition-all duration-300 group-hover:brightness-75"
          />
          
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="rounded-full bg-background/60 ring-1 ring-foreground/20 p-3 backdrop-blur-sm">
              <Play className="h-6 w-6 text-foreground fill-current" />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
    </header>
  );
}