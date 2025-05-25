"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

// Add CSS animations
const styles = `
  @keyframes slideInFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

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
    { href: "/#services", label: "Services" },
    { href: "/#how-we-work", label: "How we work" },
    { href: "/#expertise", label: "Expertise" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/blog", label: "Blog" },
  ] : [
    { href: "/fr#who-we-are", label: "Qui sommes-nous" },
    { href: "/fr#services", label: "Services" },
    { href: "/fr#how-we-work", label: "Notre approche" },
    { href: "/fr#expertise", label: "Expertise" },
    { href: "/fr#testimonials", label: "Témoignages" },
    { href: "/fr/blog", label: "Blog" },
  ];

  const contactText = isEnglish ? "Contact us" : "Contactez-nous";

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between py-4 relative">
        <div className="flex items-center gap-2">
          <Link href={homeLink} className="flex items-center gap-2">
            <img src="/Emineon logo_tree.png" alt="Emineon Logo" width={48} height={48} />
            <span className="flex flex-col leading-tight">
              <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
              <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase">
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
              className={`text-sm font-medium transition-colors ${
                link.href.includes("/blog")
                  ? "text-emineon-blue border-b-2 border-emineon-orange"
                  : "text-neutral-700 hover:text-emineon-blue"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link href={contactLink} className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">
            {contactText}
          </Link>
          <LanguageSwitcher currentLang={currentLang} targetPath={blogPath} />
        </div>

        {/* Mobile menu button */}
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            onClick={() => setMobileMenuOpen(false)}
          >
            <nav
              className="bg-gradient-to-br from-white via-blue-50/50 to-gray-50 w-80 max-w-full h-full shadow-2xl p-8 flex flex-col gap-3 relative border-r border-emineon-blue/20"
              onClick={e => e.stopPropagation()}
              aria-label="Mobile menu"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-emineon-blue/10 hover:bg-emineon-blue/20 text-emineon-blue text-xl focus:outline-none transition-all duration-200 flex items-center justify-center hover:rotate-90"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                ×
              </button>
              
              <div className="mt-4 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-emineon-blue to-emineon-orange rounded-full mb-4"></div>
                <h3 className="text-lg font-bold text-emineon-blue">Navigation</h3>
              </div>
              
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group py-4 px-5 text-lg font-semibold transition-all duration-300 rounded-xl relative overflow-hidden ${
                    link.href.includes("/blog")
                      ? "text-white bg-gradient-to-r from-emineon-blue to-emineon-blue/90 shadow-lg shadow-emineon-blue/25"
                      : "text-emineon-blue hover:text-white bg-white/80 hover:bg-gradient-to-r hover:from-emineon-blue hover:to-emineon-orange border border-gray-100/50 hover:border-transparent shadow-sm hover:shadow-lg hover:shadow-emineon-blue/20"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInFromLeft 0.5s ease-out forwards',
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {!link.href.includes("/blog") && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emineon-blue to-emineon-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  )}
                </Link>
              ))}
              
              <div className="mt-8 space-y-4">
                <Link 
                  href={contactLink} 
                  className="group bg-gradient-to-r from-emineon-orange to-emineon-orange/90 hover:from-emineon-orange/90 hover:to-emineon-blue text-white rounded-xl px-6 py-4 font-semibold transition-all duration-300 shadow-lg shadow-emineon-orange/25 hover:shadow-xl hover:shadow-emineon-orange/30 w-full text-center block relative overflow-hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative z-10">{contactText}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emineon-blue to-emineon-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <div className="flex justify-center pt-2">
                  <div className="p-3 bg-white/60 rounded-xl border border-gray-100/50 shadow-sm">
                    <LanguageSwitcher currentLang={currentLang} targetPath={blogPath} />
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-20 right-8 w-20 h-20 bg-gradient-to-br from-emineon-blue/10 to-emineon-orange/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-32 left-6 w-16 h-16 bg-gradient-to-br from-emineon-orange/10 to-emineon-blue/10 rounded-full blur-lg"></div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 