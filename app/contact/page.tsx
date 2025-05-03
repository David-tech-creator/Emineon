"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    // Simulate submit
    setTimeout(() => setSubmitted(true), 800);
  }

  return (
    <main className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-emineon-blue mb-2 text-center">Contact us</h1>
        <p className="text-neutral-700 mb-8 text-center">Let's start the conversation. Fill out the form and our team will get back to you promptly.</p>
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
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
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
            <Button type="submit" className="w-full bg-emineon-blue hover:bg-emineon-orange text-white rounded-none px-8 py-2 text-lg font-semibold transition-all">Send message</Button>
          </form>
        )}
      </motion.div>
    </main>
  );
} 