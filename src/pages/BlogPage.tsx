import { Link } from "react-router-dom";
import { ArrowRight, Camera, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
import sheetsImage from "@/assets/sheets.jpg";
import machineImage from "@/assets/machine-components.jpg";
import rodsImage from "@/assets/rods-tubes.jpg";
import automotiveImage from "@/assets/industry-automotive.jpg";
import pharmaImage from "@/assets/industry-pharma.jpg";
import foodImage from "@/assets/industry-food.jpg";
import { useScrollFade } from "@/hooks/useScrollFade";

const POSTS = [
  {
    id: "1",
    type: "Blog",
    title: "Selecting UHMW PE vs HDPE for conveyor wear strips — a practical guide",
    date: "Jan 2025",
    image: rodsImage,
    excerpt: "Both POLYRIB V (UHMW PE) and POLYRIB H (HDPE) are widely used for conveyor wear surfaces, but the right choice depends on load, speed, and temperature. This guide walks through the key selection criteria.",
    tags: ["UHMW PE", "HDPE", "Conveyor"],
  },
  {
    id: "2",
    type: "Blog",
    title: "Why PCCLEAR PC sheets are replacing glass in industrial enclosures",
    date: "Dec 2024",
    image: sheetsImage,
    excerpt: "Polycarbonate is 250× stronger than glass at comparable thickness. We explore where PCCLEAR grades are being specified as glass replacements in industrial, agricultural, and construction applications.",
    tags: ["PCCLEAR", "Polycarbonate", "Glazing"],
  },
  {
    id: "3",
    type: "Blog",
    title: "KAYLON vs PAKETAL for gear and bearing applications",
    date: "Nov 2024",
    image: machineImage,
    excerpt: "Cast nylon (KAYLON) and acetal (PAKETAL) are both excellent choices for precision bearing and gear applications. We compare their mechanical properties, machinability, and recommended applications.",
    tags: ["KAYLON", "PAKETAL", "Gears"],
  },
  {
    id: "4",
    type: "Gallery",
    title: "Automechanika 2024 — Mumbai Exhibition",
    date: "Oct 2024",
    image: automotiveImage,
    excerpt: "Polyrib exhibited our full automotive thermoplastics range at Automechanika Mumbai 2024. Highlights included our PLASCON-V machine component grades and KBK ABS automotive interior sheets.",
    tags: ["Exhibition", "Automotive", "ABS"],
  },
  {
    id: "5",
    type: "Blog",
    title: "Food-grade thermoplastics: understanding FDA 21 CFR and EU 10/2011",
    date: "Sep 2024",
    image: foodImage,
    excerpt: "A practical overview of food-contact compliance requirements for thermoplastic components. Which Polyrib grades carry FDA and EU food contact certification — and what that means in practice.",
    tags: ["Food Grade", "FDA", "Compliance"],
  },
  {
    id: "6",
    type: "Gallery",
    title: "New DIPRA Speciality Sheet Production Line",
    date: "Aug 2024",
    image: pharmaImage,
    excerpt: "Our new dedicated DIPRA production line for UV-stabilised PP speciality sheets came online in August 2024, doubling our capacity for DIPRA PPGL roofing liners and DIPRA embossed gate liners.",
    tags: ["DIPRA", "PP", "Manufacturing"],
  },
];

const TYPE_COLOURS: Record<string, string> = {
  Blog: "bg-blue-50 text-blue-700",
  Gallery: "bg-orange-50 text-orange-700",
};

export default function BlogPage() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  return (
    <div className="pt-16">
      <div className="relative min-h-[40vh] flex items-end overflow-hidden bg-charcoal">
        <img src={heroImage} alt="Blog and Gallery" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
        <div className="relative container max-w-7xl mx-auto px-6 py-14">
          <nav className="text-xs text-white/50 mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-white/80">Home</Link><span>/</span>
            <span className="text-white/80">Blog & Gallery</span>
          </nav>
          <p className="section-label text-white/50 mb-3">Knowledge & Updates</p>
          <h1 className="font-heading text-4xl text-white">Blog & Gallery</h1>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground">{POSTS.length} articles and updates</p>
          <div className="flex gap-2">
            {["All", "Blog", "Gallery"].map((f) => (
              <button key={f} className="px-4 py-1.5 text-sm font-semibold border border-border bg-card text-charcoal-light hover:border-primary hover:text-primary transition-all duration-200">
                {f}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <div key={post.id} className="product-card flex flex-col group">
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] px-2.5 py-1 font-bold ${TYPE_COLOURS[post.type] || ""}`}>{post.type}</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar className="w-3 h-3" />{post.date}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug mb-3 group-hover:text-primary transition-colors duration-200 flex-1">{post.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-surface-subtle border border-divider text-charcoal-light">{t}</span>
                  ))}
                </div>
                <div className="cta-link text-xs pt-3 border-t border-divider">
                  {post.type === "Gallery" ? <Camera className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  {post.type === "Gallery" ? "View Gallery" : "Read Article"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from "react";
