# Forms

The authoritative reference for the `Forms` compound and its field parts. Every `Forms.*` field is pre-wired to react-hook-form via `ConnectForm` + `Controller`, and renders through `BaseField` for label, helpText, errorText, and helpTooltip.

## Status

- Scope: Public Component
- Lifecycle: beta

`BaseField` and `ConnectForm` are reachable through `@urbetrack/urbix/internals`. Treat them as Internal Components: stable enough to use for advanced cases, but consumers should prefer the `Forms.*` fields wherever possible.

## Imports

```tsx
import { Forms } from "@urbetrack/urbix";
```

Internals (advanced usage only):

```tsx
import { BaseField, ConnectForm } from "@urbetrack/urbix/internals";
import type { IFormField } from "@urbetrack/urbix/internals";
```

react-hook-form and Zod are peer concerns — install and import them directly:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
```

## Usage

Every form needs three pieces: a Zod schema, `useForm` with `zodResolver`, and `Forms.Form` as the wrapper. Field components inside `Forms.Form` read state from `FormProvider` automatically.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Forms } from "@urbetrack/urbix";

const formSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
});

type FormValues = z.infer<typeof formSchema>;

export function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Forms.Form
      provider={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Forms.InputText label="Name" name="name" required />
      <Forms.InputText label="Email" name="email" required />
      <Button type="submit">Save</Button>
    </Forms.Form>
  );
}
```

`Forms.Form` accepts a `provider` prop (the return value of `useForm`) and spreads it into `FormProvider`. All remaining props forward to the underlying `<form>`.

## API

The `Forms` compound is exported from `@urbetrack/urbix` as a single object:

```
Forms.Form                    -- FormProvider + <form> wrapper
Forms.InputText               -- text input bound via Controller
Forms.Dropdown                -- single-select dropdown
Forms.DropdownMultiple        -- multi-select dropdown
Forms.DropdownNestedRadio     -- nested single-select dropdown
Forms.DropdownNestedMultiple  -- nested multi-select dropdown
Forms.NumericInput            -- numeric stepper
Forms.Switch                  -- toggle switch
Forms.Textarea                -- multiline text input
Forms.UploadFile              -- file upload field
```

### IFormField (base type)

Every field component extends this base type:

```ts
type IFormField = {
  id?: string;
  label: string;
  name: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  helpText?: React.ReactNode;
  errorText?: React.ReactNode;
  helpTooltip?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
};
```

### Forms.Form

Wraps children in `FormProvider` and renders a `<form>`.

| Prop | Type | Purpose |
|---|---|---|
| `provider` | `UseFormReturn<T>` | The return value of `useForm`. Required. |
| `onSubmit` | `(e: FormEvent) => void` | Usually `form.handleSubmit(onValid)`. |
| `children` | `ReactNode` | Field components and submit controls. |
| `className` | `string` | Forwarded to `<form>`. |
| ...rest | `FormHTMLAttributes` | Any other native `<form>` attribute. |

### Forms.InputText

Extends `IFormField` and the `Input` atom props.

| Prop | Type | Purpose |
|---|---|---|
| `showMaxLength` | `boolean` | Show remaining character count. |
| `maxLength` | `number` | Maximum character limit. |
| `iconLeft` | `ReactNode` | Icon rendered inside the input. |

### Forms.Dropdown

Extends `IFormField` and the `Dropdown` molecule props.

| Prop | Type | Purpose |
|---|---|---|
| `options` | `T[]` | Option objects. |
| `dataKey` | `keyof T` | Field used as the value key. |
| `optionLabel` | `keyof T` | Field rendered as the visible label. |

### Forms.DropdownMultiple

Same shape as `Forms.Dropdown` but stores an array of selected options. The schema for the `name` field must accept an array of option objects.

### Forms.DropdownNestedRadio / Forms.DropdownNestedMultiple

