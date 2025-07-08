"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Users, Menu, Linkedin, Instagram, Maximize2, Pause, Play, Volume2, VolumeX, Search, MessageSquare, Calendar, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { createPortal } from "react-dom";

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
        href="/find-talent"
        className="pointer-events-auto flex items-center gap-3 bg-emineon-blue text-white px-6 py-4 rounded-t-xl shadow-lg hover:bg-emineon-orange transition-colors duration-200 text-lg font-semibold"
        style={{ minWidth: 320, maxWidth: 480 }}
      >
        <Users className="w-6 h-6 text-white" />
        <span>Let's build your global team</span>
      </a>
    </motion.div>
  );
}

export default function Home() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", company: "", challenge: "" });
  const [leadFormErrors, setLeadFormErrors] = useState<{ [key: string]: string }>({});
  const [leadFormLoading, setLeadFormLoading] = useState(false);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const [leadFormApiError, setLeadFormApiError] = useState<string | null>(null);

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

  const handleGetStarted = () => {
    const section = document.getElementById("get-started-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  function validateLeadForm() {
    const errs: { [key: string]: string } = {};
    if (!leadForm.name.trim()) errs.name = "Name is required.";
    if (!leadForm.email.trim()) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(leadForm.email)) errs.email = "Enter a valid email.";
    if (!leadForm.challenge.trim()) errs.challenge = "Challenge or goal is required.";
    return errs;
  }

  function handleLeadFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setLeadForm({ ...leadForm, [e.target.name]: e.target.value });
    setLeadFormErrors({ ...leadFormErrors, [e.target.name]: "" });
  }

  async function handleLeadFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateLeadForm();
    if (Object.keys(errs).length) {
      setLeadFormErrors(errs);
      return;
    }
    setLeadFormLoading(true);
    setLeadFormApiError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setLeadFormApiError(data.error || 'Failed to send message.');
        setLeadFormLoading(false);
        return;
      }
      setLeadFormSubmitted(true);
    } catch (err) {
      setLeadFormApiError('Something went wrong. Please try again.');
    } finally {
      setLeadFormLoading(false);
    }
  }

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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md safe-top">
        <div className="container-mobile flex h-16 sm:h-20 items-center justify-between py-2 sm:py-4 relative">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 touch-target">
              <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={40} height={40} className="sm:w-12 sm:h-12" />
              </motion.div>
              <span className="flex flex-col leading-tight">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
                <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase hidden sm:block">forge your edge.</span>
              </span>
            </Link>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Who we are
            </Link>
            <Link href="/product" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-orange after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              <span className="flex items-center gap-1">
                ATS & CRM
                <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-0.5 rounded-full font-semibold">NEW</span>
              </span>
            </Link>
            <Link href="#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Services
            </Link>
            <Link href="#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              How we work
            </Link>
            <Link href="#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Expertise
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Testimonials
            </Link>
            <Link href="/blog" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Blog
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg touch-target">Contact us</Link>
            <LanguageSwitcher currentLang="en" />
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
                    { href: "#who-we-are", label: "Who we are" },
                    { href: "/product", label: "ATS & CRM", isNew: true },
                    { href: "#services", label: "Services" },
                    { href: "#how-we-work", label: "How we work" },
                    { href: "#expertise", label: "Expertise" },
                    { href: "#testimonials", label: "Testimonials" },
                    { href: "/blog", label: "Blog" }
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
                          <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-1 rounded-full font-semibold">NEW</span>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
                
                {/* Contact button and language switcher */}
                <div className="p-4 border-t border-gray-200 bg-white safe-bottom">
                  <Link 
                    href="/contact" 
                    className="block w-full bg-emineon-blue text-white text-center py-4 px-4 rounded-lg font-medium mb-4 hover:bg-emineon-blue/90 transition-colors touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact us
                  </Link>
                  
                  <div className="flex justify-center">
                    <LanguageSwitcher currentLang="en" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden hero-mobile">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="https://res.cloudinary.com/emineon/video/upload/f_auto,q_auto/Homepage_hero_video_dsn3zo.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="container relative z-20 flex flex-col lg:flex-row items-center gap-6 sm:gap-12 py-12 sm:py-20 md:py-28">
            <div className="space-y-4 sm:space-y-6 lg:w-1/2 text-center lg:text-left">
              <motion.h1
                className="text-mobile-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Your partner in growth<br className="hidden sm:block" /> and innovation
              </motion.h1>
              <p className="text-mobile-lg sm:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 drop-shadow-md">
                At Emineon Consulting, we specialize in optimizing operations, driving sustainable growth, and delivering tailored services across industries.
              </p>
              <div className="pt-2 sm:pt-4">
                <p className="text-mobile-base sm:text-lg font-medium text-emineon-orange tracking-widest lowercase mb-2">forge your edge.</p>
                <p className="text-mobile-sm sm:text-sm text-white/80 italic">
                  [fɔːdʒ] verb – create (something) strong, enduring, or successful.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4 items-center lg:items-start justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-emineon-orange hover:bg-emineon-orange/90 text-white rounded-none px-8 py-4 text-mobile-base sm:text-lg font-semibold touch-target btn-mobile"
                  onClick={handleGetStarted}
                >
                  Get started
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 hidden lg:block" />
          </div>
        </section>

        {/* Find a Job / Hire Talent Section */}
        <section id="get-started-section" className="py-12 sm:py-16 bg-emineon-blue text-white scroll-mt-20">
          <div className="container-mobile">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-mobile-2xl sm:text-3xl font-bold mb-4">What are you looking for?</h2>
              <p className="text-mobile-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
                Whether you're seeking new opportunities or looking to build your team, EMINEON connects exceptional
                talent with forward-thinking organizations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white/10 p-6 sm:p-8 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-all card-mobile flex flex-col">
                <h3 className="text-mobile-xl sm:text-2xl font-bold mb-4">Find a job</h3>
                <p className="text-mobile-base sm:text-base mb-6">
                  Join our exclusive network of global professionals. Access opportunities with leading European
                  companies and advance your career.
                </p>
                <ul className="space-y-3 mb-6 sm:mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span className="text-mobile-sm sm:text-base">Access exclusive opportunities with top companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span className="text-mobile-sm sm:text-base">Benefit from our placement expertise and support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span className="text-mobile-sm sm:text-base">Grow your career with long-term partnerships</span>
                  </li>
                </ul>
                <Button className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8 mt-auto" asChild>
                  <Link href="/careers">
                    Join as talent <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-white/10 p-6 sm:p-8 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-all card-mobile flex flex-col">
                <h3 className="text-mobile-xl sm:text-2xl font-bold mb-4">Hire talent</h3>
                <p className="text-mobile-base sm:text-base mb-6">
                  Access our pool of rigorously vetted professionals across multiple disciplines to solve your talent
                  challenges.
                </p>
                <ul className="space-y-3 mb-6 sm:mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span className="text-mobile-sm sm:text-base">Connect with pre-vetted professionals within days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span className="text-mobile-sm sm:text-base">Flexible engagement models to suit your needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span className="text-mobile-sm sm:text-base">Comprehensive support throughout the process</span>
                  </li>
                </ul>
                <Button className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8 mt-auto" asChild>
                  <Link href="/find-talent">
                    Find talent <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8 text-center">Key services</h2>
            <p className="text-lg text-center text-neutral-700 mb-12">Flexible models. Pre-vetted talent. Results delivered.</p>
            <ServicesAnimatedCards />
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="py-20 bg-neutral-100">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8 text-center">Expertise</h2>
            <p className="text-lg text-center text-neutral-700 mb-8">Multi-disciplinary talent. Real impact across industries.</p>
            <ExpertiseTabs />
          </div>
        </section>

        {/* How We Work Section */}
        <section id="how-we-work" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">How we work</h2>
            <motion.div
              className="mb-8 p-6 bg-emineon-blue/10 rounded-lg"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg font-semibold text-emineon-blue text-center">
                At Emineon, people are at the heart of every talent decision. Our expert team leads the vetting and matching process, while AI-driven tools enhance speed, precision, and quality—never replacing the human touch, only empowering it.
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <AccordionHowWeWork />
            </div>
            <div className="mt-16 bg-emineon-blue p-8 rounded-lg">
              <h3 className="text-xl font-medium text-white mb-6">Ensuring excellence in every engagement</h3>
              <ExcellenceAccordion />
            </div>
          </div>
        </section>

        {/* Vetting Process Section */}
        <VettingProcessSection />

        {/* Remote Work Technology Section */}
        <section className="py-20 bg-neutral-100">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">Remote work enablement</h2>
            <p className="text-neutral-600 mb-12 max-w-2xl mx-auto text-center">
              We don't just match talent—we actively facilitate smooth collaboration through cutting-edge technology and best practices.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <RemoteWorkCard
                title="Immersive Collaboration"
                description="Leverage AR/VR workplace solutions, telepresence tools, and high-end video conferencing to make remote work feel local."
                hoverDetail="Experience virtual whiteboards, real-time co-creation, and seamless cross-border teamwork."
              />
              <RemoteWorkCard
                title="AI-Powered Management"
                description="AI-driven project management tools that automate status updates, flag delays, and predict roadblocks for real-time visibility."
                hoverDetail="Smart dashboards, predictive analytics, and instant reporting keep your projects on track."
              />
              <RemoteWorkCard
                title="Security & Infrastructure"
                description="Secure access and robust IT setup with VPNs, cloud dev environments, and encrypted communication for sensitive data."
                hoverDetail="Enterprise-grade security, compliance, and always-on support for peace of mind."
              />
              <RemoteWorkCard
                title="Seamless Onboarding"
                description="Personalized onboarding journeys and digital handbooks ensure every new team member is productive from day one."
                hoverDetail="Automated checklists, welcome sessions, and ongoing support for a smooth start."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-16">Trusted by industry leaders</h2>

            <div className="space-y-8">
              {[
                {
                  author: "CIO, Top European Tech Firm",
                  quote: "EMINEON helped us seamlessly integrate global talent into our operations, positioning us as industry leaders. Their remote work technology makes collaboration effortless despite geographic distances."
                },
                {
                  author: "COO, Global Manufacturer",
                  quote: "Their strategic talent matching transformed our development capabilities, driving measurable results. The quality of professionals in their network is truly exceptional."
                },
                {
                  author: "CFO, Leading Financial Institution",
                  quote: "The EMINEON team demonstrated exceptional expertise in delivering specialized talent solutions that exceeded our expectations. Their vetting process ensures only the best professionals join our team."
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
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-16">What sets us apart</h2>
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
                    🚀 New Product Launch
                  </span>
                  <h2 className="text-4xl font-bold mb-6">
                    Are you a recruitment firm?<br />
                    <span className="text-emineon-orange">Meet our ATS & CRM</span>
                  </h2>
                  <p className="text-xl opacity-90 mb-8">
                    The AI-first platform designed specifically for recruiters and staffers. Work faster, smarter, and close more placements with revolutionary technology.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <div className="text-3xl font-bold text-emineon-orange mb-1">2x</div>
                      <div className="text-sm opacity-80">More time on the phone</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emineon-orange mb-1">70%</div>
                      <div className="text-sm opacity-80">Reduction in admin time</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emineon-orange mb-1">1.5x</div>
                      <div className="text-sm opacity-80">Placements per month</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emineon-orange mb-1">AI</div>
                      <div className="text-sm opacity-80">Powered automation</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      asChild
                      size="lg"
                      className="bg-emineon-orange hover:bg-emineon-orange/90 text-white px-8 py-4 text-lg font-semibold"
                    >
                      <Link href="/product">
                        Explore ATS & CRM <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="bg-white/10 border-white text-white hover:bg-white hover:text-emineon-blue px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                      onClick={() => setShowDemoVideo(true)}
                    >
                      Watch Demo
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
                          <div className="font-semibold text-white">AI-Powered Sourcing</div>
                          <div className="text-sm text-white/80">Natural language candidate search</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-emineon-orange flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Automated Engagement</div>
                          <div className="text-sm text-white/80">Personalized outreach at scale</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-emineon-orange flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Smart Interviews</div>
                          <div className="text-sm text-white/80">AI-powered summaries & updates</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-emineon-orange flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Intelligent Presentations</div>
                          <div className="text-sm text-white/80">One-click candidate reports</div>
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
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Let's build your global team</h2>
              <p className="text-xl opacity-80 mb-8">
                Ready to overcome talent shortages and access exceptional professionals worldwide? Let's start the
                conversation.
              </p>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="space-y-2">
                  <p className="font-medium">Contact: info@emineon.com</p>
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
          </div>
        </section>
      </main>

      <footer className="py-8 bg-emineon-dark text-white/60">
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

      {showLeadForm && (
        <div className="fixed bottom-4 right-4 z-50 bg-white border border-emineon-blue rounded-lg shadow-lg p-6 w-96">
          <h3 className="text-lg font-bold mb-2 text-emineon-blue">Let's connect</h3>
          {leadFormSubmitted ? (
            <div className="text-center py-4">
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-lg font-semibold text-emineon-blue mb-1">Thank you!</div>
              <div className="text-neutral-700 text-sm">We've received your message and will be in touch soon.</div>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleLeadFormSubmit} noValidate>
              <div>
                <input 
                  className={`w-full border p-2 rounded ${leadFormErrors.name ? "border-red-500" : "border-gray-300"}`} 
                  type="text" 
                  name="name"
                  placeholder="Name" 
                  value={leadForm.name}
                  onChange={handleLeadFormChange}
                  required 
                />
                {leadFormErrors.name && <div className="text-red-500 text-xs mt-1">{leadFormErrors.name}</div>}
              </div>
              <div>
                <input 
                  className={`w-full border p-2 rounded ${leadFormErrors.email ? "border-red-500" : "border-gray-300"}`} 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={leadForm.email}
                  onChange={handleLeadFormChange}
                  required 
                />
                {leadFormErrors.email && <div className="text-red-500 text-xs mt-1">{leadFormErrors.email}</div>}
              </div>
              <div>
                <input 
                  className="w-full border border-gray-300 p-2 rounded" 
                  type="text" 
                  name="company"
                  placeholder="Company" 
                  value={leadForm.company}
                  onChange={handleLeadFormChange}
                />
              </div>
              <div>
                <textarea 
                  className={`w-full border p-2 rounded ${leadFormErrors.challenge ? "border-red-500" : "border-gray-300"}`} 
                  name="challenge"
                  placeholder="Challenge or goal" 
                  rows={3} 
                  value={leadForm.challenge}
                  onChange={handleLeadFormChange}
                  required 
                />
                {leadFormErrors.challenge && <div className="text-red-500 text-xs mt-1">{leadFormErrors.challenge}</div>}
              </div>
              <button 
                type="submit" 
                className="w-full bg-emineon-blue text-white py-2 rounded disabled:opacity-50"
                disabled={leadFormLoading}
              >
                {leadFormLoading ? 'Sending...' : 'Submit'}
              </button>
              {leadFormApiError && <div className="text-red-500 text-xs mt-2 text-center">{leadFormApiError}</div>}
            </form>
          )}
          <div className="mt-4 text-center">
            <a
              href="https://calendly.com/david-v-emineon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emineon-orange text-white px-4 py-2 rounded mt-2"
            >
              Schedule a discovery call
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

      {/* Demo Video Modal */}
      {typeof window !== 'undefined' && showDemoVideo && createPortal(
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 safe-top safe-bottom"
          onClick={() => setShowDemoVideo(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-black rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowDemoVideo(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close video"
            >
              <span className="text-2xl">×</span>
            </button>

            {/* Video container */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group">
              <video
                ref={demoVideoRef}
                src="/Emineon features - ppt.mp4"
                className="w-full h-full object-contain"
                onPlay={() => setDemoIsPlaying(true)}
                onPause={() => setDemoIsPlaying(false)}
                {...(isMobile ? { controls: true } : {})}
              >
                Sorry, your browser does not support embedded videos.
              </video>

              {/* Desktop video controls */}
              {!isMobile && (
                <>
                  {/* Control buttons overlay */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={handleDemoPlayPause}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                      aria-label={demoIsPlaying ? "Pause video" : "Play video"}
                    >
                      {demoIsPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button
                      onClick={handleDemoMuteToggle}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                      aria-label={demoIsMuted ? "Unmute video" : "Mute video"}
                    >
                      {demoIsMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    <button
                      onClick={handleDemoFullscreen}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                      aria-label="Fullscreen video"
                    >
                      <Maximize2 className="w-6 h-6" />
                    </button>
                  </div>

                  {/* User-initiated play overlay */}
                  {!demoUserStarted && !demoIsPlaying && (
                    <button
                      onClick={handleDemoUserPlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors focus:outline-none"
                      aria-label="Play video with sound"
                    >
                      <div className="bg-emineon-orange rounded-full p-6 shadow-lg">
                        <Play className="w-12 h-12 text-white ml-1" />
                      </div>
                    </button>
                  )}

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 w-full px-6 pb-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white font-mono min-w-[40px]">{formatDemoTime(demoProgress)}</span>
                      <input
                        type="range"
                        min={0}
                        max={demoDuration || 0}
                        step={0.1}
                        value={demoProgress}
                        onChange={handleDemoSeek}
                        onMouseDown={() => setDemoSeeking(true)}
                        onMouseUp={() => setDemoSeeking(false)}
                        className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: '#C75B12' }}
                      />
                      <span className="text-xs text-white font-mono min-w-[40px]">{formatDemoTime(demoDuration)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </div>
  )
}

function AccordionHowWeWork() {
  const [hovered, setHovered] = useState<number | null>(null);
  const steps = [
    {
      title: "Discovery phase",
      content: [
        "Deep dive into your organization's talent needs and challenges (if required)",
        "Conduct stakeholder interviews and skills gap analysis as needed",
        "Deliver a detailed assessment report outlining key priorities—or proceed directly if your requirements are already clear",
      ],
    },
    {
      title: "Talent Matching",
      content: [
        "Leverage our AI-powered matching system to identify ideal candidates (with human oversight)",
        "Present a curated shortlist of pre-vetted professionals",
        "Facilitate interviews and selection process",
      ],
    },
    {
      title: "Implementation",
      content: [
        "Manage onboarding and integration of selected talent",
        "Set up collaboration tools and processes tailored to remote or on-site needs",
        "Monitor initial engagement with defined KPIs",
      ],
    },
    {
      title: "Continuous improvement",
      content: [
        "Regular check-ins and performance reviews",
        "Provide ongoing support to address evolving needs",
        "Optimize talent engagement for long-term success",
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
      title: "Rigorous Vetting",
      summary: "Our 6-step vetting process ensures only the top 1-5% of applicants join our talent network, guaranteeing quality and expertise.",
      details: (
        <div className="space-y-2">
          <p>Our vetting process is designed to identify not just technical skill, but also cultural fit and long-term potential. The 6 steps include:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li><b>Application Review:</b> Screening for relevant experience and qualifications.</li>
            <li><b>Technical Assessment:</b> In-depth testing of core skills and problem-solving ability.</li>
            <li><b>Soft Skills Interview:</b> Communication, collaboration, and adaptability evaluation.</li>
            <li><b>Cultural Fit Interview:</b> Alignment with client values, work style, and expectations.</li>
            <li><b>Reference Checks:</b> Validation of past performance and reliability.</li>
            <li><b>Final Review:</b> Approval by a senior Emineon expert before joining our network.</li>
          </ol>
        </div>
      ),
    },
    {
      title: "Dedicated Oversight",
      summary: "Every placement is overseen by an experienced success manager to ensure alignment, integration, and ongoing satisfaction.",
      details: (
        <div className="space-y-2">
          <p>Our success managers act as your single point of contact, guiding both client and talent through onboarding, integration, and ongoing collaboration. They proactively address challenges and ensure expectations are met at every stage.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Personalized onboarding and integration support</li>
            <li>Regular check-ins with both client and talent</li>
            <li>Rapid response to any issues or feedback</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Client Satisfaction Focus",
      summary: "Regular feedback loops and performance reviews ensure services evolve with client needs and expectations are consistently met or exceeded.",
      details: (
        <div className="space-y-2">
          <p>We believe in continuous improvement. Our feedback and review process ensures that every engagement adapts to your evolving needs and delivers lasting value.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Structured feedback collection after key milestones</li>
            <li>Performance reviews for both talent and project outcomes</li>
            <li>Actionable insights to refine and optimize future engagements</li>
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
      title: "Tailored Matching",
      description: "Every talent match is uniquely designed to fit your organization's goals, culture, and technical requirements.",
      proof: "98% client retention rate",
      color: "#0A2F5A",
    },
    {
      title: "Cultural Alignment",
      description: "We prioritize language proficiency and cultural understanding to ensure seamless integration with your team.",
      proof: "90%+ placements are multilingual",
      color: "#C75B12",
    },
    {
      title: "Cutting-Edge Tools",
      description: "Leverage the latest remote collaboration technologies to make distance irrelevant to productivity.",
      proof: "AI + human vetting for every role",
      color: "#008080",
    },
    {
      title: "Proven Track Record",
      description: "Trusted by Fortune 500 companies and industry leaders across Europe for quality talent solutions.",
      proof: "Top 1-5% of talent accepted",
      color: "#444B54",
    },
    {
      title: "Expert Support",
      description: "Dedicated success managers ensure smooth integration and ongoing optimization of talent engagements.",
      proof: "24/7 client support",
      color: "#0A2F5A",
    },
    {
      title: "Global Reach",
      description: "Our network spans 30+ countries and 5 continents, giving you access to the best talent worldwide.",
      proof: "30+ countries, 5 continents",
      color: "#008080",
    },
    {
      title: "Speed to Impact",
      description: "We deliver shortlists of pre-vetted candidates in as little as 48 hours.",
      proof: "Avg. time to shortlist: 48h",
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
          Sectors
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
                { title: 'Software & IT', desc: 'Developers, Cloud, AI/ML, Cybersecurity' },
                { title: 'Data & Analytics', desc: 'Data scientists, BI, Data engineers' },
                { title: 'Design & Creative', desc: 'UI/UX, Product, Video, Graphics' },
                { title: 'Product & Project', desc: 'Product managers, Agile, SCRUM' },
                { title: 'Marketing & Growth', desc: 'Digital, SEO, Content, Social' },
                { title: 'Finance & Accounting', desc: 'Analysts, CFOs, Accountants' },
                { title: 'Legal & Compliance', desc: 'Contract, Compliance, EU/Swiss' },
                { title: 'HR & Recruiting', desc: 'Recruiters, HR consultants' },
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
                { title: 'Technology', desc: 'Scaling teams, product launches, data-driven strategy' },
                { title: 'Finance', desc: 'Digital transformation, compliance, cybersecurity' },
                { title: 'Manufacturing', desc: 'Smart tech, supply chain, engineering' },
                { title: 'Healthcare', desc: 'Digital health, efficiency, patient outcomes' },
                { title: 'Life Sciences', desc: 'R&D, regulatory, clinical operations' },
                { title: 'Retail & E-commerce', desc: 'Omnichannel, digital growth, logistics' },
                { title: 'Energy & Utilities', desc: 'Sustainability, digital, operations' },
                { title: 'Public Sector', desc: 'GovTech, digital services, transformation' },
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
      title: 'Talent Placement',
      desc: 'Remote, hybrid, or on-site. Pre-vetted, project-ready talent.',
      features: [
        'Remote, hybrid, or on-site',
        'Pre-vetted, project-ready',
        'Visa & compliance handled',
      ],
    },
    {
      title: 'Dedicated Teams',
      desc: 'Agile squads, scalable to your needs.',
      features: [
        'Full agile squads',
        'Dedicated team lead',
        'Scalable to project',
      ],
    },
    {
      title: 'Managed Services',
      desc: 'Outcome-based, end-to-end delivery.',
      features: [
        'End-to-end delivery',
        'Outcome-based',
        'Quality & timeline guarantees',
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
          Who we are
        </motion.h2>
        <motion.p
          className="text-lg text-center text-neutral-700 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Emineon blends trusted expertise with innovation in global talent solutions. Our name comes from "Eminent" and "Neo"—standing for distinguished excellence and a new, forward-thinking approach.
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
              <span className="text-xl font-bold text-emineon-blue mb-2">Global Presence</span>
              <span className="text-neutral-700 text-sm">Headquartered in Geneva with a network spanning Europe, Africa, and beyond, EMINEON connects organizations with exceptional talent across borders and disciplines.</span>
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
              <span className="text-xl font-bold text-emineon-blue mb-2">Proven Expertise</span>
              <span className="text-neutral-700 text-sm">With a portfolio spanning software engineering, design, finance, marketing, and more, our talent network delivers measurable results across industries.</span>
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
              <span className="text-xl font-bold text-emineon-blue mb-2">Commitment to Excellence</span>
              <span className="text-neutral-700 text-sm">Leveraging rigorous vetting and cutting-edge remote work technologies, we help businesses overcome talent shortages with quality professionals who integrate seamlessly.</span>
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
      title: 'Cultural Alignment',
      desc: 'Matching talent with language proficiency and cultural understanding for seamless integration.',
    },
    {
      title: 'Quality Assurance',
      desc: 'Rigorous vetting ensuring only the top 1-5% of global professionals join our network.',
    },
    {
      title: 'Remote Excellence',
      desc: 'Pioneering technologies and methodologies that make remote collaboration feel local.',
    },
    {
      title: 'Global Diversity',
      desc: 'Embracing diverse perspectives to drive innovation and better problem-solving.',
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
          What drives us
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
            <span className="text-neutral-700">To connect European organizations with exceptional global talent while creating opportunities for professionals worldwide.</span>
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
              <li>Overcome skills gaps — access the top talent</li>
              <li>Build global teams — diverse perspectives driving innovation</li>
              <li>Scale efficiently — flexible talent solutions for growth</li>
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
    <section className="py-20 bg-neutral-100">
      <div className="container">
        <motion.h2
          className="text-3xl font-bold tracking-tight text-emineon-blue mb-12 text-center"
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
      </div>
    </section>
  );
}
