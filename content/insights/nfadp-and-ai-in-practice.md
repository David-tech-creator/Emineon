---
title: nFADP and AI in practice: what Swiss data protection asks of an AI system, and how to design for it
date: 2026-05-28
summary: The revised Swiss Federal Act on Data Protection has applied since 1 September 2023, and it applies directly to AI. This is what it means for a system you want to put into production.
tags: governance
services: data-ai-platforms, ai-operations, ai-strategy
author: Emineon · Data & Platforms practice
cover: insight-3
translations: fr, de
---

Each AI project in a Swiss firm meets the data protection officer at some point. Often that meeting comes late, after the pilot is built. It then turns into a discussion about what must be undone. This can be avoided. The revised Federal Act on Data Protection, in force since 1 September 2023, is principle-based and fairly clear. Designing for it from the start costs little. It removes a common reason for AI projects to stall.

This article is a practitioner’s summary and not legal advice. It covers the obligations that most often shape the design of an AI system, and the decisions we make to meet them.

## The law already applies to AI

Switzerland does not have an AI-specific act. The Federal Data Protection and Information Commissioner (FDPIC) has stated that existing data protection law applies directly to AI-supported processing of personal data. The Federal Council has chosen to ratify the Council of Europe’s AI convention and to adapt Swiss law sector by sector. It is not copying the EU AI Act. For a Swiss firm, the starting point is therefore the nFADP. The EU AI Act is added wherever systems or their outputs reach the EU market.

One scope detail matters. The nFADP protects natural persons only. Data about companies is no longer covered, which simplifies many B2B workflows. Data about the people at those companies still is.

## Five obligations that shape the design

### 1. Privacy by design and by default

The law requires controllers to build data protection into the technical and organisational design of processing. Defaults must limit processing to what is necessary. For an AI system, this leads to concrete choices. Pass only the fields a task needs to the model. Remove or mask identifiers where they are not required. Do not keep logs of full prompts with personal data indefinitely. Make the conservative setting the default.

### 2. Transparency and automated decisions

Individuals must be informed about the processing of their personal data. A decision may be based only on automated processing and have a legal effect on a person, or affect them significantly. In that case the controller must inform them. The person can ask to give their view and to have a human review the decision.

Most systems we build keep a person in the loop for this reason. The agent prepares and a person decides. Where full automation is justified, we design the information duty and a route to human review into the system from the start.

### 3. Data protection impact assessments

Processing may be likely to lead to a high risk to the personality or fundamental rights of the people concerned. A data protection impact assessment is then required beforehand. New technologies, large volumes of sensitive data and systematic monitoring are typical triggers. Not every AI system needs one. A system that profiles people, processes health or financial data at scale or makes decisions about individuals should be assessed.

### 4. Register of processing activities

Controllers must keep a register of their processing activities. Companies with fewer than 250 employees are exempt if their processing poses only a limited risk to the people concerned. Many mid-market firms qualify. Those processing sensitive data at scale usually do not. In both cases, AI systems should be documented. What data, for what purpose, which processors, stored where and for how long.

### 5. Breach notification

A data security breach likely to result in a high risk to the people concerned must be reported to the FDPIC as soon as possible. For AI systems, this means knowing where personal data flows, including to model providers. Logging must be good enough to establish what happened.

## Sensitive data and cross-border flows

The nFADP added genetic and biometric data to the categories of sensitive personal data. Others include health, religious and political views, and criminal records. Processing sensitive data raises the requirements on consent, security and assessment.

Personal data may be disclosed to countries the Federal Council recognises as providing adequate protection. It may also go elsewhere with appropriate safeguards such as standard contractual clauses. Most AI architecture decisions are made here. A model API hosted outside Switzerland or the EU is a cross-border disclosure. A model deployed in a Swiss region or on your own infrastructure is not.

> Choose the best model among those that can lawfully see this data.

## How we design for it

We turn these obligations into a small set of architecture defaults. They apply to each system we build for Swiss clients.

- Data classification at ingestion. Each source and field is classified. The classification sets which models and regions may process it.
- A model gateway. All model calls go through one controlled point. It routes by data class, logs metadata and blocks flows that are not allowed.
- Residency by default. Personal and confidential data are processed in Switzerland or in the client’s own tenant. Model providers are bound by contract to no retention and no training.
- Minimisation in prompts. Agents retrieve only what a step needs. Identifiers are masked where the task does not require them.
- Human decision points. When an output affects an individual, a person approves it. The system records who approved and on what evidence.
- Documentation as a deliverable. A processing record, a data flow diagram and, where needed, an impact assessment come with the system.

## The EU AI Act, briefly

The EU AI Act entered into force in August 2024. Its obligations phase in between 2025 and 2027. It applies to providers and deployers whose systems are placed on the EU market or whose output is used in the EU. This can include Swiss firms. It classifies systems by risk. A few practices are prohibited. High-risk uses such as credit scoring, employment decisions and certain safety components carry heavy obligations. Most internal productivity systems carry light transparency duties.

The design defaults above are human oversight, documentation, logging and evaluation. They are also the core of what the AI Act asks of high-risk systems. A system built well for the nFADP is most of the way to AI Act readiness.

## Bring the DPO in during week one

The most useful single step is procedural. Involve the data protection officer and the risk function in the first week. Show them the data flows and the architecture. Agree the classification and residency rules before building. In our experience, data protection teams slow down AI projects that left them out. Brought in early, they help get the system into production.
