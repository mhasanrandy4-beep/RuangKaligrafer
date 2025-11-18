import { ProgressTimeline } from '../progress-timeline';

export default function ProgressTimelineExample() {
  const submissions = [
    {
      id: "1",
      date: "18 Nov 2025",
      status: "completed" as const,
      tutorName: "Ustadz Ahmad",
      score: 85,
      feedback: "Sangat bagus! Perhatikan ketebalan garis pada huruf 'ain'."
    },
    {
      id: "2",
      date: "15 Nov 2025",
      status: "in_review" as const,
      tutorName: "Ustadzah Fatimah",
    },
    {
      id: "3",
      date: "12 Nov 2025",
      status: "completed" as const,
      tutorName: "Ustadz Ahmad",
      score: 78,
      feedback: "Proporsi sudah lebih baik, teruskan!"
    },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <ProgressTimeline submissions={submissions} />
    </div>
  );
}
