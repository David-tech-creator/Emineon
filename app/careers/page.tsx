"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Menu } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function CareersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-foreground flex flex-col items-center p-8">
      <header className="fixed top-0 left-0 z-50 w-[100vw] border-b bg-white/80 backdrop-blur-md" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', width: '100vw' }}>
        <div className="flex h-20 items-center justify-between py-4 px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={48} height={48} />
              </motion.div>
              <span className="flex flex-col leading-tight">
                <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
                <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase">forge your edge.</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Who we are
            </Link>
            <Link href="/#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Services
            </Link>
            <Link href="/#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              How we work
            </Link>
            <Link href="/#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Expertise
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Testimonials
            </Link>
            <Link href="/blog" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Blog
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">Contact us</Link>
            <LanguageSwitcher currentLang="en" targetPath="/careers" />
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-emineon-blue ml-auto"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-7 h-7 text-emineon-blue" />
          </button>
          {/* Mobile menu drawer */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/40 flex"
              tabIndex={-1}
              aria-modal="true"
              role="dialog"
              onClick={() => setMobileMenuOpen(false)}
            >
              <nav
                className="bg-gray-50 w-72 max-w-full h-full shadow-xl p-6 flex flex-col gap-4 relative"
                onClick={e => e.stopPropagation()}
                aria-label="Mobile menu"
              >
                <button
                  className="absolute top-4 right-4 text-emineon-blue text-2xl focus:outline-none"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ×
                </button>
                <Link href="/#who-we-are" className="py-4 px-4 text-xl font-semibold text-emineon-blue hover:text-white hover:bg-emineon-blue rounded-lg transition-all duration-200 bg-white border border-gray-100 shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                  Who we are
                </Link>
                <Link href="/#services" className="py-4 px-4 text-xl font-semibold text-emineon-blue hover:text-white hover:bg-emineon-blue rounded-lg transition-all duration-200 bg-white border border-gray-100 shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </Link>
                <Link href="/#how-we-work" className="py-4 px-4 text-xl font-semibold text-emineon-blue hover:text-white hover:bg-emineon-blue rounded-lg transition-all duration-200 bg-white border border-gray-100 shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                  How we work
                </Link>
                <Link href="/#expertise" className="py-4 px-4 text-xl font-semibold text-emineon-blue hover:text-white hover:bg-emineon-blue rounded-lg transition-all duration-200 bg-white border border-gray-100 shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                  Expertise
                </Link>
                <Link href="/#testimonials" className="py-4 px-4 text-xl font-semibold text-emineon-blue hover:text-white hover:bg-emineon-blue rounded-lg transition-all duration-200 bg-white border border-gray-100 shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                  Testimonials
                </Link>
                <Link href="/blog" className="py-4 px-4 text-xl font-semibold text-emineon-blue hover:text-white hover:bg-emineon-blue rounded-lg transition-all duration-200 bg-white border border-gray-100 shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                  Blog
                </Link>
                <Link href="/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg mt-6 w-full text-center block">Contact us</Link>
                <div className="flex justify-center mt-4">
                  <LanguageSwitcher currentLang="en" targetPath="/careers" />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <header className="w-full flex flex-col items-center mb-12 mt-8 pt-20">
        <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
          <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={80} height={80} className="mb-4" />
        </motion.div>
        <h1 className="text-4xl font-bold text-emineon-blue mb-2">Careers at Emineon</h1>
        <p className="text-lg text-center max-w-2xl text-foreground">
          Join our global network of professionals and help shape the future of consulting, technology, and innovation. At Emineon, we value expertise, diversity, and a forward-thinking mindset. Explore our open positions and become part of a team that makes a difference.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-emineon-blue mb-4">Open Positions</h2>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center min-h-[200px]">
            <p className="text-foreground">No open positions at the moment. Please check back soon or send us your CV at <a href="mailto:careers@emineon.com" className="text-emineon-blue underline">careers@emineon.com</a>.</p>
          </div>
        </section>
        {/* Emineon Culture Section */}
        <section className="mb-12">
          <div className="bg-emineon-blue/10 border-l-4 border-emineon-blue rounded-lg p-8">
            <h3 className="text-xl font-bold text-emineon-blue mb-2">Our culture at Emineon</h3>
            <p className="text-foreground mb-2">At Emineon, we believe that people are the heart of innovation. Our culture is built on trust, collaboration, and a passion for making a difference—both for our clients and for each other.</p>
            <ul className="list-disc pl-6 text-foreground space-y-1 mb-2">
              <li><span className="font-semibold text-emineon-blue">Diversity & Inclusion:</span> We celebrate diverse backgrounds, perspectives, and experiences, knowing they drive creativity and better solutions.</li>
              <li><span className="font-semibold text-emineon-blue">Growth Mindset:</span> We encourage continuous learning, curiosity, and personal development at every level.</li>
              <li><span className="font-semibold text-emineon-blue">Flexibility:</span> We embrace remote work, flexible hours, and a results-driven approach that values work-life balance.</li>
              <li><span className="font-semibold text-emineon-blue">Collaboration:</span> We work as one team, supporting each other and sharing knowledge to achieve our goals together.</li>
              <li><span className="font-semibold text-emineon-blue">Impact:</span> We strive to make a positive impact for our clients, our colleagues, and the communities we serve.</li>
            </ul>
            <p className="text-foreground">If you want to be part of a forward-thinking, supportive, and ambitious team, Emineon is the place for you.</p>
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-emineon-blue text-white w-full" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', width: '100vw' }}>
        <div className="max-w-3xl mx-auto flex flex-col items-center px-4">
          <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="mb-2 mx-auto">
            <Image src="/Emineon logo_tree_white.png" alt="Emineon logo" width={120} height={120} className="mb-2 mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Let's build your global team</h2>
          <p className="text-xl opacity-80 mb-8">
            Ready to overcome talent shortages and access exceptional professionals worldwide? Let's start the conversation.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-2">
              <p className="font-medium">David Vinkenroye</p>
              <p className="opacity-80">Founder & Partner, EMINEON</p>
              <p className="opacity-80">david.v@emineon.com</p>
              <p className="opacity-80">+41 (0) 795 33 28 709</p>
            </div>
            <div className="md:ml-auto">
              <Link href="/contact" className="bg-white text-emineon-blue hover:bg-blue-50 rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">Contact us</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 text-center">
            <p className="text-base sm:text-lg font-medium text-emineon-orange tracking-widest lowercase mb-1">forge your edge.</p>
            <p className="text-sm opacity-60">www.emineon.com</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-emineon-dark text-white/60 w-full" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', width: '100vw' }}>
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
            <Link href="#" className="text-sm hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 