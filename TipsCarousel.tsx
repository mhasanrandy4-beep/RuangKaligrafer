import { TipsCarousel } from '../tips-carousel';

export default function TipsCarouselExample() {
  const tips = [
    {
      id: 1,
      title: "Konsistensi adalah Kunci",
      content: "Latihan 15-30 menit setiap hari lebih efektif daripada latihan panjang sesekali."
    },
    {
      id: 2,
      title: "Perhatikan Postur Tubuh",
      content: "Duduk tegak dengan kaki menapak rata di lantai untuk kontrol pena yang lebih baik."
    },
    {
      id: 3,
      title: "Mulai dengan Lambat",
      content: "Fokus pada akurasi bentuk huruf sebelum meningkatkan kecepatan tulisan."
    }
  ];

  return (
    <div className="p-8 max-w-2xl">
      <TipsCarousel tips={tips} />
    </div>
  );
}
