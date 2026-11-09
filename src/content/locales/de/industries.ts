import type { Industry } from '../../schema';

export const industries: Industry[] = [
  {
    slug: 'commodities-trading',
    icon: 'trading',
    image: 'ind-trading',
    tier: 'core',
    name: 'Rohstoffhandel & Schifffahrt',
    short: 'Agenten bereiten Bestätigungen, KYC und Dokumente der Handelsfinanzierung vor. Trader und Operations behalten die Kontrolle.',
    hero: {
      eyebrow: '[ Branche · Rohstoffhandel & Schifffahrt ]',
      title: { pre: 'Weniger Papier zwischen Geschäft und ', accent: 'Ladung.' },
      lead: 'Handelshäuser arbeiten mit vielen Dokumenten. Bestätigungen, Akkreditive, Konnossemente, Inspektionszertifikate und Sanktionsprüfungen gehören dazu. Wir setzen Agenten auf diese Abläufe an. So hält Operations mit dem Desk Schritt, und Compliance kann jeden Schritt nachvollziehen.',
    },
    stat: {
      value: '#1',
      label: 'Genf ist weltweit führend in der Handelsfinanzierung. 12 der 14 Schweizer Handelsfinanzierungsbanken sind hier ansässig.',
      source: 'ge.ch, Schlüsselbranchen',
    },
    context: {
      title: 'Viel Handel ist Arbeit mit Dokumenten',
      paragraphs: [
        'In Genf sind rund 400 Handelsfirmen mit etwa 6000 direkten Arbeitsplätzen tätig. Hinter jeder Ladung stehen Dokumente, die abgeglichen, geprüft und abgelegt werden. Oft in mehreren Sprachen und unter Zeitdruck. Gegenparteien, Banken, Inspektoren und Schiffsagenten nutzen jeweils eigene Vorlagen.',
        'Die Ausgaben für Compliance steigen. Sanktionsregime ändern sich schneller, und Banken verlangen mehr Nachweise. Viele Operations-Teams sind deshalb gewachsen. KI-Agenten können Dokumente lesen, abgleichen und vorprüfen. Die Menschen erhalten dann die Fälle, die ein Urteil verlangen.',
      ],
    },
    valueStreams: [
      {
        name: 'Handels-Operations',
        description: 'Von der Erfassung bis zur Abwicklung. Dokumente werden abgeglichen und Abweichungen früh erkannt.',
        useCases: [
          'Abgleich von Bestätigungen mit gebuchten Geschäften im ETRM',
          'Extraktion aus Term Sheets, Recaps und Nachträgen',
          'Abgleich von Rechnungen sowie provisorischen und finalen Preisen',
          'Vorbereitung von Liege- und Demurrage-Forderungen',
        ],
      },
      {
        name: 'Dokumente der Handelsfinanzierung',
        description: 'Akkreditive und Versanddokumente werden geprüft, bevor sie zur Bank gehen.',
        useCases: [
          'Extraktion der Akkreditivbedingungen und Erstellung der Dokumenten-Checkliste',
          'Abweichungsprüfung vor Einreichung bei Konnossementen und Zertifikaten',
          'Entwurf und Verfolgung der Bankkorrespondenz',
        ],
      },
      {
        name: 'Compliance und KYC',
        description: 'Onboarding und Screening von Gegenparteien. Die Belege liegen für die prüfende Person bereit.',
        useCases: [
          'Zusammenstellung und periodische Aktualisierung von KYC-Dossiers für Gegenparteien',
          'Sanktions- und Schiffs-Screening mit erklärten Treffern',
          'Zusammenfassungen negativer Presseberichte in Originalsprache und auf Englisch',
        ],
      },
      {
        name: 'Markt- und Desk-Informationen',
        description: 'Analysen und Berichte werden vorbereitet.',
        useCases: [
          'Entwürfe für tägliche Positions- und P&L-Kommentare',
          'Zusammenfassung von Fracht- und Marktberichten',
          'Klauselsuche über historische Geschäfte',
        ],
      },
    ],
    compliance: [
      'Ergebnisse des Sanktions-Screenings sind Entscheidungshilfen. Entscheid und Begründung bleiben bei einer namentlich verantwortlichen Person.',
      'Daten zu Gegenparteien und Geschäften werden in der Schweiz oder im eigenen Tenant des Kunden bearbeitet.',
      'Dokumentversionen, Agentenaktionen und Freigaben werden protokolliert und nach den Vorgaben der Firma aufbewahrt.',
      'Das System unterstützt die Kontrollen, die Banken bei Handelsfinanzierung und GwG erwarten. Es ersetzt sie nicht.',
    ],
    relatedCase: 'trade-confirmation-agents',
    relatedServices: ['agentic-systems', 'ai-operations', 'data-ai-platforms'],
  },
  {
    slug: 'banking-wealth',
    icon: 'banking',
    image: 'ind-banking',
    tier: 'core',
    name: 'Private Banking & Vermögensverwaltung',
    short: 'KYC, Kundenreporting und Beratungsvorbereitung. Mit Kontrollen auf FINMA-Niveau und Kundendaten in der Schweiz.',
    hero: {
      eyebrow: '[ Branche · Private Banking & Vermögensverwaltung ]',
      title: { pre: 'Mehr Zeit für Kunden, weniger für ', accent: 'Dossiers.' },
      lead: 'Kundenberaterinnen und -berater verbringen viel Zeit mit Dokumentation. Dazu gehören KYC-Aktualisierungen, Eignungsnachweise, Gesprächsnotizen und Kundenberichte. Wir bauen Systeme, die diese Arbeit zur Prüfung vorbereiten. Dabei gelten die Kontrollen, die eine Schweizer Bank ohnehin hat.',
    },
    stat: {
      value: '37’000+',
      label: 'Arbeitsplätze im Finanzsektor in Genf.',
      source: 'ge.ch, Schlüsselbranchen',
    },
    context: {
      title: 'Diskretion gehört zum Angebot',
      paragraphs: [
        'Private Banking in Genf beruht auf Vertrauen und auf Dokumentation. Zu jeder Kundenbeziehung gehören ein KYC-Dossier und Nachweise zur Vermögensherkunft. Dazu kommen Eignungs- und Angemessenheitsprüfungen und Korrespondenz in mehreren Sprachen. Die Aufsicht erwartet sie vollständig. Die Kundschaft soll davon wenig merken.',
        'Der Kostendruck ist hoch, und mehr Personal ist selten die Lösung. Wir helfen, Stunden des Zusammentragens und Abtippens einzusparen. Das Dossier soll dabei besser werden, nicht dünner. Dafür planen wir Datenhaltung, Zugriffskontrolle und Prüfbarkeit von Anfang an mit.',
      ],
    },
    valueStreams: [
      {
        name: 'Kundenlebenszyklus und KYC',
        description: 'Agenten bereiten Onboarding und periodische Überprüfungen vor. Menschen entscheiden.',
        useCases: [
          'Periodische KYC-Dossiers aus Kernbankensystem und Dokumenten zusammengestellt',
          'Entwurf der Darstellung zur Vermögensherkunft mit zitierten Belegen',
          'Erkennung fehlender Dokumente und Entwurf der Kundenanfrage',
        ],
      },
      {
        name: 'Beratungsvorbereitung',
        description: 'Die Beraterin hat vor dem Gespräch die wichtigen Unterlagen gelesen.',
        useCases: [
          'Kundenbriefings vor dem Termin aus Portfolio, Notizen und News',
          'Erfassung von Gesprächsnotizen und Entwurf der Eignungsdokumentation',
          'Entwürfe für Anlagevorschläge im Einklang mit der Hausmeinung',
        ],
      },
      {
        name: 'Reporting und Kommunikation',
        description: 'Kundenreporting in der Sprache der Kundschaft.',
        useCases: [
          'Entwürfe für Portfoliokommentare auf FR, DE, EN und IT',
          'Entwurf der Kundenkorrespondenz mit Prüfung von Tonalität und Compliance',
          'Internes Management-Reporting automatisch zusammengestellt',
        ],
      },
      {
        name: 'Operations und Compliance',
        description: 'Backoffice-Queues werden schneller abgearbeitet, mit besseren Belegen.',
        useCases: [
          'Triage von Transaktionsüberwachungs-Alerts mit erklärtem Kontext',
          'Verarbeitung von Corporate Actions und Instruktionen aus E-Mails',
          'Fragen und Antworten zu Weisungen und Regulierung für Mitarbeitende, mit Quellenangabe',
        ],
      },
    ],
    compliance: [
      'Kundenidentifizierende Daten werden in der Schweiz bearbeitet. Auf bankkontrollierter Infrastruktur oder in einer in der Schweiz gehosteten Umgebung.',
      'Ausgerichtet auf die Erwartungen der FINMA zu Drittdienstleistern, operationeller Resilienz und Vertraulichkeit der Daten.',
      'Das Bankkundengeheimnis bleibt gewahrt. Kundendaten dienen nicht dem Modelltraining und werden nur so lange gespeichert, wie der Prozess es verlangt.',
      'Jedes kundenbezogene Dokument und jeder KYC-Entscheid braucht eine menschliche Freigabe. Die Belege werden protokolliert.',
    ],
    relatedCase: 'private-bank-kyc-refresh',
    relatedServices: ['agentic-systems', 'ai-strategy', 'ai-operations'],
  },
  {
    slug: 'international-organisations',
    icon: 'intl-orgs',
    image: 'ind-intl',
    tier: 'core',
    name: 'Internationale Organisationen & NGOs',
    short: 'Mehrsprachige Dokumente, Berichterstattung und Wissensarbeit. Mit einer Governance, die öffentlichen Mandaten und Geldgebern genügt.',
    hero: {
      eyebrow: '[ Branche · Internationale Organisationen & NGOs ]',
      title: { pre: 'Mandate in vielen Sprachen, ', accent: 'ein', post: ' Gedächtnis.' },
      lead: 'Das internationale Genf produziert und verarbeitet sehr viel Text. Resolutionen, Berichte, Eingaben, Protokolle und Übersetzungen. Wir bauen Systeme, die entwerfen, zusammenfassen, übersetzen und finden. Mit der Neutralität, Vertraulichkeit und Governance, die öffentliche Mandate verlangen.',
    },
    context: {
      title: 'Wissensarbeit in grossen Institutionen',
      paragraphs: [
        'Organisationen in Genf arbeiten über Amtssprachen, Mitgliedstaaten und Partnernetzwerke hinweg. Viel Kapazität fliesst in Dokumente und in die Suche nach früheren Entscheiden. Welcher Absatz wurde verabschiedet, welches Land hat was berichtet, zu welchem Schluss kam eine Evaluation.',
        'KI kann dem Mandat Zeit zurückgeben. Das verlangt Sorgfalt. Daten können Personendaten von Begünstigten oder Mitarbeitenden enthalten. Vorrechte und Immunitäten bestimmen, wohin Daten gehen dürfen. Ergebnisse müssen neutral und nachvollziehbar sein. Wir klären die Governance zuerst, ohne die Arbeit unnötig zu bremsen.',
      ],
    },
    valueStreams: [
      {
        name: 'Dokumentenproduktion',
        description: 'Entwürfe, Zusammenfassungen und Übersetzungen, vorbereitet für die fachliche Prüfung.',
        useCases: [
          'Erste Entwürfe von Berichten und Briefing-Notizen aus Quellmaterial',
          'Sitzungszusammenfassungen und Beschlussprotokolle in allen Arbeitssprachen',
          'Terminologisch konsistente Übersetzungsentwürfe zur Revision',
        ],
      },
      {
        name: 'Institutionelles Wissen',
        description: 'Dokumente aus Jahrzehnten werden durchsuchbar.',
        useCases: [
          'Suche und Fragen-Antworten über Resolutionen, Berichte und Archive mit Quellenangaben',
          'Präzedenzsuche für Verhandlungsführende und Sekretariat',
          'Synthese von Evaluationen und Lessons Learned',
        ],
      },
      {
        name: 'Programme und Fördermittel',
        description: 'Berichte an Geldgeber mit weniger Aufwand kurz vor der Frist.',
        useCases: [
          'Zusammenstellung von Geldgeberberichten aus Programmdaten und Feldmeldungen',
          'Entwurf von Anträgen nach Vorlagen und Kriterien der Geldgeber',
          'Zusammenstellung von Due-Diligence-Dossiers für Partner',
        ],
      },
    ],
    compliance: [
      'Bereitstellungsoptionen, die Vorrechte und Immunitäten respektieren. Auch On-Premises und in Tenants der Organisation.',
      'Personendaten von Begünstigten und Mitarbeitenden werden minimiert, klassifiziert und bei Bedarf von externen Modellen ferngehalten.',
      'Ergebnisse lassen sich bis zu den Quelldokumenten zurückverfolgen. Vor jeder Veröffentlichung oder Übermittlung prüft ein Mensch.',
      'Abstimmung auf den Datenschutzrahmen der Organisation sowie auf revDSG und DSGVO, wo sie gelten.',
    ],
    relatedCase: 'multilingual-document-pipeline',
    relatedServices: ['data-ai-platforms', 'adoption-enablement', 'ai-strategy'],
  },
  {
    slug: 'life-sciences',
    icon: 'life-sciences',
    image: 'ind-life',
    tier: 'adjacent',
    name: 'Life Sciences & MedTech',
    short: 'Regulatorisches Schreiben, Qualitätsdokumentation und wissenschaftliches Wissen. Gebaut für GxP und validiert, wo nötig.',
    hero: {
      eyebrow: '[ Branche · Life Sciences & MedTech ]',
      title: { pre: 'Schneller zum Dossier, ', accent: 'sicherer', post: ' in der Akte.' },
      lead: 'Hersteller regulierter Produkte schreiben viel gelenkte Dokumentation. Wir bauen Systeme für Entwurf, Prüfung und Wissen, die GxP respektieren. Die Verantwortung bleibt beim Menschen. Der Audit-Trail ist so aufgebaut, dass eine Inspektion ihm folgen kann.',
    },
    stat: {
      value: '313',
      label: 'Akteure aus MedTech, Biotech und Pharma in Genf.',
      source: 'ge.ch, Schlüsselbranchen',
    },
    context: {
      title: 'Dokumentation bestimmt oft den Zeitplan',
      paragraphs: [
        'In Life Sciences und MedTech bestimmt oft das Schreiben die Zeit bis zur Einreichung. Dazu gehören klinische und technische Dokumentation, Abweichungen, CAPAs, Änderungskontrollen und Antworten an Behörden. Jedes Dokument muss mit Hunderten anderer gelenkter Dokumente übereinstimmen.',
        'KI kann entwerfen, abgleichen und finden. In einer GxP-Umgebung braucht es dafür klare Bedingungen. Das System ist für den vorgesehenen Zweck validiert, und Änderungen werden kontrolliert. Jedes Ergebnis prüft eine qualifizierte Person. Wir planen von Anfang an nach diesem Standard.',
      ],
    },
    valueStreams: [
      {
        name: 'Regulatory Affairs',
        description: 'Einreichungen und Antworten, entworfen aus gelenkten Quellen.',
        useCases: [
          'Entwurf von Abschnitten technischer Dokumentationen und Dossiers aus Quellberichten',
          'Triage von Behördenfragen und Entwurf der Antworten',
          'Konsistenzprüfungen über Einreichungsdokumente hinweg',
        ],
      },
      {
        name: 'Qualität und Compliance',
        description: 'Abweichungen und CAPAs werden schneller untersucht und besser dokumentiert.',
        useCases: [
          'Entwurf von Abweichungsberichten und Suche nach ähnlichen Ereignissen',
          'Unterstützung der Ursachenanalyse über Chargen- und Anlagenprotokolle',
          'SOP-Auswirkungsanalyse für Änderungskontrollen',
        ],
      },
      {
        name: 'Wissenschaftliches Wissen',
        description: 'Interne und publizierte Evidenz, auffindbar und mit Quellen.',
        useCases: [
          'Literaturüberwachung und strukturierte Zusammenfassungen',
          'Fragen und Antworten zu Studienberichten und interner Forschung',
          'Entwurf von Antworten der medizinischen Information',
        ],
      },
    ],
    compliance: [
      'Validierungsansatz für computergestützte Systeme nach den Grundsätzen von GAMP 5 für GxP-relevante Anwendungen.',
      'Änderungskontrolle für Modelle, Prompts und Suchquellen. Bei einer Regression in der Evaluation wird revalidiert.',
      'Prüfung durch eine qualifizierte Person und elektronische Unterschrift für jedes gelenkte Dokument.',
      'Gesundheits- und genetische Daten gelten als besonders schützenswerte Personendaten nach revDSG.',
    ],
    relatedCase: 'regulatory-submission-drafting',
    relatedServices: ['ai-operations', 'data-ai-platforms', 'agentic-systems'],
  },
  {
    slug: 'fragrance-flavour-chemicals',
    icon: 'fragrance',
    image: 'ind-fragrance',
    tier: 'adjacent',
    name: 'Riech- & Aromastoffe, Spezialchemie',
    short: 'Rezepturwissen, regulatorische Prüfung und Kundenbriefings an einem Ort. So bleibt Kreativen mehr Zeit für ihre Arbeit.',
    hero: {
      eyebrow: '[ Branche · Riech- & Aromastoffe, Spezialchemie ]',
      title: { pre: 'Jahrzehnte an Rezepturen, ', accent: 'schnell', post: ' abrufbar.' },
      lead: 'Kreative und technische Teams haben viel Wissen in Rezepturen, Laborbüchern und im Kopf. Wir machen es durchsuchbar. Wir verbinden es mit regulatorischen Anforderungen und Kundenanforderungen. So ist ein guter Ausgangspunkt in Minuten gefunden.',
    },
    stat: {
      value: '400+',
      label: 'Aroma- und Riechstofffirmen in der Region Genf, rund 10’000 Arbeitsplätze.',
      source: 'ge.ch, Schlüsselbranchen',
    },
    context: {
      title: 'Kreativität mit Vorgaben',
      paragraphs: [
        'Jedes Briefing bringt Vorgaben mit. Ein Kostenziel, ein regulatorisches Profil für mehrere Märkte, Allergen- und Kennzeichnungsregeln, Nachhaltigkeitsaussagen und Stabilitätsanforderungen. Dafür durchsuchen Teams frühere Arbeit. Und sie prüfen jeden Inhaltsstoff gegen Listen, die sich ändern.',
        'Das Wissen ist vorhanden, aber verstreut. Es liegt in Rezeptursystemen, Regulierungsdatenbanken, sensorischen Panels und E-Mails. Es zu verbinden ist zuerst eine Datenaufgabe und dann eine KI-Aufgabe. In dieser Reihenfolge arbeiten wir.',
      ],
    },
    valueStreams: [
      {
        name: 'Vom Briefing zur Rezeptur',
        description: 'Kundenbriefings werden zu Vorgaben und Ausgangspunkten.',
        useCases: [
          'Zerlegung von Briefings in strukturierte technische und regulatorische Anforderungen',
          'Suche nach ähnlichen Rezepturen in historischen Projekten',
          'Kosten- und Vorgaben-Vorprüfung von Kandidatenrezepturen',
        ],
      },
      {
        name: 'Regulatorik und Produktsicherheit',
        description: 'Die Compliance-Prüfung ist Teil des kreativen Prozesses.',
        useCases: [
          'Prüfung von Inhaltsstoffen gegen marktspezifische Beschränkungslisten',
          'Entwurf von Sicherheitsdatenblättern und Zertifikaten',
          'Überwachung regulatorischer Änderungen mit Auswirkung auf das aktive Portfolio',
        ],
      },
      {
        name: 'Vertrieb und Kundendienst',
        description: 'Schnellere und genauere Antworten an Kunden.',
        useCases: [
          'Beantwortung von Kundenfragebögen und Dokumentationsanfragen',
          'Bearbeitung von Musteranfragen und Bestellungen aus E-Mails',
          'Account-Briefings für Vertriebsteams',
        ],
      },
    ],
    compliance: [
      'Rezepturen sind wertvolles geistiges Eigentum. Sie werden in kundenkontrollierten Umgebungen bearbeitet und nie zum Modelltraining verwendet.',
      'Qualifiziertes Personal prüft regulatorische Dokumente, bevor sie an Kunden gehen.',
      'Die Sichtbarkeit von Rezepturen folgt den bestehenden Berechtigungen.',
      'Jedes Prüfergebnis lässt sich auf die verwendete Listenversion und das Datum zurückführen.',
    ],
    relatedCase: 'formulation-knowledge-graph',
    relatedServices: ['data-ai-platforms', 'agentic-systems', 'adoption-enablement'],
  },
  {
    slug: 'industry-manufacturing',
    icon: 'manufacturing',
    image: 'ind-manufacturing',
    tier: 'adjacent',
    name: 'Industrie & Fertigung',
    short: 'Wissen zu Instandhaltung, Qualität und Lieferkette für die Menschen in der Werkhalle.',
    hero: {
      eyebrow: '[ Branche · Industrie & Fertigung ]',
      title: { pre: 'Das Wissen der Fachleute, ', accent: 'direkt', post: ' an der Maschine.' },
      lead: 'Präzisionshersteller sind auf erfahrene Technikerinnen und Techniker angewiesen. Ihr Wissen ist schwer weiterzugeben. Wir bauen Assistenten und Agenten, die Handbücher, Instandhaltungshistorie und Qualitätsdaten an die Maschine bringen. In der Sprache der Person, die dort arbeitet.',
    },
    context: {
      title: 'Know-how ist oft der Engpass',
      paragraphs: [
        'Die Schweizer Industrie steht für Präzision und Zuverlässigkeit. Beides hängt an Menschen, die ihre Maschinen genau kennen. Viele von ihnen gehen bald in Pension. Ihr Wissen steckt im Kopf, in knappen Instandhaltungsprotokollen und in Handbüchern, die selten gelesen werden.',
        'KI kann dieses Wissen am Arbeitsplatz bereitstellen. Sie hilft, eine Störung anhand ähnlicher Fälle zu diagnostizieren. Sie entwirft einen Qualitätsbericht aus Sensordaten. Sie beantwortet eine Lieferantenfrage aus dem Vertrag. Der Nutzen zeigt sich in Stillstandszeit und Ausschuss. Deshalb eignen sich hier ergebnisbasierte Preise gut.',
      ],
    },
    valueStreams: [
      {
        name: 'Instandhaltung und Zuverlässigkeit',
        description: 'Schnellere Diagnose und weniger wiederholte Ausfälle.',
        useCases: [
          'Technikerassistent über Handbücher, Protokolle und frühere Einsätze',
          'Entwurf von Arbeitsaufträgen und Identifikation von Ersatzteilen',
          'Analyse von Ausfallmustern über Standorte hinweg',
        ],
      },
      {
        name: 'Qualität',
        description: 'Abweichungen werden schneller dokumentiert und abgeschlossen.',
        useCases: [
          'Entwurf von Abweichungsberichten aus Prüfdaten',
          'Unterstützung bei 8D-Berichten und Ursachenanalysen',
          'Triage von Kundenreklamationen und Entwurf der Antworten',
        ],
      },
      {
        name: 'Lieferkette und Beschaffung',
        description: 'Agenten bearbeiten Lieferantenkommunikation und Dokumente.',
        useCases: [
          'Verfolgung von Auftragsbestätigungen und Lieferterminen aus E-Mails',
          'Fragen und Antworten zu Lieferantenverträgen und Spezifikationen',
          'Zusammenfassungen zur Überwachung von Lieferantenrisiken',
        ],
      },
    ],
    compliance: [
      'Bereitstellung vor Ort oder im Tenant des Kunden, wenn Produktionsdaten das Werksnetz nicht verlassen dürfen.',
      'Exportkontrolle und Dual-Use-Aspekte sind in Datenklassifizierung und Zugriffsrechten berücksichtigt.',
      'Sicherheitsrelevante Hinweise sind als beratend gekennzeichnet. Sie verweisen auf Verfahren und brauchen eine menschliche Freigabe.',
      'Integration in bestehende Qualitätsmanagementsysteme und deren Freigabeprozesse.',
    ],
    relatedCase: 'maintenance-copilot',
    relatedServices: ['agentic-systems', 'adoption-enablement', 'ai-operations'],
  },
];
