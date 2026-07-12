import { memo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MachineSidebarNode } from "@/types/machineComponent";

interface SidebarNodeProps {
  node: MachineSidebarNode;
  selectedSlug: string;
  setSelectedSlug: (slug: string) => void;
  depth?: number;
}

function getNodeLabel(node: MachineSidebarNode) {
  return node.name || node.title || node.label || node.slug || "Untitled";
}

function getNodeChildren(node: MachineSidebarNode) {
  return [...(node.children ?? []), ...(node.products ?? [])];
}

function SidebarNode({ node, selectedSlug, setSelectedSlug, depth = 0 }: SidebarNodeProps) {
  const children = getNodeChildren(node);
  const hasChildren = children.length > 0;
  const isProduct = Boolean(node.slug) && !hasChildren;
  const isSelected = Boolean(node.slug) && node.slug === selectedSlug;
  const [isOpen, setIsOpen] = useState(depth < 1 || isSelected);

  const handleClick = () => {
    if (isProduct && node.slug) {
      setSelectedSlug(node.slug);
      return;
    }

    if (hasChildren) setIsOpen((value) => !value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && (isProduct || hasChildren)) {
      event.preventDefault();
      handleClick();
    }

    if (event.key === "ArrowRight" && hasChildren) setIsOpen(true);
    if (event.key === "ArrowLeft" && hasChildren) setIsOpen(false);
  };

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "text-charcoal-light hover:bg-accent hover:text-charcoal",
        )}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-current={isSelected ? "page" : undefined}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-90")}
          />
        ) : (
          <span className="h-4 w-4 shrink-0" />
        )}
        <span className="min-w-0 flex-1 truncate">{getNodeLabel(node)}</span>
      </button>

      {hasChildren && isOpen && (
        <ul className="mt-1 space-y-1">
          {children.map((child, index) => (
            <SidebarNode
              key={child.id || child._id || child.slug || `${getNodeLabel(child)}-${index}`}
              node={child}
              selectedSlug={selectedSlug}
              setSelectedSlug={setSelectedSlug}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default memo(SidebarNode);
