import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const soundcloudAlbumUrl = "https://on.soundcloud.com/EeW4KykuGF4zC6Y7no";

const tracks = [
  {
    title: "DISCONNESSA",
    cover: "/lovable-uploads/5d957bbd-957a-414e-9bb0-a42e7c733d68.png",
    url: soundcloudAlbumUrl,
  },
  {
    title: "BAMBENÈLLA",
    cover: "/lovable-uploads/809f9868-c327-48a9-97ae-507c4f940dd2.png",
    url: soundcloudAlbumUrl,
  },
  {
    title: "Londra 2000",
    cover: "/lovable-uploads/a987e938-ebfb-45fc-a615-15783e121b2f.png",
    url: soundcloudAlbumUrl,
  },
  {
    title: "ADDÀ PASSÀ",
    cover: "/lovable-uploads/4d6c9b26-e1af-4cd8-83d1-67bdbfceffce.png",
    url: soundcloudAlbumUrl,
  },
  {
    title: "Le mie catene",
    cover: "/lovable-uploads/e25ec76a-2ce7-4235-b6b9-bc1b0baff516.png",
    url: soundcloudAlbumUrl,
  },
  {
    title: "Ja, fa’ pace cu mmè",
    cover: "/lovable-uploads/30e107ef-4697-4428-a8ce-21bc12f9b9b5.png",
    url: soundcloudAlbumUrl,
  },
  {
    title: "PENA",
    cover: "/lovable-uploads/798ab651-37e4-42bf-a8f5-85c339d070de.png",
    url: soundcloudAlbumUrl,
  },
  {
    title: "Donne che non dormono",
    cover: "/lovable-uploads/bb3417b8-b4b4-4aa5-af08-e9faf1fa9ae6.png",
    url: soundcloudAlbumUrl,
  },
] as const;

export default function TrackGrid() {
  const scEncoded = encodeURIComponent(soundcloudAlbumUrl);

  return (
    <section id="ascolta" className="container mx-auto py-16 md:py-24">
      <div className="grid gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Ascolta l’album</h2>
          <div className="rounded-xl overflow-hidden border bg-card">
            <iframe
              title="SoundCloud Player — Donne che non dormono"
              width="100%"
              height="360"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${scEncoded}&auto_play=false&show_teaser=true&show_comments=false`}
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Tracce</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((t, idx) => (
              <Card key={t.title} className="group">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={t.cover}
                      alt={`Copertina brano ${t.title} — Donne che non dormono`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="text-base">{String(idx + 1).padStart(2, "0")} — {t.title}</CardTitle>
                </CardContent>
                <CardFooter>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="secondary" className="w-full">
                      Ascolta su SoundCloud
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
