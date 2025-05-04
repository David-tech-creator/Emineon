import type { Metadata } from 'next'
import './globals.css'
import Head from "next/head";

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
  lang: 'fr',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
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
      {children}
    </>
  )
}
