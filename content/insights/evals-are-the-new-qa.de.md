---
title: Evaluationen als Qualitätssicherung für KI. Wie man weiss, dass ein System bereit ist und bleibt
summary: Klassische Tests prüfen, ob Code tut, wofür er geschrieben wurde. KI-Systeme brauchen zusätzlich eine laufende Messung, ob die Qualität noch reicht.
author: Emineon · Practice KI-Betrieb
---

Softwareteams haben über Jahrzehnte Testdisziplinen aufgebaut. Unit-Tests, Integrationstests, Regressionssuiten und Continuous Integration. Sie funktionieren, weil klassische Software deterministisch ist. Dieselbe Eingabe ergibt dieselbe Ausgabe, und ein Test besteht oder scheitert.

Bei KI-Systemen gilt das nicht. Dieselbe Eingabe kann unterschiedliche Ausgaben erzeugen. Das System kann sich ändern, ohne dass sich Code ändert, etwa wenn ein Anbieter ein Modell aktualisiert. Qualität ist abgestuft. Eine Extraktion kann fast richtig sein, eine Zusammenfassung korrekt, aber unvollständig. Klassische Tests bleiben nötig, reichen aber nicht mehr.

Hier helfen Evaluationen, kurz Evals. Eine Evaluation misst strukturiert und wiederholbar, wie gut ein KI-System eine Aufgabe erfüllt. Sie läuft gegen einen festen Satz von Fällen mit bekannten guten Antworten. In unserer Arbeit sind Evaluationen die wichtigste Engineering-Praxis, um KI-Systeme in Produktion zu bringen und dort zu halten.

## Was ein gutes Evaluationsset enthält

Ein Evaluationsset ist eine Sammlung von Fällen aus der Praxis. Jeder Fall enthält die Eingabe und eine Definition der korrekten Ausgabe. Bei einer Extraktion sind das das Dokument und die korrekten Feldwerte. Bei einer Schreibaufgabe können es Quellmaterial, ein Referenzentwurf und ein Bewertungsraster sein. Vier Eigenschaften machen ein Set nützlich.

- Aus der Praxis. Die Fälle stammen aus Produktionsdaten oder getreuen Kopien davon. Synthetische Fälle können ergänzen, aber nicht ersetzen.
- Repräsentativ. Das Set spiegelt die tatsächliche Verteilung der Fälle. Auch die schwierigen zehn Prozent mit Scans, gemischten Sprachen, ungewöhnlichen Vorlagen und fehlenden Daten.
- Im Besitz der Fachseite. Wer die Arbeit macht, definiert, was korrekt ist. Ingenieure setzen die Prüfungen um und entscheiden nicht über die Antworten.
- Wachsend. Jeder Fehler aus der Produktion wird zu einem neuen Fall. So wird das Set mit der Zeit besser.

Ein erstes Set von hundert bis dreihundert Fällen reicht meist für fundierte Entscheide. Es kostet ein paar Tage Expertenzeit. Diese Zeit lohnt sich in einem KI-Projekt sehr, und sie wird oft eingespart.

## Wie man bewertet

Unterschiedliche Aufgaben brauchen unterschiedliche Bewertungen. Wir nutzen drei Arten, oft kombiniert.

### Exakte und regelbasierte Prüfungen

Strukturierte Ausgaben vergleicht man mit dem erwarteten Wert. Stimmt die Menge, hat das Datum das richtige Format, passt die Klassifizierung? Diese Prüfungen sind günstig, schnell und eindeutig. Man sollte sie überall einsetzen, wo die Aufgabe es zulässt.

### Modellbewertete Prüfungen

Textausgaben kann ein separates Modell anhand eines Rasters bewerten. Enthält die Zusammenfassung die drei Kernfakten, belegt jede Aussage eine Quelle, passt der Ton für einen Kundenbrief? Die Modellbewertung wird an einer Stichprobe gegen menschliches Urteil validiert. Ändert sich das bewertende Modell, wird neu validiert.

