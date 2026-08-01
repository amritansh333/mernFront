import { Link } from "react-router-dom";
import {
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import ApplicationsSection from "@/components/machine-components/ApplicationsSection";
import DownloadsSection from "@/components/machine-components/DownloadsSection";
import HeroSection from "@/components/machine-components/HeroSection";

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
      {/* ================= PREMIUM LOCK SECTION ================= */}

      {/* ================= PREMIUM GLASS CTA ================= */}

<section className="relative -mt-6 overflow-hidden bg-[#EDF8FD]">
  {/* Glass Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/55 via-[#F5FBFE]/35 to-[#DDF2FA]/55 backdrop-blur-xl" />

  {/* Soft Blobs */}
  <div className="absolute -top-20 right-0 h-56 w-56 rounded-full bg-[#279ECE]/10 blur-3xl" />
  <div className="absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-[#279ECE]/8 blur-3xl" />

  <div className="relative mx-auto max-w-5xl px-6 py-10">

    <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">

      {/* LEFT */}

      <div className="max-w-2xl">

        <div className="mb-4 inline-flex items-center gap-2 border border-[#279ECE]/15 bg-white/45 px-3 py-1.5 backdrop-blur-xl">

          <Lock className="h-4 w-4 text-[#279ECE]" />

          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#276A96]">
            Product Brochure
          </span>

        </div>

        <h2 className="text-[28px] font-bold tracking-tight text-[#0F2A3D]">
          Need Complete Product Information?
        </h2>

        <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#5C7696]">
          Detailed engineering specifications, material data,
          dimensional drawings, tolerances, application guidance,
          and technical datasheets are available on request for
          <span className="font-semibold text-[#279ECE]">
            {" "}
            {product?.name}
          </span>.
        </p>

      </div>

      {/* RIGHT */}

      <div className="w-full max-w-sm border border-white/50 bg-white/40 p-5 backdrop-blur-2xl">

        <div className="space-y-2 text-sm">

          {[
            "Engineering Specifications",
            "Material Properties",
            "Technical Drawings",
            "Dimensions & Tolerances",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">

              <CheckCircle2 className="h-4 w-4 text-[#279ECE]" />

              <span className="text-[#1E293B]">
                {item}
              </span>

            </div>
          ))}

        </div>

        <Link
          to={`/contact?product=${encodeURIComponent(product?.name ?? "")}`}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#279ECE] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#207FA7] hover:shadow-lg hover:shadow-[#279ECE]/25"
        >
          Request Complete Documentation
          <ArrowRight className="h-4 w-4" />
        </Link>

        <p className="mt-3 text-center text-xs text-[#6B7280]">
          Engineering response within 24 hours
        </p>

      </div>

    </div>

  </div>
</section>

      {showFullInformation && (
  <>
    <ApplicationsSection applications={applications} />
    <DownloadsSection downloads={downloads} />
  </>
)}
    </>
  );
}