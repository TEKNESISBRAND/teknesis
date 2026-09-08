"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const PROJECT_TYPES = [
  "Branding",
  "Web design",
  "Web development",
  "Social media",
  "Other",
];

type Errors = Record<string, string>;

// Sizes track the site's own scale — body copy is 2.6rem, so inputs sit above it.
const fieldClasses =
  "w-full bg-transparent border-b border-[#1b1b1b] border-opacity-25 focus:border-opacity-100 outline-none text-[#1b1b1b] placeholder:text-[#1b1b1b] placeholder:text-opacity-40 text-[2.8rem] md:text-[3rem] py-5 transition-colors";

const labelClasses =
  "block text-[2.1rem] md:text-[2.2rem] text-[#1b1b1b] text-opacity-60 mb-2";

const errorClasses = "text-[1.9rem] md:text-[2rem] text-red-600 mt-3";

export default function ContactForm() {
  const [projectType, setProjectType] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState("");

  // Drop a field's error as soon as it's being fixed — a stale "Please tell us
  // your name" under a filled-in name field reads as broken.
  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFormError("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      projectType,
      budget: String(data.get("budget") ?? ""),
      timeline: String(data.get("timeline") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    setStatus("sending");
    setErrors({});
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("idle");
        if (result.errors) setErrors(result.errors);
        setFormError(
          result.error ?? "Something went wrong. Please check the form."
        );
        return;
      }

      form.reset();
      setProjectType("");
      setStatus("sent");
    } catch {
      setStatus("idle");
      setFormError("Couldn't reach the server. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-[#1b1b1b]">
        <p className="text-[4rem] md:text-[6rem] leading-none font-extrabold">
          Thank you.
        </p>
        <p className="mt-6 text-[2.6rem] md:text-[2.8rem] text-[#1b1b1b] text-opacity-70">
          We&apos;ve got your brief and will be in touch shortly.
        </p>
        <div className="flex flex-wrap gap-6 mt-12">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="border border-[#1b1b1b] text-[#1b1b1b] px-14 pb-[6px] flex items-center justify-center rounded-full leading-none text-[2.6rem] h-[86px] w-max"
          >
            Send another
          </button>
          <Link
            href="/"
            className="bg-[#1b1b1b] text-white px-14 pb-[6px] flex items-center justify-center rounded-full leading-none font-bold text-[2.6rem] h-[86px] w-max"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute w-px h-px -left-[9999px] overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="flex-1">
          <label className={labelClasses} htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={() => clearError("name")}
            className={fieldClasses}
          />
          {errors.name && (
            <p id="name-error" role="alert" className={errorClasses}>
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex-1">
          <label className={labelClasses} htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={() => clearError("email")}
            className={fieldClasses}
          />
          {errors.email && (
            <p id="email-error" role="alert" className={errorClasses}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-12">
        <legend className={labelClasses}>Project type *</legend>
        <div className="flex flex-wrap gap-4 mt-2">
          {PROJECT_TYPES.map((type) => {
            const selected = projectType === type;
            return (
              <button
                key={type}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setProjectType(type);
                  clearError("projectType");
                }}
                className={`px-8 py-4 rounded-full text-[2.1rem] md:text-[2.2rem] leading-none border transition-colors ${
                  selected
                    ? "bg-[#1b1b1b] text-white border-[#1b1b1b]"
                    : "bg-[#f3f3f3] text-[#1b1b1b] border-transparent hover:border-[#1b1b1b]"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
        {errors.projectType && (
          <p role="alert" className={errorClasses}>
            {errors.projectType}
          </p>
        )}
      </fieldset>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
        <div className="flex-1">
          <label className={labelClasses} htmlFor="budget">
            Budget
          </label>
          <input
            id="budget"
            name="budget"
            type="text"
            placeholder="e.g. ₦500,000"
            className={fieldClasses}
          />
        </div>

        <div className="flex-1">
          <label className={labelClasses} htmlFor="timeline">
            Timeline
          </label>
          <input
            id="timeline"
            name="timeline"
            type="text"
            placeholder="e.g. 6 weeks"
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="mt-12">
        <label className={labelClasses} htmlFor="message">
          Project details *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="What are you building, and what does success look like?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={() => clearError("message")}
          className={`${fieldClasses} resize-none`}
        />
        {errors.message && (
          <p id="message-error" role="alert" className={errorClasses}>
            {errors.message}
          </p>
        )}
      </div>

      {formError && (
        <p role="alert" className={`${errorClasses} mt-10`}>
          {formError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6 mt-12">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-[#1b1b1b] text-white px-14 pb-[6px] flex items-center justify-center rounded-full leading-none font-bold text-[2.6rem] h-[86px] w-max disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending…" : "Send brief"}
        </button>

        <Link
          href="/"
          className="border border-[#1b1b1b] text-[#1b1b1b] px-14 pb-[6px] flex items-center justify-center rounded-full leading-none text-[2.6rem] h-[86px] w-max"
        >
          Go Home
        </Link>
      </div>
    </form>
  );
}
