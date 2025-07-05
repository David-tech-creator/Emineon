"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form states
  const [projectData, setProjectData] = useState({
    industry: '',
    roleType: '',
    location: '',
    duration: '',
    budgetAmount: '',
    budgetCurrency: 'CHF',
    budgetType: 'daily',
    startDate: '',
    languageRequirements: '',
    projectDescription: ''
  });

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitProfileRequest = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/profile-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectData,
          contactData
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsProfileModalOpen(false);
          setSubmitSuccess(false);
          setContactData({
            name: '',
            email: '',
            company: '',
            phone: ''
          });
        }, 3000);
      } else {
        alert('Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting profile request:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-foreground flex flex-col items-center">
      {/* Header (same as homepage) */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md w-full">
        <div className="container flex h-20 items-center justify-between py-4 relative">
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
            <Link href="/#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Who we are</Link>
            <Link href="/product" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-orange after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              <span className="flex items-center gap-1">
                ATS & CRM
                <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-0.5 rounded-full font-semibold">NEW</span>
              </span>
            </Link>
            <Link href="/#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Services</Link>
            <Link href="/#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">How we work</Link>
            <Link href="/#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Expertise</Link>
            <Link href="/#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Testimonials</Link>
            <Link href="/blog" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Blog</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">Contact us</Link>
            <LanguageSwitcher currentLang="en" targetPath="/find-talent" />
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
                  <Link href="/#who-we-are" className="block px-4 py-3 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                    Who we are
                  </Link>
                  <Link href="/product" className="block px-4 py-3 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                    <span className="flex items-center gap-2">
                      ATS & CRM
                      <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-1 rounded-full font-semibold">NEW</span>
                    </span>
                  </Link>
                  <Link href="/#services" className="block px-4 py-3 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                    Services
                  </Link>
                  <Link href="/#how-we-work" className="block px-4 py-3 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                    How we work
                  </Link>
                  <Link href="/#expertise" className="block px-4 py-3 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                    Expertise
                  </Link>
                  <Link href="/#testimonials" className="block px-4 py-3 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                    Testimonials
                  </Link>
                  <Link href="/blog" className="block px-4 py-3 text-base font-medium text-emineon-blue hover:bg-emineon-blue hover:text-white transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                    Blog
                  </Link>
                </div>
                
                {/* Contact button and language switcher */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
                  <Link 
                    href="/contact" 
                    className="block w-full bg-emineon-blue text-white text-center py-3 px-4 rounded-md font-medium mb-3 hover:bg-emineon-blue/90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact us
                  </Link>
                  
                  <div className="flex justify-center">
                    <LanguageSwitcher currentLang="en" targetPath="/find-talent" />
                  </div>
                </div>
              </div>
            </div>
          )}
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
            <input 
              className="border rounded p-2" 
              type="text" 
              placeholder="e.g. Finance, Life Sciences" 
              value={projectData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Type of role</label>
            <input 
              className="border rounded p-2" 
              type="text" 
              placeholder="e.g. Project Manager, Cloud Engineer" 
              value={projectData.roleType}
              onChange={(e) => handleInputChange('roleType', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Location or remote preference</label>
            <input 
              className="border rounded p-2" 
              type="text" 
              placeholder="e.g. Geneva, Remote" 
              value={projectData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Duration</label>
            <input 
              className="border rounded p-2" 
              type="text" 
              placeholder="e.g. 6 months" 
              value={projectData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Budget range <span className="text-xs text-neutral-400">(optional)</span></label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex gap-2 w-full">
                <select 
                  className="border rounded p-2" 
                  value={projectData.budgetCurrency}
                  onChange={(e) => handleInputChange('budgetCurrency', e.target.value)}
                  style={{ minWidth: 80 }}
                >
                  <option value="CHF">CHF</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
                <input 
                  className="border rounded p-2 flex-1" 
                  type="text" 
                  placeholder="e.g. 800–1200 or 50k–100k" 
                  value={projectData.budgetAmount}
                  onChange={(e) => handleInputChange('budgetAmount', e.target.value)}
                />
              </div>
              <select 
                className="border rounded p-2" 
                value={projectData.budgetType}
                onChange={(e) => handleInputChange('budgetType', e.target.value)}
              >
                <option value="daily">Daily rate</option>
                <option value="total">Total project budget</option>
              </select>
            </div>
            <span className="text-xs text-neutral-500">Choose whether your budget is a daily rate or a total project estimate.</span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Start date</label>
            <input 
              className="border rounded p-2" 
              type="date" 
              value={projectData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Language/cultural requirements</label>
            <input 
              className="border rounded p-2" 
              type="text" 
              placeholder="e.g. Bilingual French/German" 
              value={projectData.languageRequirements}
              onChange={(e) => handleInputChange('languageRequirements', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Project description / requirements</label>
            <textarea 
              className="border rounded p-2" 
              rows={4} 
              placeholder="Describe your project, requirements, or any other details..." 
              value={projectData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
            />
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
          <a
            href="https://calendly.com/david-v-emineon"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none font-semibold text-base transition-colors duration-200 flex items-center justify-center h-16 min-w-[260px] w-full sm:w-auto"
            style={{ minWidth: 260 }}
          >
            Book a Discovery Call
          </a>
          <Button
            className="bg-emineon-orange text-white hover:bg-emineon-orange/90 rounded-none font-semibold h-16 min-w-[260px] w-full sm:w-auto"
            onClick={() => setIsProfileModalOpen(true)}
          >
            Just send me profiles
          </Button>
        </div>
      </section>

      {/* Profile Request Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setIsProfileModalOpen(false)}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-xl font-bold text-emineon-blue mb-4">Request Profiles</h3>
            
            {!submitSuccess ? (
              <>
                <p className="text-gray-600 mb-6">
                  Please provide your contact information so we can send you matching profiles.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emineon-blue focus:border-transparent"
                      placeholder="John Doe"
                      value={contactData.name}
                      onChange={(e) => handleContactChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emineon-blue focus:border-transparent"
                      placeholder="john.doe@company.com"
                      value={contactData.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emineon-blue focus:border-transparent"
                      placeholder="Company Inc."
                      value={contactData.company}
                      onChange={(e) => handleContactChange('company', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emineon-blue focus:border-transparent"
                      placeholder="+41 XX XXX XX XX"
                      value={contactData.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button
                    className="flex-1 bg-emineon-blue text-white hover:bg-emineon-blue/90"
                    onClick={handleSubmitProfileRequest}
                    disabled={isSubmitting || !contactData.name || !contactData.email || !contactData.company || !contactData.phone}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsProfileModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Request Sent!</h4>
                <p className="text-gray-600">
                  Thank you for your request. We'll review your requirements and send you matching profiles within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

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
                <p className="font-medium">Contact: info@emineon.com</p>
                <p className="opacity-80">Founder & Partner, EMINEON</p>
                <p className="opacity-80">david.v@emineon.com</p>
                <p className="opacity-80">+41 (0) 79 533 28 09</p>
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