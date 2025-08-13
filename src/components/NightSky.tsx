import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

interface Cloud {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const NightSky = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [timeProgress, setTimeProgress] = useState(0);

  // Genera stelle e nuvole iniziali
  useEffect(() => {
    const generateStars = () => {
      const starArray: Star[] = [];
      for (let i = 0; i < 80; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          delay: Math.random() * 4
        });
      }
      setStars(starArray);
    };

    const generateClouds = () => {
      const cloudArray: Cloud[] = [];
      for (let i = 0; i < 5; i++) {
        cloudArray.push({
          id: i,
          x: Math.random() * 120 - 20,
          y: Math.random() * 40 + 10,
          size: Math.random() * 150 + 100,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.15 + 0.05
        });
      }
      setClouds(cloudArray);
    };

    generateStars();
    generateClouds();
  }, []);

  // Simula il passaggio del tempo (22:00 - 04:00)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeProgress(prev => (prev + 0.01) % 1);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Anima le nuvole
  useEffect(() => {
    const animateClouds = () => {
      setClouds(prev => prev.map(cloud => ({
        ...cloud,
        x: cloud.x >= 120 ? -20 : cloud.x + cloud.speed
      })));
    };

    const interval = setInterval(animateClouds, 100);
    return () => clearInterval(interval);
  }, []);

  // Calcola il colore di sfondo basato sul tempo
  const getBackgroundGradient = () => {
    const deepBlue = [11, 18, 32]; // #0B1220
    const darkBlue = [16, 22, 45]; // #10162D  
    const violetBlue = [25, 15, 45]; // #190F2D

    let r, g, b;
    
    if (timeProgress < 0.5) {
      // 22:00 - 01:00: da blu intenso a blu-nero
      const t = timeProgress * 2;
      r = deepBlue[0] + (darkBlue[0] - deepBlue[0]) * t;
      g = deepBlue[1] + (darkBlue[1] - deepBlue[1]) * t;
      b = deepBlue[2] + (darkBlue[2] - deepBlue[2]) * t;
    } else {
      // 01:00 - 04:00: da blu-nero a tinte violacee
      const t = (timeProgress - 0.5) * 2;
      r = darkBlue[0] + (violetBlue[0] - darkBlue[0]) * t;
      g = darkBlue[1] + (violetBlue[1] - darkBlue[1]) * t;
      b = darkBlue[2] + (violetBlue[2] - darkBlue[2]) * t;
    }

    return `linear-gradient(180deg, rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}) 0%, hsl(var(--night)) 100%)`;
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        background: getBackgroundGradient(),
        transition: 'background 2s ease-in-out'
      }}
    >
      {/* Stelle scintillanti */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${3 + star.delay}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}

      {/* Nuvole leggere */}
      {clouds.map(cloud => (
        <div
          key={cloud.id}
          className="absolute rounded-full"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)',
            opacity: cloud.opacity,
            filter: 'blur(1px)',
            transition: 'left 0.1s linear'
          }}
        />
      ))}

      {/* Overlay sottile per migliorare la leggibilità */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
    </div>
  );
};

export default NightSky;