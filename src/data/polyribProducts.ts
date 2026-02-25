// ─── Central Polyrib Product Data ──────────────────────────────────────────────
// Structure: Category > Subcategory > Brand > Products
// Follows the POLYRIB_WEBSITE_COMPLETE_STRUCTURE.xlsx exactly

export interface Product {
  id: string;
  name: string;
  brand: string;
  brandSlug: string;
  subcategorySlug: string;
  categorySlug: string;
  description: string;
  keyProperties: string[];
  applications: string[];
  tempRange?: string;
  forms?: string;
  colour?: string;
  grade?: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  subcategorySlug: string;
  categorySlug: string;
  basePolymer: string;
  tempRange: string;
  colour: string;
  keyProperties: string[];
  products: Product[];
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  description: string;
  brands: Brand[];
}

// ─── SEMI-FINISHED SHEETS & BLOCKS ────────────────────────────────────────────

const POLYRIB_V_PRODUCTS: Product[] = [
  { id: "polyrib-v005", name: "POLYRIB-V005", brand: "POLYRIB V", brandSlug: "polyrib-v", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Standard UHMW PE sheet grade. Exceptional abrasion resistance for wear liners, conveyor beds and chute linings.", keyProperties: ["Highest abrasion resistance", "Self-lubricating", "Food grade available"], applications: ["Wear liners", "Conveyor beds", "Chute linings"], tempRange: "−200°C to +80°C", forms: "Sheets, Blocks", colour: "Natural / Black / Blue" },
  { id: "polyrib-l-v", name: "POLYRIB-L-V", brand: "POLYRIB V", brandSlug: "polyrib-v", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Low-density UHMW PE variant. Ideal for applications requiring weight savings while retaining excellent impact and abrasion properties.", keyProperties: ["Reduced density", "Good abrasion resistance", "Impact resistant"], applications: ["Marine floats", "Light-duty liners", "Orthopaedic applications"], tempRange: "−200°C to +80°C", forms: "Sheets", colour: "Natural / White" },
  { id: "polyrib-v030", name: "POLYRIB-V030", brand: "POLYRIB V", brandSlug: "polyrib-v", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "30% glass-filled UHMW PE for enhanced stiffness and creep resistance in demanding structural applications.", keyProperties: ["Glass reinforced", "Higher stiffness", "Dimensional stability"], applications: ["Structural components", "Precision liners", "Machine parts"], tempRange: "−200°C to +80°C", forms: "Sheets, Blocks", colour: "Natural" },
  { id: "polyrib-v-superslide", name: "POLYRIB-V SUPERSLIDE", brand: "POLYRIB V", brandSlug: "polyrib-v", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Ultra-low friction UHMW PE grade incorporating solid lubricant additives. Minimises power consumption in sliding contact applications.", keyProperties: ["Ultra-low friction", "Self-lubricating", "Zero external lubrication required"], applications: ["Slide gates", "Wear strips", "Low-friction guides"], tempRange: "−200°C to +80°C", forms: "Sheets, Strips", colour: "Natural / Black" },
  { id: "polyrib-v-as", name: "POLYRIB-V-AS", brand: "POLYRIB V", brandSlug: "polyrib-v", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Antistatic UHMW PE grade for ESD-sensitive environments including electronics, explosives and pharmaceutical manufacturing.", keyProperties: ["Antistatic (ESD)", "Surface resistivity <10⁹ Ω", "No carbon black migration"], applications: ["Electronics manufacturing", "Explosives handling", "ESD-safe conveyors"], tempRange: "−200°C to +80°C", forms: "Sheets", colour: "Black" },
  { id: "polyrib-v-fr", name: "POLYRIB-V-FR", brand: "POLYRIB V", brandSlug: "polyrib-v", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Flame-retardant UHMW PE grade meeting UL94 V-0 requirements. Suitable for applications where fire safety regulations apply.", keyProperties: ["UL94 V-0 rated", "Flame retardant", "Low smoke emission"], applications: ["Mining conveyor liners", "Fire-regulated environments", "Underground applications"], tempRange: "−200°C to +80°C", forms: "Sheets", colour: "Natural" },
  { id: "polyrib-v-fg", name: "POLYRIB-V FG", brand: "POLYRIB V", brandSlug: "polyrib-v", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "FDA and EU food-contact compliant UHMW PE for food processing, packaging and pharmaceutical conveyor applications.", keyProperties: ["FDA 21 CFR 177", "EU 10/2011 compliant", "Blue detectable grade available"], applications: ["Food conveyor liners", "Cutting boards", "Pharmaceutical contact surfaces"], tempRange: "−200°C to +80°C", forms: "Sheets, Blocks, Strips", colour: "Natural / Blue" },
  { id: "polyrib-c", name: "POLYRIB-C", brand: "POLYRIB V", brandSlug: "polyrib-v", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Conductive UHMW PE grade for applications requiring static dissipation, such as coal mining and bulk powder handling.", keyProperties: ["Electrically conductive", "Surface resistivity <10⁴ Ω", "Bulk material handling rated"], applications: ["Coal mine liners", "Powder handling", "Explosion-risk environments"], tempRange: "−200°C to +80°C", forms: "Sheets", colour: "Black" },
];

const POLYRIB_H_PRODUCTS: Product[] = [
  { id: "polyrib-h-ced", name: "POLYRIB-H CED", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Glass-lined HDPE sheet chemically etched for superior paint adhesion in FRP/GRP sandwich constructions.", keyProperties: ["Glass-lined surface", "Chemical etching", "Superior bond to resins"], applications: ["FRP construction", "Chemical tank liners", "Marine panels"], tempRange: "−50°C to +80°C", forms: "Sheets", colour: "Natural / White" },
  { id: "polyrib-h-ext", name: "POLYRIB-H EXT", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "UV-stabilised extruded HDPE sheet for outdoor and marine applications. Excellent weathering and corrosion resistance.", keyProperties: ["UV stabilised", "Weather resistant", "Marine grade"], applications: ["Marine boards", "Outdoor signage", "Agricultural equipment"], tempRange: "−50°C to +80°C", forms: "Sheets", colour: "Natural / Black / Multiple colours" },
  { id: "polyrib-h-452", name: "POLYRIB-H 452", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "High-density HDPE 452 grade offering superior stiffness and impact resistance for heavy-duty structural applications.", keyProperties: ["High density grade", "Superior stiffness", "Impact resistant"], applications: ["Structural panels", "Heavy equipment liners", "Containment boards"], tempRange: "−50°C to +80°C", forms: "Sheets, Blocks", colour: "Natural / Black" },
  { id: "polyrib-h-92", name: "POLYRIB-H 92", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "High-quality HDPE 92 grade sheet for general industrial and food-contact applications requiring good chemical resistance.", keyProperties: ["HDPE 92 grade", "Food contact rated", "Chemical resistant"], applications: ["Food processing", "Chemical handling", "Water treatment"], tempRange: "−50°C to +80°C", forms: "Sheets", colour: "Natural" },
  { id: "polyrib-arete-l-h", name: "POLYRIB-ARETE L-H", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "ARETE glass-lined HDPE composite sheet for advanced FRP construction. Superior interlaminar shear strength.", keyProperties: ["ARETE composite", "Glass-lined", "FRP construction"], applications: ["FRP manufacture", "Chemical vessels", "Structural composites"], tempRange: "−50°C to +80°C", forms: "Sheets", colour: "Natural" },
  { id: "polyrib-arete-l-v001", name: "POLYRIB-ARETE L-V001", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "ARETE glass-lined UHMW PE composite for advanced wear-resistant FRP constructions.", keyProperties: ["UHMW PE composite", "ARETE construction", "Wear resistant"], applications: ["Wear-resistant composites", "FRP liners", "Mining equipment"], tempRange: "−50°C to +80°C", forms: "Sheets", colour: "Natural" },
  { id: "polyrib-hxm-001-ext", name: "POLYRIB-HXM-001 EXT", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Extruded HDPE with mineral reinforcement for improved stiffness and dimensional stability in precision applications.", keyProperties: ["Mineral reinforced", "High stiffness", "Dimensional stability"], applications: ["Precision liners", "Structural boards", "Formwork"], tempRange: "−50°C to +80°C", forms: "Sheets", colour: "Grey / Black" },
  { id: "polyrib-h-plain", name: "POLYRIB-H", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Standard extruded HDPE sheet. Workhorse grade for general industrial, marine, agricultural and construction applications.", keyProperties: ["General purpose", "Chemical resistant", "Easy to fabricate"], applications: ["General industrial", "Agriculture", "Marine", "Construction"], tempRange: "−50°C to +80°C", forms: "Sheets, Boards", colour: "Natural / Black / Colours" },
  { id: "polyrib-ld", name: "POLYRIB-LD", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Low-density polyethylene (LDPE) sheet for flexible liners, packaging and agricultural applications requiring pliability.", keyProperties: ["Flexible grade", "Low density", "Excellent elongation"], applications: ["Flexible liners", "Agricultural membranes", "Packaging"], tempRange: "−50°C to +60°C", forms: "Sheets, Film", colour: "Natural / Translucent" },
  { id: "polyrib-h-play-emb-uv", name: "POLYRIB-H-PLAY EMB UV", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Embossed UV-stabilised HDPE for playground equipment, outdoor furniture and leisure applications. Highly colourfast.", keyProperties: ["UV stabilised", "Embossed surface", "Bright colours"], applications: ["Playground equipment", "Outdoor furniture", "Leisure structures"], tempRange: "−50°C to +80°C", forms: "Sheets", colour: "Multiple bright colours" },
  { id: "polyrib-cutrite-emb", name: "POLYRIB CUTRITE EMB", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Embossed HDPE cutting board grade with non-slip surface texture. Hygienic and easy to clean for food processing environments.", keyProperties: ["Embossed non-slip surface", "Hygienic", "Easy clean"], applications: ["Industrial cutting boards", "Food processing", "Butchery"], tempRange: "−50°C to +80°C", forms: "Sheets, Boards", colour: "White / Natural" },
  { id: "polyrib-h-wr", name: "POLYRIB-H WR", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Water-resistant HDPE grade for water and waste water treatment, marine, and wet environment applications.", keyProperties: ["Water resistant", "Corrosion proof", "Marine rated"], applications: ["Water treatment", "Marine structures", "Wet environments"], tempRange: "−50°C to +80°C", forms: "Sheets, Boards", colour: "Black / Natural" },
  { id: "polyrib-hgx-266-ext", name: "POLYRIB-HGX-266-EXT", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Speciality extruded HDPE GX-266 grade with enhanced mechanical properties for precision industrial components.", keyProperties: ["GX-266 grade", "Enhanced stiffness", "Precision machinability"], applications: ["Precision components", "Industrial liners", "Engineering parts"], tempRange: "−50°C to +80°C", forms: "Sheets, Blocks", colour: "Natural" },
  { id: "polyrib-hgx-267-ext", name: "POLYRIB-HGX-267-EXT", brand: "POLYRIB H", brandSlug: "polyrib-h", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Speciality extruded HDPE GX-267 grade — improved impact performance at low temperatures for refrigeration and cold storage liners.", keyProperties: ["GX-267 grade", "Low temp impact", "Cold storage rated"], applications: ["Refrigeration liners", "Cold storage", "Freezer equipment"], tempRange: "−60°C to +80°C", forms: "Sheets", colour: "Natural" },
];

const POLYRIB_P_PRODUCTS: Product[] = [
  { id: "polyrib-pgx-266", name: "POLYRIB PGX-266", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Premium homopolymer polypropylene GX-266 grade sheet with outstanding resistance to inorganic acids, alkalis, and chemical solvents.", keyProperties: ["Chemical resistant", "Acid/alkali resistant", "GX-266 grade"], applications: ["Chemical tanks", "Acid handling equipment", "Chemical plant liners"], tempRange: "−10°C to +100°C", forms: "Sheets, Blocks", colour: "Natural / Grey" },
  { id: "polyrib-pgx-226", name: "POLYRIB PGX-226", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "PP homopolymer GX-226 grade with enhanced stiffness for structural and chemical containment applications.", keyProperties: ["GX-226 grade", "High stiffness", "Weldable"], applications: ["Structural panels", "Chemical containment", "Tanks and vessels"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Natural" },
  { id: "polyrib-hitech-gl", name: "POLYRIB HITECH GL", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Glass-lined polypropylene for FRP/GRP composite construction. Superior resin bond strength for chemical process vessels.", keyProperties: ["Glass-lined surface", "FRP compatible", "Superior bond strength"], applications: ["FRP vessel construction", "Chemical process tanks", "GRP composites"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Natural" },
  { id: "polyrib-ppx-258", name: "POLYRIB PPX-258", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Specialist PP copolymer X-258 grade with improved impact resistance and weldability for fabricated chemical equipment.", keyProperties: ["Copolymer grade", "Impact resistant", "Excellent weldability"], applications: ["Chemical equipment fabrication", "Scrubbers", "Ductwork"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Natural / Grey" },
  { id: "polyrib-ppx-259", name: "POLYRIB PPX-259", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "PP copolymer X-259 grade with high clarity option for inspection windows and housings in chemical environments.", keyProperties: ["Copolymer grade", "High clarity", "Chemical resistant"], applications: ["Inspection windows", "Chemical housings", "Clear chemical equipment"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Natural / Translucent" },
  { id: "polyrib-ppx-260", name: "POLYRIB PPX-260", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "PP X-260 grade with enhanced UV stabilisation and colour retention for outdoor chemical and agricultural applications.", keyProperties: ["UV stabilised", "Colour stable", "Outdoor grade"], applications: ["Outdoor equipment", "Agricultural tanks", "UV-exposed structures"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Multiple colours" },
  { id: "polyrib-hitech", name: "POLYRIB HITECH", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "High-performance PP grade with optimised impact-chemical resistance balance for demanding industrial applications.", keyProperties: ["High performance", "Impact-chemical balance", "Industrial grade"], applications: ["Chemical processing", "Industrial tanks", "Process equipment"], tempRange: "−10°C to +100°C", forms: "Sheets, Blocks", colour: "Natural / Grey" },
  { id: "polyrib-ripla-hih", name: "POLYRIB RIPLA HIH", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "RIPLA HIH cutting board grade polypropylene for leather clicking machines. Provides consistent cut quality and long blade life.", keyProperties: ["Cutting board grade", "Blade-friendly", "Self-healing surface"], applications: ["Leather clicking machines", "Die-cutting", "Industrial cutting presses"], tempRange: "−10°C to +80°C", forms: "Sheets, Boards", colour: "White / Natural" },
  { id: "polyrib-ripla-hik", name: "POLYRIB RIPLA HIK", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "RIPLA HIK cutting board grade for high-intensity leather and textile cutting applications. Increased hardness variant.", keyProperties: ["Increased hardness", "Cutting board grade", "High-intensity use"], applications: ["High-intensity cutting", "Leather processing", "Textile cutting"], tempRange: "−10°C to +80°C", forms: "Boards", colour: "White" },
  { id: "polyrib-ripla-hitech", name: "POLYRIB RIPLA HITECH", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Premium RIPLA HITECH cutting board combining HIH hardness with enhanced self-healing properties for maximum cutting performance.", keyProperties: ["Self-healing", "Premium cutting board", "Maximum blade life"], applications: ["Precision die-cutting", "Premium leather goods", "Footwear manufacturing"], tempRange: "−10°C to +80°C", forms: "Boards", colour: "White / Natural" },
  { id: "polyrib-p-hih-ced", name: "POLYRIB-P-HIH CED", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Glass-lined PP HIH grade for FRP composite cutting board constructions requiring chemical resistance and structural integrity.", keyProperties: ["Glass-lined", "HIH grade", "Chemical resistant"], applications: ["Chemical environment cutting", "FRP composite boards"], tempRange: "−10°C to +80°C", forms: "Sheets", colour: "Natural" },
  { id: "polyrib-ppc-ced", name: "POLYRIB-PPC-CED", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "PP copolymer glass-etched grade for superior bonding in FRP construction of chemical process equipment.", keyProperties: ["Copolymer CED", "FRP bond ready", "Chemical process grade"], applications: ["FRP chemical tanks", "Process vessel liners"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Natural" },
  { id: "polyrib-pp-as", name: "POLYRIB PP AS", brand: "POLYRIB P", brandSlug: "polyrib-p", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Antistatic polypropylene grade for electronics, pharmaceutical and explosive handling environments requiring ESD control.", keyProperties: ["Antistatic", "ESD safe", "Chemical resistant"], applications: ["Electronics assembly", "Pharmaceutical cleanrooms", "Explosive environments"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Black" },
];

const DIPRA_PRODUCTS: Product[] = [
  { id: "dipra-ad-clear", name: "DIPRA AD CLEAR", brand: "DIPRA", brandSlug: "dipra", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Clear polypropylene sheet for inspection windows, covers, and enclosures in chemical processing environments.", keyProperties: ["High clarity", "Chemical resistant", "UV grades available"], applications: ["Inspection windows", "Chemical enclosures", "Laboratory equipment"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Clear / Translucent" },
  { id: "dipra-embossed-gate-liner", name: "DIPRA EMBOSSED GATE LINER", brand: "DIPRA", brandSlug: "dipra", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Embossed PP liner for mining gate, sluice, and chute applications. Reduced friction and excellent chemical resistance.", keyProperties: ["Embossed surface", "Low friction", "Mining grade"], applications: ["Mining gates", "Sluice liners", "Chute linings"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Black / Natural" },
  { id: "dipra-ppgl-uviofast", name: "DIPRA PPGL UVIOFAST ROOF LINER", brand: "DIPRA", brandSlug: "dipra", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "UV-fast PP roof liner with glass-lining. Designed for long-life outdoor applications including greenhouse and industrial roofing.", keyProperties: ["UV fast stabilised", "Glass-lined", "Outdoor rated"], applications: ["Greenhouse roofing", "Industrial roof liners", "Outdoor covers"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Natural / White" },
  { id: "polyrib-pp-embossed", name: "POLYRIB PP EMBOSSED", brand: "DIPRA", brandSlug: "dipra", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Embossed PP sheet for non-slip surfaces, architectural cladding and industrial flooring applications.", keyProperties: ["Non-slip embossed", "Architectural grade", "Weldable"], applications: ["Flooring", "Cladding", "Non-slip surfaces"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Multiple colours" },
  { id: "polyrib-pp-dual", name: "POLYRIB PP DUAL", brand: "DIPRA", brandSlug: "dipra", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Co-extruded dual-colour PP sheet for signage, way-finding, and industrial identification applications.", keyProperties: ["Dual colour", "Co-extruded", "Machined inscriptions visible"], applications: ["Signage", "Way-finding boards", "Industrial identification"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Various dual colour combinations" },
  { id: "polyrib-pp-uv", name: "POLYRIB PP UV", brand: "DIPRA", brandSlug: "dipra", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "UV-stabilised PP sheet for outdoor applications exposed to sunlight. Maintains mechanical properties and colour over extended periods.", keyProperties: ["UV stabilised", "Colour fast", "Outdoor grade"], applications: ["Outdoor structures", "Agricultural equipment", "Signage"], tempRange: "−10°C to +100°C", forms: "Sheets", colour: "Multiple colours" },
  { id: "polyrib-pp-tf", name: "POLYRIB PP TF", brand: "DIPRA", brandSlug: "dipra", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Thin film PP sheet for packaging, membrane, and lightweight liner applications requiring chemical resistance and flexibility.", keyProperties: ["Thin film grade", "Flexible", "Chemical resistant"], applications: ["Packaging", "Chemical membranes", "Lightweight liners"], tempRange: "−10°C to +100°C", forms: "Film, Rolls", colour: "Natural / Clear" },
];

const PCCLEAR_PRODUCTS: Product[] = [
  { id: "pcclear-light", name: "PCCLEAR LIGHT", brand: "PCCLEAR", brandSlug: "pcclear", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "High-clarity standard polycarbonate sheet with excellent impact strength and light transmission for glazing and safety applications.", keyProperties: ["High clarity", "Excellent impact strength", "Easy to thermoform"], applications: ["Glazing", "Safety screens", "Machine guards"], tempRange: "−40°C to +120°C", forms: "Sheets", colour: "Clear" },
  { id: "pcclear-uv-light", name: "PCCLEAR UV LIGHT", brand: "PCCLEAR", brandSlug: "pcclear", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "UV-coated polycarbonate sheet protecting against solar radiation for outdoor glazing, greenhouse and skylight applications.", keyProperties: ["UV protected coating", "Solar radiation resistant", "Long outdoor service life"], applications: ["Greenhouse glazing", "Skylights", "Outdoor canopies"], tempRange: "−40°C to +120°C", forms: "Sheets", colour: "Clear" },
  { id: "pcclear-glaze", name: "PCCLEAR GLAZE", brand: "PCCLEAR", brandSlug: "pcclear", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Enhanced-clarity PC sheet with hard coating for superior scratch resistance and optical quality in display and retail applications.", keyProperties: ["Hard coating", "Superior scratch resistance", "Optical clarity"], applications: ["Retail displays", "POS screens", "Optical applications"], tempRange: "−40°C to +120°C", forms: "Sheets", colour: "Clear" },
  { id: "pcclear-glaze-uv", name: "PCCLEAR GLAZE UV", brand: "PCCLEAR", brandSlug: "pcclear", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Hard-coated UV-protected PC sheet for outdoor displays, advertising boards and signage requiring long-term optical quality.", keyProperties: ["Hard coat + UV protection", "Outdoor rated", "Optical grade"], applications: ["Outdoor advertising", "Signage", "Display boards"], tempRange: "−40°C to +120°C", forms: "Sheets", colour: "Clear" },
  { id: "pcclear-glaze-diamond", name: "PCCLEAR GLAZE DIAMOND", brand: "PCCLEAR", brandSlug: "pcclear", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Premium hard-coated PC with diamond-like clarity. Maximum scratch resistance for high-end retail, automotive and aerospace glazing.", keyProperties: ["Diamond hard coat", "Maximum scratch resistance", "Premium optical quality"], applications: ["Luxury retail", "Automotive glazing", "Aerospace windows"], tempRange: "−40°C to +120°C", forms: "Sheets", colour: "Crystal Clear" },
  { id: "pcclear-shade", name: "PCCLEAR SHADE", brand: "PCCLEAR", brandSlug: "pcclear", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Tinted polycarbonate sheet for privacy glazing, sunshading, architectural applications and eye protection screens.", keyProperties: ["Tinted grades", "Solar control", "Privacy glazing"], applications: ["Architectural glazing", "Sun shading", "Privacy screens"], tempRange: "−40°C to +120°C", forms: "Sheets", colour: "Bronze / Grey / Blue / Green" },
  { id: "pcclear-opal", name: "PCCLEAR OPAL", brand: "PCCLEAR", brandSlug: "pcclear", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Opalescent PC sheet for light diffusion in signage, lighting panels, and LED backlit displays. Even light distribution.", keyProperties: ["Light diffusing", "Opalescent appearance", "LED compatible"], applications: ["Signage backlit panels", "LED displays", "Lighting diffusers"], tempRange: "−40°C to +120°C", forms: "Sheets", colour: "Opal / White" },
];

// ─── RODS & TUBES ────────────────────────────────────────────────────────────

const KAYLON_PRODUCTS: Product[] = [
  { id: "kaylon-natural", name: "KAYLON NATURAL", brand: "KAYLON", brandSlug: "kaylon", subcategorySlug: "rods-tubes", categorySlug: "semi-finished", description: "Cast nylon PA6 rod and block in natural (off-white) colour. Superior wear resistance and toughness for gears, bearings, and structural components.", keyProperties: ["Cast PA6 nylon", "Excellent wear resistance", "Good machinability"], applications: ["Gears", "Bearings", "Rollers", "Structural parts"], tempRange: "−40°C to +120°C", forms: "Rods, Tubes, Sheets, Blocks", colour: "Natural (Off-white)" },
  { id: "kaylon-oilon", name: "KAYLON OILON", brand: "KAYLON", brandSlug: "kaylon", subcategorySlug: "rods-tubes", categorySlug: "semi-finished", description: "Oil-impregnated cast nylon for self-lubricating applications. Ideal for bushings, guides, and bearings operating without external lubrication.", keyProperties: ["Oil impregnated", "Self-lubricating", "Low coefficient of friction"], applications: ["Bushings", "Sleeve bearings", "Slide guides", "Dry running components"], tempRange: "−40°C to +120°C", forms: "Rods, Tubes", colour: "Natural / Yellow" },
  { id: "kaylon-hs-blue", name: "KAYLON HS BLUE", brand: "KAYLON", brandSlug: "kaylon", subcategorySlug: "rods-tubes", categorySlug: "semi-finished", description: "High-strength cast nylon with blue colour identification. Enhanced mechanical properties for heavy-duty gear and cam applications.", keyProperties: ["High strength", "Blue colour coded", "Heavy-duty grade"], applications: ["Heavy-duty gears", "Cams", "High-load bearings"], tempRange: "−40°C to +120°C", forms: "Rods, Blocks", colour: "Blue" },
  { id: "kaylon-moly", name: "KAYLON MOLY", brand: "KAYLON", brandSlug: "kaylon", subcategorySlug: "rods-tubes", categorySlug: "semi-finished", description: "MoS₂-filled cast nylon for applications requiring minimum friction and maximum wear resistance without any external lubrication.", keyProperties: ["MoS₂ filled", "Minimum friction", "Dry running"], applications: ["Slide bearings", "Wear pads", "Rollers", "Conveyor components"], tempRange: "−40°C to +120°C", forms: "Rods", colour: "Black" },
  { id: "kaylon-black", name: "KAYLON BLACK", brand: "KAYLON", brandSlug: "kaylon", subcategorySlug: "rods-tubes", categorySlug: "semi-finished", description: "Carbon-black filled cast nylon for UV-stable and conductive applications. Suitable for outdoor and antistatic environments.", keyProperties: ["Carbon black filled", "UV stable", "ESD grades available"], applications: ["Outdoor machinery", "UV-exposed components", "ESD safe parts"], tempRange: "−40°C to +120°C", forms: "Rods, Sheets", colour: "Black" },
];

const PAKETAL_PRODUCTS: Product[] = [
  { id: "paketal-natural", name: "PAKETAL NATURAL", brand: "PAKETAL", brandSlug: "paketal", subcategorySlug: "rods-tubes", categorySlug: "semi-finished", description: "Acetal/POM homopolymer rod and sheet in natural (white) colour. Outstanding precision machinability, dimensional stability and low friction.", keyProperties: ["POM homopolymer", "Excellent machinability", "Dimensional stability"], applications: ["Precision gears", "Bushings", "Cams", "Valve components"], tempRange: "−40°C to +100°C", forms: "Rods, Tubes, Sheets, Blocks", colour: "Natural (White)" },
  { id: "paketal-black", name: "PAKETAL BLACK", brand: "PAKETAL", brandSlug: "paketal", subcategorySlug: "rods-tubes", categorySlug: "semi-finished", description: "Acetal/POM homopolymer in black colour for UV stability and improved surface appearance in precision mechanical applications.", keyProperties: ["Black POM", "UV stable", "Precision grade"], applications: ["Precision components", "Gears", "Electronic parts", "Food machinery"], tempRange: "−40°C to +100°C", forms: "Rods, Sheets", colour: "Black" },
];

// ─── MACHINE COMPONENTS ───────────────────────────────────────────────────────

const CUTRITE_PRODUCTS: Product[] = [
  { id: "cutrite-l-ced", name: "CUTRITE-L CED", brand: "CUTRITE", brandSlug: "cutrite", subcategorySlug: "chopping-boards", categorySlug: "machine-components", description: "Glass-lined CUTRITE-L chopping board grade for hygienic food processing. Superior bonding for FRP-reinforced chopping boards.", keyProperties: ["Glass-lined CED", "Food-safe grade", "Hygienic surface"], applications: ["Food processing boards", "Butchery counters", "Restaurant kitchens"], tempRange: "−10°C to +80°C", forms: "Boards, Sheets", colour: "White / Natural" },
  { id: "polyrib-l-ext", name: "POLYRIB-L-EXT", brand: "CUTRITE", brandSlug: "cutrite", subcategorySlug: "chopping-boards", categorySlug: "machine-components", description: "Extruded LDPE chopping board grade with excellent knife-friendliness and self-healing surface for professional food preparation.", keyProperties: ["Knife-friendly", "Self-healing surface", "Easy to clean"], applications: ["Professional kitchens", "Food preparation", "Catering boards"], tempRange: "−10°C to +80°C", forms: "Boards", colour: "White / Colour coded" },
  { id: "cutrite-emb-1", name: "CUTRITE EMB (Standard)", brand: "CUTRITE", brandSlug: "cutrite", subcategorySlug: "chopping-boards", categorySlug: "machine-components", description: "Embossed CUTRITE chopping board with non-slip base and juice grooves for professional food processing and HACCP compliance.", keyProperties: ["Embossed surface", "Non-slip", "HACCP compatible"], applications: ["Professional food preparation", "HACCP environments", "Catering"], tempRange: "−10°C to +80°C", forms: "Boards", colour: "White / Yellow / Blue / Green / Red" },
  { id: "cutrite-emb-2", name: "CUTRITE EMB (Heavy Duty)", brand: "CUTRITE", brandSlug: "cutrite", subcategorySlug: "chopping-boards", categorySlug: "machine-components", description: "Heavy-duty embossed CUTRITE for industrial food processing lines, abattoirs and large-scale food production facilities.", keyProperties: ["Heavy-duty grade", "Industrial food safe", "Highly abrasion resistant"], applications: ["Abattoir processing", "Industrial food lines", "Large-scale food production"], tempRange: "−10°C to +80°C", forms: "Boards, Sheets", colour: "White / Blue" },
  { id: "cutrite-emb-3", name: "CUTRITE EMB (FDA Grade)", brand: "CUTRITE", brandSlug: "cutrite", subcategorySlug: "chopping-boards", categorySlug: "machine-components", description: "FDA 21 CFR and EU 10/2011 compliant embossed chopping board grade for regulated food contact applications.", keyProperties: ["FDA 21 CFR", "EU 10/2011", "Full food contact compliance"], applications: ["Regulated food processing", "Pharmaceutical food contact", "Export-certified kitchens"], tempRange: "−10°C to +80°C", forms: "Boards", colour: "White" },
  { id: "polyrib-cutrite-emb", name: "POLYRIB CUTRITE EMB", brand: "CUTRITE", brandSlug: "cutrite", subcategorySlug: "chopping-boards", categorySlug: "machine-components", description: "Polyrib branded embossed cutting/chopping board manufactured from premium HDPE with superior surface texture and colour coding options.", keyProperties: ["Premium embossed", "Colour coded HACCP", "Easy clean"], applications: ["Professional kitchens", "Meat processing", "Colour-coded food prep"], tempRange: "−10°C to +80°C", forms: "Boards", colour: "White / Yellow / Blue / Green / Red / Brown" },
];

const POLYLIMB_PRODUCTS: Product[] = [
  { id: "polyrib-ortho-al", name: "POLYRIB ORTHO-AL", brand: "POLYLIMB", brandSlug: "polylimb", subcategorySlug: "application-sheets", categorySlug: "machine-components", description: "Orthopaedic-grade thermoplastic sheet for prosthetics and orthotics. Easily thermoformable at low temperatures for custom patient fittings.", keyProperties: ["Orthopaedic grade", "Low-temp thermoformable", "Biocompatible"], applications: ["Prosthetics", "Orthotics", "Medical bracing", "Custom patient fittings"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "Natural / Skin / Various" },
  { id: "polyrib-ortho-reflex", name: "POLYRIB ORTHO REFLEX", brand: "POLYLIMB", brandSlug: "polylimb", subcategorySlug: "application-sheets", categorySlug: "machine-components", description: "Memory-effect orthopaedic thermoplastic — returns to original shape on reheating for repeated adjustments during patient fitting sessions.", keyProperties: ["Memory effect", "Repeatedly adjustable", "Biocompatible"], applications: ["Splints", "Orthotics adjustment", "Paediatric bracing"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "White / Cream / Pink" },
  { id: "polyrib-ortho-flex", name: "POLYRIB-ORTHO FLEX", brand: "POLYLIMB", brandSlug: "polylimb", subcategorySlug: "application-sheets", categorySlug: "machine-components", description: "Flexible orthopaedic grade for dynamic orthoses requiring compliance and patient comfort in continuous-wear applications.", keyProperties: ["Flexible grade", "Patient comfort", "Continuous wear rated"], applications: ["Dynamic orthoses", "Soft bracing", "Wrist and ankle supports"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "White / Skin" },
  { id: "polyrib-ortho-flex-2", name: "POLYRIB-ORTHO FLEX (Semi-rigid)", brand: "POLYLIMB", brandSlug: "polylimb", subcategorySlug: "application-sheets", categorySlug: "machine-components", description: "Semi-rigid orthopaedic grade providing structured support with comfortable interface for medium-duty orthopaedic applications.", keyProperties: ["Semi-rigid", "Structured support", "Comfortable interface"], applications: ["Medium-duty orthotics", "Back supports", "Shoulder bracing"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "White / Beige" },
];

const ARETE_PRODUCTS: Product[] = [
  { id: "arete-l-v001", name: "ARETE L-V001", brand: "ARETE", brandSlug: "arete", subcategorySlug: "application-sheets", categorySlug: "machine-components", description: "ARETE glass-lined UHMW PE V001 composite liner for FRP construction applications requiring wear resistance and chemical inertness.", keyProperties: ["Glass-lined composite", "UHMW PE V001 grade", "FRP compatible"], applications: ["Wear-resistant FRP liners", "Chemical vessels", "Mining equipment"], tempRange: "−200°C to +80°C", forms: "Sheets", colour: "Natural" },
  { id: "arete-l-v005", name: "ARETE L-V005", brand: "ARETE", brandSlug: "arete", subcategorySlug: "application-sheets", categorySlug: "machine-components", description: "ARETE V005 composite liner for high-performance FRP constructions in mining and bulk material handling chutes.", keyProperties: ["V005 composite grade", "High abrasion resistance", "Mining rated"], applications: ["Mining chute liners", "Bulk handling equipment", "FRP construction"], tempRange: "−200°C to +80°C", forms: "Sheets", colour: "Natural" },
  { id: "arete-l-v030", name: "ARETE L-V030", brand: "ARETE", brandSlug: "arete", subcategorySlug: "application-sheets", categorySlug: "machine-components", description: "Glass-reinforced UHMW PE V030 composite for structural FRP applications requiring highest stiffness and abrasion resistance.", keyProperties: ["Glass reinforced", "Highest stiffness composite", "Structural FRP grade"], applications: ["Structural FRP panels", "Engineered liners", "Structural mining equipment"], tempRange: "−200°C to +80°C", forms: "Sheets", colour: "Natural" },
  { id: "arete-l-v-plain", name: "ARETE L-V", brand: "ARETE", brandSlug: "arete", subcategorySlug: "application-sheets", categorySlug: "machine-components", description: "Standard ARETE glass-lined UHMW PE composite for general FRP construction and wear liner applications.", keyProperties: ["Standard composite", "Glass-lined UHMW PE", "General FRP use"], applications: ["General FRP construction", "Wear liners", "Chemical equipment"], tempRange: "−200°C to +80°C", forms: "Sheets", colour: "Natural" },
  { id: "arete-l-v-superslide", name: "ARETE L-V SUPERSLIDE", brand: "ARETE", brandSlug: "arete", subcategorySlug: "application-sheets", categorySlug: "machine-components", description: "Ultra-low friction ARETE SUPERSLIDE composite liner. Glass-lined UHMW PE SUPERSLIDE grade for chutes and slides requiring minimum material build-up.", keyProperties: ["Ultra-low friction", "SUPERSLIDE grade", "Glass-lined composite"], applications: ["Transfer chutes", "Material slides", "Gravity flow systems"], tempRange: "−200°C to +80°C", forms: "Sheets", colour: "Natural" },
];

// ─── PLASCON V (Machine Components — Strips & Profiles) ──────────────────────

const PLASCON_V_STRIPS_PRODUCTS: Product[] = [
  { id: "mc-plascon-v", name: "PLASCON-V", brand: "PLASCON V", brandSlug: "plascon-v-mc", subcategorySlug: "strips-profiles", categorySlug: "machine-components", description: "Standard UHMW PE stress-relieved strips for machine components with excellent wear resistance and self-lubricating properties.", keyProperties: ["Stress relieved", "Wear resistant", "Self-lubricating"], applications: ["Wear strips", "Guide rails", "Conveyor components"], tempRange: "−200°C to +80°C", forms: "Strips, Profiles", colour: "Natural / Black" },
  { id: "mc-plascon-v-pigmented", name: "PLASCON-V PIGMENTED", brand: "PLASCON V", brandSlug: "plascon-v-mc", subcategorySlug: "strips-profiles", categorySlug: "machine-components", description: "Pigmented UHMW PE with added lubricants for improved sliding properties and decreased coefficient of friction.", keyProperties: ["Added lubricants", "Lower friction", "Colour coded"], applications: ["Sliding components", "Low-friction guides", "Conveyor strips"], tempRange: "−200°C to +80°C", forms: "Strips, Profiles", colour: "Various colours" },
  { id: "mc-plascon-gb", name: "PLASCON GB", brand: "PLASCON V", brandSlug: "plascon-v-mc", subcategorySlug: "strips-profiles", categorySlug: "machine-components", description: "Glass-bead filled UHMW PE for enhanced stiffness and dimensional stability in precision strip and profile applications.", keyProperties: ["Glass-bead filled", "Enhanced stiffness", "Dimensional stability"], applications: ["Precision profiles", "Structural strips", "Engineering components"], tempRange: "−200°C to +80°C", forms: "Strips, Profiles", colour: "Orange" },
  { id: "mc-plascon-mos2", name: "PLASCON MOS2", brand: "PLASCON V", brandSlug: "plascon-v-mc", subcategorySlug: "strips-profiles", categorySlug: "machine-components", description: "MoS₂-filled UHMW PE for minimum friction and maximum wear resistance in dry-running strip and profile applications.", keyProperties: ["MoS₂ filled", "Minimum friction", "Dry running"], applications: ["Dry-running guides", "Low-friction strips", "Conveyor wear pads"], tempRange: "−200°C to +80°C", forms: "Strips, Profiles", colour: "Grey" },
  { id: "mc-plascon-hitech-cera", name: "PLASCON HI-TECH CERA", brand: "PLASCON V", brandSlug: "plascon-v-mc", subcategorySlug: "strips-profiles", categorySlug: "machine-components", description: "Ceramic-filled UHMW PE for highest wear resistance and temperature performance in demanding conveyor and processing line applications.", keyProperties: ["Ceramic filled", "Highest wear resistance", "Temperature resistant"], applications: ["Heavy-duty conveyors", "Processing lines", "High-wear components"], tempRange: "−200°C to +90°C", forms: "Strips, Profiles", colour: "Banana Green" },
  { id: "mc-plascon-rider", name: "PLASCON RIDER", brand: "PLASCON V", brandSlug: "plascon-v-mc", subcategorySlug: "strips-profiles", categorySlug: "machine-components", description: "Speciality UHMW PE strip grade for rider and guide rail applications in packaging and conveyor systems.", keyProperties: ["Rider grade", "Guide rail optimised", "Excellent sliding"], applications: ["Packaging line riders", "Guide rails", "Conveyor runners"], tempRange: "−200°C to +80°C", forms: "Strips, Profiles", colour: "Black" },
  { id: "mc-plascon-rider-glide", name: "PLASCON RIDER GLIDE", brand: "PLASCON V", brandSlug: "plascon-v-mc", subcategorySlug: "strips-profiles", categorySlug: "machine-components", description: "Ultra-low friction PLASCON RIDER variant with enhanced glide properties for high-speed packaging and conveyor lines.", keyProperties: ["Ultra-low friction", "High-speed rated", "Enhanced glide"], applications: ["High-speed conveyors", "Bottling lines", "Packaging systems"], tempRange: "−200°C to +80°C", forms: "Strips", colour: "Black" },
];

// ─── PCCLEAR (Machine Components — Vacuum Formed Parts) ──────────────────────

const PCCLEAR_VACUUM_PRODUCTS: Product[] = [
  { id: "mc-pcclear-base-plate", name: "PCCLEAR BASE PLATE", brand: "PCCLEAR", brandSlug: "pcclear-vacuum", subcategorySlug: "vacuum-formed", categorySlug: "machine-components", description: "Vacuum-formed polycarbonate base plate for industrial enclosures, machine guards and display housings.", keyProperties: ["Vacuum formed", "High impact strength", "Optical clarity"], applications: ["Machine guards", "Display housings", "Industrial enclosures"], tempRange: "−40°C to +120°C", forms: "Formed parts", colour: "Clear / Tinted" },
  { id: "mc-pcclear-louvers", name: "PCCLEAR LOUVERS", brand: "PCCLEAR", brandSlug: "pcclear-vacuum", subcategorySlug: "vacuum-formed", categorySlug: "machine-components", description: "Vacuum-formed polycarbonate louvers for ventilation, lighting, and architectural applications.", keyProperties: ["Vacuum formed louver", "UV resistant", "Weather resistant"], applications: ["Ventilation panels", "Lighting diffusers", "Architectural features"], tempRange: "−40°C to +120°C", forms: "Formed parts", colour: "Clear / Opal" },
  { id: "mc-pcclear-other-formed", name: "PCCLEAR OTHER FORMED PARTS", brand: "PCCLEAR", brandSlug: "pcclear-vacuum", subcategorySlug: "vacuum-formed", categorySlug: "machine-components", description: "Custom vacuum-formed polycarbonate parts for automotive, signage and industrial applications to customer specifications.", keyProperties: ["Custom formed", "Design flexibility", "Impact resistant"], applications: ["Automotive parts", "Signage components", "Custom enclosures"], tempRange: "−40°C to +120°C", forms: "Custom formed parts", colour: "Clear / Various" },
];

// ─── RIPLA (Machine Components — Cutting Boards) ─────────────────────────────

const RIPLA_CUTTING_PRODUCTS: Product[] = [
  { id: "mc-ripla-hih", name: "POLYRIB RIPLA HIH", brand: "RIPLA", brandSlug: "ripla", subcategorySlug: "ripla-cutting-boards", categorySlug: "machine-components", description: "RIPLA HIH cutting board grade polypropylene for leather clicking machines. Provides consistent cut quality and long blade life.", keyProperties: ["Cutting board grade", "Blade-friendly", "Self-healing surface"], applications: ["Leather clicking machines", "Die-cutting", "Industrial cutting presses"], tempRange: "−10°C to +80°C", forms: "Boards", colour: "White / Natural" },
  { id: "mc-ripla-hik", name: "POLYRIB RIPLA HIK", brand: "RIPLA", brandSlug: "ripla", subcategorySlug: "ripla-cutting-boards", categorySlug: "machine-components", description: "RIPLA HIK cutting board grade for high-intensity leather and textile cutting applications. Increased hardness variant.", keyProperties: ["Increased hardness", "High-intensity use", "Long lasting"], applications: ["High-intensity cutting", "Leather processing", "Textile cutting"], tempRange: "−10°C to +80°C", forms: "Boards", colour: "White" },
  { id: "mc-ripla-hitech", name: "POLYRIB RIPLA HITECH", brand: "RIPLA", brandSlug: "ripla", subcategorySlug: "ripla-cutting-boards", categorySlug: "machine-components", description: "Premium RIPLA HITECH cutting board combining HIH hardness with enhanced self-healing properties. Substitute for imported cutting boards.", keyProperties: ["Self-healing", "Premium quality", "Import substitute"], applications: ["Precision die-cutting", "Premium leather goods", "Footwear manufacturing"], tempRange: "−10°C to +80°C", forms: "Boards", colour: "White / Natural" },
];

// ─── PLASCON V (Semi-Finished — Rods & Tubes) ────────────────────────────────

const PLASCON_V_RODS_PRODUCTS: Product[] = [
  { id: "sf-plascon-v", name: "PLASCON-V", brand: "PLASCON V", brandSlug: "plascon-v-sf", subcategorySlug: "rods-tubes", categorySlug: "semi-finished", description: "UHMW PE stress-relieved rods for machine components with outstanding wear resistance and self-lubricating properties.", keyProperties: ["Stress relieved", "Wear resistant", "Self-lubricating"], applications: ["Bearings", "Rollers", "Gears", "Machine parts"], tempRange: "−200°C to +80°C", forms: "Rods, Tubes", colour: "Natural / Black" },
  { id: "sf-plascon-v-superslide", name: "PLASCON V SUPERSLIDE", brand: "PLASCON V", brandSlug: "plascon-v-sf", subcategorySlug: "rods-tubes", categorySlug: "semi-finished", description: "Ultra-low friction UHMW PE rod with superslide properties for bushings and bearing applications requiring zero lubrication.", keyProperties: ["Ultra-low friction", "Superslide grade", "Zero lubrication"], applications: ["Bushings", "Bearings", "Slide components"], tempRange: "−200°C to +80°C", forms: "Rods", colour: "Natural" },
];

// ─── KBK A — ABS (Semi-Finished — Sheets & Blocks) ──────────────────────────

const KBK_A_PRODUCTS: Product[] = [
  { id: "kbk-abs-embossed-glossy", name: "KBK ABS EMBOSSED GLOSSY", brand: "KBK A", brandSlug: "kbk-a", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Glossy embossed ABS sheet for automotive interiors and premium surface finish applications.", keyProperties: ["Glossy finish", "Embossed surface", "Automotive grade"], applications: ["Automotive interiors", "Dashboard panels", "Trim components"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "Various" },
  { id: "kbk-abs-embossed-matt", name: "KBK ABS EMBOSSED MATT", brand: "KBK A", brandSlug: "kbk-a", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Matt embossed ABS sheet for automotive interiors and exteriors requiring non-reflective surface finish.", keyProperties: ["Matt finish", "Non-reflective", "Automotive grade"], applications: ["Automotive interiors", "Exterior panels", "Interior trim"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "Various" },
  { id: "kbk-abs-asa-embossed", name: "KBK ABS / ASA EMBOSSED & PLAIN", brand: "KBK A", brandSlug: "kbk-a", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "ABS/ASA blend sheets for outdoor applications. Superior UV and weather resistance.", keyProperties: ["UV resistant", "Weather resistant", "Outdoor grade"], applications: ["Outdoor applications", "Automotive exterior", "Garden furniture"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "Various" },
  { id: "kbk-abs-acrylic-embossed", name: "KBK ABS ACRYLIC EMBOSSED & PLAIN", brand: "KBK A", brandSlug: "kbk-a", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "ABS with acrylic cap layer providing excellent scratch resistance and UV protection for premium applications.", keyProperties: ["Acrylic cap layer", "Scratch resistant", "UV protected"], applications: ["Premium surfaces", "Sanitaryware", "Automotive trim"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "Various" },
  { id: "kbk-asa-sheets", name: "KBK ASA SHEETS", brand: "KBK A", brandSlug: "kbk-a", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "ASA sheets with attractive colour options for outdoor and weather-exposed applications.", keyProperties: ["ASA grade", "Colour stable", "Weather resistant"], applications: ["Outdoor applications", "Automotive", "Building cladding"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "Multiple colours" },
  { id: "kbk-abs-dual", name: "KBK ABS DUAL", brand: "KBK A", brandSlug: "kbk-a", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Co-extruded dual-colour ABS sheet for display systems, POP and point-of-sale applications.", keyProperties: ["Dual colour", "Co-extruded", "Display grade"], applications: ["Display systems", "POP applications", "Point of sale"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "Dual colour options" },
  { id: "kbk-abs-fr-uv", name: "KBK ABS FR UV", brand: "KBK A", brandSlug: "kbk-a", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Fire retardant UV-stabilised ABS sheet for safety-critical and outdoor applications.", keyProperties: ["Fire retardant", "UV stabilised", "Safety rated"], applications: ["Safety enclosures", "Electrical housings", "Outdoor equipment"], tempRange: "−20°C to +80°C", forms: "Sheets", colour: "Various" },
  { id: "kbk-a-wr3d", name: "KBK A WR3D", brand: "KBK A", brandSlug: "kbk-a", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "ABS 3D printer filament grade for rapid prototyping and additive manufacturing applications.", keyProperties: ["3D printer filament", "Rapid prototyping", "Excellent adhesion"], applications: ["3D printing", "Prototyping", "Additive manufacturing"], tempRange: "−20°C to +80°C", forms: "Filament", colour: "Natural / Various" },
  { id: "kbk-a-ced", name: "KBK A CED", brand: "KBK A", brandSlug: "kbk-a", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Thick ABS sheets for rapid prototyping and CNC machining of prototype components.", keyProperties: ["Thick gauge", "CNC machinable", "Prototyping grade"], applications: ["Rapid prototyping", "CNC machined parts", "Tooling"], tempRange: "−20°C to +80°C", forms: "Sheets, Blocks", colour: "Natural / Black" },
];

// ─── KBK PS — HI-PS (Semi-Finished — Sheets & Blocks) ───────────────────────

const KBK_PS_PRODUCTS: Product[] = [
  { id: "kbk-ps-gp", name: "KBK PS/GP", brand: "KBK PS", brandSlug: "kbk-ps", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "General-purpose high-impact polystyrene sheet for refrigerator liners and thermoforming applications.", keyProperties: ["General purpose", "Thermoformable", "Impact resistant"], applications: ["Refrigerator liners", "Thermoformed trays", "Packaging"], tempRange: "−20°C to +70°C", forms: "Sheets, Rolls", colour: "White / Various" },
  { id: "kbk-ps-dual", name: "KBK PS/DUAL", brand: "KBK PS", brandSlug: "kbk-ps", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Dual-colour high-impact polystyrene for advertising, signage and display applications.", keyProperties: ["Dual colour", "Signage grade", "Easy to fabricate"], applications: ["Advertising displays", "Signage", "POP systems"], tempRange: "−20°C to +70°C", forms: "Sheets", colour: "Dual colour options" },
  { id: "kbk-ps-hi", name: "KBK PS-HI", brand: "KBK PS", brandSlug: "kbk-ps", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "High-impact PS sheet for POP display systems and point-of-purchase applications.", keyProperties: ["High impact", "Display grade", "Easy to print"], applications: ["POP systems", "Display stands", "Point of purchase"], tempRange: "−20°C to +70°C", forms: "Sheets", colour: "White / Colours" },
  { id: "kbk-ps-el", name: "KBK PS-EL", brand: "KBK PS", brandSlug: "kbk-ps", subcategorySlug: "sheets-blocks", categorySlug: "semi-finished", description: "Electrically conductive high-impact polystyrene for ESD-sensitive packaging and electronics applications.", keyProperties: ["Electrically conductive", "ESD safe", "HI-PS grade"], applications: ["ESD packaging", "Electronics trays", "Antistatic containers"], tempRange: "−20°C to +70°C", forms: "Sheets", colour: "Black" },
];

// ─── Machined Plastic Parts products ─────────────────────────────────────────

const MACHINED_PARTS_PRODUCTS: Product[] = [
  { id: "mc-plascon-sealing-strips", name: "PLASCON SEALING STRIPS", brand: "MACHINED PARTS", brandSlug: "machined-parts-brand", subcategorySlug: "machined-parts", categorySlug: "machine-components", description: "Precision CNC-machined UHMW PE sealing strips for chemical, food processing and paper industry applications.", keyProperties: ["CNC machined", "Precision tolerances", "Chemical resistant"], applications: ["Chemical plant seals", "Food processing", "Paper industry"], tempRange: "−200°C to +80°C", forms: "Machined parts", colour: "Natural / Black" },
  { id: "mc-vibrating-screen", name: "P VIBRATING SCREEN", brand: "MACHINED PARTS", brandSlug: "machined-parts-brand", subcategorySlug: "machined-parts", categorySlug: "machine-components", description: "Precision machined plastic vibrating screens for mining, aggregate and bulk material screening applications.", keyProperties: ["Vibrating screen grade", "Wear resistant", "Noise dampening"], applications: ["Mining screening", "Aggregate processing", "Bulk material handling"], tempRange: "−50°C to +80°C", forms: "Machined parts", colour: "Natural / Black" },
  { id: "mc-spur-gears", name: "SPUR GEARS", brand: "MACHINED PARTS", brandSlug: "machined-parts-brand", subcategorySlug: "machined-parts", categorySlug: "machine-components", description: "CNC machined plastic spur gears in cast nylon, acetal and UHMW PE for quiet, lubrication-free power transmission.", keyProperties: ["Precision CNC machined", "Low noise", "No lubrication required"], applications: ["Power transmission", "Conveyor drives", "Packaging machinery"], tempRange: "−40°C to +120°C", forms: "Machined gears", colour: "Natural / Black" },
  { id: "mc-kaylon-gears", name: "KAYLON GEARS", brand: "MACHINED PARTS", brandSlug: "machined-parts-brand", subcategorySlug: "machined-parts", categorySlug: "machine-components", description: "Cast nylon PA6 gears machined from KAYLON billets for heavy-duty industrial gear and cam applications.", keyProperties: ["Cast nylon", "Heavy-duty", "Self-lubricating"], applications: ["Industrial gears", "Cams", "Heavy load bearings"], tempRange: "−40°C to +120°C", forms: "Machined gears", colour: "Natural / Blue / Black" },
  { id: "mc-headbox-solution", name: "SOLUTION FOR HEADBOX", brand: "MACHINED PARTS", brandSlug: "machined-parts-brand", subcategorySlug: "machined-parts", categorySlug: "machine-components", description: "Custom machined UHMW PE components for paper mill headbox applications. Resistant to chemicals and abrasion.", keyProperties: ["Headbox grade", "Chemical resistant", "Abrasion resistant"], applications: ["Paper mill headbox", "Pulp processing", "Paper manufacturing"], tempRange: "−200°C to +80°C", forms: "Machined parts", colour: "Natural" },
  { id: "mc-plascreen", name: "PLASCREEN", brand: "MACHINED PARTS", brandSlug: "machined-parts-brand", subcategorySlug: "machined-parts", categorySlug: "machine-components", description: "Custom machined plastic screens for industrial filtering, screening and separation applications.", keyProperties: ["Custom machined", "Screening grade", "Wear resistant"], applications: ["Industrial screening", "Filtering", "Separation equipment"], tempRange: "−50°C to +80°C", forms: "Machined parts", colour: "Natural / Black" },
];

// ─── ALL BRANDS REGISTRY ──────────────────────────────────────────────────────

export const ALL_BRANDS: Brand[] = [
  {
    id: "polyrib-v", slug: "polyrib-v", name: "POLYRIB V", tagline: "UHMW PE – Ultimate Abrasion & Impact Resistance",
    description: "POLYRIB V is Polyrib's UHMW PE (Ultra-High Molecular Weight Polyethylene) family — the go-to choice for wear liners, conveyor systems, mining equipment, and food-contact applications. With 8 specialist grades including food grade, antistatic, flame retardant, and superslide variants.",
    subcategorySlug: "sheets-blocks", categorySlug: "semi-finished",
    basePolymer: "UHMW PE", tempRange: "−200°C to +80°C", colour: "Natural / Black / Blue / Custom",
    keyProperties: ["Highest abrasion resistance of any thermoplastic", "Self-lubricating surface", "Excellent impact strength", "Food-grade and FDA grades available", "Antistatic and flame-retardant grades"],
    products: POLYRIB_V_PRODUCTS,
  },
  {
    id: "polyrib-h", slug: "polyrib-h", name: "POLYRIB H", tagline: "HDPE – Chemical Resistance & Outdoor Durability",
    description: "POLYRIB H is Polyrib's HDPE (High-Density Polyethylene) range covering 14 specialist grades for construction, marine, mining, food processing, and FRP composite applications. Includes glass-lined, UV-stabilised, embossed, and playground grades.",
    subcategorySlug: "sheets-blocks", categorySlug: "semi-finished",
    basePolymer: "HDPE", tempRange: "−60°C to +80°C", colour: "Natural / Black / Multiple colours",
    keyProperties: ["Excellent chemical resistance", "UV-stabilised outdoor grades", "Glass-lined FRP grades", "Playground and marine grades", "Food contact available"],
    products: POLYRIB_H_PRODUCTS,
  },
  {
    id: "polyrib-p", slug: "polyrib-p", name: "POLYRIB P", tagline: "PP – Chemical Tank & Industrial Fabrication",
    description: "POLYRIB P is Polyrib's polypropylene family with 13 grades for chemical tanks, acid handling equipment, cutting boards, FRP construction, and cleanroom environments. The RIPLA cutting board sub-range is the industry standard for leather clicking machines.",
    subcategorySlug: "sheets-blocks", categorySlug: "semi-finished",
    basePolymer: "PP (Polypropylene)", tempRange: "−10°C to +100°C", colour: "Natural / Grey / Custom",
    keyProperties: ["Outstanding acid/alkali resistance", "Weldable for tank fabrication", "RIPLA cutting board grades", "Glass-lined FRP grades", "Antistatic grades"],
    products: POLYRIB_P_PRODUCTS,
  },
  {
    id: "dipra", slug: "dipra", name: "DIPRA", tagline: "PP – Gate Liners, Roof Liners & Embossed Sheets",
    description: "DIPRA is Polyrib's specialist polypropylene range for architectural, agricultural, mining and construction applications. Includes embossed gate liners, UV-fast roof liners, dual-colour sheets and thin-film grades.",
    subcategorySlug: "sheets-blocks", categorySlug: "semi-finished",
    basePolymer: "PP (Polypropylene)", tempRange: "−10°C to +100°C", colour: "Multiple colours",
    keyProperties: ["UV-fast roof liner grades", "Embossed non-slip surfaces", "Gate and sluice liner grades", "Dual-colour for signage", "Thin film grades"],
    products: DIPRA_PRODUCTS,
  },
  {
    id: "pcclear", slug: "pcclear", name: "PCCLEAR", tagline: "PC – High Clarity Polycarbonate Glazing & Displays",
    description: "PCCLEAR is Polyrib's polycarbonate sheet family for glazing, safety screening, displays and lighting. 7 grades from standard clear to diamond hard-coated and UV-protected, covering architectural, retail, automotive and industrial applications.",
    subcategorySlug: "sheets-blocks", categorySlug: "semi-finished",
    basePolymer: "Polycarbonate (PC)", tempRange: "−40°C to +120°C", colour: "Clear / Tinted / Opal",
    keyProperties: ["High optical clarity", "250× stronger than glass", "UV-protected grades", "Hard coat scratch resistance", "Diamond hard coat available"],
    products: PCCLEAR_PRODUCTS,
  },
  {
    id: "kaylon", slug: "kaylon", name: "KAYLON", tagline: "Cast PA6 Nylon – Wear Resistant Engineering Rods",
    description: "KAYLON is Polyrib's cast nylon PA6 rod, tube and block range. Available in 5 grades including natural, oil-impregnated, MoS₂-filled, high-strength and carbon-black grades for gears, bearings, cams and structural machine components.",
    subcategorySlug: "rods-tubes", categorySlug: "semi-finished",
    basePolymer: "PA6 Nylon (Cast)", tempRange: "−40°C to +120°C", colour: "Natural / Black / Blue",
    keyProperties: ["Cast nylon for large diameters", "Oil and MoS₂ grades", "Excellent wear resistance", "Good machinability", "Self-lubricating options"],
    products: KAYLON_PRODUCTS,
  },
  {
    id: "paketal", slug: "paketal", name: "PAKETAL", tagline: "Acetal / POM – Precision Machined Components",
    description: "PAKETAL is Polyrib's acetal/POM homopolymer rod and sheet range. The benchmark material for precision machined components — gears, bearings, valve seats and cams — with natural and black grades in stock.",
    subcategorySlug: "rods-tubes", categorySlug: "semi-finished",
    basePolymer: "Acetal (POM Homopolymer)", tempRange: "−40°C to +100°C", colour: "Natural (White) / Black",
    keyProperties: ["Finest precision machinability", "Excellent dimensional stability", "Low friction & wear", "FDA food-contact grades", "High fatigue endurance"],
    products: PAKETAL_PRODUCTS,
  },
  {
    id: "cutrite", slug: "cutrite", name: "CUTRITE", tagline: "Hygienic Chopping Boards for Food Processing",
    description: "CUTRITE is Polyrib's professional chopping board range — HACCP-compliant, colour-coded food processing boards in 6 variants from standard embossed to FDA-grade and heavy-duty industrial grades for abattoirs and large-scale food production.",
    subcategorySlug: "chopping-boards", categorySlug: "machine-components",
    basePolymer: "HDPE / LDPE", tempRange: "−10°C to +80°C", colour: "White / Colour-coded HACCP",
    keyProperties: ["HACCP colour-coded system", "FDA 21 CFR compliant", "Non-slip embossed surface", "Knife-friendly and self-healing", "Dishwasher safe grades"],
    products: CUTRITE_PRODUCTS,
  },
  {
    id: "polylimb", slug: "polylimb", name: "POLYLIMB", tagline: "Orthopaedic Thermoplastics for Prosthetics & Orthotics",
    description: "POLYLIMB is Polyrib's orthopaedic-grade thermoplastic sheet range for prosthetics, orthotics and custom patient fitting. 4 grades from rigid to flexible and memory-effect, used by orthopaedic practitioners across Southern Africa.",
    subcategorySlug: "application-sheets", categorySlug: "machine-components",
    basePolymer: "PP / PE (Orthopaedic Grade)", tempRange: "−20°C to +80°C", colour: "Natural / Skin / Custom",
    keyProperties: ["Low-temperature thermoformable", "Memory effect grades", "Biocompatible materials", "Custom patient fit", "Lightweight and durable"],
    products: POLYLIMB_PRODUCTS,
  },
  {
    id: "arete", slug: "arete", name: "ARETE", tagline: "Glass-Lined UHMW PE Composites for FRP Construction",
    description: "ARETE is Polyrib's glass-lined UHMW PE composite liner range for FRP/GRP construction. 5 grades covering standard liners to superslide and glass-reinforced variants, used in chemical vessels, mining equipment and bulk material handling systems.",
    subcategorySlug: "application-sheets", categorySlug: "machine-components",
    basePolymer: "UHMW PE (Glass-lined composite)", tempRange: "−200°C to +80°C", colour: "Natural",
    keyProperties: ["Glass-lined for superior resin bond", "UHMW PE wear resistance", "FRP/GRP construction", "Chemical resistant composite", "Mining and chemical rated"],
    products: ARETE_PRODUCTS,
  },
  // ── PLASCON V (Machine Components — Strips & Profiles)
  {
    id: "plascon-v-mc", slug: "plascon-v-mc", name: "PLASCON V", tagline: "UHMW PE Strips & Profiles for Machine Components",
    description: "PLASCON V is the UHMW PE strip and profile range for machine components — stress-relieved grades with optional lubricant additives, MoS₂, ceramic and glass-bead fillers for conveyor, packaging and processing line applications.",
    subcategorySlug: "strips-profiles", categorySlug: "machine-components",
    basePolymer: "UHMW PE", tempRange: "−200°C to +80°C", colour: "Natural / Black / Various",
    keyProperties: ["Stress-relieved for machine use", "Multiple filler options", "Self-lubricating", "Conveyor and packaging rated", "Custom profiles available"],
    products: PLASCON_V_STRIPS_PRODUCTS,
  },
  // ── PCCLEAR (Machine Components — Vacuum Formed)
  {
    id: "pcclear-vacuum", slug: "pcclear-vacuum", name: "PCCLEAR", tagline: "Vacuum Formed Polycarbonate Parts",
    description: "PCCLEAR vacuum-formed polycarbonate components including base plates, louvers, and custom formed parts for industrial, automotive, and signage applications.",
    subcategorySlug: "vacuum-formed", categorySlug: "machine-components",
    basePolymer: "Polycarbonate (PC)", tempRange: "−40°C to +120°C", colour: "Clear / Tinted / Opal",
    keyProperties: ["Vacuum formed to spec", "High impact strength", "Optical clarity", "UV protection available", "Custom designs"],
    products: PCCLEAR_VACUUM_PRODUCTS,
  },
  // ── RIPLA (Machine Components — Cutting Boards)
  {
    id: "ripla", slug: "ripla", name: "RIPLA", tagline: "Cutting Boards for Leather & Industrial Die-Cutting",
    description: "RIPLA is the industry-standard cutting board range for leather clicking machines and industrial die-cutting. Available in HIH, HIK and HITECH grades with self-healing surfaces for maximum blade life.",
    subcategorySlug: "ripla-cutting-boards", categorySlug: "machine-components",
    basePolymer: "PP (Polypropylene)", tempRange: "−10°C to +80°C", colour: "White / Natural",
    keyProperties: ["Industry standard for leather", "Self-healing surface", "Maximum blade life", "Import substitute grades", "Multiple hardness options"],
    products: RIPLA_CUTTING_PRODUCTS,
  },
  // ── PLASCON V (Semi-Finished — Rods & Tubes)
  {
    id: "plascon-v-sf", slug: "plascon-v-sf", name: "PLASCON V", tagline: "UHMW PE Rods for Precision Machine Components",
    description: "PLASCON V rods and tubes in UHMW PE — stress-relieved grades for precision machine components, bearings, rollers and gears.",
    subcategorySlug: "rods-tubes", categorySlug: "semi-finished",
    basePolymer: "UHMW PE", tempRange: "−200°C to +80°C", colour: "Natural / Black",
    keyProperties: ["Stress relieved", "Precision machinability", "Self-lubricating", "Excellent wear resistance", "Superslide grade available"],
    products: PLASCON_V_RODS_PRODUCTS,
  },
  // ── KBK A — ABS (Semi-Finished — Sheets & Blocks)
  {
    id: "kbk-a", slug: "kbk-a", name: "KBK A", tagline: "ABS/ASA Sheets for Automotive & Industrial Applications",
    description: "KBK A is the ABS and ASA sheet range covering automotive interiors, outdoor applications, display systems, 3D printing filament and fire-retardant UV-stabilised grades. 9 specialist grades in stock.",
    subcategorySlug: "sheets-blocks", categorySlug: "semi-finished",
    basePolymer: "ABS / ASA", tempRange: "−20°C to +80°C", colour: "Various / Dual colour",
    keyProperties: ["Automotive interior grades", "UV/weather resistant ASA", "Fire retardant grades", "3D printing filament", "Embossed and plain finishes"],
    products: KBK_A_PRODUCTS,
  },
  // ── KBK PS — HI-PS (Semi-Finished — Sheets & Blocks)
  {
    id: "kbk-ps", slug: "kbk-ps", name: "KBK PS", tagline: "High-Impact Polystyrene for Packaging & Displays",
    description: "KBK PS is the high-impact polystyrene sheet range for refrigerator liners, advertising displays, POP systems and ESD-safe packaging. 4 specialist grades.",
    subcategorySlug: "sheets-blocks", categorySlug: "semi-finished",
    basePolymer: "HI-PS (High Impact Polystyrene)", tempRange: "−20°C to +70°C", colour: "White / Colours / Dual",
    keyProperties: ["Thermoformable grades", "Display and signage grades", "Refrigerator liner grade", "Electrically conductive grade", "Easy to fabricate"],
    products: KBK_PS_PRODUCTS,
  },
  // ── MACHINED PARTS brand (Machine Components)
  {
    id: "machined-parts-brand", slug: "machined-parts-brand", name: "Machined Plastic Parts", tagline: "Precision CNC Machined Thermoplastic Components",
    description: "Precision CNC-machined thermoplastic components including sealing strips, vibrating screens, gears, headbox solutions, and custom parts in all Polyrib grades.",
    subcategorySlug: "machined-parts", categorySlug: "machine-components",
    basePolymer: "Various (UHMW PE / Nylon / POM)", tempRange: "−200°C to +120°C", colour: "Natural / Black / Various",
    keyProperties: ["CNC machined to drawing", "All Polyrib grades", "Gears and screens", "Fast turnaround", "One-off to volume production"],
    products: MACHINED_PARTS_PRODUCTS,
  },
];

// ─── Lookup helpers ────────────────────────────────────────────────────────────

export function getBrandBySlug(slug: string): Brand | undefined {
  return ALL_BRANDS.find((b) => b.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  for (const brand of ALL_BRANDS) {
    const p = brand.products.find((p) => p.id === id);
    if (p) return p;
  }
  return undefined;
}

export function getBrandsBySubcategory(subcategorySlug: string): Brand[] {
  return ALL_BRANDS.filter((b) => b.subcategorySlug === subcategorySlug);
}

export function getBrandsByCategory(categorySlug: string): Brand[] {
  return ALL_BRANDS.filter((b) => b.categorySlug === categorySlug);
}

// Subcategory definitions
export const SEMI_FINISHED_SUBCATEGORIES = [
  {
    slug: "sheets-blocks",
    name: "Sheets & Blocks",
    description: "The full Polyrib brand range for sheet and block thermoplastics — POLYRIB V, H, P, DIPRA, PCCLEAR and more.",
    href: "/products/semi-finished/sheets-blocks",
  },
  {
    slug: "rods-tubes",
    name: "Rods & Tubes",
    description: "KAYLON cast nylon and PAKETAL acetal/POM rods and tubes for precision machined components.",
    href: "/products/semi-finished/rods-tubes",
  },
  {
    slug: "coils-rolls",
    name: "Coils & Rolls",
    description: "PCCLEAR PC rolls, DIPRA rolls, and specialty thin-gauge coil stock for vacuum forming.",
    href: "/products/semi-finished/coils-rolls",
  },
  {
    slug: "welding-rods",
    name: "Welding Rods",
    description: "PP, HDPE, and UHMW PE welding rods for thermoplastic fabrication and tank welding.",
    href: "/products/semi-finished/welding-rods",
  },
  {
    slug: "custom-sheets",
    name: "Custom-Sized Sheets",
    description: "Any Polyrib grade cut to custom width, length, and thickness on request.",
    href: "/products/semi-finished/custom-sheets",
  },
];

export const MACHINE_COMPONENT_SUBCATEGORIES = [
  {
    slug: "strips-profiles",
    name: "Strips & Profiles",
    description: "PLASCON V UHMW PE wear strips and profiles for conveyor, packaging and processing lines.",
    href: "/products/machine-components/strips-profiles",
  },
  {
    slug: "vacuum-formed",
    name: "Vacuum Formed Plastic Parts",
    description: "PCCLEAR base plates, louvers, and custom vacuum-formed polycarbonate parts for industrial and automotive applications.",
    href: "/products/machine-components/vacuum-formed",
  },
  {
    slug: "ripla-cutting-boards",
    name: "RIPLA Cutting Boards",
    description: "Industry-standard POLYRIB RIPLA cutting boards for leather clicking machines and industrial die-cutting.",
    href: "/products/machine-components/ripla-cutting-boards",
  },
  {
    slug: "chopping-boards",
    name: "CUTRITE Chopping Boards",
    description: "HACCP-compliant CUTRITE colour-coded chopping boards for professional food processing.",
    href: "/products/machine-components/chopping-boards",
  },
  {
    slug: "application-sheets",
    name: "Application Ready Sheets",
    description: "POLYLIMB orthopaedic grades, ARETE composite liners, POCAP, MASS and specialist application-ready sheets.",
    href: "/products/machine-components/application-sheets",
  },
  {
    slug: "machined-parts",
    name: "Machined Plastic Parts",
    description: "Precision CNC-machined thermoplastic components including sealing strips, gears, vibrating screens and custom parts.",
    href: "/products/machine-components/machined-parts",
  },
  {
    slug: "fascia-pads",
    name: "Fascia Pads",
    description: "Fender pads and fascia pads for marine, automotive and industrial bumper applications.",
    href: "/products/machine-components/fascia-pads",
  },
  {
    slug: "pop",
    name: "POP (Point of Purchase)",
    description: "POP display systems and point-of-purchase components in ABS, PS and PP thermoplastics.",
    href: "/products/machine-components/pop",
  },
];
