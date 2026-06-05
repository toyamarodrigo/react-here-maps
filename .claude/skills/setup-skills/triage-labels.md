# Triage Labels

The productivity skills speak in canonical roles. In this repo's local markdown
tracker, roles are recorded as issue metadata fields rather than hosted tracker
labels.

## Category

Each triaged issue has exactly one `Category:` value:

| Role | Markdown value | Meaning |
| --- | --- | --- |
| `bug` | `Category: bug` | Something is broken |
| `enhancement` | `Category: enhancement` | New feature or improvement |

## Status

Each triaged issue has exactly one `Status:` value:

| Role | Markdown value | Meaning |
| --- | --- | --- |
| `needs-triage` | `Status: needs-triage` | Maintainer needs to evaluate this issue |
| `needs-info` | `Status: needs-info` | Waiting on reporter for more information |
| `ready-for-agent` | `Status: ready-for-agent` | Fully specified, ready for an AFK agent |
| `ready-for-human` | `Status: ready-for-human` | Requires human implementation |
| `wontfix` | `Status: wontfix` | Will not be actioned |

When a workflow says "apply a label", update the corresponding metadata field
in the markdown issue file.
