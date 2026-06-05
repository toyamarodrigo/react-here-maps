# Getting started with Urbix

Type: lifecycle
Library version: 0.9.8
Package: `@urbetrack/urbix`

## Registry and Authentication

The package is hosted on Azure DevOps. Create or update `.npmrc` in your project root:

```ini
@urbetrack:registry=https://pkgs.dev.azure.com/urbetrack/_packaging/urbix/npm/registry/
always-auth=true
legacy-peer-deps=true
//pkgs.dev.azure.com/urbetrack/_packaging/urbix/npm/registry/:username=urbetrack
//pkgs.dev.azure.com/urbetrack/_packaging/urbix/npm/registry/:_password=${AZURE_DEVOPS_PAT_BASE64}
//pkgs.dev.azure.com/urbetrack/_packaging/urbix/npm/registry/:email=not-used@example.com
```

Generate the base64 PAT value:

```bash
echo -n 'YOUR_AZURE_DEVOPS_PAT' | base64
```

Set the environment variable or replace `${AZURE_DEVOPS_PAT_BASE64}` with the output.

## Install

```bash
npm install @urbetrack/urbix
```

### Peer Dependencies

These must be installed in your project:

```bash
npm install react@^19.1.1 react-dom@^19.1.1 react-router@^7.9.1
```

## Tailwind v4 Setup (Vite)

Install the Tailwind v4 Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

Configure `vite.config.ts`:

```typescript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

For non-Vite projects (Webpack, Next.js), use the PostCSS plugin instead:

```bash
npm install tailwindcss @tailwindcss/postcss
```

```javascript
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

## CSS Imports

Create your main CSS file (e.g., `src/styles/globals.css`):

```css
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
```

`@urbetrack/urbix/styles.css` is required. Without it, all components render unstyled.

Two optional CSS files are available:

```css
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
@import "@urbetrack/urbix/font.css";
@import "@urbetrack/urbix/theme.css";
```

- `font.css` -- loads the library's default font
- `theme.css` -- provides additional design tokens

Import this CSS file in your entry point:

```typescript
// main.tsx
import "./styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## UrbixNotification Provider

Wrap your application with `UrbixNotification` to enable toast notifications and confirmation modals:

```typescript
// App.tsx
import { UrbixNotification } from "@urbetrack/urbix";

export default function App() {
  return (
    <UrbixNotification
      toastProps={{
        position: "bottom-right",
        autoClose: 5000,
      }}
    >
      <RouterOrContent />
    </UrbixNotification>
  );
}
```

Then use the notification hooks inside any child component:

```typescript
import { useToast, useConfirm } from "@urbetrack/urbix";

function MyComponent() {
  const { success, error } = useToast();
  const confirm = useConfirm();

  async function handleDelete() {
    const confirmed = await confirm({ title: "Delete this item?" });
    if (confirmed) {
      success("Item deleted");
    }
  }

  return <button onClick={handleDelete}>Delete</button>;
}
```

## Imports

All components use named exports. There are no default exports.

```typescript
import {
  Button,
  Input,
  DataTable,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  UrbixNotification,
} from "@urbetrack/urbix";
```

## Customizing the Theme

Extend or override design tokens with the `@theme` directive in your CSS file:

```css
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";

@theme {
  --color-primary-500: hsl(264 46% 64%);
  --color-brand-accent: hsl(120 70% 50%);
  --breakpoint-ultra: 2560px;
  --font-display: "Your Custom Font", sans-serif;
}
```

### Available Design Token Scales

- `--color-primary-50` through `--color-primary-1000`
- `--color-secondary-50` through `--color-secondary-1000`
- `--color-success-200` through `--color-success-1000`
- `--color-warning-200` through `--color-warning-1000`
- `--color-error-200` through `--color-error-1000`
- `--color-information-200` through `--color-information-1000`
- `--color-light-dark-50` through `--color-light-dark-1000`

## Migrating from Tailwind v3

If upgrading from a project that used Urbix pre-v0.7 with Tailwind v3:

1. Remove old dependencies:

```bash
npm uninstall postcss autoprefixer
```

2. Delete `tailwind.config.js` (or `.ts`) and `postcss.config.js` (Vite only).

3. Remove any import of `urbixTailwindConfig` -- this export was removed in v0.7.

4. Replace the old CSS directives with the new import:

```css
/* Remove these three lines */
/* @import "tailwindcss/base"; */
/* @import "tailwindcss/components"; */
/* @import "tailwindcss/utilities"; */

/* Replace with */
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
```

5. Move any JavaScript theme customizations into `@theme` blocks in CSS.

## Migrating from React 18

Update dependencies:

```bash
npm install react@^19.1.1 react-dom@^19.1.1
npm install -D @types/react@^19.2.14 @types/react-dom@^19.2.3
```

Key changes: `forwardRef` is no longer required for simple ref forwarding, and the `use` hook is available for reading promises and context.

## Minimal Working Example

`vite.config.ts`:

```typescript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

`src/globals.css`:

```css
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
```

`src/main.tsx`:

```typescript
import "./globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UrbixNotification, Button } from "@urbetrack/urbix";

function App() {
  return (
    <UrbixNotification>
      <Button variant="primary">It works</Button>
    </UrbixNotification>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## Common Mistakes

### CRITICAL: Missing styles.css import causes unstyled components

Wrong:

```typescript
import { Button } from "@urbetrack/urbix";
```

Correct:

```css
/* globals.css */
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
```

```typescript
import "./globals.css";
import { Button } from "@urbetrack/urbix";
```

Since v0.7, styles are no longer bundled with the JavaScript -- `@urbetrack/urbix/styles.css` must be imported explicitly or components render without any styling.

Source: migration-guide.md "Breaking Changes > CSS Import Required"

### CRITICAL: Using removed urbixTailwindConfig export

Wrong:

```javascript
// tailwind.config.js
module.exports = {
  presets: [require("@urbetrack/urbix").urbixTailwindConfig],
};
```

Correct:

```css
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
```

The `urbixTailwindConfig` JavaScript preset was removed in v0.7 when the library moved to Tailwind v4 CSS-first configuration.

Source: migration-guide.md "Breaking Changes > Tailwind Config Export Removed"

### HIGH: Wrong CSS import order breaks theme

Wrong:

```css
@import "@urbetrack/urbix/styles.css";
@import "tailwindcss";
```

Correct:

```css
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
```

The `tailwindcss` import must come before `@urbetrack/urbix/styles.css` because the library's styles depend on Tailwind's base layer being loaded first.

Source: migration-guide.md "Troubleshooting > Styles Not Applying"

### HIGH: Skipping UrbixNotification provider in production

Wrong:

```typescript
function App() {
  return <RouterProvider router={router} />;
}
```

Correct:

```typescript
import { UrbixNotification } from "@urbetrack/urbix";

function App() {
  return (
    <UrbixNotification>
      <RouterProvider router={router} />
    </UrbixNotification>
  );
}
```

Without `UrbixNotification`, toast notifications and confirmation modals will not render. The provider supplies both `ToastContainer` and `ConfirmProvider` contexts.

Source: urbix-notification.tsx

### MEDIUM: Using hex colors instead of HSL in @theme

Wrong:

```css
@theme {
  --color-primary-500: #8b5cf6;
}
```

Correct:

```css
@theme {
  --color-primary-500: hsl(264 46% 64%);
}
```

Hex values may not work correctly in all Tailwind v4 contexts where color manipulation (opacity modifiers, color-mix) is applied. Use HSL format for theme overrides.

Source: migration-guide.md "Troubleshooting > CSS Variables Not Working"
