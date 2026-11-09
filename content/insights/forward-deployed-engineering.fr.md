---
title: Le forward-deployed engineering : pourquoi les meilleurs systèmes d’IA se construisent à côté de ceux qui les utilisent
summary: Les exigences rédigées en atelier passent à côté de l’essentiel. Des ingénieurs installés avec l’équipe le trouvent en une semaine. Voici comment fonctionne ce modèle et pourquoi il convient particulièrement à l’IA.
author: Emineon · Practice Ingénierie agentique
---

Le terme forward-deployed engineer vient d’éditeurs de logiciels qui envoyaient des ingénieurs travailler au sein des organisations de leurs clients, pour construire sur place plutôt que depuis le siège. L’idée est plus ancienne que le nom : placer ceux qui construisent le système à côté de ceux qui l’utiliseront, et les laisser apprendre le métier directement.

Pour les systèmes d’IA, ce modèle n’est pas un luxe. C’est souvent la différence entre un système qui fonctionne en production et un système qui ne quitte jamais le stade pilote. Cet article explique pourquoi, et comment nous l’appliquons.

## Pourquoi l’IA a besoin d’ingénieurs sur le terrain

Le logiciel classique encode des règles que l’on peut écrire. Les systèmes d’IA sont utilisés précisément là où les règles sont difficiles à écrire : lire des documents qui varient, exercer un jugement sur des exceptions, rédiger un texte qui doit sonner juste pour un spécialiste. Le savoir qui compte est tacite. Il réside dans la façon dont un opérateur expérimenté parcourt une confirmation, dans les clauses qu’un responsable conformité lit en premier, dans ce qu’un gestionnaire sait d’un client et qui ne figure pas au dossier.

Ce savoir ne survit pas à un atelier de recueil des besoins. Les gens décrivent le processus tel qu’il est censé fonctionner, pas tel qu’il fonctionne. Ils oublient les exceptions parce qu’ils les traitent sans y penser. Ils ne mentionnent pas le tableur qui fait tenir l’ensemble parce qu’il est embarrassant.

Un ingénieur qui passe une semaine avec l’équipe voit tout cela. Il observe la vraie file d’attente, lit les vrais documents et demande pourquoi au moment où quelque chose d’inattendu se produit. La spécification qui en résulte est plus courte, plus précise et beaucoup plus proche de la réalité.

## Ce que fait un forward-deployed engineer

Nos forward-deployed engineers sont des ingénieurs seniors, pas des consultants qui codent ni des développeurs qui présentent. Leur travail sur une mission suit généralement quatre phases.

1. Observer. S’installer avec l’équipe, regarder le travail, réunir des cas réels y compris les plus compliqués, et repérer où passe le temps.
2. Spécifier. Écrire le workflow et le jeu d’évaluation avec ceux qui font le travail, pour que « correct » soit défini par eux.
3. Construire. Livrer dans l’environnement du client par cycles courts, avec un petit groupe d’utilisateurs qui essaie chaque version sur du travail réel.
4. Transmettre. Former l’équipe qui exploitera le système, écrire le runbook et rester pendant les premières semaines en production.

Tout au long de la mission, le forward-deployed engineer est le point de rencontre entre le savoir du client et notre capacité d’ingénierie. Il décide de ce qui peut être construit par le réseau de delivery élargi, sur des composants non sensibles, et de ce qui doit être fait sur site ou en Suisse parce que cela touche des données réglementées.

## Une petite équipe devant, une grande capacité derrière

Une objection fréquente porte sur le coût : des ingénieurs seniors sur site coûtent cher. La réponse tient à l’organisation de l’équipe. Une équipe déployée est petite, souvent deux ou trois personnes. Elle porte la relation, la spécification, l’architecture et les parties sensibles de la construction. Derrière elle, notre réseau de delivery mondial apporte une capacité d’ingénierie supplémentaire pour le travail qui peut être partagé sans risque : composants d’interface, outillage de test, intégrations sur des interfaces documentées, infrastructure as code.

Avec des centres en Asie-Pacifique et dans les Amériques, ce travail se poursuit pendant que Genève dort. Le client voit une petite équipe senior qui comprend son métier, et un rythme qui exigerait normalement une équipe bien plus grande.

> Le forward-deployed engineer est la seule personne du projet qui sait à la fois ce dont l’opérateur a besoin et ce que le système peut faire.

## La localisation des données détermine la répartition

Pour les clients réglementés, la répartition entre travail sur site et travail du réseau n’est pas qu’une question d’efficacité. C’est un contrôle. Le travail qui touche des données d’identification des clients, des documents confidentiels ou des systèmes de production est réalisé par l’équipe déployée en Suisse ou dans l’environnement du client. Le réseau travaille sur du code, des données synthétiques ou anonymisées et des composants qui ne voient jamais les données de production.

Cette répartition est conçue explicitement au début de chaque mission et documentée, pour que la fonction risques du client voie exactement qui a accès à quoi. C’est l’une des raisons pour lesquelles le modèle fonctionne dans la banque privée et les organisations internationales, où la sensibilité des données exclurait sinon une équipe distribuée.

## L’adoption vient avec le terrain

Intégrer les ingénieurs aux utilisateurs a un effet secondaire : l’adoption commence avant le lancement. Ceux qui utiliseront le système l’ont vu évoluer, ont suggéré des changements et les ont vus apparaître. Ils lui font confiance parce qu’ils ont contribué à le façonner. À la mise en service, nul besoin de campagne de lancement : l’équipe l’utilise déjà.

C’est le bénéfice le plus sous-estimé du modèle. Beaucoup de systèmes d’IA techniquement solides échouent parce que les utilisateurs ne leur font pas confiance. Le forward-deployed engineering construit cette confiance en même temps que le système.

## Ce que cela demande au client

Le modèle demande aussi quelque chose au client. Les forward-deployed engineers ont besoin d’un bureau près de l’équipe, d’un accès précoce à un environnement de test et de la permission d’observer le vrai travail, y compris les parties dont personne n’est fier. Ils ont surtout besoin d’un responsable métier capable de décider en quelques jours, pas en quelques semaines. Lorsque ces conditions sont réunies, un premier workflow peut atteindre la production en un mois. Lorsqu’elles ne le sont pas, aucun talent d’ingénierie ne compense.

## Quand c’est le bon modèle

Le déploiement sur le terrain est le plus utile lorsque le travail est complexe et tacite, que les données sont sensibles et que l’adoption compte autant que la technologie. Cela décrit la plupart des opportunités d’IA dans les entreprises réglementées. Il importe moins pour les composants standard, et c’est précisément pourquoi nous l’associons à un réseau de delivery qui les traite efficacement.

Si vous évaluez un partenaire IA, demandez où ses ingénieurs seront installés, combien de temps ils passeront avec ceux qui font le travail, et qui décide de ce qui quitte votre environnement. Les réponses en diront long sur les chances du système d’atteindre la production.
