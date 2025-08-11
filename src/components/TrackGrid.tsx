import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const soundcloudAlbumUrl = "https://on.soundcloud.com/EeW4KykuGF4zC6Y7no";

export default function TrackGrid() {
  const tracks = Array.from({ length: 8 }, (_, i) => i + 1);
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
            {tracks.map((n) => (
              <Card key={n} className="group">
                <CardHeader>
                  <CardTitle className="text-lg">Traccia {n}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ascolta su SoundCloud.
                  </p>
                </CardContent>
                <CardFooter>
                  <a
                    href={soundcloudAlbumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="secondary" className="w-full">
                      Apri su SoundCloud
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
