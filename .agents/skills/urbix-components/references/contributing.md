# Contributing to the Library

This skill builds on urbix-getting-started and urbix-theming.

## 1. Decide the Atomic Design Category

Before writing code, classify the component:

| Category   | When to use                                         | Path                       |
|------------|-----------------------------------------------------|----------------------------|
| **Atom**   | Basic element that cannot be broken down further     | `src/ui/atoms/<name>/`     |
| **Molecule** | Composition of two or more atoms                  | `src/ui/molecules/<name>/` |
| **Organism** | Complex section with its own state/logic           | `src/ui/organisms/<name>/` |

Rules of thumb:
- If it wraps a single HTML element or Radix primitive, it is an **atom** (Button, Input, Label).
- If it combines atoms into a small unit (Input + Label, searchable dropdown), it is a **molecule** (Dropdown, ModuleHeader).
- If it manages internal state, sub-components, hooks, and/or stores, it is an **organism** (FilterPanel, Forms).

## 2. Create the Folder Structure

All file and folder names use **kebab-case**. ESLint enforces this via `unicorn/filename-case`:

```bash
# Example: creating an atom called "tag"
mkdir -p src/ui/atoms/tag
```

Required and optional files inside the folder:

```
src/ui/atoms/tag/
  index.ts              # re-exports (required)
  tag.tsx               # main component (required)
  tag.styles.ts         # CVA variants (when the component has variants)
  tag.stories.tsx       # Storybook stories (required)
  tag.test.tsx          # Vitest unit tests (required)
  status.json           # component metadata for Storybook status page
  tag.status.mdx        # MDX status doc (optional)
  hooks/                # component-specific hooks (optional)
  components/           # sub-components (optional)
  stores/               # Zustand stores (optional, organisms only)
  utils/                # helper utilities (optional)
```

## 3. Write the Component

### 3.1 Component file (`tag.tsx`)

```tsx
// src/ui/atoms/tag/tag.tsx
import { cn } from "@urbix/lib/utils";

import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { tagVariants } from "./tag.styles";

export type TagProps = {
  /** Content label displayed inside the tag */
  label: string;
} & ComponentProps<"span"> & VariantProps<typeof tagVariants>;

function Tag({ label, variant, size, className, ...props }: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ variant, size }), className)}
      {...props}
    >
      {label}
    </span>
  );
}

Tag.displayName = "Tag";

export { Tag };
```

Key conventions visible above:

- **`data-slot="tag"`** on the root element. Every component does this.
- **`@urbix/lib/utils`** for the `cn` utility (maps to `src/lib/utils.ts`).
- **`ComponentProps<"span">`** to extend native element props.
- **`VariantProps<typeof tagVariants>`** for type-safe CVA integration.
- **Named export** at the bottom (`export { Tag }`), PascalCase for the component name.
- **`displayName`** set explicitly for DevTools.

### 3.2 Styles file (`tag.styles.ts`)

```ts
// src/ui/atoms/tag/tag.styles.ts
import { cva } from "class-variance-authority";

export const tagVariants = cva(
  // base classes applied to every variant
  "inline-flex items-center rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-700",
        primary: "bg-primary-100 text-primary-700",
        success: "bg-success-100 text-success-700",
        error: "bg-error-100 text-error-700",
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-3 text-xs",
        lg: "h-7 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
```

Use design tokens (primary-600, neutral-900, etc.) from the theme -- never arbitrary Tailwind colors. See the `theming` reference for details on the token system.

### 3.3 Index file (`index.ts`)

```ts
// src/ui/atoms/tag/index.ts
export * from "./tag";
```

For components with a separate types file:

```ts
export * from "./tag";
export type * from "./tag.types";
```

## 4. Write Storybook Stories

