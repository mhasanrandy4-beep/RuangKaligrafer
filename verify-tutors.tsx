import { VerifyTutorCard } from "@/components/verify-tutor-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VerifyTutors() {
  //todo: remove mock functionality
  const pendingTutors = [
    {
      id: "1",
      name: "Ustadz Ahmad Fauzi",
      email: "ahmad.fauzi@email.com",
      phone: "+62 812-3456-7890",
      experience: "10 tahun mengajar kaligrafi Arab, bersertifikat dari Al-Azhar University",
      specialization: "Khat Naskhi & Tsulutsi"
    },
    {
      id: "2",
      name: "Ustadzah Siti Nurhaliza",
      email: "siti.nurhaliza@email.com",
      phone: "+62 813-9876-5432",
      experience: "7 tahun mengajar kaligrafi, lulusan Institut Seni Islam Jakarta",
      specialization: "Khat Diwani"
    }
  ];

  const handleApprove = (id: string) => {
    console.log('Approved tutor:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejected tutor:', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Verifikasi Tutor</h1>
        <p className="text-muted-foreground">Kelola aplikasi tutor dan verifikasi kredensial mereka</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" data-testid="tab-pending-tutors">Menunggu ({pendingTutors.length})</TabsTrigger>
          <TabsTrigger value="approved" data-testid="tab-approved-tutors">Disetujui</TabsTrigger>
          <TabsTrigger value="rejected" data-testid="tab-rejected-tutors">Ditolak</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingTutors.map((tutor) => (
              <VerifyTutorCard 
                key={tutor.id}
                tutor={tutor}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <p className="text-center text-muted-foreground py-12">Belum ada tutor yang disetujui</p>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <p className="text-center text-muted-foreground py-12">Belum ada tutor yang ditolak</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
