import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo-footer.png";

const footerLinks = {
  Products: [
    { label: "Semi-Finished Products", href: "/products/thermoplastics-semi-finished-products" },
    { label: "Rods & Tubes", href: "/products/thermoplastics-semi-finished-products/rods-tubes" },
    { label: "Sheets & Blocks", href: "/products/thermoplastics-semi-finished-products/sheets-blocks" },
    { label: "Coils & Rolls", href: "/products/thermoplastics-semi-finished-products/coils-rolls" },
    { label: "Machine Components", href: "/products/thermoplastics-machine-components" },
    { label: "Strips & Profiles", href: "/products/machine-components/strips-and-profiles" },
  ],
  Materials: [
    { label: "POLYRIB V (UHMW PE)", href: "/materials/polyrib-v" },
    { label: "POLYRIB H (HDPE)", href: "/materials/polyrib-h" },
    { label: "POLYRIB P (PP)", href: "/materials/polyrib-p" },
    { label: "PCCLEAR (PC)", href: "/materials/pcclear" },
    { label: "KAYLON (Nylon)", href: "/materials/kaylon" },
    { label: "PAKETAL (Acetal)", href: "/materials/paketal" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "CSR & Sustainability", href: "/csr" },
    { label: "Careers", href: "/careers" },
    { label: "Resources & Downloads", href: "/resources" },
    { label: "Blog & Gallery", href: "/blog" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Request a Quote", href: "/contact" },
    { label: "Material Selector", href: "/tools/material-selector" },
    { label: "Technical Downloads", href: "/resources" },
  ],
};

const brands = ["POLYRIB V", "POLYRIB H", "POLYRIB P", "PCCLEAR", "KAYLON", "PAKETAL", "POLYRIB A", "DIPRA", "PLASCON"];

export function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="container max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="section-label text-white/50 mb-2">Trusted Since 1985</p>
              <h3 className="font-heading text-2xl text-white">
                Get the right thermoplastic for your application
              </h3>
              <p className="text-white/60 mt-2 text-sm max-w-md">
                Our technical team is available to help you select the ideal grade from our extensive Polyrib product range.
              </p>
            </div>
            <div className="flex gap-3 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-light transition-colors duration-200"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/tools/material-selector"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Material Selector
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo on white pill so it reads clearly on dark footer */}
            <Link to="/" className="inline-block mb-5">
              <div className="inline-block">
                <img
                  src={logoImg}
                  alt="Khanna Polyrib Pvt. Ltd."
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
              India's leading manufacturer of engineering thermoplastic semi-finished products and machine components. Trusted across 20+ industries worldwide.
            </p>
            {/* Brands */}
            <div className="flex flex-wrap gap-1.5">
              {brands.map((b) => (
                <span key={b} className="text-[10px] font-semibold px-2 py-0.5 bg-white/10 text-white/60 tracking-wider">
                  {b}
                </span>
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
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary-light shrink-0" />
            <span className="text-white/55 text-sm">Industrial Area, Kanpur, Uttar Pradesh, India</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary-light shrink-0" />
            <span className="text-white/55 text-sm">0515-2970306</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary-light shrink-0" />
            <span className="text-white/55 text-sm">info@polyrib.com</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} Khanna Polyrib Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-white/35">
            <div className="flex gap-4">
              <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/70 transition-colors">Terms & Conditions</a>
            </div>
            <a
              href="https://www.vigyapanam.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-primary-light transition-colors duration-200 text-[11px] hover:underline"
            >
              Designed &amp; Developed by Vigyapanam Digi Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
