import heroImage from "@/assets/hero-donne-che-non-dormono.jpg";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

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
        className="relative container mx-auto grid gap-8 md:gap-12 lg:grid-cols-2 items-center py-12 md:py-20"
      >
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Donne che non dormono
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg md:text-xl">
            Un concept autoriale di JackPot (Giovanni Potenza). Sette donne. Sette canzoni. Sette ore della notte.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#ascolta">
              <Button variant="hero" size="lg">Ascolta l’album</Button>
            </a>
            <a href="https://on.soundcloud.com/EeW4KykuGF4zC6Y7no" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">Apri su SoundCloud</Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground/80 max-w-xl">
            Una notte generazionale. Un ciclo emotivo. Un racconto in sette stanze.
          </p>
        </div>

        <div className="relative h-[280px] md:h-[420px] lg:h-[520px] rounded-xl overflow-hidden border">
          <img
            src={heroImage}
            alt="Copertina concettuale notturna, tonalità viola e ciano per l’album Donne che non dormono"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(600px circle at var(--spot-x,50%) var(--spot-y,50%), hsl(var(--brand) / 0.25), transparent 55%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-background/10" />
          <div
            className="absolute inset-0"
            style={{
              ["--spot-x" as any]: `${spot.x}%`,
              ["--spot-y" as any]: `${spot.y}%`,
            } as React.CSSProperties}
          />
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
