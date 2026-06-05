# Component Reference Contract

Canonical contract every Urbix component reference under `.agents/skills/urbix-components/references/` and `.claude/skills/urbix-components/references/` must follow. This file is the source of truth for vocabulary, structure, lifecycle/status rules, and deprecation guidance. The contract describes documentation only; it does not change runtime source, package exports, Storybook behavior, or WIP components.

## Relationship to `write-a-skill`

The Urbix components skill follows the `write-a-skill` progressive-disclosure shape:

- `SKILL.md` keeps only quick start, workflows, shared conventions, and navigation. The component index is the deliberate exception to the generic 100-line target because it is the discovery surface.
- Component details live in one-level-deep reference files under `references/`.
- This contract provides the domain-specific template for those component reference files.

When adding or updating a component reference, copy the template below first, then fill only the sections that are true for that component.

## Vocabulary

These scope terms are canonical. Use them verbatim under the **Status** heading and in any prose that discusses component scope.

- **Public Component** — exported from the published package barrel (`@urbetrack/urbix`) and intended for consumers. Examples in references must prefer the published package import.
- **Internal Component** — used by other Urbix components but not part of the supported public surface. Reference must say "Internal Component" and discourage direct consumer use.
- **Source-only Component** — lives in `packages/urbix/src/ui/` but is not re-exported anywhere consumers can import it. Reference exists for contributor context, not for consumer adoption.

Compatibility exports do not override source intent. If `status.json` says `scope: "internal"` but the public barrel still has a deprecated compatibility export, document the component as `Internal Component` and point readers to `@urbetrack/urbix/internals` when that entrypoint exists. If `status.json` says `scope: "incubator"` and the public barrel exports the component, document it as `Public Component (incubator)`.

A component reference uses exactly one scope term. Compound sub-components inherit the parent's scope; do not relabel `Button.Icon` separately from `Button`.

## Required Structure

Every component reference file MUST include the following top-level headings, in order. Sections may add prose, examples, or tables, but each heading must be present even if its body is "None known.":

1. `# <Component name>` — H1 title. Use the component's exported name (`Button`, `DropdownMultiple`) or compound family name (`DataTable`, `Forms`).
2. `## Status` — scope term, lifecycle, replacement. See [Status](#status-heading) below.
3. `## Imports` — copy-pastable import statements. Public components MUST show the `@urbetrack/urbix` import first.
4. `## Usage` — minimal runnable example. Real product UI labels are preferred over placeholder text where they illustrate actual usage.
5. `## API` — props, sub-components, hooks. Tables for props; subsections for compound parts.
6. `## Patterns` — composition patterns, recipes, integration with other components.
7. `## Mistakes` — common misuse and the corrected approach.
8. `## Related references` — links to other component references that participate in the same workflow. Link, do not duplicate, their API tables.
9. `## Source files` — paths under `packages/urbix/src/ui/` that implement the component, `status.json` when present, plus Storybook file when it exists. Do not list test files.

Subsections (`###`) are unconstrained. Compound sub-components (`Button.Icon`, `DataTable.Toolbar`, `Forms.InputText`) MUST be documented inside the parent's `## API` section, not as separate top-level files.

## Component Reference Template

````md
# ComponentName

One short paragraph describing what the component is for. Mention major dependencies or related components only when they affect usage decisions.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import { ComponentName } from "@urbetrack/urbix";
```

## Usage

```tsx
<ComponentName>Real product label</ComponentName>
```

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `propName` | `string` | -- | What this prop controls |

## Patterns

- Use this section for composition recipes and integrations.

## Mistakes

- **Common mistake.** Describe the misuse, then give the corrected approach.

## Related references

- [other-component.md](./other-component.md) — why it is related.

## Source files

- `packages/urbix/src/ui/<layer>/<component>/<component>.tsx`
- `packages/urbix/src/ui/<layer>/<component>/status.json`
- `packages/urbix/src/ui/<layer>/<component>/<component>.stories.tsx`
````

### Status heading

The `## Status` section captures three facts in this order:

1. **Scope** — `Public Component`, `Public Component (deprecated)`, `Public Component (incubator)`, `Internal Component`, or `Source-only Component`.
2. **Lifecycle** — pulled from source metadata when available (e.g., `dev`, `new`, `beta`, `review`, `rc`, `stable`, `deprecated`). When metadata is missing, write `Lifecycle: not declared` rather than guessing. Do not invent a status.
3. **Replacement** (deprecated only) — name the preferred replacement on the first line of the section.

Example for a deprecated component:

```
## Status

- Scope: Public Component (deprecated)
- Replacement: use `Dropdown` instead.
- Lifecycle: deprecated
```

Example for a component without lifecycle metadata:

```
## Status

- Scope: Internal Component
- Lifecycle: not declared
```

## Deprecated Components

A deprecated reference exists to help readers leave the legacy API, not to teach the legacy API. Therefore:

- Lead with the replacement under `## Status` and again at the top of `## Usage`.
- Keep `## Usage` short — one minimal example sufficient for understanding existing call sites. Do not document edge cases or advanced patterns.
- `## API` may shrink to the props that legacy callers actually pass. Mark removed/ignored props instead of listing every historical prop.
- `## Mistakes` should call out "Adopting `<Deprecated>` in new code" as the first mistake.

## Lifecycle Metadata Rules

- When the component source declares lifecycle metadata (`status.json`, status comment, `__lifecycle` constant, JSDoc tag, etc.), the reference MUST mirror it exactly.
- When source has deprecated exports or component JSDoc `@deprecated`, the reference MUST use `Scope: Public Component (deprecated)` and `Lifecycle: deprecated` unless newer source metadata explicitly says otherwise.
- When metadata is absent, the reference MUST mark it explicitly as `Lifecycle: not declared`. Do not infer "stable" or "beta" from popularity, age, or test coverage.
- Updating missing metadata in source is a separate concern and is out of scope for this split.

## Out of Scope

The reference split, and therefore this contract, does NOT touch:

- Runtime component source under `packages/urbix/src/ui/`.
- Public package exports, package entrypoints, or TypeScript types.
- Storybook stories or example apps (except as quotation source for examples).
- WIP / incubating components that are not listed in the component index.
- Backfilling missing lifecycle metadata across the library.

## Why per-component, not aggregate

Aggregate API files (`atoms-api.md`, `molecules-api.md`) are removed once their useful content has migrated. Do not recreate them. The reasoning is captured in [docs/adr/0001-flat-component-references.md](../../../../docs/adr/0001-flat-component-references.md).
