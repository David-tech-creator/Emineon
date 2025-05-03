"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-8">
      <header className="sticky top-0 z-40 border-b bg-white w-full">
        <div className="container flex h-20 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={48} height={48} />
              <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Who we are
            </Link>
            <Link href="/#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Services
            </Link>
            <Link href="/#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              How we work
            </Link>
            <Link href="/#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Expertise
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-6">Contact Us</Button>
          </div>
        </div>
      </header>

      <header className="w-full flex flex-col items-center mb-12 mt-8">
        <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={80} height={80} className="mb-4" />
        <h1 className="text-4xl font-bold text-emineon-blue mb-2">Careers at Emineon</h1>
        <p className="text-lg text-center max-w-2xl text-neutral-700">
          Join our global network of professionals and help shape the future of consulting, technology, and innovation. At Emineon, we value expertise, diversity, and a forward-thinking mindset. Explore our open positions and become part of a team that makes a difference.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-emineon-blue mb-4">Open Positions</h2>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center min-h-[200px]">
            <p className="text-neutral-500">No open positions at the moment. Please check back soon or send us your CV at <a href="mailto:careers@emineon.com" className="text-emineon-blue underline">careers@emineon.com</a>.</p>
          </div>
        </section>
        {/* Emineon Culture Section */}
        <section className="mb-12">
          <div className="bg-emineon-blue/10 border-l-4 border-emineon-blue rounded-lg p-8">
            <h3 className="text-xl font-bold text-emineon-blue mb-2">Our culture at Emineon</h3>
            <p className="text-neutral-700 mb-2">At Emineon, we believe that people are the heart of innovation. Our culture is built on trust, collaboration, and a passion for making a difference—both for our clients and for each other.</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-1 mb-2">
              <li><span className="font-semibold text-emineon-blue">Diversity & Inclusion:</span> We celebrate diverse backgrounds, perspectives, and experiences, knowing they drive creativity and better solutions.</li>
              <li><span className="font-semibold text-emineon-blue">Growth Mindset:</span> We encourage continuous learning, curiosity, and personal development at every level.</li>
              <li><span className="font-semibold text-emineon-blue">Flexibility:</span> We embrace remote work, flexible hours, and a results-driven approach that values work-life balance.</li>
              <li><span className="font-semibold text-emineon-blue">Collaboration:</span> We work as one team, supporting each other and sharing knowledge to achieve our goals together.</li>
              <li><span className="font-semibold text-emineon-blue">Impact:</span> We strive to make a positive impact for our clients, our colleagues, and the communities we serve.</li>
            </ul>
            <p className="text-neutral-700">If you want to be part of a forward-thinking, supportive, and ambitious team, Emineon is the place for you.</p>
          </div>
        </section>
      </main>
    </div>
  );
} 