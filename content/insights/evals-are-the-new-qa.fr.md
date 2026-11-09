---
title: Les évaluations sont la nouvelle assurance qualité : savoir qu’un système d’IA est prêt, et continuer à le savoir
summary: Les tests classiques vérifient que le code fait ce pour quoi il a été écrit. Les systèmes d’IA ont besoin d’autre chose : une réponse continue et mesurée à la question « est-ce toujours assez bon ? »
author: Emineon · Practice Opérations IA
---

Les équipes logicielles ont passé des décennies à bâtir des disciplines de test : tests unitaires, tests d’intégration, suites de non-régression, intégration continue. Elles fonctionnent parce que le logiciel classique est déterministe. La même entrée produit la même sortie, et un test réussit ou échoue.

Les systèmes d’IA brisent cette hypothèse. La même entrée peut produire des sorties différentes. Le système peut changer sans qu’une seule ligne de code change, parce qu’un fournisseur a mis à jour un modèle. La qualité n’est pas binaire mais graduelle : une extraction peut être presque juste, une synthèse exacte mais passer à côté de l’essentiel. Les tests classiques restent nécessaires, mais ne suffisent plus.

Les évaluations, souvent appelées evals, comblent ce manque. Une évaluation est une mesure structurée et reproductible de la manière dont un système d’IA accomplit une tâche, exécutée sur un ensemble fixe de cas dont les bonnes réponses sont connues. Dans notre travail, les évaluations sont la pratique d’ingénierie la plus importante pour mettre des systèmes d’IA en production et les y maintenir.

## Ce que contient un bon jeu d’évaluation

Un jeu d’évaluation est un ensemble de cas réels, chacun avec l’entrée que recevra le système et la définition d’une sortie correcte. Pour une tâche d’extraction, ce sont le document et les valeurs correctes des champs. Pour une tâche de rédaction, ce peuvent être les sources, un texte de référence et une grille de critères. Quatre propriétés distinguent les jeux d’évaluation utiles des jeux décoratifs.

- Réels. Les cas proviennent des données de production ou de copies fidèles, pas d’exemples inventés. Les cas synthétiques peuvent compléter, jamais remplacer.
- Représentatifs. Le jeu reflète la répartition réelle des cas, y compris les dix pour cent les plus laids : scans, langues mélangées, modèles inhabituels, données manquantes.
- Détenus par le métier. Ceux qui font le travail définissent ce que correct veut dire. Les ingénieurs implémentent les contrôles ; ils ne décident pas des réponses.
- Croissants. Chaque erreur trouvée en production devient un nouveau cas, de sorte que le jeu se renforce avec le temps.

Un premier jeu d’une centaine à trois cents cas suffit généralement pour prendre des décisions solides. Sa construction demande quelques jours de temps d’expert. C’est le meilleur investissement d’un projet d’IA, et celui qu’on saute le plus souvent.

## Comment noter

Des tâches différentes demandent des notations différentes. Nous utilisons trois grands types, souvent combinés.

### Contrôles exacts et à base de règles

Pour les sorties structurées, on compare à la valeur attendue : la quantité est-elle juste, la date au bon format, la classification conforme ? Ces contrôles sont peu coûteux, rapides et sans ambiguïté, et doivent être utilisés partout où la tâche le permet.

### Contrôles notés par un modèle

Pour les sorties textuelles, un modèle distinct peut noter selon une grille : la synthèse contient-elle les trois faits clés, chaque affirmation cite-t-elle une source, le ton convient-il à une lettre client ? La notation par modèle doit elle-même être validée par rapport au jugement humain sur un échantillon, et revalidée lorsque le modèle de notation change.

### Revue humaine

Pour les sorties à fort enjeu ou subjectives, des experts relisent un échantillon. C’est la forme d’évaluation la plus coûteuse et la référence pour toutes les autres. Nous l’utilisons pour calibrer les contrôles automatisés et pour auditer régulièrement la production.

> Si vous ne pouvez pas dire quel taux de réussite il vous faut avant le lancement, vous n’êtes pas prêts à lancer.

## Les évaluations comme seuil de mise en service

La décision la plus utile qu’un projet d’IA puisse prendre tôt est de convenir, avec le responsable métier, du niveau d’évaluation requis pour la mise en service. Pour un système de rapprochement de confirmations, ce peut être quatre-vingt-dix-huit pour cent de précision sur les champs extraits et aucun faux rapprochement, les cas incertains étant transmis à une personne. Pour un assistant de rédaction, ce peut être que chaque affirmation soit référencée et que des relecteurs experts jugent quatre-vingts pour cent des projets utilisables moyennant des retouches mineures.

Une fois convenu, le seuil fait de la mise en service une mesure plutôt qu’une opinion. Il rend aussi les progrès visibles. Chaque semaine, l’équipe peut montrer le taux de réussite qui se rapproche du seuil, et le métier voit exactement quels types de cas échouent encore.

## L’évaluation continue en production

Le lancement ne met pas fin à l’évaluation. Les systèmes d’IA dérivent. Les fournisseurs mettent à jour leurs modèles, parfois sans préavis. De nouveaux modèles de documents apparaissent. Les utilisateurs trouvent de nouvelles façons d’utiliser le système. Chacun de ces changements peut dégrader la qualité en silence.

- Exécuter la suite complète à chaque modification : prompt, modèle, configuration de recherche, définition d’outil.
- L’exécuter selon un calendrier sur les modèles en service, même quand rien n’a changé de votre côté.
- Bloquer les livraisons qui passent sous le seuil, et alerter quand une exécution planifiée y passe.
- Prélever des sorties de production pour revue humaine, et ajouter les échecs au jeu d’évaluation.
- Suivre coût et latence par tâche à côté de la qualité, pour qu’aucune optimisation ne sacrifie la précision sans que l’on s’en aperçoive.

C’est ce qui transforme l’IA d’un projet ponctuel en un système exploité. C’est aussi ce qu’attendent de plus en plus les régulateurs : les exigences de l’AI Act européen pour les systèmes à haut risque comprennent l’exactitude, la robustesse et la surveillance après mise sur le marché, difficiles à démontrer sans évaluations.

Un exemple concret : lors d’une mission représentative, une mise à jour de routine d’un fournisseur n’a pas modifié la précision globale, mais a fait perdre plusieurs points à l’extraction sur des certificats français scannés. Aucun utilisateur ne l’aurait remarqué avant des semaines. L’exécution planifiée l’a signalé la nuit même, la version précédente du modèle a été figée en quelques minutes, et le problème a été résolu avant d’atteindre un seul opérateur.

## Les évaluations vous rendent indépendants des modèles

Il y a aussi un bénéfice stratégique. Une suite d’évaluation solide permet de changer de modèle en confiance. Quand un nouveau modèle sort, ou qu’un modèle moins cher devient suffisant, vous exécutez la suite et savez en quelques heures s’il fait aussi bien sur vos tâches. Sans évaluations, changer de modèle est un saut dans le vide, et les entreprises restent prisonnières de leur choix initial.

C’est pourquoi chaque système que nous construisons est livré avec sa suite d’évaluation, propriété du client. Les modèles continueront de changer. Un jeu d’évaluation bien entretenu est l’actif qui permet d’en tirer parti plutôt que d’y être exposé.
