import { TutorCorrectionCard } from '../tutor-correction-card';

export default function TutorCorrectionCardExample() {
  const work = {
    id: "1",
    studentName: "Ahmad Rizki",
    submittedDate: "2 jam yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop"
  };

  const handleDownload = (id: string) => {
    console.log('Download:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit:', id);
  };

  return (
    <div className="p-8 max-w-md">
      <TutorCorrectionCard 
        work={work}
        onDownload={handleDownload}
        onEdit={handleEdit}
      />
    </div>
  );
}
