import ApplicationsSection from "@/components/machine-components/ApplicationsSection";
import DownloadsSection from "@/components/machine-components/DownloadsSection";
import HeroSection from "@/components/machine-components/HeroSection";
import SpecificationsSection from "@/components/machine-components/SpecificationsSection";
import type {
  MachineComponentDownload,
  MachineComponentProduct,
  MachineComponentValue,
} from "@/types/machineComponent";

interface ProductRendererProps {
  product?: MachineComponentProduct;
}

function normalizeTextList(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim());
  }

  return typeof value === "string" && value.trim() ? [value] : [];
}

function normalizeStringList(value?: string[]) {
  return value?.filter((item) => typeof item === "string" && item.trim()) ?? [];
}

function hasSpecifications(specifications?: Record<string, MachineComponentValue>) {
  return Boolean(
    specifications &&
      Object.values(specifications).some((value) => {
        if (Array.isArray(value)) return value.some(Boolean);
        return value !== null && value !== undefined && value !== "";
      }),
  );
}

function getDownloads(product?: MachineComponentProduct): MachineComponentDownload[] {
  return product?.machineComponentData?.downloads ?? [];
}

export default function ProductRenderer({ product }: ProductRendererProps) {
  const description = normalizeTextList(product?.description);
  const machineApplications = normalizeStringList(product?.machineComponentData?.applications);
  const applications =
    machineApplications.length > 0 ? machineApplications : normalizeStringList(product?.applications);
  const machineSpecifications = product?.machineComponentData?.specifications;
  const specifications = hasSpecifications(machineSpecifications)
    ? machineSpecifications
    : product?.specifications;
  const downloads = getDownloads(product);

  return (
    <>
      <HeroSection
  title={product?.name}
  description={description}
  image={product?.image}
  features={normalizeStringList(product?.keyFeatures)}
  downloads={downloads}
/>
      
      <SpecificationsSection specifications={specifications} />
      <ApplicationsSection applications={applications} />
      <DownloadsSection downloads={downloads} />
    </>
  );
}
