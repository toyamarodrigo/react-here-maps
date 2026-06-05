# Foundation Components

This skill builds on urbix-getting-started.

Urbix provides 18 atom components and 13+ layout molecules. All are built on
Radix UI primitives with CVA (class-variance-authority) for variant styling and
`cn()` for class merging.

## Critical Rules

### ALWAYS use named imports (HIGH priority)

```tsx
// CORRECT
import { Button, Chip, Dialog } from "@urbetrack/urbix";

// WRONG - will break at runtime
import Button from "@urbetrack/urbix";
```

Every component is a **named export**. There are no default exports in the
library. This applies to atoms, molecules, and all sub-packages.

### Use compound component pattern for Chip and Status (MEDIUM priority)

```tsx
// CORRECT - compound components
<Chip variant="primary" style="filled">
  <Chip.Icon><MdCheck /></Chip.Icon>
  <Chip.Text>Active</Chip.Text>
  <Chip.Close onClose={handleRemove} />
</Chip>

// WRONG - raw children without sub-components
<Chip variant="primary">
  <span>Active</span>
</Chip>
```

The same pattern applies to `Status`:

```tsx
<Status variant="success" style="filled">
  <Status.Icon><MdCheck /></Status.Icon>
  <Status.Text>Online</Status.Text>
</Status>
```

### Removed legacy APIs (MEDIUM priority)

| Removed API | Replacement |
|---|---|
| `Select` (atom) | `Dropdown` or `Forms.Dropdown` |
| `VirtualizedRadioGroup` | `BaseSelectRadio` from `@urbetrack/urbix/internals` |
| `ComboBox` | `DropdownMultiple` |
| `RadioGroup` (public) | `RadioGroup` from `@urbetrack/urbix/internals` |

Do not reintroduce these compatibility exports in new code.

---

## Pattern 1: Button with Variants, Sizes, and Button.Icon

Button supports three variants (`primary`, `secondary`, `link`), five sizes
(`xs`, `sm`, `md`, `lg`, `xl`), and an `asChild` prop for polymorphic rendering.

```tsx
import { Button } from "@urbetrack/urbix";
import { MdSave, MdArrowForward } from "react-icons/md";

// Primary button (default)
<Button variant="primary" size="md" onClick={handleSave}>
  <Button.Icon><MdSave /></Button.Icon>
  Save changes
</Button>

// Secondary with icon on the right
<Button variant="secondary" size="sm">
  Next
  <Button.Icon><MdArrowForward /></Button.Icon>
</Button>

// Link variant
<Button variant="link" size="xs">Cancel</Button>

// Polymorphic: render as an anchor tag
<Button asChild variant="primary">
  <a href="/dashboard">Go to dashboard</a>
</Button>
```

**Key props:**

| Prop | Type | Default |
|---|---|---|
| `variant` | `"primary" \| "secondary" \| "link"` | `"primary"` |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |
| `asChild` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

**Sub-components:** `Button.Icon` -- wraps an icon in a `<span>`.

---

## Pattern 2: Chip Compound Component

Chip is a fully compound component with `Chip.Icon`, `Chip.Text`, and
`Chip.Close`. It supports five color variants, two styles, three sizes, and
`selected`/`disabled` states.

```tsx
import { Chip } from "@urbetrack/urbix";
import { MdLocalShipping } from "react-icons/md";

// Basic chip
<Chip variant="primary" style="filled" size="md">
  <Chip.Text>En ruta</Chip.Text>
</Chip>

// Chip with icon and close button
<Chip variant="success" style="outlined" size="sm">
  <Chip.Icon><MdLocalShipping /></Chip.Icon>
  <Chip.Text>Entregado</Chip.Text>
  <Chip.Close onClose={() => removeChip(id)} />
</Chip>

// Selected state (toggleable)
<Chip
  variant="primary"
  style="filled"
  selected={isSelected}
  onClick={() => setIsSelected(!isSelected)}
>
  <Chip.Text>Filter option</Chip.Text>
</Chip>

// Disabled
<Chip variant="light-dark" disabled>
  <Chip.Text>Inactive</Chip.Text>
</Chip>
```

**Variants:** `"primary"`, `"danger"`, `"success"`, `"warning"`, `"light-dark"`
**Styles:** `"filled"` (default), `"outlined"`
**Sizes:** `"sm"` (h-5), `"md"` (h-6, default), `"lg"` (h-7)

**Sub-components:**

| Sub-component | Purpose |
|---|---|
| `Chip.Icon` | Icon wrapper with `flex-shrink-0` |
| `Chip.Text` | Text with `truncate` overflow |
| `Chip.Close` | Close button; defaults to `X` icon; fires `onClose` |

---

## Pattern 3: Dialog with Persistent Mode

Dialog is built on Radix UI Dialog. The `persistent` prop prevents closing when
clicking outside the overlay. Use `modal={false}` by default (the component
sets `aria-modal={false}` unless you pass `modal`).

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@urbetrack/urbix";
import { Button } from "@urbetrack/urbix";

// Standard dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
    </DialogHeader>
    {/* form content */}
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="link">Cancel</Button>
      </DialogClose>
      <Button onClick={handleSave}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Persistent dialog (cannot dismiss by clicking outside)
<Dialog open={isOpen}>
  <DialogContent
    persistent
    onCloseButton={() => setIsOpen(false)}
    onEscapeKeyDown={() => setIsOpen(false)}
  >
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <Button variant="link" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**DialogContent extra props:**

| Prop | Type | Default |
|---|---|---|
| `persistent` | `boolean` | `undefined` |
| `showCloseButton` | `boolean` | `true` |
| `onCloseButton` | `MouseEventHandler` | `undefined` |

For simple confirm/reject flows, prefer `ConfirmModal` or the `useConfirm()`
hook which wraps Dialog with a standardized layout.

---

## Pattern 4: Tabs with Icons

Tabs takes an `items` array and renders the full tab structure automatically.
Each item can include an `icon` ReactNode.

```tsx
import { Tabs } from "@urbetrack/urbix";
import { MdMap, MdList, MdBarChart } from "react-icons/md";

const tabItems = [
  {
    value: "map",
    label: "Mapa",
    icon: <MdMap />,
    content: <MapView />,
  },
  {
    value: "list",
    label: "Lista",
    icon: <MdList />,
    content: <ListView />,
  },
  {
    value: "stats",
    label: "Estadisticas",
    icon: <MdBarChart />,
    content: <StatsView />,
    disabled: true,
  },
];

<Tabs
  items={tabItems}
  defaultValue="map"
  size="md"
/>
```

**TabItem shape:**

```ts
type TabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};
```

**Sizes:** `"sm"`, `"md"` (default), `"lg"` -- affects both trigger text size
and icon size.

---

## Tensions and Cross-References

### Removed legacy APIs

The legacy compatibility exports were removed from the public root. Use the
supported replacements:

- **Atom Select** was removed. Use `Dropdown` (single select) or
  `Forms.Dropdown` (inside forms).
- **RadioGroup** public export was removed. Use
  `import { RadioGroup } from "@urbetrack/urbix/internals"`.
- **VirtualizedRadioGroup** was removed. Use
  `import { BaseSelectRadio } from "@urbetrack/urbix/internals"`.
- **ComboBox** was removed. Use `DropdownMultiple`.

### Theming

All CVA variants use design tokens from the theme (e.g., `primary-600`,
`neutral-600`, `error-600`). See the **theming** reference for details on
how to customize these tokens and use the `cn()` utility.
