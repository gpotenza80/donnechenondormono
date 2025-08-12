import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const soundcloudAlbumUrl = "https://api.soundcloud.com/playlists/2050729731?secret_token=s-PWvlpNWPDGi";

const tracks = [
  {
    title: "DISCONNESSA",
    time: "22:00",
    cover: "/lovable-uploads/5d957bbd-957a-414e-9bb0-a42e7c733d68.png",
    url: soundcloudAlbumUrl,
    caption:
      "Manifesto generazionale sull’identità digitale e il bisogno di realtà. Voce femminile intensa, atmosfera tra pop, elettronica e R&B.",
    embedSrc:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141000256%3Fsecret_token%3Ds-XlUmQMpn0e5&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "ADDÀ PASSÀ",
    time: "23:00",
    cover: "/lovable-uploads/4d6c9b26-e1af-4cd8-83d1-67bdbfceffce.png",
    url: soundcloudAlbumUrl,
    caption:
      "Canzone napoletana emotiva, profonda, autentica. Linguaggio teatrale, intensa, con grande apertura melodica.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141001393%3Fsecret_token%3Ds-IfvSOmlv59I&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Bambenella",
    time: "00:00",
    cover: "/lovable-uploads/809f9868-c327-48a9-97ae-507c4f940dd2.png",
    url: soundcloudAlbumUrl,
    caption:
      "Brano teatrale, provocatorio e contemporaneo. Racconta una figura femminile tra denuncia sociale, ironia e resistenza urbana. In napoletano.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141001681%3Fsecret_token%3Ds-oW1LaFMEcs7&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Ja, fa’ pace cu mmè",
    time: "01:00",
    cover: "/lovable-uploads/30e107ef-4697-4428-a8ce-21bc12f9b9b5.png",
    url: soundcloudAlbumUrl,
    caption:
      "Dialogo intimo, tenero e poetico. Una canzone da camera, emotiva, con potenziale vocale per interpreti teatrali o cinematografici.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141002701%3Fsecret_token%3Ds-f15KZWPZ3ip&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
   {
    title: "Le mie catene",
    time: "02:00",
    cover: "/lovable-uploads/e25ec76a-2ce7-4235-b6b9-bc1b0baff516.png",
    url: soundcloudAlbumUrl,
    caption:
      "Testo forte e viscerale. Esprime dolore, desiderio di libertà e ribellione esistenziale. Atmosfera poetica e drammatica.",
    embedSrc:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141003151%3Fsecret_token%3Ds-53BKwkN2xey&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Pena - Español",
    time: "03:00",
    cover: "/lovable-uploads/798ab651-37e4-42bf-a8f5-85c339d070de.png",
    url: soundcloudAlbumUrl,
    caption:
      "Brano emotivo, notturno, intenso. Un crescendo di sofferenza e desiderio. Ottimo per interpreti d’impatto.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141003586%3Fsecret_token%3Ds-hwGWFf4SHAo&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Pena - Italiano",
    time: "03:00",
    cover: "/lovable-uploads/798ab651-37e4-42bf-a8f5-85c339d070de.png",
    url: soundcloudAlbumUrl,
    caption:
      "Brano emotivo, notturno, intenso. Un crescendo di sofferenza e desiderio. Ottimo per interpreti d’impatto.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141003739%3Fsecret_token%3Ds-Lh56An9JhqW&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Londra 2000",
    time: "04:00",
    cover: "/lovable-uploads/a987e938-ebfb-45fc-a615-15783e121b2f.png",
    url: soundcloudAlbumUrl,
    caption:
      "Ballata poetica e malinconica. Uno sguardo sullo spirito dei vent’anni, tra ironia e disillusione. Delicata e riflessiva.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141004411%3Fsecret_token%3Ds-1K5ZKSg7pOO&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
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
                    {t.embedSrc && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                        <Play className="h-8 w-8 text-foreground drop-shadow" aria-hidden="true" />
                        <span className="sr-only">Riproduci o metti in pausa {t.title}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="text-base">{String(idx + 1).padStart(2, "0")} — {t.title}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <button
                      type="button"
                      className="story-link inline-flex items-center font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                      aria-label={`Ascolta ${t.title} alle ${t.time}`}
                      onClick={() => handleCoverClick(idx)}
                    >
                      {t.time}
                    </button>
                    {" — "}{t.caption}
                  </p>
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
