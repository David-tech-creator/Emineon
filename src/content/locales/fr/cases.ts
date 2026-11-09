import type { CaseStudy } from '../../schema';

export const cases: CaseStudy[] = [
  {
    slug: 'trade-confirmation-agents',
    sector: 'commodities-trading',
    sectorLabel: 'Négoce de matières premières',
    title: 'Des confirmations rapprochées par des agents, les exceptions confiées aux équipes',
    client: 'Un négociant genevois en matières premières',
    summary:
      'Un workflow agentique qui lit les confirmations des contreparties, les rapproche des transactions enregistrées et rédige les réponses aux écarts. Les opérations traitent désormais les exceptions au lieu de ressaisir.',
    challenge: [
      'L’équipe d’opérations recevait plusieurs centaines de confirmations par semaine par e-mail, sous forme de PDF, de scans et de texte libre, en anglais, en français et parfois en espagnol. Chacune devait être comparée champ par champ à la transaction enregistrée dans l’ETRM : quantité, tolérance, formule de prix, période de livraison, incoterm, conditions de paiement.',
      'Le rapprochement était manuel, fait sous pression et concentré sur quelques personnes expérimentées. Les écarts étaient parfois découverts tard, après l’envoi des documents à la banque. Recruter davantage d’opérateurs était le plan par défaut.',
    ],
    approach: [
      'Une équipe de deux forward-deployed engineers a travaillé aux côtés des opérations la première semaine, réunissant 240 confirmations historiques avec leur issue. À partir de celles-ci, nous avons écrit le jeu d’évaluation avant de construire quoi que ce soit : pour chaque document, les champs extraits corrects et la bonne décision de rapprochement.',
      'Nous avons livré à deux opérateurs en semaine trois et à toute l’équipe en semaine cinq. Les agents prennent en charge l’extraction et le rapprochement ; tout ce qui est incertain ou divergent va dans une file de revue avec les justificatifs mis en évidence. Les opérateurs valident ou corrigent en un clic, et chaque correction est ajoutée au jeu d’évaluation.',
    ],
    system: {
      text: 'Des agents surveillent la boîte des confirmations, extraient les conditions, interrogent l’ETRM via un connecteur en lecture seule et classent chaque confirmation comme rapprochée, divergente ou incertaine. Pour les divergences, une réponse à la contrepartie est rédigée pour qu’un opérateur l’envoie.',
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
    stack: ['LLM de pointe (région suisse)', 'Python', 'PostgreSQL', 'API ETRM en lecture seule', 'OCR documentaire', 'Banc d’évaluation'],
    duration: '6 semaines jusqu’à la production',
    image: 'case-1',
    services: ['agentic-systems', 'ai-operations'],
  },
  {
    slug: 'private-bank-kyc-refresh',
    sector: 'banking-wealth',
    sectorLabel: 'Banque privée',
    title: 'Des revues KYC périodiques préparées en minutes, décidées par des personnes',
    client: 'Une banque privée suisse (client non divulgué, NDA)',
    summary:
      'Un système qui constitue les dossiers de revue KYC périodique à partir des données bancaires et des documents clients, rédige l’historique avec justificatifs cités et signale ce qui manque. Les gestionnaires relisent et signent.',
    challenge: [
      'Les revues KYC périodiques des relations à risque élevé prenaient plusieurs heures chacune aux gestionnaires et aux responsables conformité. L’information était dispersée entre le système bancaire, la gestion électronique des documents et des années de correspondance, en grande partie en français et en allemand.',
      'Un retard s’était accumulé. Les revues étaient bouclées près de leur échéance, la qualité variait d’un gestionnaire à l’autre, et la banque voulait améliorer la qualité des dossiers tout en réduisant le temps passé, sous la surveillance de la FINMA et sans qu’aucune donnée client ne quitte la Suisse.',
    ],
    approach: [
      'Nous avons commencé par un diagnostic de deux semaines avec la conformité, le front office et l’IT pour convenir de la structure cible du dossier, du niveau de preuve attendu pour chaque section et de l’architecture de localisation des données. La fonction risques de la banque a revu la conception avant tout développement.',
      'Le système a été construit sur une infrastructure contrôlée par la banque, en Suisse. Nous avons utilisé un déploiement de modèle qui maintient les données dans le pays, sans conservation ni entraînement. Chaque phrase de l’historique rédigé cite le document ou l’enregistrement dont elle provient, et le contrôleur voit la source côte à côte.',
    ],
    system: {
      text: 'Pour chaque revue à échéance, des agents rassemblent les données et documents du client, les confrontent à la check-list KYC de la banque, rédigent l’historique sur l’origine du patrimoine et l’activité avec citations, et listent les justificatifs manquants ou expirés avec un projet de demande au client.',
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
      'Une plateforme de recherche sur des décennies de rapports, de résolutions et de procès-verbaux, qui répond avec citations dans la langue de la question et rédige des notes d’information que le personnel relit.',
    challenge: [
      'Le personnel passait beaucoup de temps à retrouver des précédents : ce qui avait été convenu, rapporté ou recommandé sur un sujet les années précédentes. Les archives comptaient des centaines de milliers de documents dans plusieurs langues officielles, souvent des PDF scannés, répartis entre des systèmes construits à des époques différentes.',
      'Les outils de recherche précédents trouvaient des mots-clés dans une seule langue et renvoyaient de longues listes. L’organisation avait besoin de réponses exactes, traçables jusqu’au paragraphe source et neutres, sans envoyer de documents contenant des données personnelles à des services externes.',
    ],
    approach: [
      'Nous avons conçu la plateforme avec les équipes informatique et juridique de l’organisation, dans le respect de son cadre de protection des données et de ses privilèges. Les données personnelles ont été classifiées et filtrées à l’ingestion. Le modèle tourne dans un environnement contrôlé par l’organisation.',
      'La qualité a été évaluée langue par langue avec un jeu de tests rédigé par des experts métier : 300 questions dont les réponses et les sources étaient connues. Nous avons ensuite formé un premier groupe de 60 collaborateurs, construit avec eux des modèles de notes d’information et étendu l’accès département par département.',
    ],
    system: {
      text: 'Les documents sont analysés, scans et tableaux compris, découpés en préservant leur structure et indexés pour une recherche hybride multilingue. Les réponses citent les paragraphes exacts utilisés ; les notes d’information sont rédigées à partir de modèles approuvés.',
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
    stack: ['LLM open-weight et de pointe', 'Cloud contrôlé par l’organisation', 'OCR et analyse de mise en page', 'Index vectoriel et plein texte', 'Banc d’évaluation'],
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
      'Un assistant de rédaction validé qui produit des premiers jets de sections de documentation technique à partir de rapports sources approuvés, avec contrôles de cohérence sur l’ensemble du dossier et maîtrise complète des changements.',
    challenge: [
      'Chaque variante de produit exigeait des mises à jour de la documentation technique à partir des rapports de vérification, des dossiers de gestion des risques et des évaluations cliniques. Les rédacteurs réglementaires passaient l’essentiel de leur temps à copier, réconcilier et recouper plutôt qu’à rédiger.',
      'Toute intervention de l’IA devait s’inscrire dans le système de management de la qualité : validée pour son usage prévu, soumise à la maîtrise des changements, avec une personne qualifiée responsable de chaque résultat.',
    ],
    approach: [
      'Nous avons d’abord rédigé avec l’équipe qualité la déclaration d’usage prévu et l’analyse de risques, puis défini les critères d’acceptation sous forme de suite d’évaluation construite à partir de sections déjà approuvées.',
      'L’assistant ne rédige qu’à partir des documents d’un ensemble de sources approuvées et associe chaque affirmation à sa référence. Des contrôles de cohérence portent sur tout le dossier. Modèles, prompts et sources sont versionnés ; tout changement déclenche la suite d’évaluation, et une régression bloque la livraison.',
    ],
    system: {
      text: 'Les rédacteurs choisissent une section et les documents sources ; l’assistant produit un projet référencé et un rapport de cohérence avec le reste du dossier. Le rédacteur modifie et approuve dans le système de gestion documentaire existant.',
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
    stack: ['LLM de pointe (région UE/CH)', 'Intégration à la gestion documentaire', 'Python', 'Banc d’évaluation', 'Documentation de validation'],
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
      'Une couche de connaissance qui relie formules historiques, listes réglementaires et briefs clients, pour que créateurs et équipes d’application trouvent points de départ et contraintes en minutes plutôt qu’en jours.',
    challenge: [
      'Les créateurs et les équipes techniques comptaient sur leur mémoire et sur leurs collègues pour retrouver les travaux pertinents. Les données de formulation, le statut réglementaire et les retours clients vivaient dans des systèmes séparés, aux nomenclatures incohérentes.',
      'Chaque brief déclenchait des jours de recherche et de contrôle réglementaire manuel avant que le travail créatif ne puisse commencer, et le savoir partait avec les personnes qui changeaient de poste.',
    ],
    approach: [
      'Nous avons commencé par les données : mise en correspondance des identifiants d’ingrédients entre systèmes, construction d’un graphe de connaissance des formules, ingrédients, statuts réglementaires et issues de projets, en alignant la visibilité des formules sur les droits d’accès existants.',
      'Par-dessus, un assistant analyse les briefs entrants en contraintes structurées, retrouve les projets passés similaires et pré-contrôle les candidats au regard des restrictions de chaque marché. Des ambassadeurs dans chaque équipe ont façonné l’interface et formé leurs collègues.',
    ],
    system: {
      text: 'Un graphe de connaissance relie formules, ingrédients, listes réglementaires et historique des projets. Un assistant de brief extrait les contraintes, retrouve les formules similaires et effectue un pré-contrôle réglementaire, le tout dans l’environnement du client.',
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
    title: 'Un assistant de maintenance qui se souvient de chaque réparation',
    client: 'Un industriel suisse de la précision',
    summary:
      'Un assistant pour techniciens qui combine manuels machines, journaux de maintenance et interventions passées pour suggérer des causes probables et des procédures, puis rédige l’ordre de travail.',
    challenge: [
      'Les arrêts non planifiés des centres d’usinage critiques coûtaient cher, et le diagnostic dépendait de quelques techniciens seniors. Les journaux de maintenance étaient rédigés en abrégé, en français et en allemand, et les manuels comptaient des milliers de pages.',
      'Les techniciens plus récents mettaient plus de temps à diagnostiquer les pannes et les pannes récurrentes étaient fréquentes. Les données de l’usine ne pouvaient pas quitter le réseau du site.',
    ],
    approach: [
      'Des forward-deployed engineers ont passé du temps dans l’atelier avec les techniciens pour comprendre comment les pannes sont réellement diagnostiquées. Nous avons normalisé dix ans de journaux de maintenance et les avons reliés aux machines, aux composants et aux sections des manuels.',
      'L’assistant tourne sur site. Les techniciens décrivent un symptôme avec leurs propres mots sur une tablette ; l’assistant renvoie les causes probables classées selon leur fréquence passée, la procédure et les pièces concernées, et rédige l’ordre de travail une fois l’intervention terminée.',
    ],
    system: {
      text: 'Un assistant sur site couvrant manuels, historique de maintenance et données pièces, accessible depuis l’atelier, avec des procédures de sécurité toujours référencées au manuel officiel.',
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
