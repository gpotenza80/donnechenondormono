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

  // Calculate scroll progress based on track position
  useEffect(() => {
    if (!autoScrollEnabled || !isCurrentTrack || !isPlaying || userScrolled || !scrollContainerRef.current || duration === 0) {
      return;
    }

    const container = scrollContainerRef.current;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = Math.min(currentPosition / duration, 1);
    const targetScrollTop = scrollHeight * progress;

    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
  }, [autoScrollEnabled, isCurrentTrack, isPlaying, currentPosition, duration, userScrolled]);

  // Handle manual scroll detection
  const handleScroll = () => {
    if (autoScrollEnabled && isCurrentTrack && isPlaying) {
      setUserScrolled(true);
      
      // Clear existing timeout
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
      
      // Re-enable auto scroll after 3 seconds of no manual scrolling
      autoScrollTimeoutRef.current = setTimeout(() => {
        setUserScrolled(false);
      }, 3000);
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
      <DialogContent className="max-w-2xl max-h-[85vh] bg-background/95 backdrop-blur-sm border-border/50">
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
          <div className="font-mono text-sm text-foreground/90 whitespace-pre-line leading-7">
            {formattedLyrics}
          </div>
          {/* Extra padding at bottom for better autoscroll experience */}
          <div className="h-32" />
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