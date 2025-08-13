import NightClock from './NightClock';

export default function ConceptSection() {
  const scrollToTracks = (trackIndex: number) => {
    const tracksSection = document.getElementById('brani');
    if (tracksSection) {
      tracksSection.scrollIntoView({ behavior: 'smooth' });
      // Simula click sulla traccia specifica dopo lo scroll
      setTimeout(() => {
        try { 
          (window as any).playAlbumTrack?.(trackIndex); 
        } catch {}
        try { 
          window.dispatchEvent(new CustomEvent("play-track-index", { detail: { index: trackIndex } })); 
        } catch {}
      }, 500);
    }
  };

  return (
    <section id="concept" className="container mx-auto pt-6 md:pt-8 lg:pt-8 pb-10 md:pb-14 lg:pb-18">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="max-w-[760px] space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Il concept</h2>
          <blockquote className="border-l-2 border-border pl-4 text-foreground max-w-[720px] leading-[1.55] space-y-3">
            <p className="text-lg md:text-xl">
              "Sette donne. Sette canzoni. Sette ore della notte." Ogni brano è un frammento di specchio e un'ora della notte; ogni ora è una donna diversa. Un'identità femminile in bilico tra disconnessione, intimità, rabbia e memoria.
            </p>
            <p className="text-base">
              Si parte alle 22:00 con una ragazza che non ha mai visto le Torri Gemelle. Si chiude alle 4:00 con una donna che le ha viste, che ha vissuto prima che tutto crollasse. È una notte generazionale. Un ciclo emotivo. Un racconto in sette stanze.
            </p>
          </blockquote>
        </div>
        
        <div className="lg:pl-8">
          <NightClock onTimeClick={scrollToTracks} />
        </div>
      </div>
    </section>
  );
}