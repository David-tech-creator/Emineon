---
title: Vom Pilot zur Produktion. Warum viele KI-Piloten stecken bleiben und fünf Punkte, die helfen
summary: Der Pilot funktionierte in der Demo. Sechs Monate später ist er immer noch ein Pilot. Die Gründe sind bekannt, und die Lösungen auch.
author: Emineon · Practice Agentisches Engineering
---

Fast jede Firma, mit der wir sprechen, hat einen KI-Piloten. Weniger haben einen in Produktion. Noch weniger haben einen, den ein ganzes Team jeden Tag nutzt. Zwischen Demo und Alltagswerkzeug geht heute viel KI-Nutzen verloren. Selten liegt es an den Modellen. Die Modelle sind gut genug. Die Schwierigkeiten liegen im Umfeld.

Wir haben mehrere festgefahrene Piloten in Produktion gebracht. Dabei sehen wir immer wieder dieselben fünf Ursachen. Keine davon ist ungewöhnlich. Alle lassen sich ab der ersten Woche angehen, wenn jemand es entscheidet.

## 1. Der Pilot wurde aus Begeisterung gewählt, nicht nach Wert

Piloten werden oft gewählt, weil jemand begeistert war oder weil sie sich gut vorführen lassen. Ein Chatbot über das Personalreglement ist schnell gebaut und angenehm zu zeigen. Eine Kennzahl der Geschäftsleitung bewegt er selten.

Am Ende des Piloten stellt sich die Frage nach dem Budget für die Produktion. Ohne Ausgangslage und Business Case lautet die Antwort oft Nein, und das Projekt endet leise. Der Pilot ist technisch nicht gescheitert. Es konnte nur niemand sagen, was er wert war.

Die Lösung ist, den ersten Workflow so zu wählen wie ein Finanzteam. Wo verbringen qualifizierte Leute Stunden mit repetitiver, aber anspruchsvoller Arbeit? Was kostet eine Stunde dieser Arbeit, und wie viele Stunden sind es? Lassen sich Durchlaufzeit und Fehlerquote heute messen? Workflows für Bestätigungen, KYC-Dossiers oder regulatorische Entwürfe schneiden bei diesen Fragen meist besser ab als ein allgemeiner Assistent.

## 2. Niemand hat aufgeschrieben, was «gut» bedeutet

In einer Demo wird Qualität nach Augenmass beurteilt. Jemand stellt eine Frage, die Antwort wirkt plausibel, alle nicken. In Produktion reicht das nicht. Ein falsch extrahiertes Feld aus einer Bestätigung hat Folgen. Ebenso ein Satz in einem KYC-Dossier, der das falsche Dokument zitiert. Oder eine Übersetzung, die eine rechtliche Pflicht abschwächt.

Piloten, die in Produktion kommen, haben fast immer ein Evaluationsset. Das ist eine Sammlung von Fällen aus der Praxis mit bekannten korrekten Antworten. Es wird vor dem Bau geschrieben und bei jeder Änderung ausgeführt. So wird aus einer Meinung eine Zahl. Der Go-live-Entscheid hängt dann an einer vereinbarten Schwelle.

Ein Evaluationsset zu schreiben ist unspektakulär. Es braucht Zeit von Leuten, die die Arbeit kennen, und wird deshalb oft übersprungen. Für uns ist es der beste Hinweis darauf, ob ein System in Produktion kommt und dort bleibt.

## 3. Die schwierigen zehn Prozent wurden aufgeschoben

Die meisten Geschäftsprozesse bestehen zu neunzig Prozent aus Routine und zu zehn Prozent aus Ausnahmen. Demos zeigen die neunzig. In der Produktion zählen die zehn. Das gescannte Fax, die Bestätigung mit zwei Geschäften, das Kundendossier auf Italienisch nach Tests auf Französisch, die Gegenpartei mit eigener Vorlage.

Ein System, das Routinefälle löst und bei den übrigen unberechenbar ist, hilft wenig. Niemand kann seinen Ergebnissen trauen. Man muss die Ausnahmen nicht zuerst automatisieren. Man muss aber für sie planen. Das System erkennt, wann es unsicher ist, sagt es und leitet den Fall mit Belegen an einen Menschen weiter.

