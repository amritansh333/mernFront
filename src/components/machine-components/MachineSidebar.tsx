import { useState } from "react";
import SidebarNode from "@/components/machine-components/SidebarNode";
import SidebarSearch from "@/components/machine-components/SidebarSearch";
import type { MachineSidebarNode } from "@/types/machineComponent";

interface MachineSidebarProps {
  sidebar?: MachineSidebarNode[];
  selectedSlug: string;
  setSelectedSlug: (slug: string) => void;
}

function getNodeLabel(node: MachineSidebarNode) {
  return `${node.name || node.title || node.label || node.slug || ""}`.toLowerCase();
}

function filterNodes(nodes: MachineSidebarNode[] = [], query: string): MachineSidebarNode[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return nodes;

  return nodes
    .map((node) => {
      const children = [...(node.children ?? []), ...(node.products ?? [])];
      const filteredChildren = filterNodes(children, normalizedQuery);
      const matches = getNodeLabel(node).includes(normalizedQuery);

      if (!matches && filteredChildren.length === 0) return null;

      return {
        ...node,
        children: filteredChildren,
        products: [],
      };
    })
    .filter(Boolean) as MachineSidebarNode[];
}

export default function MachineSidebar({ sidebar = [], selectedSlug, setSelectedSlug }: MachineSidebarProps) {
  const [search, setSearch] = useState("");
  const filteredSidebar = filterNodes(sidebar, search);

  return (
    <aside className="h-full overflow-hidden border-r border-divider bg-surface-subtle">
      <div className="flex h-full flex-col">
        <div className="border-b border-divider p-4">
          <p className="section-label mb-3">Machine Components</p>
          <SidebarSearch value={search} onChange={setSearch} />
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto p-3" aria-label="Machine Components">
          {filteredSidebar.length > 0 && (
            <ul className="space-y-1">
              {filteredSidebar.map((node, index) => (
                <SidebarNode
                  key={node.id || node._id || node.slug || `${getNodeLabel(node)}-${index}`}
                  node={node}
                  selectedSlug={selectedSlug}
                  setSelectedSlug={setSelectedSlug}
                />
              ))}
            </ul>
          )}
        </nav>
      </div>
    </aside>
  );
}
