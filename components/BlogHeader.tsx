"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

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
            className="fixed inset-0 z-50 bg-black/60 flex"
            onClick={() => setMobileMenuOpen(false)}
          >
            <nav
              className="bg-white w-80 h-full shadow-2xl border-r-4 border-emineon-blue p-6 flex flex-col gap-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
                <h3 className="text-xl font-bold text-emineon-blue">Menu</h3>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-emineon-blue hover:text-white text-gray-600 text-2xl flex items-center justify-center transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ×
                </button>
              </div>
              
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-4 px-6 text-lg font-medium rounded-lg transition-all duration-200 ${
                    link.href.includes("/blog")
                      ? "text-white bg-emineon-blue"
                      : "text-emineon-blue hover:bg-emineon-blue hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="mt-8 space-y-4 pt-6 border-t-2 border-gray-100">
                <Link 
                  href={contactLink} 
                  className="bg-emineon-orange hover:bg-emineon-orange/90 text-white rounded-lg px-6 py-4 font-semibold w-full text-center block text-lg shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {contactText}
                </Link>
                
                <div className="flex justify-center pt-2">
                  <LanguageSwitcher currentLang={currentLang} targetPath={blogPath} />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 