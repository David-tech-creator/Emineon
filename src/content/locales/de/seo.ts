import type { SeoDict } from '../../schema';

/**
 * SEO/GEO-Inhalte, Deutsch (Schweiz). Struktur, ids, Gruppen und faqIds sind
 * identisch mit en/seo.ts. Faktenregeln wie überall: nur das verifizierte Set,
 * keine Kontinentzahl, hello@emineon.com als einzige öffentliche Adresse.
 * Schweizer Orthografie: immer "ss", nie Eszett; Tausendertrennzeichen ’.
 */
export const seo: SeoDict = {
  pages: {
    switzerland: 'KI-Beratung in der Schweiz',
    geneva: 'KI-Beratung in Genf',
    governance: 'KI-Governance in der Schweiz',
    faq: 'FAQ',
  },
  labels: {
    updated: 'Aktualisiert',
    footerColumn: 'KI-Beratung',
    related: 'Weiterführend',
    follow: 'Folgen',
    allQuestions: 'Alle {n} Fragen',
  },
  titles: {
    services: {
      'ai-strategy': 'KI-Strategie und Readiness-Assessment',
      'agentic-systems': 'Agentische KI-Systeme im produktiven Betrieb',
      'data-ai-platforms': 'Daten- und KI-Plattformen, bei Bedarf in der Schweiz gehostet',
      'ai-operations': 'KI-Betrieb: LLMOps, Evals, Monitoring, Governance',
      'adoption-enablement': 'KI-Einführung und Schulung für Ihre Teams',
    },
    industries: {
      'commodities-trading': 'KI für Rohstoffhandel und Schifffahrt',
      'banking-wealth': 'KI für Privatbanken und Vermögensverwalter',
      'international-organisations': 'KI für internationale Organisationen und NGOs',
      'life-sciences': 'KI für Life Sciences und MedTech',
      'fragrance-flavour-chemicals': 'KI für Riechstoffe, Aromen und Spezialchemie',
      'industry-manufacturing': 'KI für Industrie und Fertigung',
    },
  },

  facts: {
    eyebrow: '[ Emineon auf einen Blick ]',
    title: { pre: 'Die Fakten, ', accent: 'an einem Ort.' },
    definition:
      'Emineon ist eine KI-native Beratungsfirma mit Sitz in Genf, Schweiz. Sie entwickelt KI-Strategien, baut agentische Systeme, die in Produktion laufen, und verankert deren Nutzung in der ganzen Firma: ein verantwortliches Team, bezahlt nach Ergebnissen statt nach Stunden.',
    items: [
      { label: 'Was', value: 'KI-native Beratungsfirma: KI-Strategie, agentische Systeme in Produktion, Daten- und KI-Plattformen, KI-Betrieb, Adoption' },
      { label: 'Hauptsitz', value: 'Route de Vandœuvres 77A, 1253 Vandœuvres, Genf, Schweiz' },
      { label: 'Delivery-Hubs', value: 'Genf · Ho-Chi-Minh-Stadt · Hanoi · Tokio · Melbourne · Silicon Valley · Texas' },
      { label: 'Netzwerk', value: '130+ Ingenieurinnen und Ingenieure · 200+ abgeschlossene Projekte' },
      { label: 'Mandatsmodell', value: 'Analysieren (Analyse zum Festpreis) → Bauen (vergütet pro Meilenstein und nach Ergebnis) → Betreiben (betreiben, härten, übergeben)' },
      { label: 'Flaggschiff', value: '30 Tage von der Standortbestimmung bis zum ersten Workflow in Produktion' },
      { label: 'Teams', value: 'Kleine Senior-Teams und Forward-deployed Engineers vor Ort, getragen vom globalen Delivery-Netzwerk' },
      { label: 'Preise', value: 'Bezahlt nach Ergebnissen, nicht nach Stunden' },
      { label: 'Sprachen', value: 'Englisch, Französisch, Deutsch' },
      { label: 'Daten und Compliance', value: 'Datenhaltung in der Schweiz möglich; revDSG (in Kraft seit 1. September 2023); FINMA-Aufsichtsmitteilung 08/2024; DSGVO; bereit für den EU AI Act; modellunabhängig' },
      { label: 'Branchen', value: 'Rohstoffhandel und Schifffahrt; Private Banking und Vermögensverwaltung; internationale Organisationen und NGOs; Life Sciences und MedTech; Riech- und Aromastoffe, Spezialchemie; Industrie und Fertigung' },
      { label: 'Kontakt', value: 'hello@emineon.com' },
    ],
  },

  faq: {
    groups: {
      firm: 'Über Emineon',
      engagements: 'Mandate und Preise',
      technology: 'Technologie und Daten',
      regulation: 'Regulierung und Governance',
    },
    items: [
      {
        id: 'what-ai-consulting',
        group: 'engagements',
        q: 'Was macht eine KI-Beratung?',
        a: 'Sie hilft einer Organisation zu entscheiden, wo KI Wert schafft, baut die Systeme, die diesen Wert liefern, und sorgt dafür, dass die Mitarbeitenden sie nutzen. Bei Emineon heisst das: eine Analyse mit Business Cases und Roadmap, agentische Systeme, die wir bauen und in Produktion betreiben, sowie die Schulung und Governance, die die Nutzung dauerhaft verankern.',
      },
      {
        id: 'who-is-emineon',
        group: 'firm',
        q: 'Wer ist Emineon?',
        a: 'Emineon ist eine KI-native Beratungsfirma mit Sitz in Genf, Schweiz. Kleine Senior-Teams, verstärkt durch KI und getragen von einem globalen Delivery-Netzwerk mit 130+ Ingenieurinnen und Ingenieuren, begleiten Kunden von der KI-Strategie auf Geschäftsleitungsebene bis zu Systemen in Produktion.',
      },
      {
        id: 'where-based',
        group: 'firm',
        q: 'Wo hat Emineon seinen Sitz?',
        a: 'Unser Hauptsitz liegt an der Route de Vandœuvres 77A, 1253 Vandœuvres, im Kanton Genf. Unser Delivery-Netzwerk hat Hubs in Ho-Chi-Minh-Stadt, Hanoi, Tokio, Melbourne, im Silicon Valley und in Texas.',
      },
      {
        id: 'outside-geneva',
        group: 'firm',
        q: 'Arbeiten Sie auch ausserhalb von Genf?',
        a: 'Ja. Wir arbeiten in der ganzen Schweiz, unter anderem in Lausanne, Zürich, Basel und Bern, sowie international. Forward-deployed Engineers arbeiten vor Ort mit Ihrem Team, wo immer die Arbeit stattfindet.',
      },
      {
        id: 'industries',
        group: 'firm',
        q: 'Auf welche Branchen konzentrieren Sie sich?',
        a: 'Rohstoffhandel und Schifffahrt, Private Banking und Vermögensverwaltung sowie internationale Organisationen und NGOs: die Branchen, die Genf prägen. Daneben arbeiten wir in Life Sciences und MedTech, Riech- und Aromastoffe und Spezialchemie sowie Industrie und Fertigung.',
      },
      {
        id: 'services',
        group: 'firm',
        q: 'Welche Leistungen bieten Sie an?',
        a: 'Fünf: KI-Strategie (Reifegrad, Business Cases, Roadmap, Richtlinie), agentische Systeme, Daten- und KI-Plattformen, KI-Betrieb (LLMOps, Evaluationen, Monitoring, Governance) sowie Adoption und Befähigung (Schulung, Change, KI-Richtlinie).',
      },
      {
        id: 'how-start',
        group: 'engagements',
        q: 'Wie beginnt ein Mandat?',
        a: 'Mit der Analyse: einer Standortbestimmung zum Festpreis zu KI-Reifegrad, priorisierten Anwendungsfällen mit ROI, Daten und Risiken, Richtlinie und Roadmap. Am Ende steht der Entscheid, was zuerst gebaut wird.',
      },
      {
        id: 'how-fast',
        group: 'engagements',
        q: 'Wie schnell kann ein erster KI-Workflow live sein?',
        a: 'Unser Flaggschiff-Sprint führt in 30 Tagen von der Standortbestimmung bis zum ersten Workflow in Produktion, bei einem klar abgegrenzten Anwendungsfall mit gesichertem Datenzugang.',
      },
      {
        id: 'pricing',
        group: 'engagements',
        q: 'Wie berechnen Sie Ihre Arbeit?',
        a: 'Analysen kosten einen Festpreis. Umsetzungen vergüten Sie pro Meilenstein und, wo sich das Ergebnis messen lässt, nach Ergebnis. Bezahlt werden wir für Resultate, nicht für Stunden.',
      },
      {
        id: 'fde',
        group: 'engagements',
        q: 'Was sind Forward-deployed Engineers?',
        a: 'Senior-Ingenieurinnen und -Ingenieure, die bei Ihrem Team sitzen, vor Ort in Genf oder wo immer Sie tätig sind. Sie lernen den Arbeitsablauf aus erster Hand kennen und liefern das System gemeinsam mit Ihnen, während das Delivery-Netzwerk für die Skalierung sorgt.',
      },
      {
        id: 'agentic-ai',
        group: 'technology',
        q: 'Was ist agentische KI, und ist sie reif für den produktiven Einsatz?',
        a: 'Agentische KI-Systeme nutzen Sprachmodelle, um mehrstufige Aufgaben mit Werkzeugen zu planen und auszuführen, etwa Dokumente lesen, Systeme prüfen und Massnahmen vorbereiten, wobei Menschen dort freigeben, wo es darauf ankommt. Reif für die Produktion sind sie, wenn klarer Umfang, Evaluationen, Logging und menschliche Prüfung vom ersten Tag an eingebaut sind.',
      },
      {
        id: 'data-switzerland',
        group: 'technology',
        q: 'Können unsere Daten in der Schweiz bleiben?',
        a: 'Ja. Wo nötig betreiben wir die Systeme auf Infrastruktur in der Schweiz oder in Ihrem eigenen Cloud-Tenant und berücksichtigen das revDSG von Anfang an. Ihre Daten bleiben Ihre Daten und werden nicht zum Training von Modellen Dritter verwendet.',
      },
      {
        id: 'model-agnostic',
        group: 'technology',
        q: 'Sind Sie an ein bestimmtes KI-Modell oder einen Anbieter gebunden?',
        a: 'Nein. Wir sind modellunabhängig und wählen das Modell pro Aufgabe nach Qualität, Kosten und Datenvorgaben, damit Sie den Anbieter ohne Neuentwicklung wechseln können.',
      },
      {
        id: 'finma',
        group: 'regulation',
        q: 'Was bedeutet die FINMA-Aufsichtsmitteilung 08/2024 für KI bei einer Bank oder einem Vermögensverwalter?',
        a: 'Die FINMA-Aufsichtsmitteilung 08/2024 beschreibt, was die Schweizer Finanzmarktaufsicht bei Governance und Risikomanagement erwartet, wenn beaufsichtigte Institute KI einsetzen. In der Praxis heisst das: wissen, welche KI-Anwendungen Sie betreiben, wer dafür verantwortlich ist, wie riskant jede einzelne ist und wie Datenqualität, Tests, Überwachung und Dokumentation geregelt sind. Wir bauen diese Kontrollen direkt ins System ein.',
      },
      {
        id: 'eu-ai-act',
        group: 'regulation',
        q: 'Gilt der EU AI Act auch für Schweizer Unternehmen?',
        a: 'Das kann er. Die KI-Verordnung der EU erfasst Anbieter, die KI-Systeme in der EU in Verkehr bringen, und in bestimmten Fällen auch Anbieter und Betreiber ausserhalb der EU, deren KI-Ergebnisse in der EU verwendet werden. Die Schweiz übernimmt den EU AI Act nicht: Der Bundesrat hat entschieden, die KI-Konvention des Europarats zu ratifizieren und das Schweizer Recht sektoriell anzupassen.',
      },
      {
        id: 'nfadp',
        group: 'regulation',
        q: 'Was bedeutet das revDSG für KI-Projekte?',
        a: 'Das revidierte Bundesgesetz über den Datenschutz ist seit dem 1. September 2023 in Kraft. Für KI bedeutet es Datenschutz durch Technik und datenschutzfreundliche Voreinstellungen, Transparenz bei automatisierten Einzelentscheidungen, ein Verzeichnis der Bearbeitungstätigkeiten, Datenschutz-Folgenabschätzungen bei Bearbeitungen mit hohem Risiko und die Meldung von Verletzungen an den EDÖB. Wir behandeln das als Vorgaben für das Design, nicht als Papierkram am Schluss.',
      },
      {
        id: 'after-live',
        group: 'engagements',
        q: 'Was passiert, wenn das System live ist?',
        a: 'Betreiben: Wir betreiben, überwachen und härten es, mit Evaluationen und Alerting, und betreiben es danach entweder weiter oder übergeben es mit Dokumentation und Schulung an Ihr Team. Der Rollout auf weitere Gesellschaften erfolgt in derselben Phase.',
      },
      {
        id: 'success',
        group: 'engagements',
        q: 'Wie messen Sie den Erfolg?',
        a: 'Am Business Case, der in der Analyse vereinbart wurde: gewonnene Stunden, Durchlaufzeit, Fehlerquote, Durchsatz oder Umsatz, gemessen vorher und nachher. Evaluationen prüfen die Qualität laufend, damit Sie wissen, dass das System weiterhin leistet, was es soll.',
      },
      {
        id: 'training',
        group: 'engagements',
        q: 'Schulen Sie auch unsere Mitarbeitenden?',
        a: 'Ja. Adoption und Befähigung umfasst rollenbasierte Schulungen, eine KI-Richtlinie, Change Management und interne Champions, denn ein System, das niemand nutzt, bringt nichts.',
      },
      {
        id: 'languages',
        group: 'firm',
        q: 'In welchen Sprachen arbeiten Sie?',
        a: 'Englisch, Französisch und Deutsch, die Arbeitssprachen der meisten Schweizer Firmen und des internationalen Genf.',
      },
      {
        id: 'vs-large',
        group: 'firm',
        q: 'Was unterscheidet Emineon von einer grossen Beratungsfirma?',
        a: 'Ein kleines Senior-Team führt Sie von der Strategie bis zum System in Produktion und bleibt, um es zu betreiben. Sie erhalten keine Präsentation, die an einen separaten Umsetzer weitergereicht wird. Wir werden nach Ergebnissen bezahlt, nicht nach Stunden, und konzentrieren uns auf die regulierten, dokumentenintensiven Branchen Genfs.',
      },
      {
        id: 'contact',
        group: 'firm',
        q: 'Wie nehme ich Kontakt auf?',
        a: 'Schreiben Sie an hello@emineon.com oder nutzen Sie das Kontaktformular. In einem ersten Gespräch klären wir, ob eine Analyse, ein 30-Tage-Sprint oder eine bestimmte Umsetzung passt.',
      },
    ],
  },

  faqPage: {
    meta: {
      title: 'FAQ zur KI-Beratung: Leistungen, Preise, Daten, Regulierung',
      description:
        'Klare Antworten zu Emineon und KI-Beratung in der Schweiz: Leistungen, 30-Tage-Sprint, Ergebnispreise, Schweizer Datenhaltung, revDSG, FINMA 08/2024, EU AI Act.',
    },
    hero: {
      eyebrow: '[ FAQ ]',
      title: { pre: 'Die Fragen, die uns am ', accent: 'häufigsten', post: ' gestellt werden.' },
      lead: 'Kurze, zitierfähige Antworten, nach Thema geordnet. Fehlt Ihre Frage, schreiben Sie an hello@emineon.com. Ein Senior-Mitglied des Teams antwortet innert eines Arbeitstags.',
    },
  },

  switzerland: {
    meta: {
      title: 'KI-Beratung Schweiz',
      description:
        'KI-Beratung mit Sitz in Genf: KI-Strategie, agentische Systeme im Betrieb, Governance nach revDSG, FINMA und EU AI Act. Bezahlt nach Ergebnis.',
    },
    hero: {
      eyebrow: '[ KI-Beratung · Schweiz ]',
      title: { pre: 'KI-Beratung in der Schweiz: ', accent: 'von der Strategie bis zum System', post: ' im Betrieb.' },
      lead: 'Emineon ist eine KI-Beratungsfirma mit Sitz in Genf. Wir helfen Schweizer Unternehmen zu entscheiden, wo sich KI lohnt, bauen agentische Systeme, die auf Schweizer Infrastruktur oder in der Umgebung des Kunden produktiv laufen, und schulen die Mitarbeitenden, die sie nutzen, auf Englisch, Französisch und Deutsch. Ein Senior-Team, bezahlt nach Ergebnissen.',
    },
    services: {
      eyebrow: '[ 01 — Was wir in der Schweiz tun ]',
      title: { pre: 'Fünf Leistungen, ein Team, ', accent: 'ein verantwortetes', post: ' Ergebnis.' },
      lead: 'Jede Leistung funktioniert für sich, doch die meisten Schweizer Kunden kombinieren zwei oder drei: eine Strategie, die die ersten Workflows benennt, das System, das sie ausführt, und den Betrieb und die Schulung, die sie im Einsatz halten.',
    },
    engagement: {
      eyebrow: '[ 02 — So funktionieren Mandate ]',
      title: { pre: 'Analysieren, bauen, betreiben: ', accent: 'vergütet nach Resultat.' },
      lead: 'Jedes Mandat folgt derselben Leiter. Jede Sprosse hat einen festen Umfang, eine klare Preislogik und ein Ergebnis, das Sie prüfen können, bevor Sie sich auf die nächste festlegen. Der Flaggschiff-Sprint bringt einen klar abgegrenzten Anwendungsfall in 30 Tagen von der Standortbestimmung bis zum ersten Workflow in Produktion.',
      columns: { stage: 'Phase', what: 'Was Sie erhalten', pricing: 'Preis', duration: 'Typische Dauer' },
    },
    swiss: {
      eyebrow: '[ 03 — Schweizer Besonderheiten ]',
      title: { pre: 'Gebaut dafür, wie die Schweiz Daten und KI ', accent: 'reguliert.' },
      lead: 'Schweizer Firmen arbeiten unter einem eigenen Datenschutzrecht, unter Branchenaufsichten und oft zusätzlich unter EU-Regeln. Wir behandeln all das als Vorgabe für das Design.',
      items: [
        {
          title: 'Datenhaltung',
          text: 'Systeme laufen auf Infrastruktur in der Schweiz oder in Ihrem eigenen Cloud-Tenant, wenn die Daten es verlangen. Sie wählen die Region; wir dokumentieren sie. Kundendaten werden nie zum Training von Modellen Dritter verwendet.',
        },
        {
          title: 'revDSG ab Design',
          text: 'Das revidierte Bundesgesetz über den Datenschutz gilt seit dem 1. September 2023. Datenschutz durch Technik und datenschutzfreundliche Voreinstellungen, Bearbeitungsverzeichnis, Folgenabschätzungen und die Meldung von Verletzungen an den EDÖB sind Teil des Bauplans, kein Nachgedanke.',
        },
        {
          title: 'Erwartungen der FINMA',
          text: 'Für Banken, Vermögensverwalter und andere beaufsichtigte Institute gibt die FINMA-Aufsichtsmitteilung 08/2024 den Rahmen für die Governance von KI vor. Inventar, Risikoklassifizierung, Tests, Überwachung und Dokumentation bauen wir ins System ein.',
        },
        {
          title: 'Reichweite des EU AI Act',
          text: 'Die Schweiz übernimmt den EU AI Act nicht, doch er kann trotzdem gelten, wenn Schweizer Firmen den EU-Markt bedienen oder ihre KI-Ergebnisse dort verwendet werden. Wir berücksichtigen ihn von Anfang an, damit die Dokumentation bereits vorliegt, wenn sie gebraucht wird.',
        },
      ],
      cta: { label: 'KI-Governance in der Schweiz', href: '/ai-governance-switzerland' },
    },
    sectors: {
      eyebrow: '[ 04 — Branchen ]',
      title: { pre: 'Tief in den Branchen, die die Schweizer Wirtschaft ', accent: 'prägen.' },
      lead: 'Wir konzentrieren uns auf regulierte, dokumentenintensive und mehrsprachige Arbeit, wo KI am meisten Zeit spart und am meisten Sorgfalt verlangt. Drei Kernbranchen sind typisch für Genf; drei angrenzende reichen über die Romandie in die ganze Schweiz.',
    },
    where: {
      eyebrow: '[ 05 — Wo wir arbeiten ]',
      title: { pre: 'Verwurzelt in Genf, ', accent: 'vor Ort', post: ' in der ganzen Schweiz.' },
      lead: 'Mandatsleitung und Forward-deployed Engineering sind an unserem Hauptsitz in Genf angesiedelt. Die Ingenieurinnen und Ingenieure reisen dorthin, wo die Arbeit ist, und unser globales Delivery-Netzwerk ergänzt die Kapazität rund um die Uhr.',
      places: [
        { title: 'Genf', text: 'Hauptsitz in Vandœuvres. Handelshäuser, Privatbanken und internationale Organisationen sind nur eine kurze Fahrt entfernt.' },
        { title: 'Lausanne und Waadt', text: 'Betreut von Genf aus, vor Ort, wann immer die Arbeit es verlangt. Life Sciences, Industrie und das öffentliche Forschungsumfeld.' },
        { title: 'Zürich', text: 'Wir betreuen Zürcher Kunden von Genf aus, mit Ingenieurinnen und Ingenieuren vor Ort für Analyse, Umsetzung und Übergabe.' },
        { title: 'Basel', text: 'Life Sciences und Spezialchemie, betreut von Genf aus, mit Arbeit vor Ort, wo regulierte Daten es erfordern.' },
        { title: 'Bern', text: 'Bundesnahe und regulierte Organisationen, betreut von Genf aus, auf Französisch oder Deutsch.' },
        { title: 'Tessin', text: 'Betreut von Genf aus, für Mandate, die zu unseren Branchen und Sprachen passen.' },
      ],
      note: 'Genf ist unser einziger Standort in der Schweiz. Überall sonst kommen wir zu Ihnen.',
      cta: { label: 'KI-Beratung in Genf', href: '/ai-consulting-geneva' },
    },
    work: {
      eyebrow: '[ 06 — Repräsentative Mandate ]',
      title: { pre: 'Systeme in Produktion, ', accent: 'gemessen.' },
      lead: 'Unter NDA anonymisiert und als repräsentativ gekennzeichnet. Jedes Mandat nennt die Ausgangslage, was wir gebaut haben und was sich verändert hat.',
    },
    choose: {
      eyebrow: '[ 07 — Die richtige Wahl ]',
      title: { pre: 'So wählen Sie eine KI-Beratung ', accent: 'in der Schweiz.' },
      lead: 'Sechs Fragen, die Sie jeder Firma stellen sollten, auch uns. Die Antworten trennen Firmen, die Systeme liefern, von Firmen, die Folien liefern.',
      items: [
        { title: 'Nachweis aus der Produktion', text: 'Fragen Sie nach Systemen, die heute live sind, mit Ausgangslage und gemessenem Ergebnis. Pilotprojekte und Demos sind kein Nachweis.' },
        { title: 'Datenhaltung', text: 'Wo werden Ihre Daten bearbeitet und gespeichert, wer hat Zugriff darauf, und werden sie je zum Training eines Modells verwendet? Lassen Sie sich die Antwort schriftlich geben.' },
        { title: 'Erfahrung in regulierten Branchen', text: 'Sind Sie beaufsichtigt, sollte die Firma wissen, was die FINMA-Aufsichtsmitteilung 08/2024, das revDSG und gegebenenfalls der EU AI Act von einem KI-System verlangen, und zeigen können, wie ihre Systeme das erfüllen.' },
        { title: 'Preismodell', text: 'Abrechnung nach Stunden belohnt Aufwand. Festpreise und ergebnisbasierte Vergütung belohnen Resultate. Fragen Sie, welche Risiken die Firma mitzutragen bereit ist.' },
        { title: 'Betrieb und Übergabe', text: 'Wer betreibt das System nach dem Start, wie wird die Qualität überwacht, und wie geht die Verantwortung an Ihr Team über? Ein Plan mit Ausstieg ist ein gutes Zeichen.' },
        { title: 'Sprachabdeckung', text: 'In der Schweiz wird auf Französisch, Deutsch und Englisch gearbeitet, oft in derselben Woche. Achten Sie darauf, dass das Team in Ihrer Sprache arbeiten, dokumentieren und schulen kann.' },
      ],
    },
    faq: {
      eyebrow: '[ 08 — FAQ ]',
      title: { pre: 'KI-Beratung in der Schweiz: ', accent: 'Fragen,', post: ' die uns gestellt werden.' },
    },
    faqIds: ['what-ai-consulting', 'who-is-emineon', 'outside-geneva', 'services', 'how-fast', 'pricing', 'data-switzerland', 'finma', 'eu-ai-act', 'vs-large'],
  },

  geneva: {
    meta: {
      title: 'KI-Beratung in Genf',
      description:
        'KI-Beratung in Genf (Vandœuvres). Agentische Systeme für Rohstoffhandel, Privatbanken und internationale Organisationen, produktiv betrieben und revDSG-konform.',
    },
    hero: {
      eyebrow: '[ KI-Beratung · Genf ]',
      title: { pre: 'KI-Beratung in Genf für ', accent: 'Rohstoffhandel, Privatbanken', post: ' und internationale Organisationen.' },
      lead: 'Emineon ist eine KI-Beratungsfirma mit Sitz in Vandœuvres, Genf. Unser Senior-Team und unsere Forward-deployed Engineers bauen agentische Systeme für die Handelshäuser, Privatbanken und internationalen Organisationen der Stadt, betreiben sie in Produktion unter Schweizer Datenschutz und schulen die Menschen, die damit arbeiten.',
    },
    context: {
      eyebrow: '[ 01 — Warum Genf ]',
      title: { pre: 'Eine Stadt der Dokumente, der Sprachen ', accent: 'und der Aufsicht.' },
      paragraphs: [
        'Die Genfer Wirtschaft lebt von Arbeit, für die sich KI gut eignet und die mit Sorgfalt erledigt werden muss: Handelsbestätigungen und Akkreditive, Kundendossiers und periodische Überprüfungen, Berichte und Archive in mehreren Amtssprachen.',
        'Dieselben Firmen sind beaufsichtigt, werden geprüft und sind zur Vertraulichkeit verpflichtet. Deshalb bauen wir hier, mit den Menschen, die die Arbeit machen, statt ein generisches Tool von anderswo zu liefern.',
      ],
      stats: [
        { value: '#1', label: 'Genf ist weltweit führend in der Handelsfinanzierung; 12 der 14 Schweizer Banken für Handelsfinanzierung sind hier ansässig.', source: 'ge.ch, Schlüsselbranchen' },
        { value: '~400', label: 'Handelsunternehmen in Genf, rund 6’000 Arbeitsplätze.', source: 'ge.ch, Schlüsselbranchen' },
        { value: '37’000+', label: 'Arbeitsplätze im Genfer Finanzsektor.', source: 'ge.ch, Schlüsselbranchen' },
        { value: '400+', label: 'Unternehmen der Aroma- und Riechstoffbranche in der Region Genf, rund 10’000 Arbeitsplätze.', source: 'ge.ch, Schlüsselbranchen' },
      ],
    },
    sectors: {
      eyebrow: '[ 02 — Genfer Branchen ]',
      title: { pre: 'Drei Branchen, in denen Genf ', accent: 'führt.' },
      lead: 'Unsere Kernbranchen sind jene, die Genf ausmachen. Jede hat ihre eigenen Dokumente, Aufsichtsbehörden und Fehlerbilder.',
      items: [
        {
          industry: 'commodities-trading',
          title: 'Rohstoffhandel und Schifffahrt',
          text: 'Agenten, die Bestätigungen lesen, sie mit gebuchten Geschäften abgleichen und Ausnahmen mit Kontext weiterleiten, dazu Unterstützung bei Dokumenten der Handelsfinanzierung und beim Operations-Reporting.',
        },
        {
          industry: 'banking-wealth',
          title: 'Privatbanken und Vermögensverwalter',
          text: 'Periodische KYC-Überprüfungen, vorbereitet für einen menschlichen Entscheid, mehrsprachiges Kundenreporting und Kontrollen, ausgerichtet auf die Erwartungen der FINMA an KI.',
        },
        {
          industry: 'international-organisations',
          title: 'Internationale Organisationen und NGOs',
          text: 'Mehrsprachige Dokumenten-Pipelines, durchsuchbares institutionelles Wissen und Unterstützung beim Verfassen von Texten, unter den Vertraulichkeits- und Datenregeln, die für internationale Organisationen gelten.',
        },
      ],
    },
    onsite: {
      eyebrow: '[ 03 — Vor Ort in Genf ]',
      title: { pre: 'Ingenieure in Ihrem Büro, ', accent: 'nicht', post: ' in einer Ticket-Queue.' },
      paragraphs: [
        'Unsere Forward-deployed Engineers arbeiten für Analyse, Umsetzung und Übergabe in Ihren Räumlichkeiten in Genf. Sie sind in den Stand-ups dabei, lesen die Ausnahmen-Queue und sprechen mit den Menschen, die die Arbeit machen, damit die Anforderungen aus der Praxis kommen und nicht aus einem Workshop.',
        'Unser Hauptsitz an der Route de Vandœuvres 77A liegt eine kurze Fahrt von den Banken, Handelshäusern und internationalen Organisationen entfernt, mit denen wir arbeiten. Lausanne und die übrige Romandie sind gut erreichbar.',
      ],
      points: [
        { title: 'Senior, lokal, verantwortlich', text: 'Ein kleines Senior-Team in Genf verantwortet das Ergebnis und die Beziehung.' },
        { title: 'Kapazität im Rücken', text: 'Unser globales Delivery-Netzwerk ergänzt die Kapazität für Umsetzung und Betrieb rund um die Uhr.' },
        { title: 'Französisch, Englisch, Deutsch', text: 'Workshops, Dokumentation und Schulung in der Sprache, in der Ihr Team arbeitet.' },
      ],
    },
    data: {
      eyebrow: '[ 04 — Daten und Regulierung ]',
      title: { pre: 'Standardmässig ', accent: 'vertraulich.' },
      items: [
        { title: 'Schweizer Datenschutz', text: 'Von Anfang an für das revDSG gebaut, auf Infrastruktur in der Schweiz oder in Ihrem eigenen Cloud-Tenant, wo die Daten es verlangen.' },
        { title: 'Beaufsichtigte Institute', text: 'Für Banken und Vermögensverwalter folgen die Kontrollen der FINMA-Aufsichtsmitteilung 08/2024: Inventar, Risikoklassifizierung, Tests, Überwachung und Dokumentation.' },
        { title: 'Internationale Organisationen', text: 'Internationale Organisationen wenden oft eigene Datenschutz- und Vertraulichkeitsregeln an. Wir gestalten nach diesen Regeln und dokumentieren, wie das System sie erfüllt.' },
      ],
    },
    work: {
      eyebrow: '[ 05 — Repräsentative Mandate ]',
      title: { pre: 'Gebaut für die ', accent: 'Kernbranchen', post: ' Genfs.' },
      lead: 'Unter NDA anonymisiert und als repräsentativ gekennzeichnet.',
    },
    faq: {
      eyebrow: '[ 06 — FAQ ]',
      title: { pre: 'KI-Beratung in Genf: ', accent: 'Fragen,', post: ' die uns gestellt werden.' },
    },
    faqIds: ['where-based', 'fde', 'how-fast', 'data-switzerland', 'languages', 'contact'],
    faqExtra: [
      {
        q: 'Arbeiten Sie mit Rohstoffhändlern in Genf?',
        a: 'Ja. Rohstoffhandel und Schifffahrt ist eine unserer drei Kernbranchen. Typische Systeme gleichen Handelsbestätigungen mit gebuchten Geschäften ab, unterstützen die Dokumentation der Handelsfinanzierung und leiten Ausnahmen mit vollem Kontext an die richtige Person weiter.',
      },
      {
        q: 'Können Sie vor Ort in Genf arbeiten?',
        a: 'Ja. Unser Hauptsitz ist in Vandœuvres, und unsere Forward-deployed Engineers arbeiten für Analyse, Umsetzung und Übergabe in den Räumlichkeiten der Kunden in Genf.',
      },
      {
        q: 'Arbeiten Sie mit internationalen Organisationen und NGOs in Genf?',
        a: 'Ja. Internationale Organisationen und NGOs gehören zu unseren Kernbranchen. Wir bauen mehrsprachige Dokumenten-Pipelines und durchsuchbare Archive, ausgerichtet auf die Vertraulichkeits- und Datenregeln, unter denen diese Organisationen arbeiten.',
      },
    ],
  },

  governance: {
    meta: {
      title: 'KI-Governance Schweiz: FINMA, revDSG, EU AI Act',
      description:
        'Was FINMA-Aufsichtsmitteilung 08/2024, revDSG und EU AI Act für KI-Systeme bedeuten, und welche Kontrollen wir einbauen: Inventar, Evals, Logging.',
    },
    hero: {
      eyebrow: '[ Vertrauen & Governance ]',
      title: { pre: 'KI-Governance für Schweizer Unternehmen: ', accent: 'im System gebaut,', post: ' nicht nachgerüstet.' },
      lead: 'Schweizer Firmen, die KI einsetzen, unterstehen dem revDSG, Branchenaufsichten wie der FINMA und, wenn sie den EU-Markt bedienen, dem EU AI Act. Diese Seite fasst zusammen, was jeder Rahmen in der Praxis von einem KI-System verlangt, und welche Kontrollen Emineon in jedes System einbaut, damit die Nachweise vom ersten Tag an vorliegen.',
    },
    frameworks: {
      eyebrow: '[ 01 — Die Rahmenwerke ]',
      title: { pre: 'Vier Regelquellen, ', accent: 'ein', post: ' Systemdesign.' },
      lead: 'Eine Zusammenfassung aus der Praxis, keine Rechtsberatung. Prüfen Sie die Primärquellen und klären Sie mit Ihrer Rechtsberatung, welche Pflichten für Sie gelten.',
      items: [
        {
          key: 'finma',
          name: 'FINMA-Aufsichtsmitteilung 08/2024',
          scope: 'Banken, Versicherer, Vermögensverwalter und andere von der FINMA beaufsichtigte Institute.',
          summary:
            'Die Aufsichtsmitteilung der FINMA zu Governance und Risikomanagement beim Einsatz von KI durch beaufsichtigte Institute. Sie beschreibt, was die Aufsicht zu sehen erwartet, und gibt den Rahmen für den Aufsichtsdialog zu KI vor.',
          points: [
            'Wissen, welche KI-Anwendungen Sie betreiben: ein gepflegtes Inventar mit klaren Verantwortlichen.',
            'Jede Anwendung nach Risiko klassifizieren und entsprechend steuern.',
            'Für Datenqualität, Tests und laufende Überwachung sorgen.',
            'Eine Dokumentation führen, die Ergebnisse erklärbar und überprüfbar macht.',
          ],
          source: 'FINMA · Aufsichtsmitteilung 08/2024',
        },
        {
          key: 'nfadp',
          name: 'revDSG (nDSG, revidiertes Bundesgesetz über den Datenschutz)',
          scope: 'Jede Organisation, die in der Schweiz Personendaten bearbeitet.',
          summary:
            'In Kraft seit dem 1. September 2023. Es gilt für KI-Systeme wie für jede andere Bearbeitung von Personendaten, mit einigen Pflichten, die für KI besonders wichtig sind.',
          points: [
            'Datenschutz durch Technik und datenschutzfreundliche Voreinstellungen.',
            'Transparenz, auch bei automatisierten Einzelentscheidungen.',
            'Ein Verzeichnis der Bearbeitungstätigkeiten (mit einer Ausnahme für gewisse kleinere Unternehmen mit geringem Risiko).',
            'Datenschutz-Folgenabschätzungen bei Bearbeitungen mit hohem Risiko und Meldung von Verletzungen an den EDÖB.',
          ],
          source: 'Schweizerische Eidgenossenschaft · revDSG · Leitfäden des EDÖB',
        },
        {
          key: 'euaiact',
          name: 'EU AI Act (KI-Verordnung der EU)',
          scope: 'Schweizer Firmen, die KI-Systeme in der EU in Verkehr bringen oder deren KI-Ergebnisse in der EU verwendet werden.',
          summary:
            'Eine risikobasierte EU-Verordnung, deren Pflichten über mehrere Jahre gestaffelt in Kraft treten. Sie kann Schweizer Unternehmen über ihr EU-Geschäft erfassen, obwohl die Schweiz nicht EU-Mitglied ist.',
          points: [
            'Verbotene Praktiken, Hochrisiko-Systeme und Transparenzpflichten werden unterschiedlich behandelt.',
            'Hochrisiko-Systeme brauchen Risikomanagement, Data Governance, Dokumentation, Protokollierung und menschliche Aufsicht.',
            'Manche Pflichten treffen Anbieter, andere Betreiber: Klären Sie, welche Rolle Sie haben.',
            'Anwendungsdaten wurden schon verschoben: Prüfen Sie den aktuellen Zeitplan für Ihren Anwendungsfall.',
          ],
          source: 'Europäische Union · AI Act',
        },
        {
          key: 'swiss',
          name: 'Der eigene Weg der Schweiz',
          scope: 'Alle, die in der Schweiz tätig sind.',
          summary:
            'Die Schweiz hat sich entschieden, den EU AI Act nicht zu übernehmen. Der Bundesrat will die KI-Konvention des Europarats ratifizieren und das Schweizer Recht wo nötig sektoriell anpassen.',
          points: [
            'Geltendes Recht (Datenschutz, Branchenaufsicht, Haftung) gilt bereits heute für KI.',
            'Weitere Anpassungen sind über das ordentliche Vernehmlassungsverfahren zu erwarten.',
            'Wer heute auf Transparenz und menschliche Aufsicht setzt, hält künftige Anpassungen günstig.',
          ],
          source: 'Bundesrat · BAKOM',
        },
      ],
    },
    table: {
      eyebrow: '[ 02 — Auf einen Blick ]',
      title: { pre: 'Was jeder Rahmen verlangt, und ', accent: 'was wir bauen.' },
      columns: { framework: 'Rahmenwerk', concerns: 'Betrifft', asks: 'Verlangt, kurz gesagt', build: 'Was wir einbauen' },
      rows: [
        { framework: 'FINMA 08/2024', concerns: 'Beaufsichtigte Finanzinstitute', asks: 'Inventar, Risikoklassifizierung, Datenqualität, Tests, Überwachung, Dokumentation', build: 'Systemregister, Risikostufen, Eval-Suites, Monitoring und Alerting, Entscheidungsprotokolle' },
        { framework: 'revDSG', concerns: 'Alle, die in der Schweiz Personendaten bearbeiten', asks: 'Datenschutz durch Technik, Transparenz, Verzeichnis, Folgenabschätzungen, Meldung von Verletzungen', build: 'Datenlandkarten, Datenminimierung, Hosting in der Schweiz oder im eigenen Tenant, DSFA-Grundlagen, Audit-Trail' },
        { framework: 'EU AI Act', concerns: 'Schweizer Firmen mit Bezug zum EU-Markt', asks: 'Risikobasierte Pflichten: Dokumentation, Protokollierung, menschliche Aufsicht bei Hochrisiko-Anwendungen', build: 'Technische Dokumentation, Ereignisprotokollierung, Queues für menschliche Prüfung, Rollenzuordnung' },
        { framework: 'Schweizer Ansatz', concerns: 'Alle in der Schweiz', asks: 'Heute geltendes Recht, später sektorielle Anpassungen', build: 'Transparente, überprüfbare Systeme, die sich ohne Neuentwicklung anpassen lassen' },
      ],
    },
    controls: {
      eyebrow: '[ 03 — Kontrollen, die wir bauen ]',
      title: { pre: 'Die Nachweise liegen ', accent: 'ab dem ersten Tag', post: ' vor.' },
      lead: 'Governance ist am günstigsten, wenn sie Teil der Architektur ist. Diese Kontrollen gehören zu jedem Emineon-System, dimensioniert nach seinem Risiko.',
      items: [
        { icon: 'branch', title: 'KI-Inventar', text: 'Jedes System, jedes Modell und jede Prompt-Version erfasst, mit einer verantwortlichen Person, einem Zweck und einer Risikostufe.' },
        { icon: 'evals', title: 'Evaluationen', text: 'Ein Evaluationsset, geschrieben vor dem ersten Prompt und bei jeder Änderung sowie in Produktion ausgeführt, damit Qualität gemessen und nicht angenommen wird.' },
        { icon: 'operations', title: 'Logging und Audit-Trail', text: 'Eingaben, Ausgaben, Tool-Aufrufe und Freigaben werden protokolliert, damit sich jedes Ergebnis nachvollziehen und erklären lässt.' },
        { icon: 'fde', title: 'Menschliche Prüfung', text: 'Menschen geben frei, wo es darauf ankommt, mit Schwellenwerten und Queues, die mit den Teams gestaltet werden, die den Entscheid verantworten.' },
        { icon: 'residency', title: 'Datenhaltung', text: 'In der Schweiz gehostet oder in Ihrem eigenen Tenant, wenn nötig. Daten minimiert, nie zum Training von Modellen Dritter verwendet.' },
        { icon: 'shield', title: 'Dokumentation', text: 'Technische Dokumentation, Datenlandkarten und Grundlagen für die Datenschutz-Folgenabschätzung, aktuell gehalten, während sich das System verändert.' },
      ],
    },
    reading: {
      eyebrow: '[ 04 — Weiterlesen ]',
      title: { pre: 'Aus unseren ', accent: 'Insights.' },
    },
    insightSlugs: ['nfadp-and-ai-in-practice', 'evals-are-the-new-qa', 'from-pilot-to-production'],
    services: {
      eyebrow: '[ 05 — Leistungen ]',
      title: { pre: 'Wo Governance in unserer Arbeit ', accent: 'verankert', post: ' ist.' },
      lead: 'Governance ist kein separates Projekt. Sie ist Teil davon, wie wir Systeme betreiben und Ihre Mitarbeitenden auf ihre Nutzung vorbereiten.',
    },
    faq: {
      eyebrow: '[ 06 — FAQ ]',
      title: { pre: 'KI-Regulierung in der Schweiz: ', accent: 'Fragen,', post: ' die uns gestellt werden.' },
    },
    faqIds: ['finma', 'eu-ai-act', 'nfadp', 'data-switzerland', 'model-agnostic', 'agentic-ai'],
    disclaimer:
      'Diese Seite ist eine Zusammenfassung aus der Praxis zur Orientierung, keine Rechtsberatung. Regulatorische Texte und Fristen ändern sich: Prüfen Sie die Primärquellen (FINMA, EDÖB, Bundesrat und EU) und Ihre Rechtsberatung, bevor Sie sich darauf stützen.',
  },
};
