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
    <div className="fixed inset-x-4 top-4 z-50 animate-in slide-in-from-top-2 duration-500">
      <div className="max-w-md mx-auto bg-gradient-primary p-6 rounded-2xl shadow-glow border border-accent/20">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-warm-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 ring-2 ring-accent/30">
            <Download className="w-8 h-8 text-warm-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-warm-white mb-2">
              📱 Installa l'App
            </h3>
            <p className="text-sm text-warm-white/90 mb-4 leading-relaxed">
              {isIOS 
                ? "Tocca il pulsante di condivisione ↗️ e seleziona 'Aggiungi alla schermata Home' per avere accesso istantaneo"
                : "Aggiungi 'Donne che non dormono' alla tua schermata home per un'esperienza a schermo intero"
              }
            </p>
            
            <div className="flex gap-3">
              {!isIOS && deferredPrompt && (
                <Button 
                  onClick={handleInstall}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-night font-bold px-4 py-2 shadow-lg"
                >
                  🚀 Installa Ora
                </Button>
              )}
              <Button 
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-warm-white/80 hover:text-warm-white hover:bg-warm-white/10 px-3"
              >
                Più tardi
              </Button>
            </div>
          </div>
          
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-warm-white/70 hover:text-warm-white hover:bg-warm-white/10 flex-shrink-0 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;