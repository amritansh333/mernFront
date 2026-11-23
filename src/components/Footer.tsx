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
        label: "SEMI-FINISHED PRODUCTS",
        href: "/products/thermoplastics-semi-finished-products",
      },
      {
        label: "Rods & Tubes",
        href: "/products/thermoplastics-semi-finished-products/rods-tubes",
      },
      {
        label: "Sheets & Blocks",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks",
      },
      {
        label: "Coils & Rolls",
        href: "/products/thermoplastics-semi-finished-products/coils-rolls",
      },
      {
        label: "ENGINEERED PRODUCTS",
        href: "/products/thermoplastics-machine-components",
      },
      {
        label: "Strips",
        href: "/products/thermoplastics-machine-components/strips",
      },
      {
        label: "Application Ready Sheets",
        href: "/products/thermoplastics-machine-components/application-ready-sheets",
      },
      {
        label: "Machined Plastic Parts",
        href: "/products/thermoplastics-machine-components/machined-plastic-parts",
      },
    ],
    Materials: [
      { label: "UHMW PE (Polyrib V)", href: "/materials/uhmwpe" },
      { label: "PC (Pcclear)", href: "/materials/pc" },
      { label: "PP (Polyrib P)", href: "/materials/pp" },
      { label: "HDPE (Polyrib H)", href: "/materials/hdpe" },
      { label: "Nylon (Kaylon)", href: "/materials/pa6" },
      { label: "Acetal / POM (Paketal)", href: "/materials/acetal-pom" },
      { label: "ABS / ASA (Polyrib A)", href: "/materials/abs" },
      { label: "HI-PS (KBK PS)", href: "/materials/hi-ps" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "CSR & Sustainability", href: "/csr" },
      { label: "Careers", href: "/careers" },
      { label: "Blog & Gallery", href: "/blog" },
      { label: "Events", href: "/events" },
      { label: "Resources & Downloads", href: "/resources" },
    ],
    Support: [
      { label: "Contact Us", href: "/contact?tab=quote" },
      { label: "Request a Quote", href: "/contact?tab=quote" },
      { label: "Send Your Drawing", href: "/contact?tab=drawing" },
      { label: "Material Selector", href: "/tools/material-selector" },
      { label: "Technical Downloads", href: "/resources" },
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
  {
    label: "PAKETAL",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
  },
  {
    label: "POLYRIB A",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-a",
  },
  {
    label: "DIPRA",
    href: "/products/thermoplastics-semi-finished-products/coils-rolls/dipra-add-clear-rolls",
  },
  {
    label: "PLASCON",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/plascon-v",
  },
];

export function Footer() {
  const machineComponents = useMachineComponentRouting();
  const footerLinks = getFooterLinks(machineComponents);

  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Top bar */}
      <div className="bg-primaryborder-b border-white/10">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="section-label text-white/50 mb-2">
                Trusted Since 1985
              </p>
              <h3 className="font-heading text-2xl text-white">
                Get the right thermoplastic for your application
              </h3>
              <p className="text-white/60 mt-2 text-sm max-w-md">
                Our technical team is available to help you select the ideal
                grade from our extensive Polyrib product range.
              </p>
            </div>
            <div className="flex gap-3 lg:justify-end">
              <Link
                to="/tools/material-selector"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-light transition-colors duration-200 rounded-xl"
              >
                Material Selector
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col items-start">
            {/* Logo */}
            <Link to="/" className="block mb-5">
              <div className="w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px]">
                <img
                  src={logoImg}
                  alt="Khanna Polyrib Pvt. Ltd."
                  className="w-full h-auto object-contain"
                />
              </div>
            </Link>

            {/* Text */}
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md lg:max-w-lg">
              India's leading manufacturer of engineering thermoplastic
              semi-finished products and machine components. Trusted across 20+
              industries worldwide.
            </p>

            {/* Brands */}
            <div className="flex flex-wrap gap-1.5">
              {brands.map((brand) => (
                <Link
                  key={brand.label}
                  to={brand.href}
                  className="text-[10px] font-semibold px-2 py-0.5 bg-white/10 text-white/60 tracking-wider hover:bg-white/20 hover:text-white transition-colors duration-200 rounded-xl"
                >
                  {brand.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-heading font-semibold text-sm mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/55 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary-light shrink-0" />
            <span className="text-white/55 text-sm">
              24/168 Birhana Road, Kanpur-208001, India
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary-light shrink-0" />
            <a
              href="tel:05152970306"
              className="text-white/55 text-sm hover:text-white transition-colors duration-200"
              aria-label="Call 0515-2970306"
            >
              0515-2970306
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary-light shrink-0" />
            <a
              href="mailto:info@polyrib.com"
              className="text-sm font-medium text-white/55 hover:underline"
            >
              info@polyrib.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} Khanna Polyrib Pvt. Ltd. All rights
            reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-white/35">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2">
              <Link
                to="/privacy-policy"
                className="hover:text-white/70 transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-and-conditions"
                className="hover:text-white/70 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
            <Globe className="w-4 h-4 text-primary-light shrink-0" />
            <a
              href="https://www.vigyapanam.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white/70 hover:text-primary-light transition-colors duration-200 text-sm hover:underline"
            >
              Designed &amp; Developed by Vigyapanam Digi Solutions
              <ArrowRight className="w-4 h-4 text-primary-light" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
