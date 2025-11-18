import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Submission {
  id: string;
  date: string;
  status: "completed" | "in_review" | "pending";
  tutorName?: string;
  score?: number;
  feedback?: string;
}

interface ProgressTimelineProps {
  submissions: Submission[];
}

export function ProgressTimeline({ submissions }: ProgressTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-chart-3" />;
      case "in_review":
        return <Clock className="w-5 h-5 text-primary" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-chart-3 text-white">Selesai</Badge>;
      case "in_review":
        return <Badge className="bg-primary">Sedang Dikoreksi</Badge>;
      default:
        return <Badge variant="secondary">Menunggu</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Timeline Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          
          {submissions.map((submission, index) => (
            <div key={submission.id} className="relative pl-12" data-testid={`card-submission-${submission.id}`}>
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                {getStatusIcon(submission.status)}
              </div>
              
              <div className="bg-accent rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-sm text-muted-foreground">{submission.date}</p>
                  {getStatusBadge(submission.status)}
                </div>
                
                {submission.tutorName && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Tutor: </span>
                    <span className="font-medium">{submission.tutorName}</span>
                  </p>
                )}
                
                {submission.score !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Skor:</span>
                    <span className="text-2xl font-bold text-primary">{submission.score}/100</span>
                  </div>
                )}
                
                {submission.feedback && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">Feedback:</p>
                    <p className="text-sm">{submission.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
