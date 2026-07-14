import { describe, expect, it } from "vitest";
import { normalizeMachineComponentsResponse } from "@/lib/machineComponentApi";

describe("normalizeMachineComponentsResponse", () => {
  it("normalizes wrapped backend responses without rebuilding sidebar data", () => {
    const data = normalizeMachineComponentsResponse({
      success: true,
      data: {
        navigation: [
          {
            title: "Strips",
            products: [
              {
                slug: "wear-strip",
                label: "Wear Strip",
                href: "/products/thermoplastics-machine-components/wear-strip",
              },
            ],
          },
        ],
        products: [
          {
            id: "wear-strip",
            title: "Wear Strip",
            imageUrl: "/uploads/wear-strip.jpg",
            features: ["Low friction"],
            downloads: [{ title: "Datasheet", href: "/downloads/wear-strip.pdf" }],
          },
        ],
        defaultSlug: "wear-strip",
      },
    });

    expect(data.experience).toBe("machine_components");
    expect(data.sidebar?.[0]?.title).toBe("Strips");
    expect(data.sidebar?.[0]?.children?.[0]?.label).toBe("Wear Strip");
    expect(data.products?.["wear-strip"]?.name).toBe("Wear Strip");
    expect(data.products?.["wear-strip"]?.image).toBe("/uploads/wear-strip.jpg");
    expect(data.products?.["wear-strip"]?.keyFeatures).toEqual(["Low friction"]);
    expect(data.products?.["wear-strip"]?.machineComponentData?.downloads).toEqual([
      { title: "Datasheet", href: "/downloads/wear-strip.pdf" },
    ]);
    expect(data.paths?.["wear-strip"]).toBe(
      "/products/thermoplastics-machine-components/wear-strip",
    );
    expect(data.defaultProduct).toBe("wear-strip");
  });

  it("keeps backend path maps as the canonical path source", () => {
    const data = normalizeMachineComponentsResponse({
      sidebar: [
        {
          slug: "machined-part",
          path: "/products/thermoplastics-machine-components/sidebar-path",
        },
      ],
      paths: {
        "machined-part": "/products/thermoplastics-machine-components/api-path",
      },
      products: {
        "machined-part": {
          name: "Machined Part",
        },
      },
    });

    expect(data.paths?.["machined-part"]).toBe(
      "/products/thermoplastics-machine-components/api-path",
    );
    expect(data.products?.["machined-part"]?.slug).toBe("machined-part");
  });
});
