import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Upload,
  FileText,
  X,
  Send,
  PenLine,
} from "lucide-react";

/* ─── Tab type ─── */
type Tab = "quote" | "drawing";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<Tab>("quote");

  /* Quote form */
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    requirement: "",
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  /* Drawing form */
  const [drawData, setDrawData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [drawSubmitted, setDrawSubmitted] = useState(false);
  const [quoteError, setQuoteError] = useState("");
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab === "quote" || tab === "drawing") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const MAX_DRAWING_FILES = 5;
  const MAX_FILE_SIZE = 20 * 1024 * 1024;
  const DRAWING_FILE_EXTENSIONS = [
    "pdf",
    "png",
    "jpg",
    "jpeg",
    "dwg",
    "dxf",
    "step",
    "stp",
  ];

  const getFileExtension = (name: string) =>
    name.split(".").pop()?.toLowerCase() ?? "";

  const isValidFullName = (value: string) =>
    /^[\p{L}\p{M}' -]{2,100}$/u.test(value.trim());

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isMeaningfulCompany = (value: string) => /[A-Za-z0-9]/.test(value);

  const isSafeFileName = (name: string) => {
    if (name.length > 255) {
      return false;
    }

    if (name.includes("../") || name.includes("..\\") || name.includes("\0")) {
      return false;
    }

    return true;
  };

  const isValidPhone = (value: string) => {
    const allowedPattern = /^[0-9()+\-\s]+$/;
    if (!allowedPattern.test(value)) {
      return false;
    }

    const digits = value.replace(/[^0-9]/g, "").length;
    return digits >= 7 && digits <= 15;
  };

  const isDuplicateFile = (file: File, currentFiles: File[]) =>
    currentFiles.some(
      (existing) =>
        existing.name === file.name &&
        existing.size === file.size &&
        existing.lastModified === file.lastModified,
    );

  const validateFilesList = (fileList: File[]): string[] => {
    const errors: string[] = [];

    if (fileList.length > MAX_DRAWING_FILES) {
      errors.push(`You can upload up to ${MAX_DRAWING_FILES} files.`);
    }

    const seen = new Set<string>();

    fileList.forEach((file) => {
      const extension = getFileExtension(file.name);

      if (!isSafeFileName(file.name)) {
        errors.push(`File ${file.name} has an invalid file name.`);
      }

      if (file.name.length > 255) {
        errors.push(
          `File ${file.name} has a file name longer than 255 characters.`,
        );
      }

      if (file.size === 0) {
        errors.push(`File ${file.name} is empty.`);
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`File ${file.name} is larger than 20 MB.`);
      }

      if (!DRAWING_FILE_EXTENSIONS.includes(extension)) {
        errors.push(
          `File ${file.name} has an unsupported extension. Accepted types are PDF, PNG, JPG, JPEG, DWG, DXF, STEP, and STP.`,
        );
      }

      const key = `${file.name}|${file.size}|${file.lastModified}`;
      if (seen.has(key)) {
        errors.push(`"${file.name}" appears more than once.`);
      } else {
        seen.add(key);
      }
    });

    // Deduplicate identical error messages
    return Array.from(new Set(errors));
  };

  const handleDrawSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uploading) {
      return;
    }

    const trimmedName = drawData.name.trim();
    const trimmedCompany = drawData.company.trim();
    const trimmedPhone = drawData.phone.trim();
    const trimmedEmail = drawData.email.trim();
    const trimmedNotes = drawData.notes.trim();

    const errors: string[] = [];

    if (!trimmedName || !isValidFullName(trimmedName)) {
      errors.push(
        "Full Name is required and must be 2 to 100 letters, spaces, apostrophes, or hyphens.",
      );
    }

    if (!trimmedCompany) {
      errors.push("Company is required.");
    } else if (trimmedCompany.length > 150) {
      errors.push("Company must be 150 characters or fewer.");
    } else if (!isMeaningfulCompany(trimmedCompany)) {
      errors.push("Company name must contain letters or numbers.");
    }

    if (!trimmedPhone) {
      errors.push("Phone is required.");
    } else if (!isValidPhone(trimmedPhone)) {
      errors.push("Please enter a valid phone number with 7 to 15 digits.");
    }

    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      errors.push("Please enter a valid email address.");
    }

    if (files.length === 0) {
      errors.push("Please upload at least one drawing file.");
    }

    if (files.length > MAX_DRAWING_FILES) {
      errors.push(`You can upload up to ${MAX_DRAWING_FILES} files.`);
    }

    files.forEach((file) => {
      const extension = getFileExtension(file.name);
      if (!isSafeFileName(file.name)) {
        errors.push(`File ${file.name} has an invalid file name.`);
      }
      if (file.size === 0) {
        errors.push(`File ${file.name} is empty.`);
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`File ${file.name} is larger than 20 MB.`);
      }
      if (!DRAWING_FILE_EXTENSIONS.includes(extension)) {
        errors.push(
          `File ${file.name} has an unsupported extension. Accepted types are PDF, PNG, JPG, JPEG, DWG, DXF, STEP, and STP.`,
        );
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      setUploadError("");
      return;
    }

    setValidationErrors([]);
    setUploadError("");
    setUploading(true);

    const form = new FormData();
    form.append("fullName", trimmedName);
    form.append("company", trimmedCompany);
    form.append("email", trimmedEmail);
    form.append("phone", trimmedPhone);
    form.append("notes", trimmedNotes);
    files.forEach((file) => form.append("drawings", file));

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/drawing-requests`,
        {
          method: "POST",
          body: form,
          signal: controller.signal,
        },
      );

      if (response.ok) {
        setDrawSubmitted(true);
        setFiles([]);
        setDrawData({ name: "", company: "", email: "", phone: "", notes: "" });
      } else {
        const text = await response.text();
        let message = "Failed to send your drawing request. Please try again.";

        try {
          const json = JSON.parse(text);
          if (json?.message) {
            message = json.message;
          }
        } catch {
          // ignore parse errors
        }

        switch (response.status) {
          case 400:
            message = "Please check the form and file uploads, then try again.";
            break;
          case 401:
            message = "You are not authorized to send this drawing request.";
            break;
          case 403:
            message =
              "Access denied. Please contact support if this continues.";
            break;
          case 413:
            message =
              "One or more files are too large. Each file must be 20 MB or smaller.";
            break;
          case 415:
            message =
              "One or more files have an unsupported format. Please use PDF, PNG, JPG, JPEG, DWG, DXF, STEP, or STP.";
            break;
          case 500:
            message = "Server error. Please try again later.";
            break;
          default:
            break;
        }

        setUploadError(message);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setUploadError("The upload timed out. Please try again.");
      } else {
        setUploadError(
          "Network error while sending your drawing. Please check your connection and try again.",
        );
      }
    } finally {
      setUploading(false);
      window.clearTimeout(timeout);
    }
  };

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const currentFiles = [...files];
    const incomingFiles = Array.from(newFiles);
    const nextFiles: File[] = [...currentFiles];
    const availableSlots = MAX_DRAWING_FILES - nextFiles.length;

    if (availableSlots <= 0) {
      setValidationErrors([
        `You can upload up to ${MAX_DRAWING_FILES} files only.`,
      ]);
      return;
    }

    const rejectedErrors: string[] = [];

    incomingFiles.slice(0, availableSlots).forEach((file) => {
      const extension = getFileExtension(file.name);

      if (!isSafeFileName(file.name)) {
        rejectedErrors.push(
          `"${file.name}" has an invalid file name and was not added.`,
        );
        return;
      }

      if (file.size === 0) {
        rejectedErrors.push(`"${file.name}" is empty and was not added.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        rejectedErrors.push(
          `"${file.name}" is larger than 20 MB and was not added.`,
        );
        return;
      }

      if (!DRAWING_FILE_EXTENSIONS.includes(extension)) {
        rejectedErrors.push(
          `"${file.name}" has an unsupported file type and was not added.`,
        );
        return;
      }

      if (isDuplicateFile(file, nextFiles)) {
        rejectedErrors.push(`"${file.name}" is already added.`);
        return;
      }

      nextFiles.push(file);
    });

    if (incomingFiles.length > availableSlots) {
      rejectedErrors.push(`You can upload up to ${MAX_DRAWING_FILES} files.`);
    }

    const finalFiles = nextFiles.slice(0, MAX_DRAWING_FILES);
    setFiles(finalFiles);

    // Recalculate errors for the final set and merge with rejected ones
    const listErrors = validateFilesList(finalFiles);
    const merged = Array.from(new Set([...rejectedErrors, ...listErrors]));
    setValidationErrors(merged);
  };

  const removeFile = (i: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, idx) => idx !== i);
      setValidationErrors(validateFilesList(next));
      return next;
    });
  };

  const contactItems = [
    {
      icon: MapPin,
      label: "Address",
      value: (
        <>
          Khanna Polyrib Pvt. Ltd.
          <br />
          <span className="text-sm font-medium text-primary">
            KANPUR HEAD OFFICE
          </span>
          <br />
          24/168 Birhana Road
          <br />
          Kanpur-208001, India
          <br />
          <span className="text-sm font-medium text-primary">WORK</span>
          <br />
          Plot. 191-193 Akrampur Industrial Estate
          <br />
          Unnao-209801, Uttar Pradesh
          <br />
        </>
      ),
    },
    { icon: Phone, label: "Phone", value: "0515-2970306" },
    {
      icon: Mail,
      label: "Email",
      value: (
        <a
          href="mailto:info@polyrib.com"
          className="text-sm font-medium text-charcoal hover:underline"
        >
          info@polyrib.com
        </a>
      ),
    },
    { icon: Clock, label: "Office Hours", value: "Mon–Sat: 09:00–18:00 IST" },
  ];

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (quoteSubmitting) {
      return;
    }

    setQuoteError("");
    setQuoteSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.name,
            company: formData.company,
            email: formData.email,
            phone: formData.phone,
            product: formData.product,
            requirement: formData.requirement,
          }),
        },
      );

      if (response.ok) {
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          product: "",
          requirement: "",
        });
        setQuoteSubmitted(true);
        return;
      }

      const text = await response.text();
      let message = "Failed to submit enquiry. Please try again.";

      try {
        const json = JSON.parse(text);
        if (json?.message) {
          message = json.message;
        }
      } catch {
        // ignore parse errors
      }

      switch (response.status) {
        case 400:
          message = "Please check your enquiry details and try again.";
          break;
        case 401:
          message = "You are not authorized to submit an enquiry.";
          break;
        case 403:
          message = "Access denied. Please contact support.";
          break;
        case 500:
          message = "Server error. Please try again later.";
          break;
        default:
          break;
      }

      setQuoteError(message);
    } catch (error) {
      console.error(error);
      setQuoteError(
        "Unable to submit your enquiry. Please check your network connection and try again.",
      );
    } finally {
      setQuoteSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="text-charcoal">Contact</span>
          </nav>
          <p className="section-label mb-3">Get in Touch</p>
          <h1 className="font-heading text-4xl text-charcoal mb-3">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Request a quote for standard products or send us your engineering
            drawing for custom-machined components.
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mt-8">
            <button
              onClick={() => {
                setActiveTab("quote");
                navigate("/contact?tab=quote", { replace: true });
              }}
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
              onClick={() => {
                setActiveTab("drawing");
                navigate("/contact?tab=drawing", { replace: true });
              }}
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
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                        {label}
                      </div>
                      <div className="text-sm text-charcoal whitespace-pre-line">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border p-5">
              <p className="section-label mb-3">Technical Team</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Need expert guidance on material selection, machining
                specifications, or application requirements?
              </p>
              <a
                href="mailto:info@polyrib.com"
                className="text-sm font-medium text-primary hover:underline"
              >
                info@polyrib.com
              </a>
            </div>

            <div className="bg-primary p-5 text-primary-foreground">
              <h4 className="font-heading text-base font-semibold mb-2">
                Why engineers choose Polyrib
              </h4>
              <ul className="space-y-2">
                {[
                  "Application-driven material selection",
                  "Precision machining to your drawings",
                  "Custom & batch manufacturing",
                  "ISO 9001 certified quality assurance",
                  "Technical datasheets for all materials",
                ].map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-primary-foreground/80 text-xs"
                  >
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
            {activeTab === "quote" &&
              (quoteSubmitted ? (
                <div className="text-center py-20 border border-border">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-5" />
                  <h3 className="font-heading text-2xl text-charcoal mb-2">
                    Enquiry Received
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Thank you. Our team will review your requirements and
                    respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => setQuoteSubmitted(false)}
                    className="cta-link inline-flex"
                  >
                    Submit another enquiry <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleQuoteSubmit}
                  className="border border-border p-8 space-y-6"
                >
                  <h2 className="font-heading text-xl text-charcoal">
                    Enquiry Details
                  </h2>
                  {quoteError && (
                    <div className="rounded-sm border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {quoteError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors"
                        placeholder="Mobile / Landline"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      Product / Material of Interest
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) =>
                        setFormData({ ...formData, product: e.target.value })
                      }
                      className="w-full border border-border bg-background px-3 py-2.5 text-sm text-primary-light outline-none focus:border-primary transition-colors"
                    >
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
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      Your Requirement *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.requirement}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirement: e.target.value,
                        })
                      }
                      className="w-full border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Please describe your requirement: material grade, dimensions (diameter, length, thickness), quantity, delivery location, and any specific standards or certifications required..."
                    />
                  </div>
                  <div className="flex items-start gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={quoteSubmitting}
                      className="px-7 py-3 bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center gap-2"
                    >
                      {quoteSubmitting ? "Submitting..." : "Submit Enquiry"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                      By submitting this form you agree to our Privacy Policy.
                      Your details will only be used to respond to your enquiry.
                    </p>
                  </div>
                </form>
              ))}

            {/* ══ DRAWING FORM ══ */}
            {activeTab === "drawing" &&
              (drawSubmitted ? (
                <div className="text-center py-20 border border-border">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-5" />
                  <h3 className="font-heading text-2xl text-charcoal mb-2">
                    Drawing Received
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Thank you. Our engineering team will review your drawing and
                    respond with a quotation within 48 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setDrawSubmitted(false);
                      setFiles([]);
                      setDrawData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        notes: "",
                      });
                      setUploadError("");
                      setValidationErrors([]);
                    }}
                    className="cta-link inline-flex"
                  >
                    Submit another drawing <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleDrawSubmit}
                  className="border border-border p-8 space-y-6"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                      <Send className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl text-charcoal">
                        Send Your Engineering Drawing
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Upload your CAD drawing, sample sketch, or technical
                        specification for a custom-machined component quote.
                      </p>
                    </div>
                  </div>

                  {/* Personal fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={drawData.name}
                        onChange={(e) =>
                          setDrawData({ ...drawData, name: e.target.value })
                        }
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={drawData.company}
                        onChange={(e) =>
                          setDrawData({ ...drawData, company: e.target.value })
                        }
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        value={drawData.email}
                        onChange={(e) =>
                          setDrawData({ ...drawData, email: e.target.value })
                        }
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={drawData.phone}
                        onChange={(e) =>
                          setDrawData({ ...drawData, phone: e.target.value })
                        }
                        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors"
                        placeholder="Mobile / Landline"
                      />
                    </div>
                  </div>

                  {/* File upload */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      Upload Drawing / File *{" "}
                      <span className="font-normal normal-case text-muted-foreground">
                        (PDF, DXF, DWG, STEP, PNG, JPG — max 20 MB each, up to 5
                        files)
                      </span>
                    </label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        addFiles(e.dataTransfer.files);
                      }}
                      className="border-2 border-dashed border-border hover:border-primary transition-colors duration-200 rounded-none cursor-pointer p-8 text-center group"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-3" />
                      <p className="text-sm font-medium text-charcoal group-hover:text-primary transition-colors">
                        Drop files here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DXF, DWG, STEP, PNG, JPG accepted
                      </p>
                      <input
                        ref={fileRef}
                        type="file"
                        multiple
                        accept=".pdf,.dxf,.dwg,.step,.stp,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => {
                          addFiles(e.target.files);
                          e.currentTarget.value = "";
                        }}
                      />
                    </div>

                    {/* File list */}
                    {files.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {files.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 p-3 bg-surface-subtle border border-divider"
                          >
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm text-charcoal flex-1 truncate">
                              {f.name}
                            </span>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {(f.size / 1024 / 1024).toFixed(1)} MB
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Notes */}
                  {validationErrors.length > 0 && (
                    <div className="rounded-sm border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive space-y-1">
                      {validationErrors.map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </div>
                  )}
                  {uploadError && (
                    <div className="rounded-sm border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {uploadError}
                    </div>
                  )}
                  {uploading && (
                    <div className="rounded-sm border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
                      Uploading your drawing...
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      value={drawData.notes}
                      onChange={(e) =>
                        setDrawData({ ...drawData, notes: e.target.value })
                      }
                      className="w-full border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Describe the material, quantity, tolerance requirements, surface finish, or any other details that would help us quote accurately..."
                    />
                  </div>

                  <div className="flex items-start gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={uploading || files.length === 0}
                      className="px-7 py-3 bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center gap-2"
                    >
                      {uploading ? "Uploading..." : "Send Drawing"}
                      <Send className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Please attach at least one file. Our team will respond
                      with a detailed quote within 48 hours.
                    </p>
                  </div>
                </form>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
