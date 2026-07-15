import { Layers } from "lucide-react";
import type { MachineComponentValue } from "@/types/machineComponent";

interface SpecificationsSectionProps {
  specifications?: Record<string, MachineComponentValue>;
}

function formatLabel(label: string) {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(" / ");
  }

  if (value === null || value === undefined || value === "") {
    return "";
  }

  return String(value);
}

export default function SpecificationsSection({
  specifications,
}: SpecificationsSectionProps) {
  const entries = Object.entries(specifications ?? {}).filter(
    ([, value]) => formatValue(value) !== ""
  );

  if (!entries.length) return null;

  return (
    <section className="mb-4 px-6 py-6 lg:px-10">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5 mb-3">
        <Layers className="h-3.5 w-3.5 text-[#276A96]" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
          Specifications
        </span>
      </div>

      {/* Heading */}
      <h2 className="mb-4 text-2xl font-bold text-[#0F2A3D]">
        Technical Data Sheet
      </h2>

      {/* Table */}
      <div className="overflow-hidden border border-[#276A96]/15 shadow-sm">

        <table className="w-full border-collapse text-left">

          <thead>
            <tr className="bg-gradient-to-r from-[#276A96] to-[#1f5a80]">

              <th className="w-1/3 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">
                Parameter
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">
                Specification
              </th>

            </tr>
          </thead>

          <tbody>

            {entries.map(([key, value], index) => (
              <tr
                key={key}
                className={`transition-colors duration-150 hover:bg-[#279ECE]/5 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                }`}
              >

                <td className="border-t border-[#276A96]/10 px-6 py-4 text-sm font-semibold text-[#276A96]">
                  {formatLabel(key)}
                </td>

                <td className="border-t border-[#276A96]/10 px-6 py-4 text-sm text-[#1E293B]">
                  {formatValue(value)}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}