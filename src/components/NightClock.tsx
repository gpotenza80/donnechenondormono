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
    <div className="w-full">
      <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 shadow-elegant">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium text-foreground">Sette ore della notte</h3>
        </div>
        
        {/* Timeline orizzontale per mobile, verticale per desktop */}
        <div className="relative">
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-border"></div>
          <div className="md:hidden absolute top-4 left-0 right-0 h-px bg-border"></div>
          
          <div className="grid grid-cols-2 md:block gap-4 md:gap-0">
            {timeSlots.map((slot, index) => (
              <button
                key={index} 
                onClick={() => onTimeClick?.(index)}
                className={`
                  relative flex md:flex-row flex-col items-center md:mb-4 last:mb-0 p-2 rounded-lg transition-all duration-300 hover:bg-card/80 group
                  ${index <= currentTrackIndex ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                {/* Ora */}
                <div className={`
                  text-sm font-mono md:w-12 md:text-right md:mr-4 transition-colors duration-500
                  ${index <= currentTrackIndex ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'}
                `}>
                  {slot.hour}
                </div>
                
                {/* Punto indicatore */}
                <div className={`
                  relative w-3 h-3 rounded-full border-2 transition-all duration-500 z-10 md:mx-0 mx-auto mb-2 md:mb-0
                  ${index <= currentTrackIndex 
                    ? 'bg-accent border-accent shadow-glow' 
                    : 'bg-background border-border group-hover:border-accent/50'}
                `}>
                  {index === currentTrackIndex && (
                    <div className="absolute inset-0 rounded-full bg-accent animate-pulse"></div>
                  )}
                </div>
                
                {/* Titolo brano */}
                <div className={`
                  md:ml-4 text-xs transition-colors duration-500 text-center md:text-left
                  ${index <= currentTrackIndex ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                `}>
                  {slot.label}
                </div>
              </button>
            ))}
          </div>
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