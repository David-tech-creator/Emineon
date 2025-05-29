"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Users, Menu, Linkedin, Instagram, Maximize2, Pause, Play, Volume2, VolumeX, Search, MessageSquare, Calendar, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import LanguageSwitcher from "@/components/LanguageSwitcher"

function RemoteWorkCard({ title, description, hoverDetail }: { title: string; description: string; hoverDetail: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={`rounded-xl bg-white border border-emineon-blue/10 shadow p-8 transition-all duration-300 cursor-pointer relative overflow-hidden`}
      initial={{ y: 0, boxShadow: "0 4px 24px 0 rgba(10,47,90,0.06)" }}
      animate={{ y: hovered ? -8 : 0, boxShadow: hovered ? "0 8px 32px 0 rgba(10,47,90,0.12)" : "0 4px 24px 0 rgba(10,47,90,0.06)" }}
      whileHover={{ scale: 1.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: 260 }}
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

function BottomBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none"
      style={{ willChange: 'transform, opacity' }}
    >
      <a
        href="/fr/find-talent"
        className="pointer-events-auto flex items-center gap-3 bg-emineon-blue text-white px-6 py-4 rounded-t-xl shadow-lg hover:bg-emineon-orange transition-colors duration-200 text-lg font-semibold"
        style={{ minWidth: 320, maxWidth: 480 }}
      >
        <Users className="w-6 h-6 text-white" />
        <span>Construisons votre équipe internationale</span>
      </a>
    </motion.div>
  );
}

