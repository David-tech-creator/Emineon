---
title: Evals as the new QA: how to check an AI system is ready, and stays ready
date: 2026-10-15
summary: Traditional testing checks that code does what it was written to do. AI systems also need a regular, measured answer to one question. Is it still good enough?
tags: engineering
services: ai-operations, agentic-systems
author: Emineon · AI Operations practice
cover: insight-6
translations: fr, de
---

Software teams have built testing practices over decades. Unit tests, integration tests, regression suites and continuous integration. They work because conventional software is deterministic. The same input produces the same output, and a test passes or fails.

AI systems behave differently. The same input can produce different outputs. The system can change with no code change, because a model provider updated a model. Quality is graded. An extraction can be mostly right. A summary can be accurate and still miss the point. Conventional tests are still needed, but they are no longer enough.

Evaluations, usually called evals, fill the gap. An eval is a structured, repeatable measurement of how well an AI system performs a task. It runs against a fixed set of cases with known good answers. In our work, evals are the most important engineering practice for getting AI systems into production and keeping them there.

## What a good eval set contains

An eval set is a collection of actual cases. Each has the input the system will receive and a definition of a correct output. For an extraction task, that is the document and the correct field values. For a drafting task, it can be the source material, a reference draft and a rubric. Useful eval sets have four properties.

- Taken from practice. Cases come from production data or faithful copies of it. Synthetic cases can add to them but do not replace them.
- Representative. The set reflects the actual mix of cases, including the difficult ten percent. Scans, mixed languages, unusual templates and missing data.
- Owned by the business. The people who do the work define what correct means. Engineers implement the checks. They do not decide the answers.
- Growing. Each error found in production becomes a new case, so the set improves over time.

A first eval set of one to three hundred cases is usually enough for sound decisions. It takes a few days of expert time to build. In our view it is the best investment in an AI project, and the one most often skipped.

## How to score

Different tasks need different scoring. We use three broad types, often together.

### Exact and rule-based checks

For structured outputs, we compare against the expected value. Is the quantity right, is the date in the correct format, does the classification match. These checks are cheap, fast and clear. We use them wherever the task allows.

### Model-graded checks

For text outputs, a separate model can grade against a rubric. Does the summary contain the three key facts, does each statement cite a source, is the tone right for a client letter. Model grading must itself be checked against human judgement on a sample. It is checked again when the grading model changes.

### Human review

For high-stakes or subjective outputs, experts review a sample. This is the most expensive form of evaluation and the reference for the others. We use it to calibrate automated checks and to audit production regularly.

> Agree the pass rate you need before launch. Without it, launch is a matter of opinion.

## Evals as the go-live gate

Early in a project, agree with the business owner what eval performance is required to go live. For a confirmation matching system, that can be ninety-eight percent accuracy on extracted fields and zero false matches. Uncertain cases go to a person. For a drafting assistant, each claim is referenced and expert reviewers rate eighty percent of drafts as usable with minor edits.

Once agreed, the threshold turns go-live into a measurement. It also makes progress visible. Each week the team shows the pass rate moving towards the threshold. The business sees which kinds of cases still fail.

## Continuous evaluation in production

Evaluation continues after launch. AI systems drift. Model providers update models, sometimes with little notice. New document templates appear. Users find new ways to use the system. Each of these can lower quality without anyone noticing.

- Run the full eval suite on each change. Prompt, model, retrieval configuration or tool definition.
- Run it on a schedule against the live models, even when nothing changed on your side.
- Block releases that fall below the threshold, and alert when scheduled runs do.
- Sample production outputs for human review, and add failures to the eval set.
- Track cost and latency per task next to quality, so optimisations do not reduce accuracy unseen.

This turns AI from a one-off project into an operated system. Regulators also expect it more and more. The EU AI Act’s requirements for high-risk systems include accuracy, robustness and post-market monitoring. These are hard to show without evals.

One example from a representative engagement. A routine provider update left headline accuracy unchanged. It lowered extraction quality on scanned French certificates by several points. Users would likely not have noticed for weeks. The scheduled eval run flagged it the same night. The previous model version was pinned within minutes. The issue was fixed before it reached any operator.

## Evals make you model-independent

There is a strategic benefit too. A good eval suite lets you change models with confidence. When a new model is released, or a cheaper one becomes good enough, you run the suite. Within hours you see whether it performs as well on your tasks. Without evals, switching models is guesswork, and firms stay with whatever they started with.

So each system we build comes with its eval suite, owned by the client. The models will keep changing. A well-kept eval set lets you benefit from those changes.
