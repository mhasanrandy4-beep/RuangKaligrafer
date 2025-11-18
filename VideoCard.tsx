import { VideoCard } from '../video-card';

export default function VideoCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <VideoCard 
        id="1"
        title="Dasar-dasar Kaligrafi Arab untuk Pemula"
        youtubeId="dQw4w9WgXcQ"
        duration="15:30"
        level="Pemula"
      />
    </div>
  );
}
