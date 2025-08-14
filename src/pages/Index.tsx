import AlbumHero from "@/components/AlbumHero";
import ConceptSection from "@/components/ConceptSection";
import TrackGrid from "@/components/TrackGrid";
import AboutSection from "@/components/PressSection";
import SiteFooter from "@/components/SiteFooter";
import NightSky from "@/components/NightSky";


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
      
    </main>
  );
};

export default Index;