export default function Home() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    const section = document.getElementById("get-started-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
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
            <Link href="#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Qui nous sommes
            </Link>
            <Link href="/fr/product" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-orange after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              <span className="flex items-center gap-1">
                ATS & CRM
                <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-0.5 rounded-full font-semibold">NOUVEAU</span>
              </span>
            </Link>
            <Link href="#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Services
            </Link>
            <Link href="#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Notre approche
            </Link>
            <Link href="#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Expertise
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Témoignages
            </Link>
            <Link href="/fr/blog" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Blog
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/fr/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">Contactez-nous</Link>
            <LanguageSwitcher currentLang="fr" />
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
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Menu panel */}
              <div className="relative bg-white h-full w-64 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                  <span className="text-lg font-semibold text-emineon-blue">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
                
                {/* Navigation links */}
                <div className="py-4 bg-white">
                  {[
                    { href: "#who-we-are", label: "Qui nous sommes" },
                    { href: "/fr/product", label: "ATS & CRM", isNew: true },
                    { href: "#services", label: "Services" },
                    { href: "#how-we-work", label: "Notre approche" },
                    { href: "#expertise", label: "Expertise" },
                    { href: "#testimonials", label: "Témoignages" },
                    { href: "/fr/blog", label: "Blog" }
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                        {link.isNew && (
                          <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-0.5 rounded-full font-semibold">NOUVEAU</span>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
                
                {/* Contact button and language switcher */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
                  <Link 
                    href="/fr/contact" 
                    className="block w-full bg-emineon-blue text-white text-center py-3 px-4 rounded-md font-medium mb-3 hover:bg-emineon-blue/90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contactez-nous
                  </Link>
                  
                  <div className="flex justify-center">
                    <LanguageSwitcher currentLang="fr" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="https://res.cloudinary.com/emineon/video/upload/f_auto,q_auto/Homepage_hero_video_dsn3zo.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="container relative z-20 flex flex-col lg:flex-row items-center gap-12 py-20 md:py-28">
            <div className="space-y-6 lg:w-1/2 text-center lg:text-left">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Votre partenaire pour la croissance<br className="hidden md:block" /> et l'innovation
              </motion.h1>
              <p className="text-xl text-white/90 max-w-xl mx-auto lg:mx-0 drop-shadow-md">
                Chez Emineon Consulting, nous optimisons vos opérations, stimulons une croissance durable et proposons des services sur mesure pour chaque secteur.
              </p>
              <div className="pt-4">
                <p className="text-base sm:text-lg font-medium text-emineon-orange tracking-widest lowercase mb-2">forgez votre avantage.</p>
                <p className="text-sm text-white/80 italic">
                  [fɔʁʒ] verbe – créer quelque chose de fort, durable ou couronné de succès.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center lg:items-start justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-emineon-orange hover:bg-emineon-orange/90 text-white rounded-none px-8"
                  onClick={handleGetStarted}
                >
                  Commencer
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 hidden lg:block" />
          </div>
        </section>

        {/* Find a Job / Hire Talent Section */}
        <section id="get-started-section" className="py-16 bg-emineon-blue text-white scroll-mt-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Que recherchez-vous ?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Que vous cherchiez de nouvelles opportunités ou que vous souhaitiez renforcer votre équipe, EMINEON connecte des talents d'exception avec des organisations visionnaires.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-8 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-all">
                <h3 className="text-2xl font-bold mb-4">Trouver un emploi</h3>
                <p className="mb-6">
                  Rejoignez notre réseau exclusif de professionnels internationaux. Accédez à des opportunités auprès des plus grandes entreprises européennes et faites progresser votre carrière.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Accédez à des opportunités exclusives auprès d'entreprises de premier plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Bénéficiez de notre expertise en placement et de notre accompagnement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Développez votre carrière grâce à des partenariats durables</span>
                  </li>
                </ul>
                <Button className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8" asChild>
                  <Link href="/fr/careers">
                    Rejoindre en tant que talent <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-white/10 p-8 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-all">
                <h3 className="text-2xl font-bold mb-4">Recruter des talents</h3>
                <p className="mb-6">
                  Accédez à notre vivier de professionnels rigoureusement sélectionnés dans de multiples disciplines pour répondre à vos enjeux de recrutement.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Connectez-vous à des professionnels pré-qualifiés en quelques jours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Des modèles d'engagement flexibles adaptés à vos besoins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Un accompagnement complet tout au long du processus</span>
                  </li>
                </ul>
                <Button className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8" asChild>
                  <Link href="/fr/find-talent">
                    Trouver des talents <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <WhoWeAre />
        <WhatDrivesUs />

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8 text-center">Services clés</h2>
            <p className="text-lg text-center text-neutral-700 mb-12">Modèles flexibles. Talents pré-qualifiés. Résultats garantis.</p>
            <ServicesAnimatedCards />
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="py-20 bg-neutral-100">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8 text-center">Expertise</h2>
            <p className="text-lg text-center text-neutral-700 mb-8">Talents pluridisciplinaires. Impact réel dans tous les secteurs.</p>
            <ExpertiseTabs />
          </div>
        </section>

        {/* How We Work Section */}
        <section id="how-we-work" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">Notre approche</h2>
            <motion.div
              className="mb-8 p-6 bg-emineon-blue/10 rounded-lg"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg font-semibold text-emineon-blue text-center">
                Chez Emineon, l'humain est au cœur de chaque décision de talents. Notre équipe d'experts pilote la sélection et l'appariement, tandis que nos outils IA accélèrent la rapidité, la précision et la qualité — sans jamais remplacer la dimension humaine, mais en la renforçant.
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <AccordionHowWeWork />
            </div>
            <div className="mt-16 bg-emineon-blue p-8 rounded-lg">
              <h3 className="text-xl font-medium text-white mb-6">L'excellence à chaque mission</h3>
              <ExcellenceAccordion />
            </div>
          </div>
        </section>

        {/* Vetting Process Section */}
        <VettingProcessSection />

        {/* Remote Work Technology Section */}
        <section className="py-20 bg-neutral-100">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">Technologies pour le travail à distance</h2>
            <p className="text-neutral-600 mb-12 max-w-2xl mx-auto text-center">
              Nous ne faisons pas que connecter des talents — nous facilitons une collaboration fluide grâce à des technologies de pointe et aux meilleures pratiques.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <RemoteWorkCard
                title="Collaboration immersive"
                description="Exploitez la réalité augmentée/virtuelle, la téléprésence et la visioconférence haut de gamme pour rendre le travail à distance aussi naturel que le local."
                hoverDetail="Tableaux blancs virtuels, co-création en temps réel et travail d'équipe sans frontières."
              />
              <RemoteWorkCard
                title="Gestion pilotée par l'IA"
                description="Des outils de gestion de projet intelligents qui automatisent les suivis, signalent les retards et anticipent les obstacles."
                hoverDetail="Tableaux de bord intelligents, analyses prédictives et reporting instantané pour garder le cap."
              />
              <RemoteWorkCard
                title="Sécurité & Infrastructure"
                description="Accès sécurisé, environnements cloud, VPN et communications chiffrées pour vos données sensibles."
                hoverDetail="Sécurité de niveau entreprise, conformité et support permanent pour une tranquillité d'esprit totale."
              />
              <RemoteWorkCard
                title="Onboarding sans friction"
                description="Parcours d'intégration personnalisés et guides digitaux pour une productivité immédiate."
                hoverDetail="Checklists automatisées, sessions d'accueil et accompagnement continu pour un démarrage optimal."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-16">Ils nous font confiance</h2>

            <div className="space-y-8">
              {[
                {
                  author: "DSI, Groupe Tech européen",
                  quote: "EMINEON nous a permis d'intégrer des talents internationaux dans nos opérations, nous positionnant comme leader du secteur. Leur technologie de travail à distance rend la collaboration fluide malgré la distance géographique."
                },
                {
                  author: "COO, Groupe industriel mondial",
                  quote: "Leur sélection stratégique de talents a transformé nos capacités de développement, générant des résultats mesurables. La qualité des professionnels de leur réseau est vraiment exceptionnelle."
                },
                {
                  author: "CFO, Institution financière leader",
                  quote: "L'équipe EMINEON a fait preuve d'une expertise remarquable en fournissant des solutions de talents spécialisées qui ont dépassé nos attentes. Leur processus de sélection garantit que seuls les meilleurs professionnels rejoignent notre équipe."
                }
              ].map((t, idx) => (
                <motion.div
                  key={t.author}
                  className="border-l-4 border-emineon-blue pl-6 py-2"
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                >
                  <p className="text-neutral-600 italic mb-4">{t.quote}</p>
                  <p className="font-medium text-neutral-900">— {t.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="py-20 bg-neutral-100">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-16">Ce qui nous distingue</h2>
            <WhatSetsUsApartBulletList />
          </div>
        </section>

        {/* Product Upsell Section - ATS & CRM */}
        <section className="py-20 bg-gradient-to-br from-emineon-blue via-emineon-blue to-emineon-light text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-10" />
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="inline-block bg-emineon-orange text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    🚀 Nouveau produit
                  </span>
                  <h2 className="text-4xl font-bold mb-6">
                    Êtes-vous un cabinet de recrutement ?<br />
                    <span className="text-emineon-orange">Découvrez notre ATS & CRM</span>
                  </h2>
                  <p className="text-xl opacity-90 mb-8">
                    La plateforme IA-first conçue spécifiquement pour les recruteurs et consultants. Travaillez plus vite, plus intelligemment, et concluez plus de placements.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <div className="text-3xl font-bold text-emineon-orange mb-1">2x</div>
                      <div className="text-sm opacity-80">Plus de temps au téléphone</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emineon-orange mb-1">70%</div>
                      <div className="text-sm opacity-80">Réduction du temps admin</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emineon-orange mb-1">1.5x</div>
                      <div className="text-sm opacity-80">Placements par mois</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emineon-orange mb-1">IA</div>
                      <div className="text-sm opacity-80">Automatisation intelligente</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      asChild
                      size="lg"
                      className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-8 py-4 text-lg font-semibold"
                    >
                      <Link href="/fr/product">
                        Découvrir ATS & CRM <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="bg-white/10 border-white text-white hover:bg-white hover:text-emineon-blue px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                    >
                      Voir la démo
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-emineon-orange flex items-center justify-center">
                          <Search className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Sourcing IA</div>
                          <div className="text-sm text-white/80">Recherche candidats en langage naturel</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-emineon-orange flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Engagement automatisé</div>
                          <div className="text-sm text-white/80">Approche personnalisée à grande échelle</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-emineon-orange flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Entretiens intelligents</div>
                          <div className="text-sm text-white/80">Résumés IA et mises à jour auto</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-emineon-orange flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Présentations intelligentes</div>
                          <div className="text-sm text-white/80">Rapports candidats en un clic</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-emineon-blue text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="mb-2 mx-auto">
                <Image src="/Emineon logo_tree_white.png" alt="Emineon logo" width={120} height={120} />
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Construisons votre équipe internationale</h2>
              <p className="text-xl opacity-80 mb-8">
                Prêt à surmonter la pénurie de talents et à accéder à des professionnels d'exception dans le monde entier ? Démarrons la conversation.
              </p>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="space-y-2">
                  <p className="font-medium">David Vinkenroye</p>
                  <p className="opacity-80">Founder & Partner, EMINEON</p>
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
          </div>
        </section>
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

      {showLeadForm && (
        <div className="fixed bottom-4 right-4 z-50 bg-white border border-emineon-blue rounded-lg shadow-lg p-6 w-96">
          <h3 className="text-lg font-bold mb-2 text-emineon-blue">Entrons en contact</h3>
          <form className="space-y-3">
            <input className="w-full border p-2 rounded" type="text" placeholder="Nom" required />
            <input className="w-full border p-2 rounded" type="email" placeholder="Email" required />
            <input className="w-full border p-2 rounded" type="text" placeholder="Entreprise" required />
            <textarea className="w-full border p-2 rounded" placeholder="Décrivez votre défi ou objectif" rows={3} required />
            <button type="submit" className="w-full bg-emineon-blue text-white py-2 rounded">Envoyer</button>
          </form>
          <div className="mt-4 text-center">
            <a
              href="https://calendly.com/david-v-emineon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emineon-orange text-white px-4 py-2 rounded mt-2"
            >
              Réserver un appel découverte
            </a>
          </div>
          <button
            className="absolute top-2 right-2 text-emineon-blue hover:text-emineon-orange"
            onClick={() => setShowLeadForm(false)}
          >
            ×
          </button>
        </div>
      )}
      <BottomBanner />
    </div>
  )
}

function AccordionHowWeWork() {
  const [hovered, setHovered] = useState<number | null>(null);
  const steps = [
    {
      title: "Phase de découverte",
      content: [
        "Analyse approfondie de vos besoins et défis en matière de talents (si nécessaire)",
        "Entretiens avec les parties prenantes et analyse des écarts de compétences",
        "Remise d'un rapport détaillé des priorités ou passage direct à l'étape suivante si vos besoins sont déjà clairs",
      ],
    },
    {
      title: "Matching de talents",
      content: [
        "Identification des candidats idéaux via notre système IA (avec supervision humaine)",
        "Présentation d'une shortlist de professionnels pré-qualifiés",
        "Organisation des entretiens et accompagnement dans la sélection",
      ],
    },
    {
      title: "Mise en place",
      content: [
        "Onboarding et intégration des talents sélectionnés",
        "Mise en place des outils et processus adaptés (remote ou sur site)",
        "Suivi initial avec KPIs définis",
      ],
    },
    {
      title: "Amélioration continue",
      content: [
        "Points réguliers et bilans de performance",
        "Support continu pour répondre à l'évolution de vos besoins",
        "Optimisation de l'engagement des talents sur le long terme",
      ],
    },
  ];
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-emineon-blue/10 z-0" />
      <ul className="space-y-0 relative z-10">
        {steps.map((step, idx) => (
          <motion.li
            key={step.title}
            className="relative flex items-start group"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Timeline dot */}
            <motion.span
              className="block w-5 h-5 rounded-full border-2 border-emineon-blue bg-white z-20 mt-2 mr-6 flex-shrink-0"
              animate={{
                backgroundColor: hovered === idx ? '#0A2F5A' : '#fff',
                borderColor: hovered === idx ? '#C75B12' : '#0A2F5A',
                scale: hovered === idx ? 1.2 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <div className="flex-1 mb-8">
              <motion.div
                className="rounded-lg bg-white border border-emineon-blue/10 shadow px-6 py-4 transition-all duration-300 cursor-pointer"
                initial={false}
                animate={hovered === idx ? {
                  backgroundColor: '#f3f6fa',
                  boxShadow: '0 8px 32px 0 rgba(10,47,90,0.12)',
                  border: '1px solid #C75B12',
                  y: -4,
                } : {
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 24px 0 rgba(10,47,90,0.06)',
                  border: '1px solid #0A2F5A',
                  y: 0,
                }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-emineon-blue">{step.title}</span>
                </div>
                <AnimatePresence initial={false}>
                  {hovered === idx && (
                    <motion.ul
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden pl-2 pt-2 text-neutral-700 space-y-2"
                    >
                      {step.content.map((item, i) => (
                        <li key={i} className="list-disc ml-4">{item}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ExcellenceAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    {
      title: "Sélection rigoureuse",
      summary: "Notre processus en 6 étapes garantit que seuls les 1 à 5% des meilleurs candidats rejoignent notre réseau, assurant qualité et expertise.",
      details: (
        <div className="space-y-2">
          <p>Notre sélection évalue non seulement les compétences techniques, mais aussi l'adéquation culturelle et le potentiel à long terme. Les 6 étapes :</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li><b>Analyse du dossier :</b> Expérience et qualifications pertinentes.</li>
            <li><b>Test technique :</b> Évaluation approfondie des compétences et de la résolution de problèmes.</li>
            <li><b>Entretien soft skills :</b> Communication, collaboration, adaptabilité.</li>
            <li><b>Entretien culturel :</b> Alignement avec les valeurs, le style de travail et les attentes du client.</li>
            <li><b>Références :</b> Validation des performances passées et de la fiabilité.</li>
            <li><b>Validation finale :</b> Approbation par un expert senior Emineon.</li>
          </ol>
        </div>
      ),
    },
    {
      title: "Suivi dédié",
      summary: "Chaque mission est suivie par un manager de succès expérimenté pour garantir l'intégration et la satisfaction continue.",
      details: (
        <div className="space-y-2">
          <p>Nos managers de succès sont votre point de contact unique, accompagnant client et talent lors de l'onboarding, l'intégration et la collaboration. Ils anticipent les défis et veillent à la satisfaction à chaque étape.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Onboarding et intégration personnalisés</li>
            <li>Points réguliers avec client et talent</li>
            <li>Réactivité maximale en cas de besoin</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Satisfaction client",
      summary: "Boucles de feedback et bilans réguliers pour faire évoluer nos services et dépasser vos attentes.",
      details: (
        <div className="space-y-2">
          <p>Nous croyons à l'amélioration continue. Notre processus de feedback garantit que chaque mission s'adapte à vos besoins et crée de la valeur durable.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Collecte structurée de feedback après chaque étape clé</li>
            <li>Bilans de performance pour les talents et les projets</li>
            <li>Recommandations pour optimiser les futures missions</li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <div className="divide-y divide-white/20 rounded-lg shadow">
      {items.map((item, idx) => (
        <div key={item.title}>
          <button
            className={`w-full text-left px-6 py-4 font-semibold text-lg transition-colors duration-200 focus:outline-none ${open === idx ? "bg-white/10 text-white" : "bg-transparent text-white hover:bg-white/5"}`}
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
          >
            {item.title}
            <span className={`float-right transition-transform duration-300 ${open === idx ? "rotate-90" : "rotate-0"}`}>▶</span>
          </button>
          <AnimatePresence initial={false}>
            {open === idx && (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden px-8 pb-6 bg-white/10"
              >
                <div className="pt-2 text-white">{item.details}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function WhatSetsUsApartBulletList() {
  const values = [
    {
      title: "Matching sur-mesure",
      description: "Chaque mission est conçue pour s'adapter à vos objectifs, votre culture et vos exigences techniques.",
      proof: "98% de fidélisation client",
      color: "#0A2F5A",
    },
    {
      title: "Alignement culturel",
      description: "Nous privilégions la maîtrise linguistique et la compréhension culturelle pour une intégration sans faille.",
      proof: ">90% des placements sont multilingues",
      color: "#C75B12",
    },
    {
      title: "Outils de pointe",
      description: "Les dernières technologies de collaboration rendent la distance invisible pour la productivité.",
      proof: "IA + sélection humaine pour chaque mission",
      color: "#008080",
    },
    {
      title: "Réputation éprouvée",
      description: "De grands groupes européens nous font confiance pour la qualité de nos solutions de talents.",
      proof: "Top 1-5% des talents acceptés",
      color: "#444B54",
    },
    {
      title: "Accompagnement expert",
      description: "Des managers dédiés assurent l'intégration et l'optimisation continue des missions.",
      proof: "Support client 24/7",
      color: "#0A2F5A",
    },
    {
      title: "Portée mondiale",
      description: "Notre réseau couvre 30+ pays et 5 continents pour accéder aux meilleurs talents.",
      proof: "30+ pays, 5 continents",
      color: "#008080",
    },
    {
      title: "Vitesse d'impact",
      description: "Shortlists de candidats pré-qualifiés en 48h seulement.",
      proof: "Délai moyen : 48h",
      color: "#C75B12",
    },
  ];
  return (
    <ul className="max-w-3xl mx-auto space-y-6">
      {values.map((value, idx) => (
        <WhatSetsUsApartBullet key={value.title} {...value} delay={idx * 0.1} />
      ))}
    </ul>
  );
}

function WhatSetsUsApartBullet({ title, description, proof, color, delay }: { title: string; description: string; proof: string; color: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.li
      ref={ref}
      className="flex flex-col gap-1 group"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0, transition: { delay } } : {}}
      whileHover="hovered"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-4">
        <motion.span
          className="inline-block rounded-full"
          initial={false}
          animate={{
            width: hovered ? 24 : 16,
            height: hovered ? 24 : 16,
            backgroundColor: hovered ? color : "#0A2F5A",
            boxShadow: hovered ? `0 0 0 4px ${color}33` : "none",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <span className="text-lg font-semibold text-emineon-blue">{title}</span>
      </div>
      <span className="text-neutral-700 ml-8">{description}</span>
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="proof"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="ml-8 mt-1 text-emineon-orange font-bold text-base"
          >
            {proof}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function ExpertiseTabs() {
  const [tab, setTab] = useState<'disciplines' | 'sectors'>('disciplines');
  return (
    <div>
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'disciplines' ? 'bg-emineon-blue text-white' : 'bg-white text-emineon-blue border border-emineon-blue'}`}
          onClick={() => setTab('disciplines')}
        >
          Disciplines
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'sectors' ? 'bg-emineon-blue text-white' : 'bg-white text-emineon-blue border border-emineon-blue'}`}
          onClick={() => setTab('sectors')}
        >
          Secteurs
        </button>
      </div>
      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          {tab === 'disciplines' ? (
            <motion.ul
              key="disciplines"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { title: 'Logiciel & IT', desc: 'Développeurs, Cloud, IA/ML, Cybersécurité' },
                { title: 'Données & Analytics', desc: 'Data scientists, BI, Data engineers' },
                { title: 'Design & Créatif', desc: 'UI/UX, Produit, Vidéo, Graphisme' },
                { title: 'Produit & Projet', desc: 'Product managers, Agile, SCRUM' },
                { title: 'Marketing & Croissance', desc: 'Digital, SEO, Contenu, Social' },
                { title: 'Finance & Comptabilité', desc: 'Analystes, CFO, Comptables' },
                { title: 'Juridique & Conformité', desc: 'Contrats, Compliance, UE/Suisse' },
                { title: 'RH & Recrutement', desc: 'Recruteurs, consultants RH' },
              ].map((item, i) => (
                <ExpertiseBlock key={item.title} {...item} delay={i * 0.05} />
              ))}
            </motion.ul>
          ) : (
            <motion.ul
              key="sectors"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { title: 'Technologie', desc: 'Équipes agiles, lancements produits, stratégie data' },
                { title: 'Finance', desc: 'Transformation digitale, conformité, cybersécurité' },
                { title: 'Industrie', desc: 'Tech intelligente, supply chain, ingénierie' },
                { title: 'Santé', desc: 'E-santé, efficacité, résultats patients' },
                { title: 'Sciences de la vie', desc: 'R&D, réglementaire, opérations cliniques' },
                { title: 'Retail & E-commerce', desc: 'Omnicanal, croissance digitale, logistique' },
                { title: 'Énergie & Utilities', desc: 'Durabilité, digital, opérations' },
                { title: 'Secteur public', desc: 'GovTech, services digitaux, transformation' },
              ].map((item, i) => (
                <ExpertiseBlock key={item.title} {...item} delay={i * 0.05} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ExpertiseBlock({ title, desc, delay }: { title: string; desc: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.li
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{
        y: -6,
        boxShadow: '0 8px 32px 0 rgba(199,91,18,0.12)',
        borderColor: '#C75B12',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-lg border border-emineon-blue/10 shadow p-4 cursor-pointer transition-all duration-200"
    >
      <span className={`font-semibold ${hovered ? 'text-emineon-orange' : 'text-emineon-blue'}`}>{title}</span>
      <div className="text-neutral-700 text-sm mt-1">{desc}</div>
    </motion.li>
  );
}

function ServicesAnimatedCards() {
  const services = [
    {
      title: 'Placement de talents',
      desc: 'À distance, hybride ou sur site. Talents pré-qualifiés, prêts à intervenir.',
      features: [
        'À distance, hybride ou sur site',
        "Prêts à l'emploi, pré-qualifiés",
        'Visa & conformité gérés',
      ],
    },
    {
      title: 'Équipes dédiées',
      desc: 'Squads agiles, dimensionnables selon vos besoins.',
      features: [
        'Squads agiles complètes',
        'Team lead dédié',
        'Dimensionnement flexible',
      ],
    },
    {
      title: 'Services managés',
      desc: 'Livraison de bout en bout, basée sur les résultats.',
      features: [
        'Livraison de bout en bout',
        'Basé sur les résultats',
        'Qualité & délais garantis',
      ],
    },
  ];
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial="offscreen"
      animate="onscreen"
      transition={{ staggerChildren: 0.1 }}
    >
      {services.map((service, idx) => (
        <ServiceCard key={service.title} {...service} delay={idx * 0.1} />
      ))}
    </motion.div>
  );
}

function ServiceCard({ title, desc, features, delay }: { title: string; desc: string; features: string[]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="bg-white rounded-2xl border border-emineon-blue/10 shadow p-8 flex flex-col items-start transition-all duration-300 cursor-pointer min-h-[320px]"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        y: -8,
        boxShadow: '0 8px 32px 0 rgba(199,91,18,0.12)',
        borderColor: '#C75B12',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={`text-xl font-bold mb-2 ${hovered ? 'text-emineon-orange' : 'text-emineon-blue'}`}>{title}</span>
      <span className="text-neutral-700 mb-4">{desc}</span>
      <motion.ul className="space-y-2 mt-auto">
        {features.map((feature, i) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: hovered ? 0.1 + i * 0.07 : 0, duration: 0.3 }}
            className="flex items-center gap-2 text-sm text-neutral-700"
          >
            <span className={`inline-block w-2 h-2 rounded-full ${hovered ? 'bg-emineon-orange' : 'bg-emineon-blue'}`}></span>
            {feature}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

function WhoWeAre() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  // Detect mobile device
  const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    if (!videoRef.current || !sectionRef.current) return;

    // Helper to check if section is in view
    const checkAndPlay = () => {
      const rect = sectionRef.current!.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView && videoRef.current && !userStarted) {
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    };

    // Check immediately on mount
    checkAndPlay();

    // Intersection Observer for scroll
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current && !userStarted) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        } else if (videoRef.current && !userStarted) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [userStarted]);

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => {
      setProgress(video.currentTime);
      setDuration(video.duration || 0);
    };
    video.addEventListener('timeupdate', update);
    video.addEventListener('durationchange', update);
    return () => {
      video.removeEventListener('timeupdate', update);
      video.removeEventListener('durationchange', update);
    };
  }, []);

  // Fullscreen handler
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    }
  };

  // Play/Pause handler
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // User-initiated play with sound
  const handleUserPlay = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setIsMuted(false);
    videoRef.current.play();
    setIsPlaying(true);
    setUserStarted(true);
  };

  // Mute/Unmute handler
  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Seek handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setProgress(time);
  };

  // Format time helper
  const formatTime = (t: number) => {
    if (isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="who-we-are" className="py-20 bg-neutral-100" ref={sectionRef}>
      <div className="container">
        <motion.h2
          className="text-3xl font-bold tracking-tight text-emineon-blue mb-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Qui sommes-nous
        </motion.h2>
        <motion.p
          className="text-lg text-center text-neutral-700 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Emineon allie expertise reconnue et innovation dans les solutions de talents à l'échelle mondiale. Notre nom vient de « Eminent » et « Neo » — symbolisant l'excellence distinguée et une approche nouvelle, tournée vers l'avenir.
        </motion.p>
        {/* Synthesia Pitch Video Autoplay Placeholder */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-2xl aspect-video bg-neutral-300 rounded-xl flex items-center justify-center overflow-hidden shadow-xl group">
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/emineon/video/upload/f_auto,q_auto/Forging_Your_Edge_with_Emineon_cklu2a.mp4"
              loop
              playsInline
              muted={!userStarted}
              preload="none"
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              style={{ background: '#e5e7eb' }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              {...(isMobile ? { controls: true } : {})}
            >
              Sorry, your browser does not support embedded videos. Please visit on a modern browser.
            </video>
            {/* Cool gradient overlay for style */}
            <div className="absolute inset-0 pointer-events-none rounded-xl" style={{background: 'linear-gradient(120deg, rgba(10,47,90,0.10) 0%, rgba(199,91,18,0.10) 100%)'}} />
            {/* Play/Pause, Mute/Unmute, and Fullscreen buttons (desktop only) */}
            {!isMobile && (
              <div className="absolute top-3 right-3 z-20 flex gap-2">
                <button
                  onClick={handlePlayPause}
                  className="bg-white/80 hover:bg-white text-emineon-blue hover:text-emineon-orange rounded-full p-2 shadow transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  type="button"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleMuteToggle}
                  className="bg-white/80 hover:bg-white text-emineon-blue hover:text-emineon-orange rounded-full p-2 shadow transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  type="button"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleFullscreen}
                  className="bg-white/80 hover:bg-white text-emineon-blue hover:text-emineon-orange rounded-full p-2 shadow transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                  aria-label="Fullscreen video"
                  type="button"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            )}
            {/* User-initiated play overlay */}
            {!userStarted && !isPlaying && (
              <button
                onClick={handleUserPlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors z-30 focus:outline-none"
                aria-label="Play video with sound"
                type="button"
              >
                <Play className="w-16 h-16 text-white drop-shadow-lg" />
              </button>
            )}
            {/* Progress bar (desktop only) */}
            {!isMobile && (
              <div className="absolute bottom-0 left-0 w-full px-4 pb-3 z-20 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/80 font-mono min-w-[36px]">{formatTime(progress)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={progress}
                    onChange={handleSeek}
                    onMouseDown={() => setSeeking(true)}
                    onMouseUp={() => setSeeking(false)}
                    className="flex-1 h-1 bg-emineon-blue/30 rounded-lg appearance-none accent-emineon-orange cursor-pointer"
                    style={{ accentColor: '#C75B12' }}
                  />
                  <span className="text-xs text-white/80 font-mono min-w-[36px]">{formatTime(duration)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="#testimonials" passHref legacyBehavior>
            <motion.a
              tabIndex={0}
              className="bg-white rounded-xl border border-emineon-blue/10 shadow p-6 flex flex-col items-center text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emineon-orange"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{
                y: -6,
                boxShadow: '0 8px 32px 0 rgba(10,47,90,0.12)',
                borderColor: '#C75B12',
              }}
            >
              <span className="text-xl font-bold text-emineon-blue mb-2">Présence mondiale</span>
              <span className="text-neutral-700 text-sm">Basé à Genève avec un réseau couvrant l'Europe, l'Afrique et au-delà, EMINEON connecte les organisations à des talents d'exception, sans frontières ni disciplines.</span>
            </motion.a>
          </Link>
          <Link href="#expertise" passHref legacyBehavior>
            <motion.a
              tabIndex={0}
              className="bg-white rounded-xl border border-emineon-blue/10 shadow p-6 flex flex-col items-center text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emineon-orange"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{
                y: -6,
                boxShadow: '0 8px 32px 0 rgba(10,47,90,0.12)',
                borderColor: '#C75B12',
              }}
            >
              <span className="text-xl font-bold text-emineon-blue mb-2">Expertise reconnue</span>
              <span className="text-neutral-700 text-sm">Avec un portefeuille couvrant l'ingénierie logicielle, le design, la finance, le marketing et plus encore, notre réseau de talents génère des résultats concrets dans tous les secteurs.</span>
            </motion.a>
          </Link>
          <Link href="#how-we-work" passHref legacyBehavior>
            <motion.a
              tabIndex={0}
              className="bg-white rounded-xl border border-emineon-blue/10 shadow p-6 flex flex-col items-center text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emineon-orange"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{
                y: -6,
                boxShadow: '0 8px 32px 0 rgba(10,47,90,0.12)',
                borderColor: '#C75B12',
              }}
            >
              <span className="text-xl font-bold text-emineon-blue mb-2">Engagement d'excellence</span>
              <span className="text-neutral-700 text-sm">Grâce à une sélection rigoureuse et aux technologies de travail à distance de pointe, nous aidons les entreprises à surmonter la pénurie de talents avec des professionnels de qualité qui s'intègrent parfaitement.</span>
            </motion.a>
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhatDrivesUs() {
  const [open, setOpen] = useState(false);
  const valueBlocks = [
    {
      title: 'Alignement culturel',
      desc: "Associer des talents avec la maîtrise linguistique et la compréhension culturelle pour une intégration sans faille.",
    },
    {
      title: 'Assurance qualité',
      desc: "Sélection rigoureuse pour n'intégrer que les 1 à 5% des meilleurs professionnels mondiaux.",
    },
    {
      title: 'Excellence du remote',
      desc: "Technologies et méthodes innovantes pour rendre la collaboration à distance aussi fluide que le local.",
    },
    {
      title: 'Diversité mondiale',
      desc: "Valoriser la diversité des perspectives pour stimuler l'innovation et la résolution de problèmes.",
    },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.h2
          className="text-3xl font-bold tracking-tight text-emineon-blue mb-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ce qui nous anime
        </motion.h2>
        {/* Mission and Vision side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-emineon-blue/10 rounded-xl p-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-lg font-semibold text-emineon-blue block mb-2">Mission</span>
            <span className="text-neutral-700">Connecter les organisations européennes à des talents d'exception dans le monde entier tout en créant des opportunités pour les professionnels à l'international.</span>
          </motion.div>
          <motion.div
            className="bg-emineon-blue/10 rounded-xl p-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-lg font-semibold text-emineon-blue block mb-2">Vision</span>
            <ul className="pl-4 pt-2 text-neutral-700 space-y-2">
              <li>Combler les pénuries de compétences — accéder aux meilleurs talents</li>
              <li>Construire des équipes internationales — diversité des perspectives pour innover</li>
              <li>Grandir efficacement — des solutions de talents flexibles pour accompagner la croissance</li>
            </ul>
          </motion.div>
        </div>
        {/* Value blocks: 2 rows of 2 on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {valueBlocks.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-xl border border-emineon-blue/10 shadow p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              whileHover={{
                y: -6,
                boxShadow: '0 8px 32px 0 rgba(10,47,90,0.12)',
                borderColor: '#C75B12',
              }}
            >
              <span className="text-lg font-semibold text-emineon-blue mb-2 block">{item.title}</span>
              <span className="text-neutral-700 text-sm">{item.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      title: "Compétences techniques & cognitives",
      description: "Tests rigoureux de compétences et de résolution de problèmes",
      hoverDetail: "Mises en situation réelles et entretiens techniques pour ne retenir que les meilleurs.",
    },
    {
      title: "Adéquation culturelle",
      description: "Immersion à 360° dans votre culture d'entreprise",
      hoverDetail: "Nous évaluons la communication, les valeurs et l'adaptabilité pour une intégration parfaite.",
    },
    {
      title: "Engagement sans risque",
      description: "Période d'essai de 3 mois pour votre tranquillité d'esprit",
      hoverDetail: "Si ce n'est pas le bon fit sous 3 mois, vous êtes couvert — aucun risque à long terme.",
    },
  ];
  return (
    <section className="py-20 bg-neutral-100">
      <div className="container">
        <motion.h2
          className="text-3xl font-bold tracking-tight text-emineon-blue mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Notre processus de sélection
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <VettingProcessCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
