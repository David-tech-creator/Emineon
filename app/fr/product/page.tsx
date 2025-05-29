"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Users, Search, MessageSquare, Calendar, BarChart3, Zap, Shield, Globe, ChevronRight, Play, Star, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LanguageSwitcher from "@/components/LanguageSwitcher"

function FeatureCard({ icon: Icon, title, description, benefits }: { icon: any; title: string; description: string; benefits: string[] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="bg-white rounded-xl border border-emineon-blue/10 shadow p-6 transition-all duration-300 cursor-pointer relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -6,
        boxShadow: '0 12px 40px 0 rgba(10,47,90,0.15)',
        borderColor: '#C75B12',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="w-12 h-12 rounded-lg bg-emineon-blue/10 flex items-center justify-center mb-4"
        animate={{
          backgroundColor: hovered ? '#0A2F5A' : 'rgba(10,47,90,0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon className={`w-6 h-6 ${hovered ? 'text-white' : 'text-emineon-blue'}`} />
      </motion.div>
      <h3 className="text-xl font-bold text-emineon-blue mb-2">{title}</h3>
      <p className="text-neutral-700 mb-4">{description}</p>
      <AnimatePresence>
        {hovered && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 text-sm text-neutral-600"
          >
            {benefits.map((benefit, i) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emineon-orange" />
                {benefit}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StatsCard({ number, label, description }: { number: string; label: string; description: string }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl font-bold text-emineon-blue mb-2">{number}</div>
      <div className="text-lg font-semibold text-neutral-900 mb-1">{label}</div>
      <div className="text-sm text-neutral-600">{description}</div>
    </motion.div>
  );
}

function PricingCard({ plan, price, period, description, features, isPopular, ctaText }: {
  plan: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}) {
  return (
    <motion.div
      className={`relative bg-white rounded-2xl border ${isPopular ? 'border-emineon-orange shadow-xl' : 'border-emineon-blue/10 shadow'} p-8 transition-all duration-300 hover:shadow-xl ${isPopular ? 'transform scale-105' : 'hover:scale-105'}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-emineon-orange text-white px-4 py-2 rounded-full text-sm font-semibold">Plus populaire</span>
        </div>
      )}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-emineon-blue mb-2">{plan}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-neutral-900">{price}</span>
          <span className="text-neutral-600 ml-1">{period}</span>
        </div>
        <p className="text-neutral-600 mb-6">{description}</p>
        <Button 
          className={`w-full mb-6 ${isPopular ? 'bg-emineon-orange hover:bg-emineon-orange/90' : 'bg-emineon-blue hover:bg-emineon-blue/90'} text-white`}
        >
          {ctaText}
        </Button>
      </div>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={feature} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emineon-blue shrink-0 mt-0.5" />
            <span className="text-neutral-700">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState<'source' | 'engage' | 'interview' | 'present'>('source');
  const [showDemo, setShowDemo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Search,
      title: "Sourcing IA",
      description: "Trouvez les meilleurs candidats avec une recherche en langage naturel au lieu de filtres booléens complexes.",
      benefits: [
        "Recherche naturelle dans toutes les données candidats",
        "Algorithmes de correspondance IA",
        "Temps réduit d'heures à minutes",
        "Recommandations intelligentes de candidats"
      ]
    },
    {
      icon: MessageSquare,
      title: "Engagement automatisé",
      description: "Configurez des campagnes d'approche personnalisées et des suivis pour de meilleurs taux de réponse.",
      benefits: [
        "Séquences d'e-mails personnalisées",
        "Communication multi-canal",
        "Planification automatique des suivis",
        "Taux de réponse candidats plus élevés"
      ]
    },
    {
      icon: Calendar,
      title: "Gestion intelligente des entretiens",
      description: "Concentrez-vous sur la connexion humaine pendant que l'IA gère les notes et maintient votre ATS à jour.",
      benefits: [
        "Résumés d'entretiens automatisés",
        "Mises à jour ATS en temps réel",
        "Automatisation de la planification d'entretiens",
        "Insights d'évaluation candidats"
      ]
    },
    {
      icon: BarChart3,
      title: "Présentations intelligentes",
      description: "Générez des présentations candidats sur mesure qui créent la confiance en un clic.",
      benefits: [
        "Génération de présentation en un clic",
        "Modèles personnalisables",
        "Formatage spécifique client",
        "Sorties professionnelles de marque"
      ]
    }
  ];

  const workflowSteps = [
    {
      id: 'source',
      title: 'Sourcer',
      icon: Search,
      description: 'Trouvez les meilleurs candidats avec la recherche IA',
      details: [
        'Recherche candidats en langage naturel',
        'Algorithmes de correspondance IA',
        'Base de données complète de talents',
        'Filtrage intelligent et recommandations'
      ]
    },
    {
      id: 'engage',
      title: 'Engager',
      icon: MessageSquare,
      description: 'Automatisez l\'approche personnalisée à grande échelle',
      details: [
        'Campagnes d\'e-mails personnalisées',
        'Communication multi-canal',
        'Séquences de suivi automatisées',
        'Suivi des réponses et analytiques'
      ]
    },
    {
      id: 'interview',
      title: 'Interviewer',
      icon: Calendar,
      description: 'Concentrez-vous sur les conversations, pas la prise de notes',
      details: [
        'Résumés d\'entretiens IA',
        'Mises à jour ATS automatiques',
        'Coordination de planification',
        'Outils d\'évaluation candidats'
      ]
    },
    {
      id: 'present',
      title: 'Présenter',
      icon: BarChart3,
      description: 'Créez des présentations candidats gagnantes',
      details: [
        'Génération de présentation en un clic',
        'Modèles de marque client',
        'Formatage professionnel',
        'Mises en page personnalisables'
      ]
    }
  ] as const;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Image src="/Emineon logo_tree.png" alt="Logo Emineon" width={48} height={48} />
              </motion.div>
              <span className="flex flex-col leading-tight">
                <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
                <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase">forge your edge.</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/fr#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Qui nous sommes
            </Link>
            <Link href="/fr/product" className="text-sm font-medium text-emineon-blue border-b-2 border-emineon-blue">
              ATS & CRM
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
            <Button 
              onClick={() => setShowDemo(true)}
              className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-6 py-2 font-medium"
            >
              Réserver une démo
            </Button>
            <Link href="/fr/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">Nous contacter</Link>
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
                    { href: "/fr#who-we-are", label: "Qui nous sommes" },
                    { href: "/fr/product", label: "ATS & CRM", isNew: true },
                    { href: "/fr#services", label: "Services" },
                    { href: "/fr#how-we-work", label: "Notre approche" },
                    { href: "/fr#expertise", label: "Expertise" },
                    { href: "/fr#testimonials", label: "Témoignages" },
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
                    Nous contacter
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
        <section className="py-20 md:py-28 bg-gradient-to-br from-emineon-blue via-emineon-blue to-emineon-light text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-10" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-6"
              >
                <span className="inline-block bg-emineon-orange text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Plateforme de recrutement IA-First
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Placez des candidats<br />
                  <span className="text-emineon-orange">plus vite avec l'IA</span>
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-xl opacity-90 max-w-3xl mx-auto mb-8"
              >
                Emineon ATS & CRM est la plateforme IA-first conçue pour aider les professionnels RH, consultants, recruteurs et staffers à travailler plus vite, plus intelligemment, et conclure plus de placements. Technologie révolutionnaire et expertise humaine combinées.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button 
                  size="lg"
                  onClick={() => setShowDemo(true)}
                  className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-8 py-4 text-lg font-semibold"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Voir la démo
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-emineon-blue px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                >
                  Essai gratuit
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <StatsCard 
                number="2x" 
                label="Plus de temps au téléphone" 
                description="Plus de temps avec les candidats, moins d'admin" 
              />
              <StatsCard 
                number="70%" 
                label="Réduction du temps admin" 
                description="L'IA gère la paperasse, vous gérez les relations" 
              />
              <StatsCard 
                number="1.5x" 
                label="Placements par mois" 
                description="Concluez plus d'affaires avec des flux optimisés" 
              />
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-20 bg-neutral-100">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-emineon-blue mb-4">
                La plateforme tout-en-un, IA-first pour les cabinets de conseil, RH et recrutement
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                Optimisez l'ensemble de votre processus de recrutement avec une automatisation intelligente et une conception centrée sur l'humain
              </p>
            </div>

            {/* Workflow Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-full p-2 shadow-lg">
                {workflowSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveTab(step.id)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                      activeTab === step.id 
                        ? 'bg-emineon-blue text-white shadow-md' 
                        : 'text-neutral-600 hover:text-emineon-blue'
                    }`}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Workflow Content */}
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                {workflowSteps.map((step) => (
                  activeTab === step.id && (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.4 }}
                      className="grid md:grid-cols-2 gap-12 items-center"
                    >
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-xl bg-emineon-blue flex items-center justify-center">
                            <step.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-emineon-blue">{step.title}</h3>
                            <p className="text-lg text-neutral-600">{step.description}</p>
                          </div>
                        </div>
                        <ul className="space-y-3">
                          {step.details.map((detail, i) => (
                            <motion.li
                              key={detail}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <CheckCircle className="w-5 h-5 text-emineon-blue shrink-0" />
                              <span className="text-neutral-700">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <Button className="mt-6 bg-emineon-blue hover:bg-emineon-blue/90 text-white">
                          En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-white rounded-2xl shadow-xl p-8 border border-emineon-blue/10">
                        <div className="aspect-video bg-gradient-to-br from-emineon-blue/10 to-emineon-orange/10 rounded-xl flex items-center justify-center">
                          <span className="text-neutral-500 font-medium">Démo Interactive - {step.title}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-emineon-blue mb-4">
                Fonctionnalités révolutionnaires
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                Chaque fonctionnalité est conçue pour réduire le travail manuel et amplifier votre expertise
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-emineon-blue text-white">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-emineon-orange" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Source Unique de Vérité</h3>
                <p className="text-white/90">
                  Comprend et stocke tout ce que vous avez entendu, dit ou écrit. Toutes vos données de recrutement dans un système intelligent.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-emineon-orange" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Copilote IA</h3>
                <p className="text-white/90">
                  Répond aux questions basées sur les connaissances en temps réel de votre entreprise. Votre assistant personnel de recrutement.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-emineon-orange" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Analytiques Partout</h3>
                <p className="text-white/90">
                  Personnalisation totale de toutes les métriques dont vous avez besoin. Insights pilotés par les données pour de meilleures décisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-neutral-100">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-emineon-blue mb-4">
                Approuvé par des équipes avant-gardistes
              </h2>
              <div className="text-xl md:text-2xl font-bold text-emineon-orange mb-8">1 000+ candidats présentés</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-emineon-orange text-emineon-orange" />
                  ))}
                </div>
                <p className="text-lg text-neutral-700 mb-6 italic">
                  "Nous sommes passés de heures de recherches booléennes à trouver des correspondances en minutes. C'est comme avoir un chercheur qui travaille 24h/24"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emineon-blue/10 flex items-center justify-center">
                    <span className="font-bold text-emineon-blue">PC</span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Pauwels Consulting</div>
                    <div className="text-sm text-neutral-600">Cabinet de recherche de cadres</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-emineon-orange text-emineon-orange" />
                  ))}
                </div>
                <p className="text-lg text-neutral-700 mb-6 italic">
                  "Les résumés d'entretiens automatisés changent notre façon de travailler. Je peux me concentrer sur des conversations significatives avec les candidats au lieu des notes à envoyer au client"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emineon-blue/10 flex items-center justify-center">
                    <span className="font-bold text-emineon-blue">SA</span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Serena Advisory</div>
                    <div className="text-sm text-neutral-600">Acquisition de Talents</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-neutral-100">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-emineon-blue mb-4">
                Choisissez votre plan
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                Économisez 30-50% sur les coûts technologiques en éliminant les outils redondants
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <PricingCard
                plan="Croissance"
                price="€89"
                period="par utilisateur/mois, facturé annuellement"
                description="Pour les entreprises en croissance"
                features={[
                  "Accès à la plateforme complète",
                  "Intégration LinkedIn, WhatsApp, Email",
                  "Extension Chrome LinkedIn",
                  "Enrichissement automatique des données",
                  "Support technique"
                ]}
                ctaText="Essayer aujourd'hui"
              />
              
              <PricingCard
                plan="Entreprise"
                price="€119"
                period="par utilisateur/mois, facturé annuellement"
                description="Pour les grandes organisations"
                features={[
                  "Prise de notes IA personnalisée",
                  "Migration ATS actuel",
                  "Automatisation IA illimitée",
                  "Rapports candidats personnalisés",
                  "Support prioritaire"
                ]}
                isPopular={true}
                ctaText="Nous contacter"
              />
            </div>
            
            <div className="text-center mt-12">
              <p className="text-neutral-600 mb-4">Prêt à doubler vos placements ?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => setShowDemo(true)}
                  className="bg-emineon-blue hover:bg-emineon-blue/90 text-white px-8"
                >
                  Planifier une démo
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-emineon-blue text-emineon-blue hover:bg-emineon-blue hover:text-white px-8"
                >
                  Commencer gratuitement
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emineon-blue to-emineon-light text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à révolutionner votre processus de recrutement ?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Rejoignez les équipes RH avant-gardistes, cabinets de conseil et agences de recrutement qui utilisent déjà Emineon ATS & CRM pour placer plus de candidats plus rapidement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => setShowDemo(true)}
                  className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-8 py-4 text-lg font-semibold"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Voir la démo
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-emineon-blue px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                >
                  Essai gratuit
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-emineon-dark text-white/60">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="h-10 w-auto">
              <Image src="/Emineon logo_tree_white.png" alt="Logo Emineon" height={40} width={40} />
            </motion.div>
            <span className="text-sm hidden md:inline">© {new Date().getFullYear()} EMINEON. Tous droits réservés.</span>
          </div>
          <span className="text-sm md:hidden text-center block mt-2">© {new Date().getFullYear()} EMINEON. Tous droits réservés.</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-white">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              Conditions de service
            </Link>
            <Link href="/contact" className="text-sm hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-emineon-blue mb-4">Réserver une démo</h3>
            <p className="text-neutral-600 mb-6">
              Découvrez comment Emineon ATS & CRM peut transformer votre processus de recrutement. Planifiez une démo personnalisée avec notre équipe.
            </p>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Nom complet" 
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emineon-blue"
                required 
              />
              <input 
                type="email" 
                placeholder="Email professionnel" 
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emineon-blue"
                required 
              />
              <input 
                type="text" 
                placeholder="Nom de l'entreprise" 
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emineon-blue"
                required 
              />
              <select 
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emineon-blue"
                required
              >
                <option value="">Taille de l'entreprise</option>
                <option value="1-10">1-10 employés</option>
                <option value="11-50">11-50 employés</option>
                <option value="51-200">51-200 employés</option>
                <option value="200+">200+ employés</option>
              </select>
              <div className="flex gap-3 pt-2">
                <Button 
                  type="submit"
                  className="flex-1 bg-emineon-blue hover:bg-emineon-blue/90 text-white"
                >
                  Planifier la démo
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowDemo(false)}
                  className="px-6"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
} 