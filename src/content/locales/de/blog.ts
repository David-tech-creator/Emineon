import type { BlogDict, EmailDict, NewsletterDict } from '../../schema';

export const blog: BlogDict = {
  tags: {
    delivery: 'Delivery',
    industry: 'Branche',
    governance: 'Governance',
    commercial: 'Geschäftsmodell',
    engineering: 'Engineering',
    briefing: 'Briefing',
  },
  rss: 'RSS-Feed',
  englishOnly: 'Dieser Artikel ist nur auf Englisch verfügbar.',
  generatedNote:
    'Recherchiert und verfasst vom Insights-Agenten von Emineon auf Grundlage der unten aufgeführten Quellen und vor der Veröffentlichung an ihnen geprüft.',
  agentAuthor: 'Emineon · Redaktion Insights',
};

export const newsletter: NewsletterDict = {
  sent: 'Fast geschafft. Bitte öffnen Sie Ihr Postfach und bestätigen Sie über den Link.',
  confirmed: 'Ihr Abonnement ist bestätigt. Die nächste Notiz landet in Ihrem Postfach.',
  expired: 'Dieser Bestätigungslink ist abgelaufen. Melden Sie sich erneut an, dann senden wir einen neuen.',
  failed: 'Das hat nicht geklappt. Bitte versuchen Sie es gleich noch einmal.',
  rateLimited: 'Zu viele Versuche. Bitte versuchen Sie es in einer Minute erneut.',
  note: 'Eine E-Mail pro neuem Artikel, von Ihnen bestätigt, mit einem Klick abbestellt.',
  sending: 'Wird gesendet…',
};

export const email: EmailDict = {
  footer: 'Emineon · Route de Vandœuvres 77A, 1253 Vandœuvres, Schweiz · emineon.com',
  confirm: {
    subject: 'Bitte bestätigen Sie Ihr Abonnement von Emineon Insights',
    preheader: 'Ein Klick, und die nächste Notiz landet in Ihrem Postfach.',
    title: 'Abonnement bestätigen',
    text: 'Jemand, hoffentlich Sie, möchte Emineon Insights erhalten: praxisnahe Notizen dazu, wie KI in regulierten Unternehmen in Produktion kommt. Eine E-Mail pro neuem Artikel, mehr nicht.',
    button: 'Abonnement bestätigen',
    ignore: 'Wenn das nicht Sie waren, ignorieren Sie diese E-Mail, und Sie hören nichts mehr von uns. Der Link ist sieben Tage gültig.',
  },
  contactReceipt: {
    subject: 'Ihre Nachricht ist angekommen',
    preheader: 'Ein Senior-Mitglied des Teams antwortet innert eines Arbeitstags.',
    title: 'Ihre Nachricht ist angekommen.',
    greeting: 'Guten Tag {name}',
    text: 'Danke, dass Sie Emineon geschrieben haben. Ein Senior-Mitglied des Teams liest Ihre Nachricht und antwortet innert eines Arbeitstags. Wenn es dringend ist, antworten Sie einfach auf diese E-Mail.',
    signoff: 'Das Emineon-Team, Genf',
  },
};
