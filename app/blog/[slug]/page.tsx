import { notFound } from "next/navigation";
import { fetchBySlug } from "@/lib/contentful";
import Link from "next/link";
import Image from "next/image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const revalidate = 600;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchBySlug(slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between py-4 relative">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/Emineon logo_tree.png" alt="Emineon Logo" width={48} height={48} />
              <span className="flex flex-col leading-tight">
                <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
                <span className="text-xs font-medium text-emineon-orange mt-0.5 tracking-widest lowercase">forge your edge.</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">Who we are</Link>
            <Link href="/#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">Services</Link>
            <Link href="/#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">How we work</Link>
            <Link href="/#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">Expertise</Link>
            <Link href="/#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue transition-colors">Testimonials</Link>
            <Link href="/blog" className="text-sm font-medium text-emineon-blue border-b-2 border-emineon-orange">Blog</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">Contact us</Link>
            <LanguageSwitcher currentLang="en" targetPath="/blog" />
          </div>
        </div>
      </header>

      {/* Featured Image Hero */}
      {post.featuredImage && (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-0 right-0">
            <div className="container mx-auto px-4">
              <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to Blog</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 w-full flex flex-col items-center px-4 py-16">
        <article className="w-full max-w-4xl">
          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            {!post.featuredImage && (
              <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-600 hover:text-emineon-blue transition-colors duration-200 mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to Blog</span>
              </Link>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 leading-tight">{post.title}</h1>
            
            {post.excerpt && (
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">{post.excerpt}</p>
            )}

            {/* Author and Date */}
            <div className="flex items-center gap-6 pb-8 border-b border-neutral-200">
              {post.author && (
                <div className="flex items-center gap-4">
                  {post.author.image ? (
                    <Image
                      src={post.author.image.url}
                      alt={post.author.image.alt}
                      width={56}
                      height={56}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-emineon-blue to-emineon-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-neutral-800">{post.author.name}</div>
                    <div className="text-sm text-neutral-500">Author</div>
                  </div>
                </div>
              )}
              <div className="text-neutral-500">
                <div className="text-sm font-medium">Published</div>
                <div className="text-sm">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose prose-lg prose-neutral max-w-none">
              {post.content && typeof post.content === 'object' && documentToReactComponents(post.content, {
                renderMark: {
                  [MARKS.BOLD]: (text) => <strong className="font-bold text-neutral-800">{text}</strong>,
                  [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
                  [MARKS.CODE]: (text) => <code className="bg-neutral-100 text-emineon-blue px-2 py-1 rounded text-sm font-mono">{text}</code>,
                },
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-6 text-neutral-700 leading-relaxed text-lg">{children}</p>,
                  [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-4xl font-bold text-neutral-800 mb-8 mt-12 leading-tight">{children}</h1>,
                  [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-3xl font-bold text-neutral-800 mb-6 mt-10 leading-tight">{children}</h2>,
                  [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-2xl font-bold text-neutral-800 mb-4 mt-8 leading-tight">{children}</h3>,
                  [BLOCKS.HEADING_4]: (node, children) => <h4 className="text-xl font-bold text-neutral-800 mb-3 mt-6">{children}</h4>,
                  [BLOCKS.HEADING_5]: (node, children) => <h5 className="text-lg font-bold text-neutral-800 mb-3 mt-6">{children}</h5>,
                  [BLOCKS.HEADING_6]: (node, children) => <h6 className="text-base font-bold text-neutral-800 mb-3 mt-6">{children}</h6>,
                  [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc list-inside mb-6 space-y-2 text-lg">{children}</ul>,
                  [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal list-inside mb-6 space-y-2 text-lg">{children}</ol>,
                  [BLOCKS.LIST_ITEM]: (node, children) => <li className="text-neutral-700 leading-relaxed">{children}</li>,
                  [BLOCKS.QUOTE]: (node, children) => (
                    <blockquote className="border-l-4 border-emineon-orange bg-neutral-50 pl-6 py-4 my-8 italic text-lg text-neutral-700">
                      {children}
                    </blockquote>
                  ),
                  [BLOCKS.HR]: () => <hr className="my-12 border-neutral-200" />,
                  [BLOCKS.EMBEDDED_ASSET]: (node) => {
                    const { file, title, description } = node.data.target.fields;
                    if (file.contentType.startsWith('image/')) {
                      return (
                        <div className="my-8">
                          <Image
                            src={`https:${file.url}`}
                            alt={description || title || 'Article image'}
                            width={file.details.image?.width || 800}
                            height={file.details.image?.height || 600}
                            className="rounded-lg shadow-lg w-full h-auto"
                          />
                          {(title || description) && (
                            <p className="text-sm text-neutral-500 text-center mt-3 italic">
                              {description || title}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  },
                  [INLINES.HYPERLINK]: (node, children) => (
                    <a 
                      href={node.data.uri} 
                      className="text-emineon-blue hover:text-emineon-orange transition-colors duration-200 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                },
              })}
            </div>
            
            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center gap-2 text-emineon-blue hover:text-emineon-orange font-semibold transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Blog</span>
                </Link>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-neutral-500">Share this article:</span>
                  <div className="flex gap-3">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      className="w-10 h-10 bg-neutral-100 hover:bg-emineon-blue text-neutral-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.5 6.5L6.5 17.5M6.5 6.5l11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      className="w-10 h-10 bg-neutral-100 hover:bg-emineon-blue text-neutral-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="py-12 bg-gradient-to-r from-emineon-dark via-neutral-900 to-emineon-dark text-white/60">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <img src="/Emineon logo_tree_white.png" alt="Emineon logo" height={40} width={40} />
            <span className="text-sm hidden md:inline">© {new Date().getFullYear()} EMINEON. All rights reserved.</span>
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
          <span className="text-sm md:hidden text-center block mt-2">© {new Date().getFullYear()} EMINEON. All rights reserved.</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:text-white transition-colors duration-200">
              Terms of Service
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