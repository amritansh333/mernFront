import api from "@/lib/api";

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
  otp?: string;
}

export interface VerifyOtpPayload {
  mobileNumber: string;
  otp: string;
}

export interface VerifyOtpResponse {
  sessionToken: string;
}

export interface ResendOtpPayload {
  mobileNumber: string;
}

export interface ResendOtpResponse {
  success?: boolean;
  message?: string;
  expiresAt?: string;
  otp?: string;
}

export interface DownloadBrochureResponse {
  success?: boolean;
  message?: string;
  downloadUrl?: string;
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
  sessionToken: string,
): Promise<DownloadBrochureResponse> {
  const response = await api.get<DownloadBrochureResponse>(
    `/brochure/download/${productSlug}`,
    {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    },
  );

  return response.data;
}
