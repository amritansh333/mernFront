

import ApplicationsSection from "@/components/machine-components/ApplicationsSection";
import SpecificationsSection from "@/components/machine-components/SpecificationsSection";
import HeroSection from "@/components/machine-components/HeroSection";
import ProductCardsSection from "@/components/machine-components/ProductCardsSection";

import type {
  MachineComponentDownload,
  MachineComponentProduct,
  MachineComponentValue,
  MachineSidebarNode,
} from "@/types/machineComponent";

interface ProductRendererProps {
  product?: MachineComponentProduct;
  products?: Record<string, MachineComponentProduct>;
  sidebar?: MachineSidebarNode[];
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

function hasSpecifications(
  specifications?: Record<string, MachineComponentValue>,
) {
  return Boolean(
    specifications &&
      Object.values(specifications).some((value) => {
        if (Array.isArray(value)) return value.some(Boolean);
        return value !== null && value !== undefined && value !== "";
      }),
  );
}

function getDownloads(
  product?: MachineComponentProduct,
): MachineComponentDownload[] {
  return (
    product?.downloads ??
    product?.machineComponentData?.downloads ??
    []
  );
}

export default function ProductRenderer({
  product,
  products,
  sidebar,
}: ProductRendererProps) {
  const description = normalizeTextList(product?.description);

  const machineApplications = normalizeStringList(
    product?.machineComponentData?.applications,
  );

  const applications =
    machineApplications.length > 0
      ? machineApplications
      : normalizeStringList(product?.applications);

  const machineSpecifications =
    product?.machineComponentData?.specifications;

  

  const downloads = getDownloads(product);
  const isLandingPage =
  product?.slug === "thermoplastics-machine-components";

const specifications =
  machineSpecifications ?? product?.specifications;

  const landingProducts = [
  {
    name: "Strips and Profiles",
    slug: "strips-and-profiles",
    path: "/products/thermoplastics-machine-components/strips-and-profiles",
    image: "/uploads/subcategories/strips-and-profiles.jpeg",
    description: [
      "Precision engineered thermoplastic strips and profiles for industrial applications.",
    ],
  },
  {
    name: "Vacuum Formed Plastic Parts",
    slug: "vacuum-formed-plastic-parts",
    path: "/products/thermoplastics-machine-components/vacuum-formed-plastic-parts",
    image: "/uploads/subcategories/vacuum-formed-plastic-parts.jpeg",
    description: [
      "High-quality vacuum formed plastic components manufactured for demanding industries.",
    ],
  },
  {
    name: "Cutting Board",
    slug: "cutting-board",
    path: "/products/thermoplastics-machine-components/cutting-board",
    image: "/uploads/subcategories/cutting-board.jpeg",
    description: [
      "Engineering plastic cutting board solutions for food and industrial applications.",
    ],
  },
  {
    name: "Chopping Board",
    slug: "chopping-board",
    path: "/products/thermoplastics-machine-components/chopping-board",
    image: "/uploads/subcategories/chopping-board.jpeg",
    description: [
      "Premium chopping board range offering hygiene, durability and long service life.",
    ],
  },
  {
    name: "Application Ready Sheets",
    slug: "application-ready-sheets",
    path: "/products/thermoplastics-machine-components/application-ready-sheets",
    image: "/uploads/subcategories/application-ready-sheets.jpeg",
    description: [
      "Ready-to-use engineering plastic sheet solutions for multiple industries.",
    ],
  },
  {
    name: "Machined Plastic Parts",
    slug: "machined-plastic-parts",
    path: "/products/thermoplastics-machine-components/machined-plastic-parts",
    image: "/uploads/subcategories/machined-plastic-parts.jpeg",
    description: [
      "Precision machined engineering plastic parts manufactured to customer drawings.",
    ],
  },
  {
    name: "Pads",
    slug: "pads",
    path: "/products/thermoplastics-machine-components/pads",
    image: "/uploads/subcategories/pads.jpeg",
    description: [
      "Industrial engineering plastic pads for wear resistance and support applications.",
    ],
  },
  {
    name: "POP",
    slug: "pop",
    path: "/products/thermoplastics-machine-components/pop",
    image: "/uploads/subcategories/pop.jpeg",
    description: [
      "Specialized POP engineering plastic products for industrial applications.",
    ],
  },
  {
    name: "Pipes",
    slug: "pipes",
    path: "/products/thermoplastics-machine-components/pipes",
    image: "/uploads/subcategories/pipes.jpeg",
    description: [
      "Engineering thermoplastic pipe solutions with excellent chemical resistance.",
    ],
  },
  {
    name: "Precision Machined Plastic Parts",
    slug: "precision-machined-plastic-parts",
    path: "/products/thermoplastics-machine-components/precision-machined-plastic-parts",
    image: "/uploads/subcategories/precision-machined-plastic-parts.jpeg",
    description: [
      "High precision machined plastic components manufactured for critical applications.",
    ],
  },
];

  const showFullInformation = false;

  return (
  <>
    <HeroSection
      title={product?.name}
      description={description}
      image={product?.image}
      features={normalizeStringList(product?.keyFeatures)}
      downloads={downloads}
    />

    

    {/* Landing page only */}
{/* Landing page only */}
{isLandingPage && (
  <>
    <ProductCardsSection products={landingProducts} />

    <ApplicationsSection applications={applications} />

    <SpecificationsSection specifications={specifications} />
  </>
)}

{/* Existing product logic - unchanged */}
{showFullInformation && !isLandingPage && (
  <>
    <ApplicationsSection applications={applications} />
  </>
)}
  </>
);
}