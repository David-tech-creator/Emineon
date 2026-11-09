import type { Industry } from '../../schema';

export const industries: Industry[] = [
  {
    slug: 'commodities-trading',
    icon: 'trading',
    image: 'ind-trading',
    tier: 'core',
    name: 'Commodities Trading & Shipping',
    short: 'Confirmations, KYC and trade finance documents, handled by agents. Traders and operators stay in control.',
    hero: {
      eyebrow: '[ Industry · Commodities trading & shipping ]',
      title: { pre: 'Less paper between the trade and the ', accent: 'cargo.' },
      lead: 'Trading houses handle many documents. Confirmations, letters of credit, bills of lading, inspection certificates and sanctions checks. We put agents on that flow so operations keep pace with the desk. Compliance gets a record of each step.',
    },
    stat: {
      value: '#1',
      label: 'Geneva ranks first worldwide for trade finance; 12 of Switzerland’s 14 trade-finance banks are here.',
      source: 'ge.ch, key sectors',
    },
    context: {
      title: 'Trading is also a document business',
      paragraphs: [
        'Geneva is home to some 400 trading companies and around 6,000 direct jobs. Each cargo comes with a chain of documents to match, check and file. These are often in several languages and under time pressure. Counterparties, banks, inspectors and shipping agents all use different templates.',
        'Compliance spend is rising. Sanctions regimes change faster, banks ask for more evidence and discrepancies cost more in trade finance. Operations teams have grown to absorb it. AI agents can read, match and pre-check the documents. People then see only what needs judgement.',
      ],
    },
    valueStreams: [
      {
        name: 'Trade operations',
        description: 'From deal capture to settlement. Documents are matched automatically and discrepancies show up early.',
        useCases: [
          'Confirmation matching against booked trades in the ETRM',
          'Extraction from term sheets, recaps and amendments',
          'Invoice and provisional/final price reconciliation',
          'Demurrage and laytime claim preparation',
        ],
      },
      {
        name: 'Trade finance documentation',
        description: 'Letters of credit and shipping documents checked before the bank sees them.',
        useCases: [
          'LC term extraction and document checklist generation',
          'Pre-presentation discrepancy checks on bills of lading and certificates',
          'Bank correspondence drafting and tracking',
        ],
      },
      {
        name: 'Compliance and KYC',
        description: 'Counterparty onboarding and screening with evidence assembled for the reviewer.',
        useCases: [
          'Counterparty KYC file assembly and periodic refresh',
          'Sanctions and vessel screening with explained hits',
          'Adverse media summaries in source language and English',
        ],
      },
      {
        name: 'Market and desk intelligence',
        description: 'Research and reporting drafted for the desk.',
        useCases: [
          'Daily position and P&L commentary drafts',
          'Freight and market report summarisation',
          'Contract clause search across historical deals',
        ],
      },
    ],
    compliance: [
      'Sanctions screening outputs support the decision. The decision and its rationale stay with a named reviewer.',
      'Counterparty and trade data processed in Switzerland or in the client’s own tenant.',
      'Audit trail of document versions, agent actions and approvals, kept according to the firm’s policy.',
      'Designed to support the controls banks expect under trade finance and AML obligations.',
    ],
    relatedCase: 'trade-confirmation-agents',
    relatedServices: ['agentic-systems', 'ai-operations', 'data-ai-platforms'],
  },
  {
    slug: 'banking-wealth',
    icon: 'banking',
    image: 'ind-banking',
    tier: 'core',
    name: 'Private Banking & Wealth',
    short: 'KYC, client reporting and advisory preparation. FINMA-level controls, and client data stays in Switzerland.',
    hero: {
      eyebrow: '[ Industry · Private banking & wealth ]',
      title: { pre: 'More time with clients, less with ', accent: 'files.' },
      lead: 'Relationship managers spend a large share of their week on documentation. KYC refreshes, suitability records, meeting notes and client reports. We build systems that prepare this work for review. They follow the controls a Swiss bank already has.',
    },
    stat: {
      value: '37,000+',
      label: 'Financial-sector jobs in Geneva.',
      source: 'ge.ch, key sectors',
    },
    context: {
      title: 'Discretion comes first',
      paragraphs: [
        'Private banking in Geneva runs on trust and on documentation. Every client relationship carries a KYC file, source-of-wealth evidence, suitability and appropriateness records, and a trail of correspondence in several languages. Regulators expect it complete. Clients prefer not to see it.',
        'Costs are under pressure and hiring is no longer the easy answer. We remove hours of compiling and rekeying between the banker and the client. The file gets better at the same time. This works only with data residency, access control and audit built in from the start.',
      ],
    },
    valueStreams: [
      {
        name: 'Client lifecycle and KYC',
        description: 'Onboarding and periodic reviews prepared by agents, decided by people.',
        useCases: [
          'Periodic KYC refresh files assembled from core banking and documents',
          'Source-of-wealth narrative drafting with cited evidence',
          'Missing-document detection and client request drafting',
        ],
      },
      {
        name: 'Advisory preparation',
        description: 'The banker arrives at the meeting with the reading done.',
        useCases: [
          'Pre-meeting client briefs from portfolio, notes and news',
          'Meeting note capture and suitability record drafting',
          'Investment proposal drafts aligned with the house view',
        ],
      },
      {
        name: 'Reporting and communication',
        description: 'Client-ready reporting in the client’s language.',
        useCases: [
          'Portfolio commentary drafts in FR, DE, EN and IT',
          'Client correspondence drafting with tone and compliance checks',
          'Internal management reporting compiled automatically',
        ],
      },
      {
        name: 'Operations and compliance',
        description: 'Back-office queues cleared faster, with better evidence.',
        useCases: [
          'Transaction monitoring alert triage with explained context',
          'Corporate action and instruction processing from email',
          'Policy and regulation Q&A for staff with cited sources',
        ],
      },
    ],
    compliance: [
      'Client-identifying data processed in Switzerland, on bank-controlled infrastructure or a Swiss-hosted environment.',
      'Designed around FINMA expectations on third-party providers, operational resilience and data confidentiality.',
      'Banking secrecy preserved. No client data is used for model training. Nothing is stored beyond what the process requires.',
      'Human approval on every client-facing output and every KYC decision, with the evidence logged.',
    ],
    relatedCase: 'private-bank-kyc-refresh',
    relatedServices: ['agentic-systems', 'ai-strategy', 'ai-operations'],
  },
  {
    slug: 'international-organisations',
    icon: 'intl-orgs',
    image: 'ind-intl',
    tier: 'core',
    name: 'International Organisations & NGOs',
    short: 'Multilingual documents, reporting and knowledge work, with governance suited to public mandates and donors.',
    hero: {
      eyebrow: '[ Industry · International organisations & NGOs ]',
      title: { pre: 'Mandates in many languages, ', accent: 'one', post: ' record.' },
      lead: 'International Geneva produces and reads a lot of text. Resolutions, reports, submissions, minutes and translations. We build systems that draft, summarise, translate and search. They respect the neutrality, privacy and governance of public mandates.',
    },
    context: {
      title: 'Knowledge work at institutional scale',
      paragraphs: [
        'Organisations in Geneva work across official languages, member states and partner networks. Much of their time goes into producing documents and finding past decisions. Which paragraph was agreed, which country reported what, which evaluation found what.',
        'AI can give that time back to the mandate. It needs care. Data may include personal information about beneficiaries or staff. Privileges and immunities shape where data can go. Outputs must be neutral and traceable. We set up governance first, without slowing the work down.',
      ],
    },
    valueStreams: [
      {
        name: 'Document production',
        description: 'Drafts, summaries and translations prepared for expert review.',
        useCases: [
          'Report and briefing note first drafts from source material',
          'Meeting summaries and action records in all working languages',
          'Terminology-consistent translation drafts for review',
        ],
      },
      {
        name: 'Institutional knowledge',
        description: 'Decades of documents you can search and ask questions of.',
        useCases: [
          'Search and Q&A across resolutions, reports and archives with citations',
          'Precedent finding for negotiators and secretariat staff',
          'Evaluation and lessons-learned synthesis',
        ],
      },
      {
        name: 'Programme and grant operations',
        description: 'Donor reporting prepared in good time.',
        useCases: [
          'Donor report compilation from programme data and field updates',
          'Proposal drafting against donor templates and criteria',
          'Partner due diligence file assembly',
        ],
      },
    ],
    compliance: [
      'Deployment options that respect privileges and immunities, including on-premises and organisation-controlled tenants.',
      'Personal data of beneficiaries and staff minimised, classified and kept out of external models where required.',
      'Outputs traceable to source documents. A person reviews before anything is published or sent.',
      'Alignment with the organisation’s own data protection framework as well as nFADP and GDPR where they apply.',
    ],
    relatedCase: 'multilingual-document-pipeline',
    relatedServices: ['data-ai-platforms', 'adoption-enablement', 'ai-strategy'],
  },
  {
    slug: 'life-sciences',
    icon: 'life-sciences',
    image: 'ind-life',
    tier: 'adjacent',
    name: 'Life Sciences & MedTech',
    short: 'Regulatory writing, quality documentation and scientific knowledge. Built for GxP and validated where needed.',
    hero: {
      eyebrow: '[ Industry · Life sciences & MedTech ]',
      title: { pre: 'Faster to the dossier, ', accent: 'safer', post: ' in the file.' },
      lead: 'Regulated product companies write a lot of controlled documentation. We build drafting, review and knowledge systems that respect GxP. People stay accountable, and an inspector can follow the audit trail.',
    },
    stat: {
      value: '313',
      label: 'MedTech, biotech and pharma stakeholders in Geneva.',
      source: 'ge.ch, key sectors',
    },
    context: {
      title: 'Documentation is on the critical path',
      paragraphs: [
        'In life sciences and MedTech, writing often sets the time from data to submission. Clinical and technical documentation, deviations, CAPAs, change controls and regulatory responses. Each must be consistent with hundreds of other controlled documents.',
        'AI can draft, cross-check and retrieve quickly. In a GxP environment this helps only under three conditions. The system is validated for its intended use, changes are controlled, and a qualified person reviews each output. We design to that standard from the start.',
      ],
    },
    valueStreams: [
      {
        name: 'Regulatory affairs',
        description: 'Submissions and responses drafted from controlled sources.',
        useCases: [
          'Section drafting for technical files and dossiers from source reports',
          'Health authority question triage and response drafting',
          'Consistency checks across submission documents',
        ],
      },
      {
        name: 'Quality and compliance',
        description: 'Deviations and CAPAs investigated and documented faster.',
        useCases: [
          'Deviation report drafting and similar-event search',
          'Root-cause analysis support across batch and equipment records',
          'SOP impact analysis for change controls',
        ],
      },
      {
        name: 'Scientific knowledge',
        description: 'Internal and published evidence, easy to find and cited.',
        useCases: [
          'Literature monitoring and structured summaries',
          'Q&A across study reports and internal research',
          'Medical information response drafting',
        ],
      },
    ],
    compliance: [
      'Computerised system validation approach aligned with GAMP 5 principles for GxP-relevant uses.',
      'Change control for models, prompts and retrieval sources. An eval regression triggers revalidation.',
      'Qualified-person review and e-signature on each controlled output.',
      'Health data and genetic data treated as sensitive personal data under nFADP.',
    ],
    relatedCase: 'regulatory-submission-drafting',
    relatedServices: ['ai-operations', 'data-ai-platforms', 'agentic-systems'],
  },
  {
    slug: 'fragrance-flavour-chemicals',
    icon: 'fragrance',
    image: 'ind-fragrance',
    tier: 'adjacent',
    name: 'Fragrance, Flavour & Specialty Chemicals',
    short: 'Formulation knowledge, regulatory screening and customer briefs, connected so creators have more time to create.',
    hero: {
      eyebrow: '[ Industry · Fragrance, flavour & specialty chemicals ]',
      title: { pre: 'Decades of formulas, ', accent: 'easy', post: ' to find.' },
      lead: 'Creative and technical teams carry knowledge that lives in formulas, lab notebooks and people’s memories. We make it searchable and connect it to regulatory and customer requirements, so teams find a good starting point in minutes.',
    },
    stat: {
      value: '400+',
      label: 'Aroma and fragrance companies in the Geneva region, around 10,000 jobs.',
      source: 'ge.ch, key sectors',
    },
    context: {
      title: 'Creativity under constraint',
      paragraphs: [
        'Each brief comes with constraints. A cost target, a regulatory profile for several markets, allergen and labelling rules, sustainability claims and stability requirements. Meeting them means searching years of previous work. Each ingredient is checked against lists that change.',
        'The knowledge exists, but it is scattered across formulation systems, regulatory databases, sensory panels and email. Connecting it is a data problem first and an AI problem second. We work in that order.',
      ],
    },
    valueStreams: [
      {
        name: 'Brief to formula',
        description: 'Customer briefs translated into constraints and starting points.',
        useCases: [
          'Brief parsing into structured technical and regulatory requirements',
          'Similar-formula search across historical projects',
          'Cost and constraint pre-check on candidate formulas',
        ],
      },
      {
        name: 'Regulatory and product safety',
        description: 'Compliance screening built into the creative process.',
        useCases: [
          'Ingredient screening against market-specific restriction lists',
          'Safety data sheet and certificate drafting',
          'Regulatory change monitoring with impact on the active portfolio',
        ],
      },
      {
        name: 'Commercial and customer service',
        description: 'Quicker and more accurate answers to customers.',
        useCases: [
          'Customer questionnaire and documentation request answering',
          'Sample request and order processing from email',
          'Account briefs for sales teams',
        ],
      },
    ],
    compliance: [
      'Formulas are treated as core IP. They are processed in client-controlled environments and not used for model training.',
      'Regulatory outputs reviewed by qualified staff before release to customers.',
      'Fine-grained access control so formula visibility follows existing entitlements.',
      'Each screening result traced to the list version and date used.',
    ],
    relatedCase: 'formulation-knowledge-graph',
    relatedServices: ['data-ai-platforms', 'agentic-systems', 'adoption-enablement'],
  },
  {
    slug: 'industry-manufacturing',
    icon: 'manufacturing',
    image: 'ind-manufacturing',
    tier: 'adjacent',
    name: 'Industry & Manufacturing',
    short: 'Maintenance, quality and supply chain knowledge put in the hands of the people on the shop floor.',
    hero: {
      eyebrow: '[ Industry · Industry & manufacturing ]',
      title: { pre: 'The expert’s knowledge, at ', accent: 'the', post: ' machine.' },
      lead: 'Precision manufacturers depend on experienced technicians whose knowledge is hard to transfer. We build assistants and agents that bring manuals, maintenance history and quality records to the person at the machine, in their language.',
    },
    context: {
      title: 'Know-how is the bottleneck',
      paragraphs: [
        'Swiss manufacturing competes on precision and reliability. Both depend on people who know why a machine behaves the way it does, and many of them are approaching retirement. Their knowledge sits in their heads, in maintenance logs written in shorthand and in long manuals.',
        'AI can bring that knowledge to the point of work. It diagnoses a fault from similar past ones. It drafts a quality report from sensor data. It answers a supplier question from the contract. The value shows in downtime and scrap, so pricing on outcomes is simple.',
      ],
    },
    valueStreams: [
      {
        name: 'Maintenance and reliability',
        description: 'Faster diagnosis and fewer repeat failures.',
        useCases: [
          'Technician assistant over manuals, logs and past interventions',
          'Work order drafting and parts identification',
          'Failure pattern analysis across sites',
        ],
      },
      {
        name: 'Quality',
        description: 'Non-conformities documented and closed faster.',
        useCases: [
          'Non-conformity report drafting from inspection data',
          '8D and root-cause analysis support',
          'Customer complaint triage and response drafting',
        ],
      },
      {
        name: 'Supply chain and procurement',
        description: 'Supplier communication and documents handled by agents.',
        useCases: [
          'Order confirmation and delivery date tracking from email',
          'Supplier contract and specification Q&A',
          'Supplier risk monitoring summaries',
        ],
      },
    ],
    compliance: [
      'Deployment on site or in the client’s tenant where production data cannot leave the plant network.',
      'Export control and dual-use considerations reflected in data classification and access.',
      'Safety-relevant guidance is marked as advisory, with procedures referenced and human sign-off.',
      'Integration with existing quality management systems and their approval workflows.',
    ],
    relatedCase: 'maintenance-copilot',
    relatedServices: ['agentic-systems', 'adoption-enablement', 'ai-operations'],
  },
];
