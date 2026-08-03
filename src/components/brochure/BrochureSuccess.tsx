import { CheckCircle2 } from "lucide-react";

interface BrochureSuccessProps {
  productName?: string;
  onClose: () => void;
}

export default function BrochureSuccess({
  productName,
  onClose,
}: BrochureSuccessProps) {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-8 text-center sm:px-8"
      role="status"
      aria-live="polite"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#16A34A]/25 bg-[#16A34A]/10 text-[#16A34A] shadow-[0_16px_40px_rgba(22,163,74,0.18)]">
        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
      </div>

      <h3 className="text-xl font-semibold text-[#0F2A3D]">
        Verification Successful
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-[#5C7696]">
        Your details have been verified successfully. The brochure will be
        available once it has been uploaded.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-7 inline-flex h-11 w-full max-w-xs items-center justify-center border border-[#279ECE] bg-[#279ECE] px-6 text-sm font-semibold text-white shadow-lg shadow-[#279ECE]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1F7FA8] focus:outline-none focus:ring-2 focus:ring-[#279ECE] focus:ring-offset-2 sm:w-auto"
      >
        Close
      </button>
    </div>
  );
}
