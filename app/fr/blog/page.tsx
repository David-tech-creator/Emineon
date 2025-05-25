import Link from "next/link";
import Image from "next/image";
import { fetchAllPosts } from "@/lib/contentful";
import { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const revalidate = 600; // ISR: 10 minutes

export const metadata: Metadata = {
  title: "Blog Emineon",
  description: "Analyses, actualités et ressources sur le talent global, l'innovation et le futur du travail.",
};

export default async function BlogPageFR() {
  const posts = await fetchAllPosts();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between py-4 relative">
          <div className="flex items-center gap-2">
            <Link href="/fr" className="flex items-center gap-2">
              <img src="/Emineon logo_tree.png" alt="Logo Emineon" width={48} height={48} />
              <span className="flex flex-col leading-tight">
                <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
                <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase">forgez votre avantage.</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/fr#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">Qui sommes-nous</Link>
            <Link href="/fr#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">Services</Link>
            <Link href="/fr#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">Notre approche</Link>
            <Link href="/fr#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">Expertise</Link>
            <Link href="/fr#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">Témoignages</Link>
            <Link href="/fr/blog" className="text-sm font-medium text-emineon-blue border-b-2 border-emineon-orange">Blog</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/fr/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">Contactez-nous</Link>
            <LanguageSwitcher currentLang="fr" targetPath="/blog" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-r from-emineon-blue via-emineon-light to-emineon-blue overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        <div className="relative container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-emineon-orange rounded-full animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium">Dernières Analyses</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Blog <span className="text-emineon-orange">Emineon</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos analyses, actualités et ressources sur le talent global, l'innovation et le futur du travail par notre équipe d'experts.
          </p>
        </div>
      </section>

      <main className="flex-1 w-full px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emineon-blue to-emineon-light rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Aucun article pour le moment</h2>
              <p className="text-neutral-600">Revenez bientôt pour nos dernières analyses et actualités !</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {posts[0] && (
                <div className="mb-16">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-emineon-orange to-emineon-blue rounded-full"></div>
                    <h2 className="text-2xl font-bold text-neutral-800">Article à la Une</h2>
                  </div>
                  <Link href={`/fr/blog/${posts[0].slug}`} className="group block">
                    <article className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-full overflow-hidden">
                          {posts[0].featuredImage ? (
                            <Image
                              src={posts[0].featuredImage.url}
                              alt={posts[0].featuredImage.alt}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-emineon-blue via-emineon-light to-emineon-orange flex items-center justify-center">
                              <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          <div className="flex items-center gap-4 mb-4">
                            {posts[0].author && (
                              <div className="flex items-center gap-3">
                                {posts[0].author.image ? (
                                  <Image
                                    src={posts[0].author.image.url}
                                    alt={posts[0].author.image.alt}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-gradient-to-br from-emineon-blue to-emineon-orange rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                      {posts[0].author.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <span className="text-sm font-medium text-neutral-600">{posts[0].author.name}</span>
                              </div>
                            )}
                            <div className="text-sm text-neutral-500">
                              {new Date(posts[0].date).toLocaleDateString('fr-FR', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold text-neutral-800 mb-4 group-hover:text-emineon-blue transition-colors duration-300 leading-tight">
                            {posts[0].title}
                          </h3>
                          <p className="text-neutral-600 text-lg leading-relaxed mb-6 line-clamp-3">
                            {posts[0].excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-emineon-orange font-semibold group-hover:gap-4 transition-all duration-300">
                            <span>Lire l'article complet</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              )}

              {/* Other Posts Grid */}
              {posts.length > 1 && (
                <div>
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-emineon-orange to-emineon-blue rounded-full"></div>
                    <h2 className="text-2xl font-bold text-neutral-800">Plus d'Articles</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(1).map((post, index) => (
                      <Link key={post.id} href={`/fr/blog/${post.slug}`} className="group block">
                        <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            {post.featuredImage ? (
                              <Image
                                src={post.featuredImage.url}
                                alt={post.featuredImage.alt}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-emineon-blue via-emineon-light to-emineon-orange flex items-center justify-center">
                                <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                              {post.author && (
                                <div className="flex items-center gap-2">
                                  {post.author.image ? (
                                    <Image
                                      src={post.author.image.url}
                                      alt={post.author.image.alt}
                                      width={24}
                                      height={24}
                                      className="rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-6 h-6 bg-gradient-to-br from-emineon-blue to-emineon-orange rounded-full flex items-center justify-center">
                                      <span className="text-white font-semibold text-xs">
                                        {post.author.name.charAt(0)}
                                      </span>
                                    </div>
                                  )}
                                  <span className="text-xs font-medium text-neutral-600">{post.author.name}</span>
                                </div>
                              )}
                              <div className="text-xs text-neutral-500">
                                {new Date(post.date).toLocaleDateString('fr-FR', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-emineon-blue transition-colors duration-300 leading-tight flex-1">
                              {post.title}
                            </h3>
                            <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-emineon-orange font-medium text-sm group-hover:gap-3 transition-all duration-300">
                              <span>Lire plus</span>
                              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          </div>
      </main>

      <footer className="py-12 bg-gradient-to-r from-emineon-dark via-neutral-900 to-emineon-dark text-white/60">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <img src="/Emineon logo_tree_white.png" alt="Logo Emineon" height={40} width={40} />
            <span className="text-sm hidden md:inline">© {new Date().getFullYear()} EMINEON. Tous droits réservés.</span>
            <div className="flex gap-4 ml-4">
              <a href="#" aria-label="LinkedIn" className="text-white/80 hover:text-emineon-orange transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" aria-label="X (Twitter)" className="text-white/80 hover:text-emineon-orange transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M17.5 6.5L6.5 17.5"/><path d="M6.5 6.5l11 11"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-white/80 hover:text-emineon-orange transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          <span className="text-sm md:hidden text-center block mt-2">© {new Date().getFullYear()} EMINEON. Tous droits réservés.</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-white transition-colors duration-200">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-sm hover:text-white transition-colors duration-200">
              Conditions d'utilisation
            </Link>
            <Link href="#" className="text-sm hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 