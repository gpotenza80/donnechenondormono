import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const tracks = [
  {
    title: "DISCONNESSA",
    time: "22:00",
    cover: "/lovable-uploads/5d957bbd-957a-414e-9bb0-a42e7c733d68.png",
    caption:
      "Identità digitale e bug dell'anima: \"viva quando mi laggo, reale quando crasho\".",
    embedSrc:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141000256%3Fsecret_token%3Ds-XlUmQMpn0e5&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "ADDÀ PASSÀ",
    time: "23:00",
    cover: "/lovable-uploads/4d6c9b26-e1af-4cd8-83d1-67bdbfceffce.png",
    caption:
      "Notte lunga dopo l'addio. \"Addà passà 'a nuttata\".",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141001393%3Fsecret_token%3Ds-IfvSOmlv59I&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Bambenélla",
    time: "00:00",
    cover: "/lovable-uploads/809f9868-c327-48a9-97ae-507c4f940dd2.png",
    caption:
      "Ritratto teatrale-metropolitano: corpo, lavoro e piattaforme. Ironia amara.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141001681%3Fsecret_token%3Ds-oW1LaFMEcs7&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Ja, fa' pace cu mmé",
    time: "01:00",
    cover: "/lovable-uploads/30e107ef-4697-4428-a8ce-21bc12f9b9b5.png",
    caption:
      "Riconciliazione nervosa: quando amare significa scegliere la pace.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141002701%3Fsecret_token%3Ds-f15KZWPZ3ip&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Le mie catene",
    time: "02:00",
    cover: "/lovable-uploads/e25ec76a-2ce7-4235-b6b9-bc1b0baff516.png",
    caption:
      "Ballata di liberazione: tagliare corde antiche, scrivere un finale che non muoia.",
    embedSrc:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141003151%3Fsecret_token%3Ds-53BKwkN2xey&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Pena - Español",
    time: "03:00",
    cover: "/lovable-uploads/798ab651-37e4-42bf-a8f5-85c339d070de.png",
    caption:
      "Bolero moderno di attesa e ferita. In spagnolo.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141003586%3Fsecret_token%3Ds-hwGWFf4SHAo&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Pena - Italiano",
    time: "03:00",
    cover: "/lovable-uploads/798ab651-37e4-42bf-a8f5-85c339d070de.png",
    caption:
      "Bolero moderno di attesa e ferita. In italiano.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141003739%3Fsecret_token%3Ds-Lh56An9JhqW&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Londra 2000",
    time: "04:00",
    cover: "/lovable-uploads/a987e938-ebfb-45fc-a615-15783e121b2f.png",
    caption:
      "Cartolina emotiva: ricordi e città come specchi.",
    embedSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2141004411%3Fsecret_token%3Ds-1K5ZKSg7pOO&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
] as const;

export default function TrackGrid() {
  const [scReady, setScReady] = useState(false);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const widgetRefs = useRef<any[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const boundSet = useRef<Set<number>>(new Set());
  const [durations, setDurations] = useState<number[]>(Array(tracks.length).fill(0));
  const [positions, setPositions] = useState<number[]>(Array(tracks.length).fill(0));
  const [paused, setPaused] = useState<boolean[]>(Array(tracks.length).fill(true));

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
    
    const E = (window as any).SC?.Widget?.Events;
    if (!E) return;

    tracks.forEach((track, i) => {
      if (!track.embedSrc || boundSet.current.has(i)) return;
      
      const iframe = iframeRefs.current[i];
      if (!iframe) return;

      try {
        const widget = (window as any).SC?.Widget(iframe);
        if (!widget) return;
        
        widgetRefs.current[i] = widget;

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
          
          // Pausa tutti gli altri
          widgetRefs.current.forEach((w, idx) => {
            if (w && idx !== i) {
              try { w.pause(); } catch {}
            }
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
            console.log('[TrackGrid] Attempting auto-play next track:', nextIdx);
            
            // Mostra quale traccia sta per partire
            setPlayingIndex(nextIdx);
            scrollToCard(nextIdx);
            
            // Prova l'auto-play dopo un delay
            setTimeout(() => {
              const nextWidget = widgetRefs.current[nextIdx];
              if (nextWidget) {
                try {
                  console.log('[TrackGrid] Calling play() on next widget:', nextIdx);
                  nextWidget.play();
                  console.log('[TrackGrid] Successfully called play() on widget:', nextIdx);
                } catch (error) {
                  console.error('[TrackGrid] Failed to auto-play next track:', error);
                  // Se l'auto-play fallisce, mostra un messaggio visivo
                  console.log('[TrackGrid] Auto-play blocked - user interaction needed');
                }
              } else {
                console.error('[TrackGrid] Next widget not found for index:', nextIdx);
              }
            }, 800);
          } else {
            console.log('[TrackGrid] No more tracks to play');
            setPlayingIndex(null);
          }
        });

        boundSet.current.add(i);
      } catch (error) {
        console.error('[TrackGrid] Error setting up widget:', i, error);
      }
    });
  }, [scReady]);

  const scrollToCard = (idx: number) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {}
  };

  const handleCoverClick = (idx: number) => {
    console.log('[TrackGrid] handleCoverClick', idx);
    const track = tracks[idx];
    if (!track.embedSrc || !scReady) return;

    // Pausa tutti gli altri
    widgetRefs.current.forEach((w, i) => {
      if (w && i !== idx) {
        try { w.pause(); } catch {}
      }
    });

    const widget = widgetRefs.current[idx];
    if (!widget) return;

    if (playingIndex === idx) {
      try {
        widget.isPaused((paused: boolean) => {
          if (paused) { widget.play(); } else { widget.pause(); }
        });
      } catch {
        widget.play();
      }
    } else {
      try { widget.play(); } catch {}
      setPlayingIndex(idx);
    }
  };

  const formatMs = (ms: number) => {
    const total = Math.max(0, Math.floor((ms || 0) / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // Event listeners per controlli esterni
  useEffect(() => {
    const handler = () => {
      console.log('[TrackGrid] event: play-first-track');
      handleCoverClick(0);
    };
    window.addEventListener("play-first-track", handler as any);
    return () => window.removeEventListener("play-first-track", handler as any);
  }, []);

  useEffect(() => {
    (window as any).playFirstAlbumTrack = () => {
      console.log('[TrackGrid] window.playFirstAlbumTrack called');
      handleCoverClick(0);
    };
    return () => { 
      try { delete (window as any).playFirstAlbumTrack; } catch {} 
    };
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      const idx = Math.max(0, Math.min(tracks.length - 1, e?.detail?.index ?? 0));
      console.log('[TrackGrid] event: play-track-index', idx);
      handleCoverClick(idx);
    };
    window.addEventListener("play-track-index", handler as any);
    return () => window.removeEventListener("play-track-index", handler as any);
  }, []);

  useEffect(() => {
    (window as any).playAlbumTrack = (idx: number) => {
      const clamped = Math.max(0, Math.min(tracks.length - 1, idx | 0));
      console.log('[TrackGrid] window.playAlbumTrack', clamped);
      handleCoverClick(clamped);
    };
    return () => { 
      try { delete (window as any).playAlbumTrack; } catch {} 
    };
  }, []);

  return (
    <>
      <span id="brani" className="block h-0" aria-hidden="true" />
      <section id="ascolta" className="container mx-auto py-16 md:py-24">
        <div className="grid gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4">Tracce</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tracks.map((t, idx) => (
                <Card 
                  key={t.title} 
                  id={t.time === "03:00" ? (idx === 5 ? "h03" : undefined) : `h${t.time.slice(0,2)}`} 
                  ref={(el) => (cardRefs.current[idx] = el)} 
                  tabIndex={-1}
                  className={playingIndex === idx && !paused[idx] ? "ring-2 ring-primary" : ""}
                >
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
                      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                        <div className="rounded-full bg-background/60 ring-1 ring-foreground/20 p-3 backdrop-blur-sm">
                          {playingIndex === idx && !paused[idx] ? (
                            <Pause className="h-6 w-6 text-foreground" aria-hidden="true" />
                          ) : (
                            <Play className="h-6 w-6 text-foreground" aria-hidden="true" />
                          )}
                        </div>
                        <span className="sr-only">Riproduci {t.title}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardTitle className="text-base">
                      {String(idx + 1).padStart(2, "0")} — {t.title}
                    </CardTitle>
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
                    
                    {/* Barra di scorrimento per ogni traccia */}
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
                  
                  {/* Widget SoundCloud nascosto per ogni traccia */}
                  {t.embedSrc && (
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