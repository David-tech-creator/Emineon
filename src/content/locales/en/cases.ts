import type { CaseStudy } from '../../schema';

export const cases: CaseStudy[] = [
  {
    slug: 'trade-confirmation-agents',
    sector: 'commodities-trading',
    sectorLabel: 'Commodities trading',
    title: 'Trade confirmations matched by agents, exceptions routed to people',
    client: 'A Geneva commodities trader',
    summary:
      'An agentic workflow that reads counterparty confirmations, matches them against booked trades and drafts responses to discrepancies. Operations now handle exceptions instead of rekeying.',
    challenge: [
      'The operations team received several hundred confirmations a week by email, as PDFs, scans and free text, in English, French and occasionally Spanish. Each had to be compared field by field with the trade booked in the ETRM: quantity, tolerance, price formula, delivery window, incoterm, payment terms.',
      'Matching was manual, done under time pressure and concentrated in a few experienced people. Discrepancies were sometimes found late, after documents had gone to the bank. Hiring more operators was the default plan.',
    ],
    approach: [
      'A two-person forward-deployed pod sat with the operations team for the first week, collecting 240 historical confirmations with their outcomes. From these we wrote the eval set before building anything: for each document, the correct extracted fields and the correct match decision.',
      'We shipped to two operators in week three and to the whole team in week five. Agents handle extraction and matching; anything uncertain or mismatched goes to a review queue with the evidence highlighted. Operators approve or correct in one click, and every correction is added to the eval set.',
    ],
    system: {
      text: 'Agents watch the confirmations inbox, extract terms, query the ETRM through a read-only connector and classify each confirmation as matched, mismatched or uncertain. For mismatches, a reply to the counterparty is drafted for an operator to send.',
      components: [
        'Inbox watcher and document parser for PDFs, scans and email bodies',
        'Extraction agent with field-level confidence scores',
        'Read-only ETRM connector and matching rules agreed with operations',
        'Review queue with highlighted evidence and one-click approve or correct',
        'Eval suite of 240+ real cases run on every release',
        'Audit log of every extraction, decision and approval',
      ],
    },
    results: [
      { value: '−62%', label: 'Handling time per confirmation' },
      { value: '81%', label: 'Confirmations matched without manual rekeying' },
      { value: '3 days → same day', label: 'Median time to flag a discrepancy' },
      { value: '0', label: 'Additional hires planned for the next volume increase' },
    ],
    stack: ['Frontier LLM (Swiss region)', 'Python', 'PostgreSQL', 'ETRM read-only API', 'Document OCR', 'Eval harness'],
    duration: '6 weeks to production',
    image: 'case-1',
    services: ['agentic-systems', 'ai-operations'],
  },
  {
    slug: 'private-bank-kyc-refresh',
    sector: 'banking-wealth',
    sectorLabel: 'Private banking',
    title: 'Periodic KYC reviews prepared in minutes, decided by people',
    client: 'A Swiss private bank (client withheld under NDA)',
    summary:
      'A system that assembles periodic KYC review files from core banking data and client documents, drafts the narrative with cited evidence and flags what is missing. Relationship managers review and sign.',
    challenge: [
      'Periodic KYC reviews for high-risk relationships took relationship managers and compliance officers several hours each. Information was scattered across the core banking system, a document management system and years of correspondence, much of it in French and German.',
      'A backlog had formed. Reviews were being completed close to their deadlines, quality varied from one banker to the next, and the bank wanted to improve file quality while reducing the time spent, under FINMA scrutiny and without any client data leaving Switzerland.',
    ],
    approach: [
      'We started with a two-week assessment with compliance, front office and IT to agree the target file structure, the evidence standard for each section and the data residency architecture. The bank’s risk function reviewed the design before any build began.',
      'The system was built on bank-controlled infrastructure in Switzerland. We used a model deployment that keeps data in-country, with no retention and no training. Every sentence in the drafted narrative cites the document or record it comes from, and the reviewer sees the source side by side.',
    ],
    system: {
      text: 'For each review due, agents gather client data and documents, check them against the bank’s KYC checklist, draft the source-of-wealth and activity narrative with citations, and list missing or expired evidence with a draft request to the client.',
      components: [
        'Connectors to core banking and document management, with inherited entitlements',
        'Checklist engine encoding the bank’s KYC policy',
        'Narrative drafting with sentence-level citations',
        'Missing-evidence detection and client request drafts in FR, DE and EN',
        'Reviewer workspace with side-by-side sources and sign-off',
        'Hosting on bank-controlled Swiss infrastructure, no data retention by model providers',
      ],
    },
    results: [
      { value: '−55%', label: 'Time per periodic review' },
      { value: '4.1 → 4.6', label: 'Average file quality score in compliance sampling (out of 5)' },
      { value: '100%', label: 'Narrative statements linked to source evidence' },
      { value: '0', label: 'Client data processed outside Switzerland' },
    ],
    stack: ['Swiss-hosted LLM deployment', 'Bank on-premises Kubernetes', 'Hybrid search', 'Core banking API', 'Document management connector'],
    duration: '2-week assessment, 10 weeks to production',
    image: 'case-2',
    services: ['ai-strategy', 'agentic-systems', 'ai-operations'],
  },
  {
    slug: 'multilingual-document-pipeline',
    sector: 'international-organisations',
    sectorLabel: 'International organisation',
    title: 'A searchable institutional memory in six languages',
    client: 'A Geneva-based international organisation',
    summary:
      'A retrieval platform over decades of reports, resolutions and meeting records that answers questions with citations in the language asked, and drafts briefing notes for staff to review.',
    challenge: [
      'Staff spent significant time locating precedent: what had been agreed, reported or recommended on a topic in previous years. The archive held hundreds of thousands of documents in several official languages, many as scanned PDFs, spread across systems built at different times.',
      'Previous search tools matched keywords in one language and returned long lists. The organisation needed answers that were accurate, traceable to the source paragraph and neutral, without sending documents containing personal data to external services.',
    ],
    approach: [
      'We designed the platform with the organisation’s IT and legal teams to fit its data protection framework and privileges. Personal data was classified and filtered at ingestion. The model runs in an environment controlled by the organisation.',
      'Quality was evaluated per language with a test set written by subject-matter staff: 300 questions with known answers and sources. We then trained a first group of 60 staff, built briefing-note templates with them and extended access department by department.',
    ],
    system: {
      text: 'Documents are parsed, including scans and tables, chunked with their structure preserved and indexed for hybrid search across languages. Answers cite the exact paragraphs used; briefing notes are drafted from approved templates.',
      components: [
        'Ingestion pipeline with OCR, layout parsing and personal-data filtering',
        'Cross-lingual hybrid search over the full archive',
        'Answer generation with paragraph-level citations',
        'Briefing note drafting from approved templates',
        'Per-language eval suite written by subject-matter staff',
        'Usage and quality dashboard for the knowledge management team',
      ],
    },
    results: [
      { value: '−70%', label: 'Time to locate relevant precedent' },
      { value: '6', label: 'Languages answered with source citations' },
      { value: '92%', label: 'Answers rated correct and well-sourced in staff evaluation' },
      { value: '600+', label: 'Weekly active users after three months' },
    ],
    stack: ['Open-weight and frontier LLMs', 'Organisation-controlled cloud', 'OCR and layout parsing', 'Vector and keyword index', 'Eval harness'],
    duration: '14 weeks, including rollout',
    image: 'case-3',
    services: ['data-ai-platforms', 'adoption-enablement'],
  },
  {
    slug: 'regulatory-submission-drafting',
    sector: 'life-sciences',
    sectorLabel: 'MedTech',
    title: 'Technical documentation drafted from controlled sources',
    client: 'A Swiss MedTech manufacturer',
    summary:
      'A validated drafting assistant that produces first drafts of technical documentation sections from approved source reports, with consistency checks across the file and full change control.',
    challenge: [
      'Each product variant required updates to technical documentation drawn from verification reports, risk files and clinical evaluations. Regulatory writers spent most of their time copying, reconciling and cross-checking rather than writing.',
      'Any AI involvement had to fit the quality management system: validated for intended use, under change control, with a qualified person accountable for every output.',
    ],
    approach: [
      'We wrote the intended-use statement and risk assessment with the quality team first, then defined acceptance criteria as an eval suite built from previously approved sections.',
      'The assistant drafts only from documents in an approved source set and marks every claim with its reference. Consistency checks run across the whole file. Models, prompts and sources are versioned; any change triggers the eval suite, and a regression blocks release.',
    ],
    system: {
      text: 'Writers select a section and the source documents; the assistant produces a cited draft and a consistency report against the rest of the file. The writer edits and approves in the existing document control system.',
      components: [
        'Approved source registry linked to document control',
        'Section drafting with claim-level references',
        'Cross-document consistency checker',
        'Eval suite built from approved historical sections',
        'Change control for models, prompts and sources',
        'Validation package aligned with GAMP 5 principles',
      ],
    },
    results: [
      { value: '−45%', label: 'Writer time per documentation update' },
      { value: '3×', label: 'More inconsistencies caught before review' },
      { value: '0', label: 'Unreferenced claims in drafts' },
    ],
    stack: ['Frontier LLM (EU/CH region)', 'Document control integration', 'Python', 'Eval harness', 'Validation documentation'],
    duration: '12 weeks, including validation',
    image: 'case-4',
    services: ['ai-operations', 'agentic-systems'],
  },
  {
    slug: 'formulation-knowledge-graph',
    sector: 'fragrance-flavour-chemicals',
    sectorLabel: 'Fragrance & flavour',
    title: 'From customer brief to starting formula in minutes',
    client: 'A fragrance and flavour house (client withheld under NDA)',
    summary:
      'A knowledge layer that connects historical formulas, regulatory lists and customer briefs, so creators and application teams find relevant starting points and constraints in minutes instead of days.',
    challenge: [
      'Creators and technical teams relied on memory and colleagues to find relevant past work. Formulation data, regulatory status and customer feedback lived in separate systems with inconsistent naming.',
      'Each brief triggered days of searching and manual regulatory screening before creative work could begin, and knowledge left with people who changed roles.',
    ],
    approach: [
      'We started with the data: mapping ingredient identifiers across systems, building a knowledge graph of formulas, ingredients, regulatory status and project outcomes, and keeping formula visibility aligned with existing access rights.',
      'On top of it, an assistant parses incoming briefs into structured constraints, finds similar past projects and pre-screens candidates against the relevant market restrictions. Champions in each team shaped the interface and trained their colleagues.',
    ],
    system: {
      text: 'A knowledge graph connects formulas, ingredients, regulatory lists and project history. A brief assistant extracts constraints, retrieves similar formulas and runs a regulatory pre-check, all within the client’s own environment.',
      components: [
        'Ingredient identity resolution across formulation and regulatory systems',
        'Knowledge graph of formulas, ingredients, restrictions and outcomes',
        'Brief parsing into structured requirements',
        'Similar-formula retrieval with entitlement filtering',
        'Market restriction pre-screening with list version tracking',
        'Champions programme and team-specific training',
      ],
    },
    results: [
      { value: 'Days → minutes', label: 'Time to relevant starting formulas' },
      { value: '−50%', label: 'Manual regulatory pre-screening effort' },
      { value: '85%', label: 'Of creators using the assistant weekly' },
    ],
    stack: ['Graph database', 'Client-controlled cloud', 'LLM (no retention)', 'Formulation system connector', 'Regulatory list ingestion'],
    duration: '16 weeks',
    image: 'case-5',
    services: ['data-ai-platforms', 'adoption-enablement'],
  },
  {
    slug: 'maintenance-copilot',
    sector: 'industry-manufacturing',
    sectorLabel: 'Precision manufacturing',
    title: 'A maintenance assistant that remembers every repair',
    client: 'A Swiss precision manufacturer',
    summary:
      'An assistant for technicians that combines machine manuals, maintenance logs and past interventions to suggest likely causes and procedures, and drafts the work order afterwards.',
    challenge: [
      'Unplanned downtime on critical machining centres was costly, and diagnosis depended on a few senior technicians. Maintenance logs were written in shorthand, in French and German, and manuals ran to thousands of pages.',
      'Newer technicians took longer to diagnose faults and repeat failures were common. Plant data could not leave the site network.',
    ],
    approach: [
      'Forward-deployed engineers spent time on the shop floor with technicians to understand how faults are actually diagnosed. We normalised ten years of maintenance logs and linked them to machines, components and manual sections.',
      'The assistant runs on site. Technicians describe a symptom in their own words on a tablet; the assistant returns likely causes ranked by past occurrence, the relevant procedure and parts, and drafts the work order when the job is done.',
    ],
    system: {
      text: 'An on-premises assistant over manuals, maintenance history and parts data, accessible from the shop floor, with safety-relevant procedures always referenced to the official manual.',
      components: [
        'On-premises model deployment on the plant network',
        'Normalised maintenance history linked to machines and components',
        'Manual and procedure retrieval with page references',
        'Symptom-to-cause ranking from past interventions',
        'Work order drafting into the maintenance system',
        'Technician training and feedback loop',
      ],
    },
    results: [
      { value: '−35%', label: 'Mean time to diagnose on targeted machines' },
      { value: '−20%', label: 'Repeat failures within 30 days' },
      { value: '100%', label: 'Data kept on the plant network' },
    ],
    stack: ['Open-weight LLM on premises', 'Maintenance system integration', 'Hybrid search', 'Tablet web app'],
    duration: '10 weeks',
    image: 'case-6',
    services: ['agentic-systems', 'adoption-enablement'],
  },
];
