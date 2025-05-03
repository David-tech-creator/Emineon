"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Users, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"

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

  const handleGetStarted = () => {
    const section = document.getElementById("get-started-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8f8]">
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="container flex h-20 items-center justify-between py-4 relative">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={48} height={48} />
              <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
            </Link>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200">
              Who we are
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
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-6"><Link href="/contact">Contact us</Link></Button>
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
                <Link href="#who-we-are" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Who we are
                </Link>
                <Link href="#services" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </Link>
                <Link href="#how-we-work" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  How we work
                </Link>
                <Link href="#expertise" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Expertise
                </Link>
                <Link href="#testimonials" className="py-3 text-lg font-medium text-neutral-700 hover:text-emineon-blue" onClick={() => setMobileMenuOpen(false)}>
                  Testimonials
                </Link>
                <Button asChild className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-6 mt-6 w-full"><Link href="/contact">Contact us</Link></Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-white">
          <div className="container flex flex-col lg:flex-row items-center gap-12">
            <div className="space-y-6 lg:w-1/2">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-emineon-blue"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Your partner in growth and innovation
              </motion.h1>
              <p className="text-xl text-neutral-600 max-w-xl">
                At Emineon Consulting, we specialize in optimizing operations, driving sustainable growth, and
                delivering tailored services across industries.
              </p>
              <div className="pt-4">
                <p className="text-sm uppercase tracking-widest text-neutral-500 mb-2">forge your edge.</p>
                <p className="text-sm text-neutral-600 italic">
                  [fɔːdʒ] verb - create (something) strong, enduring, or successful.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-8"
                  onClick={handleGetStarted}
                >
                  Get started
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <Image
                src="/global-talent-hero.jpg"
                alt="Global talent network"
                width={600}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Find a Job / Hire Talent Section */}
        <section id="get-started-section" className="py-16 bg-emineon-blue text-white scroll-mt-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What are you looking for?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Whether you're seeking new opportunities or looking to build your team, EMINEON connects exceptional
                talent with forward-thinking organizations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-8 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-all">
                <h3 className="text-2xl font-bold mb-4">Find a job</h3>
                <p className="mb-6">
                  Join our exclusive network of global professionals. Access opportunities with leading European
                  companies and advance your career.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Access exclusive opportunities with top companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Benefit from our placement expertise and support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Grow your career with long-term partnerships</span>
                  </li>
                </ul>
                <Button className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8" asChild>
                  <Link href="/careers">
                    Join as talent <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-white/10 p-8 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-all">
                <h3 className="text-2xl font-bold mb-4">Hire talent</h3>
                <p className="mb-6">
                  Access our pool of rigorously vetted professionals across multiple disciplines to solve your talent
                  challenges.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Connect with pre-vetted professionals within days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Flexible engagement models to suit your needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Comprehensive support throughout the process</span>
                  </li>
                </ul>
                <Button className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8" asChild>
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

        {/* CTA Section */}
        <section className="py-20 bg-emineon-blue text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              <Image src="/Emineon logo_tree_white.png" alt="Emineon logo" width={120} height={120} className="mb-2 mx-auto" />
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Let's build your global team</h2>
              <p className="text-xl opacity-80 mb-8">
                Ready to overcome talent shortages and access exceptional professionals worldwide? Let's start the
                conversation.
              </p>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="space-y-2">
                  <p className="font-medium">David Vinkenroye</p>
                  <p className="opacity-80">Founder & Partner, EMINEON</p>
                  <p className="opacity-80">david.v@emineon.com</p>
                  <p className="opacity-80">+41 (0) 795 33 28 709</p>
                </div>

                <div className="md:ml-auto">
                  <Button asChild className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8"><Link href="/contact">Contact us</Link></Button>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20 text-center">
                <p className="text-sm uppercase tracking-widest opacity-60">forge your edge.</p>
                <p className="text-sm opacity-60">www.emineon.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-emineon-dark text-white/60">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <Image src="/Emineon logo_tree_white.png" alt="Emineon logo" height={40} width={40} className="h-10 w-auto" />
            <span className="text-sm hidden md:inline">© {new Date().getFullYear()} EMINEON. All rights reserved.</span>
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
          <form className="space-y-3">
            <input className="w-full border p-2 rounded" type="text" placeholder="Name" required />
            <input className="w-full border p-2 rounded" type="email" placeholder="Email" required />
            <input className="w-full border p-2 rounded" type="text" placeholder="Company" required />
            <textarea className="w-full border p-2 rounded" placeholder="Challenge or goal" rows={3} required />
            <button type="submit" className="w-full bg-emineon-blue text-white py-2 rounded">Submit</button>
          </form>
          <div className="mt-4 text-center">
            <a
              href="https://calendly.com/your-calendly-link"
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
  return (
    <section id="who-we-are" className="py-20 bg-neutral-100">
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
              <li>Overcome skills gaps — access talent unavailable locally</li>
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
      description: "6-month trial commitment for peace of mind",
      hoverDetail: "If it's not the right fit, you're covered—no long-term risk.",
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
