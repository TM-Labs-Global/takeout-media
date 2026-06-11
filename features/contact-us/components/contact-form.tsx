"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import emailjs from "@emailjs/browser";

const inquiryOptions = [
  "Developmental Communications",
  "Brand Strategy",
  "Event Management",
  "Media Planning, Buying & Placement",
  "Digital Marketing",
  "Marketing Activations",
  "Brand Consultancy",
  "Public/Media Relations",
  "Brand Communication",
  "General Enquiry"
];

const fields = [
  { id: "firstName", label: "FIRST NAME", type: "text" },
  { id: "lastName", label: "LAST NAME", type: "text" },
  { id: "phoneNumber", label: "PHONE NUMBER", type: "text" },
  { id: "email", label: "EMAIL", type: "email" },
] as const;

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    additionalMessage: "",
    inquiryTypes: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const isChecked = prev.inquiryTypes.includes(option);
      const updated = isChecked
        ? prev.inquiryTypes.filter((t) => t !== option)
        : [...prev.inquiryTypes, option];
      return { ...prev, inquiryTypes: updated };
    });

    if (errors.inquiryTypes) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.inquiryTypes;
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    // Validate
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (formData.inquiryTypes.length === 0) {
      newErrors.inquiryTypes = "Please select at least one inquiry option";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit to EmailJS
    setIsSubmitting(true);
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phoneNumber,
      inquiry_types: formData.inquiryTypes.join(", "),
      message: formData.additionalMessage,
    };

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitSuccess(true);
        setSubmitMessage("Thank you! Your inquiry has been submitted successfully.");
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          additionalMessage: "",
          inquiryTypes: [],
        });
      })
      .catch((err) => {
        setIsSubmitting(false);
        setSubmitMessage("Something went wrong. Please try again later.");
        console.error("EmailJS Error:", err);
      });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onSubmit={handleSubmit}
      className="flex flex-col w-full lg:max-w-[600px] lg:ml-auto gap-[var(--spacing-10)]"
      data-name="ContactForm"
    >
      {/* Inputs Section */}
      <div className="flex flex-col gap-[var(--spacing-8)] w-full">
        {/* Row 1: First Name & Last Name (same line on tablet/desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[var(--spacing-6)] gap-y-[var(--spacing-8)] w-full">
          {/* First Name */}
          <div className="flex flex-col gap-1 w-full">
            <div className="relative w-full h-[64px] border-b border-heading/20 focus-within:border-[var(--color-primary-500)] transition-colors">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder=" "
                className="absolute bottom-0 left-0 w-full h-[40px] bg-transparent outline-none font-display text-xl font-bold text-[var(--color-primary-500)] placeholder-transparent transition-all peer z-10"
              />
              <label className="absolute left-0 top-[28px] text-heading text-xl font-display font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--color-primary-500)] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75 origin-top-left uppercase">
                FIRST NAME
              </label>
            </div>
            {errors.firstName && (
              <span className="text-[var(--color-error-500)] text-[12px] mt-1">
                {errors.firstName}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1 w-full">
            <div className="relative w-full h-[64px] border-b border-heading/20 focus-within:border-[var(--color-primary-500)] transition-colors">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder=" "
                className="absolute bottom-0 left-0 w-full h-[40px] bg-transparent outline-none font-display text-xl font-bold text-[var(--color-primary-500)] placeholder-transparent transition-all peer z-10"
              />
              <label className="absolute left-0 top-[28px] text-heading text-xl font-display font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--color-primary-500)] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75 origin-top-left uppercase">
                LAST NAME
              </label>
            </div>
            {errors.lastName && (
              <span className="text-[var(--color-error-500)] text-[12px] mt-1">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Email */}
        <div className="flex flex-col gap-1 w-full">
          <div className="relative w-full h-[64px] border-b border-heading/20 focus-within:border-[var(--color-primary-500)] transition-colors">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="absolute bottom-0 left-0 w-full h-[40px] bg-transparent outline-none font-display text-xl font-bold text-[var(--color-primary-500)] placeholder-transparent transition-all peer z-10"
            />
            <label className="absolute left-0 top-[28px] text-heading text-xl font-display font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--color-primary-500)] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75 origin-top-left uppercase">
              EMAIL
            </label>
          </div>
          {errors.email && (
            <span className="text-[var(--color-error-500)] text-[12px] mt-1">
              {errors.email}
            </span>
          )}
        </div>

        {/* Row 3: Phone Number */}
        <div className="flex flex-col gap-1 w-full">
          <div className="relative w-full h-[64px] border-b border-heading/20 focus-within:border-[var(--color-primary-500)] transition-colors">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder=" "
              className="absolute bottom-0 left-0 w-full h-[40px] bg-transparent outline-none font-display text-xl font-bold text-[var(--color-primary-500)] placeholder-transparent transition-all peer z-10"
            />
            <label className="absolute left-0 top-[28px] text-heading text-xl font-display font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--color-primary-500)] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75 origin-top-left uppercase">
              PHONE NUMBER
            </label>
          </div>
          {errors.phoneNumber && (
            <span className="text-[var(--color-error-500)] text-[12px] mt-1">
              {errors.phoneNumber}
            </span>
          )}
        </div>
      </div>

      {/* Inquiry Options (WHAT WOULD YOU LIKE TO INQUIRE ABOUT?) */}
      <div className="mt-[var(--spacing-4)] flex flex-col gap-[var(--spacing-6)]">
        <h3 className="!font-display font-semibold text-xl lg:text-2xl text-heading uppercase m-0">
          WHAT WOULD YOU LIKE TO INQUIRE ABOUT?
        </h3>

        <div className="flex flex-col gap-[var(--spacing-4)]">
          {inquiryOptions.map((option) => (
            <label key={option} className="flex items-center gap-4 cursor-pointer group">
              <div className="relative w-[25px] h-[25px] shrink-0">
                <input
                  type="checkbox"
                  checked={formData.inquiryTypes.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="peer absolute opacity-0 cursor-pointer h-full w-full z-10"
                />
                <div className="absolute inset-0 border border-heading/30 transition-colors peer-checked:border-[var(--color-primary-500)]" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity bg-[var(--color-primary-500)]">
                  <span className="text-white text-xs leading-none">✓</span>
                </div>
              </div>
              <span className="p3-main-body-text !text-[length:var(--text-base)] text-dark-body group-hover:text-black transition-colors leading-[20px]">
                {option}
              </span>
            </label>
          ))}
        </div>

        {errors.inquiryTypes && (
          <p className="text-[var(--color-error-500)] text-[12px] mt-[var(--spacing-1)]">
            {errors.inquiryTypes}
          </p>
        )}
      </div>

      {/* Additional Message */}
      <div className="flex flex-col gap-1 w-full">
        <div className="relative w-full border-b border-heading/20 focus-within:border-[var(--color-primary-500)] transition-colors pt-6">
          <textarea
            name="additionalMessage"
            value={formData.additionalMessage}
            onChange={handleChange}
            placeholder=" "
            rows={6}
            className="w-full bg-transparent outline-none font-sans text-base text-dark-body placeholder-transparent transition-all peer z-10 mt-2 resize-none custom-scrollbar"
          />
          <label className="absolute left-0 top-[28px] text-heading text-xl font-display font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--color-primary-500)] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75 origin-top-left uppercase">
            Additional Message
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        isLoading={isSubmitting}
        variant="primary"
        className="!rounded-none w-full font-display font-bold text-base"
        style={{
          marginTop: "var(--spacing-6)",
          padding: "20px",
        }}
      >
        <span className="btn-label-wrapper">
          <span className="btn-label-text">Submit</span>
        </span>
      </Button>

      {submitMessage && (
        <p
          className="text-[14px] font-semibold"
          style={{
            marginTop: "var(--spacing-3)",
            color: isSubmitSuccess ? "var(--color-success-600)" : "var(--color-error-600)",
          }}
        >
          {submitMessage}
        </p>
      )}
    </motion.form>
  );
}

export default ContactForm;
