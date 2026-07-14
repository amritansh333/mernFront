import { Link } from "react-router-dom";
import {
  Sparkles,
  CircleCheck,
  ArrowRight,
  Download,
  ShieldCheck,
} from "lucide-react";
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
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 py-10 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
        <div className="w-full lg:basis-[60%]">

          <div className="mb-4 inline-flex items-center gap-2 border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#276A96]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#276A96]">
              Thermoplastics Machine Components
            </span>
          </div>

          {title && (
            <h1 className="mb-4 text-4xl font-bold leading-tight text-[#0F2A3D] lg:text-4xl">
              {title}
            </h1>
          )}

          {description.length > 0 && (
            <div className="mb-4 border-l-2 border-[#279ECE]/30 pl-5">
              <div className="space-y-1">
                {description.map((text, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-[#279ECE]" />
                    <p className="text-[16px] leading-7 text-[#5C7696]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!features.length && (
            <>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#276A96]">
                Technical Characteristics
              </p>

              <div className="mb-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 border border-[#276A96]/10 bg-white p-2 transition-all duration-200 hover:border-[#279ECE]/40 hover:shadow-md"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#279ECE]">
                      <CircleCheck className="h-4 w-4 text-white" />
                    </span>

                    <span className="text-sm font-medium leading-snug text-[#1E293B]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#279ECE] to-[#1f7fa8] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#279ECE]/30"
            >
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </Link>

            {pdf && (
              <a
                href={resolveApiAssetUrl(pdf.url)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-2 border-[#276A96]/25 px-6 py-3 text-sm font-semibold text-[#276A96] transition-colors duration-200 hover:border-[#279ECE] hover:bg-[#279ECE]/5 hover:text-[#279ECE]"
              >
                Download Datasheet
                <Download className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div className="w-full lg:basis-[40%]">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative overflow-hidden border border-[#276A96]/15 bg-white p-3 shadow-2xl">
              <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 border border-[#276A96]/15 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#276A96] shadow-sm">
                <ShieldCheck className="h-3 w-3 text-[#279ECE]" />
                Machine Plastic Parts
              </span>

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

            <div className="absolute -bottom-5 -right-5 hidden h-24 w-24 bg-[#279ECE]/10 lg:block" />
            <div className="absolute -left-5 -top-5 hidden h-20 w-20 border-2 border-[#279ECE]/20 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