Nested-options variants. Single-select stores one option, multiple stores an array. See [nested-select.md](./nested-select.md) for the underlying molecule API.

### Forms.NumericInput

Extends `IFormField` and the `NumericInput` molecule props.

| Prop | Type | Purpose |
|---|---|---|
| `icon` | `ReactNode` | Icon rendered inside the input. |
| `incremental` | `boolean` | Show increment/decrement buttons. |

### Forms.Switch

Extends `IFormField` and the `Switch` atom props.

| Prop | Type | Purpose |
|---|---|---|
| `text` | `string` | Label rendered next to the toggle. |

Internally bound via `checked` / `onCheckedChange` from `Controller`.

### Forms.Textarea

Extends `IFormField` and the `Textarea` atom props.

| Prop | Type | Purpose |
|---|---|---|
| `showMaxLength` | `boolean` | Show remaining character count. |
| `maxLength` | `number` | Maximum character limit. |

### Forms.UploadFile

Extends `IFormField` and the `UploadFile` molecule props, except `files` is controlled by react-hook-form field state.

| Prop | Type | Purpose |
|---|---|---|
| `mapSelectedFilesToItems` | `(files: File[]) => UploadFileItem[]` | Optional mapper for turning native `File` objects into the form value shape. |
| `uploadMode` | `"instant" \| "deferred"` | Instant mode stores valid files on selection; deferred mode stores them when upload starts. |

The field value should be an `UploadFileItem[]`. `Forms.UploadFile` renders through `BaseField`, forwards labels/help/errors like other `Forms.*` fields, and leaves the actual backend upload request to application code.

### BaseField (Internal)

`BaseField` is the layout wrapper used by every `Forms.*` field. Reachable via `@urbetrack/urbix/internals`. Use it directly only when building a custom field that does not fit any `Forms.*` shape.

| Prop | Type | Purpose |
|---|---|---|
| `label` | `string` | Field label text. |
| `helpText` | `ReactNode` | Description shown below the field. |
| `errorText` | `ReactNode` | Error message; replaces `helpText` when present. |
| `helpTooltip` | `ReactNode` | Tooltip icon next to the label. |
| `required` | `boolean` | Shows red asterisk on the label. |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | Controls label / message font size. |
| `customFooterMessage` | `ReactNode` | Override the default `FooterMessage`. |

### ConnectForm (Internal)

Render-prop component that exposes `UseFormReturn` from `useFormContext`. Use it to read or write form values from a child that is not a `Forms.*` field.

```tsx
<ConnectForm<FormValues>>
  {({ watch, formState }) => /* ... */}
</ConnectForm>
```

## Patterns

### Mixed field types in one form

Every field type uses the same setup pattern (Zod schema + `useForm` + `Forms.Form`):

```tsx
const schema = z.object({
  username: z.string().min(1, "Required").max(20, "Max 20 characters"),
  country: z.object({ code: z.string(), name: z.string() }, { error: "Select a country" }),
  notifications: z.boolean(),
  bio: z.string().optional(),
});

// Inside Forms.Form:
<Forms.InputText label="Username" name="username" required showMaxLength maxLength={20} helpText="Your public display name" />
<Forms.Dropdown label="Country" name="country" options={countries} dataKey="code" optionLabel="name" />
<Forms.Switch label="Notifications" name="notifications" helpTooltip="You can change this later" />
<Forms.Textarea label="Bio" name="bio" helpText="Tell us about yourself" showMaxLength maxLength={200} />
```

### Validation errors

Validation errors render automatically. When `Controller` detects `fieldState.error`, it forwards `fieldState.error.message` as `errorText` to `BaseField`, and `FooterMessage` swaps `helpText` for the error message. The Zod schema controls the text:

```tsx
const schema = z.object({
  age: z.number().min(18, "Must be at least 18"),
  tags: z.array(
    z.object({ id: z.number(), value: z.string() }),
    { error: "Select at least 2 tags" },
  ).min(2, "Select at least 2 tags"),
});
```

