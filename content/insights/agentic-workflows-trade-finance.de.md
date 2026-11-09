---
title: Agentische Workflows in der Handelsfinanzierung: wo Agenten sich bezahlt machen und wo sie nicht allein handeln dürfen
summary: Rohstoffhandel lebt von Dokumenten. Agenten können fast alle lesen, abgleichen und vorprüfen. Die Kunst liegt darin, zu entscheiden, welche Schritte sie selbstständig gehen.
author: Emineon · Practice Rohstoffe & Handel
---

Genf ist weltweit führend in der Handelsfinanzierung, und zwölf der vierzehn Schweizer Handelsfinanzierungsbanken sind hier ansässig. Um sie herum sind rund 400 Handelsfirmen tätig. Zwischen einem am Desk abgeschlossenen Geschäft und dem Zahlungseingang führt jede dieser Firmen eine lange Kette von Dokumenten: Recaps, Bestätigungen, Akkreditive, Konnossemente, Ursprungs- und Qualitätszertifikate, Inspektionsberichte, Rechnungen und die Korrespondenz, die alles zusammenhält.

Das ist ein nahezu ideales Feld für agentische KI. Die Dokumente sind halbstrukturiert, die Regeln bekannt, Verzögerungen teuer und die Leute, die die Arbeit machen, erfahren und kostspielig. Es ist aber auch ein Feld, in dem ein Fehler eine Zahlung, eine Ladung oder eine Bankbeziehung kosten kann. Die Frage ist also nicht, ob man Agenten einsetzt, sondern wie man die Arbeit zwischen Agenten und Menschen aufteilt.

## Was ein Agent hier tatsächlich tut

Ein Agent ist ein System, das seine Eingaben liest, über eine Abfolge von Schritten entscheidet und Werkzeuge nutzt, um sie auszuführen. In Handels-Operations sind die Werkzeuge meist gewöhnlich: das Postfach lesen, ein PDF verarbeiten, das ETRM abfragen, eine Sanktionsliste prüfen, eine E-Mail entwerfen, einen Status aktualisieren. Agentisch wird es dadurch, dass die Abfolge nicht im Voraus feststeht. Eine perfekt passende Bestätigung braucht drei Schritte. Eine mit abweichender Preisformel braucht sieben, darunter einen Vergleich mit dem ursprünglichen Recap und einen Entwurf für eine Rückfrage an die Gegenpartei.

Drei Workflows stechen heraus, gemessen am Nutzen im Verhältnis zum Risiko.

### Abgleich von Bestätigungen

Bestätigungen von Gegenparteien kommen per E-Mail in jedem erdenklichen Format. Jede muss mit dem gebuchten Geschäft verglichen werden: Menge und Toleranz, Preis und Formel, Lieferperiode, Incoterm, Lade- und Löschhafen, Zahlungsbedingungen, anwendbares Recht. Ein Agent kann die Konditionen extrahieren, das Geschäft abfragen, Feld für Feld vergleichen und das Ergebnis als abgeglichen, abweichend oder unsicher einstufen. Das Operations-Team bearbeitet dann nur noch Abweichungen und Unsicherheiten, mit hervorgehobenen Belegen.

### Vorprüfung von Akkreditiven

Abweichungen zwischen einem Akkreditiv und den vorgelegten Dokumenten sind eine klassische Quelle von Verzögerungen und Kosten. Ein Agent kann die Akkreditivbedingungen als Checkliste extrahieren, jedes eintreffende Dokument lesen und Unstimmigkeiten melden, bevor die Dokumente zur Bank gehen: ein anders geschriebener Hafen, eine Menge ausserhalb der Toleranz, ein Datum, das nicht zur Verschiffungsperiode passt. Der Entscheid, einzureichen, eine Änderung zu verlangen oder um einen Verzicht zu bitten, bleibt beim Dokumententeam.

### KYC-Aktualisierung von Gegenparteien

Periodische Überprüfungen von Gegenparteien erfordern Handelsregisterauszüge, Angaben zu wirtschaftlich Berechtigten, Jahresabschlüsse und negative Presseberichte, oft in der Originalsprache. Ein Agent kann das Dossier zusammenstellen, zusammenfassen, was sich seit der letzten Überprüfung geändert hat, und auflisten, was fehlt. Eine Compliance-Verantwortliche prüft und entscheidet.

## Wo Agenten nicht allein handeln dürfen

