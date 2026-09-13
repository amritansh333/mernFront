import {
  Droplets,
  ShieldCheck,
  Sparkles,
  FlaskConical,
  Link2Off,
  BugOff,
  Gauge,
  CircleSlash,
  Zap,
  CloudSun,
  Dumbbell,
  FileUser,
} from "lucide-react";

const advantages = [
  {
    title: "Virtually No Water Absorption",
    icon: Droplets,
  },
  {
    title: "Non-Toxic & Odourless",
    icon: ShieldCheck,
  },
  {
    title: "Good Self-Lubrication",
    icon: Sparkles,
  },
  {
    title: "Excellent Corrosion Resistance",
    icon: FlaskConical,
  },
  {
    title: "Non-Adhesive Surface",
    icon: Link2Off,
  },
  {
    title: "Anti-Bacterial",
    icon: BugOff,
  },
  {
    title: "Low Coefficient of Friction",
    icon: Gauge,
  },
  {
    title: "Negligible Abrasion",
    icon: CircleSlash,
  },
  {
    title: "High Impact Resistance",
    icon: Zap,
  },
  {
    title: "Weather Resistant",
    icon: CloudSun,
  },
  {
    title: "High Tensile Strength",
    icon: Dumbbell,
  },
];

function AdvantageBox({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className="
        group relative overflow-hidden
        border border-[#276A96]/10
        border-l-4 border-l-[#279ECE]
        bg-white p-4
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="relative z-10 flex items-center gap-3">
        {/* Icon */}
        <div
          className="
            flex h-12 w-12 shrink-0
            items-center justify-center
            bg-[#279ECE]/10
            transition-colors duration-300
            group-hover:bg-[#279ECE]
          "
        >
          <Icon
            className="
              h-6 w-6
              text-[#279ECE]
              transition-colors duration-300
              group-hover:text-white
            "
          />
        </div>

        {/* Text */}
        <p className="text-sm font-semibold leading-snug text-[#1E293B]">
          {title}
        </p>
      </div>

      {/* Decorative Shape */}
      <div
        className="
          absolute -bottom-6 -right-6
          h-20 w-20
          bg-[#279ECE]/5
          transition-transform duration-300
          group-hover:scale-125
        "
      />
    </div>
  );
}

export default function PadsAdvantagesSection() {
  return (
    <section className="mb-4 border border-[#276A96]/10 bg-[#F8FAFC] px-6 py-6 sm:p-10">
      {/* Badge */}
      <div className="mb-3 inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
        <FileUser className="h-3.5 w-3.5 text-[#276A96]" />

        <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
          Advantages
        </span>
      </div>

      {/* Heading */}
      <h2 className="mb-3 text-2xl font-bold leading-tight text-[#0F2A3D] sm:text-3xl">
        Advantages of UHMWPE Marine Fender / Fascia Pads
      </h2>

      <p className="mb-8 max-w-4xl text-sm leading-6 text-[#64748B] sm:text-base">
        Key advantages of UHMWPE marine fender and fascia pads for port, dock
        and wharf protection.
      </p>

      {/* Advantages Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map(({ title, icon: Icon }) => (
          <AdvantageBox key={title} title={title} icon={Icon} />
        ))}
      </div>
    </section>
  );
}
