import { CircleCheck } from "lucide-react";

interface FeaturesSectionProps {
  features: string[];
}

export default function FeaturesSection({
  features,
}: FeaturesSectionProps) {
  if (!features.length) return null;

  return (
    <section className="px-6 py-8 lg:px-10">
      {/* Section Badge */}
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#276A96]">
        Technical Characteristics
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={`${feature}-${index}`}
            className="
              flex items-center gap-3
              border border-[#276A96]/10
              bg-white
              p-3
              transition-all
              duration-200
              hover:border-[#279ECE]/40
              hover:shadow-md
            "
          >
            {/* Icon */}
            <span
              className="
                flex h-6 w-6 shrink-0 items-center justify-center
                bg-[#279ECE]
              "
            >
              <CircleCheck className="h-3.5 w-3.5 text-white" />
            </span>

            {/* Text */}
            <span className="text-sm font-medium leading-snug text-[#1E293B]">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}