Errors trigger on submit by default. Use `mode: "onChange"` or `mode: "onBlur"` in `useForm` to validate sooner:

```tsx
const form = useForm<Schema>({
  resolver: zodResolver(schema),
  mode: "onBlur",
  defaultValues: { age: 0, tags: [] },
});
```

### DropdownMultiple with array validation

```tsx
const schema = z.object({
  neighborhoods: z.array(
    z.object({ id: z.number(), value: z.string() }),
    { error: "Select at least 2 neighborhoods" },
  ).min(2, "Select at least 2 neighborhoods"),
});

<Forms.DropdownMultiple
  label="Neighborhoods"
  name="neighborhoods"
  options={barrios}
  dataKey="id"
  optionLabel="value"
  required
  helpText="Pick two or more"
/>
```

### NumericInput with icon and tooltip

```tsx
<Forms.NumericInput
  label="Age"
  name="age"
  icon={<UserIcon />}
  helpText="How old are you?"
  helpTooltip="Enter your age"
  incremental
/>
```

### Reading form state with ConnectForm

Use `ConnectForm` when you need to read or write values from a node that is not a `Forms.*` field. Place it anywhere inside `Forms.Form`.

```tsx
import { ConnectForm } from "@urbetrack/urbix/internals";

function FormSummary() {
  return (
    <ConnectForm<{ name: string; email: string }>>
      {({ watch, formState }) => {
        const name = watch("name");
        return (
          <div>
            <p>Current name: {name}</p>
            {formState.isSubmitting && <p>Submitting…</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
```

## Mistakes

### [CRITICAL] Using atoms directly instead of `Forms.*` fields

Wrong:

```tsx
import { Input } from "@urbetrack/urbix";

<Input name="email" value={email} onChange={setEmail} />
```

Correct:

```tsx
<Forms.Form provider={form}>
  <Forms.InputText label="Email" name="email" />
</Forms.Form>
```

`Forms.InputText` wires itself into react-hook-form via `ConnectForm` + `Controller`. The raw `Input` atom has no form integration — no validation, no error display, no form state tracking.

### [CRITICAL] Missing `Forms.Form` provider wrapper

Wrong:

```tsx
function MyForm() {
  return (
    <form>
      <Forms.InputText label="Name" name="name" />
    </form>
  );
}
```

Correct:

```tsx
function MyForm() {
  const form = useForm({ defaultValues: { name: "" } });
  return (
    <Forms.Form provider={form}>
      <Forms.InputText label="Name" name="name" />
    </Forms.Form>
  );
}
```

Every `Forms.*` field calls `useFormContext()` internally. Without `Forms.Form` (which renders `FormProvider`), `useFormContext` returns `null` and the component crashes at runtime with "Cannot destructure property 'control' of undefined".

### [HIGH] Using deprecated `Field` / `FieldLabel` atoms directly

Wrong:

```tsx
import { Field, FieldLabel } from "@urbetrack/urbix/internals";

<Field>
  <FieldLabel>Name</FieldLabel>
  <input name="name" />
</Field>
```

Correct:

```tsx
<Forms.InputText label="Name" name="name" />
```

`Field` and the field atoms are internal building blocks for `BaseField`. They have no react-hook-form integration; using them directly forces you to wire up validation, error display, and form state by hand — which `Forms.*` fields handle automatically.

### [HIGH] Syncing form state through `useEffect`

Wrong:

```tsx
function MyForm() {
  const form = useForm();
  const [name, setName] = useState("");

  useEffect(() => {
    form.setValue("name", name);
  }, [name]);

  return (
    <Forms.Form provider={form}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </Forms.Form>
  );
}
```

Correct:

```tsx
function MyForm() {
  const form = useForm({ defaultValues: { name: "" } });

  return (
    <Forms.Form provider={form}>
      <Forms.InputText label="Name" name="name" />
    </Forms.Form>
  );
}
```

