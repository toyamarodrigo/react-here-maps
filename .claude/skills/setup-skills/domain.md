# Domain Docs

How the productivity skills should consume this repo's domain documentation
when exploring the codebase.

## Before exploring, read these

- `CONTEXT.md` at the repo root for glossary terms and project language.
- `docs/adr/` if it exists, focusing on ADRs that touch the area being changed.

If optional files do not exist, proceed silently. Do not ask to create them
upfront; producer workflows can create them later when terms or decisions are
actually resolved.

## Layout

This repo is single-context:

```text
/
├── CONTEXT.md
├── docs/adr/          # optional
└── skills/
```

## Use the glossary's vocabulary

When output names a domain concept in a PRD, issue title, triage note, refactor
proposal, hypothesis, or test name, use the term as defined in `CONTEXT.md`.
Do not drift to synonyms the glossary explicitly avoids.

If the concept needed is not in the glossary yet, note the gap for a future
domain-docs pass instead of inventing project language silently.

## Flag ADR conflicts

If an output contradicts an existing ADR, surface that conflict explicitly
rather than silently overriding it.
