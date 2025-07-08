"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Users, Search, MessageSquare, Calendar, BarChart3, Zap, Shield, Globe, ChevronRight, Play, Star, Menu, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { createPortal } from "react-dom";
import Modal from '@/components/ui/Modal';

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
  const [showDemoVideo, setShowDemoVideo] = useState(false);
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

  // Demo video controls state
  const demoVideoRef = useRef<HTMLVideoElement>(null);
  const [demoIsPlaying, setDemoIsPlaying] = useState(false);
  const [demoUserStarted, setDemoUserStarted] = useState(false);
  const [demoIsMuted, setDemoIsMuted] = useState(true);
  const [demoProgress, setDemoProgress] = useState(0);
  const [demoDuration, setDemoDuration] = useState(0);
  const [demoSeeking, setDemoSeeking] = useState(false);

  // Detect mobile device
  const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

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

  // Demo video control handlers
  const handleDemoFullscreen = () => {
    if (demoVideoRef.current) {
      if (demoVideoRef.current.requestFullscreen) {
        demoVideoRef.current.requestFullscreen();
      } else if ((demoVideoRef.current as any).webkitRequestFullscreen) {
        (demoVideoRef.current as any).webkitRequestFullscreen();
      } else if ((demoVideoRef.current as any).msRequestFullscreen) {
        (demoVideoRef.current as any).msRequestFullscreen();
      }
    }
  };

  const handleDemoPlayPause = () => {
    if (!demoVideoRef.current) return;
    if (demoVideoRef.current.paused) {
      demoVideoRef.current.play();
      setDemoIsPlaying(true);
    } else {
      demoVideoRef.current.pause();
      setDemoIsPlaying(false);
    }
  };

  const handleDemoUserPlay = () => {
    if (!demoVideoRef.current) return;
    demoVideoRef.current.muted = false;
    setDemoIsMuted(false);
    demoVideoRef.current.play();
    setDemoIsPlaying(true);
    setDemoUserStarted(true);
  };

  const handleDemoMuteToggle = () => {
    if (!demoVideoRef.current) return;
    demoVideoRef.current.muted = !demoVideoRef.current.muted;
    setDemoIsMuted(demoVideoRef.current.muted);
  };

  const handleDemoSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!demoVideoRef.current) return;
    const time = parseFloat(e.target.value);
    demoVideoRef.current.currentTime = time;
    setDemoProgress(time);
  };

  const formatDemoTime = (t: number) => {
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

  // Update demo video progress
  useEffect(() => {
    const video = demoVideoRef.current;
    if (!video) return;
    const update = () => {
      setDemoProgress(video.currentTime);
      setDemoDuration(video.duration || 0);
    };
    video.addEventListener('timeupdate', update);
    video.addEventListener('durationchange', update);
    return () => {
      video.removeEventListener('timeupdate', update);
      video.removeEventListener('durationchange', update);
    };
  }, [showDemoVideo]);

  const features = [
    {
      icon: Search,
      title: "Sourcing Alimenté par l'IA",
      description: "Trouvez les meilleurs candidats avec une recherche en langage naturel au lieu de filtres booléens complexes.",
      benefits: [
        "Recherchez dans toutes les données de candidats naturellement",
        "Algorithmes de correspondance alimentés par l'IA",
        "Temps réduit de plusieurs heures à quelques minutes",
        "Recommandations intelligentes de candidats"
      ]
    },
    {
      icon: MessageSquare,
      title: "Engagement Automatisé",
      description: "Configurez des campagnes d'approche personnalisées et des suivis pour des taux de réponse plus élevés.",
      benefits: [
        "Séquences d'emails personnalisées",
        "Communication multi-canaux",
        "Planification automatisée des suivis",
        "Taux de réponse plus élevés des candidats"
      ]
    },
    {
      icon: Calendar,
      title: "Gestion Intelligente des Entretiens",
      description: "Concentrez-vous sur la connexion humaine pendant que l'IA gère les notes et maintient votre ATS à jour.",
      benefits: [
        "Résumés d'entretiens automatisés",
        "Mises à jour ATS en temps réel",
        "Automatisation de la planification d'entretiens",
        "Insights d'évaluation des candidats"
      ]
    },
    {
      icon: BarChart3,
      title: "Présentations Intelligentes",
      description: "Générez des présentations de candidats adaptées qui renforcent la confiance en un clic.",
      benefits: [
        "Génération de présentations en un clic",
        "Templates personnalisables",
        "Formatage spécifique au client",
        "Sorties professionnelles de marque"
      ]
    }
  ];

  const workflowSteps = [
    {
      id: 'source',
      title: 'Sourcer',
      icon: Search,
      description: 'Trouvez les meilleurs candidats avec la recherche alimentée par l\'IA',
      details: [
        'Recherche de candidats en langage naturel',
        'Algorithmes de correspondance alimentés par l\'IA',
        'Base de données complète de talents',
        'Filtrage intelligent et recommandations'
      ]
    },
    {
      id: 'engage',
      title: 'Engager',
      icon: MessageSquare,
      description: 'Automatisez l\'outreach personnalisé à grande échelle',
      details: [
        'Campagnes d\'emails personnalisées',
        'Communication multi-canaux',
        'Séquences de suivi automatisées',
        'Suivi des réponses et analyses'
      ]
    },
    {
      id: 'interview',
      title: 'Interviewer',
      icon: Calendar,
      description: 'Concentrez-vous sur les conversations, pas sur la prise de notes',
      details: [
        'Résumés d\'entretiens alimentés par l\'IA',
        'Mises à jour automatiques de l\'ATS',
        'Coordination de la planification',
        'Outils d\'évaluation des candidats'
      ]
    },
    {
      id: 'present',
      title: 'Présenter',
      icon: BarChart3,
      description: 'Créez des présentations de candidats gagnantes',
      details: [
        'Génération de présentations en un clic',
        'Templates de marque client',
        'Formatage professionnel',
        'Mises en page personnalisables'
      ]
    }
  ] as const;

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
              <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={32} height={32} />
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
                className="block px-6 py-4 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200 touch-target"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  {link.label}
                  {link.isNew && (
                    <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-1 rounded-full font-semibold">NOUVEAU</span>
                  )}
                </span>
              </Link>
            ))}
          </div>
          {/* Contact button and language switcher */}
          <div className="p-4 border-t border-gray-200 bg-white safe-bottom">
            <Link 
              href="/fr/contact" 
              className="block w-full bg-emineon-blue text-white text-center py-4 px-4 rounded-lg font-medium mb-4 hover:bg-emineon-blue/90 transition-colors touch-target"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contactez-nous
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
        <section className="py-12 sm:py-20 md:py-28 text-white relative overflow-hidden hero-mobile min-h-[70vh] sm:min-h-[80vh]">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
        <video 
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
          muted
              loop
          playsInline
          preload="metadata"
              style={{ 
                minHeight: '100%', 
                minWidth: '100%',
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <source src="/Hero - ATS .mp4" type="video/mp4" />
            </video>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
            {/* Additional gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-emineon-blue/70 via-emineon-blue/60 to-emineon-blue/50" />
          </div>
          
          <div className="container-mobile relative z-10">
            <div className="max-w-4xl mx-auto text-center">
          <motion.div
                initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-4 sm:mb-6"
              >
                <span className="inline-block bg-emineon-orange text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-mobile-sm sm:text-sm font-semibold mb-3 sm:mb-4 shadow-lg">
                  Plateforme de Recrutement Alimentée par l'IA
                </span>
                <h1 className="text-mobile-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 drop-shadow-lg">
                  Placez des Candidats<br />
                  <span className="text-emineon-orange drop-shadow-lg">Plus Rapidement avec l'IA</span>
            </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-mobile-base sm:text-xl opacity-95 max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-md"
              >
                Emineon ATS & CRM est la plateforme alimentée par l'IA conçue pour aider les professionnels RH, consultants, recruteurs et employés à travailler plus rapidement, plus intelligemment et à conclure plus de placements. La technologie révolutionnaire rencontre l'expertise humaine.
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
                  className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-6 sm:px-8 py-4 text-mobile-base sm:text-lg font-semibold touch-target btn-mobile w-full sm:w-auto shadow-lg"
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
                  className="bg-white/20 border-white text-white hover:bg-white hover:text-emineon-blue px-6 sm:px-8 py-4 text-mobile-base sm:text-lg font-semibold backdrop-blur-sm touch-target btn-mobile w-full sm:w-auto shadow-lg"
              >
                <Link href="https://app-emineon.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Essai gratuit
                </Link>
              </Button>
          </motion.div>
        </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-12 sm:py-20 bg-neutral-100">
          <div className="container-mobile">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-mobile-2xl sm:text-3xl md:text-4xl font-bold text-emineon-blue mb-3 sm:mb-4">
                La plateforme tout-en-un, alimentée par l'IA pour les cabinets de conseil, RH et recrutement
              </h2>
              <p className="text-mobile-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                Rationalisez l'ensemble de votre processus de recrutement avec l'automatisation intelligente et une conception centrée sur l'humain
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
                Fonctionnalités Révolutionnaires
              </h2>
              <p className="text-mobile-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                Conçu pour le recruteur moderne. Alimenté par l'IA. Conçu pour des résultats.
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
                <h3 className="text-mobile-xl sm:text-2xl font-bold mb-3 sm:mb-4">Single Source of Truth</h3>
                <p className="text-white/90 text-mobile-sm sm:text-base">
                  Understands & stores everything you've ever heard, said, or wrote. All your recruitment data in one intelligent system.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emineon-orange" />
                </div>
                <h3 className="text-mobile-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI Co-Pilot</h3>
                <p className="text-white/90 text-mobile-sm sm:text-base">
                  Answers questions based on your entire company's real-time knowledge. Your personal recruitment assistant.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 sm:mb-6">
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-emineon-orange" />
                </div>
                <h3 className="text-mobile-xl sm:text-2xl font-bold mb-3 sm:mb-4">Analytics Everywhere</h3>
                <p className="text-white/90 text-mobile-sm sm:text-base">
                  Gain total customization over all the metrics you need. Data-driven insights for better decisions.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Philosophy Section */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container-mobile">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-mobile-2xl sm:text-3xl md:text-4xl font-bold text-emineon-blue mb-4 sm:mb-6">
                  Chez Emineon, nous croyons que les logiciels RH devraient travailler pour vous, pas contre vous.
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
                    <h3 className="text-mobile-lg sm:text-xl font-bold text-emineon-blue mb-2 sm:mb-3">Pas de poudre aux yeux</h3>
                    <p className="text-mobile-sm sm:text-base text-neutral-700 leading-relaxed">
                      La plupart des fournisseurs de logiciels RH cachent leurs tarifs. Pas nous. C'est directement sur notre site web. Notre essai n'est pas une démo édulcorée – c'est notre produit complet. Nous pensons que si nous ne sommes pas prêts à être transparents avant que vous achetiez, pourquoi nous feriez-vous confiance après ?
                    </p>
                  </div>

                  <div>
                    <h3 className="text-mobile-lg sm:text-xl font-bold text-emineon-blue mb-2 sm:mb-3">La simplicité n'est pas simple</h3>
                    <p className="text-mobile-sm sm:text-base text-neutral-700 leading-relaxed">
                      Notre logiciel semble facile parce que nous avons fait le travail difficile. Sous le capot, il est complexe et puissant. Mais vous n'avez pas besoin de le savoir. Vous devez juste savoir que ça marche. Nous utilisons un excellent design et l'IA pour cacher la complexité, pas pour simplifier à outrance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-mobile-lg sm:text-xl font-bold text-emineon-blue mb-2 sm:mb-3">Un logiciel ne devrait pas être un second travail</h3>
                    <p className="text-mobile-sm sm:text-base text-neutral-700 leading-relaxed">
                      Vous en avez déjà assez dans votre assiette. Votre logiciel RH ne devrait pas en rajouter. Nous nous sommes assurés qu'Emineon s'intègre à vos outils existants, vient avec un support expert, et ne nécessite pas un doctorat pour être mis en place. Parce que votre travail est de diriger votre entreprise, pas de devenir expert de notre logiciel.
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
                      Nous ne nous contentons pas de coller un chatbot IA sur un vieux logiciel en nous disant que c'est fait. Nous intégrons l'IA dans chaque partie d'Emineon. Elle est là quand vous en avez besoin, faisant le gros du travail en arrière-plan. Au fur et à mesure que l'IA évolue, Emineon évoluera aussi. Nous nous engageons à vous maintenir à la pointe de ce qui est possible.
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
                      "Chaque fonctionnalité d'Emineon existe parce qu'elle résout un vrai problème auquel nos utilisateurs font face. Ni plus, ni moins."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Pricing Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-mobile">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-mobile-2xl sm:text-3xl md:text-4xl font-bold text-emineon-blue mb-3 sm:mb-4">
                Obtenez une Solution Conçue pour Votre Entreprise
            </h2>
              <p className="text-mobile-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                Chaque entreprise de recrutement est unique. Laissez-nous créer une solution personnalisée et un plan de tarification qui correspondent à vos besoins spécifiques et à votre budget.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                {/* Left side - Benefits */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emineon-blue/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-6 h-6 text-emineon-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emineon-blue mb-2">Implémentation Personnalisée</h3>
                      <p className="text-neutral-600">Configuration et paramétrage sur mesure pour correspondre à vos flux de travail et processus existants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emineon-blue/10 flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-emineon-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emineon-blue mb-2">Tarification d'Équipe Flexible</h3>
                      <p className="text-neutral-600">Tarification évolutive qui grandit avec votre équipe, des recruteurs indépendants aux organisations d'entreprise</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emineon-blue/10 flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-emineon-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emineon-blue mb-2">Migration & Intégration</h3>
                      <p className="text-neutral-600">Migration de données transparente depuis votre ATS actuel et intégration avec vos outils existants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emineon-blue/10 flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-emineon-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emineon-blue mb-2">Support Dédié</h3>
                      <p className="text-neutral-600">Spécialiste d'intégration personnel et support prioritaire continu pour votre réussite</p>
                    </div>
                  </div>
                </div>
                
                {/* Right side - CTA */}
                <div className="bg-white rounded-2xl border border-emineon-blue/10 shadow-lg p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-emineon-blue mb-3">Prêt à Commencer ?</h3>
                    <p className="text-neutral-600">
                      Contactez-nous pour une démo personnalisée et un devis sur mesure basé sur vos exigences spécifiques.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
              <Button
                size="lg"
                      asChild
                      className="w-full bg-emineon-blue hover:bg-emineon-blue/90 px-6 py-4 text-lg font-semibold"
                      style={{ color: 'white' }}
              >
                      <Link href="https://calendly.com/david-v-emineon" target="_blank" rel="noopener noreferrer">
                        <Calendar className="mr-2 h-5 w-5" />
                        Planifier une Démo Personnalisée
                      </Link>
              </Button>
                    
              <Button
                size="lg"
                      variant="outline"
                asChild
                      className="w-full border-emineon-orange text-emineon-orange hover:bg-emineon-orange hover:text-white px-6 py-4 text-lg font-semibold"
                    >
                      <Link href="/fr/contact" className="flex items-center justify-center">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Contact pour Devis Personnalisé
                      </Link>
                    </Button>
                    
                    <div className="text-center pt-4 border-t border-gray-100">
                      <p className="text-sm text-neutral-500 mb-3">Ou essayez notre plateforme sans risque</p>
                      <Button 
                variant="outline"
                        asChild
                        className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2"
              >
                        <Link href="https://app-emineon.vercel.app/" target="_blank" rel="noopener noreferrer">
                          Commencer l'Essai Gratuit
                </Link>
              </Button>
            </div>
                  </div>
                </div>
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
                Rejoignez les équipes RH, cabinets de conseil et agences de recrutement avant-gardistes qui utilisent déjà Emineon ATS & CRM pour placer plus de candidats plus rapidement.
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
                {hasMounted && (
                  <Button 
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white text-white hover:bg-white hover:text-emineon-blue px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                    onClick={() => setShowDemoVideo(true)}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Regarder la Démo
                  </Button>
                )}
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-emineon-blue px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                  asChild
                >
                  <Link href="https://app-emineon.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Commencer l'Essai Gratuit
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
              <Image src="/Emineon logo_tree_white.png" alt="Emineon logo" height={40} width={40} />
            </motion.div>
            <span className="text-sm hidden md:inline">© {new Date().getFullYear()} EMINEON. Tous droits réservés.</span>
          </div>
          <span className="text-sm md:hidden text-center block mt-2">© {new Date().getFullYear()} EMINEON. Tous droits réservés.</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-white">
              Politique de Confidentialité
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              Conditions d'Utilisation
            </Link>
            <Link href="/fr/contact" className="text-sm hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      {/* Feature Detail Modals */}
      {hasMounted && (
        <Modal open={activeFeatureModal !== null} onClose={() => setActiveFeatureModal(null)} ariaLabel="En savoir plus">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-mobile">
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
                      {activeFeatureModal === 'source' && "Sourcing de Candidats Alimenté par l'IA"}
                      {activeFeatureModal === 'engage' && 'Outreach et Engagement Automatisés'}
                      {activeFeatureModal === 'interview' && 'Gestion Intelligente des Entretiens'}
                      {activeFeatureModal === 'present' && 'Présentations Intelligentes de Candidats'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {activeFeatureModal === 'source' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Natural Language Search Engine</h3>
                    <p className="text-neutral-700 mb-6">
                      Find qualified talent using natural language. Just describe who you're searching for, no Boolean operators needed. Our AI handles the complex search logic behind the scenes.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h4 className="font-semibold text-emineon-blue mb-3">Example Search</h4>
                      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                        <p className="text-sm text-gray-600 mb-2">Instead of:</p>
                        <code className="text-sm text-red-600">(React OR Angular) AND (TypeScript OR JavaScript) AND (Senior OR Lead) AND experience</code>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-emineon-blue/20">
                        <p className="text-sm text-gray-600 mb-2">Simply type:</p>
                        <p className="text-emineon-blue font-medium">"Senior frontend developer with React and TypeScript experience"</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Smart Candidate Scoring</h3>
                    <p className="text-neutral-700 mb-4">
                      Our AI analyzes your requirements and scores candidates based on experience, skills, and industry fit to surface the best matches instantly.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="text-green-600 font-bold text-lg">96%</div>
                        <div className="text-sm text-green-700">Excellent Match</div>
                        <div className="text-xs text-green-600 mt-1">All requirements met</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="text-blue-600 font-bold text-lg">89%</div>
                        <div className="text-sm text-blue-700">Strong Match</div>
                        <div className="text-xs text-blue-600 mt-1">Minor skill gaps</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <div className="text-orange-600 font-bold text-lg">75%</div>
                        <div className="text-sm text-orange-700">Fair Match</div>
                        <div className="text-xs text-orange-600 mt-1">Some training needed</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Complete Candidate Snapshot</h3>
                    <p className="text-neutral-700 mb-4">
                      Our AI analyzes every interaction with your candidates - from emails and calls to notes and meetings - to build a complete understanding of their qualifications and career trajectory.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Emails', 'Calls', 'Notes', 'Messages', 'Meetings', 'Reports'].map((item) => (
                        <span key={item} className="bg-emineon-blue/10 text-emineon-blue px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
            ))}
          </div>
        </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">LinkedIn Integration</h3>
                    <p className="text-neutral-700 mb-4">
                      Import candidates directly from LinkedIn using our Chrome extension. Sync individual profiles or import entire search results in bulk.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>One-click profile import from LinkedIn</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Bulk import from LinkedIn Recruiter lists</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Automatic data enrichment with verified emails</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeFeatureModal === 'engage' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Multi-Channel Outreach Campaigns</h3>
                    <p className="text-neutral-700 mb-6">
                      Create intelligent outreach sequences that adapt to your prospects' behavior across LinkedIn, email, and WhatsApp. No more manual follow-ups or missed opportunities.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-emineon-blue mb-4">Example Campaign Flow</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                          <span>Initial Email</span>
          </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm">↓</div>
                          <span className="text-gray-600">Wait 3 days</span>
        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">2</div>
                          <span>If opened: LinkedIn InMail | If not opened: Connection Request</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm">↓</div>
                          <span className="text-gray-600">Wait 1 week</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">3</div>
                          <span>WhatsApp follow-up (if available)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Personalization at Scale</h3>
                    <p className="text-neutral-700 mb-4">
                      Go beyond simple mail merge. Craft highly personalized messages using past conversations, communication style, and candidate background.
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">AI-Generated Message:</div>
                      <div className="space-y-2">
                        <p>Hi <span className="bg-yellow-100 px-1 rounded">Sarah</span>,</p>
                        <p><span className="bg-blue-100 px-1 rounded">Following up on our discussion about cloud architecture last month</span>, I wanted to reach out about an exciting opportunity.</p>
                        <p>We're hiring for a <span className="bg-green-100 px-1 rounded">Senior Backend Engineer</span> position with greater team responsibilities.</p>
                        <p><span className="bg-purple-100 px-1 rounded">Would you be available for a brief call to discuss this further?</span></p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Centralized Communication Hub</h3>
                    <p className="text-neutral-700 mb-4">
                      All your candidate communications in one place. Message across WhatsApp, LinkedIn, and email without switching platforms.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-blue-600 font-semibold">Email</div>
                        <div className="text-sm text-blue-600 mt-1">Professional outreach</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-blue-600 font-semibold">LinkedIn</div>
                        <div className="text-sm text-blue-600 mt-1">InMails & messages</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-green-600 font-semibold">WhatsApp</div>
                        <div className="text-sm text-green-600 mt-1">Personal & work chats</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">AI-Powered Response Analytics</h3>
                    <p className="text-neutral-700 mb-4">
                      Get instant insights about candidate engagement and optimize your outreach strategy with real-time analytics.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Open and response rate tracking</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Best performing message templates</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emineon-blue" />
                        <span>Optimal send times and frequencies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeFeatureModal === 'interview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">AI-Powered Note Taking</h3>
                    <p className="text-neutral-700 mb-6">
                      Focus on the conversation while our AI assistant automatically captures comprehensive notes and key discussion points from every interview.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-emineon-blue mb-3">Live Transcription</h4>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-600">Recording in progress...</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          "I have 8+ years of experience with React and TypeScript, and I've led three major frontend projects at my current company..."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Intelligent Interview Summaries</h3>
                    <p className="text-neutral-700 mb-4">
                      Get AI-generated summaries of your interviews and ask questions about any past conversation. Never lose important details again.
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-semibold text-emineon-blue mb-2">Interview Summary - Sarah Chen</div>
                      <div className="text-sm text-gray-600 mb-3">March 15, 2024 • 45 minutes</div>
                      <div className="space-y-2 text-sm">
                        <div><strong>Key Strengths:</strong> Strong technical background in distributed systems, excellent communication skills</div>
                        <div><strong>Experience:</strong> 8+ years React/TypeScript, led 3 major projects</div>
                        <div><strong>Salary Expectations:</strong> $145,000 (updated from $120,000)</div>
                        <div><strong>Next Steps:</strong> Schedule technical round with hiring manager</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Automatic ATS Updates</h3>
                    <p className="text-neutral-700 mb-4">
                      AI suggests updates to candidate fields based on information discussed during interviews. Keep your database current effortlessly.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="text-green-700 font-semibold text-sm">✓ Current Salary Updated</div>
                        <div className="text-green-600 text-sm">$120,000 → $145,000</div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="text-blue-700 font-semibold text-sm">+ Education Added</div>
                        <div className="text-blue-600 text-sm">MSc Computer Science, Stanford University 2019</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Smart Scheduling & Pipeline Management</h3>
                    <p className="text-neutral-700 mb-4">
                      Coordinate interviews effortlessly with automatic calendar sync and customizable pipeline stages.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-emineon-blue mb-3">Available Slots</h5>
                        <div className="space-y-2">
                          <div className="bg-white border border-gray-200 rounded p-2 text-sm">Tuesday, Mar 12 - 2:00 PM</div>
                          <div className="bg-white border border-gray-200 rounded p-2 text-sm">Tuesday, Mar 12 - 3:00 PM</div>
                          <div className="bg-white border border-gray-200 rounded p-2 text-sm">Wednesday, Mar 13 - 11:00 AM</div>
                          <div className="text-emineon-blue text-sm">+ 12 more slots available</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-emineon-blue mb-3">Custom Pipeline Labels</h5>
                        <div className="space-y-2">
                          <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Phone Screen</span>
                          <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm ml-2">Technical Interview</span>
                          <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-sm ml-2">Final Round</span>
                          <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm ml-2">Awaiting Feedback</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeFeatureModal === 'present' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">One-Click Candidate Reports</h3>
                    <p className="text-neutral-700 mb-6">
                      Generate professional candidate presentations in seconds. Never start from a blank page again with our AI-powered report generation.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-emineon-blue mb-3">Document Inputs</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <div className="text-red-500 font-semibold text-sm">PDF</div>
                          <div className="text-xs text-gray-600">Candidate CV</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <div className="text-blue-500 font-semibold text-sm">DOC</div>
                          <div className="text-xs text-gray-600">Job Description</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                          <div className="text-green-500 font-semibold text-sm">DOCX</div>
                          <div className="text-xs text-gray-600">Interview Notes</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Custom Templates & Branding</h3>
                    <p className="text-neutral-700 mb-4">
                      Use your company's branded templates. Generate reports directly exportable in Word or PowerPoint, ready to share with clients.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-600 font-semibold mb-2">Word Export</div>
                        <div className="text-sm text-blue-600">Professional documents with your branding</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-orange-600 font-semibold mb-2">PowerPoint Export</div>
                        <div className="text-sm text-orange-600">Presentation-ready slides for client meetings</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Intelligent Content Generation</h3>
                    <p className="text-neutral-700 mb-4">
                      Our AI analyzes candidate data and creates tailored presentations highlighting the most relevant experience and skills for each specific role.
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-semibold text-emineon-blue mb-3">Auto-Generated Sections</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Executive Summary</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Relevant Experience Highlights</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Skills Match Analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Cultural Fit Assessment</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emineon-blue" />
                          <span>Interview Summary & Recommendations</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">CV Formatting & Tailoring</h3>
                    <p className="text-neutral-700 mb-4">
                      Reformat any CV into your company template in seconds. Create consistent, professional presentations that match your brand standards.
                    </p>
                    <div className="bg-gradient-to-r from-gray-100 to-emineon-blue/5 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Original CV</div>
                          <div className="text-xs text-gray-500 mt-1">Various formats</div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-emineon-blue" />
                        <div className="text-center">
                          <div className="text-sm text-emineon-blue font-semibold">Branded CV</div>
                          <div className="text-xs text-emineon-blue mt-1">Your template</div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-emineon-blue" />
                        <div className="text-center">
                          <div className="text-sm text-green-600 font-semibold">Client Ready</div>
                          <div className="text-xs text-green-600 mt-1">Professional output</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-emineon-blue mb-4">Multi-Language Support</h3>
                    <p className="text-neutral-700 mb-4">
                      Generate presentations in any language. Our AI automatically uses the right language model for optimal results.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['English', 'French', 'German', 'Spanish', 'Dutch', 'Italian'].map((lang) => (
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
                      Essayer l'Essai Gratuit
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Demo Video Modal */}
      {hasMounted && (
        <Modal open={showDemoVideo} onClose={() => setShowDemoVideo(false)} ariaLabel="Regarder la Démo">
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group">
            <video
              src="/Emineon features - ppt.mp4"
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Désolé, votre navigateur ne supporte pas la vidéo intégrée.
            </video>
          </div>
          <div className="pb-6 text-center text-emineon-orange font-semibold">Présentation des fonctionnalités Emineon</div>
        </Modal>
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
            <h3 className="text-mobile-xl sm:text-2xl font-bold text-emineon-blue mb-3 sm:mb-4">Réserver une Démo</h3>
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
                    placeholder="Nom Complet" 
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
                    placeholder="Email Professionnel" 
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
                    placeholder="Nom de l'Entreprise" 
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
                    <option value="">Taille de l'Entreprise</option>
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
                    {demoFormLoading ? 'Envoi en cours...' : 'Planifier une Démo'}
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