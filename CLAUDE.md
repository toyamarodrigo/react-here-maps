# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo using pnpm workspaces with two main packages:

- `packages/lib` - The main React HERE Maps library (@rodrito/react-here-maps)
- `app/www` - Demo/example application (@rodrito/www)

## Commands

### Library Development

- `pnpm build:lib` - Build the library package
- `pnpm run:storybook` - Run Storybook for component development
- `pnpm build:storybook-web` - Build Storybook for deployment
- `pnpm check:lib` - Dry run publish check
- `pnpm publish:lib` - Publish library to npm

### Demo App Development

- `pnpm run:web` - Run the demo web application
- `pnpm build:web` - Build the demo application
- `pnpm lint:web` - Lint the demo application

### Library-specific Commands (from packages/lib)

- `pnpm build` - Build library (runs prebuild, then tsdown)
- `pnpm dev` - Build in watch mode
- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Run Biome linter with auto-fix
- `pnpm format` - Check formatting with Biome
- `pnpm format:write` - Format code with Biome
- `pnpm check` - Run all Biome checks
- `pnpm check:fix` - Run all Biome checks with auto-fix

## Architecture

### Core Components

The library provides React components for HERE Maps integration:

- `HereMap` - Main map container component with context provider
- `Marker` - Map markers with drag behavior support
- `Polyline` - Drawing polylines on maps
- `MapSettings` - Map configuration controls
- `ZoomControl` - Zoom controls
- `ScaleBar` - Scale bar display

### Hook-based Architecture

Components use custom hooks for functionality:

- `useCreateMap` - Core map initialization
- `useMapResize` - Handle map resize events
- `useMapContext` - Access map context
- `useMarker` - Marker management
- `useMarkerDragBehavior` - Marker drag functionality

### Context System

The `MapContext` provides map instance, platform, UI, and behavior objects to child components.

### Type Safety

- Uses Zod schemas for prop validation
- TypeScript definitions for HERE Maps API (@types/heremaps)
- Strict typing throughout with proper exports

### Build System

- Uses tsdown (powered by Rolldown) for efficient bundling
- Outputs ESM format with optimized tree-shaking
- Generates TypeScript declarations
- External dependencies: react, react-dom, @here/maps-api-for-javascript
- Browser-optimized with ~77% smaller bundle size than previous tsup build

### Code Quality

- Biome for linting and formatting (configured in biome.json)
- Storybook for component documentation and testing
- Component stories follow pattern: component-name.stories.tsx

## HERE Maps Integration

Requires HERE Maps API key and CSS inclusion:

```html
<link rel="stylesheet" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
```

Peer dependency: `@here/maps-api-for-javascript`

## Development Notes

- Components are memoized for performance
- Uses isomorphic layout effects for SSR compatibility
- Follows React 18+ patterns
- Component props validated with Zod schemas
- Utility functions for control visibility and map configuration
