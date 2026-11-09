import type { CaseStudy } from '../../schema';

export const cases: CaseStudy[] = [
  {
    slug: 'trade-confirmation-agents',
    sector: 'commodities-trading',
    sectorLabel: 'Négoce de matières premières',
    title: 'Des confirmations rapprochées par des agents, les exceptions confiées aux équipes',
    client: 'Un négociant genevois en matières premières',
    summary:
      'Un workflow agentique lit les confirmations des contreparties et les rapproche des transactions enregistrées. Il rédige les réponses aux écarts. Les opérations traitent maintenant les exceptions au lieu de ressaisir.',
    challenge: [
      'L’équipe d’opérations recevait plusieurs centaines de confirmations par semaine par e-mail. PDF, scans et texte libre, en anglais, en français et parfois en espagnol. Chacune était comparée champ par champ à la transaction dans l’ETRM. Quantité, tolérance, formule de prix, période de livraison, incoterm, conditions de paiement.',
      'Le rapprochement était manuel, fait dans l’urgence et reposait sur quelques personnes expérimentées. Certains écarts apparaissaient tard, après l’envoi des documents à la banque. Le plan par défaut était d’engager davantage d’opérateurs.',
    ],
    approach: [
      'Deux forward-deployed engineers ont travaillé avec les opérations la première semaine. Ils ont réuni 240 confirmations historiques avec leur issue. Nous avons d’abord écrit le jeu d’évaluation à partir de ces cas. Pour chaque document, il fixe les bons champs extraits et la bonne décision de rapprochement.',
      'Deux opérateurs ont reçu le système en semaine trois, toute l’équipe en semaine cinq. Les agents font l’extraction et le rapprochement. Les cas incertains ou divergents vont dans une file de revue, avec les justificatifs mis en évidence. Les opérateurs valident ou corrigent en un clic. Chaque correction rejoint le jeu d’évaluation.',
    ],
    system: {
      text: 'Des agents suivent la boîte des confirmations et extraient les conditions. Ils interrogent l’ETRM via un connecteur en lecture seule. Chaque confirmation est classée rapprochée, divergente ou incertaine. Pour une divergence, un projet de réponse à la contrepartie attend l’envoi par un opérateur.',
      components: [
        'Surveillance de la boîte mail et analyse des PDF, scans et corps d’e-mails',
        'Agent d’extraction avec score de confiance par champ',
        'Connecteur ETRM en lecture seule et règles de rapprochement convenues avec les opérations',
        'File de revue avec justificatifs mis en évidence et validation ou correction en un clic',
        'Suite d’évaluation de plus de 240 cas réels exécutée à chaque livraison',
        'Journal d’audit de chaque extraction, décision et validation',
      ],
    },
    results: [
      { value: '−62%', label: 'De temps de traitement par confirmation' },
      { value: '81%', label: 'Des confirmations rapprochées sans ressaisie manuelle' },
      { value: '3 jours → même jour', label: 'Délai médian de signalement d’un écart' },
      { value: '0', label: 'Embauche supplémentaire prévue pour la prochaine hausse de volume' },
    ],
    stack: ['LLM hébergé (région suisse)', 'Python', 'PostgreSQL', 'API ETRM en lecture seule', 'OCR documentaire', 'Banc d’évaluation'],
    duration: '6 semaines jusqu’à la production',
    image: 'case-1',
    services: ['agentic-systems', 'ai-operations'],
  },
  {
    slug: 'private-bank-kyc-refresh',
    sector: 'banking-wealth',
    sectorLabel: 'Banque privée',
    title: 'Des revues KYC périodiques préparées en minutes, décidées par les équipes',
    client: 'Une banque privée suisse (client non divulgué, NDA)',
    summary:
      'Le système constitue les dossiers de revue KYC à partir des données bancaires et des documents clients. Il rédige l’historique avec justificatifs cités et signale ce qui manque. Les gestionnaires relisent et signent.',
    challenge: [
      'Les revues KYC périodiques des relations à risque élevé prenaient plusieurs heures chacune aux gestionnaires et aux responsables conformité. L’information était dispersée entre le système bancaire, la gestion électronique des documents et des années de correspondance, en grande partie en français et en allemand.',
      'Un retard s’était accumulé. Les revues étaient bouclées près de leur échéance et la qualité variait selon le gestionnaire. La banque voulait de meilleurs dossiers en moins de temps. Le tout sous la surveillance de la FINMA, sans donnée client hors de Suisse.',
    ],
    approach: [
      'Nous avons commencé par un diagnostic de deux semaines avec la conformité, le front office et l’IT pour convenir de la structure cible du dossier, du niveau de preuve attendu pour chaque section et de l’architecture de localisation des données. La fonction risques de la banque a revu la conception avant tout développement.',
      'Le système tourne sur une infrastructure contrôlée par la banque, en Suisse. Le modèle est déployé de façon à garder les données dans le pays, sans conservation ni entraînement. Chaque phrase de l’historique cite le document ou l’enregistrement d’origine. Le contrôleur voit la source à côté.',
    ],
    system: {
      text: 'Pour chaque revue à échéance, des agents rassemblent les données et documents du client. Ils les comparent à la check-list KYC de la banque. Ils rédigent l’historique sur l’origine du patrimoine et l’activité, avec citations. Ils listent les justificatifs manquants ou expirés et préparent la demande au client.',
      components: [
        'Connecteurs vers le système bancaire et la GED, avec droits hérités',
        'Moteur de check-list encodant la politique KYC de la banque',
        'Rédaction de l’historique avec citation phrase par phrase',
        'Détection des justificatifs manquants et projets de demande en FR, DE et EN',
        'Espace de revue avec sources côte à côte et signature',
        'Hébergement sur infrastructure suisse contrôlée par la banque, sans conservation par les fournisseurs de modèles',
      ],
    },
    results: [
      { value: '−55%', label: 'De temps par revue périodique' },
      { value: '4,1 → 4,6', label: 'Note moyenne de qualité des dossiers lors des contrôles conformité (sur 5)' },
      { value: '100%', label: 'Des affirmations de l’historique reliées à un justificatif' },
      { value: '0', label: 'Donnée client traitée hors de Suisse' },
    ],
    stack: ['Déploiement LLM hébergé en Suisse', 'Kubernetes sur site de la banque', 'Recherche hybride', 'API du système bancaire', 'Connecteur GED'],
    duration: 'Diagnostic de 2 semaines, 10 semaines jusqu’à la production',
    image: 'case-2',
    services: ['ai-strategy', 'agentic-systems', 'ai-operations'],
  },
  {
    slug: 'multilingual-document-pipeline',
    sector: 'international-organisations',
    sectorLabel: 'Organisation internationale',
    title: 'Une mémoire institutionnelle interrogeable en six langues',
    client: 'Une organisation internationale basée à Genève',
    summary:
      'Une plateforme de recherche sur des décennies de rapports, de résolutions et de procès-verbaux. Elle répond avec citations dans la langue de la question. Elle rédige aussi des notes d’information, relues par le personnel.',
    challenge: [
      'Le personnel passait beaucoup de temps à retrouver des précédents. Ce qui avait été convenu, rapporté ou recommandé sur un sujet les années précédentes. Les archives comptaient des centaines de milliers de documents dans plusieurs langues officielles. Souvent des PDF scannés, répartis entre des systèmes de différentes époques.',
      'Les outils précédents cherchaient des mots-clés dans une seule langue et renvoyaient de longues listes. L’organisation voulait des réponses exactes, neutres et traçables jusqu’au paragraphe source. Aucun document avec des données personnelles ne devait partir vers des services externes.',
    ],
    approach: [
      'Nous avons conçu la plateforme avec les équipes informatique et juridique de l’organisation, dans le respect de son cadre de protection des données et de ses privilèges. Les données personnelles ont été classifiées et filtrées à l’ingestion. Le modèle tourne dans un environnement contrôlé par l’organisation.',
      'La qualité a été évaluée langue par langue avec un jeu de tests rédigé par des experts métier. Il comptait 300 questions aux réponses et sources connues. Nous avons ensuite formé un premier groupe de 60 collaborateurs. Avec eux, nous avons construit des modèles de notes d’information, puis ouvert l’accès département par département.',
    ],
    system: {
      text: 'Les documents sont analysés, scans et tableaux compris. Ils sont découpés en gardant leur structure et indexés pour une recherche hybride multilingue. Les réponses citent les paragraphes utilisés. Les notes d’information suivent des modèles approuvés.',
      components: [
        'Chaîne d’ingestion avec OCR, analyse de mise en page et filtrage des données personnelles',
        'Recherche hybride multilingue sur l’ensemble des archives',
        'Génération de réponses avec citations au paragraphe près',
        'Rédaction de notes d’information à partir de modèles approuvés',
        'Suite d’évaluation par langue rédigée par des experts métier',
        'Tableau de bord d’usage et de qualité pour l’équipe de gestion des connaissances',
      ],
    },
    results: [
      { value: '−70%', label: 'De temps pour retrouver un précédent pertinent' },
      { value: '6', label: 'Langues traitées avec citations des sources' },
      { value: '92%', label: 'Des réponses jugées correctes et bien sourcées par le personnel' },
      { value: '600+', label: 'Utilisateurs actifs par semaine après trois mois' },
    ],
    stack: ['LLM open-weight et hébergés', 'Cloud contrôlé par l’organisation', 'OCR et analyse de mise en page', 'Index vectoriel et plein texte', 'Banc d’évaluation'],
    duration: '14 semaines, déploiement compris',
    image: 'case-3',
    services: ['data-ai-platforms', 'adoption-enablement'],
  },
  {
    slug: 'regulatory-submission-drafting',
    sector: 'life-sciences',
    sectorLabel: 'MedTech',
    title: 'Une documentation technique rédigée à partir de sources maîtrisées',
    client: 'Un fabricant MedTech suisse',
    summary:
      'Un assistant de rédaction validé produit des premiers jets de documentation technique à partir de rapports sources approuvés. Il contrôle la cohérence sur tout le dossier. Les changements sont maîtrisés.',
    challenge: [
      'Chaque variante de produit demandait une mise à jour de la documentation technique. Les sources étaient les rapports de vérification, la gestion des risques et les évaluations cliniques. Les rédacteurs réglementaires passaient l’essentiel de leur temps à copier, réconcilier et recouper.',
      'L’IA devait s’inscrire dans le système de management de la qualité. Validée pour son usage prévu et soumise à la maîtrise des changements. Une personne qualifiée reste responsable de chaque résultat.',
    ],
    approach: [
      'Nous avons d’abord rédigé avec l’équipe qualité la déclaration d’usage prévu et l’analyse de risques, puis défini les critères d’acceptation sous forme de suite d’évaluation construite à partir de sections déjà approuvées.',
      'L’assistant rédige uniquement à partir de sources approuvées et associe chaque affirmation à sa référence. Des contrôles de cohérence portent sur tout le dossier. Modèles, prompts et sources sont versionnés. Chaque changement lance la suite d’évaluation et une régression bloque la livraison.',
    ],
    system: {
      text: 'Le rédacteur choisit une section et les documents sources. L’assistant produit un projet référencé et un rapport de cohérence avec le reste du dossier. Le rédacteur modifie et approuve dans le système de gestion documentaire existant.',
      components: [
        'Registre des sources approuvées relié à la gestion documentaire',
        'Rédaction de sections avec référence pour chaque affirmation',
        'Contrôle de cohérence entre documents',
        'Suite d’évaluation construite à partir de sections historiques approuvées',
        'Maîtrise des changements pour modèles, prompts et sources',
        'Dossier de validation aligné sur les principes GAMP 5',
      ],
    },
    results: [
      { value: '−45%', label: 'De temps de rédaction par mise à jour de la documentation' },
      { value: '3×', label: 'Plus d’incohérences détectées avant la relecture' },
      { value: '0', label: 'Affirmation non référencée dans les projets' },
    ],
    stack: ['LLM hébergé (région UE/CH)', 'Intégration à la gestion documentaire', 'Python', 'Banc d’évaluation', 'Documentation de validation'],
    duration: '12 semaines, validation comprise',
    image: 'case-4',
    services: ['ai-operations', 'agentic-systems'],
  },
  {
    slug: 'formulation-knowledge-graph',
    sector: 'fragrance-flavour-chemicals',
    sectorLabel: 'Parfums & arômes',
    title: 'Du brief client à une formule de départ en quelques minutes',
    client: 'Une maison de parfums et d’arômes (client non divulgué, NDA)',
    summary:
      'Une couche de connaissance relie formules historiques, listes réglementaires et briefs clients. Créateurs et équipes d’application trouvent points de départ et contraintes en quelques minutes.',
    challenge: [
      'Les créateurs et les équipes techniques comptaient sur leur mémoire et sur leurs collègues pour retrouver les travaux pertinents. Les données de formulation, le statut réglementaire et les retours clients vivaient dans des systèmes séparés, aux nomenclatures incohérentes.',
      'Chaque brief demandait des jours de recherche et de contrôle réglementaire manuel avant le travail créatif. Le savoir partait avec les personnes qui changeaient de poste.',
    ],
    approach: [
      'Nous avons commencé par les données. Les identifiants d’ingrédients ont été mis en correspondance entre systèmes. Nous avons construit un graphe des formules, ingrédients, statuts réglementaires et issues de projets. La visibilité des formules suit les droits d’accès existants.',
      'Un assistant traduit ensuite les briefs en contraintes structurées et retrouve les projets similaires. Il pré-contrôle les candidats selon les restrictions de chaque marché. Des ambassadeurs dans chaque équipe ont contribué à l’interface et formé leurs collègues.',
    ],
    system: {
      text: 'Un graphe de connaissance relie formules, ingrédients, listes réglementaires et historique des projets. Un assistant extrait les contraintes du brief, retrouve les formules similaires et fait un pré-contrôle réglementaire. Tout reste dans l’environnement du client.',
      components: [
        'Résolution de l’identité des ingrédients entre systèmes de formulation et réglementaires',
        'Graphe de connaissance des formules, ingrédients, restrictions et résultats',
        'Analyse des briefs en exigences structurées',
        'Recherche de formules similaires filtrée selon les droits',
        'Pré-contrôle des restrictions par marché avec suivi des versions de listes',
        'Programme d’ambassadeurs et formation par équipe',
      ],
    },
    results: [
      { value: 'Jours → minutes', label: 'Pour trouver des formules de départ pertinentes' },
      { value: '−50%', label: 'D’effort de pré-contrôle réglementaire manuel' },
      { value: '85%', label: 'Des créateurs utilisent l’assistant chaque semaine' },
    ],
    stack: ['Base de données graphe', 'Cloud contrôlé par le client', 'LLM (sans conservation)', 'Connecteur du système de formulation', 'Ingestion des listes réglementaires'],
    duration: '16 semaines',
    image: 'case-5',
    services: ['data-ai-platforms', 'adoption-enablement'],
  },
  {
    slug: 'maintenance-copilot',
    sector: 'industry-manufacturing',
    sectorLabel: 'Industrie de précision',
    title: 'Un assistant de maintenance qui garde l’historique des réparations',
    client: 'Un industriel suisse de la précision',
    summary:
      'Un assistant pour techniciens réunit manuels machines, journaux de maintenance et interventions passées. Il suggère des causes probables et des procédures, puis rédige l’ordre de travail.',
    challenge: [
      'Les arrêts non planifiés des centres d’usinage critiques coûtaient cher. Le diagnostic dépendait de quelques techniciens seniors. Les journaux de maintenance étaient en abrégé, en français et en allemand. Les manuels comptaient des milliers de pages.',
      'Les techniciens plus récents mettaient plus de temps à diagnostiquer les pannes et les pannes récurrentes étaient fréquentes. Les données de l’usine ne pouvaient pas quitter le réseau du site.',
    ],
    approach: [
      'Des forward-deployed engineers ont passé du temps dans l’atelier avec les techniciens. Ils ont observé comment les pannes sont diagnostiquées en pratique. Nous avons normalisé dix ans de journaux de maintenance et les avons reliés aux machines, aux composants et aux manuels.',
      'L’assistant tourne sur site. Le technicien décrit un symptôme avec ses mots sur une tablette. L’assistant propose les causes probables, classées selon leur fréquence passée, avec la procédure et les pièces. Il rédige l’ordre de travail une fois l’intervention terminée.',
    ],
    system: {
      text: 'Un assistant sur site couvre manuels, historique de maintenance et données pièces. Il est accessible depuis l’atelier. Les procédures de sécurité renvoient au manuel officiel.',
      components: [
        'Déploiement du modèle sur site, sur le réseau de l’usine',
        'Historique de maintenance normalisé et relié aux machines et composants',
        'Recherche dans les manuels et procédures avec références de page',
        'Classement symptôme-cause à partir des interventions passées',
        'Rédaction des ordres de travail dans le système de maintenance',
        'Formation des techniciens et boucle de retour',
      ],
    },
    results: [
      { value: '−35%', label: 'De temps moyen de diagnostic sur les machines ciblées' },
      { value: '−20%', label: 'De pannes récurrentes à 30 jours' },
      { value: '100%', label: 'Des données conservées sur le réseau de l’usine' },
    ],
    stack: ['LLM open-weight sur site', 'Intégration au système de maintenance', 'Recherche hybride', 'Application web sur tablette'],
    duration: '10 semaines',
    image: 'case-6',
    services: ['agentic-systems', 'adoption-enablement'],
  },
];
