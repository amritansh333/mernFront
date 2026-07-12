import { Download } from "lucide-react";
import type { MachineComponentDownload, MachineComponentProduct } from "@/types/machineComponent";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProductSectionProps {
  product?: MachineComponentProduct;
}

function normalizeUrl(url?: string) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

export default function DownloadsSection({ product }: ProductSectionProps) {
  const downloads: MachineComponentDownload[] = [
    ...(product?.downloads ?? []),
    ...(product?.pdfUrl ? [{ label: "Datasheet", url: product.pdfUrl }] : []),
    ...(product?.brochureUrl ? [{ label: "Brochure", url: product.brochureUrl }] : []),
  ].filter((download) => normalizeUrl(download.url || download.href));

  if (downloads.length === 0) return null;

  return (
    <section className="border-t border-divider px-6 py-8 lg:px-10">
      <p className="section-label mb-2">Downloads</p>
      <h2 className="font-heading text-2xl mb-5">Product Resources</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {downloads.map((download, index) => {
          const href = normalizeUrl(download.url || download.href);
          const label = download.label || download.title || "Download";

          return (
            <a
              key={`${label}-${index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-divider bg-card p-4 text-sm font-semibold text-primary transition-colors hover:border-primary"
            >
              <Download className="h-4 w-4" />
              {label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
