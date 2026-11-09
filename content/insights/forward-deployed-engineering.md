---
title: Forward-deployed engineering: why we build AI systems next to the people who use them
date: 2026-09-03
summary: Requirements written in a workshop miss much of what matters. Engineers who sit with the team find it within a week. This is how the model works and why it suits AI.
tags: delivery
services: agentic-systems, adoption-enablement
author: Emineon · Agentic Engineering practice
cover: insight-5
translations: fr, de
---

The term forward-deployed engineer comes from software companies. They sent engineers to work inside their customers’ organisations, on site instead of at headquarters. The idea is older than the name. The people who build the system sit next to the people who will use it and learn the work directly.

For AI systems this model matters a lot. It often decides whether a system reaches production or stays a pilot. This article explains why, and how we run it.

## Why AI needs engineers on the floor

Traditional software encodes rules someone can write down. AI systems are used where the rules are hard to write down. Reading documents that vary, applying judgement to exceptions, drafting text a specialist will accept. The knowledge that matters is tacit. It is in how an experienced operator scans a confirmation, or which clauses a compliance officer reads first. It is in what a relationship manager knows about a client that is not in the file.

That knowledge rarely comes out in a requirements workshop. People describe the process as it is supposed to work. They forget the exceptions because they handle them without thinking. They leave out the spreadsheet that holds everything together.

An engineer who sits with the team for a week sees all of it. They watch the queue, read the documents and ask why when something unexpected happens. The resulting specification is shorter, more precise and closer to how the work is done.

## What a forward-deployed engineer does

Our forward-deployed engineers are senior engineers. Their work on an engagement usually follows four phases.

1. Shadow. Sit with the team, watch the work, collect cases including the messy ones, and see where the time goes.
2. Specify. Write the workflow and the eval set with the people who do the work, so they define what “correct” means.
3. Build. Ship in the client’s environment in short cycles. A small group of users tries each version on their daily work.
4. Transfer. Train the team that will operate the system, write the runbook and stay through the first weeks in production.

The forward-deployed engineer connects the client’s knowledge with our engineering capacity. They decide what the wider delivery network can build, on non-sensitive components. They also decide what must be done on site in Switzerland because it touches regulated data.

## Small team in front, more capacity behind

One objection to the model is cost. Senior engineers on site are expensive. The answer is in how the team is organised. A forward-deployed pod is small, often two or three people. They own the relationship, the specification, the architecture and the sensitive parts of the build. Our global delivery network adds engineering capacity for work that is safe to share. User interface components, test tooling, integrations against documented interfaces and infrastructure as code.

Our hubs are in Asia-Pacific and the Americas, so work continues across time zones. The client works with a small senior team that knows their business, at the pace of a larger one.

> The forward-deployed engineer knows both what the operator needs and what the system can do.

## Data residency shapes the split

For regulated clients, the split between on-site and network work is also a control. Work that touches client-identifying data, confidential documents or production systems stays with the forward-deployed team. It is done in Switzerland or in the client’s own environment. The network works on code, synthetic or de-identified data and components that do not see production data.

We design and document this at the start of each engagement. The client’s risk function can see who has access to what. This is one reason the model works in private banking and international organisations. There, data sensitivity would otherwise rule out a distributed team.

## Adoption starts early

When engineers sit with users, adoption starts before launch. The future users have seen the system evolve, suggested changes and watched them appear. They trust it because they helped shape it. At go-live there is no need for a launch campaign. The team already uses it.

This benefit is often overlooked. Many technically sound AI systems fail because users do not trust them. Forward-deployed engineering builds that trust during the build.

## What it asks of the client

The model asks something of the client too. Forward-deployed engineers need a desk near the team and early access to a test environment. They need permission to watch the work, including the parts people are less proud of. Most of all, they need a business owner who decides within days. With these conditions in place, a first workflow can reach production in a month. Without them, engineering skill alone does not make up for it.

## When it is the right model

Forward deployment helps most when the work is complex and tacit, the data is sensitive and adoption matters as much as the technology. That is the case for most AI opportunities in regulated firms. It matters less for standard components, so we pair it with a delivery network that handles those efficiently.

If you are comparing AI firms, ask where their engineers will sit. Ask how much time they will spend with the people doing the work, and who decides what leaves your environment. The answers say a lot about whether the system will reach production.
