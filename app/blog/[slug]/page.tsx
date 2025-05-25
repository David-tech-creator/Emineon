import { notFound } from "next/navigation";
import { fetchBySlug } from "@/lib/contentful";
import Link from "next/link";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

export const revalidate = 600;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchBySlug(slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-white">
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
            <Link href="/#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Who we are</Link>
            <Link href="/#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Services</Link>
            <Link href="/#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">How we work</Link>
            <Link href="/#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Expertise</Link>
            <Link href="/#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Testimonials</Link>
            <Link href="/blog" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">Blog</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-6 py-2 font-medium transition">Contact us</Link>
            <Link href="/fr/blog" prefetch={false} className="flex items-center gap-2 px-3 py-1 rounded-full border border-emineon-blue bg-white/90 hover:bg-emineon-blue/10 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emineon-orange" title="Voir en français" aria-label="Voir en français">
              <span className="w-5 h-5">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className="inline-block align-middle">
                  <rect width="8" height="24" x="0" y="0" fill="#0055A4"/>
                  <rect width="8" height="24" x="8" y="0" fill="#fff"/>
                  <rect width="8" height="24" x="16" y="0" fill="#EF4135"/>
                  <rect width="24" height="24" fill="none" rx="3" stroke="#e5e7eb" strokeWidth="0.5"/>
                </svg>
              </span>
              <span className="font-semibold text-emineon-blue group-hover:text-emineon-orange">FR</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full flex flex-col items-center px-4 py-16">
        <article className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-10 flex flex-col items-start">
          <h1 className="text-3xl md:text-4xl font-bold text-emineon-blue mb-2">{post.title}</h1>
          <div className="text-sm text-neutral-500 mb-4">{post.date && new Date(post.date).toLocaleDateString()}</div>
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <span key={tag} className="bg-emineon-blue/10 text-emineon-blue px-2 py-1 rounded text-xs">{tag}</span>
            ))}
          </div>
          <p className="text-neutral-700 mb-8">{post.excerpt}</p>
          
          {/* Rich text content from Contentful */}
          <div className="prose prose-lg max-w-none mb-8">
            {post.content && typeof post.content === 'object' && documentToReactComponents(post.content, {
              renderMark: {
                [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
              },
              renderNode: {
                [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-4 text-neutral-700 leading-relaxed">{children}</p>,
                [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-3xl font-bold text-emineon-blue mb-6 mt-8">{children}</h1>,
                [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-2xl font-bold text-emineon-blue mb-4 mt-6">{children}</h2>,
                [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-xl font-bold text-emineon-blue mb-3 mt-5">{children}</h3>,
                [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                [BLOCKS.LIST_ITEM]: (node, children) => <li className="text-neutral-700">{children}</li>,
              },
            })}
          </div>
          
          <Link href="/blog" className="text-emineon-orange font-medium mt-4">← Back to Blog</Link>
        </article>
      </main>
      <footer className="py-8 bg-emineon-dark text-white/60">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <img src="/Emineon logo_tree_white.png" alt="Emineon logo" height={40} width={40} />
            <span className="text-sm hidden md:inline">© {new Date().getFullYear()} EMINEON. All rights reserved.</span>
            <div className="flex gap-4 ml-4">
              <a href="#" aria-label="LinkedIn" className="text-white/80 hover:text-emineon-orange transition-colors" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" aria-label="X (Twitter)" className="text-white/80 hover:text-emineon-orange transition-colors" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M17.5 6.5L6.5 17.5"/><path d="M6.5 6.5l11 11"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-white/80 hover:text-emineon-orange transition-colors" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
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
            <Link href="#" className="text-sm hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 