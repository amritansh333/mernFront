import api from "@/lib/api";
import axios from "axios";

export interface RequestOtpPayload {
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  mobileNumber: string;
  productId?: string;
  productSlug: string;
  productName?: string;
  currentRoute?: string;
}

export interface RequestOtpResponse {
  success: boolean;
  message?: string;
  expiresAt?: string;
}

export interface VerifyOtpPayload {
  mobileNumber: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success?: boolean;
  message?: string;
}

export interface ResendOtpPayload {
  mobileNumber: string;
}

export interface ResendOtpResponse {
  success?: boolean;
  message?: string;
  expiresAt?: string;
}

export interface DownloadBrochureResponse {
  success?: boolean;
  message?: string;
  downloadUrl?: string;
}

export interface BrochureSessionResponse {
  success?: boolean;
  authenticated?: boolean;
  isAuthenticated?: boolean;
  valid?: boolean;
  active?: boolean;
  message?: string;
}

export function isBrochureAuthError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return error.response?.status === 401 || error.response?.status === 403;
}

export function getBrochureErrorMessage(error: unknown, fallback: string) {
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

function isSessionAuthenticated(data?: BrochureSessionResponse) {
  if (!data) {
    return false;
  }

  if (typeof data.authenticated === "boolean") {
    return data.authenticated;
  }

  if (typeof data.isAuthenticated === "boolean") {
    return data.isAuthenticated;
  }

  if (typeof data.valid === "boolean") {
    return data.valid;
  }

  if (typeof data.active === "boolean") {
    return data.active;
  }

  return data.success === true;
}

export async function requestOtp(
  payload: RequestOtpPayload,
): Promise<RequestOtpResponse> {
  const response = await api.post<RequestOtpResponse>(
    "/brochure/request-otp",
    payload,
  );

  return response.data;
}

export async function verifyOtp(
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> {
  const response = await api.post<VerifyOtpResponse>(
    "/brochure/verify-otp",
    payload,
  );

  return response.data;
}

export async function resendOtp(
  payload: ResendOtpPayload,
): Promise<ResendOtpResponse> {
  const response = await api.post<ResendOtpResponse>(
    "/brochure/resend-otp",
    payload,
  );

  return response.data;
}

export async function downloadBrochure(
  productSlug: string,
): Promise<DownloadBrochureResponse> {
  const response = await api.get<DownloadBrochureResponse>(
    `/brochure/download/${productSlug}`,
  );

  return response.data;
}

export async function checkBrochureSession(): Promise<boolean> {
  try {
    const response = await api.get<BrochureSessionResponse>(
      "/brochure/session",
    );

    return isSessionAuthenticated(response.data);
  } catch (error) {
    if (isBrochureAuthError(error)) {
      return false;
    }

    throw error;
  }
}

export function startBrochureDownload(downloadUrl?: string) {
  if (!downloadUrl) {
    return;
  }

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.rel = "noopener";
  link.target = "_blank";
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
