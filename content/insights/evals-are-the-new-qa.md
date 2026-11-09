---
title: Evals are the new QA: how to know an AI system is ready, and keep knowing
date: 2026-10-15
summary: Traditional testing checks that code does what it was written to do. AI systems need something else: a continuous, measured answer to the question “is it still good enough?”
tags: engineering
services: ai-operations, agentic-systems
author: Emineon · AI Operations practice
cover: insight-6
translations: fr, de
---

Software teams have spent decades building testing disciplines: unit tests, integration tests, regression suites, continuous integration. They work because conventional software is deterministic. The same input produces the same output, and a test either passes or fails.

AI systems break that assumption. The same input can produce different outputs. The system can change without any code changing, because a model provider updated a model. Quality is not binary but graded: an extraction can be mostly right, a summary can be accurate but miss the point. Conventional tests are still necessary, but they are no longer sufficient.

Evaluations, usually called evals, fill the gap. An eval is a structured, repeatable measurement of how well an AI system performs a task, run against a fixed set of cases with known good answers. In our work, evals are the single most important engineering practice for getting AI systems into production and keeping them there.

## What a good eval set contains

An eval set is a collection of real cases, each with the input the system will receive and a definition of a correct output. For an extraction task, that is the document and the correct field values. For a drafting task, it might be the source material, a reference draft and a rubric. Four properties separate useful eval sets from decorative ones.

- Real. Cases come from production data or faithful copies of it, not invented examples. Synthetic cases can supplement but never replace them.
- Representative. The set reflects the actual mix of cases, including the ugly ten percent: scans, mixed languages, unusual templates, missing data.
- Owned by the business. People who do the work define what correct means. Engineers implement the checks; they do not decide the answers.
- Growing. Every error found in production becomes a new case, so the set gets stronger over time.

A first eval set of one to three hundred cases is usually enough to make sound decisions. It takes a few days of expert time to build. That is the best investment in an AI project, and the one most often skipped.

## How to score

Different tasks need different scoring. We use three broad types, often in combination.

### Exact and rule-based checks

For structured outputs, compare against the expected value: is the quantity right, is the date in the correct format, does the classification match? These are cheap, fast and unambiguous, and should be used wherever the task allows.

### Model-graded checks

For text outputs, a separate model can grade against a rubric: does the summary contain the three key facts, does every statement cite a source, is the tone appropriate for a client letter? Model grading must itself be validated against human judgement on a sample, and re-validated when the grading model changes.

### Human review

For high-stakes or subjective outputs, experts review a sample. This is the most expensive form of evaluation and the ground truth for the others. We use it to calibrate automated checks and to audit production regularly.

> If you cannot say what pass rate you need before launch, you are not ready to launch.

## Evals as the go-live gate

The most useful decision an AI project can make early is to agree, with the business owner, what eval performance is required to go live. For a confirmation matching system, that might be ninety-eight percent accuracy on extracted fields and zero false matches, with uncertain cases routed to a person. For a drafting assistant, it might be that every claim is referenced and that expert reviewers rate eighty percent of drafts as usable with minor edits.

Once agreed, the threshold turns go-live from a matter of opinion into a measurement. It also makes progress visible. Each week, the team can show the pass rate moving towards the threshold, and the business can see exactly which kinds of cases are still failing.

## Continuous evaluation in production

Launching is not the end of evaluation. AI systems drift. Model providers update models, sometimes with little notice. New document templates appear. Users find new ways to use the system. Each can silently degrade quality.

- Run the full eval suite on every change: prompt, model, retrieval configuration, tool definition.
- Run it on a schedule against the live models, even when nothing has changed on your side.
- Block releases that fall below the threshold, and alert when scheduled runs do.
- Sample production outputs for human review, and add failures to the eval set.
- Track cost and latency per task alongside quality, so optimisations never trade away accuracy unseen.

This is what turns AI from a one-off project into an operated system. It is also what regulators increasingly expect: the EU AI Act’s requirements for high-risk systems include accuracy, robustness and post-market monitoring, all of which are hard to demonstrate without evals.

A concrete example: in one representative engagement, a routine provider update left headline accuracy unchanged but lowered extraction quality on scanned French certificates by several points. Nobody using the system would have noticed for weeks. The scheduled eval run flagged it the same night, the previous model version was pinned within minutes, and the issue was resolved before it reached a single operator.

## Evals make you model-independent

There is a strategic benefit too. A strong eval suite lets you change models with confidence. When a new model is released, or a cheaper one becomes good enough, you run the suite and know within hours whether it performs as well on your tasks. Without evals, switching models is a leap of faith, and firms stay locked in to whatever they started with.

This is why every system we build ships with its eval suite, owned by the client. The models will keep changing. A well-kept eval set is the asset that lets you take advantage of that rather than be exposed to it.
