import { VideoCard } from "@/components/video-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Video } from "@shared/schema";

export default function Videos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const { data: allVideos = [] } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const videos = allVideos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = levelFilter === "all" || video.level.toLowerCase() === levelFilter.toLowerCase();
      return matchesSearch && matchesLevel;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Video Pembelajaran</h1>
        <p className="text-muted-foreground">Pelajari teknik kaligrafi dari video tutorial berkualitas</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Cari video..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-videos"
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[200px]" data-testid="select-level-filter">
            <SelectValue placeholder="Semua Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Level</SelectItem>
            <SelectItem value="pemula">Pemula</SelectItem>
            <SelectItem value="menengah">Menengah</SelectItem>
            <SelectItem value="lanjutan">Lanjutan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}
