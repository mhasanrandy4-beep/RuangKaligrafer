import { CreditPackages } from '../credit-packages';

export default function CreditPackagesExample() {
  const handlePurchase = (packageId: string) => {
    console.log('Purchased package:', packageId);
  };

  return (
    <div className="p-8 flex items-center justify-center">
      <CreditPackages onPurchase={handlePurchase} />
    </div>
  );
}
