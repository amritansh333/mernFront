import { describe, expect, it } from "vitest";
import { normalizeMachineComponentsResponse } from "@/lib/machineComponentApi";

describe("normalizeMachineComponentsResponse", () => {
  it("normalizes the frozen backend response shape for UI consumption", () => {
    const data = normalizeMachineComponentsResponse({
      success: true,
      data: {
        experience: "machine_components",
        sidebar: [
          {
            name: "Strips",
            children: [
              {
                slug: "wear-strip",
                name: "Wear Strip",
                path: "/products/thermoplastics-machine-components/wear-strip",
              },
            ],
          },
        ],
        products: {
          "wear-strip": {
            slug: "wear-strip",
            name: "Wear Strip",
            image: "/uploads/wear-strip.jpg",
            keyFeatures: ["Low friction"],
            machineComponentData: {
              downloads: [{ label: "Datasheet", url: "/downloads/wear-strip.pdf" }],
            },
          },
        },
        defaultProduct: "wear-strip",
        paths: {
          "wear-strip": "/products/thermoplastics-machine-components/wear-strip",
        },
        seo: {
          title: "Machine Components",
          description: "Thermoplastics machine components.",
          keywords: ["machine components", "thermoplastics"],
          canonical: "/products/thermoplastics-machine-components",
        },
      },
    });

    expect(data.experience).toBe("machine_components");
    expect(data.sidebar?.[0]?.children?.[0]?.path).toBe(
      "/products/thermoplastics-machine-components/wear-strip",
    );
    expect(data.products?.["wear-strip"]?.name).toBe("Wear Strip");
    expect(data.products?.["wear-strip"]?.keyFeatures).toEqual(["Low friction"]);
    expect(data.products?.["wear-strip"]?.machineComponentData?.downloads).toEqual([
      { label: "Datasheet", url: "/downloads/wear-strip.pdf" },
    ]);
    expect(data.paths?.["wear-strip"]).toBe(
      "/products/thermoplastics-machine-components/wear-strip",
    );
    expect(data.defaultProduct).toBe("wear-strip");
    expect(data.seo?.canonical).toBe("/products/thermoplastics-machine-components");
  });

  it("requires backend-provided product slug values", () => {
    const data = normalizeMachineComponentsResponse({
      success: true,
      data: {
        products: {
          "map-key-only": {
            name: "Missing Slug Product",
          },
          "backend-key": {
            slug: "canonical-slug",
            name: "Canonical Product",
          },
        },
      },
    });

    expect(data.products?.["canonical-slug"]?.name).toBe("Canonical Product");
    expect(data.products?.["map-key-only"]).toBeUndefined();
  });
});
