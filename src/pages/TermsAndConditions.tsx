import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useActiveTocSection } from "@/hooks/useActiveTocSection";
import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/csr-slider1.jpeg";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      'Welcome to the website of Khanna Polyrib Pvt. Ltd. ("Khanna Polyrib", "POLYRIB", "we", "our" or "us"). These Terms & Conditions govern your access to and use of this website.',
      "By accessing or using this website, you agree to these Terms & Conditions. If you do not agree, please discontinue using the website.",
    ],
  },
  {
    title: "2. About Our Website",
    content: [
      "This website provides information about Khanna Polyrib's engineering thermoplastic materials, semi-finished products, engineered machine components, industries served, technical capabilities and related business services.",
      "The website also allows visitors to contact us, request quotations, submit technical drawings, explore materials, access resources and apply for career opportunities.",
    ],
  },
  {
    title: "3. Product Information and Specifications",
    content: [
      "We make reasonable efforts to ensure that product descriptions, images, technical specifications, material properties, dimensions, colours, availability and other website information are accurate and current.",
      "However, website information is provided for general guidance. Product images may be illustrative, and actual products may vary due to manufacturing tolerances, grade, colour, thickness, dimensions, production processes or customisation.",
      "Technical data and material properties may vary depending on testing methods, processing conditions, application requirements and product grade. Always confirm the applicable technical specifications with our team before making purchasing or engineering decisions.",
    ],
  },
  {
    title: "4. Quotations and Enquiries",
    content: [
      "Submitting an enquiry or quotation request through this website does not constitute an order acceptance, binding offer, confirmed price or contract of sale.",
      "All quotations, pricing, taxes, delivery schedules, minimum order quantities, payment terms and commercial conditions are subject to separate confirmation by Khanna Polyrib.",
      "A purchase or supply commitment will arise only after the relevant commercial terms have been agreed and accepted by the parties through an authorised order confirmation or written agreement.",
    ],
  },
  {
    title: "5. Technical Drawings and Custom Requirements",
    content: [
      "Visitors may submit technical drawings, CAD files, dimensions, specifications or other documents to help us evaluate custom manufacturing requirements.",
      "You confirm that you have the authority to share any documents you upload and that doing so does not violate another party's intellectual property, confidentiality or contractual rights.",
      "Submission of a drawing does not automatically transfer its ownership or grant us rights beyond those reasonably necessary to evaluate and respond to your enquiry.",
      "Any confidentiality, intellectual property ownership, manufacturing rights or non-disclosure obligations must be governed by a separate written agreement where required.",
    ],
  },
  {
    title: "6. Acceptable Website Use",
    content: [
      "You agree to use this website responsibly and for lawful purposes. You must not:",
    ],
    bullets: [
      "Use the website for fraudulent, misleading, unlawful or unauthorised activities.",
      "Attempt to gain unauthorised access to website systems, servers, databases or accounts.",
      "Introduce malware, malicious scripts, viruses or other harmful code.",
      "Interfere with website availability, security or normal operation.",
      "Scrape, copy or extract website content through automated means in a manner that violates applicable law or our rights.",
      "Submit false information, infringing materials or documents that you are not authorised to share.",
      "Use website content to misrepresent our products, business, identity or commercial relationships.",
    ],
  },
  {
    title: "7. Intellectual Property",
    content: [
      "Unless otherwise stated, the website and its content, including text, graphics, logos, product photographs, illustrations, layouts, design elements, brand names, trademarks and downloadable materials, are owned by or licensed to Khanna Polyrib Pvt. Ltd.",
      "POLYRIB, POLYRIB V, POLYRIB H, POLYRIB P and other product or brand names displayed on this website may be trademarks or proprietary identifiers of their respective owners.",
      "You may view and use website content for personal or legitimate business evaluation. You may not reproduce, modify, distribute, publish, commercially exploit or create derivative works from our content without prior written permission, except where permitted by law.",
    ],
  },
  {
    title: "8. Technical Resources and Downloads",
    content: [
      "Technical documents, brochures, product catalogues, material guides and downloadable resources are provided for general informational purposes.",
      "You are responsible for independently verifying whether a material or product is suitable for your specific application, operating environment, safety requirements and applicable industry standards.",
      "Do not treat website content as a substitute for professional engineering assessment, testing or written technical confirmation.",
    ],
  },
  {
    title: "9. Third-Party Links",
    content: [
      "Our website may link to external websites, services or resources for convenience. These links do not necessarily imply endorsement or responsibility for the third party's content, availability, security or practices.",
      "Your use of third-party websites is subject to their respective terms and policies.",
    ],
  },
  {
    title: "10. Website Availability and Changes",
    content: [
      "We aim to keep the website accessible and functioning properly. However, we do not guarantee uninterrupted, error-free or continuous availability.",
      "We may modify, suspend, update or discontinue any website feature, product information, service or content without prior notice.",
    ],
  },
  {
    title: "11. Disclaimer of Warranties",
    content: [
      'To the extent permitted by applicable law, this website and its content are provided on an "as is" and "as available" basis.',
      "We do not warrant that all website information will always be complete, accurate, current, uninterrupted or free from errors, technical defects or harmful components.",
      "Any product warranty, performance commitment or supply obligation will be governed by the applicable written quotation, purchase order, product documentation or separate agreement.",
    ],
  },
  {
    title: "12. Limitation of Liability",
    content: [
      "To the maximum extent permitted by applicable law, Khanna Polyrib Pvt. Ltd. shall not be liable for indirect, incidental, special or consequential losses arising from the use of, or inability to use, this website or reliance on general website information.",
      "Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited under applicable law, including liability arising from fraud or wilful misconduct where exclusion is prohibited.",
    ],
  },
  {
    title: "13. Indemnification",
    content: [
      "To the extent permitted by law, you agree to be responsible for losses, claims, liabilities and reasonable expenses arising from your unlawful use of the website, your violation of these Terms or your infringement of third-party rights.",
    ],
  },
  {
    title: "14. Privacy",
    content: [
      "Your use of this website is also governed by our Privacy Policy, which explains how we collect, use and protect information submitted through the website.",
    ],
  },
  {
    title: "15. Governing Law and Jurisdiction",
    content: [
      "These Terms & Conditions shall be governed by the laws of India.",
      "Subject to applicable law, courts of competent jurisdiction in Kanpur, Uttar Pradesh, India shall have jurisdiction over disputes arising from the use of this website.",
    ],
  },
  {
    title: "16. Changes to These Terms",
    content: [
      "We may update these Terms & Conditions from time to time. Revised terms will be published on this page with an updated date.",
      "Your continued use of the website after revised terms are published constitutes acceptance of the updated terms to the extent permitted by applicable law.",
    ],
  },
  {
    title: "17. Contact Information",
    content: [
      "For questions regarding these Terms & Conditions, website content or business enquiries, please contact us using the details below.",
    ],
  },
];

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

