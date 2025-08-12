import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

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
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141001393%3Fsecret_token%3Ds-IfvSOmlv59I&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Bambenella",
    cover: "/lovable-uploads/809f9868-c327-48a9-97ae-507c4f940dd2.png",
    url: soundcloudAlbumUrl,
    caption:
      "01:00 - Bambenélla — Brano teatrale, provocatorio e contemporaneo. Racconta una figura femminile tra denuncia sociale, ironia e resistenza urbana. In napoletano.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141001681%3Fsecret_token%3Ds-oW1LaFMEcs7&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
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
  // SoundCloud Widget setup
  const [scReady, setScReady] = useState(false);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const widgetRefs = useRef<any[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    if ((window as any).SC?.Widget) {
      setScReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://w.soundcloud.com/player/api.js";
    s.async = true;
    s.onload = () => setScReady(true);
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    if (!scReady) return;
    widgetRefs.current = iframeRefs.current.map((iframe) =>
      iframe ? (window as any).SC?.Widget(iframe) : null
    );
  }, [scReady]);

  const handleCoverClick = (idx: number) => {
    const track = tracks[idx];
    if (!track.embedSrc || !scReady) return;

    // Pause all others
    widgetRefs.current.forEach((w, i) => {
      if (w && i !== idx) {
        try { w.pause(); } catch {}
      }
    });

    const target = widgetRefs.current[idx];
    if (!target) return;

    if (playingIndex === idx) {
      try {
        target.isPaused((paused: boolean) => {
          if (paused) { target.play(); } else { target.pause(); }
        });
      } catch {
        target.play();
      }
    } else {
      try { target.play(); } catch {}
      setPlayingIndex(idx);
    }
  };

  return (
    <section id="ascolta" className="container mx-auto py-16 md:py-24">
      <div className="grid gap-10">

        <div>
          <h3 className="text-xl font-semibold mb-4">Tracce</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((t, idx) => (
              <Card key={t.title} className="group">
                <CardHeader className="p-0">
                  <div
                    className="relative aspect-square overflow-hidden rounded-t-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    role="button"
                    tabIndex={0}
                    aria-label={`Ascolta ${t.title}`}
                    onClick={() => handleCoverClick(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCoverClick(idx);
                      }
                    }}
                  >
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
                  {t.embedSrc ? (
                    <iframe
                      title={`Player SoundCloud — ${t.title}`}
                      width="100%"
                      height="80"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      loading="lazy"
                      src={t.embedSrc}
                      className="sr-only"
                      aria-hidden="true"
                      tabIndex={-1}
                      ref={(el) => (iframeRefs.current[idx] = el)}
                    />
                  ) : (
                    <div className="text-xs text-muted-foreground italic">Player in arrivo</div>
                  )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
