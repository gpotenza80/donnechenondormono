import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { LyricsModal } from "@/components/LyricsModal";
import { getTrackLyrics } from "@/data/lyrics";

// Import delle immagini
import cover1 from "/lovable-uploads/5d957bbd-957a-414e-9bb0-a42e7c733d68.png";
import cover2 from "/lovable-uploads/4d6c9b26-e1af-4cd8-83d1-67bdbfceffce.png";
import cover3 from "/lovable-uploads/809f9868-c327-48a9-97ae-507c4f940dd2.png";
import cover4 from "/lovable-uploads/30e107ef-4697-4428-a8ce-21bc12f9b9b5.png";
import cover5 from "/lovable-uploads/e25ec76a-2ce7-4235-b6b9-bc1b0baff516.png";
import cover6 from "/lovable-uploads/798ab651-37e4-42bf-a8f5-85c339d070de.png";
import cover7 from "/lovable-uploads/620d31bd-53ad-4350-8915-9f9c0b3c6172.png";
import cover8 from "/lovable-uploads/3aac9be1-6a82-42b8-9027-872eda669c4a.png";

const tracks = [
  {
    title: "DISCONNESSA",
    time: "22:00",
    cover: cover1,
    caption:
      "Identità digitale e bug dell'anima. «Viva quando mi laggo, reale quando crasho».",
  },
  {
    title: "ADDÀ PASSÀ",
    time: "23:00",
    cover: cover2,
    caption:
      "La prima notte senza te: paura, ricordi e la speranza che addà passà 'a nuttata.",
  },
  {
    title: "Bambenélla",
    time: "00:00",
    cover: cover3,
    caption:
      "Ritratto teatrale-metropolitano: corpo, lavoro e piattaforme. Ironia amara.",
  },
  {
    title: "Ja, fa' pace cu mmé",
    time: "01:00",
    cover: cover4,
    caption:
      "Quando amare significa scegliere la pace.",
  },
  {
    title: "Le mie catene",
    time: "02:00",
    cover: cover5,
    caption:
      "Marcia di liberazione: recidere le catene per scrivere un finale che non muoia.",
  },
  {
    title: "Pena - Español",
    time: "03:00",
    cover: cover6,
    caption:
      "Tango moderno di attesa e ferita. Versione in spagnolo.",
  },
  {
    title: "Pena - Italiano",
    time: "03:00",
    cover: cover7,
    caption:
      "Tango moderno di attesa e ferita. Versione in italiano.",
  },
  {
    title: "Londra 2000",
    time: "04:00",
    cover: cover8,
    caption:
      "Cartolina emotiva: ricordi e città come specchi.",
  },
] as const;

