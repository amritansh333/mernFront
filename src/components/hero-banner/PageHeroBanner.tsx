import React from "react";
import { Link } from "react-router-dom";
import "./PageHeroBanner.css";

export interface PageHeroBreadcrumb {
  label: string;
  to?: string;
}

interface PageHeroBannerProps {
  eyebrow: string;
  title: string;
  highlight?: string;

  image: string;
  imageAlt?: string;
  imagePosition?: string;

  breadcrumbs?: PageHeroBreadcrumb[];

  /* Customizable colours */
  backgroundColor?: string;
  accentColor?: string;
  highlightColor?: string;
  dividerColor?: string;
  headingColor?: string;

  /* Responsive banner height */
  height?: string;

  /* Optional class for page-specific customization */
  className?: string;
}

export default function PageHeroBanner({
  eyebrow,
  title,
  highlight,

  image,
  imageAlt = "Company manufacturing facility",
  imagePosition = "center center",

  breadcrumbs,

  backgroundColor = "#f2fbf9",
  accentColor = "#2082ac",
  highlightColor = "#126d94",
  dividerColor = "#2082ac",
  headingColor = "#172b37",

  height = "clamp(190px, 18vw, 275px)",

  className = "",
}: PageHeroBannerProps) {
  const defaultBreadcrumbs: PageHeroBreadcrumb[] = [
    { label: "Home", to: "/" },
    { label: eyebrow },
  ];

  const breadcrumbItems = breadcrumbs ?? defaultBreadcrumbs;

  return (
    <header
      className={`page-hero-banner ${className}`}
      style={
        {
          "--page-hero-height": height,
          "--page-hero-background": backgroundColor,
          "--page-hero-accent": accentColor,
          "--page-hero-highlight": highlightColor,
          "--page-hero-divider": dividerColor,
          "--page-hero-heading": headingColor,
          "--page-hero-image-position": imagePosition,
        } as React.CSSProperties
      }
    >
      {/* LEFT: GEOMETRIC BRAND SECTION */}
      <div className="page-hero-brand">
        <div className="page-hero-pattern" />

        <div className="page-hero-content">
          {/* BREADCRUMBS */}
          <nav aria-label="Breadcrumb" className="page-hero-breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={`${item.label}-${index}`}>
                {index > 0 && <span className="page-hero-separator">/</span>}

                {item.to && index !== breadcrumbItems.length - 1 ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <span className="page-hero-current">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* HEADING */}
          <div className="page-hero-heading">
            <span className="page-hero-eyebrow">{eyebrow}</span>

            <h1>
              {title}

              {highlight && (
                <>
                  <br />
                  <span>{highlight}</span>
                </>
              )}
            </h1>

            <div className="page-hero-accent" />
          </div>
        </div>
      </div>

      {/* MIDDLE: ANGLED DIVIDER */}
      <div className="page-hero-divider" aria-hidden="true" />

      {/* RIGHT: IMAGE */}
      <div className="page-hero-image">
        <img
          src={image}
          alt={imageAlt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        <div className="page-hero-image-overlay" />
      </div>
    </header>
  );
}
