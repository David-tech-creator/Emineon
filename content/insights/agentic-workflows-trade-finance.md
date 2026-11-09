---
title: Agentic workflows in trade finance: what agents can do, and where people decide
date: 2026-04-21
summary: Commodity trading runs on documents. Agents can read, match and pre-check most of them. The work is deciding which steps they take on their own.
tags: industry
services: agentic-systems, ai-operations
author: Emineon · Commodities & Trade practice
cover: insight-2
translations: fr, de
---

Geneva ranks first worldwide for trade finance. Twelve of Switzerland’s fourteen trade-finance banks are based here. Around them sit some 400 trading companies. Between a deal agreed on the desk and cash received, each firm runs a long chain of documents. Recaps, confirmations, letters of credit, bills of lading, certificates of origin and quality, inspection reports, invoices and the correspondence around them.

This is a good domain for agentic AI. The documents are semi-structured and the rules are known. Delays are costly, and the people doing the work are experienced and expensive. An error can also cost a payment, a cargo or a banking relationship. So the useful question is how to divide the work between agents and people.

## What an agent does here

An agent is a system that reads its inputs, decides on a sequence of steps and uses tools to carry them out. In trade operations the tools are mostly ordinary. Read the inbox, parse a PDF, query the ETRM, check a sanctions list, draft an email, update a status. The sequence is not fixed in advance, and that is what makes it agentic. A confirmation that matches takes three steps. One with a different price formula takes seven, including a comparison with the original recap and a draft query to the counterparty.

Three workflows give good value for the risk involved.

### Confirmation matching

Counterparty confirmations arrive by email in many formats. Each is compared with the booked trade. Quantity and tolerance, price and formula, delivery period, incoterm, load and discharge ports, payment terms and governing law. An agent extracts the terms, queries the trade and compares field by field. It classifies the result as matched, mismatched or uncertain. Operators then handle only the mismatches and uncertain cases, with the evidence highlighted.

### Letter of credit pre-checks

Discrepancies between a letter of credit and the presented documents often cause delay and cost. An agent extracts the LC terms into a checklist and reads each document as it arrives. It flags inconsistencies before the documents go to the bank. A port spelled differently, a quantity outside tolerance, a date outside the shipment period. The documentary team decides whether to present, amend or request a waiver.

### Counterparty KYC refresh

Periodic counterparty reviews need registry extracts, ownership information, financial statements and adverse media, often in the source language. An agent assembles the file, summarises what changed since the last review and lists what is missing. A compliance officer reviews and decides.

## Where agents must not act alone

We follow one principle. Autonomy follows reversibility and risk. Reading, extracting, comparing and drafting are reversible and low risk. Sending, committing, approving and releasing are not.

- Sanctions decisions. An agent can screen names and vessels and explain a hit. Clearing or escalating that hit is a compliance decision with a named owner.
- Anything that commits money or changes a contract. Payment releases, amendments and waivers go through a person each time.
- External communication with commercial consequences. Drafts help. Sending a reply that concedes a point to a counterparty is a commercial act.
- Changes to booked trades. Agents can propose corrections in the ETRM. A person applies them.

The agent then does most of the reading and comparing, and people spend their time on decisions. Auditors, banks and regulators expect to see this split.

## Designing for the documents you receive

Clean PDFs are easy. The hard cases are a scanned certificate with a stamp across the key field, or a confirmation that covers two trades. Or a recap written in a chat message and pasted into an email, or a bill of lading with handwritten corrections. A system tested only on clean samples looks good in a demo and disappoints in week two.

We start each trade operations engagement by collecting a few hundred historical documents with their known outcomes. We include the difficult ones on purpose. These become the evaluation set. The system goes into production only once it reaches an agreed accuracy on them. Each later correction by an operator is added to the set, so the same mistake cannot come back unnoticed.

> The goal is an operations team that no longer has to rekey fields.

## The controls that make it acceptable

Trading firms are reviewed by their banks as much as by their regulators. An agentic system here needs controls that pass a bank’s due diligence.

- Read-only access to the ETRM and core systems by default. Write access is limited to specific actions and logged.
- An audit trail of the document received, what the agent extracted and compared, what it concluded and who approved.
- Field-level confidence and explicit uncertainty, so reviewers know where to look.
- Data residency in Switzerland or the firm’s own tenant for counterparty and trade data.
- Model independence, so a change of provider does not mean a rebuild.

## What it returns

In representative engagements, confirmation handling time falls by more than half. Most confirmations are matched without anyone rekeying a field. Discrepancies are flagged the same day instead of days later. The knowledge of a few experienced operators is now in matching rules and eval cases the whole team shares.

The largest benefit is often strategic. Trading volumes are volatile. A firm that absorbs a jump in volume without hiring a new operations team has more room when markets move. In an industry that competes on speed and reliability, that helps.
