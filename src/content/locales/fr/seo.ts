import type { SeoDict } from '../../schema';

/**
 * Contenu SEO/GEO (SEO-PLAN.md  4,  6,  7), version française. Même politique
 * de faits que partout ailleurs : uniquement l’ensemble vérifié, pas de nombre
 * de continents (les centres sont listés), hello@emineon.com comme seule adresse
 * publique, aucun client ni chiffre inventé. Les énoncés réglementaires restent
 * volontairement généraux ; ce qui doit être revérifié avant le lancement figure
 * dans TODO.md (« SEO pages: verify »).
 */
export const seo: SeoDict = {
  pages: {
    switzerland: 'Conseil en IA en Suisse',
    geneva: 'Conseil en IA à Genève',
    governance: 'Gouvernance IA en Suisse',
    faq: 'FAQ',
  },
  labels: {
    updated: 'Mis à jour le',
    footerColumn: 'Conseil en IA',
    related: 'À lire aussi',
    follow: 'Suivre',
    allQuestions: 'Les {n} questions',
  },
  titles: {
    services: {
      'ai-strategy': 'Stratégie IA et diagnostic de maturité',
      'agentic-systems': 'Systèmes d’IA agentiques en production',
      'data-ai-platforms': 'Plateformes data et IA, hébergées en Suisse si nécessaire',
      'ai-operations': 'Opérations IA : LLMOps, évaluations, supervision, gouvernance',
      'adoption-enablement': 'Adoption de l’IA et formation des équipes',
    },
    industries: {
      'commodities-trading': 'IA pour le négoce de matières premières et le shipping',
      'banking-wealth': 'IA pour la banque privée et la gestion de fortune',
      'international-organisations': 'IA pour les organisations internationales et les ONG',
      'life-sciences': 'IA pour les sciences de la vie et la MedTech',
      'fragrance-flavour-chemicals': 'IA pour la parfumerie, les arômes et la chimie de spécialité',
      'industry-manufacturing': 'IA pour l’industrie et la production',
    },
  },

  facts: {
    eyebrow: '[ Emineon en bref ]',
    title: { pre: 'Les faits, ', accent: 'au même endroit.' },
    definition:
      'Emineon est un cabinet de conseil natif de l’IA dont le siège est à Genève, en Suisse. Il définit la stratégie IA, construit des systèmes agentiques qui tournent en production et conduit l’adoption dans toute l’entreprise, avec une seule équipe responsable, rémunérée sur les résultats plutôt qu’à l’heure.',
    items: [
      { label: 'Activité', value: 'Cabinet de conseil natif de l’IA : stratégie IA, systèmes agentiques en production, plateformes data et IA, opérations IA, adoption' },
      { label: 'Siège', value: 'Route de Vandœuvres 77A, 1253 Vandœuvres, Genève, Suisse' },
      { label: 'Centres de delivery', value: 'Genève · Hô Chi Minh-Ville · Hanoï · Tokyo · Melbourne · Silicon Valley · Texas' },
      { label: 'Réseau', value: '130+ ingénieurs · 200+ projets livrés' },
      { label: 'Modèle d’intervention', value: 'Évaluer (diagnostic à prix fixe) → Construire (prix par jalon et au résultat) → Opérer (exploiter, consolider, transférer)' },
      { label: 'Programme phare', value: '30 jours, de l’état des lieux à un premier workflow en production' },
      { label: 'Équipes', value: 'De petites équipes seniors et des forward-deployed engineers sur site, soutenus par le réseau de delivery mondial' },
      { label: 'Rémunération', value: 'Sur les résultats, pas sur les heures' },
      { label: 'Langues', value: 'Anglais, français, allemand' },
      { label: 'Données et conformité', value: 'Hébergement des données en Suisse possible ; nLPD (en vigueur depuis le 1er septembre 2023) ; communication FINMA sur la surveillance 08/2024 ; RGPD ; préparation à l’AI Act européen ; indépendant des modèles' },
      { label: 'Secteurs', value: 'Négoce de matières premières et shipping ; banque privée et gestion de fortune ; organisations internationales et ONG ; sciences de la vie et MedTech ; parfumerie, arômes et chimie de spécialité ; industrie et production' },
      { label: 'Contact', value: 'hello@emineon.com' },
    ],
  },

  faq: {
    groups: {
      firm: 'À propos d’Emineon',
      engagements: 'Missions et tarification',
      technology: 'Technologie et données',
      regulation: 'Réglementation et gouvernance',
    },
    items: [
      {
        id: 'what-ai-consulting',
        group: 'engagements',
        q: 'Que fait un cabinet de conseil en IA ?',
        a: 'Il aide une organisation à décider où l’IA crée de la valeur, construit les systèmes qui la produisent et veille à ce que les équipes s’en servent. Chez Emineon, cela signifie un diagnostic avec business cases et feuille de route, des systèmes agentiques construits et exploités en production, ainsi que la formation et la gouvernance qui ancrent l’adoption.',
      },
      {
        id: 'who-is-emineon',
        group: 'firm',
        q: 'Qui est Emineon ?',
        a: 'Emineon est un cabinet de conseil natif de l’IA dont le siège est à Genève, en Suisse. De petites équipes seniors, amplifiées par l’IA et soutenues par un réseau de delivery mondial de 130+ ingénieurs, accompagnent leurs clients de la stratégie IA au niveau de la direction jusqu’aux systèmes qui tournent en production.',
      },
      {
        id: 'where-based',
        group: 'firm',
        q: 'Où se trouve Emineon ?',
        a: 'Notre siège se trouve Route de Vandœuvres 77A, 1253 Vandœuvres, dans le canton de Genève. Notre réseau de delivery compte des centres à Hô Chi Minh-Ville, Hanoï, Tokyo, Melbourne, dans la Silicon Valley et au Texas.',
      },
      {
        id: 'outside-geneva',
        group: 'firm',
        q: 'Travaillez-vous en dehors de Genève ?',
        a: 'Oui. Nous travaillons dans toute la Suisse, notamment à Lausanne, Zurich, Bâle et Berne, ainsi qu’à l’international. Nos forward-deployed engineers travaillent sur site avec votre équipe, là où se trouve le travail.',
      },
      {
        id: 'industries',
        group: 'firm',
        q: 'Sur quels secteurs vous concentrez-vous ?',
        a: 'Le négoce de matières premières et le shipping, la banque privée et la gestion de fortune, les organisations internationales et les ONG : les secteurs qui font Genève. Nous travaillons aussi dans les sciences de la vie et la MedTech, la parfumerie, les arômes et la chimie de spécialité, ainsi que l’industrie et la production.',
      },
      {
        id: 'services',
        group: 'firm',
        q: 'Quels services proposez-vous ?',
        a: 'Cinq : la stratégie IA (maturité, business cases, feuille de route, politique), les systèmes agentiques, les plateformes data et IA, les opérations IA (LLMOps, évaluations, supervision, gouvernance), ainsi que l’adoption et la montée en compétences (formation, conduite du changement, politique IA).',
      },
      {
        id: 'how-start',
        group: 'engagements',
        q: 'Comment commence une mission ?',
        a: 'Par Évaluer : un diagnostic à prix fixe qui couvre la maturité IA, des cas d’usage priorisés avec leur ROI, les données et les risques, la politique IA et une feuille de route. Il se conclut par une décision sur ce qu’il faut construire en premier.',
      },
      {
        id: 'how-fast',
        group: 'engagements',
        q: 'En combien de temps un premier workflow d’IA peut-il être en production ?',
        a: 'Notre sprint phare va de l’état des lieux à un premier workflow en production en 30 jours, pour un cas d’usage bien cadré dont l’accès aux données est déjà en place.',
      },
      {
        id: 'pricing',
        group: 'engagements',
        q: 'Comment fixez-vous vos prix ?',
        a: 'Les diagnostics sont à prix fixe. Les réalisations sont facturées par jalon et, lorsque le résultat est mesurable, au résultat. Nous sommes rémunérés sur les résultats, pas sur les heures.',
      },
      {
        id: 'fde',
        group: 'engagements',
        q: 'Que sont les forward-deployed engineers ?',
        a: 'Des ingénieurs seniors qui travaillent au sein de votre équipe, sur site à Genève ou là où vous opérez. Ils apprennent le workflow de première main et livrent le système avec vous, tandis que le réseau de delivery prend en charge le passage à l’échelle.',
      },
      {
        id: 'agentic-ai',
        group: 'technology',
        q: 'Qu’est-ce que l’IA agentique, et est-elle prête pour la production ?',
        a: 'Les systèmes d’IA agentiques utilisent des modèles de langage pour planifier et exécuter des tâches en plusieurs étapes à l’aide d’outils : lire des documents, vérifier des systèmes, préparer des actions, avec une validation humaine là où elle compte. Ils sont prêts pour la production lorsqu’un périmètre clair, des évaluations, la journalisation et une revue humaine sont intégrés dès le premier jour.',
      },
      {
        id: 'data-switzerland',
        group: 'technology',
        q: 'Nos données peuvent-elles rester en Suisse ?',
        a: 'Oui. Lorsque c’est nécessaire, nous déployons sur une infrastructure hébergée en Suisse ou dans votre propre tenant cloud, et nous concevons pour la nLPD dès le départ. Vos données restent les vôtres et ne servent pas à entraîner des modèles de tiers.',
      },
      {
        id: 'model-agnostic',
        group: 'technology',
        q: 'Êtes-vous liés à un modèle ou à un fournisseur d’IA ?',
        a: 'Non. Nous sommes indépendants des modèles et choisissons le modèle tâche par tâche selon la qualité, le coût et les contraintes liées aux données. Vous pouvez donc changer de fournisseur sans tout reconstruire.',
      },
      {
        id: 'finma',
        group: 'regulation',
        q: 'Que change la communication FINMA sur la surveillance 08/2024 pour l’IA dans une banque ou chez un gestionnaire de fortune ?',
        a: 'La communication FINMA sur la surveillance 08/2024 expose ce que l’autorité suisse de surveillance des marchés financiers attend en matière de gouvernance et de gestion des risques lorsque les établissements assujettis utilisent l’IA. En pratique : savoir quelles applications d’IA vous exploitez, qui en est responsable, quel est le niveau de risque de chacune, et comment la qualité des données, les tests, la surveillance et la documentation sont assurés. Nous intégrons ces contrôles au système lui-même.',
      },
      {
        id: 'eu-ai-act',
        group: 'regulation',
        q: 'L’AI Act européen s’applique-t-il aux entreprises suisses ?',
        a: 'Cela peut être le cas. L’AI Act européen vise les fournisseurs qui mettent des systèmes d’IA sur le marché de l’UE et, dans certains cas, les fournisseurs et déployeurs établis hors de l’UE dont les résultats produits par l’IA sont utilisés dans l’UE. La Suisse ne copie pas le règlement européen : le Conseil fédéral a choisi de ratifier la Convention du Conseil de l’Europe sur l’IA et d’adapter le droit suisse secteur par secteur.',
      },
      {
        id: 'nfadp',
        group: 'regulation',
        q: 'Quel est l’impact de la nLPD sur les projets d’IA ?',
        a: 'La loi fédérale révisée sur la protection des données est en vigueur depuis le 1er septembre 2023. Pour l’IA, elle implique la protection des données dès la conception et par défaut, la transparence sur les décisions automatisées, un registre des activités de traitement, des analyses d’impact pour les traitements à risque élevé et l’annonce des violations au PFPDT. Nous en faisons des données d’entrée de la conception, pas de la paperasse en fin de projet.',
      },
      {
        id: 'after-live',
        group: 'engagements',
        q: 'Que se passe-t-il une fois le système en production ?',
        a: 'Opérer : nous l’exploitons, le surveillons et le consolidons, avec évaluations et alertes, puis nous continuons à l’exploiter ou le transférons à votre équipe avec documentation et formation. Le déploiement dans vos différentes entités se fait dans cette même phase.',
      },
      {
        id: 'success',
        group: 'engagements',
        q: 'Comment mesurez-vous la réussite ?',
        a: 'Par rapport au business case validé pendant la phase Évaluer : heures rendues aux équipes, délais de traitement, taux d’erreur, volumes traités ou chiffre d’affaires, mesurés avant et après. Les évaluations suivent la qualité en continu, pour que vous sachiez que le système reste performant.',
      },
      {
        id: 'training',
        group: 'engagements',
        q: 'Formez-vous aussi nos équipes ?',
        a: 'Oui. L’adoption et la montée en compétences couvrent la formation par métier, la politique IA, la conduite du changement et les relais internes, car un système que personne n’utilise ne produit rien.',
      },
      {
        id: 'languages',
        group: 'firm',
        q: 'Dans quelles langues travaillez-vous ?',
        a: 'En anglais, en français et en allemand, les langues de travail de la plupart des entreprises suisses et de la Genève internationale.',
      },
      {
        id: 'vs-large',
        group: 'firm',
        q: 'En quoi Emineon se distingue-t-il d’un grand cabinet de conseil ?',
        a: 'Une seule petite équipe senior vous accompagne de la stratégie jusqu’au système en production, puis reste pour l’exploiter. Vous ne recevez pas une présentation à transmettre à un intégrateur distinct. Nous sommes rémunérés sur les résultats, pas sur les heures, et nous nous concentrons sur les secteurs réglementés et documentaires de Genève.',
      },
      {
        id: 'contact',
        group: 'firm',
        q: 'Comment entamer la discussion ?',
        a: 'Écrivez à hello@emineon.com ou utilisez le formulaire de contact. Un premier appel permet de déterminer ce qui convient : la phase Évaluer, un sprint de 30 jours ou une réalisation ciblée.',
      },
    ],
  },

  faqPage: {
    meta: {
      title: 'FAQ conseil en IA : services, prix, données, réglementation',
      description:
        'Réponses directes sur Emineon et le conseil en IA en Suisse : services, sprint de 30 jours, rémunération au résultat, données en Suisse, nLPD, FINMA et AI Act.',
    },
    hero: {
      eyebrow: '[ FAQ ]',
      title: { pre: 'Les questions qu’on nous pose ', accent: 'le plus', post: ' souvent.' },
      lead: 'Des réponses courtes et citables, classées par thème. Si la vôtre n’y figure pas, écrivez à hello@emineon.com : un membre senior de l’équipe vous répondra sous un jour ouvrable.',
    },
  },

  switzerland: {
    meta: {
      title: 'Conseil en IA en Suisse',
      description:
        'Cabinet de conseil en IA basé à Genève : stratégie IA, systèmes agentiques en production, gouvernance nLPD, FINMA et AI Act. Rémunéré sur les résultats.',
    },
    hero: {
      eyebrow: '[ Conseil en IA · Suisse ]',
      title: { pre: 'Conseil en intelligence artificielle en Suisse, ', accent: 'de la stratégie aux systèmes', post: ' en production.' },
      lead: 'Emineon est un cabinet de conseil en IA dont le siège est à Genève. Nous aidons les entreprises suisses à décider où l’IA est rentable, construisons des systèmes agentiques qui tournent en production sur une infrastructure hébergée en Suisse ou chez le client, et formons leurs équipes à s’en servir, en français, en allemand et en anglais. Une seule équipe senior, rémunérée sur les résultats.',
    },
    services: {
      eyebrow: '[ 01 — Ce que nous faisons en Suisse ]',
      title: { pre: 'Cinq services, une seule équipe, ', accent: 'un résultat', post: ' dont elle répond.' },
      lead: 'Chaque service fonctionne seul, mais la plupart de nos clients suisses en combinent deux ou trois : une stratégie qui désigne les premiers workflows, le système qui les exécute, puis l’exploitation et la formation qui les maintiennent en usage.',
    },
    engagement: {
      eyebrow: '[ 02 — Comment se déroulent nos missions ]',
      title: { pre: 'Évaluer, construire, opérer : ', accent: 'rémunérés au résultat.' },
      lead: 'Chaque mission gravit la même échelle. Chaque échelon a un périmètre fixe, une logique de prix claire et un résultat vérifiable avant de vous engager pour le suivant. Le sprint phare mène un cas d’usage bien cadré de l’état des lieux à un premier workflow en production en 30 jours.',
      columns: { stage: 'Étape', what: 'Ce que vous obtenez', pricing: 'Tarification', duration: 'Durée type' },
    },
    swiss: {
      eyebrow: '[ 03 — Spécificités suisses ]',
      title: { pre: 'Conçu pour la façon dont la Suisse ', accent: 'encadre', post: ' les données et l’IA.' },
      lead: 'Les entreprises suisses relèvent de leur propre loi sur la protection des données, d’autorités de surveillance sectorielles et souvent aussi de règles européennes. Nous traitons l’ensemble comme une donnée d’entrée de la conception.',
      items: [
        {
          title: 'Données hébergées en Suisse',
          text: 'Les systèmes tournent sur une infrastructure hébergée en Suisse ou dans votre propre tenant cloud lorsque les données l’exigent. Vous choisissez la région ; nous la documentons. Les données des clients ne servent jamais à entraîner des modèles de tiers.',
        },
        {
          title: 'La nLPD dès la conception',
          text: 'La loi fédérale révisée sur la protection des données s’applique depuis le 1er septembre 2023. Protection des données dès la conception et par défaut, registre des activités de traitement, analyses d’impact et annonce des violations au PFPDT font partie du plan de réalisation, pas d’un rattrapage.',
        },
        {
          title: 'Les attentes de la FINMA',
          text: 'Pour les banques, les gestionnaires de fortune et les autres établissements assujettis, la communication FINMA sur la surveillance 08/2024 fixe le cadre de gouvernance de l’IA. Nous intégrons au système l’inventaire, la classification des risques, les tests, la surveillance et la documentation.',
        },
        {
          title: 'La portée de l’AI Act européen',
          text: 'La Suisse ne copie pas l’AI Act européen, mais celui-ci peut s’appliquer lorsque des entreprises suisses servent le marché de l’UE ou que les résultats de leur IA y sont utilisés. Nous en tenons compte dès le départ, pour que la documentation existe déjà le jour où elle est demandée.',
        },
      ],
      cta: { label: 'Gouvernance IA en Suisse', href: '/ai-governance-switzerland' },
    },
    sectors: {
      eyebrow: '[ 04 — Secteurs ]',
      title: { pre: 'Au cœur des secteurs qui ', accent: 'font', post: ' l’économie suisse.' },
      lead: 'Nous nous concentrons sur le travail réglementé, documentaire et multilingue, là où l’IA fait gagner le plus de temps et exige le plus de rigueur. Trois secteurs clés sont ceux de Genève ; trois secteurs adjacents s’étendent à la Suisse romande et au reste du pays.',
    },
    where: {
      eyebrow: '[ 05 — Où nous travaillons ]',
      title: { pre: 'Ancrés à Genève, ', accent: 'sur site', post: ' dans toute la Suisse.' },
      lead: 'La direction des missions et le forward-deployed engineering sont basés à notre siège genevois. Les ingénieurs se déplacent là où se trouve le travail, et notre réseau de delivery mondial ajoute de la capacité 24 heures sur 24.',
      places: [
        { title: 'Genève', text: 'Siège à Vandœuvres. Maisons de négoce, banques privées et organisations internationales à quelques minutes en voiture.' },
        { title: 'Lausanne et le canton de Vaud', text: 'Depuis Genève, sur site chaque fois que le travail l’exige. Sciences de la vie, industrie et écosystème de la recherche publique.' },
        { title: 'Zurich', text: 'Nous servons nos clients zurichois depuis Genève, avec des ingénieurs sur site pour le cadrage, la réalisation et le transfert.' },
        { title: 'Bâle', text: 'Sciences de la vie et chimie de spécialité, depuis Genève, avec un travail sur site lorsque des données réglementées l’exigent.' },
        { title: 'Berne', text: 'Organisations fédérales et réglementées, depuis Genève, en français ou en allemand.' },
        { title: 'Tessin', text: 'Depuis Genève, pour les missions qui correspondent à nos secteurs et à nos langues.' },
      ],
      note: 'Genève est notre seul bureau en Suisse. Partout ailleurs, nous venons à vous.',
      cta: { label: 'Conseil en IA à Genève', href: '/ai-consulting-geneva' },
    },
    work: {
      eyebrow: '[ 06 — Missions représentatives ]',
      title: { pre: 'Des systèmes en production, ', accent: 'mesurés.' },
      lead: 'Anonymisées sous NDA et présentées comme représentatives. Chacune indique la situation de référence, ce que nous avons construit et ce qui a changé.',
    },
    choose: {
      eyebrow: '[ 07 — Comment choisir ]',
      title: { pre: 'Comment choisir un cabinet de conseil en IA ', accent: 'en Suisse.' },
      lead: 'Six questions à poser à tout cabinet, y compris au nôtre. Les réponses distinguent ceux qui livrent des systèmes de ceux qui livrent des présentations.',
      items: [
        { title: 'Des preuves en production', text: 'Demandez des systèmes en service aujourd’hui, avec une situation de référence et un résultat mesuré. Les pilotes et les démos ne sont pas des preuves.' },
        { title: 'Localisation des données', text: 'Où vos données seront-elles traitées et stockées, qui peut y accéder, et serviront-elles un jour à entraîner un modèle ? Obtenez la réponse par écrit.' },
        { title: 'Maîtrise des secteurs réglementés', text: 'Si vous êtes assujetti, le cabinet doit savoir ce que la communication FINMA sur la surveillance 08/2024, la nLPD et, le cas échéant, l’AI Act européen exigent d’un système d’IA, et montrer comment ses réalisations y répondent.' },
        { title: 'Modèle de tarification', text: 'La facturation à l’heure récompense l’effort. Le prix fixe et la rémunération au résultat récompensent les résultats. Demandez quels risques le cabinet est prêt à partager.' },
        { title: 'Exploitation et transfert', text: 'Qui exploite le système après le lancement, comment la qualité est-elle surveillée, et comment la maîtrise passe-t-elle à votre équipe ? Un plan qui prévoit une sortie est bon signe.' },
        { title: 'Couverture linguistique', text: 'En Suisse, le travail se fait en français, en allemand et en anglais, souvent dans la même semaine. Assurez-vous que l’équipe peut travailler, documenter et former dans votre langue.' },
      ],
    },
    faq: {
      eyebrow: '[ 08 — FAQ ]',
      title: { pre: 'Conseil en IA en Suisse : ', accent: 'les questions', post: ' qu’on nous pose.' },
    },
    faqIds: ['what-ai-consulting', 'who-is-emineon', 'outside-geneva', 'services', 'how-fast', 'pricing', 'data-switzerland', 'finma', 'eu-ai-act', 'vs-large'],
  },

  geneva: {
    meta: {
      title: 'Conseil en IA à Genève',
      description:
        'Cabinet de conseil en IA à Vandœuvres (Genève). Systèmes agentiques pour le négoce, la banque privée et les organisations internationales, en production.',
    },
    hero: {
      eyebrow: '[ Conseil en IA · Genève ]',
      title: { pre: 'Conseil en intelligence artificielle à Genève, pour ', accent: 'le négoce, la banque privée', post: ' et la Genève internationale.' },
      lead: 'Emineon est un cabinet de conseil en IA dont le siège est à Vandœuvres, à Genève. Notre équipe senior et nos forward-deployed engineers construisent des systèmes agentiques pour les maisons de négoce, les banques privées et les organisations internationales de la ville, les exploitent en production dans le respect de la protection des données suisse et forment ceux qui les utilisent.',
    },
    context: {
      eyebrow: '[ 01 — Pourquoi Genève ]',
      title: { pre: 'Une ville de documents, de langues ', accent: 'et de régulateurs.' },
      paragraphs: [
        'L’économie genevoise repose sur un travail auquel l’IA se prête bien et qui doit être fait avec soin : confirmations de transactions et lettres de crédit, dossiers clients et revues périodiques, rapports et archives dans plusieurs langues officielles.',
        'Ces mêmes entreprises sont surveillées, auditées et tenues à la confidentialité. C’est pourquoi nous construisons ici, avec ceux qui font le travail, plutôt que de livrer un outil générique conçu ailleurs.',
      ],
      stats: [
        { value: 'N° 1', label: 'Genève est la première place mondiale du financement du négoce ; 12 des 14 banques suisses actives dans ce domaine y sont établies.', source: 'ge.ch, secteurs clés' },
        { value: '~400', label: 'Sociétés de négoce à Genève, environ 6 000 emplois.', source: 'ge.ch, secteurs clés' },
        { value: '37 000+', label: 'Emplois dans le secteur financier à Genève.', source: 'ge.ch, secteurs clés' },
        { value: '400+', label: 'Entreprises des arômes et parfums dans la région genevoise, environ 10 000 emplois.', source: 'ge.ch, secteurs clés' },
      ],
    },
    sectors: {
      eyebrow: '[ 02 — Secteurs genevois ]',
      title: { pre: 'Trois secteurs où Genève ', accent: 'mène.' },
      lead: 'Nos secteurs clés sont ceux qui font Genève. Chacun a ses documents, ses régulateurs et ses modes de défaillance.',
      items: [
        {
          industry: 'commodities-trading',
          title: 'Négoce de matières premières et shipping',
          text: 'Des agents qui lisent les confirmations, les rapprochent des transactions enregistrées et transmettent les exceptions avec leur contexte, ainsi qu’un appui sur les documents de financement du négoce et le reporting des opérations.',
        },
        {
          industry: 'banking-wealth',
          title: 'Banques privées et gestionnaires de fortune',
          text: 'Des revues KYC périodiques préparées pour une décision humaine, un reporting client en plusieurs langues et des contrôles conçus autour des attentes de la FINMA en matière d’IA.',
        },
        {
          industry: 'international-organisations',
          title: 'Organisations internationales et ONG',
          text: 'Des chaînes documentaires multilingues, une mémoire institutionnelle consultable et une aide à la rédaction, dans le respect des règles de confidentialité et de protection des données propres aux organismes internationaux.',
        },
      ],
    },
    onsite: {
      eyebrow: '[ 03 — Sur site à Genève ]',
      title: { pre: 'Des ingénieurs dans vos bureaux, ', accent: 'pas', post: ' dans une file de tickets.' },
      paragraphs: [
        'Nos forward-deployed engineers travaillent dans vos locaux à Genève pour le cadrage, la réalisation et le transfert. Ils participent à vos points quotidiens, lisent la file d’exceptions et parlent avec ceux qui font le travail : les exigences viennent du terrain, pas d’un atelier.',
        'Notre siège, Route de Vandœuvres 77A, est à quelques minutes en voiture des banques, des maisons de négoce et des organisations internationales avec lesquelles nous travaillons. Lausanne et le reste de la Suisse romande sont facilement accessibles.',
      ],
      points: [
        { title: 'Senior, local, responsable', text: 'Une petite équipe senior à Genève répond du résultat et porte la relation.' },
        { title: 'De la capacité en appui', text: 'Notre réseau de delivery mondial ajoute de la capacité de réalisation et d’exploitation 24 heures sur 24.' },
        { title: 'Français, anglais, allemand', text: 'Ateliers, documentation et formation dans la langue de travail de votre équipe.' },
      ],
    },
    data: {
      eyebrow: '[ 04 — Données et réglementation ]',
      title: { pre: 'Confidentiel ', accent: 'par défaut.' },
      items: [
        { title: 'Protection des données suisse', text: 'Conçu pour la nLPD dès le départ, sur une infrastructure hébergée en Suisse ou dans votre propre tenant cloud lorsque les données l’exigent.' },
        { title: 'Établissements assujettis', text: 'Pour les banques et les gestionnaires de fortune, les contrôles suivent la communication FINMA sur la surveillance 08/2024 : inventaire, classification des risques, tests, surveillance et documentation.' },
        { title: 'Organisations internationales', text: 'Les organismes internationaux appliquent souvent leurs propres règles de protection des données et de confidentialité. Nous concevons selon ces règles et documentons la manière dont le système les respecte.' },
      ],
    },
    work: {
      eyebrow: '[ 05 — Missions représentatives ]',
      title: { pre: 'Conçu pour les secteurs ', accent: 'clés', post: ' de Genève.' },
      lead: 'Anonymisées sous NDA et présentées comme représentatives.',
    },
    faq: {
      eyebrow: '[ 06 — FAQ ]',
      title: { pre: 'Conseil en IA à Genève : ', accent: 'les questions', post: ' qu’on nous pose.' },
    },
    faqIds: ['where-based', 'fde', 'how-fast', 'data-switzerland', 'languages', 'contact'],
    faqExtra: [
      {
        q: 'Travaillez-vous avec des négociants en matières premières à Genève ?',
        a: 'Oui. Le négoce de matières premières et le shipping font partie de nos trois secteurs clés. Les systèmes types rapprochent les confirmations des transactions enregistrées, appuient la documentation du financement du négoce et transmettent les exceptions à la bonne personne avec tout le contexte.',
      },
      {
        q: 'Pouvez-vous travailler sur site à Genève ?',
        a: 'Oui. Notre siège est à Vandœuvres et nos forward-deployed engineers travaillent dans les locaux de nos clients à Genève pour le cadrage, la réalisation et le transfert.',
      },
      {
        q: 'Travaillez-vous avec les organisations internationales et les ONG à Genève ?',
        a: 'Oui. Les organisations internationales et les ONG font partie de nos secteurs clés. Nous construisons des chaînes documentaires multilingues et des archives consultables, conçues autour des règles de confidentialité et de protection des données auxquelles ces organismes sont soumis.',
      },
    ],
  },

  governance: {
    meta: {
      title: 'Gouvernance IA en Suisse : FINMA, nLPD, AI Act',
      description:
        'Ce que la communication FINMA 08/2024, la nLPD et l’AI Act impliquent pour vos systèmes d’IA, et nos contrôles : inventaire, évaluations, journaux.',
    },
    hero: {
      eyebrow: '[ Confiance & gouvernance ]',
      title: { pre: 'La gouvernance de l’IA pour les entreprises suisses, ', accent: 'intégrée au système', post: ' dès le départ.' },
      lead: 'Les entreprises suisses qui utilisent l’IA répondent à la nLPD, à des autorités de surveillance sectorielles comme la FINMA et, lorsqu’elles servent le marché de l’UE, à l’AI Act européen. Cette page résume ce que chacun exige concrètement d’un système d’IA, et les contrôles qu’Emineon intègre à chaque système pour que les preuves existent dès le premier jour.',
    },
    frameworks: {
      eyebrow: '[ 01 — Les cadres ]',
      title: { pre: 'Quatre sources de règles, ', accent: 'une seule', post: ' conception du système.' },
      lead: 'Une synthèse de praticien, pas un avis juridique. Consultez les sources primaires et votre conseil juridique pour les obligations qui vous concernent.',
      items: [
        {
          key: 'finma',
          name: 'Communication FINMA sur la surveillance 08/2024',
          scope: 'Banques, assureurs, gestionnaires de fortune et autres établissements assujettis à la FINMA.',
          summary:
            'La communication de la FINMA sur la gouvernance et la gestion des risques lorsque les établissements assujettis utilisent l’IA. Elle décrit ce que l’autorité de surveillance s’attend à voir et cadre le dialogue prudentiel sur l’IA.',
          points: [
            'Savoir quelles applications d’IA vous exploitez : un inventaire tenu à jour, avec des responsables clairement désignés.',
            'Classer chaque application selon son risque et la gérer en conséquence.',
            'Veiller à la qualité des données, aux tests et à une surveillance continue.',
            'Tenir une documentation qui rend les résultats explicables et vérifiables.',
          ],
          source: 'FINMA · Communication sur la surveillance 08/2024',
        },
        {
          key: 'nfadp',
          name: 'nLPD (loi fédérale révisée sur la protection des données)',
          scope: 'Toute organisation qui traite des données personnelles en Suisse.',
          summary:
            'En vigueur depuis le 1er septembre 2023. Elle s’applique aux systèmes d’IA comme à tout traitement de données personnelles, avec quelques obligations qui comptent particulièrement pour l’IA.',
          points: [
            'Protection des données dès la conception et par défaut.',
            'Transparence, y compris sur les décisions individuelles automatisées.',
            'Un registre des activités de traitement (avec une exemption pour certaines petites entreprises à faible risque).',
            'Des analyses d’impact pour les traitements à risque élevé, et l’annonce des violations au PFPDT.',
          ],
          source: 'Confédération suisse · nLPD · guides du PFPDT',
        },
        {
          key: 'euaiact',
          name: 'AI Act européen',
          scope: 'Les entreprises suisses qui mettent des systèmes d’IA sur le marché de l’UE, ou dont les résultats produits par l’IA sont utilisés dans l’UE.',
          summary:
            'Un règlement européen fondé sur les risques, dont les obligations entrent en application progressivement sur plusieurs années. Il peut toucher les entreprises suisses par leurs activités dans l’UE, même si la Suisse n’en est pas membre.',
          points: [
            'Les pratiques interdites, les systèmes à haut risque et les obligations de transparence sont traités différemment.',
            'Les systèmes à haut risque exigent gestion des risques, gouvernance des données, documentation, journalisation et supervision humaine.',
            'Certaines obligations incombent aux fournisseurs, d’autres aux déployeurs : sachez quel rôle vous jouez.',
            'Les dates d’application ont déjà été modifiées : vérifiez le calendrier en vigueur pour votre cas d’usage.',
          ],
          source: 'Union européenne · AI Act (règlement sur l’IA)',
        },
        {
          key: 'swiss',
          name: 'L’approche propre à la Suisse',
          scope: 'Toute entité active en Suisse.',
          summary:
            'La Suisse a choisi de ne pas copier l’AI Act européen. L’approche du Conseil fédéral consiste à ratifier la Convention du Conseil de l’Europe sur l’IA et à adapter le droit suisse secteur par secteur lorsque c’est nécessaire.',
          points: [
            'Le droit existant (protection des données, surveillance sectorielle, responsabilité) s’applique déjà à l’IA aujourd’hui.',
            'D’autres modifications sont attendues, selon la procédure de consultation habituelle.',
            'Concevoir dès maintenant pour la transparence et la supervision humaine rend les changements futurs peu coûteux.',
          ],
          source: 'Conseil fédéral · OFCOM',
        },
      ],
    },
    table: {
      eyebrow: '[ 02 — En un coup d’œil ]',
      title: { pre: 'Ce que chacun exige, et ', accent: 'ce que nous construisons.' },
      columns: { framework: 'Cadre', concerns: 'Concerne', asks: 'Exige, en bref', build: 'Ce que nous intégrons' },
      rows: [
        { framework: 'FINMA 08/2024', concerns: 'Établissements financiers assujettis', asks: 'Inventaire, classification des risques, qualité des données, tests, surveillance, documentation', build: 'Registre des systèmes, niveaux de risque, suites d’évaluation, surveillance et alertes, journaux de décision' },
        { framework: 'nLPD', concerns: 'Quiconque traite des données personnelles en Suisse', asks: 'Protection dès la conception, transparence, registre, analyses d’impact, annonce des violations', build: 'Cartographie des données, minimisation, hébergement en Suisse ou dans votre tenant, éléments pour l’AIPD, piste d’audit' },
        { framework: 'AI Act européen', concerns: 'Entreprises suisses exposées au marché de l’UE', asks: 'Obligations selon le risque : documentation, journalisation, supervision humaine pour les usages à haut risque', build: 'Documentation technique, journalisation des événements, files de revue humaine, cartographie des rôles' },
        { framework: 'Approche suisse', concerns: 'Toute entité en Suisse', asks: 'Le droit existant aujourd’hui, des adaptations sectorielles ensuite', build: 'Des systèmes transparents et vérifiables, qui s’adaptent sans être reconstruits' },
      ],
    },
    controls: {
      eyebrow: '[ 03 — Les contrôles que nous intégrons ]',
      title: { pre: 'Les preuves existent ', accent: 'dès le premier jour.' },
      lead: 'La gouvernance coûte le moins cher lorsqu’elle fait partie de l’architecture. Ces contrôles accompagnent chaque système Emineon, dimensionnés selon son risque.',
      items: [
        { icon: 'branch', title: 'Inventaire IA', text: 'Chaque système, modèle et version de prompt est enregistré avec un responsable, une finalité et un niveau de risque.' },
        { icon: 'evals', title: 'Évaluations', text: 'Un jeu d’évaluation écrit avant le premier prompt, exécuté à chaque modification et en production : la qualité est mesurée, pas supposée.' },
        { icon: 'operations', title: 'Journalisation et piste d’audit', text: 'Entrées, sorties, appels d’outils et validations sont journalisés, pour que chaque résultat puisse être retracé et expliqué.' },
        { icon: 'fde', title: 'Revue humaine', text: 'Des personnes valident là où cela compte, avec des seuils et des files de revue conçus avec les équipes qui portent la décision.' },
        { icon: 'residency', title: 'Données hébergées en Suisse', text: 'En Suisse ou dans votre propre tenant lorsque c’est nécessaire. Données minimisées, jamais utilisées pour entraîner des modèles de tiers.' },
        { icon: 'shield', title: 'Documentation', text: 'Documentation technique, cartographie des données et éléments pour l’AIPD, tenus à jour à mesure que le système évolue.' },
      ],
    },
    reading: {
      eyebrow: '[ 04 — Pour aller plus loin ]',
      title: { pre: 'Tiré de nos ', accent: 'analyses.' },
    },
    insightSlugs: ['nfadp-and-ai-in-practice', 'evals-are-the-new-qa', 'from-pilot-to-production'],
    services: {
      eyebrow: '[ 05 — Services ]',
      title: { pre: 'Où la gouvernance ', accent: 's’inscrit', post: ' dans notre travail.' },
      lead: 'La gouvernance n’est pas un projet à part. Elle fait partie de la manière dont nous exploitons les systèmes et dont nous préparons vos équipes à s’en servir.',
    },
    faq: {
      eyebrow: '[ 06 — FAQ ]',
      title: { pre: 'Réglementation de l’IA en Suisse : ', accent: 'les questions', post: ' qu’on nous pose.' },
    },
    faqIds: ['finma', 'eu-ai-act', 'nfadp', 'data-switzerland', 'model-agnostic', 'agentic-ai'],
    disclaimer:
      'Cette page est une synthèse de praticien destinée à l’orientation, pas un avis juridique. Les textes réglementaires et les calendriers évoluent : consultez les sources primaires (FINMA, PFPDT, Conseil fédéral et Union européenne) et votre conseil juridique avant de vous y fier.',
  },
};
