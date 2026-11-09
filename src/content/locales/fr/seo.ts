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
      'ai-operations': 'Opérations IA, LLMOps, évaluations, supervision et gouvernance',
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
    title: { pre: 'L’essentiel, ', accent: 'en une page.' },
    definition:
      'Emineon est un cabinet de conseil natif de l’IA, basé à Genève, en Suisse. Nous définissons la stratégie IA, construisons des systèmes agentiques en production et accompagnons l’adoption dans l’entreprise. Une seule équipe suit le projet. Nous sommes rémunérés sur les résultats plutôt qu’à l’heure.',
    items: [
      { label: 'Activité', value: 'Cabinet de conseil natif de l’IA. Stratégie IA, systèmes agentiques en production, plateformes data et IA, opérations IA, adoption' },
      { label: 'Siège', value: 'Route de Vandœuvres 77A, 1253 Vandœuvres, Genève, Suisse' },
      { label: 'Centres de delivery', value: 'Genève · Hô Chi Minh-Ville · Hanoï · Tokyo · Melbourne · Silicon Valley · Texas' },
      { label: 'Réseau', value: '130+ ingénieurs · 200+ projets livrés' },
      { label: 'Modèle d’intervention', value: 'Évaluer (diagnostic à prix fixe) → Construire (prix par jalon et au résultat) → Opérer (exploiter, consolider, transférer)' },
      { label: 'Programme phare', value: '30 jours, de l’état des lieux à un premier workflow en production' },
      { label: 'Équipes', value: 'De petites équipes seniors et des forward-deployed engineers sur site, avec l’appui du réseau de delivery' },
      { label: 'Rémunération', value: 'Sur les résultats' },
      { label: 'Langues', value: 'Anglais, français, allemand' },
      { label: 'Données et conformité', value: 'Hébergement des données en Suisse possible · nLPD (en vigueur depuis le 1er septembre 2023) · communication FINMA sur la surveillance 08/2024 · RGPD · préparation à l’AI Act européen · indépendant des modèles' },
      { label: 'Secteurs', value: 'Négoce de matières premières et shipping · banque privée et gestion de fortune · organisations internationales et ONG · sciences de la vie et MedTech · parfumerie, arômes et chimie de spécialité · industrie et production' },
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
        a: 'Il aide une organisation à choisir où l’IA est utile. Il construit les systèmes et aide les équipes à s’en servir. Chez Emineon, cela commence par un diagnostic avec business cases et feuille de route. Viennent ensuite des systèmes agentiques construits et exploités en production. La formation et la gouvernance accompagnent l’adoption.',
      },
      {
        id: 'who-is-emineon',
        group: 'firm',
        q: 'Qui est Emineon ?',
        a: 'Emineon est un cabinet de conseil natif de l’IA, basé à Genève, en Suisse. Nous travaillons en petites équipes seniors, qui utilisent l’IA au quotidien. Un réseau de delivery de 130+ ingénieurs nous appuie. Nous accompagnons nos clients de la stratégie IA avec la direction jusqu’aux systèmes en production.',
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
        a: 'Oui. Nous travaillons dans toute la Suisse, notamment à Lausanne, Zurich, Bâle et Berne, et à l’international. Nos forward-deployed engineers viennent sur site, avec votre équipe.',
      },
      {
        id: 'industries',
        group: 'firm',
        q: 'Sur quels secteurs vous concentrez-vous ?',
        a: 'Nos trois secteurs clés sont ceux de Genève. Le négoce de matières premières et le shipping, la banque privée et la gestion de fortune, les organisations internationales et les ONG. Nous travaillons aussi dans les sciences de la vie et la MedTech, la parfumerie, les arômes et la chimie de spécialité, et l’industrie.',
      },
      {
        id: 'services',
        group: 'firm',
        q: 'Quels services proposez-vous ?',
        a: 'Nous proposons cinq services. La stratégie IA (maturité, business cases, feuille de route, politique). Les systèmes agentiques. Les plateformes data et IA. Les opérations IA (LLMOps, évaluations, supervision, gouvernance). L’adoption et la montée en compétences (formation, conduite du changement, politique IA).',
      },
      {
        id: 'how-start',
        group: 'engagements',
        q: 'Comment commence une mission ?',
        a: 'Par la phase Évaluer. C’est un diagnostic à prix fixe. Il couvre la maturité IA, des cas d’usage priorisés avec leur ROI, les données et les risques, la politique IA et une feuille de route. Il se termine par le choix de ce qu’il faut construire en premier.',
      },
      {
        id: 'how-fast',
        group: 'engagements',
        q: 'En combien de temps un premier workflow d’IA peut-il être en production ?',
        a: 'Notre sprint va de l’état des lieux à un premier workflow en production en 30 jours. Cela vaut pour un cas d’usage bien cadré, avec un accès aux données déjà en place.',
      },
      {
        id: 'pricing',
        group: 'engagements',
        q: 'Comment fixez-vous vos prix ?',
        a: 'Les diagnostics sont à prix fixe. Les réalisations sont facturées par jalon. Lorsque le résultat est mesurable, une partie est liée au résultat.',
      },
      {
        id: 'fde',
        group: 'engagements',
        q: 'Que sont les forward-deployed engineers ?',
        a: 'Ce sont des ingénieurs seniors qui travaillent dans votre équipe, à Genève ou sur votre site. Ils apprennent le workflow sur place et livrent le système avec vous. Le réseau de delivery prend en charge le passage à l’échelle.',
      },
      {
        id: 'agentic-ai',
        group: 'technology',
        q: 'Qu’est-ce que l’IA agentique, et peut-on l’utiliser en production ?',
        a: 'Un système agentique utilise des modèles de langage pour planifier et exécuter des tâches en plusieurs étapes. Il s’appuie sur des outils. Il lit des documents, vérifie des systèmes et prépare des actions. Une personne valide là où c’est important. En production, il faut un périmètre clair, des évaluations, la journalisation et une revue humaine dès le départ.',
      },
      {
        id: 'data-switzerland',
        group: 'technology',
        q: 'Nos données peuvent-elles rester en Suisse ?',
        a: 'Oui. Si nécessaire, nous déployons sur une infrastructure hébergée en Suisse ou dans votre propre tenant cloud. La nLPD est prise en compte dès le départ. Vos données restent les vôtres et ne servent pas à entraîner des modèles de tiers.',
      },
      {
        id: 'model-agnostic',
        group: 'technology',
        q: 'Êtes-vous liés à un modèle ou à un fournisseur d’IA ?',
        a: 'Non. Nous choisissons le modèle tâche par tâche selon la qualité, le coût et les contraintes sur les données. Vous pouvez changer de fournisseur sans tout reconstruire.',
      },
      {
        id: 'finma',
        group: 'regulation',
        q: 'Que change la communication FINMA sur la surveillance 08/2024 pour l’IA dans une banque ou chez un gestionnaire de fortune ?',
        a: 'La communication FINMA 08/2024 décrit ce que l’autorité attend des établissements assujettis qui utilisent l’IA. Elle porte sur la gouvernance et la gestion des risques. En pratique, il faut savoir quelles applications d’IA tournent et qui en est responsable. Il faut connaître le niveau de risque de chacune. Il faut aussi assurer la qualité des données, les tests, la surveillance et la documentation. Nous intégrons ces contrôles au système.',
      },
      {
        id: 'eu-ai-act',
        group: 'regulation',
        q: 'L’AI Act européen s’applique-t-il aux entreprises suisses ?',
        a: 'Cela peut être le cas. L’AI Act vise les fournisseurs qui mettent des systèmes d’IA sur le marché de l’UE. Il vise aussi, dans certains cas, des acteurs hors de l’UE dont les résultats d’IA sont utilisés dans l’UE. La Suisse ne copie pas le règlement européen. Le Conseil fédéral a choisi de ratifier la Convention du Conseil de l’Europe sur l’IA et d’adapter le droit suisse secteur par secteur.',
      },
      {
        id: 'nfadp',
        group: 'regulation',
        q: 'Quel est l’impact de la nLPD sur les projets d’IA ?',
        a: 'La loi fédérale révisée sur la protection des données est en vigueur depuis le 1er septembre 2023. Pour l’IA, elle demande la protection des données dès la conception et par défaut. Elle demande aussi la transparence sur les décisions automatisées et un registre des traitements. S’y ajoutent des analyses d’impact pour les traitements à risque élevé et l’annonce des violations au PFPDT. Nous en tenons compte dès la conception.',
      },
      {
        id: 'after-live',
        group: 'engagements',
        q: 'Que se passe-t-il une fois le système en production ?',
        a: 'C’est la phase Opérer. Nous exploitons, surveillons et consolidons le système, avec évaluations et alertes. Ensuite, nous continuons à l’exploiter ou le transférons à votre équipe, avec documentation et formation. Le déploiement dans vos autres entités se fait dans cette même phase.',
      },
      {
        id: 'success',
        group: 'engagements',
        q: 'Comment mesurez-vous la réussite ?',
        a: 'Par rapport au business case validé pendant la phase Évaluer. Heures rendues aux équipes, délais de traitement, taux d’erreur, volumes traités ou chiffre d’affaires, mesurés avant et après. Les évaluations suivent ensuite la qualité en continu.',
      },
      {
        id: 'training',
        group: 'engagements',
        q: 'Formez-vous aussi nos équipes ?',
        a: 'Oui. L’adoption et la montée en compétences couvrent la formation par métier, la politique IA, la conduite du changement et les relais internes. Un système n’a de valeur que s’il est utilisé.',
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
        a: 'Une petite équipe senior vous accompagne de la stratégie jusqu’au système en production. Elle reste ensuite pour l’exploiter. Il n’y a pas de transmission à un intégrateur distinct. Nous sommes rémunérés sur les résultats. Nous nous concentrons sur les secteurs réglementés et documentaires de Genève.',
      },
      {
        id: 'contact',
        group: 'firm',
        q: 'Comment entamer la discussion ?',
        a: 'Écrivez à hello@emineon.com ou utilisez le formulaire de contact. Un premier appel permet de voir ce qui convient. La phase Évaluer, un sprint de 30 jours ou une réalisation ciblée.',
      },
    ],
  },

  faqPage: {
    meta: {
      title: 'FAQ conseil en IA : services, prix, données, réglementation',
      description:
        'Réponses sur Emineon et le conseil en IA en Suisse. Services, sprint de 30 jours, rémunération au résultat, données en Suisse, nLPD, FINMA et AI Act.',
    },
    hero: {
      eyebrow: '[ FAQ ]',
      title: { pre: 'Les questions qu’on nous pose ', accent: 'le plus', post: ' souvent.' },
      lead: 'Des réponses courtes, classées par thème. Si votre question n’y figure pas, écrivez à hello@emineon.com. Un membre senior de l’équipe vous répond sous un jour ouvrable.',
    },
  },

  switzerland: {
    meta: {
      title: 'Conseil en IA en Suisse',
      description:
        'Cabinet de conseil en IA basé à Genève. Stratégie IA, systèmes agentiques en production, gouvernance nLPD, FINMA et AI Act. Rémunéré sur les résultats.',
    },
    hero: {
      eyebrow: '[ Conseil en IA · Suisse ]',
      title: { pre: 'Conseil en intelligence artificielle en Suisse, ', accent: 'de la stratégie aux systèmes', post: ' en production.' },
      lead: 'Emineon est un cabinet de conseil en IA basé à Genève. Nous aidons les entreprises suisses à choisir où l’IA est rentable. Nous construisons des systèmes agentiques en production, hébergés en Suisse ou chez le client. Nous formons les équipes, en français, en allemand et en anglais. Une seule équipe senior, rémunérée sur les résultats.',
    },
    services: {
      eyebrow: '[ 01 · Ce que nous faisons en Suisse ]',
      title: { pre: 'Cinq services, une seule équipe, ', accent: 'un résultat', post: ' suivi.' },
      lead: 'Chaque service fonctionne seul. La plupart de nos clients suisses en combinent deux ou trois. Une stratégie choisit les premiers workflows. Un système les exécute. L’exploitation et la formation les gardent en usage.',
    },
    engagement: {
      eyebrow: '[ 02 · Comment se déroulent nos missions ]',
      title: { pre: 'Évaluer, construire, opérer, avec un prix lié au ', accent: 'résultat.' },
      lead: 'Chaque mission suit les mêmes étapes. Chaque étape a un périmètre fixe, une logique de prix claire et un résultat vérifiable. Vous décidez ensuite de la suivante. Le sprint mène un cas d’usage bien cadré de l’état des lieux à un premier workflow en production en 30 jours.',
      columns: { stage: 'Étape', what: 'Ce que vous obtenez', pricing: 'Tarification', duration: 'Durée type' },
    },
    swiss: {
      eyebrow: '[ 03 · Spécificités suisses ]',
      title: { pre: 'Conçu pour la façon dont la Suisse ', accent: 'encadre', post: ' les données et l’IA.' },
      lead: 'Les entreprises suisses ont leur propre loi sur la protection des données et des autorités de surveillance sectorielles. Souvent, des règles européennes s’ajoutent. Nous en tenons compte dès la conception.',
      items: [
        {
          title: 'Données hébergées en Suisse',
          text: 'Les systèmes tournent sur une infrastructure hébergée en Suisse ou dans votre tenant cloud si les données l’exigent. Vous choisissez la région et nous la documentons. Les données des clients ne servent pas à entraîner des modèles de tiers.',
        },
        {
          title: 'La nLPD dès la conception',
          text: 'La loi fédérale révisée sur la protection des données s’applique depuis le 1er septembre 2023. Protection dès la conception et par défaut, registre des traitements, analyses d’impact, annonce des violations au PFPDT. Tout cela fait partie du plan de réalisation dès le début.',
        },
        {
          title: 'Les attentes de la FINMA',
          text: 'Pour les banques, les gestionnaires de fortune et les autres établissements assujettis, la communication FINMA 08/2024 fixe le cadre de gouvernance de l’IA. Nous intégrons au système l’inventaire, la classification des risques, les tests, la surveillance et la documentation.',
        },
        {
          title: 'La portée de l’AI Act européen',
          text: 'La Suisse ne copie pas l’AI Act européen. Il peut toutefois s’appliquer si une entreprise suisse sert le marché de l’UE ou si les résultats de son IA y sont utilisés. Nous en tenons compte dès le départ. La documentation est prête le jour où elle est demandée.',
        },
      ],
      cta: { label: 'Gouvernance IA en Suisse', href: '/ai-governance-switzerland' },
    },
    sectors: {
      eyebrow: '[ 04 · Secteurs ]',
      title: { pre: 'Des secteurs importants pour ', accent: 'l’économie', post: ' suisse.' },
      lead: 'Nous travaillons surtout sur des activités réglementées, documentaires et multilingues. L’IA y fait gagner du temps et demande de la rigueur. Trois secteurs clés sont ceux de Genève. Trois secteurs voisins couvrent la Suisse romande et le reste du pays.',
    },
    where: {
      eyebrow: '[ 05 · Où nous travaillons ]',
      title: { pre: 'Ancrés à Genève, ', accent: 'sur site', post: ' dans toute la Suisse.' },
      lead: 'La direction des missions et les forward-deployed engineers sont basés à Genève. Les ingénieurs se déplacent chez nos clients. Notre réseau de delivery ajoute de la capacité, sur plusieurs fuseaux horaires.',
      places: [
        { title: 'Genève', text: 'Siège à Vandœuvres. Maisons de négoce, banques privées et organisations internationales à quelques minutes en voiture.' },
        { title: 'Lausanne et le canton de Vaud', text: 'Depuis Genève, sur site quand le travail le demande. Sciences de la vie, industrie et recherche publique.' },
        { title: 'Zurich', text: 'Nous suivons nos clients zurichois depuis Genève, avec des ingénieurs sur site pour le cadrage, la réalisation et le transfert.' },
        { title: 'Bâle', text: 'Sciences de la vie et chimie de spécialité, depuis Genève. Sur site lorsque des données réglementées l’exigent.' },
        { title: 'Berne', text: 'Organisations fédérales et réglementées, depuis Genève, en français ou en allemand.' },
        { title: 'Tessin', text: 'Depuis Genève, pour les missions qui correspondent à nos secteurs et à nos langues.' },
      ],
      note: 'Genève est notre seul bureau en Suisse. Partout ailleurs, nous venons à vous.',
      cta: { label: 'Conseil en IA à Genève', href: '/ai-consulting-geneva' },
    },
    work: {
      eyebrow: '[ 06 · Missions représentatives ]',
      title: { pre: 'Des systèmes en production, ', accent: 'mesurés.' },
      lead: 'Anonymisées sous NDA et présentées comme représentatives. Chacune indique la situation de départ, ce que nous avons construit et ce qui a changé.',
    },
    choose: {
      eyebrow: '[ 07 · Comment choisir ]',
      title: { pre: 'Comment choisir un cabinet de conseil en IA ', accent: 'en Suisse.' },
      lead: 'Six questions à poser à un cabinet, y compris au nôtre. Les réponses montrent ce qu’il livre concrètement.',
      items: [
        { title: 'Des preuves en production', text: 'Demandez des systèmes en service aujourd’hui, avec une situation de départ et un résultat mesuré. Un pilote ou une démo en dit moins.' },
        { title: 'Localisation des données', text: 'Demandez où vos données seront traitées et stockées, et qui peut y accéder. Demandez aussi si elles serviront à entraîner un modèle. Gardez la réponse par écrit.' },
        { title: 'Maîtrise des secteurs réglementés', text: 'Si vous êtes assujetti, le cabinet doit connaître la communication FINMA 08/2024, la nLPD et, le cas échéant, l’AI Act européen. Il doit pouvoir montrer comment ses systèmes y répondent.' },
        { title: 'Modèle de tarification', text: 'La facturation à l’heure paie le temps passé. Le prix fixe et la rémunération au résultat paient les résultats. Demandez quels risques le cabinet accepte de partager.' },
        { title: 'Exploitation et transfert', text: 'Demandez qui exploite le système après le lancement et comment la qualité est suivie. Demandez aussi comment votre équipe reprend la main. Un plan qui prévoit une sortie est bon signe.' },
        { title: 'Couverture linguistique', text: 'En Suisse, on travaille en français, en allemand et en anglais, souvent dans la même semaine. Vérifiez que l’équipe peut travailler, documenter et former dans votre langue.' },
      ],
    },
    faq: {
      eyebrow: '[ 08 · FAQ ]',
      title: { pre: 'Conseil en IA en Suisse, ', accent: 'les questions', post: ' fréquentes.' },
    },
    faqIds: ['what-ai-consulting', 'who-is-emineon', 'outside-geneva', 'services', 'how-fast', 'pricing', 'data-switzerland', 'finma', 'eu-ai-act', 'vs-large'],
  },

  geneva: {
    meta: {
      title: 'Conseil en IA à Genève',
      description:
        'Cabinet de conseil en IA à Vandœuvres (Genève). Systèmes agentiques en production pour le négoce, la banque privée et les organisations internationales.',
    },
    hero: {
      eyebrow: '[ Conseil en IA · Genève ]',
      title: { pre: 'Conseil en intelligence artificielle à Genève, pour ', accent: 'le négoce, la banque privée', post: ' et la Genève internationale.' },
      lead: 'Emineon est un cabinet de conseil en IA basé à Vandœuvres, à Genève. Notre équipe senior et nos forward-deployed engineers construisent des systèmes agentiques. Nous travaillons pour les maisons de négoce, les banques privées et les organisations internationales de la ville. Nous exploitons ces systèmes selon le droit suisse de la protection des données et formons les utilisateurs.',
    },
    context: {
      eyebrow: '[ 01 · Pourquoi Genève ]',
      title: { pre: 'Une ville de documents, de langues ', accent: 'et de régulateurs.' },
      paragraphs: [
        'Une grande partie du travail à Genève se prête bien à l’IA et demande du soin. Confirmations de transactions et lettres de crédit. Dossiers clients et revues périodiques. Rapports et archives dans plusieurs langues officielles.',
        'Ces entreprises sont surveillées, auditées et tenues à la confidentialité. Nous construisons donc sur place, avec les personnes qui font le travail.',
      ],
      stats: [
        { value: 'N° 1', label: 'Genève est la première place mondiale du financement du négoce. 12 des 14 banques suisses actives dans ce domaine y sont établies.', source: 'ge.ch, secteurs clés' },
        { value: '~400', label: 'Sociétés de négoce à Genève, environ 6 000 emplois.', source: 'ge.ch, secteurs clés' },
        { value: '37 000+', label: 'Emplois dans le secteur financier à Genève.', source: 'ge.ch, secteurs clés' },
        { value: '400+', label: 'Entreprises des arômes et parfums dans la région genevoise, environ 10 000 emplois.', source: 'ge.ch, secteurs clés' },
      ],
    },
    sectors: {
      eyebrow: '[ 02 · Secteurs genevois ]',
      title: { pre: 'Trois secteurs ', accent: 'genevois.' },
      lead: 'Nos secteurs clés sont ceux de Genève. Chacun a ses documents, ses régulateurs et ses risques propres.',
      items: [
        {
          industry: 'commodities-trading',
          title: 'Négoce de matières premières et shipping',
          text: 'Des agents lisent les confirmations et les rapprochent des transactions enregistrées. Ils transmettent les exceptions avec leur contexte. Ils aident aussi sur les documents de financement du négoce et le reporting des opérations.',
        },
        {
          industry: 'banking-wealth',
          title: 'Banques privées et gestionnaires de fortune',
          text: 'Des revues KYC périodiques préparées pour une décision humaine. Un reporting client en plusieurs langues. Des contrôles alignés sur les attentes de la FINMA en matière d’IA.',
        },
        {
          industry: 'international-organisations',
          title: 'Organisations internationales et ONG',
          text: 'Des chaînes documentaires multilingues, une mémoire institutionnelle consultable et une aide à la rédaction. Les règles de confidentialité et de protection des données propres à ces organismes sont respectées.',
        },
      ],
    },
    onsite: {
      eyebrow: '[ 03 · Sur site à Genève ]',
      title: { pre: 'Des ingénieurs dans ', accent: 'vos bureaux.' },
      paragraphs: [
        'Nos forward-deployed engineers travaillent dans vos locaux à Genève pour le cadrage, la réalisation et le transfert. Ils participent à vos points quotidiens et lisent la file d’exceptions. Ils parlent avec les personnes qui font le travail. Les exigences viennent du terrain.',
        'Notre siège, Route de Vandœuvres 77A, est à quelques minutes en voiture des banques, des maisons de négoce et des organisations internationales avec lesquelles nous travaillons. Lausanne et le reste de la Suisse romande sont facilement accessibles.',
      ],
      points: [
        { title: 'Senior, local, responsable', text: 'Une petite équipe senior à Genève suit le résultat et la relation.' },
        { title: 'De la capacité en appui', text: 'Notre réseau de delivery ajoute de la capacité de réalisation et d’exploitation.' },
        { title: 'Français, anglais, allemand', text: 'Ateliers, documentation et formation dans la langue de travail de votre équipe.' },
      ],
    },
    data: {
      eyebrow: '[ 04 · Données et réglementation ]',
      title: { pre: 'La confidentialité ', accent: 'dès le départ.' },
      items: [
        { title: 'Protection des données suisse', text: 'Conçu pour la nLPD dès le départ, sur une infrastructure hébergée en Suisse ou dans votre propre tenant cloud lorsque les données l’exigent.' },
        { title: 'Établissements assujettis', text: 'Pour les banques et les gestionnaires de fortune, les contrôles suivent la communication FINMA 08/2024. Inventaire, classification des risques, tests, surveillance et documentation.' },
        { title: 'Organisations internationales', text: 'Les organismes internationaux ont souvent leurs propres règles de protection des données et de confidentialité. Nous les suivons et documentons comment le système les respecte.' },
      ],
    },
    work: {
      eyebrow: '[ 05 · Missions représentatives ]',
      title: { pre: 'Conçu pour les secteurs ', accent: 'clés', post: ' de Genève.' },
      lead: 'Anonymisées sous NDA et présentées comme représentatives.',
    },
    faq: {
      eyebrow: '[ 06 · FAQ ]',
      title: { pre: 'Conseil en IA à Genève, ', accent: 'les questions', post: ' fréquentes.' },
    },
    faqIds: ['where-based', 'fde', 'how-fast', 'data-switzerland', 'languages', 'contact'],
    faqExtra: [
      {
        q: 'Travaillez-vous avec des négociants en matières premières à Genève ?',
        a: 'Oui. Le négoce de matières premières et le shipping font partie de nos trois secteurs clés. Nos systèmes rapprochent les confirmations des transactions enregistrées. Ils aident sur la documentation du financement du négoce. Ils transmettent les exceptions à la bonne personne avec le contexte.',
      },
      {
        q: 'Pouvez-vous travailler sur site à Genève ?',
        a: 'Oui. Notre siège est à Vandœuvres et nos forward-deployed engineers travaillent dans les locaux de nos clients à Genève pour le cadrage, la réalisation et le transfert.',
      },
      {
        q: 'Travaillez-vous avec les organisations internationales et les ONG à Genève ?',
        a: 'Oui. Les organisations internationales et les ONG font partie de nos secteurs clés. Nous construisons des chaînes documentaires multilingues et des archives consultables. Elles suivent les règles de confidentialité et de protection des données de ces organismes.',
      },
    ],
  },

  governance: {
    meta: {
      title: 'Gouvernance IA en Suisse : FINMA, nLPD, AI Act',
      description:
        'Ce que la communication FINMA 08/2024, la nLPD et l’AI Act impliquent pour vos systèmes d’IA. Et nos contrôles, inventaire, évaluations, journaux.',
    },
    hero: {
      eyebrow: '[ Confiance & gouvernance ]',
      title: { pre: 'La gouvernance de l’IA pour les entreprises suisses, ', accent: 'intégrée au système', post: ' dès le départ.' },
      lead: 'Les entreprises suisses qui utilisent l’IA relèvent de la nLPD et d’autorités sectorielles comme la FINMA. Si elles servent le marché de l’UE, l’AI Act européen s’ajoute. Cette page résume ce que chaque cadre demande à un système d’IA. Elle décrit aussi les contrôles qu’Emineon intègre dès le premier jour.',
    },
    frameworks: {
      eyebrow: '[ 01 · Les cadres ]',
      title: { pre: 'Quatre sources de règles, ', accent: 'une seule', post: ' conception du système.' },
      lead: 'Une synthèse de praticien, qui ne remplace pas un avis juridique. Pour vos obligations, consultez les sources primaires et votre conseil juridique.',
      items: [
        {
          key: 'finma',
          name: 'Communication FINMA sur la surveillance 08/2024',
          scope: 'Banques, assureurs, gestionnaires de fortune et autres établissements assujettis à la FINMA.',
          summary:
            'La communication de la FINMA sur la gouvernance et la gestion des risques lorsque les établissements assujettis utilisent l’IA. Elle décrit ce que l’autorité de surveillance s’attend à voir et cadre le dialogue prudentiel sur l’IA.',
          points: [
            'Savoir quelles applications d’IA vous exploitez. Un inventaire tenu à jour, avec des responsables désignés.',
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
            'Certaines obligations incombent aux fournisseurs, d’autres aux déployeurs. Il faut savoir quel rôle vous jouez.',
            'Les dates d’application ont déjà été modifiées. Vérifiez le calendrier en vigueur pour votre cas d’usage.',
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
            'Prévoir dès maintenant la transparence et la supervision humaine réduit le coût des changements futurs.',
          ],
          source: 'Conseil fédéral · OFCOM',
        },
      ],
    },
    table: {
      eyebrow: '[ 02 · En un coup d’œil ]',
      title: { pre: 'Ce que chaque cadre demande, et ', accent: 'ce que nous construisons.' },
      columns: { framework: 'Cadre', concerns: 'Concerne', asks: 'Exige, en bref', build: 'Ce que nous intégrons' },
      rows: [
        { framework: 'FINMA 08/2024', concerns: 'Établissements financiers assujettis', asks: 'Inventaire, classification des risques, qualité des données, tests, surveillance, documentation', build: 'Registre des systèmes, niveaux de risque, suites d’évaluation, surveillance et alertes, journaux de décision' },
        { framework: 'nLPD', concerns: 'Quiconque traite des données personnelles en Suisse', asks: 'Protection dès la conception, transparence, registre, analyses d’impact, annonce des violations', build: 'Cartographie des données, minimisation, hébergement en Suisse ou dans votre tenant, éléments pour l’AIPD, piste d’audit' },
        { framework: 'AI Act européen', concerns: 'Entreprises suisses exposées au marché de l’UE', asks: 'Obligations selon le risque. Documentation, journalisation, supervision humaine pour les usages à haut risque', build: 'Documentation technique, journalisation des événements, files de revue humaine, cartographie des rôles' },
        { framework: 'Approche suisse', concerns: 'Toute entité en Suisse', asks: 'Le droit existant aujourd’hui, des adaptations sectorielles ensuite', build: 'Des systèmes transparents et vérifiables, qui s’adaptent sans être reconstruits' },
      ],
    },
    controls: {
      eyebrow: '[ 03 · Les contrôles que nous intégrons ]',
      title: { pre: 'Des preuves disponibles ', accent: 'dès le premier jour.' },
      lead: 'La gouvernance coûte moins cher quand elle fait partie de l’architecture. Ces contrôles accompagnent nos systèmes, selon leur niveau de risque.',
      items: [
        { icon: 'branch', title: 'Inventaire IA', text: 'Chaque système, modèle et version de prompt est enregistré avec un responsable, une finalité et un niveau de risque.' },
        { icon: 'evals', title: 'Évaluations', text: 'Un jeu d’évaluation écrit avant le premier prompt, exécuté à chaque modification et en production. La qualité est mesurée.' },
        { icon: 'operations', title: 'Journalisation et piste d’audit', text: 'Entrées, sorties, appels d’outils et validations sont journalisés. Chaque résultat peut être retracé et expliqué.' },
        { icon: 'fde', title: 'Revue humaine', text: 'Des personnes valident là où c’est important. Les seuils et les files de revue sont définis avec les équipes qui décident.' },
        { icon: 'residency', title: 'Données hébergées en Suisse', text: 'En Suisse ou dans votre propre tenant si nécessaire. Données minimisées, sans usage pour entraîner des modèles de tiers.' },
        { icon: 'shield', title: 'Documentation', text: 'Documentation technique, cartographie des données et éléments pour l’AIPD, tenus à jour à mesure que le système évolue.' },
      ],
    },
    reading: {
      eyebrow: '[ 04 · Pour aller plus loin ]',
      title: { pre: 'Tiré de nos ', accent: 'analyses.' },
    },
    insightSlugs: ['nfadp-and-ai-in-practice', 'evals-are-the-new-qa', 'from-pilot-to-production'],
    services: {
      eyebrow: '[ 05 · Services ]',
      title: { pre: 'Où la gouvernance ', accent: 's’inscrit', post: ' dans notre travail.' },
      lead: 'Pour nous, la gouvernance fait partie du travail courant. Elle se retrouve dans l’exploitation des systèmes et dans la formation de vos équipes.',
    },
    faq: {
      eyebrow: '[ 06 · FAQ ]',
      title: { pre: 'Réglementation de l’IA en Suisse, ', accent: 'les questions', post: ' fréquentes.' },
    },
    faqIds: ['finma', 'eu-ai-act', 'nfadp', 'data-switzerland', 'model-agnostic', 'agentic-ai'],
    disclaimer:
      'Cette page est une synthèse de praticien pour vous orienter. Elle ne constitue pas un avis juridique. Les textes et les calendriers évoluent. Consultez les sources primaires (FINMA, PFPDT, Conseil fédéral et Union européenne) et votre conseil juridique avant de vous y fier.',
  },
};
