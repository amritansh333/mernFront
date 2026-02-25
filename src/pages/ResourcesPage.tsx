import React from "react";
import { Link } from "react-router-dom";
import { Download, FileText, Package } from "lucide-react";

/* ─── Catalog / Brochure cards ────────────────────────── */
const CATALOGS = [
  {
    id: "cat1",
    title: "Polyrib Master Product Catalogue",
    description: "Complete overview of all thermoplastic semi-finished product ranges — sheets, rods, tubes, blocks, and profiles across all brand families.",
    pages: "48 pages",
    format: "PDF",
    size: "8.2 MB",
    updated: "Feb 2025",
    tag: "Catalogue",
    file: "/Sheets_Document.pdf",
  },
  {
    id: "cat2",
    title: "POLYRIB V (UHMWPE) Product Brochure",
    description: "Detailed specifications, grade comparison, and application guide for the full UHMWPE sheet and rod range including food-grade and coloured variants.",
    pages: "12 pages",
    format: "PDF",
    size: "3.1 MB",
    updated: "Jan 2025",
    tag: "Brochure",
    file: "/Sheets_Document.pdf",
  },
  {
    id: "cat3",
    title: "KAYLON Cast Nylon Brochure",
    description: "Properties, grades, and machining guidance for KAYLON cast nylon rods, sheets, and tubes — covering natural, oil-filled, and MoS₂ grades.",
    pages: "10 pages",
    format: "PDF",
    size: "2.7 MB",
    updated: "Dec 2024",
    tag: "Brochure",
    file: "/Sheets_Document.pdf",
  },
  {
    id: "cat4",
    title: "Machine Components & Fabricated Parts Catalogue",
    description: "Precision machined thermoplastic components catalogue — wear strips, RIPLA cutting boards, CUTRITE chopping boards, fascia pads, and custom parts.",
    pages: "24 pages",
    format: "PDF",
    size: "5.4 MB",
    updated: "Jan 2025",
    tag: "Catalogue",
    file: "/Sheets_Document.pdf",
  },
  {
    id: "cat5",
    title: "PAKETAL (POM/Acetal) Brochure",
    description: "Grade selection and specification guide for PAKETAL acetal/POM rods and sheets — ideal for precision machined components and gears.",
    pages: "8 pages",
    format: "PDF",
    size: "1.9 MB",
    updated: "Nov 2024",
    tag: "Brochure",
    file: "/Sheets_Document.pdf",
  },
  {
    id: "cat6",
    title: "Infrastructure & Capabilities Overview",
    description: "Overview of Polyrib manufacturing capabilities — extrusion lines, compression moulding, cast nylon, and CNC machining facilities.",
    pages: "6 pages",
    format: "PDF",
    size: "2.3 MB",
    updated: "Feb 2025",
    tag: "Brochure",
    file: "/Sheets_Document.pdf",
  },
];

const TAG_COLORS: Record<string, string> = {
  Catalogue: "bg-primary/10 text-primary border-primary/20",
  Brochure:  "bg-accent text-charcoal-light border-divider",
};

export default function ResourcesPage() {
  return (
    <div className="pt-16">
      {/* Page Header */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/about" className="hover:text-primary">Company</Link>
            <span>/</span>
            <span className="text-charcoal">Resources & Downloads</span>
          </nav>
          <p className="section-label mb-3">Downloads</p>
          <h1 className="font-heading text-4xl text-charcoal mb-3">Catalogues & Brochures</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Download our product catalogues and brand brochures to explore the full range of Polyrib thermoplastic grades, specifications, and application guidance.
          </p>
        </div>
      </div>

      {/* ── Catalogues & Brochures Grid ── */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-charcoal text-lg">All Documents</h2>
              <p className="text-xs text-muted-foreground">{CATALOGS.length} catalogues and brochures available</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CATALOGS.map((doc) => (
              <div key={doc.id} className="product-card flex flex-col group border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-hover">
                {/* Top stripe */}
                <div className="h-1 w-full bg-primary" />
                <div className="p-6 flex-1 flex flex-col">
                  {/* Tag + format */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 border ${TAG_COLORS[doc.tag] ?? "bg-surface-subtle text-muted-foreground border-divider"}`}>
                      {doc.tag}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-surface-subtle border border-divider text-muted-foreground font-mono">
                      {doc.format} · {doc.size}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug group-hover:text-primary transition-colors duration-200">
                      {doc.title}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{doc.description}</p>
                  <div className="text-[10px] text-muted-foreground">{doc.pages} · Updated {doc.updated}</div>
                </div>

                {/* Download button */}
                <div className="border-t border-divider p-4">
                  <a
                    href={doc.file}
                    download
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-surface-subtle text-charcoal text-xs font-bold border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 group/btn"
                  >
                    <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform duration-200" />
                    Download Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-charcoal py-12">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl text-white mb-1">Need a custom quote?</h3>
            <p className="text-white/60 text-sm">Send us your engineering drawing and our team will respond within 48 hours.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/contact" className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 inline-flex items-center gap-2">
              Request a Quote
            </Link>
            <Link to="/contact?tab=drawing" className="px-5 py-2.5 border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-200">
              Send Your Drawing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
