# Theming and Design Tokens

- slug: urbix-theming
- type: core
- requires: urbix-getting-started
- library_version: 0.9.8

> This skill builds on urbix-getting-started. Complete that skill first for installation and provider setup.

## Overview

Urbix uses CSS custom properties (design tokens) defined in HSL format, Tailwind CSS v4 with the `@theme` directive, and utility functions (`cn()`, `cva()`) to build consistent, themeable UIs. All color, typography, shadow, and animation tokens live in source CSS files and are consumed through Tailwind utility classes.

## Source Files

| File | Purpose |
|---|---|
| `src/styles/theme.css` | `@theme` directive: color tokens, shadows, animations, font |
| `src/styles/typography.css` | Typography component classes (`@layer components`) |
| `src/styles/keyframes.css` | `@keyframes` for animations |
| `src/lib/utils.ts` | `cn()` utility (clsx + tailwind-merge) |
| `src/index.css` | Root CSS variables (`:root` HSL values), imports |

## Color Scales

All colors are stored as HSL channel values (e.g., `270 40% 43%`) in `:root` CSS variables and mapped to Tailwind tokens via `@theme` in `theme.css`.

### Primary (50-900)

Use for brand actions, active states, links.

```css
/* In :root (index.css) */
--primary-900: 266 59% 26%;
--primary-800: 258 53% 35%;
--primary-700: 270 41% 35%;
--primary-600: 270 40% 43%;   /* default --color-primary */
--primary-500: 264 39% 52%;
--primary-400: 272 48% 61%;
--primary-300: 273 46% 72%;
--primary-200: 271 44% 83%;
--primary-100: 291 45% 88%;
--primary-50:  273 41% 97%;
```

Tailwind usage: `bg-primary-600`, `text-primary-50`, `border-primary-700`.

### Secondary (50-900)

Use for secondary actions and accents.

```css
--secondary-900: 22 81% 21%;
--secondary-600: 25 90% 54%;   /* default --color-secondary */
--secondary-50:  28 100% 96%;
```

Tailwind usage: `bg-secondary-600`, `text-secondary-900`.

### Neutral (50-900)

Use for text, borders, backgrounds, disabled states.

```css
--neutral-900: 225 17% 19%;   /* darkest, used as --color-black */
--neutral-800: 236 10% 29%;
--neutral-600: 236 7% 38%;
--neutral-400: 233 7% 68%;
--neutral-200: 228 8% 89%;
--neutral-100: 210 14% 98%;
--neutral-50:  0 0% 100%;     /* white */
```

Tailwind usage: `text-neutral-900`, `bg-neutral-100`, `border-neutral-300`.

### Semantic Colors

Each has stops at 900, 700, 600 (default), 300, 100:

| Scale | Purpose | Default token |
|---|---|---|
| `success` | Confirmations, positive states | `--color-success` (600) |
| `error` | Validation errors, destructive | `--color-error` (600) |
| `warning` | Caution states | `--color-warning` (600) |
| `information` | Info banners, tooltips | `--color-information` (600) |

Tailwind usage: `text-error-600`, `bg-success-100`, `border-warning-300`.

### Legacy Aliases

The `light-dark-*` scale maps to `neutral-*` for backward compatibility. Prefer `neutral-*` in new code.

## Typography

Defined in `src/styles/typography.css` as `@layer components` classes. Font: **Montserrat** (weights 300-700).

### Headings

| Class | Size | Weight |
|---|---|---|
| `.heading-1` | `text-xl` | `font-semibold` |
| `.heading-2` | `text-lg` | `font-semibold` |
| `.heading-3` | `text-base` | `font-semibold` |
| `.heading-4` | `text-sm` | `font-semibold` |
| `.heading-5` | `text-xs` | `font-semibold` |

### Body

| Class | Size | Weight | Color |
|---|---|---|---|
| `.body-b1` | `text-sm` | normal | `text-neutral-900` |
| `.body-b2` | `text-sm` | `font-medium` | `text-neutral-900` |
| `.body-b3` | `text-sm` | `font-semibold` | `text-neutral-900` |
| `.body-b1s` | `text-xs` | `font-medium` | `text-neutral-900` |
| `.body-b2s` | `text-xs` | normal | `text-neutral-900` |
| `.body-b3s` | `text-xs` | `font-semibold` | `text-neutral-900` |

### Labels and Input Text

| Class | Size | Weight | Color |
|---|---|---|---|
| `.label-l1` | `text-sm` | `font-semibold` | `text-neutral-900` |
| `.label-l2` | `text-xs` | `font-semibold` | `text-neutral-900` |
| `.text-ip1` | `text-sm` | `font-medium` | `text-neutral-900` |
| `.text-ip2` | `text-xs` | `font-medium` | `text-neutral-900` |

## Shadow Tokens

Defined in `@theme` in `theme.css`. All shadows reset with `--shadow-*: initial;` before defining custom values.

| Token | Value |
|---|---|
| `shadow-200` | `0 2px 2px -2px var(--color-neutral-400)` |
| `shadow-400` | `0 4px 6px -4px var(--color-neutral-400)` |
| `shadow-600` | `0 4px 6px -4px var(--color-neutral-600)` |
| `shadow-800` | `0 4px 6px -4px var(--color-neutral-800)` |
| `shadow-1000` | `0 4px 6px -4px var(--color-neutral-900)` |

