import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
import { useScrollFade } from "@/hooks/useScrollFade";

const openRoles = [
  {
    title: "Technical Sales Engineer",
    dept: "Sales",
    location: "Mumbai, India",
    type: "Full-time",
    desc: "Manage key accounts across our thermoplastics product range. Engineering background preferred. Experience in plastics, materials, or industrial sales.",
  },
  {
    title: "Production Supervisor – Extrusion",
    dept: "Manufacturing",
    location: "Daman, India",
    type: "Full-time",
    desc: "Oversee extrusion production lines for HDPE and PP sheets. Minimum 5 years experience in polymer processing or extrusion manufacturing.",
  },
  {
    title: "Quality Assurance Technician",
    dept: "Quality",
    location: "Mumbai, India",
    type: "Full-time",
    desc: "Perform incoming material inspection and in-process quality checks. Experience with ISO 9001 systems and plastics testing methods preferred.",
  },
  {
    title: "CNC Machine Operator",
    dept: "Engineering",
    location: "Mumbai, India",
    type: "Full-time",
    desc: "Operate CNC routing and milling equipment to produce precision thermoplastic components. Experience with plastics machining a strong advantage.",
  },
  {
    title: "Export Sales Executive",
    dept: "Sales",
    location: "Mumbai, India",
    type: "Full-time",
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

export default function CareersPage() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  return (
    <div className="pt-16">
      <div className="relative min-h-[40vh] flex items-end overflow-hidden bg-charcoal">
        <img src={heroImage} alt="Careers at Polyrib" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
        <div className="relative container max-w-7xl mx-auto px-6 py-14">
          <nav className="text-xs text-white/50 mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-white/80">Home</Link><span>/</span>
            <span className="text-white/80">Careers</span>
          </nav>
          <p className="section-label text-white/50 mb-3">Join Our Team</p>
          <h1 className="font-heading text-4xl text-white">Careers at Polyrib</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-14 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="section-label mb-3">Why Join Us</p>
              <h2 className="font-heading text-3xl text-charcoal mb-5">Build your career in engineering thermoplastics</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Polyrib is one of India's leading thermoplastic manufacturers, with a growing export presence across 50+ countries. We're a technically-driven business that invests in our people and values expertise, innovation, and a commitment to quality.
              </p>
              <div className="space-y-2.5">
                {perks.map((p) => (
                  <div key={p} className="flex gap-3 text-sm text-charcoal-light">
                    <div className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-subtle border border-border p-8">
              <p className="section-label mb-3">Open Applications</p>
              <h3 className="font-heading text-xl text-charcoal mb-3">Don't see a suitable role?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                We welcome speculative applications from talented engineers, sales professionals, and production specialists. Send us your CV and we'll keep it on file for future opportunities.
              </p>
              <Link to="https://wa.me/9105152970306" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200">
                Send Speculative Application on WhatsApp<ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section ref={ref} className="fade-up py-14 bg-surface-subtle">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">Open Positions</p>
          <h2 className="font-heading text-2xl text-charcoal mb-8">Current Vacancies</h2>
          <div className="space-y-4">
            {openRoles.map((role) => (
              <div key={role.title} className="bg-card border border-border p-6 hover:border-primary/40 transition-colors duration-200 group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-[10px] px-2.5 py-1 bg-primary/10 text-primary font-bold uppercase tracking-wider">{role.dept}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors duration-200">{role.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{role.desc}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{role.type}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{role.dept}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200">
                    Apply <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
