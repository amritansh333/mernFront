import { useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw, ShieldCheck } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { downloadBrochure, resendOtp, verifyOtp } from "@/lib/brochureApi";

interface BrochureOtpProps {
  mobileNumber: string;
  productSlug: string;
  expiresAt?: string;
  message?: string;
  onAuthorized: (sessionToken: string) => void;
}

const labelClassName = "text-sm font-semibold text-[#0F2A3D]";
const errorClassName = "mt-1.5 text-xs font-medium text-red-600";
const buttonClassName =
  "inline-flex h-12 w-full items-center justify-center gap-2 border border-[#279ECE] bg-[#279ECE] px-5 text-sm font-semibold text-white shadow-lg shadow-[#279ECE]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1F7FA8] focus:outline-none focus:ring-2 focus:ring-[#279ECE] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70";
const secondaryButtonClassName =
  "inline-flex h-11 w-full items-center justify-center gap-2 border border-[#279ECE] bg-white/75 px-5 text-sm font-semibold text-[#279ECE] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#279ECE] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70";

function getErrorMessage(error: unknown, fallback: string) {
  const responseData = (
    error as {
      response?: {
        data?: {
          message?: string;
          error?: string;
        };
      };
      message?: string;
    }
  )?.response?.data;

  return (
    responseData?.message ||
    responseData?.error ||
    (error as { message?: string })?.message ||
    fallback
  );
}

function getInitialCountdown(expiresAt?: string) {
  if (!expiresAt) {
    return 60;
  }

  const secondsUntilExpiry = Math.ceil(
    (new Date(expiresAt).getTime() - Date.now()) / 1000,
  );

  if (!Number.isFinite(secondsUntilExpiry) || secondsUntilExpiry <= 0) {
    return 60;
  }

  return Math.min(secondsUntilExpiry, 60);
}

export default function BrochureOtp({
  mobileNumber,
  productSlug,
  expiresAt,
  message,
  onAuthorized,
}: BrochureOtpProps) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(() =>
    getInitialCountdown(expiresAt),
  );
  const [statusMessage, setStatusMessage] = useState(message);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const otpContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCountdown(getInitialCountdown(expiresAt));
    setStatusMessage(message);
    setErrorMessage(null);
    setOtp("");
  }, [expiresAt, message]);

  useEffect(() => {
    const input = otpContainerRef.current?.querySelector("input");
    input?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setCountdown((currentCountdown) => Math.max(currentCountdown - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [countdown]);

  const formattedCountdown = useMemo(() => {
    const minutes = Math.floor(countdown / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (countdown % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setErrorMessage("Enter the 6-digit OTP.");
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    try {
      const verifyResponse = await verifyOtp({
        mobileNumber,
        otp,
      });

      if (!verifyResponse.sessionToken) {
        throw new Error("Unable to verify OTP.");
      }

      const authorizedSessionToken = verifyResponse.sessionToken;

      const downloadResponse = await downloadBrochure(
        productSlug,
        authorizedSessionToken,
      );

      if (downloadResponse.success === false) {
        throw new Error(
          downloadResponse.message || "Brochure authorization failed.",
        );
      }

      onAuthorized(authorizedSessionToken);
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Network error. Please try again."),
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) {
      return;
    }

    setIsResending(true);
    setErrorMessage(null);

    try {
      const resendResponse = await resendOtp({
        mobileNumber,
      });

      if (resendResponse.success === false) {
        throw new Error(resendResponse.message || "Unable to resend OTP.");
      }

      setOtp("");
      setStatusMessage(resendResponse.message || "OTP sent successfully.");
      setCountdown(getInitialCountdown(resendResponse.expiresAt));
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Network error. Please try again."),
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="mt-3 space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-[#0F2A3D]">
          Enter verification code
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#5C7696]">
          We sent a 6-digit OTP to your registered mobile number.
        </p>
      </div>

      <div>
        <label htmlFor="brochure-otp" className={labelClassName}>
          OTP
        </label>
        <div ref={otpContainerRef} className="mt-2">
          <InputOTP
            id="brochure-otp"
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value.replace(/\D/g, ""));
              setErrorMessage(null);
            }}
            disabled={isVerifying || isResending}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={
              errorMessage ? "brochure-otp-error" : "brochure-otp-help"
            }
            inputMode="numeric"
            pattern="[0-9]*"
          >
            <InputOTPGroup className="w-full justify-between gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-10 w-10 border border-[#C7D9E6] bg-white/85 text-sm text-[#0F2A3D] shadow-sm first:rounded-none last:rounded-none focus:border-[#279ECE]"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p id="brochure-otp-help" className="mt-2 text-xs text-[#5C7696]">
          {countdown > 0
            ? `You can resend OTP in ${formattedCountdown}.`
            : "You can request a new OTP now."}
        </p>

        {statusMessage && !errorMessage && (
          <p className="mt-1.5 text-xs font-medium text-[#276A96]">
            {statusMessage}
          </p>
        )}

        {errorMessage && (
          <p id="brochure-otp-error" className={errorClassName} role="alert">
            {errorMessage}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleVerify}
        disabled={isVerifying || isResending}
        className={buttonClassName}
      >
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        {isVerifying ? "Verifying..." : "Verify OTP"}
      </button>

      <button
        type="button"
        onClick={handleResend}
        disabled={countdown > 0 || isResending || isVerifying}
        className={secondaryButtonClassName}
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        {isResending ? "Resending..." : "Resend OTP"}
      </button>
    </div>
  );
}
