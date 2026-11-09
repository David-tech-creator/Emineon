---
title: Evaluationen sind die neue Qualitätssicherung: Wie man weiss, dass ein KI-System bereit ist, und es weiterhin weiss
summary: Klassische Tests prüfen, ob Code tut, wofür er geschrieben wurde. KI-Systeme brauchen etwas anderes: eine laufende, gemessene Antwort auf die Frage «Ist es noch gut genug?»
author: Emineon · Practice KI-Betrieb
---

Softwareteams haben über Jahrzehnte Testdisziplinen aufgebaut: Unit-Tests, Integrationstests, Regressionssuiten, Continuous Integration. Sie funktionieren, weil klassische Software deterministisch ist. Dieselbe Eingabe ergibt dieselbe Ausgabe, und ein Test besteht oder scheitert.

KI-Systeme brechen mit dieser Annahme. Dieselbe Eingabe kann unterschiedliche Ausgaben erzeugen. Das System kann sich ändern, ohne dass sich Code ändert, weil ein Anbieter ein Modell aktualisiert hat. Qualität ist nicht binär, sondern abgestuft: Eine Extraktion kann fast richtig sein, eine Zusammenfassung korrekt, aber am Kern vorbei. Klassische Tests bleiben nötig, reichen aber nicht mehr aus.

Evaluationen, kurz Evals, schliessen diese Lücke. Eine Evaluation ist eine strukturierte, wiederholbare Messung, wie gut ein KI-System eine Aufgabe erfüllt, ausgeführt gegen einen festen Satz von Fällen mit bekannten guten Antworten. In unserer Arbeit sind Evaluationen die wichtigste einzelne Engineering-Praxis, um KI-Systeme in Produktion zu bringen und dort zu halten.

## Was ein gutes Evaluationsset enthält

Ein Evaluationsset ist eine Sammlung echter Fälle, jeweils mit der Eingabe, die das System erhalten wird, und einer Definition der korrekten Ausgabe. Bei einer Extraktionsaufgabe sind das das Dokument und die korrekten Feldwerte. Bei einer Schreibaufgabe können es das Quellmaterial, ein Referenzentwurf und ein Bewertungsraster sein. Vier Eigenschaften unterscheiden nützliche Evaluationssets von dekorativen.

- Echt. Die Fälle stammen aus Produktionsdaten oder getreuen Kopien davon, nicht aus erfundenen Beispielen. Synthetische Fälle können ergänzen, nie ersetzen.
- Repräsentativ. Das Set spiegelt die tatsächliche Verteilung der Fälle, einschliesslich der hässlichen zehn Prozent: Scans, gemischte Sprachen, ungewöhnliche Vorlagen, fehlende Daten.
- Im Besitz der Fachseite. Wer die Arbeit macht, definiert, was korrekt heisst. Ingenieure setzen die Prüfungen um; sie entscheiden nicht über die Antworten.
- Wachsend. Jeder in Produktion gefundene Fehler wird zu einem neuen Fall, sodass das Set mit der Zeit stärker wird.

Ein erstes Set von hundert bis dreihundert Fällen reicht meist für fundierte Entscheide. Es kostet ein paar Tage Expertenzeit. Das ist die beste Investition in einem KI-Projekt, und die am häufigsten übersprungene.

## Wie man bewertet

Unterschiedliche Aufgaben brauchen unterschiedliche Bewertungen. Wir nutzen drei grosse Arten, oft kombiniert.

### Exakte und regelbasierte Prüfungen

Bei strukturierten Ausgaben vergleicht man mit dem erwarteten Wert: Stimmt die Menge, ist das Datum im richtigen Format, passt die Klassifizierung? Diese Prüfungen sind günstig, schnell und eindeutig und sollten überall eingesetzt werden, wo die Aufgabe es zulässt.

### Modellbewertete Prüfungen

Bei Textausgaben kann ein separates Modell anhand eines Rasters bewerten: Enthält die Zusammenfassung die drei Kernfakten, belegt jede Aussage eine Quelle, passt der Ton für einen Kundenbrief? Die Modellbewertung muss selbst an einer Stichprobe gegen menschliches Urteil validiert und neu validiert werden, wenn sich das bewertende Modell ändert.

