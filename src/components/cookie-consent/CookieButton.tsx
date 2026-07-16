import { Settings2 } from "lucide-react";

interface CookieButtonProps {
  onClick: () => void;
}

export default function CookieButton({
  onClick,
}: CookieButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#276A96]
        bg-white
        px-4
        py-2
        text-sm
        font-medium
        text-[#276A96]
        transition-all
        duration-300
        hover:bg-[#276A96]
        hover:text-white
        focus:outline-none
        focus:ring-2
        focus:ring-[#29C4EA]
      "
    >
      <Settings2 className="h-4 w-4" />

      Cookie Settings
    </button>
  );
}