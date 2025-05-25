import Link from "next/link";

interface LanguageSwitcherProps {
  currentLang: 'en' | 'fr';
  targetPath?: string;
  className?: string;
}

export default function LanguageSwitcher({ currentLang, targetPath, className = "" }: LanguageSwitcherProps) {
  const isEnglish = currentLang === 'en';
  const href = isEnglish ? (targetPath ? `/fr${targetPath}` : '/fr') : (targetPath ? targetPath.replace('/fr', '') || '/' : '/');
  const ariaLabel = isEnglish ? "Voir en français" : "View in English";
  const title = isEnglish ? "Voir en français" : "View in English";

  return (
    <Link 
      href={href} 
      prefetch={false} 
      className={`group flex items-center justify-center w-10 h-10 rounded-full border border-emineon-blue bg-white/90 hover:bg-emineon-blue/10 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emineon-orange ${className}`}
      title={title}
      aria-label={ariaLabel}
    >
      <svg 
        className="w-5 h-5 text-emineon-blue group-hover:text-emineon-orange transition-colors duration-200" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" 
        />
      </svg>
    </Link>
  );
} 