### Menschliche Prüfung

Bei folgenreichen oder subjektiven Ausgaben prüfen Fachleute eine Stichprobe. Das ist die teuerste Form der Evaluation und die Referenz für alle anderen. Wir nutzen sie, um automatisierte Prüfungen zu kalibrieren und die Produktion regelmässig zu auditieren.

> Wer vor dem Start nicht sagen kann, welche Bestehensquote er braucht, ist nicht bereit für den Start.

## Evaluationen als Go-live-Schwelle

Der nützlichste Entscheid, den ein KI-Projekt früh treffen kann, ist, mit der fachlich verantwortlichen Person zu vereinbaren, welche Evaluationsleistung für den Go-live nötig ist. Für ein System zum Abgleich von Bestätigungen können das achtundneunzig Prozent Genauigkeit bei extrahierten Feldern und null falsche Abgleiche sein, wobei unsichere Fälle an einen Menschen gehen. Für einen Schreibassistenten kann es heissen, dass jede Aussage referenziert ist und Fachleute achtzig Prozent der Entwürfe mit kleinen Anpassungen als brauchbar einstufen.

Einmal vereinbart, macht die Schwelle den Go-live zur Messung statt zur Meinungsfrage. Sie macht auch Fortschritt sichtbar. Jede Woche kann das Team zeigen, wie sich die Bestehensquote der Schwelle nähert, und die Fachseite sieht genau, welche Arten von Fällen noch scheitern.

## Laufende Evaluation in Produktion

Mit dem Go-live endet die Evaluation nicht. KI-Systeme driften. Modellanbieter aktualisieren Modelle, manchmal mit wenig Vorlauf. Neue Dokumentvorlagen tauchen auf. Nutzende finden neue Arten, das System zu verwenden. Jedes davon kann die Qualität unbemerkt verschlechtern.

- Die vollständige Suite bei jeder Änderung ausführen: Prompt, Modell, Suchkonfiguration, Tool-Definition.
- Sie planmässig gegen die produktiven Modelle ausführen, auch wenn sich auf Ihrer Seite nichts geändert hat.
- Releases unter der Schwelle blockieren und alarmieren, wenn geplante Läufe darunter fallen.
- Stichproben aus der Produktion menschlich prüfen und Fehler ins Evaluationsset aufnehmen.
- Kosten und Latenz pro Aufgabe neben der Qualität verfolgen, damit keine Optimierung unbemerkt Genauigkeit opfert.

Das macht aus KI ein betriebenes System statt eines einmaligen Projekts. Es ist auch, was Aufsichtsbehörden zunehmend erwarten: Die Anforderungen des EU AI Act an Hochrisiko-Systeme umfassen Genauigkeit, Robustheit und Beobachtung nach dem Inverkehrbringen, was ohne Evaluationen schwer nachzuweisen ist.

Ein konkretes Beispiel: In einem repräsentativen Mandat liess ein routinemässiges Anbieter-Update die Gesamtgenauigkeit unverändert, senkte aber die Extraktionsqualität bei gescannten französischen Zertifikaten um mehrere Punkte. Keinem Nutzenden wäre das wochenlang aufgefallen. Der geplante Evaluationslauf meldete es noch in derselben Nacht, die vorherige Modellversion wurde innert Minuten fixiert, und das Problem war behoben, bevor es eine einzige Mitarbeiterin erreichte.

## Evaluationen machen modellunabhängig

Es gibt auch einen strategischen Nutzen. Eine starke Evaluationssuite erlaubt es, Modelle mit Zuversicht zu wechseln. Erscheint ein neues Modell oder wird ein günstigeres gut genug, führen Sie die Suite aus und wissen innert Stunden, ob es bei Ihren Aufgaben ebenso gut abschneidet. Ohne Evaluationen ist ein Modellwechsel ein Sprung ins Ungewisse, und Firmen bleiben an das gebunden, womit sie angefangen haben.

Darum wird jedes System, das wir bauen, mit seiner Evaluationssuite ausgeliefert, im Besitz des Kunden. Die Modelle werden sich weiter verändern. Ein gut gepflegtes Evaluationsset ist das Kapital, mit dem Sie davon profitieren, statt ihm ausgesetzt zu sein.
