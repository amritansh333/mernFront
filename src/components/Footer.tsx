import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo-footer.png";
import { useMachineComponentRouting } from "@/lib/product-experience/useMachineComponentRouting";

function getFooterLinks(
  machineComponents: ReturnType<typeof useMachineComponentRouting>,
) {
  return {
    Products: [
      {
        label: "Semi-Finished Products",
        href: "/products/thermoplastics-semi-finished-products",
        type: "category" as const,
      },
      {
        label: "Sheets & Blocks",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks",
        type: "subcategory" as const,
      },
      {
        label: "Coils & Rolls",
        href: "/products/thermoplastics-semi-finished-products/coils-rolls",
        type: "subcategory" as const,
      },
      {
        label: "Machine Components",
        href: "/products/thermoplastics-machine-components",
        type: "category" as const,
      },
      {
        label: "Application Ready Sheets",
        href: "/products/thermoplastics-machine-components/application-ready-sheets",
        type: "subcategory" as const,
      },
      {
        label: "Machined Plastic Parts",
        href: "/products/thermoplastics-machine-components/machined-plastic-parts",
        type: "subcategory" as const,
      },
    ],
    Materials: [
      { label: "UHMW PE (Polyrib V)", href: "/materials/uhmwpe" },
      { label: "PC (Pcclear)", href: "/materials/pc" },
      { label: "PP (Polyrib P)", href: "/materials/pp" },
      { label: "HDPE (Polyrib H)", href: "/materials/hdpe" },
      { label: "Nylon (Kaylon)", href: "/materials/pa6" },
      { label: "Acetal / POM (Paketal)", href: "/materials/acetal-pom" }
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "CSR & Sustainability", href: "/csr" },
      { label: "Careers", href: "/careers" },
      { label: "Blogs", href: "/blog" },
      { label: "Events", href: "/events" },
    ],
    Support: [
      { label: "Contact Us", href: "/contact?tab=quote" },
      { label: "Request a Quote", href: "/contact?tab=quote" },
      { label: "Industries", href: "/industries" },
      { label: "Material Selector", href: "/tools/material-selector" },
      { label: "Resources & Downloads", href: "/resources" },
    ],
  };
}

const brands = [
  {
    label: "POLYRIB V",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v",
  },
  {
    label: "POLYRIB H",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-h",
  },
  {
    label: "POLYRIB P",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p",
  },
  {
    label: "PCCLEAR",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/pcclear",
  },
  {
    label: "KAYLON",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/pakaylon",
  },
];

