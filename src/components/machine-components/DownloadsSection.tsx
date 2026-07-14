import { Download } from "lucide-react";
import { resolveApiAssetUrl } from "@/lib/assetUrl";
import type { MachineComponentDownload } from "@/types/machineComponent";

interface DownloadsSectionProps {
  downloads: MachineComponentDownload[];
}

export default function DownloadsSection({ downloads }: DownloadsSectionProps) {
  const visibleDownloads = downloads.filter((download) => resolveApiAssetUrl(download?.url));

  if (visibleDownloads.length === 0) return null;

  return (
    <section className="border-t border-divider px-6 py-8 lg:px-10">
      <p className="section-label mb-2">Downloads</p>
      <h2 className="font-heading text-2xl mb-5">Product Resources</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {visibleDownloads.map((download, index) => {
          const href = resolveApiAssetUrl(download?.url);
          const label = download.label || "Download";

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
