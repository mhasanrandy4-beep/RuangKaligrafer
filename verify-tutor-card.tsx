import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Mail, Phone } from "lucide-react";

interface TutorApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  specialization: string;
  avatar?: string;
}

interface VerifyTutorCardProps {
  tutor: TutorApplication;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function VerifyTutorCard({ tutor, onApprove, onReject }: VerifyTutorCardProps) {
  return (
    <Card data-testid={`card-tutor-${tutor.id}`}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={tutor.avatar} />
            <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle>{tutor.name}</CardTitle>
            <Badge className="mt-1">{tutor.specialization}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span>{tutor.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{tutor.phone}</span>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground mb-1">Pengalaman:</p>
          <p className="text-sm">{tutor.experience}</p>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => {
            onReject(tutor.id);
            console.log('Reject tutor:', tutor.id);
          }}
          data-testid={`button-reject-${tutor.id}`}
        >
          <XCircle className="w-4 h-4 mr-2" />
          Tolak
        </Button>
        <Button 
          className="flex-1"
          onClick={() => {
            onApprove(tutor.id);
            console.log('Approve tutor:', tutor.id);
          }}
          data-testid={`button-approve-${tutor.id}`}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Terima
        </Button>
      </CardFooter>
    </Card>
  );
}
