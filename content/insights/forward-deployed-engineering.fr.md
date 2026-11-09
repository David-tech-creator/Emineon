---
title: Le forward-deployed engineering, construire les systèmes d’IA à côté des personnes qui les utilisent
summary: Un atelier de recueil des besoins laisse souvent de côté l’essentiel. Des ingénieurs installés avec l’équipe le voient en une semaine. Voici comment fonctionne ce modèle et pourquoi il convient bien à l’IA.
author: Emineon · Practice Ingénierie agentique
---

Le terme forward-deployed engineer vient d’éditeurs de logiciels. Ils envoyaient des ingénieurs travailler chez leurs clients, pour construire sur place plutôt que depuis le siège. L’idée est plus ancienne que le nom. On place les personnes qui construisent le système à côté de celles qui l’utiliseront. Elles apprennent le métier directement.

Pour les systèmes d’IA, ce modèle est très utile. C’est souvent ce qui permet à un système de passer du pilote à la production. Cet article explique pourquoi, et comment nous l’appliquons.

## Pourquoi l’IA a besoin d’ingénieurs sur le terrain

Le logiciel classique encode des règles que l’on peut écrire. L’IA sert justement là où les règles sont difficiles à écrire. Lire des documents qui varient, juger des exceptions, rédiger un texte qui convient à un spécialiste. Le savoir utile est souvent implicite. Il se trouve dans la façon dont un opérateur expérimenté lit une confirmation. Dans les clauses qu’un responsable conformité regarde en premier. Dans ce qu’un gestionnaire sait d’un client et qui n’est pas au dossier.

Ce savoir se perd souvent en atelier. Les gens décrivent le processus tel qu’il devrait fonctionner. Ils oublient les exceptions, car ils les traitent par habitude. Ils ne parlent pas du tableur qui fait tenir l’ensemble.

Un ingénieur qui passe une semaine avec l’équipe voit tout cela. Il observe la file d’attente et lit les documents du quotidien. Il demande pourquoi au moment où quelque chose d’inattendu arrive. La spécification qui en sort est plus courte, plus précise et plus proche de la réalité.

## Ce que fait un forward-deployed engineer

Nos forward-deployed engineers sont des ingénieurs seniors. Leur travail sur une mission suit en général quatre phases.

1. Observer. S’installer avec l’équipe, regarder le travail, réunir des cas réels, y compris les plus compliqués, et voir où passe le temps.
2. Spécifier. Écrire le workflow et le jeu d’évaluation avec les personnes qui font le travail. Ce sont elles qui définissent ce qui est correct.
3. Construire. Livrer dans l’environnement du client par cycles courts. Un petit groupe d’utilisateurs teste chaque version sur ses dossiers.
4. Transmettre. Former l’équipe qui exploitera le système, écrire le runbook et rester pendant les premières semaines en production.

Pendant toute la mission, le forward-deployed engineer fait le lien entre le savoir du client et notre équipe d’ingénierie. Il décide de ce que le réseau de delivery peut construire, sur des composants non sensibles. Il décide aussi de ce qui doit être fait sur site ou en Suisse, parce que cela touche des données réglementées.

## Une petite équipe sur site, avec de la capacité en appui

Une question revient souvent sur le coût. Des ingénieurs seniors sur site coûtent cher. La réponse tient à l’organisation. L’équipe déployée est petite, souvent deux ou trois personnes. Elle porte la relation, la spécification, l’architecture et les parties sensibles. Notre réseau de delivery ajoute de la capacité pour le travail qui peut être partagé sans risque. Composants d’interface, outillage de test, intégrations sur des interfaces documentées, infrastructure as code.

Avec des centres en Asie-Pacifique et dans les Amériques, ce travail avance aussi en dehors des heures de Genève. Le client travaille avec une petite équipe senior qui comprend son métier. Le rythme est celui d’une équipe plus grande.

> Le forward-deployed engineer connaît à la fois les besoins de l’opérateur et les possibilités du système.

## La localisation des données détermine la répartition

Pour les clients réglementés, la répartition entre travail sur site et travail du réseau est aussi un contrôle. Le travail qui touche des données d’identification des clients, des documents confidentiels ou des systèmes de production reste à l’équipe déployée. Il se fait en Suisse ou dans l’environnement du client. Le réseau travaille sur du code, des données synthétiques ou anonymisées et des composants sans accès aux données de production.

Cette répartition est définie au début de chaque mission et documentée. La fonction risques du client voit qui a accès à quoi. C’est une des raisons pour lesquelles le modèle fonctionne dans la banque privée et les organisations internationales. Sans cela, la sensibilité des données exclurait une équipe distribuée.

## L’adoption vient avec le terrain

Travailler avec les utilisateurs a un autre effet. L’adoption commence avant le lancement. Les futurs utilisateurs ont vu le système évoluer. Ils ont proposé des changements et les ont vus arriver. Ils lui font confiance parce qu’ils y ont contribué. À la mise en service, l’équipe l’utilise déjà.

C’est un bénéfice souvent sous-estimé. Beaucoup de systèmes d’IA techniquement solides échouent parce que les utilisateurs ne leur font pas confiance. Le forward-deployed engineering construit cette confiance en même temps que le système.

## Ce que cela demande au client

Le modèle demande aussi quelque chose au client. Les ingénieurs ont besoin d’un bureau près de l’équipe et d’un accès rapide à un environnement de test. Ils doivent pouvoir observer le travail tel qu’il est, y compris les parties moins abouties. Il faut surtout un responsable métier qui décide en quelques jours plutôt qu’en quelques semaines. Avec ces conditions, un premier workflow peut atteindre la production en un mois. Sans elles, c’est beaucoup plus difficile.

## Quand c’est le bon modèle

Ce modèle est le plus utile quand le travail est complexe et implicite, que les données sont sensibles et que l’adoption compte autant que la technologie. C’est le cas de la plupart des projets d’IA dans les entreprises réglementées. Il compte moins pour les composants standard. C’est pourquoi nous l’associons à un réseau de delivery qui les prend en charge.

Si vous choisissez un cabinet pour un projet d’IA, posez trois questions. Où ses ingénieurs seront-ils installés ? Combien de temps passeront-ils avec les personnes qui font le travail ? Qui décide de ce qui quitte votre environnement ? Les réponses vous diront beaucoup sur les chances du système d’atteindre la production.
