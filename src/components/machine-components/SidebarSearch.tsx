import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
  totalProducts: number;
}

export default function SidebarSearch({
  value,
  onChange,
  totalProducts,
}: SidebarSearchProps) {
  const clearSearch = () => onChange("");

  return (
    <label className="relative block">
      <span className="sr-only">Search Machine Components</span>

      {/* Search Icon */}
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products"
        className={cn(
          "h-12 rounded-md border-[#279ECE]/40 bg-white pl-11 pr-20",
          "text-[15px] placeholder:text-[#64748B]",
          "transition-all duration-200",
          "focus:border-[#279ECE] focus:ring-2 focus:ring-[#279ECE]/20",
        )}
      />

      {/* Right Controls */}
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">

        {/* Product Count */}
        <div className="flex h-8 min-w-[34px] items-center justify-center rounded-md bg-[#279ECE] px-2 text-xs font-bold text-white shadow-sm">
          {totalProducts}
        </div>

        {/* Clear Search */}
        {value && (
          <button
            type="button"
            onClick={clearSearch}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#64748B] transition-colors hover:bg-[#E3F1F7] hover:text-[#276A96]"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </label>
  );
}