import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Lightbulb } from "lucide-react";

interface Tip {
  id: number;
  title: string;
  content: string;
}

interface TipsCarouselProps {
  tips: Tip[];
}

export function TipsCarousel({ tips }: TipsCarouselProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="font-serif font-semibold text-lg">Tips & Trik Belajar</h3>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {tips.map((tip) => (
              <CarouselItem key={tip.id}>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 min-h-[120px]" data-testid={`card-tip-${tip.id}`}>
                  <h4 className="font-semibold mb-2 text-primary">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.content}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
