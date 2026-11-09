---
title: Du pilote à la production, pourquoi beaucoup de pilotes IA s’arrêtent et cinq leviers pour les mettre en service
summary: Le pilote fonctionnait en démo. Six mois plus tard, c’est toujours un pilote. Les causes sont connues, et les solutions aussi.
author: Emineon · Practice Ingénierie agentique
---

Presque toutes les entreprises que nous rencontrons ont un pilote IA. Moins nombreuses sont celles qui en ont un en production. Plus rares encore sont celles dont une équipe entière s’en sert chaque jour. C’est entre la démo et l’outil quotidien que se perd une grande partie de la valeur de l’IA. Les modèles sont rarement en cause. Ils sont assez bons. Le problème vient de ce qui les entoure.

Nous avons mené plusieurs pilotes bloqués jusqu’en production. Nous retrouvons souvent les mêmes cinq causes. Aucune n’est exotique. Toutes peuvent être traitées dès la première semaine, si quelqu’un en prend la décision.

## 1. Le pilote a été choisi par enthousiasme plutôt que pour sa valeur

Un pilote est souvent choisi parce que quelqu’un s’y intéressait, ou parce qu’il faisait une belle démo. Un chatbot sur le règlement du personnel est facile à construire et agréable à montrer. Il change rarement un indicateur suivi par la direction.

À la fin du pilote, une question se pose. Faut-il investir pour le mettre en production ? Sans situation de départ ni business case, la réponse est souvent non. Le projet s’arrête sans bruit. Le pilote n’a pas échoué techniquement. Personne ne pouvait dire ce qu’il valait.

La solution est de choisir le premier workflow avec un regard financier. Où des personnes qualifiées passent-elles des heures sur un travail répétitif mais pas trivial ? Combien coûte une heure de ce travail, et combien d’heures y a-t-il ? Peut-on mesurer aujourd’hui le délai de traitement et le taux d’erreur ? Sur ces trois questions, un workflow de confirmations, de dossiers KYC ou de rédaction réglementaire passe en général devant un assistant généraliste.

## 2. Personne n’a écrit ce que « bon » veut dire

En démo, on juge la qualité à l’œil. Quelqu’un pose une question, la réponse semble plausible, tout le monde est d’accord. En production, cela ne suffit pas. Un champ mal extrait d’une confirmation a un coût. Une phrase d’un dossier KYC qui cite le mauvais document aussi. Une traduction qui atténue une obligation juridique également.

Les pilotes qui passent en production ont presque toujours un jeu d’évaluation. C’est un ensemble de cas réels avec des réponses correctes connues. Il est écrit avant la construction et exécuté à chaque modification. La qualité devient un chiffre. La mise en service devient une question de seuil à convenir.

Écrire ce jeu d’évaluation est un travail discret. Il demande du temps aux personnes qui connaissent le métier, et c’est pour cela qu’on le saute. C’est pourtant le meilleur indicateur que nous connaissons pour savoir si un système atteindra la production et y restera.

## 3. Les dix pour cent compliqués ont été remis à plus tard

La plupart des processus métier sont routiniers à quatre-vingt-dix pour cent. Le reste, ce sont des exceptions. Les démos couvrent les quatre-vingt-dix. La production se joue sur les dix. Le fax scanné. La confirmation qui contient deux transactions. Le dossier client en italien alors que le système a été testé en français. La contrepartie qui utilise son propre modèle.

Un système qui traite les cas courants et échoue sans prévenir sur les autres pose problème. Personne ne peut se fier à ses résultats. Il n’est pas nécessaire d’automatiser d’abord les exceptions. Il faut les prévoir dans la conception. Le système doit savoir quand il est incertain, le dire et transmettre le cas à une personne avec les justificatifs.

> Un bon agent sait quand il pourrait se tromper. Il le signale avant que quelqu’un ne s’y fie.

C’est une décision de conception plus que de modèle. Des seuils de confiance, des contrôles par rapport aux systèmes sources et une file de revue claire font des exceptions une partie normale du workflow.

## 4. Le pilote vivait en dehors des vrais systèmes

Beaucoup de pilotes tournent dans un bac à sable. Les documents sont chargés à la main et les résultats recopiés par une personne. C’est bien pour apprendre. Le pilote ne rencontre toutefois jamais les questions de production. Authentification, droits d’accès, limites de débit, localisation des données, journalisation et comité des changements.

Au moment de le connecter, l’effort dépasse celui du pilote initial. Il faut un nouveau financement. Les équipes sécurité et conformité découvrent l’architecture tard. Elles posent des questions qui auraient dû venir des mois plus tôt.

Nous construisons donc les premiers workflows dans l’environnement du client dès le premier jour. Parfois, cela commence par une connexion en lecture seule à un seul système. C’est plus lent la première semaine et beaucoup plus rapide à la sixième. L’équipe risques examine une architecture concrète dès le départ.

## 5. Personne n’en était responsable après le lancement

La dernière cause est la plus discrète. Un système est mis en service et l’équipe projet passe à autre chose. Personne n’en est responsable. Six mois plus tard, un fournisseur de modèles change quelque chose. La précision baisse, les utilisateurs perdent confiance et reviennent à l’ancienne méthode. Aucun incident n’est déclaré. Le système n’est simplement plus utilisé.

Un système d’IA a besoin d’un responsable côté métier et d’un exploitant côté technique. Il lui faut aussi un tableau de bord de supervision et une revue planifiée. Le responsable décide de ce que le système doit faire. L’exploitant veille à ce qu’il continue de le faire. Sans les deux, la qualité baisse avec le temps.

## À quoi cela ressemble quand cela fonctionne

Les cinq solutions forment un schéma simple. Choisir un workflow avec une situation de départ mesurable. Écrire le jeu d’évaluation à partir de cas réels avant de construire. Prévoir les exceptions avec une file de revue humaine. Construire dans l’environnement du client dès le départ. Nommer un responsable et un exploitant avant le lancement.

Tout cela ne demande pas une grande équipe. Notre première mission type dure trente jours, du cadrage à un workflow en production. Une petite équipe senior la mène chez le client. Le temps d’ingénierie est rarement la limite. Ce qui compte, c’est de prendre ces décisions tôt et d’avoir accès aux personnes qui connaissent le métier.

- Semaine 1. Choisir le workflow, mesurer la situation de départ, écrire le jeu d’évaluation.
- Semaine 2. Construire dans l’environnement du client, avec le jeu d’évaluation.
- Semaine 3. Des utilisateurs sur leurs propres dossiers. Traiter les exceptions. Ajouter contrôle d’accès et audit.
- Semaine 4. Mise en production, responsable et exploitant nommés, résultat mesuré par rapport à la situation de départ.

Le premier workflow est rarement le plus rentable. Il montre que l’entreprise sait mener l’IA de l’idée à la production. Il pose aussi la plateforme, les contrôles et les habitudes qui rendent le deuxième et le troisième workflow beaucoup moins coûteux. L’IA fait alors partie du travail courant de l’entreprise.
