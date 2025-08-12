export default function ConceptSection() {
  return (
    <section id="concept" className="container mx-auto pt-2 md:pt-3 lg:pt-4 pb-10 md:pb-14 lg:pb-18">
      <div className="max-w-[760px] space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Il concept</h2>
        <blockquote className="border-l-2 pl-4 text-muted-foreground">
          <p className="text-lg md:text-xl">
            “Sette donne. Sette canzoni. Sette ore della notte.” Ogni brano è un frammento di specchio e un’ora della notte; ogni ora è una donna diversa. Un’identità femminile in bilico tra disconnessione, intimità, rabbia e memoria.
          </p>
          <p className="mt-3 text-base">
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
                <a
                  href="#brani"
                  className="chip"
                  aria-label={`Vai ai brani (ora ${h})`}
                >
                  {h}
                </a>
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
