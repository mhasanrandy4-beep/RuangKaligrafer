import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface VideoCardProps {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  level: string;
}

export function VideoCard({ id, title, youtubeId, duration, level }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden" data-testid={`card-video-${id}`}>
          <div className="relative aspect-video bg-muted">
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
            <Badge className="absolute top-2 right-2 bg-background/90 text-foreground">
              {level}
            </Badge>
          </div>
          <CardHeader className="pb-3">
            <CardTitle className="text-base line-clamp-2">{title}</CardTitle>
          </CardHeader>
          <CardFooter className="pt-0 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