export default function TrackGrid() {
  const [scReady, setScReady] = useState(false);
  const playlistWidgetRef = useRef<any>(null);
  const playlistIframeRef = useRef<HTMLIFrameElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackInfo, setCurrentTrackInfo] = useState<any>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyricsModalOpen, setLyricsModalOpen] = useState(false);
  const [selectedTrackLyrics, setSelectedTrackLyrics] = useState<{title: string; lyrics: string} | null>(null);
  const [lyricsTrackIndex, setLyricsTrackIndex] = useState<number | null>(null);

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
    if (!scReady || !playlistIframeRef.current) return;
    
    const E = (window as any).SC?.Widget?.Events;
    if (!E) return;

    try {
      const widget = (window as any).SC?.Widget(playlistIframeRef.current);
      if (!widget) return;
      
      playlistWidgetRef.current = widget;

      widget.bind(E.READY, () => {
        console.log('[TrackGrid] Playlist widget ready');
        widget.getCurrentSound((sound: any) => {
          if (sound) {
            console.log('[TrackGrid] Current sound:', sound);
            setCurrentTrackInfo(sound);
          }
        });
      });

      widget.bind(E.PLAY, () => {
        console.log('[TrackGrid] Playlist playing');
        setIsPlaying(true);
        
        widget.getCurrentSoundIndex((index: number) => {
          console.log('[TrackGrid] Current track index:', index);
          setPlayingIndex(index);
          // Invia evento per aggiornare l'orologio
          window.dispatchEvent(new CustomEvent('track-changed', { detail: { index } }));
          if (index >= 0 && index < tracks.length) {
            scrollToCard(index);
          }
        });
      });

      widget.bind(E.PAUSE, () => {
        console.log('[TrackGrid] Playlist paused');
        setIsPlaying(false);
      });

      widget.bind(E.FINISH, () => {
        console.log('[TrackGrid] Track finished - playlist will auto-advance');
        setIsPlaying(false);
      });

      // Traccia il cambio di brano e la posizione
      widget.bind(E.PLAY_PROGRESS, (data: any) => {
        setPosition(data.relativePosition || 0);
        
        widget.getCurrentSoundIndex((index: number) => {
          if (index !== playingIndex) {
            console.log('[TrackGrid] Track changed to:', index);
            setPlayingIndex(index);
            // Invia evento per aggiornare l'orologio
            window.dispatchEvent(new CustomEvent('track-changed', { detail: { index } }));
            if (index >= 0 && index < tracks.length) {
              scrollToCard(index);
            }
          }
        });
        
        // Ottieni durata del brano corrente
        widget.getDuration((duration: number) => {
          setDuration(duration);
        });
      });

    } catch (error) {
      console.error('[TrackGrid] Error setting up playlist widget:', error);
    }
  }, [scReady, playingIndex]);

  const scrollToCard = (idx: number) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {}
  };

  const handleCoverClick = (idx: number) => {
    console.log('[TrackGrid] handleCoverClick', idx);
    
    if (!playlistWidgetRef.current) {
      console.log('[TrackGrid] Playlist widget not ready');
      return;
    }

    // Se è la traccia corrente e sta suonando, metti in pausa
    if (playingIndex === idx && isPlaying) {
      playlistWidgetRef.current.pause();
      return;
    }

    // Salta alla traccia specifica e riproduci
    try {
      playlistWidgetRef.current.skip(idx);
      setTimeout(() => {
        playlistWidgetRef.current.play();
      }, 100);
      setPlayingIndex(idx);
      scrollToCard(idx);
    } catch (error) {
      console.error('[TrackGrid] Error playing track:', error);
    }
  };

  const togglePlayPause = () => {
    if (!playlistWidgetRef.current) return;
    
    if (isPlaying) {
      playlistWidgetRef.current.pause();
    } else {
      playlistWidgetRef.current.play();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playlistWidgetRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const seekPosition = percentage * duration;
    
    console.log('[TrackGrid] Seeking to position:', seekPosition);
    try {
      playlistWidgetRef.current.seekTo(seekPosition);
      setPosition(percentage);
    } catch (error) {
      console.error('[TrackGrid] Error seeking:', error);
    }
  };

  const goToPreviousTrack = () => {
    if (!playlistWidgetRef.current || playingIndex === null) return;
    
    const prevIndex = playingIndex > 0 ? playingIndex - 1 : tracks.length - 1;
    handleCoverClick(prevIndex);
  };

  const goToNextTrack = () => {
    if (!playlistWidgetRef.current || playingIndex === null) return;
    
    const nextIndex = playingIndex < tracks.length - 1 ? playingIndex + 1 : 0;
    handleCoverClick(nextIndex);
  };

  const handleSliderChange = (values: number[]) => {
    if (!playlistWidgetRef.current || !duration) return;
    
    const percentage = values[0] / 100;
    const seekPosition = percentage * duration;
    
    try {
      playlistWidgetRef.current.seekTo(seekPosition);
      setPosition(percentage);
    } catch (error) {
      console.error('[TrackGrid] Error seeking:', error);
    }
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

  // Funzioni di navigazione per i testi
  const goToPreviousLyricsTrack = () => {
    if (lyricsTrackIndex === null) return;
    
    const prevIndex = lyricsTrackIndex > 0 ? lyricsTrackIndex - 1 : tracks.length - 1;
    const prevTrack = tracks[prevIndex];
    const lyrics = getTrackLyrics(prevTrack.title);
    
    if (lyrics) {
      setSelectedTrackLyrics(lyrics);
      setLyricsTrackIndex(prevIndex);
    }
  };

  const goToNextLyricsTrack = () => {
    if (lyricsTrackIndex === null) return;
    
    const nextIndex = lyricsTrackIndex < tracks.length - 1 ? lyricsTrackIndex + 1 : 0;
    const nextTrack = tracks[nextIndex];
    const lyrics = getTrackLyrics(nextTrack.title);
    
    if (lyrics) {
      setSelectedTrackLyrics(lyrics);
      setLyricsTrackIndex(nextIndex);
    }
  };

  return (
    <>
      <span id="brani" className="block h-0" aria-hidden="true" />
      <section id="ascolta" className="container mx-auto py-10 md:py-14" aria-labelledby="tracks-title">
        <div className="grid gap-10">
          
          {/* Player nascosto che gestisce l'audio in background */}
          <iframe
            ref={playlistIframeRef}
            title="Donne che non dormono — Playlist completa"
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2050729731%3Fsecret_token%3Ds-PWvlpNWPDGi&color=%23886050&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />

          {/* Barra di avanzamento */}
          {isPlaying && playingIndex !== null && duration > 0 && (
            <div className="fixed top-[max(env(safe-area-inset-top),1rem)] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)]">
              <div className="mx-auto w-full max-w-[19rem] rounded-lg bg-gradient-to-tr from-[hsl(var(--brand))] to-[hsl(var(--brand-2))] backdrop-blur-md border border-border shadow-elegant p-3">
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={goToPreviousTrack}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Traccia precedente"
                  >
                    <SkipBack className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label={isPlaying ? "Pausa" : "Riproduci"}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 text-white" />
                    ) : (
                      <Play className="h-4 w-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={goToNextTrack}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Traccia successiva"
                  >
                    <SkipForward className="h-4 w-4 text-white" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate text-white">
                        {tracks[playingIndex]?.title}
                      </span>
                      <span className="text-xs text-white/70 whitespace-nowrap ml-2">
                        {Math.floor((position * duration) / 1000 / 60)}:{String(Math.floor(((position * duration) / 1000) % 60)).padStart(2, '0')} / {Math.floor(duration / 1000 / 60)}:{String(Math.floor((duration / 1000) % 60)).padStart(2, '0')}
                      </span>
                    </div>
                    <Slider
                      value={[position * 100]}
                      onValueChange={handleSliderChange}
                      max={100}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Griglia tracce */}
          <div>
            <h2 id="tracks-title" className="text-xl font-semibold mb-6">Tracce dell'album</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label="Lista tracce musicali">
              {tracks.map((t, idx) => (
                <article 
                  key={t.title}
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/MusicRecording"
                >
                  <meta itemProp="position" content={String(idx + 1)} />
                  <meta itemProp="name" content={t.title} />
                  <meta itemProp="description" content={t.caption} />
                  <Card 
                    id={t.time === "03:00" ? (idx === 5 ? "h03" : undefined) : `h${t.time.slice(0,2)}`} 
                    ref={(el) => (cardRefs.current[idx] = el)} 
                    tabIndex={-1}
                    className={playingIndex === idx && isPlaying ? "ring-2 ring-primary" : ""}
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
                          {playingIndex === idx && isPlaying ? (
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
                    <CardTitle className="text-base" itemProp="name">
                      {String(idx + 1).padStart(2, "0")} — {t.title}
                    </CardTitle>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <button
                        type="button"
                        className="story-link inline-flex items-center font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                        aria-label={`Ascolta ${t.title} alle ${t.time}`}
                        onClick={() => handleCoverClick(idx)}
                      >
                        <time dateTime={`${t.time}:00`} className="font-mono">{t.time}</time>
                      </button>
                      <span aria-hidden="true"> — </span>
                      <span itemProp="description">{t.caption}</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button 
                        onClick={() => {
                          const lyrics = getTrackLyrics(t.title);
                          if (lyrics) {
                            setSelectedTrackLyrics(lyrics);
                            setLyricsTrackIndex(idx);
                            setLyricsModalOpen(true);
                          }
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 bg-transparent border-none cursor-pointer"
                        aria-label={`Leggi il testo di ${t.title}`}
                      >
                        Mostra testo
                      </button>
                    </div>
                  </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Modal per i testi */}
      {selectedTrackLyrics && (
        <LyricsModal
          isOpen={lyricsModalOpen}
          onClose={() => setLyricsModalOpen(false)}
          trackTitle={selectedTrackLyrics.title}
          lyrics={selectedTrackLyrics.lyrics}
          onPrevious={goToPreviousLyricsTrack}
          onNext={goToNextLyricsTrack}
          hasPrevious={lyricsTrackIndex !== null && lyricsTrackIndex > 0}
          hasNext={lyricsTrackIndex !== null && lyricsTrackIndex < tracks.length - 1}
          isPlaying={isPlaying}
          currentPosition={position}
          duration={duration}
          isCurrentTrack={playingIndex !== null && 
            selectedTrackLyrics.title.toLowerCase() === tracks[playingIndex]?.title.toLowerCase()}
        />
      )}
    </>
  );
}