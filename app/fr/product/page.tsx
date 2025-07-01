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

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState<'source' | 'engage' | 'interview' | 'present'>('source');
  const [showDemo, setShowDemo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeatureModal, setActiveFeatureModal] = useState<'source' | 'engage' | 'interview' | 'present' | null>(null);
  const [demoForm, setDemoForm] = useState({ name: "", email: "", company: "", companySize: "" });
  const [demoFormErrors, setDemoFormErrors] = useState<{ [key: string]: string }>({});
  const [demoFormLoading, setDemoFormLoading] = useState(false);
  const [demoFormSubmitted, setDemoFormSubmitted] = useState(false);
  const [demoFormApiError, setDemoFormApiError] = useState<string | null>(null);

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

  function validateDemoForm() {
    const errs: { [key: string]: string } = {};
    if (!demoForm.name.trim()) errs.name = "Le nom est requis.";
    if (!demoForm.email.trim()) errs.email = "L'email est requis.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(demoForm.email)) errs.email = "Entrez un email valide.";
    if (!demoForm.company.trim()) errs.company = "L'entreprise est requise.";
    if (!demoForm.companySize) errs.companySize = "La taille de l'entreprise est requise.";
    return errs;
  }

  function handleDemoFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setDemoForm({ ...demoForm, [e.target.name]: e.target.value });
    setDemoFormErrors({ ...demoFormErrors, [e.target.name]: "" });
  }

  async function handleDemoFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateDemoForm();
    if (Object.keys(errs).length) {
      setDemoFormErrors(errs);
      return;
    }
    setDemoFormLoading(true);
    setDemoFormApiError(null);
    try {
      const res = await fetch('/fr/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demoForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setDemoFormApiError(data.error || 'Échec de l\'envoi de la demande de démo.');
        setDemoFormLoading(false);
        return;
      }
      setDemoFormSubmitted(true);
    } catch (err) {
      setDemoFormApiError('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setDemoFormLoading(false);
    }
  }

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
        "Informations d'évaluation des candidats"
      ]
    },
    {
      icon: BarChart3,
      title: "Présentations intelligentes",
      description: "Générez des présentations de candidats sur mesure qui construisent la confiance en un clic.",
      benefits: [
        "Génération de présentations en un clic",
        "Modèles personnalisables",
        "Formatage spécifique au client",
        "Sorties professionnelles de marque"
      ]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md safe-top">
        <div className="container-mobile flex h-16 sm:h-20 items-center justify-between py-2 sm:py-4">
          <div className="flex items-center gap-2">
            <Link href="/fr" className="flex items-center gap-2 touch-target">
              <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={40} height={40} className="sm:w-12 sm:h-12" />
              </motion.div>
              <span className="flex flex-col leading-tight">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
                <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase hidden sm:block">forgez votre avantage.</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/fr#qui-nous-sommes" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Qui nous sommes
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
            <Link href="/fr#notre-approche" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Notre approche
            </Link>
            <Link href="/fr#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Expertise
            </Link>
            <Link href="/fr#temoignages" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Témoignages
            </Link>
            <Link href="/fr/blog" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Blog
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Button 
              onClick={() => setShowDemo(true)}
              className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Réserver une démo
            </Button>
            <LanguageSwitcher currentLang="fr" targetPath="/product" />
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-emineon-blue ml-auto"
            aria-label="Ouvrir le menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-7 h-7 text-emineon-blue" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-emineon-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-emineon-blue/90 z-10" />
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/Hero - ATS .mp4"
          loop
          muted
          playsInline
          preload="metadata"
        />
        
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="mb-8">
              <Image src="/Emineon logo_tree_white.png" alt="Emineon Logo" width={120} height={120} className="mx-auto" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Votre ATS & CRM<br />alimenté par l'IA
            </h1>
            <p className="text-xl sm:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              Transformez votre processus de recrutement avec l'intelligence artificielle. Source, engage, interviewe et présente les candidats plus efficacement que jamais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setShowDemo(true)}
                className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Réserver une démo
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-emineon-blue px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
              >
                <Link href="https://app-emineon.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Essai gratuit
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-3 bg-black/50 rounded-lg p-3">
          <button onClick={handlePlayPause} className="text-white hover:text-emineon-orange transition-colors">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button onClick={handleMuteToggle} className="text-white hover:text-emineon-orange transition-colors">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button onClick={handleFullscreen} className="text-white hover:text-emineon-orange transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Get Solution Section */}
      <section className="py-20 bg-gradient-to-r from-emineon-blue to-blue-600 text-white">
        <div className="container-mobile text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Obtenez une solution adaptée à votre entreprise
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Chaque entreprise est unique. Nos solutions ATS & CRM alimentées par l'IA s'adaptent à vos processus spécifiques et évoluent avec vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setShowDemo(true)}
                className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Parler à un expert
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-emineon-blue px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
              >
                <Link href="https://calendly.com/david-v-emineon" target="_blank" rel="noopener noreferrer">
                  Planifier un appel
                </Link>
              </Button>
            </div>
            <p className="text-sm opacity-70 mt-4">
              Contact: info@emineon.com
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container-mobile">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-emineon-blue mb-4">
              Fonctionnalités qui transforment votre recrutement
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              De la recherche de candidats aux présentations finales, notre plateforme IA automatise et améliore chaque étape de votre processus de recrutement.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emineon-blue/5">
        <div className="container-mobile">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-emineon-blue mb-4">
              Résultats prouvés
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Notre plateforme IA transforme déjà les processus de recrutement d'entreprises innovantes
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatsCard 
              number="70%" 
              label="Gain de temps" 
              description="Réduction du temps administratif de recrutement"
            />
            <StatsCard 
              number="3x" 
              label="Plus rapide" 
              description="Sourcing et engagement des candidats"
            />
            <StatsCard 
              number="90%" 
              label="Satisfaction" 
              description="Taux de satisfaction client"
            />
          </div>
        </div>
      </section>

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
            {demoFormSubmitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🎉</div>
                <div className="text-xl font-semibold text-emineon-blue mb-2">Merci !</div>
                <div className="text-neutral-700">Nous avons reçu votre demande de démo et vous contacterons bientôt pour planifier votre démo personnalisée.</div>
                <Button 
                  type="button"
                  onClick={() => setShowDemo(false)}
                  className="mt-6 px-6 py-3 text-mobile-base font-semibold touch-target btn-mobile bg-emineon-blue text-white hover:bg-emineon-blue/90"
                >
                  Fermer
                </Button>
              </div>
            ) : (
              <form className="space-y-3 sm:space-y-4" onSubmit={handleDemoFormSubmit} noValidate>
                <div>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Nom complet" 
                    value={demoForm.name}
                    onChange={handleDemoFormChange}
                    className={`w-full border rounded-lg px-4 py-3 sm:py-3 text-mobile-base mobile-input focus:outline-none focus:ring-2 focus:ring-emineon-blue touch-target ${demoFormErrors.name ? "border-red-500" : "border-neutral-300"}`}
                    required 
                  />
                  {demoFormErrors.name && <div className="text-red-500 text-xs mt-1">{demoFormErrors.name}</div>}
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email professionnel" 
                    value={demoForm.email}
                    onChange={handleDemoFormChange}
                    className={`w-full border rounded-lg px-4 py-3 sm:py-3 text-mobile-base mobile-input focus:outline-none focus:ring-2 focus:ring-emineon-blue touch-target ${demoFormErrors.email ? "border-red-500" : "border-neutral-300"}`}
                    required 
                  />
                  {demoFormErrors.email && <div className="text-red-500 text-xs mt-1">{demoFormErrors.email}</div>}
                </div>
                <div>
                  <input 
                    type="text" 
                    name="company"
                    placeholder="Nom de l'entreprise" 
                    value={demoForm.company}
                    onChange={handleDemoFormChange}
                    className={`w-full border rounded-lg px-4 py-3 sm:py-3 text-mobile-base mobile-input focus:outline-none focus:ring-2 focus:ring-emineon-blue touch-target ${demoFormErrors.company ? "border-red-500" : "border-neutral-300"}`}
                    required 
                  />
                  {demoFormErrors.company && <div className="text-red-500 text-xs mt-1">{demoFormErrors.company}</div>}
                </div>
                <div>
                  <select 
                    name="companySize"
                    value={demoForm.companySize}
                    onChange={handleDemoFormChange}
                    className={`w-full border rounded-lg px-4 py-3 sm:py-3 text-mobile-base mobile-input focus:outline-none focus:ring-2 focus:ring-emineon-blue touch-target ${demoFormErrors.companySize ? "border-red-500" : "border-neutral-300"}`}
                    required
                  >
                    <option value="">Taille de l'entreprise</option>
                    <option value="1-10">1-10 employés</option>
                    <option value="11-50">11-50 employés</option>
                    <option value="51-200">51-200 employés</option>
                    <option value="200+">200+ employés</option>
                  </select>
                  {demoFormErrors.companySize && <div className="text-red-500 text-xs mt-1">{demoFormErrors.companySize}</div>}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button 
                    type="submit"
                    disabled={demoFormLoading}
                    className="flex-1 bg-emineon-blue hover:bg-emineon-blue/90 py-3 sm:py-2 text-mobile-base font-semibold touch-target btn-mobile text-white hover:text-white disabled:opacity-50"
                  >
                    {demoFormLoading ? 'Envoi...' : 'Planifier la démo'}
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setShowDemo(false)}
                    className="px-6 py-3 sm:py-2 text-mobile-base font-semibold touch-target btn-mobile bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Annuler
                  </Button>
                </div>
                {demoFormApiError && <div className="text-red-500 text-xs mt-2 text-center">{demoFormApiError}</div>}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 