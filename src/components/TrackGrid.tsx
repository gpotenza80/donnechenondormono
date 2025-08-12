import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";

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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const boundSet = useRef<Set<number>>(new Set());
  const [durations, setDurations] = useState<number[]>(Array(tracks.length).fill(0));
  const [positions, setPositions] = useState<number[]>(Array(tracks.length).fill(0));
  const [paused, setPaused] = useState<boolean[]>(Array(tracks.length).fill(true));
  const pendingPlayIndex = useRef<number | null>(null);

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
    if (scReady) return;
    let tries = 0;
    const int = setInterval(() => {
      tries++;
      const has = Boolean((window as any).SC?.Widget);
      if (has) {
        try { console.log('[TrackGrid] SC.Widget detected via poll'); } catch {}
        setScReady(true);
        clearInterval(int);
      } else if (tries > 120) {
        clearInterval(int);
      }
    }, 50);
    return () => clearInterval(int);
  }, [scReady]);

  useEffect(() => {
    if (!scReady) return;
    
    const E = (window as any).SC?.Widget?.Events;
    if (!E) return;

    // Inizializza i widget e binding una sola volta
    tracks.forEach((track, i) => {
      if (!track.embedSrc || boundSet.current.has(i)) return;
      
      const iframe = iframeRefs.current[i];
      if (!iframe) return;

      try {
        const widget = (window as any).SC?.Widget(iframe);
        if (!widget) return;
        
        widgetRefs.current[i] = widget;

        // Bind eventi una sola volta per widget
        widget.bind(E.READY, () => {
          console.log('[TrackGrid] Widget ready:', i);
          widget.getDuration((ms: number) => {
            setDurations((prev) => {
              const next = [...prev];
              next[i] = ms || 0;
              return next;
            });
          });
        });

        widget.bind(E.PLAY, () => {
          console.log('[TrackGrid] Play event:', i);
          setPlayingIndex(i);
          setPaused((prev) => { 
            const next = [...prev]; 
            next[i] = false; 
            return next; 
          });
        });

        widget.bind(E.PAUSE, () => {
          console.log('[TrackGrid] Pause event:', i);
          setPaused((prev) => { 
            const next = [...prev]; 
            next[i] = true; 
            return next; 
          });
        });

        widget.bind(E.PLAY_PROGRESS, (e: any) => {
          const pos = e?.currentPosition ?? 0;
          setPositions((prev) => {
            const next = [...prev];
            next[i] = pos;
            return next;
          });
        });

        widget.bind(E.FINISH, () => {
          console.log('[TrackGrid] Track finished:', i);
          setPositions((prev) => { 
            const next = [...prev]; 
            next[i] = 0; 
            return next; 
          });
          setPaused((prev) => { 
            const next = [...prev]; 
            next[i] = true; 
            return next; 
          });
          
          // Auto-play next track
          const nextIdx = i + 1;
          if (nextIdx < tracks.length && tracks[nextIdx].embedSrc) {
            console.log('[TrackGrid] Auto-playing next track:', nextIdx);
            setPlayingIndex(nextIdx);
            scrollToCard(nextIdx);
            
            // Pausa tutti gli altri widget prima
            widgetRefs.current.forEach((w, index) => {
              if (w && index !== nextIdx) {
                try { w.pause(); } catch {}
              }
            });
            
            // Riproduci la traccia successiva direttamente
            setTimeout(() => {
              const nextWidget = widgetRefs.current[nextIdx];
              if (nextWidget) {
                try {
                  nextWidget.play();
                  console.log('[TrackGrid] Direct widget play called for track:', nextIdx);
                } catch (error) {
                  console.log('[TrackGrid] Direct widget play failed:', error);
                }
              } else {
                console.log('[TrackGrid] Next widget not found for index:', nextIdx);
              }
            }, 300);
          } else {
            console.log('[TrackGrid] Playlist finished');
            setPlayingIndex(null);
          }
        });

        boundSet.current.add(i);
      } catch (error) {
        console.error('[TrackGrid] Error setting up widget:', i, error);
      }
    });
  }, [scReady]);

  useEffect(() => {
    if (!scReady) return;
    if (pendingPlayIndex.current != null) {
      const i = pendingPlayIndex.current;
      pendingPlayIndex.current = null;
      setTimeout(() => handleCoverClick(i), 0);
    }
  }, [scReady]);

  const pokePlay = (idx: number) => {
    const iframe = iframeRefs.current[idx];
    if (!iframe) return;
    try {
      const cw = iframe.contentWindow;
      if (!cw) return;
      const msg = JSON.stringify({ method: "play" });
      cw.postMessage(msg, "*");
      setTimeout(() => cw.postMessage(msg, "*"), 120);
      setTimeout(() => cw.postMessage(msg, "*"), 300);
    } catch {}
  };

  const scrollToCard = (idx: number) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {}
  };

  const handleCoverClick = (idx: number) => {
    try { console.log('[TrackGrid] handleCoverClick', idx, 'scReady', scReady); } catch {}
    const track = tracks[idx];
    if (!track.embedSrc) return;
    if (!scReady) { pendingPlayIndex.current = idx; pokePlay(idx); return; }

    // Pause all others
    widgetRefs.current.forEach((w, i) => {
      if (w && i !== idx) {
        try { w.pause(); } catch {}
      }
    });

    let target = widgetRefs.current[idx];
    if (!target && iframeRefs.current[idx]) {
      try {
        target = (window as any).SC?.Widget(iframeRefs.current[idx]!);
        if (target) widgetRefs.current[idx] = target;
      } catch {}
    }
    if (!target) return;

    // Il widget dovrebbe già avere tutti gli eventi configurati
    if (!target) {
      console.error('[TrackGrid] No widget found for track:', idx);
      return;
    }

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

  useEffect(() => {
    const handler = () => {
      try { console.log('[TrackGrid] event: play-first-track'); } catch {}
      handleCoverClick(0);
      setTimeout(() => handleCoverClick(0), 120);
    };
    window.addEventListener("play-first-track", handler as any);
    return () => window.removeEventListener("play-first-track", handler as any);
  }, []);

  useEffect(() => {
    (window as any).playFirstAlbumTrack = () => {
      try { console.log('[TrackGrid] window.playFirstAlbumTrack called'); } catch {}
      handleCoverClick(0);
      setTimeout(() => handleCoverClick(0), 120);
    };
    return () => { try { delete (window as any).playFirstAlbumTrack; } catch {} };
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      const idx = Math.max(0, Math.min(tracks.length - 1, e?.detail?.index ?? 0));
      try { console.log('[TrackGrid] event: play-track-index', idx); } catch {}
      handleCoverClick(idx);
      scrollToCard(idx);
      setTimeout(() => handleCoverClick(idx), 120);
      setTimeout(() => scrollToCard(idx), 130);
    };
    window.addEventListener("play-track-index", handler as any);
    return () => window.removeEventListener("play-track-index", handler as any);
  }, []);

  useEffect(() => {
    (window as any).playAlbumTrack = (idx: number) => {
      const clamped = Math.max(0, Math.min(tracks.length - 1, idx | 0));
      try { console.log('[TrackGrid] window.playAlbumTrack', clamped); } catch {}
      handleCoverClick(clamped);
      setTimeout(() => handleCoverClick(clamped), 120);
    };
    return () => { try { delete (window as any).playAlbumTrack; } catch {} };
  }, []);

  const formatMs = (ms: number) => {
    const total = Math.max(0, Math.floor((ms || 0) / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <>
      <span id="brani" className="block h-0" aria-hidden="true" />
      <section id="ascolta" className="container mx-auto py-16 md:py-24">
      <div className="grid gap-10">

        <div>
          <h3 className="text-xl font-semibold mb-4">Tracce</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((t, idx) => (
              <Card key={t.title} id={t.time === "03:00" ? (idx === 5 ? "h03" : undefined) : `h${t.time.slice(0,2)}`} ref={(el) => (cardRefs.current[idx] = el)} tabIndex={-1}>
                <CardHeader className="p-0">
                  <div
                    className="group relative aspect-square overflow-hidden rounded-t-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary bg-muted"
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
                      className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    {t.embedSrc && (
                      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                        <div className="rounded-full bg-background/60 ring-1 ring-foreground/20 p-3 backdrop-blur-sm">
                          {playingIndex === idx && !paused[idx] ? (
                            <Pause className="h-6 w-6 text-foreground" aria-hidden="true" />
                          ) : (
                            <Play className="h-6 w-6 text-foreground" aria-hidden="true" />
                          )}
                        </div>
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
                  <div className="mt-3">
                    <Slider
                      value={[
                        durations[idx]
                          ? Math.min(100, Math.max(0, (positions[idx] / (durations[idx] || 1)) * 100))
                          : 0,
                      ]}
                      max={100}
                      step={0.1}
                      aria-label={`Progresso di ${t.title}`}
                      onValueChange={(vals) => {
                        const p = vals[0] ?? 0;
                        setPositions((prev) => {
                          const next = [...prev];
                          next[idx] = (durations[idx] || 0) * (p / 100);
                          return next;
                        });
                      }}
                      onValueCommit={(vals) => {
                        const p = vals[0] ?? 0;
                        const w = widgetRefs.current[idx];
                        const d = durations[idx] || 0;
                        try {
                          if (w && d) w.seekTo(Math.round((p / 100) * d));
                        } catch {}
                      }}
                    />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{formatMs(positions[idx])}</span>
                      <span>{formatMs(durations[idx])}</span>
                    </div>
                  </div>
                </CardContent>
                  {t.embedSrc ? (
                    <iframe
                      title={`Player SoundCloud — ${t.title}`}
                      width="100%"
                      height="80"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      loading="eager"
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
    </>
  );
}
