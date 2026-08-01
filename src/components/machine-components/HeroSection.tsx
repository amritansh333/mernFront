import { Link } from "react-router-dom";
import {
  CircleCheck,
  Download,
  ShieldCheck,
  ArrowRight,
  PenLine,
  Upload,
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
  showActionButtons?: boolean;
}

export default function HeroSection({
  title,
  description,
  image,
  features,
  downloads,
  showActionButtons = false,
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
              {showActionButtons && (
              <div className="mt-5 flex flex-wrap items-center gap-3">
  <Link
    to="/contact?tab=quote"
    className="
      inline-flex
      h-9
      items-center
      justify-center
      gap-2
      px-5
      border
      border-[#279ECE]
      bg-[#279ECE]
      text-[13px]
      font-semibold
      text-white
      transition-all
      duration-200
      hover:-translate-y-0.5
      hover:bg-[#1F7FA8]
      hover:shadow-md
      hover:shadow-[#279ECE]/20
    "
  >
    <PenLine className="h-3.5 w-3.5" />
    <span>Request a Quote</span>
  </Link>

  <Link
    to="/contact?tab=drawing"
    className="
      inline-flex
      h-9
      items-center
      justify-center
      gap-2
      px-5
      border
      border-[#C7D9E6]
      bg-white
      text-[13px]
      font-semibold
      text-[#279ECE]
      transition-all
      duration-200
      hover:-translate-y-0.5
      hover:border-[#279ECE]
      hover:bg-[#F5FBFE]
      hover:text-[#279ECE]
    "
  >
    <Upload className="h-3.5 w-3.5" />
    <span>Send Your Drawing</span>
  </Link>
</div>
          )}
            </>
          )}

        
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
