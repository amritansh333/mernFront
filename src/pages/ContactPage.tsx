import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin, Clock, Upload, FileText, X, Send, PenLine } from "lucide-react";

/* ─── Tab type ─── */
type Tab = "quote" | "drawing";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<Tab>("quote");

  /* Quote form */
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", product: "", requirement: "" });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  /* Drawing form */
  const [drawData, setDrawData] = useState({ name: "", company: "", email: "", phone: "", notes: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [drawSubmitted, setDrawSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleQuoteSubmit = (e: React.FormEvent) => { e.preventDefault(); setQuoteSubmitted(true); };
  const handleDrawSubmit  = (e: React.FormEvent) => { e.preventDefault(); setDrawSubmitted(true);  };

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const allowed = Array.from(newFiles).filter(f => f.size <= 20 * 1024 * 1024);
    setFiles(prev => [...prev, ...allowed].slice(0, 5));
  };

  const removeFile = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const contactItems = [
    { icon: MapPin, label: "Address",      value: "Khanna Polyrib Pvt. Ltd.\nIndustrial Area, Kanpur\nUttar Pradesh, India" },
    { icon: Phone, label: "Phone",         value: "0515-2970306" },
    { icon: Mail,  label: "Email",         value: "info@polyrib.com" },
    { icon: Clock, label: "Office Hours",  value: "Mon–Sat: 09:00–18:00 IST" },
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-charcoal">Contact</span>
          </nav>
          <p className="section-label mb-3">Get in Touch</p>
          <h1 className="font-heading text-4xl text-charcoal mb-3">Contact Us</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Request a quote for standard products or send us your engineering drawing for custom-machined components.
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mt-8">
            <button
              onClick={() => setActiveTab("quote")}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border transition-all duration-200 ${
                activeTab === "quote"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-charcoal-light border-border hover:border-primary hover:text-primary"
              }`}
            >
              <PenLine className="w-4 h-4" />
              Request a Quote
            </button>
            <button
              onClick={() => setActiveTab("drawing")}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border transition-all duration-200 ${
                activeTab === "drawing"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-charcoal-light border-border hover:border-primary hover:text-primary"
              }`}
            >
              <Upload className="w-4 h-4" />
              Send Your Drawing
            </button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Left sidebar ── */}
          <div className="space-y-8">
            <div>
              <p className="section-label mb-4">Contact Information</p>
              <div className="space-y-4">
                {contactItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{label}</div>
                      <div className="text-sm text-charcoal whitespace-pre-line">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border p-5">
              <p className="section-label mb-3">Technical Team</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Need expert guidance on material selection, machining specifications, or application requirements?
              </p>
              <a href="mailto:info@polyrib.com" className="text-sm font-medium text-primary hover:underline">info@polyrib.com</a>
            </div>

            <div className="bg-primary p-5 text-primary-foreground">
              <h4 className="font-heading text-base font-semibold mb-2">Why engineers choose Polyrib</h4>
              <ul className="space-y-2">
                {[
                  "Application-driven material selection",
                  "Precision machining to your drawings",
                  "Custom & batch manufacturing",
                  "ISO 9001 certified quality assurance",
                  "Technical datasheets for all materials",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2 text-primary-foreground/80 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary-light" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: Forms ── */}
          <div className="lg:col-span-2">

            {/* ══ QUOTE FORM ══ */}
            {activeTab === "quote" && (
              quoteSubmitted ? (
                <div className="text-center py-20 border border-border">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-5" />
                  <h3 className="font-heading text-2xl text-charcoal mb-2">Enquiry Received</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Thank you. Our team will review your requirements and respond within 24 business hours.
                  </p>
                  <button onClick={() => setQuoteSubmitted(false)} className="cta-link inline-flex">
                    Submit another enquiry <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="border border-border p-8 space-y-6">
                  <h2 className="font-heading text-xl text-charcoal">Enquiry Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors" placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Company *</label>
                      <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors" placeholder="Company name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors" placeholder="Email address" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Phone *</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors" placeholder="Mobile / Landline" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Product / Material of Interest</label>
                    <select value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal-light outline-none focus:border-primary transition-colors">
                      <option value="">Select a product category...</option>
                      <option>Semi-Finished Products — Rods & Tubes</option>
                      <option>Semi-Finished Products — Sheets</option>
                      <option>Semi-Finished Products — Rolls</option>
                      <option>Machine Components — Wear Strips</option>
                      <option>Machine Components — Guide Rails</option>
                      <option>Machine Components — Chain Guides</option>
                      <option>Custom Machined Components</option>
                      <option>Other / Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Your Requirement *</label>
                    <textarea required rows={5} value={formData.requirement} onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Please describe your requirement: material grade, dimensions (diameter, length, thickness), quantity, delivery location, and any specific standards or certifications required..." />
                  </div>
                  <div className="flex items-start gap-4 pt-2">
                    <button type="submit"
                      className="px-7 py-3 bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-dark transition-colors duration-200 inline-flex items-center gap-2">
                      Submit Enquiry
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      By submitting this form you agree to our Privacy Policy.
                      Your details will only be used to respond to your enquiry.
                    </p>
                  </div>
                </form>
              )
            )}

            {/* ══ DRAWING FORM ══ */}
            {activeTab === "drawing" && (
              drawSubmitted ? (
                <div className="text-center py-20 border border-border">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-5" />
                  <h3 className="font-heading text-2xl text-charcoal mb-2">Drawing Received</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Thank you. Our engineering team will review your drawing and respond with a quotation within 48 business hours.
                  </p>
                  <button onClick={() => { setDrawSubmitted(false); setFiles([]); setDrawData({ name: "", company: "", email: "", phone: "", notes: "" }); }}
                    className="cta-link inline-flex">
                    Submit another drawing <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDrawSubmit} className="border border-border p-8 space-y-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                      <Send className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl text-charcoal">Send Your Engineering Drawing</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Upload your CAD drawing, sample sketch, or technical specification for a custom-machined component quote.</p>
                    </div>
                  </div>

                  {/* Personal fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input type="text" required value={drawData.name} onChange={(e) => setDrawData({ ...drawData, name: e.target.value })}
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors" placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Company *</label>
                      <input type="text" required value={drawData.company} onChange={(e) => setDrawData({ ...drawData, company: e.target.value })}
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors" placeholder="Company name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Email</label>
                      <input type="email" value={drawData.email} onChange={(e) => setDrawData({ ...drawData, email: e.target.value })}
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors" placeholder="Email address" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Phone *</label>
                      <input type="tel" required value={drawData.phone} onChange={(e) => setDrawData({ ...drawData, phone: e.target.value })}
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors" placeholder="Mobile / Landline" />
                    </div>
                  </div>

                  {/* File upload */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      Upload Drawing / File * <span className="font-normal normal-case text-muted-foreground">(PDF, DXF, DWG, STEP, PNG, JPG — max 20 MB each, up to 5 files)</span>
                    </label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                      className="border-2 border-dashed border-border hover:border-primary transition-colors duration-200 rounded-none cursor-pointer p-8 text-center group"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-3" />
                      <p className="text-sm font-medium text-charcoal group-hover:text-primary transition-colors">Drop files here or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DXF, DWG, STEP, PNG, JPG accepted</p>
                      <input
                        ref={fileRef}
                        type="file"
                        multiple
                        accept=".pdf,.dxf,.dwg,.step,.stp,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => addFiles(e.target.files)}
                      />
                    </div>

                    {/* File list */}
                    {files.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {files.map((f, i) => (
                          <li key={i} className="flex items-center gap-3 p-3 bg-surface-subtle border border-divider">
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm text-charcoal flex-1 truncate">{f.name}</span>
                            <span className="text-xs text-muted-foreground shrink-0">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                            <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Additional Notes</label>
                    <textarea rows={4} value={drawData.notes} onChange={(e) => setDrawData({ ...drawData, notes: e.target.value })}
                      className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Describe the material, quantity, tolerance requirements, surface finish, or any other details that would help us quote accurately..." />
                  </div>

                  <div className="flex items-start gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={files.length === 0}
                      className="px-7 py-3 bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center gap-2"
                    >
                      Send Drawing
                      <Send className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Please attach at least one file. Our team will respond with a detailed quote within 48 hours.
                    </p>
                  </div>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
