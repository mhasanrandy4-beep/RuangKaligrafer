import { SubmitWorkForm } from "@/components/submit-work-form";
import { CreditPackages } from "@/components/credit-packages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";

export default function Submit() {
  //todo: remove mock functionality
  const currentCredits = 25;

  const handleSubmit = (file: File, tutorId: string) => {
    console.log('Submit work:', { file: file.name, tutorId });
  };

  const handlePurchase = (packageId: string) => {
    console.log('Purchase package:', packageId);
  };

  const recentSubmissions = [
    {
      id: "1",
      date: "15 Nov 2025",
      tutor: "Ustadz Ahmad",
      status: "in_review" as const
    },
    {
      id: "2",
      date: "12 Nov 2025",
      tutor: "Ustadzah Fatimah",
      status: "completed" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Submit Hasil Latihan</h1>
        <p className="text-muted-foreground">Kirim karya kaligrafi Anda untuk mendapat feedback dari tutor profesional</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SubmitWorkForm credits={currentCredits} onSubmit={handleSubmit} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kredit Anda</CardTitle>
              <CardDescription>Kelola kredit untuk submit latihan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Saldo Kredit</p>
                <p className="text-5xl font-bold text-primary mb-2">{currentCredits}</p>
                <p className="text-sm text-muted-foreground">kredit tersisa</p>
              </div>
              <CreditPackages onPurchase={handlePurchase} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Submission Terakhir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentSubmissions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between gap-2 p-3 bg-accent rounded-lg" data-testid={`card-recent-${sub.id}`}>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{sub.tutor}</p>
                    <p className="text-xs text-muted-foreground">{sub.date}</p>
                  </div>
                  {sub.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-chart-3" />
                  ) : (
                    <Clock className="w-5 h-5 text-primary" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
