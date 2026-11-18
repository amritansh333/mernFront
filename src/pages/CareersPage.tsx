import React, { useRef, useState } from "react";

import { Link } from "react-router-dom";

import {
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  CalendarDays,
  X,
  Upload,
  FileText,
  CheckCircle2,
  MessageCircle,
  Send,
  ShieldCheck,
  SmartphoneUserRound,
  Loader2,
} from "lucide-react";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";

import manufacturingImage from "@/assets/csr-slider1.jpeg";
import whatsappBg from "@/assets/whatsapp-bg.png";
import whatsappLogo from "@/assets/whatsapp-logo.svg";

import { useScrollFade } from "@/hooks/useScrollFade";

const openRoles = [
  {
    title: "Technical Sales Engineer",

    dept: "Sales",

    location: "Bhiwandi, India",

    type: "Full-time",

    postedDate: "17 Nov 2026",

    desc: "Manage key accounts across our thermoplastics product range. Engineering background preferred. Experience in plastics, materials, or industrial sales.",
  },

  {
    title: "Production Supervisor – Extrusion",

    dept: "Manufacturing",

    location: "Unnao, India",

    type: "Full-time",

    postedDate: "17 Nov 2026",

    desc: "Oversee extrusion production lines for HDPE and PP sheets. Minimum 5 years' experience in polymer processing or extrusion manufacturing.",
  },

  {
    title: "Quality Assurance Technician",

    dept: "Quality",

    location: "Bhiwandi, India",

    type: "Full-time",

    postedDate: "17 Nov 2026",

    desc: "Perform incoming material inspection and in-process quality checks. Experience with ISO 9001 systems and plastics testing methods preferred.",
  },

  {
    title: "CNC Machine Operator",

    dept: "Engineering",

    location: "Bhiwandi, India",

    type: "Full-time",

    postedDate: "17 Nov 2026",

    desc: "Operate CNC routing and milling equipment to produce precision thermoplastic components. Experience with plastics machining a strong advantage.",
  },

  {
    title: "Export Sales Executive",

    dept: "Sales",

    location: "Bhiwandi, India",

    type: "Full-time",

    postedDate: "17 Nov 2026",

    desc: "Develop and manage international customer relationships across our thermoplastic product range. Experience in export sales and international logistics.",
  },
];

const perks = [
  "Competitive salary and performance incentives",

  "Exposure to diverse industrial sectors and applications",

  "Training on Polyrib product range and thermoplastics engineering",

  "Career progression in a growing manufacturing business",

  "Collaborative, technically-driven work environment",

  "Annual performance review and development planning",
];

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".docx"];

const initialApplicationData = {
  name: "",

  email: "",

  phone: "",

  role: "",

  location: "",

  experience: "",

  currentCompany: "",

  linkedin: "",

  message: "",

  resumeLink: "",

  website: "",
};

type ApplicationData = typeof initialApplicationData;

