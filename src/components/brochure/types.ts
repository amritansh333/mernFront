import { z } from "zod";

export interface BrochureProductContext {
  productId?: string;
  productSlug?: string;
  productName?: string;
  breadcrumbLabels?: string[];
  currentRoute: string;
}

export const brochureFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .min(2, "First name must be at least 2 characters."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .min(2, "Last name must be at least 2 characters."),
  companyName: z
    .string()
    .trim()
    .max(120, "Company name must be 120 characters or less.")
    .optional(),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Enter a valid business email address."),
  mobileNumber: z
    .string()
    .trim()
    .min(1, "Mobile number is required.")
    .regex(
      /^[0-9+\-\s()]{7,20}$/,
      "Enter a valid mobile number with country or area code.",
    ),
});

export type BrochureFormValues = z.infer<typeof brochureFormSchema>;

export interface BrochureSubmissionPayload extends BrochureFormValues {
  companyName?: string;
  product: {
    id?: string;
    slug?: string;
    name?: string;
  };
  currentRoute: string;
  submittedAt: string;
}