> Ein guter Agent erkennt, wann er falsch liegen könnte. Und er sagt es, bevor sich jemand darauf verlässt.

Das ist vor allem eine Frage der Gestaltung. Konfidenzschwellen, Prüfungen gegen Quellsysteme und eine klare Prüf-Queue machen Ausnahmen zu einem normalen Teil des Workflows.

## 4. Der Pilot lebte ausserhalb der echten Systeme

Viele Piloten laufen in einer Sandbox. Dokumente werden von Hand hochgeladen, Ergebnisse von Hand ins System kopiert. Zum Lernen ist das in Ordnung. Die harten Themen der Produktion tauchen so aber nie auf. Authentifizierung, Berechtigungen, Rate Limits, Datenhaltung, Protokollierung und das Change Board.

Soll der Pilot dann angebunden werden, ist der Aufwand grösser als der Pilot selbst. Jemand muss ihn neu finanzieren. Sicherheits- und Compliance-Teams sehen die Architektur zum ersten Mal. Ihre Fragen hätten Monate früher kommen sollen.

Wir bauen erste Workflows deshalb ab dem ersten Tag in der Umgebung des Kunden. Auch wenn das anfangs nur eine Nur-Lese-Verbindung zu einem System ist. In Woche eins ist das langsamer, in Woche sechs viel schneller. Und das Risk-Team prüft eine tatsächliche Architektur statt einer Folie.

## 5. Nach dem Go-live war niemand verantwortlich

Die letzte Ursache fällt am wenigsten auf. Ein System geht live, das Projektteam zieht weiter, und niemand ist verantwortlich. Sechs Monate später ändert ein Modellanbieter etwas. Die Genauigkeit driftet, die Nutzenden verlieren das Vertrauen und arbeiten wieder wie früher. Es gibt keinen Störfall. Das System wird einfach nicht mehr genutzt.

KI-Systeme brauchen eine verantwortliche Person auf der Fachseite und einen Betreiber auf der technischen Seite. Dazu ein Monitoring-Dashboard und ein geplantes Review. Die Fachseite entscheidet, was das System tun soll. Der Betrieb sorgt dafür, dass es das weiterhin tut. Fehlt eines davon, lässt die Qualität nach.

## Wie es aussieht, wenn es funktioniert

Zusammen ergeben die fünf Lösungen ein Muster. Einen Workflow mit messbarer Ausgangslage wählen. Das Evaluationsset aus Fällen der Praxis schreiben, bevor gebaut wird. Für Ausnahmen planen, mit einer menschlichen Prüf-Queue. Von Anfang an in der Umgebung des Kunden bauen. Vor dem Go-live eine verantwortliche Person und einen Betreiber benennen.

Dafür braucht es kein grosses Team. Unser übliches erstes Mandat dauert dreissig Tage von der Eingrenzung bis zum Workflow in Produktion. Ein kleines Senior-Team arbeitet dafür beim Kunden. Der Engpass ist selten die Engineering-Zeit. Wichtiger sind frühe Entscheide und der Zugang zu den Leuten, die die Arbeit kennen.

- Woche 1. Workflow wählen, Ausgangslage messen, Evaluationsset schreiben.
- Woche 2. In der Kundenumgebung bauen, gegen das Evaluationsset.
- Woche 3. Nutzende arbeiten mit dem System an ihren Fällen. Ausnahmen behandeln, Zugriffskontrolle und Audit ergänzen.
- Woche 4. Produktivsetzung, Verantwortliche und Betrieb benannt, Ergebnis gegen die Ausgangslage gemessen.

Der erste Workflow ist selten der wertvollste. Er zeigt, dass die Firma KI von der Idee in die Produktion bringen kann. Und er schafft Plattform, Kontrollen und Gewohnheiten, die den zweiten und dritten Workflow viel günstiger machen. Dann ist KI kein Pilotprogramm mehr, sondern Teil der täglichen Arbeit.
