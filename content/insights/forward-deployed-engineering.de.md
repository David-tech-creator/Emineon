---
title: Forward-deployed Engineering. Warum wir KI-Systeme neben den Menschen bauen, die sie nutzen
summary: Anforderungen aus einem Workshop lassen vieles aus. Ingenieure, die beim Team sitzen, sehen es in einer Woche. So funktioniert das Modell, und darum passt es zu KI.
author: Emineon · Practice Agentisches Engineering
---

Der Begriff Forward-deployed Engineer stammt von Softwarefirmen. Sie schickten Ingenieure zu ihren Kunden, um vor Ort zu bauen statt vom Hauptsitz aus. Die Idee ist älter als der Name. Wer das System baut, sitzt neben den Menschen, die es nutzen, und lernt die Arbeit direkt.

Für KI-Systeme ist dieses Modell sehr nützlich. Es entscheidet oft darüber, ob ein System in Produktion geht oder im Pilotstadium bleibt. Dieser Artikel erklärt, warum, und wie wir es umsetzen.

## Warum KI Ingenieure vor Ort braucht

Klassische Software bildet Regeln ab, die man aufschreiben kann. KI-Systeme setzt man dort ein, wo sich Regeln schwer aufschreiben lassen. Beim Lesen unterschiedlicher Dokumente, bei Ausnahmen, bei Texten, die für eine Fachperson stimmen müssen. Das wichtige Wissen ist implizit. Es steckt darin, wie eine erfahrene Mitarbeiterin eine Bestätigung überfliegt. Welche Klauseln ein Compliance-Verantwortlicher zuerst liest. Was eine Kundenberaterin über einen Kunden weiss, das nicht im Dossier steht.

Dieses Wissen geht in einem Anforderungsworkshop oft verloren. Menschen beschreiben den Prozess, wie er sein sollte. Sie vergessen die Ausnahmen, weil sie sie routiniert erledigen. Die Tabelle, die alles zusammenhält, erwähnen sie oft nicht.

Ein Ingenieur, der eine Woche beim Team sitzt, sieht das. Er beobachtet die Queue, liest die Dokumente und fragt nach, wenn etwas Unerwartetes passiert. Die Spezifikation wird kürzer, präziser und näher an der Praxis.

## Was ein Forward-deployed Engineer tut

Unsere Forward-deployed Engineers sind Senior-Ingenieure. Sie verbinden Fachgespräche mit Engineering. Ihre Arbeit in einem Mandat folgt meist vier Phasen.

1. Begleiten. Beim Team sitzen, die Arbeit beobachten, Fälle sammeln, auch die schwierigen, und sehen, wo die Zeit hingeht.
2. Spezifizieren. Workflow und Evaluationsset mit den Menschen schreiben, die die Arbeit machen. Sie definieren, was «korrekt» heisst.
3. Bauen. In kurzen Zyklen in der Kundenumgebung liefern. Eine kleine Gruppe von Nutzenden testet jede Version an ihrer täglichen Arbeit.
4. Übergeben. Das Team schulen, das das System betreibt, das Runbook schreiben und die ersten Wochen in Produktion begleiten.

Der Forward-deployed Engineer verbindet das Wissen des Kunden mit unserer Engineering-Kapazität. Er entscheidet, welche nicht sensiblen Komponenten das erweiterte Delivery-Netzwerk bauen kann. Und was vor Ort oder in der Schweiz passiert, weil es regulierte Daten berührt.

## Kleines Team vorne, grosse Kapazität dahinter

Ein Einwand sind die Kosten. Senior-Ingenieure vor Ort sind teuer. Die Antwort liegt in der Teamstruktur. Ein Forward-deployed Team ist klein, oft zwei oder drei Personen. Es verantwortet Beziehung, Spezifikation, Architektur und die sensiblen Teile des Baus. Unser globales Delivery-Netzwerk liefert zusätzliche Kapazität für Arbeit, die sicher geteilt werden kann. Zum Beispiel Oberflächenkomponenten, Test-Tooling, Integrationen gegen dokumentierte Schnittstellen und Infrastructure as Code.

Mit Hubs in Asien-Pazifik und Amerika geht diese Arbeit weiter, während in Genf Nacht ist. Der Kunde arbeitet mit einem kleinen Senior-Team, das sein Geschäft versteht. Das Tempo entspricht dem eines grösseren Teams.

> Der Forward-deployed Engineer kennt beides, den Bedarf der Mitarbeiterin und die Möglichkeiten des Systems.

## Datenhaltung bestimmt die Aufteilung

Für regulierte Kunden ist die Aufteilung zwischen Arbeit vor Ort und im Netzwerk auch eine Kontrolle. Arbeit mit kundenidentifizierenden Daten, vertraulichen Dokumenten oder Produktionssystemen erledigt das Forward-deployed Team. In der Schweiz oder in der Umgebung des Kunden. Das Netzwerk arbeitet an Code, synthetischen oder anonymisierten Daten und Komponenten ohne Produktionsdaten.

Das legen wir zu Beginn jedes Mandats fest und dokumentieren es. So sieht die Risikofunktion des Kunden genau, wer worauf Zugriff hat. Deshalb funktioniert das Modell auch im Private Banking und bei internationalen Organisationen. Dort würde die Sensibilität der Daten ein verteiltes Team sonst ausschliessen.

## Adoption kommt mit der Nähe

Wenn Ingenieure bei den Nutzenden sitzen, beginnt die Adoption vor dem Go-live. Die Nutzenden haben das System wachsen sehen. Sie haben Änderungen vorgeschlagen und gesehen, wie sie umgesetzt wurden. Sie vertrauen ihm, weil sie es mitgestaltet haben. Beim Go-live braucht es keine Einführungskampagne. Das Team nutzt das System bereits.

Dieser Nutzen wird oft unterschätzt. Viele technisch solide KI-Systeme scheitern, weil die Nutzenden ihnen nicht vertrauen. Forward-deployed Engineering baut dieses Vertrauen während des Baus auf.

## Was es vom Kunden verlangt

Das Modell verlangt auch etwas vom Kunden. Forward-deployed Engineers brauchen einen Arbeitsplatz nahe beim Team und früh Zugang zu einer Testumgebung. Sie müssen die tägliche Arbeit beobachten dürfen, auch die weniger schönen Teile. Vor allem brauchen sie eine fachlich verantwortliche Person, die in Tagen entscheidet, nicht in Wochen. Sind diese Bedingungen erfüllt, kann ein erster Workflow in einem Monat in Produktion gehen. Fehlen sie, hilft auch gutes Engineering wenig.

## Wann es das richtige Modell ist

Forward Deployment lohnt sich, wenn die Arbeit komplex und implizit ist, die Daten sensibel sind und die Adoption so wichtig ist wie die Technik. Das trifft auf die meisten KI-Vorhaben in regulierten Firmen zu. Für Standardkomponenten ist es weniger wichtig. Deshalb kombinieren wir es mit einem Delivery-Netzwerk, das diese effizient baut.

Wenn Sie einen KI-Partner auswählen, fragen Sie, wo seine Ingenieure sitzen werden. Fragen Sie, wie viel Zeit sie mit den Menschen verbringen, die die Arbeit machen. Und wer entscheidet, was Ihre Umgebung verlässt. Die Antworten sagen viel darüber, ob das System in Produktion kommt.
