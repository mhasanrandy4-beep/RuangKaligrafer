import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Trophy, Users, Video } from "lucide-react";
import logoUrl from "@assets/Mask group (1)_1763435994353.png";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Ruang Kaligrafer" className="w-12 h-12 rounded-full" />
            <h1 className="font-serif text-2xl font-bold text-primary">Ruang Kaligrafer</h1>
          </div>
          <Button asChild size="lg" data-testid="button-login">
            <a href="/api/login">Masuk / Daftar</a>
          </Button>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Kuasai Seni <span className="text-primary">Kaligrafi</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Platform pembelajaran kaligrafi dengan tutor profesional, video pembelajaran berkualitas, dan sistem tracking progress yang komprehensif
            </p>
            <Button asChild size="lg" className="text-lg px-8" data-testid="button-get-started">
              <a href="/api/login">Mulai Belajar Gratis</a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">30 kredit gratis untuk siswa baru!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Video Pembelajaran</h3>
                <p className="text-sm text-muted-foreground">
                  Akses video tutorial dari pemula hingga lanjutan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Tutor Profesional</h3>
                <p className="text-sm text-muted-foreground">
                  Dapatkan feedback dari kaligrafer berpengalaman
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Tracking Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Pantau perkembangan belajar dengan detail
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Leaderboard</h3>
                <p className="text-sm text-muted-foreground">
                  Berkompetisi dengan siswa lain dan raih ranking
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-2xl p-12 text-center border border-primary/20">
            <h3 className="font-serif text-3xl font-bold mb-4">
              Siap Memulai Perjalanan Kaligrafi Anda?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Bergabunglah dengan ribuan siswa yang sudah meningkatkan kemampuan kaligrafi mereka
            </p>
            <Button asChild size="lg" className="text-lg px-8" data-testid="button-join-now">
              <a href="/api/login">Daftar Sekarang</a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Ruang Kaligrafer. Platform Pembelajaran Kaligrafi Terbaik.</p>
        </div>
      </footer>
    </div>
  );
}
