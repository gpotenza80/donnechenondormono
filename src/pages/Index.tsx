import AlbumHero from "@/components/AlbumHero";
import ConceptSection from "@/components/ConceptSection";
import TrackGrid from "@/components/TrackGrid";
import AboutSection from "@/components/PressSection";
import SiteFooter from "@/components/SiteFooter";
import NightClock from "@/components/NightClock";

const Index = () => {
  return (
    <main id="top" className="min-h-screen bg-background">
      <NightClock />
      <AlbumHero />
      <ConceptSection />
      <TrackGrid />
      <AboutSection />
      <SiteFooter />
    </main>
  );
};

export default Index;
