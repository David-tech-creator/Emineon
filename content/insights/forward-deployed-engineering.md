---
title: Forward-deployed engineering: why the best AI systems are built next to the people who use them
date: 2026-09-03
summary: Requirements written in a workshop miss most of what matters. Engineers who sit with the team find it in a week. Here is how the model works and why it suits AI in particular.
tags: delivery
services: agentic-systems, adoption-enablement
author: Emineon · Agentic Engineering practice
cover: insight-5
translations: fr, de
---

The term forward-deployed engineer comes from software companies that sent engineers to work inside their customers’ organisations, building on site rather than from headquarters. The idea is older than the name: put the people who build the system next to the people who will use it, and let them learn the work directly.

For AI systems, this model is not a nice-to-have. It is often the difference between a system that works in production and one that never leaves the pilot. This article explains why, and how we run it.

## Why AI needs engineers on the floor

Traditional software encodes rules someone can write down. AI systems are used precisely where the rules are hard to write down: reading documents that vary, applying judgement to exceptions, drafting text that must sound right to a specialist. The knowledge that matters is tacit. It lives in how an experienced operator scans a confirmation, which clauses a compliance officer reads first, what a relationship manager knows about a client that is not in the file.

That knowledge does not survive a requirements workshop. People describe the process as it is supposed to work, not as it does. They forget the exceptions because they handle them without thinking. They do not mention the spreadsheet that holds everything together because it is embarrassing.

An engineer who sits with the team for a week sees all of it. They watch the real queue, read the real documents and ask why at the moment something unexpected happens. The specification that results is shorter, more precise and much closer to the truth.

## What a forward-deployed engineer does

Our forward-deployed engineers are senior engineers, not consultants who code or developers who present. Their work on an engagement typically follows four phases.

1. Shadow. Sit with the team, watch the work, collect real cases including the messy ones, and identify where time goes.
2. Specify. Write the workflow and the eval set with the people who do the work, so “correct” is defined by them.
3. Build. Ship in the client’s environment in short cycles, with a small group of users trying each version on real work.
4. Transfer. Train the team that will operate the system, write the runbook and stay through the first weeks in production.

Throughout, the forward-deployed engineer is the point where the client’s knowledge and our engineering capacity meet. They decide what can be built by the wider delivery network, working on non-sensitive components, and what must be done on site or on shore because it touches regulated data.

## Small team in front, large capacity behind

One objection to the model is cost: senior engineers on site are expensive. The answer is in how the team is organised. A forward-deployed pod is small, often two or three people. They own the relationship, the specification, the architecture and the sensitive parts of the build. Behind them, our global delivery network provides additional engineering capacity for work that is safe to share: user interface components, test tooling, integrations against documented interfaces, infrastructure as code.

With hubs across Asia-Pacific and the Americas, that work continues while Geneva sleeps. The client sees a small, senior team that understands their business and a pace that would normally require a much larger one.

> The forward-deployed engineer is the one person on the project who knows both what the operator needs and what the system can do.

## Data residency shapes the split

For regulated clients, the division between on-site and network work is not only about efficiency. It is a control. Work that touches client-identifying data, confidential documents or production systems is done by the forward-deployed team in Switzerland or in the client’s own environment. The network works on code, synthetic or de-identified data and components that never see production data.

This is designed explicitly at the start of each engagement and documented, so the client’s risk function can see exactly who has access to what. It is one of the reasons the model works in private banking and international organisations, where data sensitivity would otherwise rule out a distributed team.

## Adoption comes with the territory

A side effect of embedding engineers with users is that adoption starts before launch. The people who will use the system have seen it evolve, suggested changes and watched them appear. They trust it because they helped shape it. When it goes live, there is no need for a launch campaign: the team already uses it.

This is the most underrated benefit of the model. Many technically sound AI systems fail because users do not trust them. Forward-deployed engineering builds that trust as part of the build.

## What it asks of the client

The model asks something of the client too. Forward-deployed engineers need a desk near the team, access to a test environment early, and permission to watch the real work, including the parts people are not proud of. Above all, they need a business owner who can make decisions within days, not weeks. When those conditions are met, a first workflow can reach production in a month. When they are not, no amount of engineering talent makes up for it.

## When it is the right model

Forward deployment is most valuable when the work is complex and tacit, the data is sensitive, and adoption matters as much as the technology. That describes most of the AI opportunities in regulated firms. It matters less for commodity components, which is exactly why we pair it with a delivery network that handles those efficiently.

If you are evaluating an AI partner, ask where their engineers will sit, how much time they will spend with the people doing the work, and who decides what leaves your environment. The answers will tell you a great deal about whether the system will make it into production.
