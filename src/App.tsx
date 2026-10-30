import { useCallback, useLayoutEffect, useRef, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MachineComponentsDataProvider } from "@/contexts/MachineComponentsDataContext";

import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import CallButton from "@/components/CallButton";
import { CookieConsentManager } from "@/components/cookie-consent";
import ScrollProgressBar from "@/components/ScrollProgressBar";

import SplashScreen from "@/components/splash/SplashScreen";

import Index from "@/pages/Index";
import AboutPage from "@/pages/AboutPage";
import BlogPage from "@/pages/BlogPage";
import EventsPage from "@/pages/EventsPage";
import EventDetailPage from "@/pages/EventDetailPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
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

function AppContent() {
  const location = useLocation();

  const [splashComplete, setSplashComplete] = useState(false);

  const siteContentRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef(location.pathname);

  // Show splash whenever the user enters the homepage.
  useLayoutEffect(() => {
    const enteredHomepage =
      location.pathname === "/" && previousPathRef.current !== "/";

    previousPathRef.current = location.pathname;

    if (enteredHomepage) {
      setSplashComplete(false);
    }
  }, [location.pathname]);

  // Pause/resume website animations during the splash.
  useLayoutEffect(() => {
    const siteContent = siteContentRef.current;

    if (!siteContent) return;

    const animations = siteContent.getAnimations({
      subtree: true,
    });

    if (!splashComplete) {
      animations.forEach((animation) => {
        animation.pause();
      });
    } else {
      animations.forEach((animation) => {
        animation.play();
      });
    }
  }, [splashComplete, location.pathname]);

  const handleSplashComplete = useCallback(() => {
    setSplashComplete(true);
  }, []);

  return (
    <MachineComponentsDataProvider>
      {/* Website remains visible behind the glass splash */}
      <div
        ref={siteContentRef}
        className={`site-content ${
          !splashComplete ? "site-content--paused" : ""
        }`}
      >
        <ScrollToTop />
        <ScrollProgressBar />

        <Header />

        <Routes>
          {/* Static pages */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
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
      </div>

      {/* Global splash overlay */}
      {!splashComplete && <SplashScreen onComplete={handleSplashComplete} />}
    </MachineComponentsDataProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