Das Leitprinzip ist einfach: Autonomie soll der Umkehrbarkeit und dem Risiko folgen. Lesen, Extrahieren, Vergleichen und Entwerfen sind umkehrbar und risikoarm. Senden, Verpflichten, Genehmigen und Freigeben sind es nicht.

- Sanktionsentscheide. Ein Agent kann Namen und Schiffe prüfen und erklären, warum ein Treffer auftrat. Den Treffer aufzulösen oder zu eskalieren ist ein Compliance-Entscheid mit einer namentlich verantwortlichen Person.
- Alles, was Geld bindet oder einen Vertrag ändert. Zahlungsfreigaben, Änderungen und Verzichte gehen jedes Mal über einen Menschen.
- Externe Kommunikation mit kommerziellen Folgen. Entwürfe sind nützlich; eine Antwort zu senden, die der Gegenpartei einen Punkt zugesteht, ist ein kommerzieller Akt.
- Änderungen an gebuchten Geschäften. Agenten können Korrekturen im ETRM vorschlagen; ein Mensch nimmt sie vor.

In der Praxis entsteht so ein Workflow, in dem der Agent den Grossteil des Lesens und Vergleichens übernimmt und Menschen ihre Zeit für Entscheide einsetzen. Das ist die richtige Arbeitsteilung. Es ist auch das, was Revision, Banken und Aufsicht sehen wollen.

## Für die Dokumente gestalten, die tatsächlich eintreffen

Die Schwierigkeit bei Handelsdokumenten liegt nicht im Lesen sauberer PDFs. Sondern im gescannten Zertifikat mit einem Stempel über dem entscheidenden Feld, in der Bestätigung für zwei Geschäfte, im Recap, das in einem Chat geschrieben und in eine E-Mail kopiert wurde, im Konnossement mit handschriftlichen Korrekturen. Ein System, das nur mit sauberen Beispielen getestet wurde, glänzt in der Demo und enttäuscht in Woche zwei.

Wir beginnen jedes Mandat in Handels-Operations damit, einige Hundert echte historische Dokumente mit bekanntem Ergebnis zu sammeln, bewusst auch die hässlichen. Sie werden zum Evaluationsset. Das System geht erst in Produktion, wenn es darauf die vereinbarte Genauigkeit erreicht, und jede spätere Korrektur einer Mitarbeiterin wird ins Set aufgenommen, damit derselbe Fehler nicht unbemerkt zurückkehrt.

> Das Ziel ist nicht ein Agent, der nie einen Menschen braucht. Sondern ein Operations-Team, das nie wieder ein Feld abtippen muss.

## Die Kontrollen, die es akzeptabel machen

Handelsfirmen stehen unter der Beobachtung ihrer Banken ebenso wie ihrer Aufsicht. Ein agentisches System in diesem Umfeld braucht Kontrollen, die der Due Diligence einer Bank genügen würden.

- Standardmässig Nur-Lese-Zugriff auf ETRM und Kernsysteme; Schreibzugriff auf bestimmte Aktionen beschränkt und protokolliert.
- Ein lückenloser Audit-Trail: das eingegangene Dokument, was der Agent extrahiert, verglichen und geschlossen hat und wer freigegeben hat.
- Konfidenz pro Feld und ausdrückliche Unsicherheit, damit Prüfende wissen, wo sie hinschauen müssen.
- Datenhaltung für Gegenpartei- und Handelsdaten in der Schweiz oder im eigenen Tenant der Firma.
- Modellunabhängigkeit, damit ein Anbieterwechsel keinen Neubau bedeutet.

## Was es bringt

In repräsentativen Mandaten sinkt die Bearbeitungszeit für Bestätigungen um mehr als die Hälfte, und die Mehrheit der Bestätigungen wird abgeglichen, ohne dass jemand ein Feld abtippt. Abweichungen werden am selben Tag statt Tage später gemeldet. Ebenso wichtig: Das Wissen, das bei wenigen erfahrenen Mitarbeitenden lag, steckt jetzt in Abgleichregeln und Evaluationsfällen, die das ganze Team teilt.

Der grösste Nutzen ist oft strategisch. Handelsvolumen schwanken. Eine Firma, die einen Volumensprung bewältigen kann, ohne ein neues Operations-Team einzustellen, hat mehr Spielraum, Chancen zu nutzen, wenn sich die Märkte bewegen. Für eine Branche, die über Tempo und Zuverlässigkeit konkurriert, ist das ein Vorsprung, der zählt.
