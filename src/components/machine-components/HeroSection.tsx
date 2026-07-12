import { Link } from "react-router-dom";
import type { MachineComponentProduct } from "@/types/machineComponent";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProductSectionProps {
  product?: MachineComponentProduct;
}

function getDescription(description?: string | string[]) {
  if (Array.isArray(description)) return description.filter(Boolean);
  return description ? [description] : [];
}

export default function HeroSection({ product }: ProductSectionProps) {
  const title = product?.name || product?.title;
  const description = getDescription(product?.description);
  const image = product?.imageUrl || product?.image;

  if (!title && description.length === 0 && !image) return null;

  return (
    <section className="border-b border-divider bg-surface-subtle">
      <div className="grid gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10">
        <div>
          {product?.subtitle && <p className="section-label mb-3">{product.subtitle}</p>}
          {title && <h1 className="font-heading text-3xl text-charcoal mb-4">{title}</h1>}
          {description.length > 0 && (
            <div className="max-w-3xl space-y-3 text-sm leading-6 text-muted-foreground">
              {description.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`}>{paragraph}</p>
              ))}
            </div>
          )}
          <Link
            to="/contact"
            className="mt-6 inline-flex bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Request Quote
          </Link>
        </div>

        {image && (
          <img
            src={image.startsWith("http") ? image : `${BASE_URL}${image}`}
            alt={title || "Machine component"}
            className="h-64 w-full rounded object-cover lg:h-72"
          />
        )}
      </div>
    </section>
  );
}
