import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Mail, Phone, UserRound } from "lucide-react";
import "./brochure-phone.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Controller } from "react-hook-form";

import {
  brochureFormSchema,
  type BrochureFormValues,
  type BrochureSubmissionPayload,
  type BrochureProductContext,
} from "./types";

interface BrochureFormProps {
  productContext: BrochureProductContext;
  onSubmitted: (payload: BrochureSubmissionPayload) => void;
}

const fieldClassName =
  "h-11 w-full border border-[#C7D9E6] bg-white/85 px-3 text-sm text-[#0F2A3D] shadow-sm outline-none transition-all placeholder:text-[#8CA4B8] focus:border-[#279ECE] focus:bg-white focus:ring-2 focus:ring-[#279ECE]/20";

const labelClassName = "text-sm font-semibold text-[#0F2A3D]";
const errorClassName = "mt-1.5 text-xs font-medium text-red-600";

export default function BrochureForm({
  productContext,
  onSubmitted,
}: BrochureFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<BrochureFormValues>({
    resolver: zodResolver(brochureFormSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      mobileNumber: "",
    },
  });

  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  const onSubmit = (values: BrochureFormValues) => {
    const payload: BrochureSubmissionPayload = {
      ...values,
      companyName: values.companyName?.trim() || undefined,
      product: {
        id: productContext.productId,
        slug: productContext.productSlug,
        name: productContext.productName,
      },
      currentRoute: productContext.currentRoute,
      submittedAt: new Date().toISOString(),
    };

    console.log("Product brochure request", payload);
    onSubmitted(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="brochure-first-name" className={labelClassName}>
            First Name
          </label>
          <div className="relative mt-2">
            <UserRound
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8CA4B8]"
              aria-hidden="true"
            />
            <input
              id="brochure-first-name"
              type="text"
              autoComplete="given-name"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={
                errors.firstName ? "brochure-first-name-error" : undefined
              }
              className={`${fieldClassName} pl-10`}
              placeholder="John"
              {...register("firstName")}
            />
          </div>
          {errors.firstName && (
            <p id="brochure-first-name-error" className={errorClassName}>
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="brochure-last-name" className={labelClassName}>
            Last Name
          </label>
          <div className="relative mt-2">
            <UserRound
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8CA4B8]"
              aria-hidden="true"
            />
            <input
              id="brochure-last-name"
              type="text"
              autoComplete="family-name"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={
                errors.lastName ? "brochure-last-name-error" : undefined
              }
              className={`${fieldClassName} pl-10`}
              placeholder="Doe"
              {...register("lastName")}
            />
          </div>
          {errors.lastName && (
            <p id="brochure-last-name-error" className={errorClassName}>
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="brochure-company-name" className={labelClassName}>
          Company Name{" "}
          <span className="font-normal text-[#5C7696]">(optional)</span>
        </label>
        <input
          id="brochure-company-name"
          type="text"
          autoComplete="organization"
          aria-invalid={Boolean(errors.companyName)}
          aria-describedby={
            errors.companyName ? "brochure-company-name-error" : undefined
          }
          className={`${fieldClassName} mt-2`}
          placeholder="Acme Inc."
          {...register("companyName")}
        />
        {errors.companyName && (
          <p id="brochure-company-name-error" className={errorClassName}>
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="brochure-email" className={labelClassName}>
          Email
        </label>
        <div className="relative mt-2">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8CA4B8]"
            aria-hidden="true"
          />
          <input
            id="brochure-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "brochure-email-error" : undefined}
            className={`${fieldClassName} pl-10`}
            placeholder="john.doe@acme.com"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p id="brochure-email-error" className={errorClassName}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClassName}>Mobile Number</label>

        <div className="mt-2">
          <Controller
            control={control}
            name="mobileNumber"
            render={({ field }) => (
              <PhoneInput
                country="in"
                enableSearch
                value={field.value}
                onChange={field.onChange}
                inputProps={{
                  name: field.name,
                  autoComplete: "tel",
                }}
                containerClass="brochure-phone-container"
                inputClass="brochure-phone-input"
                buttonClass="brochure-phone-button"
                dropdownClass="brochure-phone-dropdown"
                searchClass="brochure-phone-search"
              />
            )}
          />
        </div>

        {errors.mobileNumber && (
          <p className={errorClassName}>{errors.mobileNumber.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 border border-[#279ECE] bg-[#279ECE] px-5 text-sm font-semibold text-white shadow-lg shadow-[#279ECE]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1F7FA8] focus:outline-none focus:ring-2 focus:ring-[#279ECE] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Get{" "}
        {productContext.productName
          ? `${productContext.productName} Brochure`
          : "Product Brochure"}
      </button>
    </form>
  );
}
