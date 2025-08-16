export default function AboutSection() {
  return (
    <section id="chi-sono" className="container mx-auto py-10 md:py-14">
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Chi sono</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Sono un autore residente a Roma che scrive canzoni dove si incontrano poesia urbana, fragilità emotiva, critica sociale e linguaggio contemporaneo.
          </p>
          <p>
            I miei testi, spesso radicati nella cultura napoletana, attraversano l'intimo, il generazionale e il teatrale.
          </p>
          <p>
            Questo progetto è nato per essere ascoltato, ma anche preso, riletto, cantato da qualcun altro. La mia parte l'ho scritta. Ora cerco una voce vera che la porti nel mondo.
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-3">Contatti</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="mailto:giovanni.potenza.autore@gmail.com?subject=Donne che non dormono - Contatto&body=Ciao Giovanni,%0D%0A%0D%0AScrivo riguardo al progetto 'Donne che non dormono'..."
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                📧 Email
              </a>
              <a 
                href="https://wa.me/393276693629?text=Ciao%20Giovanni,%20scrivo%20riguardo%20al%20progetto%20'Donne%20che%20non%20dormono'..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
