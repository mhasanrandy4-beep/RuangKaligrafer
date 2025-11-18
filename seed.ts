import { db } from "./db";
import { videos } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Insert sample videos
  const sampleVideos = [
    {
      title: "Dasar-dasar Kaligrafi Arab untuk Pemula",
      youtubeId: "dQw4w9WgXcQ",
      duration: "15:30",
      level: "Pemula",
      order: 1
    },
    {
      title: "Teknik Khat Naskhi - Bagian 1",
      youtubeId: "dQw4w9WgXcQ",
      duration: "22:15",
      level: "Pemula",
      order: 2
    },
    {
      title: "Menguasai Khat Tsulutsi",
      youtubeId: "dQw4w9WgXcQ",
      duration: "28:45",
      level: "Menengah",
      order: 3
    },
    {
      title: "Kaligrafi Diwani untuk Tingkat Lanjut",
      youtubeId: "dQw4w9WgXcQ",
      duration: "35:20",
      level: "Lanjutan",
      order: 4
    },
    {
      title: "Komposisi dan Layout Kaligrafi",
      youtubeId: "dQw4w9WgXcQ",
      duration: "18:50",
      level: "Menengah",
      order: 5
    },
    {
      title: "Teknik Pewarnaan dan Dekorasi",
      youtubeId: "dQw4w9WgXcQ",
      duration: "25:10",
      level: "Lanjutan",
      order: 6
    }
  ];

  await db.insert(videos).values(sampleVideos).onConflictDoNothing();

  console.log("Seeding completed!");
}

seed().catch(console.error).finally(() => process.exit(0));
