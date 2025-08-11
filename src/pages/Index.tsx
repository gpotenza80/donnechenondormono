import AlbumHero from "@/components/AlbumHero";
import ConceptSection from "@/components/ConceptSection";
import TrackGrid from "@/components/TrackGrid";
import AboutSection from "@/components/PressSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <main id="top" className="min-h-screen bg-background">
      <AlbumHero />
      <ConceptSection />
      <TrackGrid />
      <AboutSection />
      <SiteFooter />
    </main>
  );
};

export default Index;
