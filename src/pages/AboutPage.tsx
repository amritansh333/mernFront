import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Building2,
  Award,
  Plus
} from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
import manufacturingImage from "@/assets/csr-slider1.jpeg";
import aboutVideo from "@/assets/about-us.mp4";
import industriesImage from "@/assets/industriesweserve.jpeg";
import { useScrollFade } from "@/hooks/useScrollFade";

/* ARRAYS (UNCHANGED) */

const milestones = [
  { year: "1985", event: "Khanna Polyrib Pvt. Ltd. founded — began manufacturing PP and HDPE sheets in Kanpur, Uttar Pradesh" },
  { year: "1992", event: "Launch of POLYRIB V (UHMW PE) product family — extreme wear resistance polymer range" },
  { year: "1998", event: "ISO 9001 Quality Management Certification achieved — first certification cycle" },
  { year: "2003", event: "PCCLEAR polycarbonate range launched; KBK Plascon Pvt. Ltd. established; export operations begin" },
  { year: "2008", event: "KAYLON cast nylon and PAKETAL acetal brands introduced; KBK Polymer Pvt. Ltd. incorporated" },
  { year: "2012", event: "Distribution centres established in Delhi, Bhiwandi (Mumbai), and Ahmedabad" },
  { year: "2015", event: "New manufacturing plant commissioned — production capacity doubled; CNC machining division launched" },
  { year: "2020", event: "500+ product grades across all thermoplastic brand families; 20+ industries served" },
  { year: "2024", event: "Export to 50+ countries; Kanpur facility upgraded with 11 RAM extrusion lines and 7 compression moulding units" },
];

const groupCompanies = [
  {
    name: "Khanna Polyrib Pvt. Ltd.",
    short: "KPPL",
    desc: "The flagship manufacturing entity — responsible for producing the full range of POLYRIB, PCCLEAR, KAYLON, PAKETAL, DIPRA, and PLASCON thermoplastic semi-finished products. Houses the primary extrusion, compression moulding, and CNC machining facilities in Kanpur.",
    focus: [
      "Semi-finished thermoplastic sheets, rods & tubes",
      "Compression-moulded and extruded profiles",
      "CNC precision machined components",
      "Brand families: POLYRIB, KAYLON, PAKETAL, PCCLEAR"
    ],
  },
  {
    name: "KBK Plascon Pvt. Ltd.",
    short: "KBK Plascon",
    desc: "Specialised in engineering plastic machine components and fabricated parts. Manufactures wear strips, guide rails, conveyor components, cutting boards, fascia pads, and custom-designed parts for OEM and replacement markets.",
    focus: [
      "Thermoplastic machine components & wear parts",
      "RIPLA wear strips and guide profiles",
      "CUTRITE cutting and chopping boards",
      "Vacuum formed and fabricated plastic assemblies"
    ],
  },
  {
    name: "KBK Polymer Pvt. Ltd.",
    short: "KBK Polymer",
    desc: "Trading and distribution arm of the Khanna Group — responsible for nationwide supply logistics, bulk raw material sourcing, and distribution partnerships. Manages the Delhi, Bhiwandi, and Ahmedabad distribution centres.",
    focus: [
      "Nationwide distribution & logistics",
      "Raw polymer material sourcing",
      "Distribution centre operations (Delhi, Bhiwandi, Ahmedabad)",
      "Export co-ordination and international trade"
    ],
  },
];

const locations = [
  { city: "Kanpur, Uttar Pradesh", type: "Manufacturing HQ", detail: "Industrial Area, Kanpur — primary production facility with 11 RAM extrusion lines, compression moulding, and CNC workshop." },
  { city: "Delhi (NCR)", type: "Distribution Centre", detail: "North India distribution hub serving industrial customers across Delhi, NCR, Haryana, Punjab, and surrounding regions." },
  { city: "Bhiwandi, Maharashtra", type: "Distribution Centre", detail: "West India hub near Mumbai — serving Maharashtra, Gujarat, Goa, and export container consolidation." },
  { city: "Ahmedabad, Gujarat", type: "Distribution Centre", detail: "Gujarat operations hub — serving chemical, pharmaceutical, and packaging industries across western India." },
];

