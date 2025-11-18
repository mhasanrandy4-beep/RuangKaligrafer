import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
  bonus?: number;
}

interface CreditPackagesProps {
  onPurchase: (packageId: string) => void;
}

export function CreditPackages({ onPurchase }: CreditPackagesProps) {
  const packages: CreditPackage[] = [
    { id: "basic", credits: 10, price: 10000 },
    { id: "standard", credits: 25, price: 22000, popular: true, bonus: 3 },
    { id: "premium", credits: 50, price: 40000, bonus: 10 },
    { id: "ultimate", credits: 100, price: 75000, bonus: 25 },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" data-testid="button-buy-credits">
          Beli Kredit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Paket Kredit</DialogTitle>
          <DialogDescription>
            Pilih paket kredit yang sesuai dengan kebutuhan belajar Anda
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative ${pkg.popular ? 'border-primary border-2' : ''}`}
              data-testid={`card-package-${pkg.id}`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Paling Populer
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">
                  {pkg.credits + (pkg.bonus || 0)} Kredit
                </CardTitle>
                {pkg.bonus && (
                  <p className="text-sm text-center text-primary">
                    {pkg.credits} + {pkg.bonus} bonus
                  </p>
                )}
                <CardDescription className="text-center text-2xl font-bold mt-2">
                  Rp {pkg.price.toLocaleString('id-ID')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{pkg.credits} kredit untuk submit</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Koreksi dari tutor profesional</span>
                </div>
                {pkg.bonus && (
                  <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                    <Check className="w-4 h-4" />
                    <span>Bonus {pkg.bonus} kredit gratis!</span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={pkg.popular ? "default" : "outline"}
                  onClick={() => {
                    onPurchase(pkg.id);
                    console.log('Purchase package:', pkg.id);
                  }}
                  data-testid={`button-buy-${pkg.id}`}
                >
                  Beli Paket
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
