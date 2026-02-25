import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Recycle,
  Users,
  Award,
  Sun,
  Droplets,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import heroImage from "@/assets/csr.jpeg";
import csr1 from "@/assets/csr-slider1.jpeg";
import csr2 from "@/assets/csr-slider2.jpeg";
import csr3 from "@/assets/csr-slider3.jpeg";

const pillars = [
  {
    icon: Leaf,
    title: "Sustainable Manufacturing",
    desc: "We continuously invest in energy-efficient manufacturing processes, reducing our carbon footprint per unit of output year-on-year. Our production facilities operate to ISO 14001 environmental management principles.",
  },
  {
    icon: Recycle,
    title: "Material Recycling",
    desc: "Production waste and off-cuts are segregated, reprocessed, and reintroduced into non-critical grade production streams wherever possible. We target zero thermoplastic waste to landfill.",
  },
  {
    icon: Users,
    title: "Community Development",
    desc: "Polyrib supports vocational training programmes in our local community, providing apprenticeships in plastics processing, CNC machining, and quality assurance.",
  },
  {
    icon: Sun,
    title: "Renewable Energy",
    desc: "Solar panels on our manufacturing rooftops contribute to our electricity requirements, reducing our reliance on grid power and lowering our Scope 2 emissions.",
  },
  {
    icon: Droplets,
    title: "Water Stewardship",
    desc: "Closed-loop cooling water systems in our extrusion and pressing operations minimise freshwater consumption. Effluent is monitored and treated before discharge.",
  },
  {
    icon: Award,
    title: "Responsible Sourcing",
    desc: "We work exclusively with raw material suppliers who comply with REACH, RoHS, and our internal responsible sourcing code of conduct, ensuring ethical supply chains.",
  },
];

export default function CSRPage() {
  const csrImages = [csr1, csr2, csr3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % csrImages.length);
    }, 5000); // slow auto transition

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? csrImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % csrImages.length);
  };

  return (
    <div className="pt-16 bg-white">
      {/* Header */}
      <div className="relative h-[40vh] flex items-end overflow-hidden bg-charcoal">
        <img
          src={heroImage}
          alt="Sustainability"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
        <div className="relative container max-w-7xl mx-auto px-6 py-14">
          <nav className="text-xs text-white/50 mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-white/80">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/80">CSR & Sustainability</span>
          </nav>
          <p className="section-label text-white/50 mb-3">Responsibility</p>
          <h1 className="font-heading text-4xl text-white">
            CSR & Sustainability
          </h1>
        </div>
      </div>

      {/* Intro (MODIFIED SECTION ONLY) */}
      <section className="py-20 border-b border-gray-200 bg-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* LEFT SIDE CONTENT */}
            <div>
              <p className="section-label mb-4">Our Commitment</p>

              <div className="relative mb-6">
                <div className="absolute -left-4 top-2 w-1 h-16 bg-primary"></div>
                <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-tight">
                  Manufacturing responsibly for the long term
                </h2>
              </div>

              <div className="space-y-5 text-muted-foreground text-sm leading-relaxed">
                <p>
                  At <strong className="text-charcoal">Polyrib</strong>, we believe that responsible manufacturing and commercial success are inseparable. Our <strong className="text-charcoal">CSR</strong> programme covers environmental stewardship, employee development, community investment, and ethical supply chain management.
                </p>
                <p>
                  As a manufacturer of polymer materials, we recognise our responsibility to manage our <strong className="text-charcoal">environmental impact</strong> thoughtfully — from responsible raw material sourcing to energy-efficient processing and end-of-life material recovery.
                </p>
                <p>
                  This page summarises our key <strong className="text-charcoal">CSR commitments</strong>. We publish an <strong className="text-charcoal">Annual Sustainability Update</strong> for customers, investors, and community stakeholders.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE SLIDER */}
            <div className="relative group">
              <div className="relative h-[380px] overflow-hidden shadow-xl">
                
                {csrImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="CSR"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === current ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 shadow transition opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5 text-charcoal" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 shadow transition opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5 text-charcoal" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">Key Pillars</p>
          <h2 className="font-heading text-2xl text-charcoal mb-10">
            Our CSR commitments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white border border-gray-200 shadow-sm p-6 hover:border-primary/40 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="font-heading font-semibold text-charcoal mb-2">
                  {p.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-14 border-b border-gray-200 bg-white">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">Progress</p>
          <h2 className="font-heading text-2xl text-charcoal mb-8">
            2024 Sustainability Metrics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "30%", l: "Renewable Energy Use" },
              { v: "95%", l: "Production Waste Recovered" },
              { v: "Zero", l: "Non-Compliance Incidents" },
              { v: "50+", l: "Apprentices Trained" },
            ].map((m) => (
              <div
                key={m.l}
                className="border border-gray-200 bg-white shadow-sm p-6 text-center"
              >
                <div className="font-heading font-bold text-primary text-3xl mb-2">
                  {m.v}
                </div>
                <div className="text-xs text-muted-foreground">
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl text-primary-foreground mb-3">
            Download our CSR Report
          </h2>
          <p className="text-primary-foreground/70 text-sm mb-6">
            Our latest annual sustainability report is available to download.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-primary text-sm font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              Download Report <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-primary-foreground text-sm font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}