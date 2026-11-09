---
title: Agentic workflows in trade finance: where agents earn their keep, and where they must not act alone
date: 2026-04-21
summary: Commodity trading runs on documents. Agents can read, match and pre-check almost all of them. The art is deciding which steps they take on their own.
tags: industry
services: agentic-systems, ai-operations
author: Emineon · Commodities & Trade practice
cover: insight-2
translations: fr, de
---

Geneva ranks first worldwide for trade finance, and twelve of Switzerland’s fourteen trade-finance banks are based here. Around them sit some 400 trading companies. Between a deal agreed on the desk and cash received at the end, every one of those firms runs a long chain of documents: recaps, confirmations, letters of credit, bills of lading, certificates of origin and quality, inspection reports, invoices and the correspondence that holds them together.

This is close to an ideal domain for agentic AI. The documents are semi-structured, the rules are known, the cost of delay is high and the people doing the work are experienced and expensive. It is also a domain where an error can cost a payment, a cargo or a banking relationship. So the question is not whether to use agents, but how to divide the work between agents and people.

## What an agent actually does here

An agent is a system that reads its inputs, decides on a sequence of steps and uses tools to carry them out. In trade operations, the tools are mostly ordinary: read the inbox, parse a PDF, query the ETRM, check a sanctions list, draft an email, update a status. What makes it agentic is that the sequence is not fixed in advance. A confirmation that matches perfectly takes three steps. One with a different price formula takes seven, including a comparison with the original recap and a draft query to the counterparty.

Three workflows stand out for the value they return relative to the risk.

### Confirmation matching

Counterparty confirmations arrive by email in every possible format. Each must be compared with the booked trade: quantity and tolerance, price and formula, delivery period, incoterm, load and discharge ports, payment terms, governing law. An agent can extract the terms, query the trade, compare field by field, and classify the result as matched, mismatched or uncertain. Operators then deal only with the mismatches and uncertainties, with the evidence highlighted.

### Letter of credit pre-checks

Discrepancies between a letter of credit and the presented documents are a classic source of delay and cost. An agent can extract the LC terms into a checklist, read each document as it arrives and flag inconsistencies before the documents go to the bank: a port spelled differently, a quantity outside tolerance, a date that does not fit the shipment period. The decision to present, amend or request a waiver stays with the documentary team.

### Counterparty KYC refresh

Periodic counterparty reviews involve collecting registry extracts, ownership information, financial statements and adverse media, often in the source language. An agent can assemble the file, summarise what changed since the last review and list what is missing. A compliance officer reviews and decides.

## Where agents must not act alone

The governing principle is simple: autonomy should follow reversibility and risk. Reading, extracting, comparing and drafting are reversible and low risk. Sending, committing, approving and releasing are not.

- Sanctions decisions. An agent can screen names and vessels and explain why a hit occurred. Clearing or escalating that hit is a compliance decision with a named owner.
- Anything that commits money or changes a contract. Payment releases, amendments and waivers go through a person, every time.
- External communication with commercial consequences. Drafts are useful; sending a reply that concedes a point to a counterparty is a commercial act.
- Changes to booked trades. Agents can propose corrections in the ETRM; a person applies them.

In practice, this produces a workflow where the agent does most of the reading and comparing, and people spend their time on decisions. That is the right division of labour. It is also what auditors, banks and regulators expect to see.

## Designing for the documents you actually receive

The difficulty in trade documents is not reading clean PDFs. It is the scanned certificate with a stamp across the key field, the confirmation that covers two trades, the recap written in a chat message and pasted into an email, the bill of lading with handwritten corrections. A system tested only on clean samples will look excellent in a demo and disappoint in week two.

We start every trade operations engagement by collecting a few hundred real historical documents with their known outcomes, deliberately including the ugly ones. These become the evaluation set. The system is not allowed into production until it reaches an agreed accuracy on them, and every correction an operator makes later is added to the set so the same mistake cannot return unnoticed.

> The goal is not an agent that never needs a person. It is an operations team that never has to rekey a field again.

## The controls that make it acceptable

Trading firms work under the scrutiny of their banks as much as their regulators. An agentic system in this environment needs controls that would satisfy a bank’s due diligence.

- Read-only access to the ETRM and core systems by default; write access scoped to specific actions and logged.
- A complete audit trail: the document received, what the agent extracted, what it compared, what it concluded and who approved.
- Field-level confidence and explicit uncertainty, so reviewers know where to look.
- Data residency in Switzerland or the firm’s own tenant for counterparty and trade data.
- Model independence, so a change of provider does not mean a rebuild.

## What it returns

In representative engagements, confirmation handling time falls by more than half and the majority of confirmations are matched without anyone rekeying a field. Discrepancies are flagged the same day rather than days later. Just as important, the knowledge that lived in a few experienced operators is now encoded in matching rules and eval cases that the whole team shares.

The largest benefit is often strategic. Trading volumes are volatile. A firm that can absorb a jump in volume without hiring a new operations team has more room to take opportunities when markets move. For an industry that competes on speed and reliability, that is an edge worth having.
