import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SubmitWorkFormProps {
  credits: number;
  onSubmit: (file: File, tutorId: string) => void;
}

export function SubmitWorkForm({ credits, onSubmit }: SubmitWorkFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const tutors = [
    { id: "1", name: "Ustadz Ahmad - Khat Naskhi" },
    { id: "2", name: "Ustadzah Fatimah - Khat Tsulutsi" },
    { id: "3", name: "Ustadz Ibrahim - Khat Diwani" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile && selectedTutor) {
      onSubmit(selectedFile, selectedTutor);
      console.log('Submit work triggered:', { file: selectedFile.name, tutor: selectedTutor });
    }
  };

  const canSubmit = selectedFile && selectedTutor && credits >= 5;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Submit Hasil Latihan</CardTitle>
        <CardDescription>Upload karya kaligrafi Anda untuk mendapatkan feedback dari tutor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {credits < 5 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Kredit Anda tidak cukup. Anda memerlukan minimal 5 kredit untuk submit.
            </AlertDescription>
          </Alert>
        )}

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover-elevate cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()} data-testid="input-file-upload">
          <input 
            id="file-upload"
            type="file" 
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
          {preview ? (
            <div className="space-y-4">
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
              <p className="text-sm text-muted-foreground">{selectedFile?.name}</p>
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setPreview(null); }} data-testid="button-remove-file">
                Hapus File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <p className="font-semibold">Klik untuk upload gambar</p>
                <p className="text-sm text-muted-foreground">Format: JPG, JPEG, PNG</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Pilih Tutor</label>
          <Select value={selectedTutor} onValueChange={setSelectedTutor}>
            <SelectTrigger data-testid="select-tutor">
              <SelectValue placeholder="Pilih tutor untuk koreksi" />
            </SelectTrigger>
            <SelectContent>
              {tutors.map((tutor) => (
                <SelectItem key={tutor.id} value={tutor.id}>
                  {tutor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Biaya Submit</p>
            <p className="text-2xl font-bold text-primary">-5 Kredit</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Kredit Tersisa</p>
            <p className="text-2xl font-bold">{credits - 5} Kredit</p>
          </div>
        </div>

        <Button 
          className="w-full" 
          size="lg"
          disabled={!canSubmit}
          onClick={handleSubmit}
          data-testid="button-submit-work"
        >
          {canSubmit ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Submit untuk Koreksi
            </>
          ) : (
            "Lengkapi form untuk submit"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