```tsx
// src/ui/atoms/tag/tag.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag } from "./tag";

const meta = {
  title: "components/Tag",
  component: Tag,
  tags: ["autodocs", "atom", "public", "new", "version:0.9.8"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A small label used to categorize or mark items.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "error"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    label: "Tag",
    variant: "default",
    size: "md",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: "primary", label: "Primary" },
};

export const Variants: Story = {
  render: args => (
    <div className="flex items-center gap-3">
      <Tag {...args} variant="default" label="Default" />
      <Tag {...args} variant="primary" label="Primary" />
      <Tag {...args} variant="success" label="Success" />
      <Tag {...args} variant="error" label="Error" />
    </div>
  ),
  parameters: {
    controls: { exclude: ["variant"] },
  },
};
```

### Story conventions

| Field | Convention |
|-------|-----------|
| `title` | `"components/ComponentName"` -- flat namespace under components |
| `tags` | Always include `"autodocs"`. Add category: `"atom"`, `"molecule"`, or `"organism"`. Add scope: `"public"`, `"internal"`, or `"incubator"` when source metadata uses that scope. Add lifecycle from source metadata (`"dev"`, `"new"`, `"beta"`, `"review"`, `"rc"`, `"stable"`, or `"deprecated"`). Add version: `"version:X.Y.Z"`. |
| `parameters.layout` | `"centered"` for small components, `"padded"` for wide ones |
| `satisfies Meta<typeof Component>` | Always use `satisfies` for type safety |

### Status metadata (`status.json`)

```json
{
  "title": "components/Tag",
  "version": "0.9.8",
  "status": "new",
  "atomCategory": "atom",
  "scope": "public"
}
```

Valid `status` values mirror source metadata: `dev`, `new`, `beta`, `review`, `rc`, `stable`, `deprecated`.

Valid `scope` values are `public`, `internal`, and `incubator`. A component with `scope: "incubator"` that is exported from the public barrel is documented as `Public Component (incubator)` in the component reference.

## 5. Write Tests

```tsx
// src/ui/atoms/tag/tag.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tag } from "./tag";

describe("Tag", () => {
  it("renders with the provided label", () => {
    render(<Tag label="Status" />);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("sets data-slot attribute", () => {
    render(<Tag label="Status" />);
    const el = screen.getByText("Status");
    expect(el).toHaveAttribute("data-slot", "tag");
  });

  it("applies default variant classes", () => {
    render(<Tag label="Status" />);
    expect(screen.getByText("Status")).toHaveClass("bg-neutral-100");
  });

  it("applies primary variant classes", () => {
    render(<Tag label="Status" variant="primary" />);
    expect(screen.getByText("Status")).toHaveClass("bg-primary-100");
  });

  it("applies custom className", () => {
    render(<Tag label="Status" className="my-custom" />);
    expect(screen.getByText("Status")).toHaveClass("my-custom");
  });

  it("forwards additional HTML attributes", () => {
    render(<Tag label="Status" id="tag-1" />);
    expect(screen.getByText("Status")).toHaveAttribute("id", "tag-1");
  });
});
```

### Testing conventions

- Import `render`, `screen` from `@testing-library/react`.
- Import `userEvent` from `@testing-library/user-event` for interactions.
- Import `describe`, `expect`, `it`, `vi` from `vitest`.
- Use accessible queries first: `getByRole`, `getByLabelText`, `getByText`.
- Always test `data-slot` presence.
- Test each variant applies the expected CSS class.
- Test that `className` prop merges correctly.
- For interactive components, test click/keyboard events with `userEvent`.

### Running tests

```bash
pnpm test                # watch mode
pnpm test:cov            # with coverage report
pnpm test:ui             # interactive UI
pnpm test tag.test.tsx   # single file
```

Coverage targets: 90%+ statements, 85%+ branches, 90%+ functions.

## 6. Export from the Main Index

Add the export to `src/index.ts` in the correct section:

```ts
// src/index.ts

// export atoms
export * from "./ui/atoms/button";
// ...existing atom exports...
export * from "./ui/atoms/tag";        // <-- add alphabetically
```

If the component is a molecule or organism, add it under the corresponding comment block. Keep entries alphabetically sorted within each section.

**This step is critical.** Without it, consumers cannot import the component from `@urbetrack/urbix`.

