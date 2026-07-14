import { memo, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  ChevronRight,
  CircleCheck,
  FolderTree,
} from "lucide-react";
import {
  getNodeChildren,
  sortNodesByProductOrder,
} from "@/lib/machineComponentSidebar";
import { cn } from "@/lib/utils";
import type {
  MachineComponentProduct,
  MachineSidebarNode,
} from "@/types/machineComponent";

interface SidebarNodeProps {
  node: MachineSidebarNode;
  selectedSlug: string;
  setSelectedSlug: (slug: string) => void;
  depth?: number;
  forceOpen?: boolean;
  products?: Record<string, MachineComponentProduct>;
}

function getNodeLabel(node: MachineSidebarNode) {
  return node.name || node.title || node.label || node.slug || "Untitled";
}

function hasSelectedDescendant(
  node: MachineSidebarNode,
  selectedSlug: string,
): boolean {
  return getNodeChildren(node).some((child) => {
    if (child.slug === selectedSlug) return true;
    return hasSelectedDescendant(child, selectedSlug);
  });
}

function SidebarNode({
  node,
  selectedSlug,
  setSelectedSlug,
  depth = 0,
  forceOpen = false,
  products,
}: SidebarNodeProps) {
  const children = sortNodesByProductOrder(
    getNodeChildren(node),
    products,
  );

  const hasChildren = children.length > 0;
  const isProduct = Boolean(node.slug) && !hasChildren;
  const isSelected = Boolean(node.slug) && node.slug === selectedSlug;
  const containsSelected =
    hasChildren && hasSelectedDescendant(node, selectedSlug);

  const [isOpen, setIsOpen] = useState(
    depth < 1 || isSelected || containsSelected,
  );

  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    if (forceOpen || containsSelected) {
      setIsOpen(true);
    }
  }, [containsSelected, forceOpen]);

  useEffect(() => {
    const checkOverflow = () => {
      if (!textContainerRef.current || !textRef.current) return;

      setShouldMarquee(
        textRef.current.scrollWidth >
          textContainerRef.current.clientWidth + 4,
      );
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [node.name, node.title, node.label, node.slug]);

  const handleClick = () => {
    if (isProduct && node.slug) {
      setSelectedSlug(node.slug);
      return;
    }

    if (hasChildren) {
      setIsOpen((value) => !value);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (
      (event.key === "Enter" || event.key === " ") &&
      (isProduct || hasChildren)
    ) {
      event.preventDefault();
      handleClick();
    }

    if (event.key === "ArrowRight" && hasChildren) {
      setIsOpen(true);
    }

    if (event.key === "ArrowLeft" && hasChildren) {
      setIsOpen(false);
    }
  };

  return (
    <li className="select-none">
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={hasChildren ? forceOpen || isOpen : undefined}
        aria-current={isSelected ? "page" : undefined}
        style={{ paddingLeft: `${depth * 16}px` }}
        className="group w-full text-left"
      >
        {isProduct ? (
          <div
            className={cn(
              "relative flex items-center gap-3 overflow-hidden border border-l-[3px] rounded-[2px] px-4 py-2 transition-all duration-200",
              isSelected
                ? "border-l-[#279ECE] border-[#279ECE]/25 bg-[#E3F1F7] shadow-sm"
                : "border-l-[#279ECE] bg-white hover:-translate-y-0.5 hover:border-[#279ECE]/40 hover:shadow-md",
            )}
          >
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] transition-all",
                isSelected
                  ? "bg-[#279ECE]"
                  : "bg-[#279ECE]/10 group-hover:bg-[#279ECE]",
              )}
            >
              {isSelected ? (
                <CircleCheck className="h-[15px] w-[15px] text-white" />
              ) : (
                <FolderTree className="h-[15px] w-[15px] text-[#279ECE] transition-colors group-hover:text-white" />
              )}
            </div>
                        <div
              ref={textContainerRef}
              className="relative flex-1 overflow-hidden"
            >
              <span
                ref={textRef}
                className={cn(
                  "inline-block whitespace-nowrap text-[13.5px] font-semibold leading-snug",
                  isSelected
                    ? "text-[#276A96]"
                    : "text-[#1E293B]",
                  shouldMarquee &&
                    "animate-[sidebarMarquee_10s_ease-in-out_infinite]",
                )}
              >
                {getNodeLabel(node)}
              </span>
            </div>

            <ChevronRight
              className={cn(
                "h-[15px] w-[15px] shrink-0 transition-all",
                isSelected
                  ? "text-[#276A96]"
                  : "text-[#279ECE] group-hover:translate-x-1",
              )}
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200",
              "hover:bg-[#279ECE]/8",
            )}
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 text-[#279ECE] transition-transform",
                isOpen && "rotate-90",
              )}
            />

            <span className="text-[15px] font-semibold text-[#0F2A3D]">
              {getNodeLabel(node)}
            </span>
          </div>
        )}
      </button>

      {hasChildren && (forceOpen || isOpen) && (
        <ul className="mt-1 space-y-1">
          {children.map((child, index) => (
            <SidebarNode
              key={
                child.id ||
                child._id ||
                child.slug ||
                `${getNodeLabel(child)}-${index}`
              }
              node={child}
              selectedSlug={selectedSlug}
              setSelectedSlug={setSelectedSlug}
              depth={depth + 1}
              forceOpen={forceOpen}
              products={products}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default memo(SidebarNode);