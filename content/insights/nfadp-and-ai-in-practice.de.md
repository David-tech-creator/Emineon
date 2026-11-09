---
title: revDSG und KI in der Praxis: Was der Schweizer Datenschutz von einem KI-System verlangt und wie man dafür gestaltet
summary: Das revidierte Bundesgesetz über den Datenschutz gilt seit dem 1. September 2023, und es gilt direkt für KI. Das bedeutet es für ein System, das Sie in Produktion bringen wollen.
author: Emineon · Practice Daten & Plattformen
---

Jedes KI-Projekt in einer Schweizer Firma trifft früher oder später auf den Datenschutzberater. Zu oft geschieht das spät, wenn der Pilot schon gebaut ist, und wird zur Verhandlung darüber, was rückgängig gemacht werden muss. Das muss nicht so sein. Das revidierte Datenschutzgesetz, in Kraft seit dem 1. September 2023, ist prinzipienbasiert und recht klar. Von Anfang an dafür zu gestalten kostet wenig und beseitigt einen häufigen Grund, warum KI-Projekte stocken.

Dieser Artikel ist eine Zusammenfassung aus der Praxis, keine Rechtsberatung. Er behandelt die Pflichten, die die Gestaltung eines KI-Systems am häufigsten prägen, und die Entscheide, die wir treffen, um sie zu erfüllen.

## Das Gesetz gilt bereits für KI

Die Schweiz hat kein eigenes KI-Gesetz. Der Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB) hat klargestellt, dass das geltende Datenschutzrecht direkt auf KI-gestützte Bearbeitungen von Personendaten anwendbar ist. Der Bundesrat hat entschieden, die KI-Konvention des Europarats zu ratifizieren und das Schweizer Recht sektoriell anzupassen, statt den EU AI Act zu übernehmen. Für eine Schweizer Firma ist der praktische Ausgangspunkt daher das revDSG, ergänzt um den EU AI Act, wo Systeme oder ihre Ergebnisse den EU-Markt erreichen.

Ein Detail zum Geltungsbereich ist wichtig: Das revDSG schützt nur natürliche Personen. Daten über Unternehmen sind nicht mehr erfasst, was viele B2B-Workflows vereinfacht. Daten über die Menschen in diesen Unternehmen sind es weiterhin.

## Fünf Pflichten, die die Gestaltung prägen

### 1. Datenschutz durch Technik und datenschutzfreundliche Voreinstellungen

Das Gesetz verlangt, den Datenschutz in die technische und organisatorische Gestaltung der Bearbeitung einzubauen und Voreinstellungen so zu wählen, dass die Bearbeitung auf das Nötige beschränkt bleibt. Für ein KI-System heisst das konkret: dem Modell nur die Felder übergeben, die eine Aufgabe braucht; Identifikatoren entfernen oder maskieren, wo sie nicht nötig sind; vollständige Prompts mit Personendaten nicht unbegrenzt protokollieren; die vorsichtige Einstellung zum Standard machen.

### 2. Transparenz und automatisierte Einzelentscheidungen

Betroffene müssen über die Bearbeitung ihrer Personendaten informiert werden. Hat eine ausschliesslich automatisierte Entscheidung eine Rechtsfolge für eine Person oder beeinträchtigt sie diese erheblich, muss der Verantwortliche sie darüber informieren, und die Person kann verlangen, ihren Standpunkt darzulegen und die Entscheidung von einem Menschen überprüfen zu lassen.

Die meisten Systeme, die wir bauen, behalten genau deshalb einen Menschen im Prozess: Der Agent bereitet vor, ein Mensch entscheidet. Wo volle Automatisierung gerechtfertigt ist, müssen Informationspflicht und menschliche Überprüfung von Anfang an mitgestaltet werden, nicht nachträglich.

### 3. Datenschutz-Folgenabschätzung

Kann eine Bearbeitung ein hohes Risiko für die Persönlichkeit oder die Grundrechte der Betroffenen mit sich bringen, ist vorgängig eine Datenschutz-Folgenabschätzung nötig. Neue Technologien, grosse Mengen besonders schützenswerter Daten und systematische Überwachung sind typische Auslöser. Nicht jedes KI-System braucht eine, aber jedes System, das Profile erstellt, Gesundheits- oder Finanzdaten in grossem Umfang bearbeitet oder über Einzelpersonen entscheidet, sollte geprüft werden.

### 4. Verzeichnis der Bearbeitungstätigkeiten

Verantwortliche müssen ein Verzeichnis ihrer Bearbeitungstätigkeiten führen. Ausgenommen sind Unternehmen mit weniger als 250 Mitarbeitenden, deren Bearbeitungen nur ein geringes Risiko für die Betroffenen bergen. Viele mittelgrosse Firmen fallen darunter; wer besonders schützenswerte Daten in grossem Umfang bearbeitet, meist nicht. So oder so sollten KI-Systeme dokumentiert sein: welche Daten, zu welchem Zweck, welche Auftragsbearbeiter, wo und wie lange gespeichert.

### 5. Meldung von Verletzungen der Datensicherheit

Eine Verletzung der Datensicherheit, die voraussichtlich zu einem hohen Risiko für die Betroffenen führt, ist dem EDÖB so rasch als möglich zu melden. Für KI-Systeme bedeutet das, zu wissen, wohin Personendaten fliessen, auch zu Modellanbietern, und eine Protokollierung zu haben, die gut genug ist, um festzustellen, was passiert ist.

## Besonders schützenswerte Daten und grenzüberschreitende Flüsse

Das revDSG hat die Kategorien besonders schützenswerter Personendaten um genetische und biometrische Daten erweitert, neben unter anderem Gesundheitsdaten, religiösen und politischen Ansichten und strafrechtlichen Daten. Ihre Bearbeitung erhöht die Anforderungen an Einwilligung, Sicherheit und Abschätzung.

Die Bekanntgabe von Personendaten ins Ausland ist zulässig in Länder, deren Datenschutz der Bundesrat als angemessen anerkennt, oder mit geeigneten Garantien wie Standardvertragsklauseln. In der Praxis fallen hier die meisten Architekturentscheide. Eine Modell-API ausserhalb der Schweiz oder der EU ist eine Bekanntgabe ins Ausland; ein Modell in einer Schweizer Region oder auf Ihrer eigenen Infrastruktur nicht.

> Die Frage ist nicht, welches Modell das beste ist. Sondern welches das beste unter denen ist, die diese Daten rechtmässig sehen dürfen.

## Wie wir dafür gestalten

Wir übersetzen diese Pflichten in wenige Architekturstandards, die für jedes System gelten, das wir für Schweizer Kunden bauen.

- Datenklassifizierung bei der Aufnahme. Jede Quelle und jedes Feld wird klassifiziert, und die Klassifizierung bestimmt, welche Modelle und Regionen sie bearbeiten dürfen.
- Ein Modell-Gateway. Alle Modellaufrufe laufen über einen kontrollierten Punkt, der das Routing nach Datenklasse durchsetzt, Metadaten protokolliert und unzulässige Flüsse blockiert.
- Datenhaltung als Standard. Personen- und vertrauliche Daten werden in der Schweiz oder im Tenant des Kunden bearbeitet. Modellanbieter sind vertraglich zu keiner Speicherung und keinem Training verpflichtet.
- Minimierung in Prompts. Agenten holen nur, was ein Schritt braucht; Identifikatoren werden maskiert, wo die Aufgabe sie nicht erfordert.
- Menschliche Entscheidungspunkte. Wo ein Ergebnis eine Person betrifft, gibt ein Mensch frei, und das System hält fest, wer und auf welcher Grundlage.
- Dokumentation als Ergebnis. Ein Bearbeitungsverzeichnis, ein Datenflussdiagramm und bei Bedarf eine Folgenabschätzung werden mit dem System geliefert.

## Der EU AI Act in Kürze

Der EU AI Act ist im August 2024 in Kraft getreten, die Pflichten werden zwischen 2025 und 2027 schrittweise wirksam. Er gilt für Anbieter und Betreiber, deren Systeme in der EU in Verkehr gebracht werden oder deren Ergebnisse in der EU verwendet werden, was Schweizer Firmen einschliessen kann. Er teilt Systeme nach Risiko ein: Einige Praktiken sind verboten; Hochrisiko-Anwendungen wie Kreditwürdigkeitsprüfung, Personalentscheide und bestimmte Sicherheitskomponenten tragen schwere Pflichten; die meisten internen Produktivitätssysteme nur leichte Transparenzpflichten.

Die oben beschriebenen Standards, menschliche Aufsicht, Dokumentation, Protokollierung und Evaluation, bilden auch den Kern dessen, was der AI Act von Hochrisiko-Systemen verlangt. Wer das revDSG gut umsetzt, hat den grössten Teil des Wegs zur AI-Act-Bereitschaft zurückgelegt.

## Den Datenschutzberater in Woche eins einbeziehen

Der wirksamste einzelne Schritt ist prozedural. Beziehen Sie Datenschutzberater und Risikofunktion in der ersten Woche ein, zeigen Sie ihnen Datenflüsse und Architektur, und vereinbaren Sie die Regeln zu Klassifizierung und Datenhaltung, bevor gebaut wird. Unserer Erfahrung nach sind Datenschutzteams nicht das Hindernis für KI. Sie sind das Hindernis für KI-Projekte, die sie ignoriert haben. Früh einbezogen, werden sie zu denen, die Produktion möglich machen.
