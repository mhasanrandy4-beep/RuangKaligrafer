import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Download, Edit } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CorrectionWork {
  id: string;
  studentName: string;
  submittedDate: string;
  imageUrl: string;
}

interface TutorCorrectionCardProps {
  work: CorrectionWork;
  onDownload: (id: string) => void;
  onEdit: (id: string) => void;
}

export function TutorCorrectionCard({ work, onDownload, onEdit }: TutorCorrectionCardProps) {
  return (
    <Card data-testid={`card-correction-${work.id}`}>
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{work.studentName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{work.studentName}</CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {work.submittedDate}
              </p>
            </div>
          </div>
          <Badge>Menunggu Koreksi</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg overflow-hidden">
          <img 
            src={work.imageUrl} 
            alt={`Karya ${work.studentName}`}
            className="w-full h-64 object-contain"
          />
        </div>
      </CardContent>
      <CardFooter className="gap-2 flex-wrap">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => {
            onDownload(work.id);
            console.log('Download work:', work.id);
          }}
          data-testid={`button-download-${work.id}`}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button 
          className="flex-1"
          onClick={() => {
            onEdit(work.id);
            console.log('Edit work:', work.id);
          }}
          data-testid={`button-edit-${work.id}`}
        >
          <Edit className="w-4 h-4 mr-2" />
          Koreksi di App
        </Button>
      </CardFooter>
    </Card>
  );
}
