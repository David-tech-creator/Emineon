import type { Industry } from '../../schema';

export const industries: Industry[] = [
  {
    slug: 'commodities-trading',
    icon: 'trading',
    image: 'ind-trading',
    tier: 'core',
    name: 'Négoce de matières premières & shipping',
    short: 'Confirmations, KYC, documents de financement et opérations. Des agents préparent, les traders et les opérateurs valident.',
    hero: {
      eyebrow: '[ Secteur · Négoce de matières premières & shipping ]',
      title: { pre: 'Moins de papier entre la transaction et la ', accent: 'cargaison.' },
      lead: 'Le négoce produit beaucoup de documents. Confirmations, lettres de crédit, connaissements, certificats d’inspection, contrôles de sanctions. Des agents prennent en charge ce flux. Les opérations suivent le rythme du desk et la conformité garde une trace de chaque étape.',
    },
    stat: {
      value: '#1',
      label: 'Genève est la première place mondiale du financement du négoce. 12 des 14 banques suisses actives dans ce domaine y sont établies.',
      source: 'ge.ch, secteurs clés',
    },
    context: {
      title: 'Un métier de négoce, et beaucoup de documents',
      paragraphs: [
        'Genève compte quelque 400 sociétés de négoce et environ 6000 emplois directs. Chaque cargaison s’accompagne d’une chaîne de documents à rapprocher, contrôler et classer. Ils arrivent souvent en plusieurs langues et dans des délais courts. Contreparties, banques, inspecteurs et agents maritimes ont chacun leurs propres modèles.',
        'Les coûts de conformité augmentent. Les régimes de sanctions évoluent plus vite et les banques demandent davantage de justificatifs. Les équipes d’opérations ont grossi pour absorber cette charge. Les agents IA permettent une autre approche. Ils lisent, rapprochent et pré-contrôlent les documents. Les personnes gardent ce qui demande du jugement.',
      ],
    },
    valueStreams: [
      {
        name: 'Opérations de négoce',
        description: 'De la saisie de la transaction au règlement. Les documents sont rapprochés automatiquement et les écarts détectés tôt.',
        useCases: [
          'Rapprochement des confirmations avec les transactions enregistrées dans l’ETRM',
          'Extraction des term sheets, récapitulatifs et avenants',
          'Rapprochement des factures et des prix provisoires et définitifs',
          'Préparation des réclamations de surestaries et de staries',
        ],
      },
      {
        name: 'Documentation du financement du négoce',
        description: 'Lettres de crédit et documents d’expédition contrôlés avant leur envoi à la banque.',
        useCases: [
          'Extraction des conditions de la lettre de crédit et génération de la liste de contrôle documentaire',
          'Contrôle des écarts avant présentation sur les connaissements et certificats',
          'Rédaction et suivi de la correspondance bancaire',
        ],
      },
      {
        name: 'Conformité et KYC',
        description: 'Entrée en relation et filtrage des contreparties. Les justificatifs sont réunis pour le contrôleur.',
        useCases: [
          'Constitution et actualisation périodique des dossiers KYC des contreparties',
          'Filtrage sanctions et navires avec explication des alertes',
          'Synthèses de presse défavorable dans la langue source et en anglais',
        ],
      },
      {
        name: 'Information de marché et du desk',
        description: 'Des analyses et des rapports préparés automatiquement.',
        useCases: [
          'Projets de commentaires quotidiens sur les positions et le P&L',
          'Synthèse des rapports de fret et de marché',
          'Recherche de clauses contractuelles dans l’historique des transactions',
        ],
      },
    ],
    compliance: [
      'Le filtrage sanctions aide à la décision. La décision et sa justification restent à un contrôleur nommé.',
      'Données des contreparties et des transactions traitées en Suisse ou dans le tenant du client.',
      'Piste d’audit des versions de documents, des actions des agents et des validations. Conservation selon la politique de l’entreprise.',
      'Conçu pour soutenir les contrôles que les banques demandent pour le financement du négoce et la LBA.',
    ],
    relatedCase: 'trade-confirmation-agents',
    relatedServices: ['agentic-systems', 'ai-operations', 'data-ai-platforms'],
  },
  {
    slug: 'banking-wealth',
    icon: 'banking',
    image: 'ind-banking',
    tier: 'core',
    name: 'Banque privée & gestion de fortune',
    short: 'KYC, reporting client et préparation du conseil. Avec des contrôles alignés sur la FINMA et des données clients qui restent en Suisse.',
    hero: {
      eyebrow: '[ Secteur · Banque privée & gestion de fortune ]',
      title: { pre: 'Plus de temps avec les clients, moins avec les ', accent: 'dossiers.' },
      lead: 'Les gestionnaires de clientèle passent une bonne partie de la semaine sur la documentation. Actualisations KYC, profils d’adéquation, comptes rendus d’entretien, rapports clients. Nous construisons des systèmes qui préparent ce travail pour validation. Les contrôles restent ceux que la banque applique déjà.',
    },
    stat: {
      value: '37 000+',
      label: 'Emplois dans le secteur financier à Genève.',
      source: 'ge.ch, secteurs clés',
    },
    context: {
      title: 'La discrétion au cœur du métier',
      paragraphs: [
        'La banque privée genevoise repose sur la confiance et sur la documentation. Chaque relation client a son dossier KYC et ses justificatifs sur l’origine du patrimoine. S’y ajoutent les profils d’adéquation et une correspondance en plusieurs langues. Le dossier doit être complet, et rester discret pour le client.',
        'Les coûts sont sous pression et ajouter du personnel n’est plus la réponse habituelle. L’idée est de réduire les heures de compilation et de ressaisie. Le banquier gagne du temps pour ses clients et le dossier gagne en qualité. Pour cela, la localisation des données, les accès et l’auditabilité sont prévus dès le départ.',
      ],
    },
    valueStreams: [
      {
        name: 'Cycle de vie client et KYC',
        description: 'Entrées en relation et revues périodiques préparées par des agents. Les décisions restent aux personnes.',
        useCases: [
          'Dossiers d’actualisation KYC constitués à partir du système bancaire et des documents',
          'Rédaction de l’historique sur l’origine du patrimoine avec justificatifs cités',
          'Détection des pièces manquantes et rédaction des demandes au client',
        ],
      },
      {
        name: 'Préparation du conseil',
        description: 'Le banquier arrive à l’entretien avec un dossier déjà préparé.',
        useCases: [
          'Notes de préparation à partir du portefeuille, des notes et de l’actualité',
          'Saisie des comptes rendus d’entretien et rédaction des profils d’adéquation',
          'Projets de propositions d’investissement alignés sur la vue de la maison',
        ],
      },
      {
        name: 'Reporting et communication',
        description: 'Un reporting pour le client, dans sa langue.',
        useCases: [
          'Projets de commentaires de portefeuille en FR, DE, EN et IT',
          'Rédaction de la correspondance client avec contrôle du ton et de la conformité',
          'Reporting de gestion interne compilé automatiquement',
        ],
      },
      {
        name: 'Opérations et conformité',
        description: 'Les files de back-office traitées plus vite, avec de meilleurs justificatifs.',
        useCases: [
          'Tri des alertes de surveillance des transactions avec contexte expliqué',
          'Traitement des opérations sur titres et des instructions reçues par e-mail',
          'Questions-réponses sur les directives et la réglementation pour les collaborateurs, avec sources citées',
        ],
      },
    ],
    compliance: [
      'Données d’identification des clients traitées en Suisse, sur une infrastructure contrôlée par la banque ou un environnement hébergé en Suisse.',
      'Conçu autour des attentes de la FINMA en matière de prestataires tiers, de résilience opérationnelle et de confidentialité des données.',
      'Secret bancaire préservé. Aucune donnée client ne sert à entraîner des modèles. Rien n’est stocké au-delà de ce que le processus demande.',
      'Validation humaine des documents destinés au client et des décisions KYC, avec justificatifs journalisés.',
    ],
    relatedCase: 'private-bank-kyc-refresh',
    relatedServices: ['agentic-systems', 'ai-strategy', 'ai-operations'],
  },
  {
    slug: 'international-organisations',
    icon: 'intl-orgs',
    image: 'ind-intl',
    tier: 'core',
    name: 'Organisations internationales & ONG',
    short: 'Documents multilingues, rapports et gestion des connaissances. Avec une gouvernance adaptée aux mandats publics et aux bailleurs.',
    hero: {
      eyebrow: '[ Secteur · Organisations internationales & ONG ]',
      title: { pre: 'Des mandats en plusieurs langues, ', accent: 'une', post: ' seule mémoire.' },
      lead: 'La Genève internationale produit et lit beaucoup de texte. Résolutions, rapports, contributions, procès-verbaux, traductions. Nous construisons des systèmes qui rédigent, résument, traduisent et retrouvent l’information. Ils respectent la neutralité, la confidentialité et la gouvernance des mandats publics.',
    },
    context: {
      title: 'La gestion des connaissances dans une institution',
      paragraphs: [
        'Les organisations établies à Genève travaillent entre langues officielles, États membres et partenaires. Une grande partie du temps sert à produire des documents. Une autre sert à retrouver ce qui a déjà été décidé. Quel paragraphe a été adopté, quel pays a rapporté quoi, ce qu’une évaluation a conclu.',
        'L’IA peut rendre une partie de ce temps au mandat. Cela demande de la prudence. Les données peuvent contenir des informations personnelles sur des bénéficiaires ou des collaborateurs. Les privilèges et immunités déterminent où elles peuvent aller. Les résultats doivent être neutres et traçables. Nous commençons par la gouvernance, sans pour autant tout ralentir.',
      ],
    },
    valueStreams: [
      {
        name: 'Production documentaire',
        description: 'Projets, synthèses et traductions préparés pour la relecture des experts.',
        useCases: [
          'Premiers jets de rapports et de notes d’information à partir des sources',
          'Synthèses de réunions et relevés de décisions dans toutes les langues de travail',
          'Projets de traduction terminologiquement cohérents, prêts pour révision',
        ],
      },
      {
        name: 'Mémoire institutionnelle',
        description: 'Des décennies de documents rendues interrogeables.',
        useCases: [
          'Recherche et questions-réponses sur résolutions, rapports et archives, avec citations',
          'Recherche de précédents pour les négociateurs et le secrétariat',
          'Synthèse des évaluations et des enseignements tirés',
        ],
      },
      {
        name: 'Programmes et subventions',
        description: 'Rendre compte aux bailleurs sans urgence de dernière minute.',
        useCases: [
          'Compilation des rapports aux bailleurs à partir des données de programme et des remontées du terrain',
          'Rédaction de propositions selon les modèles et critères des bailleurs',
          'Constitution des dossiers de due diligence des partenaires',
        ],
      },
    ],
    compliance: [
      'Options de déploiement respectant les privilèges et immunités, y compris sur site et dans des tenants contrôlés par l’organisation.',
      'Données personnelles des bénéficiaires et du personnel minimisées, classifiées et tenues à l’écart des modèles externes lorsque nécessaire.',
      'Résultats traçables jusqu’aux documents sources. Revue humaine avant toute publication ou transmission.',
      'Alignement sur le cadre de protection des données propre à l’organisation, ainsi que sur la nLPD et le RGPD lorsqu’ils s’appliquent.',
    ],
    relatedCase: 'multilingual-document-pipeline',
    relatedServices: ['data-ai-platforms', 'adoption-enablement', 'ai-strategy'],
  },
  {
    slug: 'life-sciences',
    icon: 'life-sciences',
    image: 'ind-life',
    tier: 'adjacent',
    name: 'Sciences de la vie & MedTech',
    short: 'Rédaction réglementaire, documentation qualité et connaissance scientifique. Conçues pour les BPx et validées là où c’est nécessaire.',
    hero: {
      eyebrow: '[ Secteur · Sciences de la vie & MedTech ]',
      title: { pre: 'Plus vite au dossier, plus ', accent: 'sûr', post: ' dans le dossier.' },
      lead: 'Les entreprises de produits réglementés rédigent beaucoup de documentation maîtrisée. Nous construisons des systèmes de rédaction, de relecture et de recherche. Ils respectent les BPx et laissent la responsabilité aux personnes. La piste d’audit reste lisible pour un inspecteur.',
    },
    stat: {
      value: '313',
      label: 'Acteurs MedTech, biotech et pharma à Genève.',
      source: 'ge.ch, secteurs clés',
    },
    context: {
      title: 'La documentation sur le chemin critique',
      paragraphs: [
        'Dans les sciences de la vie et la MedTech, c’est souvent la rédaction qui fixe le délai jusqu’à la soumission. Documentation clinique et technique, déviations, CAPA, maîtrise des changements, réponses aux autorités. Chaque document doit rester cohérent avec des centaines d’autres.',
        'L’IA aide à rédiger, recouper et retrouver plus vite. En environnement BPx, le système doit être validé pour son usage prévu. Les changements sont maîtrisés et chaque résultat est revu par une personne qualifiée. Nous travaillons selon ce standard dès le départ.',
      ],
    },
    valueStreams: [
      {
        name: 'Affaires réglementaires',
        description: 'Soumissions et réponses rédigées à partir de sources maîtrisées.',
        useCases: [
          'Rédaction de sections de dossiers techniques à partir des rapports sources',
          'Tri des questions des autorités de santé et rédaction des réponses',
          'Contrôles de cohérence entre les documents de soumission',
        ],
      },
      {
        name: 'Qualité et conformité',
        description: 'Déviations et CAPA instruites plus vite et mieux documentées.',
        useCases: [
          'Rédaction des rapports de déviation et recherche d’événements similaires',
          'Aide à l’analyse des causes à partir des dossiers de lots et d’équipements',
          'Analyse d’impact sur les procédures pour la maîtrise des changements',
        ],
      },
      {
        name: 'Connaissance scientifique',
        description: 'Données internes et publiées, retrouvées et citées.',
        useCases: [
          'Veille bibliographique et synthèses structurées',
          'Questions-réponses sur les rapports d’études et la recherche interne',
          'Rédaction des réponses d’information médicale',
        ],
      },
    ],
    compliance: [
      'Approche de validation des systèmes informatisés alignée sur les principes GAMP 5 pour les usages relevant des BPx.',
      'Maîtrise des changements pour les modèles, les prompts et les sources. Une régression aux évaluations déclenche une revalidation.',
      'Revue par une personne qualifiée et signature électronique sur les documents maîtrisés.',
      'Données de santé et données génétiques traitées comme données personnelles sensibles au sens de la nLPD.',
    ],
    relatedCase: 'regulatory-submission-drafting',
    relatedServices: ['ai-operations', 'data-ai-platforms', 'agentic-systems'],
  },
  {
    slug: 'fragrance-flavour-chemicals',
    icon: 'fragrance',
    image: 'ind-fragrance',
    tier: 'adjacent',
    name: 'Parfums, arômes & chimie de spécialité',
    short: 'Formules, contrôle réglementaire et briefs clients reliés. Les créateurs gardent plus de temps pour créer.',
    hero: {
      eyebrow: '[ Secteur · Parfums, arômes & chimie de spécialité ]',
      title: { pre: 'Des années de formules, faciles à ', accent: 'retrouver.' },
      lead: 'Le savoir des équipes créatives et techniques est dans les formules, les cahiers de laboratoire et la mémoire des personnes. Nous le rendons consultable et le relions aux exigences réglementaires et clients. Le bon point de départ se trouve alors en quelques minutes.',
    },
    stat: {
      value: '400+',
      label: 'Entreprises des arômes et parfums dans la région genevoise, environ 10 000 emplois.',
      source: 'ge.ch, secteurs clés',
    },
    context: {
      title: 'La créativité sous contraintes',
      paragraphs: [
        'Chaque brief arrive avec ses contraintes. Un objectif de coût, un profil réglementaire pour plusieurs marchés, des règles sur les allergènes et l’étiquetage. S’y ajoutent des allégations de durabilité et des exigences de stabilité. Il faut parcourir des années de travaux et vérifier chaque ingrédient sur des listes qui évoluent.',
        'Le savoir existe, mais il est dispersé entre systèmes de formulation, bases réglementaires, panels sensoriels et e-mails. Le relier est d’abord une question de données, ensuite d’IA. Nous travaillons dans cet ordre.',
      ],
    },
    valueStreams: [
      {
        name: 'Du brief à la formule',
        description: 'Les briefs clients traduits en contraintes et en points de départ.',
        useCases: [
          'Analyse des briefs en exigences techniques et réglementaires structurées',
          'Recherche de formules similaires dans l’historique des projets',
          'Pré-contrôle des coûts et des contraintes sur les formules candidates',
        ],
      },
      {
        name: 'Réglementaire et sécurité produit',
        description: 'Le contrôle de conformité intégré au processus créatif.',
        useCases: [
          'Contrôle des ingrédients au regard des listes de restrictions par marché',
          'Rédaction des fiches de données de sécurité et des certificats',
          'Veille réglementaire avec impact sur le portefeuille actif',
        ],
      },
      {
        name: 'Commercial et service client',
        description: 'Des réponses plus rapides et plus précises aux clients.',
        useCases: [
          'Réponse aux questionnaires clients et aux demandes de documentation',
          'Traitement des demandes d’échantillons et des commandes reçues par e-mail',
          'Notes de compte pour les équipes commerciales',
        ],
      },
    ],
    compliance: [
      'Les formules sont une propriété intellectuelle sensible. Elles restent dans des environnements contrôlés par le client et ne servent pas à entraîner des modèles.',
      'Documents réglementaires revus par du personnel qualifié avant transmission aux clients.',
      'La visibilité des formules suit les droits d’accès existants.',
      'Traçabilité de chaque résultat de contrôle jusqu’à la version et à la date de la liste utilisée.',
    ],
    relatedCase: 'formulation-knowledge-graph',
    relatedServices: ['data-ai-platforms', 'agentic-systems', 'adoption-enablement'],
  },
  {
    slug: 'industry-manufacturing',
    icon: 'manufacturing',
    image: 'ind-manufacturing',
    tier: 'adjacent',
    name: 'Industrie & production',
    short: 'Le savoir de maintenance, de qualité et d’approvisionnement, à disposition des équipes de l’atelier.',
    hero: {
      eyebrow: '[ Secteur · Industrie & production ]',
      title: { pre: 'Le savoir de l’expert, au pied de la ', accent: 'machine.' },
      lead: 'Les industriels de précision dépendent de techniciens expérimentés. Leur savoir se transmet difficilement. Nous construisons des assistants et des agents qui donnent accès aux manuels, à l’historique de maintenance et aux dossiers qualité. La personne devant la machine les consulte dans sa langue.',
    },
    context: {
      title: 'Le savoir-faire, ressource rare',
      paragraphs: [
        'L’industrie suisse est connue pour sa précision et sa fiabilité. Les deux dépendent de personnes qui comprennent leurs machines. Beaucoup approchent de la retraite. Leur savoir est dans leur tête, dans des journaux de maintenance en abrégé et dans des manuels peu consultés.',
        'L’IA peut garder ce savoir et le rendre disponible au poste de travail. Elle aide à diagnostiquer une panne à partir de pannes similaires. Elle rédige un rapport qualité à partir des données capteurs. Elle répond à une question fournisseur à partir du contrat. Le gain se mesure en temps d’arrêt et en rebuts, ce qui permet de le tarifer au résultat.',
      ],
    },
    valueStreams: [
      {
        name: 'Maintenance et fiabilité',
        description: 'Un diagnostic plus rapide et moins de pannes récurrentes.',
        useCases: [
          'Assistant technicien sur manuels, journaux et interventions passées',
          'Rédaction des ordres de travail et identification des pièces',
          'Analyse des schémas de panne entre sites',
        ],
      },
      {
        name: 'Qualité',
        description: 'Des non-conformités documentées et clôturées plus vite.',
        useCases: [
          'Rédaction des rapports de non-conformité à partir des données d’inspection',
          'Aide aux démarches 8D et à l’analyse des causes',
          'Tri des réclamations clients et rédaction des réponses',
        ],
      },
      {
        name: 'Chaîne d’approvisionnement et achats',
        description: 'Des agents prennent en charge les échanges et documents fournisseurs.',
        useCases: [
          'Suivi des confirmations de commande et des dates de livraison reçues par e-mail',
          'Questions-réponses sur les contrats et spécifications fournisseurs',
          'Synthèses de surveillance des risques fournisseurs',
        ],
      },
    ],
    compliance: [
      'Déploiement sur site ou dans le tenant du client lorsque les données de production ne peuvent pas quitter le réseau de l’usine.',
      'Contrôle des exportations et biens à double usage pris en compte dans la classification des données et les accès.',
      'Les indications liées à la sécurité sont signalées comme consultatives, avec renvoi aux procédures et validation humaine.',
      'Intégration aux systèmes de management de la qualité existants et à leurs circuits de validation.',
    ],
    relatedCase: 'maintenance-copilot',
    relatedServices: ['agentic-systems', 'adoption-enablement', 'ai-operations'],
  },
];
