export default function PressSection() {
  return (
    <section id="press" className="container mx-auto py-16 md:py-24">
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Press Kit</h2>
        <p className="text-muted-foreground">
          Materiali stampa e approfondimenti su "Donne che non dormono".
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className="underline underline-offset-4"
            href="https://www.dropbox.com/scl/fi/z879i20bcwo5xqau2cp88/PRESS-KIT.docx?rlkey=8p41e2bxg7b7nlywf1zwdr9sk&st=azsiaqqh&dl=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            PRESS-KIT.docx
          </a>
          <a
            className="underline underline-offset-4"
            href="https://www.dropbox.com/scl/fi/rdagdfvgz0kjg8zych7gb/Press_Kit_Donne_Che_Non_Dormono.pdf?rlkey=aejbp395vd4nkk7bebqgip8tb&st=72q6duc1&dl=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Press_Kit_Donne_Che_Non_Dormono.pdf
          </a>
        </div>
      </div>
    </section>
  );
}
