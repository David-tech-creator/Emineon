import type { BlogDict, EmailDict, NewsletterDict } from '../../schema';

export const blog: BlogDict = {
  tags: {
    delivery: 'Delivery',
    industry: 'Industry',
    governance: 'Governance',
    commercial: 'Commercial',
    engineering: 'Engineering',
    briefing: 'Briefing',
  },
  rss: 'RSS feed',
  englishOnly: 'This article is available in English only.',
  generatedNote:
    'Researched and drafted by the Emineon insights agent from the sources listed below, and checked against them before publication.',
  agentAuthor: 'Emineon · Insights desk',
};

export const newsletter: NewsletterDict = {
  sent: 'Almost there. Check your inbox and click the link to confirm.',
  confirmed: 'You are subscribed. The next note lands in your inbox.',
  expired: 'That confirmation link has expired. Subscribe again and we will send a new one.',
  failed: 'That did not work. Please try again in a moment.',
  rateLimited: 'Too many attempts. Please try again in a minute.',
  note: 'One email per new article. You confirm first and can leave in one click.',
  sending: 'Sending…',
};

export const email: EmailDict = {
  footer: 'Emineon · Route de Vandœuvres 77A, 1253 Vandœuvres, Switzerland · emineon.com',
  confirm: {
    subject: 'Confirm your subscription to Emineon Insights',
    preheader: 'One click and the next note lands in your inbox.',
    title: 'Confirm your subscription',
    text: 'Someone, hopefully you, asked to receive Emineon Insights. These are practical notes on putting AI into production in regulated firms. One email per new article, nothing more.',
    button: 'Confirm subscription',
    ignore: 'If this was not you, ignore this email and you will not hear from us. The link expires in seven days.',
  },
  contactReceipt: {
    subject: 'We have your message',
    preheader: 'A senior member of the team will reply within one business day.',
    title: 'We have your message.',
    greeting: 'Hello {name},',
    text: 'Thank you for writing to Emineon. A senior member of the team will read it and reply within one business day. If anything is urgent, reply to this email.',
    signoff: 'The Emineon team, Genève',
  },
};
