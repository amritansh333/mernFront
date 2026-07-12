import type { MachineComponentProduct } from "@/types/machineComponent";

interface ProductSectionProps {
  product?: MachineComponentProduct;
}

function formatLabel(label: string) {
  return label.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  if (value === null || value === undefined || value === "") return "";
  return String(value);
}

export default function SpecificationsSection({ product }: ProductSectionProps) {
  const entries = Object.entries(product?.specifications ?? {}).filter(([, value]) => formatValue(value));

  if (entries.length === 0) return null;

  return (
    <section className="border-t border-divider px-6 py-8 lg:px-10">
      <p className="section-label mb-2">Specifications</p>
      <h2 className="font-heading text-2xl mb-5">Technical Details</h2>
      <div className="overflow-hidden border border-divider">
        {entries.map(([key, value]) => (
          <div key={key} className="grid grid-cols-1 border-b border-divider text-sm last:border-b-0 sm:grid-cols-3">
            <div className="bg-surface-subtle p-4 font-semibold uppercase text-muted-foreground">
              {formatLabel(key)}
            </div>
            <div className="p-4 text-charcoal-light sm:col-span-2">{formatValue(value)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
