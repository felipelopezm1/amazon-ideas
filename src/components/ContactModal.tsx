"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";

type ModalType = "partner" | "resident";

interface ContactModalProps {
  type: ModalType;
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ type, open, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) setFile(e.dataTransfer.files[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFile(null);
    }, 300);
  };

  const isPartner = type === "partner";
  const title = isPartner ? "Become a Partner" : "Apply as Resident";
  const subtitle = isPartner
    ? "Tell us about your organization and how you'd like to collaborate with CHAGRA-NET."
    : "Share your background and what draws you to the Amazon corridor.";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--color-dark)]/80 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/8 bg-[#0f2520] p-8 shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-gold)]/10"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round">
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />
                  </svg>
                </motion.div>
                <h3 className="mt-6 text-xl font-semibold text-white">Message Sent</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  Thank you for your interest. We&apos;ll be in touch within 48 hours.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-8 rounded-full bg-white/8 px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:bg-white/12"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)]/60">
                  {isPartner ? "Partnership" : "Residency"}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-white/40">{subtitle}</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <Field label="Full Name" name="name" required />
                  <Field label="Email Address" name="email" type="email" required />

                  {isPartner ? (
                    <>
                      <Field label="Organization" name="organization" />
                      <SelectField
                        label="Partnership Type"
                        name="partnerType"
                        options={[
                          "Research Institution",
                          "NGO / Non-profit",
                          "Corporate / B-Corp",
                          "Government Agency",
                          "Community Organization",
                          "Other",
                        ]}
                      />
                    </>
                  ) : (
                    <>
                      <Field
                        label="Professional Background"
                        name="background"
                        placeholder="e.g. UX Designer, Biologist, Developer..."
                      />
                      <SelectField
                        label="Preferred Port"
                        name="port"
                        options={[
                          "Leticia, Colombia",
                          "La Pedrera, Colombia",
                          "Manaus, Brazil",
                          "Belém, Brazil",
                          "Flexible / Open",
                        ]}
                      />
                      <SelectField
                        label="Intended Duration"
                        name="duration"
                        options={["1 month", "3 months", "6 months", "12+ months"]}
                      />
                    </>
                  )}

                  <TextAreaField
                    label="Message"
                    name="message"
                    placeholder={
                      isPartner
                        ? "How would you like to collaborate?"
                        : "What motivates you to join the corridor?"
                    }
                  />

                  {/* File upload */}
                  <div>
                    <label className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30">
                      {isPartner
                        ? "Attach Proposal (optional)"
                        : "Upload CV / Portfolio (optional)"}
                    </label>
                    <div
                      className={`relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-300 ${
                        dragOver
                          ? "border-[var(--color-gold)]/50 bg-[var(--color-gold)]/5"
                          : "border-white/8 hover:border-white/15"
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileRef.current?.click()}
                    >
                      <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        onChange={(e) =>
                          e.target.files?.[0] && setFile(e.target.files[0])
                        }
                      />
                      {file ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-gold)"
                            strokeWidth="2"
                          >
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                          </svg>
                          <span className="text-sm text-white/60">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                            }}
                            className="ml-2 text-white/30 hover:text-white/60"
                          >
                            &times;
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            opacity="0.25"
                          >
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                          </svg>
                          <p className="mt-2 text-xs text-white/25">
                            Drag & drop or{" "}
                            <span className="text-[var(--color-gold)]/60">
                              browse
                            </span>
                          </p>
                          <p className="mt-1 text-[0.6rem] text-white/15">
                            PDF, DOC, PNG, JPG up to 10 MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[var(--color-gold)] py-3.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--color-dark)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(254,213,131,0.2)]"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--color-gold)]/50">*</span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/90 placeholder-white/15 outline-none transition-all focus:border-[var(--color-gold)]/30 focus:bg-white/[0.05]"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/90 outline-none transition-all focus:border-[var(--color-gold)]/30 focus:bg-white/[0.05]"
      >
        <option value="" className="bg-[#0f2520]">
          Select...
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#0f2520]">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full resize-none rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/90 placeholder-white/15 outline-none transition-all focus:border-[var(--color-gold)]/30 focus:bg-white/[0.05]"
      />
    </div>
  );
}
