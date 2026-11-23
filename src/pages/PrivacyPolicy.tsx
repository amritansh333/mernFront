import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useActiveTocSection } from "@/hooks/useActiveTocSection";
import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/csr-slider1.jpeg";

const sections = [
  {
    title: "1. Introduction",
    content: [
      'Khanna Polyrib Pvt. Ltd. (referred to as "Khanna Polyrib", "POLYRIB", "we", "our" or "us") respects your privacy and is committed to protecting the personal information you share through our website.',
      "This Privacy Policy explains how we collect, use, store, disclose and protect information when you visit our website, contact us, request a quotation, submit technical drawings, apply for employment or use our online tools.",
      "By using this website, you acknowledge that you have read this policy. Where consent is legally required, we will seek it separately.",
    ],
  },
  {
    title: "2. Information We Collect",
    content: [
      "Depending on how you interact with our website, we may collect the following categories of information:",
    ],
    bullets: [
      "Contact information: Name, business email address, phone number, company name, designation and business address.",
      "Enquiry information: Product or material requirements, application details, quantity, dimensions, specifications and quotation-related information.",
      "Technical information: CAD files, engineering drawings, reference documents, uploaded images and other files voluntarily submitted for technical evaluation.",
      "Career information: Resume, employment history, qualifications, skills and other details submitted through our careers application process.",
      "Website usage information: IP address, browser type, device information, pages visited, referring URLs, access times and diagnostic information, where collected through website infrastructure or analytics tools.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: [
      "We use the information collected for legitimate business and website-related purposes, including:",
    ],
    bullets: [
      "Responding to product enquiries, quotation requests and customer communications.",
      "Understanding your material, engineering and manufacturing requirements.",
      "Reviewing technical drawings and preparing relevant product or component recommendations.",
      "Providing product information, technical documentation and support.",
      "Processing job applications and communicating with prospective candidates.",
      "Operating, maintaining, improving and securing our website and digital services.",
      "Managing business relationships, records, legal obligations and dispute resolution.",
      "Preventing fraud, misuse, unauthorised access and security incidents.",
    ],
  },
  {
    title: "4. Product Enquiries, Quotations and Technical Drawings",
    content: [
      "Information submitted through our Contact Us, Request a Quote, Send Your Drawing or Material Selector facilities may be used by our authorised sales, technical, engineering and customer support teams.",
      "Technical drawings, CAD files and other uploaded documents may contain commercially sensitive information. Please submit only files that you are authorised to share. Do not upload confidential third-party information without permission.",
      "Such documents will be used for evaluating your requirements, preparing quotations, assessing manufacturing feasibility and communicating with you about the requested products or services.",
      "Submitting a drawing or enquiry through the website does not automatically create a purchase contract, non-disclosure agreement or intellectual property transfer.",
    ],
  },
  {
    title: "5. Cookies and Similar Technologies",
    content: [
      "Our website or its service providers may use cookies, local storage or similar technologies to maintain essential website functionality, remember preferences, improve performance and understand website usage.",
      "Where analytics or optional tracking technologies are enabled, they should be used in accordance with applicable consent requirements. You can manage cookies through your browser settings and any consent controls made available on the website.",
      "Disabling certain cookies may affect some website features.",
    ],
  },
  {
    title: "6. Sharing and Disclosure of Information",
    content: [
      "We do not sell your personal information to third parties. We may share information only where reasonably necessary for the purposes described in this policy, including with:",
    ],
    bullets: [
      "Authorised employees and departments handling your enquiry, technical request or application.",
      "Website hosting, infrastructure, security, analytics, email and technology service providers, where such services are used.",
      "Professional advisers, auditors and legal representatives where required.",
      "Government authorities, regulators, courts or law enforcement agencies when disclosure is legally required.",
      "Relevant parties in connection with a business restructuring, merger or transfer, subject to appropriate safeguards.",
    ],
  },
  {
    title: "7. Data Storage and Security",
    content: [
      "We take reasonable technical and organisational measures designed to protect information against unauthorised access, disclosure, alteration, loss or misuse.",
      "These measures may include access restrictions, secure transmission, system monitoring and appropriate internal procedures.",
      "No internet transmission or electronic storage method can be guaranteed to be completely secure. We therefore cannot promise absolute security.",
    ],
  },
  {
    title: "8. Data Retention",
    content: [
      "We retain personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected, maintain business and transaction records, resolve disputes, comply with applicable legal requirements and protect our legitimate interests.",
      "Technical drawings, enquiry records and career applications may be retained for different periods depending on their purpose, the status of the business relationship and applicable retention obligations. Information that is no longer required will be deleted or anonymised where reasonably practicable.",
    ],
  },
  {
    title: "9. Your Privacy Rights",
    content: [
      "Subject to applicable law and its commencement provisions, you may have rights concerning your personal information, including:",
    ],
    bullets: [
      "Requesting information about personal data processed by us.",
      "Requesting correction or updating of inaccurate or incomplete information.",
      "Requesting erasure of personal information where legally applicable.",
      "Withdrawing consent where processing is based on consent.",
      "Raising a grievance or privacy-related concern.",
      "Exercising any additional rights available under applicable data protection laws.",
    ],
  },
  {
    title: "10. Third-Party Websites and Services",
    content: [
      "Our website may contain links to third-party websites, platforms, social networks, maps or external resources. These websites operate under their own privacy policies and terms.",
      "We are not responsible for the privacy practices, security or content of third-party websites. We encourage you to review their policies before sharing information.",
    ],
  },
  {
    title: "11. Children's Privacy",
    content: [
      "Our website is intended for business and professional use and is not designed to solicit personal information from children. We do not knowingly collect children's personal data through the website except where permitted and handled in accordance with applicable law.",
    ],
  },
  {
    title: "12. Changes to This Privacy Policy",
    content: [
      "We may revise this Privacy Policy from time to time to reflect changes in our website, business operations, technology or applicable legal requirements.",
      "The updated policy will be published on this page with a revised effective or last-updated date.",
    ],
  },
  {
    title: "13. Contact and Grievance Requests",
    content: [
      "For privacy questions, requests concerning your personal information, or complaints relating to this policy, please contact Khanna Polyrib Pvt. Ltd. using the details below.",
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

export default function PrivacyPolicy() {
  // Generate stable section IDs.
  const sectionIds = useMemo(
    () => sections.map((_, index) => `privacy-${index + 1}`),
    [],
  );

  // Track the currently visible section while scrolling.
  const activeSection = useActiveTocSection(sectionIds);

  return (
    <main className="min-h-screen bg-white pt-16" style={pageTexture}>
      {/* Common Page Header */}
      <PageHeroBanner
        eyebrow="Legal Information"
        title="Privacy"
        highlight="Policy"
        image={manufacturingImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]}
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
              aria-label="Privacy Policy sections"
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
                This policy applies to information collected through the POLYRIB
                website, including enquiries, quotation requests, technical
                drawing submissions and career applications.
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
                  {index === 12 && (
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
                to="/terms-and-conditions"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Read Terms & Conditions →
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
    </main>
  );
}
