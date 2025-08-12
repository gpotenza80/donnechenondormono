import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


const soundcloudAlbumUrl = "https://api.soundcloud.com/playlists/2050729731?secret_token=s-PWvlpNWPDGi";

const tracks = [
  {
    title: "DISCONNESSA",
    cover: "/lovable-uploads/5d957bbd-957a-414e-9bb0-a42e7c733d68.png",
    url: soundcloudAlbumUrl,
    caption:
      "23:00 - Disconnessa — Manifesto generazionale sull’identità digitale e il bisogno di realtà. Voce femminile intensa, atmosfera tra pop, elettronica e R&B.",
    embedSrc:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141000256%3Fsecret_token%3Ds-XlUmQMpn0e5&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "ADDÀ PASSÀ",
    cover: "/lovable-uploads/4d6c9b26-e1af-4cd8-83d1-67bdbfceffce.png",
    url: soundcloudAlbumUrl,
    caption:
      "00:00 - Addà passà — Canzone napoletana emotiva, profonda, autentica. Linguaggio teatrale, intensa, con grande apertura melodica.",
    embedSrc: undefined,
  },
  {
    title: "Bambenella",
    cover: "/lovable-uploads/809f9868-c327-48a9-97ae-507c4f940dd2.png",
    url: soundcloudAlbumUrl,
    caption:
      "01:00 - Bambenélla — Brano teatrale, provocatorio e contemporaneo. Racconta una figura femminile tra denuncia sociale, ironia e resistenza urbana. In napoletano.",
    embedSrc: undefined,
  },
  {
    title: "Ja, fa’ pace cu mmè",
    cover: "/lovable-uploads/30e107ef-4697-4428-a8ce-21bc12f9b9b5.png",
    url: soundcloudAlbumUrl,
    caption:
      "02:00 - Ja, Fa’ pace cu mmé — Dialogo intimo, tenero e poetico. Una canzone da camera, emotiva, con potenziale vocale per interpreti teatrali o cinematografici.",
    embedSrc: undefined,
  },
  {
    title: "Le mie catene",
    cover: "/lovable-uploads/e25ec76a-2ce7-4235-b6b9-bc1b0baff516.png",
    url: soundcloudAlbumUrl,
    caption:
      "03:00 - Le mie catene — Testo forte e viscerale. Esprime dolore, desiderio di libertà e ribellione esistenziale. Atmosfera poetica e drammatica.",
    embedSrc: undefined,
  },
  {
    title: "Pena - Español",
    cover: "/lovable-uploads/798ab651-37e4-42bf-a8f5-85c339d070de.png",
    url: soundcloudAlbumUrl,
    caption:
      "04:00 - Pena — Brano emotivo, notturno, intenso. Un crescendo di sofferenza e desiderio. Ottimo per interpreti d’impatto.",
    embedSrc: undefined,
  },
  {
    title: "Pena - Italiano",
    cover: "/lovable-uploads/798ab651-37e4-42bf-a8f5-85c339d070de.png",
    url: soundcloudAlbumUrl,
    caption:
      "04:00 - Pena — Brano emotivo, notturno, intenso. Un crescendo di sofferenza e desiderio. Ottimo per interpreti d’impatto.",
    embedSrc: undefined,
  },
  {
    title: "Londra 2000",
    cover: "/lovable-uploads/a987e938-ebfb-45fc-a615-15783e121b2f.png",
    url: soundcloudAlbumUrl,
    caption:
      "05:00 - Londra 2000 — Ballata poetica e malinconica. Uno sguardo sullo spirito dei vent’anni, tra ironia e disillusione. Delicata e riflessiva.",
    embedSrc: undefined,
  },
] as const;

export default function TrackGrid() {
  

  return (
    <section id="ascolta" className="container mx-auto py-16 md:py-24">
      <div className="grid gap-10">

        <div>
          <h3 className="text-xl font-semibold mb-4">Tracce</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((t, idx) => (
              <Card key={t.title} className="group">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={t.cover}
                      alt={`Copertina brano ${t.title} — Donne che non dormono`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="text-base">{String(idx + 1).padStart(2, "0")} — {t.title}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">{t.caption}</p>
                </CardContent>
                <CardFooter>
                  {t.embedSrc ? (
                    <iframe
                      title={`Player SoundCloud — ${t.title}`}
                      width="100%"
                      height="166"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      loading="lazy"
                      src={t.embedSrc}
                    />
                  ) : (
                    <div className="text-xs text-muted-foreground italic">Player in arrivo</div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