export function Footer() {
  const machineComponents = useMachineComponentRouting();
  const footerLinks = getFooterLinks(machineComponents);

  const companyLinks = footerLinks.Company;
  const supportLinks = footerLinks.Support;
  const materialLinks = footerLinks.Materials;
  const productLinks = footerLinks.Products;

  return (
    <footer className="bg-charcoal text-primary-foreground overflow-hidden">
      {/* ================= TRUST / CTA SECTION ================= */}
      <div className="relative overflow-hidden bg-primary border-b border-white/10">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-white/[0.05] blur-2xl" />
          <div className="absolute -left-12 -bottom-12 w-32 h-32 rounded-full bg-cyan-300/[0.06] blur-2xl" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5">
            {/* Trust content */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-1.5 mb-1.5">
                
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] font-semibold text-white/75">
                  Trusted Since 1985
                </p>
              </div>

              <h3 className="font-heading text-base sm:text-lg lg:text-xl leading-tight font-bold text-white">
                Get the right thermoplastic for your application
              </h3>

              <p className="text-white/65 mt-1 text-xs sm:text-sm leading-relaxed max-w-lg">
                Our technical team helps you select the ideal grade from our
                extensive Polyrib product range.
              </p>
            </div>

            {/* CTA */}
            <div className="shrink-0 w-full sm:w-auto">
              <Link
                to="/tools/material-selector"
                className="
                  group inline-flex items-center justify-center
                  w-full sm:w-auto
                  gap-2 px-4 py-2.5
                  bg-white text-primary
                  rounded-xl
                  font-semibold text-xs sm:text-sm
                  shadow-md shadow-black/10
                  hover:bg-white/90
                  hover:-translate-y-0.5
                  transition-all duration-300
                "
              >
                Material Selector
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Responsive footer grid */}
        <div
          className="
            grid grid-cols-2
            lg:grid-cols-6
            gap-x-5 gap-y-7
            sm:gap-x-7 sm:gap-y-9
          "
        >
          {/* BRAND */}
          <div className="col-span-2 lg:col-span-2 flex flex-col items-start">
            <Link to="/" className="block mb-3">
              <div className="w-36 sm:w-44 md:w-48">
                <img
                  src={logoImg}
                  alt="Khanna Polyrib Pvt. Ltd."
                  className="w-full h-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-3 max-w-lg">
              India's leading manufacturer of engineering thermoplastic
              semi-finished products and machine components. Trusted across 20+
              industries worldwide.
            </p>

            {/* Brands */}
            <div className="w-full">
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/40 mb-2">
                Our Brands
              </p>

              <div className="flex flex-wrap gap-1.5">
                {brands.map((brand) => (
                  <Link
                    key={brand.label}
                    to={brand.href}
                    className="
                      inline-flex items-center
                      text-[9px] sm:text-[10px]
                      font-semibold tracking-wide
                      px-2 py-1
                      bg-white/[0.06]
                      border border-white/[0.08]
                      text-white/55
                      rounded-md
                      hover:bg-primary/20
                      hover:border-primary/40
                      hover:text-white
                      transition-all duration-200
                    "
                  >
                    {brand.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="col-span-1 lg:col-span-1 min-w-0">
            <h4 className="text-white font-heading font-semibold text-xs sm:text-sm mb-2.5 uppercase tracking-wider">
              Products
            </h4>

            <div className="space-y-2">
              {/* Semi-finished */}
              <div>
                <Link
                  to={productLinks[0].href}
                  className="flex items-start gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white hover:text-primary-light transition-colors"
                >
                  <span className="w-1.5 h-1.5 mt-1 rounded-full bg-primary-light shrink-0" />
                  <span>Semi-Finished Products</span>
                </Link>

                <div className="ml-[7px] mt-1 pl-3 border-l border-white/15 space-y-1">
                  {productLinks.slice(1, 3).map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block text-xs sm:text-sm text-white/50 hover:text-white transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Machine components */}
              <div>
                <Link
                  to={productLinks[3].href}
                  className="flex items-start gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white hover:text-primary-light transition-colors"
                >
                  <span className="w-1.5 h-1.5 mt-1 rounded-full bg-amber-400 shrink-0" />
                  <span>Machine Components</span>
                </Link>

                <div className="ml-[7px] mt-1 pl-3 border-l border-amber-400/20 space-y-1">
                  {productLinks.slice(4).map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block text-xs sm:text-sm text-white/50 hover:text-white transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MATERIALS */}
          <div className="col-span-1 lg:col-span-1 min-w-0">
            <h4 className="text-white font-heading font-semibold text-xs sm:text-sm mb-2 uppercase tracking-wider">
              Materials
            </h4>

            <div className="space-y-1">
              {materialLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="group flex items-start gap-2 text-xs sm:text-sm text-white/55 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 mt-1.5 rounded-full bg-primary-light/70 shrink-0 group-hover:bg-primary-light" />
                  <span className="leading-relaxed">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* COMPANY + SUPPORT: SIDE-BY-SIDE */}
          <div className="col-span-2 lg:col-span-2 grid grid-cols-2 gap-x-6">
            {/* COMPANY */}
            <div className="min-w-0">
              <h4 className="text-white font-heading font-semibold text-xs sm:text-sm mb-1 uppercase tracking-wider">
                Company
              </h4>

              <ul className="space-y-1">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUPPORT */}
            <div className="min-w-0">
              <h4 className="text-white font-heading font-semibold text-xs sm:text-sm mb-1 uppercase tracking-wider">
                Support
              </h4>

              <ul className="space-y-1">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="mt-3 pt-3 border-t border-white/10 space-y-3">
          {/* ADDRESS */}
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />

            <span className="text-white/55 text-xs sm:text-sm leading-relaxed">
              24/168 Birhana Road, Kanpur-208001, India
            </span>
          </div>

          {/* PHONE + EMAIL */}
          <div className="grid grid-cols-2 gap-3">
            {/* PHONE */}
            <div className="flex items-center gap-2 min-w-0">
              <Phone className="w-4 h-4 text-primary-light shrink-0" />

              <a
                href="tel:05152970306"
                className="text-white/55 text-xs sm:text-sm hover:text-white transition-colors truncate"
                aria-label="Call 0515-2970306"
              >
                0515-2970306
              </a>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-2 min-w-0">
              <Mail className="w-4 h-4 text-primary-light shrink-0" />

              <a
                href="mailto:info@polyrib.com"
                className="text-white/55 text-xs sm:text-sm hover:text-white transition-colors truncate"
              >
                info@polyrib.com
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-3 pt-4 border-t border-white/10 space-y-2">
          {/* DESIGN + COPYRIGHT */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2">
            {/* COPYRIGHT */}
            <p className="text-white/35 text-[10px] sm:text-xs text-center sm:text-left">
              © {new Date().getFullYear()} Khanna Polyrib Pvt. Ltd. All rights
              reserved.
            </p>

            {/* DESIGN CREDIT */}
            <a
              href="https://www.vigyapanam.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 text-white/55 hover:text-primary-light transition-colors duration-200 text-[10px] sm:text-xs hover:underline"
            >
              <Globe className="w-3.5 h-3.5 text-primary-light shrink-0" />
              Designed & Developed by Vigyapanam Digi Solutions
              <ArrowRight className="w-3 h-3 text-primary-light shrink-0" />
            </a>
          </div>

          {/* POLICY LINKS */}
          <div className="flex items-center justify-center gap-4 text-[10px] sm:text-xs text-white/35">
            <Link
              to="/privacy-policy"
              className="hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>

            <span className="h-3 w-px bg-white/20" />

            <Link
              to="/terms-and-conditions"
              className="hover:text-white/70 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}