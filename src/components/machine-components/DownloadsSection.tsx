import { Download, FolderDown } from "lucide-react";
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
      {/* Badge */}
<div className="mb-3 inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
  <FolderDown className="h-3.5 w-3.5 text-[#276A96]" />

  <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
    Downloads
  </span>
</div>
      <h2 className="font-heading text-2xl mb-5">Product Resources</h2>
      <div className="flex flex-wrap gap-3">
  {visibleDownloads.map((download, index) => {
    const href = resolveApiAssetUrl(download?.url);
    const label = download.label || "Download";

    return (
      <a
        key={`${label}-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-3 rounded-md border border-[#C7D9E6] bg-white px-5 py-3 text-sm font-semibold text-[#276A96] transition-all duration-200 hover:border-[#279ECE] hover:bg-[#F5FBFE] hover:text-[#279ECE]"
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
