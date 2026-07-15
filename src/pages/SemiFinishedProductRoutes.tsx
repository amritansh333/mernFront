import { Route, Routes } from "react-router-dom";
import ProductsPage from "@/pages/ProductsPage";
import SubcategoriesPage from "@/pages/SubcategoriesPage";
import BrandsPage from "@/pages/BrandsPage";
import BrandProductsPage from "@/pages/BrandProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";

export default function SemiFinishedProductRoutes() {
  return (
    <Routes>
      <Route index element={<ProductsPage />} />
      <Route path=":categorySlug" element={<SubcategoriesPage />} />
      <Route path=":categorySlug/:subcategorySlug" element={<BrandsPage />} />
      <Route
        path=":categorySlug/:subcategorySlug/:brandSlug"
        element={<BrandProductsPage />}
      />
      <Route
        path=":categorySlug/:subcategorySlug/:brandSlug/:productSlug"
        element={<ProductDetailPage />}
      />
    </Routes>
  );
}
