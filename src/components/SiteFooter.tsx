const scrollToSection = (sectionId: string) => {
  console.log(`[Footer] Tentativo scroll a: ${sectionId}`);
  
  const element = document.getElementById(sectionId);
  if (element) {
    console.log(`[Footer] Elemento trovato:`, element);
    
    // Prova entrambi i metodi
    try {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      console.log(`[Footer] ScrollIntoView eseguito per ${sectionId}`);
    } catch (error) {
      console.error(`[Footer] Errore scrollIntoView:`, error);
      // Fallback
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  } else {
    console.error(`[Footer] Elemento con ID '${sectionId}' non trovato`);
    console.log('[Footer] Elementi disponibili:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
  }
};

export default function SiteFooter() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} JackPot — Donne che non dormono</p>
        <nav className="flex items-center gap-4">
          <button 
            onClick={() => {
              console.log('[Footer] Click su Ascolta');
              scrollToSection('ascolta');
            }}
            className="hover:underline underline-offset-4 cursor-pointer transition-colors hover:text-foreground"
          >
            Ascolta
          </button>
          <button 
            onClick={() => {
              console.log('[Footer] Click su Concept');
              scrollToSection('concept');
            }}
            className="hover:underline underline-offset-4 cursor-pointer transition-colors hover:text-foreground"
          >
            Concept
          </button>
          <button 
            onClick={() => {
              console.log('[Footer] Click su Chi sono');
              scrollToSection('chi-sono');
            }}
            className="hover:underline underline-offset-4 cursor-pointer transition-colors hover:text-foreground"
          >
            Chi sono
          </button>
        </nav>
      </div>
    </footer>
  );
}
