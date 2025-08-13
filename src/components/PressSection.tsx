export default function AboutSection() {
  return (
    <section id="chi-sono" className="container mx-auto py-10 md:py-14">
      <div className="max-w-3xl space-y-6">
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
          <a 
            href="mailto:giovanni.potenza.autore@gmail.com"
            className="text-foreground hover:underline underline-offset-4"
          >
            giovanni.potenza.autore@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
