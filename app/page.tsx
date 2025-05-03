import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8f8]">
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="container flex h-20 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Image src="/Emineon logo_tree.png" alt="Emineon Logo" width={48} height={48} />
            <span className="text-2xl font-bold tracking-tight text-emineon-blue">EMINEON</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#who-we-are" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Who We Are
            </Link>
            <Link href="#services" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Services
            </Link>
            <Link href="#how-we-work" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              How We Work
            </Link>
            <Link href="#expertise" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Expertise
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-neutral-700 hover:text-emineon-blue">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-6">Contact Us</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-white">
          <div className="container flex flex-col lg:flex-row items-center gap-12">
            <div className="space-y-6 lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-emineon-blue">
                Your Partner in Growth and Innovation
              </h1>
              <p className="text-xl text-neutral-600 max-w-xl">
                At Emineon Consulting, we specialize in optimizing operations, driving sustainable growth, and
                delivering tailored services across industries.
              </p>
              <div className="pt-4">
                <p className="text-sm uppercase tracking-widest text-neutral-500 mb-2">forge your edge.</p>
                <p className="text-sm text-neutral-600 italic">
                  [fɔːdʒ] verb - create (something) strong, enduring, or successful.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-emineon-blue hover:bg-emineon-light text-white rounded-none px-8">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <Image
                src="/global-talent-hero.jpg"
                alt="Global talent network"
                width={600}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Find a Job / Hire Talent Section */}
        <section className="py-16 bg-emineon-blue text-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What are you looking for?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Whether you're seeking new opportunities or looking to build your team, EMINEON connects exceptional
                talent with forward-thinking organizations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-8 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-all">
                <h3 className="text-2xl font-bold mb-4">Find a Job</h3>
                <p className="mb-6">
                  Join our exclusive network of global professionals. Access opportunities with leading European
                  companies and advance your career.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Access exclusive opportunities with top companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Benefit from our placement expertise and support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Grow your career with long-term partnerships</span>
                  </li>
                </ul>
                <Button className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8">
                  Join as Talent <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-white/10 p-8 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-all">
                <h3 className="text-2xl font-bold mb-4">Hire Talent</h3>
                <p className="mb-6">
                  Access our pool of rigorously vetted professionals across multiple disciplines to solve your talent
                  challenges.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Connect with pre-vetted professionals within days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Flexible engagement models to suit your needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span>Comprehensive support throughout the process</span>
                  </li>
                </ul>
                <Button className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8">
                  Find Talent <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section id="who-we-are" className="py-20 bg-neutral-100">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">Who we are</h2>
                <h3 className="text-xl font-medium text-neutral-800 mb-6">About EMINEON Global Talent</h3>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="font-medium text-neutral-900">Global Presence:</p>
                    <p className="text-neutral-600">
                      Headquartered in Geneva with a network spanning Europe, Africa, and beyond, EMINEON connects
                      organizations with exceptional talent across borders and disciplines.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-neutral-900">Proven Expertise:</p>
                    <p className="text-neutral-600">
                      With a portfolio spanning software engineering, design, finance, marketing, and more, our talent
                      network delivers measurable results across industries.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-neutral-900">Commitment to Excellence:</p>
                    <p className="text-neutral-600">
                      Leveraging rigorous vetting methodologies and cutting-edge remote work technologies, we help
                      businesses overcome talent shortages with quality professionals who integrate seamlessly.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">What drives us</h2>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h3 className="font-medium text-neutral-900">Cultural Alignment</h3>
                    <p className="text-neutral-600">
                      Matching talent with language proficiency and cultural understanding for seamless integration.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-neutral-900">Quality Assurance</h3>
                    <p className="text-neutral-600">
                      Rigorous vetting ensuring only the top 1-5% of global professionals join our network.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-neutral-900">Remote Excellence</h3>
                    <p className="text-neutral-600">
                      Pioneering technologies and methodologies that make remote collaboration feel local.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-neutral-900">Global Diversity</h3>
                    <p className="text-neutral-600">
                      Embracing diverse perspectives to drive innovation and better problem-solving.
                    </p>
                  </div>
                </div>

                <div className="mt-12 space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm uppercase tracking-widest text-neutral-500">[Mission]</p>
                    <p className="text-neutral-700">
                      To connect European organizations with exceptional global talent while creating opportunities for
                      professionals worldwide.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm uppercase tracking-widest text-neutral-500">[Vision]</p>
                    <p className="text-neutral-700">To be the trusted talent partner for organizations striving to:</p>
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-900 font-medium">Overcome Skills Gaps</span>
                        <span className="text-neutral-600">— Access talent unavailable locally</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-900 font-medium">Build Global Teams</span>
                        <span className="text-neutral-600">— Diverse perspectives driving innovation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neutral-900 font-medium">Scale Efficiently</span>
                        <span className="text-neutral-600">— Flexible talent solutions for growth</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-16">Key services</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-neutral-900">Talent Placement</h3>
                <p className="text-neutral-600">
                  Engage professionals remotely, in hybrid arrangements, or fully on-site at your location with complete
                  cross-border logistics handling.
                </p>
                <ul className="space-y-2 pt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emineon-blue shrink-0 mt-0.5" />
                    <span className="text-neutral-600">Remote, hybrid, or on-site options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emineon-blue shrink-0 mt-0.5" />
                    <span className="text-neutral-600">Pre-vetted and project-ready within days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emineon-blue shrink-0 mt-0.5" />
                    <span className="text-neutral-600">Visa and compliance handling</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-neutral-900">Dedicated Teams</h3>
                <p className="text-neutral-600">
                  For larger projects or ongoing needs, we assemble dedicated remote teams of specialists that operate
                  as your satellite office.
                </p>
                <ul className="space-y-2 pt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emineon-blue shrink-0 mt-0.5" />
                    <span className="text-neutral-600">Full agile development squads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emineon-blue shrink-0 mt-0.5" />
                    <span className="text-neutral-600">Dedicated team lead or delivery manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emineon-blue shrink-0 mt-0.5" />
                    <span className="text-neutral-600">Scalable to your project needs</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-neutral-900">Managed Services</h3>
                <p className="text-neutral-600">
                  When you want outcomes rather than managing people, we take on entire projects or functions and
                  deliver results under service-level agreements.
                </p>
                <ul className="space-y-2 pt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emineon-blue shrink-0 mt-0.5" />
                    <span className="text-neutral-600">End-to-end project delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emineon-blue shrink-0 mt-0.5" />
                    <span className="text-neutral-600">Outcome-based agreements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emineon-blue shrink-0 mt-0.5" />
                    <span className="text-neutral-600">Quality and timeline guarantees</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-xl font-medium text-neutral-900 mb-8">Our proven models</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#EEF1FF] p-6">
                  <h4 className="font-medium text-neutral-900 mb-3">Value-Based Partnerships</h4>
                  <p className="text-neutral-600">
                    Co-create talent solutions that align with your business goals and growth trajectory.
                  </p>
                </div>

                <div className="bg-[#EEF1FF] p-6">
                  <h4 className="font-medium text-neutral-900 mb-3">Fixed Price Projects</h4>
                  <p className="text-neutral-600">
                    Focused outcomes with cost predictability for specific initiatives or deliverables.
                  </p>
                </div>

                <div className="bg-[#EEF1FF] p-6">
                  <h4 className="font-medium text-neutral-900 mb-3">Workforce Augmentation</h4>
                  <p className="text-neutral-600">
                    Rapidly deploy experts for immediate impact with flexible engagement terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="py-20 bg-neutral-100">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">
                  Multi-Disciplinary Coverage
                </h2>
                <p className="text-neutral-600 mb-8">
                  Unlike tech-only networks, we curate talent across diverse professional fields to support many
                  corporate functions.
                </p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Software & IT</h3>
                    <p className="text-sm text-neutral-600">
                      Developers, cloud engineers, cybersecurity experts, DevOps, AI/ML engineers
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Data & Analytics</h3>
                    <p className="text-sm text-neutral-600">
                      Data scientists, data engineers, BI analysts, database administrators
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Design & Creative</h3>
                    <p className="text-sm text-neutral-600">
                      UI/UX designers, graphic designers, product designers, video editors
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Product & Project</h3>
                    <p className="text-sm text-neutral-600">Product managers, Agile project managers, SCRUM masters</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Marketing & Growth</h3>
                    <p className="text-sm text-neutral-600">
                      Digital marketers, SEO/SEM specialists, content strategists, social media managers
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Finance & Accounting</h3>
                    <p className="text-sm text-neutral-600">
                      Financial analysts, fractional CFOs, accountants, FP&A specialists
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Legal & Compliance</h3>
                    <p className="text-sm text-neutral-600">
                      Contract attorneys, legal researchers, compliance officers with EU/Swiss regulations knowledge
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">HR & Recruiting</h3>
                    <p className="text-sm text-neutral-600">
                      Technical recruiters, HR consultants, talent acquisition specialists
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">
                  Driving Impact Across Key Sectors
                </h2>
                <p className="text-neutral-600 mb-8">
                  Our talent solutions have delivered measurable results across industries and regions.
                </p>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Technology</h3>
                    <p className="text-neutral-600">
                      Supported leading tech firms in scaling development teams, implementing data-driven strategies,
                      and accelerating product launches through specialized talent.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Finance</h3>
                    <p className="text-neutral-600">
                      Guided financial institutions in navigating regulatory changes, digital transformation, and
                      cybersecurity challenges with expert professionals.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Manufacturing</h3>
                    <p className="text-neutral-600">
                      Delivered smart technology integration and supply chain optimization for manufacturers through
                      specialized engineering and technical talent.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900">Healthcare</h3>
                    <p className="text-neutral-600">
                      Partnered with healthcare providers to enhance operational efficiency, digital health initiatives,
                      and patient outcomes through specialized expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section id="how-we-work" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">How we work</h2>
            <p className="text-neutral-600 max-w-3xl mb-16">
              Our collaborative approach ensures a seamless experience from initial talent needs assessment to ongoing
              support and optimization.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="font-medium text-neutral-900">Discovery phase</h3>
                <ul className="space-y-3 text-neutral-600">
                  <li>Deep dive into your organization's talent needs and challenges</li>
                  <li>Conduct stakeholder interviews and skills gap analysis</li>
                  <li>Deliver a detailed assessment report outlining key priorities</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-neutral-900">Talent Matching</h3>
                <ul className="space-y-3 text-neutral-600">
                  <li>Leverage our AI-powered matching system to identify ideal candidates</li>
                  <li>Present a curated shortlist of pre-vetted professionals</li>
                  <li>Facilitate interviews and selection process</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-neutral-900">Implementation</h3>
                <ul className="space-y-3 text-neutral-600">
                  <li>Manage onboarding and integration of selected talent</li>
                  <li>Set up remote collaboration tools and processes</li>
                  <li>Monitor initial engagement with defined KPIs</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-neutral-900">Continuous improvement</h3>
                <ul className="space-y-3 text-neutral-600">
                  <li>Regular check-ins and performance reviews</li>
                  <li>Provide ongoing support to address evolving needs</li>
                  <li>Optimize talent engagement for long-term success</li>
                </ul>
              </div>
            </div>

            <div className="mt-16 bg-[#EEF1FF] p-8">
              <h3 className="text-xl font-medium text-neutral-900 mb-6">Ensuring Excellence in Every Engagement</h3>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <h4 className="font-medium text-neutral-900">Rigorous Vetting</h4>
                  <p className="text-neutral-600">
                    Our 6-step vetting process ensures only the top 1-5% of applicants join our talent network,
                    guaranteeing quality and expertise.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-neutral-900">Dedicated Oversight</h4>
                  <p className="text-neutral-600">
                    Every placement is overseen by an experienced success manager to ensure alignment, integration, and
                    ongoing satisfaction.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-neutral-900">Client Satisfaction Focus</h4>
                  <p className="text-neutral-600">
                    Regular feedback loops and performance reviews ensure services evolve with client needs and
                    expectations are consistently met or exceeded.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Remote Work Technology Section */}
        <section className="py-20 bg-neutral-100">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-8">Remote Work Enablement</h2>
                <p className="text-neutral-600 mb-8">
                  We don't just match talent—we actively facilitate smooth collaboration through cutting-edge technology
                  and best practices.
                </p>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="font-medium text-neutral-900">Immersive Collaboration</h3>
                    <p className="text-neutral-600">
                      Leverage AR/VR workplace solutions, telepresence tools, and high-end video conferencing to make
                      remote work feel local.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-neutral-900">AI-Powered Management</h3>
                    <p className="text-neutral-600">
                      AI-driven project management tools that automate status updates, flag delays, and predict
                      roadblocks for real-time visibility.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-neutral-900">Security & Infrastructure</h3>
                    <p className="text-neutral-600">
                      Secure access and robust IT setup with VPNs, cloud dev environments, and encrypted communication
                      for sensitive data.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Image
                  src="/remote-collaboration.jpg"
                  alt="Remote collaboration technology"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-16">Trusted by industry leaders</h2>

            <div className="space-y-8">
              <div className="border-l-4 border-emineon-blue pl-6 py-2">
                <p className="text-neutral-600 italic mb-4">
                  "EMINEON helped us seamlessly integrate global talent into our operations, positioning us as industry
                  leaders. Their remote work technology makes collaboration effortless despite geographic distances."
                </p>
                <p className="font-medium text-neutral-900">— CIO, Top European Tech Firm</p>
              </div>

              <div className="border-l-4 border-emineon-blue pl-6 py-2">
                <p className="text-neutral-600 italic mb-4">
                  "Their strategic talent matching transformed our development capabilities, driving measurable results.
                  The quality of professionals in their network is truly exceptional."
                </p>
                <p className="font-medium text-neutral-900">— COO, Global Manufacturer</p>
              </div>

              <div className="border-l-4 border-emineon-blue pl-6 py-2">
                <p className="text-neutral-600 italic mb-4">
                  "The EMINEON team demonstrated exceptional expertise in delivering specialized talent solutions that
                  exceeded our expectations. Their vetting process ensures only the best professionals join our team."
                </p>
                <p className="font-medium text-neutral-900">— CFO, Leading Financial Institution</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="py-20 bg-neutral-100">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-emineon-blue mb-16">What Sets Us Apart</h2>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              <div className="space-y-4">
                <h3 className="font-medium text-neutral-900">Tailored Matching</h3>
                <p className="text-neutral-600">
                  Every talent match is uniquely designed to fit your organization's goals, culture, and technical
                  requirements.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-neutral-900">Cultural Alignment</h3>
                <p className="text-neutral-600">
                  We prioritize language proficiency and cultural understanding to ensure seamless integration with your
                  team.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-neutral-900">Cutting-Edge Tools</h3>
                <p className="text-neutral-600">
                  Leverage the latest remote collaboration technologies to make distance irrelevant to productivity.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-neutral-900">Proven Track Record</h3>
                <p className="text-neutral-600">
                  Trusted by Fortune 500 companies and industry leaders across Europe for quality talent solutions.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-neutral-900">Expert Support</h3>
                <p className="text-neutral-600">
                  Dedicated success managers ensure smooth integration and ongoing optimization of talent engagements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-emineon-blue text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Let's Build Your Global Team</h2>
              <p className="text-xl opacity-80 mb-8">
                Ready to overcome talent shortages and access exceptional professionals worldwide? Let's start the
                conversation.
              </p>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="space-y-2">
                  <p className="font-medium">David Vinkenroye</p>
                  <p className="opacity-80">Founder & Partner, EMINEON</p>
                  <p className="opacity-80">david.v@emineon.com</p>
                  <p className="opacity-80">+41 (0) 795 33 28 709</p>
                </div>

                <div className="md:ml-auto">
                  <Button className="bg-white text-emineon-blue hover:bg-blue-50 rounded-none px-8">Contact Us</Button>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20 text-center">
                <p className="text-sm uppercase tracking-widest opacity-60">forge your edge.</p>
                <p className="text-sm opacity-60">www.emineon.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-emineon-dark text-white/60">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} EMINEON. All rights reserved.</p>
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
        </div>
      </footer>
    </div>
  )
}
