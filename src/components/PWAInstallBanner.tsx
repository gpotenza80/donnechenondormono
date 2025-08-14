import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

const PWAInstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the banner
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (!isStandalone && !isInWebAppiOS) {
      // For iOS devices, show banner after some time since beforeinstallprompt doesn't fire
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      // Clear the deferredPrompt variable
      setDeferredPrompt(null);
    }
    // Hide the banner regardless
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Remember user dismissed the banner
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // Don't show if user previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed) {
      setShowBanner(false);
    }
  }, []);

  if (!showBanner) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="max-w-xs bg-night/80 backdrop-blur-sm border border-warm-white/10 rounded-lg p-3 shadow-lg">
        <div className="flex items-start gap-2">          
          <div className="flex-1 min-w-0">
            <p className="text-xs text-warm-white/90 mb-2">
              {isIOS 
                ? "📱 Aggiungi alla Home: tocca ↗️ > Aggiungi"
                : "📱 Installa l'app sul dispositivo"
              }
            </p>
            
            <div className="flex gap-1">
              {isIOS ? (
                <Button 
                  onClick={handleDismiss}
                  size="sm"
                  className="bg-warm-white/20 hover:bg-warm-white/30 text-warm-white text-xs h-6 px-2"
                >
                  OK
                </Button>
              ) : deferredPrompt ? (
                <Button 
                  onClick={handleInstall}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-night text-xs h-6 px-2"
                >
                  Installa
                </Button>
              ) : null}
              <Button 
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-warm-white/50 hover:text-warm-white/80 text-xs h-6 px-2"
              >
                ✕
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;