"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Linkedin, Instagram } from "lucide-react";

function VettingProcessCard({ title, description, hoverDetail }: { title: string; description: string; hoverDetail: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={`rounded-xl bg-white border border-emineon-blue/10 shadow p-8 transition-all duration-300 cursor-pointer relative overflow-hidden`}
      initial={{ y: 0, boxShadow: "0 4px 24px 0 rgba(10,47,90,0.06)" }}
      animate={{ y: hovered ? -8 : 0, boxShadow: hovered ? "0 8px 32px 0 rgba(10,47,90,0.12)" : "0 4px 24px 0 rgba(10,47,90,0.06)" }}
      whileHover={{ scale: 1.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: 220 }}
    >
      <motion.h3
        className="text-xl font-bold text-emineon-blue mb-3"
        initial={false}
        animate={{ color: hovered ? "#C75B12" : "#0A2F5A" }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-neutral-700 mb-2"
        initial={false}
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -10 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="hoverDetail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-xl p-4 border border-emineon-blue/10"
          >
            <span className="text-emineon-blue font-medium text-center text-base">{hoverDetail}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function VettingProcessSection() {
  const cards = [
    {
      title: "Technical & Cognitive",
      description: "Rigorous skills and problem-solving assessments",
      hoverDetail: "Real-world scenarios and technical interviews ensure only the best join our network.",
    },
    {
      title: "Cultural Fit",
      description: "360° immersion in your company culture",
      hoverDetail: "We assess communication, values, and adaptability for seamless integration.",
    },
    {
      title: "De-risked Engagement",
      description: "3-month trial commitment for peace of mind",
      hoverDetail: "If it's not the right fit within 3 months, you're covered—no long-term risk.",
    },
  ];
  return (
    <section className="w-full max-w-4xl mb-16">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-emineon-blue mb-12 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Our vetting process
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <VettingProcessCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

export default function FindTalentPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
      {/* Header (same as homepage) */}
      <header className="sticky top-0 z-40 border-b bg-white w-full">
        <div className="container flex h-20 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={48} height={48} />
              </motion.div>
              <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Who we are</Link>
            <Link href="/#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Services</Link>
            <Link href="/#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">How we work</Link>
            <Link href="/#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Expertise</Link>
            <Link href="/#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Testimonials</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-6"><Link href="/contact">Contact us</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-emineon-blue text-white py-16 flex flex-col items-center text-center px-4">
        <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="mb-2">
          <Image src="/Emineon logo_tree_white.png" alt="Emineon Logo" width={120} height={120} className="mb-2" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Access elite, vetted consultants fast</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">Tailored for your culture and your needs</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8 font-semibold" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}>Get started</Button>
        </div>
      </section>

      {/* Needs Analysis Form */}
      <section ref={formRef} className="w-full max-w-2xl bg-white rounded-lg shadow p-4 sm:p-8 mt-8 sm:mt-12 mb-12 sm:mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold text-emineon-blue mb-4">Tell us what you need</h2>
        <form className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Industry</label>
            <input className="border rounded p-2" type="text" placeholder="e.g. Finance, Life Sciences" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Type of role</label>
            <input className="border rounded p-2" type="text" placeholder="e.g. Project Manager, Cloud Engineer" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Location or remote preference</label>
            <input className="border rounded p-2" type="text" placeholder="e.g. Geneva, Remote" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Duration</label>
            <input className="border rounded p-2" type="text" placeholder="e.g. 6 months" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Budget range <span className="text-xs text-neutral-400">(optional)</span></label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex gap-2 w-full">
                <select className="border rounded p-2" defaultValue="CHF" style={{ minWidth: 80 }}>
                  <option value="CHF">CHF</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
                <input className="border rounded p-2 flex-1" type="text" placeholder="e.g. 800–1200 or 50k–100k" />
              </div>
              <select className="border rounded p-2" defaultValue="daily">
                <option value="daily">Daily rate</option>
                <option value="total">Total project budget</option>
              </select>
            </div>
            <span className="text-xs text-neutral-500">Choose whether your budget is a daily rate or a total project estimate.</span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Start date</label>
            <input className="border rounded p-2" type="date" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Language/cultural requirements</label>
            <input className="border rounded p-2" type="text" placeholder="e.g. Bilingual French/German" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Project description / requirements</label>
            <textarea className="border rounded p-2" rows={4} placeholder="Describe your project, requirements, or any other details..." />
          </div>
        </form>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-2xl mb-24 flex flex-col items-center text-center">
        <motion.h2
          className="text-2xl font-bold text-emineon-blue mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to build your team?
        </motion.h2>
        <motion.p
          className="text-neutral-700 mb-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Book a 15-min discovery call or request profiles now.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="https://calendly.com/your-calendly-link"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(10,47,90,0.12)' }}
            className="inline-block"
          >
            <Button className="bg-emineon-blue text-white px-8 py-3 rounded">Book a Discovery Call</Button>
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(199,91,18,0.12)' }}
            className="inline-block"
          >
            <Button className="bg-emineon-orange text-white px-8 py-3 rounded">Just send me profiles</Button>
          </motion.div>
        </div>
      </section>

      {/* Vetting Process */}
      <VettingProcessSection />

      {/* Final CTA (copied from homepage) */}
      <section className="py-20 bg-emineon-blue text-white w-full">
        <div className="container">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="mb-2 mx-auto">
              <Image src="/Emineon logo_tree_white.png" alt="Emineon logo" width={120} height={120} />
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Let's build your global team</h2>
            <p className="text-xl opacity-80 mb-8">
              Ready to overcome talent shortages and access exceptional professionals worldwide? Let's start the
              conversation.
            </p>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="space-y-2">
                <p className="font-medium">David Vinkenroye</p>
                <p className="opacity-80">Founder & Partner, EMINEON</p>
                <p className="opacity-80">david.v@emineon.com</p>
                <p className="opacity-80">+41 (0) 79 533 28 09</p>
              </div>
              <div className="md:ml-auto">
                <Button asChild className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8"><Link href="/contact">Contact us</Link></Button>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <p className="text-sm uppercase tracking-widest opacity-60">forge your edge.</p>
              <p className="text-sm opacity-60">www.emineon.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (copied from homepage) */}
      <footer className="py-8 bg-emineon-dark text-white/60 w-full">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="h-10 w-auto">
              <Image src="/Emineon logo_tree_white.png" alt="Emineon logo" height={40} width={40} />
            </motion.div>
            <span className="text-sm hidden md:inline">© {new Date().getFullYear()} EMINEON. All rights reserved.</span>
            <div className="flex gap-4 ml-4">
              <a href="#" aria-label="LinkedIn" className="text-white/80 hover:text-emineon-orange transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" aria-label="X (Twitter)" className="text-white/80 hover:text-emineon-orange transition-colors" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M17.5 6.5L6.5 17.5"/><path d="M6.5 6.5l11 11"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-white/80 hover:text-emineon-orange transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          <span className="text-sm md:hidden text-center block mt-2">© {new Date().getFullYear()} EMINEON. All rights reserved.</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 