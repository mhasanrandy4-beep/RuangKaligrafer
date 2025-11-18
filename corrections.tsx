import { TutorCorrectionCard } from "@/components/tutor-correction-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Corrections() {
  //todo: remove mock functionality
  const pendingWorks = [
    {
      id: "1",
      studentName: "Ahmad Rizki",
      submittedDate: "2 jam yang lalu",
      imageUrl: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      studentName: "Fatimah Zahra",
      submittedDate: "5 jam yang lalu",
      imageUrl: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop"
    }
  ];

  const handleDownload = (id: string) => {
    console.log('Download work:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit work:', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Koreksi Siswa</h1>
        <p className="text-muted-foreground">Berikan feedback kepada siswa untuk meningkatkan kemampuan mereka</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" data-testid="tab-pending">Menunggu ({pendingWorks.length})</TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed">Selesai</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingWorks.map((work) => (
              <TutorCorrectionCard 
                key={work.id}
                work={work}
                onDownload={handleDownload}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <p className="text-center text-muted-foreground py-12">Belum ada koreksi yang diselesaikan</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
