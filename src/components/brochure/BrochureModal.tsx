import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, X, LogIn } from "lucide-react";

import BrochureForm from "./BrochureForm";
import BrochureOtp from "./BrochureOtp";
import BrochureSuccess from "./BrochureSuccess";
import type {
  BrochureProductContext,
  BrochureSubmissionPayload,
} from "./types";

interface BrochureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productContext: BrochureProductContext;
}

interface BrochureOtpRequest {
  payload: BrochureSubmissionPayload;
  expiresAt?: string;
  message?: string;
}

export default function BrochureModal({
  open,
  onOpenChange,
  productContext,
}: BrochureModalProps) {
  const [submittedPayload, setSubmittedPayload] =
    useState<BrochureSubmissionPayload | null>(null);
  const [otpRequest, setOtpRequest] = useState<BrochureOtpRequest | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSubmittedPayload(null);
      setOtpRequest(null);
      setSessionToken(null);

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Notify floating widgets that a brochure modal is open.
      document.body.setAttribute("data-brochure-modal-open", "true");
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      document.body.removeAttribute("data-brochure-modal-open");
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      document.body.removeAttribute("data-brochure-modal-open");
    };
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-[#06131D]/55 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                className="
fixed
inset-0
z-50
flex
items-center
justify-center
px-5
py-4
sm:px-6
md:p-8
"
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                aria-labelledby="brochure-modal-title"
                aria-describedby="brochure-modal-description"
              >
                <div
                  className="
    relative
    flex
    w-full
    max-w-[320px]
    sm:max-w-md
    md:max-w-xl
    lg:max-w-2xl
    max-h-[92dvh]
    flex-col
    overflow-hidden
    rounded-none
    border
    border-white/45
    bg-white/80
    shadow-[0_32px_90px_rgba(6,19,29,0.35)]
    backdrop-blur-2xl
  "
                >
                  <Dialog.Close
                    aria-label="Close brochure request modal"
                    className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center border border-[#C7D9E6]/80 bg-white/75 text-[#5C7696] shadow-sm backdrop-blur transition-all duration-200 hover:border-[#279ECE] hover:text-[#279ECE] focus:outline-none focus:ring-2 focus:ring-[#279ECE] focus:ring-offset-2"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Dialog.Close>

                  <div
                    className="
    overflow-y-auto
    bg-gradient-to-br
    from-white/95
    via-[#F5FBFE]/90
    to-[#EAF7FC]/80
    px-5
    py-5
    sm:px-8
    sm:py-8
  "
                  >
                    <div className="flex items-start gap-3 pr-10">
                      <div className="hidden h-12 w-12 shrink-0 items-center justify-center border border-[#279ECE]/25 bg-white/75 text-[#279ECE] shadow-lg shadow-[#279ECE]/10 sm:flex">
                        <LogIn className="h-5 w-5" aria-hidden="true" />
                      </div>

                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 border border-[#279ECE]/20 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#276A96]">
                          <ShieldCheck
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          Verified Access
                        </div>

                        <Dialog.Title
                          id="brochure-modal-title"
                          className="text-xl font-bold tracking-tight text-[#0F2A3D] sm:text-2xl lg:text-3xl"
                        >
                          Get{" "}
                          <span className="text-[#0F2A3D] hover:text-[#279ECE]">
                            {productContext.productName}
                          </span>{" "}
                          Brochure
                        </Dialog.Title>

                        <Dialog.Description
                          id="brochure-modal-description"
                          className="mt-2 text-sm leading-6 text-[#5C7696] sm:text-base"
                        >
                          Verify your details to access the complete technical
                          brochure.
                        </Dialog.Description>
                      </div>
                    </div>

                    {submittedPayload ? (
                      <BrochureSuccess
                        productName={submittedPayload.product.name}
                        onClose={() => onOpenChange(false)}
                      />
                    ) : otpRequest ? (
                      <BrochureOtp
                        mobileNumber={otpRequest.payload.mobileNumber}
                        productSlug={
                          otpRequest.payload.product.slug ||
                          productContext.productSlug ||
                          ""
                        }
                        expiresAt={otpRequest.expiresAt}
                        message={otpRequest.message}
                        onAuthorized={(authorizedSessionToken) => {
                          setSessionToken(authorizedSessionToken);
                          setSubmittedPayload(otpRequest.payload);
                        }}
                      />
                    ) : (
                      <BrochureForm
                        productContext={productContext}
                        onOtpRequested={(details) => {
                          setOtpRequest(details);
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
