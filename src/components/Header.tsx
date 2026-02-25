import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Home } from "lucide-react";
import logoImg from "@/assets/logo.jpg";

const navItems = [
  {
    label: "Products",
    megaMenu: true,
    columns: [
      {
        heading: "Semi-Finished Products",
        headingHref: "/products/semi-finished",
        items: [
          { label: "Sheets & Blocks", href: "/products/semi-finished/sheets-blocks" },
          { label: "Rods & Tubes", href: "/products/semi-finished/rods-tubes" },
          { label: "Welding Rods", href: "/products/semi-finished/welding-rods" },
          { label: "Custom Sheets", href: "/products/semi-finished/custom-sheets" },
          { label: "Coils & Rolls", href: "/products/semi-finished/coils-rolls" },
        ],
      },
      {
        heading: "Machine Components",
        headingHref: "/products/machine-components",
        items: [
          { label: "Strips & Profiles", href: "/products/machine-components/strips-profiles" },
          { label: "Vacuum Formed Parts", href: "/products/machine-components/vacuum-formed" },
          { label: "RIPLA Cutting Boards", href: "/products/machine-components/ripla-cutting-boards" },
          { label: "CUTRITE Chopping Boards", href: "/products/machine-components/chopping-boards" },
          { label: "Application Sheets", href: "/products/machine-components/application-sheets" },
          { label: "Machined Parts", href: "/products/machine-components/machined-parts" },
        ],
      },
    ],
  },
  {
    label: "Industries",
    children: [
      { label: "Aerospace", href: "/industries/aerospace" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "Food & Beverage", href: "/industries/food-beverage" },
      { label: "Chemical", href: "/industries/chemical" },
      { label: "Medical", href: "/industries/medical" },
      { label: "All Industries", href: "/industries" },
    ],
  },
  {
    label: "Materials",
    children: [
      { label: "PE / UHMW PE (POLYRIB V)", href: "/materials/polyrib-v" },
      { label: "PP (POLYRIB P / DIPRA)", href: "/materials/polyrib-p" },
      { label: "HDPE (POLYRIB H)", href: "/materials/polyrib-h" },
      { label: "PC (PCCLEAR)", href: "/materials/pcclear" },
      { label: "Nylon (KAYLON)", href: "/materials/kaylon" },
      { label: "Acetal/POM (PAKETAL)", href: "/materials/paketal" },
      { label: "ABS (POLYRIB A)", href: "/materials/polyrib-a" },
      { label: "All Materials", href: "/materials" },
    ],
  },
  {
    label: "Material Selector",
    href: "/tools/material-selector",
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about" },
      { label: "CSR & Sustainability", href: "/csr" },
      { label: "Careers", href: "/careers" },
      { label: "Blog & Gallery", href: "/blog" },
      { label: "Resources & Downloads", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleCategoryClick = (label: string, href?: string) => {
    if (!href) {
      setOpenDropdown(openDropdown === label ? null : label);
    } else {
      navigate(href);
      setOpenDropdown(null);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card shadow-header" : "bg-card/95 backdrop-blur-sm border-b border-divider"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo — also acts as Home link */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logoImg}
              alt="Khanna Polyrib Pvt. Ltd."
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Home icon link */}
            <Link
              to="/"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary rounded-sm ${
                location.pathname === "/" ? "text-primary" : "text-charcoal-light"
              }`}
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </Link>

            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                ref={(el) => { dropdownRefs.current[item.label] = el; }}
              >
                <button
                  onClick={() => handleCategoryClick(item.label, item.children || item.megaMenu ? undefined : item.href)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary rounded-sm ${
                    openDropdown === item.label
                      ? "text-primary"
                      : location.pathname.startsWith(item.href || "__") ||
                        (item.children?.some(c => location.pathname.startsWith(c.href))) ||
                        (item.megaMenu && item.columns?.some(col => col.items.some(i => location.pathname.startsWith(i.href))))
                      ? "text-primary"
                      : "text-charcoal-light"
                  }`}
                >
                  {item.label}
                  {(item.children || item.megaMenu) && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Standard Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border shadow-card-hover z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        to={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-charcoal-light hover:text-primary hover:bg-surface-subtle border-b border-divider last:border-0 transition-colors duration-150"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mega Menu for Products */}
                {item.megaMenu && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-card border border-border shadow-card-hover z-50 w-[480px]">
                    <div className="grid grid-cols-2 divide-x divide-divider">
                      {item.columns?.map((col) => (
                        <div key={col.heading} className="p-4">
                          <Link
                            to={col.headingHref}
                            onClick={() => setOpenDropdown(null)}
                            className="block text-[10px] font-bold uppercase tracking-widest text-primary pb-2 mb-2 border-b border-divider hover:text-primary-dark transition-colors"
                          >
                            {col.heading}
                          </Link>
                          <div className="space-y-0.5">
                            {col.items.map((sub) => (
                              <Link
                                key={sub.href + sub.label}
                                to={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                className="block px-2 py-2 text-sm text-charcoal-light hover:text-primary hover:bg-surface-subtle rounded-sm transition-colors duration-150"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-divider px-4 py-2.5 bg-surface-subtle">
                      <Link
                        to="/products"
                        onClick={() => setOpenDropdown(null)}
                        className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                      >
                        View All Products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-divider max-h-[80vh] overflow-y-auto">
          <nav className="container px-6 py-4 space-y-1">
            {/* Home link for mobile */}
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium border-b border-divider text-charcoal-light"
            >
              <Home className="w-4 h-4" /> Home
            </Link>

            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    item.children || item.megaMenu
                      ? setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      : navigate(item.href || "/")
                  }
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium border-b border-divider text-left ${
                    location.pathname.startsWith(item.href || "__") ? "text-primary" : "text-charcoal-light"
                  }`}
                >
                  {item.label}
                  {(item.children || item.megaMenu) && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Standard children mobile */}
                {item.children && mobileExpanded === item.label && (
                  <div className="bg-surface-subtle">
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        to={child.href}
                        className="block px-5 py-2 text-xs font-medium text-muted-foreground border-b border-divider hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mega menu mobile — show as grouped list */}
                {item.megaMenu && mobileExpanded === item.label && (
                  <div className="bg-surface-subtle">
                    {item.columns?.map((col) => (
                      <div key={col.heading}>
                        <Link
                          to={col.headingHref}
                          className="block px-4 pt-2.5 pb-1 text-[10px] font-bold uppercase tracking-widest text-primary border-b border-divider hover:text-primary-dark"
                        >
                          {col.heading}
                        </Link>
                        {col.items.map((sub) => (
                          <Link
                            key={sub.href + sub.label}
                            to={sub.href}
                            className="block px-6 py-2 text-xs font-medium text-muted-foreground border-b border-divider hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link
                      to="/products"
                      className="block px-4 py-2.5 text-xs font-semibold text-primary border-b border-divider"
                    >
                      View All Products →
                    </Link>
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                to="/contact"
                className="block w-full text-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold"
              >
                Request Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
