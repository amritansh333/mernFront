import {
  Boxes,
  Factory,
  Package,
  Cog,
  Layers,
  Wrench,
  Settings,
  Truck,
  Cpu,
  Workflow,
  FileUser,
  Scissors,
} from "lucide-react";

// ============================================================
// RIPLA CUTTING BOARD DATA
// ============================================================

const riplaMachineApplications = [
  "Swing-arm cutting machines",
  "Bridge cutting machines",
  "Travelling head cutting machines",
  "Roller and bridge type cutting installations",
];

const riplaSoftMaterials = [
  "Leather, leather fibre material",
  "Insole material, rubber",
  "Gaskets",
  "Textiles, felt, fleece",
  "Foam plastics, upholstery material",
  "Paper, cardboard, carton",
  "Foils",
  "Thermoplastic materials",
];

// Icons for cutting machines
const machineIcons = [
  Scissors,
  Factory,
  Workflow,
  Cog,
];

// Icons for soft materials
const materialIcons = [
  Layers,
  Package,
  Boxes,
  Layers,
  Package,
  FileUser,
  Workflow,
  Settings,
];

function getMachineIcon(index: number) {
  return machineIcons[index % machineIcons.length];
}

function getMaterialIcon(index: number) {
  return materialIcons[index % materialIcons.length];
}

// ============================================================
// REUSABLE APPLICATION BOX
// ============================================================

interface ApplicationBoxProps {
  title: string;
  icon: React.ElementType;
}

function ApplicationBox({
  title,
  icon: Icon,
}: ApplicationBoxProps) {
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
      <div className="relative z-10 flex items-center gap-2">
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

// ============================================================
// CUTTING BOARD APPLICATIONS SECTION
// ============================================================

export default function CuttingBoardApplicationsSection() {
  return (
    <section className="mb-4 border border-[#276A96]/10 bg-[#F8FAFC] px-6 py-6 sm:p-10">

      {/* ======================================================
          BADGE
          ====================================================== */}

      <div className="mb-3 inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
        <FileUser className="h-3.5 w-3.5 text-[#276A96]" />

        <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
          Applications
        </span>
      </div>

      {/* ======================================================
          HEADING
          ====================================================== */}

      <h2 className="mb-3 text-2xl font-bold text-[#0F2A3D]">
        Where It's Used
      </h2>

      <p className="mb-8 max-w-4xl text-sm leading-6 text-[#64748B]">
        Ripla Cutting boards are available as perfectly suitable boards
        for several types of cutting machines, cutting processes and tools.
      </p>

      {/* ======================================================
          CUTTING MACHINES
          ====================================================== */}

      <h3 className="mb-4 text-lg font-bold text-[#0F2A3D]">
        Suitable Cutting Machines &amp; Installations
      </h3>

      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {riplaMachineApplications.map((application, index) => {
          const Icon = getMachineIcon(index);

          return (
            <ApplicationBox
              key={`${application}-${index}`}
              title={application}
              icon={Icon}
            />
          );
        })}
      </div>

      {/* ======================================================
          SOFT MATERIALS
          ====================================================== */}

      <h3 className="mb-2 text-lg font-bold text-[#0F2A3D]">
        Suitable Soft Materials
      </h3>

      <p className="mb-4 text-sm leading-6 text-[#64748B]">
        Ripla Cutting boards can be used from both sides and are suitable
        for cutting all types of soft materials:
      </p>

      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {riplaSoftMaterials.map((material, index) => {
          const Icon = getMaterialIcon(index);

          return (
            <ApplicationBox
              key={`${material}-${index}`}
              title={material}
              icon={Icon}
            />
          );
        })}
      </div>

      {/* ======================================================
          DIRECTIONS TO USE
          ====================================================== */}

      <div className="border-t border-[#276A96]/10 pt-8">

        <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-[#279ECE]/20 bg-[#279ECE]/10 px-3 py-1.5">
          <FileUser className="h-3.5 w-3.5 text-[#276A96]" />

          <span className="text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
            Directions To Use
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

          {/* Storage Direction */}
          <ApplicationBox
            title="Boards should be always stored with facing on the ground. Boards should never be stored in standing position."
            icon={Layers}
          />

          {/* Surface Direction */}
          <ApplicationBox
            title="Board surface should be changed after every shift to prevent warpage of the board."
            icon={Settings}
          />

        </div>
      </div>
    </section>
  );
}