## 7. Update the Component Reference

The `urbix-components` skill follows the `write-a-skill` progressive-disclosure model: keep `SKILL.md` as the quick-start and navigation surface, and keep component details in `references/<component>.md`.

When adding or changing a top-level component:

- Add or update `.agents/skills/urbix-components/references/<component>.md`.
- Mirror the same reference change under `.claude/skills/urbix-components/references/<component>.md`.
- Follow the template and required headings in [\_contract.md](./_contract.md).
- Link the reference from the component index in both `SKILL.md` files.
- Run `pnpm run check:skill-refs`.

## 8. Import Alias Reference

The `@urbix/*` alias maps to `src/*` (configured in `tsconfig.json`):

```ts
// Use the alias for cross-directory imports
import { cn } from "@urbix/lib/utils";
import { Button } from "@urbix/ui/atoms/button";
import { useFilterPanel } from "@urbix/ui/organisms/filter-panel/hooks/use-filter-panel";

// Use relative imports for files in the same component folder
import { tagVariants } from "./tag.styles";
import { TagIcon } from "./components/tag-icon";
```

Avoid long relative paths like `../../../lib/utils` -- always prefer the alias.

## 9. ESLint Rules to Know

The project uses `@antfu/eslint-config` with these key rules:

| Rule | Setting | What it means |
|------|---------|---------------|
| `unicorn/filename-case` | `error`, kebabCase | All file names must be kebab-case |
| `ts/consistent-type-definitions` | `error`, type | Use `type` not `interface` |
| `no-console` | `warn` | Avoid console.log in production code |
| `node/no-process-env` | `error` | Do not access process.env directly |
| `perfectionist/sort-imports` | `error` | Imports auto-sorted: react > types > external > internal > relative > styles |

The import sort order enforced by ESLint:
1. React imports
2. Type imports
3. Built-in and external packages
4. Internal types (`@urbix/*` types)
5. Internal modules (`@urbix/*`)
6. Parent/sibling/index types
7. Parent/sibling/index modules
8. Style imports
9. Side-effect imports

## 10. Conventional Commits

All commit messages follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
feat(tag): add new Tag atom component
fix(button): correct disabled state color
chore: update dependencies
refactor(data-table): extract pagination hook
docs(tag): add usage examples to story
test(tag): add variant tests
```

Format: `type(scope): description`

Common types:
- **feat** -- new feature or component (triggers minor version bump)
- **fix** -- bug fix (triggers patch version bump)
- **chore** -- maintenance, deps, config
- **refactor** -- code change that neither fixes nor adds
- **docs** -- documentation only
- **test** -- adding or updating tests

## 11. Versioning and Release

The library uses semantic-release. Manual version bumps when needed:

```bash
pnpm lib:patch   # 0.9.8 -> 0.9.9  (bug fixes)
pnpm lib:minor   # 0.9.8 -> 0.10.0 (new features, new components)
pnpm lib:major   # 0.9.8 -> 1.0.0  (breaking changes)
```

A new component is a **minor** bump. A bug fix to an existing component is a **patch** bump.

## 12. Pre-submit Checklist

Before opening a PR, verify:

- [ ] All file names are kebab-case
- [ ] Component renders `data-slot="component-name"` on root element
- [ ] CVA variants use design tokens, not arbitrary colors
- [ ] `index.ts` re-exports the component
- [ ] `src/index.ts` exports the component folder
- [ ] Story has `tags: ["autodocs", "<category>", "<scope>", "<lifecycle>", "version:X.Y.Z"]`
- [ ] Component reference follows [\_contract.md](./_contract.md)
- [ ] `## Source files` lists implementation paths, `status.json` when present, and Storybook files when present; it does not list test files
- [ ] Skill reference check passes: `pnpm run check:skill-refs`
- [ ] Tests pass: `pnpm test`
- [ ] Types check: `pnpm typecheck`
- [ ] Lint passes: `pnpm lint`
- [ ] Build succeeds: `pnpm build`
- [ ] Commit message follows conventional commits format