export default function TermsAndConditions() {
  // Generate stable section IDs.
  const sectionIds = useMemo(
    () => sections.map((_, index) => `terms-${index + 1}`),
    [],
  );

  // Track the currently visible section while scrolling.
  const activeSection = useActiveTocSection(sectionIds);

  return (
    <div className="min-h-screen bg-white pt-16" style={pageTexture}>
      {/* Common Page Header */}
      <PageHeroBanner
        eyebrow="Legal Information"
        title="Terms"
        highlight="& Conditions"
        image={manufacturingImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-5 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-16">
          {/* Table of Contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start h-fit">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
              On this page
            </p>

            <nav
              aria-label="Terms and Conditions sections"
              className="flex lg:flex-col flex-wrap gap-1.5"
            >
              {sections.map((section, index) => {
                const id = sectionIds[index];
                const isActive = activeSection === id;

                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`
                      text-xs sm:text-sm rounded-md py-2 px-3
                      border-l-2 transition-all duration-200
                      ${
                        isActive
                          ? "text-primary font-semibold bg-primary/5 border-primary rounded-xl"
                          : "text-muted-foreground border-transparent hover:text-primary hover:bg-primary/5"
                      }
                    `}
                  >
                    {section.title}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Legal Content */}
          <article className="min-w-0 max-w-4xl">
            {/* Intro Box */}
            <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/70">
              <p className="text-sm leading-relaxed text-foreground/80">
                These terms apply to the use of this website. Specific product
                purchases, manufacturing orders, quotations and supply
                arrangements may be governed by separate commercial agreements.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10 sm:space-y-12">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  id={sectionIds[index]}
                  className="scroll-mt-28"
                >
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4">
                    {section.title}
                  </h2>

                  {/* Paragraphs */}
                  <div className="space-y-3">
                    {section.content.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm sm:text-[15px] text-muted-foreground leading-7"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Bullet Points */}
                  {section.bullets && (
                    <ul className="mt-4 space-y-3 pl-5 list-disc marker:text-primary">
                      {section.bullets.map((item) => (
                        <li
                          key={item}
                          className="text-sm sm:text-[15px] text-muted-foreground leading-7 pl-1"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Contact Information */}
                  {index === 16 && (
                    <div className="mt-5 rounded-2xl border border-primary/50 p-5 sm:p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />

                        <p className="text-sm text-muted-foreground leading-6">
                          Khanna Polyrib Pvt. Ltd., 24/168 Birhana Road, Kanpur
                          – 208001, Uttar Pradesh, India.
                        </p>
                      </div>

                      <a
                        href="mailto:info@polyrib.com"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-5 h-5 text-primary shrink-0" />
                        info@polyrib.com
                      </a>

                      <a
                        href="tel:05152970306"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-5 h-5 text-primary shrink-0" />
                        0515-2970306
                      </a>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Bottom Navigation */}
            <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                to="/privacy-policy"
                className="text-sm font-semibold text-primary hover:underline"
              >
                ← Read Privacy Policy
              </Link>

              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Return to Homepage
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
