import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CircleCheck,
  ShieldCheck,
  PenLine,
  Upload,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";
import MachineBreadcrumbs from "@/components/machine-components/MachineBreadcrumbs";
import { resolveApiAssetUrl } from "@/lib/assetUrl";
import type { MachineComponentDownload } from "@/types/machineComponent";

interface HeroSectionProps {
  title?: string;
  description: string[];
  image?: string;
  imageSlug?: string;
  features: string[];
  downloads: MachineComponentDownload[];
  showActionButtons?: boolean;
}

const AUTOPLAY_INTERVAL = 1500;
const MAX_IMAGE_COUNT = 1000;

export default function HeroSection({
  title,
  description,
  image,
  imageSlug,
  features,
  downloads,
  showActionButtons = false,
}: HeroSectionProps) {
  const imageUrl = resolveApiAssetUrl(image);
  const pdf = downloads[0];

  const productSlug = useMemo(() => {
     if (imageSlug?.trim()) {
    return imageSlug.trim().toLowerCase();
  }
    const normalizedTitle = title?.trim().toLowerCase();

    if (normalizedTitle) {
      return normalizedTitle
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const imagePath = image?.split("?")[0] ?? "";
    const filename = imagePath.split("/").pop() ?? "";

    return filename.replace(/\.[^.]+$/, "").toLowerCase();
  }, [imageSlug, title, image]);

  const imageExtension = useMemo(() => {
    const cleanPath = image?.split("?")[0] ?? "";
    const match = cleanPath.match(/\.(jpe?g|png|webp|avif|gif)$/i);

    return match?.[1]?.toLowerCase() ?? "jpeg";
  }, [image]);

  const [discoveredImages, setDiscoveredImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const galleryImages = useMemo(() => {
    const images = discoveredImages.length
      ? discoveredImages
      : imageUrl
        ? [imageUrl]
        : [];

    return Array.from(new Set(images));
  }, [discoveredImages, imageUrl]);

  const activeImage = galleryImages[activeIndex] ?? imageUrl;

  const showPrevious = useCallback(() => {
    if (galleryImages.length < 2) return;

    setActiveIndex((current) =>
      (current - 1 + galleryImages.length) % galleryImages.length,
    );
  }, [galleryImages.length]);

  const showNext = useCallback(() => {
    if (galleryImages.length < 2) return;

    setActiveIndex((current) => (current + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const closeZoom = useCallback(() => {
    setIsZoomed(false);
  }, []);

  // Discover numbered product images without requiring a backend change.
  //
  // Expected files:
  // placoss_1.jpeg
  // placoss_2.jpeg
  // placoss_3.jpeg
  //
  // Missing image numbers are skipped. The scan stops after a consecutive
  // run of missing files so it doesn't request all 1000 images unnecessarily.
  useEffect(() => {
    if (!productSlug || !imageUrl) {
      setDiscoveredImages(imageUrl ? [imageUrl] : []);
      return;
    }

    let cancelled = false;
    let consecutiveMisses = 0;
    let nextIndex = 1;

    const discovered: string[] = [];

    const directory = imageUrl.substring(0, imageUrl.lastIndexOf("/") + 1);

    const extensions = Array.from(
      new Set([imageExtension, "jpeg", "jpg", "png", "webp", "avif"]),
    );

    const scanNext = async () => {
      while (
        !cancelled &&
        nextIndex <= MAX_IMAGE_COUNT &&
        consecutiveMisses < 3
      ) {
        const currentIndex = nextIndex++;
        let foundImage: string | null = null;

        for (const extension of extensions) {
          if (cancelled) return;

          const candidate = resolveApiAssetUrl(
            `${directory}${productSlug}_${currentIndex}.${extension}`,
          );

          if (!candidate) continue;

          try {
            const exists = await new Promise<boolean>((resolve) => {
              const probe = new Image();

              probe.onload = () => resolve(true);
              probe.onerror = () => resolve(false);
              probe.src = candidate;
            });

            if (exists) {
              foundImage = candidate;
              break;
            }
          } catch {
            // Continue checking supported extensions.
          }
        }

        if (cancelled) return;

        if (foundImage) {
          discovered.push(foundImage);
          consecutiveMisses = 0;

          setDiscoveredImages([...discovered]);
        } else {
          consecutiveMisses++;
        }
      }

      if (!cancelled) {
        setDiscoveredImages((current) => {
          const combined = Array.from(
            new Set([
              ...(current.length ? current : imageUrl ? [imageUrl] : []),
              ...discovered,
            ]),
          );

          return combined;
        });
      }
    };

    // Include the original product image while numbered images are loading.
    setDiscoveredImages([imageUrl]);
    setActiveIndex(0);

    void scanNext();

    return () => {
      cancelled = true;
    };
  }, [productSlug, imageUrl, imageExtension]);

  // Keep the selected index valid if the available gallery changes.
  useEffect(() => {
    setActiveIndex((current) =>
      galleryImages.length
        ? Math.min(current, galleryImages.length - 1)
        : 0,
    );
  }, [galleryImages.length]);

  // Automatically advance every two seconds.
  useEffect(() => {
    if (
      isPaused ||
      isZoomed ||
      galleryImages.length < 2
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % galleryImages.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [galleryImages.length, isPaused, isZoomed]);

  // Support Escape and arrow-key navigation in the zoomed view.
  useEffect(() => {
    if (!isZoomed) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeZoom();
      } else if (event.key === "ArrowLeft") {
        showPrevious();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isZoomed, closeZoom, showPrevious, showNext]);

  if (!title && !imageUrl) return null;

  return (
    <section className="border-b border-divider bg-[#F8FAFC]">
      {/* Breadcrumb - Full Width */}
      <div className="mx-auto max-w-7xl px-6 pt-2 pb-1 lg:px-10 lg:pt-6">
        <MachineBreadcrumbs />
      </div>

      {/* Main Content */}
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 pb-6 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:pb-10">
        <div className="order-2 w-full text-center lg:order-1 lg:basis-[68%] lg:text-left">
          {title && (
            <h1
              className="
                mb-4
                text-[24px]
                leading-[1.1]
                font-bold
                tracking-tight
                text-[#0F2A3D]
                sm:text-[34px]
                lg:text-4xl
              "
            >
              {title}
            </h1>
          )}

          {description.length > 0 && (
            <div
              className="
                mb-3
                mx-auto
                w-full
                max-w-md
                text-center
                lg:mx-0
                lg:max-w-full
                lg:text-left
              "
            >
              <div className="space-y-1">
                {description.map((text, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      justify-center
                      lg:items-start
                      lg:justify-start
                      lg:gap-2
                    "
                  >
                    <CircleCheck className="mt-1 hidden h-4 w-4 shrink-0 text-[#279ECE] lg:block" />

                    <p
                      className="
                        text-center
                        text-[14px]
                        leading-7
                        text-[#5C7696]
                        sm:text-[15px]
                        lg:text-left
                        lg:text-[16px]
                        lg:leading-6
                      "
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!features.length && (
            <>
              <div className="mb-4 text-left">
                <div className="inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#276A96]" />

                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
                    Technical Characteristics
                  </span>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 border border-[#276A96]/10 bg-white px-2 py-1.5 transition-all duration-200 hover:border-[#279ECE]/40 hover:shadow-md sm:p-2.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#279ECE]">
                      <CircleCheck className="h-4 w-4 text-white" />
                    </span>

                    <span className="text-[11px] leading-5 font-medium text-[#1E293B] sm:text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {showActionButtons && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact?tab=quote"
                    className="inline-flex h-9 items-center justify-center gap-2 border border-[#279ECE] bg-[#279ECE] px-5 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1F7FA8] hover:shadow-md hover:shadow-[#279ECE]/20"
                  >
                    <PenLine className="h-3.5 w-3.5" />
                    <span>Request a Quote</span>
                  </Link>

                  <Link
                    to="/contact?tab=drawing"
                    className="inline-flex h-9 items-center justify-center gap-2 border border-[#C7D9E6] bg-white px-5 text-[13px] font-semibold text-[#279ECE] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#279ECE] hover:bg-[#F5FBFE] hover:text-[#279ECE]"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Send Your Drawing</span>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* Product Image Gallery */}
        <div className="order-1 w-full lg:order-2 lg:basis-[40%]">
          <div
            className="relative mx-auto w-full max-w-[210px] sm:max-w-xs lg:max-w-md"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsPaused(false);
              }
            }}
          >
            <div className="relative z-10 border border-[#276A96]/15 bg-white p-3 shadow-2xl">
              {/* Main Image */}
              <div className="group relative aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
                {activeImage && (
                  <button
                    type="button"
                    onClick={() => setIsZoomed(true)}
                    className="absolute inset-0 z-10 block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#279ECE]"
                    aria-label={`Zoom image ${activeIndex + 1} of ${galleryImages.length}`}
                  >
                    <img
                      src={activeImage}
                      alt={`${title ?? "Product"} - image ${activeIndex + 1}`}
                      className="h-full w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-[1.03]"
                    />

                    <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-white/90 text-[#276A96] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                      <ZoomIn className="h-4 w-4" />
                    </span>
                  </button>
                )}

                {/* Previous Arrow */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous product image"
                    className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#0F2A3D] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#279ECE] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#279ECE]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}

                {/* Next Arrow */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next product image"
                    className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#0F2A3D] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#279ECE] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#279ECE]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Image Indicators */}
              <div className="flex items-center justify-center gap-2 pt-4 pb-1">
                {galleryImages.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show product image ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#279ECE] focus-visible:ring-offset-2 ${
                      index === activeIndex
                        ? "w-6 bg-[#279ECE]"
                        : "w-2 bg-[#276A96]/20 hover:bg-[#279ECE]/60"
                    }`}
                  />
                ))}
              </div>

              {/* Thumbnail Strip */}
              {galleryImages.length > 1 && (
                <div
                  className="mt-3 flex gap-2 overflow-x-auto border-t border-[#276A96]/10 pt-3 pb-1"
                  aria-label="Product image thumbnails"
                >
                  {galleryImages.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Select image ${index + 1}`}
                      aria-pressed={index === activeIndex}
                      className={`h-12 w-14 shrink-0 overflow-hidden border-2 bg-[#F8FAFC] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#279ECE] ${
                        index === activeIndex
                          ? "border-[#279ECE]"
                          : "border-transparent opacity-70 hover:border-[#276A96]/30 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="absolute -bottom-3 -right-3 z-0 h-16 w-16 bg-[#279ECE]/10 sm:h-20 sm:w-20 lg:-bottom-5 lg:-right-5 lg:h-24 lg:w-24" />

            <div className="absolute -left-3 -top-3 z-0 h-14 w-14 border border-[#279ECE]/20 sm:h-16 sm:w-16 lg:-left-5 lg:-top-5 lg:h-20 lg:w-20" />
          </div>
        </div>
      </div>

      {/* Full-Screen Image Viewer */}
      {isZoomed && activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title ?? "Product"} image viewer`}
          onClick={closeZoom}
        >
          <button
            type="button"
            onClick={closeZoom}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-6 w-6" />
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <img
            src={activeImage}
            alt={`${title ?? "Product"} - enlarged image ${activeIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-full animate-in fade-in zoom-in-95 object-contain duration-200"
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
            {activeIndex + 1} / {galleryImages.length}
            <span className="ml-3 hidden text-white/60 sm:inline">
              Press ESC to close
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

