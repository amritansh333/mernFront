import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Upload,
  FileText,
  X,
  Send,
  PenLine,
  Search,
  ChevronDown,
  Check,
  MessageCircleQuestion,
  Users,
  Factory,
  Building2,
  Folder,
  FolderOpen,
  Plus,
  Minus,
} from "lucide-react";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import ContactUsImage from "@/assets/contact-us.jpeg";

/* ─── Tab type ─── */
type Tab = "quote" | "drawing";

type ProductOptionType = "category" | "subcategory" | "brand" | "product";

interface ProductOption {
  name: string;
  type: ProductOptionType;
  children?: ProductOption[];
}

interface FlatProductOption {
  name: string;
  type: ProductOptionType;
  path: string;
  depth: number;
}

export const PRODUCT_OPTIONS: ProductOption[] = [
  {
    name: "Thermoplastics Semi-Finished Products",
    type: "category",
    children: [
      {
        name: "Sheets & Blocks",
        type: "subcategory",
        children: [
          {
            name: "Polyrib V",
            type: "brand",
            children: [
              {
                name: "POLYRIB-V005",
                type: "product",
              },
              {
                name: "POLYRIB-V030",
                type: "product",
              },
              {
                name: "POLYRIB-L-V",
                type: "product",
              },
              {
                name: "POLYRIB-V SUPERSLIDE",
                type: "product",
              },
              {
                name: "POLYRIB-V-AS",
                type: "product",
              },
              {
                name: "POLYRIB-V-FR",
                type: "product",
              },
              {
                name: "POLYRIB-V FG",
                type: "product",
              },
              {
                name: "POLYRIB-C",
                type: "product",
              },
            ],
          },
          {
            name: "PCClear",
            type: "brand",
            children: [
              {
                name: "PCClear Light",
                type: "product",
              },
              {
                name: "PCClear UV Light",
                type: "product",
              },
              {
                name: "PCClear Glaze",
                type: "product",
              },
              {
                name: "PCClear Glaze UV",
                type: "product",
              },
              {
                name: "PCClear Glaze Diamond",
                type: "product",
              },
              {
                name: "PCClear RIB",
                type: "product",
              },
              {
                name: "PCClear OPAL",
                type: "product",
              },
            ],
          },
          {
            name: "Polyrib P",
            type: "brand",
            children: [
              {
                name: "Polyrib PPX-260",
                type: "product",
              },
              {
                name: "Polyrib PPX-259",
                type: "product",
              },
              {
                name: "Polyrib HGX",
                type: "product",
              },
              {
                name: "Polyrib P Hitech",
                type: "product",
              },
              {
                name: "Polyrib Hitech GL",
                type: "product",
              },
              {
                name: "Polyrib PGX-266 GL",
                type: "product",
              },
              {
                name: "Polyrib Ripla HIH",
                type: "product",
              },
              {
                name: "Polyrib Ripla HIK",
                type: "product",
              },
              {
                name: "Polyrib Ripla Hitech",
                type: "product",
              },
              {
                name: "Polyrib P PPH CED",
                type: "product",
              },
              {
                name: "Polyrib PPX AS",
                type: "product",
              },
              {
                name: "Polyrib PPC CED",
                type: "product",
              },
            ],
          },
          {
            name: "Polyrib H",
            type: "brand",
            children: [
              {
                name: "POLYRIB H EXT",
                type: "product",
              },
              {
                name: "POLYRIB L-V001",
                type: "product",
              },
              {
                name: "POLYRIB H Play EMB UV",
                type: "product",
              },
              {
                name: "POLYRIB LD",
                type: "product",
              },
              {
                name: "POLYRIB HGX-267 EXT",
                type: "product",
              },
              {
                name: "POLYRIB H Cutrite EMB",
                type: "product",
              },
              {
                name: "POLYRIB H CED",
                type: "product",
              },
            ],
          },
          {
            name: "Hitech",
            type: "brand",
            children: [
              {
                name: "Polyrib P Hitech",
                type: "product",
              },
              {
                name: "Polyrib Ripla Hitech",
                type: "product",
              },
              {
                name: "Polyrib Hitech GL",
                type: "product",
              },
            ],
          },
          {
            name: "Arete",
            type: "brand",
            children: [
              {
                name: "Arete L-V Superslide",
                type: "product",
              },
              {
                name: "Arete L-V",
                type: "product",
              },
              {
                name: "Arete L-V030",
                type: "product",
              },
              {
                name: "Arete L-V005",
                type: "product",
              },
              {
                name: "Arete L-V001",
                type: "product",
              },
            ],
          },
          {
            name: "Polylimb",
            type: "brand",
            children: [
              {
                name: "Polylimb Ortho AL",
                type: "product",
              },
              {
                name: "Polylimb Ortho Reflex",
                type: "product",
              },
              {
                name: "Polylimb Ortho Flex",
                type: "product",
              },
              {
                name: "Polylimb Ortho Ultra Flex",
                type: "product",
              },
              {
                name: "Polylimb Ortho Flex 001",
                type: "product",
              },
            ],
          },
          {
            name: "Cutrite",
            type: "brand",
            children: [
              {
                name: "Polyrib Cutrite EMB",
                type: "product",
              },
              {
                name: "Cutrite L-CED",
                type: "product",
              },
            ],
          },
          {
            name: "Plascon V",
            type: "brand",
            children: [
              {
                name: "PLASCON V",
                type: "product",
              },
              {
                name: "PLASCON V PIGMENTED",
                type: "product",
              },
              {
                name: "PLASCON GB",
                type: "product",
              },
              {
                name: "POLYRIB MOS2",
                type: "product",
              },
            ],
          },
          {
            name: "Pakaylon",
            type: "brand",
            children: [
              {
                name: "Pakaylon Sheets",
                type: "product",
              },
            ],
          },
          {
            name: "Paketal",
            type: "brand",
            children: [
              {
                name: "Paketal Natural",
                type: "product",
              },
              {
                name: "Paketal Black",
                type: "product",
              },
            ],
          },
          {
            name: "Polyrib A",
            type: "brand",
            children: [
              {
                name: "POLYRIB A Embossed Glossy",
                type: "product",
              },
              {
                name: "POLYRIB A Embossed Matt",
                type: "product",
              },
              {
                name: "POLYRIB A / ASA Embossed & Plain",
                type: "product",
              },
              {
                name: "POLYRIB A Acrylic Embossed Asca",
                type: "product",
              },
              {
                name: "POLYRIB ASA Sheets",
                type: "product",
              },
              {
                name: "POLYRIB A Dual",
                type: "product",
              },
              {
                name: "POLYRIB A FR UV",
                type: "product",
              },
              {
                name: "POLYRIB A WR3D",
                type: "product",
              },
              {
                name: "POLYRIB A CED",
                type: "product",
              },
            ],
          },
          {
            name: "KBK PS",
            type: "product",
          },
        ],
      },
      {
        name: "Rods & Tubes",
        type: "subcategory",
        children: [
          {
            name: "Plascon V",
            type: "brand",
            children: [
              {
                name: "Plascon V Rod",
                type: "product",
              },
              {
                name: "Plascon V Superslide",
                type: "product",
              },
            ],
          },
          {
            name: "Pakaylon Rods",
            type: "brand",
            children: [
              {
                name: "Kaylon Rod",
                type: "product",
              },
              {
                name: "Kaylon Tube",
                type: "product",
              },
            ],
          },
        ],
      },
      {
        name: "Coils & Rolls",
        type: "subcategory",
        children: [
          {
            name: "Dipra Addclear Rolls",
            type: "brand",
            children: [
              {
                name: "Dipra Addclear Embossed",
                type: "product",
              },
              {
                name: "Dipra Uviofast Addclear",
                type: "product",
              },
              {
                name: "Dipra Addclear Diamond",
                type: "product",
              },
              {
                name: "Dipra Addclear Badal",
                type: "product",
              },
            ],
          },
          {
            name: "HDGL",
            type: "brand",
            children: [],
          },
          {
            name: "Hitech GL",
            type: "product",
            children: [
              {
                name: "Polyrib-HGX-266-Ext",
                type: "product",
              },
            ],
          },
          {
            name: "PCClear Rolls",
            type: "brand",
            children: [
              {
                name: "Pcclear Light",
                type: "product",
              },
              {
                name: "Pcclear UV Light",
                type: "product",
              },
              {
                name: "Pcclear Glaze",
                type: "product",
              },
              {
                name: "Pcclear Glaze UV",
                type: "product",
              },
              {
                name: "Pcclear Glaze Diamond",
                type: "product",
              },
              {
                name: "Pcclear Opal",
                type: "product",
              },
            ],
          },
          {
            name: "PPGL",
            type: "brand",
            children: [
              {
                name: "Polyrib-PGX-266",
                type: "product",
              },
            ],
          },
          {
            name: "Polyrib-H Rolls",
            type: "product",
            children: [],
          },
        ],
      },
      {
        name: "Welding Rods",
        type: "subcategory",
        children: [
          {
            name: "Polyrib-H Welding Rods",
            type: "product",
          },
          {
            name: "Polyrib-P Welding Rods",
            type: "product",
          },
        ],
      },
      {
        name: "Custom-Sized Plastic Sheets",
        type: "subcategory",
        children: [],
      },
    ],
  },
  {
    name: "Thermoplastics Engineered Products",
    type: "category",
    children: [
      {
        name: "Strips",
        type: "subcategory",
        children: [],
      },
      {
        name: "Profiles",
        type: "subcategory",
        children: [],
      },
      {
        name: "Vacuum Formed Plastic Parts",
        type: "subcategory",
        children: [
          {
            name: "PCClear Base Plate",
            type: "product",
          },
          {
            name: "PCClear Louvers",
            type: "product",
          },
        ],
      },
      {
        name: "Soft Cutting Board: Ripla",
        type: "subcategory",
        children: [
          {
            name: "Ripla",
            type: "product",
          },
          {
            name: "Ripla HIH",
            type: "product",
          },
          {
            name: "Ripla HIK",
            type: "product",
          },
          {
            name: "Ripla Hitech",
            type: "product",
          },
        ],
      },
      {
        name: "Chopping Board: Cutrite",
        type: "subcategory",
        children: [
          {
            name: "Cutrite",
            type: "product",
          },
          {
            name: "Cutrite EMB",
            type: "product",
          },
          {
            name: "Cutrite-L CED",
            type: "product",
          },
        ],
      },
      {
        name: "Application Ready Sheets",
        type: "subcategory",
        children: [
          {
            name: "Arete Liners",
            type: "product",
          },
          {
            name: "Polylimb",
            type: "product",
          },
          {
            name: "MASS (Manya Shuttering Sheets)",
            type: "product",
          },
          {
            name: "POCAPP",
            type: "product",
          },
        ],
      },
      {
        name: "Machined Plastic Parts",
        type: "subcategory",
        children: [
          {
            name: "P-LPG",
            type: "product",
          },
          {
            name: "Plascon Sealing Strips",
            type: "product",
          },
          {
            name: "Plamacon",
            type: "product",
          },
          {
            name: "Metering Bar Holders",
            type: "product",
          },
          {
            name: "Plagro",
            type: "product",
          },
          {
            name: "Solution For Headbox",
            type: "product",
          },
          {
            name: "Plasb",
            type: "product",
          },
          {
            name: "Polyrib Car Stopper",
            type: "product",
          },
          {
            name: "Spur Gears",
            type: "product",
          },
          {
            name: "P Vibrating Screen",
            type: "product",
          },
          {
            name: "Plabott",
            type: "product",
          },
          {
            name: "Placoss",
            type: "product",
          },
          {
            name: "Kaylon Gears",
            type: "product",
          },
          {
            name: "Plascon Former Bottom Lip",
            type: "product",
          },
          {
            name: "CCN",
            type: "product",
          },
        ],
      },
      {
        name: "Fascia Pads / Marine Fender Pads",
        type: "subcategory",
        children: [],
      },
      {
        name: "POP (Polyrib Outrigger Pads)",
        type: "subcategory",
        children: [],
      },
    ],
  },
];

