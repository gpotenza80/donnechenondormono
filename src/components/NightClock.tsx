import { useEffect, useState } from 'react';

interface NightClockProps {
  currentTrackIndex?: number;
  onTimeClick?: (index: number) => void;
}

const NightClock = ({ currentTrackIndex = 0, onTimeClick }: NightClockProps) => {
  const [currentTime, setCurrentTime] = useState(currentTrackIndex);
  
  const timeSlots = [
    { hour: "22:00", label: "Disconnessa" },
    { hour: "23:00", label: "Addà passà" },
    { hour: "00:00", label: "Bambenélla" },
    { hour: "01:00", label: "Ja, fa' pace cu mmé" },
    { hour: "02:00", label: "Le mie catene" },
    { hour: "03:00", label: "Pena" },
    { hour: "04:00", label: "Londra 2000" }
  ];

  useEffect(() => {
    setCurrentTime(currentTrackIndex);
  }, [currentTrackIndex]);

  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-sm">
        <div className="text-center mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Timeline notturna</h3>
        </div>
        
        {/* Timeline elegante */}
        <div className="space-y-1.5">
          {timeSlots.map((slot, index) => (
            <button
              key={index} 
              onClick={() => onTimeClick?.(index)}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 hover:bg-card/60 group text-left
                ${index <= currentTrackIndex 
                  ? 'text-accent bg-accent/5' 
                  : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              {/* Ora */}
              <div className="flex items-center gap-2">
                <div className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-200
                  ${index <= currentTrackIndex 
                    ? 'bg-accent' 
                    : 'bg-muted-foreground/30 group-hover:bg-muted-foreground/50'}
                `} />
                <span className="text-xs font-mono">
                  {slot.hour}
                </span>
              </div>
              
              {/* Titolo brano */}
              <div className="text-xs text-right flex-1 min-w-0">
                {slot.label}
              </div>
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default NightClock;