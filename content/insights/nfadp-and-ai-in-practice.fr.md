---
title: La nLPD et l’IA en pratique : ce que la protection des données suisse exige d’un système d’IA, et comment concevoir en conséquence
summary: La loi fédérale révisée sur la protection des données s’applique depuis le 1er septembre 2023, et elle s’applique directement à l’IA. Voici ce que cela signifie pour un système que vous voulez mettre en production.
author: Emineon · Practice Données & plateformes
---

Tout projet d’IA dans une entreprise suisse finit par rencontrer le délégué à la protection des données. Trop souvent, cette rencontre a lieu tard, une fois le pilote construit, et tourne à la négociation sur ce qu’il faut défaire. Il n’y a aucune raison qu’il en soit ainsi. La loi fédérale révisée sur la protection des données, en vigueur depuis le 1er septembre 2023, repose sur des principes et elle est raisonnablement claire. Concevoir en conséquence dès le départ coûte peu et supprime une raison fréquente d’enlisement des projets d’IA.

Cet article est une synthèse de praticien, pas un avis juridique. Il couvre les obligations qui façonnent le plus souvent la conception d’un système d’IA, et les décisions que nous prenons pour y répondre.

## La loi s’applique déjà à l’IA

La Suisse n’a pas de loi spécifique à l’IA. Le Préposé fédéral à la protection des données et à la transparence (PFPDT) a clairement indiqué que la législation existante sur la protection des données s’applique directement aux traitements de données personnelles assistés par l’IA. Le Conseil fédéral a choisi de ratifier la convention du Conseil de l’Europe sur l’IA et d’adapter le droit suisse secteur par secteur, plutôt que de reprendre l’AI Act européen. Pour une entreprise suisse, le point de départ pratique est donc la nLPD, complétée par l’AI Act partout où des systèmes ou leurs résultats atteignent le marché européen.

Un détail de champ d’application compte : la nLPD ne protège que les personnes physiques. Les données relatives aux entreprises ne sont plus couvertes, ce qui simplifie de nombreux workflows B2B. Les données relatives aux personnes qui y travaillent le restent.

## Cinq obligations qui façonnent la conception

### 1. Protection des données dès la conception et par défaut

La loi impose aux responsables du traitement d’intégrer la protection des données dans la conception technique et organisationnelle des traitements, et de prévoir des paramètres par défaut qui limitent le traitement au nécessaire. Pour un système d’IA, cela se traduit par des choix concrets : ne transmettre au modèle que les champs nécessaires à la tâche ; supprimer ou masquer les identifiants lorsqu’ils ne sont pas requis ; ne pas conserver indéfiniment les prompts complets contenant des données personnelles ; faire du réglage prudent le réglage par défaut.

### 2. Transparence et décisions automatisées

Les personnes doivent être informées du traitement de leurs données personnelles. Lorsqu’une décision fondée exclusivement sur un traitement automatisé a des effets juridiques pour une personne ou l’affecte de manière significative, le responsable doit l’en informer, et la personne peut demander à faire valoir son point de vue et à ce que la décision soit revue par une personne physique.

La plupart des systèmes que nous construisons gardent une personne dans la boucle précisément pour cette raison : l’agent prépare, une personne décide. Lorsqu’une automatisation complète est justifiée, le devoir d’information et la voie de recours humaine doivent être conçus d’emblée, pas ajoutés après coup.

### 3. Analyses d’impact relatives à la protection des données

Lorsqu’un traitement est susceptible d’entraîner un risque élevé pour la personnalité ou les droits fondamentaux des personnes concernées, une analyse d’impact est requise au préalable. Les nouvelles technologies, les grands volumes de données sensibles et la surveillance systématique en sont des déclencheurs typiques. Tous les systèmes d’IA n’en ont pas besoin, mais tout système qui établit des profils, traite des données de santé ou financières à grande échelle ou prend des décisions sur des individus doit être examiné.

### 4. Registre des activités de traitement

