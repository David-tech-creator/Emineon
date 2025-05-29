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
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/fr#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Qui sommes-nous
            </Link>
            <Link href="/fr/product" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              <span className="flex items-center gap-1">
                ATS & CRM
                <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-0.5 rounded-full font-semibold">NOUVEAU</span>
              </span>
            </Link>
            <Link href="/fr#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Services
            </Link>
            <Link href="/fr#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Notre approche
            </Link>
            <Link href="/fr#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Expertise
            </Link>
            <Link href="/fr#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Témoignages
            </Link>
            <Link href="/fr/blog" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Blog
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/fr/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">Contactez-nous</Link>
            <LanguageSwitcher currentLang="fr" targetPath="/careers" />
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
              className="fixed inset-0 z-50 bg-black/50 flex"
              onClick={() => setMobileMenuOpen(false)}
            >
              <nav
                className="bg-white w-80 h-full shadow-2xl border-r-4 border-emineon-blue p-6 flex flex-col gap-4"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-emineon-blue">Menu</h3>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl flex items-center justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ×
                  </button>
                </div>
                
                <Link href="/fr#who-we-are" className="py-3 px-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Qui sommes-nous
                </Link>
                <Link href="/fr/product" className="py-3 px-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <span className="flex items-center gap-2">
                    ATS & CRM
                    <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-0.5 rounded-full font-semibold">NOUVEAU</span>
                  </span>
                </Link>
                <Link href="/fr#services" className="py-3 px-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </Link>
                <Link href="/fr#how-we-work" className="py-3 px-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Notre approche
                </Link>
                <Link href="/fr#expertise" className="py-3 px-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Expertise
                </Link>
                <Link href="/fr#testimonials" className="py-3 px-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Témoignages
                </Link>
                <Link href="/fr/blog" className="py-3 px-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Blog
                </Link>
                
                <div className="mt-6 space-y-4">
                  <Link href="/fr/contact" className="bg-emineon-orange hover:bg-emineon-orange/90 text-white rounded-lg px-6 py-3 font-medium w-full text-center block" onClick={() => setMobileMenuOpen(false)}>
                    Contactez-nous
                  </Link>
                  
                  <div className="flex justify-center">
                    <LanguageSwitcher currentLang="fr" targetPath="/careers" />
                  </div>
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
        <h1 className="text-4xl font-bold text-emineon-blue mb-2">Carrières chez Emineon</h1>
        <p className="text-lg text-center max-w-2xl text-foreground">
          Rejoignez notre réseau mondial de professionnels et contribuez à façonner l'avenir du conseil, de la technologie et de l'innovation. Chez Emineon, nous valorisons l'expertise, la diversité et un état d'esprit tourné vers l'avenir. Découvrez nos offres et rejoignez une équipe qui fait la différence.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-emineon-blue mb-4">Postes ouverts</h2>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center min-h-[200px]">
            <p className="text-foreground">Aucun poste ouvert pour le moment. Merci de revenir bientôt ou envoyez-nous votre CV à <a href="mailto:careers@emineon.com" className="text-emineon-blue underline">careers@emineon.com</a>.</p>
          </div>
        </section>
        {/* Emineon Culture Section */}
        <section className="mb-12">
          <div className="bg-emineon-blue/10 border-l-4 border-emineon-blue rounded-lg p-8">
            <h3 className="text-xl font-bold text-emineon-blue mb-2">Notre culture chez Emineon</h3>
            <p className="text-foreground mb-2">Chez Emineon, nous croyons que l'humain est au cœur de l'innovation. Notre culture repose sur la confiance, la collaboration et la volonté d'avoir un impact positif — pour nos clients comme pour nos équipes.</p>
            <ul className="list-disc pl-6 text-foreground space-y-1 mb-2">
              <li><span className="font-semibold text-emineon-blue">Diversité & Inclusion :</span> Nous célébrons la diversité des parcours, des points de vue et des expériences, convaincus qu'elle stimule la créativité et de meilleures solutions.</li>
              <li><span className="font-semibold text-emineon-blue">Esprit de croissance :</span> Nous encourageons l'apprentissage continu, la curiosité et le développement personnel à tous les niveaux.</li>
              <li><span className="font-semibold text-emineon-blue">Flexibilité :</span> Nous favorisons le télétravail, les horaires flexibles et une approche axée sur les résultats qui respecte l'équilibre vie pro/vie perso.</li>
              <li><span className="font-semibold text-emineon-blue">Collaboration :</span> Nous travaillons en équipe, partageons nos connaissances et nous soutenons mutuellement pour atteindre nos objectifs ensemble.</li>
              <li><span className="font-semibold text-emineon-blue">Impact :</span> Nous cherchons à avoir un impact positif pour nos clients, nos collègues et les communautés que nous servons.</li>
            </ul>
            <p className="text-foreground">Si vous souhaitez rejoindre une équipe ambitieuse, bienveillante et tournée vers l'avenir, Emineon est fait pour vous.</p>
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-emineon-blue text-white w-full" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', width: '100vw' }}>
        <div className="max-w-3xl mx-auto flex flex-col items-center px-4">
          <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="mb-2 mx-auto">
            <Image src="/Emineon logo_tree_white.png" alt="Emineon logo" width={120} height={120} className="mb-2 mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Construisons votre équipe internationale</h2>
          <p className="text-xl opacity-80 mb-8">
            Prêt à surmonter la pénurie de talents et à accéder à des professionnels d'exception dans le monde entier ? Démarrons la conversation.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-2">
              <p className="font-medium">David Vinkenroye</p>
              <p className="opacity-80">Fondateur & Associé, EMINEON</p>
              <p className="opacity-80">david.v@emineon.com</p>
              <p className="opacity-80">+41 (0) 795 33 28 709</p>
            </div>
            <div className="md:ml-auto">
              <Link href="/fr/contact" className="bg-white text-emineon-blue hover:bg-blue-50 rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">Contactez-nous</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 text-center">
            <p className="text-base sm:text-lg font-medium text-emineon-orange tracking-widest lowercase mb-1">forgez votre avantage.</p>
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