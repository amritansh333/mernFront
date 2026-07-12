import { CheckCircle } from "lucide-react";
import type { MachineComponentProduct } from "@/types/machineComponent";

interface ProductSectionProps {
  product?: MachineComponentProduct;
}

export default function FeaturesSection({ product }: ProductSectionProps) {
  const features = product?.features?.length ? product.features : product?.keyFeatures ?? [];

  if (features.length === 0) return null;

  return (
    <section className="px-6 py-8 lg:px-10">
      <p className="section-label mb-2">Features</p>
      <h2 className="font-heading text-2xl mb-5">Key Highlights</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {features.filter(Boolean).map((feature) => (
          <div key={feature} className="flex gap-3 border border-divider bg-card p-4">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm text-charcoal-light">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
