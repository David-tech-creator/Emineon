import type { Industry } from '../../schema';

export const industries: Industry[] = [
  {
    slug: 'commodities-trading',
    icon: 'trading',
    image: 'ind-trading',
    tier: 'core',
    name: 'Négoce de matières premières & shipping',
    short: 'Confirmations, KYC, documents de financement du négoce et opérations, pris en charge par des agents sous le contrôle des traders et des opérateurs.',
    hero: {
      eyebrow: '[ Secteur — Négoce de matières premières & shipping ]',
      title: { pre: 'Moins de papier entre la transaction et la ', accent: 'cargaison.' },
      lead: 'Les maisons de négoce vivent de documents : confirmations, lettres de crédit, connaissements, certificats d’inspection, contrôles de sanctions. Nous confions ce flux à des agents pour que les opérations suivent le rythme du desk, et que la conformité dispose d’une trace complète de chaque étape.',
    },
    stat: {
      value: '#1',
      label: 'Genève est la première place mondiale du financement du négoce ; 12 des 14 banques suisses actives dans ce domaine y sont établies.',
      source: 'ge.ch, secteurs clés',
    },
    context: {
      title: 'Un métier de documents déguisé en métier de négoce',
      paragraphs: [
        'Genève compte quelque 400 sociétés de négoce et environ 6000 emplois directs. Derrière chaque cargaison se trouve une chaîne de documents à rapprocher, contrôler et classer, souvent en plusieurs langues et sous pression, avec des contreparties, des banques, des inspecteurs et des agents maritimes qui travaillent chacun avec leurs propres modèles.',
        'Les dépenses de conformité augmentent : les régimes de sanctions évoluent plus vite, les banques demandent davantage de justificatifs et le financement du négoce tolère de moins en moins les écarts. Les équipes d’opérations ont grossi pour absorber cette charge. Les agents IA offrent une autre réponse : tout lire, tout rapprocher et tout pré-contrôler, et ne confier aux personnes que ce qui exige du jugement.',
      ],
    },
    valueStreams: [
      {
        name: 'Opérations de négoce',
        description: 'De la saisie de la transaction au règlement, avec des documents rapprochés automatiquement et des écarts détectés tôt.',
        useCases: [
          'Rapprochement des confirmations avec les transactions enregistrées dans l’ETRM',
          'Extraction des term sheets, récapitulatifs et avenants',
          'Rapprochement des factures et des prix provisoires et définitifs',
          'Préparation des réclamations de surestaries et de staries',
        ],
      },
      {
        name: 'Documentation du financement du négoce',
        description: 'Lettres de crédit et documents d’expédition contrôlés avant que la banque ne les voie.',
        useCases: [
          'Extraction des conditions de la lettre de crédit et génération de la liste de contrôle documentaire',
          'Contrôle des écarts avant présentation sur les connaissements et certificats',
          'Rédaction et suivi de la correspondance bancaire',
        ],
      },
      {
        name: 'Conformité et KYC',
        description: 'Entrée en relation et filtrage des contreparties, avec les justificatifs réunis pour le contrôleur.',
        useCases: [
          'Constitution et actualisation périodique des dossiers KYC des contreparties',
          'Filtrage sanctions et navires avec explication des alertes',
          'Synthèses de presse défavorable dans la langue source et en anglais',
        ],
      },
      {
        name: 'Information de marché et du desk',
        description: 'Des analyses et des rapports qui se compilent d’eux-mêmes.',
        useCases: [
          'Projets de commentaires quotidiens sur les positions et le P&L',
          'Synthèse des rapports de fret et de marché',
          'Recherche de clauses contractuelles dans l’historique des transactions',
        ],
      },
    ],
    compliance: [
      'Les résultats du filtrage sanctions sont une aide à la décision ; la décision et sa justification restent à un contrôleur nommé.',
      'Données des contreparties et des transactions traitées en Suisse ou dans le tenant du client.',
      'Piste d’audit complète des versions de documents, des actions des agents et des validations, conservée selon la politique de l’entreprise.',
      'Conçu pour soutenir, et non remplacer, les contrôles qu’attendent les banques au titre du financement du négoce et de la LBA.',
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
    short: 'KYC, reporting client et préparation du conseil, avec des contrôles au niveau FINMA et des données clients qui ne quittent jamais la Suisse.',
    hero: {
      eyebrow: '[ Secteur — Banque privée & gestion de fortune ]',
      title: { pre: 'Plus de temps avec les clients, moins avec les ', accent: 'dossiers.' },
      lead: 'Les gestionnaires de clientèle consacrent une large part de leur semaine à la documentation : actualisations KYC, profils d’adéquation, comptes rendus d’entretien, rapports clients. Nous construisons des systèmes qui préparent ce travail pour validation, sous les contrôles qu’une banque suisse applique déjà.',
    },
    stat: {
      value: '37 000+',
      label: 'Emplois dans le secteur financier à Genève.',
      source: 'ge.ch, secteurs clés',
    },
    context: {
      title: 'La discrétion est le produit',
      paragraphs: [
        'La banque privée genevoise repose sur la confiance et sur la documentation. Chaque relation client s’accompagne d’un dossier KYC, de justificatifs sur l’origine du patrimoine, de profils d’adéquation et de caractère approprié, et d’une correspondance en plusieurs langues. Les régulateurs l’attendent complète ; les clients l’attendent invisible.',
        'La pression sur les coûts est réelle et les effectifs ne sont plus le levier d’autrefois. L’enjeu est de supprimer les heures de compilation et de ressaisie qui séparent le banquier de son client, tout en rendant le dossier meilleur, pas plus mince. Cela ne fonctionne que si la localisation des données, le contrôle d’accès et l’auditabilité sont pensés dès la première ligne.',
      ],
    },
    valueStreams: [
      {
        name: 'Cycle de vie client et KYC',
        description: 'Entrées en relation et revues périodiques préparées par des agents, décidées par des personnes.',
        useCases: [
          'Dossiers d’actualisation KYC constitués à partir du système bancaire et des documents',
          'Rédaction de l’historique sur l’origine du patrimoine avec justificatifs cités',
          'Détection des pièces manquantes et rédaction des demandes au client',
        ],
      },
      {
        name: 'Préparation du conseil',
        description: 'Le banquier arrive à l’entretien avec tout déjà lu.',
        useCases: [
          'Notes de préparation à partir du portefeuille, des notes et de l’actualité',
          'Saisie des comptes rendus d’entretien et rédaction des profils d’adéquation',
          'Projets de propositions d’investissement alignés sur la vue de la maison',
        ],
      },
      {
        name: 'Reporting et communication',
        description: 'Un reporting prêt pour le client, dans la langue du client.',
        useCases: [
          'Projets de commentaires de portefeuille en FR, DE, EN et IT',
          'Rédaction de la correspondance client avec contrôle du ton et de la conformité',
          'Reporting de gestion interne compilé automatiquement',
        ],
      },
      {
        name: 'Opérations et conformité',
        description: 'Des files de back-office traitées plus vite, avec de meilleurs justificatifs.',
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
      'Secret bancaire préservé : aucune donnée client utilisée pour entraîner des modèles, aucun stockage persistant au-delà de ce que le processus exige.',
      'Validation humaine de chaque document destiné au client et de chaque décision KYC, avec justificatifs journalisés.',
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
    short: 'Documents multilingues, rapports et travail de connaissance, avec une gouvernance adaptée aux mandats publics et à l’exigence des bailleurs.',
    hero: {
      eyebrow: '[ Secteur — Organisations internationales & ONG ]',
      title: { pre: 'Des mandats en plusieurs langues, ', accent: 'une', post: ' seule mémoire.' },
      lead: 'La Genève internationale produit et consomme d’immenses volumes de texte : résolutions, rapports, contributions, procès-verbaux, traductions. Nous construisons des systèmes qui rédigent, résument, traduisent et retrouvent, avec la neutralité, la confidentialité et la gouvernance qu’exigent les mandats publics.',
    },
    context: {
      title: 'Le travail de connaissance à l’échelle institutionnelle',
      paragraphs: [
        'Les organisations établies à Genève travaillent entre langues officielles, États membres et réseaux de partenaires. Une grande partie de leur capacité est consacrée à produire des documents et à retrouver ce qui a déjà été décidé : quel paragraphe a été adopté, quel pays a rapporté quoi, quelle évaluation a conclu quoi.',
        'L’IA peut rendre cette capacité au mandat. Cela demande de la prudence : les données peuvent contenir des informations personnelles sur des bénéficiaires ou des collaborateurs, les privilèges et immunités déterminent où les données peuvent aller, et les résultats doivent être neutres et traçables. La gouvernance vient en premier, et elle peut être assurée sans tout ralentir.',
      ],
    },
    valueStreams: [
      {
        name: 'Production documentaire',
        description: 'Projets, synthèses et traductions préparés pour une revue experte.',
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
        description: 'Rendre compte aux bailleurs sans course de dernière minute.',
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
      'Résultats traçables jusqu’aux documents sources ; revue humaine avant toute publication ou transmission.',
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
    short: 'Rédaction réglementaire, documentation qualité et connaissance scientifique, conçues pour les BPx et validées là où c’est nécessaire.',
    hero: {
      eyebrow: '[ Secteur — Sciences de la vie & MedTech ]',
      title: { pre: 'Plus vite au dossier, plus ', accent: 'sûr', post: ' dans le dossier.' },
      lead: 'Les entreprises de produits réglementés rédigent d’énormes volumes de documentation maîtrisée. Nous construisons des systèmes de rédaction, de relecture et de connaissance qui respectent les BPx, maintiennent la responsabilité humaine et laissent une piste d’audit qu’un inspecteur peut suivre.',
    },
    stat: {
      value: '313',
      label: 'Acteurs MedTech, biotech et pharma à Genève.',
      source: 'ge.ch, secteurs clés',
    },
    context: {
      title: 'La documentation est sur le chemin critique',
      paragraphs: [
        'Dans les sciences de la vie et la MedTech, le délai entre les données et la soumission est souvent limité par la rédaction, pas par la science : documentation clinique et technique, déviations, CAPA, maîtrise des changements et réponses aux autorités. Chaque document doit être cohérent avec des centaines d’autres documents maîtrisés.',
        'L’IA peut rédiger, recouper et retrouver à une vitesse qu’aucune équipe n’égale. Dans un environnement BPx, cela n’a de valeur que si le système est validé pour son usage prévu, que les changements sont maîtrisés et que chaque résultat est revu par une personne qualifiée. Nous concevons selon ce standard dès le départ.',
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
        description: 'Déviations et CAPA instruites plus vite, mieux documentées.',
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
      'Maîtrise des changements pour les modèles, les prompts et les sources ; revalidation déclenchée par une régression aux évaluations.',
      'Revue par une personne qualifiée et signature électronique sur chaque document maîtrisé.',
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
    short: 'Connaissance des formules, contrôle réglementaire et briefs clients reliés, pour que les créateurs consacrent leur temps à créer.',
    hero: {
      eyebrow: '[ Secteur — Parfums, arômes & chimie de spécialité ]',
      title: { pre: 'Des décennies de formules, retrouvées ', accent: 'instantanément.' },
      lead: 'Les équipes créatives et techniques détiennent un savoir qui vit dans les formules, les cahiers de laboratoire et la mémoire des personnes. Nous le rendons interrogeable et le relions aux exigences réglementaires et clients, pour trouver le bon point de départ en quelques minutes.',
    },
    stat: {
      value: '400+',
      label: 'Entreprises des arômes et parfums dans la région genevoise, environ 10 000 emplois.',
      source: 'ge.ch, secteurs clés',
    },
    context: {
      title: 'La créativité sous contraintes',
      paragraphs: [
        'Chaque brief s’accompagne de contraintes : un objectif de coût, un profil réglementaire pour plusieurs marchés, des règles sur les allergènes et l’étiquetage, des allégations de durabilité, des exigences de stabilité. Y répondre suppose de fouiller des années de travaux antérieurs et de vérifier chaque ingrédient au regard de listes qui évoluent.',
        'Le savoir existe, mais il est dispersé entre systèmes de formulation, bases réglementaires, panels sensoriels et e-mails. Le relier est d’abord un problème de données, ensuite un problème d’IA, et c’est exactement dans cet ordre que nous travaillons.',
      ],
    },
    valueStreams: [
      {
        name: 'Du brief à la formule',
        description: 'Des briefs clients traduits en contraintes et en points de départ.',
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
        description: 'Des réponses plus rapides et plus justes aux clients.',
        useCases: [
          'Réponse aux questionnaires clients et aux demandes de documentation',
          'Traitement des demandes d’échantillons et des commandes reçues par e-mail',
          'Notes de compte pour les équipes commerciales',
        ],
      },
    ],
    compliance: [
      'Les formules sont traitées comme la propriété intellectuelle la plus précieuse : traitées dans des environnements contrôlés par le client, jamais utilisées pour entraîner des modèles.',
      'Documents réglementaires revus par du personnel qualifié avant transmission aux clients.',
      'Contrôle d’accès fin : la visibilité des formules suit les droits existants.',
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
    short: 'Le savoir de maintenance, de qualité et de chaîne d’approvisionnement mis entre les mains de ceux qui travaillent dans l’atelier.',
    hero: {
      eyebrow: '[ Secteur — Industrie & production ]',
      title: { pre: 'Le savoir de l’expert, à ', accent: 'chaque', post: ' machine.' },
      lead: 'Les industriels de précision dépendent de techniciens expérimentés dont le savoir se transmet difficilement. Nous construisons des assistants et des agents qui apportent manuels, historique de maintenance et dossiers qualité à la personne devant la machine, dans sa langue.',
    },
    context: {
      title: 'Le savoir-faire est le goulet d’étranglement',
      paragraphs: [
        'L’industrie suisse se distingue par la précision et la fiabilité. Les deux dépendent de personnes qui savent pourquoi une machine se comporte comme elle le fait, et beaucoup approchent de la retraite. Leur savoir est dans leur tête, dans des journaux de maintenance rédigés en abrégé et dans des manuels que personne ne lit.',
        'L’IA peut capter ce savoir et le restituer au poste de travail : diagnostiquer une panne à partir de l’historique de pannes similaires, rédiger un rapport qualité à partir des données capteurs, répondre à une question fournisseur à partir du contrat. La valeur se mesure en temps d’arrêt et en rebuts, ce qui la rend facile à tarifer au résultat.',
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
        description: 'La communication et les documents fournisseurs pris en charge par des agents.',
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
      'Les indications touchant à la sécurité sont toujours signalées comme consultatives, avec renvoi aux procédures et validation humaine.',
      'Intégration aux systèmes de management de la qualité existants et à leurs circuits de validation.',
    ],
    relatedCase: 'maintenance-copilot',
    relatedServices: ['agentic-systems', 'adoption-enablement', 'ai-operations'],
  },
];
