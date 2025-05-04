import type { Metadata } from 'next'
import './globals.css'
import Head from "next/head";
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  // Fallback for SSR/SSG: default to 'en' if window is undefined
  const lang = pathname.startsWith('/fr') ? 'fr' : 'en';
  return (
    <html lang={lang}>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Emineon Consulting",
          "url": "https://www.emineon.com",
          "logo": "https://www.emineon.com/Emineon%20logo_tree.png",
          "areaServed": ["CH", "FR", "BE"],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CH"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "david.v@emineon.com",
            "contactType": "customer service"
          }
        }` }} />
        <link rel="alternate" href="https://www.emineon.com/fr/" hrefLang="fr-FR" />
        <link rel="alternate" href="https://www.emineon.com/be/" hrefLang="fr-BE" />
        <link rel="alternate" href="https://www.emineon.com/ch/" hrefLang="fr-CH" />
        <link rel="alternate" href="https://www.emineon.com/" hrefLang="x-default" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
