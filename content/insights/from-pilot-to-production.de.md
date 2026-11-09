---
title: Vom Pilot zur Produktion: Warum die meisten KI-Piloten stecken bleiben und welche fünf Dinge sie live bringen
summary: Der Pilot funktionierte in der Demo. Sechs Monate später ist er immer noch ein Pilot. Die Gründe sind vorhersehbar, die Lösungen auch.
author: Emineon · Practice Agentisches Engineering
---

Fast jede Firma, mit der wir sprechen, hat einen KI-Piloten. Weniger haben einen in Produktion, und noch weniger einen, auf den sich ein ganzes Team jeden Tag verlässt. Die Lücke zwischen Demo und Alltagswerkzeug ist der Ort, an dem heute der grösste Teil des KI-Nutzens verloren geht, und selten liegt es an den Fähigkeiten der Modelle. Die Modelle sind gut genug. Was scheitert, ist alles rundherum.

Nachdem wir eine Reihe festgefahrener Piloten in Produktion gebracht haben, sehen wir immer wieder dieselben fünf Ursachen. Keine davon ist exotisch. Alle lassen sich ab der ersten Woche angehen, wenn jemand es entscheidet.

## 1. Der Pilot wurde aus Begeisterung gewählt, nicht nach Wert

Piloten werden oft gewählt, weil jemand begeistert war oder weil sie eine gute Demo abgaben. Ein Chatbot über das Personalreglement ist leicht gebaut und angenehm vorzuführen. Er bewegt selten eine Kennzahl, die die Geschäftsleitung verfolgt.

Wenn der Pilot endet, lautet die Frage: Sollen wir echtes Geld ausgeben, um ihn in Produktion zu bringen? Ohne Ausgangslage und Business Case ist die ehrliche Antwort oft Nein, und das Projekt endet leise. Der Pilot ist nicht technisch gescheitert. Er ist gescheitert, weil niemand sagen konnte, was er wert war.

Die Lösung: den ersten Workflow so wählen, wie es ein Finanzteam täte. Wo verbringen qualifizierte Leute Stunden mit Arbeit, die repetitiv, aber nicht trivial ist? Was kostet eine Stunde dieser Arbeit, und wie viele Stunden sind es? Können wir die heutige Durchlaufzeit und Fehlerquote messen? Ein Workflow für Bestätigungen, KYC-Dossiers oder regulatorische Entwürfe schlägt einen allgemeinen Assistenten meist bei allen drei Fragen.

## 2. Niemand hat aufgeschrieben, was «gut» bedeutet

In einer Demo wird Qualität nach Augenmass beurteilt. Jemand stellt eine Frage, die Antwort wirkt plausibel, alle nicken. In Produktion reicht plausibel nicht. Ein falsch extrahiertes Feld aus einer Bestätigung, ein Satz in einem KYC-Dossier, der das falsche Dokument zitiert, eine Übersetzung, die eine rechtliche Pflicht abschwächt: Jedes davon kostet real.

Piloten, die in Produktion kommen, haben fast immer ein Evaluationsset: eine Sammlung echter Fälle mit bekannten korrekten Antworten, geschrieben bevor das System gebaut wird, und bei jeder Änderung ausgeführt. Es verwandelt eine Debatte darüber, ob das System gut ist, in eine Zahl, und macht den Go-live-Entscheid zur Frage einer vereinbarten Schwelle.

Das Evaluationsset zu schreiben ist nicht glamourös. Es braucht Zeit von Leuten, die die Arbeit kennen, und wird deshalb übersprungen. Es ist zugleich der beste Indikator, den wir kennen, ob ein System in Produktion kommt und dort bleibt.

## 3. Die schwierigen zehn Prozent wurden aufgeschoben

Die meisten Geschäftsprozesse bestehen zu neunzig Prozent aus Routine und zu zehn Prozent aus Ausnahmen. Demos decken die neunzig ab. Über die Produktion entscheiden die zehn: das gescannte Fax, die Bestätigung mit zwei Geschäften, das Kundendossier auf Italienisch, obwohl das System auf Französisch getestet wurde, die Gegenpartei mit eigener Vorlage.

Ein System, das Routinefälle bewältigt und bei den übrigen unberechenbar versagt, ist schlimmer als nutzlos, weil niemand seinen Ergebnissen trauen kann. Die Antwort ist nicht, zuerst die Ausnahmen zu automatisieren. Sondern für sie zu gestalten: Das System muss wissen, wann es unsicher ist, es sagen und den Fall mit den Belegen an einen Menschen weiterleiten.

