import { Link } from "react-router-dom";
import {
  CircleCheck,
  ArrowRight,
  Download,
  ShieldCheck,
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
mb-2
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
    border-l-2
    border-[#279ECE]/30
    pl-3
    text-left
    max-w-md
    mx-auto
    lg:max-w-full
    lg:mx-0
    lg:pl-5
  "
>
              <div className="space-y-0.5">
                {description.map((text, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-[#279ECE]" />
                    <p className="text-[14px] leading-6 text-[#5C7696] sm:text-[16px]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!features.length && (
            <>
              <div className="mb-2 text-left">
  <div className="inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
    <ShieldCheck className="h-3.5 w-3.5 text-[#276A96]" />

    <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
      Technical Characteristics
    </span>
  </div>
</div>

              <div className="mb-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
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

          <div className="mt-1 flex flex-wrap justify-center gap-2 lg:justify-start">
  <Link
    to="/contact"
    className="inline-flex h-8 min-w-[132px] sm:h-10 sm:min-w-[160px] sm:h-10 sm:min-w-[160px] items-center justify-center gap-2 bg-gradient-to-r from-[#279ECE] to-[#1F7FA8] px-3 sm:px-5 text-[11px] sm:text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#279ECE]/30"
  >
    <span>Request Quote</span>
    <ArrowRight className="h-4 w-4" />
  </Link>

  {pdf && (
    <a
      href={resolveApiAssetUrl(pdf.url)}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-8 min-w-[132px] sm:h-10 sm:min-w-[160px] sm:h-10 sm:min-w-[160px] items-center justify-center gap-2 border border-[#C7D9E6] bg-white px-3 sm:px-5 text-[12px] sm:text-[13px] font-semibold text-[#276A96] transition-all duration-200 hover:border-[#279ECE] hover:bg-[#F5FBFE] hover:text-[#279ECE]"
    >
      <span>Download Datasheet</span>
      <Download className="h-4 w-4" />
    </a>
  )}
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
