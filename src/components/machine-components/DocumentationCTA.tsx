import { Link } from "react-router-dom";
import { Download } from "lucide-react";

interface DocumentationCTAProps {
  title?: string;
}

export default function DocumentationCTA({
  title,
}: DocumentationCTAProps) {
  return (
    <section className="mt-6 overflow-hidden border border-[#279ECE]/15 bg-[#EDF8FD]">
      <div className="grid lg:grid-cols-[59%_41%]">

        {/* LEFT */}

        <div className="flex flex-col p-5 lg:p-6">

          <h2 className="text-[30px] text-center font-bold tracking-tight text-[#0F2A3D] transition-colors duration-300 hover:text-[#279ECE]">
            Need Complete Product Information?
          </h2>

          <Link
            to={`/contact?product=${encodeURIComponent(title ?? "")}`}
            className="
              mt-5
              inline-flex
              h-10
              min-w-[180px]
              items-center
              justify-center
              gap-2
              border
              border-[#C7D9E6]
              bg-white
              px-5
              text-[13px]
              font-semibold
              text-[#279ECE]
              transition-all
              duration-200
              hover:border-[#279ECE]
              hover:bg-[#F5FBFE]
              hover:text-[#279ECE]
              hover:shadow-lg
              hover:shadow-[#279ECE]/20
            "
          >
            <span>Get Product Brochure</span>

            <Download className="h-4 w-4" />
          </Link>

        </div>

        {/* RIGHT */}

        <div className="border-t border-[#279ECE]/10 bg-white/45 p-5 lg:border-l lg:border-t-0 lg:p-6">

          <p className="text-[14px] leading-8 text-[#5C7696]">
            Click{" "}
            <Link
              to={`/contact?product=${encodeURIComponent(title ?? "")}`}
              className="font-semibold text-[#279ECE] hover:underline hover:underline-offset-4"
            >
              Get Product Brochure
            </Link>{" "}
            to receive a detailed brochure for{" "}
            <span className="font-semibold text-[#279ECE]">
              {title}
            </span>{" "}
            with technical specifications, material details,
            dimensions, applications, & other product information.
          </p>

        </div>

      </div>
    </section>
  );
}