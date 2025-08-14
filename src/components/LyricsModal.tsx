import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackTitle: string;
  lyrics: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export function LyricsModal({ 
  isOpen, 
  onClose, 
  trackTitle, 
  lyrics, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext 
}: LyricsModalProps) {
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
          <DialogTitle className="text-xl font-bold text-foreground pr-8">
            {trackTitle}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Chiudi</span>
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pr-4 max-h-[60vh]">
          <div className="font-mono text-sm text-foreground/90 whitespace-pre-line leading-7">
            {formattedLyrics}
          </div>
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
          
          <div className="text-xs text-muted-foreground">
            Testo di JackPot
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