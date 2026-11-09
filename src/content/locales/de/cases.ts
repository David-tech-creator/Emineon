import type { CaseStudy } from '../../schema';

export const cases: CaseStudy[] = [
  {
    slug: 'trade-confirmation-agents',
    sector: 'commodities-trading',
    sectorLabel: 'Rohstoffhandel',
    title: 'Handelsbestätigungen von Agenten abgeglichen, Ausnahmen an Menschen weitergeleitet',
    client: 'Ein Genfer Rohstoffhändler',
    summary:
      'Ein agentischer Workflow, der Bestätigungen von Gegenparteien liest, mit gebuchten Geschäften abgleicht und Antworten auf Abweichungen entwirft. Operations bearbeitet jetzt Ausnahmen statt abzutippen.',
    challenge: [
      'Das Operations-Team erhielt pro Woche mehrere Hundert Bestätigungen per E-Mail, als PDFs, Scans und Freitext, auf Englisch, Französisch und gelegentlich Spanisch. Jede musste Feld für Feld mit dem im ETRM gebuchten Geschäft verglichen werden: Menge, Toleranz, Preisformel, Lieferfenster, Incoterm, Zahlungsbedingungen.',
      'Der Abgleich erfolgte manuell, unter Zeitdruck und konzentriert auf wenige erfahrene Personen. Abweichungen wurden teils spät entdeckt, nachdem die Dokumente bereits bei der Bank waren. Der Standardplan war, mehr Personal einzustellen.',
    ],
    approach: [
      'Ein Team aus zwei Forward-deployed Engineers arbeitete in der ersten Woche direkt mit Operations und sammelte 240 historische Bestätigungen samt Ergebnis. Daraus schrieben wir das Evaluationsset, bevor wir irgendetwas bauten: für jedes Dokument die korrekt extrahierten Felder und den richtigen Abgleichentscheid.',
      'In Woche drei lieferten wir an zwei Mitarbeitende, in Woche fünf an das ganze Team. Agenten übernehmen Extraktion und Abgleich; alles Unsichere oder Abweichende geht in eine Prüf-Queue mit hervorgehobenen Belegen. Die Mitarbeitenden geben mit einem Klick frei oder korrigieren, und jede Korrektur fliesst ins Evaluationsset.',
    ],
    system: {
      text: 'Agenten überwachen das Bestätigungspostfach, extrahieren die Konditionen, fragen das ETRM über einen Nur-Lese-Konnektor ab und klassifizieren jede Bestätigung als abgeglichen, abweichend oder unsicher. Bei Abweichungen wird eine Antwort an die Gegenpartei entworfen, die eine Mitarbeiterin versendet.',
      components: [
        'Postfachüberwachung und Dokumentenverarbeitung für PDFs, Scans und E-Mail-Texte',
        'Extraktionsagent mit Konfidenzwerten pro Feld',
        'Nur-Lese-Konnektor zum ETRM und mit Operations vereinbarte Abgleichregeln',
        'Prüf-Queue mit hervorgehobenen Belegen und Freigabe oder Korrektur per Klick',
        'Evaluationssuite mit über 240 echten Fällen, ausgeführt bei jedem Release',
        'Audit-Log jeder Extraktion, jedes Entscheids und jeder Freigabe',
      ],
    },
    results: [
      { value: '−62%', label: 'Bearbeitungszeit pro Bestätigung' },
      { value: '81%', label: 'Der Bestätigungen ohne manuelles Abtippen abgeglichen' },
      { value: '3 Tage → gleicher Tag', label: 'Mediane Zeit bis zur Meldung einer Abweichung' },
      { value: '0', label: 'Zusätzliche Stellen für den nächsten Volumenanstieg geplant' },
    ],
    stack: ['Frontier-LLM (Schweizer Region)', 'Python', 'PostgreSQL', 'ETRM-API (nur Lesen)', 'Dokumenten-OCR', 'Evaluations-Harness'],
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
      'Ein System, das periodische KYC-Dossiers aus Kernbankendaten und Kundendokumenten zusammenstellt, die Darstellung mit zitierten Belegen entwirft und Fehlendes markiert. Kundenberaterinnen prüfen und unterzeichnen.',
    challenge: [
      'Periodische KYC-Überprüfungen von Beziehungen mit erhöhtem Risiko kosteten Kundenberater und Compliance-Verantwortliche jeweils mehrere Stunden. Die Informationen lagen verteilt im Kernbankensystem, im Dokumentenmanagement und in jahrelanger Korrespondenz, grossenteils auf Französisch und Deutsch.',
      'Es hatte sich ein Rückstand gebildet. Überprüfungen wurden knapp vor Fristablauf abgeschlossen, die Qualität schwankte von Berater zu Berater, und die Bank wollte die Dossierqualität verbessern und gleichzeitig den Zeitaufwand senken, unter Aufsicht der FINMA und ohne dass Kundendaten die Schweiz verlassen.',
    ],
    approach: [
      'Wir begannen mit einer zweiwöchigen Analyse mit Compliance, Front Office und IT, um die Zielstruktur des Dossiers, den Belegstandard für jeden Abschnitt und die Architektur der Datenhaltung festzulegen. Die Risikofunktion der Bank prüfte das Design, bevor gebaut wurde.',
      'Das System wurde auf bankkontrollierter Infrastruktur in der Schweiz gebaut. Wir nutzten eine Modellbereitstellung, die Daten im Land hält, ohne Speicherung und ohne Training. Jeder Satz der entworfenen Darstellung zitiert das Dokument oder den Datensatz, aus dem er stammt, und die prüfende Person sieht die Quelle daneben.',
    ],
    system: {
      text: 'Für jede fällige Überprüfung sammeln Agenten Kundendaten und Dokumente, prüfen sie gegen die KYC-Checkliste der Bank, entwerfen die Darstellung zu Vermögensherkunft und Aktivität mit Quellenangaben und listen fehlende oder abgelaufene Nachweise samt Entwurf einer Kundenanfrage auf.',
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
      'Eine Suchplattform über Jahrzehnte von Berichten, Resolutionen und Sitzungsprotokollen, die Fragen mit Quellenangaben in der Sprache der Frage beantwortet und Briefing-Notizen zur Prüfung durch Mitarbeitende entwirft.',
    challenge: [
      'Mitarbeitende verbrachten viel Zeit mit der Suche nach Präzedenzfällen: was in früheren Jahren zu einem Thema vereinbart, berichtet oder empfohlen worden war. Das Archiv umfasste Hunderttausende Dokumente in mehreren Amtssprachen, viele als gescannte PDFs, verteilt auf Systeme aus verschiedenen Epochen.',
      'Frühere Suchwerkzeuge fanden Stichwörter in einer Sprache und lieferten lange Listen. Die Organisation brauchte Antworten, die korrekt, bis zum Quellabsatz nachvollziehbar und neutral sind, ohne Dokumente mit Personendaten an externe Dienste zu senden.',
    ],
    approach: [
      'Wir gestalteten die Plattform mit den IT- und Rechtsteams der Organisation so, dass sie ihrem Datenschutzrahmen und ihren Vorrechten entspricht. Personendaten wurden bei der Aufnahme klassifiziert und gefiltert. Das Modell läuft in einer von der Organisation kontrollierten Umgebung.',
      'Die Qualität wurde pro Sprache mit einem Testset evaluiert, das Fachleute geschrieben hatten: 300 Fragen mit bekannten Antworten und Quellen. Danach schulten wir eine erste Gruppe von 60 Mitarbeitenden, bauten mit ihnen Vorlagen für Briefing-Notizen und erweiterten den Zugang Abteilung für Abteilung.',
    ],
    system: {
      text: 'Dokumente werden verarbeitet, einschliesslich Scans und Tabellen, strukturerhaltend segmentiert und für eine sprachübergreifende hybride Suche indexiert. Antworten zitieren die genau verwendeten Absätze; Briefing-Notizen entstehen aus freigegebenen Vorlagen.',
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
    stack: ['Open-Weight- und Frontier-LLMs', 'Organisationskontrollierte Cloud', 'OCR und Layout-Analyse', 'Vektor- und Stichwortindex', 'Evaluations-Harness'],
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
      'Ein validierter Schreibassistent, der erste Entwürfe von Abschnitten der technischen Dokumentation aus freigegebenen Quellberichten erstellt, mit Konsistenzprüfungen über das ganze Dossier und vollständiger Änderungskontrolle.',
    challenge: [
      'Jede Produktvariante erforderte Aktualisierungen der technischen Dokumentation auf Basis von Verifizierungsberichten, Risikomanagementakten und klinischen Bewertungen. Regulatory Writer verbrachten den Grossteil ihrer Zeit mit Kopieren, Abgleichen und Gegenprüfen statt mit Schreiben.',
      'Jeder KI-Einsatz musste ins Qualitätsmanagementsystem passen: für den vorgesehenen Zweck validiert, unter Änderungskontrolle, mit einer qualifizierten Person, die für jedes Ergebnis verantwortlich ist.',
    ],
    approach: [
      'Zuerst verfassten wir mit dem Qualitätsteam die Zweckbestimmung und die Risikoanalyse, dann definierten wir die Akzeptanzkriterien als Evaluationssuite auf Basis bereits freigegebener Abschnitte.',
      'Der Assistent entwirft nur aus Dokumenten eines freigegebenen Quellensets und versieht jede Aussage mit ihrer Referenz. Konsistenzprüfungen laufen über das ganze Dossier. Modelle, Prompts und Quellen sind versioniert; jede Änderung löst die Evaluationssuite aus, und eine Regression blockiert das Release.',
    ],
    system: {
      text: 'Writer wählen einen Abschnitt und die Quelldokumente; der Assistent erstellt einen referenzierten Entwurf und einen Konsistenzbericht gegenüber dem Rest des Dossiers. Der Writer bearbeitet und gibt im bestehenden Dokumentenlenkungssystem frei.',
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
    stack: ['Frontier-LLM (Region EU/CH)', 'Integration Dokumentenlenkung', 'Python', 'Evaluations-Harness', 'Validierungsdokumentation'],
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
      'Eine Wissensschicht, die historische Rezepturen, regulatorische Listen und Kundenbriefings verbindet, damit Kreative und Anwendungsteams Ausgangspunkte und Vorgaben in Minuten statt Tagen finden.',
    challenge: [
      'Kreative und technische Teams verliessen sich auf ihr Gedächtnis und auf Kolleginnen, um relevante frühere Arbeiten zu finden. Rezepturdaten, regulatorischer Status und Kundenfeedback lagen in getrennten Systemen mit uneinheitlicher Benennung.',
      'Jedes Briefing löste tagelange Suche und manuelle regulatorische Prüfung aus, bevor die kreative Arbeit beginnen konnte, und Wissen ging mit Personen verloren, die die Rolle wechselten.',
    ],
    approach: [
      'Wir begannen bei den Daten: Abgleich der Inhaltsstoff-Kennungen über die Systeme, Aufbau eines Wissensgraphen aus Rezepturen, Inhaltsstoffen, regulatorischem Status und Projektergebnissen, wobei die Sichtbarkeit der Rezepturen den bestehenden Zugriffsrechten folgt.',
      'Darauf zerlegt ein Assistent eingehende Briefings in strukturierte Vorgaben, findet ähnliche frühere Projekte und prüft Kandidaten vorab gegen die relevanten Marktbeschränkungen. Champions in jedem Team gestalteten die Oberfläche mit und schulten ihre Kollegen.',
    ],
    system: {
      text: 'Ein Wissensgraph verbindet Rezepturen, Inhaltsstoffe, regulatorische Listen und Projekthistorie. Ein Briefing-Assistent extrahiert Vorgaben, findet ähnliche Rezepturen und führt eine regulatorische Vorprüfung durch, alles in der eigenen Umgebung des Kunden.',
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
    title: 'Ein Instandhaltungsassistent, der sich an jede Reparatur erinnert',
    client: 'Ein Schweizer Präzisionshersteller',
    summary:
      'Ein Assistent für Techniker, der Maschinenhandbücher, Instandhaltungsprotokolle und frühere Einsätze kombiniert, um wahrscheinliche Ursachen und Verfahren vorzuschlagen, und danach den Arbeitsauftrag entwirft.',
    challenge: [
      'Ungeplante Stillstände kritischer Bearbeitungszentren waren teuer, und die Diagnose hing an wenigen erfahrenen Technikern. Instandhaltungsprotokolle waren stichwortartig auf Französisch und Deutsch verfasst, die Handbücher umfassten Tausende Seiten.',
      'Neuere Techniker brauchten länger für die Diagnose, und Wiederholungsausfälle waren häufig. Werksdaten durften das Standortnetz nicht verlassen.',
    ],
    approach: [
      'Forward-deployed Engineers verbrachten Zeit in der Werkhalle mit den Technikern, um zu verstehen, wie Störungen tatsächlich diagnostiziert werden. Wir normalisierten zehn Jahre Instandhaltungsprotokolle und verknüpften sie mit Maschinen, Komponenten und Handbuchabschnitten.',
      'Der Assistent läuft vor Ort. Techniker beschreiben ein Symptom in eigenen Worten auf einem Tablet; der Assistent liefert wahrscheinliche Ursachen nach früherer Häufigkeit, das passende Verfahren und die Teile, und entwirft nach Abschluss den Arbeitsauftrag.',
    ],
    system: {
      text: 'Ein Assistent vor Ort über Handbücher, Instandhaltungshistorie und Teiledaten, zugänglich aus der Werkhalle, wobei sicherheitsrelevante Verfahren stets auf das offizielle Handbuch verweisen.',
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
