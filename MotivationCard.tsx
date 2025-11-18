import { MotivationCard } from '../motivation-card';

export default function MotivationCardExample() {
  return (
    <div className="p-8 max-w-2xl">
      <MotivationCard 
        quote="Kaligrafi adalah seni kesabaran. Setiap goresan adalah meditasi, setiap huruf adalah doa."
        author="Master Kaligrafer"
      />
    </div>
  );
}
