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
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-sm mx-auto bg-night/95 backdrop-blur-sm border border-accent/30 rounded-xl p-4 shadow-elegant">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <Download className="w-5 h-5 text-warm-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-warm-white mb-1">
              Installa l'app
            </h3>
            <p className="text-xs text-warm-white/80 mb-2">
              {isIOS 
                ? "Tocca ↗️ in basso > 'Aggiungi alla schermata Home'"
                : "Premi il tasto per installare direttamente"
              }
            </p>
            
            <div className="flex gap-2">
              {isIOS ? (
                <Button 
                  onClick={handleDismiss}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-night font-medium text-xs h-7 px-3"
                >
                  Capito
                </Button>
              ) : deferredPrompt ? (
                <Button 
                  onClick={handleInstall}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-night font-medium text-xs h-7 px-3"
                >
                  📱 Installa App
                </Button>
              ) : null}
              <Button 
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-warm-white/60 hover:text-warm-white hover:bg-warm-white/10 text-xs h-7 px-2"
              >
                Non ora
              </Button>
            </div>
          </div>
          
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-warm-white/60 hover:text-warm-white hover:bg-warm-white/10 flex-shrink-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;