Les responsables du traitement doivent tenir un registre de leurs activités de traitement. Une exemption existe pour les entreprises de moins de 250 collaborateurs dont les traitements ne présentent qu’un risque limité pour les personnes concernées. De nombreuses entreprises de taille moyenne en bénéficient ; celles qui traitent des données sensibles à grande échelle généralement pas. Dans tous les cas, les systèmes d’IA doivent être documentés : quelles données, à quelle fin, quels sous-traitants, où et pour combien de temps.

### 5. Annonce des violations

Une violation de la sécurité des données susceptible d’entraîner un risque élevé pour les personnes concernées doit être annoncée au PFPDT dans les meilleurs délais. Pour un système d’IA, cela suppose de savoir où circulent les données personnelles, y compris vers les fournisseurs de modèles, et de disposer d’une journalisation suffisante pour établir ce qui s’est passé.

## Données sensibles et flux transfrontières

La nLPD a élargi les catégories de données personnelles sensibles aux données génétiques et biométriques, aux côtés notamment des données de santé, des opinions religieuses et politiques et des données pénales. Le traitement de données sensibles relève le niveau d’exigence en matière de consentement, de sécurité et d’analyse.

La communication de données personnelles à l’étranger est autorisée vers les pays dont le Conseil fédéral reconnaît le niveau de protection adéquat, ou moyennant des garanties appropriées telles que des clauses contractuelles types. C’est en pratique là que se prennent la plupart des décisions d’architecture. Une API de modèle hébergée hors de Suisse ou de l’UE constitue une communication à l’étranger ; un modèle déployé dans une région suisse ou sur votre propre infrastructure, non.

> La question n’est pas de savoir quel modèle est le meilleur. C’est de savoir quel est le meilleur parmi ceux qui peuvent légalement voir ces données.

## Comment nous concevons en conséquence

Nous traduisons ces obligations en un petit ensemble de choix d’architecture par défaut, appliqués à chaque système que nous construisons pour des clients suisses.

- Classification des données à l’ingestion. Chaque source et chaque champ sont classifiés, et la classification détermine quels modèles et quelles régions peuvent les traiter.
- Une passerelle de modèles. Tous les appels de modèles passent par un point contrôlé qui applique le routage par classe de données, journalise les métadonnées et bloque les flux interdits.
- Localisation par défaut. Les données personnelles et confidentielles sont traitées en Suisse ou dans le tenant du client. Les fournisseurs de modèles sont contractuellement tenus à ne rien conserver et à ne rien entraîner.
- Minimisation dans les prompts. Les agents ne récupèrent que ce dont une étape a besoin ; les identifiants sont masqués lorsque la tâche ne les requiert pas.
- Points de décision humains. Partout où un résultat concerne une personne, quelqu’un le valide, et le système enregistre qui et sur quelle base.
- La documentation comme livrable. Un registre de traitement, un schéma des flux de données et, si nécessaire, une analyse d’impact sont livrés avec le système.

## L’AI Act européen, en bref

L’AI Act européen est entré en vigueur en août 2024, avec des obligations introduites progressivement entre 2025 et 2027. Il s’applique aux fournisseurs et aux utilisateurs dont les systèmes sont mis sur le marché européen ou dont les résultats sont utilisés dans l’UE, ce qui peut inclure des entreprises suisses. Il classe les systèmes par niveau de risque : quelques pratiques sont interdites ; les usages à haut risque comme l’évaluation du crédit, les décisions en matière d’emploi et certains composants de sécurité sont soumis à de lourdes obligations ; la plupart des outils internes de productivité ne portent que des obligations légères de transparence.

Les choix par défaut décrits plus haut, supervision humaine, documentation, journalisation et évaluation, sont aussi au cœur de ce que l’AI Act exige des systèmes à haut risque. Bien se conformer à la nLPD, c’est déjà faire l’essentiel du chemin vers l’AI Act.

## Associer le DPO dès la première semaine

La mesure la plus efficace est procédurale. Associez le délégué à la protection des données et la fonction risques dès la première semaine, montrez-leur les flux de données et l’architecture, et convenez des règles de classification et de localisation avant de construire. D’après notre expérience, les équipes de protection des données ne sont pas un obstacle à l’IA. Elles sont un obstacle aux projets d’IA qui les ont ignorées. Associées tôt, elles deviennent celles qui rendent la production possible.