### Menschliche Prüfung

Bei folgenreichen oder subjektiven Ausgaben prüfen Fachleute eine Stichprobe. Das ist die teuerste Form der Evaluation und die Referenz für alle anderen. Wir nutzen sie, um automatisierte Prüfungen zu kalibrieren und die Produktion regelmässig zu prüfen.

> Vor dem Start sollte klar sein, welche Bestehensquote nötig ist.

## Evaluationen als Go-live-Schwelle

Ein früher, nützlicher Entscheid ist die Go-live-Schwelle. Man vereinbart sie mit der fachlich verantwortlichen Person. Für den Abgleich von Bestätigungen können das achtundneunzig Prozent Genauigkeit bei extrahierten Feldern und null falsche Abgleiche sein. Unsichere Fälle gehen an einen Menschen. Für einen Schreibassistenten kann es heissen, dass jede Aussage referenziert ist. Und dass Fachleute achtzig Prozent der Entwürfe mit kleinen Anpassungen als brauchbar einstufen.

Mit der Schwelle wird der Go-live zur Messung. Sie macht auch Fortschritt sichtbar. Jede Woche zeigt das Team, wie nahe die Bestehensquote an der Schwelle ist. Die Fachseite sieht, welche Arten von Fällen noch scheitern.

## Laufende Evaluation in Produktion

Mit dem Go-live endet die Evaluation nicht. KI-Systeme driften. Modellanbieter aktualisieren Modelle, manchmal mit wenig Vorlauf. Neue Dokumentvorlagen tauchen auf. Nutzende verwenden das System auf neue Weise. All das kann die Qualität unbemerkt verschlechtern.

- Die vollständige Suite bei jeder Änderung ausführen. Bei Prompt, Modell, Suchkonfiguration und Tool-Definition.
- Sie planmässig gegen die produktiven Modelle ausführen, auch wenn sich auf Ihrer Seite nichts geändert hat.
- Releases unter der Schwelle blockieren. Alarmieren, wenn geplante Läufe darunter fallen.
- Stichproben aus der Produktion menschlich prüfen und Fehler ins Evaluationsset aufnehmen.
- Kosten und Latenz pro Aufgabe neben der Qualität verfolgen. So geht keine Optimierung unbemerkt auf Kosten der Genauigkeit.

So wird KI zu einem betriebenen System und bleibt kein einmaliges Projekt. Aufsichtsbehörden erwarten das zunehmend. Die Anforderungen des EU AI Act an Hochrisiko-Systeme umfassen Genauigkeit, Robustheit und Beobachtung nach dem Inverkehrbringen. Ohne Evaluationen ist das schwer nachzuweisen.

Ein Beispiel aus einem repräsentativen Mandat. Ein Anbieter-Update liess die Gesamtgenauigkeit unverändert. Bei gescannten französischen Zertifikaten sank die Extraktionsqualität aber um mehrere Punkte. Den Nutzenden wäre das wochenlang nicht aufgefallen. Der geplante Evaluationslauf meldete es in derselben Nacht. Die vorherige Modellversion wurde innert Minuten fixiert. Das Problem war behoben, bevor es eine Mitarbeiterin erreichte.

## Evaluationen machen modellunabhängig

Es gibt auch einen strategischen Nutzen. Mit einer guten Evaluationssuite lassen sich Modelle mit Zuversicht wechseln. Erscheint ein neues Modell oder wird ein günstigeres gut genug, führen Sie die Suite aus. Innert Stunden wissen Sie, ob es bei Ihren Aufgaben ebenso gut abschneidet. Ohne Evaluationen ist ein Modellwechsel unsicher, und Firmen bleiben beim ersten Modell.

Darum liefern wir jedes System mit seiner Evaluationssuite aus, im Besitz des Kunden. Die Modelle werden sich weiter verändern. Mit einem gepflegten Evaluationsset können Sie diese Veränderungen gut nutzen.
