import { Switch } from "@/components/ui/switch";

interface CookieCategoryProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (value: boolean) => void;
}

export default function CookieCategory({
  title,
  description,
  checked,
  disabled = false,
  onCheckedChange,
}: CookieCategoryProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-md p-4 transition-colors hover:border-[#29C4EA]">
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-900">
          {title}
        </h4>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}