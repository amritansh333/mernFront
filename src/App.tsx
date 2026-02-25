import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
import SubcategoryBrandsPage from "@/pages/SubcategoryBrandsPage";

import ProductDetailPage from "@/pages/ProductDetailPage";

import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
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
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/tools/material-selector" element={<MaterialSelectorPage />} />
        <Route path="/resources" element={<ResourcesPage />} />

        {/* PRODUCT FLOW */}

{/* PRODUCT FLOW */}

<Route path="/products" element={<ProductsPage />} />

<Route 
  path="/products/:categorySlug/:subCategorySlug/:brandSlug/:productSlug" 
  element={<ProductDetailPage />} 
/>

<Route 
  path="/products/:categorySlug/:subCategorySlug/:brandSlug" 
  element={<SubcategoryBrandsPage />} 
/>

<Route 
  path="/products/:categorySlug/:subCategorySlug" 
  element={<SubcategoryBrandsPage />} 
/>

<Route 
  path="/products/:categorySlug" 
  element={<SubcategoryBrandsPage />} 
/>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;