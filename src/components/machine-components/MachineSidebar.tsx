import { useMemo, useState } from "react";
import SidebarNode from "@/components/machine-components/SidebarNode";
import SidebarSearch from "@/components/machine-components/SidebarSearch";
import {
  Package2,
  Sparkles,
} from "lucide-react";
import {
  getNodeChildren,
  sortNodesByProductOrder,
} from "@/lib/machineComponentSidebar";
import type {
  MachineComponentProduct,
  MachineSidebarNode,
} from "@/types/machineComponent";

interface MachineSidebarProps {
  sidebar?: MachineSidebarNode[];
  products?: Record<string, MachineComponentProduct>;
  selectedSlug: string;
  setSelectedSlug: (slug: string) => void;
}

function getNodeLabel(node: MachineSidebarNode) {
  return `${node.name || node.title || node.label || node.slug || ""}`.toLowerCase();
}

function filterNodes(
  nodes: MachineSidebarNode[] = [],
  query: string,
  products?: Record<string, MachineComponentProduct>,
): MachineSidebarNode[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return sortNodesByProductOrder(nodes, products);
  }

  const filteredNodes = nodes
    .map((node) => {
      const filteredChildren = filterNodes(
        getNodeChildren(node),
        normalizedQuery,
        products,
      );

      const matches = getNodeLabel(node).includes(normalizedQuery);

      if (!matches && filteredChildren.length === 0) {
        return null;
      }

      return {
        ...node,
        children: filteredChildren,
      };
    })
    .filter((node): node is MachineSidebarNode => Boolean(node));

  return sortNodesByProductOrder(filteredNodes, products);
}

function countProducts(nodes: MachineSidebarNode[]): number {
  return nodes.reduce((total, node) => {
    const children = getNodeChildren(node);

    if (children.length === 0) {
      return total + 1;
    }

    return total + countProducts(children);
  }, 0);
}

export default function MachineSidebar({
  sidebar = [],
  products,
  selectedSlug,
  setSelectedSlug,
}: MachineSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredSidebar = useMemo(
    () => filterNodes(sidebar, search, products),
    [sidebar, search, products],
  );

  const hasSearch = search.trim().length > 0;

  return (
    <aside className="flex h-full flex-col overflow-hidden border-r border-[#279ECE]/15 bg-[#F7FBFE]">

      {/* ================= PREMIUM HEADER ================= */}

      <div
        className="
          relative
          overflow-hidden
          border-b
          border-[#279ECE]/15
          bg-gradient-to-br
          from-[#7FD2F3]
          via-[#53BCE8]
          to-[#2E92D2]
          px-5
          py-6
          text-white
        "
      >
        {/* Decorative Pattern 1 */}

        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        {/* Decorative Pattern 2 */}

        <div className="absolute -bottom-10 left-[-50px] h-28 w-28 rounded-full bg-white/10 blur-xl" />

        {/* Decorative Pattern 3 */}

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1.2px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10">

          {/* EXPLORE OUR RANGE */}

          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/15 px-3 py-1.5 backdrop-blur-md">

            <Sparkles className="h-3.5 w-3.5" />

            <span className="text-[9px] font-bold uppercase tracking-[0.18em]">
              Explore Our Range
            </span>

          </div>

          {/* HEADER CONTENT */}

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-md
                bg-white/10
                backdrop-blur-md
                ring-1
                ring-white/10
              "
            >
              <Package2 className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">

              <h2 className="text-[22px] text-white/90 font-bold leading-none tracking-tight">
                Machine Components
              </h2>

              <p className="mt-2 max-w-[240px] text-sm leading-6 text-white/90">
                Browse our complete range of industrial engineering plastic
                components.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="border-b border-[#279ECE]/10 bg-white px-4 py-4">

        <SidebarSearch
          value={search}
          onChange={setSearch}
          totalProducts={countProducts(filteredSidebar)}
        />

      </div>

      {/* ================= TREE ================= */}

      <nav
        className="
          machine-scrollbar
          flex-1
          overflow-y-auto
          px-3
          py-3
        "
        aria-label="Machine Components"
      >
                {filteredSidebar.length > 0 ? (
          <ul className="space-y-2">
            {filteredSidebar.map((node, index) => (
              <SidebarNode
                key={
                  node.id ||
                  node._id ||
                  node.slug ||
                  `${getNodeLabel(node)}-${index}`
                }
                node={node}
                selectedSlug={selectedSlug}
                setSelectedSlug={setSelectedSlug}
                forceOpen={hasSearch}
                products={products}
              />
            ))}
          </ul>
        ) : (
          <div className="rounded-md border border-dashed border-[#279ECE]/30 bg-white p-8 text-center">
            <Package2 className="mx-auto mb-3 h-8 w-8 text-[#279ECE]" />

            <p className="text-sm font-semibold text-[#0F2A3D]">
              No products found
            </p>

            <p className="mt-1 text-xs text-[#64748B]">
              Try another search keyword.
            </p>
          </div>
        )}
      </nav>

      {/* ================= FOOTER ================= */}

      {selectedSlug && (
        <div className="border-t border-[#279ECE]/10 bg-white px-4 py-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#279ECE]">
            Selected Product
          </p>

          <div className="truncate text-sm font-semibold text-[#0F2A3D]">
            {products?.[selectedSlug]?.name || selectedSlug}
          </div>
        </div>
      )}
    </aside>
  );
}
