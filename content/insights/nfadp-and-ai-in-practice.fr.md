---
title: La nLPD et l’IA en pratique, ce que la protection des données suisse demande à un système d’IA
summary: La loi fédérale révisée sur la protection des données s’applique depuis le 1er septembre 2023, et elle s’applique directement à l’IA. Voici ce que cela change pour un système que vous voulez mettre en production.
author: Emineon · Practice Données & plateformes
---

Tout projet d’IA dans une entreprise suisse passe un jour par le délégué à la protection des données. Souvent, cette rencontre arrive tard, une fois le pilote construit. Elle devient alors une discussion sur ce qu’il faut défaire. Cela peut se passer autrement. La loi fédérale révisée sur la protection des données est en vigueur depuis le 1er septembre 2023. Elle repose sur des principes et elle est assez claire. En tenir compte dès le départ coûte peu. Cela évite aussi une cause fréquente de blocage des projets d’IA.

Cet article est une synthèse de praticien. Il ne constitue pas un avis juridique. Il couvre les obligations qui influencent le plus souvent la conception d’un système d’IA, et les choix que nous faisons pour y répondre.

## La loi s’applique déjà à l’IA

La Suisse n’a pas de loi spécifique à l’IA. Le Préposé fédéral à la protection des données et à la transparence (PFPDT) l’a indiqué clairement. La législation existante s’applique directement aux traitements de données personnelles assistés par l’IA. Le Conseil fédéral a choisi de ratifier la convention du Conseil de l’Europe sur l’IA. Il adapte le droit suisse secteur par secteur, plutôt que de reprendre l’AI Act européen. Pour une entreprise suisse, le point de départ est donc la nLPD. L’AI Act s’y ajoute dès que des systèmes ou leurs résultats touchent le marché européen.

Un point de champ d’application compte. La nLPD protège uniquement les personnes physiques. Les données relatives aux entreprises ne sont plus couvertes, ce qui simplifie de nombreux workflows B2B. Les données des personnes qui y travaillent restent couvertes.

## Cinq obligations qui influencent la conception

### 1. Protection des données dès la conception et par défaut

La loi demande aux responsables du traitement d’intégrer la protection des données dans la conception technique et organisationnelle. Les paramètres par défaut doivent limiter le traitement au nécessaire. Pour un système d’IA, cela donne des choix concrets. Transmettre au modèle seulement les champs utiles à la tâche. Supprimer ou masquer les identifiants quand ils ne sont pas requis. Ne pas conserver indéfiniment les prompts complets qui contiennent des données personnelles. Choisir le réglage prudent comme réglage par défaut.

### 2. Transparence et décisions automatisées

Les personnes doivent être informées du traitement de leurs données personnelles. Certaines décisions reposent uniquement sur un traitement automatisé et ont des effets juridiques ou significatifs pour une personne. Dans ce cas, le responsable doit l’en informer. La personne peut faire valoir son point de vue et demander qu’une personne physique revoie la décision.

C’est une des raisons pour lesquelles nos systèmes gardent en général une personne dans la boucle. L’agent prépare, une personne décide. Si une automatisation complète est justifiée, le devoir d’information et le recours humain sont prévus dès le départ.

### 3. Analyses d’impact relatives à la protection des données

Un traitement peut présenter un risque élevé pour la personnalité ou les droits fondamentaux des personnes concernées. Une analyse d’impact est alors requise au préalable. Les nouvelles technologies, les grands volumes de données sensibles et la surveillance systématique sont des déclencheurs typiques. Tous les systèmes d’IA n’en ont pas besoin. Un système qui établit des profils, traite des données de santé ou financières à grande échelle ou décide sur des individus doit toutefois être examiné.

### 4. Registre des activités de traitement