export default function CareersPage() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const [applicationData, setApplicationData] = useState<ApplicationData>(
    initialApplicationData,
  );

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [resumeError, setResumeError] = useState("");

  const [applicationError, setApplicationError] = useState("");

  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [resumeMethod, setResumeMethod] = useState<"upload" | "link">("upload");

  const pageTexture = {
    backgroundColor: "#FFFFFF",

    backgroundImage: `

      linear-gradient(

        90deg,

        #FFFFFF 0%,

        #FDFEFF 25%,

        #F5FAFC 55%,

        #EAF5F9 80%,

        #E3F1F7 100%

      )

    `,
  };

  const inputClass =
    "w-full min-w-0 border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 rounded-xl placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100";

  const labelClass = "block text-xs font-semibold text-gray-700 mb-2";

  const openApplicationForm = (role: string) => {
    setApplicationData({
      ...initialApplicationData,

      role,
    });

    setResumeFile(null);

    setResumeError("");

    setApplicationError("");

    setApplicationSuccess(false);

    setResumeMethod("upload");

    setShowApplicationForm(true);

    document.body.style.overflow = "hidden";
  };

  const closeApplicationForm = () => {
    if (submitting) return;

    setShowApplicationForm(false);

    document.body.style.overflow = "";

    setApplicationData(initialApplicationData);

    setResumeFile(null);

    setResumeError("");

    setApplicationError("");

    setApplicationSuccess(false);
  };

  const updateApplicationField = (
    field: keyof ApplicationData,

    value: string,
  ) => {
    setApplicationData((prev) => ({
      ...prev,

      [field]: value,
    }));
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isValidPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");

    return (
      /^[0-9+()-\s]+$/.test(phone) && digits.length >= 7 && digits.length <= 15
    );
  };

  const isValidResumeLink = (value: string) => {
    try {
      const url = new URL(value.trim());

      return (
        url.protocol === "https:" &&
        ["drive.google.com", "docs.google.com"].includes(
          url.hostname.toLowerCase(),
        )
      );
    } catch {
      return false;
    }
  };

  // Client-side file validation.

  // The backend must independently validate and scan every uploaded file.

  const validateResumeFile = async (file: File): Promise<string> => {
    const extension = file.name

      .substring(file.name.lastIndexOf("."))

      .toLowerCase();

    if (!ALLOWED_RESUME_EXTENSIONS.includes(extension)) {
      return "Only PDF and DOCX files are allowed.";
    }

    if (file.size === 0) {
      return "The selected file is empty.";
    }

    if (file.size > MAX_RESUME_SIZE) {
      return "Resume must be smaller than 5 MB.";
    }

    const header = new Uint8Array(await file.slice(0, 8).arrayBuffer());

    if (extension === ".pdf") {
      const signature = String.fromCharCode(...header.slice(0, 5));

      if (signature !== "%PDF-") {
        return "Invalid PDF file. Please select a genuine PDF document.";
      }
    }

    if (extension === ".docx") {
      const isZipFile =
        header[0] === 0x50 &&
        header[1] === 0x4b &&
        ((header[2] === 0x03 && header[3] === 0x04) ||
          (header[2] === 0x05 && header[3] === 0x06) ||
          (header[2] === 0x07 && header[3] === 0x08));

      if (!isZipFile) {
        return "Invalid DOCX file. Please select a genuine Word document.";
      }
    }

    return "";
  };

  const handleResumeChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    setResumeError("");

    setResumeFile(null);

    if (!file) return;

    const error = await validateResumeFile(file);

    if (error) {
      setResumeError(error);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setResumeFile(file);

    setApplicationData((prev) => ({
      ...prev,

      resumeLink: "",
    }));
  };

  const handleApplicationSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (submitting) return;

    setApplicationError("");

    setResumeError("");

    const name = applicationData.name.trim();

    const email = applicationData.email.trim();

    const phone = applicationData.phone.trim();

    const role = applicationData.role.trim();

    const resumeLink = applicationData.resumeLink.trim();

    if (name.length < 2 || name.length > 100) {
      setApplicationError(
        "Please enter a valid name between 2 and 100 characters.",
      );

      return;
    }

    if (!isValidEmail(email) || email.length > 254) {
      setApplicationError("Please enter a valid email address.");

      return;
    }

    if (!isValidPhone(phone)) {
      setApplicationError(
        "Please enter a valid phone number with 7–15 digits.",
      );

      return;
    }

    if (!role) {
      setApplicationError("Please select a position.");

      return;
    }

    if (resumeMethod === "upload" && !resumeFile) {
      setResumeError("Please upload your resume.");

      return;
    }

    if (resumeMethod === "link" && !resumeLink) {
      setResumeError("Please provide your Google Drive resume link.");

      return;
    }

    if (resumeMethod === "link" && !isValidResumeLink(resumeLink)) {
      setResumeError(
        "Please provide a valid HTTPS Google Drive or Google Docs link.",
      );

      return;
    }

    if (
      applicationData.linkedin.trim() &&
      !/^https:\/\/(www\.)?linkedin\.com\//i.test(
        applicationData.linkedin.trim(),
      )
    ) {
      setApplicationError("Please provide a valid HTTPS LinkedIn profile URL.");

      return;
    }

    if (applicationData.message.length > 2000) {
      setApplicationError(
        "Your introduction must be 2000 characters or fewer.",
      );

      return;
    }

    // Hidden honeypot field. The backend must also reject populated values.

    if (applicationData.website.trim()) {
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("fullName", name);

      formData.append("email", email);

      formData.append("phone", phone);

      formData.append("position", role);

      formData.append("location", applicationData.location.trim());

      formData.append("experience", applicationData.experience);

      formData.append("currentCompany", applicationData.currentCompany.trim());

      formData.append("linkedin", applicationData.linkedin.trim());

      formData.append("message", applicationData.message.trim());

      formData.append("resumeMethod", resumeMethod);

      if (resumeMethod === "upload" && resumeFile) {
        formData.append("resume", resumeFile);
      }

      if (resumeMethod === "link") {
        formData.append("resumeLink", resumeLink);
      }

      formData.append("website", applicationData.website);

      const controller = new AbortController();

      const timeout = window.setTimeout(() => controller.abort(), 30000);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/career-applications`,

          {
            method: "POST",

            body: formData,

            signal: controller.signal,
          },
        );

        if (!response.ok) {
          const responseText = await response.text();

          let message = "Unable to submit your application. Please try again.";

          try {
            const result = JSON.parse(responseText);

            if (result?.message) {
              message = result.message;
            }
          } catch {
            // Ignore invalid response JSON.
          }

          throw new Error(message);
        }

        setApplicationSuccess(true);

        setResumeFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } finally {
        window.clearTimeout(timeout);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setApplicationError("The request timed out. Please try again.");
      } else {
        setApplicationError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16" style={pageTexture}>
      <PageHeroBanner
        eyebrow="Join Our Team"

        title="Careers"

        highlight="At Polyrib"

        image={manufacturingImage}

        imageAlt="Khanna Polyrib manufacturing facility"

        imagePosition="center center"

        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
      />

      {/* INTRO */}

      <section className="py-14 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="section-label mb-3">Why Join Us</p>

              <h2 className="font-heading text-3xl text-charcoal mb-5">
                Build your career in engineering thermoplastics
              </h2>

              <p className="text-charcoal-light text-sm leading-relaxed mb-5">
                Polyrib is one of India's leading thermoplastic manufacturers,
                with a growing export presence across 50+ countries. We're a
                technically-driven business that invests in our people and
                values expertise, innovation, and a commitment to quality.
              </p>

              <div className="space-y-2.5">
                {perks.map((p) => (
                  <div
                    key={p}

                    className="flex gap-3 text-sm text-charcoal-light"
                  >
                    <div className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />

                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* OPEN APPLICATIONS */}

            <div
              className="relative overflow-hidden border p-6 sm:p-8 rounded-2xl"
              style={{
                backgroundImage: `url(${whatsappBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden mb-5 border">
                  <img
                    src={whatsappLogo}
                    alt="WhatsApp"
                    className="w-full h-full object-cover block"
                  />
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-3">
                  Open Applications
                </p>

                <h3 className="font-heading text-xl text-charcoal mb-3">
                  Don't see a suitable role?
                </h3>

                <p className="text-charcoal-light text-sm leading-relaxed mb-6">
                  We welcome speculative applications from talented engineers,
                  sales professionals, and production specialists. Share your
                  profile with us, and we'll consider you for upcoming
                  opportunities.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <button
                    type="button"

                    onClick={() =>
                      openApplicationForm("General / Speculative Application")
                    }

                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white text-sm font-semibold hover:bg-green-700 transition-colors duration-200 rounded-xl shadow-sm"
                  >
                    Submit Your Profile
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https\://wa.me/919936794816"

                    target="\_blank"

                    rel="noopener noreferrer"

                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-green-300 text-[#25D366] text-sm font-semibold backdrop-blur-md hover:bg-green-50 transition-colors duration-200 rounded-xl "
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  We look forward to hearing from you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}

      <section ref={ref} className="fade-up py-14">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">Open Positions</p>

          <h2 className="font-heading text-2xl text-charcoal mb-3">
            Current Vacancies
          </h2>

          <p className="text-sm text-muted-foreground mb-8">
            Find a role that matches your skills and take the next step in your
            career.
          </p>

          <div className="space-y-4">
            {openRoles.map((role) => (
              <div
                key={role.title}

                className="bg-card border border-border p-5 sm:p-6 hover:border-primary/70 transition-all duration-200 group rounded-2xl"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-[10px] px-2.5 py-1 bg-primary/10 text-primary font-bold uppercase tracking-wider rounded-xl">
                        {role.dept}
                      </span>

                      <span className="text-[10px] px-2.5 py-1 bg-green-50 text-green-700 font-bold uppercase tracking-wider rounded-xl">
                        {role.type}
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                      {role.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {role.desc}
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />

                        {role.location}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0" />

                        {role.type}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 shrink-0" />

                        {role.dept}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                        Posted: {role.postedDate}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"

                    onClick={() => openApplicationForm(role.title)}

                    className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#279ECE] text-white text-sm font-semibold hover:bg-[#279ECE] hover:bg-opacity-80 active:scale-[0.98] transition-all duration-200 rounded-xl shadow-sm"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION MODAL */}

      {showApplicationForm && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"

          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeApplicationForm();
            }
          }}
        >
          <div
            role="dialog"

            aria-modal="true"

            aria-labelledby="application-title"

            className="relative w-full max-w-2xl max-h-[94dvh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl"
          >
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-5 sm:px-8 py-5 sm:py-6 rounded-t-3xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-700" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700 mb-1">
                      Careers at Polyrib
                    </p>

                    <h2
                      id="application-title"

                      className="font-heading text-xl sm:text-2xl text-gray-900"
                    >
                      Let's get to know you!
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Fill in your details to apply.
                    </p>
                  </div>
                </div>

                <button
                  type="button"

                  onClick={closeApplicationForm}

                  disabled={submitting}

                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors shrink-0 disabled:opacity-50"

                  aria-label="Close application form"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 h-1.5 bg-green-50 rounded-full overflow-hidden">
                <div className="h-full w-full bg-green-500 rounded-full" />
              </div>
            </div>

            {/* SUCCESS STATE */}

            {applicationSuccess ? (
              <div className="px-6 sm:px-10 py-14 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <h3 className="font-heading text-2xl text-gray-900 mb-3">
                  Application Submitted!
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto mb-7">
                  Thank you for your interest in joining Polyrib. Your
                  application has been received. Our team will review your
                  profile and contact you if there's a suitable opportunity.
                </p>

                <button
                  type="button"

                  onClick={closeApplicationForm}

                  className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-green-600 text-white text-sm font-semibold hover:bg-green-700 rounded-xl transition-colors"
                >
                  Done
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleApplicationSubmit}

                className="px-5 sm:px-8 py-6 space-y-6"

                noValidate
              >
                {/* FORM INTRO */}

                <div className="bg-green-50 border border-green-100 p-4 rounded-2xl">
                  <p className="text-xs text-green-800 font-medium mb-1">
                    Applying for
                  </p>

                  <p className="text-sm font-semibold text-gray-900 break-words">
                    {applicationData.role}
                  </p>
                </div>

                {/* ERROR MESSAGE */}

                {applicationError && (
                  <div
                    role="alert"

                    className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                  >
                    {applicationError}
                  </div>
                )}

                {/* PERSONAL DETAILS */}

                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className={labelClass}>
                        Full Name <span className="text-red-500">\*</span>
                      </label>

                      <input
                        type="text"

                        required

                        minLength={2}

                        maxLength={100}

                        autoComplete="name"

                        value={applicationData.name}

                        onChange={(e) =>
                          updateApplicationField("name", e.target.value)
                        }

                        placeholder="Enter your full name"

                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Email Address <span className="text-red-500">\*</span>
                      </label>

                      <input
                        type="email"

                        required

                        maxLength={254}

                        autoComplete="email"

                        value={applicationData.email}

                        onChange={(e) =>
                          updateApplicationField("email", e.target.value)
                        }

                        placeholder="you\@example.com"

                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Phone Number <span className="text-red-500">\*</span>
                      </label>

                      <input
                        type="tel"

                        required

                        maxLength={20}

                        autoComplete="tel"

                        value={applicationData.phone}

                        onChange={(e) =>
                          updateApplicationField("phone", e.target.value)
                        }

                        placeholder="+91 98765 43210"

                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Current Location</label>

                      <input
                        type="text"

                        maxLength={120}

                        autoComplete="address-level2"

                        value={applicationData.location}

                        onChange={(e) =>
                          updateApplicationField("location", e.target.value)
                        }

                        placeholder="City, State"

                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Total Work Experience
                      </label>

                      <select
                        value={applicationData.experience}

                        onChange={(e) =>
                          updateApplicationField("experience", e.target.value)
                        }

                        className={inputClass}
                      >
                        <option value="">Select experience</option>

                        <option value="Fresher">Fresher</option>

                        <option value="Less than 1 year">
                          Less than 1 year
                        </option>

                        <option value="1-2 years">1–2 years</option>

                        <option value="3-5 years">3–5 years</option>

                        <option value="5-8 years">5–8 years</option>

                        <option value="8-10 years">8–10 years</option>

                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Current Company</label>

                      <input
                        type="text"

                        maxLength={150}

                        value={applicationData.currentCompany}

                        onChange={(e) =>
                          updateApplicationField(
                            "currentCompany",

                            e.target.value,
                          )
                        }

                        placeholder="Company name (if applicable)"

                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>LinkedIn Profile</label>

                      <div className="relative">
                        <SmartphoneUserRound className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />

                        <input
                          type="url"

                          maxLength={500}

                          value={applicationData.linkedin}

                          onChange={(e) =>
                            updateApplicationField("linkedin", e.target.value)
                          }

                          placeholder="https\://linkedin.com/in/..."

                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* RESUME SECTION */}

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    Your Resume
                  </h3>

                  <p className="text-xs text-gray-500 mb-4">
                    Share your latest resume so our team can learn more about
                    your experience.
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-4">
                    <button
                      type="button"

                      onClick={() => {
                        setResumeMethod("upload");

                        setResumeError("");

                        updateApplicationField("resumeLink", "");
                      }}

                      className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                        resumeMethod === "upload"
                          ? "bg-white text-green-700 shadow-sm"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <Upload className="w-4 h-4 inline mr-1.5" />
                      Upload Resume
                    </button>

                    <button
                      type="button"

                      onClick={() => {
                        setResumeMethod("link");

                        setResumeError("");

                        setResumeFile(null);

                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}

                      className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                        resumeMethod === "link"
                          ? "bg-white text-green-700 shadow-sm"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <FileText className="w-4 h-4 inline mr-1.5" />
                      Google Drive Link
                    </button>
                  </div>

                  {resumeMethod === "upload" ? (
                    <div>
                      <button
                        type="button"

                        onClick={() => fileInputRef.current?.click()}

                        className="w-full border-2 border-dashed border-green-200 hover:border-green-500 hover:bg-green-50/50 p-6 sm:p-8 rounded-2xl transition-all duration-200 text-center"
                      >
                        {resumeFile ? (
                          <div>
                            <FileText className="w-9 h-9 text-green-600 mx-auto mb-3" />

                            <p className="text-sm font-semibold text-gray-800 break-all">
                              {resumeFile.name}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>

                            <p className="text-xs text-green-700 mt-3 font-semibold">
                              Click to replace resume
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                              <Upload className="w-5 h-5 text-green-700" />
                            </div>

                            <p className="text-sm font-semibold text-gray-800">
                              Click to upload your resume
                            </p>

                            <p className="text-xs text-gray-500 mt-2">
                              PDF or DOCX · Maximum size 5 MB
                            </p>
                          </div>
                        )}
                      </button>

                      <input
                        ref={fileInputRef}

                        type="file"

                        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                        onChange={handleResumeChange}

                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className={labelClass}>
                        Google Drive Resume URL
                      </label>

                      <input
                        type="url"

                        value={applicationData.resumeLink}

                        onChange={(e) =>
                          updateApplicationField("resumeLink", e.target.value)
                        }

                        placeholder="https\://drive.google.com/file/d/..."

                        className={inputClass}
                      />

                      <p className="text-xs text-gray-500 mt-2">
                        Make sure your link permissions allow the recruitment
                        team to view your resume.
                      </p>
                    </div>
                  )}

                  {resumeError && (
                    <p role="alert" className="text-xs text-red-600 mt-3">
                      {resumeError}
                    </p>
                  )}

                  <div className="flex gap-2 mt-4 p-3 bg-gray-50 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />

                    <p className="text-[11px] leading-relaxed text-gray-500">
                      Only PDF and DOCX resume files up to 5 MB are accepted.
                    </p>
                  </div>
                </div>

                {/* INTRODUCTION */}

                <div className="border-t border-gray-100 pt-6">
                  <label className={labelClass}>Tell Us About Yourself</label>

                  <textarea
                    rows={4}

                    maxLength={2000}

                    value={applicationData.message}

                    onChange={(e) =>
                      updateApplicationField("message", e.target.value)
                    }

                    placeholder="Share a little about your skills, experience, achievements, and why you would like to join Polyrib..."

                    className={`${inputClass} resize-y`}
                  />

                  <p className="text-[11px] text-gray-400 text-right mt-1">
                    {applicationData.message.length}/2000
                  </p>
                </div>

                {/* HONEYPOT */}

                <div
                  className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"

                  aria-hidden="true"
                >
                  <label>
                    Website
                    <input
                      type="text"

                      tabIndex={-1}

                      autoComplete="off"

                      value={applicationData.website}

                      onChange={(e) =>
                        updateApplicationField("website", e.target.value)
                      }
                    />
                  </label>
                </div>

                {/* PRIVACY */}

                <div className="flex gap-2 items-start">
                  <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />

                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    By submitting this application, you agree that Polyrib may
                    use your information for recruitment and employment-related
                    communication in accordance with its privacy practices.
                  </p>
                </div>

                {/* SUBMIT */}

                <div className="pt-2">
                  <button
                    type="submit"

                    disabled={submitting}

                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 text-white text-sm font-bold hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 rounded-xl shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-gray-400 mt-3">
                    Thank you for considering a career with Polyrib.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
