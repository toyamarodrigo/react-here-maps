---
name: setup-skills
description: Configure this repo's productivity skills for the local markdown tracker and domain docs. Use before triage, to-prd, or to-issues when tracker setup docs are missing or stale.
disable-model-invocation: true
---

# Setup Skills

Configure the productivity skills in this registry to use the local markdown
tracker. This project does not use hosted issue trackers for these workflows.

## What this provides

- **Issue tracker** — PRDs and implementation issues live under `.scratch/`
- **Triage metadata** — issues use `Category:` and `Status:` fields instead of hosted tracker labels
- **Domain docs** — skills read the root `CONTEXT.md` and optional ADRs before naming concepts or decisions

## Reference docs

- [issue-tracker.md](issue-tracker.md) — local markdown tracker layout and operations
- [triage-labels.md](triage-labels.md) — canonical category and status values
- [domain.md](domain.md) — domain documentation lookup rules

## Process

1. Read the three reference docs above before running `/triage`, `/to-prd`, or `/to-issues`.
2. When a workflow says "publish to the issue tracker", write markdown under `.scratch/` using [issue-tracker.md](issue-tracker.md).
3. When a workflow says "apply a label", update the issue file's `Category:` or `Status:` field using [triage-labels.md](triage-labels.md).
4. When exploring the codebase, use the vocabulary and decision rules in [domain.md](domain.md).

## Updating this setup

If the local tracker convention changes, update these docs directly in this
folder. Keep the workflow local-only; do not add hosted tracker branches unless
this project explicitly adopts one later.
