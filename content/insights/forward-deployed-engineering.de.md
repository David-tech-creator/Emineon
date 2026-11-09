---
title: Forward-deployed Engineering: Warum die besten KI-Systeme neben den Menschen gebaut werden, die sie nutzen
summary: In einem Workshop geschriebene Anforderungen verfehlen das meiste, was zählt. Ingenieure, die beim Team sitzen, finden es in einer Woche. So funktioniert das Modell und darum passt es besonders zu KI.
author: Emineon · Practice Agentisches Engineering
---

Der Begriff Forward-deployed Engineer stammt von Softwarefirmen, die Ingenieure in die Organisationen ihrer Kunden schickten, um vor Ort statt vom Hauptsitz aus zu bauen. Die Idee ist älter als der Name: Wer das System baut, sitzt neben denen, die es nutzen werden, und lernt die Arbeit direkt.

Für KI-Systeme ist dieses Modell kein Luxus. Es ist oft der Unterschied zwischen einem System, das in Produktion funktioniert, und einem, das das Pilotstadium nie verlässt. Dieser Artikel erklärt, warum, und wie wir es umsetzen.

## Warum KI Ingenieure vor Ort braucht

Klassische Software bildet Regeln ab, die man aufschreiben kann. KI-Systeme werden genau dort eingesetzt, wo sich die Regeln schwer aufschreiben lassen: Dokumente lesen, die variieren, Urteilsvermögen bei Ausnahmen anwenden, Texte entwerfen, die für eine Fachperson richtig klingen müssen. Das entscheidende Wissen ist implizit. Es steckt darin, wie eine erfahrene Mitarbeiterin eine Bestätigung überfliegt, welche Klauseln ein Compliance-Verantwortlicher zuerst liest, was eine Kundenberaterin über einen Kunden weiss, das nicht im Dossier steht.

Dieses Wissen übersteht keinen Anforderungsworkshop. Menschen beschreiben den Prozess, wie er funktionieren soll, nicht wie er funktioniert. Sie vergessen die Ausnahmen, weil sie sie ohne nachzudenken erledigen. Sie erwähnen die Tabelle nicht, die alles zusammenhält, weil sie ihnen peinlich ist.

Ein Ingenieur, der eine Woche beim Team sitzt, sieht all das. Er beobachtet die echte Queue, liest die echten Dokumente und fragt nach dem Warum, genau dann, wenn etwas Unerwartetes passiert. Die Spezifikation, die daraus entsteht, ist kürzer, präziser und viel näher an der Wirklichkeit.

## Was ein Forward-deployed Engineer tut

Unsere Forward-deployed Engineers sind Senior-Ingenieure, keine Berater, die programmieren, und keine Entwickler, die präsentieren. Ihre Arbeit in einem Mandat folgt meist vier Phasen.

1. Begleiten. Beim Team sitzen, die Arbeit beobachten, echte Fälle sammeln, auch die schwierigen, und erkennen, wo die Zeit hingeht.
2. Spezifizieren. Workflow und Evaluationsset mit den Leuten schreiben, die die Arbeit machen, damit sie definieren, was «korrekt» heisst.
3. Bauen. In kurzen Zyklen in der Kundenumgebung liefern, mit einer kleinen Gruppe von Nutzenden, die jede Version an echter Arbeit testet.
4. Übergeben. Das Team schulen, das das System betreiben wird, das Runbook schreiben und die ersten Wochen in Produktion begleiten.

Dabei ist der Forward-deployed Engineer der Punkt, an dem das Wissen des Kunden und unsere Engineering-Kapazität zusammenkommen. Er entscheidet, was das erweiterte Delivery-Netzwerk an nicht sensiblen Komponenten bauen kann und was vor Ort oder in der Schweiz erledigt werden muss, weil es regulierte Daten berührt.

## Kleines Team vorne, grosse Kapazität dahinter

