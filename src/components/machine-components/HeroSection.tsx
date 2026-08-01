import { Link } from "react-router-dom";
import {
  CircleCheck,
  Download,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import MachineBreadcrumbs from "@/components/machine-components/MachineBreadcrumbs";
import { resolveApiAssetUrl } from "@/lib/assetUrl";
import type { MachineComponentDownload } from "@/types/machineComponent";

interface HeroSectionProps {
  title?: string;
  description: string[];
  image?: string;
  features: string[];
  downloads: MachineComponentDownload[];
}

export default function HeroSection({
  title,
  description,
  image,
  features,
  downloads,
}: HeroSectionProps) {
  const imageUrl = resolveApiAssetUrl(image);
  const pdf = downloads[0];

  if (!title && !imageUrl) return null;
  
  return (
  <section className="border-b border-divider bg-[#F8FAFC]">

    {/* Breadcrumb - Full Width */}
    <div className="mx-auto max-w-7xl px-6 pt-2 pb-1 lg:px-10 lg:pt-6">
      <MachineBreadcrumbs />
    </div>

    {/* Main Content */}
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 pb-6 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:pb-10">

      <div className="order-2 w-full text-center lg:order-1 lg:basis-[68%] lg:text-left">

        {title && (
          <h1
  className="
mb-4
text-[24px]
leading-[1.1]
font-bold
tracking-tight
text-[#0F2A3D]
sm:text-[34px]
lg:text-4xl
"
>
            {title}
          </h1>
        )}

          {description.length > 0 && (
  <div
    className="
      mb-3
      w-full
      max-w-md
      mx-auto
      text-center

      lg:max-w-full
      lg:mx-0
      lg:text-left
    "
  >
    <div className="space-y-1">
      {description.map((text, index) => (
        <div
          key={index}
          className="
            flex
            justify-center

            lg:justify-start
            lg:items-start
            lg:gap-2
          "
        >
          {/* Desktop only */}
          <CircleCheck className="hidden lg:block mt-1 h-4 w-4 shrink-0 text-[#279ECE]" />

          <p
            className="
              text-[14px]
              leading-7
              text-[#5C7696]
              text-center

              sm:text-[15px]

              lg:text-[16px]
              lg:leading-6
              lg:text-left
            "
          >
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

          {!!features.length && (
            <>
              <div className="mb-4 text-left">
  <div className="inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
    <ShieldCheck className="h-3.5 w-3.5 text-[#276A96]" />

    <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
      Technical Characteristics
    </span>
  </div>
</div>

              <div className="mb-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 border border-[#276A96]/10 bg-white px-2 py-1.5 sm:p-2.5 transition-all duration-200 hover:border-[#279ECE]/40 hover:shadow-md"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#279ECE]">
                      <CircleCheck className="h-4 w-4 text-white" />
                    </span>

                    <span className="text-[11px] leading-4 sm:text-[13px] leading-5 font-medium text-[#1E293B] sm:text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ================= DOCUMENTATION CTA ================= */}

<div className="mt- overflow-hidden border border-[#279ECE]/15 bg-[#EDF8FD]">

  <div className="grid lg:grid-cols-[1fr_300px]">

    {/* LEFT */}

    <div className="flex flex-col justify-center p-5 lg:p-6">

  <h2 className="text-[30px] font-bold tracking-tight text-[#0F2A3D] transition-colors duration-300 hover:text-[#279ECE]">
    Need Complete Product Information?
  </h2>

  <Link
    to={`/contact?product=${encodeURIComponent(title ?? "")}`}
    className="
      mt-5
      inline-flex
      h-10
      min-w-[180px]
      items-center
      justify-center
      gap-2
      border
      border-[#C7D9E6]
      bg-white
      px-5
      text-[13px]
      font-semibold
      text-[#279ECE]
      transition-all
      duration-200
      hover:border-[#279ECE]
      hover:bg-[#F5FBFE]
      hover:text-[#279ECE]
      hover:shadow-lg
      hover:shadow-[#279ECE]/20
    "
  >
    <span>Get Product Brochure</span>

    <Download className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>

</div>

    {/* RIGHT */}

    <div className="border-t border-[#279ECE]/10 bg-white/45 p-5 lg:border-l lg:border-t-0 lg:p-6">

  <p className="text-[14px] leading-8 text-[#5C7696]">
    Click{" "}
    <Link
      to={`/contact?product=${encodeURIComponent(title ?? "")}`}
      className="
        font-semibold
        text-[#279ECE]
        transition-all
        duration-200
        hover:underline
        hover:underline-offset-4
      "
    >
      Get Product Brochure
    </Link>{" "}
    to receive a detailed brochure for{" "}
    <span className="font-semibold text-[#279ECE]">
      {title}
    </span>{" "}
    with technical specifications, material details, dimensions,
    applications, and other product information.
  </p>

</div>

  </div>

</div>
        </div>

        <div className="order-1 w-full lg:order-2 lg:basis-[40%]">
          <div className="relative mx-auto w-full max-w-[210px] sm:max-w-xs lg:max-w-md">
            <div className="relative z-10 overflow-hidden border border-[#276A96]/15 bg-white p-3 shadow-2xl">
              

              <div className="relative aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="flex items-center justify-center gap-2 pt-4 pb-1">
                <span className="h-2 w-6 bg-[#279ECE]" />
                <span className="h-2 w-2 rounded-full bg-[#276A96]/20" />
                <span className="h-2 w-2 rounded-full bg-[#276A96]/20" />
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 z-0 h-16 w-16 bg-[#279ECE]/10 sm:h-20 sm:w-20 lg:-bottom-5 lg:-right-5 lg:h-24 lg:w-24" />
            <div className="absolute -left-3 -top-3 z-0 h-14 w-14 border border-[#279ECE]/20 sm:h-16 sm:w-16 lg:-left-5 lg:-top-5 lg:h-20 lg:w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
