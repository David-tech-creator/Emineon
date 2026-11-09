---
title: From pilot to production: why most AI pilots stall, and the five things that get them live
date: 2026-03-12
summary: The pilot worked in the demo. Six months later it is still a pilot. The reasons are predictable, and so are the fixes.
tags: delivery
services: agentic-systems, ai-operations
author: Emineon · Agentic Engineering practice
cover: insight-1
translations: fr, de
---

Almost every firm we speak to has an AI pilot. Fewer have one in production, and fewer still have one that a whole team relies on every day. The gap between the demo and the daily tool is where most of the value of AI is currently lost, and it is rarely a problem of model capability. The models are good enough. What fails is everything around them.

Having taken a number of stalled pilots into production, we see the same five causes again and again. None of them is exotic. All of them can be addressed from the first week, if someone decides to.

## 1. The pilot was chosen for enthusiasm, not value

Pilots are often chosen because someone was excited about them, or because they made a good demo. A chatbot over the employee handbook is easy to build and pleasant to show. It rarely moves a number anyone in leadership tracks.

When the pilot ends, the question becomes: should we spend real money to put this into production? Without a baseline and a business case, the honest answer is often no, and the project quietly stops. The pilot did not fail technically. It failed because nobody could say what it was worth.

The fix is to choose the first workflow the way a finance team would. Where do skilled people spend hours on work that is repetitive but not trivial? What does an hour of that work cost, and how many hours are there? Can we measure today’s cycle time and error rate? A workflow that handles confirmations, KYC files or regulatory drafts usually beats a general assistant on all three questions.

## 2. Nobody wrote down what “good” means

In a demo, quality is judged by eye. Someone asks a question, the answer looks plausible, everyone nods. In production, plausible is not enough. A field extracted wrongly from a confirmation, a sentence in a KYC narrative that cites the wrong document, a translation that softens a legal obligation: each is a real cost.

Pilots that reach production almost always have an evaluation set: a collection of real cases with known correct answers, written before the system is built and run every time it changes. It turns a debate about whether the system is good into a number, and it makes the go-live decision a matter of agreeing a threshold.

Writing the eval set is not glamorous. It takes the time of people who know the work, which is why it gets skipped. It is also the single best predictor we know of whether a system will make it into production and stay there.

## 3. The messy ten percent was left for later

Most business processes are ninety percent routine and ten percent exceptions. Demos cover the ninety. Production is decided by the ten: the scanned fax, the confirmation with two trades in it, the client file in Italian when the system was tested in French, the counterparty that uses its own template.

A system that handles the routine cases and fails unpredictably on the rest is worse than useless, because people cannot trust any of its output. The answer is not to automate the exceptions first. It is to design for them: the system must know when it is uncertain, say so, and route the case to a person with the evidence attached.

> A good agent is not one that is always right. It is one that knows when it might be wrong and says so before anyone relies on it.

This is a design decision more than a modelling one. Confidence thresholds, explicit checks against source systems and a clear review queue turn exceptions from a reason to stop into a normal part of the workflow.

## 4. The pilot lived outside the real systems

Many pilots run in a sandbox: documents uploaded by hand, outputs copied into the real system by a person. That is fine for learning, but it means the pilot never meets the hard problems of production: authentication, entitlements, rate limits, data residency, logging, and the change board.

When the time comes to connect it properly, the effort is larger than the original pilot and someone has to fund it from scratch. Security and compliance teams, seeing the architecture for the first time, raise questions that should have been asked months earlier.

We now build first workflows inside the client’s environment from day one, even if that means connecting to one system read-only at first. It is slower in week one and much faster by week six. It also means the risk team reviews a real architecture, not a slide.

## 5. Nobody owned it after launch

The last cause is the quietest. A system goes live, the project team moves on, and nobody is responsible for it. Six months later a model provider changes something, accuracy drifts, users lose confidence and go back to the old way. No incident is ever declared. The system simply stops being used.

AI systems need an owner on the business side and an operator on the technical side, with a monitoring dashboard and a scheduled review. The owner decides what the system should do; the operator keeps it doing that. Without both, every AI system decays.

## What it looks like when it works

Put the five fixes together and a pattern appears. Choose a workflow with a measurable baseline. Write the eval set from real cases before building. Design for exceptions with a human review queue. Build inside the real environment from the start. Name an owner and an operator before launch.

None of this requires a large team. Our standard first engagement is thirty days from scoping to a workflow live in production, done by a small senior pod embedded with the client. The constraint is rarely engineering time. It is the discipline to make these decisions early, and the access to the people who know the work.

- Week 1: choose the workflow, measure the baseline, write the eval set.
- Week 2: build in the client environment, against the eval set.
- Week 3: real users on real work; handle exceptions; add access control and audit.
- Week 4: production release, owner and operator named, result measured against the baseline.

The first workflow is rarely the most valuable one. Its real purpose is to prove that the firm can take AI from idea to production, and to build the platform, the controls and the habits that make the second and third workflows much cheaper. That is when AI stops being a pilot programme and starts being part of how the firm works.
