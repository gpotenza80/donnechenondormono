export interface LyricsData {
  title: string;
  lyrics: string;
}

export const lyricsData: Record<string, LyricsData> = {
  "disconnessa": {
    title: "Disconnessa",
    lyrics: `Non ho visto mai le torri gemelle
solo un crollo su WhatsApp, tra le stelle
non ho detto mai quello che vorrei
ghosto me stessa, come fanno i miei

Fisso il soffitto con l'ansia in tasca
sono un glitch dispersa in una traccia
scrivo in DM, ti taggo e poi sparisco
la notifica è l'unico mio brivido

Sono viva quando mi laggo
Sono reale quando crasho
niente rivoluzione
salto l'aggiornamento
e brucio il manifesto

i meme sono la mia avanguardia
il mio futuro, una messinscena amara
tra un reel che scorre a vuoto
e una chiamata fantasma

Ma io sono un essere umano
niente di umano è a me alieno
oggi l'umano è per me l'alieno
tra like e bio perfette
e il post delle sette

Tu che mi chiedi se, se sto bene
con le emoji come fossero sirene
tu guardi il TG, io l'algoritmo
tu cerchi il senso — io cerco il ritmo

Sono viva quando mi laggo
Sono reale quando crasho
niente rivoluzione
salto l'aggiornamento
e brucio il manifesto

i meme sono la mia trincea 
il mio futuro, un filtro che si spegne
tra un reel che scorre a vuoto
e una chiamata fantasma

non urlo in piazza, non firmo petizioni
la mia rivolta è saltare le versioni
ci hanno dato troppe scelte
La mia è: restare disconnessa`
  }
  // Altri testi verranno aggiunti qui
};

// Funzione helper per ottenere la chiave normalizzata del titolo
export function getLyricsKey(title: string): string {
  return title
    .toLowerCase()
    .replace(/[àáâäã]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[,'']/g, '')
    .replace(/[\s-]/g, '')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c');
}

// Funzione per ottenere i testi di una traccia
export function getTrackLyrics(title: string): LyricsData | null {
  const key = getLyricsKey(title);
  return lyricsData[key] || null;
}