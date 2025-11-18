import { ProgressCard } from "@/components/progress-card";
import { TipsCarousel } from "@/components/tips-carousel";
import { MotivationCard } from "@/components/motivation-card";
import { useQuery } from "@tanstack/react-query";
import type { Submission } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  
  const { data: submissions = [] } = useQuery<Submission[]>({
    queryKey: ["/api/submissions/student"],
    enabled: !!user,
  });

  const tips = [
    {
      id: 1,
      title: "Konsistensi adalah Kunci",
      content: "Latihan 15-30 menit setiap hari lebih efektif daripada latihan panjang sesekali. Buatlah jadwal harian untuk berlatih kaligrafi."
    },
    {
      id: 2,
      title: "Perhatikan Postur Tubuh",
      content: "Duduk tegak dengan kaki menapak rata di lantai untuk kontrol pena yang lebih baik. Posisi yang benar mencegah kelelahan."
    },
    {
      id: 3,
      title: "Mulai dengan Lambat",
      content: "Fokus pada akurasi bentuk huruf sebelum meningkatkan kecepatan tulisan. Kecepatan akan datang dengan sendirinya."
    },
    {
      id: 4,
      title: "Pelajari Proporsi",
      content: "Setiap huruf memiliki proporsi yang ideal. Gunakan garis bantu untuk menjaga konsistensi tinggi dan lebar huruf."
    }
  ];

  const totalSubmissions = submissions.length;
  const correctionsReceived = submissions.filter(s => s.status === "completed").length;
  const completedSubmissions = submissions.filter(s => s.status === "completed" && s.score);
  const averageScore = completedSubmissions.length > 0
    ? Math.round(completedSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / completedSubmissions.length)
    : 0;
  
  // Calculate streak (simplified - just count consecutive days with submissions)
  const streakDays = 7; // TODO: Implement actual streak calculation

  const userName = user?.firstName || "Kaligrafer";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Selamat Datang Kembali, {userName}!</h1>
        <p className="text-muted-foreground">Lanjutkan perjalanan belajar kaligrafi Anda hari ini</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProgressCard 
            totalSubmissions={totalSubmissions}
            correctionsReceived={correctionsReceived}
            averageScore={averageScore}
            streakDays={streakDays}
          />
          <TipsCarousel tips={tips} />
        </div>
        
        <div className="space-y-6">
          <MotivationCard 
            quote="Kaligrafi adalah seni kesabaran. Setiap goresan adalah meditasi, setiap huruf adalah doa."
            author="Master Kaligrafer"
          />
        </div>
      </div>
    </div>
  );
}
