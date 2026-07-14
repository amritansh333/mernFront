import type { MachineComponentProduct, MachineSidebarNode } from "@/types/machineComponent";

export function getNodeChildren(node: MachineSidebarNode) {
  return [
    ...(node.children ?? []),
    ...(node.subCategories ?? []),
    ...(node.brands ?? []),
    ...(node.products ?? []),
  ];
}

function getProductOrder(node: MachineSidebarNode, products?: Record<string, MachineComponentProduct>) {
  if (!node.slug) return undefined;
  const order = products?.[node.slug]?.machineComponentData?.order;
  return typeof order === "number" ? order : undefined;
}

export function sortNodesByProductOrder(
  nodes: MachineSidebarNode[],
  products?: Record<string, MachineComponentProduct>,
) {
  return nodes
    .map((node, index) => ({ node, index, order: getProductOrder(node, products) }))
    .sort((left, right) => {
      if (left.order !== undefined && right.order !== undefined) return left.order - right.order;
      if (left.order !== undefined) return -1;
      if (right.order !== undefined) return 1;
      return left.index - right.index;
    })
    .map(({ node }) => node);
}
