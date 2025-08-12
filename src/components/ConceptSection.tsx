export default function ConceptSection() {
  const hours = ["22:00","23:00","00:00","01:00","02:00","03:00","04:00"] as const;
  // Map hours to track indices in TrackGrid (skip 3:00 IT to hit ES; 04:00 -> Londra 2000)
  const hourToIndex = [0,1,2,3,4,5,7];
  return (
    <section id="concept" className="container mx-auto pt-6 md:pt-8 lg:pt-8 pb-10 md:pb-14 lg:pb-18">
      <div className="max-w-[760px] space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Il concept</h2>
        <blockquote className="border-l-2 border-border pl-4 text-foreground max-w-[720px] leading-[1.55] space-y-3">
          <p className="text-lg md:text-xl">
            “Sette donne. Sette canzoni. Sette ore della notte.” Ogni brano è un frammento di specchio e un’ora della notte; ogni ora è una donna diversa. Un’identità femminile in bilico tra disconnessione, intimità, rabbia e memoria.
          </p>
          <p className="text-base">
            Si parte alle 22:00 con una ragazza che non ha mai visto le Torri Gemelle. Si chiude alle 4:00 con una donna che le ha viste, che ha vissuto prima che tutto crollasse. È una notte generazionale. Un ciclo emotivo. Un racconto in sette stanze.
          </p>
        </blockquote>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
            <ol className="relative z-10 flex flex-wrap gap-2 items-center">
              {hours.map((h, i) => {
                const idx = hourToIndex[i];
                return (
                  <li key={h}>
                    <a
                      href={`#h${h.replace(':', '').slice(0, 2)}`}
                      className="chip text-[15px] px-3"
                      aria-label={`Vai al brano delle ${h}`}
                      onClick={() => {
                        try { (window as any).playAlbumTrack?.(idx); } catch {}
                        try { window.dispatchEvent(new CustomEvent("play-track-index", { detail: { index: idx } })); } catch {}
                      }}
                    >
                      {h}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Sette ore della notte come sette identità: un percorso emotivo continuo.
          </p>
        </div>
      </div>
    </section>
  );
}
