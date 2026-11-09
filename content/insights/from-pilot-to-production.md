---
title: From pilot to production: why AI pilots stall, and five things that get them live
date: 2026-03-12
summary: The pilot worked in the demo. Six months later it is still a pilot. The reasons are predictable, and so are the fixes.
tags: delivery
services: agentic-systems, ai-operations
author: Emineon · Agentic Engineering practice
cover: insight-1
translations: fr, de
---

Most firms we speak to have an AI pilot. Fewer have one in production. Fewer still have one that a whole team uses each day. Much of the value of AI is lost between the demo and the daily tool. The cause is rarely the model. The models are good enough. The problems are in everything around them.

We have taken a number of stalled pilots into production. We see the same five causes each time. None of them is unusual. Each can be addressed from the first week, once someone decides to.

## 1. The pilot was chosen for enthusiasm

Pilots are often chosen because someone was excited about them, or because they made a good demo. A chatbot over the employee handbook is easy to build and nice to show. It rarely moves a number that leadership tracks.

When the pilot ends, someone asks whether to fund production. Without a baseline and a business case, the honest answer is often no. The project then stops quietly. The pilot worked technically. Nobody could say what it was worth.

The fix is to choose the first workflow the way a finance team would. Where do skilled people spend hours on work that is repetitive but not trivial. What does an hour of that work cost, and how many hours are there. Can we measure today’s cycle time and error rate. A workflow for confirmations, KYC files or regulatory drafts usually scores better on all three than a general assistant.

## 2. Nobody wrote down what “good” means

In a demo, people judge quality by eye. Someone asks a question, the answer looks plausible and everyone nods. In production, plausible is not enough. A field extracted wrongly from a confirmation has a cost. So does a sentence in a KYC narrative that cites the wrong document, or a translation that softens a legal obligation.

Pilots that reach production almost always have an evaluation set. It is a collection of actual cases with known correct answers. It is written before the system is built and run each time the system changes. It turns a debate about quality into a number. The go-live decision becomes a matter of agreeing a threshold.

Writing the eval set takes the time of people who know the work, so it often gets skipped. In our experience it is the best predictor of whether a system reaches production and stays there.

## 3. The messy ten percent was left for later

Most business processes are ninety percent routine and ten percent exceptions. Demos cover the ninety. Production depends on the ten. A scanned fax, a confirmation with two trades in it, or a client file in Italian when the system was tested in French. Or a counterparty that uses its own template.

A system that handles routine cases and fails unpredictably on the rest is hard to use. People cannot trust any of its output. We do not automate the exceptions first. We design for them. The system must know when it is uncertain, say so and send the case to a person with the evidence attached.

> A good agent knows when it might be wrong and says so before anyone relies on it.

This is mostly a design decision. Confidence thresholds, checks against source systems and a clear review queue make exceptions a normal part of the workflow.

## 4. The pilot lived outside the production systems

Many pilots run in a sandbox. Documents are uploaded by hand and a person copies outputs into the production system. That is fine for learning. The pilot then never meets the hard parts of production. Authentication, entitlements, rate limits, data residency, logging and the change board.

When the time comes to connect it properly, the effort is larger than the original pilot. Someone has to fund it from scratch. Security and compliance teams see the architecture for the first time. They raise questions that should have come months earlier.

We now build first workflows inside the client’s environment from day one. At first this can mean one system connected read-only. It is slower in week one and much faster by week six. The risk team also reviews the actual architecture instead of a slide.

## 5. Nobody owned it after launch

The last cause is the quietest. A system goes live, the project team moves on and nobody is responsible for it. Six months later a model provider changes something and accuracy drifts. Users lose confidence and go back to the old way. No incident is declared. The system is simply no longer used.

AI systems need an owner on the business side and an operator on the technical side. They also need a monitoring dashboard and a scheduled review. The owner decides what the system should do. The operator keeps it doing that. Without both, AI systems degrade.

## What it looks like when it works

Put the five fixes together and a pattern appears. Choose a workflow with a measurable baseline. Write the eval set from actual cases before building. Design for exceptions with a human review queue. Build inside the client environment from the start. Name an owner and an operator before launch.

This does not need a large team. Our standard first engagement takes thirty days from scoping to a workflow live in production. A small senior pod works with the client on site. The limit is rarely engineering time. It is making these decisions early and having access to the people who know the work.

- Week 1. Choose the workflow, measure the baseline, write the eval set.
- Week 2. Build in the client environment, against the eval set.
- Week 3. Users test it on their daily work. Handle exceptions. Add access control and audit.
- Week 4. Production release. Owner and operator named. Result measured against the baseline.

The first workflow is rarely the most valuable one. It shows that the firm can take AI from idea to production. It also builds the platform, controls and habits that make the second and third workflows much cheaper. From there, AI becomes part of how the firm works.
