export default function ConceptSection() {
  return (
    <section id="concept" className="container mx-auto py-16 md:py-24">
      <div className="max-w-3xl space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Il concept</h2>
        <blockquote className="border-l-2 pl-4 text-muted-foreground">
          <p className="text-lg md:text-xl">
            “Sette donne. Sette canzoni. Sette ore della notte.” Ogni brano è un frammento di specchio e un’ora della notte; ogni ora è una donna diversa. Un’identità femminile in bilico tra disconnessione, intimità, rabbia e memoria.
          </p>
          <p className="mt-4 text-base">
            Si parte alle 22:00 con una ragazza che non ha mai visto le Torri Gemelle. Si chiude alle 4:00 con una donna che le ha viste, che ha vissuto prima che tutto crollasse. È una notte generazionale. Un ciclo emotivo. Un racconto in sette stanze.
          </p>
        </blockquote>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
            <ol className="relative z-10 flex flex-wrap gap-3 md:gap-4 items-center">
              {[
                "22:00",
                "23:00",
                "00:00",
                "01:00",
                "02:00",
                "03:00",
                "04:00",
              ].map((h) => (
                <li
                  key={h}
                  className="px-3 py-1.5 rounded-full border bg-card/60 backdrop-blur text-sm"
                  aria-label={`Ora ${h}`}
                >
                  {h}
                </li>
              ))}
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
