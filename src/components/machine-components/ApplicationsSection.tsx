import type { MachineComponentProduct } from "@/types/machineComponent";

interface ProductSectionProps {
  product?: MachineComponentProduct;
}

export default function ApplicationsSection({ product }: ProductSectionProps) {
  const applications = product?.applications?.filter(Boolean) ?? [];

  if (applications.length === 0) return null;

  return (
    <section className="border-t border-divider bg-surface-subtle px-6 py-8 lg:px-10">
      <p className="section-label mb-2">Applications</p>
      <h2 className="font-heading text-2xl mb-5">Common Use Cases</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <div key={application} className="border border-divider bg-card p-4 text-sm text-charcoal-light">
            {application}
          </div>
        ))}
      </div>
    </section>
  );
}
