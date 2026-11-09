import type { CaseStudy } from '../../schema';

export const cases: CaseStudy[] = [
  {
    slug: 'trade-confirmation-agents',
    sector: 'commodities-trading',
    sectorLabel: 'Rohstoffhandel',
    title: 'Agenten gleichen Handelsbestätigungen ab, Ausnahmen gehen an Menschen',
    client: 'Ein Genfer Rohstoffhändler',
    summary:
      'Ein agentischer Workflow liest Bestätigungen von Gegenparteien und gleicht sie mit gebuchten Geschäften ab. Bei Abweichungen entwirft er eine Antwort. Operations bearbeitet jetzt Ausnahmen und tippt weniger ab.',
    challenge: [
      'Das Operations-Team erhielt pro Woche mehrere Hundert Bestätigungen per E-Mail. Als PDFs, Scans und Freitext, auf Englisch, Französisch und gelegentlich Spanisch. Jede wurde Feld für Feld mit dem Geschäft im ETRM verglichen. Menge, Toleranz, Preisformel, Lieferfenster, Incoterm und Zahlungsbedingungen.',
      'Der Abgleich lief manuell, unter Zeitdruck und bei wenigen erfahrenen Personen. Manche Abweichungen fielen erst auf, als die Dokumente schon bei der Bank waren. Geplant war, mehr Personal einzustellen.',
    ],
    approach: [
      'Zwei Forward-deployed Engineers arbeiteten in der ersten Woche direkt mit Operations. Sie sammelten 240 historische Bestätigungen samt Ergebnis. Daraus schrieben wir zuerst das Evaluationsset. Es hält für jedes Dokument die korrekten Felder und den richtigen Abgleichentscheid fest.',
      'In Woche drei nutzten zwei Mitarbeitende das System, in Woche fünf das ganze Team. Agenten übernehmen Extraktion und Abgleich. Unsichere oder abweichende Fälle gehen in eine Prüf-Queue mit hervorgehobenen Belegen. Die Mitarbeitenden geben mit einem Klick frei oder korrigieren. Jede Korrektur fliesst ins Evaluationsset.',
    ],
    system: {
      text: 'Agenten überwachen das Bestätigungspostfach und extrahieren die Konditionen. Sie fragen das ETRM über einen Nur-Lese-Konnektor ab. Jede Bestätigung gilt dann als abgeglichen, abweichend oder unsicher. Bei Abweichungen entsteht ein Antwortentwurf an die Gegenpartei, den eine Mitarbeiterin versendet.',
      components: [
        'Postfachüberwachung und Dokumentenverarbeitung für PDFs, Scans und E-Mail-Texte',
        'Extraktionsagent mit Konfidenzwerten pro Feld',
        'Nur-Lese-Konnektor zum ETRM und mit Operations vereinbarte Abgleichregeln',
        'Prüf-Queue mit hervorgehobenen Belegen und Freigabe oder Korrektur per Klick',
        'Evaluationssuite mit über 240 Fällen aus dem Betrieb, ausgeführt bei jedem Release',
        'Audit-Log jeder Extraktion, jedes Entscheids und jeder Freigabe',
      ],
    },
    results: [
      { value: '−62%', label: 'Bearbeitungszeit pro Bestätigung' },
      { value: '81%', label: 'Der Bestätigungen ohne manuelles Abtippen abgeglichen' },
      { value: '3 Tage → gleicher Tag', label: 'Mediane Zeit bis zur Meldung einer Abweichung' },
      { value: '0', label: 'Zusätzliche Stellen für den nächsten Volumenanstieg geplant' },
    ],
    stack: ['Gehostetes LLM (Schweizer Region)', 'Python', 'PostgreSQL', 'ETRM-API (nur Lesen)', 'Dokumenten-OCR', 'Evaluations-Harness'],
    duration: '6 Wochen bis zur Produktion',
    image: 'case-1',
    services: ['agentic-systems', 'ai-operations'],
  },
  {
    slug: 'private-bank-kyc-refresh',
    sector: 'banking-wealth',
    sectorLabel: 'Private Banking',
    title: 'Periodische KYC-Überprüfungen in Minuten vorbereitet, von Menschen entschieden',
    client: 'Eine Schweizer Privatbank (Kunde aus Vertraulichkeitsgründen nicht genannt)',
    summary:
      'Ein System stellt periodische KYC-Dossiers aus Kernbankendaten und Kundendokumenten zusammen. Es entwirft die Darstellung mit zitierten Belegen und markiert, was fehlt. Kundenberaterinnen prüfen und unterzeichnen.',
    challenge: [
      'Periodische KYC-Überprüfungen von Beziehungen mit erhöhtem Risiko kosteten jeweils mehrere Stunden. Betroffen waren Kundenberater und Compliance-Verantwortliche. Die Informationen lagen im Kernbankensystem, im Dokumentenmanagement und in jahrelanger Korrespondenz. Vieles davon auf Französisch und Deutsch.',
      'Es hatte sich ein Rückstand gebildet. Überprüfungen wurden knapp vor Fristablauf abgeschlossen, und die Qualität schwankte von Berater zu Berater. Die Bank wollte bessere Dossiers mit weniger Zeitaufwand. Unter Aufsicht der FINMA und ohne dass Kundendaten die Schweiz verlassen.',
    ],
    approach: [
      'Wir begannen mit einer zweiwöchigen Analyse mit Compliance, Front Office und IT. Gemeinsam legten wir die Struktur des Dossiers, den Belegstandard pro Abschnitt und die Datenhaltung fest. Die Risikofunktion der Bank prüfte das Design vor dem Bau.',
      'Das System läuft auf bankkontrollierter Infrastruktur in der Schweiz. Die Modellbereitstellung hält Daten im Land, ohne Speicherung und ohne Training. Jeder Satz der Darstellung zitiert das Dokument oder den Datensatz, aus dem er stammt. Die prüfende Person sieht die Quelle daneben.',
    ],
    system: {
      text: 'Für jede fällige Überprüfung sammeln Agenten Kundendaten und Dokumente. Sie prüfen sie gegen die KYC-Checkliste der Bank. Sie entwerfen die Darstellung zu Vermögensherkunft und Aktivität mit Quellenangaben. Fehlende oder abgelaufene Nachweise listen sie auf, mit einem Entwurf der Kundenanfrage.',
      components: [
        'Konnektoren zu Kernbankensystem und Dokumentenmanagement mit übernommenen Berechtigungen',
        'Checklisten-Engine mit der KYC-Weisung der Bank',
        'Entwurf der Darstellung mit Quellenangabe auf Satzebene',
        'Erkennung fehlender Nachweise und Anfrageentwürfe auf FR, DE und EN',
        'Prüfarbeitsplatz mit Quellen nebeneinander und Freigabe',
        'Hosting auf bankkontrollierter Schweizer Infrastruktur, keine Datenspeicherung bei Modellanbietern',
      ],
    },
    results: [
      { value: '−55%', label: 'Zeit pro periodischer Überprüfung' },
      { value: '4,1 → 4,6', label: 'Durchschnittliche Dossierqualität in Compliance-Stichproben (von 5)' },
      { value: '100%', label: 'Der Aussagen mit Quellbeleg verknüpft' },
      { value: '0', label: 'Kundendaten ausserhalb der Schweiz bearbeitet' },
    ],
    stack: ['In der Schweiz gehostetes LLM', 'Kubernetes on-premises der Bank', 'Hybride Suche', 'Kernbanken-API', 'Konnektor Dokumentenmanagement'],
    duration: '2 Wochen Analyse, 10 Wochen bis zur Produktion',
    image: 'case-2',
    services: ['ai-strategy', 'agentic-systems', 'ai-operations'],
  },
  {
    slug: 'multilingual-document-pipeline',
    sector: 'international-organisations',
    sectorLabel: 'Internationale Organisation',
    title: 'Ein durchsuchbares institutionelles Gedächtnis in sechs Sprachen',
    client: 'Eine internationale Organisation mit Sitz in Genf',
    summary:
      'Eine Suchplattform über Berichte, Resolutionen und Sitzungsprotokolle aus Jahrzehnten. Sie beantwortet Fragen mit Quellenangaben in der Sprache der Frage. Sie entwirft auch Briefing-Notizen, die Mitarbeitende prüfen.',
    challenge: [
      'Mitarbeitende suchten lange nach Präzedenzfällen. Was wurde in früheren Jahren zu einem Thema vereinbart, berichtet oder empfohlen? Das Archiv umfasste Hunderttausende Dokumente in mehreren Amtssprachen. Viele davon waren gescannte PDFs in Systemen aus verschiedenen Epochen.',
      'Frühere Suchwerkzeuge fanden Stichwörter in einer Sprache und lieferten lange Listen. Die Organisation brauchte korrekte und neutrale Antworten, nachvollziehbar bis zum Quellabsatz. Dokumente mit Personendaten durften nicht an externe Dienste gehen.',
    ],
    approach: [
      'Wir gestalteten die Plattform mit den IT- und Rechtsteams der Organisation. Sie entspricht ihrem Datenschutzrahmen und ihren Vorrechten. Personendaten wurden bei der Aufnahme klassifiziert und gefiltert. Das Modell läuft in einer Umgebung, die die Organisation kontrolliert.',
      'Die Qualität wurde pro Sprache mit einem Testset evaluiert, das Fachleute geschrieben hatten. Es umfasst 300 Fragen mit bekannten Antworten und Quellen. Danach schulten wir eine erste Gruppe von 60 Mitarbeitenden. Mit ihnen bauten wir Vorlagen für Briefing-Notizen. Dann erweiterten wir den Zugang Abteilung für Abteilung.',
    ],
    system: {
      text: 'Dokumente werden verarbeitet, auch Scans und Tabellen. Sie werden strukturerhaltend segmentiert und für eine sprachübergreifende hybride Suche indexiert. Antworten zitieren die verwendeten Absätze. Briefing-Notizen entstehen aus freigegebenen Vorlagen.',
      components: [
        'Aufnahme-Pipeline mit OCR, Layout-Analyse und Filterung von Personendaten',
        'Sprachübergreifende hybride Suche über das gesamte Archiv',
        'Antwortgenerierung mit Quellenangaben auf Absatzebene',
        'Entwurf von Briefing-Notizen aus freigegebenen Vorlagen',
        'Evaluationssuite pro Sprache, geschrieben von Fachleuten',
        'Nutzungs- und Qualitäts-Dashboard für das Wissensmanagement',
      ],
    },
    results: [
      { value: '−70%', label: 'Zeit bis zum Auffinden relevanter Präzedenzfälle' },
      { value: '6', label: 'Sprachen mit Quellenangaben beantwortet' },
      { value: '92%', label: 'Der Antworten in der Evaluation durch Mitarbeitende als korrekt und gut belegt bewertet' },
      { value: '600+', label: 'Wöchentlich aktive Nutzende nach drei Monaten' },
    ],
    stack: ['Open-Weight- und gehostete LLMs', 'Organisationskontrollierte Cloud', 'OCR und Layout-Analyse', 'Vektor- und Stichwortindex', 'Evaluations-Harness'],
    duration: '14 Wochen inklusive Rollout',
    image: 'case-3',
    services: ['data-ai-platforms', 'adoption-enablement'],
  },
  {
    slug: 'regulatory-submission-drafting',
    sector: 'life-sciences',
    sectorLabel: 'MedTech',
    title: 'Technische Dokumentation aus gelenkten Quellen entworfen',
    client: 'Ein Schweizer MedTech-Hersteller',
    summary:
      'Ein validierter Schreibassistent erstellt erste Entwürfe für Abschnitte der technischen Dokumentation. Er nutzt freigegebene Quellberichte. Konsistenzprüfungen laufen über das ganze Dossier, mit vollständiger Änderungskontrolle.',
    challenge: [
      'Jede Produktvariante verlangte Aktualisierungen der technischen Dokumentation. Grundlage waren Verifizierungsberichte, Risikomanagementakten und klinische Bewertungen. Regulatory Writer verbrachten viel Zeit mit Kopieren, Abgleichen und Gegenprüfen. Für das Schreiben blieb wenig Zeit.',
      'Jeder KI-Einsatz musste ins Qualitätsmanagementsystem passen. Er musste für den vorgesehenen Zweck validiert sein und unter Änderungskontrolle stehen. Für jedes Ergebnis ist eine qualifizierte Person verantwortlich.',
    ],
    approach: [
      'Zuerst verfassten wir mit dem Qualitätsteam die Zweckbestimmung und die Risikoanalyse. Dann definierten wir die Akzeptanzkriterien als Evaluationssuite. Grundlage waren bereits freigegebene Abschnitte.',
      'Der Assistent entwirft nur aus Dokumenten eines freigegebenen Quellensets. Jede Aussage trägt ihre Referenz. Konsistenzprüfungen laufen über das ganze Dossier. Modelle, Prompts und Quellen sind versioniert. Jede Änderung startet die Evaluationssuite, und eine Regression blockiert das Release.',
    ],
    system: {
      text: 'Writer wählen einen Abschnitt und die Quelldokumente. Der Assistent erstellt einen Entwurf mit Referenzen und einen Konsistenzbericht zum Rest des Dossiers. Der Writer bearbeitet und gibt im bestehenden Dokumentenlenkungssystem frei.',
      components: [
        'Register freigegebener Quellen, verknüpft mit der Dokumentenlenkung',
        'Entwurf von Abschnitten mit Referenz pro Aussage',
        'Dokumentübergreifende Konsistenzprüfung',
        'Evaluationssuite aus freigegebenen historischen Abschnitten',
        'Änderungskontrolle für Modelle, Prompts und Quellen',
        'Validierungspaket nach den Grundsätzen von GAMP 5',
      ],
    },
    results: [
      { value: '−45%', label: 'Schreibzeit pro Dokumentationsaktualisierung' },
      { value: '3×', label: 'Mehr Inkonsistenzen vor dem Review erkannt' },
      { value: '0', label: 'Aussagen ohne Referenz in den Entwürfen' },
    ],
    stack: ['Gehostetes LLM (Region EU/CH)', 'Integration Dokumentenlenkung', 'Python', 'Evaluations-Harness', 'Validierungsdokumentation'],
    duration: '12 Wochen inklusive Validierung',
    image: 'case-4',
    services: ['ai-operations', 'agentic-systems'],
  },
  {
    slug: 'formulation-knowledge-graph',
    sector: 'fragrance-flavour-chemicals',
    sectorLabel: 'Riech- & Aromastoffe',
    title: 'Vom Kundenbriefing zur Ausgangsrezeptur in Minuten',
    client: 'Ein Riech- und Aromastoffhaus (Kunde aus Vertraulichkeitsgründen nicht genannt)',
    summary:
      'Eine Wissensschicht verbindet historische Rezepturen, regulatorische Listen und Kundenbriefings. Kreative und Anwendungsteams finden Ausgangspunkte und Vorgaben jetzt in Minuten statt Tagen.',
    challenge: [
      'Kreative und technische Teams suchten frühere Arbeiten aus dem Gedächtnis oder fragten Kolleginnen. Rezepturdaten, regulatorischer Status und Kundenfeedback lagen in getrennten Systemen. Die Benennung war uneinheitlich.',
      'Jedes Briefing brachte tagelange Suche und manuelle regulatorische Prüfung mit sich. Erst danach begann die kreative Arbeit. Wenn Personen die Rolle wechselten, ging Wissen verloren.',
    ],
    approach: [
      'Wir begannen bei den Daten. Zuerst glichen wir die Inhaltsstoff-Kennungen über die Systeme ab. Dann bauten wir einen Wissensgraphen aus Rezepturen, Inhaltsstoffen, regulatorischem Status und Projektergebnissen. Die Sichtbarkeit der Rezepturen folgt den bestehenden Zugriffsrechten.',
      'Darauf baut ein Assistent auf. Er zerlegt eingehende Briefings in strukturierte Vorgaben und findet ähnliche frühere Projekte. Kandidaten prüft er vorab gegen die relevanten Marktbeschränkungen. Champions in jedem Team gestalteten die Oberfläche mit und schulten ihre Kollegen.',
    ],
    system: {
      text: 'Ein Wissensgraph verbindet Rezepturen, Inhaltsstoffe, regulatorische Listen und Projekthistorie. Ein Briefing-Assistent extrahiert Vorgaben, findet ähnliche Rezepturen und macht eine regulatorische Vorprüfung. Alles läuft in der Umgebung des Kunden.',
      components: [
        'Identitätsabgleich der Inhaltsstoffe über Rezeptur- und Regulierungssysteme',
        'Wissensgraph aus Rezepturen, Inhaltsstoffen, Beschränkungen und Ergebnissen',
        'Zerlegung von Briefings in strukturierte Anforderungen',
        'Suche ähnlicher Rezepturen mit Berechtigungsfilter',
        'Vorprüfung von Marktbeschränkungen mit Versionsverfolgung der Listen',
        'Champions-Programm und teamspezifische Schulung',
      ],
    },
    results: [
      { value: 'Tage → Minuten', label: 'Bis zu relevanten Ausgangsrezepturen' },
      { value: '−50%', label: 'Aufwand für manuelle regulatorische Vorprüfung' },
      { value: '85%', label: 'Der Kreativen nutzen den Assistenten wöchentlich' },
    ],
    stack: ['Graphdatenbank', 'Kundenkontrollierte Cloud', 'LLM (ohne Speicherung)', 'Konnektor Rezeptursystem', 'Aufnahme regulatorischer Listen'],
    duration: '16 Wochen',
    image: 'case-5',
    services: ['data-ai-platforms', 'adoption-enablement'],
  },
  {
    slug: 'maintenance-copilot',
    sector: 'industry-manufacturing',
    sectorLabel: 'Präzisionsfertigung',
    title: 'Ein Instandhaltungsassistent mit dem Wissen aus früheren Reparaturen',
    client: 'Ein Schweizer Präzisionshersteller',
    summary:
      'Ein Assistent für Techniker nutzt Maschinenhandbücher, Instandhaltungsprotokolle und frühere Einsätze. Er schlägt wahrscheinliche Ursachen und Verfahren vor. Danach entwirft er den Arbeitsauftrag.',
    challenge: [
      'Ungeplante Stillstände kritischer Bearbeitungszentren waren teuer. Die Diagnose hing an wenigen erfahrenen Technikern. Instandhaltungsprotokolle waren stichwortartig auf Französisch und Deutsch verfasst. Die Handbücher umfassten Tausende Seiten.',
      'Neuere Techniker brauchten länger für die Diagnose, und wiederholte Ausfälle waren häufig. Werksdaten durften das Standortnetz nicht verlassen.',
    ],
    approach: [
      'Forward-deployed Engineers verbrachten Zeit mit den Technikern in der Werkhalle. Sie lernten, wie Störungen dort diagnostiziert werden. Wir normalisierten zehn Jahre Instandhaltungsprotokolle. Dann verknüpften wir sie mit Maschinen, Komponenten und Handbuchabschnitten.',
      'Der Assistent läuft vor Ort. Techniker beschreiben ein Symptom in eigenen Worten auf einem Tablet. Der Assistent nennt wahrscheinliche Ursachen nach früherer Häufigkeit, das passende Verfahren und die Teile. Nach Abschluss entwirft er den Arbeitsauftrag.',
    ],
    system: {
      text: 'Ein Assistent vor Ort über Handbücher, Instandhaltungshistorie und Teiledaten, erreichbar aus der Werkhalle. Bei sicherheitsrelevanten Verfahren verweist er auf das offizielle Handbuch.',
      components: [
        'Modellbereitstellung vor Ort im Werksnetz',
        'Normalisierte Instandhaltungshistorie, verknüpft mit Maschinen und Komponenten',
        'Suche in Handbüchern und Verfahren mit Seitenangaben',
        'Rangfolge Symptom-Ursache aus früheren Einsätzen',
        'Entwurf von Arbeitsaufträgen im Instandhaltungssystem',
        'Schulung der Techniker und Feedback-Schleife',
      ],
    },
    results: [
      { value: '−35%', label: 'Mittlere Diagnosezeit an den Zielmaschinen' },
      { value: '−20%', label: 'Wiederholungsausfälle innert 30 Tagen' },
      { value: '100%', label: 'Der Daten im Werksnetz behalten' },
    ],
    stack: ['Open-Weight-LLM vor Ort', 'Integration Instandhaltungssystem', 'Hybride Suche', 'Tablet-Web-App'],
    duration: '10 Wochen',
    image: 'case-6',
    services: ['agentic-systems', 'adoption-enablement'],
  },
];
