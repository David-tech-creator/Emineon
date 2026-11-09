import type { Industry } from '../../schema';

export const industries: Industry[] = [
  {
    slug: 'commodities-trading',
    icon: 'trading',
    image: 'ind-trading',
    tier: 'core',
    name: 'Commodities Trading & Shipping',
    short: 'Confirmations, KYC, trade finance documents and operations, run by agents with traders and operators in control.',
    hero: {
      eyebrow: '[ Industry — Commodities trading & shipping ]',
      title: { pre: 'Less paper between the trade and the ', accent: 'cargo.' },
      lead: 'Trading houses run on documents: confirmations, letters of credit, bills of lading, inspection certificates, sanctions checks. We put agents on that flow so operations keep pace with the desk, and compliance has a full record of every step.',
    },
    stat: {
      value: '#1',
      label: 'Geneva ranks first worldwide for trade finance; 12 of Switzerland’s 14 trade-finance banks are here.',
      source: 'ge.ch, key sectors',
    },
    context: {
      title: 'A document business disguised as a trading business',
      paragraphs: [
        'Geneva is home to some 400 trading companies and around 6,000 direct jobs. Behind every cargo is a chain of documents that must be matched, checked and filed, often in several languages and under time pressure, with counterparties, banks, inspectors and shipping agents all working to different templates.',
        'Compliance spend is rising: sanctions regimes change faster, banks ask for more evidence, and trade finance is less forgiving of discrepancies. Operations teams have grown to absorb it. AI agents offer a different answer: read, match and pre-check everything, and send people only what needs judgement.',
      ],
    },
    valueStreams: [
      {
        name: 'Trade operations',
        description: 'From deal capture to settlement, with documents matched automatically and discrepancies surfaced early.',
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
        description: 'Research and reporting that compile themselves.',
        useCases: [
          'Daily position and P&L commentary drafts',
          'Freight and market report summarisation',
          'Contract clause search across historical deals',
        ],
      },
    ],
    compliance: [
      'Sanctions screening outputs are decision support; the decision and its rationale stay with a named reviewer.',
      'Counterparty and trade data processed in Switzerland or in the client’s own tenant.',
      'Full audit trail of document versions, agent actions and approvals, retained to the firm’s policy.',
      'Designed to support, not replace, the controls banks expect under trade finance and AML obligations.',
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
    short: 'KYC, client reporting and advisory preparation, with FINMA-grade controls and client data that never leaves Switzerland.',
    hero: {
      eyebrow: '[ Industry — Private banking & wealth ]',
      title: { pre: 'More time with clients, less with ', accent: 'files.' },
      lead: 'Relationship managers spend a large share of their week on documentation: KYC refreshes, suitability records, meeting notes, client reports. We build systems that prepare that work for review, under the controls a Swiss bank already lives by.',
    },
    stat: {
      value: '37,000+',
      label: 'Financial-sector jobs in Geneva.',
      source: 'ge.ch, key sectors',
    },
    context: {
      title: 'Discretion is the product',
      paragraphs: [
        'Private banking in Geneva runs on trust and on documentation. Every client relationship carries a KYC file, source-of-wealth evidence, suitability and appropriateness records, and a trail of correspondence in several languages. Regulators expect it complete; clients expect it invisible.',
        'Cost pressure is real and headcount is not the lever it used to be. The opportunity is to remove the hours of compiling and rekeying that sit between the banker and the client, while making the file better, not thinner. That only works if data residency, access control and auditability are designed in from the first line.',
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
        description: 'The banker walks into the meeting with everything already read.',
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
      'Banking secrecy preserved: no client data used for model training, no persistent storage beyond what the process requires.',
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
    short: 'Multilingual documents, reporting and knowledge work, with governance fit for public mandates and donor scrutiny.',
    hero: {
      eyebrow: '[ Industry — International organisations & NGOs ]',
      title: { pre: 'Mandates in many languages, ', accent: 'one', post: ' record.' },
      lead: 'International Geneva produces and consumes vast amounts of text: resolutions, reports, submissions, minutes, translations. We build systems that draft, summarise, translate and find, with the neutrality, privacy and governance that public mandates require.',
    },
    context: {
      title: 'Knowledge work at institutional scale',
      paragraphs: [
        'Organisations in Geneva work across official languages, member states and partner networks. Much of their capacity goes into producing documents and finding what has already been decided: which paragraph was agreed, which country reported what, which evaluation found what.',
        'AI can return that capacity to the mandate. It has to be done carefully: data may include personal information about beneficiaries or staff, privileges and immunities shape where data can go, and outputs must be neutral and traceable. Governance comes first, and it can be done without slowing everything down.',
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
        description: 'Decades of documents made searchable and answerable.',
        useCases: [
          'Search and Q&A across resolutions, reports and archives with citations',
          'Precedent finding for negotiators and secretariat staff',
          'Evaluation and lessons-learned synthesis',
        ],
      },
      {
        name: 'Programme and grant operations',
        description: 'Reporting to donors without the last-minute scramble.',
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
      'Outputs traceable to source documents; human review before anything is published or transmitted.',
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
    short: 'Regulatory writing, quality documentation and scientific knowledge, built for GxP and validated where it matters.',
    hero: {
      eyebrow: '[ Industry — Life sciences & MedTech ]',
      title: { pre: 'Faster to the dossier, ', accent: 'safer', post: ' in the file.' },
      lead: 'Regulated product companies write enormous volumes of controlled documentation. We build drafting, review and knowledge systems that respect GxP, keep humans accountable and leave an audit trail an inspector can follow.',
    },
    stat: {
      value: '313',
      label: 'MedTech, biotech and pharma stakeholders in Geneva.',
      source: 'ge.ch, key sectors',
    },
    context: {
      title: 'Documentation is on the critical path',
      paragraphs: [
        'In life sciences and MedTech, the time from data to submission is often limited by writing, not by science: clinical and technical documentation, deviations, CAPAs, change controls and regulatory responses. Each must be consistent with hundreds of other controlled documents.',
        'AI can draft, cross-check and retrieve at a speed no team can match. In a GxP environment that is only useful if the system is validated for its intended use, changes are controlled and every output is reviewed by a qualified person. We design to that standard from the start.',
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
        description: 'Deviations and CAPAs investigated faster, documented better.',
        useCases: [
          'Deviation report drafting and similar-event search',
          'Root-cause analysis support across batch and equipment records',
          'SOP impact analysis for change controls',
        ],
      },
      {
        name: 'Scientific knowledge',
        description: 'Internal and published evidence, findable and cited.',
        useCases: [
          'Literature monitoring and structured summaries',
          'Q&A across study reports and internal research',
          'Medical information response drafting',
        ],
      },
    ],
    compliance: [
      'Computerised system validation approach aligned with GAMP 5 principles for GxP-relevant uses.',
      'Change control for models, prompts and retrieval sources; revalidation triggered by eval regression.',
      'Qualified-person review and e-signature on every controlled output.',
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
    short: 'Formulation knowledge, regulatory screening and customer briefs, connected so creators spend time creating.',
    hero: {
      eyebrow: '[ Industry — Fragrance, flavour & specialty chemicals ]',
      title: { pre: 'Decades of formulas, ', accent: 'instantly', post: ' recalled.' },
      lead: 'Creative and technical teams carry knowledge that lives in formulas, lab notebooks and people’s memories. We make it searchable and connect it to regulatory and customer requirements, so the right starting point is found in minutes.',
    },
    stat: {
      value: '400+',
      label: 'Aroma and fragrance companies in the Geneva region, around 10,000 jobs.',
      source: 'ge.ch, key sectors',
    },
    context: {
      title: 'Creativity under constraint',
      paragraphs: [
        'Every brief comes with constraints: a cost target, a regulatory profile for several markets, allergen and labelling rules, sustainability claims, stability requirements. Meeting them means searching through years of previous work and checking each ingredient against lists that change.',
        'The knowledge exists, but it is scattered across formulation systems, regulatory databases, sensory panels and email. Connecting it is a data problem first and an AI problem second, which is exactly the order we work in.',
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
        description: 'Faster, more accurate answers to customers.',
        useCases: [
          'Customer questionnaire and documentation request answering',
          'Sample request and order processing from email',
          'Account briefs for sales teams',
        ],
      },
    ],
    compliance: [
      'Formulas treated as crown-jewel IP: processed in client-controlled environments, never used for model training.',
      'Regulatory outputs reviewed by qualified staff before release to customers.',
      'Fine-grained access control so formula visibility follows existing entitlements.',
      'Traceability of every screening result to the list version and date used.',
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
      eyebrow: '[ Industry — Industry & manufacturing ]',
      title: { pre: 'The expert’s knowledge, at ', accent: 'every', post: ' machine.' },
      lead: 'Precision manufacturers depend on experienced technicians whose knowledge is hard to transfer. We build assistants and agents that bring manuals, maintenance history and quality records to the person at the machine, in their language.',
    },
    context: {
      title: 'Know-how is the bottleneck',
      paragraphs: [
        'Swiss manufacturing competes on precision and reliability. Both depend on people who know why a machine behaves the way it does, and many of them are approaching retirement. Their knowledge sits in their heads, in maintenance logs written in shorthand and in manuals no one reads.',
        'AI can capture and serve that knowledge at the point of work: diagnosing a fault from the history of similar ones, drafting a quality report from sensor data, answering a supplier question from the contract. The value is measured in downtime and scrap, which makes it easy to price on outcomes.',
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
      'Safety-relevant guidance always marked as advisory, with procedures referenced and human sign-off.',
      'Integration with existing quality management systems and their approval workflows.',
    ],
    relatedCase: 'maintenance-copilot',
    relatedServices: ['agentic-systems', 'adoption-enablement', 'ai-operations'],
  },
];
