import ApplicationsSection from "@/components/machine-components/ApplicationsSection";
import DownloadsSection from "@/components/machine-components/DownloadsSection";
import FeaturesSection from "@/components/machine-components/FeaturesSection";
import HeroSection from "@/components/machine-components/HeroSection";
import SpecificationsSection from "@/components/machine-components/SpecificationsSection";
import type { MachineComponentProduct } from "@/types/machineComponent";

interface ProductRendererProps {
  product?: MachineComponentProduct;
}

export default function ProductRenderer({ product }: ProductRendererProps) {
  return (
    <>
      <HeroSection product={product} />
      <FeaturesSection product={product} />
      <SpecificationsSection product={product} />
      <ApplicationsSection product={product} />
      <DownloadsSection product={product} />
    </>
  );
}
