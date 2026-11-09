import type { Dictionary } from '../../schema';
import { common, footer, home, hubs, meta, nav, offices } from './core';
import { services } from './services';
import { industries } from './industries';
import { cases } from './cases';
import { approach, about, careers, contact, legal } from './pages';
import { blog, email, newsletter } from './blog';
import { pageSections } from './page-sections';
import { seo } from './seo';

export const de: Dictionary = {
  locale: 'de',
  meta,
  nav,
  common,
  footer,
  offices,
  home,
  hubs,
  services,
  approach,
  industries,
  cases,
  blog,
  newsletter,
  email,
  about,
  careers,
  contact,
  legal,
  pageSections,
  seo,
};