Tailwind usage: `shadow-200`, `shadow-600`.

## Animations

Keyframes in `src/styles/keyframes.css`, animation tokens in `@theme`:

| Token | Keyframe | Duration | Use case |
|---|---|---|---|
| `animate-fadeinleft` | `fade-in-left` | 0.35s ease-out | Slide-in from left |
| `animate-fadeinright` | `fade-in-right` | 0.35s ease-out | Slide-in from right |
| `animate-fadeoutleft` | `fade-out-left` | 0.35s ease-out | Slide-out to left |
| `animate-fadeoutright` | `fade-out-right` | 0.35s ease-out | Slide-out to right |
| `animate-shimmer` | `shimmer` | 1.8s ease-in-out infinite | Loading skeleton |

Tailwind usage: `animate-fadeinleft`, `animate-shimmer`.

## cn() Utility

**Source:** `src/lib/utils.ts`

```ts
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`cn()` combines `clsx` (conditional class joining) with `twMerge` (resolves Tailwind class conflicts so the last value wins). Always use `cn()` when merging component classes with consumer-provided `className`.

```tsx
import { cn } from "@urbix/lib/utils";

<div className={cn("bg-primary-600 text-sm", isActive && "bg-primary-700", className)} />
```

## CVA Pattern

Use `cva()` from `class-variance-authority` to define component variants. Always pair with `cn()` when applying.

**Real example from `src/ui/atoms/button/button.tsx`:**

```tsx
import { cn } from "@urbix/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-4 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 text-primary-50 hover:bg-primary-700 disabled:bg-neutral-600 disabled:text-neutral-50",
        secondary: "bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 disabled:border-neutral-600 disabled:text-neutral-600",
        link: "text-primary-600 hover:bg-primary-50 disabled:text-primary-400",
      },
      size: {
        xs: "h-8 text-xs",
        sm: "h-9 text-xs",
        md: "h-10 text-sm",
        lg: "h-11 text-sm",
        xl: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

// Apply with cn() to allow className overrides:
<button className={cn(buttonVariants({ variant, size, className }))} />
```

**Export the `VariantProps` type** so consumers can extend:

```tsx
export type ButtonProps = VariantProps<typeof buttonVariants> & ComponentProps<"button">;
```

## Overriding Tokens with @theme

The `@theme` directive in `theme.css` maps `:root` CSS variables to Tailwind tokens. To override colors in a consumer app, redefine the HSL variables in `:root`:

```css
/* consumer app global CSS */
:root {
  --primary-600: 210 80% 50%;  /* override brand color to blue */
  --primary-700: 210 80% 40%;
}
```

No Tailwind config changes needed -- `@theme` references resolve through CSS custom properties at runtime.

## Common Mistakes

### [HIGH] Using arbitrary Tailwind colors instead of semantic tokens

Wrong:
```tsx
<div className="bg-purple-800 text-gray-100">
```

Correct:
```tsx
<div className="bg-primary-800 text-neutral-100">
```

**Mechanism:** Arbitrary Tailwind colors (e.g., `purple-800`, `gray-100`) bypass the design token system. They will not respond to theme overrides, break visual consistency, and produce colors that do not match the design spec.

**Source:** `src/styles/theme.css` -- all component colors must reference the `primary`, `secondary`, `neutral`, `success`, `error`, `warning`, or `information` scales.

---

### [HIGH] Not using cn() for class merging

Wrong:
```tsx
<div className={`bg-primary-600 ${isActive ? "bg-primary-700" : ""} ${className}`}>
```

Correct:
```tsx
<div className={cn("bg-primary-600", isActive && "bg-primary-700", className)}>
```

**Mechanism:** Template literal concatenation does not resolve Tailwind class conflicts. If `className` contains `bg-secondary-600`, the raw string will have both `bg-primary-600` and `bg-secondary-600` -- Tailwind applies whichever appears last in the stylesheet, not in the class string. `cn()` uses `twMerge` to detect the conflict and keep only the last value, producing deterministic results.

**Source:** `src/lib/utils.ts`

---

### [MEDIUM] Manual class construction instead of CVA variants

Wrong:
```tsx
const getButtonClass = (variant: string, size: string) => {
  let cls = "inline-flex items-center";
  if (variant === "primary") cls += " bg-primary-600 text-primary-50";
  if (size === "md") cls += " h-10 text-sm";
  return cls;
};
```

Correct:
```tsx
const buttonVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      primary: "bg-primary-600 text-primary-50",
    },
    size: {
      md: "h-10 text-sm",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

// Usage
<button className={cn(buttonVariants({ variant, size }))} />
```

**Mechanism:** Manual if/switch class builders are error-prone, not type-safe, and cannot provide `VariantProps` for consumers. CVA generates a typed function with exhaustive variant mapping and `defaultVariants` support.

**Source:** `src/ui/atoms/button/button.tsx`

## Cross-References

- **getting-started** -- initial setup, provider, importing styles
- **contributing** -- creating new component variants, file structure conventions
