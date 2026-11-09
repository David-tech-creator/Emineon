import type { BlogDict, EmailDict, NewsletterDict } from '../../schema';

export const blog: BlogDict = {
  tags: {
    delivery: 'Delivery',
    industry: 'Secteur',
    governance: 'Gouvernance',
    commercial: 'Modèle commercial',
    engineering: 'Ingénierie',
    briefing: 'Briefing',
  },
  rss: 'Flux RSS',
  englishOnly: 'Cet article n’est disponible qu’en anglais.',
  generatedNote:
    'Recherché et rédigé par l’agent Insights d’Emineon à partir des sources citées ci-dessous, puis vérifié par rapport à elles avant publication.',
  agentAuthor: 'Emineon · Rédaction Insights',
};

export const newsletter: NewsletterDict = {
  sent: 'Presque fini. Ouvrez votre boîte de réception et cliquez sur le lien pour confirmer.',
  confirmed: 'Votre abonnement est confirmé. La prochaine note arrivera dans votre boîte de réception.',
  expired: 'Ce lien de confirmation a expiré. Abonnez-vous à nouveau et nous vous en enverrons un autre.',
  failed: 'Cela n’a pas fonctionné. Merci de réessayer dans un instant.',
  rateLimited: 'Trop de tentatives. Merci de réessayer dans une minute.',
  note: 'Un e-mail par nouvel article, confirmé par vous, résiliable en un clic.',
  sending: 'Envoi…',
};

export const email: EmailDict = {
  footer: 'Emineon · Route de Vandœuvres 77A, 1253 Vandœuvres, Suisse · emineon.com',
  confirm: {
    subject: 'Confirmez votre abonnement à Emineon Insights',
    preheader: 'Un clic et la prochaine note arrive dans votre boîte de réception.',
    title: 'Confirmez votre abonnement',
    text: 'Quelqu’un, vous sans doute, a demandé à recevoir Emineon Insights, des notes pratiques sur l’IA en production dans les entreprises réglementées. Un e-mail par nouvel article, rien de plus.',
    button: 'Confirmer l’abonnement',
    ignore: 'Si ce n’était pas vous, ignorez cet e-mail ; vous n’aurez plus de nouvelles de nous. Le lien expire dans sept jours.',
  },
  contactReceipt: {
    subject: 'Nous avons bien reçu votre message',
    preheader: 'Un membre senior de l’équipe vous répondra sous un jour ouvrable.',
    title: 'Nous avons bien reçu votre message.',
    greeting: 'Bonjour {name},',
    text: 'Merci d’avoir écrit à Emineon. Un membre senior de l’équipe le lira et vous répondra sous un jour ouvrable. En cas d’urgence, répondez simplement à cet e-mail.',
    signoff: 'L’équipe Emineon, Genève',
  },
};
