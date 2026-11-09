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
      'ai-operations': 'KI-Betrieb mit LLMOps, Evals, Monitoring und Governance',
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
      'Emineon ist eine KI-native Beratungsfirma mit Sitz in Genf, Schweiz. Wir entwickeln KI-Strategien und bauen agentische Systeme, die in Produktion laufen. Wir begleiten auch die Einführung in der ganzen Firma. Ein verantwortliches Team, vergütet nach Ergebnissen.',
    items: [
      { label: 'Was', value: 'KI-native Beratungsfirma für KI-Strategie, agentische Systeme in Produktion, Daten- und KI-Plattformen, KI-Betrieb und Adoption' },
      { label: 'Hauptsitz', value: 'Route de Vandœuvres 77A, 1253 Vandœuvres, Genf, Schweiz' },
      { label: 'Delivery-Hubs', value: 'Genf · Ho-Chi-Minh-Stadt · Hanoi · Tokio · Melbourne · Silicon Valley · Texas' },
      { label: 'Netzwerk', value: '130+ Ingenieurinnen und Ingenieure · 200+ abgeschlossene Projekte' },
      { label: 'Mandatsmodell', value: 'Analysieren (Analyse zum Festpreis) → Bauen (vergütet pro Meilenstein und nach Ergebnis) → Betreiben (betreiben, härten, übergeben)' },
      { label: 'Flaggschiff', value: '30 Tage von der Standortbestimmung bis zum ersten Workflow in Produktion' },
      { label: 'Teams', value: 'Kleine Senior-Teams und Forward-deployed Engineers vor Ort, unterstützt vom globalen Delivery-Netzwerk' },
      { label: 'Preise', value: 'Festpreis für die Analyse, Vergütung pro Meilenstein und nach Ergebnis' },
      { label: 'Sprachen', value: 'Englisch, Französisch, Deutsch' },
      { label: 'Daten und Compliance', value: 'Datenhaltung in der Schweiz möglich; revDSG (in Kraft seit 1. September 2023); FINMA-Aufsichtsmitteilung 08/2024; DSGVO; vorbereitet auf den EU AI Act; modellunabhängig' },
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
        a: 'Sie hilft einer Organisation zu entscheiden, wo KI nützt. Sie baut die passenden Systeme und sorgt dafür, dass die Mitarbeitenden sie nutzen. Bei Emineon beginnt das mit einer Analyse mit Business Cases und Roadmap. Danach bauen und betreiben wir agentische Systeme in Produktion. Schulung und Governance sorgen dafür, dass die Nutzung bleibt.',
      },
      {
        id: 'who-is-emineon',
        group: 'firm',
        q: 'Wer ist Emineon?',
        a: 'Emineon ist eine KI-native Beratungsfirma mit Sitz in Genf, Schweiz. Wir arbeiten in kleinen Senior-Teams, unterstützt durch KI und ein globales Delivery-Netzwerk mit 130+ Ingenieurinnen und Ingenieuren. Wir begleiten Kunden von der KI-Strategie auf Geschäftsleitungsebene bis zu Systemen in Produktion.',
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
        a: 'Ja. Wir arbeiten in der ganzen Schweiz, unter anderem in Lausanne, Zürich, Basel und Bern, und auch international. Forward-deployed Engineers arbeiten vor Ort mit Ihrem Team.',
      },
      {
        id: 'industries',
        group: 'firm',
        q: 'Auf welche Branchen konzentrieren Sie sich?',
        a: 'Auf Rohstoffhandel und Schifffahrt, Private Banking und Vermögensverwaltung sowie internationale Organisationen und NGOs. Diese Branchen prägen Genf. Daneben arbeiten wir in Life Sciences und MedTech, Riech- und Aromastoffe und Spezialchemie sowie Industrie und Fertigung.',
      },
      {
        id: 'services',
        group: 'firm',
        q: 'Welche Leistungen bieten Sie an?',
        a: 'Wir bieten fünf Leistungen an. KI-Strategie (Reifegrad, Business Cases, Roadmap, Richtlinie), agentische Systeme und Daten- und KI-Plattformen. Dazu KI-Betrieb (LLMOps, Evaluationen, Monitoring, Governance) sowie Adoption und Befähigung (Schulung, Change, KI-Richtlinie).',
      },
      {
        id: 'how-start',
        group: 'engagements',
        q: 'Wie beginnt ein Mandat?',
        a: 'Mit der Analyse, einer Standortbestimmung zum Festpreis. Sie umfasst KI-Reifegrad, priorisierte Anwendungsfälle mit ROI, Daten und Risiken, Richtlinie und Roadmap. Am Ende entscheiden Sie, was zuerst gebaut wird.',
      },
      {
        id: 'how-fast',
        group: 'engagements',
        q: 'Wie schnell kann ein erster KI-Workflow live sein?',
        a: 'Unser Flaggschiff-Sprint führt in 30 Tagen von der Standortbestimmung bis zum ersten Workflow in Produktion. Voraussetzung sind ein klar abgegrenzter Anwendungsfall und gesicherter Datenzugang.',
      },
      {
        id: 'pricing',
        group: 'engagements',
        q: 'Wie berechnen Sie Ihre Arbeit?',
        a: 'Analysen kosten einen Festpreis. Umsetzungen vergüten Sie pro Meilenstein. Wo sich das Ergebnis messen lässt, auch nach Ergebnis.',
      },
      {
        id: 'fde',
        group: 'engagements',
        q: 'Was sind Forward-deployed Engineers?',
        a: 'Senior-Ingenieurinnen und -Ingenieure, die bei Ihrem Team sitzen, in Genf oder an Ihrem Standort. Sie lernen den Arbeitsablauf direkt kennen und bauen das System gemeinsam mit Ihnen. Das Delivery-Netzwerk ergänzt die Kapazität.',
      },
      {
        id: 'agentic-ai',
        group: 'technology',
        q: 'Was ist agentische KI, und ist sie reif für den produktiven Einsatz?',
        a: 'Agentische KI-Systeme nutzen Sprachmodelle, um mehrstufige Aufgaben mit Werkzeugen zu planen und auszuführen. Sie lesen zum Beispiel Dokumente, prüfen Systeme und bereiten Massnahmen vor. Menschen geben frei, wo es darauf ankommt. Für die Produktion braucht es einen klaren Umfang, Evaluationen, Logging und menschliche Prüfung ab dem ersten Tag.',
      },
      {
        id: 'data-switzerland',
        group: 'technology',
        q: 'Können unsere Daten in der Schweiz bleiben?',
        a: 'Ja. Wo nötig betreiben wir die Systeme auf Infrastruktur in der Schweiz oder in Ihrem eigenen Cloud-Tenant. Das revDSG berücksichtigen wir von Anfang an. Ihre Daten werden nicht zum Training von Modellen Dritter verwendet.',
      },
      {
        id: 'model-agnostic',
        group: 'technology',
        q: 'Sind Sie an ein bestimmtes KI-Modell oder einen Anbieter gebunden?',
        a: 'Nein. Wir sind modellunabhängig und wählen das Modell pro Aufgabe nach Qualität, Kosten und Datenvorgaben. So können Sie den Anbieter ohne Neuentwicklung wechseln.',
      },
      {
        id: 'finma',
        group: 'regulation',
        q: 'Was bedeutet die FINMA-Aufsichtsmitteilung 08/2024 für KI bei einer Bank oder einem Vermögensverwalter?',
        a: 'Die FINMA-Aufsichtsmitteilung 08/2024 beschreibt die Erwartungen der Aufsicht an Governance und Risikomanagement beim Einsatz von KI. In der Praxis kennen Sie Ihre KI-Anwendungen und die Verantwortlichen. Sie wissen, wie riskant jede Anwendung ist. Datenqualität, Tests, Überwachung und Dokumentation sind geregelt. Wir bauen diese Kontrollen direkt ins System ein.',
      },
      {
        id: 'eu-ai-act',
        group: 'regulation',
        q: 'Gilt der EU AI Act auch für Schweizer Unternehmen?',
        a: 'Das kann er. Die KI-Verordnung der EU erfasst Anbieter, die KI-Systeme in der EU in Verkehr bringen. In bestimmten Fällen gilt sie auch für Anbieter und Betreiber ausserhalb der EU, deren KI-Ergebnisse in der EU verwendet werden. Die Schweiz übernimmt den EU AI Act nicht. Der Bundesrat will die KI-Konvention des Europarats ratifizieren und das Schweizer Recht sektoriell anpassen.',
      },
      {
        id: 'nfadp',
        group: 'regulation',
        q: 'Was bedeutet das revDSG für KI-Projekte?',
        a: 'Das revidierte Bundesgesetz über den Datenschutz ist seit dem 1. September 2023 in Kraft. Für KI heisst das Datenschutz durch Technik und datenschutzfreundliche Voreinstellungen. Dazu kommen Transparenz bei automatisierten Einzelentscheidungen und ein Verzeichnis der Bearbeitungstätigkeiten. Bei hohem Risiko braucht es eine Datenschutz-Folgenabschätzung, und Verletzungen werden dem EDÖB gemeldet. Wir berücksichtigen das schon im Design.',
      },
      {
        id: 'after-live',
        group: 'engagements',
        q: 'Was passiert, wenn das System live ist?',
        a: 'Dann beginnt die Phase Betreiben. Wir betreiben, überwachen und härten das System, mit Evaluationen und Alerting. Danach betreiben wir es weiter oder übergeben es mit Dokumentation und Schulung an Ihr Team. Der Rollout auf weitere Gesellschaften erfolgt in derselben Phase.',
      },
      {
        id: 'success',
        group: 'engagements',
        q: 'Wie messen Sie den Erfolg?',
        a: 'Am Business Case aus der Analyse. Wir messen gewonnene Stunden, Durchlaufzeit, Fehlerquote, Durchsatz oder Umsatz, vorher und nachher. Evaluationen prüfen die Qualität laufend. So sehen Sie, ob das System weiterhin tut, was es soll.',
      },
      {
        id: 'training',
        group: 'engagements',
        q: 'Schulen Sie auch unsere Mitarbeitenden?',
        a: 'Ja. Adoption und Befähigung umfasst rollenbasierte Schulungen, eine KI-Richtlinie, Change Management und interne Champions. Ein System bringt nur etwas, wenn es genutzt wird.',
      },
      {
        id: 'languages',
        group: 'firm',
        q: 'In welchen Sprachen arbeiten Sie?',
        a: 'Englisch, Französisch und Deutsch. Das sind die Arbeitssprachen der meisten Schweizer Firmen und des internationalen Genf.',
      },
      {
        id: 'vs-large',
        group: 'firm',
        q: 'Was unterscheidet Emineon von einer grossen Beratungsfirma?',
        a: 'Ein kleines Senior-Team begleitet Sie von der Strategie bis zum System in Produktion. Dasselbe Team betreibt das System danach. Wir werden pro Meilenstein und nach Ergebnis vergütet. Wir konzentrieren uns auf die regulierten, dokumentenintensiven Branchen Genfs.',
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
        'Antworten zu Emineon und KI-Beratung in der Schweiz. Leistungen, 30-Tage-Sprint, Preise, Schweizer Datenhaltung, revDSG, FINMA 08/2024 und EU AI Act.',
    },
    hero: {
      eyebrow: '[ FAQ ]',
      title: { pre: 'Fragen, die uns ', accent: 'oft', post: ' gestellt werden.' },
      lead: 'Kurze Antworten, nach Thema geordnet. Fehlt Ihre Frage, schreiben Sie an hello@emineon.com. Ein Senior-Mitglied des Teams antwortet innert eines Arbeitstags.',
    },
  },

  switzerland: {
    meta: {
      title: 'KI-Beratung Schweiz',
      description:
        'KI-Beratung mit Sitz in Genf. KI-Strategie, agentische Systeme im Betrieb und Governance nach revDSG, FINMA und EU AI Act. Vergütet nach Ergebnis.',
    },
    hero: {
      eyebrow: '[ KI-Beratung · Schweiz ]',
      title: { pre: 'KI-Beratung in der Schweiz, ', accent: 'von der Strategie bis zum System', post: ' im Betrieb.' },
      lead: 'Emineon ist eine KI-Beratungsfirma mit Sitz in Genf. Wir helfen Schweizer Unternehmen zu entscheiden, wo sich KI lohnt. Wir bauen agentische Systeme, die auf Schweizer Infrastruktur oder beim Kunden laufen. Und wir schulen die Mitarbeitenden auf Englisch, Französisch und Deutsch.',
    },
    services: {
      eyebrow: '[ 01 · Was wir in der Schweiz tun ]',
      title: { pre: 'Fünf Leistungen, ein Team, ', accent: 'ein verantwortetes', post: ' Ergebnis.' },
      lead: 'Jede Leistung funktioniert für sich. Die meisten Schweizer Kunden kombinieren zwei oder drei. Eine Strategie, die die ersten Workflows benennt, das System dazu, sowie Betrieb und Schulung.',
    },
    engagement: {
      eyebrow: '[ 02 · So funktionieren Mandate ]',
      title: { pre: 'Analysieren, bauen, betreiben, ', accent: 'vergütet nach Resultat.' },
      lead: 'Jedes Mandat folgt denselben Schritten. Jeder Schritt hat einen festen Umfang, eine klare Preislogik und ein prüfbares Ergebnis. Erst dann entscheiden Sie über den nächsten. Der Flaggschiff-Sprint bringt einen klar abgegrenzten Anwendungsfall in 30 Tagen bis zum ersten Workflow in Produktion.',
      columns: { stage: 'Phase', what: 'Was Sie erhalten', pricing: 'Preis', duration: 'Typische Dauer' },
    },
    swiss: {
      eyebrow: '[ 03 · Schweizer Besonderheiten ]',
      title: { pre: 'Gebaut für die Schweizer Regeln zu Daten und ', accent: 'KI.' },
      lead: 'Schweizer Firmen arbeiten unter einem eigenen Datenschutzrecht und unter Branchenaufsichten. Oft gelten zusätzlich EU-Regeln. Wir berücksichtigen das alles im Design.',
      items: [
        {
          title: 'Datenhaltung',
          text: 'Systeme laufen auf Infrastruktur in der Schweiz oder in Ihrem eigenen Cloud-Tenant, wenn die Daten es verlangen. Sie wählen die Region, wir dokumentieren sie. Kundendaten werden nie zum Training von Modellen Dritter verwendet.',
        },
        {
          title: 'revDSG ab Design',
          text: 'Das revidierte Bundesgesetz über den Datenschutz gilt seit dem 1. September 2023. Datenschutz durch Technik und datenschutzfreundliche Voreinstellungen gehören von Anfang an zum Bauplan. Ebenso Bearbeitungsverzeichnis, Folgenabschätzungen und die Meldung von Verletzungen an den EDÖB.',
        },
        {
          title: 'Erwartungen der FINMA',
          text: 'Für Banken, Vermögensverwalter und andere beaufsichtigte Institute gibt die FINMA-Aufsichtsmitteilung 08/2024 den Rahmen für die Governance von KI vor. Inventar, Risikoklassifizierung, Tests, Überwachung und Dokumentation bauen wir ins System ein.',
        },
        {
          title: 'Reichweite des EU AI Act',
          text: 'Die Schweiz übernimmt den EU AI Act nicht. Er kann trotzdem gelten, wenn Schweizer Firmen den EU-Markt bedienen oder ihre KI-Ergebnisse dort verwendet werden. Wir berücksichtigen ihn von Anfang an. So liegt die Dokumentation vor, wenn sie gebraucht wird.',
        },
      ],
      cta: { label: 'KI-Governance in der Schweiz', href: '/ai-governance-switzerland' },
    },
    sectors: {
      eyebrow: '[ 04 · Branchen ]',
      title: { pre: 'Erfahrung in den Branchen, die die Schweizer Wirtschaft ', accent: 'prägen.' },
      lead: 'Wir konzentrieren uns auf regulierte, dokumentenintensive und mehrsprachige Arbeit. Dort spart KI viel Zeit und verlangt viel Sorgfalt. Drei Kernbranchen sind typisch für Genf. Drei weitere reichen über die Romandie in die ganze Schweiz.',
    },
    where: {
      eyebrow: '[ 05 · Wo wir arbeiten ]',
      title: { pre: 'Zuhause in Genf, ', accent: 'vor Ort', post: ' in der ganzen Schweiz.' },
      lead: 'Mandatsleitung und Forward-deployed Engineering sind an unserem Hauptsitz in Genf. Die Ingenieurinnen und Ingenieure reisen dorthin, wo die Arbeit ist. Unser globales Delivery-Netzwerk ergänzt die Kapazität.',
      places: [
        { title: 'Genf', text: 'Hauptsitz in Vandœuvres. Handelshäuser, Privatbanken und internationale Organisationen sind eine kurze Fahrt entfernt.' },
        { title: 'Lausanne und Waadt', text: 'Betreut von Genf aus, vor Ort, wenn die Arbeit es verlangt. Life Sciences, Industrie und das öffentliche Forschungsumfeld.' },
        { title: 'Zürich', text: 'Wir betreuen Zürcher Kunden von Genf aus. Für Analyse, Umsetzung und Übergabe sind Ingenieurinnen und Ingenieure vor Ort.' },
        { title: 'Basel', text: 'Life Sciences und Spezialchemie, betreut von Genf aus. Vor Ort, wo regulierte Daten es erfordern.' },
        { title: 'Bern', text: 'Bundesnahe und regulierte Organisationen, betreut von Genf aus, auf Französisch oder Deutsch.' },
        { title: 'Tessin', text: 'Betreut von Genf aus, für Mandate, die zu unseren Branchen und Sprachen passen.' },
      ],
      note: 'Genf ist unser einziger Standort in der Schweiz. Für alle anderen Orte kommen wir zu Ihnen.',
      cta: { label: 'KI-Beratung in Genf', href: '/ai-consulting-geneva' },
    },
    work: {
      eyebrow: '[ 06 · Repräsentative Mandate ]',
      title: { pre: 'Systeme in Produktion, ', accent: 'gemessen.' },
      lead: 'Unter NDA anonymisiert und als repräsentativ gekennzeichnet. Jedes Mandat nennt die Ausgangslage, was wir gebaut haben und was sich verändert hat.',
    },
    choose: {
      eyebrow: '[ 07 · Die Wahl ]',
      title: { pre: 'So wählen Sie eine KI-Beratung ', accent: 'in der Schweiz.' },
      lead: 'Sechs Fragen, die Sie jeder Firma stellen können, auch uns. Die Antworten zeigen, wie viel Erfahrung mit Systemen in Produktion vorhanden ist.',
      items: [
        { title: 'Nachweis aus der Produktion', text: 'Fragen Sie nach Systemen, die heute live sind, mit Ausgangslage und gemessenem Ergebnis. Pilotprojekte und Demos zeigen weniger.' },
        { title: 'Datenhaltung', text: 'Fragen Sie, wo Ihre Daten bearbeitet und gespeichert werden und wer Zugriff hat. Und ob sie zum Training eines Modells verwendet werden. Lassen Sie sich die Antwort schriftlich geben.' },
        { title: 'Erfahrung in regulierten Branchen', text: 'Sind Sie beaufsichtigt, sollte die Firma die Anforderungen kennen. Dazu gehören die FINMA-Aufsichtsmitteilung 08/2024, das revDSG und gegebenenfalls der EU AI Act. Lassen Sie sich zeigen, wie die Systeme sie erfüllen.' },
        { title: 'Preismodell', text: 'Abrechnung nach Stunden vergütet Aufwand. Festpreise und ergebnisbasierte Vergütung vergüten Resultate. Fragen Sie, welche Risiken die Firma mitträgt.' },
        { title: 'Betrieb und Übergabe', text: 'Fragen Sie, wer das System nach dem Start betreibt und wie die Qualität überwacht wird. Und wie die Verantwortung an Ihr Team übergeht. Ein Plan für die Übergabe ist ein gutes Zeichen.' },
        { title: 'Sprachabdeckung', text: 'In der Schweiz wird auf Französisch, Deutsch und Englisch gearbeitet, oft in derselben Woche. Das Team sollte in Ihrer Sprache arbeiten, dokumentieren und schulen können.' },
      ],
    },
    faq: {
      eyebrow: '[ 08 · FAQ ]',
      title: { pre: 'KI-Beratung in der Schweiz, ', accent: 'Fragen,', post: ' die uns gestellt werden.' },
    },
    faqIds: ['what-ai-consulting', 'who-is-emineon', 'outside-geneva', 'services', 'how-fast', 'pricing', 'data-switzerland', 'finma', 'eu-ai-act', 'vs-large'],
  },

  geneva: {
    meta: {
      title: 'KI-Beratung in Genf',
      description:
        'KI-Beratung in Genf (Vandœuvres). Agentische Systeme für Rohstoffhandel, Privatbanken und internationale Organisationen, in Produktion und revDSG-konform.',
    },
    hero: {
      eyebrow: '[ KI-Beratung · Genf ]',
      title: { pre: 'KI-Beratung in Genf für ', accent: 'Rohstoffhandel, Privatbanken', post: ' und internationale Organisationen.' },
      lead: 'Emineon ist eine KI-Beratungsfirma mit Sitz in Vandœuvres, Genf. Unser Senior-Team und unsere Forward-deployed Engineers bauen agentische Systeme für Handelshäuser, Privatbanken und internationale Organisationen. Wir betreiben sie in Produktion unter Schweizer Datenschutz. Und wir schulen die Menschen, die damit arbeiten.',
    },
    context: {
      eyebrow: '[ 01 · Warum Genf ]',
      title: { pre: 'Eine Stadt der Dokumente, der Sprachen ', accent: 'und der Aufsicht.' },
      paragraphs: [
        'In Genf gibt es viel Arbeit, für die sich KI gut eignet und die Sorgfalt verlangt. Handelsbestätigungen und Akkreditive, Kundendossiers und periodische Überprüfungen, Berichte und Archive in mehreren Amtssprachen.',
        'Dieselben Firmen sind beaufsichtigt, werden geprüft und sind zur Vertraulichkeit verpflichtet. Deshalb bauen wir hier, mit den Menschen, die die Arbeit machen. Ein Standardwerkzeug von anderswo passt selten.',
      ],
      stats: [
        { value: '#1', label: 'Genf ist weltweit führend in der Handelsfinanzierung. 12 der 14 Schweizer Banken für Handelsfinanzierung sind hier ansässig.', source: 'ge.ch, Schlüsselbranchen' },
        { value: '~400', label: 'Handelsunternehmen in Genf, rund 6’000 Arbeitsplätze.', source: 'ge.ch, Schlüsselbranchen' },
        { value: '37’000+', label: 'Arbeitsplätze im Genfer Finanzsektor.', source: 'ge.ch, Schlüsselbranchen' },
        { value: '400+', label: 'Unternehmen der Aroma- und Riechstoffbranche in der Region Genf, rund 10’000 Arbeitsplätze.', source: 'ge.ch, Schlüsselbranchen' },
      ],
    },
    sectors: {
      eyebrow: '[ 02 · Genfer Branchen ]',
      title: { pre: 'Drei Branchen, die Genf ', accent: 'prägen.' },
      lead: 'Unsere Kernbranchen sind die, die Genf ausmachen. Jede hat eigene Dokumente, Aufsichtsbehörden und typische Fehler.',
      items: [
        {
          industry: 'commodities-trading',
          title: 'Rohstoffhandel und Schifffahrt',
          text: 'Agenten lesen Bestätigungen, gleichen sie mit gebuchten Geschäften ab und leiten Ausnahmen mit Kontext weiter. Dazu kommt Unterstützung bei Dokumenten der Handelsfinanzierung und beim Operations-Reporting.',
        },
        {
          industry: 'banking-wealth',
          title: 'Privatbanken und Vermögensverwalter',
          text: 'Periodische KYC-Überprüfungen, vorbereitet für einen menschlichen Entscheid. Mehrsprachiges Kundenreporting und Kontrollen nach den Erwartungen der FINMA an KI.',
        },
        {
          industry: 'international-organisations',
          title: 'Internationale Organisationen und NGOs',
          text: 'Mehrsprachige Dokumenten-Pipelines, durchsuchbares institutionelles Wissen und Unterstützung beim Verfassen von Texten. Unter den Vertraulichkeits- und Datenregeln, die für internationale Organisationen gelten.',
        },
      ],
    },
    onsite: {
      eyebrow: '[ 03 · Vor Ort in Genf ]',
      title: { pre: 'Ingenieure in Ihrem ', accent: 'Büro', post: ' in Genf.' },
      paragraphs: [
        'Unsere Forward-deployed Engineers arbeiten für Analyse, Umsetzung und Übergabe in Ihren Räumlichkeiten in Genf. Sie sind in den Stand-ups dabei, lesen die Ausnahmen-Queue und sprechen mit den Menschen, die die Arbeit machen. So kommen die Anforderungen direkt aus der Praxis.',
        'Unser Hauptsitz an der Route de Vandœuvres 77A liegt eine kurze Fahrt von den Banken, Handelshäusern und internationalen Organisationen entfernt, mit denen wir arbeiten. Lausanne und die übrige Romandie sind gut erreichbar.',
      ],
      points: [
        { title: 'Senior, lokal, verantwortlich', text: 'Ein kleines Senior-Team in Genf verantwortet das Ergebnis und die Beziehung.' },
        { title: 'Zusätzliche Kapazität', text: 'Unser globales Delivery-Netzwerk ergänzt die Kapazität für Umsetzung und Betrieb.' },
        { title: 'Französisch, Englisch, Deutsch', text: 'Workshops, Dokumentation und Schulung in der Sprache, in der Ihr Team arbeitet.' },
      ],
    },
    data: {
      eyebrow: '[ 04 · Daten und Regulierung ]',
      title: { pre: 'Standardmässig ', accent: 'vertraulich.' },
      items: [
        { title: 'Schweizer Datenschutz', text: 'Von Anfang an für das revDSG gebaut. Auf Infrastruktur in der Schweiz oder in Ihrem eigenen Cloud-Tenant, wo die Daten es verlangen.' },
        { title: 'Beaufsichtigte Institute', text: 'Für Banken und Vermögensverwalter folgen die Kontrollen der FINMA-Aufsichtsmitteilung 08/2024. Inventar, Risikoklassifizierung, Tests, Überwachung und Dokumentation.' },
        { title: 'Internationale Organisationen', text: 'Internationale Organisationen haben oft eigene Datenschutz- und Vertraulichkeitsregeln. Wir richten uns nach diesen Regeln und dokumentieren, wie das System sie erfüllt.' },
      ],
    },
    work: {
      eyebrow: '[ 05 · Repräsentative Mandate ]',
      title: { pre: 'Gebaut für die ', accent: 'Kernbranchen', post: ' Genfs.' },
      lead: 'Unter NDA anonymisiert und als repräsentativ gekennzeichnet.',
    },
    faq: {
      eyebrow: '[ 06 · FAQ ]',
      title: { pre: 'KI-Beratung in Genf, ', accent: 'Fragen,', post: ' die uns gestellt werden.' },
    },
    faqIds: ['where-based', 'fde', 'how-fast', 'data-switzerland', 'languages', 'contact'],
    faqExtra: [
      {
        q: 'Arbeiten Sie mit Rohstoffhändlern in Genf?',
        a: 'Ja. Rohstoffhandel und Schifffahrt ist eine unserer drei Kernbranchen. Typische Systeme gleichen Handelsbestätigungen mit gebuchten Geschäften ab und unterstützen die Dokumentation der Handelsfinanzierung. Ausnahmen gehen mit Kontext an die richtige Person.',
      },
      {
        q: 'Können Sie vor Ort in Genf arbeiten?',
        a: 'Ja. Unser Hauptsitz ist in Vandœuvres. Unsere Forward-deployed Engineers arbeiten für Analyse, Umsetzung und Übergabe in den Räumlichkeiten der Kunden in Genf.',
      },
      {
        q: 'Arbeiten Sie mit internationalen Organisationen und NGOs in Genf?',
        a: 'Ja. Internationale Organisationen und NGOs gehören zu unseren Kernbranchen. Wir bauen mehrsprachige Dokumenten-Pipelines und durchsuchbare Archive. Sie richten sich nach den Vertraulichkeits- und Datenregeln dieser Organisationen.',
      },
    ],
  },

  governance: {
    meta: {
      title: 'KI-Governance Schweiz: FINMA, revDSG, EU AI Act',
      description:
        'Was FINMA-Aufsichtsmitteilung 08/2024, revDSG und EU AI Act für KI-Systeme bedeuten. Und welche Kontrollen wir einbauen, etwa Inventar, Evals und Logging.',
    },
    hero: {
      eyebrow: '[ Vertrauen & Governance ]',
      title: { pre: 'KI-Governance für Schweizer Unternehmen, ', accent: 'von Anfang an', post: ' im System.' },
      lead: 'Für Schweizer Firmen, die KI einsetzen, gelten das revDSG und Branchenaufsichten wie die FINMA. Wer den EU-Markt bedient, kann auch unter den EU AI Act fallen. Diese Seite fasst zusammen, was jeder Rahmen in der Praxis verlangt. Und welche Kontrollen Emineon in jedes System einbaut, damit die Nachweise ab dem ersten Tag vorliegen.',
    },
    frameworks: {
      eyebrow: '[ 01 · Die Rahmenwerke ]',
      title: { pre: 'Vier Regelquellen, ', accent: 'ein', post: ' Systemdesign.' },
      lead: 'Eine Zusammenfassung aus der Praxis, keine Rechtsberatung. Prüfen Sie die Primärquellen und klären Sie mit Ihrer Rechtsberatung, welche Pflichten für Sie gelten.',
      items: [
        {
          key: 'finma',
          name: 'FINMA-Aufsichtsmitteilung 08/2024',
          scope: 'Banken, Versicherer, Vermögensverwalter und andere von der FINMA beaufsichtigte Institute.',
          summary:
            'Die Aufsichtsmitteilung der FINMA zu Governance und Risikomanagement beim Einsatz von KI durch beaufsichtigte Institute. Sie beschreibt, was die Aufsicht sehen möchte. Sie gibt den Rahmen für den Aufsichtsdialog zu KI vor.',
          points: [
            'Ein gepflegtes Inventar der KI-Anwendungen mit klaren Verantwortlichen.',
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
            'In Kraft seit dem 1. September 2023. Es gilt für KI-Systeme wie für jede andere Bearbeitung von Personendaten. Einige Pflichten sind für KI besonders wichtig.',
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
            'Eine risikobasierte EU-Verordnung, deren Pflichten über mehrere Jahre gestaffelt in Kraft treten. Sie kann Schweizer Unternehmen über ihr EU-Geschäft erfassen. Auch wenn die Schweiz nicht EU-Mitglied ist.',
          points: [
            'Verbotene Praktiken, Hochrisiko-Systeme und Transparenzpflichten werden unterschiedlich behandelt.',
            'Hochrisiko-Systeme brauchen Risikomanagement, Data Governance, Dokumentation, Protokollierung und menschliche Aufsicht.',
            'Manche Pflichten treffen Anbieter, andere Betreiber. Klären Sie, welche Rolle Sie haben.',
            'Anwendungsdaten wurden schon verschoben. Prüfen Sie den aktuellen Zeitplan für Ihren Anwendungsfall.',
          ],
          source: 'Europäische Union · AI Act',
        },
        {
          key: 'swiss',
          name: 'Der eigene Weg der Schweiz',
          scope: 'Alle, die in der Schweiz tätig sind.',
          summary:
            'Die Schweiz übernimmt den EU AI Act nicht. Der Bundesrat will die KI-Konvention des Europarats ratifizieren. Das Schweizer Recht soll wo nötig sektoriell angepasst werden.',
          points: [
            'Geltendes Recht (Datenschutz, Branchenaufsicht, Haftung) gilt bereits heute für KI.',
            'Weitere Anpassungen sind über das ordentliche Vernehmlassungsverfahren zu erwarten.',
            'Transparenz und menschliche Aufsicht heute machen künftige Anpassungen günstiger.',
          ],
          source: 'Bundesrat · BAKOM',
        },
      ],
    },
    table: {
      eyebrow: '[ 02 · Auf einen Blick ]',
      title: { pre: 'Was jeder Rahmen verlangt, und ', accent: 'was wir bauen.' },
      columns: { framework: 'Rahmenwerk', concerns: 'Betrifft', asks: 'Verlangt, kurz gesagt', build: 'Was wir einbauen' },
      rows: [
        { framework: 'FINMA 08/2024', concerns: 'Beaufsichtigte Finanzinstitute', asks: 'Inventar, Risikoklassifizierung, Datenqualität, Tests, Überwachung, Dokumentation', build: 'Systemregister, Risikostufen, Eval-Suites, Monitoring und Alerting, Entscheidungsprotokolle' },
        { framework: 'revDSG', concerns: 'Alle, die in der Schweiz Personendaten bearbeiten', asks: 'Datenschutz durch Technik, Transparenz, Verzeichnis, Folgenabschätzungen, Meldung von Verletzungen', build: 'Datenlandkarten, Datenminimierung, Hosting in der Schweiz oder im eigenen Tenant, DSFA-Grundlagen, Audit-Trail' },
        { framework: 'EU AI Act', concerns: 'Schweizer Firmen mit Bezug zum EU-Markt', asks: 'Risikobasierte Pflichten wie Dokumentation, Protokollierung und menschliche Aufsicht bei Hochrisiko-Anwendungen', build: 'Technische Dokumentation, Ereignisprotokollierung, Queues für menschliche Prüfung, Rollenzuordnung' },
        { framework: 'Schweizer Ansatz', concerns: 'Alle in der Schweiz', asks: 'Heute geltendes Recht, später sektorielle Anpassungen', build: 'Transparente, überprüfbare Systeme, die sich ohne Neuentwicklung anpassen lassen' },
      ],
    },
    controls: {
      eyebrow: '[ 03 · Kontrollen, die wir bauen ]',
      title: { pre: 'Die Nachweise liegen ', accent: 'ab dem ersten Tag', post: ' vor.' },
      lead: 'Governance kostet am wenigsten, wenn sie Teil der Architektur ist. Diese Kontrollen gehören zu jedem Emineon-System. Ihr Umfang richtet sich nach dem Risiko.',
      items: [
        { icon: 'branch', title: 'KI-Inventar', text: 'Jedes System, jedes Modell und jede Prompt-Version ist erfasst. Mit verantwortlicher Person, Zweck und Risikostufe.' },
        { icon: 'evals', title: 'Evaluationen', text: 'Das Evaluationsset entsteht vor dem ersten Prompt. Es läuft bei jeder Änderung und in Produktion. So wird Qualität gemessen.' },
        { icon: 'operations', title: 'Logging und Audit-Trail', text: 'Eingaben, Ausgaben, Tool-Aufrufe und Freigaben werden protokolliert. So lässt sich jedes Ergebnis nachvollziehen und erklären.' },
        { icon: 'fde', title: 'Menschliche Prüfung', text: 'Menschen geben frei, wo es darauf ankommt. Schwellenwerte und Queues gestalten wir mit den Teams, die den Entscheid verantworten.' },
        { icon: 'residency', title: 'Datenhaltung', text: 'In der Schweiz gehostet oder in Ihrem eigenen Tenant, wenn nötig. Daten werden minimiert und nie zum Training von Modellen Dritter verwendet.' },
        { icon: 'shield', title: 'Dokumentation', text: 'Technische Dokumentation, Datenlandkarten und Grundlagen für die Datenschutz-Folgenabschätzung. Sie werden aktualisiert, wenn sich das System ändert.' },
      ],
    },
    reading: {
      eyebrow: '[ 04 · Weiterlesen ]',
      title: { pre: 'Aus unseren ', accent: 'Insights.' },
    },
    insightSlugs: ['nfadp-and-ai-in-practice', 'evals-are-the-new-qa', 'from-pilot-to-production'],
    services: {
      eyebrow: '[ 05 · Leistungen ]',
      title: { pre: 'Wo Governance in unserer Arbeit ', accent: 'verankert', post: ' ist.' },
      lead: 'Governance ist Teil unserer Arbeit. Sie gehört zum Betrieb der Systeme und zur Vorbereitung Ihrer Mitarbeitenden.',
    },
    faq: {
      eyebrow: '[ 06 · FAQ ]',
      title: { pre: 'KI-Regulierung in der Schweiz, ', accent: 'Fragen,', post: ' die uns gestellt werden.' },
    },
    faqIds: ['finma', 'eu-ai-act', 'nfadp', 'data-switzerland', 'model-agnostic', 'agentic-ai'],
    disclaimer:
      'Diese Seite ist eine Zusammenfassung aus der Praxis zur Orientierung, keine Rechtsberatung. Regulatorische Texte und Fristen ändern sich. Prüfen Sie die Primärquellen (FINMA, EDÖB, Bundesrat und EU) und sprechen Sie mit Ihrer Rechtsberatung, bevor Sie sich darauf stützen.',
  },
};
