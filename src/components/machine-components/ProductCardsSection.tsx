import { ArrowRight, FolderDown, Save } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCard {
  name?: string;
  slug?: string;
  path?: string;
  image?: string;
  description?: string | string[];
  keyFeatures?: string[];
}

interface ProductCardsSectionProps {
  products: ProductCard[];
  /**
   * Optional predicate to decide which product cards should use the custom click
   * handler instead of navigating. When true for a product, the card will be
   * rendered as an interactive element and onCardClick will be invoked.
   */
  shouldUseCustomClick?: (product: ProductCard) => boolean;
  /**
   * Optional click handler invoked for cards where shouldUseCustomClick returns true.
   */
  onCardClick?: (product: ProductCard) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductCardsSection({
  products,
  shouldUseCustomClick,
  onCardClick,
}: ProductCardsSectionProps) {
  if (!products?.length) return null;

  return (
    <section className="px-4 py-4 lg:px-8">
      <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
        <Save className="h-3.5 w-3.5 text-[#276A96]" />

        <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
          Our Products
        </span>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const imageUrl = product.image
              ? `${API_BASE_URL}${product.image}`
              : "/placeholder-product.jpg";

            const useCustom = Boolean(
              shouldUseCustomClick?.(product) &&
              typeof onCardClick === "function",
            );

            // If useCustom is true, render a non-navigation interactive card that
            // invokes onCardClick. Otherwise preserve existing Link/navigation.
            const CardWrapper = useCustom ? "div" : Link;

            const wrapperProps = useCustom
              ? {
                  key: product.slug,
                  role: "button",
                  tabIndex: 0,
                  onClick: () => onCardClick?.(product),
                  onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onCardClick?.(product);
                    }
                  },
                  className:
                    "group flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2BA6D9] hover:shadow-[0_5px_10px_rgba(39,158,206,0.22)]",
                }
              : {
                  key: product.slug,
                  to: product.path,
                  className:
                    "group flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2BA6D9] hover:shadow-[0_5px_10px_rgba(39,158,206,0.22)]",
                };

            return (
              // @ts-expect-error JSX component variable (Link or div)
              <CardWrapper {...wrapperProps}>
                {/* Product Image */}

                <div className="aspect-[4/3] overflow-hidden bg-slate-50">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                {/* Product Content */}

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-[#2BA6D9] transition-colors group-hover:text-primary-dark transition-colors">
                    <span className="line-clamp-2">{product.name}</span>

                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-slate-600 line-clamp-3">
                    {Array.isArray(product.description)
                      ? product.description[0]
                      : product.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="h-[2px] w-12 bg-[#2BA6D9] transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
                {/* close CardWrapper */}
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
