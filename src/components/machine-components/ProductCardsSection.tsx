import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowRight, Save } from "lucide-react";
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
  shouldUseCustomClick?: (product: ProductCard) => boolean;
  onCardClick?: (product: ProductCard) => void;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
  /\/+$/,
  "",
);

const AUTOPLAY_INTERVAL = 1500;
const MAX_IMAGE_COUNT = 1000;
const MAX_CONSECUTIVE_MISSES = 3;

function resolveImageUrl(path?: string): string {
  if (!path) return "/placeholder-product.jpg";

  if (/^(https?:\/\/|data:|blob:)/i.test(path)) {
    return path;
  }

  if (path.startsWith("//")) {
    return `${window.location.protocol}${path}`;
  }

  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

function getImageExtensions(image?: string): string[] {
  const extension = image
    ?.match(/\.([a-z0-9]+)(?:\?.*)?$/i)?.[1]
    ?.toLowerCase();

  return Array.from(
    new Set([
      ...(extension ? [extension] : []),
      "jpeg",
      "jpg",
      "png",
      "webp",
      "avif",
    ]),
  );
}

function useProductImages(product: ProductCard) {
  const slug = product.slug?.trim().toLowerCase() ?? "";
  const originalImage = product.image
    ? resolveImageUrl(product.image)
    : "/placeholder-product.jpg";

  const extensions = useMemo(
    () => getImageExtensions(product.image),
    [product.image],
  );

  const [images, setImages] = useState<string[]>([originalImage]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let consecutiveMisses = 0;
    let nextNumber = 1;

    const discovered: string[] = [];
    const validImages = new Set<string>();

    setImages([originalImage]);
    setActiveIndex(0);

    // The original image is always retained as a fallback.
    validImages.add(originalImage);

    if (!slug || !product.image || /^https?:\/\//i.test(product.image)) {
      return () => {
        cancelled = true;
      };
    }

    const cleanImagePath = product.image.split("?")[0];
    const directory = cleanImagePath.slice(
      0,
      cleanImagePath.lastIndexOf("/") + 1,
    );

    const scan = async () => {
      while (
        !cancelled &&
        nextNumber <= MAX_IMAGE_COUNT &&
        consecutiveMisses < MAX_CONSECUTIVE_MISSES
      ) {
        const currentNumber = nextNumber++;
        let foundImage: string | undefined;

        for (const extension of extensions) {
          if (cancelled) return;

          const candidate = resolveImageUrl(
            `${directory}${slug}_${currentNumber}.${extension}`,
          );

          const exists = await new Promise<boolean>((resolve) => {
            const probe = new Image();

            probe.onload = () => resolve(true);
            probe.onerror = () => resolve(false);
            probe.src = candidate;
          });

          if (cancelled) return;

          if (exists) {
            foundImage = candidate;
            break;
          }
        }

        if (cancelled) return;

        if (foundImage && !validImages.has(foundImage)) {
          validImages.add(foundImage);
          discovered.push(foundImage);
          consecutiveMisses = 0;

          setImages([originalImage, ...discovered]);
        } else {
          consecutiveMisses++;
        }
      }
    };

    void scan();

    return () => {
      cancelled = true;
    };
  }, [slug, originalImage, product.image, extensions]);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return {
    images,
    activeIndex,
  };
}

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
          {products.map((product, productIndex) => {
            const useCustom = Boolean(
              shouldUseCustomClick?.(product) &&
              typeof onCardClick === "function",
            );

            const key = product.slug || `${product.name}-${productIndex}`;

            return (
              <ProductCardItem
                key={key}
                product={product}
                useCustom={useCustom}
                onCardClick={onCardClick}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface ProductCardItemProps {
  product: ProductCard;
  useCustom: boolean;
  onCardClick?: (product: ProductCard) => void;
}

function ProductCardItem({
  product,
  useCustom,
  onCardClick,
}: ProductCardItemProps) {
  const { images, activeIndex } = useProductImages(product);

  const [failedImages, setFailedImages] = useState<Set<string>>(
    () => new Set(),
  );

  const availableImages = images.filter((src) => !failedImages.has(src));

  const activeImage =
    availableImages.length > 0
      ? availableImages[activeIndex % availableImages.length]
      : "/placeholder-product.jpg";

  const wrapperClassName =
    "group flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2BA6D9] hover:shadow-[0_5px_10px_rgba(39,158,206,0.22)]";

  const handleCustomClick = () => {
    onCardClick?.(product);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCustomClick();
    }
  };

  const imageContent = (
    <div className="card-image product-gallery relative aspect-[4/3] overflow-hidden bg-slate-50">
      {availableImages.map((src, index) => {
        const isActive = src === activeImage;

        return (
          <img
            key={src}
            src={src}
            alt={`${product.name ?? "Product"} — image ${index + 1}`}
            aria-hidden={!isActive}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            onError={() => {
              setFailedImages((previous) => {
                const next = new Set(previous);
                next.add(src);
                return next;
              });
            }}
            className={`product-gallery-image absolute inset-0 h-full w-full object-cover ${
              isActive ? "product-gallery-image-active" : ""
            }`}
            style={
              {
                "--gallery-index": index,
              } as React.CSSProperties
            }
          />
        );
      })}

      {availableImages.length > 1 && (
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-full bg-black/45 px-2 py-1">
          {availableImages.map((src) => (
            <span
              key={src}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                src === activeImage ? "w-4 bg-white" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  const cardContent = (
    <>
      {imageContent}

      <div className="flex flex-1 flex-col p-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#2BA6D9] transition-colors group-hover:text-primary-dark">
          <span className="line-clamp-2">{product.name}</span>

          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-600">
          {Array.isArray(product.description)
            ? product.description[0]
            : product.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="h-[2px] w-12 bg-[#2BA6D9] transition-all duration-300 group-hover:w-full" />
        </div>
      </div>
    </>
  );

  if (useCustom) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleCustomClick}
        onKeyDown={handleKeyDown}
        className={wrapperClassName}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={product.path || "#"} className={wrapperClassName}>
      {cardContent}
    </Link>
  );
}