> Ein guter Agent ist nicht einer, der immer recht hat. Sondern einer, der weiss, wann er falsch liegen könnte, und es sagt, bevor sich jemand darauf verlässt.

Das ist eher ein Gestaltungs- als ein Modellierungsentscheid. Konfidenzschwellen, explizite Prüfungen gegen Quellsysteme und eine klare Prüf-Queue machen aus Ausnahmen keinen Grund zum Abbruch, sondern einen normalen Teil des Workflows.

## 4. Der Pilot lebte ausserhalb der echten Systeme

Viele Piloten laufen in einer Sandbox: Dokumente von Hand hochgeladen, Ergebnisse von einem Menschen ins echte System kopiert. Zum Lernen ist das in Ordnung, aber der Pilot trifft nie auf die harten Probleme der Produktion: Authentifizierung, Berechtigungen, Rate Limits, Datenhaltung, Protokollierung und das Change Board.

Wenn er dann richtig angebunden werden soll, ist der Aufwand grösser als der ursprüngliche Pilot, und jemand muss ihn von Grund auf finanzieren. Sicherheits- und Compliance-Teams, die die Architektur zum ersten Mal sehen, stellen Fragen, die Monate früher hätten gestellt werden sollen.

Wir bauen erste Workflows heute ab dem ersten Tag in der Umgebung des Kunden, auch wenn das anfangs nur eine Nur-Lese-Verbindung zu einem System bedeutet. In Woche eins ist das langsamer, in Woche sechs viel schneller. Und das Risk-Team prüft eine echte Architektur, keine Folie.

## 5. Nach dem Go-live war niemand verantwortlich

Die letzte Ursache ist die leiseste. Ein System geht live, das Projektteam zieht weiter, und niemand ist verantwortlich. Sechs Monate später ändert ein Modellanbieter etwas, die Genauigkeit driftet, die Nutzenden verlieren das Vertrauen und kehren zum alten Weg zurück. Es wird nie ein Störfall gemeldet. Das System wird einfach nicht mehr genutzt.

KI-Systeme brauchen eine verantwortliche Person auf der Fachseite und einen Betreiber auf der technischen Seite, mit einem Monitoring-Dashboard und einem geplanten Review. Die Fachseite entscheidet, was das System tun soll; der Betrieb sorgt dafür, dass es das weiterhin tut. Ohne beide verfällt jedes KI-System.

## Wie es aussieht, wenn es funktioniert

Fügt man die fünf Lösungen zusammen, entsteht ein Muster. Einen Workflow mit messbarer Ausgangslage wählen. Das Evaluationsset aus echten Fällen schreiben, bevor gebaut wird. Für Ausnahmen gestalten, mit einer menschlichen Prüf-Queue. Von Anfang an in der echten Umgebung bauen. Vor dem Go-live eine verantwortliche Person und einen Betreiber benennen.

Nichts davon erfordert ein grosses Team. Unser übliches erstes Mandat dauert dreissig Tage von der Eingrenzung bis zum Workflow in Produktion, umgesetzt von einem kleinen Senior-Team, eingebettet beim Kunden. Der Engpass ist selten die Engineering-Zeit. Sondern die Disziplin, diese Entscheide früh zu treffen, und der Zugang zu den Leuten, die die Arbeit kennen.

- Woche 1: Workflow wählen, Ausgangslage messen, Evaluationsset schreiben.
- Woche 2: in der Kundenumgebung bauen, gegen das Evaluationsset.
- Woche 3: echte Nutzende an echter Arbeit; Ausnahmen behandeln; Zugriffskontrolle und Audit ergänzen.
- Woche 4: Produktivsetzung, Verantwortliche und Betrieb benannt, Ergebnis gegen die Ausgangslage gemessen.

Der erste Workflow ist selten der wertvollste. Sein eigentlicher Zweck ist der Nachweis, dass die Firma KI von der Idee in die Produktion bringen kann, und der Aufbau von Plattform, Kontrollen und Gewohnheiten, die den zweiten und dritten Workflow viel günstiger machen. Dann hört KI auf, ein Pilotprogramm zu sein, und wird Teil der Arbeitsweise der Firma.
