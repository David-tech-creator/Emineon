import type { SeoDict } from '../../schema';

/**
 * SEO/GEO content (SEO-PLAN.md §4, §6, §7). Facts policy as everywhere else:
 * only the verified set, no continent count (the hubs are listed instead),
 * david.v@emineon.com is the only public address, no invented clients or numbers.
 * Regulatory statements are deliberately general; anything to re-check before
 * launch is listed in TODO.md ("SEO pages: verify").
 */
export const seo: SeoDict = {
  pages: {
    switzerland: 'AI consulting in Switzerland',
    geneva: 'AI consulting in Geneva',
    governance: 'AI governance in Switzerland',
    faq: 'FAQ',
  },
  labels: {
    updated: 'Updated',
    footerColumn: 'AI consulting',
    related: 'Related',
    follow: 'Follow',
    allQuestions: 'All {n} questions',
  },
  titles: {
    services: {
      'ai-strategy': 'AI strategy and readiness assessment',
      'agentic-systems': 'Agentic AI systems, built and run in production',
      'data-ai-platforms': 'Data and AI platforms, Swiss-hosted where required',
      'ai-operations': 'AI operations: LLMOps, evals, monitoring, governance',
      'adoption-enablement': 'AI adoption and training for your teams',
    },
    industries: {
      'commodities-trading': 'AI for commodity trading and shipping',
      'banking-wealth': 'AI for private banks and wealth managers',
      'international-organisations': 'AI for international organisations and NGOs',
      'life-sciences': 'AI for life sciences and MedTech',
      'fragrance-flavour-chemicals': 'AI for fragrance, flavour and specialty chemicals',
      'industry-manufacturing': 'AI for industry and manufacturing',
    },
  },

  facts: {
    eyebrow: '[ Emineon at a glance ]',
    title: { pre: 'The facts, ', accent: 'in one place.' },
    definition:
      'Emineon is an AI-native consulting firm headquartered in Geneva, Switzerland. It designs AI strategy, builds agentic systems that run in production and helps teams adopt them. One accountable team does the work, priced on outcomes where they can be measured.',
    items: [
      { label: 'What', value: 'AI-native consulting firm. AI strategy, agentic systems in production, data and AI platforms, AI operations, adoption' },
      { label: 'Headquarters', value: 'Route de Vandœuvres 77A, 1253 Vandœuvres, Geneva, Switzerland' },
      { label: 'Delivery hubs', value: 'Genève · Ho Chi Minh City · Hanoi · Tokyo · Melbourne · Silicon Valley · Texas' },
      { label: 'Network', value: '130+ engineers · 200+ projects delivered' },
      { label: 'Engagement model', value: 'Assess (fixed-fee diagnostic) → Build (milestone- and outcome-priced) → Run (operate, harden, transfer)' },
      { label: 'Flagship', value: '30 days from readiness to a first workflow live in production' },
      { label: 'Staffing', value: 'Small senior teams and forward-deployed engineers on site, backed by the global delivery network' },
      { label: 'Pricing', value: 'Fixed fees and outcome-based pricing' },
      { label: 'Languages', value: 'English, French, German' },
      { label: 'Data and compliance', value: 'Swiss data residency available; nFADP (in force since 1 September 2023); FINMA Guidance 08/2024; GDPR; EU AI Act readiness; model-agnostic' },
      { label: 'Sectors', value: 'Commodities trading and shipping; private banking and wealth; international organisations and NGOs; life sciences and MedTech; fragrance, flavour and specialty chemicals; industry and manufacturing' },
      { label: 'Contact', value: 'david.v@emineon.com' },
    ],
  },

  faq: {
    groups: {
      firm: 'About Emineon',
      engagements: 'Engagements and pricing',
      technology: 'Technology and data',
      regulation: 'Regulation and governance',
    },
    items: [
      {
        id: 'what-ai-consulting',
        group: 'engagements',
        q: 'What does an AI consulting firm do?',
        a: 'It helps an organisation decide where AI creates value, builds the systems that deliver it and makes sure people use them. At Emineon that means an assessment with business cases and a roadmap. Then agentic systems built and run in production, with training and governance so people keep using them.',
      },
      {
        id: 'who-is-emineon',
        group: 'firm',
        q: 'Who is Emineon?',
        a: 'Emineon is an AI-native consulting firm headquartered in Geneva, Switzerland. Small senior teams use AI in their own work. A global delivery network of 130+ engineers supports them. Together they take clients from board-level AI strategy to systems in production.',
      },
      {
        id: 'where-based',
        group: 'firm',
        q: 'Where is Emineon based?',
        a: 'Our headquarters is at Route de Vandœuvres 77A, 1253 Vandœuvres, in the canton of Geneva. Our delivery network has hubs in Ho Chi Minh City, Hanoi, Tokyo, Melbourne, Silicon Valley and Texas.',
      },
      {
        id: 'outside-geneva',
        group: 'firm',
        q: 'Do you work outside Geneva?',
        a: 'Yes. We work across Switzerland, including Lausanne, Zurich, Basel and Bern, and internationally. Forward-deployed engineers work on site with your team wherever the work is.',
      },
      {
        id: 'industries',
        group: 'firm',
        q: 'Which industries do you focus on?',
        a: 'Commodities trading and shipping, private banking and wealth management, and international organisations and NGOs. These are Geneva’s main sectors. We also work in life sciences and MedTech, fragrance, flavour and specialty chemicals, and industry and manufacturing.',
      },
      {
        id: 'services',
        group: 'firm',
        q: 'What services do you offer?',
        a: 'Five services. AI strategy (readiness, business cases, roadmap, policy), agentic systems, data and AI platforms, AI operations (LLMOps, evaluations, monitoring, governance), and adoption and enablement (training, change, AI policy).',
      },
      {
        id: 'how-start',
        group: 'engagements',
        q: 'How does an engagement start?',
        a: 'With Assess. This is a fixed-fee diagnostic covering AI readiness, prioritised use cases with ROI, data and risk, policy and a roadmap. It ends with a decision on what to build first.',
      },
      {
        id: 'how-fast',
        group: 'engagements',
        q: 'How quickly can a first AI workflow be live?',
        a: 'Our flagship sprint goes from readiness to a first workflow live in production in 30 days, for a well-scoped use case with data access in place.',
      },
      {
        id: 'pricing',
        group: 'engagements',
        q: 'How do you price your work?',
        a: 'Assessments are fixed-fee. Builds are priced by milestone, and by outcome where the outcome can be measured.',
      },
      {
        id: 'fde',
        group: 'engagements',
        q: 'What are forward-deployed engineers?',
        a: 'Senior engineers who sit with your team, on site in Geneva or wherever you operate. They learn the workflow first-hand and build the system with you. The wider delivery network adds capacity.',
      },
      {
        id: 'agentic-ai',
        group: 'technology',
        q: 'What is agentic AI, and is it ready for production?',
        a: 'Agentic AI systems use language models to plan and carry out multi-step tasks with tools, such as reading documents, checking systems and drafting actions, with people approving where it matters. It is ready for production when clear scope, evaluations, logging and human review are built in from day one.',
      },
      {
        id: 'data-switzerland',
        group: 'technology',
        q: 'Can our data stay in Switzerland?',
        a: 'Yes. Where required we deploy on Swiss-hosted infrastructure or in your own cloud tenant, and we design for the nFADP from the start. Your data stays yours and is not used to train third-party models.',
      },
      {
        id: 'model-agnostic',
        group: 'technology',
        q: 'Are you tied to one AI model or vendor?',
        a: 'No. We are model-agnostic and choose the model per task on quality, cost and data constraints, so you can switch providers without rebuilding.',
      },
      {
        id: 'finma',
        group: 'regulation',
        q: 'What does FINMA Guidance 08/2024 mean for AI at a bank or wealth manager?',
        a: 'FINMA Guidance 08/2024 sets out the Swiss financial regulator’s supervisory expectations for governance and risk management when supervised institutions use AI. In practice that means knowing which AI applications you run, who is responsible for them, how risky each one is, and how data quality, testing, monitoring and documentation are handled. We build those controls into the system itself.',
      },
      {
        id: 'eu-ai-act',
        group: 'regulation',
        q: 'Does the EU AI Act apply to Swiss companies?',
        a: 'It can. The EU AI Act reaches providers that place AI systems on the EU market and, in some cases, providers and deployers outside the EU whose AI output is used in the EU. Switzerland is not copying the EU Act. The Federal Council has chosen to ratify the Council of Europe AI Convention and adapt Swiss law sector by sector.',
      },
      {
        id: 'nfadp',
        group: 'regulation',
        q: 'How does the Swiss nFADP affect AI projects?',
        a: 'The revised Federal Act on Data Protection has been in force since 1 September 2023. For AI it means privacy by design and by default, transparency about automated decisions, a record of processing activities, impact assessments for high-risk processing and breach notification to the FDPIC. We treat these as design inputs from the start.',
      },
      {
        id: 'after-live',
        group: 'engagements',
        q: 'What happens after the system goes live?',
        a: 'In Run, we operate, monitor and harden it with evaluations and alerting. We then keep running it or hand it to your team with documentation and training. Rollout across entities happens in the same phase.',
      },
      {
        id: 'success',
        group: 'engagements',
        q: 'How do you measure success?',
        a: 'Against the business case agreed in Assess. That can be hours returned, cycle time, error rate, throughput or revenue, measured before and after. Evaluations track quality continuously, so you can check the system still performs.',
      },
      {
        id: 'training',
        group: 'engagements',
        q: 'Do you also train our people?',
        a: 'Yes. Adoption and enablement covers role-based training, AI policy, change management and internal champions. A system helps only when people use it.',
      },
      {
        id: 'languages',
        group: 'firm',
        q: 'Which languages do you work in?',
        a: 'English, French and German, the working languages of most Swiss firms and of international Geneva.',
      },
      {
        id: 'vs-large',
        group: 'firm',
        q: 'How is Emineon different from a large consultancy?',
        a: 'One small senior team takes you from strategy to a system in production and stays to run it. The same team builds what it recommends. We price on outcomes where they can be measured. We focus on Geneva’s regulated sectors with heavy document work.',
      },
      {
        id: 'contact',
        group: 'firm',
        q: 'How do I start a conversation?',
        a: 'Write to david.v@emineon.com or use the contact form. A first call scopes whether Assess, a 30-day sprint or a specific build fits.',
      },
    ],
  },

  faqPage: {
    meta: {
      title: 'AI consulting FAQ: services, pricing, data, regulation',
      description:
        'Short answers on AI consulting in Switzerland. Services, the 30-day sprint, outcome pricing, Swiss data residency, nFADP, FINMA 08/2024, EU AI Act.',
    },
    hero: {
      eyebrow: '[ FAQ ]',
      title: { pre: 'Questions we are ', accent: 'asked', post: ' most.' },
      lead: 'Short answers you can quote, grouped by topic. If yours is not here, write to david.v@emineon.com and a senior member of the team will reply within one business day.',
    },
  },

  switzerland: {
    meta: {
      title: 'AI consulting in Switzerland',
      description:
        'AI consulting firm in Geneva. AI strategy, agentic systems built and run in production, governance under nFADP, FINMA and the EU AI Act. Outcome-based pricing.',
    },
    hero: {
      eyebrow: '[ AI consulting · Switzerland ]',
      title: { pre: 'AI consulting in Switzerland, ', accent: 'from strategy to systems', post: ' in production.' },
      lead: 'Emineon is an AI consulting firm headquartered in Geneva. We help Swiss companies decide where AI pays off. We build agentic systems that run in production on Swiss-hosted or client infrastructure. We train their people to use them, in English, French and German.',
    },
    services: {
      eyebrow: '[ 01 · What we do in Switzerland ]',
      title: { pre: 'Five services and ', accent: 'one accountable', post: ' team.' },
      lead: 'Each service works on its own, but most Swiss clients combine two or three. A strategy that names the first workflows, the system that runs them, and the operations and training that keep them in use.',
    },
    engagement: {
      eyebrow: '[ 02 · How engagements work ]',
      title: { pre: 'Assess, build, run. ', accent: 'Priced on results.' },
      lead: 'Each engagement follows the same three steps. Each step has a fixed scope, a clear price logic and a result you can check before the next one. Our flagship sprint takes a well-scoped use case from readiness to a first workflow live in production in 30 days.',
      columns: { stage: 'Stage', what: 'What you get', pricing: 'Pricing', duration: 'Typical duration' },
    },
    swiss: {
      eyebrow: '[ 03 · Swiss specifics ]',
      title: { pre: 'Built for how Switzerland ', accent: 'regulates', post: ' data and AI.' },
      lead: 'Swiss firms work under their own data-protection law, sector supervisors and, often, EU rules as well. We treat all of it as a design input.',
      items: [
        {
          title: 'Data residency',
          text: 'Systems run on Swiss-hosted infrastructure or in your own cloud tenant when the data requires it. You choose the region and we document it. Client data is not used to train third-party models.',
        },
        {
          title: 'nFADP by design',
          text: 'The revised Federal Act on Data Protection has applied since 1 September 2023. Privacy by design and by default, records of processing, impact assessments and breach notification to the FDPIC are part of the build plan from the start.',
        },
        {
          title: 'FINMA expectations',
          text: 'For banks, wealth managers and other supervised institutions, FINMA Guidance 08/2024 frames how AI should be governed. We build the inventory, risk classification, testing, monitoring and documentation into the system.',
        },
        {
          title: 'EU AI Act reach',
          text: 'Switzerland is not copying the EU AI Act, but the Act can still apply when Swiss firms serve the EU market or their AI output is used there. We design for it from the start, so the documentation already exists when it is needed.',
        },
      ],
      cta: { label: 'AI governance in Switzerland', href: '/ai-governance-switzerland' },
    },
    sectors: {
      eyebrow: '[ 04 · Sectors ]',
      title: { pre: 'Focused on the sectors that ', accent: 'shape', post: ' Swiss business.' },
      lead: 'We focus on regulated, multilingual work with many documents. There AI saves time and needs care. Three core sectors are Geneva’s own. Three adjacent ones span Romandie and the rest of the country.',
    },
    where: {
      eyebrow: '[ 05 · Where we work ]',
      title: { pre: 'Rooted in Geneva, ', accent: 'on site', post: ' across Switzerland.' },
      lead: 'Client leadership and forward-deployed engineering sit at our Geneva headquarters. Engineers travel to where the work is. Our global delivery network adds capacity from its hubs.',
      places: [
        { title: 'Geneva', text: 'Headquarters in Vandœuvres. Trading houses, private banks and international organisations are a short drive away.' },
        { title: 'Lausanne and Vaud', text: 'Served from Geneva, on site whenever the work needs it. Life sciences, industry and the public research ecosystem.' },
        { title: 'Zurich', text: 'We serve Zurich clients from Geneva, with engineers on site for discovery, build and handover.' },
        { title: 'Basel', text: 'Life sciences and specialty chemicals, served from Geneva with on-site work where regulated data requires it.' },
        { title: 'Bern', text: 'Federal and regulated organisations, served from Geneva, in French or German.' },
        { title: 'Ticino', text: 'Served from Geneva for engagements that fit our sectors and languages.' },
      ],
      note: 'Geneva is our only Swiss office. Everywhere else, we come to you.',
      cta: { label: 'AI consulting in Geneva', href: '/ai-consulting-geneva' },
    },
    work: {
      eyebrow: '[ 06 · Representative engagements ]',
      title: { pre: 'Systems in production, ', accent: 'measured.' },
      lead: 'Anonymised under NDA and labelled as representative. Each one states the baseline, what we built and what changed.',
    },
    choose: {
      eyebrow: '[ 07 · How to choose ]',
      title: { pre: 'How to choose an AI consulting firm ', accent: 'in Switzerland.' },
      lead: 'Six questions to ask any firm, including us. The answers show whether a firm has systems in production.',
      items: [
        { title: 'Evidence of production', text: 'Ask for systems that are live today, with a baseline and a measured result. A live system says more than a pilot or a demo.' },
        { title: 'Data residency', text: 'Ask where your data is processed and stored, who can reach it and whether it trains a model. Get the answer in writing.' },
        { title: 'Regulated-sector knowledge', text: 'If you are supervised, the firm should know what FINMA Guidance 08/2024, the nFADP and, where relevant, the EU AI Act ask of an AI system, and show how its builds meet it.' },
        { title: 'Pricing model', text: 'Hourly billing rewards effort. Fixed fees and outcome-based pricing reward results. Ask which risks the firm is willing to share.' },
        { title: 'Run and handover', text: 'Ask who operates the system after launch, how quality is monitored and how ownership moves to your team. A plan with an exit is a good sign.' },
        { title: 'Language coverage', text: 'Swiss work happens in French, German and English, often in the same week. Make sure the team can work, document and train in yours.' },
      ],
    },
    faq: {
      eyebrow: '[ 08 · FAQ ]',
      title: { pre: 'AI consulting in Switzerland: ', accent: 'questions', post: ' we are asked.' },
    },
    faqIds: ['what-ai-consulting', 'who-is-emineon', 'outside-geneva', 'services', 'how-fast', 'pricing', 'data-switzerland', 'finma', 'eu-ai-act', 'vs-large'],
  },

  geneva: {
    meta: {
      title: 'AI consulting in Geneva',
      description:
        'AI consulting in Geneva, based in Vandœuvres. Agentic systems for commodity traders, private banks and international organisations, run in production.',
    },
    hero: {
      eyebrow: '[ AI consulting · Genève ]',
      title: { pre: 'AI consulting in Geneva, built for ', accent: 'trading, private banking', post: ' and international organisations.' },
      lead: 'Emineon is an AI consulting firm headquartered in Vandœuvres, Geneva. Our senior team and forward-deployed engineers build agentic systems for the city’s trading houses, private banks and international organisations. We run them in production under Swiss data protection and train the people who use them.',
    },
    context: {
      eyebrow: '[ 01 · Why Geneva ]',
      title: { pre: 'A city of documents, languages ', accent: 'and regulators.' },
      paragraphs: [
        'Much of Geneva’s economy runs on work that suits AI and must be done carefully. Trade confirmations and letters of credit, client files and periodic reviews, reports and archives in several official languages.',
        'The same firms are supervised, audited and bound by confidentiality. So we build here, with the people who do the work.',
      ],
      stats: [
        { value: '#1', label: 'Geneva ranks first worldwide for trade finance; 12 of Switzerland’s 14 trade-finance banks are here.', source: 'ge.ch, key sectors' },
        { value: '~400', label: 'Trading companies in Geneva, around 6,000 jobs.', source: 'ge.ch, key sectors' },
        { value: '37,000+', label: 'Financial-sector jobs in Geneva.', source: 'ge.ch, key sectors' },
        { value: '400+', label: 'Aroma and fragrance companies in the Geneva region, around 10,000 jobs.', source: 'ge.ch, key sectors' },
      ],
    },
    sectors: {
      eyebrow: '[ 02 · Geneva sectors ]',
      title: { pre: 'Three core sectors in ', accent: 'Geneva.' },
      lead: 'Our core sectors are central to Geneva. Each has its own documents, regulators and risks.',
      items: [
        {
          industry: 'commodities-trading',
          title: 'Commodity trading and shipping',
          text: 'Agents that read confirmations, match them against booked trades and route exceptions with context, plus support for trade-finance documents and operations reporting.',
        },
        {
          industry: 'banking-wealth',
          title: 'Private banks and wealth managers',
          text: 'Periodic KYC reviews prepared for a human decision, client reporting in several languages, and controls designed around FINMA’s expectations for AI.',
        },
        {
          industry: 'international-organisations',
          title: 'International organisations and NGOs',
          text: 'Multilingual document pipelines, searchable institutional memory and drafting support, with the confidentiality and data rules international bodies work under.',
        },
      ],
    },
    onsite: {
      eyebrow: '[ 03 · On site in Geneva ]',
      title: { pre: 'Engineers ', accent: 'in your office', post: ', with your team.' },
      paragraphs: [
        'Our forward-deployed engineers work from your premises in Geneva for discovery, build and handover. They join stand-ups, read the exceptions queue and talk to the people who do the work. Requirements come from the people closest to it.',
        'Our headquarters at Route de Vandœuvres 77A is a short drive from the banks, trading houses and international organisations we work with. Lausanne and the rest of Romandie are within easy reach.',
      ],
      points: [
        { title: 'Senior, local, accountable', text: 'A small senior team in Geneva owns the outcome and the relationship.' },
        { title: 'Capacity behind it', text: 'Our global delivery network adds build and operations capacity.' },
        { title: 'French, English, German', text: 'Workshops, documentation and training in the language your team works in.' },
      ],
    },
    data: {
      eyebrow: '[ 04 · Data and regulation ]',
      title: { pre: 'Confidential by ', accent: 'default.' },
      items: [
        { title: 'Swiss data protection', text: 'Built for the nFADP from the start, with Swiss-hosted infrastructure or your own cloud tenant where the data requires it.' },
        { title: 'Supervised institutions', text: 'For banks and wealth managers, controls follow FINMA Guidance 08/2024. They cover inventory, risk classification, testing, monitoring and documentation.' },
        { title: 'International organisations', text: 'International bodies often apply their own data-protection and confidentiality rules. We design to those rules and document how the system meets them.' },
      ],
    },
    work: {
      eyebrow: '[ 05 · Representative engagements ]',
      title: { pre: 'Built for Geneva’s ', accent: 'core', post: ' sectors.' },
      lead: 'Anonymised under NDA and labelled as representative.',
    },
    faq: {
      eyebrow: '[ 06 · FAQ ]',
      title: { pre: 'AI consulting in Geneva: ', accent: 'questions', post: ' we are asked.' },
    },
    faqIds: ['where-based', 'fde', 'how-fast', 'data-switzerland', 'languages', 'contact'],
    faqExtra: [
      {
        q: 'Do you work with commodity traders in Geneva?',
        a: 'Yes. Commodities trading and shipping is one of our three core sectors. Typical systems match trade confirmations against booked trades, support trade-finance documentation and route exceptions to the right person with context.',
      },
      {
        q: 'Can you work on site in Geneva?',
        a: 'Yes. Our headquarters is in Vandœuvres and our forward-deployed engineers work from client premises in Geneva for discovery, build and handover.',
      },
      {
        q: 'Do you work with international organisations and NGOs in Geneva?',
        a: 'Yes. International organisations and NGOs are one of our core sectors. We build multilingual document pipelines and searchable archives, designed around the confidentiality and data rules these bodies work under.',
      },
    ],
  },

  governance: {
    meta: {
      title: 'AI governance in Switzerland: FINMA, nFADP, EU AI Act',
      description:
        'What FINMA Guidance 08/2024, the nFADP and the EU AI Act mean for AI systems in Switzerland, and the controls we build in (inventory, evals, logs, review).',
    },
    hero: {
      eyebrow: '[ Trust & governance ]',
      title: { pre: 'AI governance for Swiss firms, ', accent: 'built into the system', post: ' from the start.' },
      lead: 'Swiss firms that use AI answer to the nFADP, to sector supervisors such as FINMA and, when they serve the EU market, to the EU AI Act. This page summarises what each asks of an AI system in practice, and the controls we build into each system so the evidence exists from day one.',
    },
    frameworks: {
      eyebrow: '[ 01 · The frameworks ]',
      title: { pre: 'Four sources of rules, ', accent: 'one', post: ' system design.' },
      lead: 'A practitioner’s summary for orientation. It is not legal advice. Check the primary sources and your counsel for the obligations that apply to you.',
      items: [
        {
          key: 'finma',
          name: 'FINMA Guidance 08/2024',
          scope: 'Banks, insurers, wealth managers and other FINMA-supervised institutions.',
          summary:
            'FINMA’s guidance on governance and risk management when supervised institutions use AI. It describes what the supervisor expects to see, and it frames supervisory dialogue on AI.',
          points: [
            'Know which AI applications you run, with a maintained inventory and clear owners.',
            'Classify each application by risk and manage it accordingly.',
            'Look after data quality, testing and ongoing monitoring.',
            'Keep documentation that makes results explainable and reviewable.',
          ],
          source: 'FINMA · Guidance 08/2024',
        },
        {
          key: 'nfadp',
          name: 'nFADP (revised Federal Act on Data Protection)',
          scope: 'Any organisation processing personal data in Switzerland.',
          summary:
            'In force since 1 September 2023. It applies to AI systems as it does to any processing of personal data, with a few duties that matter most for AI.',
          points: [
            'Privacy by design and by default.',
            'Transparency, including about automated individual decisions.',
            'A record of processing activities (with an exemption for some smaller, low-risk firms).',
            'Data protection impact assessments for high-risk processing, and breach notification to the FDPIC.',
          ],
          source: 'Swiss Confederation · nFADP · FDPIC guidance',
        },
        {
          key: 'euaiact',
          name: 'EU AI Act',
          scope: 'Swiss firms that place AI systems on the EU market, or whose AI output is used in the EU.',
          summary:
            'A risk-based EU regulation with obligations that phase in over several years. It can reach Swiss companies through their EU business, even though Switzerland is not an EU member.',
          points: [
            'Prohibited practices, high-risk systems and transparency duties are treated differently.',
            'High-risk systems need risk management, data governance, documentation, logging and human oversight.',
            'Some duties fall on providers, others on deployers. Know which role you play.',
            'Application dates have moved before. Check the current timetable for your use case.',
          ],
          source: 'European Union · AI Act',
        },
        {
          key: 'swiss',
          name: 'Switzerland’s own approach',
          scope: 'Everyone operating in Switzerland.',
          summary:
            'Switzerland has chosen not to copy the EU AI Act. The Federal Council’s approach is to ratify the Council of Europe Convention on AI and to adapt Swiss law sector by sector where needed.',
          points: [
            'Existing law (data protection, sector supervision, liability) already applies to AI today.',
            'Further amendments are expected through the normal consultation process.',
            'Designing for transparency and human oversight now keeps future changes cheap.',
          ],
          source: 'Federal Council · OFCOM (BAKOM)',
        },
      ],
    },
    table: {
      eyebrow: '[ 02 · At a glance ]',
      title: { pre: 'What each asks, and ', accent: 'what we build.' },
      columns: { framework: 'Framework', concerns: 'Concerns', asks: 'Asks for, in short', build: 'What we build in' },
      rows: [
        { framework: 'FINMA 08/2024', concerns: 'Supervised financial institutions', asks: 'Inventory, risk classification, data quality, testing, monitoring, documentation', build: 'System register, risk tiers, eval suites, monitoring and alerting, decision logs' },
        { framework: 'nFADP', concerns: 'Anyone processing personal data in Switzerland', asks: 'Privacy by design, transparency, records, impact assessments, breach notification', build: 'Data maps, minimisation, Swiss or tenant hosting, DPIA inputs, audit trail' },
        { framework: 'EU AI Act', concerns: 'Swiss firms with EU market exposure', asks: 'Risk-based duties, such as documentation, logging and human oversight for high-risk uses', build: 'Technical documentation, event logging, human review queues, role mapping' },
        { framework: 'Swiss approach', concerns: 'Everyone in Switzerland', asks: 'Existing law now, sector-specific amendments later', build: 'Transparent, reviewable systems that adapt without a rebuild' },
      ],
    },
    controls: {
      eyebrow: '[ 03 · Controls we build ]',
      title: { pre: 'The evidence exists ', accent: 'from day one.' },
      lead: 'Governance is cheapest when it is part of the architecture. These controls come with each Emineon system, sized to its risk.',
      items: [
        { icon: 'branch', title: 'AI inventory', text: 'Each system, model and prompt version is registered with an owner, a purpose and a risk tier.' },
        { icon: 'evals', title: 'Evaluations', text: 'We write an eval set before the first prompt. It runs on each change and in production.' },
        { icon: 'operations', title: 'Logging and audit trail', text: 'Inputs, outputs, tool calls and approvals are logged. Any result can be traced and explained.' },
        { icon: 'fde', title: 'Human review', text: 'People approve the important steps. Thresholds and queues are set with the teams who own the decision.' },
        { icon: 'residency', title: 'Data residency', text: 'Swiss-hosted or in your own tenant when required. Data is minimised and not used to train third-party models.' },
        { icon: 'shield', title: 'Documentation', text: 'Technical documentation, data maps and DPIA inputs kept current as the system changes.' },
      ],
    },
    reading: {
      eyebrow: '[ 04 · Further reading ]',
      title: { pre: 'From our ', accent: 'insights.' },
    },
    insightSlugs: ['nfadp-and-ai-in-practice', 'evals-are-the-new-qa', 'from-pilot-to-production'],
    services: {
      eyebrow: '[ 05 · Services ]',
      title: { pre: 'Where governance ', accent: 'lives', post: ' in our work.' },
      lead: 'Governance is part of how we run systems and how we prepare your people to use them.',
    },
    faq: {
      eyebrow: '[ 06 · FAQ ]',
      title: { pre: 'AI regulation in Switzerland: ', accent: 'questions', post: ' we are asked.' },
    },
    faqIds: ['finma', 'eu-ai-act', 'nfadp', 'data-switzerland', 'model-agnostic', 'agentic-ai'],
    disclaimer:
      'This page is a practitioner’s summary for orientation, not legal advice. Regulatory texts and timelines change. Check the primary sources (FINMA, FDPIC, the Federal Council and the EU) and your legal counsel before relying on it.',
  },
};
