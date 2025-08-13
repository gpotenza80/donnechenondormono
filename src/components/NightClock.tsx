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
    { hour: "01:00", label: "Ja, fa' pace" },
    { hour: "02:00", label: "Le mie catene" },
    { hour: "03:00", label: "Pena ES" },
    { hour: "04:00", label: "Pena IT" }
  ];

  useEffect(() => {
    setCurrentTime(currentTrackIndex);
  }, [currentTrackIndex]);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-4 shadow-elegant">
        <div className="text-center mb-3">
          <h3 className="text-sm font-medium text-foreground">Sette ore della notte</h3>
        </div>
        
        {/* Timeline compatta */}
        <div className="space-y-2">
          {timeSlots.map((slot, index) => (
            <button
              key={index} 
              onClick={() => onTimeClick?.(index)}
              className={`
                w-full flex items-center justify-between p-2 rounded-md transition-all duration-300 hover:bg-card/80 group text-left
                ${index <= currentTrackIndex ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              {/* Ora e punto */}
              <div className="flex items-center gap-3">
                <div className={`
                  text-xs font-mono transition-colors duration-500
                  ${index <= currentTrackIndex ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'}
                `}>
                  {slot.hour}
                </div>
                
                <div className={`
                  w-2 h-2 rounded-full border transition-all duration-500
                  ${index <= currentTrackIndex 
                    ? 'bg-accent border-accent shadow-glow' 
                    : 'bg-background border-border group-hover:border-accent/50'}
                `}>
                  {index === currentTrackIndex && (
                    <div className="absolute inset-0 rounded-full bg-accent animate-pulse"></div>
                  )}
                </div>
              </div>
              
              {/* Titolo brano */}
              <div className={`
                text-xs transition-colors duration-500 truncate
                ${index <= currentTrackIndex ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}
              `}>
                {slot.label}
              </div>
            </button>
          ))}
        </div>
        
        {/* Stelle decorative */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-6 -left-1 w-1 h-1 bg-accent rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-4 -right-2 w-1.5 h-1.5 bg-accent rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default NightClock;