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
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-night/95 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-4 shadow-elegant">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-warm-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-warm-white mb-1">
            Installa l'app
          </h3>
          <p className="text-sm text-warm-white/80 mb-3">
            {isIOS 
              ? "Tocca il pulsante di condivisione e seleziona 'Aggiungi alla schermata Home'"
              : "Aggiungi Donne che non dormono alla tua schermata home per un accesso rapido"
            }
          </p>
          
          <div className="flex gap-2">
            {!isIOS && deferredPrompt && (
              <Button 
                onClick={handleInstall}
                size="sm"
                className="bg-accent hover:bg-accent/90 text-night font-medium"
              >
                Installa
              </Button>
            )}
            <Button 
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="text-warm-white/60 hover:text-warm-white hover:bg-warm-white/10"
            >
              Non ora
            </Button>
          </div>
        </div>
        
        <Button
          onClick={handleDismiss}
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-warm-white/60 hover:text-warm-white hover:bg-warm-white/10 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallBanner;