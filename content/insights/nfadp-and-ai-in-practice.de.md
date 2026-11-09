---
title: revDSG und KI in der Praxis. Was der Schweizer Datenschutz von einem KI-System verlangt und wie wir dafür planen
summary: Das revidierte Bundesgesetz über den Datenschutz gilt seit dem 1. September 2023, auch für KI. Das bedeutet es für ein System, das Sie in Produktion bringen wollen.
author: Emineon · Practice Daten & Plattformen
---

Jedes KI-Projekt in einer Schweizer Firma kommt irgendwann zum Datenschutzberater. Oft geschieht das spät, wenn der Pilot schon gebaut ist. Dann wird verhandelt, was rückgängig gemacht werden muss. Das lässt sich vermeiden. Das revidierte Datenschutzgesetz ist seit dem 1. September 2023 in Kraft. Es ist prinzipienbasiert und recht klar. Wer von Anfang an dafür plant, zahlt wenig und vermeidet einen häufigen Grund für stockende KI-Projekte.

Dieser Artikel ist eine Zusammenfassung aus der Praxis, keine Rechtsberatung. Er behandelt die Pflichten, die die Gestaltung eines KI-Systems am häufigsten prägen. Und die Entscheide, die wir treffen, um sie zu erfüllen.

## Das Gesetz gilt bereits für KI

Die Schweiz hat kein eigenes KI-Gesetz. Der Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB) hat klargestellt, dass das geltende Datenschutzrecht direkt auf KI-gestützte Bearbeitungen von Personendaten anwendbar ist. Der Bundesrat will die KI-Konvention des Europarats ratifizieren und das Schweizer Recht sektoriell anpassen. Den EU AI Act übernimmt er nicht. Für eine Schweizer Firma ist der Ausgangspunkt daher das revDSG. Dazu kommt der EU AI Act, wo Systeme oder ihre Ergebnisse den EU-Markt erreichen.

Ein Detail zum Geltungsbereich ist wichtig. Das revDSG schützt nur natürliche Personen. Daten über Unternehmen sind nicht mehr erfasst, was viele B2B-Workflows vereinfacht. Daten über die Menschen in diesen Unternehmen sind weiterhin erfasst.

## Fünf Pflichten, die die Gestaltung prägen

### 1. Datenschutz durch Technik und datenschutzfreundliche Voreinstellungen

Das Gesetz verlangt, den Datenschutz in die technische und organisatorische Gestaltung einzubauen. Die Voreinstellungen beschränken die Bearbeitung auf das Nötige. Für ein KI-System heisst das konkret folgendes. Dem Modell nur die Felder übergeben, die eine Aufgabe braucht. Identifikatoren entfernen oder maskieren, wo sie nicht nötig sind. Vollständige Prompts mit Personendaten nicht unbegrenzt protokollieren. Die vorsichtige Einstellung zum Standard machen.

### 2. Transparenz und automatisierte Einzelentscheidungen

Betroffene müssen über die Bearbeitung ihrer Personendaten informiert werden. Eine ausschliesslich automatisierte Entscheidung kann eine Rechtsfolge haben oder eine Person erheblich beeinträchtigen. Dann muss der Verantwortliche die Person informieren. Die Person kann ihren Standpunkt darlegen und eine Überprüfung durch einen Menschen verlangen.

Deshalb behalten die meisten unserer Systeme einen Menschen im Prozess. Der Agent bereitet vor, ein Mensch entscheidet. Wo volle Automatisierung gerechtfertigt ist, planen wir Informationspflicht und menschliche Überprüfung von Anfang an mit.

### 3. Datenschutz-Folgenabschätzung

Bringt eine Bearbeitung ein hohes Risiko für die Persönlichkeit oder die Grundrechte der Betroffenen mit sich, braucht es vorgängig eine Datenschutz-Folgenabschätzung. Typische Auslöser sind neue Technologien, grosse Mengen besonders schützenswerter Daten und systematische Überwachung. Nicht jedes KI-System braucht eine. Systeme, die Profile erstellen, Gesundheits- oder Finanzdaten in grossem Umfang bearbeiten oder über Einzelpersonen entscheiden, sollten aber geprüft werden.

### 4. Verzeichnis der Bearbeitungstätigkeiten

Verantwortliche führen ein Verzeichnis ihrer Bearbeitungstätigkeiten. Ausgenommen sind Unternehmen mit weniger als 250 Mitarbeitenden, deren Bearbeitungen nur ein geringes Risiko für die Betroffenen bergen. Viele mittelgrosse Firmen fallen darunter. Wer besonders schützenswerte Daten in grossem Umfang bearbeitet, meist nicht. KI-Systeme sollten in jedem Fall dokumentiert sein. Welche Daten, zu welchem Zweck, welche Auftragsbearbeiter, wo und wie lange gespeichert.

### 5. Meldung von Verletzungen der Datensicherheit

Eine Verletzung der Datensicherheit mit voraussichtlich hohem Risiko für die Betroffenen ist dem EDÖB so rasch als möglich zu melden. Für KI-Systeme heisst das, die Flüsse von Personendaten zu kennen, auch zu Modellanbietern. Und die Protokollierung muss reichen, um festzustellen, was passiert ist.

## Besonders schützenswerte Daten und grenzüberschreitende Flüsse

Das revDSG hat die besonders schützenswerten Personendaten um genetische und biometrische Daten erweitert. Dazu gehören unter anderem auch Gesundheitsdaten, religiöse und politische Ansichten und strafrechtliche Daten. Ihre Bearbeitung erhöht die Anforderungen an Einwilligung, Sicherheit und Abschätzung.

Personendaten dürfen in Länder bekanntgegeben werden, deren Datenschutz der Bundesrat als angemessen anerkennt. Sonst braucht es geeignete Garantien wie Standardvertragsklauseln. Hier fallen in der Praxis die meisten Architekturentscheide. Eine Modell-API ausserhalb der Schweiz oder der EU ist eine Bekanntgabe ins Ausland. Ein Modell in einer Schweizer Region oder auf Ihrer eigenen Infrastruktur nicht.

> Wir wählen das beste Modell unter denen, die diese Daten rechtmässig sehen dürfen.

## Wie wir dafür gestalten

Wir übersetzen diese Pflichten in wenige Architekturstandards. Sie gelten für jedes System, das wir für Schweizer Kunden bauen.

- Datenklassifizierung bei der Aufnahme. Jede Quelle und jedes Feld wird klassifiziert. Die Klassifizierung bestimmt, welche Modelle und Regionen die Daten bearbeiten dürfen.
- Ein Modell-Gateway. Alle Modellaufrufe laufen über einen kontrollierten Punkt. Er setzt das Routing nach Datenklasse durch, protokolliert Metadaten und blockiert unzulässige Flüsse.
- Datenhaltung als Standard. Personen- und vertrauliche Daten werden in der Schweiz oder im Tenant des Kunden bearbeitet. Modellanbieter sind vertraglich zu keiner Speicherung und keinem Training verpflichtet.
- Minimierung in Prompts. Agenten holen nur, was ein Schritt braucht. Identifikatoren werden maskiert, wo die Aufgabe sie nicht erfordert.
- Menschliche Entscheidungspunkte. Betrifft ein Ergebnis eine Person, gibt ein Mensch frei. Das System hält fest, wer freigegeben hat und auf welcher Grundlage.
- Dokumentation als Ergebnis. Ein Bearbeitungsverzeichnis, ein Datenflussdiagramm und bei Bedarf eine Folgenabschätzung werden mit dem System geliefert.

## Der EU AI Act in Kürze

Der EU AI Act ist im August 2024 in Kraft getreten. Die Pflichten werden zwischen 2025 und 2027 schrittweise wirksam. Er gilt für Anbieter und Betreiber, deren Systeme in der EU in Verkehr gebracht oder deren Ergebnisse in der EU verwendet werden. Das kann Schweizer Firmen einschliessen. Er teilt Systeme nach Risiko ein. Einige Praktiken sind verboten. Hochrisiko-Anwendungen wie Kreditwürdigkeitsprüfung, Personalentscheide und bestimmte Sicherheitskomponenten tragen schwere Pflichten. Die meisten internen Produktivitätssysteme haben nur leichte Transparenzpflichten.

Die oben beschriebenen Standards sind menschliche Aufsicht, Dokumentation, Protokollierung und Evaluation. Sie bilden auch den Kern dessen, was der AI Act von Hochrisiko-Systemen verlangt. Wer das revDSG gut umsetzt, ist auch für den AI Act schon weit.

## Den Datenschutzberater in Woche eins einbeziehen

Der wirksamste Schritt ist prozedural. Beziehen Sie Datenschutzberater und Risikofunktion in der ersten Woche ein. Zeigen Sie ihnen Datenflüsse und Architektur. Vereinbaren Sie die Regeln zu Klassifizierung und Datenhaltung, bevor gebaut wird. Nach unserer Erfahrung bremsen Datenschutzteams vor allem Projekte, die sie spät einbeziehen. Früh einbezogen, helfen sie, ein System in Produktion zu bringen.
