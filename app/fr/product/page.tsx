"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Users, Search, MessageSquare, Calendar, BarChart3, Zap, Shield, Globe, ChevronRight, Play, Star, Menu, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
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

function PricingCard({ plan, price, period, description, features, isPopular, ctaText, ctaLink }: {
  plan: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink?: string;
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
        {ctaLink ? (
          <Button 
            asChild
            className={`w-full mb-6 ${isPopular ? 'bg-emineon-orange hover:bg-emineon-orange/90' : 'bg-emineon-blue hover:bg-emineon-blue/90'} text-white`}
          >
            <Link href={ctaLink} target="_blank" rel="noopener noreferrer">
              {ctaText}
            </Link>
          </Button>
        ) : (
          <Button 
            className={`w-full mb-6 ${isPopular ? 'bg-emineon-orange hover:bg-emineon-orange/90' : 'bg-emineon-blue hover:bg-emineon-blue/90'} text-white`}
          >
            {ctaText}
          </Button>
        )}
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
  const [activeFeatureModal, setActiveFeatureModal] = useState<'source' | 'engage' | 'interview' | 'present' | null>(null);

  // Video controls state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  // Detect mobile device
  const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Video control handlers
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

  const handleUserPlay = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setIsMuted(false);
    videoRef.current.play();
    setIsPlaying(true);
    setUserStarted(true);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setProgress(time);
  };

  const formatTime = (t: number) => {
    if (isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

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
      title: 'Source',
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
      title: 'Engage',
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
      title: 'Interview',
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
      title: 'Present',
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
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md safe-top">
        <div className="container-mobile flex h-16 sm:h-20 items-center justify-between py-2 sm:py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 touch-target">
              <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Image src="/Emineon logo_tree.png" alt="Logo Emineon" width={40} height={40} className="sm:w-12 sm:h-12" />
              </motion.div>
              <span className="flex flex-col leading-tight">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
                <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase hidden sm:block">forge your edge.</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/fr#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Qui nous sommes
            </Link>
            <Link href="/fr/product" className="text-sm font-medium text-emineon-blue border-b-2 border-emineon-blue">
              ATS & CRM
            </Link>
            <Link href="/fr#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Services
            </Link>
            <Link href="/fr#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Notre approche
            </Link>
            <Link href="/fr#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Expertise
            </Link>
            <Link href="/fr#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Témoignages
            </Link>
            <Link href="/fr/blog" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Blog
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Button 
              asChild
              className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-6 py-2 font-medium touch-target"
            >
              <Link href="https://calendly.com/david-v-emineon" target="_blank" rel="noopener noreferrer">
                Réserver une démo
              </Link>
            </Button>
            <Link href="/fr/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg touch-target">Nous contacter</Link>
            <LanguageSwitcher currentLang="fr" />
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emineon-blue ml-auto touch-target no-select"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-emineon-blue" />
          </button>
          {/* Mobile menu drawer */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Menu panel */}
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="relative bg-white h-full w-80 max-w-[85vw] shadow-xl ml-auto safe-top safe-bottom"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center gap-2">
                    <Image src="/Emineon logo_tree.png" alt="Logo Emineon" width={32} height={32} />
                    <span className="text-lg font-semibold text-emineon-blue">Menu</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 touch-target no-select"
                    aria-label="Close menu"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
                
                {/* Navigation links */}
                <div className="py-2 bg-white overflow-y-auto flex-1">
                  <Link
                    href="/fr#who-we-are"
                    className="block px-6 py-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200 touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Qui nous sommes
                  </Link>
                  <Link
                    href="/fr/product"
                    className="block px-6 py-4 text-base font-medium text-white bg-emineon-blue touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      ATS & CRM
                      <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-1 rounded-full font-semibold">NOUVEAU</span>
                    </span>
                  </Link>
                  <Link
                    href="/fr#services"
                    className="block px-6 py-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200 touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/fr#how-we-work"
                    className="block px-6 py-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200 touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Notre approche
                  </Link>
                  <Link
                    href="/fr#expertise"
                    className="block px-6 py-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200 touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Expertise
                  </Link>
                  <Link
                    href="/fr#testimonials"
                    className="block px-6 py-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200 touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Témoignages
                  </Link>
                  <Link
                    href="/fr/blog"
                    className="block px-6 py-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200 touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </div>
                
                {/* Contact button and language switcher */}
                <div className="p-4 border-t border-gray-200 bg-white safe-bottom">
                  <Button 
                    asChild
                    className="w-full bg-emineon-orange text-white py-4 px-4 rounded-lg font-medium mb-3 hover:bg-emineon-orange/90 transition-colors touch-target"
                  >
                    <Link href="https://calendly.com/david-v-emineon" target="_blank" rel="noopener noreferrer">
                      Réserver une démo
                    </Link>
                  </Button>
                  <Link 
                    href="/fr/contact" 
                    className="block w-full bg-emineon-blue text-white text-center py-4 px-4 rounded-lg font-medium mb-4 hover:bg-emineon-blue/90 transition-colors touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nous contacter
                  </Link>
                  
                  <div className="flex justify-center">
                    <LanguageSwitcher currentLang="fr" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-br from-emineon-blue via-emineon-blue to-emineon-light text-white relative overflow-hidden hero-mobile">
          <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-10" />
          <div className="container-mobile relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-4 sm:mb-6"
              >
                <span className="inline-block bg-emineon-orange text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-mobile-sm sm:text-sm font-semibold mb-3 sm:mb-4">
                  Plateforme de recrutement IA-First
                </span>
                <h1 className="text-mobile-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
                  Placez des candidats<br />
                  <span className="text-emineon-orange">plus vite avec l'IA</span>
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-mobile-base sm:text-xl opacity-90 max-w-3xl mx-auto mb-6 sm:mb-8"
              >
                Emineon ATS & CRM est la plateforme IA-first conçue pour aider les professionnels RH, consultants, recruteurs et staffers à travailler plus vite, plus intelligemment, et conclure plus de placements. Technologie révolutionnaire et expertise humaine combinées.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
              >
                <Button 
                  size="lg"
                  asChild
                  className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-6 sm:px-8 py-4 text-mobile-base sm:text-lg font-semibold touch-target btn-mobile w-full sm:w-auto"
                >
                  <Link href="https://calendly.com/david-v-emineon" target="_blank" rel="noopener noreferrer">
                    <Play className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                    Planifier une démo
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-emineon-blue px-6 sm:px-8 py-4 text-mobile-base sm:text-lg font-semibold backdrop-blur-sm touch-target btn-mobile w-full sm:w-auto"
                >
                  <Link href="https://app-emineon.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Essai gratuit
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container-mobile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
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
        <section className="py-12 sm:py-20 bg-neutral-100">
          <div className="container-mobile">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-mobile-2xl sm:text-3xl md:text-4xl font-bold text-emineon-blue mb-3 sm:mb-4">
                La plateforme tout-en-un, IA-first pour les cabinets de conseil, RH et recrutement
              </h2>
              <p className="text-mobile-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                Optimisez l'ensemble de votre processus de recrutement avec une automatisation intelligente et une conception centrée sur l'humain
              </p>
            </div>

            {/* Workflow Navigation */}
            <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto hide-scrollbar">
              <div className="bg-white rounded-full p-2 shadow-lg min-w-fit">
                {workflowSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveTab(step.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-200 text-mobile-sm sm:text-base touch-target ${
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
                      className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center"
                    >
                      <div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-emineon-blue flex items-center justify-center shrink-0">
                            <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-mobile-xl sm:text-3xl font-bold text-emineon-blue">{step.title}</h3>
                            <p className="text-mobile-base sm:text-lg text-neutral-600">{step.description}</p>
                          </div>
                        </div>
                        <ul className="space-y-2 sm:space-y-3">
                          {step.details.map((detail, i) => (
                            <motion.li
                              key={detail}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emineon-blue shrink-0" />
                              <span className="text-mobile-sm sm:text-base text-neutral-700">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <Button 
                          onClick={() => setActiveFeatureModal(step.id)}
                          className="mt-4 sm:mt-6 bg-emineon-blue hover:bg-emineon-blue/90 text-white touch-target btn-mobile"
                        >
                          En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emineon-blue/10 card-mobile">
                        <div className="relative w-full aspect-video bg-neutral-300 rounded-xl flex items-center justify-center overflow-hidden shadow-xl group">
                          <video
                            ref={videoRef}
                            src="/Revolutionize Your Recruitment with Emineon.mp4"
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
                            Désolé, votre navigateur ne prend pas en charge les vidéos intégrées. Veuillez utiliser un navigateur moderne.
                          </video>
                          {/* Cool gradient overlay for style */}
                          <div className="absolute inset-0 pointer-events-none rounded-xl" style={{background: 'linear-gradient(120deg, rgba(10,47,90,0.10) 0%, rgba(199,91,18,0.10) 100%)'}} />
                          {/* Play/Pause, Mute/Unmute, and Fullscreen buttons (desktop only) */}
                          {!isMobile && (
                            <div className="absolute top-3 right-3 z-20 flex gap-2">
                              <button
                                onClick={handlePlayPause}
                                className="bg-white/80 hover:bg-white text-emineon-blue hover:text-emineon-orange rounded-full p-2 shadow transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                                aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
                                type="button"
                              >
                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                              </button>
                              <button
                                onClick={handleMuteToggle}
                                className="bg-white/80 hover:bg-white text-emineon-blue hover:text-emineon-orange rounded-full p-2 shadow transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                                aria-label={isMuted ? "Activer le son" : "Couper le son"}
                                type="button"
                              >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                              </button>
                              <button
                                onClick={handleFullscreen}
                                className="bg-white/80 hover:bg-white text-emineon-blue hover:text-emineon-orange rounded-full p-2 shadow transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                                aria-label="Plein écran"
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
                              aria-label="Lire la vidéo avec le son"
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
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container-mobile">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-mobile-2xl sm:text-3xl md:text-4xl font-bold text-emineon-blue mb-3 sm:mb-4">
                Fonctionnalités révolutionnaires
              </h2>
              <p className="text-mobile-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                Chaque fonctionnalité est conçue pour réduire le travail manuel et amplifier votre expertise
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, i) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-20 bg-emineon-blue text-white">
          <div className="container-mobile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-emineon-orange" />
                </div>
                <h3 className="text-mobile-xl sm:text-2xl font-bold mb-3 sm:mb-4">Source Unique de Vérité</h3>
                <p className="text-white/90 text-mobile-sm sm:text-base">
                  Comprend et stocke tout ce que vous avez entendu, dit ou écrit. Toutes vos données de recrutement dans un système intelligent.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emineon-orange" />
                </div>
                <h3 className="text-mobile-xl sm:text-2xl font-bold mb-3 sm:mb-4">Copilote IA</h3>
                <p className="text-white/90 text-mobile-sm sm:text-base">
                  Répond aux questions basées sur les connaissances en temps réel de votre entreprise. Votre assistant personnel de recrutement.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 sm:mb-6">
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-emineon-orange" />
                </div>
                <h3 className="text-mobile-xl sm:text-2xl font-bold mb-3 sm:mb-4">Analytiques Partout</h3>
                <p className="text-white/90 text-mobile-sm sm:text-base">
                  Personnalisation totale de toutes les métriques dont vous avez besoin. Insights pilotés par les données pour de meilleures décisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-20 bg-neutral-100">
          <div className="container-mobile">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-mobile-2xl sm:text-3xl md:text-4xl font-bold text-emineon-blue mb-3 sm:mb-4">
                Approuvé par des équipes avant-gardistes
              </h2>
              <div className="text-mobile-lg sm:text-xl md:text-2xl font-bold text-emineon-orange mb-6 sm:mb-8">1 000+ candidats présentés</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl card-mobile"
              >
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-emineon-orange text-emineon-orange" />
                  ))}
                </div>
                <p className="text-mobile-base sm:text-lg text-neutral-700 mb-4 sm:mb-6 italic">
                  "Nous sommes passés de heures de recherches booléennes à trouver des correspondances en minutes. C'est comme avoir un chercheur qui travaille 24h/24"
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emineon-blue/10 flex items-center justify-center">
                    <span className="font-bold text-emineon-blue text-mobile-sm sm:text-base">PC</span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-mobile-sm sm:text-base">Pauwels Consulting</div>
                    <div className="text-mobile-xs sm:text-sm text-neutral-600">Cabinet de recherche de cadres</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl card-mobile"
              >
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-emineon-orange text-emineon-orange" />
                  ))}
                </div>
                <p className="text-mobile-base sm:text-lg text-neutral-700 mb-4 sm:mb-6 italic">
                  "Les résumés d'entretiens automatisés changent notre façon de travailler. Je peux me concentrer sur des conversations significatives avec les candidats au lieu des notes à envoyer au client"
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emineon-blue/10 flex items-center justify-center">
                    <span className="font-bold text-emineon-blue text-mobile-sm sm:text-base">SA</span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-mobile-sm sm:text-base">Serena Advisory</div>
                    <div className="text-mobile-xs sm:text-sm text-neutral-600">Acquisition de Talents</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container-mobile">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-mobile-2xl sm:text-3xl md:text-4xl font-bold text-emineon-blue mb-4 sm:mb-6">
                  Chez Emineon, nous croyons que les logiciels RH doivent travailler pour vous, pas contre vous.
                </h2>
                <p className="text-mobile-lg sm:text-xl text-neutral-600">
                  Voici ce que cela signifie pour nous :
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className="text-mobile-lg sm:text-xl font-bold text-emineon-blue mb-2 sm:mb-3">Pas de fumée ni de miroirs</h3>
                    <p className="text-mobile-sm sm:text-base text-neutral-700 leading-relaxed">
                      La plupart des fournisseurs de logiciels RH cachent leurs tarifs. Pas nous. Ils sont directement sur notre site web. Notre essai n'est pas une démo édulcorée – c'est notre produit complet. Nous pensons que si nous ne sommes pas transparents avant que vous achetiez, pourquoi nous feriez-vous confiance après ?
                    </p>
                  </div>

                  <div>
                    <h3 className="text-mobile-lg sm:text-xl font-bold text-emineon-blue mb-2 sm:mb-3">La simplicité n'est pas simple</h3>
                    <p className="text-mobile-sm sm:text-base text-neutral-700 leading-relaxed">
                      Notre logiciel semble facile parce que nous avons fait le travail difficile. Sous le capot, il est complexe et puissant. Mais vous n'avez pas besoin de le savoir. Vous devez juste savoir qu'il fonctionne. Nous utilisons un excellent design et l'IA pour cacher la complexité, pas pour simplifier à outrance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-mobile-lg sm:text-xl font-bold text-emineon-blue mb-2 sm:mb-3">Un logiciel ne devrait pas être un second métier</h3>
                    <p className="text-mobile-sm sm:text-base text-neutral-700 leading-relaxed">
                      Vous en avez déjà assez dans votre assiette. Votre logiciel RH ne devrait pas en rajouter. Nous nous sommes assurés qu'Emineon s'intègre à vos outils existants, vient avec un support expert, et ne nécessite pas un doctorat pour être implémenté. Parce que votre travail est de gérer votre entreprise, pas de devenir expert de notre logiciel.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className="text-mobile-lg sm:text-xl font-bold text-emineon-blue mb-2 sm:mb-3">L'IA n'est pas le futur, c'est maintenant</h3>
                    <p className="text-mobile-sm sm:text-base text-neutral-700 leading-relaxed">
                      Nous ne nous contentons pas de plaquer un chatbot IA sur un vieux logiciel en prétendant que c'est révolutionnaire. Nous intégrons l'IA dans chaque partie d'Emineon. Elle est là quand vous en avez besoin, faisant le gros du travail en arrière-plan. Au fur et à mesure que l'IA évolue, Emineon évoluera aussi. Nous nous engageons à vous maintenir à la pointe de ce qui est possible.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-mobile-lg sm:text-xl font-bold text-emineon-blue mb-2 sm:mb-3">Nous résolvons de vrais problèmes</h3>
                    <p className="text-mobile-sm sm:text-base text-neutral-700 leading-relaxed">
                      La plupart des logiciels RH sont pleins de fonctionnalités que vous n'utiliserez jamais. Nous nous concentrons sur ce qui fait vraiment la différence. Plus de candidats. Moins de tâches administratives. De vrais gains de productivité. Nous ne sommes pas là pour vous donner mille boutons à presser. Nous sommes là pour résoudre vos plus gros maux de tête RH. Le reste n'est que du bruit.
                    </p>
                  </div>

                  <div className="bg-emineon-blue/5 rounded-xl p-4 sm:p-6 border-l-4 border-emineon-orange">
                    <p className="text-mobile-sm sm:text-base text-emineon-blue font-medium italic">
                      "Chaque fonctionnalité d'Emineon existe parce qu'elle résout un vrai problème que nos utilisateurs rencontrent. Ni plus, ni moins."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 sm:py-20 bg-neutral-100">
          <div className="container-mobile">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-mobile-2xl sm:text-3xl md:text-4xl font-bold text-emineon-blue mb-3 sm:mb-4">
                Choisissez votre plan
              </h2>
              <p className="text-mobile-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                Économisez 30-50% sur les coûts technologiques en éliminant les outils redondants
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
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
                ctaLink="https://app-emineon.vercel.app/"
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
            
            <div className="text-center mt-8 sm:mt-12">
              <p className="text-neutral-600 mb-3 sm:mb-4 text-mobile-sm sm:text-base">Prêt à doubler vos placements ?</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button 
                  size="lg"
                  asChild
                  className="bg-emineon-blue hover:bg-emineon-blue/90 px-6 sm:px-8 py-3 sm:py-2 text-mobile-base font-semibold touch-target btn-mobile w-full sm:w-auto"
                  style={{ color: 'white' }}
                >
                  <Link href="https://calendly.com/david-v-emineon" target="_blank" rel="noopener noreferrer">
                    Planifier une démo
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-emineon-blue text-emineon-blue hover:bg-emineon-blue hover:text-white px-6 sm:px-8 py-3 sm:py-2 text-mobile-base font-semibold touch-target btn-mobile w-full sm:w-auto"
                >
                  <Link href="https://app-emineon.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Commencer gratuitement
                  </Link>
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
                  asChild
                  className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-8 py-4 text-lg font-semibold"
                >
                  <Link href="https://calendly.com/david-v-emineon" target="_blank" rel="noopener noreferrer">
                    <Play className="mr-2 h-5 w-5" />
                    Planifier une démo
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-emineon-blue px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                >
                  <Link href="https://app-emineon.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Essai gratuit
                  </Link>
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

      {/* Feature Detail Modals */}
      {activeFeatureModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 safe-top safe-bottom"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-mobile"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 sm:p-8 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emineon-blue flex items-center justify-center">
                    {activeFeatureModal === 'source' && <Search className="w-6 h-6 text-white" />}
                    {activeFeatureModal === 'engage' && <MessageSquare className="w-6 h-6 text-white" />}
                    {activeFeatureModal === 'interview' && <Calendar className="w-6 h-6 text-white" />}
                    {activeFeatureModal === 'present' && <BarChart3 className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-emineon-blue capitalize">{activeFeatureModal}</h2>
                    <p className="text-neutral-600">
                      {activeFeatureModal === 'source' && 'Sourcing de Candidats IA'}
                      {activeFeatureModal === 'engage' && 'Engagement Automatisé'}
                      {activeFeatureModal === 'interview' && 'Gestion Intelligente d\'Entretiens'}
                      {activeFeatureModal === 'present' && 'Présentations Intelligentes de Candidats'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveFeatureModal(null)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 touch-target"
                  aria-label="Fermer"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {activeFeatureModal === 'source' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Moteur de Recherche en Langage Naturel</h3>
                    <p className="text-neutral-700 mb-6">
                      Trouvez des talents qualifiés en utilisant le langage naturel. Décrivez simplement qui vous cherchez, sans opérateurs booléens. Notre IA gère la logique de recherche complexe en arrière-plan.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h4 className="font-semibold text-emineon-blue mb-3">Exemple de Recherche</h4>
                      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                        <p className="text-sm text-gray-600 mb-2">Au lieu de :</p>
                        <code className="text-sm text-red-600">(React OR Angular) AND (TypeScript OR JavaScript) AND (Senior OR Lead) AND experience</code>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-emineon-blue/20">
                        <p className="text-sm text-gray-600 mb-2">Tapez simplement :</p>
                        <p className="text-emineon-blue font-medium">"Développeur frontend senior avec expérience React et TypeScript"</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Notation Intelligente des Candidats</h3>
                    <p className="text-neutral-700 mb-4">
                      Notre IA analyse vos exigences et note les candidats selon l'expérience, les compétences et l'adéquation sectorielle pour présenter instantanément les meilleures correspondances.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="text-green-600 font-bold text-lg">96%</div>
                        <div className="text-sm text-green-700">Excellente Correspondance</div>
                        <div className="text-xs text-green-600 mt-1">Toutes les exigences remplies</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="text-blue-600 font-bold text-lg">89%</div>
                        <div className="text-sm text-blue-700">Bonne Correspondance</div>
                        <div className="text-xs text-blue-600 mt-1">Lacunes mineures</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <div className="text-orange-600 font-bold text-lg">75%</div>
                        <div className="text-sm text-orange-700">Correspondance Correcte</div>
                        <div className="text-xs text-orange-600 mt-1">Formation nécessaire</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Aperçu Complet du Candidat</h3>
                    <p className="text-neutral-700 mb-4">
                      Notre IA analyse chaque interaction avec vos candidats - emails, appels, notes et réunions - pour construire une compréhension complète de leurs qualifications et parcours.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Emails', 'Appels', 'Notes', 'Messages', 'Réunions', 'Rapports'].map((item) => (
                        <span key={item} className="bg-emineon-blue/10 text-emineon-blue px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Intégration LinkedIn</h3>
                    <p className="text-neutral-700 mb-4">
                      Importez des candidats directement depuis LinkedIn avec notre extension Chrome. Synchronisez des profils individuels ou importez des résultats de recherche entiers en masse.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Import de profil en un clic depuis LinkedIn</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Import en masse depuis les listes LinkedIn Recruiter</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Enrichissement automatique avec emails vérifiés</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeFeatureModal === 'engage' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Campagnes d'Approche Multi-Canal</h3>
                    <p className="text-neutral-700 mb-6">
                      Créez des séquences d'approche intelligentes qui s'adaptent au comportement de vos prospects sur LinkedIn, email et WhatsApp. Fini les suivis manuels ou les opportunités ratées.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-emineon-blue mb-4">Exemple de Flux de Campagne</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                          <span>Email Initial</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm">↓</div>
                          <span className="text-gray-600">Attendre 3 jours</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">2</div>
                          <span>Si ouvert : InMail LinkedIn | Si pas ouvert : Demande de connexion</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm">↓</div>
                          <span className="text-gray-600">Attendre 1 semaine</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">3</div>
                          <span>Suivi WhatsApp (si disponible)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Personnalisation à Grande Échelle</h3>
                    <p className="text-neutral-700 mb-4">
                      Dépassez le simple publipostage. Créez des messages hautement personnalisés en utilisant les conversations passées, le style de communication et le profil du candidat.
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Message Généré par IA :</div>
                      <div className="space-y-2">
                        <p>Bonjour <span className="bg-yellow-100 px-1 rounded">Sarah</span>,</p>
                        <p><span className="bg-blue-100 px-1 rounded">Suite à notre discussion sur l'architecture cloud le mois dernier</span>, je voulais vous contacter pour une opportunité passionnante.</p>
                        <p>Nous recrutons pour un poste d'<span className="bg-green-100 px-1 rounded">Ingénieur Backend Senior</span> avec plus de responsabilités d'équipe.</p>
                        <p><span className="bg-purple-100 px-1 rounded">Seriez-vous disponible pour un bref appel pour en discuter ?</span></p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Hub de Communication Centralisé</h3>
                    <p className="text-neutral-700 mb-4">
                      Toutes vos communications candidats en un seul endroit. Envoyez des messages via WhatsApp, LinkedIn et email sans changer de plateforme.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-blue-600 font-semibold">Email</div>
                        <div className="text-sm text-blue-600 mt-1">Approche professionnelle</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-blue-600 font-semibold">LinkedIn</div>
                        <div className="text-sm text-blue-600 mt-1">InMails & messages</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-green-600 font-semibold">WhatsApp</div>
                        <div className="text-sm text-green-600 mt-1">Chats personnels & pro</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Analyses de Réponse IA</h3>
                    <p className="text-neutral-700 mb-4">
                      Obtenez des insights instantanés sur l'engagement des candidats et optimisez votre stratégie d'approche avec des analyses en temps réel.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Suivi des taux d'ouverture et de réponse</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Modèles de messages les plus performants</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Horaires et fréquences d'envoi optimaux</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeFeatureModal === 'interview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Prise de Notes IA</h3>
                    <p className="text-neutral-700 mb-6">
                      Concentrez-vous sur la conversation pendant que notre assistant IA capture automatiquement des notes complètes et les points clés de chaque entretien.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-emineon-blue mb-3">Transcription en Direct</h4>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-600">Enregistrement en cours...</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          "J'ai 8+ années d'expérience avec React et TypeScript, et j'ai dirigé trois projets frontend majeurs dans mon entreprise actuelle..."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Résumés d'Entretiens Intelligents</h3>
                    <p className="text-neutral-700 mb-4">
                      Obtenez des résumés générés par IA de vos entretiens et posez des questions sur n'importe quelle conversation passée. Ne perdez plus jamais de détails importants.
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-semibold text-emineon-blue mb-2">Résumé d'Entretien - Sarah Chen</div>
                      <div className="text-sm text-gray-600 mb-3">15 mars 2024 • 45 minutes</div>
                      <div className="space-y-2 text-sm">
                        <div><strong>Points Forts :</strong> Solide formation technique en systèmes distribués, excellentes compétences de communication</div>
                        <div><strong>Expérience :</strong> 8+ années React/TypeScript, dirigé 3 projets majeurs</div>
                        <div><strong>Attentes Salariales :</strong> 145 000€ (mis à jour de 120 000€)</div>
                        <div><strong>Prochaines Étapes :</strong> Planifier entretien technique avec le responsable d'embauche</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Mises à Jour ATS Automatiques</h3>
                    <p className="text-neutral-700 mb-4">
                      L'IA suggère des mises à jour des champs candidat basées sur les informations discutées pendant les entretiens. Gardez votre base de données à jour sans effort.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="text-green-700 font-semibold text-sm">✓ Salaire Actuel Mis à Jour</div>
                        <div className="text-green-600 text-sm">120 000€ → 145 000€</div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="text-blue-700 font-semibold text-sm">+ Formation Ajoutée</div>
                        <div className="text-blue-600 text-sm">MSc Informatique, Université Stanford 2019</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Planification Intelligente & Gestion de Pipeline</h3>
                    <p className="text-neutral-700 mb-4">
                      Coordonnez les entretiens sans effort avec la synchronisation automatique du calendrier et les étapes de pipeline personnalisables.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-emineon-blue mb-3">Créneaux Disponibles</h5>
                        <div className="space-y-2">
                          <div className="bg-white border border-gray-200 rounded p-2 text-sm">Mardi 12 mars - 14h00</div>
                          <div className="bg-white border border-gray-200 rounded p-2 text-sm">Mardi 12 mars - 15h00</div>
                          <div className="bg-white border border-gray-200 rounded p-2 text-sm">Mercredi 13 mars - 11h00</div>
                          <div className="text-emineon-blue text-sm">+ 12 créneaux supplémentaires</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-emineon-blue mb-3">Labels Pipeline Personnalisés</h5>
                        <div className="space-y-2">
                          <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Entretien Téléphonique</span>
                          <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm ml-2">Entretien Technique</span>
                          <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-sm ml-2">Tour Final</span>
                          <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm ml-2">En Attente Retour</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeFeatureModal === 'present' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Rapports Candidats en Un Clic</h3>
                    <p className="text-neutral-700 mb-6">
                      Générez des présentations candidats professionnelles en quelques secondes. Ne commencez plus jamais par une page blanche avec notre génération de rapports IA.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-emineon-blue mb-3">Documents d'Entrée</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <div className="text-red-500 font-semibold text-sm">PDF</div>
                          <div className="text-xs text-gray-600">CV Candidat</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <div className="text-blue-500 font-semibold text-sm">DOC</div>
                          <div className="text-xs text-gray-600">Description de Poste</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <div className="text-green-500 font-semibold text-sm">DOCX</div>
                          <div className="text-xs text-gray-600">Notes d'Entretien</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Modèles Personnalisés & Image de Marque</h3>
                    <p className="text-neutral-700 mb-4">
                      Utilisez les modèles de marque de votre entreprise. Générez des rapports directement exportables en Word ou PowerPoint, prêts à partager avec les clients.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-600 font-semibold mb-2">Export Word</div>
                        <div className="text-sm text-blue-600">Documents professionnels avec votre marque</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-orange-600 font-semibold mb-2">Export PowerPoint</div>
                        <div className="text-sm text-orange-600">Diapositives prêtes pour réunions client</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Génération de Contenu Intelligente</h3>
                    <p className="text-neutral-700 mb-4">
                      Notre IA analyse les données candidat et crée des présentations sur mesure mettant en valeur l'expérience et les compétences les plus pertinentes pour chaque poste spécifique.
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-semibold text-emineon-blue mb-3">Sections Auto-Générées</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Résumé Exécutif</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Points Forts d'Expérience Pertinente</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Analyse de Correspondance des Compétences</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Évaluation d'Adéquation Culturelle</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Résumé d'Entretien & Recommandations</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Formatage & Adaptation de CV</h3>
                    <p className="text-neutral-700 mb-4">
                      Reformatez n'importe quel CV dans votre modèle d'entreprise en quelques secondes. Créez des présentations cohérentes et professionnelles qui correspondent à vos standards de marque.
                    </p>
                    <div className="bg-gradient-to-r from-gray-100 to-emineon-blue/5 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">CV Original</div>
                          <div className="text-xs text-gray-500 mt-1">Divers formats</div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-emineon-blue" />
                        <div className="text-center">
                          <div className="text-sm text-emineon-blue font-semibold">CV de Marque</div>
                          <div className="text-xs text-emineon-blue mt-1">Votre modèle</div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-emineon-blue" />
                        <div className="text-center">
                          <div className="text-sm text-green-600 font-semibold">Prêt Client</div>
                          <div className="text-xs text-green-600 mt-1">Sortie professionnelle</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Support Multi-Langues</h3>
                    <p className="text-neutral-700 mb-4">
                      Générez des présentations dans n'importe quelle langue. Notre IA utilise automatiquement le bon modèle linguistique pour des résultats optimaux.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Français', 'Anglais', 'Allemand', 'Espagnol', 'Néerlandais', 'Italien'].map((lang) => (
                        <span key={lang} className="bg-emineon-blue/10 text-emineon-blue px-3 py-1 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-emineon-blue/5 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold text-emineon-blue mb-3">Prêt à découvrir cette fonctionnalité ?</h3>
                <p className="text-neutral-600 mb-4">
                  Découvrez comment Emineon peut transformer votre processus de recrutement avec les capacités {activeFeatureModal} alimentées par l'IA.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    asChild
                    className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-6 py-3"
                  >
                    <Link href="https://calendly.com/david-v-emineon" target="_blank" rel="noopener noreferrer">
                      Planifier une Démo
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    className="border-emineon-blue text-emineon-blue hover:bg-emineon-blue hover:text-white px-6 py-3"
                  >
                    <Link href="https://app-emineon.vercel.app/" target="_blank" rel="noopener noreferrer">
                      Essai Gratuit
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Demo Modal */}
      {showDemo && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 safe-top safe-bottom"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto modal-mobile"
          >
            <h3 className="text-mobile-xl sm:text-2xl font-bold text-emineon-blue mb-3 sm:mb-4">Réserver une démo</h3>
            <p className="text-mobile-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">
              Découvrez comment Emineon ATS & CRM peut transformer votre processus de recrutement. Planifiez une démo personnalisée avec notre équipe.
            </p>
            <form className="space-y-3 sm:space-y-4">
              <input 
                type="text" 
                placeholder="Nom complet" 
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 sm:py-3 text-mobile-base mobile-input focus:outline-none focus:ring-2 focus:ring-emineon-blue touch-target"
                required 
              />
              <input 
                type="email" 
                placeholder="Email professionnel" 
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 sm:py-3 text-mobile-base mobile-input focus:outline-none focus:ring-2 focus:ring-emineon-blue touch-target"
                required 
              />
              <input 
                type="text" 
                placeholder="Nom de l'entreprise" 
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 sm:py-3 text-mobile-base mobile-input focus:outline-none focus:ring-2 focus:ring-emineon-blue touch-target"
                required 
              />
              <select 
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 sm:py-3 text-mobile-base mobile-input focus:outline-none focus:ring-2 focus:ring-emineon-blue touch-target"
                required
              >
                <option value="">Taille de l'entreprise</option>
                <option value="1-10">1-10 employés</option>
                <option value="11-50">11-50 employés</option>
                <option value="51-200">51-200 employés</option>
                <option value="200+">200+ employés</option>
              </select>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  type="submit"
                  className="flex-1 bg-emineon-blue hover:bg-emineon-blue/90 py-3 sm:py-2 text-mobile-base font-semibold touch-target btn-mobile text-white hover:text-white"
                >
                  Planifier la démo
                </Button>
                <Button 
                  type="button"
                  onClick={() => setShowDemo(false)}
                  className="px-6 py-3 sm:py-2 text-mobile-base font-semibold touch-target btn-mobile bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 