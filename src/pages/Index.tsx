import AlbumHero from "@/components/AlbumHero";
import ConceptSection from "@/components/ConceptSection";
import TrackGrid from "@/components/TrackGrid";
import AboutSection from "@/components/PressSection";
import SiteFooter from "@/components/SiteFooter";
import NightSky from "@/components/NightSky";
import PWAInstallBanner from "@/components/PWAInstallBanner";

const Index = () => {
  return (
    <main id="top" className="min-h-screen relative">
      <NightSky />
      <div className="relative z-10">
        <AlbumHero />
        <ConceptSection />
        <TrackGrid />
        <AboutSection />
        <SiteFooter />
      </div>
      <PWAInstallBanner />
    </main>
  );
};

export default Index;