Ein Einwand gegen das Modell sind die Kosten: Senior-Ingenieure vor Ort sind teuer. Die Antwort liegt in der Organisation des Teams. Ein Forward-deployed Team ist klein, oft zwei oder drei Personen. Es verantwortet Beziehung, Spezifikation, Architektur und die sensiblen Teile des Baus. Dahinter liefert unser globales Delivery-Netzwerk zusätzliche Engineering-Kapazität für Arbeit, die sicher geteilt werden kann: Oberflächenkomponenten, Test-Tooling, Integrationen gegen dokumentierte Schnittstellen, Infrastructure as Code.

Mit Hubs in Asien-Pazifik und Amerika läuft diese Arbeit weiter, während Genf schläft. Der Kunde sieht ein kleines Senior-Team, das sein Geschäft versteht, und ein Tempo, das sonst ein viel grösseres Team erfordern würde.

> Der Forward-deployed Engineer ist die eine Person im Projekt, die weiss, was die Mitarbeiterin braucht und was das System kann.

## Datenhaltung bestimmt die Aufteilung

Für regulierte Kunden ist die Aufteilung zwischen Arbeit vor Ort und Arbeit im Netzwerk nicht nur eine Frage der Effizienz. Sie ist eine Kontrolle. Arbeit, die kundenidentifizierende Daten, vertrauliche Dokumente oder Produktionssysteme berührt, erledigt das Forward-deployed Team in der Schweiz oder in der Umgebung des Kunden. Das Netzwerk arbeitet an Code, synthetischen oder anonymisierten Daten und Komponenten, die nie Produktionsdaten sehen.

Das wird zu Beginn jedes Mandats ausdrücklich festgelegt und dokumentiert, damit die Risikofunktion des Kunden genau sieht, wer worauf Zugriff hat. Das ist einer der Gründe, warum das Modell im Private Banking und bei internationalen Organisationen funktioniert, wo die Sensibilität der Daten ein verteiltes Team sonst ausschliessen würde.

## Adoption kommt mit der Nähe

Ein Nebeneffekt der Einbettung von Ingenieuren bei den Nutzenden: Die Adoption beginnt vor dem Go-live. Wer das System nutzen wird, hat es wachsen sehen, Änderungen vorgeschlagen und sie umgesetzt gesehen. Man vertraut ihm, weil man es mitgestaltet hat. Beim Go-live braucht es keine Einführungskampagne: Das Team nutzt es bereits.

Das ist der am meisten unterschätzte Nutzen des Modells. Viele technisch solide KI-Systeme scheitern, weil die Nutzenden ihnen nicht vertrauen. Forward-deployed Engineering baut dieses Vertrauen als Teil des Baus auf.

## Was es vom Kunden verlangt

Das Modell verlangt auch etwas vom Kunden. Forward-deployed Engineers brauchen einen Arbeitsplatz nahe beim Team, frühen Zugang zu einer Testumgebung und die Erlaubnis, die echte Arbeit zu beobachten, auch die Teile, auf die niemand stolz ist. Vor allem brauchen sie eine fachlich verantwortliche Person, die in Tagen entscheiden kann, nicht in Wochen. Sind diese Bedingungen erfüllt, kann ein erster Workflow in einem Monat in Produktion gehen. Sind sie es nicht, gleicht kein Engineering-Talent das aus.

## Wann es das richtige Modell ist

Forward Deployment ist am wertvollsten, wenn die Arbeit komplex und implizit ist, die Daten sensibel sind und die Adoption so viel zählt wie die Technologie. Das beschreibt die meisten KI-Chancen in regulierten Firmen. Für Standardkomponenten ist es weniger wichtig, und genau deshalb kombinieren wir es mit einem Delivery-Netzwerk, das diese effizient erledigt.

Wenn Sie einen KI-Partner evaluieren, fragen Sie, wo seine Ingenieure sitzen werden, wie viel Zeit sie mit den Leuten verbringen, die die Arbeit machen, und wer entscheidet, was Ihre Umgebung verlässt. Die Antworten verraten viel darüber, ob das System es in die Produktion schafft.
