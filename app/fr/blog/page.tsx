"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8f8]">
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="container flex h-20 items-center justify-between py-4 relative">
          <div className="flex items-center gap-2">
            <Link href="/fr" className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={48} height={48} />
              </motion.div>
              <span className="flex flex-col leading-tight">
                <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
                <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase">forgez votre avantage.</span>
              </span>
            </Link>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/fr#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Qui sommes-nous</Link>
            <Link href="/fr#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Services</Link>
            <Link href="/fr#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Notre approche</Link>
            <Link href="/fr#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Expertise</Link>
            <Link href="/fr#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Témoignages</Link>
            <Link href="/fr/blog" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Blog</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-6"><Link href="/fr/contact">Contactez-nous</Link></Button>
            <Button asChild variant="ghost" className="p-0 h-auto min-w-0 shadow-none border-none bg-transparent hover:bg-transparent focus:ring-0 focus:outline-none transition-transform hover:scale-110" aria-label="Voir en anglais">
              <Link href="/" prefetch={false} className="flex items-center gap-2 px-3 py-1 rounded-full border border-emineon-blue bg-white/90 hover:bg-emineon-blue/10 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emineon-orange" title="Voir en anglais">
                <span className="w-5 h-5">
                  {/* SVG UK flag */}
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className="inline-block align-middle">
                    <rect width="24" height="24" fill="#012169" rx="3"/>
                    <path d="M0 0L24 24M24 0L0 24" stroke="#fff" strokeWidth="2.5"/>
                    <path d="M0 0L24 24M24 0L0 24" stroke="#C8102E" strokeWidth="1.2"/>
                    <rect x="10.2" width="3.6" height="24" fill="#fff"/>
                    <rect y="10.2" width="24" height="3.6" fill="#fff"/>
                    <rect x="11.1" width="1.8" height="24" fill="#C8102E"/>
                    <rect y="11.1" width="24" height="1.8" fill="#C8102E"/>
                  </svg>
                </span>
                <span className="font-semibold text-emineon-blue group-hover:text-emineon-orange">EN</span>
              </Link>
            </Button>
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
                className="bg-white w-72 max-w-full h-full shadow-lg p-6 flex flex-col gap-6 relative"
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
                <Link href="/fr#who-we-are" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Qui sommes-nous
                </Link>
                <Link href="/fr#services" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </Link>
                <Link href="/fr#how-we-work" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Notre approche
                </Link>
                <Link href="/fr#expertise" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Expertise
                </Link>
                <Link href="/fr#testimonials" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Témoignages
                </Link>
                <Link href="/fr/blog" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Blog
                </Link>
                <Button asChild variant="ghost" className="p-0 h-auto min-w-0 shadow-none border-none bg-transparent hover:bg-transparent focus:ring-0 focus:outline-none transition-transform hover:scale-110 mt-2 w-full justify-center" aria-label="Voir en anglais">
                  <Link href="/" prefetch={false} className="flex items-center gap-2 px-3 py-1 rounded-full border border-emineon-blue bg-white/90 hover:bg-emineon-blue/10 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emineon-orange" title="Voir en anglais">
                    <span className="w-5 h-5">
                      {/* SVG UK flag */}
                      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className="inline-block align-middle">
                        <rect width="24" height="24" fill="#012169" rx="3"/>
                        <path d="M0 0L24 24M24 0L0 24" stroke="#fff" strokeWidth="2.5"/>
                        <path d="M0 0L24 24M24 0L0 24" stroke="#C8102E" strokeWidth="1.2"/>
                        <rect x="10.2" width="3.6" height="24" fill="#fff"/>
                        <rect y="10.2" width="24" height="3.6" fill="#fff"/>
                        <rect x="11.1" width="1.8" height="24" fill="#C8102E"/>
                        <rect y="11.1" width="24" height="1.8" fill="#C8102E"/>
                      </svg>
                    </span>
                    <span className="font-semibold text-emineon-blue group-hover:text-emineon-orange">EN</span>
                  </Link>
                </Button>
                <Button asChild className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-6 mt-6 w-full"><Link href="/fr/contact">Contactez-nous</Link></Button>
              </nav>
            </div>
          )}
        </div>
      </header>
      {/* Hero Section (static, no video) */}
      <section className="w-full py-20 bg-emineon-blue flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Blog Emineon</h1>
        <p className="text-lg text-white/80 max-w-2xl text-center mx-auto">Analyses, actualités et ressources sur le talent global, l'innovation et le futur du travail.</p>
      </section>
      <main className="flex-1 w-full flex flex-col items-center px-4 py-16">
        <motion.div
          className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full flex flex-col items-center justify-center min-h-[200px]">
            <p className="text-neutral-400">Aucun article pour le moment. Revenez bientôt !</p>
          </div>
        </motion.div>
      </main>
      <footer className="py-8 bg-emineon-dark text-white/60">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="h-10 w-auto">
              <Image src="/Emineon logo_tree_white.png" alt="Emineon logo" height={40} width={40} />
            </motion.div>
            <span className="text-sm hidden md:inline">© {new Date().getFullYear()} EMINEON. Tous droits réservés.</span>
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
          <span className="text-sm md:hidden text-center block mt-2">© {new Date().getFullYear()} EMINEON. Tous droits réservés.</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-white">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              Conditions d'utilisation
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