const flattenProductOptions = (
  options: ProductOption[],
  parentPath = "",
  depth = 0,
): FlatProductOption[] => {
  return options.flatMap((option) => {
    const path = parentPath ? `${parentPath} › ${option.name}` : option.name;

    const currentOption: FlatProductOption = {
      name: option.name,
      type: option.type,
      path,
      depth,
    };

    return [
      currentOption,
      ...flattenProductOptions(option.children ?? [], path, depth + 1),
    ];
  });
};

const ALL_PRODUCT_OPTIONS = flattenProductOptions(PRODUCT_OPTIONS);
// Get all descendants of a selected category, subcategory or brand
const getDescendantPaths = (path: string): string[] => {
  return ALL_PRODUCT_OPTIONS.filter((option) =>
    option.path.startsWith(`${path} › `),
  ).map((option) => option.path);
};

// Get all parent paths of an option
const getAncestorPaths = (path: string): string[] => {
  return ALL_PRODUCT_OPTIONS.filter((option) =>
    path.startsWith(`${option.path} › `),
  ).map((option) => option.path);
};

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<Tab>("quote");
  const [activeContactFolder, setActiveContactFolder] = useState<string | null>(null);

  /* Quote form */
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    requirement: "",
  });

  const [productSearch, setProductSearch] = useState("");
  const [showProductOptions, setShowProductOptions] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductToggle = (product: FlatProductOption) => {
    const descendantPaths = getDescendantPaths(product.path);

    const affectedPaths = [product.path, ...descendantPaths];

    const ancestorPaths = getAncestorPaths(product.path);

    // Check whether this option and all its descendants are selected
    const isFullySelected =
      selectedProducts.includes(product.path) ||
      (descendantPaths.length > 0 &&
        descendantPaths.every((path) => selectedProducts.includes(path)));

    let updatedProducts: string[];

    if (isFullySelected) {
      // Deselect this option, its descendants and selected ancestors
      updatedProducts = selectedProducts.filter(
        (path) =>
          !affectedPaths.includes(path) && !ancestorPaths.includes(path),
      );
    } else {
      // Select this option and all its descendants
      // Remove selected ancestors so they can reflect partial selection correctly
      updatedProducts = Array.from(
        new Set([
          ...selectedProducts.filter((path) => !ancestorPaths.includes(path)),
          ...affectedPaths,
        ]),
      );
    }

    setSelectedProducts(updatedProducts);

    setFormData((prev) => ({
      ...prev,
      product: updatedProducts.join(", "),
    }));
  };

  const filteredProducts = ALL_PRODUCT_OPTIONS.filter((product) =>
    `${product.name} ${product.path}`
      .toLowerCase()
      .includes(productSearch.trim().toLowerCase()),
  );

  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  /* Drawing form */
  const [drawData, setDrawData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [drawSubmitted, setDrawSubmitted] = useState(false);

  const [quoteError, setQuoteError] = useState("");
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const fileRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* =====================================================
     URL TAB SYNCHRONIZATION
  ===================================================== */

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab === "quote" || tab === "drawing") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);

    navigate(`/contact?tab=${tab}`, {
      replace: true,
    });
  };

  /* =====================================================
     FILE VALIDATION CONSTANTS
  ===================================================== */

  const MAX_DRAWING_FILES = 5;
  const MAX_FILE_SIZE = 20 * 1024 * 1024;

  const DRAWING_FILE_EXTENSIONS = [
    "pdf",
    "png",
    "jpg",
    "jpeg",
    "dwg",
    "dxf",
    "step",
    "stp",
  ];

  const getFileExtension = (name: string) =>
    name.split(".").pop()?.toLowerCase() ?? "";

  const isValidFullName = (value: string) =>
    /^[\p{L}\p{M}' -]{2,100}$/u.test(value.trim());

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isMeaningfulCompany = (value: string) => /[A-Za-z0-9]/.test(value);

  const isSafeFileName = (name: string) => {
    if (name.length > 255) {
      return false;
    }

    if (name.includes("../") || name.includes("..\\") || name.includes("\0")) {
      return false;
    }

    return true;
  };

  const isValidPhone = (value: string) => {
    const allowedPattern = /^[0-9()+\-\s]+$/;

    if (!allowedPattern.test(value)) {
      return false;
    }

    const digits = value.replace(/[^0-9]/g, "").length;

    return digits >= 7 && digits <= 15;
  };

  const isDuplicateFile = (file: File, currentFiles: File[]) =>
    currentFiles.some(
      (existing) =>
        existing.name === file.name &&
        existing.size === file.size &&
        existing.lastModified === file.lastModified,
    );

  /* =====================================================
     FILE LIST VALIDATION
  ===================================================== */

  const validateFilesList = (fileList: File[]): string[] => {
    const errors: string[] = [];

    if (fileList.length > MAX_DRAWING_FILES) {
      errors.push(`You can upload up to ${MAX_DRAWING_FILES} files.`);
    }

    const seen = new Set<string>();

    fileList.forEach((file) => {
      const extension = getFileExtension(file.name);

      if (!isSafeFileName(file.name)) {
        errors.push(`File ${file.name} has an invalid file name.`);
      }

      if (file.name.length > 255) {
        errors.push(
          `File ${file.name} has a file name longer than 255 characters.`,
        );
      }

      if (file.size === 0) {
        errors.push(`File ${file.name} is empty.`);
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`File ${file.name} is larger than 20 MB.`);
      }

      if (!DRAWING_FILE_EXTENSIONS.includes(extension)) {
        errors.push(
          `File ${file.name} has an unsupported extension. Accepted types are PDF, PNG, JPG, JPEG, DWG, DXF, STEP, and STP.`,
        );
      }

      const key = `${file.name}|${file.size}|${file.lastModified}`;

      if (seen.has(key)) {
        errors.push(`"${file.name}" appears more than once.`);
      } else {
        seen.add(key);
      }
    });

    return Array.from(new Set(errors));
  };

  /* =====================================================
     DRAWING FORM SUBMISSION
  ===================================================== */

  const handleDrawSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uploading) {
      return;
    }

    const trimmedName = drawData.name.trim();
    const trimmedCompany = drawData.company.trim();
    const trimmedPhone = drawData.phone.trim();
    const trimmedEmail = drawData.email.trim();
    const trimmedNotes = drawData.notes.trim();

    const errors: string[] = [];

    if (!trimmedName || !isValidFullName(trimmedName)) {
      errors.push(
        "Full Name is required and must be 2 to 100 letters, spaces, apostrophes, or hyphens.",
      );
    }

    if (!trimmedCompany) {
      errors.push("Company is required.");
    } else if (trimmedCompany.length > 150) {
      errors.push("Company must be 150 characters or fewer.");
    } else if (!isMeaningfulCompany(trimmedCompany)) {
      errors.push("Company name must contain letters or numbers.");
    }

    if (!trimmedPhone) {
      errors.push("Phone is required.");
    } else if (!isValidPhone(trimmedPhone)) {
      errors.push("Please enter a valid phone number with 7 to 15 digits.");
    }

    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      errors.push("Please enter a valid email address.");
    }

    if (files.length === 0) {
      errors.push("Please upload at least one drawing file.");
    }

    if (files.length > MAX_DRAWING_FILES) {
      errors.push(`You can upload up to ${MAX_DRAWING_FILES} files.`);
    }

    files.forEach((file) => {
      const extension = getFileExtension(file.name);

      if (!isSafeFileName(file.name)) {
        errors.push(`File ${file.name} has an invalid file name.`);
      }

      if (file.size === 0) {
        errors.push(`File ${file.name} is empty.`);
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`File ${file.name} is larger than 20 MB.`);
      }

      if (!DRAWING_FILE_EXTENSIONS.includes(extension)) {
        errors.push(
          `File ${file.name} has an unsupported extension. Accepted types are PDF, PNG, JPG, JPEG, DWG, DXF, STEP, and STP.`,
        );
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      setUploadError("");
      return;
    }

    setValidationErrors([]);
    setUploadError("");
    setUploading(true);

    const form = new FormData();

    form.append("fullName", trimmedName);
    form.append("company", trimmedCompany);
    form.append("email", trimmedEmail);
    form.append("phone", trimmedPhone);
    form.append("notes", trimmedNotes);

    files.forEach((file) => {
      form.append("drawings", file);
    });

    const controller = new AbortController();

    const timeout = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/drawing-requests`,
        {
          method: "POST",
          body: form,
          signal: controller.signal,
        },
      );

      if (response.ok) {
        setDrawSubmitted(true);
        setFiles([]);

        setDrawData({
          name: "",
          company: "",
          email: "",
          phone: "",
          notes: "",
        });
      } else {
        const text = await response.text();

        let message = "Failed to send your drawing request. Please try again.";

        try {
          const json = JSON.parse(text);

          if (json?.message) {
            message = json.message;
          }
        } catch {
          // Ignore parse errors
        }

        switch (response.status) {
          case 400:
            message = "Please check the form and file uploads, then try again.";
            break;

          case 401:
            message = "You are not authorized to send this drawing request.";
            break;

          case 403:
            message =
              "Access denied. Please contact support if this continues.";
            break;

          case 413:
            message =
              "One or more files are too large. Each file must be 20 MB or smaller.";
            break;

          case 415:
            message =
              "One or more files have an unsupported format. Please use PDF, PNG, JPG, JPEG, DWG, DXF, STEP, or STP.";
            break;

          case 500:
            message = "Server error. Please try again later.";
            break;

          default:
            break;
        }

        setUploadError(message);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setUploadError("The upload timed out. Please try again.");
      } else {
        setUploadError(
          "Network error while sending your drawing. Please check your connection and try again.",
        );
      }
    } finally {
      setUploading(false);
      window.clearTimeout(timeout);
    }
  };

  /* =====================================================
     ADD DRAWING FILES
  ===================================================== */

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const currentFiles = [...files];
    const incomingFiles = Array.from(newFiles);

    const nextFiles: File[] = [...currentFiles];

    const availableSlots = MAX_DRAWING_FILES - nextFiles.length;

    if (availableSlots <= 0) {
      setValidationErrors([
        `You can upload up to ${MAX_DRAWING_FILES} files only.`,
      ]);

      return;
    }

    const rejectedErrors: string[] = [];

    incomingFiles.slice(0, availableSlots).forEach((file) => {
      const extension = getFileExtension(file.name);

      if (!isSafeFileName(file.name)) {
        rejectedErrors.push(
          `"${file.name}" has an invalid file name and was not added.`,
        );
        return;
      }

      if (file.size === 0) {
        rejectedErrors.push(`"${file.name}" is empty and was not added.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        rejectedErrors.push(
          `"${file.name}" is larger than 20 MB and was not added.`,
        );
        return;
      }

      if (!DRAWING_FILE_EXTENSIONS.includes(extension)) {
        rejectedErrors.push(
          `"${file.name}" has an unsupported file type and was not added.`,
        );
        return;
      }

      if (isDuplicateFile(file, nextFiles)) {
        rejectedErrors.push(`"${file.name}" is already added.`);
        return;
      }

      nextFiles.push(file);
    });

    if (incomingFiles.length > availableSlots) {
      rejectedErrors.push(`You can upload up to ${MAX_DRAWING_FILES} files.`);
    }

    const finalFiles = nextFiles.slice(0, MAX_DRAWING_FILES);

    setFiles(finalFiles);

    const listErrors = validateFilesList(finalFiles);

    const merged = Array.from(new Set([...rejectedErrors, ...listErrors]));

    setValidationErrors(merged);
  };

  /* =====================================================
     REMOVE FILE
  ===================================================== */

  const removeFile = (i: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, idx) => idx !== i);

      setValidationErrors(validateFilesList(next));

      return next;
    });
  };

  /* =====================================================
     CONTACT INFORMATION
  ===================================================== */

  /* =====================================================
     QUOTE FORM SUBMISSION
  ===================================================== */

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (quoteSubmitting) {
      return;
    }

    setQuoteError("");
    setQuoteSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enquiries`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: formData.name,
            company: formData.company,
            email: formData.email,
            phone: formData.phone,
            product: formData.product,
            requirement: formData.requirement,
          }),
        },
      );

      if (response.ok) {
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          product: "",
          requirement: "",
        });

        setSelectedProducts([]);
        setProductSearch("");
        setShowProductOptions(false);
        setQuoteSubmitted(true);

        return;
      }

      const text = await response.text();

      let message = "Failed to submit enquiry. Please try again.";

      try {
        const json = JSON.parse(text);

        if (json?.message) {
          message = json.message;
        }
      } catch {
        // Ignore parse errors
      }

      switch (response.status) {
        case 400:
          message = "Please check your enquiry details and try again.";
          break;

        case 401:
          message = "You are not authorized to submit an enquiry.";
          break;

        case 403:
          message = "Access denied. Please contact support.";
          break;

        case 500:
          message = "Server error. Please try again later.";
          break;

        default:
          break;
      }

      setQuoteError(message);
    } catch (error) {
      console.error(error);

      setQuoteError(
        "Unable to submit your enquiry. Please check your network connection and try again.",
      );
    } finally {
      setQuoteSubmitting(false);
    }
  };

  /* =====================================================
     BUTTON STYLES
  ===================================================== */

  const tabButtonBase =
    "flex w-full items-center justify-center gap-2.5 " +
    "px-5 py-3.5 sm:px-6 sm:py-3.5 " +
    "text-sm font-semibold border " +
    "transition-all duration-200 " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-primary focus-visible:ring-offset-2";

  const tabButtonActive =
    "bg-primary text-primary-foreground border-primary shadow-sm";

  const tabButtonInactive =
    "bg-white text-charcoal border-border hover:border-primary hover:text-primary";

  /* =====================================================
     RENDER
  ===================================================== */

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

  return (
    <div className="min-h-screen bg-white pt-16" style={pageTexture}>
      <style>{`@keyframes folderReveal { from { opacity: 0; transform: translateY(12px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      {/* =================================================
          CONTACT PAGE HERO BANNER
      ================================================= */}

      <PageHeroBanner
        eyebrow="Get in Touch"
        title="Contact"
        highlight="Us"
        image={ContactUsImage}
        imageAlt="Contact Us"
        imagePosition="center center"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      {/* =================================================
          CONTACT INTRO + ACTION BUTTONS
      ================================================= */}

      <section className="border-b border-divider">
        <div className="container max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">
            {/* LEFT: INTRODUCTION */}

            <div className="max-w-2xl">
              <p className="section-label mb-3">LET'S CONNECT</p>

              <h2 className="font-heading text-2xl sm:text-3xl text-charcoal mb-3">
                How can we help you?
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Request a quote for standard products or send us your
                engineering drawing for custom-machined components. Our team is
                ready to assist you.
              </p>
            </div>

            {/* RIGHT: ACTION BUTTONS */}

            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 w-full lg:w-auto lg:min-w-[440px]">
  {/* REQUEST A QUOTE */}
  <button
    type="button"
    onClick={() => handleTabChange("quote")}
    aria-pressed={activeTab === "quote"}
    className={`rounded-xl border border-primary w-full min-w-0 ${
      tabButtonBase
    } ${
      activeTab === "quote" ? tabButtonActive : tabButtonInactive
    }`}
  >
    <PenLine className="w-4 h-4 shrink-0" />

    <span className="min-w-0 whitespace-nowrap text-center">
      Request a Quote
    </span>

    <ArrowRight
      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
        activeTab === "quote" ? "translate-x-0.5" : ""
      }`}
    />
  </button>

  {/* SEND YOUR DRAWING */}
  <button
    type="button"
    onClick={() => handleTabChange("drawing")}
    aria-pressed={activeTab === "drawing"}
    className={`rounded-xl w-full min-w-0 ${
      tabButtonBase
    } ${
      activeTab === "drawing" ? tabButtonActive : tabButtonInactive
    }`}
  >
    <Upload className="w-4 h-4 shrink-0" />

    <span className="min-w-0 whitespace-nowrap text-center">
      Send Your Drawing
    </span>

    <ArrowRight
      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
        activeTab === "drawing" ? "translate-x-0.5" : ""
      }`}
    />
  </button>
</div>
          </div>
        </div>
      </section>

      {/* =================================================
          CONTACT INFORMATION + FORMS
      ================================================= */}

      <div className="contact-page-background container max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
        {/* =================================================
    CONTACT FOLDER INTERACTION
================================================= */}

<section
  className="contact-folder-section mb-10 sm:mb-14"
  aria-label="Contact information folders"
>
  <div className="mb-4">
    <p className="section-label">Contact Information</p>
  </div>

  {(() => {
    const folders = [
      {
        id: "corporate",
        title: "Corporate Office",
        subtitle: "Kanpur · Corporate Office",
        eyebrow: "Head Office",
        tone: "corporate",
      },
      {
        id: "works",
        title: "Works",
        subtitle: "Unnao · Manufacturing",
        eyebrow: "Manufacturing",
        tone: "works",
      },
      {
        id: "associate",
        title: "Associate Concerns",
        subtitle: "KBK Plascon",
        eyebrow: "Associate Concern",
        tone: "associate",
      },
      {
        id: "distributor",
        title: "Distributors",
        subtitle: "Regional contacts",
        eyebrow: "Regional Network",
        tone: "distributor",
      },
    ];

    const activeFolder = folders.find(
      (folder) => folder.id === activeContactFolder
    );

    const contactPanel = activeFolder ? (
      <div className="contact-folder-panel-wrapper contact-folder-panel-wrapper--open">
            <div
              key={activeFolder.id}
              id={`contact-folder-content-${activeFolder.id}`}
              className={`contact-folder-panel contact-folder-panel--${activeFolder.tone}`}
              role="region"
              aria-label={`${activeFolder.title} contact details`}
            >
              {/* PANEL HEADER */}
              <div className="contact-folder-panel-header">
                <div className="contact-folder-panel-heading">
                  <div className="contact-folder-panel-icon">
                    <FolderOpen />
                  </div>

                  <div className="min-w-0">
                    

                    <h3 className="contact-folder-panel-title">
                      {activeFolder.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveContactFolder(null)}
                  className="contact-folder-close"
                  aria-label="Close selected contact folder"
                >
                  <Minus />
                  <span>Close</span>
                </button>
              </div>

              {/* CORPORATE OFFICE */}
              {activeContactFolder === "corporate" && (
                <div className="contact-folder-content">
                  <div className="contact-details-list">
                    <div className="contact-detail-row">
                      <MapPin className="contact-detail-icon" />

                      <p>
                        24/186, Birhana Road,
                        <br />
                        Kanpur – 208001, Uttar Pradesh
                      </p>
                    </div>

                    <a
                      href="tel:05124056299"
                      className="contact-detail-link"
                    >
                      <Phone className="contact-detail-icon" />
                      <span>0512-4056299</span>
                    </a>
                  </div>
                </div>
              )}

              {/* WORKS */}
              {activeContactFolder === "works" && (
                <div className="contact-folder-content">
                  <div className="contact-details-list">
                    <div className="contact-detail-row">
                      <MapPin className="contact-detail-icon" />

                      <p>
                        191, Akrampur Industrial Estate,
                        <br />
                        Unnao – 209862, Uttar Pradesh, India
                      </p>
                    </div>

                    <div className="contact-phone-group">
                      {[
                        "0515-3505329",
                        "9936794816",
                        "9936794805",
                        "9936794868",
                      ].map((number) => (
                        <a
                          key={number}
                          href={`tel:${number.replace(/[^0-9+]/g, "")}`}
                          className="contact-detail-link"
                        >
                          <Phone className="contact-detail-icon" />
                          <span>{number}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ASSOCIATE CONCERN */}
              {activeContactFolder === "associate" && (
                <div className="contact-folder-content">
                  <div className="contact-details-list">
                    <div className="contact-detail-row">
                      <MapPin className="contact-detail-icon" />

                      <p>
                        53, Akrampur Industrial Estate,
                        <br />
                        Unnao – 209862, Uttar Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* DISTRIBUTOR NETWORK */}
              {activeContactFolder === "distributor" && (
                <div className="contact-folder-content contact-folder-content--distributors">

                  {/* DELHI */}
                  <article className="distributor-region">
                    <div className="distributor-region-heading">
                      <span className="distributor-region-marker">
                        <MapPin />
                      </span>

                      <h4>Delhi – Okhla</h4>
                    </div>

                    <p className="distributor-company">
                      KBK Polymers Pvt. Ltd.
                    </p>

                    <p className="distributor-address">
                      A-107, DDA Complex, Okhla Industrial Area Phase 2
                    </p>

                    <div className="distributor-links">
                      <a
                        href="tel:+911126384242"
                        className="contact-detail-link"
                      >
                        <Phone className="contact-detail-icon" />
                        <span>+91 11 26384242 / 4343</span>
                      </a>

                      <a
                        href="tel:+919871199895"
                        className="contact-detail-link"
                      >
                        <Phone className="contact-detail-icon" />
                        <span>+91 9871199895</span>
                      </a>

                      <a
                        href="mailto:polyrib@rediffmail.com"
                        className="contact-detail-link"
                      >
                        <Mail className="contact-detail-icon" />
                        <span>polyrib@rediffmail.com</span>
                      </a>
                    </div>
                  </article>

                  {/* MAHARASHTRA */}
                  <article className="distributor-region">
                    <div className="distributor-region-heading">
                      <span className="distributor-region-marker">
                        <MapPin />
                      </span>

                      <h4>Maharashtra – Bhiwandi</h4>
                    </div>

                    <p className="distributor-company">
                      KBK Polymers Pvt. Ltd.
                    </p>

                    <p className="distributor-address">
                      B-37, 38 Paresh Complex, Village Kalher,
                      <br />
                      Bhiwandi – 421302, Maharashtra
                    </p>

                    <div className="distributor-links">
                      <a
                        href="tel:02522276225"
                        className="contact-detail-link"
                      >
                        <Phone className="contact-detail-icon" />
                        <span>02522-276225</span>
                      </a>

                      <a
                        href="tel:+917738066056"
                        className="contact-detail-link"
                      >
                        <Phone className="contact-detail-icon" />
                        <span>+91 7738060656</span>
                      </a>

                      <a
                        href="mailto:kbk_sachin@polyrib.com"
                        className="contact-detail-link"
                      >
                        <Mail className="contact-detail-icon" />
                        <span>kbk_sachin@polyrib.com</span>
                      </a>
                    </div>
                  </article>

                  {/* GUJARAT */}
                  <article className="distributor-region">
                    <div className="distributor-region-heading">
                      <span className="distributor-region-marker">
                        <MapPin />
                      </span>

                      <h4>Gujarat – Ahmedabad</h4>
                    </div>

                    <p className="distributor-company">
                      KBK Polymers Pvt. Ltd.
                    </p>

                    <p className="distributor-address">
                      National Bobin Compound, 239 Pushkar Industrial Estate,
                      <br />
                      Opp. Macons Factory, PH1 DIDC Vatwa,
                      <br />
                      Ahmedabad – 382445, Gujarat, India
                    </p>

                    <div className="distributor-links">
                      {["9936794816", "9651999807"].map((number) => (
                        <a
                          key={number}
                          href={`tel:${number}`}
                          className="contact-detail-link"
                        >
                          <Phone className="contact-detail-icon" />
                          <span>{number}</span>
                        </a>
                      ))}

                      <a
                        href="mailto:kbk_pk@polyrib.com"
                        className="contact-detail-link"
                      >
                        <Mail className="contact-detail-icon" />
                        <span>kbk_pk@polyrib.com</span>
                      </a>
                    </div>
                  </article>

                  {/* CENTRAL CONTACT */}
                  <article className="distributor-region distributor-region--central">
                    <div className="distributor-region-heading">
                      <span className="distributor-region-marker">
                        <Mail />
                      </span>

                      <h4>Central Contact</h4>
                    </div>

                    <div className="distributor-links">
                      <a
                        href="mailto:info@polyrib.com"
                        className="contact-detail-link"
                      >
                        <Mail className="contact-detail-icon" />
                        <span>info@polyrib.com</span>
                      </a>

                      <a
                        href="https://www.polyrib.com"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-detail-link"
                      >
                        <ArrowRight className="contact-detail-icon" />
                        <span>www.polyrib.com</span>
                      </a>
                    </div>
                  </article>
                </div>
              )}

              
            </div>
      </div>
    ) : null;

    return (
      <>
        {/* FOLDER CARDS + RESPONSIVE CONTACT PANEL */}
<div className="contact-folder-grid">
  {folders.map((folder, index) => {
    const isActive = activeContactFolder === folder.id;

    return (
      <React.Fragment key={folder.id}>
        <button
          type="button"
          onClick={() =>
            setActiveContactFolder((current) =>
              current === folder.id ? null : folder.id
            )
          }
          aria-expanded={isActive}
          aria-controls={`contact-folder-content-${folder.id}`}
          aria-label={`${isActive ? "Close" : "Open"} ${
            folder.title
          } contact folder`}
          className={`contact-folder-card contact-folder-card--${folder.tone} ${
            isActive ? "contact-folder-card--active" : ""
          }`}
        >
          <svg
  className="contact-folder-shape"
  viewBox="0 0 400 260"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <defs>
    {/* Folder surface: slightly darker Polyrib blue on the left, fading to white on the right */}
    <linearGradient
      id={`folder-background-gradient-${folder.id}`}
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >
      <stop offset="0%" stopColor="#C5E3F0" />
      <stop offset="20%" stopColor="#D3EAF4" />
      <stop offset="45%" stopColor="#E6F2F8" />
      <stop offset="75%" stopColor="#F5FAFC" />
      <stop offset="100%" stopColor="#FFFFFF" />
    </linearGradient>

    {/* Restrained industrial drafting pattern: fine traces and precision nodes */}
    <pattern
      id={`folder-technical-pattern-${folder.id}`}
      width="72"
      height="72"
      patternUnits="userSpaceOnUse"
    >
      <g
        fill="none"
        stroke="#279ECE"
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.13"
      >
        <path d="M8 18 H27 L35 10 H58" />
        <path d="M20 54 H39 L47 46 H68" />
        <path d="M8 18 V34 H18" />
        <path d="M58 10 V26 H68" />
      </g>

      <g fill="#279ECE" opacity="0.17">
        <circle cx="8" cy="18" r="1.5" />
        <circle cx="35" cy="10" r="1.5" />
        <circle cx="58" cy="10" r="1.5" />
        <circle cx="20" cy="54" r="1.5" />
        <circle cx="47" cy="46" r="1.5" />
        <circle cx="68" cy="46" r="1.5" />
      </g>
    </pattern>

    {/* Fade the detail toward the text so the folder label stays clear */}
    <linearGradient
      id={`folder-pattern-fade-${folder.id}`}
      x1="0"
      y1="0"
      x2="0"
      y2="1"
    >
      <stop offset="0%" stopColor="white" stopOpacity="0.9" />
      <stop offset="42%" stopColor="white" stopOpacity="0.55" />
      <stop offset="72%" stopColor="white" stopOpacity="0.12" />
      <stop offset="100%" stopColor="white" stopOpacity="0" />
    </linearGradient>

    <mask
      id={`folder-pattern-mask-${folder.id}`}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="400"
      height="260"
    >
      <rect
        width="400"
        height="260"
        fill={`url(#folder-pattern-fade-${folder.id})`}
      />
    </mask>
  </defs>

  {/* Main folder */}
  <path
    className="contact-folder-shape-fill"
    style={{ fill: `url(#folder-background-gradient-${folder.id})` }}
    d="
      M 16 20
      Q 16 8 28 8
      L 132 8
      Q 142 8 148 16
      L 164 36
      Q 170 42 178 42
      L 372 42
      Q 384 42 384 54
      L 384 236
      Q 384 248 372 248
      L 28 248
      Q 16 248 16 236
      Z
    "
  />

  {/* Subtle technical pattern, clipped to the folder silhouette */}
  <path
    d="
      M 16 20
      Q 16 8 28 8
      L 132 8
      Q 142 8 148 16
      L 164 36
      Q 170 42 178 42
      L 372 42
      Q 384 42 384 54
      L 384 236
      Q 384 248 372 248
      L 28 248
      Q 16 248 16 236
      Z
    "
    fill={`url(#folder-technical-pattern-${folder.id})`}
    mask={`url(#folder-pattern-mask-${folder.id})`}
    pointerEvents="none"
  />

  {/* Folder outline */}
  <path
    className="contact-folder-shape-stroke"
    d="
      M 16 20
      Q 16 8 28 8
      L 132 8
      Q 142 8 148 16
      L 164 36
      Q 170 42 178 42
      L 372 42
      Q 384 42 384 54
      L 384 236
      Q 384 248 372 248
      L 28 248
      Q 16 248 16 236
      Z
    "
  />
</svg>

          {/* FOLDER CONTENT */}
          <span className="contact-folder-inner">
            <span className="contact-folder-info">
              <span className="contact-folder-title">
                {folder.title}
              </span>

              <span className="contact-folder-subtitle">
                {folder.subtitle}
              </span>
            </span>

            <span className="contact-folder-action">
              {isActive ? <Minus /> : <Plus />}
            </span>
          </span>
        </button>

        {/* Reserve the second column when the active card is in column one.
            This makes the panel start on the very next row instead of allowing
            the next folder to sit beside the selected folder. */}
        {isActive && index % 2 === 0 && (
          <span
            className="contact-folder-grid-spacer"
            aria-hidden="true"
          />
        )}

        {/* Insert the one active panel directly after its selected folder */}
        {isActive && contactPanel}
      </React.Fragment>
    );
  })}
</div>

      </>
    );
  })()}
</section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {/* =============================================
    LEFT SIDEBAR — CONTACT & VALUE CARDS
============================================= */}

<aside className="quote-sidebar">

  {/* TECHNICAL TEAM */}
  <div className="quote-sidebar-card quote-technical-card">

    <div className="quote-card-topline">
      <span className="quote-card-icon">
        <Mail className="w-5 h-5" />
      </span>

      <span className="section-label">Technical Team</span>
    </div>

    <h3 className="quote-card-title">
      Need technical assistance?
    </h3>

    <p className="quote-card-description">
      Get expert guidance on material selection, machining
      specifications, or application requirements from our
      technical team.
    </p>

    <a
      href="mailto:info@polyrib.com"
      className="quote-email-link"
    >
      <span>info@polyrib.com</span>
      <ArrowRight className="w-4 h-4" />
    </a>

    <span className="quote-card-watermark" aria-hidden="true">
      <Mail />
    </span>
  </div>

  {/* WHY POLYRIB */}
  <div className="quote-sidebar-card quote-why-card">

    <div className="quote-why-heading">
      <span className="quote-why-icon">
        <CheckCircle2 className="w-5 h-5" />
      </span>

      <div>
        <span className="quote-why-eyebrow">
          The Polyrib Advantage
        </span>

        <h3 className="quote-why-title">
          Why engineers choose Polyrib
        </h3>
      </div>
    </div>

    <ul className="quote-benefit-list">
      {[
        "Application-driven material selection",
        "Precision machining to your drawings",
        "Custom & batch manufacturing",
        "ISO 9001 certified quality assurance",
        "Technical datasheets for all materials",
      ].map((item) => (
        <li key={item}>
          <span className="quote-benefit-check">
            <CheckCircle2 />
          </span>

          <span>{item}</span>
        </li>
      ))}
    </ul>

    <span className="quote-why-decoration" aria-hidden="true" />
  </div>

</aside>

          {/* =============================================
              RIGHT: FORMS
          ============================================= */}

          <div className="lg:col-span-2 min-w-0">
            {/* =========================================
                QUOTE FORM
            ========================================= */}

            {activeTab === "quote" &&
              (quoteSubmitted ? (
                <div className="text-center py-20 border border-border px-5">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-5" />

                  <h3 className="font-heading text-2xl text-charcoal mb-2">
                    Enquiry Received
                  </h3>

                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Thank you. Our team will review your requirements and
                    respond within 24 business hours.
                  </p>

                  <button
                    onClick={() => setQuoteSubmitted(false)}
                    className="cta-link inline-flex"
                  >
                    Submit another enquiry
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleQuoteSubmit}
                  className="border border-border p-5 sm:p-8 space-y-6 rounded-xl bg-white"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 rounded-full">
                      <MessageCircleQuestion className="w-5 h-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-heading text-xl text-charcoal">
                        Enquiry Details
                      </h2>

                      <p className="text-xs text-muted-foreground mt-0.5">
                        Share your contact information, select the product or
                        material you're interested in, and describe your
                        requirements. Our team will review your enquiry and get
                        back to you with the right solution.
                      </p>
                    </div>
                  </div>

                  {quoteError && (
                    <div className="rounded-sm border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {quoteError}
                    </div>
                  )}

                  {/* PERSONAL DETAILS */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors rounded-xl"
                        placeholder="Full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Company *
                      </label>

                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: e.target.value,
                          })
                        }
                        className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors rounded-xl"
                        placeholder="Company name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Email *
                      </label>

                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors rounded-xl"
                        placeholder="Email address"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Phone *
                      </label>

                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors rounded-xl"
                        placeholder="Mobile / Landline"
                      />
                    </div>
                  </div>

                  {/* PRODUCT */}

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      Product / Material of Interest
                    </label>

                    <div className="relative">
                      {/* SEARCH INPUT */}

                      <div className="relative flex items-center">
                        <Search className="absolute left-3 w-4 h-4 text-primary pointer-events-none" />

                        <input
                          type="text"
                          value={
                            showProductOptions
                              ? productSearch
                              : selectedProducts
                                  .map(
                                    (path) =>
                                      ALL_PRODUCT_OPTIONS.find(
                                        (product) => product.path === path,
                                      )?.name ?? path,
                                  )
                                  .join(", ")
                          }
                          onFocus={() => {
                            setProductSearch("");
                            setShowProductOptions(true);
                          }}
                          onChange={(e) => {
                            setProductSearch(e.target.value);
                            setShowProductOptions(true);
                          }}
                          onBlur={() => {
                            setTimeout(() => setShowProductOptions(false), 150);
                          }}
                          placeholder="Search products, brands or categories..."
                          className="w-full min-w-0 border border-border bg-background pl-10 pr-11 py-2.5 text-sm text-primary-light outline-none focus:border-primary transition-colors rounded-xl"
                        />

                        {/* DROPDOWN ARROW */}

                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            if (!showProductOptions) {
                              setProductSearch("");
                            }

                            setShowProductOptions(!showProductOptions);
                          }}
                          className="absolute right-3 flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                          aria-label="Toggle product options"
                          aria-expanded={showProductOptions}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              showProductOptions ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* HIERARCHICAL PRODUCT OPTIONS */}

                      {showProductOptions && (
                        <div className="absolute z-30 mt-1 w-full max-h-80 overflow-y-auto border border-border bg-background rounded-xl shadow-lg">
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => {
                              const descendantPaths = getDescendantPaths(
                                product.path,
                              );

                              const isSelected =
                                selectedProducts.includes(product.path) ||
                                (descendantPaths.length > 0 &&
                                  descendantPaths.every((path) =>
                                    selectedProducts.includes(path),
                                  ));

                              const isPartiallySelected =
                                !isSelected &&
                                descendantPaths.some((path) =>
                                  selectedProducts.includes(path),
                                );

                              return (
                                <button
                                  key={product.path}
                                  type="button"
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={() => handleProductToggle(product)}

                                  className={`w-full flex items-start gap-3 text-left pr-3 py-2.5 text-sm transition-colors border-b border-border last:border-b-0 ${
                                    isSelected
                                      ? "bg-primary/10 text-primary"
                                      : "text-primary-light hover:bg-primary/5 hover:text-primary"
                                  }`}

                                  style={{
                                    paddingLeft: `${12 + product.depth * 17}px`,
                                  }}
                                >
                                  {/* CHECKBOX */}
                                  <span
                                    className={`w-4 h-4 shrink-0 mt-0.5 border rounded flex items-center justify-center transition-colors rounded-xl ${
                                      isSelected
                                        ? "bg-primary border-primary"
                                        : isPartiallySelected
                                          ? "bg-primary/20 border-primary"
                                          : "border-border"
                                    }`}
                                  >
                                    {isSelected && (
                                      <Check className="w-3 h-3 text-white" />
                                    )}

                                    {isPartiallySelected && (
                                      <span className="text-primary text-xs font-bold leading-none">
                                        −
                                      </span>
                                    )}
                                  </span>

                                  {/* NAME AND HIERARCHY */}
                                  <span className="flex-1 min-w-0">
                                    {/* Product / Category Name */}
                                    <span className="block font-medium whitespace-normal break-words">
                                      {product.name}
                                    </span>

                                    {/* Hierarchy Path - Full Content Visible */}
                                    {product.depth > 0 && (
                                      <span className="block text-[10px] text-charcoal mt-0.5 whitespace-normal break-words">
                                        {product.path
                                          .split(" › ")
                                          .slice(0, -1)
                                          .join(" › ")}
                                      </span>
                                    )}
                                  </span>

                                  {/* TYPE BADGE */}
                                  <span className="shrink-0 text-[9px] tracking-wider text-muted-foreground border border-border rounded-xl px-1.5 py-0.5">
                                    {product.type}
                                  </span>
                                </button>
                              );
                            })
                          ) : (
                            <div className="px-3 py-4 text-center">
                              <Search className="w-5 h-5 text-muted-foreground mx-auto mb-2" />

                              <p className="text-sm text-muted-foreground mb-2">
                                No products found matching "{productSearch}".
                              </p>

                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setProductSearch("")}
                                className="text-xs font-semibold text-primary hover:text-primary-dark hover:underline transition-colors"
                              >
                                Clear search and view all products
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* SELECTED PRODUCTS COUNT */}

                    {selectedProducts.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {selectedProducts.length} item
                          {selectedProducts.length > 1 ? "s" : ""} selected
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProducts([]);
                            setFormData({
                              ...formData,
                              product: "",
                            });
                          }}
                          className="text-xs text-primary hover:underline font-medium"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>

                  {/* REQUIREMENT */}

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      Your Requirement *
                    </label>

                    <textarea
                      required
                      rows={5}
                      value={formData.requirement}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirement: e.target.value,
                        })
                      }
                      className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-primary outline-none focus:border-primary transition-colors resize-none rounded-xl"
                      placeholder="Please describe your requirement: material grade, dimensions (diameter, length, thickness), quantity, delivery location, and any specific standards or certifications required..."
                    />
                  </div>

                  {/* SUBMIT */}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={quoteSubmitting}
                      className="w-full sm:w-auto shrink-0 whitespace-nowrap justify-center px-7 py-3 bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center gap-2 rounded-xl"
                    >
                      {quoteSubmitting ? "Submitting..." : "Submit Enquiry"}

                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>

                    <p className="flex-1 min-w-0 text-sm text-muted-foreground leading-relaxed sm:mt-0.5">
                      By submitting this form you agree to our Privacy Policy.
                      Your details will only be used to respond to your enquiry.
                    </p>
                  </div>
                </form>
              ))}

            {/* =========================================
                DRAWING FORM
            ========================================= */}

            {activeTab === "drawing" &&
              (drawSubmitted ? (
                <div className="text-center py-20 border border-border px-5 ">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-5" />

                  <h3 className="font-heading text-2xl text-charcoal mb-2">
                    Drawing Received
                  </h3>

                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Thank you. Our engineering team will review your drawing and
                    respond with a quotation within 48 business hours.
                  </p>

                  <button
                    onClick={() => {
                      setDrawSubmitted(false);
                      setFiles([]);

                      setDrawData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        notes: "",
                      });

                      setUploadError("");
                      setValidationErrors([]);
                    }}
                    className="cta-link inline-flex"
                  >
                    Submit another drawing
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleDrawSubmit}
                  className="border border-border p-5 sm:p-8 space-y-6 rounded-xl bg-white"
                >
                  {/* FORM HEADING */}

                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 rounded-full">
                      <Send className="w-5 h-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-heading text-xl text-charcoal">
                        Send Your Engineering Drawing
                      </h2>

                      <p className="text-xs text-muted-foreground mt-0.5">
                        Upload your CAD drawing, sample sketch, or technical
                        specification for a custom-machined component quote.
                      </p>
                    </div>
                  </div>

                  {/* PERSONAL DETAILS */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        required
                        value={drawData.name}
                        onChange={(e) =>
                          setDrawData({
                            ...drawData,
                            name: e.target.value,
                          })
                        }
                        className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors rounded-xl"
                        placeholder="Full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Company *
                      </label>

                      <input
                        type="text"
                        required
                        value={drawData.company}
                        onChange={(e) =>
                          setDrawData({
                            ...drawData,
                            company: e.target.value,
                          })
                        }
                        className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors rounded-xl"
                        placeholder="Company name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Email *
                      </label>

                      <input
                        type="email"
                        required
                        value={drawData.email}
                        onChange={(e) =>
                          setDrawData({
                            ...drawData,
                            email: e.target.value,
                          })
                        }
                        className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors rounded-xl"
                        placeholder="Email address"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                        Phone *
                      </label>

                      <input
                        type="tel"
                        required
                        value={drawData.phone}
                        onChange={(e) =>
                          setDrawData({
                            ...drawData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors rounded-xl"
                        placeholder="Mobile / Landline"
                      />
                    </div>
                  </div>

                  {/* FILE UPLOAD */}

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      Upload Drawing / File *
                      <span className="font-normal normal-case text-muted-foreground">
                        {" "}
                        (PDF, DXF, DWG, STEP, PNG, JPG — max 20 MB each, up to 5
                        files)
                      </span>
                    </label>

                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        addFiles(e.dataTransfer.files);
                      }}
                      className="border-2 border-dashed border-border hover:border-primary transition-colors duration-200 rounded-none cursor-pointer p-6 sm:p-8 text-center group rounded-xl"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-3" />

                      <p className="text-sm font-medium text-charcoal group-hover:text-primary transition-colors">
                        Drop files here or click to browse
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DXF, DWG, STEP, PNG, JPG accepted
                      </p>

                      <input
                        ref={fileRef}
                        type="file"
                        multiple
                        accept=".pdf,.dxf,.dwg,.step,.stp,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => {
                          addFiles(e.target.files);
                          e.currentTarget.value = "";
                        }}
                      />
                    </div>

                    {/* SELECTED FILES */}

                    {files.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {files.map((f, i) => (
                          <li
                            key={`${f.name}-${f.lastModified}-${i}`}
                            className="flex items-center gap-3 p-3 bg-surface-subtle border border-divider min-w-0"
                          >
                            <FileText className="w-4 h-4 text-primary shrink-0" />

                            <span className="text-sm text-charcoal flex-1 min-w-0 truncate">
                              {f.name}
                            </span>

                            <span className="text-xs text-muted-foreground shrink-0">
                              {(f.size / 1024 / 1024).toFixed(1)} MB
                            </span>

                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              aria-label={`Remove ${f.name}`}
                              className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* VALIDATION ERRORS */}

                  {validationErrors.length > 0 && (
                    <div className="rounded-sm border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive space-y-1">
                      {validationErrors.map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </div>
                  )}

                  {/* UPLOAD ERROR */}

                  {uploadError && (
                    <div className="rounded-sm border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {uploadError}
                    </div>
                  )}

                  {/* UPLOADING STATUS */}

                  {uploading && (
                    <div className="rounded-sm border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
                      Uploading your drawing...
                    </div>
                  )}

                  {/* ADDITIONAL NOTES */}

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                      Additional Notes
                    </label>

                    <textarea
                      rows={4}
                      value={drawData.notes}
                      onChange={(e) =>
                        setDrawData({
                          ...drawData,
                          notes: e.target.value,
                        })
                      }
                      className="w-full min-w-0 border border-border bg-background px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary transition-colors resize-none rounded-xl"
                      placeholder="Describe the material, quantity, tolerance requirements, surface finish, or any other details that would help us quote accurately..."
                    />
                  </div>

                  {/* SUBMIT DRAWING */}

                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={uploading || files.length === 0}
                      className="w-full sm:w-auto justify-center px-7 py-3 bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center gap-2 rounded-xl"
                    >
                      {uploading ? "Uploading..." : "Send Drawing"}

                      <Send className="w-4 h-4" />
                    </button>

                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Please attach at least one file. Our team will respond
                      with a detailed quote within 48 hours.
                    </p>
                  </div>
                </form>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
