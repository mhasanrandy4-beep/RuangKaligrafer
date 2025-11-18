import { ProgressCard } from '../progress-card';

export default function ProgressCardExample() {
  return (
    <div className="p-8 max-w-2xl">
      <ProgressCard 
        totalSubmissions={24}
        correctionsReceived={18}
        averageScore={85}
        streakDays={7}
      />
    </div>
  );
}
