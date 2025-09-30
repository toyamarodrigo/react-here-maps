# React HERE Maps Documentation

Comprehensive documentation for the React HERE Maps library, built with [Mintlify](https://mintlify.com/).

## Getting Started

### Prerequisites

Install the Mintlify CLI globally:

```bash
npm install -g mint
```

### Local Development

Run the documentation site locally:

```bash
# From the root directory
pnpm run:docs

# Or from this directory
mint dev
```

The docs will be available at `http://localhost:3000`.

### Build

Build the documentation:

```bash
mint build
```

## Documentation Structure

```
apps/docs/
├── docs.json              # Mintlify configuration
├── introduction.mdx       # Home page
├── quickstart.mdx         # Quick start guide
├── installation.mdx       # Installation guide
├── components/            # Component API reference
│   ├── here-map.mdx
│   ├── marker.mdx
│   ├── polyline.mdx
│   ├── polygon.mdx
│   ├── map-settings.mdx
│   ├── zoom-control.mdx
│   └── scale-bar.mdx
├── guides/                # Conceptual guides
│   ├── map-context.mdx
│   ├── hooks-system.mdx
│   └── typescript-support.mdx
└── examples/              # Interactive examples
    ├── basic-map.mdx
    ├── markers.mdx
    ├── polylines-polygons.mdx
    └── interactive-map.mdx
```

## Writing Documentation

### MDX Format

Documentation is written in MDX (Markdown + JSX). Mintlify provides special components:

```mdx
---
title: 'Page Title'
description: 'Page description for SEO'
---

# Heading

<Card title="Card Title" icon="icon-name" href="/link">
  Card content
</Card>

<CodeGroup>
```bash npm
npm install package
```
```bash pnpm
pnpm add package
```
</CodeGroup>
```

### Mintlify Components

Mintlify provides many built-in components:

- `<Card>` - Interactive cards with icons
- `<CardGroup>` - Group multiple cards
- `<CodeGroup>` - Multiple code snippets with tabs
- `<Tabs>` - Tab interface
- `<Accordion>` / `<AccordionGroup>` - Collapsible content
- `<ParamField>` - API parameter documentation
- `<Warning>` / `<Info>` / `<Tip>` - Callout boxes
- `<Steps>` / `<Step>` - Step-by-step guides

See [Mintlify Components](https://mintlify.com/docs/content/components) for full list.

## Deployment

Mintlify supports automatic deployment from GitHub:

1. Push your docs to GitHub
2. Connect your repository to Mintlify
3. Mintlify automatically deploys on push to main branch

Alternatively, use the Mintlify CLI:

```bash
mint deploy
```

## Configuration

Edit `docs.json` to customize:

- Branding (name, logo, colors)
- Navigation structure
- Topbar links
- Footer socials
- Analytics
- Theme settings

See [Mintlify Configuration](https://mintlify.com/docs/settings/global) for details.

## Resources

- [Mintlify Documentation](https://mintlify.com/docs)
- [Mintlify GitHub](https://github.com/mintlify)
- [React HERE Maps Repository](https://github.com/toyamarodrigo/react-here-maps)