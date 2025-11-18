import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  totalSubmissions: number;
  correctionsReceived: number;
  averageScore: number;
  streakDays: number;
}

export function ProgressCard({ totalSubmissions, correctionsReceived, averageScore, streakDays }: ProgressCardProps) {
  const completionRate = totalSubmissions > 0 ? (correctionsReceived / totalSubmissions) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Ringkasan Progress Anda</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - completionRate / 100)}`}
                className="text-primary"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-primary" data-testid="text-completion-rate">{completionRate.toFixed(0)}%</span>
              <span className="text-xs text-muted-foreground">Selesai</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-accent rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Submit</p>
            <p className="text-2xl font-bold" data-testid="text-total-submissions">{totalSubmissions}</p>
          </div>
          <div className="bg-accent rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Koreksi Diterima</p>
            <p className="text-2xl font-bold text-primary" data-testid="text-corrections-received">{correctionsReceived}</p>
          </div>
          <div className="bg-accent rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Rata-rata Skor</p>
            <p className="text-2xl font-bold" data-testid="text-average-score">{averageScore}/100</p>
          </div>
          <div className="bg-accent rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Streak Hari</p>
            <p className="text-2xl font-bold text-chart-2" data-testid="text-streak-days">{streakDays}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
