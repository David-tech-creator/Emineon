---
title: Les évaluations, l’assurance qualité des systèmes d’IA, avant et après la mise en service
summary: Les tests classiques vérifient que le code fait ce qui est prévu. Un système d’IA demande aussi une mesure continue de sa qualité, pour savoir s’il reste assez bon.
author: Emineon · Practice Opérations IA
---

Les équipes logicielles ont construit des méthodes de test sur des décennies. Tests unitaires, tests d’intégration, suites de non-régression, intégration continue. Elles fonctionnent parce que le logiciel classique est déterministe. La même entrée donne la même sortie, et un test réussit ou échoue.

Avec l’IA, ce n’est plus le cas. La même entrée peut donner des sorties différentes. Le système peut changer sans modification du code, parce qu’un fournisseur a mis à jour un modèle. La qualité devient une question de degré. Une extraction peut être presque juste. Une synthèse peut être exacte et passer à côté de l’essentiel. Les tests classiques restent nécessaires, mais ne suffisent plus.

Les évaluations, souvent appelées evals, répondent à ce besoin. Une évaluation mesure de façon structurée et reproductible comment un système d’IA accomplit une tâche. Elle s’exécute sur un ensemble fixe de cas dont les bonnes réponses sont connues. Dans notre travail, c’est la pratique la plus importante pour mettre un système d’IA en production et l’y garder.

## Ce que contient un bon jeu d’évaluation

Un jeu d’évaluation est un ensemble de cas réels. Chacun contient l’entrée du système et la définition d’une sortie correcte. Pour une extraction, c’est le document et les bonnes valeurs des champs. Pour une rédaction, ce sont les sources, un texte de référence et une grille de critères. Quatre propriétés rendent un jeu d’évaluation utile.

- Réels. Les cas viennent des données de production ou de copies fidèles. Des cas synthétiques peuvent compléter, sans remplacer.
- Représentatifs. Le jeu suit la répartition réelle des cas, y compris les dix pour cent les plus difficiles. Scans, langues mélangées, modèles inhabituels, données manquantes.
- Définis par le métier. Les personnes qui font le travail disent ce qui est correct. Les ingénieurs codent les contrôles.
- Croissants. Chaque erreur trouvée en production devient un nouveau cas. Le jeu se renforce avec le temps.

Un premier jeu d’une centaine à trois cents cas suffit en général pour décider. Il demande quelques jours de temps d’expert. C’est souvent l’étape la plus utile d’un projet d’IA, et aussi celle qu’on saute le plus souvent.

## Comment noter

Chaque tâche demande sa propre notation. Nous utilisons trois types, souvent combinés.

### Contrôles exacts et à base de règles

Pour une sortie structurée, on compare à la valeur attendue. La quantité est juste, la date au bon format, la classification correcte. Ces contrôles sont peu coûteux, rapides et sans ambiguïté. Nous les utilisons partout où la tâche le permet.

### Contrôles notés par un modèle

Pour une sortie textuelle, un modèle distinct peut noter selon une grille. La synthèse contient les trois faits clés, chaque affirmation cite une source, le ton convient à une lettre client. Cette notation est elle-même validée face au jugement humain sur un échantillon. Elle est revalidée quand le modèle de notation change.

### Revue humaine

Pour les sorties à fort enjeu ou subjectives, des experts relisent un échantillon. C’est la forme la plus coûteuse et la référence pour les autres. Nous l’utilisons pour calibrer les contrôles automatisés et pour auditer la production à intervalles réguliers.

> Avant le lancement, il faut savoir quel taux de réussite est nécessaire.

## Les évaluations comme seuil de mise en service

Une décision utile à prendre tôt est le niveau d’évaluation requis pour la mise en service. Il se fixe avec le responsable métier. Pour un rapprochement de confirmations, cela peut être quatre-vingt-dix-huit pour cent de précision sur les champs extraits et aucun faux rapprochement. Les cas incertains vont à une personne. Pour un assistant de rédaction, chaque affirmation doit être référencée. Des relecteurs experts jugent aussi quatre-vingts pour cent des projets utilisables avec des retouches mineures.

Une fois le seuil fixé, la mise en service repose sur une mesure. Les progrès deviennent visibles. Chaque semaine, l’équipe montre le taux de réussite qui se rapproche du seuil. Le métier voit quels types de cas échouent encore.

## L’évaluation continue en production

L’évaluation continue après le lancement. Les systèmes d’IA dérivent. Les fournisseurs mettent à jour leurs modèles, parfois sans préavis. De nouveaux modèles de documents apparaissent. Les utilisateurs utilisent le système autrement. Chacun de ces changements peut dégrader la qualité sans bruit.

- Exécuter la suite complète à chaque modification. Prompt, modèle, configuration de recherche, définition d’outil.
- L’exécuter aussi à intervalles fixes sur les modèles en service, même sans changement de votre côté.
- Bloquer les livraisons sous le seuil, et alerter quand une exécution planifiée passe en dessous.
- Prélever des sorties de production pour revue humaine, et ajouter les échecs au jeu d’évaluation.
- Suivre le coût et la latence par tâche à côté de la qualité. Une optimisation ne doit pas réduire la précision sans qu’on le voie.

C’est ce qui fait passer l’IA d’un projet ponctuel à un système exploité. Les régulateurs l’attendent de plus en plus. Pour les systèmes à haut risque, l’AI Act européen demande exactitude, robustesse et surveillance après mise sur le marché. Sans évaluations, c’est difficile à démontrer.

Un exemple. Lors d’une mission représentative, un fournisseur a fait une mise à jour de routine. La précision globale n’a pas bougé. L’extraction sur des certificats français scannés a toutefois perdu plusieurs points. Les utilisateurs ne l’auraient remarqué qu’après des semaines. L’exécution planifiée l’a signalé la nuit même. La version précédente du modèle a été figée en quelques minutes. Aucun opérateur n’a été touché.

## Les évaluations vous rendent indépendants des modèles

Il y a aussi un intérêt stratégique. Une bonne suite d’évaluation permet de changer de modèle sereinement. Quand un nouveau modèle sort, ou qu’un modèle moins cher suffit, vous exécutez la suite. En quelques heures, vous savez s’il fait aussi bien sur vos tâches. Sans évaluations, changer de modèle est risqué, et l’entreprise reste liée à son premier choix.

C’est pourquoi chaque système que nous construisons est livré avec sa suite d’évaluation. Elle appartient au client. Les modèles vont continuer de changer. Un jeu d’évaluation bien tenu permet de suivre ces changements sereinement.
