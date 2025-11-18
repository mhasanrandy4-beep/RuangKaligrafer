import { VerifyTutorCard } from '../verify-tutor-card';

export default function VerifyTutorCardExample() {
  const tutor = {
    id: "1",
    name: "Ustadz Ahmad Fauzi",
    email: "ahmad.fauzi@email.com",
    phone: "+62 812-3456-7890",
    experience: "10 tahun mengajar kaligrafi Arab, bersertifikat dari Al-Azhar University",
    specialization: "Khat Naskhi & Tsulutsi"
  };

  const handleApprove = (id: string) => {
    console.log('Approved:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejected:', id);
  };

  return (
    <div className="p-8 max-w-md">
      <VerifyTutorCard 
        tutor={tutor}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