Les responsables du traitement tiennent un registre de leurs activités de traitement. Une exemption existe pour les entreprises de moins de 250 collaborateurs dont les traitements présentent un risque limité. Beaucoup d’entreprises de taille moyenne en bénéficient. Celles qui traitent des données sensibles à grande échelle en général non. Dans tous les cas, nous documentons les systèmes d’IA. Quelles données, pour quelle finalité, avec quels sous-traitants, où et pour combien de temps.

### 5. Annonce des violations

Une violation de la sécurité des données qui présente un risque élevé pour les personnes concernées doit être annoncée au PFPDT dans les meilleurs délais. Pour un système d’IA, il faut donc savoir où circulent les données personnelles, y compris vers les fournisseurs de modèles. Il faut aussi une journalisation suffisante pour établir ce qui s’est passé.

## Données sensibles et flux transfrontières

La nLPD a ajouté les données génétiques et biométriques aux données personnelles sensibles. On y trouve aussi notamment les données de santé, les opinions religieuses et politiques et les données pénales. Le traitement de données sensibles demande plus en matière de consentement, de sécurité et d’analyse.

La communication de données personnelles à l’étranger est autorisée vers les pays dont le Conseil fédéral reconnaît le niveau de protection adéquat. Elle l’est aussi avec des garanties appropriées, comme des clauses contractuelles types. En pratique, c’est là que se prennent la plupart des décisions d’architecture. Une API de modèle hébergée hors de Suisse ou de l’UE est une communication à l’étranger. Un modèle déployé dans une région suisse ou sur votre propre infrastructure ne l’est pas.

> La bonne question est de savoir quel est le meilleur modèle parmi ceux qui peuvent légalement voir ces données.

## Comment nous en tenons compte

Nous traduisons ces obligations en quelques choix d’architecture par défaut. Nous les appliquons à chaque système construit pour des clients suisses.

- Classification des données à l’ingestion. Chaque source et chaque champ sont classifiés. La classification détermine quels modèles et quelles régions peuvent les traiter.
- Une passerelle de modèles. Tous les appels de modèles passent par un point contrôlé. Il applique le routage par classe de données, journalise les métadonnées et bloque les flux interdits.
- Localisation par défaut. Les données personnelles et confidentielles sont traitées en Suisse ou dans le tenant du client. Par contrat, les fournisseurs de modèles ne conservent rien et n’entraînent rien.
- Minimisation dans les prompts. Les agents récupèrent seulement ce dont une étape a besoin. Les identifiants sont masqués quand la tâche ne les demande pas.
- Points de décision humains. Quand un résultat concerne une personne, quelqu’un le valide. Le système enregistre qui a validé et sur quelle base.
- La documentation comme livrable. Un registre de traitement, un schéma des flux de données et, si nécessaire, une analyse d’impact sont livrés avec le système.

## L’AI Act européen, en bref

L’AI Act européen est entré en vigueur en août 2024. Ses obligations arrivent progressivement entre 2025 et 2027. Il s’applique aux fournisseurs et aux utilisateurs dont les systèmes sont mis sur le marché européen ou dont les résultats sont utilisés dans l’UE. Cela peut inclure des entreprises suisses. Il classe les systèmes par niveau de risque. Quelques pratiques sont interdites. Les usages à haut risque, comme l’évaluation du crédit, les décisions en matière d’emploi et certains composants de sécurité, ont des obligations lourdes. La plupart des outils internes de productivité ont seulement des obligations légères de transparence.

Les choix décrits plus haut sont aussi au cœur de ce que l’AI Act demande aux systèmes à haut risque. Supervision humaine, documentation, journalisation et évaluation. Une bonne conformité à la nLPD couvre donc déjà une grande partie du chemin vers l’AI Act.

## Associer le DPO dès la première semaine

La mesure la plus utile est une question de méthode. Associez le délégué à la protection des données et la fonction risques dès la première semaine. Montrez-leur les flux de données et l’architecture. Convenez des règles de classification et de localisation avant de construire. Dans notre expérience, les équipes de protection des données freinent surtout les projets qui les ont ignorées. Associées tôt, elles aident à rendre la production possible.
