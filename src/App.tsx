import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";

import Index from "@/pages/Index";
import AboutPage from "@/pages/AboutPage";
import BlogPage from "@/pages/BlogPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import CSRPage from "@/pages/CSRPage";
import IndustriesPage from "@/pages/IndustriesPage";
import IndustryDetailPage from "@/pages/IndustryDetailPage";
import MaterialsPage from "@/pages/MaterialsPage";
import MaterialSelectorPage from "@/pages/MaterialSelectorPage";
import ResourcesPage from "@/pages/ResourcesPage";

import ProductsPage from "@/pages/ProductsPage";

import SubcategoriesPage from "@/pages/SubcategoriesPage";
import BrandsPage from "@/pages/BrandsPage";
import BrandProductsPage from "@/pages/BrandProductsPage";

import ProductDetailPage from "@/pages/ProductDetailPage";

import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />

      <Routes>
        {/* Static pages */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/csr" element={<CSRPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        <Route path="/materials/:slug?" element={<MaterialsPage />} />
        <Route path="/tools/material-selector" element={<MaterialSelectorPage />} />
        <Route path="/resources" element={<ResourcesPage />} />

        {/* PRODUCT FLOW */}

{/* PRODUCT FLOW */}

<Route path="/products" element={<ProductsPage />} />

<Route
 path="/products/:categorySlug"
 element={<SubcategoriesPage />}
/>

<Route
 path="/products/:categorySlug/:subcategorySlug"
 element={<BrandsPage />}
/>

<Route
 path="/products/:categorySlug/:subcategorySlug/:brandSlug"
 element={<BrandProductsPage />}
/>

<Route
 path="/products/:categorySlug/:subcategorySlug/:brandSlug/:productSlug"
 element={<ProductDetailPage />}
/>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTopButton /> 

      <Footer />
      <SpeedInsights />
    </Router>
  );
}

export default App;