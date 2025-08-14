import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackTitle: string;
  lyrics: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  isPlaying?: boolean;
  currentPosition?: number; // in seconds
  duration?: number; // in seconds
  isCurrentTrack?: boolean;
}

export function LyricsModal({ 
  isOpen, 
  onClose, 
  trackTitle, 
  lyrics, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext,
  isPlaying = false,
  currentPosition = 0,
  duration = 0,
  isCurrentTrack = false
}: LyricsModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isAutoScrollingRef = useRef(false); // Track when we're auto-scrolling

  // Attiva automaticamente l'autoscroll se è la traccia corrente
  useEffect(() => {
    if (isCurrentTrack && isPlaying && !autoScrollEnabled) {
      setAutoScrollEnabled(true);
      console.log('[LyricsModal] Auto-attivato autoscroll per traccia corrente');
    }
  }, [isCurrentTrack, isPlaying, autoScrollEnabled]);

  // Log per debug
  useEffect(() => {
    console.log('[LyricsModal] State update:', {
      trackTitle,
      autoScrollEnabled,
      isCurrentTrack, 
      isPlaying,
      currentPosition,
      duration,
      userScrolled
    });
  }, [trackTitle, autoScrollEnabled, isCurrentTrack, isPlaying, currentPosition, duration, userScrolled]);

  // Calculate scroll progress based on track position
  useEffect(() => {
    if (!autoScrollEnabled || !isCurrentTrack || !isPlaying || userScrolled || !scrollContainerRef.current) {
      return;
    }

    if (duration === 0 || currentPosition < 0) {
      console.log('[LyricsModal] Skip scroll - invalid duration/position:', { 
        duration, 
        currentPosition 
      });
      return;
    }

    const container = scrollContainerRef.current;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    
    if (scrollHeight <= 0) {
      console.log('[LyricsModal] Skip scroll - no scrollable content');
      return;
    }

    // currentPosition è già normalizzato 0-1 dal TrackGrid
    // Usa direttamente questo valore per il progresso
    const progress = Math.min(Math.max(currentPosition, 0), 1);
    const targetScrollTop = Math.round(scrollHeight * progress);

    console.log('[LyricsModal] Auto scrolling:', { 
      currentPosition: Math.round(currentPosition * 1000) / 1000,
      duration: Math.round(duration),
      progress: Math.round(progress * 100) + '%', 
      targetScrollTop,
      scrollHeight
    });

    // Mark as auto-scrolling to prevent manual scroll detection
    isAutoScrollingRef.current = true;
    
    // Perform the scroll instantly (no smooth scroll to avoid conflicts)
    container.scrollTop = targetScrollTop;
    
    // Reset auto-scrolling flag after a short delay
    setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 50);
    
  }, [autoScrollEnabled, isCurrentTrack, isPlaying, currentPosition, duration, userScrolled]);

  // Handle manual scroll detection
  const handleScroll = () => {
    // Don't treat auto-scroll as manual scroll
    if (isAutoScrollingRef.current) {
      console.log('[LyricsModal] Auto-scroll event ignored');
      return;
    }
    
    if (autoScrollEnabled && isCurrentTrack && isPlaying) {
      console.log('[LyricsModal] Manual scroll detected');
      setUserScrolled(true);
      
      // Clear existing timeout
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
      
      // Re-enable auto scroll after 4 seconds on mobile (più tempo per il touch)
      autoScrollTimeoutRef.current = setTimeout(() => {
        console.log('[LyricsModal] Re-enabling autoscroll after manual scroll');
        setUserScrolled(false);
      }, 4000);
    }
  };

  // Reset user scroll state when modal opens or auto scroll is disabled
  useEffect(() => {
    if (!autoScrollEnabled || !isOpen) {
      setUserScrolled(false);
    }
  }, [autoScrollEnabled, isOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);

  // Format lyrics with line breaks preserved
  const formattedLyrics = lyrics.split('\n\n').map((verse, index) => (
    <div key={index} className="mb-6 last:mb-0">
      {verse.split('\n').map((line, lineIndex) => (
        <div key={lineIndex} className="leading-relaxed">
          {line || <br />}
        </div>
      ))}
    </div>
  ));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-2xl max-h-[85vh] bg-background/95 backdrop-blur-sm border-border/50"
        aria-describedby="lyrics-description"
      >
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <DialogTitle className="text-xl font-bold text-foreground">
              {trackTitle}
            </DialogTitle>
            {isCurrentTrack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
                className={`flex items-center gap-2 text-xs ${
                  autoScrollEnabled 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={autoScrollEnabled ? 'Disattiva autoscroll' : 'Attiva autoscroll'}
              >
                {autoScrollEnabled ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                Autoscroll
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Chiudi</span>
          </Button>
        </DialogHeader>
        
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto pr-4 max-h-[60vh] scroll-smooth"
        >
          <div 
            id="lyrics-description"
            className="font-mono text-sm text-foreground/90 whitespace-pre-line leading-7"
          >
            {formattedLyrics}
          </div>
          {/* Extra padding at bottom for better autoscroll experience */}
          <div className="h-32" />
          
          {/* Debug info for mobile testing */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-muted-foreground mt-4 p-2 bg-muted/20 rounded">
              <div><strong>Track:</strong> {trackTitle}</div>
              <div><strong>AutoScroll:</strong> {autoScrollEnabled ? '✅ ON' : '❌ OFF'}</div>
              <div><strong>Current Track:</strong> {isCurrentTrack ? '✅ YES' : '❌ NO'}</div>
              <div><strong>Playing:</strong> {isPlaying ? '▶️ YES' : '⏸️ NO'}</div>
              <div><strong>Time:</strong> {Math.round(currentPosition)}s / {Math.round(duration)}s</div>
              <div><strong>Progress:</strong> {duration > 0 ? Math.round((currentPosition/duration)*100) + '%' : '0%'}</div>
              <div><strong>User Scrolled:</strong> {userScrolled ? '👆 YES' : '🤖 NO'}</div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Precedente
          </Button>
          
          <div className="flex flex-col items-center gap-1">
            <div className="text-xs text-muted-foreground">
              Testo di JackPot
            </div>
            {isCurrentTrack && autoScrollEnabled && userScrolled && (
              <div className="text-xs text-amber-500 animate-fade-in">
                Scroll manuale rilevato - autoscroll in pausa
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            Successivo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}