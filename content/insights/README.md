# Insights

One Markdown file per article. The file name is the address: `my-article.md` is published at
`/en/insights/my-article`. Use lowercase letters, digits and hyphens only. This README is never
published.

English is canonical. Translations sit next to the English file as `my-article.fr.md` and
`my-article.de.md`. A language without a translation shows the English text with a short note,
and its page points search engines at the English original.

## The English file

```
---
title: From pilot to production: why most AI pilots stall
date: 2026-03-12
summary: One or two sentences for the list, link previews, the RSS feed and the newsletter.
tags: delivery
services: agentic-systems, ai-operations
author: Emineon · Agentic Engineering practice
cover: insight-1
translations: fr, de
---

The article, in Markdown.
```

- `title`, `date` (YYYY-MM-DD) and `summary` are required.
- `tags`: comma-separated. The first is the category shown on the card. Allowed: `delivery`,
  `industry`, `governance`, `commercial`, `engineering`, `briefing`.
- `services`: optional, comma-separated service slugs shown as "Related services":
  `ai-strategy`, `agentic-systems`, `data-ai-platforms`, `ai-operations`, `adoption-enablement`.
- `author`: a practice byline, never an invented person.
- `cover`: optional key from `src/lib/media.ts` (`insight-1` … `insight-6`). Leave it out and the
  article gets its own procedural dot-lattice cover, drawn from the slug at
  `/covers/insights/<slug>.svg`.
- `translations`: which translation files exist (for people; the site looks for the files).
- `generated: true` marks an article written by the insights agent (`nas/insights/`); the page
  then says so.
- `draft: true` keeps an article off the site.

## A translation file

```
---
title: Du pilote à la production : pourquoi la plupart des pilotes IA calent
summary: Une ou deux phrases.
author: Emineon · Practice Ingénierie agentique
---

Le texte traduit.
```

Date, tags, services and cover always come from the English file.

## What works in the text

- paragraphs, `## headings` (they make the table of contents) and `### smaller headings`
- `**bold**`, `*italic*`, `` `code` `` and [links](https://example.com)
- lists with `-` or `1.`
- `> quotes`; a last line `> -- Name` becomes the attribution
- code blocks between three backticks

No HTML and no images in the text: the cover is the picture.

## Publishing

A new file goes live with the next deploy of the production branch. The agent in
`nas/insights/` commits here on its own, so pull before you push.
