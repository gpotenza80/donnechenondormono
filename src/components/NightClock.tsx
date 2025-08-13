import { useEffect, useState } from 'react';

interface NightClockProps {
  currentTrackIndex?: number;
}

const NightClock = ({ currentTrackIndex = 0 }: NightClockProps) => {
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
    <div className="fixed top-4 right-4 z-40 hidden md:block">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-elegant">
        <div className="text-center mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Sette ore della notte</h3>
        </div>
        
        {/* Timeline verticale */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>
          
          {timeSlots.map((slot, index) => (
            <div key={index} className="relative flex items-center mb-4 last:mb-0">
              {/* Ora */}
              <div className={`
                text-sm font-mono w-12 text-right mr-4 transition-colors duration-500
                ${index <= currentTime ? 'text-accent' : 'text-muted-foreground'}
              `}>
                {slot.hour}
              </div>
              
              {/* Punto indicatore */}
              <div className={`
                relative w-3 h-3 rounded-full border-2 transition-all duration-500 z-10
                ${index <= currentTime 
                  ? 'bg-accent border-accent shadow-glow' 
                  : 'bg-background border-border'}
              `}>
                {index === currentTime && (
                  <div className="absolute inset-0 rounded-full bg-accent animate-pulse"></div>
                )}
              </div>
              
              {/* Titolo brano */}
              <div className={`
                ml-4 text-xs transition-colors duration-500
                ${index <= currentTime ? 'text-foreground' : 'text-muted-foreground'}
              `}>
                {slot.label}
              </div>
            </div>
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