export default function AboutPage() {
  const ref1 = useScrollFade() as React.RefObject<HTMLElement>;
  const ref2 = useScrollFade() as React.RefObject<HTMLElement>;
  const ref3 = useScrollFade() as React.RefObject<HTMLElement>;
  const ref4 = useScrollFade() as React.RefObject<HTMLElement>;
  const videoRef = useRef<HTMLVideoElement | null>(null);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(video);

  return () => {
    observer.disconnect();
  };
}, []);

  return (
    <div className="pt-16">

      {/* HEADER */}
      <div className="relative min-h-[40vh] flex items-end overflow-hidden bg-charcoal">
        <img src={heroImage} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
        <div className="relative container max-w-7xl mx-auto px-6 py-14">
          <nav className="text-xs text-white/50 mb-4 flex items-center gap-1.5">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="text-white/80">About Us</span>
          </nav>
          <p className="section-label text-white/50 mb-3">Our Company</p>
          <h1 className="font-heading text-4xl text-white">About Khanna Group</h1>
        </div>
      </div>

      {/* OUR FOUNDATION (FROM PART B) */}
      <section className="py-16 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

      
  <div className="group relative border border-primary/40 overflow-hidden">
  <video
    ref={videoRef}
    src={aboutVideo}
    muted
    loop
    playsInline
    className="w-full h-73 object-cover transition-all duration-500 ease-in-out opacity-90 group-hover:opacity-100 transition-transform duration-[8000ms] ease-linear group-hover:scale-105"
  />
</div>



            <div>
              <p className="section-label mb-3">Our Foundation</p>
              <h2 className="font-heading text-3xl text-charcoal mb-5">
                Built on polymer science and precision manufacturing
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>The Khanna Polyrib Pvt. Ltd. is the manufacturer of superior engineering plastic solutions that can be used in the world market with ISO accreditation, which is founded on the good principles of polymer science and production best practices.</p>
                <p>Having decades of experience in this industry, we combine technical invention, exploration of materials, and meticulousness in manufacturing into the creation of plastics that can be reliably worked within the most industrial requirements.</p>
                <p>We are more than a manufacturing company. We also collaborate with industries to provide development-tailored materials with a precise performance that provides strength, uniformity, and sustainability in a wide range of uses that we have implemented.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHO WE ARE (FROM PART B) */}
      <section className="py-16 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="section-label mb-3">Who We Are</p>
            <h2 className="font-heading text-3xl text-charcoal mb-5">
              Four decades of polymer manufacturing excellence
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                  The <strong className="text-charcoal">Khanna Group</strong>, comprising <strong className="text-charcoal">Khanna Polyrib Pvt. Ltd.</strong>, <strong className="text-charcoal">KBK Plascon Pvt. Ltd.</strong>, and <strong className="text-charcoal">KBK Polymer Pvt. Ltd.</strong>, has been at the forefront of polymer manufacturing for over four decades.
                </p>
                <p>
                  With state-of-the-art manufacturing facilities in <strong className="text-charcoal">Kanpur, Uttar Pradesh</strong> and distribution centres in <strong className="text-charcoal">Delhi, Bhiwandi, and Ahmedabad</strong>, we ensure consistent quality and efficient nationwide supply.
                </p>
                <p>
                  An <strong className="text-charcoal">ISO 9001 certified</strong> company, POLYRIB has earned recognition as one of the most trusted brands in thermoplastic semi-finished products — offering high-performance sheets, rods, tubes, blocks, and customized plastic machinery components for diverse industrial applications.
                </p>
            </div>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"> Get in Touch <ArrowRight className="w-4 h-4" /> </Link>
            
          </div>
          <div>
            <img src={manufacturingImage} className="w-full h-72 object-cover" />
            <div className="grid grid-cols-2 gap-px bg-divider border border-divider">
                {[
                  { value: "40+", label: "Years in Business" },
                  { value: "3", label: "Group Companies" },
                  { value: "4", label: "Locations Across India" },
                  { value: "ISO 9001", label: "Quality Certified" },
                ].map((s) => (
                  <div key={s.label} className="bg-card p-4 text-center">
                    <div className="font-heading text-xl font-bold text-primary">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* EXPLORE FEATURES (MISSION & VALUES FROM PART B) */}
      <section ref={ref4} className="fade-up py-16 border-b border-divider bg-surface-subtle">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <p className="section-label mb-3">Explore Features</p>
          <h2 className="font-heading text-3xl text-charcoal mb-10">
            Our Mission & Values
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Our Mission",
                desc: "To design superior performance polymer materials that address actual engineering issues. Our products are designed to provide reliability, accuracy, and long-term usefulness."
              },
              {
                title: "Our Vision",
                desc: "Our vision is to have Khanna Polyrib establish standards in the quality, application performance, and responsible polymer engineering in the global industries."
              },
              {
                title: "Our Values",
                desc: "We have values at Khanna Polyrib, which we apply to each and every product we make and to each and every relationship we form. Our engineering approach believes in integrity, constant quality, and continuous improvement."
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border bg-card p-8 transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg group"
              >
                <Plus className="w-6 h-6 mb-4 text-primary group-hover:text-white transition-colors" />
                <h3 className="font-heading text-lg mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-80 group-hover:opacity-100">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE (FROM PART B) */}
      <section className="py-16 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT IMAGE */}
            
            <div>
              
              <img src={industriesImage} className="relative z-10 w-full max-w-md rounded-sm bg-white p-4 shadow-xl" />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <p className="section-label mb-3">Industries We Serve</p>
              <h2 className="font-heading text-3xl text-charcoal mb-5">
                Built for Every Industry’s Unique Needs
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Khanna Polyrib provides engineering plastic products that are used in high-performance engineering, and this includes industrial commodities like aerospace, automotive, chemical processing, iron and steel, packaging, marine, and heavy engineering. Through the knowledge of the challenges faced by each sector, we are able to create application-specific polymers that can provide the strength, chemical resistance, precision, and long-term dependability within the challenging process environment.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  "Special material knowledge in the industry.",
                  "High-end production and machine processes.",
                  "International service and servicing.",
                  "Familiar experience in challenging applications.",
                  "Regular quality and reliable supply.",
                  "The constant development of new material science.",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <Link to="/industries" className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"> Explore Industries <ArrowRight className="w-4 h-4" /> </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* BELOW THIS: EXACT PART A */}
      {/* DO NOT MODIFIED SECTIONS */}
      {/* ========================= */}

      {/* GROUP STRUCTURE */}
      <section ref={ref1} className="fade-up py-16 border-b border-divider"> <div className="container max-w-7xl mx-auto px-6"> <p className="section-label mb-3">Group Structure</p> <h2 className="font-heading text-2xl text-charcoal mb-2">Three companies, one group</h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-2xl"> Each entity within the Khanna Group serves a distinct function — together covering manufacturing, fabrication, and distribution of engineering thermoplastics across India and beyond. </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {groupCompanies.map((co) => (
              <div key={co.name} className="border border-border hover:border-primary/40 transition-colors duration-200 flex flex-col">
                <div className="h-1 bg-primary" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                        {co.short}
                      </span>
                      <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug">
                        {co.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {co.desc}
                  </p>
                  <ul className="space-y-1.5 mt-auto">
                    {co.focus.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-charcoal-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR LOCATIONS */}
      <section className="py-16 bg-surface-subtle border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">Our Locations</p>
          <h2 className="font-heading text-2xl text-charcoal mb-10">
            Manufacturing & Distribution Network
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {locations.map((loc) => (
              <div key={loc.city} className="flex gap-4 p-5 bg-card border border-border hover:border-primary/30 transition-colors duration-200">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-primary">
                    {loc.type}
                  </span>
                  <div className="font-heading font-semibold text-charcoal text-sm mb-1">
                    {loc.city}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {loc.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section ref={ref3} className="fade-up py-14 bg-surface-subtle">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">Compliance</p>
          <h2 className="font-heading text-2xl text-charcoal mb-4">
            Certifications & Standards
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl"> Khanna Polyrib Pvt. Ltd. holds ISO 9001:2008 certification — demonstrating commitment to consistent quality management, process control, and customer satisfaction across all product lines. </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "ISO 9001:2008 Certified",
              "FDA 21 CFR Compliant",
              "RoHS Compliant",
              "REACH Compliant",
              "Food Grade Certified",
              "WRAS Approved",
              "UV Stabilised Grades",
              "Antistatic Grades"
            ].map((cert) => (
              <div key={cert} className="border border-border bg-card p-4 text-center hover:border-primary/40 transition-colors duration-200">
                <div className="w-8 h-8 bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div className="text-xs font-semibold text-charcoal">
                  {cert}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}