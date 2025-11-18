import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface MotivationCardProps {
  quote: string;
  author: string;
}

export function MotivationCard({ quote, author }: MotivationCardProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/20">
      <CardContent className="p-8 text-center">
        <Quote className="w-8 h-8 text-primary mx-auto mb-4" />
        <p className="font-serif text-xl md:text-2xl mb-4 leading-relaxed" data-testid="text-quote">
          "{quote}"
        </p>
        <p className="text-sm text-muted-foreground" data-testid="text-author">— {author}</p>
      </CardContent>
    </Card>
  );
}
