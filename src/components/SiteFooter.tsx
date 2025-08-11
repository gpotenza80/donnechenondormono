export default function SiteFooter() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} JackPot — Donne che non dormono</p>
        <nav className="flex items-center gap-4">
          <a className="hover:underline underline-offset-4" href="#ascolta">Ascolta</a>
          <a className="hover:underline underline-offset-4" href="#concept">Concept</a>
          <a className="hover:underline underline-offset-4" href="#chi-sono">Chi sono</a>
        </nav>
      </div>
    </footer>
  );
}
