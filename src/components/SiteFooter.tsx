const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function SiteFooter() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} JackPot — Donne che non dormono</p>
        <nav className="flex items-center gap-4">
          <button 
            onClick={() => scrollToSection('ascolta')}
            className="hover:underline underline-offset-4 cursor-pointer"
          >
            Ascolta
          </button>
          <button 
            onClick={() => scrollToSection('concept')}
            className="hover:underline underline-offset-4 cursor-pointer"
          >
            Concept
          </button>
          <button 
            onClick={() => scrollToSection('chi-sono')}
            className="hover:underline underline-offset-4 cursor-pointer"
          >
            Chi sono
          </button>
        </nav>
      </div>
    </footer>
  );
}
