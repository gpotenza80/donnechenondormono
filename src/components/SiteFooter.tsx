const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  console.log(`[Footer] Click su ${sectionId}`);
  
  const element = document.getElementById(sectionId);
  if (element) {
    console.log(`[Footer] Elemento trovato per ${sectionId}`);
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    console.error(`[Footer] Elemento con ID '${sectionId}' non trovato`);
  }
};

export default function SiteFooter() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} JackPot — Donne che non dormono</p>
        <nav className="flex items-center gap-4">
          <a 
            href="/"
            onClick={(e) => handleNavClick(e, 'ascolta')}
            className="hover:underline underline-offset-4 cursor-pointer transition-colors hover:text-foreground"
          >
            Ascolta
          </a>
          <a 
            href="/"
            onClick={(e) => handleNavClick(e, 'concept')}
            className="hover:underline underline-offset-4 cursor-pointer transition-colors hover:text-foreground"
          >
            Concept
          </a>
          <a 
            href="/"
            onClick={(e) => handleNavClick(e, 'chi-sono')}
            className="hover:underline underline-offset-4 cursor-pointer transition-colors hover:text-foreground"
          >
            Chi sono
          </a>
        </nav>
      </div>
    </footer>
  );
}
