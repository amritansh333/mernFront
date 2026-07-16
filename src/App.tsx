import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MachineComponentsDataProvider } from "@/contexts/MachineComponentsDataContext";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import CallButton from "@/components/CallButton";
import { CookieConsentManager } from "@/components/cookie-consent";

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

import ProductExperienceRouter from "@/pages/ProductExperienceRouter";

import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
       
      <MachineComponentsDataProvider>
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
          <Route
            path="/tools/material-selector"
            element={<MaterialSelectorPage />}
          />
          <Route path="/resources" element={<ResourcesPage />} />

          {/* PRODUCT FLOW */}
          <Route path="/products/*" element={<ProductExperienceRouter />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CallButton />
        <ScrollToTopButton />
        <CookieConsentManager />

        <Footer />

      </MachineComponentsDataProvider>
    </Router>
    
  );
}

export default App;
