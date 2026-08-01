import { ArrowRight, FolderDown } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCard {
  name: string;
  slug: string;
  path: string;
  image: string;
  description: string[];
  keyFeatures: string[];
}

interface ProductCardsSectionProps {
  products: ProductCard[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductCardsSection({
  products,
}: ProductCardsSectionProps) {
  if (!products?.length) return null;

  return (
    <section className="px-4 py-4 lg:px-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
          <FolderDown className="h-3.5 w-3.5 text-[#276A96]" />
        
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
            Explore Our Range
          </span>
        </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const imageUrl = product.image
              ? `${API_BASE_URL}${product.image}`
              : "/placeholder-product.jpg";

            return (
              <Link
                key={product.slug}
                to={product.path}
                className="
                  group
                  block
                  overflow-hidden
                  rounded-sm
                  border
                  border-slate-200
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#2BA6D9]
                  hover:shadow-xl
                "
              >
                {/* Product Image */}
                <div className="aspect-[4/3] overflow-hidden bg-slate-50">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-product.jpg";
                    }}
                  />
                </div>

                {/* Product Content */}
                <div className="flex min-h-[190px] flex-col p-5">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-[#2BA6D9] transition-colors group-hover:text-primary-dark transition-colors">
                    <span className="line-clamp-2">{product.name}</span>

                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 line-clamp-3">
                    {product.description?.[0]}
                  </p>

                  <div className="mt-5 h-[2px] w-12 bg-[#2BA6D9] transition-all duration-300 group-hover:w-full" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}