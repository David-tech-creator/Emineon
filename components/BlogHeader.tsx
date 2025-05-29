"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion } from "framer-motion";

interface BlogHeaderProps {
  currentLang: "en" | "fr";
  blogPath: string;
}

export default function BlogHeader({ currentLang, blogPath }: BlogHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEnglish = currentLang === "en";
  const homeLink = isEnglish ? "/" : "/fr";
  const contactLink = isEnglish ? "/contact" : "/fr/contact";

  const navLinks = isEnglish ? [
    { href: "/#who-we-are", label: "Who we are" },
    { href: "/product", label: "ATS & CRM", isNew: true },
    { href: "/#services", label: "Services" },
    { href: "/#how-we-work", label: "How we work" },
    { href: "/#expertise", label: "Expertise" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/blog", label: "Blog" },
  ] : [
    { href: "/fr#who-we-are", label: "Qui sommes-nous" },
    { href: "/fr/product", label: "ATS & CRM", isNew: true },
    { href: "/fr#services", label: "Services" },
    { href: "/fr#how-we-work", label: "Notre approche" },
    { href: "/fr#expertise", label: "Expertise" },
    { href: "/fr#testimonials", label: "Témoignages" },
    { href: "/fr/blog", label: "Blog" },
  ];

  const contactText = isEnglish ? "Contact us" : "Contactez-nous";

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md safe-top">
      <div className="container-mobile flex h-16 sm:h-20 items-center justify-between py-2 sm:py-4 relative">
        <div className="flex items-center gap-2">
          <Link href={homeLink} className="flex items-center gap-2 touch-target">
            <img src="/Emineon logo_tree.png" alt="Emineon Logo" width={40} height={40} className="sm:w-12 sm:h-12" />
            <span className="flex flex-col leading-tight">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
              <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase hidden sm:block">
                {isEnglish ? "forge your edge." : "forgez votre avantage."}
              </span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative ${
                link.href.includes("/blog")
                  ? "text-emineon-blue border-b-2 border-emineon-orange"
                  : "text-neutral-700 hover:text-emineon-blue after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emineon-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
              }`}
            >
              <span className="flex items-center gap-1">
                {link.label}
                {link.isNew && (
                  <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    {isEnglish ? "NEW" : "NOUVEAU"}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link href={contactLink} className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg touch-target">
            {contactText}
          </Link>
          <LanguageSwitcher currentLang={currentLang} targetPath={blogPath} />
        </div>

        {/* Mobile menu button */}
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
                  <img src="/Emineon logo_tree.png" alt="Emineon Logo" width={32} height={32} />
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
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-6 py-4 text-base font-medium transition-colors duration-200 touch-target ${
                      link.href.includes("/blog")
                        ? "text-white bg-emineon-blue"
                        : "text-emineon-blue hover:bg-emineon-blue hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      {link.label}
                      {link.isNew && (
                        <span className="inline-block bg-emineon-orange text-white text-xs px-2 py-1 rounded-full font-semibold">
                          {isEnglish ? "NEW" : "NOUVEAU"}
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
              
              {/* Contact button and language switcher */}
              <div className="p-4 border-t border-gray-200 bg-white safe-bottom">
                <Link 
                  href={contactLink} 
                  className="block w-full bg-emineon-blue text-white text-center py-4 px-4 rounded-lg font-medium mb-4 hover:bg-emineon-blue/90 transition-colors touch-target"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {contactText}
                </Link>
                
                <div className="flex justify-center">
                  <LanguageSwitcher currentLang={currentLang} targetPath={blogPath} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </header>
  );
} 