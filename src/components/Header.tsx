import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  ArrowRight,
} from "lucide-react";
import logoImg from "@/assets/logo-footer.png";
import { useMachineComponentRouting } from "@/lib/product-experience/useMachineComponentRouting";

type ProductLink = {
  label: string;
  href: string;
};

type Subcategory = ProductLink & {
  children?: ProductLink[];
};

type ProductColumn = {
  heading: string;
  headingHref: string;
  items: Subcategory[];
};

type NavItem = {
  label: string;
  href?: string;
  megaMenu?: boolean;
  columns?: ProductColumn[];
  children?: ProductLink[];
};

function getNavItems(
  _machineComponents: ReturnType<typeof useMachineComponentRouting>,
): NavItem[] {
  return [
    {
      label: "Products",
      megaMenu: true,
      columns: [
        {
          heading: "Thermoplastics Semi-Finished Products",
          headingHref: "/products/thermoplastics-semi-finished-products",
          items: [
            {
              label: "Sheets & Blocks",
              href: "/products/thermoplastics-semi-finished-products/sheets-blocks",
              children: [
                {
                  label: "POLYRIB V",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v",
                },
                {
                  label: "PCCLEAR",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/pcclear",
                },
                {
                  label: "POLYRIB P",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p",
                },
                {
                  label: "POLYRIB H",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-h",
                },
                {
                  label: "HITECH",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/hitech",
                },
                {
                  label: "ARETE",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/arete",
                },
                {
                  label: "POLYLIMB",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polylimb",
                },
                {
                  label: "CUTRITE",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite",
                },
                {
                  label: "PLASCON-V",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/plascon-v",
                },
                {
                  label: "PAKAYLON",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/pakaylon",
                },
                {
                  label: "PAKETAL",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
                },
                {
                  label: "POLYRIB-A",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-a",
                },
                {
                  label: "KBK-PS",
                  href: "/products/thermoplastics-semi-finished-products/sheets-blocks/kbk-ps",
                },
              ],
            },
            {
              label: "Rods & Tubes",
              href: "/products/thermoplastics-semi-finished-products/rods-tubes",
              children: [
                {
                  label: "PLASCON V",
                  href: "/products/thermoplastics-semi-finished-products/rods-tubes/plascon-v",
                },
                {
                  label: "PAKAYLON",
                  href: "/products/thermoplastics-semi-finished-products/rods-tubes/pakaylon",
                },
              ],
            },
            {
              label: "Coils & Rolls",
              href: "/products/thermoplastics-semi-finished-products/coils-rolls",
              children: [
                {
                  label: "DIPRA ADDCLEAR",
                  href: "/products/thermoplastics-semi-finished-products/coils-rolls/dipra-add-clear-rolls",
                },
                {
                  label: "HDGL",
                  href: "/products/thermoplastics-semi-finished-products/coils-rolls/hdgl",
                },
                {
                  label: "HITECH-GL",
                  href: "/products/thermoplastics-semi-finished-products/coils-rolls/hitech-gl",
                },
                {
                  label: "PCCLEAR",
                  href: "/products/thermoplastics-semi-finished-products/coils-rolls/pcclear-rolls",
                },
                {
                  label: "PPGL",
                  href: "/products/thermoplastics-semi-finished-products/coils-rolls/ppgl",
                },
                {
                  label: "POLYRIB-H",
                  href: "/products/thermoplastics-semi-finished-products/coils-rolls/polyrib-h-rolls",
                },
              ],
            },
            {
              label: "Welding Rods",
              href: "/products/thermoplastics-semi-finished-products/welding-rod",
              children: [
                {
                  label: "POLYRIB-H",
                  href: "/products/thermoplastics-semi-finished-products/welding-rod/polyrib-h-wr",
                },
                {
                  label: "POLYRIB-P",
                  href: "/products/thermoplastics-semi-finished-products/welding-rod/polyrib-p-wr",
                },
              ],
            },
            {
              label: "Custom-Sized Plastic Sheets",
              href: "/products/thermoplastics-semi-finished-products/custom-sized-plastic-sheets",
            },
          ],
        },
        {
          heading: "Thermoplastics Engineered Products",
          headingHref: "/products/thermoplastics-machine-components",
          items: [
            {
              label: "Strips",
              href: "/products/thermoplastics-machine-components/strips",
            },
            {
              label: "Profiles",
              href: "/products/thermoplastics-machine-components/profiles",
            },
            {
              label: "Vacuum Formed Plastic Parts",
              href: "/products/thermoplastics-machine-components/vacuum-formed-plastic-parts",
              children: [
                {
                  label: "PCCLEAR BASE-PLATE",
                  href: "/products/thermoplastics-machine-components/vacuum-formed-plastic-parts/pcclear-base-plate",
                },
                {
                  label: "PCCLEAR LOUVERS",
                  href: "/products/thermoplastics-machine-components/vacuum-formed-plastic-parts/pcclear-louvers",
                },
              ],
            },
            {
              label: "Soft Cutting Board: Ripla",
              href: "/products/thermoplastics-machine-components/cutting-board",
              children: [
                {
                  label: "POLYRIB RIPLA",
                  href: "/products/thermoplastics-machine-components/cutting-board",
                },
                {
                  label: "POLYRIB RIPLA HIH",
                  href: "/products/thermoplastics-machine-components/vacuum-formed-plastic-parts/cutting-board",
                },
                {
                  label: "POLYRIB RIPLA HIK",
                  href: "/products/thermoplastics-machine-components/vacuum-formed-plastic-parts/cutting-board",
                },
                {
                  label: "POLYRIB RIPLA HITECH",
                  href: "/products/thermoplastics-machine-components/vacuum-formed-plastic-parts/cutting-board",
                },
              ],
            },
            {
              label: "Chopping Board: Cutrite",
              href: "/products/thermoplastics-machine-components/chopping-board",
              children: [
                {
                  label: "POLYRIB CUTRITE",
                  href: "/products/thermoplastics-machine-components/chopping-board",
                },
                {
                  label: "POLYRIB CUTRITE EMB",
                  href: "/products/thermoplastics-machine-components/chopping-board",
                },
                {
                  label: "CUTRITE-L CED",
                  href: "/products/thermoplastics-machine-components/chopping-board",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Industries",
      children: [
        { label: "Automotive", href: "/industries/automotive" },
        { label: "Chemical", href: "/industries/chemical" },
        { label: "Food & Beverage", href: "/industries/food-beverage" },
        {
          label: "Medical & Pharmaceutical",
          href: "/industries/pharmaceutical",
        },
        { label: "Oil & Gas", href: "/industries/oil-gas" },
        { label: "All Industries", href: "/industries" },
      ],
    },
    {
      label: "Materials",
      children: [
        { label: "PE / UHMW PE (POLYRIB V)", href: "/materials/uhmwpe" },
        { label: "PP (POLYRIB P / DIPRA)", href: "/materials/pp" },
        { label: "HDPE (POLYRIB H)", href: "/materials/hdpe" },
        { label: "PC (PCCLEAR)", href: "/materials/pc" },
        { label: "Nylon (KAYLON)", href: "/materials/pa6" },
        { label: "Acetal/POM (PAKETAL)", href: "/materials/acetal" },
        { label: "ABS (POLYRIB A)", href: "/materials/abs" },
        { label: "PE (PLASCON V)", href: "/materials/pe" },
        { label: "PPS (DIPRA)", href: "/materials/pps" },
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
        { label: "Events", href: "/events" },
        { label: "Resources & Downloads", href: "/resources" },
        { label: "Contact", href: "/contact?tab=quote" },
      ],
    },
  ];
}

export function Header() {
  const machineComponents = useMachineComponentRouting();
  const navItems = getNavItems(machineComponents);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openProductSubmenu, setOpenProductSubmenu] = useState<string | null>(
    null,
  );
  const [mobileProductSubmenu, setMobileProductSubmenu] = useState<
    string | null
  >(null);

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
    setOpenProductSubmenu(null);
    setMobileProductSubmenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openDropdown) return;

      const ref = dropdownRefs.current[openDropdown];

      if (ref && !ref.contains(event.target as Node)) {
        setOpenDropdown(null);
        setOpenProductSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleCategoryClick = (label: string, href?: string) => {
    if (!href) {
      setOpenDropdown((current) => (current === label ? null : label));
      setOpenProductSubmenu(null);
    } else {
      navigate(href);
      setOpenDropdown(null);
      setOpenProductSubmenu(null);
    }
  };

  const getSubmenuKey = (heading: string, label: string) =>
    `${heading}:${label}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card shadow-header"
          : "bg-card/95 backdrop-blur-sm border-b border-divider"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 sm:h-19 lg:h-22">
          {/* Logo — also acts as Home link */}
          <Link to="/" className="flex items-center h-full shrink-0">
            <img
              src={logoImg}
              alt="Khanna Polyrib Pvt. Ltd."
              className="h-[70%] sm:h-[75%] lg:h-[80%] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Home icon link */}
            <Link
              to="/"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary rounded-sm ${
                location.pathname === "/"
                  ? "text-primary"
                  : "text-charcoal-light"
              }`}
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </Link>

            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                ref={(element) => {
                  dropdownRefs.current[item.label] = element;
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleCategoryClick(
                      item.label,
                      item.children || item.megaMenu ? undefined : item.href,
                    )
                  }
                  aria-expanded={openDropdown === item.label}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary rounded-sm ${
                    openDropdown === item.label
                      ? "text-primary"
                      : location.pathname.startsWith(item.href || "__") ||
                          item.children?.some((child) =>
                            location.pathname.startsWith(child.href),
                          ) ||
                          (item.megaMenu &&
                            item.columns?.some(
                              (column) =>
                                location.pathname.startsWith(
                                  column.headingHref,
                                ) ||
                                column.items.some(
                                  (sub) =>
                                    location.pathname.startsWith(sub.href) ||
                                    sub.children?.some((product) =>
                                      location.pathname.startsWith(
                                        product.href,
                                      ),
                                    ),
                                ),
                            ))
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
                  <div className="absolute top-full left-0 mt-1 w-64 max-h-[75vh] overflow-y-auto bg-card border border-border shadow-card-hover z-50">
                    {item.children.map((child, index) => {
                      const isLast = index === item.children!.length - 1;

                      return isLast ? (
                        <div
                          key={child.href + child.label}
                          className="border-t border-divider px-4 py-2.5 bg-surface-subtle"
                        >
                          <Link
                            to={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                          >
                            {child.label} →
                          </Link>
                        </div>
                      ) : (
                        <Link
                          key={child.href + child.label}
                          to={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm text-charcoal-light hover:text-primary hover:bg-surface-subtle border-b border-divider transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Desktop Products Mega Menu */}
                {item.megaMenu && openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-1 w-[min(520px,calc(100vw-2rem))] max-h-[80vh] overflow-y-auto bg-card border border-border shadow-card-hover z-50"
                    onMouseLeave={() => setOpenProductSubmenu(null)}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-divider">
                      {item.columns?.map((column) => (
                        <div key={column.heading} className="p-3 sm:p-4 min-w-0">
                          <Link
                            to={column.headingHref}
                            onClick={() => {
                              setOpenDropdown(null);
                              setOpenProductSubmenu(null);
                            }}
                            className="block text-[10px] font-bold uppercase tracking-widest text-primary pb-2 mb-2 border-b border-divider hover:text-primary-dark transition-colors"
                          >
                            {column.heading}
                          </Link>

                          <div className="space-y-0.5">
                            {column.items.map((sub) => {
                              const submenuKey = getSubmenuKey(
                                column.heading,
                                sub.label,
                              );
                              const hasChildren = Boolean(
                                sub.children?.length,
                              );
                              const isSubmenuOpen =
                                openProductSubmenu === submenuKey;

                              return (
                                <div
                                  key={sub.href + sub.label}
                                  className="relative"
                                  onMouseEnter={() => {
                                    setOpenProductSubmenu(
                                      hasChildren ? submenuKey : null,
                                    );
                                  }}
                                >
                                  <div className="flex items-center rounded-sm hover:bg-surface-subtle transition-colors duration-150">
                                    <Link
                                      to={sub.href}
                                      onClick={() => {
                                        setOpenDropdown(null);
                                        setOpenProductSubmenu(null);
                                      }}
                                      className="flex-1 min-w-0 px-2 py-2 text-sm text-charcoal-light hover:text-primary transition-colors duration-150"
                                    >
                                      {sub.label}
                                    </Link>

                                    {hasChildren && (
                                      <button
                                        type="button"
                                        aria-label={`Show ${sub.label} products`}
                                        aria-expanded={isSubmenuOpen}
                                        onClick={(event) => {
                                          event.preventDefault();
                                          event.stopPropagation();

                                          setOpenProductSubmenu(
                                            isSubmenuOpen ? null : submenuKey,
                                          );
                                        }}
                                        className="shrink-0 p-2 text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                      >
                                        <ChevronRight
                                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                            isSubmenuOpen ? "rotate-90" : ""
                                          }`}
                                        />
                                      </button>
                                    )}
                                  </div>

                                  {/* Nested submenu: positioned within the mega menu */}
                                  {hasChildren && isSubmenuOpen && (
                                    <div className="mt-1 mb-2 ml-2 border-l-2 border-primary/20 bg-surface-subtle">
                                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-primary border-b border-divider">
                                        {sub.label}
                                      </div>

                                      {sub.children!.map((product) => (
                                        <Link
                                          key={product.href + product.label}
                                          to={product.href}
                                          onClick={() => {
                                            setOpenDropdown(null);
                                            setOpenProductSubmenu(null);
                                          }}
                                          className="flex items-center gap-2 px-3 py-2 text-xs text-charcoal-light hover:text-primary hover:bg-card transition-colors duration-150"
                                        >
                                          <ChevronRight className="w-3 h-3 shrink-0 text-primary/70" />
                                          <span>{product.label}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-divider px-4 py-2.5 bg-surface-subtle">
                      <Link
                        to="/products"
                        onClick={() => {
                          setOpenDropdown(null);
                          setOpenProductSubmenu(null);
                        }}
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
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/contact?tab=quote"
              className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-[#279ECE] to-[#1F7FA8] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#279ECE]/30 rounded-lg"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-divider max-h-[80vh] overflow-y-auto overscroll-contain">
          <nav className="container px-6 py-4 space-y-1">
            {/* Home link for mobile */}
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium border-b border-divider text-charcoal-light"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() =>
                    item.children || item.megaMenu
                      ? setMobileExpanded((current) =>
                          current === item.label ? null : item.label,
                        )
                      : navigate(item.href || "/")
                  }
                  aria-expanded={mobileExpanded === item.label}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium border-b border-divider text-left ${
                    location.pathname.startsWith(item.href || "__")
                      ? "text-primary"
                      : "text-charcoal-light"
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
                    {item.children.map((child, index) => {
                      const isLast = index === item.children!.length - 1;

                      return isLast ? (
                        <div
                          key={child.href + child.label}
                          className="border-t border-divider px-5 py-2.5"
                        >
                          <Link
                            to={child.href}
                            className="block text-xs font-semibold text-primary"
                          >
                            {child.label} →
                          </Link>
                        </div>
                      ) : (
                        <Link
                          key={child.href + child.label}
                          to={child.href}
                          className="block px-5 py-2 text-xs font-medium text-muted-foreground border-b border-divider hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Mobile Products Mega Menu */}
                {item.megaMenu && mobileExpanded === item.label && (
                  <div className="bg-surface-subtle">
                    {item.columns?.map((column) => (
                      <div key={column.heading}>
                        <Link
                          to={column.headingHref}
                          className="block px-4 pt-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-primary border-b border-divider hover:text-primary-dark"
                        >
                          {column.heading}
                        </Link>

                        {column.items.map((sub) => {
                          const submenuKey = getSubmenuKey(
                            column.heading,
                            sub.label,
                          );
                          const hasChildren = Boolean(
                            sub.children?.length,
                          );
                          const isExpanded =
                            mobileProductSubmenu === submenuKey;

                          return (
                            <div
                              key={sub.href + sub.label}
                              className="border-b border-divider"
                            >
                              <div className="flex items-center">
                                <Link
                                  to={sub.href}
                                  className="flex-1 min-w-0 px-6 py-3 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {sub.label}
                                </Link>

                                {hasChildren && (
                                  <button
                                    type="button"
                                    aria-label={`Show ${sub.label} products`}
                                    aria-expanded={isExpanded}
                                    onClick={() =>
                                      setMobileProductSubmenu(
                                        isExpanded ? null : submenuKey,
                                      )
                                    }
                                    className="p-3 mr-2 text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                  >
                                    <ChevronDown
                                      className={`w-4 h-4 transition-transform duration-200 ${
                                        isExpanded ? "rotate-180" : ""
                                      }`}
                                    />
                                  </button>
                                )}
                              </div>

                              {/* Nested mobile product links */}
                              {hasChildren && isExpanded && (
                                <div className="bg-card border-t border-divider">
                                  {sub.children!.map((product) => (
                                    <Link
                                      key={product.href + product.label}
                                      to={product.href}
                                      className="flex items-center gap-2 pl-10 pr-5 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-surface-subtle transition-colors"
                                    >
                                      <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                                      <span>{product.label}</span>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}

                    <Link
                      to="/products"
                      className="block px-4 py-3 text-xs font-semibold text-primary border-t border-divider"
                    >
                      View All Products →
                    </Link>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#279ECE] to-[#1F7FA8] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#279ECE]/30 rounded-lg"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}