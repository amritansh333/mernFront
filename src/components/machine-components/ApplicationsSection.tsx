import {
  Boxes,
  Factory,
  Package,
  Cog,
  Layers,
  Wrench,
  Settings,
  Truck,
  Cpu,
  Workflow,
} from "lucide-react";

interface ApplicationsSectionProps {
  applications: string[];
}

const icons = [
  Factory,
  Package,
  Wrench,
  Cog,
  Boxes,
  Layers,
  Truck,
  Cpu,
  Workflow,
  Settings,
];

function getIcon(index: number) {
  return icons[index % icons.length];
}

export default function ApplicationsSection({
  applications,
}: ApplicationsSectionProps) {
  if (!applications.length) return null;

  return (
    <section className="mb-4 bg-[#F8FAFC] border border-[#276A96]/10 px-6 py-6 sm:p-10">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5 mb-3">
        <Boxes className="h-3.5 w-3.5 text-[#276A96]" />

        <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
          Applications
        </span>
      </div>

      {/* Heading */}
      <h2 className="mb-4 text-2xl font-bold text-[#0F2A3D]">
        Where It's Used
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

        {applications.map((application, index) => {
          const Icon = getIcon(index);

          return (
            <div
              key={`${application}-${index}`}
              className="group relative overflow-hidden border border-[#276A96]/10 border-l-4 border-l-[#279ECE] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative z-10 flex items-center gap-2">

                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#279ECE]/10 transition-colors duration-300 group-hover:bg-[#279ECE]">

                  <Icon className="h-6 w-6 text-[#279ECE] transition-colors duration-300 group-hover:text-white" />

                </div>

                {/* Text */}
                <p className="text-sm font-semibold leading-snug text-[#1E293B]">
                  {application}
                </p>

              </div>

              {/* Decorative Shape */}
              <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-[#279ECE]/5 transition-transform duration-300 group-hover:scale-125" />
            </div>
          );
        })}

      </div>
    </section>
  );
}