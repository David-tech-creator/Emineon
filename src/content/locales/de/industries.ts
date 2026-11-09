import type { Industry } from '../../schema';

export const industries: Industry[] = [
  {
    slug: 'commodities-trading',
    icon: 'trading',
    image: 'ind-trading',
    tier: 'core',
    name: 'Rohstoffhandel & Schifffahrt',
    short: 'Bestätigungen, KYC, Handelsfinanzierungsdokumente und Operations, erledigt von Agenten unter der Kontrolle von Tradern und Operations-Teams.',
    hero: {
      eyebrow: '[ Branche — Rohstoffhandel & Schifffahrt ]',
      title: { pre: 'Weniger Papier zwischen Geschäft und ', accent: 'Ladung.' },
      lead: 'Handelshäuser leben von Dokumenten: Bestätigungen, Akkreditive, Konnossemente, Inspektionszertifikate, Sanktionsprüfungen. Wir setzen Agenten auf diesen Fluss an, damit Operations mit dem Desk Schritt hält und Compliance jeden Schritt lückenlos nachvollziehen kann.',
    },
    stat: {
      value: '#1',
      label: 'Genf ist weltweit führend in der Handelsfinanzierung; 12 der 14 Schweizer Handelsfinanzierungsbanken sind hier ansässig.',
      source: 'ge.ch, Schlüsselbranchen',
    },
    context: {
      title: 'Ein Dokumentengeschäft, das wie ein Handelsgeschäft aussieht',
      paragraphs: [
        'In Genf sind rund 400 Handelsfirmen mit etwa 6000 direkten Arbeitsplätzen tätig. Hinter jeder Ladung steht eine Kette von Dokumenten, die abgeglichen, geprüft und abgelegt werden müssen, oft in mehreren Sprachen und unter Zeitdruck, mit Gegenparteien, Banken, Inspektoren und Schiffsagenten, die alle mit eigenen Vorlagen arbeiten.',
        'Die Compliance-Ausgaben steigen: Sanktionsregime ändern sich schneller, Banken verlangen mehr Nachweise, und die Handelsfinanzierung verzeiht Abweichungen immer weniger. Operations-Teams sind gewachsen, um das aufzufangen. KI-Agenten bieten eine andere Antwort: alles lesen, abgleichen und vorprüfen, und den Menschen nur geben, was Urteilsvermögen verlangt.',
      ],
    },
    valueStreams: [
      {
        name: 'Handels-Operations',
        description: 'Von der Erfassung bis zur Abwicklung, mit automatisch abgeglichenen Dokumenten und früh erkannten Abweichungen.',
        useCases: [
          'Abgleich von Bestätigungen mit gebuchten Geschäften im ETRM',
          'Extraktion aus Term Sheets, Recaps und Nachträgen',
          'Abgleich von Rechnungen sowie provisorischen und finalen Preisen',
          'Vorbereitung von Liege- und Demurrage-Forderungen',
        ],
      },
      {
        name: 'Dokumente der Handelsfinanzierung',
        description: 'Akkreditive und Versanddokumente geprüft, bevor die Bank sie sieht.',
        useCases: [
          'Extraktion der Akkreditivbedingungen und Erstellung der Dokumenten-Checkliste',
          'Abweichungsprüfung vor Einreichung bei Konnossementen und Zertifikaten',
          'Entwurf und Verfolgung der Bankkorrespondenz',
        ],
      },
      {
        name: 'Compliance und KYC',
        description: 'Onboarding und Screening von Gegenparteien, mit zusammengestellten Belegen für die prüfende Person.',
        useCases: [
          'Zusammenstellung und periodische Aktualisierung von KYC-Dossiers für Gegenparteien',
          'Sanktions- und Schiffs-Screening mit erklärten Treffern',
          'Zusammenfassungen negativer Presseberichte in Originalsprache und auf Englisch',
        ],
      },
      {
        name: 'Markt- und Desk-Informationen',
        description: 'Analysen und Berichte, die sich selbst zusammenstellen.',
        useCases: [
          'Entwürfe für tägliche Positions- und P&L-Kommentare',
          'Zusammenfassung von Fracht- und Marktberichten',
          'Klauselsuche über historische Geschäfte',
        ],
      },
    ],
    compliance: [
      'Ergebnisse des Sanktions-Screenings sind Entscheidungshilfen; Entscheid und Begründung bleiben bei einer namentlich verantwortlichen Person.',
      'Daten zu Gegenparteien und Geschäften werden in der Schweiz oder im eigenen Tenant des Kunden bearbeitet.',
      'Lückenloser Audit-Trail von Dokumentversionen, Agentenaktionen und Freigaben, aufbewahrt nach den Vorgaben der Firma.',
      'Ausgelegt, um die von Banken im Rahmen von Handelsfinanzierung und GwG erwarteten Kontrollen zu unterstützen, nicht zu ersetzen.',
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
    short: 'KYC, Kundenreporting und Beratungsvorbereitung, mit Kontrollen auf FINMA-Niveau und Kundendaten, die die Schweiz nie verlassen.',
    hero: {
      eyebrow: '[ Branche — Private Banking & Vermögensverwaltung ]',
      title: { pre: 'Mehr Zeit für Kunden, weniger für ', accent: 'Dossiers.' },
      lead: 'Kundenberaterinnen und -berater verbringen einen grossen Teil ihrer Woche mit Dokumentation: KYC-Aktualisierungen, Eignungsnachweise, Gesprächsnotizen, Kundenberichte. Wir bauen Systeme, die diese Arbeit zur Prüfung vorbereiten, unter den Kontrollen, nach denen eine Schweizer Bank ohnehin lebt.',
    },
    stat: {
      value: '37’000+',
      label: 'Arbeitsplätze im Finanzsektor in Genf.',
      source: 'ge.ch, Schlüsselbranchen',
    },
    context: {
      title: 'Diskretion ist das Produkt',
      paragraphs: [
        'Private Banking in Genf beruht auf Vertrauen und auf Dokumentation. Jede Kundenbeziehung umfasst ein KYC-Dossier, Nachweise zur Vermögensherkunft, Eignungs- und Angemessenheitsprüfungen und Korrespondenz in mehreren Sprachen. Die Aufsicht erwartet sie vollständig; die Kundschaft erwartet sie unsichtbar.',
        'Der Kostendruck ist real, und der Personalbestand ist nicht mehr der Hebel von früher. Die Chance besteht darin, die Stunden des Zusammentragens und Abtippens zwischen Bankier und Kunde zu streichen und das Dossier dabei besser statt dünner zu machen. Das gelingt nur, wenn Datenhaltung, Zugriffskontrolle und Prüfbarkeit ab der ersten Zeile mitgedacht sind.',
      ],
    },
    valueStreams: [
      {
        name: 'Kundenlebenszyklus und KYC',
        description: 'Onboarding und periodische Überprüfungen von Agenten vorbereitet, von Menschen entschieden.',
        useCases: [
          'Periodische KYC-Dossiers aus Kernbankensystem und Dokumenten zusammengestellt',
          'Entwurf der Darstellung zur Vermögensherkunft mit zitierten Belegen',
          'Erkennung fehlender Dokumente und Entwurf der Kundenanfrage',
        ],
      },
      {
        name: 'Beratungsvorbereitung',
        description: 'Die Beraterin geht ins Gespräch und hat bereits alles gelesen.',
        useCases: [
          'Kundenbriefings vor dem Termin aus Portfolio, Notizen und News',
          'Erfassung von Gesprächsnotizen und Entwurf der Eignungsdokumentation',
          'Entwürfe für Anlagevorschläge im Einklang mit der Hausmeinung',
        ],
      },
      {
        name: 'Reporting und Kommunikation',
        description: 'Kundenfertiges Reporting in der Sprache der Kundschaft.',
        useCases: [
          'Entwürfe für Portfoliokommentare auf FR, DE, EN und IT',
          'Entwurf der Kundenkorrespondenz mit Prüfung von Tonalität und Compliance',
          'Internes Management-Reporting automatisch zusammengestellt',
        ],
      },
      {
        name: 'Operations und Compliance',
        description: 'Backoffice-Queues schneller abgearbeitet, mit besseren Belegen.',
        useCases: [
          'Triage von Transaktionsüberwachungs-Alerts mit erklärtem Kontext',
          'Verarbeitung von Corporate Actions und Instruktionen aus E-Mails',
          'Fragen und Antworten zu Weisungen und Regulierung für Mitarbeitende, mit Quellenangabe',
        ],
      },
    ],
    compliance: [
      'Kundenidentifizierende Daten werden in der Schweiz bearbeitet, auf bankkontrollierter Infrastruktur oder in einer in der Schweiz gehosteten Umgebung.',
      'Ausgerichtet auf die Erwartungen der FINMA zu Drittdienstleistern, operationeller Resilienz und Vertraulichkeit der Daten.',
      'Bankkundengeheimnis gewahrt: keine Kundendaten zum Modelltraining, keine dauerhafte Speicherung über das hinaus, was der Prozess verlangt.',
      'Menschliche Freigabe für jedes kundenbezogene Dokument und jeden KYC-Entscheid, mit protokollierten Belegen.',
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
    short: 'Mehrsprachige Dokumente, Berichterstattung und Wissensarbeit, mit einer Governance, die öffentlichen Mandaten und der Prüfung durch Geldgeber gerecht wird.',
    hero: {
      eyebrow: '[ Branche — Internationale Organisationen & NGOs ]',
      title: { pre: 'Mandate in vielen Sprachen, ', accent: 'ein', post: ' Gedächtnis.' },
      lead: 'Das internationale Genf produziert und verarbeitet enorme Textmengen: Resolutionen, Berichte, Eingaben, Protokolle, Übersetzungen. Wir bauen Systeme, die entwerfen, zusammenfassen, übersetzen und finden, mit der Neutralität, Vertraulichkeit und Governance, die öffentliche Mandate verlangen.',
    },
    context: {
      title: 'Wissensarbeit im institutionellen Massstab',
      paragraphs: [
        'Organisationen in Genf arbeiten über Amtssprachen, Mitgliedstaaten und Partnernetzwerke hinweg. Ein grosser Teil ihrer Kapazität fliesst in die Produktion von Dokumenten und in die Suche nach bereits Entschiedenem: Welcher Absatz wurde verabschiedet, welches Land hat was berichtet, welche Evaluation kam zu welchem Schluss.',
        'KI kann diese Kapazität dem Mandat zurückgeben. Das verlangt Sorgfalt: Daten können Personendaten von Begünstigten oder Mitarbeitenden enthalten, Vorrechte und Immunitäten bestimmen, wohin Daten gehen dürfen, und Ergebnisse müssen neutral und nachvollziehbar sein. Governance kommt zuerst, und sie lässt sich umsetzen, ohne alles zu verlangsamen.',
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
        description: 'Jahrzehnte von Dokumenten durchsuchbar und befragbar gemacht.',
        useCases: [
          'Suche und Fragen-Antworten über Resolutionen, Berichte und Archive mit Quellenangaben',
          'Präzedenzsuche für Verhandlungsführende und Sekretariat',
          'Synthese von Evaluationen und Lessons Learned',
        ],
      },
      {
        name: 'Programme und Fördermittel',
        description: 'Berichterstattung an Geldgeber ohne Last-Minute-Hektik.',
        useCases: [
          'Zusammenstellung von Geldgeberberichten aus Programmdaten und Feldmeldungen',
          'Entwurf von Anträgen nach Vorlagen und Kriterien der Geldgeber',
          'Zusammenstellung von Due-Diligence-Dossiers für Partner',
        ],
      },
    ],
    compliance: [
      'Bereitstellungsoptionen, die Vorrechte und Immunitäten respektieren, einschliesslich On-Premises und organisationskontrollierter Tenants.',
      'Personendaten von Begünstigten und Mitarbeitenden minimiert, klassifiziert und bei Bedarf von externen Modellen ferngehalten.',
      'Ergebnisse bis zu den Quelldokumenten nachvollziehbar; menschliche Prüfung vor jeder Veröffentlichung oder Übermittlung.',
      'Abstimmung auf den eigenen Datenschutzrahmen der Organisation sowie auf revDSG und DSGVO, wo sie gelten.',
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
    short: 'Regulatorisches Schreiben, Qualitätsdokumentation und wissenschaftliches Wissen, gebaut für GxP und validiert, wo es darauf ankommt.',
    hero: {
      eyebrow: '[ Branche — Life Sciences & MedTech ]',
      title: { pre: 'Schneller zum Dossier, ', accent: 'sicherer', post: ' in der Akte.' },
      lead: 'Hersteller regulierter Produkte schreiben enorme Mengen gelenkter Dokumentation. Wir bauen Systeme für Entwurf, Prüfung und Wissen, die GxP respektieren, die Verantwortung beim Menschen lassen und einen Audit-Trail hinterlassen, dem eine Inspektion folgen kann.',
    },
    stat: {
      value: '313',
      label: 'Akteure aus MedTech, Biotech und Pharma in Genf.',
      source: 'ge.ch, Schlüsselbranchen',
    },
    context: {
      title: 'Dokumentation liegt auf dem kritischen Pfad',
      paragraphs: [
        'In Life Sciences und MedTech begrenzt oft das Schreiben, nicht die Wissenschaft, die Zeit von den Daten bis zur Einreichung: klinische und technische Dokumentation, Abweichungen, CAPAs, Änderungskontrollen und Antworten an Behörden. Jedes Dokument muss mit Hunderten anderer gelenkter Dokumente übereinstimmen.',
        'KI kann entwerfen, abgleichen und finden, schneller als jedes Team. In einer GxP-Umgebung ist das nur nützlich, wenn das System für den vorgesehenen Zweck validiert ist, Änderungen kontrolliert werden und jedes Ergebnis von einer qualifizierten Person geprüft wird. Wir gestalten von Anfang an nach diesem Standard.',
      ],
    },
    valueStreams: [
      {
        name: 'Regulatory Affairs',
        description: 'Einreichungen und Antworten aus gelenkten Quellen entworfen.',
        useCases: [
          'Entwurf von Abschnitten technischer Dokumentationen und Dossiers aus Quellberichten',
          'Triage von Behördenfragen und Entwurf der Antworten',
          'Konsistenzprüfungen über Einreichungsdokumente hinweg',
        ],
      },
      {
        name: 'Qualität und Compliance',
        description: 'Abweichungen und CAPAs schneller untersucht, besser dokumentiert.',
        useCases: [
          'Entwurf von Abweichungsberichten und Suche nach ähnlichen Ereignissen',
          'Unterstützung der Ursachenanalyse über Chargen- und Anlagenprotokolle',
          'SOP-Auswirkungsanalyse für Änderungskontrollen',
        ],
      },
      {
        name: 'Wissenschaftliches Wissen',
        description: 'Interne und publizierte Evidenz, auffindbar und zitiert.',
        useCases: [
          'Literaturüberwachung und strukturierte Zusammenfassungen',
          'Fragen und Antworten zu Studienberichten und interner Forschung',
          'Entwurf von Antworten der medizinischen Information',
        ],
      },
    ],
    compliance: [
      'Validierungsansatz für computergestützte Systeme nach den Grundsätzen von GAMP 5 für GxP-relevante Anwendungen.',
      'Änderungskontrolle für Modelle, Prompts und Suchquellen; Revalidierung bei Regression in der Evaluation.',
      'Prüfung durch eine qualifizierte Person und elektronische Unterschrift für jedes gelenkte Dokument.',
      'Gesundheits- und genetische Daten als besonders schützenswerte Personendaten nach revDSG behandelt.',
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
    short: 'Rezepturwissen, regulatorische Prüfung und Kundenbriefings verbunden, damit Kreative ihre Zeit dem Kreieren widmen.',
    hero: {
      eyebrow: '[ Branche — Riech- & Aromastoffe, Spezialchemie ]',
      title: { pre: 'Jahrzehnte an Rezepturen, ', accent: 'sofort', post: ' abrufbar.' },
      lead: 'Kreative und technische Teams tragen Wissen, das in Rezepturen, Laborbüchern und Köpfen lebt. Wir machen es durchsuchbar und verbinden es mit regulatorischen und kundenseitigen Anforderungen, damit der richtige Ausgangspunkt in Minuten gefunden ist.',
    },
    stat: {
      value: '400+',
      label: 'Aroma- und Riechstofffirmen in der Region Genf, rund 10’000 Arbeitsplätze.',
      source: 'ge.ch, Schlüsselbranchen',
    },
    context: {
      title: 'Kreativität unter Vorgaben',
      paragraphs: [
        'Jedes Briefing bringt Vorgaben mit: ein Kostenziel, ein regulatorisches Profil für mehrere Märkte, Allergen- und Kennzeichnungsregeln, Nachhaltigkeitsaussagen, Stabilitätsanforderungen. Sie zu erfüllen heisst, Jahre früherer Arbeit zu durchsuchen und jeden Inhaltsstoff gegen Listen zu prüfen, die sich ändern.',
        'Das Wissen existiert, aber es ist verstreut über Rezeptursysteme, Regulierungsdatenbanken, sensorische Panels und E-Mails. Es zu verbinden ist zuerst ein Datenproblem und dann ein KI-Problem, und genau in dieser Reihenfolge arbeiten wir.',
      ],
    },
    valueStreams: [
      {
        name: 'Vom Briefing zur Rezeptur',
        description: 'Kundenbriefings übersetzt in Vorgaben und Ausgangspunkte.',
        useCases: [
          'Zerlegung von Briefings in strukturierte technische und regulatorische Anforderungen',
          'Suche nach ähnlichen Rezepturen in historischen Projekten',
          'Kosten- und Vorgaben-Vorprüfung von Kandidatenrezepturen',
        ],
      },
      {
        name: 'Regulatorik und Produktsicherheit',
        description: 'Compliance-Prüfung im kreativen Prozess verankert.',
        useCases: [
          'Prüfung von Inhaltsstoffen gegen marktspezifische Beschränkungslisten',
          'Entwurf von Sicherheitsdatenblättern und Zertifikaten',
          'Überwachung regulatorischer Änderungen mit Auswirkung auf das aktive Portfolio',
        ],
      },
      {
        name: 'Vertrieb und Kundendienst',
        description: 'Schnellere, genauere Antworten an Kunden.',
        useCases: [
          'Beantwortung von Kundenfragebögen und Dokumentationsanfragen',
          'Bearbeitung von Musteranfragen und Bestellungen aus E-Mails',
          'Account-Briefings für Vertriebsteams',
        ],
      },
    ],
    compliance: [
      'Rezepturen als wertvollstes geistiges Eigentum behandelt: bearbeitet in kundenkontrollierten Umgebungen, nie zum Modelltraining verwendet.',
      'Regulatorische Dokumente vor der Weitergabe an Kunden von qualifiziertem Personal geprüft.',
      'Feingranulare Zugriffskontrolle, damit die Sichtbarkeit von Rezepturen den bestehenden Berechtigungen folgt.',
      'Rückverfolgbarkeit jedes Prüfergebnisses auf die verwendete Listenversion und das Datum.',
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
    short: 'Wissen zu Instandhaltung, Qualität und Lieferkette in den Händen der Menschen in der Werkhalle.',
    hero: {
      eyebrow: '[ Branche — Industrie & Fertigung ]',
      title: { pre: 'Das Wissen der Fachleute, an ', accent: 'jeder', post: ' Maschine.' },
      lead: 'Präzisionshersteller sind auf erfahrene Technikerinnen und Techniker angewiesen, deren Wissen schwer weiterzugeben ist. Wir bauen Assistenten und Agenten, die Handbücher, Instandhaltungshistorie und Qualitätsdaten zur Person an der Maschine bringen, in ihrer Sprache.',
    },
    context: {
      title: 'Know-how ist der Engpass',
      paragraphs: [
        'Die Schweizer Industrie überzeugt durch Präzision und Zuverlässigkeit. Beides hängt an Menschen, die wissen, warum sich eine Maschine so verhält, wie sie es tut, und viele von ihnen stehen kurz vor der Pensionierung. Ihr Wissen steckt in ihren Köpfen, in stichwortartigen Instandhaltungsprotokollen und in Handbüchern, die niemand liest.',
        'KI kann dieses Wissen erfassen und am Arbeitsplatz bereitstellen: eine Störung anhand ähnlicher Fälle diagnostizieren, einen Qualitätsbericht aus Sensordaten entwerfen, eine Lieferantenfrage aus dem Vertrag beantworten. Der Nutzen misst sich in Stillstandszeit und Ausschuss, was ergebnisbasierte Preise einfach macht.',
      ],
    },
    valueStreams: [
      {
        name: 'Instandhaltung und Zuverlässigkeit',
        description: 'Schnellere Diagnose und weniger Wiederholungsausfälle.',
        useCases: [
          'Technikerassistent über Handbücher, Protokolle und frühere Einsätze',
          'Entwurf von Arbeitsaufträgen und Identifikation von Ersatzteilen',
          'Analyse von Ausfallmustern über Standorte hinweg',
        ],
      },
      {
        name: 'Qualität',
        description: 'Abweichungen schneller dokumentiert und abgeschlossen.',
        useCases: [
          'Entwurf von Abweichungsberichten aus Prüfdaten',
          'Unterstützung bei 8D-Berichten und Ursachenanalysen',
          'Triage von Kundenreklamationen und Entwurf der Antworten',
        ],
      },
      {
        name: 'Lieferkette und Beschaffung',
        description: 'Lieferantenkommunikation und Dokumente von Agenten bearbeitet.',
        useCases: [
          'Verfolgung von Auftragsbestätigungen und Lieferterminen aus E-Mails',
          'Fragen und Antworten zu Lieferantenverträgen und Spezifikationen',
          'Zusammenfassungen zur Überwachung von Lieferantenrisiken',
        ],
      },
    ],
    compliance: [
      'Bereitstellung vor Ort oder im Tenant des Kunden, wenn Produktionsdaten das Werksnetz nicht verlassen dürfen.',
      'Exportkontrolle und Dual-Use-Aspekte in Datenklassifizierung und Zugriffsrechten berücksichtigt.',
      'Sicherheitsrelevante Hinweise stets als beratend gekennzeichnet, mit Verweis auf Verfahren und menschlicher Freigabe.',
      'Integration in bestehende Qualitätsmanagementsysteme und deren Freigabeprozesse.',
    ],
    relatedCase: 'maintenance-copilot',
    relatedServices: ['agentic-systems', 'adoption-enablement', 'ai-operations'],
  },
];
