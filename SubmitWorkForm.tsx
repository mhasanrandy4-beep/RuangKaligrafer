import { SubmitWorkForm } from '../submit-work-form';

export default function SubmitWorkFormExample() {
  const handleSubmit = (file: File, tutorId: string) => {
    console.log('Submitted:', { file: file.name, tutorId });
  };

  return (
    <div className="p-8 max-w-2xl">
      <SubmitWorkForm credits={25} onSubmit={handleSubmit} />
    </div>
  );
}
