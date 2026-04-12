import React from "react";
import { Link } from "react-router-dom";
import { Download, FileText, Package } from "lucide-react";

/* ─── Catalog / Brochure cards ────────────────────────── */
const CATALOGS = [
  {
    id: "Polyrib_Brochure",
    title: "Polyrib Master Product Catalogue",
    description: "Complete range of Polyrib polymer sheets and engineering plastics",
    pages: "16 pages",
    format: "PDF",
    size: "2.5 MB",
    updated: "Feb 2026",
    tag: "Catalogue",
  },
  {
    id: "Plascon_Brochure",
    title: "Plascon Brochure",
    description: "High-quality plastic sheets for industrial and commercial applications.",
    pages: "7 pages",
    format: "PDF",
    size: "5.3 MB",
    updated: "Jan 2026",
    tag: "Brochure",
  },
  {
    id: "Ripla_Brochure",
    title: "Ripla Cutting Boards Catalogue",
    description: "High-quality cutting boards for leather, textile and soft materials cutting.",
    pages: "4 pages",
    format: "PDF",
    size: "1.4 MB",
    updated: "Dec 2025",
    tag: "Catalogue",
  },
  {
    id: "Pcclear_Brochure",
    title: "PC Clear Sheets Catalogue",
    description: "Polycarbonate sheets with high impact and heat resistance.",
    pages: "12 pages",
    format: "PDF",
    size: "5.1 MB",
    updated: "Jan 2026",
    tag: "Catalogue",
  },
  {
    id: "Dipra_Brochure",
    title: "Dipra Speciality Sheets Brochure",
    description: "UV resistant fabric backed extruded plastic sheets for roofing.",
    pages: "4 pages",
    format: "PDF",
    size: "1.3 MB",
    updated: "Nov 2025",
    tag: "Brochure",
  },
  {
    id: "Arete_Brochure",
    title: "Arete Lining Materials Catalogue",
    description: "High performance UHMWPE lining for bulk solids handling.",
    pages: "16 pages",
    format: "PDF",
    size: "2.2 MB",
    updated: "Feb 2026",
    tag: "Catalogue",
  },
  {
    id: "Hitech_Brochure",
    title: "Hitech Polymer Sheets Catalogue",
    description: "Chemical engineering polymer sheets for industrial applications.",
    pages: "8 pages",
    format: "PDF",
    size: "0.4 MB",
    updated: "Feb 2026",
    tag: "Catalogue",
  },
];

const TAG_COLORS: Record<string, string> = {
  Catalogue: "bg-primary/10 text-primary border-primary/20",
  Brochure:  "bg-accent text-charcoal-light border-divider",
};

export default function ResourcesPage() {

const [open, setOpen] = React.useState(false);
const [selectedCatalog, setSelectedCatalog] = React.useState(null);

const [formData, setFormData] = React.useState({
  name: "",
  phone: "",
  email: "",
  message: ""
});


  const handleDownload = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/catalogrequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        catalog_name: selectedCatalog.id, // ✅ IMPORTANT CHANGE
      }),
    });

    const data = await res.json();

    if (data.success) {
      window.open(data.downloadUrl, "_blank"); // ✅ download from backend
      setOpen(false);
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error(err);
  }
};

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
                    <h3 className="font-heading font-semibold text-charcoal text-lg leading-snug group-hover:text-primary transition-colors duration-200">
                      {doc.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{doc.description}</p>
                  <div className="text-[10px] text-muted-foreground">{doc.pages} · Updated {doc.updated}</div>
                </div>

                {/* Download button */}
                <div className="border-t border-divider p-4">
                  <button
  onClick={() => {
    setSelectedCatalog(doc);
    setOpen(true);
  }}
  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-surface-subtle text-charcoal text-xs font-bold border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 group/btn"
>
  <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform duration-200" />
  Download Now
</button>
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
      {open && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">

      {/* Close */}
      <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-500">✕</button>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-2">Get Catalogue</h2>
      <p className="text-sm text-center text-primary mb-6">
        Fill in your details to access the catalog
      </p>

      {/* FORM */}
      <form onSubmit={handleDownload} className="space-y-4">

        <input
          type="text"
          placeholder="Enter your full name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border p-3  text-primary rounded-lg"
        />

        <input
          type="text"
          placeholder="+91 XXXXX XXXXX"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border p-3 text-primary rounded-lg"
        />

        <input
          type="email"
          placeholder="you@company.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border p-3 text-primary  rounded-lg"
        />

        <textarea
          placeholder="Any specific requirements?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full border p-3 text-primary  rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
        >
          Get Catalog Download
        </button>
      </form>
    </div>
  </div>
)}
    </div>

    
  );
}
