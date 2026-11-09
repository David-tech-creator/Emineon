---
title: Workflows agentiques dans le financement du négoce : où les agents font leurs preuves, et où ils ne doivent pas agir seuls
summary: Le négoce de matières premières vit de documents. Les agents peuvent presque tous les lire, les rapprocher et les pré-contrôler. Tout l’art consiste à décider quelles étapes ils franchissent seuls.
author: Emineon · Practice Matières premières & négoce
---

Genève est la première place mondiale du financement du négoce, et douze des quatorze banques suisses actives dans ce domaine y sont établies. Autour d’elles gravitent quelque 400 sociétés de négoce. Entre une transaction conclue au desk et l’encaissement final, chacune de ces entreprises gère une longue chaîne de documents : récapitulatifs, confirmations, lettres de crédit, connaissements, certificats d’origine et de qualité, rapports d’inspection, factures et la correspondance qui relie le tout.

C’est un terrain presque idéal pour l’IA agentique. Les documents sont semi-structurés, les règles sont connues, le coût du retard est élevé et ceux qui font le travail sont expérimentés et coûteux. C’est aussi un domaine où une erreur peut coûter un paiement, une cargaison ou une relation bancaire. La question n’est donc pas de savoir s’il faut utiliser des agents, mais comment répartir le travail entre agents et personnes.

## Ce que fait réellement un agent

Un agent est un système qui lit ses entrées, décide d’une séquence d’étapes et utilise des outils pour les exécuter. Dans les opérations de négoce, ces outils sont pour la plupart ordinaires : lire la boîte mail, analyser un PDF, interroger l’ETRM, consulter une liste de sanctions, rédiger un e-mail, mettre à jour un statut. Ce qui le rend agentique, c’est que la séquence n’est pas fixée à l’avance. Une confirmation parfaitement conforme demande trois étapes. Une confirmation avec une formule de prix différente en demande sept, dont une comparaison avec le récapitulatif d’origine et un projet de question à la contrepartie.

Trois workflows se distinguent par la valeur qu’ils rapportent au regard du risque.

### Le rapprochement des confirmations

Les confirmations des contreparties arrivent par e-mail sous toutes les formes possibles. Chacune doit être comparée à la transaction enregistrée : quantité et tolérance, prix et formule, période de livraison, incoterm, ports de chargement et de déchargement, conditions de paiement, droit applicable. Un agent peut extraire les conditions, interroger la transaction, comparer champ par champ et classer le résultat comme rapproché, divergent ou incertain. Les opérateurs ne traitent alors que les divergences et les incertitudes, justificatifs mis en évidence.

### Le pré-contrôle des lettres de crédit

Les écarts entre une lettre de crédit et les documents présentés sont une source classique de retards et de coûts. Un agent peut extraire les conditions de la lettre de crédit sous forme de liste de contrôle, lire chaque document à son arrivée et signaler les incohérences avant l’envoi à la banque : un port orthographié différemment, une quantité hors tolérance, une date incompatible avec la période d’expédition. La décision de présenter, de demander un amendement ou une renonciation reste à l’équipe documentaire.

### L’actualisation KYC des contreparties

Les revues périodiques des contreparties consistent à réunir extraits du registre du commerce, informations sur les ayants droit, états financiers et presse défavorable, souvent dans la langue source. Un agent peut constituer le dossier, résumer ce qui a changé depuis la dernière revue et lister ce qui manque. Un responsable conformité relit et décide.

## Là où les agents ne doivent pas agir seuls

Le principe directeur est simple : l’autonomie doit suivre la réversibilité et le risque. Lire, extraire, comparer et rédiger sont des actions réversibles et à faible risque. Envoyer, engager, approuver et libérer ne le sont pas.

- Les décisions en matière de sanctions. Un agent peut filtrer des noms et des navires et expliquer pourquoi une alerte s’est déclenchée. Lever ou escalader cette alerte est une décision de conformité, avec un responsable nommé.
- Tout ce qui engage de l’argent ou modifie un contrat. Libérations de paiement, amendements et renonciations passent par une personne, à chaque fois.
- La communication externe aux conséquences commerciales. Les projets sont utiles ; envoyer une réponse qui concède un point à une contrepartie est un acte commercial.
- Les modifications de transactions enregistrées. Les agents peuvent proposer des corrections dans l’ETRM ; une personne les applique.

En pratique, on obtient un workflow où l’agent fait l’essentiel de la lecture et de la comparaison, et où les personnes consacrent leur temps aux décisions. C’est la bonne répartition du travail. C’est aussi ce que les auditeurs, les banques et les régulateurs s’attendent à voir.

## Concevoir pour les documents que l’on reçoit vraiment

La difficulté des documents du négoce n’est pas de lire des PDF propres. C’est le certificat scanné avec un tampon sur le champ clé, la confirmation qui couvre deux transactions, le récapitulatif écrit dans une messagerie puis collé dans un e-mail, le connaissement corrigé à la main. Un système testé uniquement sur des échantillons propres brillera en démo et décevra dès la deuxième semaine.

Nous commençons chaque mission dans les opérations de négoce en réunissant quelques centaines de documents historiques réels avec leur issue connue, en incluant délibérément les plus laids. Ils deviennent le jeu d’évaluation. Le système n’entre pas en production tant qu’il n’atteint pas la précision convenue sur ce jeu, et chaque correction faite ensuite par un opérateur y est ajoutée pour que la même erreur ne puisse pas revenir sans être détectée.

> L’objectif n’est pas un agent qui n’a jamais besoin d’une personne. C’est une équipe d’opérations qui n’a plus jamais à ressaisir un champ.

## Les contrôles qui rendent cela acceptable

Les sociétés de négoce sont scrutées par leurs banques autant que par leurs régulateurs. Un système agentique dans cet environnement a besoin de contrôles qui satisferaient la due diligence d’une banque.

- Accès en lecture seule à l’ETRM et aux systèmes cœur par défaut ; accès en écriture limité à des actions précises et journalisé.
- Une piste d’audit complète : le document reçu, ce que l’agent a extrait, ce qu’il a comparé, ce qu’il a conclu et qui a validé.
- Une confiance par champ et une incertitude explicite, pour que les contrôleurs sachent où regarder.
- Des données de contreparties et de transactions hébergées en Suisse ou dans le tenant de l’entreprise.
- L’indépendance vis-à-vis des modèles, pour qu’un changement de fournisseur n’impose pas une reconstruction.

## Ce que cela rapporte

Dans des missions représentatives, le temps de traitement des confirmations baisse de plus de moitié et la majorité des confirmations sont rapprochées sans que personne ne ressaisisse un champ. Les écarts sont signalés le jour même plutôt que plusieurs jours après. Tout aussi important, le savoir qui vivait chez quelques opérateurs expérimentés est désormais encodé dans des règles de rapprochement et des cas d’évaluation partagés par toute l’équipe.

Le bénéfice le plus important est souvent stratégique. Les volumes de négoce sont volatils. Une entreprise capable d’absorber un pic de volume sans embaucher une nouvelle équipe d’opérations a plus de marge pour saisir les opportunités quand les marchés bougent. Pour un secteur qui se distingue par la vitesse et la fiabilité, c’est un avantage qui compte.
