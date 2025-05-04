"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Linkedin, Instagram, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  function validate() {
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error || 'Failed to send message.');
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setApiError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-2 py-6 sm:py-10 relative overflow-hidden">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/emineon/video/upload/f_auto,q_auto/contactform_oaktree_sunset_fuwrqx.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <motion.div
        className="flex flex-col items-center w-full relative z-10 min-h-screen justify-center"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex w-full min-h-screen items-center justify-center">
          <div className="bg-white/30 rounded-xl p-2 sm:p-4 max-w-md w-full flex flex-col items-center backdrop-blur-sm border border-white/30 relative">
            {/* Go Back Button */}
            <button
              onClick={() => router.back()}
              className="absolute left-2 top-2 flex items-center gap-1 text-emineon-blue hover:text-emineon-orange text-sm font-medium bg-transparent border-none p-1 focus:outline-none"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <motion.div
              className="mb-2 sm:mb-4 flex justify-center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
              whileHover={{ scale: 1.15 }}
            >
              <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={64} height={64} priority className="drop-shadow" />
            </motion.div>
            <h1 className="text-2xl font-bold text-emineon-blue mb-1 text-center">Contact us</h1>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-4xl mb-4">🎉</div>
                <div className="text-xl font-semibold text-emineon-blue mb-2">Thank you!</div>
                <div className="text-neutral-700">We've received your message and will be in touch soon.</div>
              </motion.div>
            ) : (
              <form className="space-y-5 w-full" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-emineon-blue mb-1">Name *</label>
                  <motion.input
                    whileFocus={{ borderColor: "#C75B12" }}
                    className={`w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-emineon-orange transition ${errors.name ? "border-red-500" : "border-emineon-blue/20"}`}
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                    required
                  />
                  {errors.name && <div id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</div>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-emineon-blue mb-1">Email *</label>
                  <motion.input
                    whileFocus={{ borderColor: "#C75B12" }}
                    className={`w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-emineon-orange transition ${errors.email ? "border-red-500" : "border-emineon-blue/20"}`}
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    required
                  />
                  {errors.email && <div id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</div>}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-emineon-blue mb-1">Company</label>
                  <motion.input
                    whileFocus={{ borderColor: "#C75B12" }}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-emineon-orange border-emineon-blue/20 transition"
                    type="text"
                    name="company"
                    id="company"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-emineon-blue mb-1">Message *</label>
                  <motion.textarea
                    whileFocus={{ borderColor: "#C75B12" }}
                    className={`w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-emineon-orange transition ${errors.message ? "border-red-500" : "border-emineon-blue/20"}`}
                    name="message"
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby="message-error"
                    required
                  />
                  {errors.message && <div id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</div>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-emineon-blue text-white py-2 rounded mb-4"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
                <Button
                  asChild
                  className="w-full bg-emineon-orange text-white hover:bg-emineon-orange/90 py-2 rounded mb-4"
                >
                  <a href="https://calendly.com/david-v-emineon" target="_blank" rel="noopener noreferrer">
                    Book a Discovery Call
                  </a>
                </Button>
                {apiError && <div className="text-red-500 text-xs mt-2 text-center">{apiError}</div>}
              </form>
            )}
          </div>
        </div>
      </motion.div>
      <footer className="w-full flex flex-col items-center mt-8 mb-2 relative z-10">
        <div className="flex gap-6 justify-center">
          <a href="#" aria-label="LinkedIn" className="text-emineon-blue hover:text-emineon-orange transition-colors" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-7 h-7" />
          </a>
          <a href="#" aria-label="X (Twitter)" className="text-emineon-blue hover:text-emineon-orange transition-colors" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M17.5 6.5L6.5 17.5"/><path d="M6.5 6.5l11 11"/></svg>
          </a>
          <a href="#" aria-label="Instagram" className="text-emineon-blue hover:text-emineon-orange transition-colors" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-7 h-7" />
          </a>
        </div>
        <span className="text-xs text-neutral-500 mt-2">© {new Date().getFullYear()} EMINEON. All rights reserved.</span>
      </footer>
    </main>
  );
} 