Or read values directly:

```tsx
const name = form.watch("name");
```

`useEffect` to sync form state creates extra renders and stale-closure bugs. react-hook-form already manages state. Use `defaultValues` for initial state, `watch()` to subscribe, and `setValue()` at event boundaries — never inside an effect.

## Related references

- [dropdown.md](./dropdown.md) / [dropdown-multiple.md](./dropdown-multiple.md) — `Forms.Dropdown` / `Forms.DropdownMultiple` wrap these molecules. Use them for standalone (non-form) usage.
- [nested-select.md](./nested-select.md) — underlying API for `Forms.DropdownNestedRadio` / `Forms.DropdownNestedMultiple`.
- [numeric-input.md](./numeric-input.md) — underlying molecule for `Forms.NumericInput`.
- [upload-file.md](./upload-file.md) — underlying molecule for `Forms.UploadFile`.
- [switch.md](./switch.md) / [textarea.md](./textarea.md) / [input.md](./input.md) — atoms wrapped by their `Forms.*` field.
- [field.md](./field.md) / [label.md](./label.md) — internal layout primitives consumed by `BaseField`. Do not use directly in product code.

## Source files

| File | Purpose |
|---|---|
| `packages/urbix/src/ui/organisms/forms/forms.ts` | `Forms` compound object definition |
| `packages/urbix/src/ui/organisms/forms/forms.types.ts` | `IFormField` base type |
| `packages/urbix/src/ui/organisms/forms/status.json` | Source lifecycle and scope metadata |
| `packages/urbix/src/ui/organisms/forms/internals.ts` | `BaseField`, `ConnectForm`, `IFormField` exports |
| `packages/urbix/src/ui/organisms/forms/index.ts` | Public package re-export of `Forms` |
| `packages/urbix/src/ui/organisms/forms/components/form.tsx` | `Forms.Form` (FormProvider wrapper) |
| `packages/urbix/src/ui/organisms/forms/components/connect-form.tsx` | `ConnectForm` render-prop |
| `packages/urbix/src/ui/organisms/forms/components/base-field/base-field.tsx` | `BaseField` layout component |
| `packages/urbix/src/ui/organisms/forms/components/base-field/atoms/` | Internal field atoms used by `BaseField` |
| `packages/urbix/src/ui/organisms/forms/components/base-field/footer-message/` | `FooterMessage` (helpText / errorText switcher) |
| `packages/urbix/src/ui/organisms/forms/components/fields/input-text/input-text.tsx` | `Forms.InputText` |
| `packages/urbix/src/ui/organisms/forms/components/fields/dropdown/dropdown.tsx` | `Forms.Dropdown` |
| `packages/urbix/src/ui/organisms/forms/components/fields/dropdown-multiple/dropdown-multiple.tsx` | `Forms.DropdownMultiple` |
| `packages/urbix/src/ui/organisms/forms/components/fields/dropdown-nested-radio/dropdown-nested-radio.tsx` | `Forms.DropdownNestedRadio` |
| `packages/urbix/src/ui/organisms/forms/components/fields/dropdown-nested-multiple/dropdown-nested-multiple.tsx` | `Forms.DropdownNestedMultiple` |
| `packages/urbix/src/ui/organisms/forms/components/fields/numeric-input/numeric-input.tsx` | `Forms.NumericInput` |
| `packages/urbix/src/ui/organisms/forms/components/fields/switch/switch.tsx` | `Forms.Switch` |
| `packages/urbix/src/ui/organisms/forms/components/fields/textarea/textarea.tsx` | `Forms.Textarea` |
| `packages/urbix/src/ui/organisms/forms/components/fields/upload-file/upload-file.tsx` | `Forms.UploadFile` |
| `packages/urbix/src/ui/organisms/forms/forms.stories.tsx` | Storybook stories for the compound |
