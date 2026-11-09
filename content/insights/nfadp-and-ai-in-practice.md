---
title: nFADP and AI in practice: what Swiss data protection asks of an AI system, and how to design for it
date: 2026-05-28
summary: The revised Swiss Federal Act on Data Protection has applied since 1 September 2023, and it applies directly to AI. Here is what that means for a system you want to put into production.
tags: governance
services: data-ai-platforms, ai-operations, ai-strategy
author: Emineon · Data & Platforms practice
cover: insight-3
translations: fr, de
---

Every AI project in a Swiss firm eventually meets the data protection officer. Too often that meeting happens late, after the pilot is built, and becomes a negotiation about what must be undone. It does not need to be like that. The revised Federal Act on Data Protection, in force since 1 September 2023, is principle-based and reasonably clear. Designing for it from the start costs little and removes a common reason for AI projects to stall.

This article is a practitioner’s summary, not legal advice. It covers the obligations that most often shape the design of an AI system, and the decisions we make to meet them.

## The law already applies to AI

Switzerland does not have an AI-specific act. The Federal Data Protection and Information Commissioner (FDPIC) has made clear that the existing data protection law applies directly to AI-supported processing of personal data. The Federal Council has chosen to ratify the Council of Europe’s AI convention and to adapt Swiss law sector by sector, rather than copy the EU AI Act. For a Swiss firm, the practical starting point is therefore the nFADP, plus the EU AI Act wherever systems or their outputs reach the EU market.

One scope detail matters: the nFADP protects natural persons only. Data about companies is no longer covered, which simplifies many B2B workflows. Data about the people at those companies still is.

## Five obligations that shape the design

### 1. Privacy by design and by default

The law requires controllers to build data protection into the technical and organisational design of processing, and to set defaults that limit processing to what is necessary. For an AI system, this translates into concrete choices: pass only the fields a task needs to the model; strip or mask identifiers where they are not required; do not log full prompts containing personal data indefinitely; and make the conservative setting the default.

### 2. Transparency and automated decisions

Individuals must be informed about the processing of their personal data. Where a decision based exclusively on automated processing has a legal effect on a person or significantly affects them, the controller must inform them, and the person can ask to express their view and to have the decision reviewed by a human.

Most of the systems we build keep a person in the loop for exactly this reason: the agent prepares, a person decides. Where full automation is justified, the information duty and a route to human review must be designed in, not added later.

### 3. Data protection impact assessments

Where processing is likely to lead to a high risk to the personality or fundamental rights of the people concerned, a data protection impact assessment is required beforehand. New technologies, large volumes of sensitive data and systematic monitoring are typical triggers. Not every AI system needs one, but any system that profiles people, processes health or financial data at scale or makes decisions about individuals should be assessed.

### 4. Register of processing activities

Controllers must keep a register of their processing activities. There is an exemption for companies with fewer than 250 employees whose processing poses only a limited risk to the people concerned. Many mid-market firms qualify; those processing sensitive data at scale usually do not. Either way, AI systems should be documented: what data, for what purpose, which processors, stored where and for how long.

### 5. Breach notification

A data security breach that is likely to result in a high risk to the people concerned must be reported to the FDPIC as soon as possible. For AI systems, that means knowing where personal data flows, including to model providers, and having logging good enough to establish what happened.

## Sensitive data and cross-border flows

The nFADP expanded the categories of sensitive personal data to include genetic and biometric data, alongside health, religious and political views, and criminal records among others. Processing sensitive data raises the bar on consent, security and assessment.

Disclosing personal data abroad is allowed to countries the Federal Council recognises as providing adequate protection, or with appropriate safeguards such as standard contractual clauses. In practice, this is where most AI architecture decisions are made. A model API hosted outside Switzerland or the EU is a cross-border disclosure; a model deployed in a Swiss region or on your own infrastructure is not.

> The question is not which model is best. It is which model is best among those that can lawfully see this data.

## How we design for it

We translate these obligations into a small set of architectural defaults that apply to every system we build for Swiss clients.

- Data classification at ingestion. Each source and field is classified, and the classification determines which models and regions may process it.
- A model gateway. All model calls go through one controlled point that enforces routing by data class, logs metadata and blocks disallowed flows.
- Residency by default. Personal and confidential data are processed in Switzerland or in the client’s own tenant. Model providers are contractually bound to no retention and no training.
- Minimisation in prompts. Agents retrieve only what a step needs; identifiers are masked where the task does not require them.
- Human decision points. Wherever an output affects an individual, a person approves it, and the system records who and on what evidence.
- Documentation as a deliverable. A processing record, a data flow diagram and, where needed, an impact assessment are delivered with the system.

## The EU AI Act, briefly

The EU AI Act entered into force in August 2024, with obligations phased in between 2025 and 2027. It applies to providers and deployers whose systems are placed on the EU market or whose output is used in the EU, which can include Swiss firms. It classifies systems by risk: a few practices are prohibited; high-risk uses such as credit scoring, employment decisions and certain safety components carry heavy obligations; most internal productivity systems carry light transparency duties.

The design defaults above, human oversight, documentation, logging and evaluation, are also the core of what the AI Act asks of high-risk systems. Building to the nFADP well is most of the way to AI Act readiness.

## Bring the DPO in during week one

The most effective single step is procedural. Involve the data protection officer and the risk function in the first week, show them the data flows and the architecture, and agree the classification and residency rules before building. In our experience, data protection teams are not the obstacle to AI. They are the obstacle to AI projects that ignored them. Brought in early, they become the people who make production possible.
